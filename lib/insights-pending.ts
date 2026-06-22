import { sql } from "./db";

export type InsightPending = {
  id: number;
  type: "loc" | "tehnica" | "montura" | "obs";
  payload: Record<string, unknown>;
  source_video_id: string;
  source_title: string | null;
  source_url: string | null;
  confidence: number;
  status: "pending" | "accepted" | "rejected" | "integrated";
  created_at: string;
  reviewed_at: string | null;
  notes: string | null;
};

export async function getPending(status?: InsightPending["status"]): Promise<InsightPending[]> {
  try {
    if (status) {
      const rows = await sql`
        SELECT * FROM fishy_beacon.insights_pending
        WHERE status = ${status}
        ORDER BY confidence DESC, created_at DESC
        LIMIT 200
      `;
      return rows as InsightPending[];
    }
    const rows = await sql`
      SELECT * FROM fishy_beacon.insights_pending
      ORDER BY status, confidence DESC, created_at DESC
      LIMIT 200
    `;
    return rows as InsightPending[];
  } catch {
    return [];
  }
}

export async function updatePendingStatus(id: number, status: InsightPending["status"], notes?: string): Promise<boolean> {
  try {
    await sql`
      UPDATE fishy_beacon.insights_pending
      SET status = ${status}, reviewed_at = NOW(), notes = ${notes ?? null}
      WHERE id = ${id}
    `;
    return true;
  } catch {
    return false;
  }
}

export async function alreadyProcessed(videoId: string): Promise<boolean> {
  try {
    const rows = await sql`SELECT 1 FROM fishy_beacon.insights_pending WHERE source_video_id = ${videoId} LIMIT 1`;
    return rows.length > 0;
  } catch {
    return false;
  }
}

export async function insertPending(items: Omit<InsightPending, "id" | "status" | "created_at" | "reviewed_at" | "notes">[]): Promise<number> {
  if (items.length === 0) return 0;
  let inserted = 0;
  for (const item of items) {
    try {
      await sql`
        INSERT INTO fishy_beacon.insights_pending (type, payload, source_video_id, source_title, source_url, confidence)
        VALUES (${item.type}, ${JSON.stringify(item.payload)}, ${item.source_video_id}, ${item.source_title}, ${item.source_url}, ${item.confidence})
      `;
      inserted++;
    } catch {
      // skip on conflict/error
    }
  }
  return inserted;
}
