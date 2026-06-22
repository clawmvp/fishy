import { NextRequest, NextResponse } from "next/server";
import { cookies } from "next/headers";
import { sql } from "@/lib/db";
import { createSession } from "@/lib/auth";

export const dynamic = "force-dynamic";

export async function GET(req: NextRequest) {
  const code = req.nextUrl.searchParams.get("code");
  const state = req.nextUrl.searchParams.get("state");
  const jar = await cookies();
  const expectedState = jar.get("fishy_oauth_state")?.value;

  if (!code || !state || state !== expectedState) {
    return NextResponse.redirect(new URL("/login?err=oauth-state", req.url));
  }
  jar.delete("fishy_oauth_state");

  const clientId = process.env.GOOGLE_CLIENT_ID;
  const clientSecret = process.env.GOOGLE_CLIENT_SECRET;
  if (!clientId || !clientSecret) {
    return NextResponse.redirect(new URL("/login?err=oauth-config", req.url));
  }

  const origin = new URL(req.url).origin;
  const redirect_uri = `${origin}/api/auth/google/callback`;

  // Schimb code pentru access token
  const tokenResp = await fetch("https://oauth2.googleapis.com/token", {
    method: "POST",
    headers: { "Content-Type": "application/x-www-form-urlencoded" },
    body: new URLSearchParams({
      code,
      client_id: clientId,
      client_secret: clientSecret,
      redirect_uri,
      grant_type: "authorization_code",
    }),
  });
  if (!tokenResp.ok) return NextResponse.redirect(new URL("/login?err=oauth-token", req.url));
  const tokenData = await tokenResp.json();

  // Get user info
  const userResp = await fetch("https://www.googleapis.com/oauth2/v3/userinfo", {
    headers: { Authorization: `Bearer ${tokenData.access_token}` },
  });
  if (!userResp.ok) return NextResponse.redirect(new URL("/login?err=oauth-userinfo", req.url));
  const profile = (await userResp.json()) as {
    sub: string;
    email: string;
    name: string;
    picture: string;
  };

  // Upsert user
  const existing = await sql`SELECT id, email, name FROM fishy_beacon.users WHERE google_id = ${profile.sub} OR email = ${profile.email} LIMIT 1`;
  let userId: number;
  if (existing.length > 0) {
    userId = existing[0].id;
    await sql`UPDATE fishy_beacon.users SET google_id = ${profile.sub}, name = COALESCE(name, ${profile.name}), avatar_url = ${profile.picture}, last_login = NOW() WHERE id = ${userId}`;
  } else {
    const rows = await sql`
      INSERT INTO fishy_beacon.users (email, name, google_id, avatar_url, last_login)
      VALUES (${profile.email}, ${profile.name}, ${profile.sub}, ${profile.picture}, NOW())
      RETURNING id
    `;
    userId = rows[0].id;
  }

  await createSession({ id: userId, email: profile.email, name: profile.name });
  return NextResponse.redirect(new URL("/cont", req.url));
}
