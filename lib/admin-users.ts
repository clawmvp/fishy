import { sql } from "./db";

export type AdminUser = {
  id: number;
  email: string;
  name: string | null;
  nickname: string | null;
  avatar_url: string | null;
  suspended: boolean;
  created_at: string;
  last_login: string | null;
  catches_count: number;
  conversations_count: number;
};

export async function listUsers(limit: number = 100): Promise<AdminUser[]> {
  const rows = await sql`
    SELECT u.id, u.email, u.name, u.nickname, u.avatar_url,
           COALESCE(u.suspended, FALSE) as suspended,
           u.created_at, u.last_login,
           (SELECT COUNT(*) FROM fishy_beacon.catches WHERE user_id = u.id) as catches_count,
           (SELECT COUNT(*) FROM fishy_beacon.chat_conversations WHERE user_id = u.id) as conversations_count
    FROM fishy_beacon.users u
    ORDER BY u.last_login DESC NULLS LAST, u.created_at DESC
    LIMIT ${limit}
  `;
  return rows as AdminUser[];
}

export async function suspendUser(id: number, suspended: boolean): Promise<void> {
  await sql`UPDATE fishy_beacon.users SET suspended = ${suspended} WHERE id = ${id}`;
}

export async function deleteUser(id: number): Promise<boolean> {
  const rows = await sql`DELETE FROM fishy_beacon.users WHERE id = ${id} RETURNING id`;
  return rows.length > 0;
}
