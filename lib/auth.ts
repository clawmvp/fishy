import { SignJWT, jwtVerify } from "jose";
import { cookies } from "next/headers";
import { sql } from "./db";
import crypto from "crypto";

const COOKIE_NAME = "fishy_session";
const COOKIE_MAX_AGE = 60 * 60 * 24 * 30; // 30 days

function getSecret(): Uint8Array {
  const secret = process.env.AUTH_SECRET;
  if (!secret) throw new Error("AUTH_SECRET not set");
  return new TextEncoder().encode(secret);
}

export type SessionUser = {
  id: number;
  email: string;
  name: string | null;
};

export async function getSession(): Promise<SessionUser | null> {
  try {
    const jar = await cookies();
    const token = jar.get(COOKIE_NAME)?.value;
    if (!token) return null;
    const { payload } = await jwtVerify(token, getSecret());
    return {
      id: payload.uid as number,
      email: payload.email as string,
      name: (payload.name as string) ?? null,
    };
  } catch {
    return null;
  }
}

// Ca getSession, dar respinge userii suspendați (verifică în DB). Pentru
// acțiuni de scriere (chat, capturi, upload). Fail-open dacă DB pică (suspendarea e rară).
export async function getActiveSession(): Promise<SessionUser | null> {
  const user = await getSession();
  if (!user) return null;
  try {
    const rows = await sql`
      SELECT COALESCE(suspended, FALSE) AS suspended
      FROM fishy_beacon.users WHERE id = ${user.id} LIMIT 1
    `;
    if (rows.length === 0 || rows[0].suspended) return null;
  } catch {
    return user;
  }
  return user;
}

export async function createSession(user: SessionUser): Promise<void> {
  const token = await new SignJWT({ uid: user.id, email: user.email, name: user.name })
    .setProtectedHeader({ alg: "HS256" })
    .setIssuedAt()
    .setExpirationTime("30d")
    .sign(getSecret());
  const jar = await cookies();
  jar.set(COOKIE_NAME, token, {
    httpOnly: true,
    secure: true,
    sameSite: "lax",
    path: "/",
    maxAge: COOKIE_MAX_AGE,
  });
}

export async function destroySession(): Promise<void> {
  const jar = await cookies();
  jar.delete(COOKIE_NAME);
}

export function generateMagicToken(): string {
  return crypto.randomBytes(32).toString("base64url");
}

export async function saveMagicToken(token: string, email: string, expiresInMinutes: number = 15): Promise<void> {
  const expires = new Date(Date.now() + expiresInMinutes * 60 * 1000);
  await sql`
    INSERT INTO fishy_beacon.auth_tokens (token, email, expires_at)
    VALUES (${token}, ${email}, ${expires.toISOString()})
  `;
}

export async function consumeMagicToken(token: string): Promise<string | null> {
  try {
    const rows = await sql`
      UPDATE fishy_beacon.auth_tokens
      SET used = TRUE
      WHERE token = ${token}
        AND used = FALSE
        AND expires_at > NOW()
      RETURNING email
    `;
    if (rows.length === 0) return null;
    return rows[0].email as string;
  } catch {
    return null;
  }
}

export async function getOrCreateUser(email: string, name?: string): Promise<SessionUser> {
  const existing = await sql`SELECT id, email, name FROM fishy_beacon.users WHERE email = ${email} LIMIT 1`;
  if (existing.length > 0) {
    await sql`UPDATE fishy_beacon.users SET last_login = NOW() WHERE id = ${existing[0].id}`;
    return existing[0] as SessionUser;
  }
  const rows = await sql`
    INSERT INTO fishy_beacon.users (email, name, last_login)
    VALUES (${email}, ${name ?? null}, NOW())
    RETURNING id, email, name
  `;
  return rows[0] as SessionUser;
}
