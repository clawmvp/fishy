// Rate limiter in-memory, best-effort. Pe serverless protejează doar per-instanță
// caldă (nu e global) — suficient ca să frâneze abuzul evident (spam token-uri,
// flood pe chat). Pentru producție serioasă: înlocuiește cu Upstash / Vercel KV.
type Hit = { count: number; resetAt: number };
const store = new Map<string, Hit>();

/** Returnează true dacă cererea e permisă, false dacă a depășit limita. */
export function rateLimit(key: string, limit: number, windowMs: number): boolean {
  const now = Date.now();
  const hit = store.get(key);
  if (!hit || hit.resetAt < now) {
    store.set(key, { count: 1, resetAt: now + windowMs });
    return true;
  }
  if (hit.count >= limit) return false;
  hit.count++;
  return true;
}

export function clientIp(req: Request): string {
  const h = req.headers;
  return (
    h.get("x-forwarded-for")?.split(",")[0]?.trim() ||
    h.get("x-real-ip") ||
    "unknown"
  );
}
