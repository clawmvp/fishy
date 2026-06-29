import { NextRequest, NextResponse } from "next/server";
import { setFeedbackStatus } from "@/lib/feedback";

export const dynamic = "force-dynamic";

// Protejat de middleware.ts (/api/admin/:path*, Basic Auth).
export async function PATCH(req: NextRequest, { params }: { params: Promise<{ id: string }> }) {
  const { id: idStr } = await params;
  const id = parseInt(idStr, 10);
  if (!id) return NextResponse.json({ error: "invalid id" }, { status: 400 });

  const body = await req.json().catch(() => ({}));
  const status = body.status === "done" ? "done" : "new";
  const ok = await setFeedbackStatus(id, status);
  return NextResponse.json({ ok });
}
