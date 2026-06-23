import { NextRequest, NextResponse } from "next/server";
import { toggleChannel, addChannel, removeChannel } from "@/lib/admin-channels";

export const dynamic = "force-dynamic";

export async function POST(req: NextRequest) {
  const body = await req.json().catch(() => ({}));
  const op = body.op as string;
  if (op === "toggle") {
    if (!body.slug || typeof body.enabled !== "boolean") return NextResponse.json({ error: "slug + enabled required" }, { status: 400 });
    await toggleChannel(body.slug, body.enabled, body.fallback);
    return NextResponse.json({ ok: true });
  }
  if (op === "add") {
    if (!body.slug || !body.channelId || !body.nume) return NextResponse.json({ error: "slug + channelId + nume required" }, { status: 400 });
    await addChannel(body.slug, body.channelId, body.nume, body.focus ?? "");
    return NextResponse.json({ ok: true });
  }
  if (op === "remove") {
    if (!body.slug) return NextResponse.json({ error: "slug required" }, { status: 400 });
    const ok = await removeChannel(body.slug);
    return NextResponse.json({ ok });
  }
  return NextResponse.json({ error: "invalid op" }, { status: 400 });
}
