import { sql } from "./db";

export type CotaSnapshot = {
  station_slug: string;
  level_cm: number;
  variation_cm: number | null;
  measured_at: string; // ISO date
};

export async function getCotaHistory(stationSlug: string, days: number = 30): Promise<CotaSnapshot[]> {
  try {
    const rows = await sql`
      SELECT station_slug, level_cm, variation_cm, measured_at
      FROM fishy_beacon.cota_snapshots
      WHERE station_slug = ${stationSlug}
        AND measured_at >= NOW() - (${days} || ' days')::INTERVAL
      ORDER BY measured_at ASC
    `;
    return rows as CotaSnapshot[];
  } catch {
    return [];
  }
}

export async function saveCotaSnapshot(stationSlug: string, levelCm: number, variationCm: number | null, measuredAt: Date | string): Promise<boolean> {
  try {
    const dt = typeof measuredAt === "string" ? measuredAt : measuredAt.toISOString();
    await sql`
      INSERT INTO fishy_beacon.cota_snapshots (station_slug, level_cm, variation_cm, measured_at)
      VALUES (${stationSlug}, ${levelCm}, ${variationCm}, ${dt})
      ON CONFLICT (station_slug, measured_at) DO UPDATE SET
        level_cm = EXCLUDED.level_cm,
        variation_cm = EXCLUDED.variation_cm
    `;
    return true;
  } catch {
    return false;
  }
}
