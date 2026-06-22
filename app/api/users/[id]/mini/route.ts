import { NextRequest, NextResponse } from "next/server";
import { getUserMiniProfile } from "@/lib/profile";

export const dynamic = "force-dynamic";

export async function GET(_req: NextRequest, { params }: { params: Promise<{ id: string }> }) {
  const { id: idStr } = await params;
  const id = parseInt(idStr, 10);
  if (!id) return NextResponse.json({ error: "invalid id" }, { status: 400 });
  const mini = await getUserMiniProfile(id);
  if (!mini) return NextResponse.json({ error: "not found" }, { status: 404 });
  return NextResponse.json(mini);
}
