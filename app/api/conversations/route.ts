import { NextResponse } from "next/server";
import { getSession } from "@/lib/auth";
import { listConversations } from "@/lib/chat-storage";

export const dynamic = "force-dynamic";

export async function GET() {
  const user = await getSession();
  if (!user) return NextResponse.json({ error: "unauthorized" }, { status: 401 });
  const conversations = await listConversations(user.id, 30);
  return NextResponse.json({ conversations });
}
