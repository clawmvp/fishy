// Live context pentru fishy chat — datele dinamice de pe site (cota, vremea, patterns active, semnale recente)
import { fetchWeather, getWindDirection } from "./weather";
import { getMoonPhase } from "./moon";
import { getWaterLevel } from "./conditii-live";
import { getCotaHistory } from "./cota-history";
import { getChiliaDebit } from "./chilia-debit";
import { toateSemnalele } from "./beacon-query";
import { calculeazaScor } from "./recomandari";
import { specii, isInProhibitie } from "@/data/specii";

const REF_LAT = 45.211;
const REF_LON = 29.131;

const monthNamesRO = ["ianuarie","februarie","martie","aprilie","mai","iunie","iulie","august","septembrie","octombrie","noiembrie","decembrie"];

let cachedContext: { text: string; expires: number } | null = null;
const CACHE_TTL_MS = 5 * 60 * 1000; // 5 minute

export async function buildLiveContext(): Promise<string> {
  if (cachedContext && cachedContext.expires > Date.now()) return cachedContext.text;

  const now = new Date();
  const moon = getMoonPhase(now);

  const [forecasts, waterTulcea, waterIsaccea, chiliaDebit, cotaHistory, semnaleAll] = await Promise.all([
    fetchWeather(REF_LAT, REF_LON, 3).catch(() => []),
    getWaterLevel("tulcea"),
    getWaterLevel("isaccea"),
    getChiliaDebit(),
    getCotaHistory("tulcea", 7),
    toateSemnalele().catch(() => []),
  ]);

  const today = forecasts[0];

  // Active patterns + scoring per specie
  const scoruriPerSpecie: Array<{ specie: string; scor: number; verdict: string; motiv: string; patterns: string[] }> = [];
  const allPatternsMap = new Map<string, { nume: string; descriere: string; bonus: number; species: string[] }>();

  if (today) {
    for (const sp of specii) {
      if (isInProhibitie(sp, now)) continue;
      const scor = calculeazaScor(sp, today, moon, waterTulcea, now, [], cotaHistory);
      scoruriPerSpecie.push({
        specie: sp.nume,
        scor: scor.total,
        verdict: scor.semantic.verdict,
        motiv: scor.semantic.motiv,
        patterns: scor.patterns.map((p) => p.nume),
      });
      for (const p of scor.patterns) {
        const exist = allPatternsMap.get(p.id);
        if (exist) exist.species.push(sp.nume);
        else allPatternsMap.set(p.id, { nume: p.nume, descriere: p.descriere, bonus: p.bonus, species: [sp.nume] });
      }
    }
  }

  const topScoring = [...scoruriPerSpecie].sort((a, b) => b.scor - a.scor).slice(0, 4);

  const patternsActiveStr = allPatternsMap.size > 0
    ? [...allPatternsMap.values()].map((p) => {
        const bonusPct = Math.round((p.bonus - 1) * 100);
        return `- **${p.nume}** (${bonusPct >= 0 ? "+" : ""}${bonusPct}%, pt: ${p.species.join(", ")}): ${p.descriere}`;
      }).join("\n")
    : "Niciun pattern activ azi.";

  const semnaleStr = semnaleAll.slice(0, 5)
    .map((s) => {
      const days = Math.floor((Date.now() - new Date(s.upload_date ?? s.scanned_at).getTime()) / (24 * 60 * 60 * 1000));
      const ago = days === 0 ? "azi" : days === 1 ? "ieri" : `${days}z`;
      return `- [${ago}] ${(s.specii ?? []).join(",") || "?"} la ${s.locatie ?? "?"} — ${(s.rezumat ?? "").slice(0, 180)} (sursă: ${s.channel}, video: ${s.video_url})`;
    }).join("\n") || "Niciun semnal recent.";

  const dateStr = `${now.getDate()} ${monthNamesRO[now.getMonth()]} ${now.getFullYear()}`;

  const ctx = `## DATE LIVE — situația ACUM (${dateStr})

### Cote apă
- **Cota Tulcea**: ${waterTulcea?.level ?? "?"} cm (${waterTulcea?.trend === "rising" ? "în creștere" : waterTulcea?.trend === "falling" ? "în scădere" : "stabilă"})
- **Cota Isaccea**: ${waterIsaccea?.level ?? "?"} cm (lead indicator amonte 32km — prevede Tulcea 12-24h)
- **Debit Brațul Chilia**: ${chiliaDebit.todayM3s ?? "?"} m³/s

### Vremea & condiții
- **Mila 23**: ${today?.tempMax ?? "?"}°/${today?.tempMin ?? "?"}°C, vânt ${today?.windMax ?? "?"} km/h ${today ? getWindDirection(today.windDirection) : ""}
- **Presiune**: ${today?.pressure ?? "?"} hPa, ${today?.pressureTrend === "rising" ? "în creștere" : today?.pressureTrend === "falling" ? "în scădere" : "stabilă"}
- **Apă estimată**: ${today?.waterTempDeep != null ? Math.round(today.waterTempDeep) + "°C adânc" : "?"}
- **Precipitații azi**: ${today?.precipitation ?? 0} mm
- **Luna**: ${moon.illumination}% (${moon.phase})

### Patterns ACTIVE astăzi
${patternsActiveStr}

### Top specii — scor + verdict pentru azi
${topScoring.map((s) => `- **${s.specie}**: ${s.scor}/100 — ${s.verdict} (${s.motiv})`).join("\n")}

### Semnale Beacon recente (ce s-a prins de pe canale YouTube)
${semnaleStr}

---

**Cum folosești datele live**: Când utilizatorul întreabă "ce să fac AZI", "unde să merg ACUM", "ce condiții sunt", folosește datele de mai sus DIRECT. Nu spune "verifică pe /azi" — datele sunt aici. Combinate cu knowledge base-ul de mai jos (locuri, tehnici, patterns), construiește răspunsuri concrete și acționabile.`;

  cachedContext = { text: ctx, expires: Date.now() + CACHE_TTL_MS };
  return ctx;
}
