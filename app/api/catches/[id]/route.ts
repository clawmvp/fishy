import { NextRequest, NextResponse } from "next/server";
import { getSession } from "@/lib/auth";
import { deleteCatch } from "@/lib/catches";

export const dynamic = "force-dynamic";

export async function DELETE(req: NextRequest, { params }: { params: Promise<{ id: string }> }) {
  const user = await getSession();
  if (!user) return NextResponse.json({ error: "unauthorized" }, { status: 401 });

  const { id: idStr } = await params;
  const id = parseInt(idStr, 10);
  if (!id) return NextResponse.json({ error: "invalid id" }, { status: 400 });

  const ok = await deleteCatch(user.id, id);
  return NextResponse.json({ ok });
}
