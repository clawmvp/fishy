import { NextRequest, NextResponse } from "next/server";
import { Resend } from "resend";
import { generateMagicToken, saveMagicToken } from "@/lib/auth";
import { rateLimit, clientIp } from "@/lib/rate-limit";

export const dynamic = "force-dynamic";

export async function POST(req: NextRequest) {
  if (!rateLimit(`login:${clientIp(req)}`, 5, 10 * 60 * 1000)) {
    return NextResponse.json({ error: "Prea multe încercări. Reîncearcă în câteva minute." }, { status: 429 });
  }
  const body = await req.json().catch(() => ({}));
  const email = (body.email as string)?.trim().toLowerCase();
  if (!email || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
    return NextResponse.json({ error: "Email invalid" }, { status: 400 });
  }

  const token = generateMagicToken();
  await saveMagicToken(token, email, 15);

  const origin = new URL(req.url).origin;
  const magicLink = `${origin}/api/auth/callback?token=${encodeURIComponent(token)}`;

  if (!process.env.RESEND_API_KEY) {
    return NextResponse.json({ error: "RESEND_API_KEY lipsește" }, { status: 500 });
  }

  const resend = new Resend(process.env.RESEND_API_KEY);
  const from = process.env.RESEND_FROM || "fishy.n01.app <noreply@n01.app>";
  try {
    // Resend NU aruncă pe eroare de API — întoarce { data, error }. Trebuie verificat.
    const { data, error } = await resend.emails.send({
      from,
      to: email,
      subject: "🎣 Conectează-te la fishy",
      html: `
        <div style="font-family: system-ui, sans-serif; max-width: 480px; margin: 0 auto; padding: 24px; background: #0d1b1e; color: #e8e5d9;">
          <h1 style="color: #d4a657; font-size: 22px;">Conectare fishy.n01.app</h1>
          <p>Apasă pe link pentru a te conecta. Valabil 15 minute.</p>
          <p style="margin: 24px 0;">
            <a href="${magicLink}" style="background: #d4a657; color: #0d1b1e; padding: 12px 24px; border-radius: 6px; text-decoration: none; font-weight: 600;">Conectează-te →</a>
          </p>
          <p style="font-size: 12px; color: #888;">Dacă nu ai cerut tu conectarea, ignoră emailul.</p>
        </div>
      `,
    });
    if (error) {
      return NextResponse.json({ error: "Email send failed", details: error.message, name: error.name }, { status: 502 });
    }
    return NextResponse.json({ ok: true, message: "Verifică emailul", id: data?.id });
  } catch (e) {
    return NextResponse.json({ error: "Email send exception", details: (e as Error).message }, { status: 500 });
  }
}
