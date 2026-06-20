import Anthropic from "@anthropic-ai/sdk";
import type { ExtractedSignal } from "./beacon-types";

const client = new Anthropic();

const SYSTEM_PROMPT = `Ești un asistent care extrage semnale concrete de teren din videoclipuri de pescuit în Delta Dunării.

Primești titlu + descriere + (opțional) transcript automat al unui video.

Returnezi STRICT JSON cu următoarea structură:
{
  "locatie": "string|null — denumire concretă (ex: Brațul Chilia, Mila 23, Canal Sontea, Lac Fortuna). Null dacă nu e clar.",
  "specii": ["array de specii prinse — ex: 'crap','somn','știucă','șalău','biban','avat'. [] dacă nu e clar."],
  "nada": "string|null — ce momeală/nadă a folosit (ex: 'boilies tigernut + porumb', 'wobbler 9cm', 'mămăligă'). Null dacă nu e clar.",
  "tehnica": "string|null — tehnică concretă (ex: 'method feeder', 'clonc nocturn', 'jigging vertical', 'spinning shallow'). Null dacă nu e clar.",
  "stare_apa": "string|null — cum descrie apa (ex: 'tulbure', 'clară', 'cota mare', 'cota mică', 'cu vegetație'). Null dacă nu menționează.",
  "vant_vreme": "string|null — vânt, vreme, presiune menționate (ex: 'vânt SE 25 km/h', 'cald 28°C', 'după furtună'). Null dacă nu menționează.",
  "rezumat": "string — 1-2 propoziții cu CE e relevant pentru un alt pescar care planifică o partidă (focus pe semnale practice de teren). IGNORĂ COMPLET: povești sociale, conflicte cu pescari, aglomerație, drama de sat — focus DOAR pe info acționabilă (locație, specie, nadă, tehnică, cota, vânt). Nu spune 'fără detalii' — scrie ce e relevant pentru altcineva.",
  "relevant_score": 0-100 (0 = irelevant pentru semnale teren, 100 = ghid complet cu locație+specie+nadă+rezultat)
}

Reguli stricte:
- DOAR JSON, fără text înainte/după
- Folosește exact denumirile menționate, NU inventa
- Specii — listă din: crap, somn, știucă, șalău, biban, avat, caras, plătică, scobar, mreană, sturion (interzis), babușcă, văduvi, somotei, cega
- Dacă videoclipul NU e despre pescuit Delta/Dunăre, returnează relevant_score: 0`;

export async function extractSignal(
  title: string,
  description: string,
  transcript: string | null
): Promise<ExtractedSignal | null> {
  const userText = `Titlu: ${title}

Descriere: ${description.slice(0, 2000)}

${transcript ? `Transcript (primele 6000 caractere):\n${transcript.slice(0, 6000)}` : "Fără transcript disponibil."}`;

  const response = await client.messages.create({
    model: "claude-haiku-4-5-20251001",
    max_tokens: 1024,
    system: SYSTEM_PROMPT,
    messages: [{ role: "user", content: userText }],
  });

  const textBlock = response.content.find((b) => b.type === "text");
  if (!textBlock || textBlock.type !== "text") return null;

  let raw = textBlock.text.trim();
  // Strip markdown code fences if present
  if (raw.startsWith("```")) {
    raw = raw.replace(/^```(json)?\n?/, "").replace(/```\s*$/, "").trim();
  }

  try {
    const parsed = JSON.parse(raw);
    return {
      locatie: parsed.locatie ?? null,
      specii: Array.isArray(parsed.specii) ? parsed.specii : [],
      nada: parsed.nada ?? null,
      tehnica: parsed.tehnica ?? null,
      stare_apa: parsed.stare_apa ?? null,
      vant_vreme: parsed.vant_vreme ?? null,
      rezumat: parsed.rezumat ?? "",
      relevant_score: typeof parsed.relevant_score === "number" ? parsed.relevant_score : 0,
    };
  } catch {
    return null;
  }
}
