import { NextRequest, NextResponse } from "next/server";

export const dynamic = "force-dynamic";
export const maxDuration = 300;

const ALLOWED = {
  "beacon-scan": "/api/beacon-scan",
  "extract-insights": "/api/extract-insights",
  "cota-snapshot": "/api/cota-snapshot",
} as const;

type Action = keyof typeof ALLOWED;

export async function POST(req: NextRequest) {
  const body = await req.json().catch(() => ({}));
  const action = body.action as Action;
  if (!action || !(action in ALLOWED)) {
    return NextResponse.json({ error: "invalid action" }, { status: 400 });
  }

  const secret = process.env.CRON_SECRET;
  if (!secret) return NextResponse.json({ error: "CRON_SECRET missing" }, { status: 500 });

  const origin = new URL(req.url).origin;
  const params = new URLSearchParams({ token: secret });
  if (typeof body.zile === "number") params.set("zile", String(body.zile));
  if (typeof body.min === "number") params.set("min", String(body.min));

  const target = `${origin}${ALLOWED[action]}?${params.toString()}`;

  try {
    const resp = await fetch(target, { method: "GET" });
    const data = await resp.json().catch(() => ({}));
    return NextResponse.json({ ok: true, action, result: data, http: resp.status });
  } catch (e) {
    return NextResponse.json({ ok: false, error: (e as Error).message }, { status: 500 });
  }
}
