import type { Specie } from "@/data/specii";
import type { DailyForecast } from "./weather";
import type { MoonPhaseInfo } from "./moon";
import type { WaterLevelReading } from "./water-level";
import { locuri, type Loc } from "@/data/locuri";
import { tehnici, type Tehnica } from "@/data/tehnici";
import { isInProhibitie } from "@/data/specii";

export interface ScorulZilei {
  total: number;
  label: string;
  cssColor: string;
  reasons: { text: string; positive: boolean }[];
}

const SEASONAL_WATER_TEMP: Record<number, number> = {
  1: 3, 2: 4, 3: 8, 4: 12, 5: 17, 6: 22,
  7: 24, 8: 23, 9: 20, 10: 15, 11: 9, 12: 5,
};

export function estimateWaterTemp(forecast: DailyForecast, month: number): number {
  // Prefer soil_temperature_54cm (real-world proxy stabil pentru apa adâncă)
  if (forecast.waterTempDeep !== null && forecast.waterTempDeep !== undefined) {
    return Math.round(forecast.waterTempDeep);
  }
  // Fallback: estimare hibridă din temp aer + media sezonieră
  const airAvg = (forecast.tempMax + forecast.tempMin) / 2;
  const seasonalBase = SEASONAL_WATER_TEMP[month] || 15;
  return Math.round(seasonalBase * 0.7 + airAvg * 0.3);
}

export function calculeazaScor(
  specie: Specie,
  forecast: DailyForecast,
  moon: MoonPhaseInfo,
  water: WaterLevelReading | null,
  date: Date
): ScorulZilei {
  const reasons: { text: string; positive: boolean }[] = [];

  if (isInProhibitie(specie, date)) {
    return {
      total: 0,
      label: "Prohibiție",
      cssColor: "text-red-400",
      reasons: [{ text: "Specia e în prohibiție — pescuitul interzis", positive: false }],
    };
  }

  // Algoritm:
  //   - Începem cu 100 (zi perfectă)
  //   - Apa = factor PRIMAR — determină un PLAFON (ceiling) maxim
  //     (chiar dacă restul e perfect, scorul nu poate trece peste ceiling)
  //   - Penalizările secundare scad scorul
  //   - Bonusurile cresc scorul DAR fără să treacă peste ceiling
  let score = 100;
  let ceiling = 100;
  const opt = specie.optimalConditions;
  const month = date.getMonth() + 1;
  const waterTemp = estimateWaterTemp(forecast, month);

  // Temperatura apei — factor PRIMAR (ceiling + penalty)
  if (waterTemp >= opt.waterTempMin && waterTemp <= opt.waterTempMax) {
    reasons.push({ text: `Temperatura apei optimă ~${waterTemp}°C`, positive: true });
  } else {
    const diff = waterTemp < opt.waterTempMin ? opt.waterTempMin - waterTemp : waterTemp - opt.waterTempMax;
    // Severitate proporțional cu diff:
    //   1-2°C off → minor, ceiling 90, message "ușor sub/peste optim"
    //   3-5°C off → moderat, ceiling 75, message "rece/caldă — finețe"
    //   6+°C off → major, ceiling 50, message "prea rece/caldă"
    let severity: "minor" | "moderat" | "major";
    if (diff <= 2) severity = "minor";
    else if (diff <= 5) severity = "moderat";
    else severity = "major";

    const direction = waterTemp < opt.waterTempMin ? "rece" : "caldă";
    let text = "";
    let penalty = 0;
    if (severity === "minor") {
      ceiling = 90;
      penalty = Math.round(diff * 4);
      text = `Apa ușor ${direction === "rece" ? "sub optim" : "peste optim"} (~${waterTemp}°C, optim ${opt.waterTempMin}-${opt.waterTempMax}°C)`;
    } else if (severity === "moderat") {
      ceiling = 75;
      penalty = 8 + Math.round((diff - 2) * 5);
      text = `Apa ${direction} (~${waterTemp}°C, optim ${opt.waterTempMin}-${opt.waterTempMax}°C) — finețe necesară`;
    } else {
      ceiling = 50;
      penalty = 23 + Math.round((diff - 5) * 2);
      text = `Apa prea ${direction} (~${waterTemp}°C, optim ${opt.waterTempMin}-${opt.waterTempMax}°C) — peștii apatici`;
    }
    score -= Math.min(40, penalty);
    reasons.push({ text, positive: false });
  }

  // Presiune atmosferică
  if (forecast.pressure >= 1008 && forecast.pressure <= 1020 && (forecast.pressureTrend === "stable" || forecast.pressureTrend === "falling")) {
    reasons.push({ text: `Presiune favorabilă (${forecast.pressure} hPa, ${forecast.pressureTrend === "stable" ? "stabilă" : "în scădere"})`, positive: true });
    if (opt.pressurePreference === "falling" && forecast.pressureTrend === "falling") score += 5;
  } else if (forecast.pressureTrend === "rising" && forecast.pressure > 1020) {
    score -= 15;
    reasons.push({ text: `Presiune mare în creștere (${forecast.pressure} hPa) — dificil`, positive: false });
  }

  // Vânt
  if (forecast.windMax >= 5 && forecast.windMax <= 15) {
    reasons.push({ text: `Vânt ideal (${forecast.windMax} km/h) — oxigenează apa, creează val`, positive: true });
    score += 5;
  } else if (forecast.windMax < 5) {
    reasons.push({ text: `Calm (${forecast.windMax} km/h) — bun pt pluta, slab pt spinning`, positive: false });
  } else if (forecast.windMax > opt.windMax) {
    const penalty = Math.min(25, Math.round((forecast.windMax - opt.windMax) * 2.5));
    score -= penalty;
    reasons.push({ text: `Vânt prea puternic (${forecast.windMax} km/h) — pescuit dificil`, positive: false });
  } else {
    reasons.push({ text: `Vânt moderat (${forecast.windMax} km/h)`, positive: true });
  }

  // Faza lunii
  if (opt.moonPreference === "new" && moon.illumination < 15) {
    reasons.push({ text: `Lună nouă (${moon.illumination}%) — ideal (Vișoianu: ±2 zile)`, positive: true });
    score += 5;
  } else if (opt.moonPreference === "new" && moon.illumination > 70) {
    score -= 10;
    reasons.push({ text: `Prea multă lumină lunară (${moon.illumination}%) — pe lună plină crapul sare la suprafață`, positive: false });
  } else if (opt.moonPreference === "any") {
    // neutral
  } else {
    reasons.push({ text: `Faza lunii ${moon.phase} (${moon.illumination}%)`, positive: false });
  }

  // Cota Tulcea (doar pentru crap pe canale)
  if (water && specie.id === "crap") {
    const cota = water.level;
    const { min, max } = opt.cotaOptima;
    if (cota >= min && cota <= max) {
      reasons.push({ text: `Cota ${water.station.city} ${cota} — în interval optim (${min}-${max})`, positive: true });
      score += 5;
    } else if (cota < min) {
      score -= 12;
      reasons.push({ text: `Cota ${water.station.city} ${cota} — prea scăzută (sub ${min} = doar ciortani)`, positive: false });
    } else {
      score -= 8;
      reasons.push({ text: `Cota ${water.station.city} ${cota} — ridicată (peste ${max} = pești în lacuri)`, positive: false });
    }
    if (water.trend === "rising" && specie.id === "crap") {
      reasons.push({ text: `Cota în creștere — peștii activi`, positive: true });
    } else if (water.trend === "falling") {
      reasons.push({ text: `Cota în scădere — favorabil partidelor lungi`, positive: true });
    }
  }

  // Precipitații
  if (opt.precipPreference === "dry" && forecast.precipitation <= 1) {
    reasons.push({ text: "Vreme uscată — favorabil", positive: true });
  } else if (opt.precipPreference === "after_rain" && forecast.precipitation > 0 && forecast.precipitation <= 10) {
    reasons.push({ text: "Ploaie ușoară — activează peștii", positive: true });
    score += 5;
  } else if (forecast.precipitation > 15) {
    score -= 12;
    reasons.push({ text: `Precipitații abundente (${forecast.precipitation.toFixed(1)} mm)`, positive: false });
  }

  // Final: aplic ceiling (din apa) ȘI clamp [0, 100]
  score = Math.max(0, Math.min(ceiling, score));

  let label = "Dificile";
  let cssColor = "text-red-400";
  if (score >= 75) { label = "Excelente"; cssColor = "text-emerald-400"; }
  else if (score >= 55) { label = "Bune"; cssColor = "text-amber-glow"; }
  else if (score >= 35) { label = "Acceptabile"; cssColor = "text-orange-400"; }

  return { total: score, label, cssColor, reasons };
}

// Recomandă LOCURI și TEHNICI din baza noastră de date, în funcție de specie + lună
export function recomandaLocuri(specie: Specie, date: Date): Loc[] {
  const month = date.getMonth() + 1;
  const luniRO = ["ianuarie","februarie","martie","aprilie","mai","iunie","iulie","august","septembrie","octombrie","noiembrie","decembrie"];
  const lunaActuala = luniRO[month - 1];

  return locuri.filter((l) => {
    if (!l.specii.includes(specie.id)) return false;
    if (l.sezon.length === 0) return true;
    return l.sezon.some((s) => s.toLowerCase().includes(lunaActuala));
  });
}

export function recomandaTehnici(specie: Specie, date: Date): Tehnica[] {
  const month = date.getMonth() + 1;
  const luniRO = ["ianuarie","februarie","martie","aprilie","mai","iunie","iulie","august","septembrie","octombrie","noiembrie","decembrie"];
  const lunaActuala = luniRO[month - 1];

  return tehnici.filter((t) => {
    if (t.specie !== specie.id) return false;
    if (!t.perioada) return true;
    return t.perioada.toLowerCase().includes(lunaActuala) || t.perioada.toLowerCase().includes("tot anul");
  });
}
