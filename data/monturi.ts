export type Montura = {
  slug: string;
  nume: string;
  pentru: ("crap" | "stiuca" | "salau" | "avat" | "biban" | "somn")[];
  metoda: "static" | "spinning" | "feeder";
  scop: string;
  cand: string;
  luni: number[]; // 1-12; gol = tot anul
  components: { item: string; spec: string; nota?: string }[];
  diagrama: string;
  pasi: string[];
  sfaturi: string[];
  citate?: string[];
  surse: string[];
};

export const monturi: Montura[] = [
  // ============ CRAP ============
  {
    slug: "inline-clasic-barca",
    nume: "Inline cu plumb plat — barcă pe Chilia",
    pentru: ["crap"],
    metoda: "static",
    scop: "Pescuit static din barcă pe curent moderat, lângă cioate scufundate. Standard pentru iulie-august pe brațele Deltei.",
    cand: "Vara (iunie-august), apă 6-14 m, brațele Chilia / Sf. Gheorghe",
    luni: [6, 7, 8],
    components: [
      { item: "Plumb plat", spec: "120-150 g", nota: "Forma plată = mai puțin agățător decât rotund" },
      { item: "Biluță cauciuc amortizoare", spec: "8-10 mm, CULISANTĂ", nota: "NU fixă! La pierderea peștelui, plumbul cade liber" },
      { item: "Vârtej cu dublu lagăr", spec: "nr. 8", nota: "Obligatoriu pe curent — fără dublu lagăr monturile se încurcă" },
      { item: "Înaintaș textil cămășuit", spec: "0.25 mm, 25-30 cm", nota: "Cămășuit = protecție la scoică" },
      { item: "Cârlig", spec: "Korda Kurv X nr. 4 / Carp Spirit BBP nr. 4", nota: "Wide gape, vârf agresiv" },
      { item: "Fir de păr", spec: "Drennan, 7.5-10 cm", nota: "Decojit doar 1-1.5 cm deasupra cârligului" },
      { item: "Boilie pe cârlig", spec: "20-24 mm", nota: "Tigerul Crab, Red Squid, Burfood Baltacul tare" },
    ],
    diagrama: `
[Fir principal mono 0.32-0.40]
        │
        ●  ← Biluță cauciuc CULISANTĂ
        │
   ╔════╗
   ║ ▓▓ ║  ← Plumb plat 120-150 g (canal interior)
   ╚════╝
        │
        ⊕  ← Vârtej dublu lagăr nr. 8
        │
   ━━━━━━━  ← Înaintaș textil 0.25 mm, 25-30 cm
        │
        ┘   ← Cârlig Kurv X nr. 4
        │
   ●○●     ← Boilie 24 mm pe fir de păr
`,
    pasi: [
      "Treci firul principal prin canalul plumbului plat (in-line)",
      "Atașează biluța de cauciuc CULISANTĂ (NU o fixezi — vrei ca plumbul să cadă liber la rupere)",
      "Leagă vârtejul cu dublu lagăr",
      "Înnod înaintașul textil cu cap stronă (Albright sau noduri de carp)",
      "La capăt: cârlig + fir de păr cu boilie",
      "Verifică decojirea — DOAR 1-1.5 cm deasupra cârligului",
    ],
    sfaturi: [
      "Plumbul plat se agață mai puțin decât rotundul pe substrat cu piatră / scoică",
      "Biluța culisantă = INVENȚIA care salvează peștii mari — la pierdere, plumbul nu rămâne în structuri ținând cârligul",
      "La lansare, plumbul cade greu — nu smucitură la înțepare, RIDICĂ lanseta + manivelează",
      "Pentru zone cu pietre tăietoare adaugă shock leader 0.80 mm × 10-15 m",
    ],
    citate: [
      "Cât mai natural, fără cauciucuri — Anelin Enache",
    ],
    surse: ["y7UkYrra84Q", "o-dYaWNIjfU"],
  },
  {
    slug: "momitor-method-feeder",
    nume: "Momitor method-feeder primăvara",
    pentru: ["crap"],
    metoda: "feeder",
    scop: "Cea mai bună montură primăvara pe canale înguste cu sonar. Eficient pe apă 5-17°C când plumbul pierdut nu funcționează.",
    cand: "Martie-aprilie pre-prohibiție, pe canalele Mila 23, Crișan-Îngusta, Litcov",
    luni: [3, 4],
    components: [
      { item: "Momitor cu placă", spec: "Lazy Fish 40-130 g", nota: "Placa = se fixează mai bine pe substrat" },
      { item: "Nadă comprimată", spec: "consistență 'mămăligă', SCOATE aerul", nota: "Făcută cu 10-30 min înainte sau cu seara" },
      { item: "Stronă", spec: "Drennan Carp Method Hook Length Tie 7.5-10 cm", nota: "Foarte scurtă — rig scurt = lângă nada" },
      { item: "Conector clip rapid", spec: "Korum", nota: "Schimbi rapid forfacul" },
      { item: "Cârlig", spec: "nr. 10 (la pornire), urci la 15 dacă scapă", nota: "Pornești pe finețe, mulți se miră dar funcționează" },
      { item: "Opritor de tip stop", spec: "deasupra momitorului pe firul principal", nota: "La rupere momitorul cade liber + marker auto-înțepare" },
      { item: "Hookbait", spec: "Dumbbell 10 mm alb sau oranj", nota: "Wild Carp Strong; 10 mm dă cel mai bun randament" },
    ],
    diagrama: `
[Fir principal Trabucco T-Force 0.26]
        │
        ◉  ← Opritor stop (deasupra)
        │
        │
      ╔═══╗
      ║▓▓▓║  ← Momitor cu placă (nadă comprimată în jurul)
      ║▓▓▓║     Lazy Fish 40-130 g
      ╚═══╝
        │
   ━━━━━━━  ← Stronă Drennan 7.5-10 cm
        │
        ┘   ← Cârlig nr. 10
        │
     ●     ← Dumbbell 10 mm
`,
    pasi: [
      "Pune opritorul stop pe firul principal la ~20 cm deasupra punctului de atașare",
      "Atașează clip rapid Korum pe firul principal",
      "Pregătește nada — consistență de mămăligă, scoate aerul",
      "Comprimă nada pe momitor în jurul cârligului ascuns",
      "Cârligul cu dumbbell rămâne PE momitor (înfipt în nadă) la lansare",
      "Aruncă moale — nada se va elibera la contact cu apa",
    ],
    sfaturi: [
      "Hookbait: dumbbells 10 mm > 15 mm > 20 mm în PRIMĂVARA — mai mic = mai mult joc, mai puține rateuri",
      "Boabă de porumb + dumbbell pentru SELECTIVITATE (anti-ciortan)",
      "NU SMUCITURĂ la înțepare — în barcă firul e tensionat, smucitura schimbă unghiul cârligului = rateuri",
      "Lansează ÎN FAȚA structurii, nu peste — nada/aroma se duc spre cioată cu curentul",
    ],
    citate: [
      "Lansezi în față, nada și aroma se duc spre structură cu curentul, iar peștele iese după ele",
    ],
    surse: ["4FKSinAQMOQ", "wyu0InYOjXc"],
  },
  {
    slug: "plumb-pierdut-cioata",
    nume: "Plumb pierdut pentru cioate dense",
    pentru: ["crap"],
    metoda: "static",
    scop: "Când peștii sunt cantonați LIPIT de cioată — fir gros, plumb care se eliberează la agățare, cârlig nr. 10 pe finețe.",
    cand: "Noiembrie-decembrie / martie pe cioate Mila 23 + Chilia",
    luni: [3, 11, 12],
    components: [
      { item: "Plumb pierdut tip ciment", spec: "Atac 150-300 g (~12 RON / 150g)", nota: "10% absorbție, poate fi băgat în dip" },
      { item: "Conector / clip", spec: "FL (marca cu eliberare ușoară)", nota: "Sistemele rigide rup tot rigul; FL eliberează ușor" },
      { item: "Fir principal", spec: "Mono 0.40-0.55 mm", nota: "0.55 când dai DIRECT în cioată; 0.40 pe lângă" },
      { item: "Înaintaș cămășuit", spec: "Carp Spirit 25 cm", nota: "Protecție la scoică" },
      { item: "Cârlig", spec: "Korda Krank Curve nr. 4", nota: "Formă agresivă pt auto-înțepare; ochet exterior aliniat cu fluoro" },
      { item: "Bilă pe cârlig", spec: "20-24 mm Delta Active solubilă sau Burfood tare", nota: "Solubilă pentru day, tare peste noapte" },
    ],
    diagrama: `
[Fir principal mono 0.40-0.55]
        │
        ⊕  ← Clip FL (eliberare ușoară)
        │
   ╔════╗
   ║ ▓▓ ║  ← Plumb ciment 150-300 g
   ╚════╝     (cade la rupere/agățare)
        │
   ━━━━━━  ← Înaintaș cămășuit 25 cm
        │
        ┘   ← Krank Curve nr. 4 (ochet exterior)
        │
       ●    ← Bilă 24 mm
`,
    pasi: [
      "Pune clip-ul FL pe fir cu sistemul de eliberare orientat corect",
      "Plumbul intră în clip — la agățare iese liber",
      "Înaintaș cămășuit (NU clasic) — protecție la scoică",
      "Cârlig cu ochetul aliniat cu firul",
      "Bilă pe firul de păr standard",
    ],
    sfaturi: [
      "Cliplul FL e DIFERIT de alte branduri — în partidă reală: 4 rupturi cu sistem rigid vs 0 cu FL",
      "Frâne strânse APROAPE LA MAXIM lângă cioate",
      "Pe cioate dense — STAI LÂNGĂ LANSETĂ, NU departe (drill imposibil la 20+ m cu cioate stânga-dreapta)",
      "Pentru pescuit la 20 m amonte de cioată cu curent: lansează 6-10 m mai sus, ține degetul pe tambur, eliberezi pickup când plumbul e pe substrat",
    ],
    surse: ["RocRanLhmqw", "PZOJbG8e92I"],
  },
  {
    slug: "shock-leader-pietre",
    nume: "Shock leader gros pentru pietre + scoică",
    pentru: ["crap"],
    metoda: "static",
    scop: "Singurul mod să scoți pește de pe pragul abrupt cu piatră / scoică pe Sulina sau Sf. Gheorghe.",
    cand: "Iulie-august pe Sulina și Sf. Gheorghe, sau orice loc cu scoică tăietoare",
    luni: [6, 7, 8, 9],
    components: [
      { item: "Shock leader", spec: "Sufix Velocity Impact / Carp Spirit 0.80 mm / 36 kg / 80 lbs", nota: "10-15 m lungime" },
      { item: "Nod shock leader → fir principal", spec: "Albright modificat cu 7-8 ture + matisare", nota: "Pe textil subțire = 7-8 ture; pe mono gros = 3-4 ture" },
      { item: "Fluorocarbon conic", spec: "0.18 → 0.57 mm (15 m, tăiat la mijloc ~0.28→0.57)", nota: "Rigid, nu poate scuipa, invizibil" },
      { item: "Plumb", spec: "150-300 g, formă lacrimă", nota: "Lacrima se agață mai puțin decât rotundul" },
      { item: "Cârlig", spec: "Solar wide gape nr. 2 vara / nr. 6 toamna" },
    ],
    diagrama: `
[Fir principal textil 0.25 mm]
        │
       /// ← Nod Albright cu 7-8 ture matisate
       \\\\\\
[Shock leader 0.80 mm × 10-15 m]
       ║
       ║
       ⊕  ← Vârtej dublu lagăr
       │
[Fluorocarbon conic 0.28→0.57 mm]
       │
    ╔═══╗
    ║ ▼ ║ ← Plumb lacrimă 150-300 g
    ╚═══╝
       │
       ┘  ← Solar nr. 2 (vara)
       │
      ●●  ← Boilie tare 20-24 mm Burfood
`,
    pasi: [
      "Pregătește shock leader 10-15 m din fir 0.80 mm",
      "Înnod cu firul principal cu Albright matisat (matisarea ascunde nodul în inele)",
      "La capăt: vârtej + fluorocarbon conic (tăiat din 15 m de fir conic 0.18-0.57 mm pe la jumătate)",
      "Plumb lacrimă in-line sau pierdut",
      "Cârlig Solar wide gape nr. 2 vara / nr. 6 toamna",
    ],
    sfaturi: [
      "PRIMA REGULĂ pe Sulina: trăsătura RIDICĂ firul din pietre spre șenal. Dacă TU tragi spre mal după agățare = rupere garantată",
      "Lansare cu degetul pe tambur, după contact pe fund eliberezi pickup, curentul bagă plumbul în prag",
      "Pe Sulina 'din mal' = 'prima și ultima oară' fără shock leader 0.80 mm — peste 20 monturi rupte pe scoică în 2 zile",
      "Pentru cazul când vrei pescuit pe 12 m: ÎNAINTAȘ MONO 0.70 mm (destinat somnului) × 7-8 m",
    ],
    citate: [
      "Trăsătura ridică firul din pietre spre șenal. Așa scoți pești de pe adânc.",
    ],
    surse: ["F57mDvECdQU", "PZOJbG8e92I", "WgqDiw13peo"],
  },
  {
    slug: "fluorocarbon-rigid-iarna",
    nume: "Fluorocarbon rigid pentru apă <10°C",
    pentru: ["crap"],
    metoda: "static",
    scop: "Crapii apatici scuipă cârligul mai ușor — fluorocarbonul rigid acționează ca un arc și împiedică scuiparea.",
    cand: "Noiembrie-decembrie cu apă sub 10°C — Chilia / Litcov / Îngusta",
    luni: [11, 12, 1, 2],
    components: [
      { item: "Fluorocarbon", spec: "Claumar Poseidon 0.38 mm / 15 lbs", nota: "Rigid — acționează ca un arc" },
      { item: "Cârlig", spec: "Korda Krank Curve nr. 4", nota: "Formă agresivă, ochet exterior aliniat cu fluoro" },
      { item: "Strângere nod", spec: "treptată cu efect ECTM", nota: "Altfel firul ARDE singur la strângere bruscă" },
      { item: "Plumb", spec: "Mix inline + plumb pierdut", nota: "După gradul de agățători locale" },
      { item: "Boilie", spec: "Semi-solubilă 24 mm (se reduce la 16-18 mm în 3-4 h)", nota: "Cârlig MARE compensator pentru reducerea boiliei" },
    ],
    diagrama: `
[Fir principal]
        │
       PLUMB INLINE / PIERDUT
        │
   ━━━━━━━  ← Fluorocarbon RIGID 0.38 mm (15-25 cm)
        │
        ┘   ← Krank Curve nr. 4 (ochet EXTERIOR)
        ║   ← Ochet aliniat cu fluoro
       ●○●  ← Boilie 24 mm semi-solubilă pe fir de păr
`,
    pasi: [
      "Taie 25 cm fluorocarbon Claumar Poseidon 0.38 mm",
      "Înnod la cârligul Krank Curve cu noduri specifice (knotless knot)",
      "STRÂNGE TREPTAT cu salivă — nu brusc (altfel arde)",
      "Atașează firul de păr cu boilie semi-solubilă 24 mm",
      "La celălalt capăt: nod la vârtej / agrafă cu strângere treptată",
    ],
    sfaturi: [
      "Fluorocarbonul rigid = ARC. Crapul apatic încearcă să scuipe, arcul îl ține",
      "OCHETUL EXTERIOR aliniat cu fluoroul = mecanica înțepării e perfectă pe Krank Curve",
      "Sub 10°C: cârlig fragil (nr. 10) se ÎNDOAIE la primul drill. Urcă la nr. 6 pe fluoro 0.38",
      "Drilluri practic imposibile la 20+ m cu cioate stânga-dreapta — STAI LÂNGĂ LANSETĂ",
    ],
    surse: ["RocRanLhmqw"],
  },
  {
    slug: "n-trap-visoianu",
    nume: "Korda N-Trap 30 lbs cu Solar wide gape — strategia Vișoianu",
    pentru: ["crap"],
    metoda: "static",
    scop: "Montura clasică mono+textil pentru partide lungi 7-10 zile pe Dunărea Veche cu crapi 22+ kg.",
    cand: "Mai-octombrie pe Dunărea Veche / Sulina cu buturi lipovenești",
    luni: [5, 6, 7, 8, 9, 10],
    components: [
      { item: "Forfac Korda N-Trap", spec: "30 lbs, lungime 30-35-40 cm", nota: "Semi-Stiff iarna (crap pretențios), Soft vara" },
      { item: "Plumb", spec: "Inline + con cauciuc dur", nota: "Pe gropi (brațe mari) folosește plumb pierdut greu + textil simplu necămășuit" },
      { item: "Vârtej DUBLU LAGĂR", spec: "OBLIGATORIU", nota: "Curentul răsucește plumbul; fără dublu lagăr, monturile se încurcă" },
      { item: "Cârlig Solar", spec: "wide gape, ochet drept, vârf drept — nr. 2 vara / nr. 6 toamna" },
      { item: "Fir de păr", spec: "decojit DOAR 1-1.5 cm deasupra cârligului", nota: "Altfel curentul + carasul îl încurcă varză" },
      { item: "Boilie", spec: "Sticky Krill 20 mm vara / 16 mm octombrie", nota: "Fishmeal — NU cerealiere cu aromă" },
    ],
    diagrama: `
[Fir principal: Berkley Trilene XT MONO 0.46 mm]
        │
   ╔════╗
   ║ ▓▓ ║  ← Plumb inline
   ╚════╝
        │
        ◆  ← Con cauciuc DUR
        │
        ⊕⊕ ← VÂRTEJ DUBLU LAGĂR (obligatoriu!)
        │
   ━━━━━━━  ← Korda N-Trap 30 lbs, 30-40 cm
        │      (Semi-Stiff iarna / Soft vara)
        ┘   ← Solar wide gape nr. 2
        │
       ●    ← Sticky Krill 20 mm
            (decojit doar 1-1.5 cm!)
`,
    pasi: [
      "Treci firul principal prin plumb inline",
      "Adaugă con cauciuc dur (NU moale)",
      "Vârtej cu dublu lagăr — obligatoriu",
      "Forfac N-Trap 30-40 cm — Semi-Stiff sau Soft după sezon",
      "Cârlig Solar cu knotless knot",
      "Fir de păr SCURT decojit 1-1.5 cm",
      "Boilie fishmeal 20 mm (vara) sau 16 mm (octombrie)",
    ],
    sfaturi: [
      "NICIODATĂ partidă scurtă cu această strategie — minim 7-10 zile",
      "MONO 0.46 mm (Berkley Trilene XT Hi-Vis Gold) + lansetă elastică Colmic Calibra = combo unic, frânele strânse la maxim funcționează DOAR cu mono+elasticitate",
      "Pe gropi (brațe mari) — plumb pierdut greu + textil simplu necămășuit (curentul așază firul, NU se încurcă fără cămașă)",
      "Pe buturi lipovenești — crapul stă AVAL de butur la curent mic; AMONTE la curent puternic (vară)",
    ],
    citate: [
      "Sticky Krill — cea mai bună bilă pe Sulina, ia capturile cele mai mari. Krill + arahide pentru pește mare.",
    ],
    surse: ["j6P-9ATsnu8"],
  },

  // ============ STIUCA ============
  {
    slug: "jighead-stiuca-batere",
    nume: "Jighead pentru știucă în perioada de bătaie",
    pentru: ["stiuca"],
    metoda: "spinning",
    scop: "Finețe MAXIMĂ în februarie-martie. Năluci mici, jighead mic, fluorocarbon ca strună (apă curată).",
    cand: "Februarie - mijloc martie pe lacuri / canale Deltă",
    luni: [2, 3],
    components: [
      { item: "Jighead", spec: "3 g cu cârlig 3/0", nota: "Cel mai mic — finețe absolută în bătaie" },
      { item: "Gumă", spec: "Savage Gear Cannibal Shad 6-8 cm", nota: "Culori Fire Tiger, Red Head, alb cu coadă roșie" },
      { item: "Strună fluorocarbon", spec: "0.50-0.60 mm × 30-40 cm", nota: "PE APE CURATE — în apă tulbure pune oțel" },
      { item: "Nod fluoro→agrafă", spec: "Nod Albright Classic matisat", nota: "8 spire peste fir gros, 4-5×" },
      { item: "Fir împletit principal", spec: "Berkley X9 0.12-0.19 mm", nota: "0.12 pentru finețe maximă în bătaie" },
    ],
    diagrama: `
[Fir împletit Berkley X9 0.12 mm]
        │
       /// ← Nod Albright matisat
       \\\\\\
[Fluorocarbon 0.50-0.60 mm × 30-40 cm]
        │
        ⊕  ← Agrafă cu nod pe ureche
        │
     [J] ← Jighead 3 g cu cârlig 3/0
        │
     ╔═══╗
     ║~~~║  ← Cannibal Shad 6-8 cm
     ║~ ▶║     Red Head sau Fire Tiger
     ╚═══╝
`,
    pasi: [
      "Înnod fluoroul de fir principal cu Albright Classic matisat (8 spire pe fir gros, 4-5× pe subțire)",
      "Atașează agrafă rapidă la celălalt capăt al fluoroului",
      "Înfige jigheadul prin gumă (nasul spre vârf, ies în spate sus)",
      "Atașează agrafa la urechea jigheadului",
    ],
    sfaturi: [
      "În perioada de bătaie știuca NU se hrănește cu baboi mari — ciugulește între picături",
      "Soarele direct sperie știuca (e pește de pradă, are nevoie de umbră)",
      "Coloristică > formă ca primă regulă, vibrație ca a doua",
      "Schimbă culoarea după 2-3 lanseuri fără răspuns — apoi locul",
      "Lansează LA BUZA stufului/țipirigului, NU peste",
    ],
    citate: [
      "Coada cu roșu aici a făcut toată treaba — Paco",
    ],
    surse: ["Say3sA-f7Po"],
  },
  {
    slug: "topwater-stiuca",
    nume: "Topwater pentru știucă post-prohibiție",
    pentru: ["stiuca"],
    metoda: "spinning",
    scop: "Pentru exemplare 90+ cm la Stația 11 + lacuri Delta. Răbdare la înțepare = cheia.",
    cand: "Mai-iulie + septembrie când apa e caldă",
    luni: [5, 6, 7, 9],
    components: [
      { item: "Vobler topwater", spec: "Berkley Choppo (prop), Abu Slider Hi-Lo, vobler 'șoarece'", nota: "Mărimi 8-15 cm" },
      { item: "Strună", spec: "Fluorocarbon 0.50-0.60 mm sau OȚEL", nota: "Topwater = peștele apucă din profil — risc maxim de dinți" },
      { item: "Agrafă cu inel rotativ", spec: "Slim, nu blochează acțiunea voblerului" },
      { item: "Fir împletit", spec: "Berkley X9 30 lbs / 0.19 mm" },
      { item: "Lansetă", spec: "Casting cu Multiplicator pentru voblere 50-70 g", nota: "Abu Garcia Beast + Beast 2011" },
    ],
    diagrama: `
[Fir împletit X9 30 lbs]
        │
       /// ← Nod matisat
       \\\\\\
[Fluorocarbon 0.50 sau OȚEL × 40 cm]
        │
        ⊕  ← Agrafă cu inel rotativ
        │
   ━━━━━━━━━━━
   ║  ◯─◯  ║   ← Choppo / Slider (topwater)
   ║   ▷▷▷ ║      Prop la coadă
   ━━━━━━━━━━━
        ⊕  ← Triplu nr. 4-6 (sub vobler)
`,
    pasi: [
      "Lansare LUNGĂ pe ape deschise lângă stuf",
      "Mulinare în pauze (walk-the-dog sau propeller continuu)",
      "La atacul de suprafață: NU înțepi din prima",
      "Lași peștele să înghită, simți că trage, abia atunci ridici lanseta",
    ],
    sfaturi: [
      "Răbdarea la înțepare = diferența între 90 cm și nimic",
      "Două zile la rând doar pe topwater au confirmat la Stația 11 — capturi 83, 90, 93, 98 cm",
      "La pește mare trage forțat spre apă deschisă, NU lași în boscheți",
      "Ține peștele de coadă la eliberare până zvâcnește singur",
    ],
    surse: ["W-XdKuMZWXo"],
  },

  // ============ SALAU ============
  {
    slug: "jigging-salau-fluoro",
    nume: "Jigging șalău pe primul prag",
    pentru: ["salau"],
    metoda: "spinning",
    scop: "Sensibilitate maximă pentru atacurile firave ale șalăului. Verde + finețe.",
    cand: "Octombrie-martie pe Argeș / Cândești / bălți cu prag",
    luni: [1, 2, 3, 10, 11, 12],
    components: [
      { item: "Jighead", spec: "3.5-9 g (3.5 pe atacuri nervoase, 7 standard, 9 pe curent)", nota: "Cu cârlig 3/0" },
      { item: "Gumă", spec: "Verde clasic cu burtă deschisă ~7 cm sau Gambler verde", nota: "Verdele criminal = regulă universală" },
      { item: "Fluorocarbon", spec: "0.30-0.42 mm × 80 cm pe râu cu pietre", nota: "Fără oțel — risc minor de știucă" },
      { item: "Fir împletit", spec: "0.10 mm subțire (Sufix 131 9 lb sau Berkley X9)", nota: "'Să simți, nu grosolan' — esențial la atacuri firave" },
      { item: "Lansetă", spec: "Graphiteleader Silverado 2.34 m / 5-20 g", nota: "Senzitivitate critică" },
    ],
    diagrama: `
[Fir împletit 0.10 mm]
        │
       /// ← Nod matisat
       \\\\\\
[Fluorocarbon 0.30-0.42 × 80 cm]
        │
        ⊕  ← Agrafă
        │
     [J] ← Jighead 3.5-7 g + cârlig 3/0
        │
    ╔═══╗
    ║░░░║  ← Gumă verde 7 cm
    ║░ ▶║     (burtă mai deschisă)
    ╚═══╝
`,
    pasi: [
      "Lansare PARALEL cu malul (NU spre larg)",
      "Treptat în evantai spre larg",
      "Revenire pe aceeași trasă dacă a fost atac",
      "Plimbă-te stânga-dreapta chiar dacă știi peștele e acolo",
      "ÎNȚEPARE INSTANT la primul atac (șalău = ratare dacă tărăgănezi)",
    ],
    sfaturi: [
      "Șalăul stă pe PRIMUL prag lângă mal, NU departe — 'nu vrea să mănânce de la 1 m de masă'",
      "Jighead 3.5 g la atacuri nervoase = cădere lentă, dă timp atacului",
      "Șalăul prinde gumă în stomac frecvent → tai linia, recuperezi cârligul acasă",
      "Pe vânt mută-te pe malul ADĂPOSTIT",
    ],
    citate: [
      "Verdele criminal",
      "Stă în primul prag, nu departe; nu vrea să mănânce de la 1 m de masă",
    ],
    surse: ["BoFhTe1A_q0", "GqRZzV5K_2s"],
  },

  // ============ AVAT ============
  {
    slug: "avat-helic-natural",
    nume: "Avat cu Helic Nikel — finețe pe Dunăre",
    pentru: ["avat"],
    metoda: "spinning",
    scop: "Vânat vizual matinal — corelează lansarea cu sărituri vizibile.",
    cand: "Iulie răsărit + noiembrie pe epi-uri Sulina",
    luni: [6, 7, 8, 11],
    components: [
      { item: "Nălucă", spec: "Helic Nikel 16-17 g", nota: "Câștigătoare iulie pe Dunăre" },
      { item: "Fluorocarbon", spec: "0.30 mm × 60-70 cm", nota: "Lungime mare = invizibil pentru avat" },
      { item: "Agrafă", spec: "Slim, mică", nota: "Avatul vede tot — minimizezi vizibilitatea" },
      { item: "Fir împletit", spec: "0.10 mm", nota: "Finețe pe Dunăre — banc mic" },
      { item: "Lansetă", spec: "Medium-light până la 18-25 g", nota: "Universală, permisivă, dar nu moale" },
    ],
    diagrama: `
[Fir împletit 0.10 mm]
        │
       /// ← Nod matisat
       \\\\\\
[Fluorocarbon 0.30 mm × 60-70 cm]
        │
        ⊕  ← Agrafă slim
        │
   ┃◉◉◉┃   ← Helic Nikel 16-17 g
   ┃ ↕ ┃      (natural, lângă mal)
        │
        ⊕  ← Triplu nr. 6
`,
    pasi: [
      "Identifică vizual SĂRITURI / FIERBERI pe suprafață",
      "Lansare LUNGĂ direct în zona de activitate",
      "Lasă nălucia să cadă 1-2 sec",
      "Mulinare CONTINUĂ RAPIDĂ (avatul atacă pradă activă)",
    ],
    sfaturi: [
      "NU pescui orb — vânează vizual",
      "Matinal 5:15 = ora de aur pe Dunăre iulie",
      "Pe vreme rece avatul iese din curent pe platouri 2-3 m liniștite (epi-uri Sulina)",
      "Aprilie pe Dunărea de frontieră (Port Oltenița) = legal dar apa rece poate fi blocant",
    ],
    citate: [
      "Dacă-l văd că sare, mă duc la el; nu pescuiesc orb.",
    ],
    surse: ["pUetvPfpLcg", "cW-oEqrDpdI"],
  },

  // ============ BIBAN ============
  {
    slug: "biban-microjig",
    nume: "Microjig biban — Dunărea Veche",
    pentru: ["biban"],
    metoda: "spinning",
    scop: "Pentru bibani 24-30 cm lipiți de mal cu piatră.",
    cand: "Octombrie-noiembrie pe Dunărea Veche, Mila 23",
    luni: [10, 11],
    components: [
      { item: "Jighead microjig BKK", spec: "5 g cu cârlig nr. 1/0", nota: "NU 7-10 g — agață piatra; cu sârmă îndoită care ține guma" },
      { item: "Gumă", spec: "Fast Strike 'Motoroil' sau Bass Assassin Electric Chicken (curly tail)" },
      { item: "Fluorocarbon", spec: "0.20-0.22 mm × 40 cm" },
      { item: "Fir împletit", spec: "Momoi Tacumi Zigline 0.05 mm", nota: "Scufundător, NU absoarbe apă, subțire real" },
      { item: "Lansetă", spec: "Rapture Furon XF L 2.18 m / 0.8-10 g", nota: "Sau Edge Master Solid 1.95 m ultra-light" },
    ],
    diagrama: `
[Fir împletit Momoi 0.05 mm]
        │
       /// ← Nod
       \\\\\\
[Fluorocarbon 0.20-0.22 mm × 40 cm]
        │
        ⊕  ← Agrafă micro
        │
     [BKK] ← Microjig 5 g
        │   (cu sârmă îndoită)
    ╔═══╗
    ║░░░║  ← Fast Strike 'Motoroil'
    ║ ↣ ║
    ╚═══╝
`,
    pasi: [
      "Bibanii MARI sunt LIPIȚI de malul cu piatră — lansare paralelă",
      "Bibanii MICI se văd în larg sub barcă pe Live Scope — pescuit vertical",
      "Microjig BKK cu sârmă îndoită = ține guma fără s-o distrugă",
    ],
    sfaturi: [
      "Live Scope Garmin 841 + LiveScope 34 = localizare bancuri",
      "La banc mare de bibani mici, folosește jighead mai MARE (7 g) ca să selectezi cei mari",
      "Final de sezon (noiembrie) bibanul se mută de pe o zi pe alta — verifică zilnic",
      "Pe Dunărea Veche când lacurile sunt cristal — confluența cu Canalul Lopatna",
    ],
    surse: ["hkWNmG-BfgI"],
  },

  // ============ SOMN ============
  {
    slug: "clonc-somn",
    nume: "Montura de CLONC pentru somn",
    pentru: ["somn"],
    metoda: "static",
    scop: "Chemarea somnului prin vibrație + montura cu păcălici care prinde aproape sigur.",
    cand: "Vară (iunie-septembrie) pe Chilia, ape adânci 8-22 m",
    luni: [6, 7, 8, 9],
    components: [
      { item: "Les MadCat 'țigaretă'", spec: "200 g", nota: "Se scufundă, taie curentul" },
      { item: "Fir înaintaș", spec: "Textil 100 kg" },
      { item: "Ancora", spec: "BKK Viper 4/0 cu RÂME ÎN MASĂ (cap acoperit)" },
      { item: "Cârlig de jos ('păcălici')", spec: "BKK 7/0, doar acoperit cu o râmă" },
      { item: "Opritor MadCat sectionat", spec: "ajustabil — scurt sau 40-50 cm", nota: "Scurt = vibrație+atracție; lung = pește suspicios" },
      { item: "Pastilă de clonc", spec: "36-38 mm la 6-10 m / 40-42 mm la 10-15 m / mai mare la >20 m", nota: "Convexă = începători; concavă/dreaptă = avansați" },
    ],
    diagrama: `
[Fir împletit MadCat 0.40 mm]
        │
   ╔════╗
   ║▓▓▓ ║  ← Les MadCat 'țigaretă' 200 g
   ╚════╝
        │
        ◉  ← Opritor sectionat (ajustabil!)
        │
   ━━━━━━━  ← Textil 100 kg (40-50 cm sau scurt)
        │
        ⊕═══┘  ← Ancora 4/0 BKK Viper
        │      (râme în masă, cap acoperit)
        │
        ┘     ← Cârlig 7/0 BKK ('păcălici')
              (doar 1 râmă, somnul pune gura aici!)
`,
    pasi: [
      "Scanare zonă fierbinte cu sonar (live sonar dacă ai)",
      "Ancorare în spatele structurii (cioată / groapă)",
      "Coboară montura sub barcă",
      "Cloncănit RITMIC din DEGETE + ÎNCHEIETURĂ (NU din cot/forță)",
      "Atacul vine — somnul vine de JOS în sus (mandibula inferioară proeminentă)",
    ],
    sfaturi: [
      "Pastile CONVEXE pentru începători (intră ușor în apă)",
      "Apă mai adâncă → bătaie GRAVĂ (clonc înfundat) = vibrație mai pătrunzătoare",
      "Greșeala #1 a începătorilor: folosesc cloncul ca un CIOCAN — nu funcționează",
      "Când peștii suspicioși: switch la DOUĂ CÂRLIGE ÎN LINIE (somnul evită ancora mare)",
      "Cloncuri B.B. Clonc (Bogdan Munteanu) modele TR/TNZ — la magazinul Marele Pescar",
    ],
    citate: [
      "Somnul = ca pisica → urmărește când fugi, se oprește când te oprești",
    ],
    surse: ["BvKHcDft9Gc"],
  },
  {
    slug: "somn-stationar",
    nume: "Somn staționar la prag — vier de salcie + coropișniță",
    pentru: ["somn"],
    metoda: "static",
    scop: "Pe pragul de 18 m la Chilia Veche. Momelile testate vs alternative.",
    cand: "Octombrie-noiembrie",
    luni: [10, 11],
    components: [
      { item: "Plumb culisant", spec: "200 g (pe mono) / 300 g (pe textil)" },
      { item: "Fir principal", spec: "MONO MadCat 0.40 mm", nota: "Mai multe trăsături decât textilul 0.40 pentru somni până în 10 kg — TESTAT" },
      { item: "Forfac", spec: "Textil 100 kg × 50 cm" },
      { item: "Cârlig", spec: "Mare (nemenționat număr exact)" },
      { item: "Momeală", spec: "Vier de salcie + coropișniță (combo)", nota: "Testat vs râme negre + mațe macrou = câștigă CLAR; cumpărate la Tulcea" },
      { item: "Lansetă", spec: "MadCat Black Spin 2.40 m / 40-150 g + Penn Slammer 560" },
    ],
    diagrama: `
[Fir principal MONO 0.40 mm Madcat]
        │
        ●  ← Biluță cauciuc
        │
   ╔════╗
   ║▓▓▓ ║  ← Plumb culisant 200-300 g
   ╚════╝
        │
        ◉  ← Vârtej
        │
   ━━━━━━━  ← Forfac textil 100 kg × 50 cm
        │
        ┘   ← Cârlig MARE
        │
      🪱+🦗 ← Vier de salcie + coropișniță
              (bagă cu PATENT — viermele ciupește)
`,
    pasi: [
      "Ancorează în 18 m apă pe prag (între 16-17 m și 22 m)",
      "Plumb culisant pe firul principal",
      "Cumpără vier de salcie + coropișniță de la piața din Tulcea",
      "Bagă viermii pe cârlig cu PATENT (vierul de salcie ciupește)",
      "Dimineața: lansete pe pragul 16-17 m",
      "După ora 12: MUTĂ-TE la pragul de 22 m (somnii migrează)",
    ],
    sfaturi: [
      "Vier de salcie + coropișniță = REGINA absolută. Râme negre = ZERO trăsături. Mațe de macrou = ZERO trăsături (testat aceeași partidă)",
      "MONO 0.40 mm > textil 0.40 mm pentru somni până în 10 kg — frecvență mult mai mare de trăsături",
      "Textilul = doar pentru somn MARE pe groapă",
      "Păstrează râmele în geantă termo MadCat + sac de rafie pentru umezeală — fluctuațiile de temperatură le deteriorează rapid",
    ],
    citate: [
      "Cea mai bună momeală pentru somn = coropișniță cu vierme de salcie",
    ],
    surse: ["p3C-k5EANv4"],
  },
  // === INSIGHTS GDA 2026 (auto-extras din transcripts) ===
  {
    slug: "momitor-gda-peleta-solubila-semi-ingropata",
    nume: "Momitor GDA cu peletă solubilă semi-îngropată — Delta post-prohibiție",
    pentru: ["crap"],
    metoda: "feeder",
    scop: "Prezentare cu nadă aromată și peletă vizibilă pentru crap/ciortan în Delta după prohibiție",
    cand: "Vara și începutul toamnei, post-prohibiție în Delta",
    luni: [6, 7, 8, 9],
    components: [
      { item: "Momitor", spec: "method-feeder" },
      { item: "Nadă", spec: "GDA Fishing căpșună / usturoi / Secret Aroma" },
      { item: "Peletă cârlig", spec: "solubilă 10 mm sau 15 mm" },
      { item: "Cârlige", spec: "mici, pentru ciortan apatic" },
      { item: "Bile nădit", spec: "20-24 mm căpșună / Secret Aroma" },
      { item: "Bile solubile", spec: "Secret Aroma din borcan, pentru pește mai mare" }
    ],
    diagrama: "fir principal → momitor method-feeder cu nadă → cârlig acoperit în nadă → peletă semi-îngropată vizibilă deasupra",
    pasi: [
      "Pune nada pe momitor",
      "Introdu peleta în nadă fără s-o îngropi complet — las-o vizibilă deasupra",
      "Acoperă cârligul cu puțină nadă pentru a evita încurcarea pe fir principal",
      "Lansează — momitorul atrage peștele care va lua peleta cu cârlig",
      "Nădește suplimentar cu sac de bile + câteva boilies întregi în afara cioatei"
    ],
    sfaturi: [
      "Lasă peleta vizibilă deasupra nadei pentru atac rapid",
      "Acoperirea cârligului previne încurcăturile la cădere",
      "Combină cu nădire suplimentară în afara cioatelor"
    ],
    surse: ["GSwRz2tD1L8"],
  },
  {
    slug: "momitor-fin-iarna-peleta-single-10mm",
    nume: "Momitor fin iarnă — peletă single 10mm sicilit/căpșună",
    pentru: ["crap"],
    metoda: "feeder",
    scop: "Prezentare de finețe pentru crap apatic pe vreme rece",
    cand: "Noiembrie, pe vreme rece când crapul e apatic",
    luni: [11, 12, 1, 2],
    components: [
      { item: "Momitor", spec: "method-feeder" },
      { item: "Cârlig", spec: "nr. 10" },
      { item: "Nadă", spec: "GDA Fishing + pelete fish meal 5mm pentru încărcat" },
      { item: "Peletă cârlig", spec: "10mm sicilit aromă căpșună" },
      { item: "Opțional", spec: "peletă 15mm sau 2x15mm dacă apar scăpări" }
    ],
    diagrama: "fir principal → momitor cu nadă GDA + pelete 5mm → cârlig nr.10 → peletă 10mm pe păr",
    pasi: [
      "Umezește nada GDA cu pelete 5mm fish meal",
      "Presează pe momitor în jurul cârligului",
      "Pune peleta 10mm sicilit pe păr",
      "Lansează fin pe locul nădit, frână ușor strânsă",
      "Crește la 15mm sau cârlig 15 dacă peștele e mai activ/mai mare"
    ],
    sfaturi: [
      "Cârlig mic nr.10 pentru gură atentă iarna",
      "Crește momeala dacă apar scăpări la înțepare",
      "Pelete 5mm la momitor pentru atragere fără sațietate"
    ],
    surse: ["PFwNriYmmk4"],
  },
  {
    slug: "combo-plumb-inline-bile-24mm-delta",
    nume: "Combo plumb in-line + bile 24mm Delta Active / Delta Secret",
    pentru: ["crap"],
    metoda: "static",
    scop: "Setup paralel pentru crap mare pe Sulina, acoperind mal și larg",
    cand: "Sezon cald, pe Sulina lângă cioate",
    luni: [5, 6, 7, 8, 9],
    components: [
      { item: "Plumb", spec: "in-line" },
      { item: "Bilă mal", spec: "1x 24mm Delta Active" },
      { item: "Bile larg", spec: "2x 24mm Delta Secret" },
      { item: "Cârlig", spec: "mai mare adaptat bilei 24mm" },
      { item: "Frână", spec: "strânsă aproape la maxim, pentru cioate" }
    ],
    diagrama: "fir principal → plumb in-line → forfac → cârlig cu bilă 24mm pe păr",
    pasi: [
      "Lansează lanseta Delta Active aproape de mal/cioate",
      "Lansează lanseta Delta Secret cu dublă bilă spre larg",
      "Strânge frânele aproape la maxim pentru a opri peștele din cioate",
      "Întreține nădirea cu bile 20mm la fiecare oră"
    ],
    sfaturi: [
      "Combină arome diferite pe lansete diferite pentru a testa preferința",
      "Frână aproape blocată obligatorie lângă cioate",
      "Nădire la oră fixă menține peștele activ în zonă"
    ],
    surse: ["PFwNriYmmk4"],
  },
  {
    slug: "rig-crap-sulina-fir-camasuit",
    nume: "Rig crap Sulina cu fir cămășuit anti-abraziune pe piatră",
    pentru: ["crap"],
    metoda: "static",
    scop: "Rig anti-abraziune pentru pescuit pe digul de piatră al brațului Sulina",
    cand: "Tot sezonul deschis pe brațul Sulina, lângă dig",
    luni: [5, 6, 7, 8, 9, 10],
    components: [
      { item: "Forfac", spec: "fir cămășuit rezistent la frecare cu pietrele" },
      { item: "Cârlig boilies", spec: "nr. 6 pentru bile" },
      { item: "Cârlig pelete", spec: "nr. 8 pentru pelete solubile 15mm" },
      { item: "Plumb", spec: "sistem pierdut cu opritor" },
      { item: "Shock leader", spec: "monofilament somn 0.90mm, lungime ~7m" }
    ],
    diagrama: "fir principal → shock leader mono 0.90mm 7m → plumb pierdut cu opritor → forfac cămășuit → cârlig 6/8",
    pasi: [
      "Alege mărimea cârligului raportată vizual la momeală, nu doar după numărul producătorului",
      "Montează forfac din fir cămășuit (nu textil simplu — se rupe pe piatră)",
      "Atașează sistemul plumb pierdut cu opritor pentru eliberare la blocare",
      "Folosește shock leader monofilament somn 0.90mm de ~7m între fir principal și montură",
      "Pentru momitor: pelete 15mm pe cârlig 8; pentru plumb: bilă pe cârlig 6"
    ],
    sfaturi: [
      "Numerele de cârlig variază între branduri — verifică vizual",
      "Shock leader-ul protejează la lansare și pe piatră",
      "Sistem plumb pierdut obligatoriu lângă dig"
    ],
    surse: ["PZOJbG8e92I"],
  },
  {
    slug: "momitor-opritoare-auto-intepare",
    nume: "Montură momitor cu opritoare pentru auto-înțepare (rig 8-9 cm)",
    pentru: ["crap"],
    metoda: "feeder",
    scop: "Auto-înțepare forțată prin fixarea momitorului între două opritoare",
    cand: "Toamnă-iarnă (cârlig 8) sau vară (cârlig 6)",
    luni: [9, 10, 11, 12, 1, 2, 6, 7, 8],
    components: [
      { item: "Momitor", spec: "method spod 120g" },
      { item: "Cârlig", spec: "nr. 8 toamnă/iarnă, nr. 6 vara, subțire" },
      { item: "Rig", spec: "8-9 cm cu păr" },
      { item: "Momeală", spec: "dumbell solubil GDA Fishing" },
      { item: "Opritoare", spec: "2 opritoare de cauciuc pe firul principal" },
      { item: "Quick change", spec: "pentru schimbat rapid cârligul" },
      { item: "Vârtej", spec: "de rezervă, alternativă la quick change" }
    ],
    diagrama: "fir principal → opritor → momitor 120g → opritor → quick change → rig 8-9cm cu dumbell pe păr",
    pasi: [
      "Leagă cârligele de acasă (câte 4 din fiecare mărime) cu păr și opritor pentru dumbell",
      "Pune un opritor pe firul principal înainte și după momitor pentru a-l fixa",
      "Înfige dumbell-ul solubil pe părul de 8-9 cm",
      "Frământă nada GDA căpșună umedă și aplic-o pe momitor",
      "Verifică vârful cârligului DUPĂ FIECARE PEȘTE — schimbă imediat dacă s-a strâmbat"
    ],
    sfaturi: [
      "Opritoarele fixează momitorul pentru auto-înțepare la prima zvâcnire",
      "Testează vârful cârligului pe unghie după fiecare pește",
      "Pregătește cârlige înnodate de acasă pentru schimb rapid"
    ],
    surse: ["TpVCnpZiC5o"],
  },
  {
    slug: "momitor-peleta-nada-neindesata-curent",
    nume: "Momitor cu peletă în interior + nadă neîndesată pentru dâră în curent",
    pentru: ["crap"],
    metoda: "feeder",
    scop: "Crează dâră rapidă de atragere în curent pentru activare zonă iarna",
    cand: "Iarna, în zone cu curent",
    luni: [12, 1, 2],
    components: [
      { item: "Momitor", spec: "method-feeder" },
      { item: "Pelete interior", spec: "cireașa principală, încărcate în momitor" },
      { item: "Nadă", spec: "pudră deasupra, fără îndesare" },
      { item: "Cârlig", spec: "nr. 10 cu fir textil 0.13 pentru finețe iarnă" }
    ],
    diagrama: "fir principal → momitor (pelete în interior + nadă afânată deasupra) → cârlig 10 cu fir textil 0.13",
    pasi: [
      "Umple momitorul cu pelete în interior (cantitate normală)",
      "Adaugă nadă deasupra fără să strângi/îndeși",
      "Lansează — nada se desface în coloana de apă",
      "Crează dâră în curent care activează rapid zona",
      "Dacă peștele apare dar nu mușcă, schimbă pe plumb in-line cu rig 6 lângă cioată"
    ],
    sfaturi: [
      "Nada neîndesată = desfacere rapidă și dâră lungă",
      "Fir textil subțire 0.13 pentru finețe iarnă",
      "Schimbă la plumb in-line dacă peștii sunt suspicioși"
    ],
    surse: ["VkkAhdBEtaE"],
  },
  {
    slug: "bile-fishmeal-delta-secret-24mm-chilia",
    nume: "Bile Fishmeal Delta Secret 24mm pentru crap mare Chilia",
    pentru: ["crap"],
    metoda: "static",
    scop: "Filtrarea ciortanului și targetarea crapului mare (10kg+) pe Chilia",
    cand: "Sezon deschis pe brațul Chilia, pescuit de pe barcă",
    luni: [5, 6, 7, 8, 9, 10],
    components: [
      { item: "Boilies", spec: "Fishmeal Delta Secret 24mm standard" },
      { item: "Boilies XL", spec: "Fishmeal Delta Secret 32mm pentru pește foarte mare" },
      { item: "Lansete", spec: "Trabuco Max Deep 3m, calibre 4" },
      { item: "Setup", spec: "3 lansete pe barcă per pescar, evantai pe prag" }
    ],
    diagrama: "fir principal → plumb → forfac → cârlig cu bilă 24mm (sau 32mm pe o lansetă) pe păr",
    pasi: [
      "Montează bila 24mm pe forfac standard pentru crap",
      "Pe o lansetă pune bilă 32mm ca filtru extrem pentru pește record",
      "Lansează 3 lansete de pe barcă în evantai pe prag",
      "Acceptă rata mică de trăsături — target = pește 10kg+"
    ],
    sfaturi: [
      "Bila 24mm filtrează ciortanul mic",
      "Bila 32mm pe o lansetă pentru a viza recordul",
      "Lansete 4lb necesare pentru pește 10kg+"
    ],
    surse: ["WgqDiw13peo"],
  },
  {
    slug: "pelete-10mm-spin-direct",
    nume: "Pelete 10mm pe spin direct (nu pe păr)",
    pentru: ["crap"],
    metoda: "feeder",
    scop: "Fixare mai bună a peletei mici pe apă rece, fără folosirea părului",
    cand: "Apă rece, când peleta 10mm se desface rapid",
    luni: [10, 11, 12, 1, 2, 3],
    components: [
      { item: "Pelete 10mm", spec: "solubile căpșună / secret aroma / usturoi" },
      { item: "Cârlig", spec: "cu spin clasic" },
      { item: "Pelete 15mm", spec: "separat, pentru firul de păr" },
      { item: "Momitor", spec: "ediție specială GDA + pelete 2mm" }
    ],
    diagrama: "momitor cu nadă + pelete 2mm → cârlig cu peletă 10mm înfiptă direct pe spin (fără păr)",
    pasi: [
      "Pentru pelete 10 mm: înfige direct pe spinul cârligului",
      "Pentru pelete 15 mm: folosește firul de păr clasic",
      "Schimbă cârligul și peleta după fiecare trăsătură/ratare",
      "Combină cu momitor nadă ediție specială + pelete 2 mm"
    ],
    sfaturi: [
      "Spin direct ține peleta 10mm mai bine pe cârlig",
      "Pentru 15mm rămâi pe păr",
      "Schimbă peleta după fiecare contact pentru frosalitate"
    ],
    surse: ["ZrOR8n9VeEU"],
  },
  {
    slug: "peleta-15mm-capsuna-gda-single-culoar",
    nume: "Peletă 15 mm căpșună roșu GDA — single hookbait pe culoar",
    pentru: ["crap"],
    metoda: "static",
    scop: "Single hookbait pe culoar îngust pentru crap activ primăvara",
    cand: "Primăvara în Delta, pe culoare între cioată și stuf",
    luni: [3, 4, 5],
    components: [
      { item: "Peletă", spec: "solubilă 15 mm aromă căpșună roșu (GDA Cireasa de pe Tort)" },
      { item: "Alternativă", spec: "peletă 10 mm Secret Aroma galben" },
      { item: "Forfac", spec: "standard crap, scurt" },
      { item: "Nadă", spec: "ediție specială GDA pentru pre-momire culoar" }
    ],
    diagrama: "fir principal → plumb → forfac scurt → cârlig cu peletă 15mm pe păr, plasat pe culoar pre-momit",
    pasi: [
      "Pre-momește culoarul îngust dintre cioată și stuf cu nadă specială",
      "Montează peleta 15 mm căpșună pe forfac scurt",
      "Plasează lansetele pe același culoar — peștii vin în serie (3 trăsături în 30 min)",
      "Dacă activitatea scade, schimbă pe una din lansete cu peletă 10 mm galben",
      "Reîmprospătează momeala la fiecare pește prins — ritmul scade altfel"
    ],
    sfaturi: [
      "Toate lansetele pe același culoar — atrac multiplicat",
      "Schimbă culoarea/aroma dacă scade ritmul",
      "Reîmprospătează momeala la fiecare contact"
    ],
    surse: ["kjrGXYKOnH0"],
  },
  {
    slug: "plumb-pierdut-eliberare-epi-sulina",
    nume: "Plumb pierdut cu eliberare pentru epi-uri Sulina",
    pentru: ["crap"],
    metoda: "static",
    scop: "Eliberare obligatorie a plumbului la baza epi-urilor pentru a nu pierde peștele în cioată",
    cand: "Sezon deschis pe Sulina, lângă epiuri și cioate",
    luni: [5, 6, 7, 8, 9, 10],
    components: [
      { item: "Plumb pierdut", spec: "cu clip rapid de eliberare" },
      { item: "Cârlig nr. 6", spec: "pentru bilă 20mm solubilă Delta Activ" },
      { item: "Cârlig nr. 4", spec: "pentru bilă 24mm semisolubilă Delta Activ" },
      { item: "Forfac", spec: "care permite eliberarea plumbului la prima opritură" }
    ],
    diagrama: "fir principal → clip eliberare cu plumb pierdut → forfac → cârlig 4/6 cu bilă 20/24mm pe păr",
    pasi: [
      "Verificare obligatorie funcționare clip eliberare înainte de lansare",
      "Lansează la baza peretelui de epi",
      "La trăsătură — plumbul TREBUIE să se elibereze imediat",
      "Dacă plumbul rămâne prins → peștele intră în cioată și se pierde"
    ],
    sfaturi: [
      "Testează clipul de eliberare ÎNAINTE de fiecare lansare",
      "Bilă 20mm pe cârlig 6 sau 24mm pe cârlig 4",
      "Plumb prins = pește pierdut în cioată"
    ],
    surse: ["o48pxAziGeY"],
  }
];

// Monturi noi din batch 3 (GFT)
monturi.push(
  {
    slug: "forfac-universal-gft",
    nume: "Forfac UNIVERSAL crap (GFT) — funcționează de la caraș 200g la crap 15 kg",
    pentru: ["crap"],
    metoda: "static",
    scop: "Singura rețetă de forfac pe care GFT o folosește pe TOATE locurile — Sulina, Dunărea Veche, Mila 23, Chilia. Universalitate testată ani la rând.",
    cand: "Tot anul, pe orice apă din Deltă",
    luni: [],
    components: [
      { item: "Fir forfac", spec: "PB Products Strong 0.18 mm / 22 kg", nota: "Perfect rotund, mătăsos, foarte moale" },
      { item: "Cârlig pentru Sulina", spec: "Gamakatsu G-Carp A1 PTFE Pop-Up nr. 4" },
      { item: "Cârlig pentru lacuri / Dunărea Veche", spec: "Gamakatsu G-Carp A1 PTFE Pop-Up nr. 6", nota: "Caraș 200g → crap 15 kg merg toate cu nr. 6" },
      { item: "Opritor V boilie", spec: "lungimi diferite după lungimea părului dorit" },
      { item: "Opritor silicon (bila)", spec: "sub boilie", nota: "La Decathlon boiliesul se lărgește în gaură; aici nu" },
      { item: "Tub varniș ghidaj", spec: "luat din tuburi pentru ghidaje de lansetă", nota: "Mai bun decât anti-tangle clasic" },
      { item: "Vârtej", spec: "calitate, mărimea standard" },
      { item: "Lungime totală forfac", spec: "~15 cm de la cârlig la vârtej" },
    ],
    diagrama: `
[Fir principal]
        │
        ⊕  ← Vârtej (nod fără-nod matisat 5x)
        │
   ━━━━━━━  ← PB Strong 0.18 mm / 22 kg
        │      Total 15 cm
        ║
   〰〰〰〰  ← Tub varniș ghidaj
        │
        ●  ← Opritor V (reglează lungime păr)
        │
        ┘  ← Gamakatsu G-Carp A1 nr. 4 (Sulina) / nr. 6 (lacuri)
        │
      ●●●  ← Boilie pe păr + bilă silicon
`,
    pasi: [
      "Bagă opritor silicon pe fir, apoi tub varniș, apoi cârlig prin varniș",
      "Treci firul prin spatele cârligului",
      "Așază opritorul V pentru lungimea părului dorită",
      "MATISARE 7-8 ORI peste tija cârligului",
      "ATENȚIE direcția matisării — la Gamakatsu A1 cu vârf închis spre stânga = matisare din SPATE",
      "Cu vârful închis spre dreapta = matisare din FAȚĂ",
      "Tot prin matisare se face nodul la celălalt capăt al vârtejului (5 ture, 2 bucle)",
      "NICIUN nod clasic — totul matisat = nu cedează",
    ],
    sfaturi: [
      "PB Products Strong 0.18 mm — singurul diametru pe care GFT îl folosește (testat de la caraș 200g la crap 15 kg)",
      "Direcția matisării contează: greșit = cârligul nu se răsucește corect la trăsătură",
      "Cu matisarea corectă: cârligul se rotește și se prinde în BUZA DE JOS",
      "Capul firului matisat — ars cu bricheta pentru nod de siguranță",
    ],
    citate: [
      "Forfacul meu nu are niciun nod — totul prin matisare. Nu are de unde să cedeze. — Marian Mincu",
    ],
    surse: ["9gjeC-CUm4g", "z4i2C_igafs"],
  },
  {
    slug: "clonc-ancori-owner",
    nume: "Montură clonc — 2 ancorițe Owner nr. 2 (NU ancora 4/0 BKK)",
    pentru: ["somn"],
    metoda: "static",
    scop: "Varianta GFT — ancorițe mici Owner cu buchet de râme negre. Frecvență trăsături MULT mai mare decât cu ancora 4/0 + păcălici.",
    cand: "Vara (iunie-septembrie) pe Chilia, Sf. Gheorghe",
    luni: [6, 7, 8, 9],
    components: [
      { item: "Două ancorițe Owner", spec: "nr. 2 (mici)", nota: "Frecvență trăsături MULT mai mare decât ancora 4/0 mare" },
      { item: "Plumb culisant", spec: "150 g" },
      { item: "Râme negre", spec: "buchet pe FIECARE ancoriță (câte 3 pe fiecare)" },
      { item: "Atractant somn", spec: "pulverizat pe râme", nota: "Crește frecvența trăsăturilor" },
      { item: "Lansetă", spec: "Black Cat sau MadCat" },
      { item: "Mulinetă", spec: "Penn Slammer Classic" },
      { item: "Fir principal", spec: "0.50 mm" },
    ],
    diagrama: `
[Fir principal 0.50 mm]
        │
   ╔════╗
   ║▓▓▓ ║  ← Plumb culisant 150 g
   ╚════╝
        │
        ⊕  ← Vârtej
        │
   ━━━━━━━  ← Forfac textil
        │
       /\\\\  ← Ancoriță Owner nr. 2 (3 râme negre)
        │
       /\\\\  ← A doua ancoriță Owner nr. 2 (3 râme negre)
              + atractant somn pulverizat
`,
    pasi: [
      "Plumb culisant pe fir principal",
      "Vârtej la capăt",
      "Forfac textil",
      "PRIMA ancoriță Owner nr. 2 cu 3 râme negre înfipte (cap acoperit)",
      "A DOUA ancoriță Owner nr. 2 cu 3 râme + atractant somn",
      "Distanța între ancorițe ~15-20 cm",
    ],
    sfaturi: [
      "Două ancorițe mici > ancora mare 4/0 cu păcălici — testat în partide concrete pe Sulina",
      "PATENT obligatoriu pentru scos ancorițele din pește (NU mâna — risc accident grav cu ancoriță în mână)",
      "Setări sonar Humminbird pentru clonc: Sens 9, Contrast 17, Speed 7, 150/200 chirp",
      "Cu LiveScope (Garmin LVS34) vezi că somnul oprește la 3-4 m de momeală — repoziționează cu motorul electric ca să fie LA momeală",
      "Renunță la varianta cu cârlige simple — ancorițele sunt clar mai eficiente",
    ],
    citate: [
      "Două ancorițe Owner nr. 2 = frecvența trăsăturilor mult mai mare decât ancora mare",
    ],
    surse: ["AyW0_SqZSoU", "xwKfjceN6tA"],
  }
);

export function getMontura(slug: string) {
  return monturi.find((m) => m.slug === slug);
}

export function monturiPentru(
  specie: Montura["pentru"][0],
  date?: Date
) {
  const filtered = monturi.filter((m) => m.pentru.includes(specie));
  if (!date) return filtered;
  const month = date.getMonth() + 1;
  return filtered.filter(
    (m) => !m.luni || m.luni.length === 0 || m.luni.includes(month)
  );
}
