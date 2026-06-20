import Anthropic from "@anthropic-ai/sdk";
import type { ExtractedSignal } from "./beacon-types";

const client = new Anthropic();

const SYSTEM_PROMPT = `Ești un expert pescar care extrage semnale concrete de teren din videoclipuri YouTube despre pescuit în Delta Dunării și Dunăre inferioară.

Primești titlu + descriere + (opțional) transcript automat al unui video.

Returnezi STRICT JSON cu următoarea structură:
{
  "locatie": "string|null — denumire concretă cu CÂT MAI MULTE DETALII (ex: 'Brațul Chilia, km 47, în dreptul satului Pardina', 'Mila 23 pe canal Sontea', 'Lac Fortuna lângă deltă'). Extrage tot ce e menționat. Null DOAR dacă videoclipul nu spune deloc unde e.",

  "specii": ["lista tuturor speciilor menționate ca prinse SAU țintite, lowercase. Acceptabile: crap, somn, știucă, șalău, biban, avat, caras, plătică, scobar, mreană, babușcă, văduvi, somotei, cega, șalău (zander), țenușă (= sturion), morun (= sturion mare). Dacă videoclipul e despre 'crap' returnează ['crap'] chiar dacă n-a prins."],

  "nada": "string|null — momeala/nada concretă (ex: 'boilies tigernut Activ 18mm + porumb dulce', 'wobbler Salmo Slider 9cm shad', 'mămăligă + chebab + nada Squid'). Extrage chiar și menționări incomplete. Null DACĂ NU spune nimic despre nadă.",

  "tehnica": "string|null — tehnica concretă (ex: 'method feeder 30g cu sleeve', 'clonc nocturn la fund', 'jigging vertical pe șenal 4m', 'spinning shallow lansat la stuf'). Acceptabile inclusiv generice: 'crap clasic la fund', 'plută', 'spinning'. Null DACĂ nu menționează nimic.",

  "stare_apa": "string|null — orice menționare despre apă (ex: 'tulbure post-furtună', 'clară 1.5m vizibilitate', 'cota mare crescând', 'cota mică', 'rece 12°C', 'cu vegetație abundentă', 'fluctuație de cota'). Null DOAR dacă nu menționează apa nici un cuvânt.",

  "vant_vreme": "string|null — vânt, vreme, presiune, temperatură (ex: 'vânt SE 25 km/h dimineața', 'cald 28°C senin', 'după furtună cu front rece', 'ploaie continuă'). Null DACĂ nu menționează vremea.",

  "rezumat": "string — 1-2 propoziții cu CE e util pentru un alt pescar care planifică o partidă. Focus DOAR pe info acționabilă (cum/unde/cu ce s-a prins, ce trebuie să facă altul). IGNORĂ COMPLET povești sociale, conflicte pescari, aglomerație, drama de sat, glume cu spectatorii. NU SCRIE 'fără detalii' sau 'lipsa informații' — scoate ce ce poți, oricât de puțin.",

  "relevant_score": număr 0-100
}

CUM SCOREZI relevant_score (fii GENEROS, nu defensiv):
- 0-29: nu e despre pescuit, sau e foarte vag (un short cu 0 info)
- 30-49: video despre pescuit Delta dar fără detalii concrete (doar specia + locație generică)
- 50-69: cel puțin 2-3 informații concrete (specie + locație specifică + tehnică SAU nadă)
- 70-89: ghid solid cu locație concretă + specie + tehnică + nadă + (rezultat sau context apă/vânt)
- 90-100: tutorial complet cu toate informațiile (locație km exact, nadă cu rețetă, tehnică pas cu pas, context meteorologic, rezultate concrete)

Reguli stricte:
- Returnează DOAR JSON, fără text înainte/după, fără markdown code fence
- Folosește exact denumirile menționate, NU inventa locații
- Dacă videoclipul NU e despre pescuit Delta/Dunăre Inferioară, returnează relevant_score: 0 și restul null/[]
- Pentru SHORTS de 30-60 secunde cu un singur cap și locație, scor 50-65 e justificat dacă ai 2-3 info concrete`;

export async function extractSignal(
  title: string,
  description: string,
  transcript: string | null
): Promise<ExtractedSignal | null> {
  const userText = `Titlu: ${title}

Descriere: ${description.slice(0, 3000)}

${transcript ? `Transcript (primele 8000 caractere):\n${transcript.slice(0, 8000)}` : "Fără transcript disponibil — extrage doar din titlu+descriere."}`;

  const response = await client.messages.create({
    model: "claude-haiku-4-5-20251001",
    max_tokens: 1500,
    system: SYSTEM_PROMPT,
    messages: [{ role: "user", content: userText }],
  });

  const textBlock = response.content.find((b) => b.type === "text");
  if (!textBlock || textBlock.type !== "text") return null;

  let raw = textBlock.text.trim();
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
