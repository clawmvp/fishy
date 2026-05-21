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

export function pentruSpecie(specie: Item["pentru"][0]) {
  return echipament.filter((e) => e.pentru.includes(specie));
}

export function dupaCategorie(cat: Item["categoria"]) {
  return echipament.filter((e) => e.categoria === cat);
}
