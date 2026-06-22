import { sql } from "./db";

export const VALID_EMOJIS = ["🎣", "🔥", "💪", "👏"] as const;
export type Emoji = (typeof VALID_EMOJIS)[number];

export type CatchReactionSummary = {
  catch_id: number;
  counts: Record<Emoji, number>;
  my_emojis: Emoji[];
};

export async function getReactionsForCatches(catchIds: number[], myUserId?: number): Promise<Map<number, CatchReactionSummary>> {
  if (catchIds.length === 0) return new Map();
  const rows = await sql`
    SELECT catch_id, emoji, user_id
    FROM fishy_beacon.catch_reactions
    WHERE catch_id = ANY(${catchIds}::int[])
  `;
  const map = new Map<number, CatchReactionSummary>();
  for (const id of catchIds) {
    map.set(id, { catch_id: id, counts: { "🎣": 0, "🔥": 0, "💪": 0, "👏": 0 }, my_emojis: [] });
  }
  for (const r of rows as Array<{ catch_id: number; emoji: Emoji; user_id: number }>) {
    const summary = map.get(r.catch_id)!;
    if (VALID_EMOJIS.includes(r.emoji)) summary.counts[r.emoji]++;
    if (myUserId && r.user_id === myUserId) summary.my_emojis.push(r.emoji);
  }
  return map;
}

export async function toggleReaction(userId: number, catchId: number, emoji: Emoji): Promise<{ added: boolean; counts: Record<Emoji, number> }> {
  const existing = await sql`SELECT id FROM fishy_beacon.catch_reactions WHERE catch_id = ${catchId} AND user_id = ${userId} AND emoji = ${emoji} LIMIT 1`;
  let added: boolean;
  if (existing.length > 0) {
    await sql`DELETE FROM fishy_beacon.catch_reactions WHERE id = ${existing[0].id}`;
    added = false;
  } else {
    await sql`INSERT INTO fishy_beacon.catch_reactions (catch_id, user_id, emoji) VALUES (${catchId}, ${userId}, ${emoji}) ON CONFLICT DO NOTHING`;
    added = true;
  }
  const summary = await getReactionsForCatches([catchId]);
  return { added, counts: summary.get(catchId)!.counts };
}
