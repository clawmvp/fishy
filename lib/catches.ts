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
  public: boolean;
  hide_exact_location: boolean;
  photos: string[];
  conditions_snapshot: Record<string, unknown> | null;
  created_at: string;
};

export type CatchWithUser = Catch & {
  user_name: string | null;
  user_nickname: string | null;
  user_avatar: string | null;
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

export async function listPublicCatches(limit: number = 50): Promise<CatchWithUser[]> {
  const rows = await sql`
    SELECT c.*, u.name as user_name, u.nickname as user_nickname, u.avatar_url as user_avatar
    FROM fishy_beacon.catches c
    JOIN fishy_beacon.users u ON u.id = c.user_id
    WHERE c.public = TRUE
    ORDER BY c.caught_at DESC
    LIMIT ${limit}
  `;
  return rows as CatchWithUser[];
}

export async function insertCatch(userId: number, c: Omit<Catch, "id" | "user_id" | "created_at">): Promise<number> {
  const rows = await sql`
    INSERT INTO fishy_beacon.catches (
      user_id, specie, weight_kg, length_cm, locatie_slug, locatie_text,
      lat, lng, caught_at, nada, tehnica, note, released, public, hide_exact_location, photos, conditions_snapshot
    ) VALUES (
      ${userId}, ${c.specie}, ${c.weight_kg}, ${c.length_cm},
      ${c.locatie_slug}, ${c.locatie_text}, ${c.lat}, ${c.lng},
      ${c.caught_at}, ${c.nada}, ${c.tehnica}, ${c.note}, ${c.released},
      ${c.public}, ${c.hide_exact_location}, ${JSON.stringify(c.photos ?? [])},
      ${c.conditions_snapshot ? JSON.stringify(c.conditions_snapshot) : null}
    )
    RETURNING id
  `;
  return rows[0].id as number;
}

export async function deleteCatch(userId: number, id: number): Promise<boolean> {
  const rows = await sql`DELETE FROM fishy_beacon.catches WHERE user_id = ${userId} AND id = ${id} RETURNING id`;
  return rows.length > 0;
}

export type CatchEdit = {
  specie: string;
  weight_kg: number | null;
  length_cm: number | null;
  locatie_slug: string | null;
  locatie_text: string | null;
  caught_at: string;
  nada: string | null;
  tehnica: string | null;
  note: string | null;
  released: boolean;
  public: boolean;
  hide_exact_location: boolean;
};

export async function updateCatch(userId: number, id: number, c: CatchEdit): Promise<boolean> {
  const rows = await sql`
    UPDATE fishy_beacon.catches SET
      specie = ${c.specie}, weight_kg = ${c.weight_kg}, length_cm = ${c.length_cm},
      locatie_slug = ${c.locatie_slug}, locatie_text = ${c.locatie_text},
      caught_at = ${c.caught_at}, nada = ${c.nada}, tehnica = ${c.tehnica},
      note = ${c.note}, released = ${c.released}, public = ${c.public},
      hide_exact_location = ${c.hide_exact_location}
    WHERE user_id = ${userId} AND id = ${id}
    RETURNING id
  `;
  return rows.length > 0;
}

// Captură publică (pentru share — fără auth). Doar dacă public = TRUE.
export async function getPublicCatch(id: number): Promise<CatchWithUser | null> {
  const rows = await sql`
    SELECT c.*, u.name as user_name, u.nickname as user_nickname, u.avatar_url as user_avatar
    FROM fishy_beacon.catches c
    JOIN fishy_beacon.users u ON u.id = c.user_id
    WHERE c.id = ${id} AND c.public = TRUE
    LIMIT 1
  `;
  return (rows[0] as CatchWithUser) ?? null;
}

export type CatchStats = {
  total: number;
  totalKg: number;
  bigest: { specie: string; weight_kg: number; caught_at: string } | null;
  perSpecie: Record<string, { count: number; kgTotal: number; bigest: number }>;
  perLuna: Record<string, number>;
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
