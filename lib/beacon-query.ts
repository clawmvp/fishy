import { sql } from "./db";
import type { BeaconSignal } from "./beacon-types";

// Semnale recente filtrate pe specie (pentru integrare în /azi)
export async function semnaleRecentePerSpecie(specie: string, limit: number = 3): Promise<BeaconSignal[]> {
  try {
    const rows = await sql`
      SELECT id, video_id, video_url, channel, title, upload_date,
             duration_sec, is_short, locatie, specii, nada, tehnica,
             stare_apa, vant_vreme, rezumat, semnale_concrete,
             scanned_at, relevant_score
      FROM fishy_beacon.signals
      WHERE ${specie} = ANY(specii)
        AND relevant_score >= 50
        AND upload_date >= CURRENT_DATE - INTERVAL '90 days'
      ORDER BY upload_date DESC NULLS LAST, relevant_score DESC
      LIMIT ${limit}
    `;
    return rows as BeaconSignal[];
  } catch {
    return [];
  }
}

export async function toateSemnalele(): Promise<BeaconSignal[]> {
  try {
    const rows = await sql`
      SELECT id, video_id, video_url, channel, title, upload_date,
             duration_sec, is_short, locatie, specii, nada, tehnica,
             stare_apa, vant_vreme, rezumat, semnale_concrete,
             scanned_at, relevant_score
      FROM fishy_beacon.signals
      WHERE relevant_score >= 30
      ORDER BY upload_date DESC NULLS LAST, scanned_at DESC
      LIMIT 200
    `;
    return rows as BeaconSignal[];
  } catch {
    return [];
  }
}
