import Link from "next/link";
import SpeciesIcon from "@/components/SpeciesIcon";
import { fetchWeather, getWeatherIcon, getWindDirection } from "@/lib/weather";
import type { DailyForecast } from "@/lib/weather";
import { getMoonPhase } from "@/lib/moon";
import { DANUBE_STATIONS, HIDRO_IDS, classifyLevel, getLevelLabel, getLevelFishingImpact } from "@/lib/water-level";
import type { WaterLevelReading } from "@/lib/water-level";
import { specii, isInProhibitie, zileLaDeschidere } from "@/data/specii";
import { calculeazaScor, recomandaLocuri, recomandaTehnici, recomandaMonturi, genereazaGhidSpatial, estimateWaterTemp } from "@/lib/recomandari";

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
  } catch {
    return null;
  }
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

const ORIZONT_ZILE = 14;

export default async function PartidaPage({
  searchParams,
}: {
  searchParams: Promise<{ ziua?: string }>;
}) {
  const params = await searchParams;
  const ziuaIdx = Math.max(0, Math.min(ORIZONT_ZILE - 1, parseInt(params.ziua || "0", 10) || 0));

  const baseDate = new Date();
  const targetDate = new Date(baseDate);
  targetDate.setDate(baseDate.getDate() + ziuaIdx);

  const moon = getMoonPhase(targetDate);

  let forecasts: DailyForecast[] = [];
  try {
    forecasts = await fetchWeather(REF_LAT, REF_LON, ORIZONT_ZILE);
  } catch {
    forecasts = [];
  }
  const todaysForecast = forecasts[ziuaIdx];

  const [waterTulcea, waterSulina] = await Promise.all([
    getWaterLevel("tulcea"),
    getWaterLevel("sulina"),
  ]);

  const scoruriSpecii = todaysForecast
    ? specii.map((sp) => {
        const scor = calculeazaScor(
          sp, todaysForecast, moon, waterTulcea, targetDate,
          ziuaIdx >= 3 ? [forecasts[ziuaIdx - 1], forecasts[ziuaIdx - 2], forecasts[ziuaIdx - 3]].filter(Boolean) : []
        );
        return {
          specie: sp,
          scor,
          locuri: recomandaLocuri(sp, targetDate, {
            forecast: todaysForecast,
            cota: waterTulcea?.level,
            waterTemp: todaysForecast?.waterTempDeep ?? undefined,
            patterns: scor.patterns,
            trend: scor.trend,
          }),
          ghid: genereazaGhidSpatial(sp, {
            forecast: todaysForecast,
            cota: waterTulcea?.level,
            waterTemp: todaysForecast?.waterTempDeep ?? undefined,
            patterns: scor.patterns,
            trend: scor.trend,
          }),
          tehnici: recomandaTehnici(sp, targetDate, {
            forecast: todaysForecast,
            cota: waterTulcea?.level,
            waterTemp: todaysForecast?.waterTempDeep ?? undefined,
            patterns: scor.patterns,
            trend: scor.trend,
          }),
          monturi: recomandaMonturi(sp, targetDate, {
            forecast: todaysForecast,
            cota: waterTulcea?.level,
            waterTemp: todaysForecast?.waterTempDeep ?? undefined,
            patterns: scor.patterns,
            trend: scor.trend,
          }),
          inProhibitie: isInProhibitie(sp, targetDate),
          zileDeschidere: isInProhibitie(sp, targetDate) ? zileLaDeschidere(sp, targetDate) : 0,
        };
      })
    : [];
  const speciiActive = scoruriSpecii.filter((s) => !s.inProhibitie).sort((a, b) => b.scor.total - a.scor.total);
  const speciiProhibite = scoruriSpecii.filter((s) => s.inProhibitie);

  const luniRO = ["ianuarie","februarie","martie","aprilie","mai","iunie","iulie","august","septembrie","octombrie","noiembrie","decembrie"];
  const ziuaRO = ["Duminică","Luni","Marți","Miercuri","Joi","Vineri","Sâmbătă"];
  const dataLunga = `${ziuaRO[targetDate.getDay()]}, ${targetDate.getDate()} ${luniRO[targetDate.getMonth()]} ${targetDate.getFullYear()}`;

  // Cele 14 zile pentru selector
  const ziue = Array.from({ length: ORIZONT_ZILE }, (_, offset) => {
    const d = new Date(baseDate);
    d.setDate(baseDate.getDate() + offset);
    return {
      idx: offset,
      label: offset === 0 ? "Azi" : offset === 1 ? "Mâine" : ziuaRO[d.getDay()].slice(0, 3),
      data: `${d.getDate()} ${luniRO[d.getMonth()].slice(0, 3)}`,
      forecast: forecasts[offset],
    };
  });

  return (
    <div>
      <header className="mb-6">
        <p className="text-xs uppercase tracking-[0.3em] text-moss mb-2">partidă în Deltă</p>
        <h1 className="text-3xl md:text-4xl font-display text-fog mb-1">{dataLunga}</h1>
        <p className="text-fog/55 text-sm">Prognoză {ORIZONT_ZILE} zile — alege ziua pentru recomandări detaliate. Pentru overview cu ferestre recomandate vezi <Link href="/prognoza" className="text-amber-glow hover:underline">prognoză</Link>.</p>
      </header>

      {/* SELECTOR ZIUA — scroll horizontal pe mobile, grid pe desktop */}
      <section className="mb-8" aria-label="Selectează ziua">
        <div className="md:hidden h-scroll-wrap">
          <div className="h-scroll flex gap-2 pb-2 -mx-4 px-4">
          {ziue.map((z) => {
            const isActive = z.idx === ziuaIdx;
            return (
              <Link
                key={z.idx}
                href={`/azi?ziua=${z.idx}`}
                aria-current={isActive ? "page" : undefined}
                aria-label={`${z.label} ${z.data}${z.forecast ? `, ${z.forecast.tempMax} grade, vânt ${z.forecast.windMax} km/h` : ""}`}
                className={`card rounded-lg p-3 text-center flex-shrink-0 w-[88px] transition-all focus:outline-none focus-visible:ring-2 focus-visible:ring-amber-glow ${
                  isActive ? "border-amber-glow/60 bg-water-2/70" : ""
                }`}
              >
                <p className={`text-xs uppercase tracking-wider ${isActive ? "text-amber-glow" : "text-moss"}`}>
                  {z.label}
                </p>
                <p className="text-xs text-fog/55 mb-1">{z.data}</p>
                {z.forecast && (
                  <>
                    <p className="text-xl mt-1">{getWeatherIcon(z.forecast.weatherCode)}</p>
                    <p className="text-sm text-fog font-light">
                      {z.forecast.tempMax}°<span className="text-fog/40">/{z.forecast.tempMin}°</span>
                    </p>
                    <p className="text-[10px] text-fog/55 mt-1">
                      {z.forecast.windMax} km/h
                    </p>
                  </>
                )}
              </Link>
            );
          })}
          </div>
        </div>
        <p className="md:hidden text-[10px] text-fog/55 mt-0.5 italic">→ glisează lateral pentru toate cele 14 zile</p>
        <div className="hidden md:grid md:grid-cols-7 gap-2">
          {ziue.map((z) => {
            const isActive = z.idx === ziuaIdx;
            return (
              <Link
                key={z.idx}
                href={`/azi?ziua=${z.idx}`}
                className={`card rounded-lg p-3 text-center transition-all ${
                  isActive ? "border-amber-glow/60 bg-water-2/70 scale-[1.02]" : "hover:border-amber-glow/40"
                }`}
              >
                <p className={`text-xs uppercase tracking-wider ${isActive ? "text-amber-glow" : "text-moss"}`}>
                  {z.label}
                </p>
                <p className="text-xs text-fog/55 mb-1">{z.data}</p>
                {z.forecast && (
                  <>
                    <p className="text-2xl mt-1">{getWeatherIcon(z.forecast.weatherCode)}</p>
                    <p className="text-sm text-fog font-light">
                      {z.forecast.tempMax}°<span className="text-fog/40">/{z.forecast.tempMin}°</span>
                    </p>
                    <p className="text-xs text-fog/55 mt-1">
                      {z.forecast.windMax} km/h
                    </p>
                  </>
                )}
              </Link>
            );
          })}
        </div>
      </section>

      {/* CONDIȚII LIVE */}
      <section className="grid grid-cols-2 lg:grid-cols-5 gap-3 mb-10">
        {waterTulcea && (
          <div className="card-hero rounded-xl p-4">
            <p className="text-xs uppercase tracking-widest text-moss mb-1">Cota Tulcea</p>
            <p className="text-3xl font-light text-amber-glow mb-1">
              {waterTulcea.level}<span className="text-sm text-fog/55 ml-1">cm</span>
            </p>
            <p className="text-xs text-fog/55">
              {waterTulcea.variation > 0 ? "↑" : waterTulcea.variation < 0 ? "↓" : "→"}{" "}
              {Math.abs(waterTulcea.variation)} cm •{" "}
              {waterTulcea.trend === "rising" ? "în creștere" : waterTulcea.trend === "falling" ? "în scădere" : "stabilă"}
            </p>
            <p className="text-xs text-amber-soft mt-1.5">{getLevelLabel(waterTulcea.relativeLevel)}</p>
          </div>
        )}
        {waterSulina && (
          <div className="card-hero rounded-xl p-4">
            <p className="text-xs uppercase tracking-widest text-moss mb-1">Cota Sulina</p>
            <p className="text-3xl font-light text-amber-glow mb-1">
              {waterSulina.level}<span className="text-sm text-fog/55 ml-1">cm</span>
            </p>
            <p className="text-xs text-fog/55">
              {waterSulina.variation > 0 ? "↑" : waterSulina.variation < 0 ? "↓" : "→"} {Math.abs(waterSulina.variation)} cm
            </p>
            <p className="text-xs text-amber-soft mt-1.5">{getLevelLabel(waterSulina.relativeLevel)}</p>
          </div>
        )}
        {todaysForecast && (
          <div className="card-hero rounded-xl p-4">
            <p className="text-xs uppercase tracking-widest text-moss mb-1">Vremea Mila 23</p>
            <p className="text-3xl font-light text-amber-glow mb-1">
              {todaysForecast.tempMax}°<span className="text-sm text-fog/55 ml-1">/ {todaysForecast.tempMin}°</span>
            </p>
            <p className="text-xs text-fog/55">
              Vânt {todaysForecast.windMax} km/h {getWindDirection(todaysForecast.windDirection)}
            </p>
            <p className="text-xs text-amber-soft mt-1.5">
              {todaysForecast.pressure} hPa •{" "}
              {todaysForecast.pressureTrend === "rising" ? "în creștere" : todaysForecast.pressureTrend === "falling" ? "în scădere" : "stabilă"}
            </p>
          </div>
        )}
        {todaysForecast && todaysForecast.waterTempDeep !== null && (
          <div className="card-hero rounded-xl p-4">
            <p className="text-xs uppercase tracking-widest text-moss mb-1">Apa (estimat)</p>
            <p className="text-3xl font-light text-amber-glow mb-1">
              {Math.round(todaysForecast.waterTempDeep)}<span className="text-sm text-fog/55 ml-1">°C adânc</span>
            </p>
            {todaysForecast.waterTempShallow !== null && (
              <p className="text-xs text-fog/55">
                ~{Math.round(todaysForecast.waterTempShallow)}°C la mal
              </p>
            )}
            <p className="text-xs text-amber-soft mt-1.5">
              {todaysForecast.waterTempDeep < 10
                ? "Rece — peștii apatici"
                : todaysForecast.waterTempDeep < 16
                  ? "Răcoroasă — finețe"
                  : todaysForecast.waterTempDeep < 22
                    ? "Optimă majoritate"
                    : todaysForecast.waterTempDeep < 26
                      ? "Caldă — fermentat"
                      : "Caniculă — pe adânc"}
            </p>
          </div>
        )}
        <div className="card-hero rounded-xl p-4">
          <p className="text-xs uppercase tracking-widest text-moss mb-1">Luna</p>
          <p className="text-3xl font-light text-amber-glow mb-1">
            {moon.illumination}<span className="text-sm text-fog/55 ml-1">% iluminată</span>
          </p>
          <p className="text-xs text-fog/55">{moon.phase}</p>
          <p className="text-xs text-amber-soft mt-1.5">
            {moon.illumination < 15 || moon.illumination > 85
              ? "Activitate maximă"
              : moon.illumination < 40 || moon.illumination > 60
                ? "Activitate bună"
                : "Pătrar — atenție"}
          </p>
        </div>
      </section>

      {/* RECOMANDĂRI PE SPECIE */}
      <section className="mb-12">
        <div className="flex items-baseline justify-between mb-5">
          <h2 className="text-2xl md:text-3xl font-display text-amber-glow">Recomandări pe specie</h2>
          <p className="text-xs text-fog/40">sortate după scor</p>
        </div>

        <div className="space-y-4">
          {speciiActive.map(({ specie, scor, ghid, locuri: locuriRec, tehnici: tehniciRec, monturi: monturiRec }) => (
            <div key={specie.id} className="card rounded-xl p-5">
              <div className="flex items-baseline justify-between mb-3 flex-wrap gap-2">
                <div className="flex items-baseline gap-3">
                  <span className="text-amber-soft mt-1">
                    <SpeciesIcon specie={specie.id} size={28} />
                  </span>
                  <div>
                    <h3 className="text-xl md:text-2xl font-display text-fog">{specie.nume}</h3>
                    <p className="text-xs text-fog/40">{specie.latin} • {specie.metoda}</p>
                  </div>
                </div>
                <div className="text-right">
                  <p className={`text-2xl font-light ${scor.cssColor}`}>{scor.total}<span className="text-sm text-fog/40">/100</span></p>
                  <p className={`text-xs uppercase tracking-wider ${scor.cssColor}`}>{scor.label}</p>
                </div>
              </div>

              {/* Verdict semantic — recomandare clară */}
              <div className="mb-4 p-3 rounded-lg" style={{
                background: scor.semantic.verdict === "du-te" ? "rgba(52,211,153,0.10)" :
                  scor.semantic.verdict === "du-te-scurt" ? "rgba(212,166,87,0.10)" :
                  scor.semantic.verdict === "muta-te" ? "rgba(251,146,60,0.10)" :
                  scor.semantic.verdict === "schimba-specia" ? "rgba(251,146,60,0.10)" :
                  "rgba(248,113,113,0.10)",
                border: `1px solid ${scor.semantic.verdict === "du-te" ? "rgba(52,211,153,0.3)" :
                  scor.semantic.verdict === "du-te-scurt" ? "rgba(212,166,87,0.3)" :
                  scor.semantic.verdict === "muta-te" ? "rgba(251,146,60,0.3)" :
                  scor.semantic.verdict === "schimba-specia" ? "rgba(251,146,60,0.3)" :
                  "rgba(248,113,113,0.3)"}`,
              }}>
                <div className="flex items-baseline justify-between flex-wrap gap-2 mb-1">
                  <p className={`text-sm font-semibold uppercase tracking-wide ${
                    scor.semantic.verdict === "du-te" ? "text-emerald-400" :
                    scor.semantic.verdict === "du-te-scurt" ? "text-amber-glow" :
                    scor.semantic.verdict === "muta-te" || scor.semantic.verdict === "schimba-specia" ? "text-orange-400" :
                    "text-red-400"
                  }`}>
                    {scor.semantic.verdict === "du-te" ? "✓ Du-te" :
                     scor.semantic.verdict === "du-te-scurt" ? "→ Du-te scurt" :
                     scor.semantic.verdict === "muta-te" ? "↻ Mută-te" :
                     scor.semantic.verdict === "schimba-specia" ? "🔄 Schimbă specia" :
                     "✕ Stai acasă"}
                  </p>
                  {scor.semantic.fereastra && (
                    <span className="text-xs text-fog/75 font-mono">fereastra: {scor.semantic.fereastra}</span>
                  )}
                </div>
                <p className="text-sm text-fog/85">{scor.semantic.motiv}</p>
              </div>

              {/* Ghid spațial — unde caut peștele acum */}
              {ghid && (
                <div className="mb-4 p-4 rounded-lg" style={{
                  background: "linear-gradient(135deg, rgba(212,166,87,0.06), rgba(107,163,104,0.04))",
                  border: "1px solid rgba(212,166,87,0.18)",
                }}>
                  {ghid.unde !== "—" && (
                    <>
                      <div className="flex items-baseline gap-2 mb-2">
                        <span className="text-amber-glow text-base">📍</span>
                        <div>
                          <p className="text-xs uppercase tracking-widest text-amber-glow">unde caut peștele acum</p>
                          <p className="text-base font-display text-fog mt-0.5">{ghid.unde}</p>
                        </div>
                      </div>
                      <p className="text-sm text-fog/85 leading-relaxed mb-2">
                        <strong className="text-fog">De ce: </strong>{ghid.deCe}
                      </p>
                      {ghid.evitati && (
                        <p className="text-sm text-orange-400/90 leading-relaxed mb-2">
                          <strong>Evită: </strong>{ghid.evitati}
                        </p>
                      )}
                      {ghid.detalii && ghid.detalii.length > 0 && (
                        <ul className="space-y-1 mt-2">
                          {ghid.detalii.map((d, i) => (
                            <li key={i} className="text-sm flex gap-2 text-fog/80">
                              <span className="text-amber-soft flex-shrink-0">·</span>
                              <span>{d}</span>
                            </li>
                          ))}
                        </ul>
                      )}
                    </>
                  )}

                  {/* Poziționare la vânt */}
                  {ghid.pozitionareVant && (
                    <div className={`${ghid.unde !== "—" ? "mt-3 pt-3 border-t border-amber-glow/15" : ""}`}>
                      <div className="flex items-baseline gap-2 mb-2">
                        <span className="text-base">💨</span>
                        <div>
                          <p className="text-xs uppercase tracking-widest text-amber-glow">
                            poziționare la vânt — {ghid.pozitionareVant.intensitate} {ghid.pozitionareVant.directie}
                          </p>
                          <p className="text-sm font-display text-fog mt-0.5 leading-snug">
                            {ghid.pozitionareVant.pozitie}
                          </p>
                        </div>
                      </div>
                      {ghid.pozitionareVant.detalii && ghid.pozitionareVant.detalii.length > 0 && (
                        <ul className="space-y-1 mt-2">
                          {ghid.pozitionareVant.detalii.map((d, i) => (
                            <li key={i} className="text-sm flex gap-2 text-fog/80">
                              <span className="text-amber-soft flex-shrink-0">·</span>
                              <span>{d}</span>
                            </li>
                          ))}
                        </ul>
                      )}
                    </div>
                  )}
                </div>
              )}

              {/* Patterns detectate */}
              {scor.patterns.length > 0 && (
                <div className="mb-4">
                  <p className="text-xs uppercase tracking-widest text-amber-glow mb-2">Patterns detectate</p>
                  <div className="space-y-2">
                    {scor.patterns.map((p) => (
                      <div key={p.id} className="card-hero rounded-lg p-3">
                        <div className="flex items-baseline justify-between gap-2 mb-1">
                          <p className="text-sm font-semibold text-fog">
                            <span className="mr-2">{p.emoji}</span>{p.nume}
                          </p>
                          <span className="text-xs font-mono text-amber-glow">+{Math.round((p.bonus - 1) * 100)}%</span>
                        </div>
                        <p className="text-xs text-fog/75">{p.descriere}</p>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {/* Trend awareness (lookback 3 zile) */}
              {(scor.trend.pressureStable || scor.trend.windCalm || scor.trend.fronctActivator) && (
                <div className="mb-4 flex flex-wrap gap-2">
                  {scor.trend.pressureStable && (
                    <span className="text-[11px] px-2 py-1 rounded-md bg-emerald-400/15 border border-emerald-400/30 text-emerald-400">
                      ✓ presiune stabilă 3 zile
                    </span>
                  )}
                  {scor.trend.windCalm && (
                    <span className="text-[11px] px-2 py-1 rounded-md bg-emerald-400/15 border border-emerald-400/30 text-emerald-400">
                      ✓ vânt calm 3 zile
                    </span>
                  )}
                  {scor.trend.fronctActivator && (
                    <span className="text-[11px] px-2 py-1 rounded-md bg-amber-glow/15 border border-amber-glow/30 text-amber-glow">
                      ⚡ front meteo activator
                    </span>
                  )}
                  {scor.trend.cotaTrend === "rising" && (
                    <span className="text-[11px] px-2 py-1 rounded-md bg-emerald-400/15 border border-emerald-400/30 text-emerald-400">
                      ↑ cota în creștere
                    </span>
                  )}
                </div>
              )}

              {/* Factor breakdown — arată exact cum se construiește scorul */}
              <div className="mb-4">
                <div className="flex items-baseline justify-between mb-2">
                  <p className="text-xs uppercase tracking-widest text-moss">
                    Cum se construiește scorul
                  </p>
                  <Link href="/algoritm" className="text-xs text-moss hover:text-amber-glow">
                    cum se calculează →
                  </Link>
                </div>
                <div className="space-y-1.5">
                  {scor.factors.map((f) => {
                    const barColor = f.subScore >= 75 ? "bg-emerald-400" : f.subScore >= 50 ? "bg-amber-glow" : "bg-orange-400/80";
                    return (
                      <div key={f.cheie} className="grid grid-cols-[100px_1fr_auto] md:grid-cols-[140px_1fr_auto] gap-2 items-center text-xs">
                        <div className="flex items-center gap-1.5">
                          <span className="text-fog/75 truncate">{f.label}</span>
                          <span className="text-fog/40 text-[10px]">{f.weight}%</span>
                        </div>
                        <div className="relative h-4 bg-water-2/40 rounded-sm overflow-hidden">
                          <div
                            className={`h-full ${barColor} transition-all`}
                            style={{ width: `${f.subScore}%` }}
                          />
                          <div className="absolute inset-0 flex items-center px-2">
                            <span className="text-[10px] text-fog truncate">
                              {f.detail}
                            </span>
                          </div>
                        </div>
                        <span className="text-fog/55 font-mono text-[11px] tabular-nums whitespace-nowrap">
                          +{f.contribution.toFixed(1)}
                        </span>
                      </div>
                    );
                  })}
                </div>
              </div>

              <p className="text-xs text-fog/55 mb-3">
                <strong className="text-fog/75">Ore optime:</strong> {specie.optimalConditions.bestTimeOfDay}
              </p>

              {locuriRec.length > 0 && (
                <div className="mb-3">
                  <p className="text-xs uppercase tracking-widest text-moss mb-2">Locuri recomandate</p>
                  <div className="flex flex-wrap gap-2">
                    {locuriRec.map((l) => (
                      <Link key={l.slug} href={`/locuri/${l.slug}`} className="text-xs px-2 py-1 rounded-md bg-water-2/50 border border-amber-glow/20 text-fog hover:border-amber-glow/50">
                        {l.nume} →
                      </Link>
                    ))}
                  </div>
                </div>
              )}

              {tehniciRec.length > 0 && (
                <div className="mb-3">
                  <p className="text-xs uppercase tracking-widest text-moss mb-2">Tehnici</p>
                  <div className="flex flex-wrap gap-2">
                    {tehniciRec.map((t) => (
                      <Link key={t.slug} href={`/tehnici/${t.slug}`} className="text-xs px-2 py-1 rounded-md bg-water-2/50 border border-moss/30 text-fog hover:border-moss/60">
                        {t.titlu} →
                      </Link>
                    ))}
                  </div>
                </div>
              )}

              {monturiRec.length > 0 && (
                <div>
                  <p className="text-xs uppercase tracking-widest text-moss mb-2">Monturi</p>
                  <div className="flex flex-wrap gap-2">
                    {monturiRec.map((m) => (
                      <Link key={m.slug} href={`/monturi/${m.slug}`} className="text-xs px-2 py-1 rounded-md bg-water-2/50 border border-amber-soft/40 text-fog hover:border-amber-soft/70">
                        {m.nume} →
                      </Link>
                    ))}
                  </div>
                </div>
              )}

              {locuriRec.length === 0 && tehniciRec.length === 0 && (
                <p className="text-xs text-fog/40 italic">
                  Nu am date specifice pe {specie.nume} pentru perioada asta. Consultă{" "}
                  <Link href="/tehnici" className="text-moss hover:text-amber-glow">tehnicile</Link> sau{" "}
                  <Link href="/locuri" className="text-moss hover:text-amber-glow">locurile</Link>.
                </p>
              )}
            </div>
          ))}
        </div>
      </section>

      {speciiProhibite.length > 0 && (
        <section className="mb-10">
          <div className="flex items-baseline justify-between mb-3">
            <h2 className="text-xl font-display text-red-400">În prohibiție</h2>
            <Link href="/prohibitie" className="text-xs text-moss hover:text-amber-glow">
              calendar complet →
            </Link>
          </div>
          <div className="grid md:grid-cols-2 gap-3">
            {speciiProhibite.map(({ specie, zileDeschidere }) => (
              <div key={specie.id} className="card rounded-lg p-4 border-red-400/20">
                <h3 className="text-base font-display text-fog mb-1">{specie.nume}</h3>
                <p className="text-xs text-red-400/80">Se redeschide în {zileDeschidere} zile</p>
              </div>
            ))}
          </div>
        </section>
      )}

      {todaysForecast && (
        <section className="mb-10">
          <h2 className="text-xl font-display text-amber-glow mb-3">Detalii vreme ({dataLunga.split(",")[0]})</h2>
          <div className="card rounded-lg p-5">
            <div className="grid md:grid-cols-2 gap-4 text-sm">
              <div>
                <p className="text-xs uppercase tracking-widest text-moss mb-1">Apa estimată</p>
                <p className="text-2xl text-amber-glow font-light">~{estimateWaterTemp(todaysForecast, targetDate.getMonth() + 1)}°C</p>
                <p className="text-xs text-fog/55">(temperatura aer + sezonalitate)</p>
              </div>
              <div>
                <p className="text-xs uppercase tracking-widest text-moss mb-1">Precipitații</p>
                <p className="text-2xl text-amber-glow font-light">{todaysForecast.precipitation.toFixed(1)} mm</p>
                <p className="text-xs text-fog/55">Probabilitate {todaysForecast.precipProbability}%</p>
              </div>
              <div>
                <p className="text-xs uppercase tracking-widest text-moss mb-1">Cer</p>
                <p className="text-2xl text-amber-glow font-light">{todaysForecast.cloudCover}%</p>
                <p className="text-xs text-fog/55">acoperit</p>
              </div>
              <div>
                <p className="text-xs uppercase tracking-widest text-moss mb-1">Umiditate</p>
                <p className="text-2xl text-amber-glow font-light">{todaysForecast.humidity}%</p>
              </div>
            </div>
          </div>
        </section>
      )}

      <section className="mt-10 pt-6 border-t border-amber-glow/15">
        <p className="text-xs text-fog/40">
          <strong className="text-fog/55">Surse:</strong>{" "}
          <a href="https://open-meteo.com" target="_blank" rel="noopener" className="hover:text-amber-glow">Open-Meteo</a>{" "}
          (vreme),{" "}
          <a href="https://www.hidro.ro/" target="_blank" rel="noopener" className="hover:text-amber-glow">hidro.ro</a>{" "}
          (cota Dunării — oficial RO). Faza lunii calculată local. Cache 30 min.
        </p>
        <p className="text-xs text-fog/40 mt-2">
          Verifică prohibițiile oficiale la{" "}
          <a href="https://anpa.ro" target="_blank" rel="noopener" className="hover:text-amber-glow">ANPA</a>.
        </p>
      </section>
    </div>
  );
}
