import { NextRequest, NextResponse } from "next/server";
import { updatePendingStatus } from "@/lib/insights-pending";

export const dynamic = "force-dynamic";

// Protejat de middleware.ts (matcher /api/admin/:path*, Basic Auth).
export async function POST(req: NextRequest, { params }: { params: Promise<{ id: string }> }) {
  const { id: idStr } = await params;
  const id = parseInt(idStr, 10);
  if (!id) return NextResponse.json({ error: "invalid id" }, { status: 400 });

  const body = await req.json().catch(() => ({}));
  const action = body.action as string;
  const notes = body.notes as string | undefined;

  if (action !== "accept" && action !== "reject") {
    return NextResponse.json({ error: "invalid action" }, { status: 400 });
  }

  const newStatus = action === "accept" ? "accepted" : "rejected";
  const ok = await updatePendingStatus(id, newStatus, notes);

  return NextResponse.json({ ok });
}
