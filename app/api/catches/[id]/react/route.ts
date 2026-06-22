import { NextRequest, NextResponse } from "next/server";
import { getSession } from "@/lib/auth";
import { toggleReaction, VALID_EMOJIS, type Emoji } from "@/lib/reactions";

export const dynamic = "force-dynamic";

export async function POST(req: NextRequest, { params }: { params: Promise<{ id: string }> }) {
  const user = await getSession();
  if (!user) return NextResponse.json({ error: "unauthorized" }, { status: 401 });

  const { id: idStr } = await params;
  const catchId = parseInt(idStr, 10);
  if (!catchId) return NextResponse.json({ error: "invalid id" }, { status: 400 });

  const body = await req.json().catch(() => ({}));
  const emoji = body.emoji as string;
  if (!VALID_EMOJIS.includes(emoji as Emoji)) {
    return NextResponse.json({ error: "invalid emoji" }, { status: 400 });
  }

  const result = await toggleReaction(user.id, catchId, emoji as Emoji);
  return NextResponse.json({ ok: true, ...result });
}
