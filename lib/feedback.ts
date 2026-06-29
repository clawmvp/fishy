import { sql } from "./db";

export type Feedback = {
  id: number;
  user_id: number | null;
  email: string | null;
  message: string;
  context: unknown;
  page: string | null;
  status: string;
  created_at: string;
};

export type FeedbackWithUser = Feedback & {
  user_name: string | null;
  user_nickname: string | null;
};

export async function insertFeedback(f: {
  userId: number | null;
  email: string | null;
  message: string;
  context?: unknown;
  page?: string | null;
}): Promise<number> {
  const rows = await sql`
    INSERT INTO fishy_beacon.feedback (user_id, email, message, context, page)
    VALUES (${f.userId}, ${f.email}, ${f.message}, ${f.context ? JSON.stringify(f.context) : null}, ${f.page ?? null})
    RETURNING id
  `;
  return rows[0].id as number;
}

export async function listFeedback(limit = 100): Promise<FeedbackWithUser[]> {
  const rows = await sql`
    SELECT f.*, u.name AS user_name, u.nickname AS user_nickname
    FROM fishy_beacon.feedback f
    LEFT JOIN fishy_beacon.users u ON u.id = f.user_id
    ORDER BY f.created_at DESC
    LIMIT ${limit}
  `;
  return rows as FeedbackWithUser[];
}

export async function setFeedbackStatus(id: number, status: string): Promise<boolean> {
  const rows = await sql`UPDATE fishy_beacon.feedback SET status = ${status} WHERE id = ${id} RETURNING id`;
  return rows.length > 0;
}

export async function feedbackCounts(): Promise<{ new: number; total: number }> {
  try {
    const rows = await sql`
      SELECT
        COUNT(*) FILTER (WHERE status = 'new')::int AS new,
        COUNT(*)::int AS total
      FROM fishy_beacon.feedback
    `;
    return { new: rows[0].new as number, total: rows[0].total as number };
  } catch {
    return { new: 0, total: 0 };
  }
}
