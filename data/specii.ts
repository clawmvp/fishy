export interface OptimalConditions {
  waterTempMin: number;
  waterTempMax: number;
  windMax: number;
  precipPreference: "dry" | "light_rain" | "any" | "after_rain";
  cloudPreference: "clear" | "overcast" | "any";
  moonPreference: "new" | "full" | "new_or_full" | "any";
  pressurePreference: "stable" | "falling" | "rising" | "any";
  bestTimeOfDay: string;
  cotaOptima: { min: number; max: number; nota: string };
}

export interface Specie {
  id: "crap" | "stiuca" | "salau" | "avat" | "biban" | "somn";
  nume: string;
  latin: string;
  metoda: "spinning" | "static";
  prohibitie: { start: { m: number; d: number }; end: { m: number; d: number } };
  marimeMinima: number;
  optimalConditions: OptimalConditions;
  sezonScurt: string;
}

export const specii: Specie[] = [
  {
    id: "crap",
    nume: "Crap",
    latin: "Cyprinus carpio",
    metoda: "static",
    prohibitie: { start: { m: 4, d: 15 }, end: { m: 6, d: 15 } },
    marimeMinima: 40,
    optimalConditions: {
      waterTempMin: 15,
      waterTempMax: 25,
      windMax: 20,
      precipPreference: "after_rain",
      cloudPreference: "overcast",
      moonPreference: "new",
      pressurePreference: "stable",
      bestTimeOfDay: "Dimineața devreme și seara (Vișoianu: NU ziua — albitura mănâncă)",
      cotaOptima: { min: 150, max: 200, nota: "Sub 45 = doar ciortani; 150-200 = optim canale + Dunărea Veche" },
    },
    sezonScurt: "Tot anul, vârf: iulie-august pe brațe + martie pre-prohibiție pe canale",
  },
  {
    id: "stiuca",
    nume: "Știucă",
    latin: "Esox lucius",
    metoda: "spinning",
    prohibitie: { start: { m: 1, d: 16 }, end: { m: 3, d: 31 } },
    marimeMinima: 50,
    optimalConditions: {
      waterTempMin: 8,
      waterTempMax: 18,
      windMax: 20,
      precipPreference: "any",
      cloudPreference: "overcast",
      moonPreference: "any",
      pressurePreference: "falling",
      bestTimeOfDay: "Dimineața 7-11 și după-amiaza 15-18",
      cotaOptima: { min: 60, max: 300, nota: "Mai puțin sensibil la cotă — lacurile interioare au regim propriu" },
    },
    sezonScurt: "Post-prohibiție (aprilie-iulie) + octombrie-decembrie",
  },
  {
    id: "salau",
    nume: "Șalău",
    latin: "Sander lucioperca",
    metoda: "spinning",
    prohibitie: { start: { m: 3, d: 1 }, end: { m: 4, d: 30 } },
    marimeMinima: 45,
    optimalConditions: {
      waterTempMin: 10,
      waterTempMax: 20,
      windMax: 20,
      precipPreference: "any",
      cloudPreference: "overcast",
      moonPreference: "any",
      pressurePreference: "stable",
      bestTimeOfDay: "Zori (5-8), amurg (18-21) și noapte",
      cotaOptima: { min: 80, max: 250, nota: "Pe Sulina și Argeș, NU pe canale închise" },
    },
    sezonScurt: "Octombrie + februarie (post-ger) — vârf în noiembrie",
  },
  {
    id: "avat",
    nume: "Avat",
    latin: "Aspius aspius",
    metoda: "spinning",
    prohibitie: { start: { m: 4, d: 15 }, end: { m: 5, d: 31 } },
    marimeMinima: 40,
    optimalConditions: {
      waterTempMin: 14,
      waterTempMax: 24,
      windMax: 15,
      precipPreference: "dry",
      cloudPreference: "clear",
      moonPreference: "any",
      pressurePreference: "stable",
      bestTimeOfDay: "Răsărit (5-7) + apus",
      cotaOptima: { min: 100, max: 300, nota: "Pe Dunăre — anaforuri, epi-uri" },
    },
    sezonScurt: "Iulie matinal pe Dunăre + noiembrie pe epi-uri Sulina",
  },
  {
    id: "biban",
    nume: "Biban",
    latin: "Perca fluviatilis",
    metoda: "spinning",
    prohibitie: { start: { m: 4, d: 15 }, end: { m: 6, d: 15 } },
    marimeMinima: 18,
    optimalConditions: {
      waterTempMin: 10,
      waterTempMax: 20,
      windMax: 15,
      precipPreference: "any",
      cloudPreference: "any",
      moonPreference: "any",
      pressurePreference: "stable",
      bestTimeOfDay: "Dimineața 7-11 + dupa-amiaza 14-17",
      cotaOptima: { min: 60, max: 300, nota: "Pe Dunărea Veche când lacurile cristal" },
    },
    sezonScurt: "Octombrie - noiembrie",
  },
  {
    id: "somn",
    nume: "Somn",
    latin: "Silurus glanis",
    metoda: "static",
    prohibitie: { start: { m: 4, d: 16 }, end: { m: 6, d: 15 } },
    marimeMinima: 60,
    optimalConditions: {
      waterTempMin: 18,
      waterTempMax: 28,
      windMax: 20,
      precipPreference: "after_rain",
      cloudPreference: "overcast",
      moonPreference: "new",
      pressurePreference: "falling",
      bestTimeOfDay: "Noaptea 21-05, amurg + zori",
      cotaOptima: { min: 100, max: 300, nota: "Adâncimi 16-22 m pe Chilia" },
    },
    sezonScurt: "Iulie-octombrie — vârf vara cu clonc; toamna staționar",
  },
];

export function getSpecie(id: Specie["id"]) {
  return specii.find((s) => s.id === id);
}

export function isInProhibitie(specie: Specie, date: Date): boolean {
  const m = date.getMonth() + 1;
  const d = date.getDate();
  const start = specie.prohibitie.start.m * 100 + specie.prohibitie.start.d;
  const end = specie.prohibitie.end.m * 100 + specie.prohibitie.end.d;
  const cur = m * 100 + d;
  if (start <= end) return cur >= start && cur <= end;
  return cur >= start || cur <= end;
}

export function zileLaDeschidere(specie: Specie, date: Date): number {
  const year = date.getFullYear();
  let open = new Date(year, specie.prohibitie.end.m - 1, specie.prohibitie.end.d);
  open.setDate(open.getDate() + 1);
  if (open <= date) {
    open = new Date(year + 1, specie.prohibitie.end.m - 1, specie.prohibitie.end.d);
    open.setDate(open.getDate() + 1);
  }
  return Math.ceil((open.getTime() - date.getTime()) / 86400000);
}
