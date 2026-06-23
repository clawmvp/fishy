import { NextRequest, NextResponse } from "next/server";
import { updatePendingStatus } from "@/lib/insights-pending";

export const dynamic = "force-dynamic";

export async function POST(req: NextRequest) {
  const body = await req.json().catch(() => ({}));
  const ids = body.ids as number[];
  const action = body.action as string;
  if (!Array.isArray(ids) || ids.length === 0) return NextResponse.json({ error: "ids required" }, { status: 400 });
  if (action !== "accept" && action !== "reject") return NextResponse.json({ error: "invalid action" }, { status: 400 });
  const status = action === "accept" ? "accepted" : "rejected";
  let updated = 0;
  for (const id of ids) {
    const ok = await updatePendingStatus(id, status);
    if (ok) updated++;
  }
  return NextResponse.json({ ok: true, updated });
}
