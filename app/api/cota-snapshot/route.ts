import { NextRequest, NextResponse } from "next/server";
import { saveCotaSnapshot } from "@/lib/cota-history";
import { HIDRO_IDS } from "@/lib/water-level";

export const dynamic = "force-dynamic";

export async function GET(req: NextRequest) {
  const auth = req.headers.get("authorization");
  const token = req.nextUrl.searchParams.get("token");
  const secret = process.env.CRON_SECRET;
  if (!secret) return NextResponse.json({ error: "no secret" }, { status: 500 });
  if (auth !== `Bearer ${secret}` && token !== secret) {
    return NextResponse.json({ error: "unauthorized" }, { status: 401 });
  }

  // Stocăm doar pentru stațiile care contează la pescuit (Tulcea + Sulina + Isaccea + Braila)
  const monitored = ["tulcea", "sulina", "isaccea", "braila"];

  let html: string;
  try {
    const resp = await fetch("https://www.hidro.ro/", {
      headers: { "User-Agent": "Mozilla/5.0 (compatible; fishy.n01.app/1.0)" },
    });
    html = await resp.text();
  } catch (e) {
    return NextResponse.json({ error: "hidro.ro fetch failed", details: (e as Error).message }, { status: 500 });
  }

  const log: { station: string; level: number; variation: number | null; date: string; saved: boolean }[] = [];

  for (const slug of monitored) {
    const hidroId = HIDRO_IDS[slug];
    if (!hidroId) continue;
    const idx = html.indexOf(`"${hidroId}":{`);
    if (idx === -1) continue;

    // Extract DATA + TEXT1 (level) + TENDINTA_NIVEL (variation)
    const slice = html.slice(idx, idx + 1500);
    const dataMatch = slice.match(/"DATA":"([^"]+)"/);
    const textMatch = slice.match(/"TEXT1":"H= (\d+) cm/);
    const tendMatch = slice.match(/"TENDINTA_NIVEL":(-?\d+)/);

    if (!dataMatch || !textMatch) continue;
    const level = parseInt(textMatch[1], 10);
    const variation = tendMatch ? parseInt(tendMatch[1], 10) : null;
    const measuredAt = dataMatch[1]; // "2026-06-19 06:00:00"

    const ok = await saveCotaSnapshot(slug, level, variation, measuredAt.replace(" ", "T") + "Z");
    log.push({ station: slug, level, variation, date: measuredAt, saved: ok });
  }

  return NextResponse.json({ ok: true, snapshots: log });
}
