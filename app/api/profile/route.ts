import { NextRequest, NextResponse } from "next/server";
import { getSession } from "@/lib/auth";
import { isNicknameTaken, updateProfile } from "@/lib/profile";

export const dynamic = "force-dynamic";

export async function PATCH(req: NextRequest) {
  const user = await getSession();
  if (!user) return NextResponse.json({ error: "unauthorized" }, { status: 401 });

  const body = await req.json().catch(() => ({}));
  const updates: Parameters<typeof updateProfile>[1] = {};
  if (typeof body.nickname === "string") {
    const nick = body.nickname.trim();
    if (nick && !/^[a-zA-Z0-9_-]{3,30}$/.test(nick)) {
      return NextResponse.json({ error: "Nickname: 3-30 caractere alfanumerice, _ sau -" }, { status: 400 });
    }
    if (nick) {
      if (await isNicknameTaken(nick, user.id)) {
        return NextResponse.json({ error: "Nickname-ul e luat" }, { status: 400 });
      }
    }
    updates.nickname = nick || null;
  }
  if (typeof body.bio === "string") updates.bio = body.bio.trim().slice(0, 500) || null;
  if (typeof body.location === "string") updates.location = body.location.trim().slice(0, 100) || null;
  if (typeof body.profile_public === "boolean") updates.profile_public = body.profile_public;

  await updateProfile(user.id, updates);
  return NextResponse.json({ ok: true });
}
