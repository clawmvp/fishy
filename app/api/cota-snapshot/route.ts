import { NextRequest, NextResponse } from "next/server";
import { saveCotaSnapshot } from "@/lib/cota-history";
import { HIDRO_IDS } from "@/lib/water-level";
import { startCronLog, endCronLog } from "@/lib/cron-log";

export const dynamic = "force-dynamic";

export async function GET(req: NextRequest) {
  const auth = req.headers.get("authorization");
  const token = req.nextUrl.searchParams.get("token");
  const secret = process.env.CRON_SECRET;
  if (!secret) return NextResponse.json({ error: "no secret" }, { status: 500 });
  if (auth !== `Bearer ${secret}` && token !== secret) {
    return NextResponse.json({ error: "unauthorized" }, { status: 401 });
  }

  const logId = await startCronLog("cota-snapshot");

  // Tulcea + Isaccea (lead indicator amonte) + Brăila (regional context). Sulina stația lipsă pe hidro.ro.
  const monitoredHidro = ["tulcea", "isaccea", "braila"];

  let html: string;
  try {
    const resp = await fetch("https://www.hidro.ro/", {
      headers: { "User-Agent": "Mozilla/5.0 (compatible; fishy.n01.app/1.0)" },
    });
    html = await resp.text();
  } catch (e) {
    return NextResponse.json({ error: "hidro.ro fetch failed", details: (e as Error).message }, { status: 500 });
  }

  const log: { station: string; unit: string; value: number; variation: number | null; date: string; saved: boolean }[] = [];

  for (const slug of monitoredHidro) {
    const hidroId = HIDRO_IDS[slug];
    if (!hidroId) continue;
    const idx = html.indexOf(`"${hidroId}":{`);
    if (idx === -1) continue;

    const slice = html.slice(idx, idx + 1500);
    const dataMatch = slice.match(/"DATA":"([^"]+)"/);
    // H= 72 cm sau H= -34 cm sau H= 105 cm
    const textMatch = slice.match(/"TEXT1":"H=\s*(-?\d+)\s*cm/);
    const tendMatch = slice.match(/"TENDINTA_NIVEL":(-?\d+)/);

    if (!dataMatch || !textMatch) continue;
    const level = parseInt(textMatch[1], 10);
    const variation = tendMatch ? parseInt(tendMatch[1], 10) : null;
    const measuredAt = dataMatch[1];

    const ok = await saveCotaSnapshot(slug, level, variation, measuredAt.replace(" ", "T") + "Z", "cm");
    log.push({ station: slug, unit: "cm", value: level, variation, date: measuredAt, saved: ok });
  }

  // Bratul Chilia — debit din Open-Meteo flood (GloFAS)
  try {
    const today = new Date();
    const yesterday = new Date(today.getTime() - 24 * 60 * 60 * 1000);
    const floodUrl = `https://flood-api.open-meteo.com/v1/flood?latitude=45.42&longitude=29.26&daily=river_discharge&past_days=1&forecast_days=1`;
    const floodResp = await fetch(floodUrl);
    if (floodResp.ok) {
      const fd = await floodResp.json();
      const disch: (number | null)[] = fd?.daily?.river_discharge ?? [];
      const todayVal = typeof disch[1] === "number" ? Math.round(disch[1]) : null;
      const yestVal = typeof disch[0] === "number" ? Math.round(disch[0]) : null;
      const variation = todayVal != null && yestVal != null ? todayVal - yestVal : null;
      if (todayVal != null) {
        const ok = await saveCotaSnapshot("chilia", todayVal, variation, today.toISOString().slice(0, 10) + "T06:00:00Z", "m3s");
        log.push({ station: "chilia", unit: "m3s", value: todayVal, variation, date: today.toISOString().slice(0, 10), saved: ok });
      }
    }
  } catch (e) {
    log.push({ station: "chilia", unit: "m3s", value: 0, variation: null, date: "err", saved: false });
  }

  await endCronLog(logId, "ok", { snapshots: log });
  return NextResponse.json({ ok: true, snapshots: log });
}
