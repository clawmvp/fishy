// Helpers pentru date live: cota + vreme — shareable între /, /azi, components

import { DANUBE_STATIONS, HIDRO_IDS, classifyLevel, getLevelFishingImpact } from "./water-level";
import type { WaterLevelReading } from "./water-level";

let hidroCache: { html: string; expires: number } | null = null;

export async function fetchHidroHtml(): Promise<string | null> {
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

export async function getWaterLevel(stationSlug: string): Promise<WaterLevelReading | null> {
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
    let data: Record<string, unknown>;
    try { data = JSON.parse(html.slice(start, end)); } catch { return null; }
    const levelMatch = String(data.TEXT1 || "").match(/H=\s*(-?\d+)/);
    if (!levelMatch) return null;
    const level = parseInt(levelMatch[1]);
    const varMatch = String(data.TEXT2 || "").match(/=\s*(-?\d+)/);
    const variation = varMatch ? parseInt(varMatch[1]) : 0;
    const date = String(data.DATA || "").split(" ")[0] || "";
    const trend: "rising" | "falling" | "stable" =
      variation > 2 ? "rising" : variation < -2 ? "falling" : "stable";
    const relativeLevel = classifyLevel(level, station);
    return {
      station, level, variation, waterTemp: null, date,
      forecast24h: null, forecast48h: null, forecast72h: null,
      trend, relativeLevel, fishingImpact: getLevelFishingImpact(relativeLevel),
    };
  } catch {
    return null;
  }
}
