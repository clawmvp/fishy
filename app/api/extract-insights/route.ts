import { NextRequest, NextResponse } from "next/server";
import Anthropic from "@anthropic-ai/sdk";
import { sql } from "@/lib/db";
import { insertPending, alreadyProcessed } from "@/lib/insights-pending";
import { locuri } from "@/data/locuri";
import { tehnici } from "@/data/tehnici";
import { monturi } from "@/data/monturi";
import { echipament } from "@/data/echipament";

export const dynamic = "force-dynamic";
export const maxDuration = 300;

const client = new Anthropic();

// Slugs deja existente — comparat în prompt
const locuriSlugs = locuri.map((l) => l.slug);
const tehniciSlugs = tehnici.map((t) => t.slug);
const monturiSlugs = monturi.map((m) => m.slug);
const echipamentNames = echipament.map((e) => e.nume);

const SYSTEM = `Ești un expert pescar care extrage cunoștințe NOI din semnale YouTube despre pescuit în Delta Dunării.

Primești titlu + descriere + un rezumat structurat extras anterior dintr-un videoclip de pescuit (locație, specii, nadă, tehnică, stare apă, vânt).

LOCURI deja cunoscute (slug): ${locuriSlugs.join(", ")}
TEHNICI deja cunoscute (slug): ${tehniciSlugs.join(", ")}
MONTURI deja cunoscute (slug): ${monturiSlugs.join(", ")}
ECHIPAMENT deja cunoscut (nume): ${echipamentNames.slice(0, 80).join(", ")}${echipamentNames.length > 80 ? ` ... (+${echipamentNames.length - 80})` : ""}

Extrage DOAR cunoștințe care NU sunt deja în liste:

{
  "locuri_noi": [
    { "nume": "...", "tip": "brat|canal|lac|rau|balastiera", "scurt": "...", "caracteristici": ["3-6 sfaturi"], "sfaturi": ["2-4"], "pericole": ["1-3"], "specii": ["crap","somn",...], "sezon": ["luni"], "confidence": 0-100 }
  ],
  "tehnici_noi": [
    { "nume": "...", "specie": "crap|stiuca|salau|avat|biban|somn", "metoda": "static|spinning|feeder", "scurt": "1-2 propoziții", "perioada": "ex: 'Noiembrie, apă 8-13°C'", "pasi": ["4-6 pași concreți"], "echipament": ["3-6 cu specs"], "sfaturi": ["2-4"], "confidence": 0-100 }
  ],
  "monturi_noi": [
    { "nume": "...", "specie": "crap|...", "scurt": "...", "components": [{"item":"...","spec":"...","nota":"..."}], "pasi": ["3-5"], "sfaturi": ["2-4"], "luni": [1-12], "confidence": 0-100 }
  ],
  "echipament_noi": [
    { "nume": "...", "marca": "...", "specific": "ex: '2.7m / 70-300g'", "pret": "ex: '~500 RON'", "prioritate": "must|nice|expert", "pentru": ["crap","stiuca",...], "categoria": "lanseta|mulineta|fir|naluca|boilies|nada|montura|carlige|accesorii|somn-specific|barci|motoare|sonare", "note": "1-2 propoziții cu de ce e bun", "confidence": 0-100 }
  ],
  "observatii": [
    { "txt": "insight teren neîncadrabil în categoriile de mai sus, ex 'Cota Tulcea scăzută în noiembrie a deplasat crapul spre brațul Chilia'", "confidence": 0-100 }
  ]
}

Reguli stricte:
- Returnează DOAR JSON, fără markdown
- "confidence": 90-100 = ghid complet replicabil; 70-89 = info clară dar incomplet; 50-69 = info parțială; <50 = NU includem
- NU inventa, NU duplica entries existente
- Specii valide pentru tehnici/monturi: crap, stiuca, salau, avat, biban, somn (fără caras)
- Dacă semnalul e prea slab, întoarce arrays goale`;

export async function GET(req: NextRequest) {
  const auth = req.headers.get("authorization");
  const token = req.nextUrl.searchParams.get("token");
  const secret = process.env.CRON_SECRET;
  if (!secret) return NextResponse.json({ error: "no secret" }, { status: 500 });
  if (auth !== `Bearer ${secret}` && token !== secret) {
    return NextResponse.json({ error: "unauthorized" }, { status: 401 });
  }

  // ?zile=N (default 7); ?min=N (default 60)
  const zile = parseInt(req.nextUrl.searchParams.get("zile") ?? "7", 10);
  const minScore = parseInt(req.nextUrl.searchParams.get("min") ?? "60", 10);

  // Find recent signals not yet processed for insights
  const signals = await sql`
    SELECT s.video_id, s.video_url, s.title, s.channel,
           s.locatie, s.specii, s.nada, s.tehnica, s.stare_apa, s.vant_vreme, s.rezumat, s.relevant_score
    FROM fishy_beacon.signals s
    WHERE s.relevant_score >= ${minScore}
      AND s.upload_date >= CURRENT_DATE - (${zile} || ' days')::INTERVAL
      AND NOT EXISTS (
        SELECT 1 FROM fishy_beacon.insights_pending p WHERE p.source_video_id = s.video_id
      )
    ORDER BY s.relevant_score DESC, s.upload_date DESC
    LIMIT 12
  `;

  let totalLocuri = 0, totalTehnici = 0, totalMonturi = 0, totalEchip = 0, totalObs = 0;
  const log: { vid: string; locuri: number; tehnici: number; monturi: number; echipament: number; obs: number; err?: string }[] = [];

  for (const sig of signals as Array<Record<string, unknown>>) {
    const vid = sig.video_id as string;
    if (await alreadyProcessed(vid)) continue;

    const userText = `Titlu: ${sig.title}

Sursă: ${sig.channel}
Scor relevanță: ${sig.relevant_score}/100

Date extrase anterior:
- Locație: ${sig.locatie ?? "—"}
- Specii: ${Array.isArray(sig.specii) ? (sig.specii as string[]).join(", ") : "—"}
- Nadă: ${sig.nada ?? "—"}
- Tehnică: ${sig.tehnica ?? "—"}
- Stare apă: ${sig.stare_apa ?? "—"}
- Vânt/vreme: ${sig.vant_vreme ?? "—"}
- Rezumat: ${sig.rezumat ?? "—"}`;

    try {
      const resp = await client.messages.create({
        model: "claude-opus-4-7",
        max_tokens: 4000,
        system: SYSTEM,
        messages: [{ role: "user", content: userText }],
      });
      const block = resp.content.find((b) => b.type === "text");
      if (!block || block.type !== "text") continue;
      let raw = block.text.trim();
      if (raw.startsWith("```")) raw = raw.replace(/^```(json)?\n?/, "").replace(/```\s*$/, "").trim();

      const parsed = JSON.parse(raw) as {
        locuri_noi?: Array<{ confidence?: number } & Record<string, unknown>>;
        tehnici_noi?: Array<{ confidence?: number } & Record<string, unknown>>;
        monturi_noi?: Array<{ confidence?: number } & Record<string, unknown>>;
        echipament_noi?: Array<{ confidence?: number } & Record<string, unknown>>;
        observatii?: Array<{ txt: string; confidence?: number }>;
      };

      const items: Parameters<typeof insertPending>[0] = [];
      (parsed.locuri_noi ?? []).filter((x) => (x.confidence ?? 0) >= 50).forEach((p) => {
        items.push({ type: "loc", payload: p, source_video_id: vid, source_title: sig.title as string, source_url: sig.video_url as string, confidence: p.confidence ?? 50 });
      });
      (parsed.tehnici_noi ?? []).filter((x) => (x.confidence ?? 0) >= 50).forEach((p) => {
        items.push({ type: "tehnica", payload: p, source_video_id: vid, source_title: sig.title as string, source_url: sig.video_url as string, confidence: p.confidence ?? 50 });
      });
      (parsed.monturi_noi ?? []).filter((x) => (x.confidence ?? 0) >= 50).forEach((p) => {
        items.push({ type: "montura", payload: p, source_video_id: vid, source_title: sig.title as string, source_url: sig.video_url as string, confidence: p.confidence ?? 50 });
      });
      (parsed.echipament_noi ?? []).filter((x) => (x.confidence ?? 0) >= 50).forEach((p) => {
        items.push({ type: "echipament", payload: p, source_video_id: vid, source_title: sig.title as string, source_url: sig.video_url as string, confidence: p.confidence ?? 50 });
      });
      (parsed.observatii ?? []).filter((x) => (x.confidence ?? 0) >= 60).forEach((p) => {
        items.push({ type: "obs", payload: p, source_video_id: vid, source_title: sig.title as string, source_url: sig.video_url as string, confidence: p.confidence ?? 60 });
      });

      await insertPending(items);
      const c = {
        l: (parsed.locuri_noi ?? []).length,
        t: (parsed.tehnici_noi ?? []).length,
        m: (parsed.monturi_noi ?? []).length,
        e: (parsed.echipament_noi ?? []).length,
        o: (parsed.observatii ?? []).length,
      };
      totalLocuri += c.l; totalTehnici += c.t; totalMonturi += c.m; totalEchip += c.e; totalObs += c.o;
      log.push({ vid, locuri: c.l, tehnici: c.t, monturi: c.m, echipament: c.e, obs: c.o });
    } catch (e) {
      log.push({ vid, locuri: 0, tehnici: 0, monturi: 0, echipament: 0, obs: 0, err: (e as Error).message.slice(0, 100) });
    }
  }

  return NextResponse.json({
    ok: true,
    signals_processed: signals.length,
    totals: { locuri: totalLocuri, tehnici: totalTehnici, monturi: totalMonturi, echipament: totalEchip, obs: totalObs },
    log,
  });
}
