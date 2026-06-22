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
  descriere: string;
  comportament: string;
  momeli: string[];
}

export const specii: Specie[] = [
  {
    id: "crap",
    nume: "Crap",
    latin: "Cyprinus carpio",
    metoda: "static",
    // ANPA 2026 — ape interioare: 9 aprilie - 7 iunie (60 zile).
    // Dunăre frontieră RO-UA: 24 aprilie - 7 iunie. Dunăre frontieră RO-BG: 16 aprilie - 30 mai.
    prohibitie: { start: { m: 4, d: 9 }, end: { m: 6, d: 7 } },
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
    descriere:
      "Cel mai vânat pește al Deltei. Ciprinid bentonic și omnivor, prudent și puternic, trăiește în canale, bălți și brațele cu fund mâlos sau cu cioate scufundate. Stă în zonele adânci și liniștite, iese pe platouri ca să se hrănească.",
    comportament:
      "Se hrănește filtrând fundul, cu botul în mâl. Prudent — la cel mai mic semn de pericol abandonează zona. Cel mai activ dimineața devreme și seara; ziua, pe căldură, albitura mănâncă în locul lui. Reacționează puternic la variațiile de cotă și la presiunea atmosferică stabilă; mușcă bine după ploaie pe vreme înnorată.",
    momeli: [
      "Boilies 20-24 mm (Tiger Crab, Red Squid) — standard vara",
      "Porumb dulce și pelete method — apă caldă",
      "Mămăligă tare — clasic pe canale",
      "Viermi și râme — la rece (martie, octombrie)",
      "Nadă cu pelete + boilie fărâmițat în plasă PVA",
    ],
  },
  {
    id: "stiuca",
    nume: "Știucă",
    latin: "Esox lucius",
    metoda: "spinning",
    // ANPA 2026 — știuca: 1 februarie - 20 martie (depunere timpurie, ~48 zile).
    prohibitie: { start: { m: 2, d: 1 }, end: { m: 3, d: 20 } },
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
    descriere:
      "Răpitorul de ambuscadă al Deltei și regele spinningului. Pândește nemișcată în vegetație, lângă stuf, cioate sau praguri de adâncime, de unde atacă fulgerător. Prezentă în lacurile interioare, bălți și pe brațele mai liniștite.",
    comportament:
      "Atac scurt și exploziv din ambuscadă, nu urmărește prada la distanță. Cea mai activă post-prohibiție (aprilie-iulie), când recuperează după depunere, și toamna târziu. Preferă apa rece (8-18 °C), vremea înnorată și presiunea în scădere. Dimineața 7-11 și după-amiaza 15-18 sunt ferestrele bune.",
    momeli: [
      "Shad-uri 8-15 cm pe jighead — cea mai versatilă",
      "Voblere suspending / jerkbait — în vegetație",
      "Lingurițe oscilante și rotative mari",
      "Spinnerbait — peste covor de vegetație",
      "Momeală vie (caras) sub plută — pasiv",
    ],
  },
  {
    id: "salau",
    nume: "Șalău",
    latin: "Sander lucioperca",
    metoda: "spinning",
    // ANPA 2026 — șalău: 20 martie - 7 iunie (păzitul cuibului, ~80 zile).
    prohibitie: { start: { m: 3, d: 20 }, end: { m: 6, d: 7 } },
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
    descriere:
      "Răpitor crepuscular și nocturn cu vedere adaptată la lumină slabă. Preferă fundul tare (nisip, pietriș, scoică), structurile și curentul — pe Sulina și pe Argeș, nu pe canalele închise și nămoloase. Carnea fină îl face cel mai apreciat răpitor pentru consum.",
    comportament:
      "Vânează în haite peștișori în zori, la amurg și noaptea, lipit de fund. Foarte pretențios la finețe: cere prezentări discrete și năluci suple. Sensibil la curent — stă în spatele structurilor care sparg apa. Vârf de activitate în noiembrie și după gerurile din februarie.",
    momeli: [
      "Shad-uri fine 7-12 cm pe jighead ușor — pe fund",
      "Voblere deep diving — pe praguri și gropi",
      "Drop-shot cu năluci suple — pescuit de finețe",
      "Momeală vie (porcușor, oblete) lângă fund",
      "Culori naturale, translucide — apă limpede",
    ],
  },
  {
    id: "avat",
    nume: "Avat",
    latin: "Aspius aspius",
    metoda: "spinning",
    // ANPA 2026 — avat: 15 aprilie - 31 mai (calendar specific, ~46 zile).
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
    descriere:
      "Singurul ciprinid răpitor de la noi — un crap devenit prădător. Vânează la suprafață în apele curgătoare și oxigenate: pe Dunăre, în anaforuri, la capătul epi-urilor și pe firul curentului. Combativ și rapid, e o țintă tehnică de spinning.",
    comportament:
      "Atacă bancurile de albitură la suprafață cu un plescăit caracteristic, apoi se retrage. Extrem de sperios — cere lansaje lungi și apropieri discrete. Cel mai activ la răsărit (5-7) și la apus, pe vreme senină și apă caldă (14-24 °C). Vara dimineața pe Dunăre, toamna pe epi-urile de la Sulina.",
    momeli: [
      "Pilkere / devon lansate departe — imită albitura",
      "Voblere de suprafață și shallow runner",
      "Lingurițe oscilante grele — bătaie lungă",
      "Jerkbait recuperat rapid și neregulat",
      "Culori argintii / albe — imitație de obleț",
    ],
  },
  {
    id: "biban",
    nume: "Biban",
    latin: "Perca fluviatilis",
    metoda: "spinning",
    // ANPA 2026 — biban: 20 martie - 7 iunie (păzitul cuibului, identic cu șalău).
    prohibitie: { start: { m: 3, d: 20 }, end: { m: 6, d: 7 } },
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
    descriere:
      "Răpitor mic de haită, combativ și accesibil — ținta ideală pentru spinning ușor și microjig. Prezent peste tot în Deltă, dar prinde dimensiuni bune pe Dunărea Veche și în lacurile mari când apa e limpede.",
    comportament:
      "Vânează în haite, hărțuind bancurile de albitură, mai ales ziua. Curios și agresiv — când dai de un banc, prinzi exemplar după exemplar din același loc. Activ dimineața (7-11) și după-amiaza (14-17). Iese pe Dunărea Veche când lacurile interioare devin cristal. Vârf toamna (octombrie-noiembrie).",
    momeli: [
      "Microjig (grub / shad 3-5 cm) — cel mai eficient",
      "Cheburashka cu năluci mici",
      "Drop-shot — peste structuri",
      "Lingurițe rotative mici (nr. 1-2)",
      "Voblere mici crank — recuperare lentă",
    ],
  },
  {
    id: "somn",
    nume: "Somn",
    latin: "Silurus glanis",
    metoda: "static",
    // ANPA 2026 — somn nativ: 15 aprilie - 31 mai (calendar specific răpitor).
    prohibitie: { start: { m: 4, d: 15 }, end: { m: 5, d: 31 } },
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
    descriere:
      "Cel mai mare răpitor de apă dulce din Europa și gigantul Deltei. Bentonic și nocturn, stă în gropile adânci ale brațelor — pe Chilia coboară la 16-22 m. Vânează prin vibrații și miros, nu prin văz, ceea ce schimbă complet abordarea față de ceilalți răpitori.",
    comportament:
      "Activ mai ales noaptea (21-05), la amurg și în zori. Vara urcă din gropi ca să vâneze și răspunde la clonc — momeala sonoră care imită zgomotul prăzii. Mușcă cel mai bine pe apă caldă (18-28 °C), după ploaie și la presiune în scădere. Toamna devine staționar, lipit de groapă.",
    momeli: [
      "Clonc + boilie mare / calcan / scoică — vara, din barcă",
      "Peștișor viu (caras, plătică) lângă fund",
      "Buchet de viermi mari / râme — miros puternic",
      "Voblere mari, zgomotoase — recuperare lentă, noaptea",
      "Lansetă grea de la mal, în dreptul gropilor",
    ],
  },
];

export function getSpecie(id: Specie["id"]) {
  return specii.find((s) => s.id === id);
}

export function getSpecieBySlug(slug: string) {
  return specii.find((s) => s.id === slug);
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
