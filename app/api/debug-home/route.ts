import { NextRequest, NextResponse } from "next/server";
import { fetchWeather } from "@/lib/weather";
import { getMoonPhase } from "@/lib/moon";
import { getWaterLevel } from "@/lib/conditii-live";
import { getCotaHistory } from "@/lib/cota-history";
import { toateSemnalele } from "@/lib/beacon-query";
import { calculeazaScor } from "@/lib/recomandari";
import { specii, isInProhibitie } from "@/data/specii";

export const dynamic = "force-dynamic";

const REF_LAT = 45.211;
const REF_LON = 29.131;

export async function GET(req: NextRequest) {
  const auth = req.headers.get("authorization");
  const token = req.nextUrl.searchParams.get("token");
  const secret = process.env.CRON_SECRET;
  if (!secret) return NextResponse.json({ error: "no secret" }, { status: 500 });
  if (auth !== `Bearer ${secret}` && token !== secret) {
    return NextResponse.json({ error: "unauthorized" }, { status: 401 });
  }

  const now = new Date();
  const moon = getMoonPhase(now);

  const [forecasts, waterTulcea, waterSulina, cotaHistory, semnale] = await Promise.all([
    fetchWeather(REF_LAT, REF_LON, 1).catch((e) => ({ err: (e as Error).message })),
    getWaterLevel("tulcea"),
    getWaterLevel("sulina"),
    getCotaHistory("tulcea", 7),
    toateSemnalele().then((s) => s.slice(0, 6)).catch((e) => ({ err: (e as Error).message })),
  ]);

  const todaysForecast = Array.isArray(forecasts) ? forecasts[0] : null;

  const scoruri = todaysForecast
    ? specii
        .filter((sp) => !isInProhibitie(sp, now))
        .map((sp) => ({
          specie: sp.id,
          scor: calculeazaScor(sp, todaysForecast, moon, waterTulcea, now, [], cotaHistory),
        }))
        .sort((a, b) => b.scor.total - a.scor.total)
    : [];

  return NextResponse.json({
    now: now.toISOString(),
    moon: { illumination: moon.illumination, phase: moon.phase },
    waterTulcea: waterTulcea ? { level: waterTulcea.level, variation: waterTulcea.variation, trend: waterTulcea.trend } : null,
    waterSulina: waterSulina ? { level: waterSulina.level, variation: waterSulina.variation, trend: waterSulina.trend } : null,
    cotaHistory: cotaHistory.length,
    cotaHistoryPoints: cotaHistory.map((p) => ({ date: p.measured_at.slice(0, 10), level: p.level_cm })),
    todaysForecast: todaysForecast
      ? {
          tempMax: todaysForecast.tempMax,
          tempMin: todaysForecast.tempMin,
          windMax: todaysForecast.windMax,
          windDirection: todaysForecast.windDirection,
          pressure: todaysForecast.pressure,
          pressureTrend: todaysForecast.pressureTrend,
          waterTempDeep: todaysForecast.waterTempDeep,
        }
      : null,
    speciiTop3: scoruri.slice(0, 3).map((s) => ({
      specie: s.specie,
      scor: s.scor.total,
      verdict: s.scor.semantic.verdict,
      motiv: s.scor.semantic.motiv,
      patterns: s.scor.patterns.map((p) => ({ id: p.id, nume: p.nume, bonus: p.bonus })),
    })),
    semnaleCount: Array.isArray(semnale) ? semnale.length : 0,
    semnaleSample: Array.isArray(semnale)
      ? semnale.slice(0, 3).map((s) => ({
          title: s.title.slice(0, 60),
          channel: s.channel,
          locatie: s.locatie?.slice(0, 80),
          specii: s.specii,
          score: s.relevant_score,
        }))
      : [],
  });
}
