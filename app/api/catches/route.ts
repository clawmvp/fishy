import { NextRequest, NextResponse } from "next/server";
import { getSession } from "@/lib/auth";
import { insertCatch } from "@/lib/catches";

export const dynamic = "force-dynamic";

export async function POST(req: NextRequest) {
  const user = await getSession();
  if (!user) return NextResponse.json({ error: "unauthorized" }, { status: 401 });

  const body = await req.json().catch(() => null);
  if (!body || !body.specie || !body.caught_at) {
    return NextResponse.json({ error: "specie + caught_at required" }, { status: 400 });
  }

  const id = await insertCatch(user.id, {
    specie: body.specie,
    weight_kg: body.weight_kg ?? null,
    length_cm: body.length_cm ?? null,
    locatie_slug: body.locatie_slug ?? null,
    locatie_text: body.locatie_text ?? null,
    lat: body.lat ?? null,
    lng: body.lng ?? null,
    caught_at: new Date(body.caught_at).toISOString(),
    nada: body.nada ?? null,
    tehnica: body.tehnica ?? null,
    note: body.note ?? null,
    released: body.released ?? true,
  });

  return NextResponse.json({ ok: true, id });
}
