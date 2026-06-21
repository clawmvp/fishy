// Debit Brațul Chilia via Open-Meteo flood API (GloFAS model)
// Singurul braț Delta cu date model utilizabile

export type ChiliaDebit = {
  todayM3s: number | null;
  yesterdayM3s: number | null;
  variationM3s: number | null;
  trend: "rising" | "falling" | "stable" | "unknown";
};

const CHILIA_LAT = 45.42;
const CHILIA_LON = 29.26;

export async function getChiliaDebit(): Promise<ChiliaDebit> {
  try {
    const url = `https://flood-api.open-meteo.com/v1/flood?latitude=${CHILIA_LAT}&longitude=${CHILIA_LON}&daily=river_discharge&past_days=1&forecast_days=1`;
    const resp = await fetch(url, { next: { revalidate: 3600 } });
    if (!resp.ok) return { todayM3s: null, yesterdayM3s: null, variationM3s: null, trend: "unknown" };
    const data = await resp.json();
    const disch: (number | null)[] = data?.daily?.river_discharge ?? [];
    const yesterday = typeof disch[0] === "number" ? disch[0] : null;
    const today = typeof disch[1] === "number" ? disch[1] : null;
    const variation = today != null && yesterday != null ? Math.round(today - yesterday) : null;
    let trend: ChiliaDebit["trend"] = "unknown";
    if (variation != null) {
      if (variation > 200) trend = "rising";
      else if (variation < -200) trend = "falling";
      else trend = "stable";
    }
    return { todayM3s: today, yesterdayM3s: yesterday, variationM3s: variation, trend };
  } catch {
    return { todayM3s: null, yesterdayM3s: null, variationM3s: null, trend: "unknown" };
  }
}
