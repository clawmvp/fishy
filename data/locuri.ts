export type Loc = {
  slug: string;
  nume: string;
  tip: "brat" | "canal" | "lac" | "rau" | "balastiera";
  scurt: string;
  sezon: string[];
  specii: string[];
  caracteristici: string[];
  pericole: string[];
  sfaturi: string[];
  sursa: string[];
};

export const locuri: Loc[] = [
  {
    slug: "bratul-chilia",
    nume: "Brațul Chilia",
    tip: "brat",
    scurt: "Brațul de nord al Deltei. Apă 6-14 m cu copaci scufundați și scoică tăietoare. Crap mare iulie-august la Periprava și Tatanir.",
    sezon: ["iulie", "august", "septembrie", "octombrie", "noiembrie"],
    specii: ["crap"],
    caracteristici: [
      "Praguri abrupte (de la 4 m la 11 m) lângă cioate scufundate",
      "Cioate dese — pădure de 15+ pe distanță scurtă în aval",
      "Apă adâncă favorizează crapii mari pe caniculă (10-15 m)",
      "Cota Tulcea 150-200 = optim, sub 45 doar ciortani",
    ],
    pericole: [
      "Scoică tăietoare (mai rău la cote scăzute în iulie)",
      "Pierderi de monturi în pădurea de cioate",
      "Vasele cargo / petroliere generează valuri puternice",
    ],
    sfaturi: [
      "Lansează 6-10 m mai departe de prag, lasă degetul pe tambur, curentul bagă plumbul în prag",
      "3 locuri nădite în paralel ca rezerve dacă altcineva îți ocupă locul favorit",
      "Repere pe mal — configurația copacilor — pentru a re-găsi locul",
      "Pe iarnă (sub 10°C) crapii se grupează pe cioate cu coronament LAT (nu uscate cu o tulpină); stau AVAL de cioată",
    ],
    sursa: ["WgqDiw13peo", "y7UkYrra84Q", "RocRanLhmqw", "J7kZurrlp08"],
  },
  {
    slug: "bratul-sulina",
    nume: "Brațul Sulina",
    tip: "brat",
    scurt: "Brațul navigabil — 'autostradă' cu vapoare. Pietre + scoică la mal. NU recomandat pescuit din mal.",
    sezon: ["iulie", "august"],
    specii: ["crap"],
    caracteristici: [
      "Trafic intens de cargo / petroliere",
      "Mal taluzat cu piatră, prag abrupt aproape (4 m → 11 m)",
      "Vara apa Dunării la 26°C, aer 28-43°C",
    ],
    pericole: [
      "Imposibil de scos pește din prag fără shock leader 0.80 mm pe 10-15 m",
      "Peste 20 monturi rupte pe scoică / pietre în 2 zile (test pe teren)",
      "Valuri mari de la corsare duc monturile în prag",
    ],
    sfaturi: [
      "Decizia generală: 'prima și ultima oară pe Sulina din mal' — pescuiește din barcă",
      "Dacă insiști din mal: shock leader gros + lansetă rigidă + monturi multe de rezervă",
    ],
    sursa: ["F57mDvECdQU", "PFwNriYmmk4"],
  },
  {
    slug: "bratul-sfantu-gheorghe",
    nume: "Brațul Sfântu Gheorghe",
    tip: "brat",
    scurt: "Brațul sudic, apă adâncă 10-14 m cu cioate. Tradițional pentru pești mari — record cunoscut 27 kg.",
    sezon: ["iunie", "iulie", "august", "septembrie"],
    specii: ["crap", "som"],
    caracteristici: [
      "Cote variabile 20 cm (extrem scăzut) → 60 cm la Tulcea",
      "Adâncimi mixte 6-14 m + platouri cu cioate",
      "Caniculă forțează crapul la adâncime",
    ],
    pericole: [
      "Scoică tăietoare extrem severă pe cote mici",
      "Amenzi de campare standard ('taxă de baltă')",
      "Vasele Delta Express / Mircești șifonează peștii în juvelnic vara",
    ],
    sfaturi: [
      "Pat de nadă mic (~2 kg/2 ore), 70% solubile + 30% tari ca fluxul de miros să curgă fără saturare",
      "Burfood Baltacul tare 24 mm rezistă 12 ore în apă (testat 19:00 → 7:00)",
      "Boilies pe cârlig: 1 bilă pentru pești 5-9 kg; 2 bile 24 mm încerc anti-ciortan (rar funcționează)",
      "Acces: pensiunile Timona / Nelu / Dunavățu de Jos — ~1000 RON pentru 3 persoane cu barca",
    ],
    sursa: ["rOByMFC8coQ", "oy70KLsfUCQ", "U2i9EdxIX3s"],
  },
  {
    slug: "bratul-tataru",
    nume: "Brațul Tătaru / Ostrovul Tătaru",
    tip: "brat",
    scurt: "Locul pentru 'săptămâna magică' de primăvară — crap mare când apa trece 10°C și aerul 20°C.",
    sezon: ["martie", "aprilie"],
    specii: ["crap"],
    caracteristici: [
      "Apă 4-5 m pe mijloc, prag pe ambele maluri",
      "Crapul vine de sub stuful malului OPUS (acolo are găuri neperturbate)",
      "Luminișuri/ochiuri printre lemne — cere navigație atentă",
    ],
    pericole: [
      "Plopii își scutură mugurii pe apă → fire murdare, trăsături oprite",
      "Bărci care lansează la malul opus = risc agățare",
    ],
    sfaturi: [
      "Repere primăvară (toate 4 simultan): apă > 10°C + aer > 20°C zile la rând + cotă > 150 + apă limpede",
      "Nadă minimă: max 1-1.5 kg total. 'Dacă el nu mănâncă, eu îi dau degeaba'",
      "Marchează loc cu chemlights pe vegetația deasă pentru nopți",
      "Combo: 2 bile boilies 20 mm — Baltacul Bird Food + Monster Crab Fish Meal",
    ],
    sursa: ["i9zz5OkP6ps"],
  },
  {
    slug: "bratul-babina",
    nume: "Brațul Babina",
    tip: "brat",
    scurt: "Aglomerat în plin sezon ('ca la aprozar'). Atenție — locurile rămase libere sunt prost de motiv.",
    sezon: ["septembrie"],
    specii: ["crap"],
    caracteristici: [
      "Pădurarul confirmă local că un loc nu produce",
      "5 zile de pescuit serios pot da doar 2 ciortani",
    ],
    pericole: [
      "Capcana 'ultimul loc liber' — e liber pentru un motiv",
      "Apa influențată local de vânt din mare (poate scădea 10-15 cm)",
    ],
    sfaturi: [
      "Mai bine pierzi o zi mutându-te pe Chilia decât stai 5 zile pe loc greșit",
    ],
    sursa: ["J7kZurrlp08"],
  },
  {
    slug: "canalul-ingusta",
    nume: "Canalul Îngusta",
    tip: "canal",
    scurt: "Canal de tranzit migrator între Sulina și Dunărea Veche. Acces de la hotelul Lebăda (Crișan).",
    sezon: ["aprilie", "noiembrie"],
    specii: ["crap"],
    caracteristici: [
      "Cioate scufundate identificabile cu sonar",
      "Adâncimi 3-5 m",
      "Pasaj de migrație crap între cele două brațe",
    ],
    pericole: [
      "Traficul de bărci oprește trăsăturile complet",
      "Locuri se ocupă rapid — 'nu e ca la mochetă'",
    ],
    sfaturi: [
      "Ancorare laterală de sălcii, lansare spre cioată",
      "Aprilie pre-prohibiție: dumbbells Wild Carp 10 mm alb sau oranj + momitor cu Wild Carp 3x Aroma sau Usturoi",
      "Noiembrie: pelete fish meal 10 mm pe spin, 15 mm pe firul de păr",
      "Bărci recomandate: Finval (cele folosite de Marian Mincu)",
    ],
    sursa: ["4FKSinAQMOQ", "Hvb-JEezWl4", "PFwNriYmmk4"],
  },
  {
    slug: "mila-23",
    nume: "Mila 23 (canale învecinate)",
    tip: "canal",
    scurt: "Cluster de canale lângă pensiunea Gigant Fish. Grupări de crap detectabile pe sonar martie — apă 5-7°C.",
    sezon: ["martie", "aprilie", "noiembrie"],
    specii: ["crap"],
    caracteristici: [
      "Canale înguste cu stuf pe ambele maluri (repere greu de luat)",
      "Cioate cu pești cantonați — comportament 'de iarnă' pe apă rece",
      "Capturi tipice martie: 7-11 kg",
    ],
    pericole: [
      "Frânele 'la un minut nu mai merg bine' pe temperaturi mici",
      "Line bites — peștele se plimbă printre fire fără să muște",
    ],
    sfaturi: [
      "Sonar 10-20 min înainte de aruncare — localizarea = totul",
      "Max 2-3 pești de pe un loc, apoi mută",
      "Lansare PE SUB MÂNĂ ancorat lângă cioată; fir 0.55 mm pentru a băga momitorul direct în cioată",
      "Pelete 10 mm Secret Aroma / căpșună-usturoi pe cârlig nr. 10",
    ],
    sursa: ["wyu0InYOjXc", "ZrOR8n9VeEU"],
  },
  {
    slug: "dunarea-veche",
    nume: "Dunărea Veche (Mila 23 → Crișan)",
    tip: "brat",
    scurt: "Apă <6-7 m. Locul preferat al lui Călin Vișoianu pentru crap 22+ kg — buturi de sălcii ancorate de lipoveni cu dale de beton.",
    sezon: ["mai", "iunie", "iulie", "august", "septembrie", "octombrie"],
    specii: ["crap"],
    caracteristici: [
      "Cotă optimă Tulcea: 150-200",
      "Buturile bune sunt cele de 1-2 ani (au adunat mâncare)",
      "Crapul stă AVAL de butur la curent mic; AMONTE la curent puternic (vară)",
    ],
    pericole: [
      "Buturile se mută cu putrefacția — verifică pe sonar fiecare partidă",
      "Caras + plătică distrug boilies solubile în minute",
    ],
    sfaturi: [
      "Marchează buturile pe GPS (eroare 1-2 m) + verifică sonar la fiecare partidă",
      "Niciodată partidă scurtă — minim 7-10 zile",
      "Nadire descrescătoare: 10-13 kg/seară zilele 1-3, scade la 5-7 kg, ultima fază doar 20 boilies/lansetă",
    ],
    sursa: ["j6P-9ATsnu8"],
  },
  {
    slug: "raul-neajlov",
    nume: "Râul Neajlov",
    tip: "rau",
    scurt: "Râu mic, cristalin, lângă București. Ideal pentru spinning știucă în decembrie-ianuarie + biban toamna.",
    sezon: ["decembrie", "ianuarie", "februarie", "octombrie", "noiembrie"],
    specii: ["stiuca", "biban"],
    caracteristici: [
      "Apă limpede ca piatra — ochelari polarizați obligatoriu",
      "Mal îngust, accesibil cu mașina din mai multe puncte",
    ],
    pericole: [
      "Bălăceala umană deranjează peștele 30+ minute",
      "Stuf des — risc agățare",
    ],
    sfaturi: [
      "Storm Jointed Minnow Shad 3.5\" Fire Tiger = baza iarna",
      "20 lanseuri pe zonă, apoi mută 100 m; revino la întoarcere cu altă nălucă",
      "Sufix 0.18 împletit (mătăsos) + fluorocarbon 0.50",
    ],
    sursa: ["fTM14wl5Vow", "jnQcZd2ce28"],
  },
  {
    slug: "raul-arges",
    nume: "Râul Argeș",
    tip: "rau",
    scurt: "Confluențe cu brațe mici — șalău în martie pre-cuib. Apă tulbure, pietre pe fund.",
    sezon: ["martie", "aprilie"],
    specii: ["salau"],
    caracteristici: [
      "Apă tulbure, praguri lângă mal",
      "Înainte de jumătatea lui martie = peștele inactiv (pre-cuib)",
    ],
    pericole: [
      "Malul murdar (gunoi)",
      "Pietre pe fund = agățări frecvente",
    ],
    sfaturi: [
      "Gumă 7 cm + jighead 9 g pe curent, mai mic pe stagnant",
      "Fluorocarbon 0.30 lung (~80 cm) din cauza pietrelor",
    ],
    sursa: ["L6VIOLNmOqM"],
  },
  {
    slug: "balta-gagu-2",
    nume: "Balta Gagu 2",
    tip: "lac",
    scurt: "Baltă sălbatică cu plauri, stuf, cocioc. Mid-aprilie pe ploaie = știucă pe slider.",
    sezon: ["aprilie", "mai"],
    specii: ["stiuca"],
    caracteristici: [
      "Structuri dese, agățători masive",
      "Trebuie să scoți creanga din apă cu peștele",
    ],
    pericole: [
      "Pierderi pe coci, plauri",
      "Minciog mic = drama la pește mare",
    ],
    sfaturi: [
      "Slider Berkley + Storm Fire Tiger shad cu coadă roșie",
      "Fir împletit 0.15 mm + fluorocarbon gros (compensează lipsa de oțel)",
      "La pește mare trage forțat spre apă deschisă, NU lași în boscheți",
    ],
    sursa: ["ECfZjkYukq8"],
  },
  {
    slug: "bazinul-candesti",
    nume: "Bazinul Cândești",
    tip: "balastiera",
    scurt: "Baltă cu praguri lângă mal. Șalău fin în sfârșit-februarie / început-martie cu gumă verde.",
    sezon: ["februarie", "martie"],
    specii: ["salau"],
    caracteristici: [
      "Vânt puternic frecvent — adăpostește-te pe malul opus",
      "Șalăul stă pe primul prag, NU departe",
    ],
    pericole: [
      "Atacuri firave — mulți rateu",
    ],
    sfaturi: [
      "Gumă verde clasic cu burtă deschisă + jighead 7 g",
      "Lansare în evantai paralel cu malul, apoi spre larg, revino pe traseu",
      "Înțepare INSTANT la primul atac",
    ],
    sursa: ["BoFhTe1A_q0", "GqRZzV5K_2s"],
  },
  {
    slug: "port-oltenita",
    nume: "Port Oltenița (Dunăre)",
    tip: "rau",
    scurt: "Confluența Dunăre-Argeș. Pescuit avat post-prohibiție mai târzie ca în restul țării.",
    sezon: ["aprilie", "iulie"],
    specii: ["avat"],
    caracteristici: [
      "Zonă de frontieră — prohibiția începe pe 24 aprilie, nu cu restul țării",
      "Lângă hotelul Apollo",
    ],
    pericole: [
      "Aprilie poate fi prea rece pentru avat să stea în masa apei",
    ],
    sfaturi: [
      "Helic Nikel 16-17 g = nălucă câștigătoare iulie",
      "Cast Master 10.5 g pentru sărituri în anaforuri",
      "Vânează vizual — dacă-l vezi că sare, du-te la el",
    ],
    sursa: ["BA_PFfLvlMw", "pUetvPfpLcg"],
  },
  {
    slug: "statia-11-delta",
    nume: "Stația 11 (Delta)",
    tip: "lac",
    scurt: "Locație administrată privat. Topwater spectaculos post-prohibiție — exemplare 90+ cm.",
    sezon: ["mai", "iunie", "iulie"],
    specii: ["stiuca"],
    caracteristici: [
      "Capturi documentate: 83, 90, 93, 98 cm pe topwater",
      "Două zile la rând doar pe topwater",
    ],
    pericole: [
      "La pește mare nu lăsa în boscheți",
    ],
    sfaturi: [
      "Berkley Choppo (topwater prop) + Abu Garcia Slider Hi-Lo",
      "Răbdare la înțepare — lași peștele să înghită, simți că trage, abia atunci ridici",
      "Ține peștele de coadă la eliberare până zvâcnește singur",
    ],
    sursa: ["W-XdKuMZWXo"],
  },
];

export function getLoc(slug: string) {
  return locuri.find((l) => l.slug === slug);
}
