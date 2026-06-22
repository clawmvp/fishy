import { sql } from "./db";
import { getStats } from "./catches";

export type PublicProfile = {
  id: number;
  email: string;
  name: string | null;
  nickname: string | null;
  bio: string | null;
  location: string | null;
  avatar_url: string | null;
  profile_public: boolean;
  created_at: string;
  display_name: string;
};

export function displayName(p: { name: string | null; nickname: string | null; email?: string }): string {
  return p.nickname || p.name || (p.email ? p.email.split("@")[0] : "pescar");
}

export async function getUserProfile(idOrSlug: string): Promise<PublicProfile | null> {
  const id = parseInt(idOrSlug, 10);
  const rows = !isNaN(id)
    ? await sql`SELECT * FROM fishy_beacon.users WHERE id = ${id} LIMIT 1`
    : await sql`SELECT * FROM fishy_beacon.users WHERE nickname = ${idOrSlug} LIMIT 1`;
  if (rows.length === 0) return null;
  const r = rows[0] as Record<string, unknown>;
  const partial = {
    id: r.id as number,
    email: r.email as string,
    name: (r.name as string) ?? null,
    nickname: (r.nickname as string) ?? null,
    bio: (r.bio as string) ?? null,
    location: (r.location as string) ?? null,
    avatar_url: (r.avatar_url as string) ?? null,
    profile_public: (r.profile_public as boolean) ?? true,
    created_at: r.created_at as string,
  };
  return { ...partial, display_name: displayName(partial) };
}

export async function getUserMiniProfile(userId: number) {
  const [profileRows, stats, recentRows] = await Promise.all([
    sql`SELECT id, email, name, nickname, avatar_url, bio FROM fishy_beacon.users WHERE id = ${userId} LIMIT 1`,
    getStats(userId),
    sql`SELECT id, specie, weight_kg, caught_at, locatie_text, locatie_slug, photos FROM fishy_beacon.catches WHERE user_id = ${userId} AND public = TRUE ORDER BY caught_at DESC LIMIT 3`,
  ]);
  if (profileRows.length === 0) return null;
  const p = profileRows[0] as Record<string, unknown>;
  return {
    id: p.id as number,
    display_name: displayName({ name: p.name as string | null, nickname: p.nickname as string | null, email: p.email as string | undefined }),
    avatar_url: (p.avatar_url as string) ?? null,
    bio: (p.bio as string) ?? null,
    stats: { total: stats.total, totalKg: stats.totalKg, specii: Object.keys(stats.perSpecie).length },
    recente: recentRows,
  };
}

export async function updateProfile(userId: number, updates: { nickname?: string | null; bio?: string | null; location?: string | null; profile_public?: boolean }) {
  const fields: string[] = [];
  const values: unknown[] = [];
  if (updates.nickname !== undefined) { fields.push(`nickname = $${values.length + 1}`); values.push(updates.nickname); }
  if (updates.bio !== undefined) { fields.push(`bio = $${values.length + 1}`); values.push(updates.bio); }
  if (updates.location !== undefined) { fields.push(`location = $${values.length + 1}`); values.push(updates.location); }
  if (updates.profile_public !== undefined) { fields.push(`profile_public = $${values.length + 1}`); values.push(updates.profile_public); }
  if (fields.length === 0) return;
  // We need to use sql tag, but simpler: separate updates
  if (updates.nickname !== undefined) await sql`UPDATE fishy_beacon.users SET nickname = ${updates.nickname} WHERE id = ${userId}`;
  if (updates.bio !== undefined) await sql`UPDATE fishy_beacon.users SET bio = ${updates.bio} WHERE id = ${userId}`;
  if (updates.location !== undefined) await sql`UPDATE fishy_beacon.users SET location = ${updates.location} WHERE id = ${userId}`;
  if (updates.profile_public !== undefined) await sql`UPDATE fishy_beacon.users SET profile_public = ${updates.profile_public} WHERE id = ${userId}`;
}

export async function isNicknameTaken(nickname: string, excludeUserId?: number): Promise<boolean> {
  const rows = excludeUserId
    ? await sql`SELECT 1 FROM fishy_beacon.users WHERE nickname = ${nickname} AND id != ${excludeUserId} LIMIT 1`
    : await sql`SELECT 1 FROM fishy_beacon.users WHERE nickname = ${nickname} LIMIT 1`;
  return rows.length > 0;
}
