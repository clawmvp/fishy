import { sql } from "./db";

export type CotaSnapshot = {
  station_slug: string;
  level_cm: number; // valoare brută; pentru Chilia "cm" e de fapt m³/s — vezi unit
  variation_cm: number | null;
  measured_at: string;
  unit: "cm" | "m3s";
};

export async function getCotaHistory(stationSlug: string, days: number = 30): Promise<CotaSnapshot[]> {
  try {
    const rows = await sql`
      SELECT station_slug, level_cm, variation_cm, measured_at, unit
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

export async function saveCotaSnapshot(
  stationSlug: string,
  levelCm: number,
  variationCm: number | null,
  measuredAt: Date | string,
  unit: "cm" | "m3s" = "cm"
): Promise<boolean> {
  try {
    const dt = typeof measuredAt === "string" ? measuredAt : measuredAt.toISOString();
    await sql`
      INSERT INTO fishy_beacon.cota_snapshots (station_slug, level_cm, variation_cm, measured_at, unit)
      VALUES (${stationSlug}, ${levelCm}, ${variationCm}, ${dt}, ${unit})
      ON CONFLICT (station_slug, measured_at) DO UPDATE SET
        level_cm = EXCLUDED.level_cm,
        variation_cm = EXCLUDED.variation_cm,
        unit = EXCLUDED.unit
    `;
    return true;
  } catch {
    return false;
  }
}
