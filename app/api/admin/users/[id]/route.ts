import { NextRequest, NextResponse } from "next/server";
import { suspendUser, deleteUser } from "@/lib/admin-users";

export const dynamic = "force-dynamic";

export async function POST(req: NextRequest, { params }: { params: Promise<{ id: string }> }) {
  const { id: idStr } = await params;
  const id = parseInt(idStr, 10);
  if (!id) return NextResponse.json({ error: "invalid id" }, { status: 400 });
  const body = await req.json().catch(() => ({}));
  if (body.action === "suspend") {
    await suspendUser(id, true);
    return NextResponse.json({ ok: true });
  }
  if (body.action === "unsuspend") {
    await suspendUser(id, false);
    return NextResponse.json({ ok: true });
  }
  return NextResponse.json({ error: "invalid action" }, { status: 400 });
}

export async function DELETE(_req: NextRequest, { params }: { params: Promise<{ id: string }> }) {
  const { id: idStr } = await params;
  const id = parseInt(idStr, 10);
  if (!id) return NextResponse.json({ error: "invalid id" }, { status: 400 });
  const ok = await deleteUser(id);
  return NextResponse.json({ ok });
}
