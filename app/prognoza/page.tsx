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

  // Detectare ferestre 2-5 zile cu scoruri consecutive bune
  // Threshold pe lungime: ferestrele mai lungi cer scor mediu un pic mai jos (greu să ai 5 zile la 75+)
  type Fereastra = { startIdx: number; lungime: number; avgScor: number; specii: string[] };
  const THRESHOLDS: Record<number, number> = { 5: 58, 4: 60, 3: 62, 2: 65 };
  const ferestre: Fereastra[] = [];

  // Parcurg de la fereastra cea mai LUNGĂ (mai valoroasă) la cea scurtă
  for (let len = 5; len >= 2; len--) {
    if (zile.length < len) continue;
    const threshold = THRESHOLDS[len];
    for (let i = 0; i <= zile.length - len; i++) {
      const slice = zile.slice(i, i + len);
      const avg = slice.reduce((s, z) => s + z.scorMaxim, 0) / len;
      if (avg < threshold) continue;
      // bonus: dacă toate zilele au scor >= threshold individual (consistență)
      const minScore = slice.reduce((m, z) => Math.min(m, z.scorMaxim), 100);
      if (minScore < threshold - 15) continue; // exclude ferestrele cu o zi terribilă

      // care specii rămân bune (scor >= 50) în TOATE zilele
      const speciiComune = new Set<string>();
      slice[0].scoruri.forEach((s) => {
        if (s.scor >= 50) speciiComune.add(s.specieNume);
      });
      slice.slice(1).forEach((zi) => {
        const numeBune = new Set(zi.scoruri.filter((s) => s.scor >= 50).map((s) => s.specieNume));
        speciiComune.forEach((nume) => {
          if (!numeBune.has(nume)) speciiComune.delete(nume);
        });
      });

      // Skip dacă nicio specie nu rămâne bună pe toată fereastra
      if (speciiComune.size === 0) continue;

      // Verifică suprapunere — fereastra mai SCURTĂ nu se adaugă dacă e cuprinsă în alta deja găsită (lungă)
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

  // Sortare: prioritar lungimea (5 > 4 > 3 > 2), apoi scor mediu descendent
  ferestre.sort((a, b) => {
    if (b.lungime !== a.lungime) return b.lungime - a.lungime;
    return b.avgScor - a.avgScor;
  });

  // Stats per lungime
  const ferestreStats = ferestre.reduce((acc, f) => {
    acc[f.lungime] = (acc[f.lungime] || 0) + 1;
    return acc;
  }, {} as Record<number, number>);

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
        <h1 className="text-4xl md:text-5xl font-display text-fog mb-3">Când să mergi în Deltă</h1>
        <p className="text-fog/75 max-w-3xl">
          Următoarele {zile.length} zile evaluate per specie. Scor bazat pe vreme + presiune + vânt + cotă Tulcea + faza lunii.
          Detectăm automat <strong className="text-amber-glow">ferestre de 2-5 zile consecutive</strong> cu condiții bune — sortate cu prioritate pe lungime (zile legate = partide mai serioase).
          Speciile în prohibiție pentru ziua respectivă sunt excluse automat din scor.
        </p>
      </header>

      {/* FERESTRE RECOMANDATE */}
      {ferestre.length > 0 ? (
        <section className="mb-10">
          <div className="flex items-baseline justify-between flex-wrap gap-2 mb-4">
            <h2 className="text-2xl md:text-3xl font-display text-amber-glow">
              Ferestre recomandate
              <span className="text-fog/40 text-base ml-2">({ferestre.length})</span>
            </h2>
            <div className="flex flex-wrap gap-1.5 text-xs">
              {[5, 4, 3, 2].map((len) => ferestreStats[len] ? (
                <span key={len} className={`tag ${len >= 4 ? "tag-priority" : len === 3 ? "tag-amber" : "tag-neutral"}`}>
                  {ferestreStats[len]}× {len} zile
                </span>
              ) : null)}
            </div>
          </div>
          <div className="space-y-3">
            {ferestre.slice(0, 6).map((f, i) => {
              const slice = zile.slice(f.startIdx, f.startIdx + f.lungime);
              const isLong = f.lungime >= 4;
              return (
                <div key={i} className={`card-hero rounded-xl p-5 ${isLong ? "ring-1 ring-amber-glow/40" : ""}`}>
                  <div className="flex items-baseline justify-between mb-3 flex-wrap gap-2">
                    <div>
                      <p className="text-xs uppercase tracking-widest text-amber-glow mb-1 flex items-center gap-2">
                        {f.lungime} zile consecutive
                        {f.lungime >= 4 && (
                          <span className="tag tag-priority normal-case tracking-normal">partidă serioasă</span>
                        )}
                        {f.lungime === 5 && (
                          <span className="text-emerald-400 text-base">★</span>
                        )}
                      </p>
                      <h3 className="text-xl md:text-2xl font-display text-fog">
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
                        <p className="text-xs text-fog/75">{dataScurta(zi.date)}</p>
                        <p className={`text-lg font-light ${scoreColor(zi.scorMaxim)}`}>{zi.scorMaxim}</p>
                      </div>
                    ))}
                  </div>
                </div>
              );
            })}
          </div>
        </section>
      ) : (
        <section className="mb-10">
          <div className="card rounded-xl p-5">
            <p className="text-fog/75 text-sm">
              Nu există ferestre de 2+ zile cu condiții consecutive bune în următoarele 14 zile. Verifică zilele individuale mai jos —
              chiar și o singură zi cu scor 70+ poate fi suficientă pentru o partidă scurtă.
            </p>
          </div>
        </section>
      )}

      {/* PROGNOZA ZI CU ZI */}
      <section className="mb-10">
        <h2 className="text-2xl md:text-3xl font-display text-amber-glow mb-4">Zi cu zi — următoarele 14 zile</h2>
        <div className="space-y-2">
          {zile.map((zi, idx) => {
            const ziLink = idx <= 13 ? `/azi?ziua=${idx}` : null;
            return (
              <div
                key={idx}
                className="card rounded-lg p-3 md:p-4"
                style={{ borderLeftColor: zi.scorMaxim >= 75 ? "#34d399" : zi.scorMaxim >= 55 ? "var(--color-amber-glow)" : "transparent", borderLeftWidth: "3px" }}
              >
                {/* Mobile: stacked layout */}
                <div className="flex md:hidden flex-col gap-2">
                  <div className="flex items-baseline justify-between">
                    <div>
                      <p className="text-sm text-fog font-display">{ziuaRO[zi.date.getDay()]} {zi.date.getDate()} {luniRO[zi.date.getMonth()]}</p>
                      <p className="text-xs text-fog/55">{zi.forecast.pressure} hPa · {zi.moon.illumination}% lună</p>
                    </div>
                    <div className="flex items-center gap-2">
                      <span className="text-2xl">{getWeatherIcon(zi.forecast.weatherCode)}</span>
                      <span className={`text-xl font-light ${scoreColor(zi.scorMaxim)}`}>{zi.scorMaxim}</span>
                    </div>
                  </div>
                  <div className="flex items-center justify-between gap-2 text-xs">
                    <span className="text-fog/75">
                      {zi.forecast.tempMax}°/{zi.forecast.tempMin}° · {zi.forecast.windMax} km/h {getWindDirection(zi.forecast.windDirection)}
                    </span>
                    {zi.topSpecie && (
                      <span>
                        <span className="text-fog/55">Top:</span>{" "}
                        <span className="text-amber-glow font-medium">{zi.topSpecie.nume}</span>
                      </span>
                    )}
                  </div>
                  <div className="flex gap-1 flex-wrap">
                    {zi.scoruri.map((s) => (
                      <span
                        key={s.specieId}
                        className={`text-[10px] px-1.5 py-0.5 rounded ${scoreBg(s.scor)} ${scoreColor(s.scor)}`}
                      >
                        {s.specieNume.slice(0, 3)} {s.scor}
                      </span>
                    ))}
                  </div>
                  {ziLink && (
                    <Link href={ziLink} className="text-xs text-moss hover:text-amber-glow self-end">
                      detalii →
                    </Link>
                  )}
                </div>

                {/* Desktop: row layout */}
                <div className="hidden md:flex items-center gap-4 flex-wrap">
                  <div className="min-w-[80px]">
                    <p className="text-sm text-fog font-display">{ziuaRO[zi.date.getDay()]}</p>
                    <p className="text-xs text-fog/55 font-mono">
                      {zi.date.getDate()} {luniRO[zi.date.getMonth()]}
                    </p>
                  </div>
                  <div className="text-2xl min-w-[40px] text-center">{getWeatherIcon(zi.forecast.weatherCode)}</div>
                  <div className="min-w-[100px]">
                    <p className="text-sm text-fog">
                      {zi.forecast.tempMax}°<span className="text-fog/40">/{zi.forecast.tempMin}°</span>
                    </p>
                    <p className="text-xs text-fog/55">
                      {zi.forecast.windMax} km/h {getWindDirection(zi.forecast.windDirection)}
                    </p>
                  </div>
                  <div className="min-w-[80px]">
                    <p className="text-xs text-fog/55">{zi.forecast.pressure} hPa</p>
                    <p className="text-xs text-fog/40">{zi.moon.illumination}% lună</p>
                  </div>
                  <div className="flex-1 min-w-[200px]">
                    {zi.topSpecie ? (
                      <p className="text-sm">
                        <span className="text-fog/55">Top:</span>{" "}
                        <span className="text-amber-glow font-medium">{zi.topSpecie.nume}</span>{" "}
                        <span className={`text-xs ${scoreColor(zi.topSpecie.scor)}`}>({zi.topSpecie.scor})</span>
                      </p>
                    ) : (
                      <p className="text-sm text-fog/40 italic">toate speciile în prohibiție</p>
                    )}
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
