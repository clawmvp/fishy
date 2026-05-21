import Link from "next/link";
import { fetchWeather, getWeatherIcon, getWindDirection } from "@/lib/weather";
import type { DailyForecast } from "@/lib/weather";
import { getMoonPhase } from "@/lib/moon";
import { DANUBE_STATIONS, HIDRO_IDS, classifyLevel, getLevelLabel, getLevelFishingImpact } from "@/lib/water-level";
import type { WaterLevelReading } from "@/lib/water-level";
import { specii, isInProhibitie } from "@/data/specii";
import { calculeazaScor } from "@/lib/recomandari";

export const dynamic = "force-dynamic";
export const revalidate = 1800;

const REF_LAT = 45.211;
const REF_LON = 29.131;

let hidroCache: { html: string; expires: number } | null = null;

async function fetchHidroHtml(): Promise<string | null> {
  if (hidroCache && hidroCache.expires > Date.now()) return hidroCache.html;
  try {
    const controller = new AbortController();
    const timeoutId = setTimeout(() => controller.abort(), 8000);
    const res = await fetch("https://www.hidro.ro/", {
      headers: { "User-Agent": "Mozilla/5.0 (compatible; fishy.n01.app/1.0)" },
      next: { revalidate: 3600 },
      signal: controller.signal,
    }).finally(() => clearTimeout(timeoutId));
    if (!res.ok) return null;
    const html = await res.text();
    hidroCache = { html, expires: Date.now() + 30 * 60 * 1000 };
    return html;
  } catch { return null; }
}

async function getWaterLevel(stationSlug: string): Promise<WaterLevelReading | null> {
  try {
    const station = DANUBE_STATIONS.find((s) => s.slug === stationSlug);
    const hidroId = HIDRO_IDS[stationSlug];
    if (!station || !hidroId) return null;
    const html = await fetchHidroHtml();
    if (!html) return null;
    const idStr = String(hidroId);
    const idx = html.indexOf(`"${idStr}":{`);
    if (idx === -1) return null;
    const start = html.indexOf("{", idx);
    let depth = 0;
    let end = start;
    for (let i = start; i < html.length; i++) {
      if (html[i] === "{") depth++;
      else if (html[i] === "}") {
        depth--;
        if (depth === 0) { end = i + 1; break; }
      }
    }
    const jsonStr = html.slice(start, end);
    let data: Record<string, unknown>;
    try { data = JSON.parse(jsonStr); } catch { return null; }
    const text1 = String(data.TEXT1 || "");
    const levelMatch = text1.match(/H=\s*(-?\d+)/);
    if (!levelMatch) return null;
    const level = parseInt(levelMatch[1]);
    const text2 = String(data.TEXT2 || "");
    const varMatch = text2.match(/=\s*(-?\d+)/);
    const variation = varMatch ? parseInt(varMatch[1]) : 0;
    const date = String(data.DATA || "").split(" ")[0] || "";
    const trend: "rising" | "falling" | "stable" = variation > 2 ? "rising" : variation < -2 ? "falling" : "stable";
    const relativeLevel = classifyLevel(level, station);
    return {
      station, level, variation, waterTemp: null, date,
      forecast24h: null, forecast48h: null, forecast72h: null,
      trend, relativeLevel,
      fishingImpact: getLevelFishingImpact(relativeLevel),
    };
  } catch { return null; }
}

type ZiPrognoza = {
  date: Date;
  forecast: DailyForecast;
  moon: ReturnType<typeof getMoonPhase>;
  scoruri: Array<{ specieId: string; specieNume: string; scor: number }>;
  scorMaxim: number;
  topSpecie: { nume: string; scor: number } | null;
};

export default async function PrognozaPage() {
  const baseDate = new Date();
  baseDate.setHours(12, 0, 0, 0);

  let forecasts: DailyForecast[] = [];
  try {
    forecasts = await fetchWeather(REF_LAT, REF_LON, 14);
  } catch {
    forecasts = [];
  }

  const waterTulcea = await getWaterLevel("tulcea");

  // Per zi: calculate scoruri
  const zile: ZiPrognoza[] = forecasts.map((f, idx) => {
    const date = new Date(baseDate);
    date.setDate(baseDate.getDate() + idx);
    const moon = getMoonPhase(date);
    const scoruri = specii
      .map((sp) => {
        if (isInProhibitie(sp, date)) return null;
        const s = calculeazaScor(sp, f, moon, waterTulcea, date);
        return { specieId: sp.id, specieNume: sp.nume, scor: s.total };
      })
      .filter(Boolean) as Array<{ specieId: string; specieNume: string; scor: number }>;
    const scorMaxim = scoruri.reduce((max, s) => Math.max(max, s.scor), 0);
    const top = [...scoruri].sort((a, b) => b.scor - a.scor)[0];
    return {
      date,
      forecast: f,
      moon,
      scoruri,
      scorMaxim,
      topSpecie: top ? { nume: top.specieNume, scor: top.scor } : null,
    };
  });

  // Detectare ferestre 2-3 zile cu scoruri consecutive bune
  type Fereastra = { startIdx: number; lungime: number; avgScor: number; specii: string[] };
  const ferestre: Fereastra[] = [];

  for (let len = 3; len >= 2; len--) {
    for (let i = 0; i <= zile.length - len; i++) {
      const slice = zile.slice(i, i + len);
      const avg = slice.reduce((s, z) => s + z.scorMaxim, 0) / len;
      if (avg >= 65) {
        // care specii sunt în peak în toate zilele?
        const speciiComune = new Set<string>();
        slice[0].scoruri.forEach((s) => {
          if (s.scor >= 55) speciiComune.add(s.specieNume);
        });
        slice.slice(1).forEach((zi) => {
          const numeBune = new Set(zi.scoruri.filter((s) => s.scor >= 55).map((s) => s.specieNume));
          speciiComune.forEach((nume) => {
            if (!numeBune.has(nume)) speciiComune.delete(nume);
          });
        });
        // verifică suprapunere — nu adaug fereastră deja cuprinsă
        const overlap = ferestre.some((f) => i >= f.startIdx && i + len <= f.startIdx + f.lungime);
        if (!overlap) {
          ferestre.push({
            startIdx: i,
            lungime: len,
            avgScor: Math.round(avg),
            specii: Array.from(speciiComune),
          });
        }
      }
    }
  }
  ferestre.sort((a, b) => b.avgScor - a.avgScor);

  const luniRO = ["ian","feb","mar","apr","mai","iun","iul","aug","sep","oct","nov","dec"];
  const ziuaRO = ["Dum","Lu","Ma","Mi","Joi","Vi","Sâm"];

  function dataScurta(d: Date) {
    return `${ziuaRO[d.getDay()]} ${d.getDate()} ${luniRO[d.getMonth()]}`;
  }

  function scoreColor(scor: number): string {
    if (scor >= 75) return "text-emerald-400";
    if (scor >= 55) return "text-amber-glow";
    if (scor >= 35) return "text-orange-400";
    return "text-red-400";
  }

  function scoreBg(scor: number): string {
    if (scor >= 75) return "bg-emerald-400/20";
    if (scor >= 55) return "bg-amber-glow/20";
    if (scor >= 35) return "bg-orange-400/15";
    return "bg-red-400/10";
  }

  return (
    <div>
      <header className="mb-8">
        <p className="text-xs uppercase tracking-[0.3em] text-moss mb-3">prognoză 14 zile</p>
        <h1 className="text-4xl font-display text-fog mb-3">Când să mergi în Deltă</h1>
        <p className="text-fog/70 max-w-3xl">
          Următoarele {zile.length} zile evaluate per specie. Scor bazat pe vreme + presiune + vânt + cotă Tulcea + faza lunii.
          Detectăm automat <strong className="text-amber-glow">ferestrele de 2-3 zile</strong> cu condiții consecutive bune — perioadele tipice de partidă.
        </p>
      </header>

      {/* FERESTRE RECOMANDATE */}
      {ferestre.length > 0 && (
        <section className="mb-10">
          <h2 className="text-2xl font-display text-amber-glow mb-4">
            Ferestre recomandate
            <span className="text-fog/40 text-base ml-2">({ferestre.length})</span>
          </h2>
          <div className="space-y-3">
            {ferestre.slice(0, 5).map((f, i) => {
              const slice = zile.slice(f.startIdx, f.startIdx + f.lungime);
              return (
                <div key={i} className="card rounded-xl p-5" style={{ background: "linear-gradient(135deg, rgba(212,166,87,0.10), rgba(107,163,104,0.05))" }}>
                  <div className="flex items-baseline justify-between mb-3 flex-wrap gap-2">
                    <div>
                      <p className="text-xs uppercase tracking-widest text-amber-glow mb-1">
                        {f.lungime} zile consecutive
                      </p>
                      <h3 className="text-xl font-display text-fog">
                        {dataScurta(slice[0].date)} → {dataScurta(slice[slice.length - 1].date)}
                      </h3>
                    </div>
                    <div className="text-right">
                      <p className={`text-2xl font-light ${scoreColor(f.avgScor)}`}>
                        {f.avgScor}<span className="text-sm text-fog/40">/100</span>
                      </p>
                      <p className={`text-xs uppercase tracking-wider ${scoreColor(f.avgScor)}`}>scor mediu</p>
                    </div>
                  </div>
                  {f.specii.length > 0 && (
                    <div>
                      <p className="text-xs uppercase tracking-widest text-moss mb-2">Specii bune pe toată fereastra</p>
                      <div className="flex flex-wrap gap-2">
                        {f.specii.map((sp) => (
                          <span key={sp} className="tag tag-amber">{sp}</span>
                        ))}
                      </div>
                    </div>
                  )}
                  <div className="mt-3 flex gap-1.5">
                    {slice.map((zi, j) => (
                      <div
                        key={j}
                        className={`flex-1 text-center rounded-md p-2 ${scoreBg(zi.scorMaxim)}`}
                      >
                        <p className="text-xs text-fog/70">{dataScurta(zi.date)}</p>
                        <p className={`text-lg font-light ${scoreColor(zi.scorMaxim)}`}>{zi.scorMaxim}</p>
                      </div>
                    ))}
                  </div>
                </div>
              );
            })}
          </div>
        </section>
      )}

      {/* PROGNOZA ZI CU ZI */}
      <section className="mb-10">
        <h2 className="text-2xl font-display text-amber-glow mb-4">Zi cu zi — următoarele 14 zile</h2>
        <div className="space-y-2">
          {zile.map((zi, idx) => {
            const ziLink = idx <= 3 ? `/azi?ziua=${idx}` : null;
            return (
              <div
                key={idx}
                className="card rounded-lg p-4"
                style={{ borderLeftColor: zi.scorMaxim >= 75 ? "#34d399" : zi.scorMaxim >= 55 ? "var(--color-amber-glow)" : "transparent", borderLeftWidth: "3px" }}
              >
                <div className="flex items-center gap-4 flex-wrap">
                  <div className="min-w-[80px]">
                    <p className="text-sm text-fog font-display">{ziuaRO[zi.date.getDay()]}</p>
                    <p className="text-xs text-fog/50 font-mono">
                      {zi.date.getDate()} {luniRO[zi.date.getMonth()]}
                    </p>
                  </div>
                  <div className="text-2xl min-w-[40px] text-center">{getWeatherIcon(zi.forecast.weatherCode)}</div>
                  <div className="min-w-[100px]">
                    <p className="text-sm text-fog">
                      {zi.forecast.tempMax}°<span className="text-fog/40">/{zi.forecast.tempMin}°</span>
                    </p>
                    <p className="text-xs text-fog/50">
                      {zi.forecast.windMax} km/h {getWindDirection(zi.forecast.windDirection)}
                    </p>
                  </div>
                  <div className="min-w-[80px]">
                    <p className="text-xs text-fog/50">{zi.forecast.pressure} hPa</p>
                    <p className="text-xs text-fog/40">{zi.moon.illumination}% lună</p>
                  </div>
                  <div className="flex-1 min-w-[200px]">
                    {zi.topSpecie ? (
                      <p className="text-sm">
                        <span className="text-fog/50">Top:</span>{" "}
                        <span className="text-amber-glow font-medium">{zi.topSpecie.nume}</span>{" "}
                        <span className={`text-xs ${scoreColor(zi.topSpecie.scor)}`}>({zi.topSpecie.scor})</span>
                      </p>
                    ) : (
                      <p className="text-sm text-fog/40 italic">toate speciile în prohibiție</p>
                    )}
                    {/* mini-grid de specii cu scoruri */}
                    <div className="flex gap-1 mt-1.5 flex-wrap">
                      {zi.scoruri.map((s) => (
                        <span
                          key={s.specieId}
                          className={`text-[10px] px-1.5 py-0.5 rounded ${scoreBg(s.scor)} ${scoreColor(s.scor)}`}
                          title={`${s.specieNume}: ${s.scor}/100`}
                        >
                          {s.specieNume.slice(0, 3)} {s.scor}
                        </span>
                      ))}
                    </div>
                  </div>
                  <div className="text-right min-w-[60px]">
                    <p className={`text-xl font-light ${scoreColor(zi.scorMaxim)}`}>{zi.scorMaxim}</p>
                    {ziLink && (
                      <Link href={ziLink} className="text-xs text-moss hover:text-amber-glow">
                        detalii →
                      </Link>
                    )}
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </section>

      {/* Legendă */}
      <section className="mb-10">
        <div className="card rounded-lg p-4">
          <p className="text-xs uppercase tracking-widest text-moss mb-3">Legendă scoruri</p>
          <div className="flex flex-wrap gap-3 text-sm">
            <span className="text-emerald-400">● 75-100 = Excelente</span>
            <span className="text-amber-glow">● 55-74 = Bune</span>
            <span className="text-orange-400">● 35-54 = Acceptabile</span>
            <span className="text-red-400">● 0-34 = Dificile</span>
          </div>
          <p className="text-xs text-fog/40 mt-3">
            Scorul ia în calcul: temperatura apei estimată (sezon + aer), presiune atmosferică + tendință, vânt, faza lunii, precipitații, cota Tulcea (pentru crap).
            Speciile în prohibiție sunt excluse automat.
          </p>
        </div>
      </section>

      <section className="mt-10 pt-6 border-t border-amber-glow/15">
        <p className="text-xs text-fog/40">
          Date: <a href="https://open-meteo.com" target="_blank" rel="noopener" className="hover:text-amber-glow">Open-Meteo</a> +{" "}
          <a href="https://www.hidro.ro/" target="_blank" rel="noopener" className="hover:text-amber-glow">hidro.ro</a>.
          Cache 30 min. Precizia prognozei scade după ziua 7 — folosește ferestrele de zilele 8-14 ca orientare, NU planificare fermă.
        </p>
      </section>
    </div>
  );
}
