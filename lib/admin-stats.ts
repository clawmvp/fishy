import { sql } from "./db";

export type AdminStats = {
  signals: { total: number; lastScannedAt: string | null; recent7d: number };
  pending: { loc: number; tehnica: number; montura: number; echipament: number; obs: number; total: number };
  accepted: { total: number };
  rejected: { total: number };
  catches: { total: number; public: number; recent7d: number };
  users: { total: number; activeLast7d: number };
  conversations: { total: number; messages: number; recent7d: number };
  cota: { lastSnapshotAt: string | null; pointsCount: number };
};

export async function getAdminStats(): Promise<AdminStats> {
  const [
    signalsCount,
    signalsLast,
    signalsRecent,
    pendingByType,
    catchesCount,
    publicCatchesCount,
    recentCatchesCount,
    usersCount,
    activeUsersCount,
    convCount,
    msgCount,
    recentConvCount,
    cotaLast,
    cotaCount,
  ] = await Promise.all([
    sql`SELECT COUNT(*) as n FROM fishy_beacon.signals`,
    sql`SELECT MAX(scanned_at) as last FROM fishy_beacon.signals`,
    sql`SELECT COUNT(*) as n FROM fishy_beacon.signals WHERE scanned_at >= NOW() - INTERVAL '7 days'`,
    sql`SELECT type, status, COUNT(*) as n FROM fishy_beacon.insights_pending GROUP BY type, status`,
    sql`SELECT COUNT(*) as n FROM fishy_beacon.catches`,
    sql`SELECT COUNT(*) as n FROM fishy_beacon.catches WHERE public = TRUE`,
    sql`SELECT COUNT(*) as n FROM fishy_beacon.catches WHERE created_at >= NOW() - INTERVAL '7 days'`,
    sql`SELECT COUNT(*) as n FROM fishy_beacon.users`,
    sql`SELECT COUNT(*) as n FROM fishy_beacon.users WHERE last_login >= NOW() - INTERVAL '7 days'`,
    sql`SELECT COUNT(*) as n FROM fishy_beacon.chat_conversations`,
    sql`SELECT COUNT(*) as n FROM fishy_beacon.chat_messages`,
    sql`SELECT COUNT(*) as n FROM fishy_beacon.chat_conversations WHERE updated_at >= NOW() - INTERVAL '7 days'`,
    sql`SELECT MAX(recorded_at) as last FROM fishy_beacon.cota_snapshots`,
    sql`SELECT COUNT(*) as n FROM fishy_beacon.cota_snapshots`,
  ]);

  const pending = { loc: 0, tehnica: 0, montura: 0, echipament: 0, obs: 0, total: 0 };
  let acceptedTotal = 0;
  let rejectedTotal = 0;
  for (const r of pendingByType as Array<{ type: string; status: string; n: string | number }>) {
    const n = Number(r.n);
    if (r.status === "pending") {
      if (r.type === "loc") pending.loc += n;
      else if (r.type === "tehnica") pending.tehnica += n;
      else if (r.type === "montura") pending.montura += n;
      else if (r.type === "echipament") pending.echipament += n;
      else if (r.type === "obs") pending.obs += n;
      pending.total += n;
    } else if (r.status === "accepted") acceptedTotal += n;
    else if (r.status === "rejected") rejectedTotal += n;
  }

  return {
    signals: {
      total: Number(signalsCount[0]?.n ?? 0),
      lastScannedAt: signalsLast[0]?.last ? new Date(signalsLast[0].last).toISOString() : null,
      recent7d: Number(signalsRecent[0]?.n ?? 0),
    },
    pending,
    accepted: { total: acceptedTotal },
    rejected: { total: rejectedTotal },
    catches: {
      total: Number(catchesCount[0]?.n ?? 0),
      public: Number(publicCatchesCount[0]?.n ?? 0),
      recent7d: Number(recentCatchesCount[0]?.n ?? 0),
    },
    users: {
      total: Number(usersCount[0]?.n ?? 0),
      activeLast7d: Number(activeUsersCount[0]?.n ?? 0),
    },
    conversations: {
      total: Number(convCount[0]?.n ?? 0),
      messages: Number(msgCount[0]?.n ?? 0),
      recent7d: Number(recentConvCount[0]?.n ?? 0),
    },
    cota: {
      lastSnapshotAt: cotaLast[0]?.last ? new Date(cotaLast[0].last).toISOString() : null,
      pointsCount: Number(cotaCount[0]?.n ?? 0),
    },
  };
}
