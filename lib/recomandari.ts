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
// - Lună = controversat — unii pescari jură pe ea pt crap (12%), GFT zice "any" pe răpitori (7-12%)
// ============================================================
export const PONDERI: Record<Specie["id"], Record<string, number>> = {
  // Crap: cota cea mai importantă (canale Delta), lună 12% (consens între pescari)
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
    if (illum < 15) { sub = 100; etich = `Lună nouă (${illum}%) — ideal (±2 zile pre-depunere)`; }
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

export type Pattern = {
  id: string;
  nume: string;
  emoji: string;
  descriere: string;
  bonus: number; // multiplicator (1.0 = neutral, 1.25 = +25%)
};

export type TrendInfo = {
  pressureStable: boolean;
  windCalm: boolean;
  cotaTrend: "rising" | "falling" | "stable" | "unknown";
  fronctActivator: boolean;
  multiplier: number;
};

export type SemanticRecommendation = {
  verdict: "du-te" | "du-te-scurt" | "muta-te" | "stai-acasa" | "schimba-specia";
  motiv: string;
  fereastra?: string;
};

export interface ScorulZilei {
  total: number;
  raw: number;
  label: string;
  cssColor: string;
  factors: FactorBreakdown[];
  reasons: { text: string; positive: boolean }[];
  patterns: Pattern[];
  trend: TrendInfo;
  semantic: SemanticRecommendation;
}

// Detectează ferestrele celebre din partidele documentate
function detecteazaPatterns(
  specie: Specie,
  forecast: DailyForecast,
  forecastsPrev: DailyForecast[], // ultimele 0-3 zile
  moon: MoonPhaseInfo,
  water: WaterLevelReading | null,
  date: Date,
  waterTemp: number,
  cotaHistory: CotaHistPoint[] = [],
): Pattern[] {
  const patterns: Pattern[] = [];
  const month = date.getMonth() + 1;
  const isPrev3 = forecastsPrev.length >= 3;
  const noStorm3Days = isPrev3 && forecastsPrev.every((f) => f.precipitation < 5 && f.windMax < 25);

  // 1. Săptămâna magică primăvară (consens multi-pescari documentat)
  if (specie.id === "crap" && month >= 3 && month <= 5) {
    const airWarm = forecast.tempMax > 20;
    const waterWarm = waterTemp >= 10;
    const cotaOK = !water || (water.level >= 150);
    if (airWarm && waterWarm && cotaOK && noStorm3Days) {
      patterns.push({
        id: "saptamana-magica",
        nume: "Săptămâna magică",
        emoji: "🌸",
        descriere: "Apă >10°C + aer >20°C + cotă bună + 3 zile stabile = pre-depunere activă. Documentat de mulți pescari Delta.",
        bonus: 1.20,
      });
    }
  }

  // 2. Fereastra de pre-depunere (crap)
  if (specie.id === "crap") {
    const lunaIdeala = moon.illumination < 15 || moon.illumination > 85;
    const cotaOK = water && water.level >= 150 && water.level <= 200;
    const presStable = isPrev3 && forecastsPrev.every((f) => Math.abs(f.pressure - forecast.pressure) <= 3);
    if (lunaIdeala && cotaOK && presStable) {
      patterns.push({
        id: "fereastra-pre-depunere",
        nume: "Fereastra de pre-depunere",
        emoji: "🎯",
        descriere: "Lună ±2 zile + cotă 150-200 + presiune stabilă 3 zile = momentul ideal pe Dunărea Veche și canalele de tranzit.",
        bonus: 1.18,
      });
    }
  }

  // 3. Front activator (somn + crap pe somn)
  if (specie.id === "somn" || specie.id === "crap") {
    const presDrop = forecastsPrev.length >= 1 && (forecastsPrev[0].pressure - forecast.pressure) > 4;
    const ploaie = forecast.precipitation > 0.5 && forecast.precipitation < 12;
    const ventCreste = forecastsPrev.length >= 1 && forecast.windMax > forecastsPrev[0].windMax + 5;
    if (presDrop && ploaie && ventCreste) {
      patterns.push({
        id: "front-activator",
        nume: "Front activator",
        emoji: "⚡",
        descriere: "Presiune scădere + ploaie ușoară + vânt în creștere = peștii activează înainte de front meteo.",
        bonus: specie.id === "somn" ? 1.22 : 1.12,
      });
    }
  }

  // 4. Post-furtună (toate speciile)
  if (isPrev3) {
    const cele2Anterioare = forecastsPrev.slice(0, 2);
    const haveStorm = cele2Anterioare.some((f) => f.windMax > 25 || f.precipitation > 10);
    const acumCalm = forecast.windMax < 15 && forecast.precipitation < 2;
    if (haveStorm && acumCalm) {
      patterns.push({
        id: "post-furtuna",
        nume: "Post-furtună",
        emoji: "🌤️",
        descriere: "Ferestră 3-4h după ce trece furtuna. Peștii ies activ după presiunea s-a stabilizat.",
        bonus: 1.13,
      });
    }
  }

  // 5. Bate norocul (crap noiembrie)
  if (specie.id === "crap" && month === 11) {
    const cotaRising = water?.trend === "rising";
    const apaRece = waterTemp >= 8 && waterTemp <= 13;
    if (cotaRising && apaRece) {
      patterns.push({
        id: "bate-norocul",
        nume: "Bate norocul",
        emoji: "🍂",
        descriere: "Strategia GDA: noiembrie + cotă în creștere + apă 8-13°C = crap mare pe canale Delta.",
        bonus: 1.17,
      });
    }
  }

  // ============ PATTERNS BAZATE PE ISTORIC COTA (multi-zi) ============
  // Sortat ascendent cronologic; valoarea curentă = ultima
  const sortedCota = [...cotaHistory].sort((a, b) =>
    new Date(a.measured_at).getTime() - new Date(b.measured_at).getTime()
  );

  // 7. "Crap iese din canale" — cota crescut +30cm în 3 zile + apă peste 16°C
  if (specie.id === "crap" && sortedCota.length >= 3 && waterTemp >= 16) {
    const last = sortedCota[sortedCota.length - 1].level_cm;
    const treiZileInUrma = sortedCota[Math.max(0, sortedCota.length - 4)].level_cm;
    const crestere = last - treiZileInUrma;
    if (crestere >= 30) {
      patterns.push({
        id: "iesire-din-canale",
        nume: "Crap iese din canale",
        emoji: "🌊",
        descriere: `Cota +${crestere}cm în 3 zile + apă ${Math.round(waterTemp)}°C. Crapii migrează din lacuri spre brațe/canale, descoperă mâncarea pe malurile inundate.`,
        bonus: 1.15,
      });
    }
  }

  // 8. "Retragere pe brațe" — cota scade rapid în 3 zile (anti-pattern pentru canale)
  if (sortedCota.length >= 3) {
    const last = sortedCota[sortedCota.length - 1].level_cm;
    const treiZileInUrma = sortedCota[Math.max(0, sortedCota.length - 4)].level_cm;
    const scadere = treiZileInUrma - last;
    if (scadere >= 25 && (specie.id === "crap" || specie.id === "somn")) {
      patterns.push({
        id: "retragere-pe-brate",
        nume: "Retragere pe brațe",
        emoji: "⚠️",
        descriere: `Cota -${scadere}cm în 3 zile. Peștii fug din canale interioare spre brațe adânci (Sulina, Chilia). EVITĂ canale înguste, focus pe brațe.`,
        bonus: 0.92,
      });
    }
  }

  // 9. "Lockdown la cioate" — cota stabilă (variație ≤10cm) timp de 5+ zile la nivel scăzut
  if ((specie.id === "crap" || specie.id === "somn") && sortedCota.length >= 5) {
    const ultimele5 = sortedCota.slice(-5);
    const levels = ultimele5.map((p) => p.level_cm);
    const max = Math.max(...levels);
    const min = Math.min(...levels);
    const variation = max - min;
    const avgLevel = levels.reduce((s, x) => s + x, 0) / levels.length;
    if (variation <= 10 && avgLevel < 100) {
      patterns.push({
        id: "lockdown-cioate",
        nume: "Lockdown la cioate",
        emoji: "🔒",
        descriere: `Cota stabilă (±${Math.round(variation/2)}cm) sub 100 timp de 5+ zile. Peștii lipiți de cioate adânci, sezonul feeder/clonc pe locație fixă. Răbdare 3-4 zile pe același loc (regula Mihai Manea).`,
        bonus: 1.10,
      });
    }
  }

  // 6. Era begului (post-prohibiție iunie)
  if (specie.id === "crap" && month === 6 && date.getDate() >= 8 && date.getDate() <= 25) {
    const apaOK = waterTemp >= 15 && waterTemp <= 22;
    if (apaOK) {
      patterns.push({
        id: "era-begului",
        nume: "Era begului",
        emoji: "💪",
        descriere: "Post-prohibiție + apă optimă + pre-depunere terminat = PVA cu plumb greu (Costache) = capturi active.",
        bonus: 1.10,
      });
    }
  }

  // ============ PATTERNS PE SPECII NON-CRAP + UNIVERSALE ============

  // 10. Bătaia știucii (pre-depunere februarie-martie)
  if (specie.id === "stiuca" && (month === 2 || month === 3)) {
    const apaPreDep = waterTemp >= 6 && waterTemp <= 12;
    const presIn = forecast.pressure >= 1015; // anticiclonic
    if (apaPreDep && presIn) {
      patterns.push({
        id: "bataia-stiucii",
        nume: "Bătaia știucii",
        emoji: "🌸",
        descriere: `Februarie-martie + apă ${Math.round(waterTemp)}°C (6-12°C optim pre-depunere) + presiune ridicată. Știuca atacă agresiv la BUZA stufului. Lansaje SCURTE din barcă, jig 6-8 cm.`,
        bonus: 1.22,
      });
    }
  }

  // 11. Frenezia șalău post-prohibiție (iunie-iulie, după 7 iunie)
  if (specie.id === "salau" && ((month === 6 && date.getDate() >= 8) || month === 7)) {
    const apaOK = waterTemp >= 14 && waterTemp <= 20;
    if (apaOK) {
      patterns.push({
        id: "frenezie-salau-post-prohibitie",
        nume: "Frenezie șalău post-prohibiție",
        emoji: "⚡",
        descriere: `Șalău flămând după prohibiția feb-iun + apă ${Math.round(waterTemp)}°C optimă. Crepuscul dimineață/seară pe canale adânci. Jigging vertical 8-12cm shad, banc activ.`,
        bonus: 1.18,
      });
    }
  }

  // 12. Bibanul de toamnă (bancuri masive octombrie)
  if (specie.id === "biban" && month === 10) {
    const apaTomna = waterTemp >= 11 && waterTemp <= 16;
    if (apaTomna) {
      patterns.push({
        id: "biban-toamna",
        nume: "Bibanul de toamnă",
        emoji: "🍂",
        descriere: `Octombrie + apă ${Math.round(waterTemp)}°C = bancuri masive de bibani la vânătoare. Atacă tot — micro-jig 3-5g, năluci 4-6cm, drop-shot pe maluri stuf.`,
        bonus: 1.18,
      });
    }
  }

  // 13. Crap pe vetre baltă (mai-iunie, cota scăzută, apă caldă, lacuri Delta)
  if (specie.id === "crap" && (month === 5 || month === 6) && waterTemp >= 18) {
    const cotaScazuta = water && water.level < 130;
    if (cotaScazuta) {
      patterns.push({
        id: "crap-vetre-balta",
        nume: "Crap pe vetre de baltă",
        emoji: "🏞️",
        descriere: `Cotă ${water.level} (sub 130) + apă ${Math.round(waterTemp)}°C. Crapul activ în lacurile Delta (Fortuna, Puiu, Roșu, Matița), nu pe brațe. Static cu boilies fishmeal pe maluri cu stuf.`,
        bonus: 1.15,
      });
    }
  }

  // 14. Caniculă pe adânc (iulie-august, apă peste 24°C)
  if (specie.id === "crap" && (month === 7 || month === 8) && waterTemp >= 24) {
    patterns.push({
      id: "canicula-adanc",
      nume: "Caniculă pe adânc",
      emoji: "🌞",
      descriere: `Apă ${Math.round(waterTemp)}°C — caniculă. Crap mare doar pe brațe profunde (Chilia 10-15m, Sulina Mila 8) la umbra cioate. Activ DOAR dimineață 5-9 AM și seară 19-22.`,
      bonus: 1.10,
    });
  }

  // 15. Somn clonc nocturn (vara, apă caldă, lună extremă, presiune stabilă)
  if (specie.id === "somn" && month >= 5 && month <= 9) {
    const apaCalda = waterTemp >= 20 && waterTemp <= 26;
    const lunaExtrema = moon.illumination < 15 || moon.illumination > 85;
    const presStable = isPrev3 && forecastsPrev.every((f) => Math.abs(f.pressure - forecast.pressure) <= 3);
    if (apaCalda && lunaExtrema && presStable) {
      patterns.push({
        id: "somn-clonc-nocturn",
        nume: "Somn clonc nocturn",
        emoji: "🌙",
        descriere: `Apă ${Math.round(waterTemp)}°C + lună ${moon.illumination}% (extremă) + presiune stabilă. Clonc la 22:00-04:00 pe șenal Dunăre profund, sub cioate.`,
        bonus: 1.18,
      });
    }
  }

  // 16. Front rece (anti-pattern toate speciile — presiune urcă rapid)
  if (forecastsPrev.length >= 1) {
    const presCrestere = forecast.pressure - forecastsPrev[0].pressure >= 6;
    const tempScadere = forecastsPrev[0].tempMax - forecast.tempMax >= 5;
    if (presCrestere && tempScadere) {
      patterns.push({
        id: "front-rece",
        nume: "Front rece",
        emoji: "❄️",
        descriere: `Presiune +${Math.round(forecast.pressure - forecastsPrev[0].pressure)} hPa + temperatură -${Math.round(forecastsPrev[0].tempMax - forecast.tempMax)}°C = front rece. Peștii apatici 24-48h. Așteaptă stabilizare.`,
        bonus: 0.85,
      });
    }
  }

  // 17. Apă tulbure post-ploaie (carnasiere + somn = bonus, crap = neutru)
  if (forecastsPrev.length >= 1 && forecastsPrev[0].precipitation > 10) {
    const acumLinistit = forecast.precipitation < 3;
    if (acumLinistit && (specie.id === "salau" || specie.id === "stiuca" || specie.id === "biban" || specie.id === "somn")) {
      patterns.push({
        id: "apa-tulbure-post-ploaie",
        nume: "Apă tulbure post-ploaie",
        emoji: "💧",
        descriere: `Ploaie ${Math.round(forecastsPrev[0].precipitation)}mm ieri, calm azi. Vizibilitate redusă = vânătoare ușoară pentru carnasiere. Năluci vibrante/colorate, somn pe mal.`,
        bonus: 1.13,
      });
    }
  }

  return patterns;
}

// Calculează stabilitatea trendului ultimelor 3 zile
function calculeazaTrend(
  forecast: DailyForecast,
  forecastsPrev: DailyForecast[],
  water: WaterLevelReading | null,
): TrendInfo {
  const isPrev3 = forecastsPrev.length >= 3;
  const allForecasts = [forecast, ...forecastsPrev];

  const pressures = allForecasts.map((f) => f.pressure);
  const pressureRange = Math.max(...pressures) - Math.min(...pressures);
  const pressureStable = isPrev3 && pressureRange <= 6;

  const windCalm = isPrev3 && forecastsPrev.every((f) => f.windMax < 20);

  let cotaTrend: TrendInfo["cotaTrend"] = "unknown";
  if (water) cotaTrend = water.trend;

  const presDrop = forecastsPrev.length >= 1 && (forecastsPrev[0].pressure - forecast.pressure) > 4;
  const ploaie = forecast.precipitation > 0.5 && forecast.precipitation < 12;
  const fronctActivator = presDrop && ploaie;

  let multiplier = 1.0;
  if (pressureStable) multiplier += 0.05;
  if (windCalm) multiplier += 0.03;
  if (cotaTrend === "stable") multiplier += 0.04;
  if (cotaTrend === "rising") multiplier += 0.02;

  return { pressureStable, windCalm, cotaTrend, fronctActivator, multiplier };
}

// Generează verdict semantic — "Du-te" / "Mută-te" / "Stai acasă"
function generaSemantic(
  scor: number,
  forecast: DailyForecast,
  trend: TrendInfo,
  patterns: Pattern[],
): SemanticRecommendation {
  // Pattern detectat = recomandare puternică
  const hasMajorPattern = patterns.some((p) => p.bonus >= 1.18);
  if (hasMajorPattern) {
    return {
      verdict: "du-te",
      motiv: `Pattern detectat: ${patterns.find((p) => p.bonus >= 1.18)!.nume}. Fereastra apare rar — profită.`,
      fereastra: "partidă completă",
    };
  }

  // Pattern de impact mediu (Bate norocul, Era begului, Lockdown, Crap iese)
  const mediumPattern = patterns.find((p) => p.bonus >= 1.10 && p.bonus < 1.18);
  if (mediumPattern && scor >= 70) {
    return {
      verdict: "du-te",
      motiv: `${mediumPattern.nume} activ + scor ${scor}/100. ${mediumPattern.descriere.slice(0, 80)}...`,
      fereastra: "partidă întreagă",
    };
  }

  if (scor >= 75 && trend.pressureStable) {
    return {
      verdict: "du-te",
      motiv: "Condiții excelente + trend stabil 3 zile = partidă lungă justificată.",
      fereastra: "2-3 zile",
    };
  }

  // Scor mare fără pattern major — construim motivul din forecast concret
  if (scor >= 80) {
    const apa = forecast.waterTempDeep != null ? `apă ${Math.round(forecast.waterTempDeep)}°C` : null;
    const vant = `vânt ${forecast.windMax} km/h`;
    const presiune = forecast.pressureTrend === "stable" ? "presiune stabilă"
      : forecast.pressureTrend === "rising" ? "presiune în creștere"
      : "presiune în scădere";
    const parts = [apa, vant, presiune].filter(Boolean).join(", ");
    return {
      verdict: "du-te",
      motiv: `Scor ${scor}/100 — ${parts}. Pune câteva ore deoparte.`,
      fereastra: "partidă completă",
    };
  }

  if (scor >= 60 && trend.fronctActivator) {
    return {
      verdict: "du-te-scurt",
      motiv: "Fereastră scurtă activator front. Atacă în primele 4-6h, apoi pleacă înainte de furtună.",
      fereastra: "4-6 ore",
    };
  }

  if (scor >= 55 && forecast.windMax > 25) {
    return {
      verdict: "muta-te",
      motiv: `Vânt ${forecast.windMax} km/h — caută mal adăpostit (opus vântului) sau canal protejat.`,
    };
  }

  if (scor < 35) {
    return {
      verdict: "stai-acasa",
      motiv: "Condițiile contra. Folosește timpul pentru pregătire monturi sau studiu.",
    };
  }

  if (scor >= 45 && scor < 65) {
    return {
      verdict: "du-te-scurt",
      motiv: "Condiții medii — du-te DOAR dacă timpul permite, fără așteptări mari.",
      fereastra: "matinal sau seral",
    };
  }

  return {
    verdict: "du-te",
    motiv: "Condiții bune — partidă normală.",
  };
}

export type CotaHistPoint = { level_cm: number; measured_at: string };

export function calculeazaScor(
  specie: Specie,
  forecast: DailyForecast,
  moon: MoonPhaseInfo,
  water: WaterLevelReading | null,
  date: Date,
  forecastsPrev: DailyForecast[] = [], // ultimele 0-3 zile pentru lookback
  cotaHistory: CotaHistPoint[] = [], // istoric cotă pentru pattern-uri pe trend multi-zi
): ScorulZilei {
  if (isInProhibitie(specie, date)) {
    return {
      total: 0,
      raw: 0,
      label: "Prohibiție",
      cssColor: "text-red-400",
      reasons: [{ text: "Specia e în prohibiție — pescuitul interzis", positive: false }],
      factors: [],
      patterns: [],
      trend: { pressureStable: false, windCalm: false, cotaTrend: "unknown", fronctActivator: false, multiplier: 1 },
      semantic: { verdict: "stai-acasa", motiv: "Prohibiție." },
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
  const rawScore = Math.round((totalContribution / totalWeight) * 100);

  // ============ NIVEL 2: PATTERN RECOGNITION + TREND + COMBINAȚII NON-LINIARE ============
  const trend = calculeazaTrend(forecast, forecastsPrev, water);
  const patterns = detecteazaPatterns(specie, forecast, forecastsPrev, moon, water, date, waterTemp, cotaHistory);

  // Aplicare modificatori multiplicativi
  let finalScore = rawScore * trend.multiplier;
  patterns.forEach((p) => { finalScore *= p.bonus; });

  // Non-linear combinations
  // Presiune scădere + ploaie ușoară pentru somn = boost extra (front activator confirmat)
  if (specie.id === "somn" && trend.fronctActivator) {
    finalScore *= 1.05;
  }
  // Cotă mică (sub 100) + apă rece = catastrofă multiplicativă
  if (water && water.level < 100 && waterTemp < 12) {
    finalScore *= 0.85;
  }

  const score = Math.max(0, Math.min(100, Math.round(finalScore)));

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

  const semantic = generaSemantic(score, forecast, trend, patterns);

  return { total: score, raw: rawScore, label, cssColor, factors, reasons, patterns, trend, semantic };
}

// Context pentru recomandări inteligente
export type RecomandareContext = {
  forecast?: DailyForecast;
  trend?: TrendInfo;
  patterns?: Pattern[];
  cota?: number; // cota Tulcea cm
  waterTemp?: number;
};

// Pattern-uri și locurile pe care le activează
const PATTERN_LOCURI: Record<string, string[]> = {
  "saptamana-magica": ["bratul-tataru", "canalul-iacub", "mila-23", "boda-proste-lopatna"],
  "fereastra-pre-depunere": ["dunarea-veche", "mila-23", "canalul-ingusta"],
  "bate-norocul": ["canalul-litcov", "mila-23", "canalul-ingusta", "dunarea-veche-mila23-lopatna"],
  "era-begului": ["boda-proste-lopatna", "canalul-ingusta", "mila-23"],
  "front-activator": ["bratul-chilia", "bratul-sfantu-gheorghe", "groapa-25m-chilia-tatanir", "chilia-veche-pragul-22m"],
  "post-furtuna": [], // toate
};

// Recomandă LOCURI scor-based — filtrat strict Delta + context
export function recomandaLocuri(specie: Specie, date: Date, ctx?: RecomandareContext): Loc[] {
  const month = date.getMonth() + 1;
  const luniRO = ["ianuarie","februarie","martie","aprilie","mai","iunie","iulie","august","septembrie","octombrie","noiembrie","decembrie"];
  const lunaActuala = luniRO[month - 1];

  // STRICT: doar Delta
  const candidates = locuri.filter((l) => l.regiune === "delta" && l.specii.includes(specie.id));
  if (!candidates.length) return [];

  // Scor per loc
  const scoruri = candidates.map((l) => {
    let scor = 30; // baseline

    // 1. Match sezon (luna)
    const matchLuna = l.sezon.some((s) => s.toLowerCase().includes(lunaActuala));
    if (matchLuna) scor += 25;
    else if (l.sezon.length === 0) scor += 5; // generic
    else scor -= 10; // în afara sezonului

    // 2. Match cu cota Tulcea (dacă o avem)
    if (ctx?.cota !== undefined) {
      const cota = ctx.cota;
      if (cota < 100 && l.preferaCotaMica) scor += 18;
      else if (cota > 200 && l.preferaCotaMare) scor += 18;
      else if (cota >= 150 && cota <= 200 && (l.tip === "canal" || l.slug === "dunarea-veche")) scor += 15;
    }

    // 3. Vânt mare → preferă adăpostit
    if (ctx?.forecast?.windMax && ctx.forecast.windMax > 22) {
      if (l.adapostitDeVant) scor += 18;
      else if (l.tip === "brat") scor -= 12; // brațe largi cu val
    }

    // 4. Patterns activează locuri specifice
    if (ctx?.patterns) {
      for (const p of ctx.patterns) {
        const locuriPattern = PATTERN_LOCURI[p.id];
        if (locuriPattern?.includes(l.slug)) {
          scor += Math.round((p.bonus - 1) * 100); // bonus pattern
        }
      }
    }

    // 5. Trend cota în creștere + canale interioare = boost (peștii intră în Deltă)
    if (ctx?.trend?.cotaTrend === "rising" && l.tip === "canal") scor += 8;

    // 6. Apă rece (<12°C) + canale interioare = boost (apă mai stabilă)
    if (ctx?.waterTemp !== undefined && ctx.waterTemp < 12 && l.tip === "canal") scor += 10;

    return { loc: l, scor };
  });

  // Sortez descrescător + top 5
  scoruri.sort((a, b) => b.scor - a.scor);
  return scoruri.slice(0, 5).map((s) => s.loc);
}

// Toate locurile Delta pentru specia (fără filtru sezon/scor)
export function toateLocurileDelta(specie: Specie): Loc[] {
  return locuri.filter((l) => l.regiune === "delta" && l.specii.includes(specie.id));
}

// Ghid spațial — traduce condițiile actuale în "unde caut peștele acum?"
export type GhidSpatial = {
  unde: string;        // titlu scurt: "Pe brațele principale"
  deCe: string;        // explicație: "Cota mică + apa caldă = peștii fug din canale"
  evitati?: string;    // anti-pattern: "NU pierde timp pe canale înguste"
  detalii?: string[];  // sfaturi adiționale punctuale
  pozitionareVant?: PozitionareVant; // unde să te așezi ca să nu te deranjeze vântul
};

export type PozitionareVant = {
  intensitate: "calm" | "moderat" | "puternic" | "extrem";
  directie: string;     // ex. "NV"
  pozitie: string;      // ex. "Cot adăpostit pe malul SE / canal protejat de stuf"
  detalii?: string[];   // sfaturi punctuale
};

function genereazaPozitionareVant(windKmh: number, windDir: number): PozitionareVant | null {
  if (windKmh < 8) return null; // vânt slab — nu deranjează
  const dir = degreeToCardinal(windDir);

  let intensitate: PozitionareVant["intensitate"] = "moderat";
  if (windKmh < 15) intensitate = "moderat";
  else if (windKmh < 25) intensitate = "puternic";
  else intensitate = "extrem";

  // Logica de poziționare:
  // 1. Te așezi pe MALUL DINSPRE CARE BATE vântul (vântul vine din spate)
  //    → adăposit, val merge spre malul opus, dar peștii sunt pe malul OPUS (care e bătut de val)
  // 2. Sau te așezi la confluență/cot adăpostit
  // 3. Pe vânt extrem (>25 km/h) → caută canale înguste cu maluri înalte

  const oppositeDir: Record<string, string> = {
    N: "S", NE: "SV", E: "V", SE: "NV", S: "N", SV: "NE", V: "E", NV: "SE",
  };
  const malOpus = oppositeDir[dir] || dir;

  if (intensitate === "moderat") {
    return {
      intensitate, directie: dir,
      pozitie: `Stai cu spatele la vânt (mal ${dir}) — val face oxigenare bună pe malul ${malOpus} unde sunt peștii`,
      detalii: [
        "Lansare cu vântul = distanță mare",
        `Peștii vin pe malul ${malOpus} după mâncarea adusă de val (insecte, semințe)`,
        "Vânt moderat = bun pentru pescuit, oxigenează apa",
      ],
    };
  }

  if (intensitate === "puternic") {
    return {
      intensitate, directie: dir,
      pozitie: `Caută cot adăpostit pe malul ${dir} — val mare pe brațe principale, mută-te pe canal interior`,
      detalii: [
        `Brațe Sulina/Chilia cu vânt ${dir} ${windKmh} km/h = val 0.5-1m, lansaj dificil`,
        "Canalele interioare (Mila 23, Boda Proste, Crișan-Îngusta) = adăpost natural cu maluri înalte de stuf",
        `În barcă: prova FIX în vânt (NU lateral — se învârte), funia ancorei dublată`,
        `Peștii MARI vin pe malul ${malOpus} bătut de val (vibrație + insecte căzute)`,
      ],
    };
  }

  // extrem
  return {
    intensitate, directie: dir,
    pozitie: `STAI ÎN PORT — vânt ${windKmh} km/h pe brațele Deltei = val 1m+, pericol real`,
    detalii: [
      "Pescuit doar pe canale interioare COMPLET adăpostite (Mila 23 canal Sontea, Litcov, Crișan interior)",
      "Sub copaci scufundați + maluri înalte cu stuf",
      `Risc cod portocaliu/roșu — verifică RoAlert dacă vântul ține peste 6h`,
      "Cot/portar de pensiune (Gigant Fish, Lebăda) = singura opțiune sigură",
    ],
  };
}

function degreeToCardinal(deg: number): string {
  const dirs = ["N", "NE", "E", "SE", "S", "SV", "V", "NV"];
  return dirs[Math.round(deg / 45) % 8];
}

export function genereazaGhidSpatial(specie: Specie, ctx: RecomandareContext): GhidSpatial | null {
  const ghid = _genereazaGhidInternal(specie, ctx);
  if (!ghid) {
    // Chiar fără ghid spațial, dacă e vânt putem returna doar poziționarea
    if (ctx.forecast?.windMax !== undefined && ctx.forecast?.windDirection !== undefined) {
      const poz = genereazaPozitionareVant(ctx.forecast.windMax, ctx.forecast.windDirection);
      if (poz) return { unde: "—", deCe: "—", pozitionareVant: poz };
    }
    return null;
  }
  if (ctx.forecast?.windMax !== undefined && ctx.forecast?.windDirection !== undefined) {
    ghid.pozitionareVant = genereazaPozitionareVant(ctx.forecast.windMax, ctx.forecast.windDirection) ?? undefined;
  }
  return ghid;
}

function _genereazaGhidInternal(specie: Specie, ctx: RecomandareContext): GhidSpatial | null {
  const cota = ctx.cota;
  const apa = ctx.waterTemp;
  const vant = ctx.forecast?.windMax ?? 0;
  const vantDir = ctx.forecast?.windDirection;
  const presTrend = ctx.forecast?.pressureTrend;
  const cotaTrend = ctx.trend?.cotaTrend;
  const patterns = ctx.patterns ?? [];

  // ============ CRAP ============
  if (specie.id === "crap") {
    if (cota !== undefined && cota > 250) {
      return {
        unde: "În lacurile interioare",
        deCe: `Cota Tulcea ${cota} cm = ape mari. Crapul s-a mutat din canale în lacurile inundate (mâncare abundentă pe vegetația proaspăt acoperită).`,
        evitati: "Brațele principale și canalele de tranzit sunt seci de crap.",
        detalii: [
          "Lacurile din nord de Mila 23 (Brateș, Roșu, Matița)",
          "Ghioluri laterale cu stuf inundat",
          "Apropie-te de marginile inundate, NU centrul lacului",
        ],
      };
    }
    if (cota !== undefined && cota >= 150 && cota <= 200) {
      return {
        unde: "Pe canale Delta + Dunărea Veche",
        deCe: `Cota ${cota} cm = OPTIMĂ. Crapul circulă pe canalele de tranzit între brațe — momentul ideal pe Dunărea Veche, Mila 23, Crișan-Îngusta.`,
        detalii: [
          "Dunărea Veche (Mila 23 → Crișan) = șansa la crap capital",
          "Canalele Boda Proste, Lopatna, Litcov — peștii migrează",
          "Cota OPTIMĂ + presiune stabilă = du-te pentru partidă lungă",
        ],
      };
    }
    if (cota !== undefined && cota >= 100 && cota < 150) {
      return {
        unde: "Mixt — canale interioare + brațe",
        deCe: `Cota ${cota} cm = mediu. Peștele se distribuie pe canale + zonele de tranziție de pe brațe.`,
        detalii: [
          "Verifică vântul: pe vânt mare → canale (adăpost)",
          "Pe vânt slab → brațe principale cu acces la cioate",
          "Decizia depinde mai mult de apă + presiune decât de cotă",
        ],
      };
    }
    if (cota !== undefined && cota < 100) {
      return {
        unde: "Pe brațele principale Sulina / Chilia / Sf. Gheorghe",
        deCe: `Cota ${cota} cm = scăzută. Crapul a fugit din canalele înguste (rămase fără apă suficientă) și s-a cantonat pe brațele principale unde mai e adâncime.`,
        evitati: "NU pierde timp pe canalele Crișan-Îngusta, Boda Proste, Lopatna — sunt aproape goale.",
        detalii: [
          "Chilia Veche prag 22m = aur la cotă mică",
          "Sf. Gheorghe pe gropi adânci",
          "Sulina pe șenal lângă pietre / epi-uri",
        ],
      };
    }
    if (apa !== undefined && apa > 24) {
      return {
        unde: "Pe adâncime, doar matinal/seral",
        deCe: `Apa ${apa}°C = caniculă. Crapul refuză apă caldă de suprafață, se duce pe 8-15m. Nu mănâncă între 11:00-16:00.`,
        detalii: [
          "Ferestre: 05:00-09:00 și 19:00-23:00",
          "Sondează pe sonar adâncimi 8-15m pe brațe",
          "Folosește boilies semi-solubile (țin 24h+)",
        ],
      };
    }
    return null;
  }

  // ============ SOMN ============
  if (specie.id === "somn") {
    if (apa !== undefined && apa < 14) {
      return {
        unde: "Aproape inactiv pe Dunăre",
        deCe: `Apa ${apa}°C = somn în repaus metabolic. Singura excepție: canalele cu apă caldă (CNE Cernavodă).`,
        evitati: "Cloncul pe Chilia/Sf. Gheorghe = pierdere de timp.",
        detalii: [
          "Așteaptă apa să urce peste 16°C",
          "SAU mergi pe canalul de evacuare CNE Cernavodă (apă caldă constantă)",
        ],
      };
    }
    if (presTrend === "falling" || ctx.trend?.fronctActivator) {
      return {
        unde: "Pe gropi adânci + clonc activ",
        deCe: "Presiunea scade = front meteo iminent. SOMNUL ACTIVEAZĂ înainte de furtună — momentul cel mai bun pentru clonc.",
        detalii: [
          "Groapa 25-27m Chilia (lângă Tatanir)",
          "Chilia Veche pe pragul 22m",
          "Sf. Gheorghe pe gropile adânci",
          "Folosește vier de salcie + coropișniță (regină)",
        ],
      };
    }
    if (apa !== undefined && apa >= 22) {
      return {
        unde: "Pe gropi adânci NOAPTEA",
        deCe: `Apa ${apa}°C = caldă. Somnul stă pe fund 15-25m ziua, urcă să mănânce noaptea (22:00-04:00).`,
        detalii: [
          "Cloncul după apus și înainte de răsărit",
          "Ziua doar gher — economisește energia",
        ],
      };
    }
    return {
      unde: "Pe gropile clasice Chilia / Sf. Gheorghe",
      deCe: "Condiții normale = pescuit standard pe gropile cunoscute. Activitate moderată matinal+seral.",
      detalii: [
        "Groapa 25-27m Chilia",
        "Chilia Veche pragul 22m",
        "Vier de salcie + coropișniță > râme negre",
      ],
    };
  }

  // ============ ȘTIUCĂ ============
  if (specie.id === "stiuca") {
    if (apa !== undefined && apa > 22) {
      return {
        unde: "În lacuri pe vegetație, matinal/seral",
        deCe: `Apa ${apa}°C = prea caldă pentru știuca activă ziua. Stă la umbră în nuferi, dormit pe căldură.`,
        detalii: [
          "Spot-uri umbroase pe lacurile Mila 23 nord",
          "Topwater dimineața 05:00-08:00 / seara 19:00-21:00",
          "Stația 11 — confirmate exemplare 90+ cm pe topwater",
        ],
      };
    }
    if (apa !== undefined && apa < 8) {
      return {
        unde: "Pe adâncime — jigging clasic",
        deCe: `Apa ${apa}°C = știuca lentă, jos. Caută praguri și cioate pe adâncime 4-8m.`,
        detalii: [
          "Jighead 3-7g cu gumă mică (6-8 cm)",
          "Storm Jointed Minnow Fire Tiger = standardul iarna",
          "Lacuri interioare Mila 23",
        ],
      };
    }
    return {
      unde: "Pe lacuri cu vegetație, lângă structuri",
      deCe: "Condiții optime. Caută cioate, nuferi, marginea stufului.",
      detalii: [
        "Lacuri Mila 23 nord",
        "Stația 11 = exemplare mari pe topwater",
        "Slider Salmo 7 = trend dominant pe lacuri",
      ],
    };
  }

  // ============ ȘALĂU ============
  if (specie.id === "salau") {
    if (vant > 25) {
      return {
        unde: "Pe mal adăpostit, jigging vertical",
        deCe: `Vânt ${vant} km/h = șalău fuge de val. Caută zonele protejate de vânt.`,
        detalii: [
          "Cot de mal opus vântului",
          "Praguri în zona adăpostită",
          "Gumă verde clasic + jighead mai greu pentru val",
        ],
      };
    }
    if (apa !== undefined && apa < 12) {
      return {
        unde: "Pe praguri adânci, jigging lent",
        deCe: `Apa ${apa}°C = șalău cantonat pe praguri 8-12m. Atacuri firave — finețe maximă.`,
        detalii: [
          "Jighead 3.5g (NU mai greu — atac nervos)",
          "Gumă verde 7 cm cu burtă deschisă",
          "Înțepare INSTANT la primul atac",
        ],
      };
    }
    return {
      unde: "Pe primul prag de la mal",
      deCe: "Condiții normale. Șalău pe primul prag (3-6m de mal), nu departe.",
      detalii: [
        "Lansare paralel cu malul",
        "Lacul Babadag — singur loc Delta validat",
        "Apoi treptat spre larg",
      ],
    };
  }

  // ============ BIBAN ============
  if (specie.id === "biban") {
    if (cota !== undefined && cota > 200) {
      return {
        unde: "În lacuri interioare cu apă limpede",
        deCe: `Cota ${cota} cm = lacurile sunt pline cu apă proaspătă. Bibanii migrează acolo după caras/roșioară.`,
        detalii: [
          "Lacuri Mila 23 nord",
          "Bance compacte pe Live Scope",
          "Microjig cu gumă Motoroil 4 cm",
        ],
      };
    }
    return {
      unde: "Pe Dunărea Veche, mal cu piatră",
      deCe: "Bibanii MARI lipiți de malul cu piatră. Cei mici în larg sub barcă.",
      detalii: [
        "Confluența Dunărea Veche - Canal Lopatna",
        "Jighead 5g (NU 7-10 — agață piatra)",
        "Fast Strike Motoroil + Bass Assassin Electric Chicken",
      ],
    };
  }

  // ============ AVAT ============
  if (specie.id === "avat") {
    return {
      unde: "Pe epi-urile Sulina, în anaforuri",
      deCe: "Avatul vânează vizual pe suprafață. Anaforul din spatele epiului = locul ideal.",
      detalii: [
        "Răsărit 5:00-8:00 = ora de aur",
        "Helic Nikel 16-17g sau Duo Realis 14.5g",
        "Vânat VIZUAL — dacă vezi sărituri, lansează acolo",
      ],
    };
  }

  return null;
}

// Pattern → tehnici activate (cele mai relevante când pattern e activ)
const PATTERN_TEHNICI: Record<string, string[]> = {
  "saptamana-magica": ["crap-primavara-momitor", "porumb-fermentat-vs-fiert", "ritm-activitate-canale-primavara"],
  "fereastra-pre-depunere": ["crap-strategie-partida-lunga", "crap-vara-boilies"],
  "bate-norocul": ["crap-strategie-bate-norocul", "crap-iarna-canale-alegere"],
  "era-begului": ["pva-plumb-greu-2026", "crap-pva-navomodel"],
  "front-activator": ["somn-clonc-chilia", "clonc-sonar-live-modern", "clonc-sonar-citire", "somn-stationar-chilia-veche"],
  "post-furtuna": [],
};

// Pattern → monturi activate
const PATTERN_MONTURI: Record<string, string[]> = {
  "saptamana-magica": ["momitor-method-feeder"],
  "fereastra-pre-depunere": ["n-trap-mono-sulina", "inline-clasic-barca"],
  "bate-norocul": ["plumb-pierdut-cioata", "fluorocarbon-rigid-iarna"],
  "era-begului": [], // PVA cu plumb greu — tehnică nu montură separată în baza
  "front-activator": ["clonc-somn", "clonc-ancori-owner", "somn-stationar"],
  "post-furtuna": [],
};

// Recomandă TEHNICI scor-based — cu context
export function recomandaTehnici(specie: Specie, date: Date, ctx?: RecomandareContext): Tehnica[] {
  const month = date.getMonth() + 1;
  const luniRO = ["ianuarie","februarie","martie","aprilie","mai","iunie","iulie","august","septembrie","octombrie","noiembrie","decembrie"];
  const lunaActuala = luniRO[month - 1];

  const candidates = tehnici.filter((t) => t.specie === specie.id);
  if (!candidates.length) return [];

  const scoruri = candidates.map((t) => {
    let scor = 30; // baseline

    // 1. Match perioada (luna)
    const perioadaLower = (t.perioada || "").toLowerCase();
    if (perioadaLower.includes(lunaActuala)) scor += 30;
    else if (perioadaLower.includes("tot anul")) scor += 15;
    else scor -= 12; // în afara perioadei

    // 2. Pattern activare directă — boost mare
    if (ctx?.patterns) {
      for (const p of ctx.patterns) {
        const tehniciPattern = PATTERN_TEHNICI[p.id];
        if (tehniciPattern?.includes(t.slug)) {
          scor += 35; // boost important pe pattern direct
        }
      }
    }

    // 3. Apă rece (<12°C) → tehnici finețe / iarnă
    if (ctx?.waterTemp !== undefined && ctx.waterTemp < 12) {
      if (t.slug.includes("iarna") || t.slug.includes("finete") || t.slug.includes("prag-iarna")) scor += 15;
    }

    // 4. Apă caldă (>22°C) → tehnici vară
    if (ctx?.waterTemp !== undefined && ctx.waterTemp > 22) {
      if (t.slug.includes("vara") || t.slug.includes("boilies") || t.slug.includes("topwater")) scor += 12;
    }

    // 5. Vânt mare (>25 km/h) → tehnici de static din barcă > spinning de pe mal
    if (ctx?.forecast?.windMax && ctx.forecast.windMax > 25) {
      if (t.metoda === "spinning") scor -= 10;
      if (t.metoda === "static") scor += 5;
    }

    // 6. Front activator (somn) → tehnici clonc
    if (ctx?.trend?.fronctActivator && specie.id === "somn" && t.slug.includes("clonc")) {
      scor += 20;
    }

    // 7. Cotă mică (<100) + tehnici brațe principale
    if (ctx?.cota !== undefined && ctx.cota < 100 && (t.slug.includes("prag") || t.slug.includes("brate"))) {
      scor += 10;
    }

    return { tehnica: t, scor };
  });

  scoruri.sort((a, b) => b.scor - a.scor);
  return scoruri.slice(0, 5).map((s) => s.tehnica);
}

// Recomandă MONTURI scor-based — cu context
export function recomandaMonturi(specie: Specie, date: Date, ctx?: RecomandareContext): Montura[] {
  const month = date.getMonth() + 1;
  const candidates = monturi.filter((m) => m.pentru.includes(specie.id));
  if (!candidates.length) return [];

  const scoruri = candidates.map((m) => {
    let scor = 30; // baseline

    // 1. Match luna
    if (!m.luni || m.luni.length === 0) scor += 10; // generic universal
    else if (m.luni.includes(month)) scor += 28;
    else scor -= 15; // în afara lunii

    // 2. Pattern activare directă
    if (ctx?.patterns) {
      for (const p of ctx.patterns) {
        const monturiPattern = PATTERN_MONTURI[p.id];
        if (monturiPattern?.includes(m.slug)) {
          scor += 30;
        }
      }
    }

    // 3. Apă rece (<12°C) → monturi de iarnă / fluorocarbon rigid
    if (ctx?.waterTemp !== undefined && ctx.waterTemp < 12) {
      if (m.slug.includes("iarna") || m.slug.includes("rigid") || m.slug.includes("fluorocarbon")) scor += 15;
    }

    // 4. Vânt mare → plumb mai greu / momitor cu placă > simplu
    if (ctx?.forecast?.windMax && ctx.forecast.windMax > 25) {
      if (m.slug.includes("inline") || m.slug.includes("momitor") || m.slug.includes("pierdut")) scor += 8;
      if (m.slug.includes("topwater") || m.slug.includes("jighead")) scor -= 8;
    }

    // 5. Cotă mică + brațe principale → plumb pierdut
    if (ctx?.cota !== undefined && ctx.cota < 100 && m.slug.includes("pierdut")) {
      scor += 12;
    }

    // 6. Front activator (somn) → monturi clonc
    if (ctx?.trend?.fronctActivator && specie.id === "somn" && m.slug.includes("clonc")) {
      scor += 18;
    }

    return { montura: m, scor };
  });

  scoruri.sort((a, b) => b.scor - a.scor);
  return scoruri.slice(0, 5).map((s) => s.montura);
}

// Helper pentru compatibilitate (filtrare simplă pe lună)
export function monturiPentru(specieId: Specie["id"], date?: Date): Montura[] {
  const filtered = monturi.filter((m) => m.pentru.includes(specieId));
  if (!date) return filtered;
  const month = date.getMonth() + 1;
  return filtered.filter((m) => !m.luni || m.luni.length === 0 || m.luni.includes(month));
}
