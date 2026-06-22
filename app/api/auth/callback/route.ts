import { NextRequest, NextResponse } from "next/server";
import { consumeMagicToken, getOrCreateUser, createSession } from "@/lib/auth";

export const dynamic = "force-dynamic";

export async function GET(req: NextRequest) {
  const token = req.nextUrl.searchParams.get("token");
  if (!token) return NextResponse.redirect(new URL("/login?err=missing", req.url));

  const email = await consumeMagicToken(token);
  if (!email) return NextResponse.redirect(new URL("/login?err=invalid", req.url));

  const user = await getOrCreateUser(email);
  await createSession(user);
  return NextResponse.redirect(new URL("/cont", req.url));
}
