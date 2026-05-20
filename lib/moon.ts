export interface MoonPhaseInfo {
  phase: string;
  illumination: number;
  emoji: string;
  daysInCycle: number;
  fishingEffect: string;
}

export function getMoonPhase(date: Date): MoonPhaseInfo {
  const knownNewMoon = new Date(Date.UTC(2000, 0, 6, 18, 14, 0));
  const synodicMonth = 29.53058770576;

  const diffMs = date.getTime() - knownNewMoon.getTime();
  const diffDays = diffMs / (1000 * 60 * 60 * 24);
  const cycles = diffDays / synodicMonth;
  const phase = cycles - Math.floor(cycles);
  const dayInCycle = phase * synodicMonth;

  const illumination = Math.round(
    ((1 - Math.cos(2 * Math.PI * phase)) / 2) * 100
  );

  if (dayInCycle < 1.85)
    return { phase: "Luna Noua", illumination, emoji: "🌑", daysInCycle: dayInCycle, fishingEffect: "Activitate ridicata — pestii se hranesc mai intens in lipsa luminii lunare" };
  if (dayInCycle < 7.38)
    return { phase: "Semiluna Crescatoare", illumination, emoji: "🌒", daysInCycle: dayInCycle, fishingEffect: "Activitate moderata — tranzitie spre luna plina" };
  if (dayInCycle < 9.23)
    return { phase: "Primul Patrar", illumination, emoji: "🌓", daysInCycle: dayInCycle, fishingEffect: "Activitate moderata — pescuitul dimineata e mai bun" };
  if (dayInCycle < 13.77)
    return { phase: "Gibos Crescator", illumination, emoji: "🌔", daysInCycle: dayInCycle, fishingEffect: "Activitate in crestere — se apropie luna plina" };
  if (dayInCycle < 16.61)
    return { phase: "Luna Plina", illumination, emoji: "🌕", daysInCycle: dayInCycle, fishingEffect: "Activitate ridicata — pestii sunt activi noaptea, pescuit nocturn excelent" };
  if (dayInCycle < 21.15)
    return { phase: "Gibos Descrescator", illumination, emoji: "🌖", daysInCycle: dayInCycle, fishingEffect: "Activitate in scadere — concentreaza-te pe dimineata devreme" };
  if (dayInCycle < 23.99)
    return { phase: "Ultimul Patrar", illumination, emoji: "🌗", daysInCycle: dayInCycle, fishingEffect: "Activitate moderata — pescuitul la pranz poate fi surprinzator de bun" };
  if (dayInCycle < 27.53)
    return { phase: "Semiluna Descrescatoare", illumination, emoji: "🌘", daysInCycle: dayInCycle, fishingEffect: "Activitate in crestere — se apropie luna noua" };

  return { phase: "Luna Noua", illumination, emoji: "🌑", daysInCycle: dayInCycle, fishingEffect: "Activitate ridicata — moment ideal de pescuit" };
}
