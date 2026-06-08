import type { Specie } from "@/data/specii";
import type { DailyForecast } from "./weather";
import type { MoonPhaseInfo } from "./moon";
import type { WaterLevelReading } from "./water-level";
import { locuri, type Loc } from "@/data/locuri";
import { tehnici, type Tehnica } from "@/data/tehnici";
import { monturi, type Montura } from "@/data/monturi";
import { isInProhibitie } from "@/data/specii";

// ============================================================
// PONDERI PE SPECIE (totale 100%)
//
// Bazate pe consensul expert din literatura pescuit + 200+ video documentate:
// - Apa = factor PRIMAR (28-35%) — metabolismul peștelui depinde de ea
// - Presiune = secundar major (18-22%) — afectează poziția în coloana de apă
// - Cota = important pentru Delta/Dunăre (15-25%) — afectează migrația și hrana
// - Vânt = important pt răpitori (oxigenare + val), secundar pt static (10-18%)
// - Precipitații = modifier (7-12%)
// - Lună = controversat — Vișoianu jură pe ea pt crap, GFT zice "any" pe răpitori (7-12%)
// ============================================================
export const PONDERI: Record<Specie["id"], Record<string, number>> = {
  // Crap: cota cea mai importantă (canale Delta), lună 12% (Vișoianu)
  crap:   { apa: 28, cota: 25, presiune: 18, vant: 10, precip: 7,  luna: 12 },
  // Somn: apa și presiune cele mai importante, cota secundară
  somn:   { apa: 35, cota: 15, presiune: 22, vant: 8,  precip: 12, luna: 8 },
  // Știucă: apa + presiune + vânt (oxigenare critică pt spinning), cota mică
  stiuca: { apa: 28, cota: 10, presiune: 22, vant: 18, precip: 7,  luna: 15 },
  // Șalău: similar cu știuca, dar mai sensibil la lună
  salau:  { apa: 28, cota: 12, presiune: 20, vant: 18, precip: 7,  luna: 15 },
  // Avat: apa + vânt + cota Dunăre
  avat:   { apa: 28, cota: 18, presiune: 20, vant: 15, precip: 9,  luna: 10 },
  // Biban: apa + presiune + vânt
  biban:  { apa: 28, cota: 10, presiune: 22, vant: 18, precip: 7,  luna: 15 },
};

const SEASONAL_WATER_TEMP: Record<number, number> = {
  1: 3, 2: 4, 3: 8, 4: 12, 5: 17, 6: 22,
  7: 24, 8: 23, 9: 20, 10: 15, 11: 9, 12: 5,
};

export function estimateWaterTemp(forecast: DailyForecast, month: number): number {
  if (forecast.waterTempDeep !== null && forecast.waterTempDeep !== undefined) {
    return Math.round(forecast.waterTempDeep);
  }
  const airAvg = (forecast.tempMax + forecast.tempMin) / 2;
  const seasonalBase = SEASONAL_WATER_TEMP[month] || 15;
  return Math.round(seasonalBase * 0.7 + airAvg * 0.3);
}

// ============================================================
// SUB-SCORE FUNCTIONS — fiecare returnează 0-100 pentru factor specific
// ============================================================

function scoreApa(temp: number, optMin: number, optMax: number): { sub: number; detail: string; positive: boolean } {
  if (temp >= optMin && temp <= optMax) {
    return { sub: 100, detail: `${temp}°C — în intervalul optim ${optMin}-${optMax}°C`, positive: true };
  }
  const diff = temp < optMin ? optMin - temp : temp - optMax;
  // Decay liniar: 0=100, 1=85, 2=70, 3=55, 4=40, 5=25, 6+=10
  const sub = Math.max(10, 100 - Math.round(diff * 15));
  const dir = temp < optMin ? "sub" : "peste";
  let etich = "";
  if (diff <= 2) etich = `Ușor ${dir} optim`;
  else if (diff <= 5) etich = `${temp < optMin ? "Rece" : "Caldă"} — finețe`;
  else etich = `Prea ${temp < optMin ? "rece" : "caldă"} — apatici`;
  return { sub, detail: `${etich}: ${temp}°C, optim ${optMin}-${optMax}°C`, positive: false };
}

function scoreCota(cota: number, optMin: number, optMax: number, trend: "rising" | "falling" | "stable"): { sub: number; detail: string; positive: boolean } {
  let sub = 100;
  let etich = "";
  let positive = true;
  if (cota >= optMin && cota <= optMax) {
    sub = 100;
    etich = `${cota} cm — în interval optim ${optMin}-${optMax}`;
  } else if (cota < optMin) {
    const diff = (optMin - cota) / optMin;
    sub = Math.max(15, Math.round(100 - diff * 130));
    etich = `${cota} cm — sub optim (min ${optMin})`;
    positive = false;
  } else {
    const diff = (cota - optMax) / optMax;
    sub = Math.max(25, Math.round(100 - diff * 100));
    etich = `${cota} cm — ridicată (max ${optMax})`;
    positive = false;
  }
  // Trend bonus/penalty mic
  if (trend === "rising") {
    sub = Math.min(100, sub + 5);
    etich += " · în creștere (+)";
  } else if (trend === "falling" && sub > 70) {
    sub = Math.min(100, sub + 3);
    etich += " · în scădere (+ pt partide lungi)";
  }
  return { sub, detail: etich, positive };
}

function scorePresiune(pressure: number, trend: "rising" | "falling" | "stable", preference: "stable" | "falling" | "rising" | "any"): { sub: number; detail: string; positive: boolean } {
  // 1008-1020 = ideal range
  // <1000 sau >1025 = penalty
  // Trend rising + presiune mare = worst
  let sub = 100;
  let etich = "";
  let positive = true;
  const trendRO = trend === "rising" ? "în creștere" : trend === "falling" ? "în scădere" : "stabilă";
  if (pressure >= 1008 && pressure <= 1020) {
    if (trend === "stable") {
      sub = preference === "stable" ? 100 : 90;
      etich = `${pressure} hPa stabilă`;
    } else if (trend === "falling") {
      sub = preference === "falling" ? 100 : 85;
      etich = `${pressure} hPa în scădere`;
    } else {
      sub = 70;
      etich = `${pressure} hPa în creștere — peștii intră în repaus`;
      positive = false;
    }
  } else if (pressure > 1020 && trend === "rising") {
    sub = 30;
    etich = `${pressure} hPa mare în creștere — dificil`;
    positive = false;
  } else if (pressure > 1025) {
    sub = 40;
    etich = `${pressure} hPa foarte mare — peștii inactivi`;
    positive = false;
  } else if (pressure < 1000) {
    sub = 55;
    etich = `${pressure} hPa scăzută, ${trendRO}`;
    positive = false;
  } else {
    sub = 75;
    etich = `${pressure} hPa, ${trendRO}`;
  }
  return { sub, detail: etich, positive };
}

function scoreVant(windMax: number, optMax: number): { sub: number; detail: string; positive: boolean } {
  let sub = 100;
  let etich = "";
  let positive = true;
  if (windMax >= 5 && windMax <= 15) {
    sub = 100;
    etich = `${windMax} km/h — ideal (oxigenează apa, val mic)`;
  } else if (windMax < 5) {
    sub = 60;
    etich = `Calm (${windMax} km/h) — bun pt pluta, slab pt spinning`;
    positive = false;
  } else if (windMax <= optMax) {
    sub = 75;
    etich = `${windMax} km/h — moderat`;
  } else if (windMax <= optMax + 10) {
    sub = 45;
    etich = `${windMax} km/h — puternic, pescuit dificil`;
    positive = false;
  } else {
    sub = 15;
    etich = `${windMax} km/h — vânt foarte puternic, periculos`;
    positive = false;
  }
  return { sub, detail: etich, positive };
}

function scorePrecip(precip: number, preference: "dry" | "light_rain" | "any" | "after_rain"): { sub: number; detail: string; positive: boolean } {
  let sub = 100;
  let etich = "";
  let positive = true;
  if (precip <= 0.5) {
    if (preference === "dry") { sub = 100; etich = "Uscat — ideal pentru această specie"; }
    else if (preference === "after_rain") { sub = 60; etich = "Fără precipitații — specia preferă după ploaie"; positive = false; }
    else { sub = 85; etich = "Uscat"; }
  } else if (precip <= 5) {
    if (preference === "after_rain" || preference === "light_rain") { sub = 100; etich = `Ploaie ușoară (${precip.toFixed(1)} mm) — activează peștii`; }
    else if (preference === "dry") { sub = 65; etich = `Ploaie ușoară (${precip.toFixed(1)} mm)`; positive = false; }
    else { sub = 80; etich = `Ploaie ușoară (${precip.toFixed(1)} mm)`; }
  } else if (precip <= 15) {
    sub = 50;
    etich = `Ploaie moderată (${precip.toFixed(1)} mm) — fire murdare`;
    positive = false;
  } else {
    sub = 20;
    etich = `Precipitații abundente (${precip.toFixed(1)} mm) — partidă dificilă`;
    positive = false;
  }
  return { sub, detail: etich, positive };
}

function scoreLuna(illum: number, preference: "new" | "full" | "new_or_full" | "any"): { sub: number; detail: string; positive: boolean } {
  let sub = 70;
  let etich = "";
  let positive = true;
  if (preference === "any") {
    sub = 75;
    etich = `${illum}% iluminată — neutru`;
  } else if (preference === "new") {
    if (illum < 15) { sub = 100; etich = `Lună nouă (${illum}%) — ideal (Vișoianu: ±2 zile)`; }
    else if (illum < 30) { sub = 80; etich = `Aproape de lună nouă (${illum}%)`; }
    else if (illum < 60) { sub = 55; etich = `Pătrar (${illum}%)`; positive = false; }
    else { sub = 30; etich = `Prea multă lumină (${illum}%) — peștii pe suprafață`; positive = false; }
  } else if (preference === "full") {
    if (illum > 85) { sub = 100; etich = `Lună plină (${illum}%) — ideal pt nocturn`; }
    else if (illum > 60) { sub = 75; etich = `Aproape de lună plină (${illum}%)`; }
    else { sub = 50; etich = `${illum}% iluminată — sub ideal pt această specie`; positive = false; }
  } else if (preference === "new_or_full") {
    if (illum < 15 || illum > 85) { sub = 100; etich = `Faza extremă (${illum}%) — ideal`; }
    else if (illum < 30 || illum > 70) { sub = 70; etich = `Aproape de extrem (${illum}%)`; }
    else { sub = 45; etich = `Pătrar (${illum}%) — neutru-slab`; positive = false; }
  }
  return { sub, detail: etich, positive };
}

// ============================================================
// MAIN SCORING — Weighted Average
// ============================================================

export interface FactorBreakdown {
  cheie: "apa" | "cota" | "presiune" | "vant" | "precip" | "luna";
  label: string;
  subScore: number; // 0-100 pentru acest factor singur
  weight: number;   // 0-100 (%)
  contribution: number; // subScore × weight / 100
  detail: string;
  positive: boolean;
}

export interface ScorulZilei {
  total: number;
  label: string;
  cssColor: string;
  factors: FactorBreakdown[];
  reasons: { text: string; positive: boolean }[];
}

export function calculeazaScor(
  specie: Specie,
  forecast: DailyForecast,
  moon: MoonPhaseInfo,
  water: WaterLevelReading | null,
  date: Date
): ScorulZilei {
  if (isInProhibitie(specie, date)) {
    return {
      total: 0,
      label: "Prohibiție",
      cssColor: "text-red-400",
      reasons: [{ text: "Specia e în prohibiție — pescuitul interzis", positive: false }],
      factors: [],
    };
  }

  const opt = specie.optimalConditions;
  const month = date.getMonth() + 1;
  const waterTemp = estimateWaterTemp(forecast, month);
  const ponderi = PONDERI[specie.id];

  // Calculează sub-scores pentru fiecare factor
  const factors: FactorBreakdown[] = [];

  // Apa
  const apa = scoreApa(waterTemp, opt.waterTempMin, opt.waterTempMax);
  factors.push({
    cheie: "apa", label: "Temperatura apei",
    subScore: apa.sub, weight: ponderi.apa,
    contribution: Math.round((apa.sub * ponderi.apa) / 100 * 10) / 10,
    detail: apa.detail, positive: apa.positive,
  });

  // Cota (dacă avem date)
  if (water) {
    const cota = scoreCota(water.level, opt.cotaOptima.min, opt.cotaOptima.max, water.trend);
    factors.push({
      cheie: "cota", label: `Cota ${water.station.city}`,
      subScore: cota.sub, weight: ponderi.cota,
      contribution: Math.round((cota.sub * ponderi.cota) / 100 * 10) / 10,
      detail: cota.detail, positive: cota.positive,
    });
  } else {
    // Cota indisponibilă — folosim ponderea ei ca neutră (50)
    factors.push({
      cheie: "cota", label: "Cota Dunării",
      subScore: 50, weight: ponderi.cota,
      contribution: Math.round((50 * ponderi.cota) / 100 * 10) / 10,
      detail: "Date indisponibile — neutru", positive: false,
    });
  }

  // Presiune
  const pres = scorePresiune(forecast.pressure, forecast.pressureTrend, opt.pressurePreference);
  factors.push({
    cheie: "presiune", label: "Presiune atmosferică",
    subScore: pres.sub, weight: ponderi.presiune,
    contribution: Math.round((pres.sub * ponderi.presiune) / 100 * 10) / 10,
    detail: pres.detail, positive: pres.positive,
  });

  // Vânt
  const vant = scoreVant(forecast.windMax, opt.windMax);
  factors.push({
    cheie: "vant", label: "Vânt",
    subScore: vant.sub, weight: ponderi.vant,
    contribution: Math.round((vant.sub * ponderi.vant) / 100 * 10) / 10,
    detail: vant.detail, positive: vant.positive,
  });

  // Precipitații
  const precip = scorePrecip(forecast.precipitation, opt.precipPreference);
  factors.push({
    cheie: "precip", label: "Precipitații",
    subScore: precip.sub, weight: ponderi.precip,
    contribution: Math.round((precip.sub * ponderi.precip) / 100 * 10) / 10,
    detail: precip.detail, positive: precip.positive,
  });

  // Lună
  const luna = scoreLuna(moon.illumination, opt.moonPreference);
  factors.push({
    cheie: "luna", label: "Faza lunii",
    subScore: luna.sub, weight: ponderi.luna,
    contribution: Math.round((luna.sub * ponderi.luna) / 100 * 10) / 10,
    detail: luna.detail, positive: luna.positive,
  });

  // Weighted average — sumă contribuții
  const totalWeight = factors.reduce((s, f) => s + f.weight, 0);
  const totalContribution = factors.reduce((s, f) => s + f.contribution, 0);
  const score = Math.round((totalContribution / totalWeight) * 100);

  let label = "Dificile";
  let cssColor = "text-red-400";
  if (score >= 75) { label = "Excelente"; cssColor = "text-emerald-400"; }
  else if (score >= 55) { label = "Bune"; cssColor = "text-amber-glow"; }
  else if (score >= 35) { label = "Acceptabile"; cssColor = "text-orange-400"; }

  // Legacy reasons array — derivat din factors
  const reasons = factors.map((f) => ({
    text: `${f.label}: ${f.detail}`,
    positive: f.positive,
  }));

  return { total: score, label, cssColor, factors, reasons };
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

export function recomandaMonturi(specie: Specie, date: Date): Montura[] {
  const month = date.getMonth() + 1;
  return monturi
    .filter((m) => m.pentru.includes(specie.id))
    .filter((m) => !m.luni || m.luni.length === 0 || m.luni.includes(month));
}
