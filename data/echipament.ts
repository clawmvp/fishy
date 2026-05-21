export type Item = {
  nume: string;
  marca?: string;
  specific?: string;
  pret?: string;
  prioritate: "must" | "nice" | "expert";
  pentru: ("stiuca" | "salau" | "avat" | "crap" | "biban" | "somn")[];
  categoria: "lanseta" | "mulineta" | "fir" | "naluca" | "boilies" | "nada" | "montura" | "carlige" | "accesorii" | "somn-specific";
  note?: string;
};

export const echipament: Item[] = [
  // === LANSETE SPINNING ===
  {
    nume: "Savage Gear Revenge SG8 Medium Game",
    marca: "Savage Gear",
    specific: "2.25 m / 7-36 g",
    prioritate: "must",
    pentru: ["stiuca"],
    categoria: "lanseta",
    note: "Camera de rezonanță. Recomandată de Paco (MarelePescar) pentru știucă în Deltă.",
  },
  {
    nume: "Shimano Adrena 1242",
    marca: "Shimano",
    specific: "2.18 m / 12-42 g, un tronson",
    prioritate: "expert",
    pentru: ["stiuca"],
    categoria: "lanseta",
    note: "Folosită pe Neajlov iarna cu Storm Fire Tiger.",
  },
  {
    nume: "Graphiteleader Silverado",
    marca: "Graphiteleader",
    specific: "2.34 m / 5-20 g",
    prioritate: "must",
    pentru: ["salau"],
    categoria: "lanseta",
    note: "Senzitivitate critică pentru atacurile firave ale șalăului.",
  },
  {
    nume: "Abu Garcia Beast",
    marca: "Abu Garcia",
    specific: "casting, până la 70 g",
    prioritate: "nice",
    pentru: ["stiuca"],
    categoria: "lanseta",
    note: "Pentru năluci mari și gliders 50-70 g. Combo cu multiplicator Abu Beast 2011.",
  },

  // === LANSETE CRAP ===
  {
    nume: "Trabucco Danubius Power River",
    marca: "Trabucco",
    specific: "2.70 m / 250 g (Bolentino italian, 2 tronsoane)",
    prioritate: "must",
    pentru: ["crap"],
    categoria: "lanseta",
    note: "Vârf fibră sticlă amortizant. Cea mai recomandată pentru combo barcă + mal.",
  },
  {
    nume: "Formax Visage Boat",
    marca: "Formax",
    specific: "2.70 m / 70-300 g",
    prioritate: "must",
    pentru: ["crap"],
    categoria: "lanseta",
    note: "Universală combo barcă + mal. 2.40 m doar din barcă, 3.00 m doar de pe mal.",
  },
  {
    nume: "Colmic Calibra 270",
    marca: "Colmic",
    specific: "3.00 m / 70-300 g (~500 RON)",
    prioritate: "expert",
    pentru: ["crap"],
    categoria: "lanseta",
    note: "Carbon compozit + vârf fibră sticlă plină. Foarte elastică — esențială pentru tehnica Vișoianu cu mono.",
  },
  {
    nume: "Trabucco Astore ISO Hunter",
    marca: "Trabucco",
    specific: "2.40 m / 250 g",
    prioritate: "nice",
    pentru: ["crap"],
    categoria: "lanseta",
    note: "Folosită pe Mila 23 martie (Gigant Fish Team).",
  },
  {
    nume: "Cormoran Big Cat Short Range",
    marca: "Cormoran",
    specific: "2.80 m / 10 lbs (de som!)",
    prioritate: "expert",
    pentru: ["crap"],
    categoria: "lanseta",
    note: "Folosită toamna pe Sf. Gheorghe cu plumb 300 g + montura inline.",
  },

  // === MULINETE ===
  {
    nume: "Shimano Vanford 4000",
    marca: "Shimano",
    prioritate: "must",
    pentru: ["stiuca", "salau", "avat"],
    categoria: "mulineta",
    note: "Spinning generalist, folosită de Moga Mihai.",
  },
  {
    nume: "Okuma Aventa Baitfeeder 5000",
    marca: "Okuma",
    prioritate: "must",
    pentru: ["crap"],
    categoria: "mulineta",
    note: "Cu baitrunner. Tambur de rezervă inclus la unele variante.",
  },
  {
    nume: "Okuma Surf 8K",
    marca: "Okuma",
    specific: "raport 1.08 m/manivelă, tambur ≥400-500 m",
    prioritate: "expert",
    pentru: ["crap"],
    categoria: "mulineta",
    note: "Recomandarea Vișoianu. 'Mai bună decât Daiwa/Shimano la același preț'. Tambur mare în caz că-ți taie cineva firul cu motorul.",
  },
  {
    nume: "Daiwa BG 6000",
    marca: "Daiwa",
    prioritate: "nice",
    pentru: ["crap"],
    categoria: "mulineta",
  },
  {
    nume: "Shimano Aero 4000XR",
    marca: "Shimano",
    prioritate: "nice",
    pentru: ["crap"],
    categoria: "mulineta",
    note: "Pentru combo feeder pe caras (apă rece).",
  },
  {
    nume: "Shimano Metanium HG cast",
    marca: "Shimano",
    prioritate: "expert",
    pentru: ["stiuca"],
    categoria: "mulineta",
    note: "Pentru combo casting cu Adrena.",
  },

  // === FIRE IMPLETITE ===
  {
    nume: "Berkley X9",
    marca: "Berkley",
    specific: "30 lbs / 0.19 mm",
    prioritate: "must",
    pentru: ["stiuca"],
    categoria: "fir",
    note: "Standardul spinning știucă. Pentru finețe extremă: 0.12 mm.",
  },
  {
    nume: "Power Pro Slick V2",
    marca: "Power Pro",
    specific: "0.15-0.19 mm",
    prioritate: "must",
    pentru: ["stiuca"],
    categoria: "fir",
  },
  {
    nume: "Sufix",
    marca: "Sufix",
    specific: "0.18 mm",
    prioritate: "nice",
    pentru: ["stiuca"],
    categoria: "fir",
    note: "Mătăsos, mai subțire decât alte 0.18. Atenție la fire dinți știucă — adaugă nod simplu de blocare la capăt.",
  },

  // === FIRE CRAP ===
  {
    nume: "Trabucco T-Force",
    marca: "Trabucco",
    specific: "0.26 mm",
    prioritate: "must",
    pentru: ["crap"],
    categoria: "fir",
    note: "Principal subțire — 'peștii mari intrau pe lansetele cu fir sub 0.30'. Rezervă 0.32 pentru zone cu agățători.",
  },
  {
    nume: "Berkley Trilene XT Hi-Vis Gold",
    marca: "Berkley",
    specific: "0.46 mm MONO (înlocuit cu Evo)",
    prioritate: "expert",
    pentru: ["crap"],
    categoria: "fir",
    note: "Standardul Vișoianu — mono pentru elasticitate, esențial cu lansetă elastică Colmic.",
  },
  {
    nume: "Corda Subline",
    marca: "Corda",
    specific: "0.43 mm / 1000 m / ~120 RON",
    prioritate: "must",
    pentru: ["crap"],
    categoria: "fir",
    note: "Recomandare buget. Verde camo. Suplu, nod bun, memorie scăzută, elongație un pic mare.",
  },
  {
    nume: "Sunset RS Competition",
    marca: "Sunset",
    specific: "1000 m / ~240 RON",
    prioritate: "expert",
    pentru: ["crap"],
    categoria: "fir",
    note: "Alternativă premium când Corda Subline e out of stock.",
  },
  {
    nume: "Shimano Technium Invisitec",
    marca: "Shimano",
    specific: "0.20-0.30 mm",
    prioritate: "nice",
    pentru: ["crap"],
    categoria: "fir",
  },
  {
    nume: "Claumar Poseidon fluorocarbon",
    marca: "Claumar",
    specific: "0.38 mm / 15 lbs",
    prioritate: "expert",
    pentru: ["crap"],
    categoria: "fir",
    note: "Înaintaș rigid pentru apă rece (<10°C) — împiedică scuiparea cârligului.",
  },

  // === CARLIGE ===
  {
    nume: "Korda Kurv X nr. 4",
    marca: "Korda",
    prioritate: "must",
    pentru: ["crap"],
    categoria: "carlige",
  },
  {
    nume: "Korda Krank Curve nr. 4",
    marca: "Korda",
    prioritate: "must",
    pentru: ["crap"],
    categoria: "carlige",
    note: "Formă agresivă pentru auto-înțepare; ochet exterior aliniat cu fluorocarbon. Pentru apă rece.",
  },
  {
    nume: "Carp Spirit BBP nr. 4",
    marca: "Carp Spirit",
    prioritate: "must",
    pentru: ["crap"],
    categoria: "carlige",
  },
  {
    nume: "Mustad Alpha Point",
    marca: "Mustad",
    prioritate: "expert",
    pentru: ["crap"],
    categoria: "carlige",
    note: "Recomandare Dragoș Grivei — 'vârf aproape Kamakura, mediu, ușor de absorbit, înțeapă chiar și după 6-7 trăsături'.",
  },
  {
    nume: "Solar wide gape",
    marca: "Solar",
    specific: "nr. 2 vara / nr. 6 toamna",
    prioritate: "expert",
    pentru: ["crap"],
    categoria: "carlige",
    note: "Wide gape, ochet drept, vârf drept. Recomandarea Vișoianu.",
  },

  // === NALUCI STIUCA ===
  {
    nume: "Savage Gear Cannibal Shad",
    marca: "Savage Gear",
    specific: "6-10 cm — Red Head, Fire Tiger, alb cu coadă roșie",
    prioritate: "must",
    pentru: ["stiuca"],
    categoria: "naluca",
    note: "Versatilitate maximă. 'Coada cu roșu aici a făcut toată treaba'.",
  },
  {
    nume: "Storm Jointed Minnow Shad",
    marca: "Storm",
    specific: "3.5\" (8-9 cm) — Fire Tiger",
    prioritate: "must",
    pentru: ["stiuca"],
    categoria: "naluca",
    note: "Baza iarna pe râu (Neajlov).",
  },
  {
    nume: "Berkley Choppo",
    marca: "Berkley",
    specific: "topwater prop",
    prioritate: "must",
    pentru: ["stiuca"],
    categoria: "naluca",
    note: "Pentru exemplare 90+ cm la Stația 11. Răbdare la înțepare obligatorie.",
  },
  {
    nume: "Abu Garcia Slider Hi-Lo",
    marca: "Abu Garcia",
    specific: "slider mare",
    prioritate: "nice",
    pentru: ["stiuca"],
    categoria: "naluca",
  },
  {
    nume: "Abu Garcia Svartzonker",
    marca: "Abu Garcia",
    specific: "hibrid hard+soft, 21 g, slow sinking",
    prioritate: "nice",
    pentru: ["stiuca"],
    categoria: "naluca",
    note: "Coada se înlocuiește cu grub Mann's / Relax (ieftine).",
  },
  {
    nume: "Berkley Big-Y 80",
    marca: "Berkley",
    specific: "~30 g, floating, cu bile",
    prioritate: "nice",
    pentru: ["stiuca"],
    categoria: "naluca",
    note: "Tehnică pe vegetație: 3-4 manivele scurte, pauză să se ridice, repetă.",
  },
  {
    nume: "Rapala BX Jointed 12",
    marca: "Rapala",
    specific: "~23 g, coboară 1 m",
    prioritate: "nice",
    pentru: ["stiuca"],
    categoria: "naluca",
    note: "Atacurile pe PAUZĂ — îl jighezi ca pe gumă. Culoare biban-portocaliu.",
  },
  {
    nume: "Berkley Zilla",
    marca: "Berkley",
    specific: "10 cm / 18 g, glider cu bile",
    prioritate: "nice",
    pentru: ["stiuca"],
    categoria: "naluca",
    note: "Pentru balastiere 2.5-3 m. Vine în 6-7 culori.",
  },

  // === NALUCI SALAU ===
  {
    nume: "Gumă verde clasic cu burtă deschisă",
    specific: "~7 cm",
    prioritate: "must",
    pentru: ["salau"],
    categoria: "naluca",
    note: "Verdele criminal. Confirmat în multiple partide.",
  },
  {
    nume: "Gambler verde",
    marca: "Gambler",
    specific: "~7 cm",
    prioritate: "nice",
    pentru: ["salau"],
    categoria: "naluca",
  },

  // === NALUCI AVAT ===
  {
    nume: "Helic Nikel",
    marca: "Helic",
    specific: "16-17 g",
    prioritate: "must",
    pentru: ["avat"],
    categoria: "naluca",
    note: "Nălucă câștigătoare iulie. Aspect natural.",
  },
  {
    nume: "Cast Master",
    specific: "10.5 g",
    prioritate: "must",
    pentru: ["avat"],
    categoria: "naluca",
    note: "Clasic pentru sărituri în anaforuri.",
  },

  // === BOILIES ===
  {
    nume: "Dynamite Baits Tiger & Corn",
    marca: "Dynamite Baits",
    specific: "20 mm",
    prioritate: "must",
    pentru: ["crap"],
    categoria: "boilies",
    note: "Folosit pe Chilia august. Capturi documentate.",
  },
  {
    nume: "Dynamite Carptek Scopex & Vanilla",
    marca: "Dynamite Baits",
    specific: "20 mm",
    prioritate: "nice",
    pentru: ["crap"],
    categoria: "boilies",
  },
  {
    nume: "Hook Bait Monster Crab",
    marca: "Hook Bait",
    specific: "20 mm",
    prioritate: "must",
    pentru: ["crap"],
    categoria: "boilies",
  },
  {
    nume: "Red Crab / Red Squid",
    specific: "fishmeal",
    prioritate: "must",
    pentru: ["crap"],
    categoria: "boilies",
    note: "Capturi peste 10 kg pe Chilia pe Red Crab.",
  },
  {
    nume: "GDA Delta Active (solubil)",
    marca: "GDA Fishing",
    specific: "20-24 mm",
    prioritate: "must",
    pentru: ["crap"],
    categoria: "boilies",
  },
  {
    nume: "GDA Delta Secret (semi-solubil)",
    marca: "GDA Fishing",
    specific: "24 mm",
    prioritate: "must",
    pentru: ["crap"],
    categoria: "boilies",
  },
  {
    nume: "GDA Cireașa de pe tort",
    marca: "GDA Fishing",
    specific: "super-solubilă",
    prioritate: "expert",
    pentru: ["crap"],
    categoria: "boilies",
    note: "Sezon rece — ianuarie / martie / apă <20°C. Prinsă la 5°C în ianuarie.",
  },
  {
    nume: "Baltacul Burfood tare",
    marca: "Baltacul",
    specific: "24 mm",
    prioritate: "must",
    pentru: ["crap"],
    categoria: "boilies",
    note: "Rezistă 12 ore în apă testat 19:00 → 7:00 (vara).",
  },
  {
    nume: "Baltacul Bird Food (căpșună)",
    marca: "Baltacul",
    prioritate: "must",
    pentru: ["crap"],
    categoria: "boilies",
    note: "Folosit 3-4 ani consecutiv cu rezultate.",
  },
  {
    nume: "Baltacul Fishmeal Monster Crab",
    marca: "Baltacul",
    specific: "semi-solubil",
    prioritate: "must",
    pentru: ["crap"],
    categoria: "boilies",
  },
  {
    nume: "Sticky Baits — Sticky Krill",
    marca: "Sticky Baits",
    specific: "16-20 mm",
    prioritate: "expert",
    pentru: ["crap"],
    categoria: "boilies",
    note: "Recomandare Vișoianu. 'Cea mai bună bilă pe Sulina, ia capturile cele mai mari'. Krill + arahide.",
  },
  {
    nume: "Wild Carp Strong dumbbells",
    marca: "Wild Carp",
    specific: "10-15 mm, alb sau oranj",
    prioritate: "must",
    pentru: ["crap"],
    categoria: "boilies",
    note: "Primăvara, pre-prohibiție. Dumb 10 mm a dat cel mai bun randament.",
  },

  // === NADA ===
  {
    nume: "Wild Carp 3x Aroma",
    marca: "Wild Carp",
    prioritate: "must",
    pentru: ["crap"],
    categoria: "nada",
    note: "Primăvara, pe momitor. Varianta Usturoi pentru când Ciortan deranjează.",
  },
  {
    nume: "Nadă GDA Ediție Specială",
    marca: "GDA Fishing",
    prioritate: "must",
    pentru: ["crap"],
    categoria: "nada",
    note: "Galbenă-fluorescentă, fără colorant rezidual, pelete galbene în compoziție. Pentru apă rece + curent (face dâră).",
  },
  {
    nume: "FeederX nadă",
    marca: "FeederX",
    prioritate: "nice",
    pentru: ["crap"],
    categoria: "nada",
    note: "Secționată fără colant — 'doar nadă, apă și asta-i tot'.",
  },
  {
    nume: "Brutal Carp Total Fishing",
    marca: "Total Fishing",
    prioritate: "nice",
    pentru: ["crap"],
    categoria: "nada",
  },

  // === MONTURI ===
  {
    nume: "Drennan Carp Method Hook Length Tie",
    marca: "Drennan",
    specific: "7.5-10 cm",
    prioritate: "must",
    pentru: ["crap"],
    categoria: "montura",
  },
  {
    nume: "Korda N-Trap",
    marca: "Korda",
    specific: "30 lbs",
    prioritate: "expert",
    pentru: ["crap"],
    categoria: "montura",
    note: "Semi-Stiff iarna / Soft vara. Lungime 30-35-40 cm. Recomandarea Vișoianu.",
  },
  {
    nume: "Plumb plat",
    specific: "120-150 g",
    prioritate: "must",
    pentru: ["crap"],
    categoria: "montura",
  },
  {
    nume: "Plumb tip ciment (Atac / WhitGap Claumar)",
    marca: "Atac / Claumar",
    specific: "150-300 g",
    prioritate: "expert",
    pentru: ["crap"],
    categoria: "montura",
    note: "Pentru zone cu curent puternic, adâncime mare, lansări lungi. ~12 RON la 150 g.",
  },
  {
    nume: "Shock leader Sufix Velocity Impact",
    marca: "Sufix",
    specific: "0.80 mm / 36 kg / 80 lbs",
    prioritate: "expert",
    pentru: ["crap"],
    categoria: "montura",
    note: "10-15 m. Singura soluție pe Sulina prag pietre + scoică.",
  },
  {
    nume: "Vârtej cu dublu lagăr",
    prioritate: "must",
    pentru: ["crap"],
    categoria: "montura",
    note: "OBLIGATORIU pe curent — fără el monturile se încurcă.",
  },
  {
    nume: "Biluță de cauciuc culisantă",
    prioritate: "must",
    pentru: ["crap"],
    categoria: "montura",
    note: "Permite plumbului să cadă liber la pierderea peștelui. NU fixă.",
  },

  // === ACCESORII ===
  {
    nume: "Avertizoare Delfin Roller Shock",
    marca: "Delfin",
    prioritate: "must",
    pentru: ["crap"],
    categoria: "accesorii",
    note: "Pe vibrații, prinse de lansetă cu bandă elastică. Set vechi laudat — atenție la setul nou (probleme de distanță / declanșare).",
  },
  {
    nume: "Minciog Acela Extra Strong",
    marca: "Acela",
    specific: "3.60 m, plasă cauciuc",
    prioritate: "must",
    pentru: ["crap"],
    categoria: "accesorii",
    note: "Plasă cauciuc cu ochiuri mari — nu absoarbe apă, nu miroase, nu se agață.",
  },
  {
    nume: "Suporți Kawasaki cu fier gros",
    marca: "Kawasaki",
    prioritate: "must",
    pentru: ["crap"],
    categoria: "accesorii",
    note: "Un crap mare îndoaie total suporții slabi.",
  },
  {
    nume: "Sonar cu side scan + down scan + sondă live",
    prioritate: "must",
    pentru: ["crap"],
    categoria: "accesorii",
    note: "Esențial pentru spotare cioate, identificare grup, marcare buturi pe GPS.",
  },
  {
    nume: "Ochelari polarizați",
    prioritate: "must",
    pentru: ["stiuca", "salau", "avat"],
    categoria: "accesorii",
    note: "Obligatoriu pe ape limpezi — vezi urmărirea peștelui, identifici structurile.",
  },
  {
    nume: "Motor electric cu GPS-anchor lock",
    prioritate: "expert",
    pentru: ["crap"],
    categoria: "accesorii",
    note: "Stă pe poziție fără sfori — esențial pentru repoziționare laterală pe sonar.",
  },
  {
    nume: "Chemlights",
    prioritate: "nice",
    pentru: ["crap"],
    categoria: "accesorii",
    note: "Marcaj locuri nadate pe vegetația deasă (noaptea).",
  },
];

// Echipament suplimentar din batch 2 (28 videouri analizate)
echipament.push(
  // === LANSETE SPINNING DE CONCURS ===
  { nume: "A.Sava Custom ASAVA72HF", marca: "A.Sava", specific: "7-40 g (blanc MHX + vârf fibră sticlă)", prioritate: "expert", pentru: ["avat", "salau"], categoria: "lanseta", note: "'Regina lansetelor' — exclusivă Marele Pescar. Vârful absoarbe atacul violent al avatului." },
  { nume: "Rapture Acrux Concept R Racing Magworm XF", marca: "Rapture", specific: "2.15 m / 7-28 g (blanc Toray Japonia)", prioritate: "expert", pentru: ["stiuca"], categoria: "lanseta", note: "Pentru concursuri Delta Spinning Challenge." },
  { nume: "Rapala Countdown spinning rod", marca: "Rapala", specific: "2.13 m / 5-21 g", prioritate: "nice", pentru: ["stiuca", "salau", "avat"], categoria: "lanseta", note: "Lansetă universală moale, baza Gigant Fish pentru spinning Deltă." },
  { nume: "Daiwa SZ 728", marca: "Daiwa", specific: "extra-fast, de șalău", prioritate: "expert", pentru: ["stiuca"], categoria: "lanseta", note: "Folosită deturnat pentru slidere de știucă pe lacuri Mila 23." },
  { nume: "Rapture Furon XF L", marca: "Rapture", specific: "2.18 m / 0.8-10 g", prioritate: "must", pentru: ["biban"], categoria: "lanseta", note: "Pentru biban pe Dunărea Veche cu microjig." },
  { nume: "Rapture Edge Master Solid", marca: "Rapture", specific: "1.95 m / 1-7 g (ultra-light, vârf solid)", prioritate: "expert", pentru: ["biban"], categoria: "lanseta" },
  { nume: "Daiwa Basti", marca: "Daiwa", specific: "7-28 g", prioritate: "nice", pentru: ["avat", "salau"], categoria: "lanseta" },

  // === LANSETE CRAP BUGET ===
  { nume: "FL Power Stick", marca: "FL", specific: "2.70 m / 250 g (~158 RON)", prioritate: "must", pentru: ["crap"], categoria: "lanseta", note: "Recomandare buget Baltacul — combo cu Okuma Dyna Drag + Claumar Inviziline = ~448 RON total." },
  { nume: "Penn Squadron Boat Sensitive gen. 4", marca: "Penn", specific: "2.70 m cu vârf rezervă medium/heavy", prioritate: "expert", pentru: ["crap"], categoria: "lanseta", note: "Recomandare medium Baltacul — ~500 RON. Vârf rezervă schimbabil." },
  { nume: "Trabuco Epica Adric Extreme", marca: "Trabuco", specific: "2.70 m feeder, inele mici", prioritate: "expert", pentru: ["crap"], categoria: "lanseta", note: "Folosită pe Sulina la digul de piatră (ghidul GDA A-Z)." },

  // === LANSETE SOMN ===
  { nume: "Ugly Stik Silurus Clonk", marca: "Ugly Stik", specific: "1.95 m / 80-200 g", prioritate: "must", pentru: ["somn"], categoria: "lanseta", note: "Lansetă de clonc, combo cu Penn Slammer 560." },
  { nume: "MadCat Full Force", marca: "MadCat", specific: "vertical bait casting, până 250 g", prioritate: "expert", pentru: ["somn"], categoria: "lanseta", note: "Rigid, pentru clonc cu plumb mare." },
  { nume: "MadCat Black Spin", marca: "MadCat", specific: "2.40 m / 40-150 g", prioritate: "must", pentru: ["somn"], categoria: "lanseta", note: "Pentru staționar. Combo cu mono Madcat 0.40 = TOATE trăsăturile productive (testat vs textil)." },
  { nume: "Unichet (somn)", marca: "Unichet", specific: "500-1000 g", prioritate: "expert", pentru: ["somn"], categoria: "lanseta", note: "Pentru somn mare pe groapă cu textil 0.40." },

  // === MULINETE ===
  { nume: "Shimano Stella 2500", marca: "Shimano", prioritate: "expert", pentru: ["stiuca", "salau", "avat", "biban"], categoria: "mulineta", note: "Top tier spinning." },
  { nume: "Shimano Stradic 2500", marca: "Shimano", prioritate: "must", pentru: ["stiuca", "salau", "avat"], categoria: "mulineta", note: "Sub-Stella, raport calitate-preț bun." },
  { nume: "Okuma Inspira 2500", marca: "Okuma", prioritate: "nice", pentru: ["stiuca"], categoria: "mulineta" },
  { nume: "Trabuco Helium 1000", marca: "Trabuco", specific: "carbon", prioritate: "expert", pentru: ["biban"], categoria: "mulineta", note: "Mulinetă carbon ultra-light pentru microjig la biban." },
  { nume: "Okuma Custom Carp CC 7000", marca: "Okuma", prioritate: "expert", pentru: ["crap"], categoria: "mulineta", note: "Identică Custom Black + robustețe. Tambur metal + tambur plastic rezervă. Recomandare medium Baltacul." },
  { nume: "Okuma Dyna Drag XP", marca: "Okuma", specific: "cu baitrunner, tambur 150m/0.45, 4 rulmenți (~200 RON)", prioritate: "must", pentru: ["crap"], categoria: "mulineta", note: "Recomandare buget Baltacul." },
  { nume: "Penn Vantage XT 7000", marca: "Penn", prioritate: "expert", pentru: ["crap"], categoria: "mulineta", note: "Identică cu Penn Tidal XT 7000 (doar culoare diferită). <500 g, 1 an folosință fără joc." },
  { nume: "Penn Slammer 560", marca: "Penn", prioritate: "must", pentru: ["somn"], categoria: "mulineta", note: "Combo standard pentru clonc și staționar pe somn." },
  { nume: "Penn Hidal XT 8000", marca: "Penn", prioritate: "expert", pentru: ["crap"], categoria: "mulineta", note: "Pentru lansete plantate cu navomodelul pe lac (Corbu)." },

  // === FIRE ===
  { nume: "YGK X-Braid Upgrade X8 Light Green", marca: "YGK", specific: "22 lb", prioritate: "expert", pentru: ["stiuca", "salau", "avat"], categoria: "fir", note: "Fir împletit premium pentru spinning." },
  { nume: "Momoi Tacumi Zigline", marca: "Momoi", specific: "0.05 mm", prioritate: "expert", pentru: ["biban"], categoria: "fir", note: "Subțire real, scufundător, NU absoarbe apă. Pentru microjig." },
  { nume: "Momoi Ryujin", marca: "Momoi", specific: "0.06-0.20 mm", prioritate: "expert", pentru: ["stiuca", "biban"], categoria: "fir" },
  { nume: "Sufix 131", marca: "Sufix", specific: "9 lb", prioritate: "nice", pentru: ["stiuca"], categoria: "fir" },
  { nume: "Korda Subline", marca: "Korda", specific: "0.43 mm", prioritate: "must", pentru: ["crap"], categoria: "fir", note: "Echivalent PB Control 95%. ~140-150 RON / 1000 m." },
  { nume: "Trabucco TFC Carp Enduro", marca: "Trabucco", specific: "~200+ RON / 1000 m", prioritate: "expert", pentru: ["crap"], categoria: "fir", note: "Rezistență top dar memorie ridicată. Recomandare Baltacul premium." },
  { nume: "Sunset ARS Competition", marca: "Sunset", specific: "portocaliu fluo", prioritate: "expert", pentru: ["crap"], categoria: "fir", note: "Mențiune onorabilă Baltacul. Alternativă la Trabucco Enduro." },
  { nume: "Claumar Inviziline", marca: "Claumar", specific: "0.45 mm (~90 RON / 1140 m)", prioritate: "must", pentru: ["crap"], categoria: "fir", note: "Recomandare buget Baltacul." },
  { nume: "MadCat mono", marca: "MadCat", specific: "0.40 mm", prioritate: "must", pentru: ["somn"], categoria: "fir", note: "TESTAT vs textil 0.40 — mai multe trăsături la somn până în 10 kg pe mono. Textilul = doar pt somn mare pe groapă." },

  // === NALUCI STIUCA ===
  { nume: "Slider Salmo 7", marca: "Salmo", specific: "floating 17 g / sinking 21 g", prioritate: "must", pentru: ["stiuca"], categoria: "naluca", note: "Culori MarelePescar: galben-negru, portocaliu-galben-negru. Sliderul jercat din vârf bate lingurița pentru știuci mai mari." },
  { nume: "Rapture vobler cu bile", marca: "Rapture", prioritate: "nice", pentru: ["stiuca"], categoria: "naluca", note: "Zgomot — atrage știuca de 65 cm într-un episod cu Gigi Moroiu." },
  { nume: "Rublex 'Irlandeza' originale", marca: "Rublex", specific: "12, 15, 18, 21, 24, 30 g (argint/aur/cupru)", prioritate: "expert", pentru: ["stiuca"], categoria: "naluca", note: "Fabricate ca bijuterii — premium." },
  { nume: "Lingurițe Berti", marca: "Berti", specific: "10 g", prioritate: "nice", pentru: ["stiuca"], categoria: "naluca", note: "Pentru apă 0.5 m cu iarbă — recuperare lentă fără agățare." },
  { nume: "Lingurițe Leira 'irlandeze'", marca: "Leira", prioritate: "nice", pentru: ["stiuca"], categoria: "naluca" },
  { nume: "Gume Lambe Sandra", marca: "Lambe", specific: "9 cm și 12 cm (alb cu cap roșu)", prioritate: "nice", pentru: ["stiuca"], categoria: "naluca", note: "Pe jighead 3-5 g, animate ca la șalău." },
  { nume: "Fast Strike shad", marca: "Fast Strike", specific: "alb cu cap roșu", prioritate: "must", pentru: ["stiuca"], categoria: "naluca" },

  // === NALUCI AVAT ===
  { nume: "Duo Realis", marca: "Duo", specific: "14.5 g și 21 g (natural cu spate negru)", prioritate: "must", pentru: ["avat"], categoria: "naluca", note: "Avat 49-50 cm pe epi-uri Sulina." },
  { nume: "Rapala Countdown Elite", marca: "Rapala", specific: "verde-cap roșu", prioritate: "must", pentru: ["avat"], categoria: "naluca" },
  { nume: "Fast Strike Hunter Big River", marca: "Fast Strike", specific: "21 g", prioritate: "must", pentru: ["avat", "salau"], categoria: "naluca" },
  { nume: "Cicade Lazer Tactic Fishing", marca: "Ticu Fishing", specific: "18-22 g", prioritate: "nice", pentru: ["avat"], categoria: "naluca" },
  { nume: "Rapture Under Silent", marca: "Rapture", specific: "vobler ieftin <30 RON", prioritate: "must", pentru: ["avat", "salau"], categoria: "naluca", note: "Raport preț-eficiență excelent." },

  // === NALUCI SALAU ===
  { nume: "Storm Largo Shad 'Houdini'", marca: "Storm", specific: "culoare rozaliu", prioritate: "must", pentru: ["salau"], categoria: "naluca", note: "Primul șalău în partida de iarnă pe Sulina." },
  { nume: "Micado shad galben-roșu cu puncte negre", marca: "Micado", prioritate: "nice", pentru: ["salau"], categoria: "naluca" },
  { nume: "Fish Up shad maro cu gliter roșu", marca: "Fish Up", prioritate: "nice", pentru: ["salau"], categoria: "naluca", note: "Bun pe cădere." },
  { nume: "Fox Rage Zander Pro Shad", marca: "Fox Rage", specific: "culoare 'secretă'", prioritate: "expert", pentru: ["salau"], categoria: "naluca", note: "Funcționează la pescarii buni — nu e pentru oricine, depinde de animație." },

  // === NALUCI BIBAN ===
  { nume: "Fast Strike gumă 'Motoroil'", marca: "Fast Strike", prioritate: "must", pentru: ["biban"], categoria: "naluca", note: "Culoare preferată — Dunărea Veche noiembrie." },
  { nume: "Bass Assassin Electric Chicken", marca: "Bass Assassin", specific: "gumă cu coadă curly", prioritate: "must", pentru: ["biban"], categoria: "naluca" },
  { nume: "Rapture 4 cm cu coadă mai mare", marca: "Rapture", prioritate: "nice", pentru: ["biban"], categoria: "naluca", note: "Pe jighead BKK 7 g #1/0 pentru selectarea bibanilor mari." },

  // === STRUNA ===
  { nume: "Traco titan 7 fire", marca: "Traco", prioritate: "expert", pentru: ["stiuca", "salau"], categoria: "montura", note: "Revine la forma inițială după mototolire — flexibilitate maximă." },

  // === BOILIES / NADA ===
  { nume: "GDA Cireașa pe tort 20 mm căpșună", marca: "GDA Fishing", specific: "20 mm pe cârlig", prioritate: "must", pentru: ["crap"], categoria: "boilies", note: "Bilă pentru day session pe Sulina." },
  { nume: "GDA Delta Secret biletari", marca: "GDA Fishing", specific: "24 mm tari, rezistente 4-5 ore", prioritate: "must", pentru: ["crap"], categoria: "boilies", note: "Mihai Manea — pentru pești mari pe adâncime." },
  { nume: "GDA Delta Activ semisolubilă", marca: "GDA Fishing", specific: "24 mm semisolubilă", prioritate: "must", pentru: ["crap"], categoria: "boilies", note: "Produs nou GDA (2025). Crap 11 kg pe Sulina sfârșit octombrie." },
  { nume: "GDA 'Minciunele' wafter moi", marca: "GDA Fishing", specific: "8 mm și 15 mm, foarte moi", prioritate: "expert", pentru: ["crap"], categoria: "boilies", note: "Pentru pești apatici iarna. Se ridică ele singure fără să ridice cârligul. Pescuit din curiozitate." },
  { nume: "GDA Dumble-uri solubile", marca: "GDA Fishing", prioritate: "expert", pentru: ["crap"], categoria: "boilies", note: "Topite în 30-40 min. Tăiate cu cutter în dreptunghi/pătrat pentru activare instant. Strategia 'Bate Norocul'." },
  { nume: "Pelete fish meal 32% proteină", marca: "GDA Fishing", specific: "5 mm", prioritate: "must", pentru: ["crap"], categoria: "nada", note: "Produs nou GDA — pentru momitor." },
  { nume: "Dynamite Sweet Tiger & Corn", marca: "Dynamite Baits", specific: "20 mm", prioritate: "must", pentru: ["crap"], categoria: "boilies" },
  { nume: "Dynamite Carptek Scopex & Vanilla", marca: "Dynamite Baits", specific: "20 mm", prioritate: "nice", pentru: ["crap"], categoria: "boilies" },
  { nume: "Mr Dudy Bites kicker", marca: "Mr Dudy", specific: "caramele kicker", prioritate: "expert", pentru: ["crap"], categoria: "boilies", note: "Pentru wafter bi-color cu agresivitate. Folosit pe Lacul Corbu când boilies-ul nu mai mergea." },
  { nume: "Dudy Complete Spod Mix", marca: "Mr Dudy", prioritate: "nice", pentru: ["crap"], categoria: "nada", note: "Mix pentru spomb cu boilies + porumb + spărtură alună + pelete." },

  // === MOMEALA SOMN ===
  { nume: "Vier de salcie", prioritate: "must", pentru: ["somn"], categoria: "somn-specific", note: "CÂȘTIGĂTOR ABSOLUT pe somn (testat vs râme negre + mațe macrou = ZERO). Cumpărat de la piața din Tulcea. CIUPEȘTE — bagă cu PATENT pe cârlig." },
  { nume: "Coropișniță", prioritate: "must", pentru: ["somn"], categoria: "somn-specific", note: "Combinată cu vier de salcie pe cârlig = cea mai bună momeală pentru somn. Tulcea, piață." },
  { nume: "Râme proaspete", prioritate: "must", pentru: ["somn"], categoria: "somn-specific", note: "Pentru clonc. Păstrate în geantă termo MadCat + sac rafie pentru umezeală. Fluctuațiile de temperatură le deteriorează rapid." },

  // === CLONC ===
  { nume: "B.B. Clonc TR / TNZ convex", marca: "B.B. Clonc", specific: "Bogdan Munteanu, pastilă convexă", prioritate: "must", pentru: ["somn"], categoria: "somn-specific", note: "Pentru începători — intră ușor în apă. Disponibil la Marele Pescar." },
  { nume: "Les MadCat 'țigaretă'", marca: "MadCat", specific: "200 g", prioritate: "must", pentru: ["somn"], categoria: "somn-specific", note: "Se scufundă, taie curentul." },
  { nume: "Ancoră BKK Viper 4/0 + cârlig 7/0", marca: "BKK", prioritate: "must", pentru: ["somn"], categoria: "somn-specific", note: "Combinația 'păcălici' pentru clonc — ancora cu râme în masă + cârlig 7/0 doar acoperit (somnul pune gura pe păcălici)." },
  { nume: "Teaser MadCat Adjust", marca: "MadCat", specific: "caracatiță cu tentacule + bile", prioritate: "expert", pentru: ["somn"], categoria: "somn-specific", note: "Pentru vibrație suplimentară când peștii nu răspund. Modificat cu plumb 250 g + montura clasică." },
  { nume: "Opritor MadCat sectionat", marca: "MadCat", prioritate: "nice", pentru: ["somn"], categoria: "somn-specific", note: "Pentru ajustat distanța plumb-cârlig (scurt = vibrație, lung 40-50 cm = pește suspicios)." },

  // === SONARE / NAVOMODELE / ACCESORII ===
  { nume: "Garmin GPSMAP 923 XSV", marca: "Garmin", specific: "9 inch, Down + Side Imaging", prioritate: "expert", pentru: ["crap", "somn"], categoria: "accesorii", note: "Preferat față de Finval/Humminbird/Lowrance. Identifică crapii după mărimea 'buburuzelor' pe Down — mari = crap, mici = caras." },
  { nume: "Garmin Live Scope 841 + LVS34", marca: "Garmin", specific: "live sonar", prioritate: "expert", pentru: ["biban", "stiuca", "salau"], categoria: "accesorii", note: "Localizare bancuri în timp real." },
  { nume: "Lowrance HDS Pro 16 + Active Target 2", marca: "Lowrance", specific: "live sonar", prioritate: "expert", pentru: ["somn"], categoria: "accesorii", note: "Afișează silueta naturală a somnului. Permite apropierea monturii fără a speria peștele. 2D-ul comprimă semnal — Active Target = upgrade major." },
  { nume: "Deeper Quest navomodel", marca: "Deeper", specific: "rază 400 m, sonar integrat, auto-pilot", prioritate: "expert", pentru: ["crap"], categoria: "accesorii", note: "Conuri 47°/20°/7°, sensibilitate 70% (echilibru). Pentru poziționare PRECISĂ pe structuri, nu doar distanță." },
  { nume: "Rod-pod Prologic Tri-Sky", marca: "Prologic", specific: "4 posturi", prioritate: "nice", pentru: ["crap"], categoria: "accesorii" },
  { nume: "Avertizoare Prologic Cies", marca: "Prologic", prioritate: "nice", pentru: ["crap"], categoria: "accesorii", note: "Lumină + indicator pentru lanseta cu trăsătură." },
  { nume: "Cleștele plantat Ridge Monkey", marca: "Ridge Monkey", prioritate: "nice", pentru: ["crap"], categoria: "accesorii" },
  { nume: "Lanternă albastră Formax", marca: "Formax", prioritate: "nice", pentru: ["crap"], categoria: "accesorii", note: "Vede firul fluo în drill noaptea." },
  { nume: "Barcă Mary Fisher 695", marca: "Mary Fisher", specific: "695", prioritate: "expert", pentru: ["crap"], categoria: "accesorii", note: "Barca Gigant Fish pentru pescuit pe canalele Mila 23." },
  { nume: "Finval 595", marca: "Finval", specific: "595", prioritate: "expert", pentru: ["salau", "crap"], categoria: "accesorii", note: "Pentru Sulina. Combo cu motor electric Quest + Live Scope pe baterie LiFePO4 36V/100Ah." },
  { nume: "Stație gătit Fox multifuncțională", marca: "Fox", specific: "grătar fontă + placă + tigaie + butelie Flamex", prioritate: "nice", pentru: ["crap", "somn"], categoria: "accesorii", note: "Pentru gătit pe barcă în partide lungi." },
  { nume: "Geantă termo MadCat pentru râme", marca: "MadCat", prioritate: "must", pentru: ["somn"], categoria: "somn-specific", note: "Plus sac de rafie pentru umezeală. Fluctuațiile de temperatură deteriorează râmele rapid." }
);

// Echipament nou din batch 3 (GFT)
echipament.push(
  // LANSETE SPINNING SALAU NOU
  { nume: "Zenaq Spirado Dragar", marca: "Zenaq", specific: "declarat 3.5-14 g, dar lucrează cu jiguri până la 200 g", prioritate: "expert", pentru: ["salau"], categoria: "lanseta", note: "Preferata lui Marian Mincu pentru șalău. Combinată cu Shimano Stradic + fir Igie 16 lbs." },
  { nume: "Daiwa Steez", marca: "Daiwa", specific: "7-28 g", prioritate: "expert", pentru: ["salau"], categoria: "lanseta", note: "Combinată cu Shimano Stradic 2500 + Sufix 832 0.14 mm." },
  { nume: "Sportex Kidra", marca: "Sportex", specific: "19-71 g (hranitoare/feeder)", prioritate: "nice", pentru: ["salau", "somn"], categoria: "lanseta", note: "Mulinetă Shimano Ultegra 4000, fir Sufix 25 lbs. Bună și pt somn vertical + vobler mari." },
  { nume: "Madcat Black Series Spin", marca: "Madcat", specific: "2.40 m / 40-150 g", prioritate: "must", pentru: ["somn"], categoria: "lanseta", note: "Setup somn LIGHT pentru primăvara (Erenciuc). Frecvență trăsături mult mai mare decât textil 0.40 — testat. Combo Penn Slammer 560 + Sufix Matrix Pro 0.4." },

  // SONARE NOI
  { nume: "Humminbird Apex 13", marca: "Humminbird", specific: "sonar 2D + DownImaging", prioritate: "expert", pentru: ["somn", "crap"], categoria: "accesorii", note: "Folosit de GFT pe Chilia. Detalii fundului + linia de cădere a peștelui." },
  { nume: "Humminbird Solix 12", marca: "Humminbird", specific: "2D — Sens 9, Contrast 17, Speed 7, 150/200 kHz chirp", prioritate: "expert", pentru: ["somn", "crap"], categoria: "accesorii", note: "Setări concrete GFT pentru clonc. NU 83/200 kHz." },
  { nume: "Garmin Panoptix LiveScope LVS34", marca: "Garmin", specific: "live sonar (combinat cu GPSMAP 8412)", prioritate: "expert", pentru: ["somn"], categoria: "accesorii", note: "DESCOPERIRE: pe 2D părea că somnul ajunge la momeală — pe LVS34 se vede că oprește la 3-4 m. Rata reală atac ~90%." },
  { nume: "Smart Vision rotator electronic", specific: "motorizat cu telecomandă + memorie pentru LVS34", prioritate: "expert", pentru: ["somn"], categoria: "accesorii", note: "Esențial cu LiveScope — orientezi sonda pe orice direcție fără să muți barca." },

  // CARLIGE NOI
  { nume: "Gamakatsu G-Carp A1 PTFE Pop-Up nr. 4", marca: "Gamakatsu", specific: "nr. 4 pentru Sulina / curent puternic", prioritate: "must", pentru: ["crap"], categoria: "carlige", note: "Vârf închis dictează direcția matisării. Carl ig favorit GFT." },
  { nume: "Gamakatsu G-Carp A1 PTFE Pop-Up nr. 6", marca: "Gamakatsu", specific: "nr. 6 pentru lacuri / Dunărea Veche", prioritate: "must", pentru: ["crap"], categoria: "carlige", note: "Funcționează de la caraș 200g la crap 15 kg cu același nr. 6." },
  { nume: "Ancorițe Owner nr. 2", marca: "Owner", specific: "două pe montura de clonc", prioritate: "must", pentru: ["somn"], categoria: "somn-specific", note: "Frecvență trăsături MULT mai mare decât ancora 4/0 mare. Buchet de 3 râme negre pe fiecare + atractant somn." },
  { nume: "Cârlige Zeck (somn)", marca: "Zeck", prioritate: "nice", pentru: ["somn"], categoria: "somn-specific", note: "Pentru montura cu lipitori la Erenciuc primăvara." },

  // CLONCURI
  { nume: "Clonc Bogdan Munteanu 'Satan 3'", marca: "B.B. Clonc", specific: "pastilă convexă mare", prioritate: "expert", pentru: ["somn"], categoria: "somn-specific", note: "Preferatul lui Marian Mincu — 'se bate foarte ușor, scoate un zgomot înfundat foarte puternic'. La magazinul Marele Pescar." },
  { nume: "Clonc Ebro 2 / Ebro 3", marca: "Ebro", prioritate: "expert", pentru: ["somn"], categoria: "somn-specific", note: "Alternative populare la GFT." },
  { nume: "Clonc Profi Blinker (personalizat)", marca: "Profi Blinker", prioritate: "expert", pentru: ["somn"], categoria: "somn-specific" },

  // FIRE NOI
  { nume: "PB Products Strong forfac", marca: "PB Products", specific: "0.18 mm / 22 kg", prioritate: "must", pentru: ["crap"], categoria: "fir", note: "Singurul diametru pe care GFT îl folosește. Rotund, mătăsos, foarte moale. Funcționează cu caraș 200g la crap 15 kg." },
  { nume: "Sufix Matrix Pro", marca: "Sufix", specific: "0.4 mm — 135 m bobină", prioritate: "must", pentru: ["somn"], categoria: "fir", note: "Pentru combo Madcat Black Series Spin." },
  { nume: "Zeck forfac textil", marca: "Zeck", specific: "0.8 mm", prioritate: "nice", pentru: ["somn"], categoria: "fir", note: "Pentru montura cu lipitori la Erenciuc." },

  // SHADURI ȘALĂU
  { nume: "Bass'n Shad firetiger", marca: "Bass'n Shad", specific: "culoarea firetiger", prioritate: "must", pentru: ["salau"], categoria: "naluca", note: "Folosit pe Dunăre la Tulcea — capturile de iarnă." },
  { nume: "Daiwa Tournament Lime", marca: "Daiwa", specific: "culoarea lime", prioritate: "must", pentru: ["salau"], categoria: "naluca", note: "Culoarea preferată GFT pentru șalău pe Dunăre." },
  { nume: "Fox Rage spiky", marca: "Fox Rage", specific: "spiky cu culori pepper", prioritate: "nice", pentru: ["salau"], categoria: "naluca", note: "Marea trăsătură pe Dunăre vine pe spike Rage Fox." },
  { nume: "Gambler shad striații", marca: "Gambler", prioritate: "nice", pentru: ["salau"], categoria: "naluca" },

  // VOBLERE STIUCA
  { nume: "Sebile Magic Swimmer / Stick Shadd", marca: "Sebile", specific: "imită pește rănit", prioritate: "must", pentru: ["stiuca"], categoria: "naluca", note: "Când lingurițele nu produc pe lacul Babina, voblerele Sebile cu animație în vârf provoacă atacurile." },

  // MOMELI SOMN NOI
  { nume: "Lipitori (groase)", prioritate: "must", pentru: ["somn"], categoria: "somn-specific", note: "Pentru Erenciuc / Sf. Gheorghe primăvara. GROASE > subțiri (rezistă la mărunțiș). Procurare: pescari locali." },
  { nume: "Coropișnițe (buchet 2 pe cârlig)", prioritate: "must", pentru: ["somn"], categoria: "somn-specific", note: "Pentru somn CAPITAL pe Chilia — una 'ca regina', alta 'coadă'. Pe Erenciuc — primele zile slabe, vara pe Chilia foarte productive. Procurare: piață Tulcea sau membri GFT." },
  { nume: "Atractant somn (spray)", prioritate: "nice", pentru: ["somn"], categoria: "somn-specific", note: "Pulverizat pe râme — crește frecvența trăsăturilor cu LiveScope la activ." },

  // NADA / TTX
  { nume: "TTX Cuc (cocă)", marca: "Cuc", specific: "praf + aromă", prioritate: "must", pentru: ["crap"], categoria: "nada", note: "Confirmat câștigător 7-1 vs boilies primăvara. Mizerie pe haine/barcă, dar primăvara nimic nu bate momitorul. NU vara — atrage albitură." },
  { nume: "Porumb dulce Cuc cu miere", marca: "Cuc", specific: "semi-umed", prioritate: "must", pentru: ["crap"], categoria: "boilies", note: "Două boabe pe fir de păr cu varniș curbat (împiedică rotirea). Combo cu TTX = primăvara perfectă." },
  { nume: "Boilies Profi", marca: "Profi", specific: "pungă personalizată", prioritate: "nice", pentru: ["crap"], categoria: "boilies", note: "Mai bune decât Decathlon (care 'se lărgește în gaură'). Pentru vară pe Sulina." },
  { nume: "Boilies Fishmeal homemade Mihai Manea", specific: "rețetă proprie", prioritate: "expert", pentru: ["crap"], categoria: "boilies", note: "Pentru crap CAPITAL pe Chilia. Activare LENTĂ (1-2 zile) — combinație cu Burfood pentru spart gheața + Fishmeal pentru tracțiuni mari." },

  // ALTE
  { nume: "Minciog Savage Gear (pliabil)", marca: "Savage Gear", specific: "mâner pliabil scurt", prioritate: "nice", pentru: ["salau"], categoria: "accesorii", note: "Încape în barcă mică (Finval). Compatibil cu pescuitul de șalău pe Tulcea." },
  { nume: "Costum Daiwa Grafix", marca: "Daiwa", specific: "salopetă completă", prioritate: "nice", pentru: ["salau"], categoria: "accesorii" },
  { nume: "Costum Fox Rage (flotabilitate)", marca: "Fox Rage", prioritate: "nice", pentru: ["salau"], categoria: "accesorii", note: "Cu flotabilitate — siguranță pe Dunăre iarna." }
);

// Echipament nou batch 4 — selectat după distinctivitate
echipament.push(
  // LANSETE FEEDER (mărci + prețuri)
  { nume: "Daiwa TriForce Target Feeder Method 3.00 m / 60 g", marca: "Daiwa", specific: "~170 RON", prioritate: "must", pentru: ["crap"], categoria: "lanseta", note: "Recomandare buget de top — Anelin pentru începători. Mâner EVA, 2 vârfuri (1.5+2 oz)." },
  { nume: "Daiwa TriForce Target Feeder Power 3.60/3.90 m / 150 g", marca: "Daiwa", specific: "~200 RON", prioritate: "must", pentru: ["crap"], categoria: "lanseta", note: "Versiunea pentru distanță și putere. 8 modele în serie." },
  { nume: "Daiwa Black Widow 3.90 m / 150 g", marca: "Daiwa", specific: "~300 RON", prioritate: "must", pentru: ["crap"], categoria: "lanseta", note: "Recomandare buget Baltacul pentru feeder pe Dunăre. Coș COMPLET la ~1000 RON cu accesorii." },
  { nume: "Formax Worldchamp Pro 4.20 m / 130 g", marca: "Formax", specific: "vârf gamă pentru distanță", prioritate: "expert", pentru: ["crap"], categoria: "lanseta", note: "Folosită de Anelin în competiții. Mâner EVA+plută cu zonă aplatizată ergonomică." },
  { nume: "Formax Visage River Feeder 4 m / 180 g", marca: "Formax", prioritate: "expert", pentru: ["crap"], categoria: "lanseta", note: "Pentru scobar/mreana pe râuri curgătoare (Olt)." },
  { nume: "Okuma Custom Black Feeder 3.66/3.90 m / 60-150 g", marca: "Okuma", prioritate: "must", pentru: ["crap"], categoria: "lanseta" },
  { nume: "Trabucco Precision 3.60 m parabolică", marca: "Trabucco", prioritate: "nice", pentru: ["crap"], categoria: "lanseta", note: "Folosit pe balta Cateasca cu GDA." },
  { nume: "Colmic Calibra 2.70 m / 70-300 g", marca: "Colmic", prioritate: "expert", pentru: ["crap"], categoria: "lanseta", note: "Sensibile la vârf, puternice pe blanc — Baltacul Delta Carp Challenge." },

  // LANSETE SPINNING NOI
  { nume: "A.Sava Custom ASAVA 72HF 7-40 g", marca: "A.Sava", specific: "extra fast 10/30 g, 2.20 m", prioritate: "expert", pentru: ["salau"], categoria: "lanseta", note: "Bijuterie senzitivă personalizabilă cu numele. Simte fundul cu 21 g în curent puternic. La marelepescar.ro." },
  { nume: "Daiwa Steez AGS MH 2.13 m / 7-28 g", marca: "Daiwa", prioritate: "expert", pentru: ["salau"], categoria: "lanseta", note: "Preferata lui Marian Zigarov pentru șalău Tulcea." },
  { nume: "Zenaq Spirado Black Art S2-68 Dragger", marca: "Zenaq", specific: "2.03 m / 3.5-14 g", prioritate: "expert", pentru: ["salau", "biban"], categoria: "lanseta" },
  { nume: "Quantum Smoke S3+ 2.40 m / 12-75 g", marca: "Quantum", prioritate: "nice", pentru: ["salau"], categoria: "lanseta" },
  { nume: "Sportex Hydra Speed", marca: "Sportex", prioritate: "nice", pentru: ["salau"], categoria: "lanseta" },
  { nume: "Prologic C3 Full Chrome / C2 Element", marca: "Prologic", prioritate: "expert", pentru: ["crap"], categoria: "lanseta", note: "Pentru plantat din barcă pe Iannis Lake — Claudiu Popa." },

  // LANSETE SOMN
  { nume: "Unicat Knockout 2.40 m / 250-1000 g", marca: "Unicat", specific: "~190 RON real-fishing.ro (Cristi Borș)", prioritate: "must", pentru: ["somn"], categoria: "lanseta", note: "Lansetă somn raport calitate-preț. Cu Penn 8500 = combo de bază." },

  // MULINETE
  { nume: "Tica Sea Mentor Heavy Feeder", marca: "Tica", specific: "8 rulmenți (1 pe galet anti-răsucire), clips metalic", prioritate: "must", pentru: ["crap"], categoria: "mulineta", note: "Best raport calitate-preț feeder. Tambur rezervă separat inclus." },
  { nume: "Shimano Ultegra XR", marca: "Shimano", specific: "frână precisă", prioritate: "expert", pentru: ["crap"], categoria: "mulineta", note: "Pentru partide scurte iarnă — frână care salvează drillul." },
  { nume: "Penn Vantage 7000 / 8000 XT", marca: "Penn", specific: "raport min 100 cm/tură, capacitate mare", prioritate: "expert", pentru: ["crap"], categoria: "mulineta", note: "Pentru plantat distanță (Iannis Lake) — Claudiu Popa." },
  { nume: "Penn Tidal XT Long Cast", marca: "Penn", prioritate: "expert", pentru: ["crap"], categoria: "mulineta", note: "Folosită de Anelin la feeder competiție." },
  { nume: "Shimano Stella 2500S FJ", marca: "Shimano", prioritate: "expert", pentru: ["salau"], categoria: "mulineta", note: "Premium spinning — Marian Zigarov pentru șalău Tulcea." },
  { nume: "Okuma Helios 2.23 m + ITX 2500/3000", marca: "Okuma", specific: "combo avat", prioritate: "nice", pentru: ["avat"], categoria: "lanseta", note: "Moale de vobler, raport recuperare mare." },

  // FIRE NOI
  { nume: "Claumar Super Feeder Line", marca: "Claumar", specific: "0.25 mm — producător RO", prioritate: "must", pentru: ["crap"], categoria: "fir", note: "Memorie zero, se scufundă. Pentru feeder pe Dunăre — Baltacul." },
  { nume: "Claumar SHL Super Hook Line", marca: "Claumar", specific: "0.08 mm — fir textil cârlig method", prioritate: "must", pentru: ["crap"], categoria: "fir" },
  { nume: "YGK X-Braid 16 lb", marca: "YGK", prioritate: "expert", pentru: ["salau"], categoria: "fir", note: "Pentru șalău IARNĂ — 'taie apa', simți orice atinge. Marian Zigarov." },
  { nume: "Sufix 131 G-Core", marca: "Sufix", specific: "0.13 mm cu miez", prioritate: "expert", pentru: ["salau"], categoria: "fir" },
  { nume: "Momoi Tacumi Zigline", marca: "Momoi", specific: "0.05 mm — scufundător, nu absoarbe apă", prioritate: "expert", pentru: ["biban"], categoria: "fir" },
  { nume: "PB Products Strong forfac", marca: "PB Products", specific: "0.18 mm / 22 kg", prioritate: "must", pentru: ["crap"], categoria: "fir", note: "Singurul diametru GFT pentru toate dimensiunile crap (200g - 15 kg). Mătăsos, foarte moale." },
  { nume: "Sufix Matrix Pro", marca: "Sufix", specific: "0.40 mm / 45 kg / 135 m bobină", prioritate: "must", pentru: ["somn"], categoria: "fir", note: "Pentru Madcat Black Spin la somn pe Chilia." },
  { nume: "Owner Kizuna 0", marca: "Owner", specific: "împletit în 8, ~100 RON / 135 m", prioritate: "expert", pentru: ["crap"], categoria: "fir", note: "Calitate japoneză. 0.10-0.13 mm diametru REAL." },

  // CARLIGE
  { nume: "Gamakatsu G-Carp A1 PTFE Pop-Up nr. 4-6", marca: "Gamakatsu", prioritate: "must", pentru: ["crap"], categoria: "carlige", note: "Universalul GFT. Nr. 4 pe Sulina, nr. 6 pe canale/lacuri. Vârf închis dictează direcția matisării (7-8x)." },
  { nume: "Drennan nr. 12-14", marca: "Drennan", prioritate: "nice", pentru: ["crap"], categoria: "carlige", note: "Feeder fin pe lacuri cu populație mică." },
  { nume: "Hayabusa RB XS nr. 8", marca: "Hayabusa", prioritate: "nice", pentru: ["crap"], categoria: "carlige" },
  { nume: "Garbolino nr. 14", marca: "Garbolino", prioritate: "nice", pentru: ["crap"], categoria: "carlige", note: "Cu bandă latex pe wafter — Anelin la Goldfish Lake." },
  { nume: "Adrenal Carbon nr. 10", marca: "Adrenal", prioritate: "nice", pentru: ["crap"], categoria: "carlige", note: "Pentru vargă crap — Anelin Balta Floarea." },

  // NĂLUCI ȘALĂU
  { nume: "Storm Largo Shad", marca: "Storm", specific: "culori Houdini, Live, Electric Chicken, Lime", prioritate: "must", pentru: ["salau"], categoria: "naluca", note: "Standardul. TRUCUL: rupe APENDICELE cozii = bătaie agresivă, atacuri convertite." },
  { nume: "Fish Up Maro cu glitter roșu", marca: "Fish Up", prioritate: "must", pentru: ["salau"], categoria: "naluca", note: "Câștigătoare iarnă Tulcea — Marian Zigarov." },
  { nume: "Anticul Fishing shaduri custom", marca: "Anticul Fishing", specific: "8 cm coadă curly, galben+glitter auriu", prioritate: "expert", pentru: ["salau"], categoria: "naluca", note: "Custom de la Alexandru Lazăr. Câștigă pe șalău amonte Tulcea (George Mititelu)." },
  { nume: "Storm Sudak Minnow", marca: "Storm", specific: "galben + vibrație", prioritate: "expert", pentru: ["salau"], categoria: "naluca", note: "Câștigătoare Delta Spinning Challenge — pe 8 m apă cu curent, jig 44 g." },
  { nume: "Daiwa Tournament Lime", marca: "Daiwa", prioritate: "must", pentru: ["salau"], categoria: "naluca", note: "Preferata Marian Zigarov." },
  { nume: "Bass Assassin galben cu picățele", marca: "Bass Assassin", prioritate: "nice", pentru: ["salau"], categoria: "naluca", note: "Surprinză — face diferența în zile dificile." },

  // NĂLUCI BIBAN
  { nume: "Storm Go-To Grub 8 cm Fire Tiger", marca: "Storm", specific: "coadă curly", prioritate: "must", pentru: ["biban"], categoria: "naluca", note: "Câștigătoare 23-32 cm la Mila 23 (Trei Iezere, Bogdaproste, intersecția Vișina-Lighianca)." },
  { nume: "Bass Assassin Electric Chicken", marca: "Bass Assassin", specific: "curly tail", prioritate: "must", pentru: ["biban"], categoria: "naluca" },
  { nume: "Lunder Skeletron 5 cm", marca: "Lunder", prioritate: "nice", pentru: ["biban"], categoria: "naluca", note: "Pentru bibani mai mari." },
  { nume: "Storm cicadă 10 g", marca: "Storm", prioritate: "nice", pentru: ["biban"], categoria: "naluca", note: "Pe apă adâncă." },

  // NĂLUCI AVAT
  { nume: "Rapala XRap 7 cm 'Bone' alb", marca: "Rapala", prioritate: "must", pentru: ["avat"], categoria: "naluca", note: "Avat dimineața devreme — Delta Spinning Challenge." },

  // NĂLUCI ȘTIUCĂ
  { nume: "Sebile Magic Swimmer / Stick Shadd", marca: "Sebile", specific: "imită pește rănit", prioritate: "must", pentru: ["stiuca"], categoria: "naluca", note: "Câștigă pe lacul Babina când lingurițele nu produc." },
  { nume: "Rapture vobler cu bile", marca: "Rapture", specific: "zgomot", prioritate: "nice", pentru: ["stiuca"], categoria: "naluca", note: "Atrage știuca de 65 cm — record cu Gigi Moroiu." },
  { nume: "Rublex 'Irlandeza' originale", marca: "Rublex", specific: "12-30 g (argint/aur/cupru)", prioritate: "expert", pentru: ["stiuca"], categoria: "naluca", note: "Fabricate ca bijuterii — premium." },
  { nume: "Storm Slop Hopper 5 cm", marca: "Storm", prioritate: "nice", pentru: ["biban", "stiuca"], categoria: "naluca" },

  // BOILIES + NADA
  { nume: "Dynamite Baits Complex-T", marca: "Dynamite Baits", specific: "20 mm + dip Complex-T", prioritate: "must", pentru: ["crap"], categoria: "boilies", note: "Activare lentă — pentru partide lungi. Crap 15+ kg pe Sulina după 1.5 zile activare." },
  { nume: "Senzor Venin Dunăre Delta", marca: "Senzor", specific: "boilies 20 mm", prioritate: "nice", pentru: ["crap"], categoria: "boilies", note: "Ionel Iancu — pentru plantat cu navomodel." },
  { nume: "Wild Carp 3x Aroma Usturoi", marca: "Wild Carp", specific: "varianta Usturoi", prioritate: "must", pentru: ["crap"], categoria: "nada", note: "Pentru când Ciortan deranjează — Anelin Crișan-Îngusta." },
  { nume: "Feeder X cu aromă usturoi (Lucio Fiat)", marca: "Feeder X", prioritate: "must", pentru: ["crap"], categoria: "nada", note: "Nu mai trebuie aditiv, se leagă singură. Standard GFT primăvara." },
  { nume: "Feeder X pelete Will Carp 10/15/20 mm", marca: "Feeder X", prioritate: "must", pentru: ["crap"], categoria: "boilies", note: "20 mm = prototip Lucio Fiat. Pe Sulina noiembrie târziu, 15 mm aduce capturile mari." },
  { nume: "Wafter Ringer 6 mm portocaliu", marca: "Ringer", prioritate: "must", pentru: ["crap"], categoria: "boilies", note: "Culoarea câștigătoare la Goldfish Lake. Pe bandă latex cu Garbolino nr. 14." },
  { nume: "Boilies Profi (pungă personalizată)", marca: "Profi", prioritate: "nice", pentru: ["crap"], categoria: "boilies", note: "Mai bune decât Decathlon — nu se lărgesc în gaură." },
  { nume: "Mr. Dudy boilies + Dudy Bites kicker", marca: "Mr. Dudy", prioritate: "expert", pentru: ["crap"], categoria: "boilies", note: "Caramele kicker pentru wafter bi-color cu agresivitate. Lacul Corbu." },
  { nume: "Bossec Baits Nadă cu cuscus colorat", marca: "Bossec", specific: "cărămiziu închis, fishmeal+usturoi+pelete+pământ", prioritate: "expert", pentru: ["crap"], categoria: "nada", note: "Pentru ape REI primăvara — pământ răcește (nu hrănești, doar atragi). Culoare contrast cu substrat gri." },
  { nume: "Marin Hollywood Dynamite Baits", marca: "Dynamite Baits", specific: "~1 kg, proteică/uleioasă", prioritate: "nice", pentru: ["crap"], categoria: "nada", note: "Pentru pluta Anelin. Recipient ROTUND, sita obligatorie, umectare 2 etape." },

  // PLUMBI / NĂLUCI SPECIALE
  { nume: "Plumbi Tismor englezești", marca: "Tismor", specific: "moi, se desfac cu unghia", prioritate: "expert", pentru: ["crap"], categoria: "montura", note: "Cei mai calitativi — nu rup linia. Pentru pluta de finețe." },
  { nume: "Plumbi Atac tip ciment", marca: "Atac", specific: "150-300 g, absorbție 10%", prioritate: "must", pentru: ["crap"], categoria: "montura", note: "Pot fi băgați în dip. ~12 RON / 150 g. Pentru plumb pierdut pe cioate." },
  { nume: "Spaceuri Tismor pe sondă cu eva moale", marca: "Tismor", prioritate: "nice", pentru: ["crap"], categoria: "montura" },

  // ACCESORII / SONARE / NAVOMODELE
  { nume: "Navomodel Deeper Quest", marca: "Deeper", specific: "3 cuve, sonar integrat, autopilot, Wi-Fi 800m, return-home cu frânare automată, 4 zile autonomie", prioritate: "expert", pentru: ["crap"], categoria: "accesorii", note: "Standardul GFT pentru plantat. Update 2025/2026 cu rezoluție și viteză mai bune." },
  { nume: "Garmin GPSMAP 923 XSV", marca: "Garmin", specific: "9 inch, Down + Side Imaging", prioritate: "expert", pentru: ["crap", "somn"], categoria: "accesorii", note: "Preferat față de Finval/Humminbird/Lowrance. Identifică crapii după mărimea 'buburuzelor'." },
  { nume: "Hangere CarPro Harpax", marca: "CarPro", specific: "9g + 9g, aluminiu, SD4", prioritate: "nice", pentru: ["crap"], categoria: "accesorii", note: "Indicare fină pentru feeder. Anelin la Balta Lazăr." },
  { nume: "Scaun CarPro Diamond Bliss", marca: "CarPro", specific: "perna detașabilă reglabilă, picioare reglabile + picheți antinoroi", prioritate: "expert", pentru: ["crap"], categoria: "accesorii", note: "Scaun premium pentru partide lungi sau iarnă." },
  { nume: "Geantă CarPro modulară", marca: "CarPro", specific: "compartimente reconfigurabile, fără rodpod", prioritate: "expert", pentru: ["crap"], categoria: "accesorii", note: "Pentru partide scurte — Ionel Iancu. Avertizoare/swingere în geantă." },
  { nume: "Korum Roving Kit", marca: "Korum", specific: "rucsac + scaun cuplabil", prioritate: "must", pentru: ["crap"], categoria: "accesorii", note: "Sistem modular pentru un drum cu echipament minim — Anelin pe Dunăre." },
  { nume: "Frigider Anker Solix EverFrost 2 58L", marca: "Anker", specific: "2 compartimente, 2 baterii", prioritate: "expert", pentru: ["crap"], categoria: "accesorii", note: "~5500 RON cu baterie extra. Plus panou solar 100W + cablu prelungitor ~1200 RON." },
  { nume: "Pichet ZFish", marca: "ZFish", specific: "60-110 cm", prioritate: "nice", pentru: ["crap"], categoria: "accesorii", note: "Vârful lansetei la nivelul ochilor așezat — nu doare gâtul." },
  { nume: "Vargă Daiwa Ninja X Pole 6 m Power Pole", marca: "Daiwa", specific: "pereți groși", prioritate: "expert", pentru: ["crap"], categoria: "lanseta", note: "Pentru pluta clasică — Anelin Enache." },
  { nume: "Lecția de casting cu Mihai Perianu", marca: "Mihai Perianu", specific: "350 RON / 4-6 ore", prioritate: "expert", pentru: ["crap"], categoria: "accesorii", note: "INVESTIȚIE: trece de la 150 m autodidact la 170+ m constant. Robert: 187 m max după o singură lecție." },
);

export function pentruSpecie(specie: Item["pentru"][0]) {
  return echipament.filter((e) => e.pentru.includes(specie));
}

export function dupaCategorie(cat: Item["categoria"]) {
  return echipament.filter((e) => e.categoria === cat);
}
