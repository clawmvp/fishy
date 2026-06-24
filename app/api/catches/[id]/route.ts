import { NextRequest, NextResponse } from "next/server";
import { getSession, getActiveSession } from "@/lib/auth";
import { deleteCatch, updateCatch } from "@/lib/catches";

export const dynamic = "force-dynamic";

export async function DELETE(req: NextRequest, { params }: { params: Promise<{ id: string }> }) {
  const user = await getSession();
  if (!user) return NextResponse.json({ error: "unauthorized" }, { status: 401 });

  const { id: idStr } = await params;
  const id = parseInt(idStr, 10);
  if (!id) return NextResponse.json({ error: "invalid id" }, { status: 400 });

  const ok = await deleteCatch(user.id, id);
  return NextResponse.json({ ok });
}

export async function PATCH(req: NextRequest, { params }: { params: Promise<{ id: string }> }) {
  const user = await getActiveSession();
  if (!user) return NextResponse.json({ error: "unauthorized" }, { status: 401 });

  const { id: idStr } = await params;
  const id = parseInt(idStr, 10);
  if (!id) return NextResponse.json({ error: "invalid id" }, { status: 400 });

  const b = await req.json().catch(() => null);
  if (!b || typeof b.specie !== "string" || !b.caught_at) {
    return NextResponse.json({ error: "date invalide" }, { status: 400 });
  }

  const ok = await updateCatch(user.id, id, {
    specie: b.specie,
    weight_kg: b.weight_kg ?? null,
    length_cm: b.length_cm ?? null,
    locatie_slug: b.locatie_slug || null,
    locatie_text: b.locatie_text || null,
    caught_at: b.caught_at,
    nada: b.nada || null,
    tehnica: b.tehnica || null,
    note: b.note || null,
    released: !!b.released,
    public: !!b.public,
    hide_exact_location: b.hide_exact_location !== false,
  });
  return NextResponse.json({ ok });
}
