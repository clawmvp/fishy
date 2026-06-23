import { sql } from "./db";

export type CronLog = {
  id: number;
  action: string;
  started_at: string;
  ended_at: string | null;
  duration_ms: number | null;
  status: "running" | "ok" | "error";
  result: Record<string, unknown> | null;
  error: string | null;
};

export async function startCronLog(action: string): Promise<number> {
  try {
    const rows = await sql`INSERT INTO fishy_beacon.cron_logs (action, status) VALUES (${action}, 'running') RETURNING id`;
    return rows[0].id as number;
  } catch {
    return 0;
  }
}

export async function endCronLog(id: number, status: "ok" | "error", result: unknown, error?: string): Promise<void> {
  if (!id) return;
  try {
    const startedRow = await sql`SELECT started_at FROM fishy_beacon.cron_logs WHERE id = ${id} LIMIT 1`;
    const duration = startedRow.length > 0 ? Date.now() - new Date(startedRow[0].started_at).getTime() : null;
    await sql`
      UPDATE fishy_beacon.cron_logs
      SET status = ${status}, result = ${JSON.stringify(result)}::jsonb,
          error = ${error ?? null}, ended_at = NOW(), duration_ms = ${duration}
      WHERE id = ${id}
    `;
  } catch {
    // swallow
  }
}

export async function listCronLogs(limit: number = 50): Promise<CronLog[]> {
  try {
    const rows = await sql`SELECT * FROM fishy_beacon.cron_logs ORDER BY started_at DESC LIMIT ${limit}`;
    return rows as CronLog[];
  } catch {
    return [];
  }
}
