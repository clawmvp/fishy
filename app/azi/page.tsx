import Link from "next/link";
import { fetchWeather, getWeatherIcon, getWindDirection, formatDate } from "@/lib/weather";
import { getMoonPhase } from "@/lib/moon";
import { DANUBE_STATIONS, HIDRO_IDS, classifyLevel, getLevelLabel, getLevelFishingImpact } from "@/lib/water-level";
import type { WaterLevelReading } from "@/lib/water-level";
import { specii, isInProhibitie, zileLaDeschidere } from "@/data/specii";
import { calculeazaScor, recomandaLocuri, recomandaTehnici, estimateWaterTemp } from "@/lib/recomandari";

export const dynamic = "force-dynamic";
export const revalidate = 1800;

// Mila 23 — punctul de referință pentru Delta
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

    // Extract entry by ID
    const idStr = String(hidroId);
    const idx = html.indexOf(`"${idStr}":{`);
    if (idx === -1) return null;

    // Read the JSON object starting after the colon
    const start = html.indexOf("{", idx);
    let depth = 0;
    let end = start;
    for (let i = start; i < html.length; i++) {
      if (html[i] === "{") depth++;
      else if (html[i] === "}") {
        depth--;
        if (depth === 0) {
          end = i + 1;
          break;
        }
      }
    }
    const jsonStr = html.slice(start, end);
    let data: Record<string, unknown>;
    try {
      data = JSON.parse(jsonStr);
    } catch {
      return null;
    }

    // TEXT1 = "H= 77 cm" — extract number
    const text1 = String(data.TEXT1 || "");
    const levelMatch = text1.match(/H=\s*(-?\d+)/);
    if (!levelMatch) return null;
    const level = parseInt(levelMatch[1]);

    // TEXT2 = "Variatie zilnica nivel = -1 cm"
    const text2 = String(data.TEXT2 || "");
    const varMatch = text2.match(/=\s*(-?\d+)/);
    const variation = varMatch ? parseInt(varMatch[1]) : 0;

    // DATA = "2026-05-19 06:00:00"
    const date = String(data.DATA || "").split(" ")[0] || "";

    const trend: "rising" | "falling" | "stable" =
      variation > 2 ? "rising" : variation < -2 ? "falling" : "stable";
    const relativeLevel = classifyLevel(level, station);

    return {
      station,
      level,
      variation,
      waterTemp: null,
      date,
      forecast24h: null,
      forecast48h: null,
      forecast72h: null,
      trend,
      relativeLevel,
      fishingImpact: getLevelFishingImpact(relativeLevel),
    };
  } catch {
    return null;
  }
}

export default async function AziPage() {
  const date = new Date();
  const moon = getMoonPhase(date);

  let forecasts: Awaited<ReturnType<typeof fetchWeather>> = [];
  try {
    forecasts = await fetchWeather(REF_LAT, REF_LON);
  } catch {
    forecasts = [];
  }
  const today = forecasts[0];

  const [waterTulcea, waterSulina] = await Promise.all([
    getWaterLevel("tulcea"),
    getWaterLevel("sulina"),
  ]);

  const scoruriSpecii = today
    ? specii.map((sp) => ({
        specie: sp,
        scor: calculeazaScor(sp, today, moon, waterTulcea, date),
        locuri: recomandaLocuri(sp, date),
        tehnici: recomandaTehnici(sp, date),
        inProhibitie: isInProhibitie(sp, date),
        zileDeschidere: isInProhibitie(sp, date) ? zileLaDeschidere(sp, date) : 0,
      }))
    : [];

  // Sort: cele MAI BUNE specii pentru azi sus
  const speciiActive = scoruriSpecii.filter((s) => !s.inProhibitie).sort((a, b) => b.scor.total - a.scor.total);
  const speciiProhibite = scoruriSpecii.filter((s) => s.inProhibitie);

  const luniRO = ["ianuarie","februarie","martie","aprilie","mai","iunie","iulie","august","septembrie","octombrie","noiembrie","decembrie"];
  const ziuaRO = ["Duminică","Luni","Marți","Miercuri","Joi","Vineri","Sâmbătă"];
  const dataLunga = `${ziuaRO[date.getDay()]}, ${date.getDate()} ${luniRO[date.getMonth()]} ${date.getFullYear()}`;

  return (
    <div>
      <header className="mb-8">
        <p className="text-xs uppercase tracking-[0.3em] text-moss mb-3">azi în Deltă</p>
        <h1 className="text-4xl font-display text-fog mb-2">{dataLunga}</h1>
        <p className="text-fog/60 text-sm">Condiții live + recomandări pe specie. Date Open-Meteo + danubealert.com + faze lunare calculate.</p>
      </header>

      {/* CONDIȚII LIVE */}
      <section className="grid md:grid-cols-2 lg:grid-cols-4 gap-3 mb-10">
        {/* Cota Tulcea */}
        {waterTulcea && (
          <div className="card rounded-xl p-4">
            <p className="text-xs uppercase tracking-widest text-moss mb-1">Cota Tulcea</p>
            <p className="text-3xl font-light text-amber-glow mb-1">
              {waterTulcea.level}<span className="text-sm text-fog/50 ml-1">cm</span>
            </p>
            <p className="text-xs text-fog/60">
              {waterTulcea.variation > 0 ? "↑" : waterTulcea.variation < 0 ? "↓" : "→"} {Math.abs(waterTulcea.variation)} cm •{" "}
              {waterTulcea.trend === "rising" ? "în creștere" : waterTulcea.trend === "falling" ? "în scădere" : "stabilă"}
            </p>
            <p className="text-xs text-amber-soft mt-1.5">{getLevelLabel(waterTulcea.relativeLevel)}</p>
            {waterTulcea.waterTemp && (
              <p className="text-xs text-fog/50 mt-1">Apă: {waterTulcea.waterTemp}°C</p>
            )}
          </div>
        )}

        {/* Cota Sulina */}
        {waterSulina && (
          <div className="card rounded-xl p-4">
            <p className="text-xs uppercase tracking-widest text-moss mb-1">Cota Sulina</p>
            <p className="text-3xl font-light text-amber-glow mb-1">
              {waterSulina.level}<span className="text-sm text-fog/50 ml-1">cm</span>
            </p>
            <p className="text-xs text-fog/60">
              {waterSulina.variation > 0 ? "↑" : waterSulina.variation < 0 ? "↓" : "→"} {Math.abs(waterSulina.variation)} cm
            </p>
            <p className="text-xs text-amber-soft mt-1.5">{getLevelLabel(waterSulina.relativeLevel)}</p>
          </div>
        )}

        {/* Vremea */}
        {today && (
          <div className="card rounded-xl p-4">
            <p className="text-xs uppercase tracking-widest text-moss mb-1">Vremea Mila 23</p>
            <p className="text-3xl font-light text-amber-glow mb-1">
              {today.tempMax}°<span className="text-sm text-fog/50 ml-1">/ {today.tempMin}°</span>
            </p>
            <p className="text-xs text-fog/60">
              Vânt {today.windMax} km/h {getWindDirection(today.windDirection)}
            </p>
            <p className="text-xs text-amber-soft mt-1.5">
              {today.pressure} hPa • {today.pressureTrend === "rising" ? "în creștere" : today.pressureTrend === "falling" ? "în scădere" : "stabilă"}
            </p>
          </div>
        )}

        {/* Luna */}
        <div className="card rounded-xl p-4">
          <p className="text-xs uppercase tracking-widest text-moss mb-1">Luna</p>
          <p className="text-3xl font-light text-amber-glow mb-1">
            {moon.illumination}<span className="text-sm text-fog/50 ml-1">% iluminată</span>
          </p>
          <p className="text-xs text-fog/60">{moon.phase}</p>
          <p className="text-xs text-amber-soft mt-1.5">
            {moon.illumination < 15 || moon.illumination > 85 ? "Activitate maximă" : moon.illumination < 40 || moon.illumination > 60 ? "Activitate bună" : "Pătrar (atenție)"}
          </p>
        </div>
      </section>

      {/* RECOMANDĂRI PE SPECIE */}
      <section className="mb-12">
        <div className="flex items-baseline justify-between mb-5">
          <h2 className="text-2xl font-display text-amber-glow">Recomandări pe specie azi</h2>
          <p className="text-xs text-fog/40">sortate după scor</p>
        </div>

        <div className="space-y-4">
          {speciiActive.map(({ specie, scor, locuri: locuriRec, tehnici: tehniciRec }) => (
            <div key={specie.id} className="card rounded-xl p-5">
              <div className="flex items-baseline justify-between mb-3 flex-wrap gap-2">
                <div>
                  <h3 className="text-xl font-display text-fog">{specie.nume}</h3>
                  <p className="text-xs text-fog/40">{specie.latin} • {specie.metoda}</p>
                </div>
                <div className="text-right">
                  <p className={`text-2xl font-light ${scor.cssColor}`}>{scor.total}<span className="text-sm text-fog/40">/100</span></p>
                  <p className={`text-xs uppercase tracking-wider ${scor.cssColor}`}>{scor.label}</p>
                </div>
              </div>

              {/* Motivele scorului */}
              <ul className="space-y-1 mb-4">
                {scor.reasons.map((r, i) => (
                  <li key={i} className="text-sm flex gap-2">
                    <span className={r.positive ? "text-moss" : "text-orange-400/70"}>{r.positive ? "+" : "−"}</span>
                    <span className="text-fog/75">{r.text}</span>
                  </li>
                ))}
              </ul>

              <p className="text-xs text-fog/50 mb-3">
                <strong className="text-fog/70">Ore optime:</strong> {specie.optimalConditions.bestTimeOfDay}
              </p>

              {/* Locuri recomandate */}
              {locuriRec.length > 0 && (
                <div className="mb-3">
                  <p className="text-xs uppercase tracking-widest text-moss mb-2">Locuri recomandate luna asta</p>
                  <div className="flex flex-wrap gap-2">
                    {locuriRec.map((l) => (
                      <Link
                        key={l.slug}
                        href={`/locuri/${l.slug}`}
                        className="text-xs px-2 py-1 rounded-md bg-water-2/50 border border-amber-glow/20 text-fog hover:border-amber-glow/50"
                      >
                        {l.nume} →
                      </Link>
                    ))}
                  </div>
                </div>
              )}

              {/* Tehnici recomandate */}
              {tehniciRec.length > 0 && (
                <div>
                  <p className="text-xs uppercase tracking-widest text-moss mb-2">Tehnici pentru perioada asta</p>
                  <div className="flex flex-wrap gap-2">
                    {tehniciRec.map((t) => (
                      <Link
                        key={t.slug}
                        href={`/tehnici/${t.slug}`}
                        className="text-xs px-2 py-1 rounded-md bg-water-2/50 border border-moss/30 text-fog hover:border-moss/60"
                      >
                        {t.titlu} →
                      </Link>
                    ))}
                  </div>
                </div>
              )}

              {locuriRec.length === 0 && tehniciRec.length === 0 && (
                <p className="text-xs text-fog/40 italic">
                  Nu am date specifice pentru luna asta pe {specie.nume}. Consultă <Link href="/tehnici" className="text-moss hover:text-amber-glow">tehnicile</Link> sau <Link href="/locuri" className="text-moss hover:text-amber-glow">locurile</Link>.
                </p>
              )}
            </div>
          ))}
        </div>
      </section>

      {/* Prohibiții */}
      {speciiProhibite.length > 0 && (
        <section className="mb-10">
          <h2 className="text-xl font-display text-red-400 mb-3">În prohibiție azi</h2>
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

      {/* Forecast 6 zile */}
      {forecasts.length > 1 && (
        <section className="mb-10">
          <h2 className="text-xl font-display text-amber-glow mb-3">Următoarele 6 zile</h2>
          <div className="grid grid-cols-3 md:grid-cols-6 gap-2">
            {forecasts.slice(1, 7).map((f, i) => {
              const waterT = estimateWaterTemp(f, new Date().getMonth() + 1);
              return (
                <div key={i} className="card rounded-lg p-3 text-center text-sm">
                  <p className="text-xs uppercase tracking-wider text-moss">{f.dayName}</p>
                  <p className="text-2xl mt-1">{getWeatherIcon(f.weatherCode)}</p>
                  <p className="text-fog mt-1">{f.tempMax}° / {f.tempMin}°</p>
                  <p className="text-xs text-fog/50 mt-1">{f.windMax} km/h {getWindDirection(f.windDirection)}</p>
                  <p className="text-xs text-amber-soft mt-1">~{waterT}°C apă</p>
                </div>
              );
            })}
          </div>
        </section>
      )}

      {/* Surse + disclaimer */}
      <section className="mt-10 pt-6 border-t border-amber-glow/15">
        <p className="text-xs text-fog/40">
          <strong className="text-fog/60">Surse:</strong>{" "}
          <a href="https://open-meteo.com" target="_blank" rel="noopener" className="hover:text-amber-glow">Open-Meteo</a> (vreme, presiune, vânt),{" "}
          <a href="https://danubealert.com/en/Romania" target="_blank" rel="noopener" className="hover:text-amber-glow">DanubeAlert</a> (cota Dunării). Faza lunii calculată local. Datele se actualizează la 30 minute.
        </p>
        <p className="text-xs text-fog/40 mt-2">
          Recomandările sunt indicative. Verifică prohibițiile oficiale la{" "}
          <a href="https://anpa.ro" target="_blank" rel="noopener" className="hover:text-amber-glow">ANPA</a>.
        </p>
      </section>
    </div>
  );
}
