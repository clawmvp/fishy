import { sql } from "./db";

export type Catch = {
  id: number;
  user_id: number;
  specie: string;
  weight_kg: number | null;
  length_cm: number | null;
  locatie_slug: string | null;
  locatie_text: string | null;
  lat: number | null;
  lng: number | null;
  caught_at: string;
  nada: string | null;
  tehnica: string | null;
  note: string | null;
  released: boolean;
  created_at: string;
};

export async function listCatches(userId: number): Promise<Catch[]> {
  const rows = await sql`
    SELECT * FROM fishy_beacon.catches
    WHERE user_id = ${userId}
    ORDER BY caught_at DESC
  `;
  return rows as Catch[];
}

export async function getCatch(userId: number, id: number): Promise<Catch | null> {
  const rows = await sql`SELECT * FROM fishy_beacon.catches WHERE user_id = ${userId} AND id = ${id} LIMIT 1`;
  return (rows[0] as Catch) ?? null;
}

export async function insertCatch(userId: number, c: Omit<Catch, "id" | "user_id" | "created_at">): Promise<number> {
  const rows = await sql`
    INSERT INTO fishy_beacon.catches (
      user_id, specie, weight_kg, length_cm, locatie_slug, locatie_text,
      lat, lng, caught_at, nada, tehnica, note, released
    ) VALUES (
      ${userId}, ${c.specie}, ${c.weight_kg}, ${c.length_cm},
      ${c.locatie_slug}, ${c.locatie_text}, ${c.lat}, ${c.lng},
      ${c.caught_at}, ${c.nada}, ${c.tehnica}, ${c.note}, ${c.released}
    )
    RETURNING id
  `;
  return rows[0].id as number;
}

export async function deleteCatch(userId: number, id: number): Promise<boolean> {
  const rows = await sql`DELETE FROM fishy_beacon.catches WHERE user_id = ${userId} AND id = ${id} RETURNING id`;
  return rows.length > 0;
}

export type CatchStats = {
  total: number;
  totalKg: number;
  bigest: { specie: string; weight_kg: number; caught_at: string } | null;
  perSpecie: Record<string, { count: number; kgTotal: number; bigest: number }>;
  perLuna: Record<string, number>; // YYYY-MM → count
  topLocuri: Array<{ locatie: string; count: number }>;
};

export async function getStats(userId: number): Promise<CatchStats> {
  const rows = await sql`SELECT specie, weight_kg, locatie_slug, locatie_text, caught_at FROM fishy_beacon.catches WHERE user_id = ${userId}`;
  const catches = rows as Array<{ specie: string; weight_kg: number | null; locatie_slug: string | null; locatie_text: string | null; caught_at: string }>;

  let total = 0, totalKg = 0;
  let bigest: CatchStats["bigest"] = null;
  const perSpecie: CatchStats["perSpecie"] = {};
  const perLuna: CatchStats["perLuna"] = {};
  const locCount = new Map<string, number>();

  for (const c of catches) {
    total++;
    const kg = c.weight_kg ?? 0;
    totalKg += kg;
    if (bigest === null || kg > bigest.weight_kg) {
      bigest = { specie: c.specie, weight_kg: kg, caught_at: c.caught_at };
    }
    if (!perSpecie[c.specie]) perSpecie[c.specie] = { count: 0, kgTotal: 0, bigest: 0 };
    perSpecie[c.specie].count++;
    perSpecie[c.specie].kgTotal += kg;
    if (kg > perSpecie[c.specie].bigest) perSpecie[c.specie].bigest = kg;

    const ymd = new Date(c.caught_at);
    const ym = `${ymd.getUTCFullYear()}-${String(ymd.getUTCMonth() + 1).padStart(2, "0")}`;
    perLuna[ym] = (perLuna[ym] ?? 0) + 1;

    const loc = c.locatie_slug ?? c.locatie_text ?? "—";
    locCount.set(loc, (locCount.get(loc) ?? 0) + 1);
  }

  const topLocuri = [...locCount.entries()]
    .sort((a, b) => b[1] - a[1])
    .slice(0, 5)
    .map(([locatie, count]) => ({ locatie, count }));

  return { total, totalKg: Math.round(totalKg * 10) / 10, bigest, perSpecie, perLuna, topLocuri };
}
