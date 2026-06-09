import Link from "next/link";
import { fetchWeather, getWindDirection } from "@/lib/weather";
import { getMoonPhase } from "@/lib/moon";
import { DANUBE_STATIONS, HIDRO_IDS, classifyLevel, getLevelLabel, getLevelFishingImpact } from "@/lib/water-level";
import type { WaterLevelReading } from "@/lib/water-level";

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
    let depth = 0, end = start;
    for (let i = start; i < html.length; i++) {
      if (html[i] === "{") depth++;
      else if (html[i] === "}") { depth--; if (depth === 0) { end = i + 1; break; } }
    }
    let data: Record<string, unknown>;
    try { data = JSON.parse(html.slice(start, end)); } catch { return null; }
    const levelMatch = String(data.TEXT1 || "").match(/H=\s*(-?\d+)/);
    if (!levelMatch) return null;
    const level = parseInt(levelMatch[1]);
    const varMatch = String(data.TEXT2 || "").match(/=\s*(-?\d+)/);
    const variation = varMatch ? parseInt(varMatch[1]) : 0;
    const date = String(data.DATA || "").split(" ")[0] || "";
    const trend: "rising" | "falling" | "stable" = variation > 2 ? "rising" : variation < -2 ? "falling" : "stable";
    const relativeLevel = classifyLevel(level, station);
    return {
      station, level, variation, waterTemp: null, date,
      forecast24h: null, forecast48h: null, forecast72h: null,
      trend, relativeLevel, fishingImpact: getLevelFishingImpact(relativeLevel),
    };
  } catch { return null; }
}

export default async function ConditiiLive() {
  const date = new Date();
  const moon = getMoonPhase(date);

  let forecasts: Awaited<ReturnType<typeof fetchWeather>> = [];
  try { forecasts = await fetchWeather(REF_LAT, REF_LON, 1); } catch { forecasts = []; }
  const today = forecasts[0];

  const [waterTulcea, waterSulina] = await Promise.all([
    getWaterLevel("tulcea"),
    getWaterLevel("sulina"),
  ]);

  return (
    <Link
      href="/azi"
      className="block mb-8 group"
      aria-label="Vezi condițiile complete pe pagina partidă"
    >
      <div className="flex items-baseline justify-between mb-2">
        <p className="text-xs uppercase tracking-[0.3em] text-amber-glow">condiții live</p>
        <span className="text-xs text-moss group-hover:text-amber-glow transition-colors">recomandări pe specie →</span>
      </div>
      <section className="grid grid-cols-2 lg:grid-cols-5 gap-2 md:gap-3">
        {waterTulcea && (
          <div className="card-hero rounded-xl p-3 md:p-4">
            <p className="text-[10px] md:text-xs uppercase tracking-widest text-moss mb-1">Cota Tulcea</p>
            <p className="text-2xl md:text-3xl font-light text-amber-glow mb-1">
              {waterTulcea.level}<span className="text-xs md:text-sm text-fog/55 ml-1">cm</span>
            </p>
            <p className="text-[10px] md:text-xs text-fog/60">
              {waterTulcea.variation > 0 ? "↑" : waterTulcea.variation < 0 ? "↓" : "→"} {Math.abs(waterTulcea.variation)} cm
            </p>
            <p className="text-[10px] md:text-xs text-amber-soft mt-1">{getLevelLabel(waterTulcea.relativeLevel)}</p>
          </div>
        )}
        {waterSulina && (
          <div className="card-hero rounded-xl p-3 md:p-4">
            <p className="text-[10px] md:text-xs uppercase tracking-widest text-moss mb-1">Cota Sulina</p>
            <p className="text-2xl md:text-3xl font-light text-amber-glow mb-1">
              {waterSulina.level}<span className="text-xs md:text-sm text-fog/55 ml-1">cm</span>
            </p>
            <p className="text-[10px] md:text-xs text-fog/60">
              {waterSulina.variation > 0 ? "↑" : waterSulina.variation < 0 ? "↓" : "→"} {Math.abs(waterSulina.variation)} cm
            </p>
            <p className="text-[10px] md:text-xs text-amber-soft mt-1">{getLevelLabel(waterSulina.relativeLevel)}</p>
          </div>
        )}
        {today && (
          <div className="card-hero rounded-xl p-3 md:p-4">
            <p className="text-[10px] md:text-xs uppercase tracking-widest text-moss mb-1">Vremea Mila 23</p>
            <p className="text-2xl md:text-3xl font-light text-amber-glow mb-1">
              {today.tempMax}°<span className="text-xs md:text-sm text-fog/55 ml-1">/{today.tempMin}°</span>
            </p>
            <p className="text-[10px] md:text-xs text-fog/60">
              {today.windMax} km/h {getWindDirection(today.windDirection)}
            </p>
            <p className="text-[10px] md:text-xs text-amber-soft mt-1">
              {today.pressure} hPa
            </p>
          </div>
        )}
        {today && today.waterTempDeep !== null && (
          <div className="card-hero rounded-xl p-3 md:p-4">
            <p className="text-[10px] md:text-xs uppercase tracking-widest text-moss mb-1">Apa</p>
            <p className="text-2xl md:text-3xl font-light text-amber-glow mb-1">
              {Math.round(today.waterTempDeep)}<span className="text-xs md:text-sm text-fog/55 ml-1">°C</span>
            </p>
            {today.waterTempShallow !== null && (
              <p className="text-[10px] md:text-xs text-fog/60">
                ~{Math.round(today.waterTempShallow)}°C la mal
              </p>
            )}
            <p className="text-[10px] md:text-xs text-amber-soft mt-1">
              {today.waterTempDeep < 10 ? "Rece" : today.waterTempDeep < 16 ? "Răcoroasă" : today.waterTempDeep < 22 ? "Optimă" : today.waterTempDeep < 26 ? "Caldă" : "Caniculă"}
            </p>
          </div>
        )}
        <div className="card-hero rounded-xl p-3 md:p-4 col-span-2 lg:col-span-1">
          <p className="text-[10px] md:text-xs uppercase tracking-widest text-moss mb-1">Luna</p>
          <p className="text-2xl md:text-3xl font-light text-amber-glow mb-1">
            {moon.illumination}<span className="text-xs md:text-sm text-fog/55 ml-1">%</span>
          </p>
          <p className="text-[10px] md:text-xs text-fog/60">{moon.phase}</p>
          <p className="text-[10px] md:text-xs text-amber-soft mt-1">
            {moon.illumination < 15 || moon.illumination > 85 ? "Activitate max" : moon.illumination < 40 || moon.illumination > 60 ? "Activitate bună" : "Pătrar"}
          </p>
        </div>
      </section>
    </Link>
  );
}
