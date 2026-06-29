import { NextRequest, NextResponse } from "next/server";
import { getSession } from "@/lib/auth";
import { insertFeedback } from "@/lib/feedback";
import { rateLimit, clientIp } from "@/lib/rate-limit";

export const dynamic = "force-dynamic";

export async function POST(req: NextRequest) {
  if (!rateLimit(`feedback:${clientIp(req)}`, 10, 10 * 60 * 1000)) {
    return NextResponse.json({ error: "Prea multe mesaje. Reîncearcă mai târziu." }, { status: 429 });
  }

  const body = await req.json().catch(() => ({}));
  const message = (body.message as string)?.trim();
  if (!message || message.length < 3) {
    return NextResponse.json({ error: "Scrie un mesaj mai lung." }, { status: 400 });
  }
  if (message.length > 4000) {
    return NextResponse.json({ error: "Mesaj prea lung." }, { status: 400 });
  }

  const user = await getSession();
  const email = typeof body.email === "string" && body.email.includes("@") ? body.email.trim().toLowerCase() : null;

  await insertFeedback({
    userId: user?.id ?? null,
    email: email ?? user?.email ?? null,
    message,
    context: body.context ?? null,
    page: typeof body.page === "string" ? body.page.slice(0, 200) : null,
  });

  return NextResponse.json({ ok: true });
}
