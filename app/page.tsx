import Link from "next/link";
import { locuri } from "@/data/locuri";
import { tehnici } from "@/data/tehnici";
import { articole } from "@/data/articole";
import { glosar } from "@/data/glosar";
import { specii, isInProhibitie } from "@/data/specii";
import SpeciesIcon from "@/components/SpeciesIcon";
import { CotaTrendSparkline } from "@/components/CotaTrendSparkline";
import { fetchWeather, getWeatherIcon, getWindDirection } from "@/lib/weather";
import { getMoonPhase } from "@/lib/moon";
import { getWaterLevel } from "@/lib/conditii-live";
import { getCotaHistory } from "@/lib/cota-history";
import { toateSemnalele } from "@/lib/beacon-query";
import { calculeazaScor, estimateWaterTemp } from "@/lib/recomandari";
import { CANALE } from "@/lib/beacon-channels";

export const dynamic = "force-dynamic";
export const revalidate = 1800;

const REF_LAT = 45.211;
const REF_LON = 29.131;
const CANAL_LABEL: Record<string, string> = Object.fromEntries(CANALE.map((c) => [c.slug, c.nume]));

function timeAgo(iso: string | null): string {
  if (!iso) return "?";
  const days = Math.floor((Date.now() - new Date(iso).getTime()) / (1000 * 60 * 60 * 24));
  if (days <= 0) return "azi";
  if (days === 1) return "ieri";
  if (days < 7) return `${days} zile`;
  if (days < 30) return `${Math.floor(days / 7)} săpt`;
  return `${Math.floor(days / 30)} luni`;
}

export default async function Home() {
  const now = new Date();
  const moon = getMoonPhase(now);

  // Fetch everything in parallel
  const [forecasts, waterTulcea, waterSulina, cotaHistory, semnaleAll] = await Promise.all([
    fetchWeather(REF_LAT, REF_LON, 1).catch(() => []),
    getWaterLevel("tulcea"),
    getWaterLevel("sulina"),
    getCotaHistory("tulcea", 7),
    toateSemnalele().then((s) => s.slice(0, 6)).catch(() => []),
  ]);

  const todaysForecast = forecasts[0];

  // Calculează scoruri pe toate speciile + colectează patterns active
  const scoruri = todaysForecast
    ? specii
        .filter((sp) => !isInProhibitie(sp, now))
        .map((sp) => calculeazaScor(sp, todaysForecast, moon, waterTulcea, now, [], cotaHistory))
        .map((scor, i) => ({ specie: specii.filter((s) => !isInProhibitie(s, now))[i], scor }))
        .sort((a, b) => b.scor.total - a.scor.total)
    : [];

  // Unique patterns across species
  const patternMap = new Map<string, { id: string; nume: string; emoji: string; descriere: string; bonus: number; specii: string[] }>();
  scoruri.forEach(({ specie, scor }) => {
    scor.patterns.forEach((p) => {
      if (!patternMap.has(p.id)) patternMap.set(p.id, { ...p, specii: [specie.id] });
      else patternMap.get(p.id)!.specii.push(specie.id);
    });
  });
  const patternsActive = [...patternMap.values()];

  const stats = {
    locuri: locuri.filter((l) => l.regiune === "delta").length,
    tehnici: tehnici.length,
    articole: articole.length,
    semnale: semnaleAll.length, // doar primele 6 pentru afișare; total real e mai mare
    glosar: glosar.length,
  };

  const verdictColors: Record<string, string> = {
    "du-te": "#a8c87a",
    "du-te-scurt": "#d4a657",
    "muta-te": "#e89844",
    "schimba-specia": "#c84a3c",
    "stai-acasa": "#9bb5a3",
  };
  const verdictLabel: Record<string, string> = {
    "du-te": "du-te",
    "du-te-scurt": "scurt",
    "muta-te": "mută-te",
    "schimba-specia": "altă specie",
    "stai-acasa": "rămâi acasă",
  };

  return (
    <div>
      {/* Hero — compact */}
      <section className="pt-8 pb-6 mb-6">
        <p className="text-xs uppercase tracking-[0.3em] text-moss mb-3">glosar de teren · live</p>
        <h1 className="text-4xl md:text-5xl font-display font-light text-fog leading-tight mb-4 max-w-3xl">
          Pescuit în <span className="text-amber-glow">Delta Dunării</span> — live.
        </h1>
        <p className="text-base md:text-lg text-fog/75 max-w-2xl leading-relaxed mb-4">
          Cota Tulcea acum: <strong className="text-amber-glow">{waterTulcea?.level ?? "?"} cm</strong>.
          {todaysForecast && <> Vânt <strong className="text-fog">{todaysForecast.windMax} km/h {getWindDirection(todaysForecast.windDirection)}</strong>.</>}
          {todaysForecast?.waterTempDeep != null && <> Apa <strong className="text-fog">{Math.round(todaysForecast.waterTempDeep)}°C</strong>.</>}
          {" "}
          <Link href="/azi" className="text-amber-glow hover:text-amber-soft">vezi partida →</Link>
        </p>
        <p className="text-xs text-fog/40">
          {stats.locuri} locuri Delta · {stats.tehnici} tehnici · {tehnici.length > 0 ? `${stats.glosar} termeni` : "glosar"} · semnale teren zilnice de pe {CANALE.length} canale
        </p>
      </section>

      {/* PULSE DE AZI — big card grid */}
      <section className="mb-10">
        <div className="flex items-baseline justify-between mb-3">
          <h2 className="text-xl md:text-2xl font-display text-amber-glow">🌡️ Pulse de azi</h2>
          <span className="text-xs text-fog/40">condiții live + trend 30 zile</span>
        </div>
        <div className="grid sm:grid-cols-2 gap-3 mb-3">
          <CotaTrendSparkline stationSlug="tulcea" stationName="Tulcea" currentLevel={waterTulcea?.level} />
          <CotaTrendSparkline stationSlug="sulina" stationName="Sulina" currentLevel={waterSulina?.level} />
        </div>
        <div className="grid grid-cols-3 gap-3">
          {todaysForecast && (
            <div className="card-hero rounded-xl p-3 md:p-4">
              <p className="text-xs uppercase tracking-widest text-moss mb-1">Vremea</p>
              <p className="text-2xl md:text-3xl font-light text-amber-glow mb-1">
                {todaysForecast.tempMax}°<span className="text-sm text-fog/55">/{todaysForecast.tempMin}°</span>
              </p>
              <p className="text-xs text-fog/55">
                {getWeatherIcon(todaysForecast.weatherCode)} {todaysForecast.windMax}km/h {getWindDirection(todaysForecast.windDirection)}
              </p>
              <p className="text-xs text-amber-soft mt-1">{todaysForecast.pressure}hPa · {todaysForecast.pressureTrend === "rising" ? "↑" : todaysForecast.pressureTrend === "falling" ? "↓" : "→"}</p>
            </div>
          )}
          {todaysForecast?.waterTempDeep != null && (
            <div className="card-hero rounded-xl p-3 md:p-4">
              <p className="text-xs uppercase tracking-widest text-moss mb-1">Apa</p>
              <p className="text-2xl md:text-3xl font-light text-amber-glow mb-1">
                {Math.round(todaysForecast.waterTempDeep)}<span className="text-sm text-fog/55 ml-1">°C</span>
              </p>
              <p className="text-xs text-fog/55">adânc</p>
              <p className="text-xs text-amber-soft mt-1">
                {todaysForecast.waterTempDeep < 10 ? "rece — apatic"
                  : todaysForecast.waterTempDeep < 16 ? "răcoroasă"
                  : todaysForecast.waterTempDeep < 22 ? "optimă"
                  : todaysForecast.waterTempDeep < 26 ? "caldă"
                  : "caniculă"}
              </p>
            </div>
          )}
          <div className="card-hero rounded-xl p-3 md:p-4">
            <p className="text-xs uppercase tracking-widest text-moss mb-1">Luna</p>
            <p className="text-2xl md:text-3xl font-light text-amber-glow mb-1">
              {moon.illumination}<span className="text-sm text-fog/55 ml-1">%</span>
            </p>
            <p className="text-xs text-fog/55">{moon.phase}</p>
            <p className="text-xs text-amber-soft mt-1">
              {moon.illumination < 15 || moon.illumination > 85 ? "activitate max"
                : moon.illumination < 40 || moon.illumination > 60 ? "bună"
                : "pătrar"}
            </p>
          </div>
        </div>
      </section>

      {/* PATTERNS ACTIVE ASTĂZI */}
      {patternsActive.length > 0 && (
        <section className="mb-10">
          <div className="flex items-baseline justify-between mb-3">
            <h2 className="text-xl md:text-2xl font-display text-amber-glow">🎯 Patterns active astăzi</h2>
            <span className="text-xs text-fog/40">detectate automat</span>
          </div>
          <div className="grid md:grid-cols-2 gap-3">
            {patternsActive.map((p) => {
              const bonusPct = Math.round((p.bonus - 1) * 100);
              const isPositive = bonusPct >= 0;
              return (
                <div key={p.id} className="card rounded-lg p-4" style={{
                  background: isPositive
                    ? "linear-gradient(135deg, rgba(168,200,122,0.08), rgba(212,166,87,0.04))"
                    : "linear-gradient(135deg, rgba(232,152,68,0.10), rgba(189,78,65,0.04))",
                  borderColor: isPositive ? "rgba(168,200,122,0.30)" : "rgba(232,152,68,0.30)",
                }}>
                  <div className="flex items-baseline justify-between gap-2 mb-1">
                    <div className="flex items-baseline gap-2">
                      <span className="text-xl">{p.emoji}</span>
                      <h3 className="text-lg font-display text-fog">{p.nume}</h3>
                    </div>
                    <span className={`text-xs font-medium ${isPositive ? "text-moss" : "text-orange-400"}`}>
                      {isPositive ? "+" : ""}{bonusPct}%
                    </span>
                  </div>
                  <p className="text-sm text-fog/80 leading-relaxed mb-2">{p.descriere}</p>
                  <div className="flex items-baseline gap-1.5 flex-wrap">
                    <span className="text-xs text-fog/55">pentru:</span>
                    {p.specii.map((s) => (
                      <span key={s} className="tag">{s}</span>
                    ))}
                  </div>
                </div>
              );
            })}
          </div>
        </section>
      )}

      {/* VERDICT SPECII TOP 3 */}
      {scoruri.length > 0 && (
        <section className="mb-10">
          <div className="flex items-baseline justify-between mb-3">
            <h2 className="text-xl md:text-2xl font-display text-amber-glow">🐟 Top specii azi</h2>
            <Link href="/azi" className="text-sm text-moss hover:text-amber-glow">toate →</Link>
          </div>
          <div className="grid md:grid-cols-3 gap-3">
            {scoruri.slice(0, 3).map(({ specie, scor }) => {
              const color = verdictColors[scor.semantic.verdict] ?? "#d4a657";
              return (
                <Link key={specie.id} href="/azi" className="card rounded-xl p-4 group" style={{ borderColor: `${color}40` }}>
                  <div className="flex items-baseline justify-between gap-2 mb-2">
                    <div className="flex items-baseline gap-2">
                      <SpeciesIcon specie={specie.id} size={24} />
                      <h3 className="text-lg font-display text-fog group-hover:text-amber-glow">{specie.nume}</h3>
                    </div>
                    <span className="text-2xl font-light" style={{ color }}>{scor.total}</span>
                  </div>
                  <p className="text-xs uppercase tracking-widest mb-1" style={{ color }}>
                    {verdictLabel[scor.semantic.verdict] ?? scor.semantic.verdict}
                  </p>
                  <p className="text-sm text-fog/75 leading-snug line-clamp-3">{scor.semantic.motiv}</p>
                </Link>
              );
            })}
          </div>
        </section>
      )}

      {/* SEMNALE BEACON RECENTE */}
      {semnaleAll.length > 0 && (
        <section className="mb-10">
          <div className="flex items-baseline justify-between mb-3">
            <h2 className="text-xl md:text-2xl font-display text-amber-glow">📡 Ultimele semnale din Delta</h2>
            <Link href="/beacon" className="text-sm text-moss hover:text-amber-glow">toate →</Link>
          </div>
          <div className="grid md:grid-cols-2 gap-3">
            {semnaleAll.slice(0, 6).map((s) => (
              <a key={s.id} href={s.video_url} target="_blank" rel="noopener noreferrer" className="card rounded-lg p-4 group">
                <div className="flex items-baseline justify-between gap-2 mb-1">
                  <p className="text-xs text-amber-glow uppercase tracking-widest">
                    {CANAL_LABEL[s.channel] ?? s.channel} · acum {timeAgo(s.upload_date)}
                  </p>
                  <span className="text-xs text-fog/40">{s.relevant_score}</span>
                </div>
                <h3 className="text-base font-display text-fog mb-1.5 group-hover:text-amber-glow leading-snug">
                  {s.title.length > 90 ? s.title.slice(0, 90) + "…" : s.title}
                </h3>
                {s.rezumat && (
                  <p className="text-sm text-fog/80 leading-relaxed mb-2 line-clamp-2">{s.rezumat}</p>
                )}
                <div className="flex flex-wrap gap-x-3 gap-y-0.5 text-xs">
                  {s.locatie && <span className="text-fog/70">📍 <span className="text-fog">{s.locatie.length > 45 ? s.locatie.slice(0, 45) + "…" : s.locatie}</span></span>}
                  {s.specii && s.specii.length > 0 && <span className="text-fog/70">🐟 <span className="text-fog">{s.specii.join(", ")}</span></span>}
                </div>
              </a>
            ))}
          </div>
        </section>
      )}

      {/* QUICK NAV — pătrate spinning/static + alte secțiuni */}
      <section className="grid grid-cols-2 md:grid-cols-4 gap-3 mb-10">
        <Link href="/tehnici" className="card rounded-xl p-4 group">
          <div className="flex gap-1 text-amber-soft/70 mb-1.5">
            <SpeciesIcon specie="stiuca" size={20} />
            <SpeciesIcon specie="salau" size={20} />
            <SpeciesIcon specie="avat" size={20} />
          </div>
          <h3 className="text-base font-display text-amber-glow group-hover:text-amber-soft">Spinning</h3>
          <p className="text-xs text-fog/55">știucă · șalău · avat</p>
        </Link>
        <Link href="/tehnici" className="card rounded-xl p-4 group">
          <div className="flex gap-1 text-amber-soft/70 mb-1.5">
            <SpeciesIcon specie="crap" size={20} />
            <SpeciesIcon specie="somn" size={20} />
            <SpeciesIcon specie="biban" size={20} />
          </div>
          <h3 className="text-base font-display text-amber-glow group-hover:text-amber-soft">Static</h3>
          <p className="text-xs text-fog/55">crap · somn · biban</p>
        </Link>
        <Link href="/provizii" className="card rounded-xl p-4 group">
          <div className="text-xl mb-1.5">🥃</div>
          <h3 className="text-base font-display text-amber-glow group-hover:text-amber-soft">Provizii</h3>
          <p className="text-xs text-fog/55">calculator partidă</p>
        </Link>
        <Link href="/prohibitie" className="card rounded-xl p-4 group">
          <div className="text-xl mb-1.5">⛔</div>
          <h3 className="text-base font-display text-amber-glow group-hover:text-amber-soft">Prohibiție</h3>
          <p className="text-xs text-fog/55">ANPA 2026</p>
        </Link>
      </section>

      {/* ARTICOLE TOP 4 */}
      <section className="mb-10">
        <div className="flex items-baseline justify-between mb-3">
          <h2 className="text-xl md:text-2xl font-display text-amber-glow">📚 Lecturi</h2>
          <Link href="/articole" className="text-sm text-moss hover:text-amber-glow">toate {articole.length} →</Link>
        </div>
        <div className="grid md:grid-cols-2 gap-3">
          {articole.slice(0, 4).map((a) => (
            <Link key={a.slug} href={`/articole/${a.slug}`} className="card rounded-lg p-4">
              <h3 className="text-base font-display text-fog mb-1">{a.titlu}</h3>
              <p className="text-sm text-fog/55 mb-2 leading-relaxed line-clamp-2">{a.scurt}</p>
              <div className="flex flex-wrap gap-1.5">
                {a.tags.slice(0, 4).map((t) => <span key={t} className="tag">{t}</span>)}
              </div>
            </Link>
          ))}
        </div>
      </section>

      {/* LOCURI POPULARE 6 */}
      <section className="mb-10">
        <div className="flex items-baseline justify-between mb-3">
          <h2 className="text-xl md:text-2xl font-display text-amber-glow">📍 Locuri populare</h2>
          <Link href="/locuri" className="text-sm text-moss hover:text-amber-glow">toate {stats.locuri} →</Link>
        </div>
        <div className="grid md:grid-cols-3 gap-3">
          {locuri.filter((l) => l.regiune === "delta").slice(0, 6).map((l) => (
            <Link key={l.slug} href={`/locuri/${l.slug}`} className="card rounded-lg p-3">
              <p className="text-xs uppercase tracking-widest text-moss mb-0.5">{l.tip}</p>
              <h3 className="text-sm font-display text-fog mb-1">{l.nume}</h3>
              <p className="text-xs text-fog/55 leading-snug line-clamp-2">{l.scurt}</p>
            </Link>
          ))}
        </div>
      </section>

      {/* STATS */}
      <section className="grid grid-cols-3 md:grid-cols-5 gap-2 mb-12 pt-6 border-t border-amber-glow/15">
        {[
          { n: stats.locuri, l: "locuri", href: "/locuri" },
          { n: stats.tehnici, l: "tehnici", href: "/tehnici" },
          { n: articole.length, l: "articole", href: "/articole" },
          { n: stats.glosar, l: "termeni", href: "/glosar" },
          { n: CANALE.length, l: "canale beacon", href: "/beacon" },
        ].map((s) => (
          <Link key={s.l} href={s.href} className="card rounded-lg p-3 text-center">
            <div className="text-2xl font-light text-amber-glow">{s.n}</div>
            <div className="text-[10px] uppercase tracking-wider text-fog/55 mt-0.5">{s.l}</div>
          </Link>
        ))}
      </section>
    </div>
  );
}
