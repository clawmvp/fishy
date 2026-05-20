import type { DailyForecast } from "./weather";
import type { MoonPhaseInfo } from "./moon";

export interface HourlyBite {
  hour: number;
  label: string;
  score: number;
  level: "dead" | "low" | "moderate" | "good" | "peak";
}

export interface BiteForecastResult {
  hourly: HourlyBite[];
  peakWindow: string;
  peakScore: number;
  overallScore: number;
}

const HOUR_PATTERNS: Record<string, number[]> = {
  crap:    [15,10,10, 8, 20,60, 90,95,80,50,30,20, 15,15,15,15,20,40, 70,85,90,80,50,25],
  caras:   [10, 5, 5, 5, 15,40, 80,95,90,70,40,20, 15,15,15,15,30,60, 85,75,50,20,10,10],
  somn:    [70,60,45,30, 20,40, 60,30,10, 5, 5, 5,  5, 5, 5, 5, 5,15, 30,55,80,95,90,80],
  stiuca:  [10,10, 8, 8, 15,25, 60,85,95,80,60,30, 20,20,30,55,80,70, 40,20,10,10,10,10],
  salau:   [30,20,15,15, 30,70, 95,85,60,30,15,10, 10,10,10,15,25,55, 85,95,80,60,45,35],
  platica: [40,30,15,10, 20,60, 90,95,80,50,30,15, 10,10,10,10,15,25, 40,50,65,80,70,50],
  lin:     [ 5, 5, 5, 5, 20,70, 95,90,60,20,10, 5,  5, 5, 5, 5, 5,15, 30,15, 5, 5, 5, 5],
  biban:   [10, 8, 5, 5, 10,20, 50,75,90,85,60,40, 30,35,55,75,65,40, 20,15,10, 8, 8, 8],
};

const SEASONAL_WATER_TEMP: Record<number, number> = {
  1: 3, 2: 4, 3: 8, 4: 12, 5: 17, 6: 22,
  7: 24, 8: 23, 9: 20, 10: 15, 11: 9, 12: 5,
};

export function generateBiteForecast(
  speciesId: string,
  forecast: DailyForecast,
  moon: MoonPhaseInfo,
  month: number
): BiteForecastResult {
  const pattern = HOUR_PATTERNS[speciesId] || HOUR_PATTERNS.crap;

  const airAvg = (forecast.tempMax + forecast.tempMin) / 2;
  const waterTemp = Math.round((SEASONAL_WATER_TEMP[month] || 15) * 0.7 + airAvg * 0.3);

  let conditionMultiplier = 1.0;

  if (forecast.pressure >= 1008 && forecast.pressure <= 1020) {
    if (forecast.pressureTrend === "stable") conditionMultiplier += 0.08;
    else if (forecast.pressureTrend === "falling") conditionMultiplier += 0.05;
  } else if (forecast.pressure > 1025) {
    conditionMultiplier -= 0.12;
  } else if (forecast.pressure < 1000) {
    conditionMultiplier -= 0.08;
  }

  if (forecast.windMax >= 5 && forecast.windMax <= 15) conditionMultiplier += 0.06;
  else if (forecast.windMax > 25) conditionMultiplier -= 0.15;
  else if (forecast.windMax > 20) conditionMultiplier -= 0.08;

  if (moon.illumination < 15 || moon.illumination > 85) conditionMultiplier += 0.05;

  if (forecast.cloudCover >= 50 && forecast.cloudCover <= 80) conditionMultiplier += 0.04;

  const speciesMap: Record<string, { min: number; max: number }> = {
    crap: { min: 15, max: 25 },
    caras: { min: 16, max: 26 },
    somn: { min: 18, max: 28 },
    stiuca: { min: 8, max: 18 },
    salau: { min: 10, max: 20 },
    platica: { min: 14, max: 22 },
    lin: { min: 16, max: 25 },
    biban: { min: 10, max: 20 },
  };
  const tempRange = speciesMap[speciesId] || { min: 12, max: 22 };
  if (waterTemp >= tempRange.min && waterTemp <= tempRange.max) {
    conditionMultiplier += 0.1;
  } else {
    const diff = waterTemp < tempRange.min
      ? tempRange.min - waterTemp
      : waterTemp - tempRange.max;
    conditionMultiplier -= Math.min(0.25, diff * 0.03);
  }

  conditionMultiplier = Math.max(0.4, Math.min(1.3, conditionMultiplier));

  const hourly: HourlyBite[] = pattern.map((base, hour) => {
    let score = Math.round(base * conditionMultiplier);
    score = Math.max(0, Math.min(100, score));

    let level: HourlyBite["level"];
    if (score >= 75) level = "peak";
    else if (score >= 55) level = "good";
    else if (score >= 35) level = "moderate";
    else if (score >= 15) level = "low";
    else level = "dead";

    return {
      hour,
      label: `${hour.toString().padStart(2, "0")}:00`,
      score,
      level,
    };
  });

  let peakStart = 0;
  let peakEnd = 0;
  let peakMax = 0;
  let bestWindowStart = 0;
  let bestWindowSum = 0;

  for (let i = 0; i < 24; i++) {
    let windowSum = 0;
    for (let j = 0; j < 3; j++) {
      windowSum += hourly[(i + j) % 24].score;
    }
    if (windowSum > bestWindowSum) {
      bestWindowSum = windowSum;
      bestWindowStart = i;
    }
    if (hourly[i].score > peakMax) {
      peakMax = hourly[i].score;
    }
  }
  peakStart = bestWindowStart;
  peakEnd = (bestWindowStart + 3) % 24;

  const overallScore = Math.round(hourly.reduce((sum, h) => sum + h.score, 0) / 24);

  return {
    hourly,
    peakWindow: `${peakStart.toString().padStart(2, "0")}:00 – ${peakEnd.toString().padStart(2, "0")}:00`,
    peakScore: peakMax,
    overallScore,
  };
}
