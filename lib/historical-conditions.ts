// Fetcher condiții istorice pentru o dată dată — folosit la auto-fill formular captură
import { sql } from "./db";
import { getMoonPhase } from "./moon";

const REF_LAT = 45.211;
const REF_LON = 29.131;

export type HistoricalConditions = {
  date: string;
  cota: { tulcea: number | null; isaccea: number | null; variation: number | null } | null;
  weather: {
    tempMax: number | null;
    tempMin: number | null;
    windMax: number | null;
    windDirection: number | null;
    pressure: number | null;
    precipitation: number | null;
    waterTemp: number | null;
  } | null;
  moon: { illumination: number; phase: string } | null;
  patternsHint: string[];
  source: { cota: string; weather: string; moon: string };
};

const monthNames = ["ianuarie","februarie","martie","aprilie","mai","iunie","iulie","august","septembrie","octombrie","noiembrie","decembrie"];

function getWindDirCardinal(deg: number | null): string {
  if (deg == null) return "";
  const dirs = ["N","NE","E","SE","S","SV","V","NV"];
  return dirs[Math.round(deg / 45) % 8];
}

async function getCotaForDate(date: string): Promise<HistoricalConditions["cota"]> {
  try {
    const rows = await sql`
      SELECT station_slug, level_cm, variation_cm
      FROM fishy_beacon.cota_snapshots
      WHERE station_slug IN ('tulcea','isaccea')
        AND measured_at::DATE = ${date}::DATE
    `;
    let tulcea = null, isaccea = null, variation = null;
    for (const r of rows as Array<{ station_slug: string; level_cm: number; variation_cm: number | null }>) {
      if (r.station_slug === "tulcea") { tulcea = r.level_cm; variation = r.variation_cm; }
      if (r.station_slug === "isaccea") isaccea = r.level_cm;
    }
    if (tulcea == null && isaccea == null) {
      // încearcă cea mai apropiată dată ±2 zile
      const fallback = await sql`
        SELECT station_slug, level_cm, variation_cm, measured_at
        FROM fishy_beacon.cota_snapshots
        WHERE station_slug = 'tulcea'
        ORDER BY ABS(EXTRACT(EPOCH FROM (measured_at - ${date}::TIMESTAMP)))
        LIMIT 1
      `;
      if (fallback.length) {
        const f = fallback[0] as { level_cm: number; variation_cm: number | null };
        return { tulcea: f.level_cm, isaccea: null, variation: f.variation_cm };
      }
      return null;
    }
    return { tulcea, isaccea, variation };
  } catch {
    return null;
  }
}

async function getWeatherForDate(date: string): Promise<HistoricalConditions["weather"]> {
  try {
    const today = new Date().toISOString().slice(0, 10);
    const isPast = date < today;
    let url: string;
    if (isPast) {
      // Open-Meteo archive API (date < azi)
      url = `https://archive-api.open-meteo.com/v1/archive?latitude=${REF_LAT}&longitude=${REF_LON}&start_date=${date}&end_date=${date}&daily=temperature_2m_max,temperature_2m_min,precipitation_sum,wind_speed_10m_max,wind_direction_10m_dominant,pressure_msl_mean,soil_temperature_28_to_100cm_mean&timezone=auto`;
    } else {
      // Pentru date viitoare folosim forecast
      url = `https://api.open-meteo.com/v1/forecast?latitude=${REF_LAT}&longitude=${REF_LON}&start_date=${date}&end_date=${date}&daily=temperature_2m_max,temperature_2m_min,precipitation_sum,wind_speed_10m_max,wind_direction_10m_dominant&hourly=surface_pressure,soil_temperature_54cm&timezone=auto`;
    }
    const resp = await fetch(url);
    if (!resp.ok) return null;
    const data = await resp.json();
    const d = data.daily;
    if (!d || !d.time || d.time.length === 0) return null;
    const i = 0;
    return {
      tempMax: d.temperature_2m_max?.[i] ?? null,
      tempMin: d.temperature_2m_min?.[i] ?? null,
      windMax: d.wind_speed_10m_max?.[i] ?? null,
      windDirection: d.wind_direction_10m_dominant?.[i] ?? null,
      pressure: d.pressure_msl_mean?.[i] ?? (data.hourly?.surface_pressure?.[12] ?? null),
      precipitation: d.precipitation_sum?.[i] ?? null,
      waterTemp: d.soil_temperature_28_to_100cm_mean?.[i] ?? (data.hourly?.soil_temperature_54cm?.[12] ?? null),
    };
  } catch {
    return null;
  }
}

function computePatternsHint(date: Date, weather: HistoricalConditions["weather"], cota: HistoricalConditions["cota"]): string[] {
  const hints: string[] = [];
  const month = date.getMonth() + 1;
  const day = date.getDate();
  const waterT = weather?.waterTemp ?? null;
  const cotaT = cota?.tulcea ?? null;

  if (month === 6 && day >= 8 && day <= 25 && waterT && waterT >= 15 && waterT <= 22) hints.push("💪 Era begului (crap)");
  if (month >= 3 && month <= 5 && waterT && waterT >= 10) hints.push("🌸 Săptămâna magică posibilă (crap)");
  if (month === 11 && waterT && waterT >= 8 && waterT <= 13) hints.push("🍂 Bate norocul (crap noiembrie)");
  if (month === 10 && waterT && waterT >= 11 && waterT <= 16) hints.push("🍂 Bibanul de toamnă");
  if ((month === 2 || month === 3) && waterT && waterT >= 6 && waterT <= 12) hints.push("🌸 Bătaia știucii");
  if (month >= 5 && month <= 9 && waterT && waterT >= 20 && waterT <= 26) hints.push("🌙 Somn clonc nocturn posibil");
  if (month >= 5 && month <= 7 && cotaT && cotaT >= 150 && waterT && waterT >= 17) hints.push("🏞️ Crap pe vetre baltă");
  if ((month >= 5 && month <= 9) && cotaT && cotaT < 100 && waterT && waterT >= 18) hints.push("🌊 Crap retras pe brațe adânci");
  if (weather && weather.windMax && weather.windMax >= 8 && weather.windMax <= 18) hints.push("💨 Vânt favorabil");

  return hints;
}

export async function getConditionsForDate(dateStr: string): Promise<HistoricalConditions> {
  const date = new Date(dateStr + "T12:00:00Z");
  const [cota, weather] = await Promise.all([
    getCotaForDate(dateStr),
    getWeatherForDate(dateStr),
  ]);
  const moonInfo = getMoonPhase(date);
  const moon = { illumination: moonInfo.illumination, phase: moonInfo.phase };
  const patternsHint = computePatternsHint(date, weather, cota);

  return {
    date: dateStr,
    cota,
    weather,
    moon,
    patternsHint,
    source: {
      cota: cota ? "hidro.ro snapshot" : "indisponibil",
      weather: weather ? "Open-Meteo" : "indisponibil",
      moon: "calc local",
    },
  };
}

export function formatConditionsAsNote(c: HistoricalConditions): string {
  const parts: string[] = [];
  parts.push(`📅 ${new Date(c.date).getDate()} ${monthNames[new Date(c.date).getMonth()]}`);
  if (c.cota?.tulcea != null) {
    const v = c.cota.variation;
    parts.push(`💧 Cota Tulcea ${c.cota.tulcea}cm${v != null ? ` (${v > 0 ? "+" : ""}${v}/zi)` : ""}`);
  }
  if (c.cota?.isaccea != null) parts.push(`Isaccea ${c.cota.isaccea}cm`);
  if (c.weather?.waterTemp != null) parts.push(`🌡️ Apa ${Math.round(c.weather.waterTemp)}°C`);
  if (c.weather?.tempMax != null && c.weather?.tempMin != null) parts.push(`🌤️ ${c.weather.tempMax}°/${c.weather.tempMin}°`);
  if (c.weather?.windMax != null) parts.push(`💨 ${c.weather.windMax}km/h ${getWindDirCardinal(c.weather.windDirection)}`);
  if (c.weather?.pressure != null) parts.push(`${Math.round(c.weather.pressure)}hPa`);
  if (c.moon) parts.push(`🌙 ${c.moon.illumination}% ${c.moon.phase}`);
  if (c.patternsHint.length) parts.push(`\nPatterns: ${c.patternsHint.join(" · ")}`);
  return parts.join(" · ");
}
