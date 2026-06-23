import { NextRequest, NextResponse } from "next/server";
import { sql } from "@/lib/db";
import { CANALE } from "@/lib/beacon-channels";
import { getActiveChannels } from "@/lib/admin-channels";
import { videosRecente } from "@/lib/beacon-youtube";
import { extractSignal } from "@/lib/beacon-extract";
import { startCronLog, endCronLog } from "@/lib/cron-log";

export const maxDuration = 300; // 5 min — Vercel cron Pro tier; fallback la timeout default dacă Hobby
export const dynamic = "force-dynamic";

export async function GET(req: NextRequest) {
  // Auth: header authorization sau query token
  const auth = req.headers.get("authorization");
  const token = req.nextUrl.searchParams.get("token");
  const secret = process.env.CRON_SECRET;
  if (!secret) return NextResponse.json({ error: "no secret" }, { status: 500 });
  if (auth !== `Bearer ${secret}` && token !== secret) {
    return NextResponse.json({ error: "unauthorized" }, { status: 401 });
  }

  const logId = await startCronLog("beacon-scan");
  const log: string[] = [];
  let processed = 0;
  let inserted = 0;
  let skipped = 0;

  // ?zile=N pentru a controla cutoff (default 14)
  const zile = parseInt(req.nextUrl.searchParams.get("zile") ?? "14", 10);

  const canale = await getActiveChannels().catch(() => CANALE);

  for (const canal of canale) {
    try {
      const videos = await videosRecente(canal, zile);
      log.push(`${canal.slug}: ${videos.length} relevante`);

      for (const v of videos) {
        processed++;
        // Skip dacă deja procesat
        const existing = await sql`SELECT 1 FROM fishy_beacon.signals WHERE video_id = ${v.videoId} LIMIT 1`;
        if (existing.length > 0) { skipped++; continue; }

        // Extracție LLM (fără transcript — RSS-ul nu îl include)
        const signal = await extractSignal(v.title, v.description, null);
        if (!signal || signal.relevant_score < 30) { skipped++; continue; }

        await sql`
          INSERT INTO fishy_beacon.signals (
            video_id, video_url, channel, title, upload_date, is_short,
            locatie, specii, nada, tehnica, stare_apa, vant_vreme,
            rezumat, relevant_score
          ) VALUES (
            ${v.videoId},
            ${`https://www.youtube.com/watch?v=${v.videoId}`},
            ${canal.slug},
            ${v.title},
            ${v.uploadDate},
            ${v.isShort},
            ${signal.locatie},
            ${signal.specii},
            ${signal.nada},
            ${signal.tehnica},
            ${signal.stare_apa},
            ${signal.vant_vreme},
            ${signal.rezumat},
            ${signal.relevant_score}
          )
          ON CONFLICT (video_id) DO NOTHING
        `;
        inserted++;
      }
    } catch (e) {
      log.push(`${canal.slug}: ERR ${(e as Error).message}`);
    }
  }

  const result = {
    canale: canale.length,
    processed,
    inserted,
    skipped,
    log,
  };
  await endCronLog(logId, "ok", result);
  return NextResponse.json({ ok: true, ...result });
}
