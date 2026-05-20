export type Tehnica = {
  slug: string;
  specie: "stiuca" | "salau" | "avat" | "crap";
  metoda: "spinning" | "static";
  titlu: string;
  scurt: string;
  perioada: string;
  pasi: string[];
  naluci?: string[];
  echipament: string[];
  monturi: string[];
  sfaturi: string[];
  citate?: string[];
};

export const tehnici: Tehnica[] = [
  // ===== STIUCA =====
  {
    slug: "stiuca-jigging-batere",
    specie: "stiuca",
    metoda: "spinning",
    titlu: "Jigging la știucă în perioada de bătaie (februarie-martie)",
    scurt: "Finețe maximă cu năluci mici 6-8 cm și jighead mic. Cea mai grea perioadă a anului.",
    perioada: "Februarie - mijloc martie",
    pasi: [
      "Lansaje SCURTE din barcă pentru acoperire totală a zonei (nu lansaje lungi)",
      "Numeri 1-2-3 până atingi fundul, te oprești cu două numere mai devreme",
      "Dă la BUZA stufului / țipirigului, NU peste capul lui",
      "Schimbi culoarea după 2-3 lanseuri fără răspuns",
      "Dacă tot nu prinde după 3-4 culori → schimbi locul",
    ],
    naluci: [
      "Savage Gear Cannibal Shad 6-8 cm — Red Head, Fire Tiger, alb cu coadă roșie",
      "Jig clasic + gumă mică",
    ],
    echipament: [
      "Lansetă spinning 2.10-2.30 m / 7-30 g",
      "Fir împletit 0.12 mm (finețe maximă)",
    ],
    monturi: [
      "Jighead 3 g cu cârlig 3/0",
      "Fluorocarbon 0.50-0.60 mm pe ape curate; oțel când firul principal e gros",
    ],
    sfaturi: [
      "În perioada de bătaie știuca NU se hrănește cu baboi mari, ci 'ciugulește între picături'",
      "Soarele direct sperie știuca (e pește de pradă, are nevoie de umbră)",
      "Coloristică > formă ca primă regulă; vibrație ca a doua",
    ],
    citate: [
      "Coada cu roșu aici a făcut toată treaba",
    ],
  },
  {
    slug: "stiuca-topwater",
    specie: "stiuca",
    metoda: "spinning",
    titlu: "Topwater pentru știucă post-prohibiție",
    scurt: "Captură de exemplare 90+ cm cu poppere și sliders. Esențial: răbdarea la înțepare.",
    perioada: "Mai - iulie",
    pasi: [
      "Lansaje lungi pe ape deschise lângă stuf",
      "Mulinare cu pauze (walk-the-dog sau propeller continuu)",
      "La atacul de suprafață: NU înțepi din prima",
      "Lași peștele să înghită, simți că trage, abia atunci ridici lanseta",
    ],
    naluci: [
      "Berkley Choppo (topwater prop)",
      "Abu Garcia Slider Hi-Lo (slider mare)",
      "Vobler 'șoarece' / mouse-bait",
    ],
    echipament: [
      "Combo casting + multiplicator pentru năluci mari (50-70 g)",
      "Fir împletit + leader fluorocarbon",
    ],
    monturi: [
      "Fluorocarbon (rezistă la dinți)",
    ],
    sfaturi: [
      "Două zile la rând doar pe topwater = nimic special, e validat",
      "La pește mare, trage forțat spre apă deschisă; nu-l lași în boscheți",
      "Ține peștele de coadă la eliberare până zvâcnește singur",
    ],
  },
  {
    slug: "stiuca-vobler-trusa",
    specie: "stiuca",
    metoda: "spinning",
    titlu: "Trusa de voblere de bază pentru știucă",
    scurt: "4 voblere esențiale + cum să le folosești fiecare.",
    perioada: "Tot anul",
    pasi: [
      "Învață fiecare vobler: aruncă în apă limpede cu ochelari polarizați",
      "Cronometrează coborârea pe metru — diferă chiar și la modele identice ca formă",
      "Verifică prinderile metalice (NU pânză — putrezesc)",
    ],
    naluci: [
      "Abu Garcia Svartzonker — hibrid hard-soft (21 g, slow sinking); coada se înlocuiește cu grub Mann's / Relax",
      "Berkley Big-Y 80 — ~30 g, floating, vibrație + bile; 3-4 manivele scurte, pauză să se ridice, repetă",
      "Rapala BX Jointed 12 — ~23 g, coboară 1 m; cele mai multe atacuri pe PAUZĂ; biban-portocaliu",
      "Berkley Zilla 10 cm / 18 g — glider cu bile; balastiere 2.5-3 m: cădere până la 7-8, 2-3 zvâcnete, pauză",
    ],
    echipament: [],
    monturi: [],
    sfaturi: [
      "Năluca în care AI TU încredere e cea mai bună",
      "Două glidere de mărci diferite, identice ca formă, funcționează DIFERIT",
    ],
  },
  {
    slug: "stiuca-iarna-rau",
    specie: "stiuca",
    metoda: "spinning",
    titlu: "Știucă iarna pe râu (Neajlov)",
    scurt: "Jigging clasic pe apă rece cristalină. Răbdare și schimbare frecventă a zonei.",
    perioada: "Decembrie - februarie",
    pasi: [
      "20 lanseuri pe o zonă mică (15-20 m)",
      "Dacă nimic → mută 100 m",
      "La întoarcere REVINO cu altă nălucă sau jig mai greu",
      "Bălăceala 1 oră pe 100 m de mal NU e o idee bună — peștele se sperie",
    ],
    naluci: [
      "Storm Jointed Minnow Shad 3.5\" — Fire Tiger (BAZA iarna)",
      "Vobler Rapala floating ca decor de salvare la agățări",
    ],
    echipament: [
      "Shimano Adrena 1242 (2.18 m / 12-42 g, un tronson)",
      "Shimano Metanium HG cast",
      "Power Pro Slick V2 0.15-0.19 mm",
    ],
    monturi: [
      "Jighead pentru apă mică",
    ],
    sfaturi: [
      "Ochelari polarizați mereu — vezi urmărirea în apă",
      "Bălăceala umană (intrarea în apă) deranjează imediat după → pauză scurtă, apoi din alt unghi",
    ],
  },

  // ===== SALAU =====
  {
    slug: "salau-jigging-prag",
    specie: "salau",
    metoda: "spinning",
    titlu: "Jigging șalău pe primul prag",
    scurt: "Șalăul stă APROAPE de mal, NU departe. Finețe + traseu = succes.",
    perioada: "Octombrie - martie",
    pasi: [
      "Lansare PARALEL cu malul",
      "Treptat în evantai spre larg",
      "Revenire pe aceeași trasă dacă a fost atac",
      "Plimbă-te stânga-dreapta chiar dacă știi peștele e acolo",
      "ÎNȚEPARE INSTANT la primul atac",
    ],
    naluci: [
      "Gumă verde clasic cu burtă deschisă ~7 cm — 'verdele criminal'",
      "Gambler verde",
    ],
    echipament: [
      "Graphiteleader Silverado 2.34 m / 5-20 g — senzitivitate critică",
      "Fir împletit 0.10 mm — 'să simți, nu grosolan'",
      "Fluorocarbon 0.30-0.42 mm (80 cm pe râu cu pietre)",
    ],
    monturi: [
      "Jighead 3.5 g la atacuri nervoase (cădere lentă, dă timp atacului)",
      "Jighead 7 g standard / 9 g pe curent",
      "Cârlig 3/0",
    ],
    sfaturi: [
      "Șalăul prinde gumă în stomac frecvent → tai linia, recuperezi cârligul acasă",
      "Pe vânt mută-te pe malul ADĂPOSTIT",
      "Pe vreme rece, bătaie măruntă — peștele nu e activ",
    ],
    citate: [
      "Verdele criminal",
      "Stă în primul prag, nu departe; nu vrea să mănânce de la 1 m de masă",
    ],
  },

  // ===== AVAT =====
  {
    slug: "avat-vanat-vizual",
    specie: "avat",
    metoda: "spinning",
    titlu: "Vânat vizual la avat pe Dunăre",
    scurt: "NU pescui orb. Identifică sărituri, du-te la el, lansează direct în zonă.",
    perioada: "Iulie (răsărit ~5:15)",
    pasi: [
      "Identifică vizual sărituri / fierberi pe suprafață",
      "Lansare LUNGĂ direct în zona de activitate",
      "Lasă să cadă",
      "Mulinare CONTINUĂ rapidă (avatul atacă pradă activă)",
    ],
    naluci: [
      "Helic Nikel 16-17 g — câștigătoare iulie ('cât natural, pe lângă mal')",
      "Cast Master 10.5 g — clasic pentru sărituri în anaforuri",
      "Cicade + spinner-uri rotative de clean (zile fără sărituri)",
    ],
    echipament: [
      "Lansetă medium-light până la 18-25 g — universală, permisivă, nu foarte moale",
      "Fir împletit 0.10 mm — finețe pe Dunăre",
    ],
    monturi: [
      "Fluorocarbon 0.30 mm, 60-70 cm",
    ],
    sfaturi: [
      "Avatul vânează matinal și seara",
      "Apa rece (april) îl ține departe de suprafață — așteaptă luna mai-iunie",
    ],
    citate: [
      "Dacă-l văd că sare, mă duc la el; nu pescuiesc orb",
    ],
  },

  // ===== CRAP =====
  {
    slug: "crap-primavara-momitor",
    specie: "crap",
    metoda: "static",
    titlu: "Crap primăvara pe canal cu momitor",
    scurt: "Apă 5-17°C. Finețe + dumbbells mici + nadă fără colant.",
    perioada: "Martie - aprilie pre-prohibiție",
    pasi: [
      "Sonar pentru localizare grup (10-20 min înainte de aruncare)",
      "Stă cu sonar până găsești bancul",
      "Lansează 'pe linia lor' (nu peste, nu prea aproape)",
      "Burta firului moale după lansare — momitorul stă fix",
      "NU smucitură la înțepare — ridici lanseta și manivelezi",
      "Max 2-3 pești de pe un loc, apoi mută",
    ],
    naluci: [],
    echipament: [
      "Lansetă Trabucco Danubius Power River 2.70 m / 250 g (Bolentino, 2 tronsoane, vârf fibră sticlă)",
      "Mulinetă cu baitrunner (Okuma Aventa) / Daiwa BG 6000",
      "Fir Trabucco T-Force 0.26 mm sau Shimano Technium Invisitec 0.20-0.30",
    ],
    monturi: [
      "Momitor method cu nadă (Wild Carp 3x Aroma sau Usturoi, sau FeederX, sau GDA Special)",
      "Cârlig Korda Kurv X nr. 4 (Carp Spirit BBP nr. 4 echivalent)",
      "Stronă cu Drennan Carp Method Hook Length Tie 7.5-10 cm",
      "Opritor de tip stop pe firul principal — la rupere momitorul cade liber",
      "Cârlig nr. 10 la pornire, urci la 15 dacă scapă",
    ],
    sfaturi: [
      "Nadă consistență 'mămăligă', scoate aerul; făcută cu 10-30 min înainte",
      "Hookbait: dumbbells 10 mm alb/oranj > 15 mm > 20 mm pe finețe",
      "Boabă de porumb + dumbbell pentru selectivitate (anti-ciortan)",
      "Pelete 10 mm Secret Aroma / căpșună-usturoi pe spin",
      "Lansează ÎN FAȚA structurii, nu peste — nada curge spre cioată cu curentul",
    ],
    citate: [
      "Lansezi în față, nada și aroma se duc spre structură cu curentul, iar peștele iese după ele",
    ],
  },
  {
    slug: "crap-vara-boilies",
    specie: "crap",
    metoda: "static",
    titlu: "Crap vara cu boilies (Chilia / Sf. Gheorghe)",
    scurt: "Caniculă scoate crapul la apă adâncă. Boilies pure, mix de mărimi.",
    perioada: "Iunie - august (apă 23-27°C)",
    pasi: [
      "Identifică prag abrupt (4 m → 11 m) lângă cioate scufundate",
      "3 locuri nădite în paralel ca rezerve",
      "Ancorare în barcă cu prova în curent, perpendicular",
      "Lansare cu degetul pe tambur, după contact pe fund eliberezi pickup",
      "Curentul bagă plumbul în prag",
    ],
    naluci: [],
    echipament: [
      "Lansete Formax Visage Boat 2.70 m / 70-300 g",
      "Mulinete cu baitrunner",
      "Avertizoare Delfin Roller Shock pe vibrații",
      "Minciog Acela Extra Strong 3.60 m cu plasă cauciuc",
    ],
    monturi: [
      "Plumb plat 120-150 g pe firul principal",
      "Biluță de cauciuc amortizoare CULISANTĂ între plumb și vârtej (nu fixă)",
      "Vârtej nr. 8 sau agrafă cu con de cauciuc",
      "Cârlig Carp Spirit BBP nr. 4 sau Korda Kurv X nr. 4",
      "Fir de păr clasic cu boilie 20-24 mm",
    ],
    sfaturi: [
      "Mix boilies 16/20/24/30 mm + spărturi (peștele nu-și poate regla absorbția)",
      "70% solubile + 30% tari — solubile activează rapid, tari rezistă 12-24h",
      "Regula Delta: Fishmeal + Burfood (ambele)",
      "Smucitura la înțepare = unghi cârlig schimbat = rateuri",
      "NU porumb pe canale — atrage plătică / caras",
    ],
  },
  {
    slug: "crap-prag-iarna",
    specie: "crap",
    metoda: "static",
    titlu: "Crap în prag de iarnă (apă < 10°C)",
    scurt: "Crapii se grupează pe cioate cu coronament LAT. Fluorocarbon rigid + cârlig agresiv.",
    perioada: "Noiembrie - decembrie",
    pasi: [
      "Spotare cu side scan + down scan + sondă live (vezi cioate cu pești)",
      "Identifică cioate cu CORONAMENT LAT (nu uscate cu o tulpină)",
      "Crapii stau AVAL de cioată, la adăpost de curent",
      "Ies dimineața pentru hrănire SCURTĂ",
      "Nadire minimă — 3-5 boilies/lansetă la schimbare",
    ],
    naluci: [],
    echipament: [
      "Lansete clasice pentru crap",
      "Sonar cu side scan",
    ],
    monturi: [
      "Fluorocarbon Claumar Poseidon 0.38 mm / 15 lbs — rigid, acționează ca un arc, împiedică scuiparea",
      "Cârlig Korda Krank Curve nr. 4 — formă agresivă pentru auto-înțepare, ochet exterior aliniat cu fluoro",
      "Mix inline + plumb pierdut (după gradul de agățători)",
      "Boilies semi-solubile 24 mm (se reduc la 16-18 în 3-4 h → cârlig MARE)",
      "Strângere nod treptată pe fluorocarbon (efect ECTM) — altfel arde",
    ],
    sfaturi: [
      "Dacă nu mănâncă, NU nadești degeaba",
      "Drilluri practic imposibile la 20+ m cu cioate stânga-dreapta — stai LÂNGĂ lansetă",
      "Cea mai bună captură poate veni în barcă la metod cu papane (poveste-control)",
    ],
  },
  {
    slug: "crap-strategie-visoianu",
    specie: "crap",
    metoda: "static",
    titlu: "Strategia Vișoianu — partide lungi 7-10 zile pentru crap mare",
    scurt: "Filozofia 'Doctor Fishing' — record personal 22 kg pe Dunărea Veche.",
    perioada: "Mai - octombrie",
    pasi: [
      "Sonar zilnic + GPS pentru buturi lipovenești ancorate cu dale de beton (cele de 1-2 ani sunt cele bune)",
      "Crapul stă AVAL de butur la curent mic; AMONTE la curent puternic",
      "Zilele 1-3: 10-13 kg boilies/seară, bandă 50 m × 150-200 m, aruncate cu scafa în arcuri de cerc din barca pneumatică",
      "Zilele 4-6: scădere la 5-7 kg/seară",
      "Ultimele 2-3 zile: doar 20 boilies/lansetă la plantare — cele mai prolifice",
      "NICIODATĂ nadești ziua — albitura mănâncă tot",
    ],
    naluci: [],
    echipament: [
      "Lansetă Colmic Calibra 270 (3 m, 70-300 g) — carbon compozit + vârf fibră sticlă plină, foarte ELASTICĂ",
      "Mulinetă Okuma Surf 8K — raport 1.08 m/manivelă, tambur ≥400-500 m",
      "Fir Berkley Trilene XT Hi-Vis Gold 0.46 mm MONO (înlocuit cu Evo)",
      "Suport handmade din inox + senzori + stație radio (esențial pt dormit în barcă)",
    ],
    monturi: [
      "Inline + con cauciuc dur + vârtej cu DUBLU LAGĂR obligatoriu",
      "Forfac Korda N-Trap 30 lbs — Semi-Stiff iarna (crap pretențios) / Soft vara",
      "Forfac 30-35-40 cm",
      "Cârlige Solar wide gape, ochet drept — nr. 2 vara, nr. 6 toamna (apă <12°C)",
      "Firul de păr decojit DOAR 1-1.5 cm deasupra cârligului",
    ],
    sfaturi: [
      "Boilies — DOAR fishmeal (nu cerealiere cu aromă mare gen Decathlon)",
      "Marca lui: Sticky Baits Sticky Krill — cea mai bună pe Sulina",
      "20 mm vara; 16 mm în octombrie + cârlig mic",
      "Niciodată solubile pe Dunăre — caras / plătică distrug în minute",
      "Lună NOUĂ ± 2 zile = cea mai bună perioadă (NU plină!)",
      "Pe gropi: plumb pierdut greu + textil simplu necămășuit (curentul așază firul)",
      "Locurile bune NU au loc de cort — barca = pescuit 24/24, esențial",
    ],
    citate: [
      "Crapul de 10 kg în Deltă = 50 ani; pe baltă, hrănit, ajunge la 20 kg în 5-7 ani",
      "Locurile dresate sunt cele mai proaste",
    ],
  },
];

export function getTehnica(slug: string) {
  return tehnici.find((t) => t.slug === slug);
}

export function tehniciDeSpecie(specie: Tehnica["specie"]) {
  return tehnici.filter((t) => t.specie === specie);
}
