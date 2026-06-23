import { sql } from "./db";

export type TopAngler = {
  user_id: number;
  name: string | null;
  nickname: string | null;
  avatar_url: string | null;
  n: number;
  kg: number;
};

export type SpeciesRecord = {
  specie: string;
  weight_kg: number;
  caught_at: string;
  user_id: number;
  name: string | null;
  nickname: string | null;
};

export async function topAnglers(limit = 10): Promise<TopAngler[]> {
  try {
    const rows = await sql`
      SELECT u.id AS user_id, u.name, u.nickname, u.avatar_url,
             COUNT(*)::int AS n, COALESCE(SUM(c.weight_kg), 0)::float AS kg
      FROM fishy_beacon.catches c
      JOIN fishy_beacon.users u ON u.id = c.user_id
      WHERE c.public = TRUE
      GROUP BY u.id, u.name, u.nickname, u.avatar_url
      ORDER BY n DESC, kg DESC
      LIMIT ${limit}
    `;
    return rows as TopAngler[];
  } catch {
    return [];
  }
}

export async function speciesRecords(): Promise<SpeciesRecord[]> {
  try {
    const rows = await sql`
      SELECT DISTINCT ON (c.specie)
             c.specie, c.weight_kg::float AS weight_kg, c.caught_at,
             u.id AS user_id, u.name, u.nickname
      FROM fishy_beacon.catches c
      JOIN fishy_beacon.users u ON u.id = c.user_id
      WHERE c.public = TRUE AND c.weight_kg IS NOT NULL
      ORDER BY c.specie, c.weight_kg DESC
    `;
    return rows as SpeciesRecord[];
  } catch {
    return [];
  }
}
