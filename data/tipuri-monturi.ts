// Ghidul tipurilor de monturi — explică CÂND și UNDE folosești fiecare tip
// (complementar cu data/monturi.ts care are rețete concrete)

export type TipMontura = {
  slug: string;
  nume: string;
  categorie: "static" | "spinning" | "feeder" | "general";
  scurt: string;
  cand: string[];
  unde: string[];
  avantaje: string[];
  dezavantaje: string[];
  componente: string[];
  evitati: string;
  monturiAsociate: string[]; // slug-uri din data/monturi.ts
};

export const tipuriMonturi: TipMontura[] = [
  // ===== STATIC (CRAP / SOMN) =====
  {
    slug: "inline-runner",
    nume: "Inline (in-line)",
    categorie: "static",
    scurt:
      "Plumb cu canal interior prin care trece firul principal. Plumbul stă CENTRAT pe leader.",
    cand: [
      "Pescuit static pe Dunăre cu curent moderat-puternic",
      "Vara când vrei prezentare naturală pe substrat",
      "Cu un singur cârlig, atac direct la masă",
    ],
    unde: [
      "Brațele Chilia, Sf. Gheorghe — apă 6-14 m cu cioate",
      "Dunărea Veche cu buturi lipovenești",
      "Zone cu fund mâlos / argilos",
    ],
    avantaje: [
      "Plumbul stă FIX pe substrat — peștele simte greutatea = auto-înțepare",
      "Curentul nu răsucește plumbul",
      "Lansaj direct, fără încurcături",
    ],
    dezavantaje: [
      "La rupere de fir, plumbul rămâne pe pește — risc de blocare în structuri",
      "Pe pietre / scoică se agață frecvent",
    ],
    componente: [
      "Plumb in-line cu canal central (plat sau lacrimă pentru pietre)",
      "Con de cauciuc dur deasupra (NU moale)",
      "Vârtej DUBLU LAGĂR obligatoriu pe curent",
      "Înaintaș 25-40 cm (textil / fluorocarbon)",
      "Cârlig cu fir de păr, boilie 16-24 mm",
    ],
    evitati:
      "NU folosi plumb in-line pe cioate dense — la agățare nu se eliberează → rupere garantată. Folosește plumb pierdut.",
    monturiAsociate: ["inline-clasic-barca", "n-trap-mono-sulina"],
  },
  {
    slug: "plumb-pierdut",
    nume: "Plumb pierdut (running lead drop)",
    categorie: "static",
    scurt:
      "Plumb prins într-un clip care se eliberează automat la agățare sau la pierderea peștelui.",
    cand: [
      "Cioate dense, pădure scufundată",
      "Pescuit pe pietre / scoică tăietoare",
      "Când vrei să salvezi peștele dacă rupe firul (montura cade liberă)",
    ],
    unde: [
      "Brațul Chilia în zonele cu pădure de cioate",
      "Sulina pe digul de piatră",
      "Lacuri cu lemn scufundat (Gagu 2)",
    ],
    avantaje: [
      "Plumbul cade liber la rupere — peștele nu rămâne ancorat de structură",
      "Auto-înțepare puternică (plumb mai greu, 150-300 g)",
      "Cu clip FL = eliberare ușoară testată",
    ],
    dezavantaje: [
      "Pierzi plumbul la fiecare agățare — buget plumbi",
      "Sistemele rigide (alte branduri decât FL) NU eliberează — rezultă rupturi de monturi",
    ],
    componente: [
      "Plumb 150-300 g (Atac tip ciment, cu absorbție 10%, băgabil în dip)",
      "Clip de eliberare FL — IMPORTANT, NU alte branduri",
      "Înaintaș cămășuit Carp Spirit 25 cm (protecție scoică)",
      "Cârlig Krank Curve nr. 4 sau Solar wide gape",
    ],
    evitati:
      "Evită sistemele rigide din alte branduri. Test pe teren: 4 rupturi cu rigid vs 0 cu FL.",
    monturiAsociate: ["plumb-pierdut-cioata", "fluorocarbon-rigid-iarna"],
  },
  {
    slug: "helicopter-rig",
    nume: "Helicopter rig (forfac rotativ)",
    categorie: "static",
    scurt:
      "Forfac liber pe firul principal, deasupra plumbului — se rotește ca o elice la lansare.",
    cand: [
      "Distanțe MARI (60+ m)",
      "Lansaje peste structuri vegetale",
      "Când vrei să eviți încurcăturile la zbor",
    ],
    unde: [
      "Lacuri mari (Corbu) lansare spre platouri îndepărtate",
      "Brațe largi pentru pescuit pe șenal",
    ],
    avantaje: [
      "Aerodinamic — distanțe mari fără încurcătură",
      "Forfacul se așază natural pe substrat după aterizare",
    ],
    dezavantaje: [
      "Cere asamblaj specific cu stop sus + stop jos",
      "NU bun pe curent puternic — forfacul se învârte",
    ],
    componente: [
      "Stop superior (rubber bead)",
      "Quick-change swivel pentru forfac",
      "Stop inferior",
      "Plumb terminal (la capătul firului principal)",
      "Forfac 30-50 cm cu cârlig",
    ],
    evitati: "Pe curent — folosește inline sau plumb pierdut.",
    monturiAsociate: [],
  },
  {
    slug: "shock-leader",
    nume: "Shock leader (înaintaș de șoc)",
    categorie: "static",
    scurt:
      "Fir GROS (0.50-0.80 mm) de 10-15 m între firul principal și plumb — absoarbe șocul lansajului greu + protecție la pietre.",
    cand: [
      "Lansaje cu plumbi peste 150 g",
      "Maluri cu pietre / scoică pe taluz",
      "Când firul tău principal e subțire (0.25-0.30 mm) și ai nevoie de protecție terminală",
    ],
    unde: [
      "Sulina pe digul de piatră (esențial — fără el rupere garantată)",
      "Sf. Gheorghe pe scoică tăietoare iulie",
      "Orice loc cu prag abrupt pietros",
    ],
    avantaje: [
      "Singura soluție validată pentru pescuit din mal pe pietre",
      "Permite firul principal subțire pentru distanță + senzitivitate",
    ],
    dezavantaje: [
      "Nodul shock leader → fir principal trece prin inelele lansetei — trebuie matisat",
      "Adaugă 10-15 m de fir gros pe tambur",
    ],
    componente: [
      "Sufix Velocity Impact / Carp Spirit 0.80 mm × 10-15 m",
      "Nod Albright Classic matisat: 7-8 ture pe fir gros, 4-5× pe subțire",
      "Restul monturii la capătul shock leader-ului",
    ],
    evitati:
      "NU lega cu nod simplu — trece prin inele, freacă, slăbește. Matisarea cu noduri de carp e obligatorie.",
    monturiAsociate: ["shock-leader-pietre"],
  },
  {
    slug: "method-feeder",
    nume: "Method feeder (momitor)",
    categorie: "feeder",
    scurt:
      "Coșuleț de plumb pe care se PRESEAZĂ nadă în jurul cârligului ascuns. Eliberează nada exact unde e momeala.",
    cand: [
      "Primăvara cu apă rece (5-17°C) când peștii sunt cantonați și nu mănâncă mult",
      "Pescuit FINEȚE cu cârlig mic (nr. 10-12) pe canale înguste",
      "Când nu vrei să faci patul mare de nadă — concentrezi nada lângă cârlig",
    ],
    unde: [
      "Canalele Mila 23, Crișan-Îngusta",
      "Canale interioare Deltă cu cioate scufundate",
      "Bălți de feeder cu pescuit competițional",
    ],
    avantaje: [
      "Eficient pe pești apatici / pretențioși",
      "Nada e EXACT lângă cârlig — atac sigur",
      "Auto-înțepare cu stop opritor deasupra (la rupere momitorul cade liber)",
    ],
    dezavantaje: [
      "Cere nadă cu textură specifică (comprimabilă, nu prea umedă)",
      "Pe curent puternic momitorul cu placă plată stă mai bine decât rotunjit",
    ],
    componente: [
      "Momitor cu placă Lazy Fish 40-130 g",
      "Stronă Drennan Carp Method 7.5-10 cm",
      "Conector clip rapid Korum",
      "Cârlig nr. 10 (la pornire — urci doar dacă scapă)",
      "Stop opritor deasupra momitorului pe fir principal",
      "Hookbait: dumbbell 10 mm alb/oranj sau peletă 10 mm",
    ],
    evitati:
      "NU smucitura la înțepare — în barcă firul tensionat se rupe / unghiul cârligului se schimbă. RIDICĂ lanseta + manivelează.",
    monturiAsociate: ["momitor-method-feeder"],
  },
  {
    slug: "bolt-rig",
    nume: "Bolt rig (auto-înțepare)",
    categorie: "static",
    scurt:
      "Principiu, nu o montură anume: plumb FIX + cârlig agresiv = peștele se înțepă singur când simte greutatea.",
    cand: [
      "Mereu când vrei pescuit nesupravegheat (rod-pod cu avertizoare)",
      "Cu boilies + fir de păr — peștele aspiră, simte cârligul, fuge, plumbul îl prinde",
      "Cu shock leader pe pescuit din mal la distanță",
    ],
    unde: ["Toată Delta + bălți"],
    avantaje: [
      "Nu trebuie să fii fix lângă lansetă",
      "Funcționează cu avertizoare la 30-40 m",
    ],
    dezavantaje: [
      "Nu funcționează cu plumb prea ușor (sub 80 g)",
      "Inline + plumb prea ușor = peștele scuipă",
    ],
    componente: [
      "Plumb fix (inline cu con dur SAU plumb pierdut greu)",
      "Fir de păr SCURT (1-1.5 cm decojit)",
      "Cârlig wide gape cu vârf agresiv",
      "(Opțional) opritor pe fir principal — marker auto-înțepare",
    ],
    evitati:
      "Plumb fix cu rig lung — peștele scapă cârligul la primul scuipat. Folosește forfac max 40 cm.",
    monturiAsociate: ["inline-clasic-barca", "plumb-pierdut-cioata"],
  },
  {
    slug: "hairrig",
    nume: "Hairrig (fir de păr)",
    categorie: "general",
    scurt:
      "Boilia / momeala legată DEASUPRA cârligului pe un fir scurt — NU pe cârlig direct. Crapul ia bila, simte cârligul, se înțepă.",
    cand: [
      "Toate monturile de crap moderne (vara, primăvara, iarna)",
      "Cu boilies 16-24 mm",
      "Cu wafter, dumbbell, snowman, pop-up",
    ],
    unde: ["Toată Delta + bălți"],
    avantaje: [
      "Cârligul rămâne LIBER să se înțepe în buza crapului",
      "Permite folosirea de boilies dure pe care cârligul nu ar putea fi tras",
      "Selectivitate — peștele aspiră natural fără să simtă rezistență",
    ],
    dezavantaje: [
      "Cere decojire precisă (1-1.5 cm) — altfel curentul / carasul îl încurcă",
      "Boilia se poate desprinde la lansaje violente — folosește bait floss / opritor",
    ],
    componente: [
      "Knotless knot (nod fără nod) la cârlig",
      "Fir de păr scurt cu opritor de boilie (silicon sau metal)",
      "Boilia / dumbbell / wafter pe părul de păr",
    ],
    evitati:
      "Părul de păr LUNG (peste 3 cm decojit) — atrage caras / rateuri.",
    monturiAsociate: ["inline-clasic-barca", "momitor-method-feeder", "n-trap-mono-sulina"],
  },
  {
    slug: "pva-bag",
    nume: "Pungă PVA",
    categorie: "static",
    scurt:
      "Pungă solubilă în apă cu boilies + pelete în jurul cârligului. Se dizolvă în 30-60 sec, eliberează nadă concentrată.",
    cand: [
      "Lansaje MANUALE la 80-110 m pe lacuri / brațe largi",
      "Vara când vrei nucleu de momeală exact unde a aterizat",
      "Când nu poți face spomb (vânt, distanță prea mare)",
    ],
    unde: [
      "Lacuri mari — Corbu (validat în partidă)",
      "Brațe largi cu pescuit de pe mal",
    ],
    avantaje: [
      "Nadă concentrată EXACT pe cârlig",
      "Excelentă pentru lansaje în structuri (PVA NU se agață)",
    ],
    dezavantaje: [
      "Cere plumb suficient (90 g e UȘOR pe curent — testează mai greu pe vânt)",
      "Costă (pungile PVA + pelete special)",
      "Rest stopper sub shrink tube e ESENȚIAL când valurile scufundă firul",
    ],
    componente: [
      "Pungă PVA solubilă",
      "Plumb 90-150 g (mai greu pe curent / vânt)",
      "Pelete + boilies în pungă",
      "Rig cu wafter sau boilie pe firul de păr",
      "Rest stopper sub shrink tube",
    ],
    evitati:
      "Plumb prea ușor — punga PVA + plumb sub 90 g se aruncă într-o direcție incertă, se duce departe.",
    monturiAsociate: [],
  },

  // ===== SPINNING =====
  {
    slug: "jighead-spinning",
    nume: "Jighead (cap de plumb)",
    categorie: "spinning",
    scurt:
      "Cârlig cu cap de plumb integrat — purtătorul universal al gumelor / shad-urilor / twister-elor.",
    cand: [
      "Jigging pe șalău, știucă, biban — toate speciile spinning",
      "Pe ape adânci cu cădere controlată",
      "Când vrei vibrație la cădere + animație în smucituri",
    ],
    unde: [
      "Tot ce înseamnă spinning în Deltă + Argeș / Neajlov",
    ],
    avantaje: [
      "Foarte versatil — schimbi guma în 2 sec",
      "Multe greutăți (3-30 g) pentru orice adâncime",
      "Atacul vine pe pauza de cădere — foarte clar",
    ],
    dezavantaje: [
      "Se agață frecvent în piatră / cioate",
      "La pește mare cu dinți (știucă) — folosește variantă cu cap protejat (BKK cu sârmă)",
    ],
    componente: [
      "Cap de plumb cu cârlig integrat",
      "Greutate aleasă după adâncime + curent (3 g bătere, 7 g standard șalău, 28-35 g Sulina post-ger)",
      "Cârlig 1/0 - 6/0 după mărimea gumei",
      "Gumă / shad / twister",
    ],
    evitati:
      "Jighead prea greu pe atacuri firave — cade direct pe fund fără să dea timp atacului. Vezi gumă verde + 3.5 g pe șalău în octombrie.",
    monturiAsociate: ["jighead-stiuca-batere", "jigging-salau-fluoro", "biban-microjig"],
  },
  {
    slug: "dropshot",
    nume: "Dropshot",
    categorie: "spinning",
    scurt:
      "Plumb la CAPĂTUL firului, cârlig deasupra cu 20-30 cm. Momeala 'plutește' deasupra fundului la înălțimea aleasă.",
    cand: [
      "Pescuit FINESE pe structuri verticale",
      "Bibani lângă pontoane / maluri abrupte",
      "Apă rece cu pești nehrănit dar curioși",
    ],
    unde: [
      "Pontoane, maluri abrupte pe lacuri Deltă",
      "Structuri verticale (lemn scufundat)",
    ],
    avantaje: [
      "Momeala stă SUSPENDATĂ — vizibilă, în coloana apei",
      "Foarte sensibil — simți cele mai mici atacuri",
      "Plumbul se agață, NU cârligul — schimbi plumbul fără să strici rig-ul",
    ],
    dezavantaje: [
      "Cere lansetă rigidă cu vârf foarte fin",
      "Nu funcționează pe curent",
    ],
    componente: [
      "Plumb dropshot 5-15 g (terminal)",
      "Cârlig nr. 1-6 (palomar knot, lăsat în picioare)",
      "20-30 cm distanță cârlig-plumb",
      "Vierm siliconat / mini shad",
    ],
    evitati: "NU pe curent — montura se învârte și se încurcă.",
    monturiAsociate: [],
  },
  {
    slug: "topwater-rig",
    nume: "Topwater (nălucă de suprafață)",
    categorie: "spinning",
    scurt:
      "Năluci care lucrează la suprafață — popper, walking bait, prop bait, mouse. Atacuri spectaculoase.",
    cand: [
      "Mai-iulie + septembrie pe ape calde",
      "Când vezi atacuri la suprafață",
      "Post-prohibiție când știuca e încă agresivă după bătaie",
    ],
    unde: [
      "Stația 11 Delta (validat 90+ cm)",
      "Balta Gagu 2 cu plauri + cocioc",
      "Lacuri interioare cu vegetație",
    ],
    avantaje: [
      "Atacuri vizuale spectaculoase",
      "Captură pești MARI cu nălucă mare",
      "NU se agață de fund (lucrează deasupra)",
    ],
    dezavantaje: [
      "RĂBDARE OBLIGATORIE la înțepare — peștele apucă din profil, nu înțepi din prima",
      "Cere combo casting + multiplicator pentru năluci 50-70 g",
    ],
    componente: [
      "Vobler topwater (Choppo prop, Slider Hi-Lo, walking bait)",
      "Strună fluorocarbon 0.50-0.60 mm sau OȚEL (risc maxim dinți pe topwater)",
      "Agrafă cu inel rotativ slim",
      "Fir împletit Berkley X9 30 lbs",
    ],
    evitati:
      "NU înțepa din prima când vezi atacul. Lași peștele să înghită, simți că trage, abia atunci ridici lanseta.",
    monturiAsociate: ["topwater-stiuca"],
  },
  {
    slug: "fluorocarbon-leader-spinning",
    nume: "Înaintaș fluorocarbon (spinning)",
    categorie: "spinning",
    scurt:
      "Fir gros invizibil între împletit și nălucă. Pe ape limpezi unde peștele vede tot.",
    cand: [
      "Apă cristalină (Neajlov, Stația 11, lacuri Deltă)",
      "Pescuit la șalău, avat, biban (specii cu vedere bună)",
      "Când struna de oțel sperie peștele (apă curată + bătaie)",
    ],
    unde: ["Toate spinning în ape limpezi"],
    avantaje: [
      "Invizibil sub apă (indice de refracție apropiat de apă)",
      "Mai rezistent la abraziune decât împletitul",
      "Rigid — împiedică scuiparea (mai ales iarna)",
    ],
    dezavantaje: [
      "Nu rezistă la dinții știucii dacă peștele apucă fluorocarbonul",
      "Memorie — bobinele se răsucesc dacă-l ții prea mult timp pe spool mic",
    ],
    componente: [
      "Fluorocarbon 0.30-0.60 mm (după specie)",
      "Nod Albright Classic matisat (8 spire pe fir gros)",
      "Agrafă slim la celălalt capăt",
    ],
    evitati:
      "Folosit ca strună pentru știucă în apă tulbure — peștele apucă fluorocarbonul din profil → ruptură. Pe apă tulbure folosește oțel.",
    monturiAsociate: ["jigging-salau-fluoro", "avat-helic-natural", "biban-microjig"],
  },
  {
    slug: "struna-otel",
    nume: "Strună de oțel / titan",
    categorie: "spinning",
    scurt:
      "Fir metalic flexibil între înaintaș și nălucă. Singura protecție REALĂ împotriva dinților știucii.",
    cand: [
      "Mereu când pescuiești știucă în apă tulbure",
      "Cu năluci mari / topwater unde peștele apucă mai sus",
      "Iarna pe lacuri și balastiere",
    ],
    unde: ["Toate locurile de știucă, exceptând apele cristal cu finețe (fluorocarbon)"],
    avantaje: [
      "Indestructibilă la dinți",
      "Cu titan: revine la forma inițială după mototolire (Traco 7 fire)",
    ],
    dezavantaje: [
      "Vizibilă în apă cristalină — sperie peștii",
      "Rigidă (oțelul clasic) — limitează acțiunea nălucii",
    ],
    componente: [
      "Strună titan 7 fire (Traco) — flexibilă, revine din mototolire",
      "Strună oțel 49 fire (universale ieftine)",
      "Agrafă mică cu inel rotativ",
      "Lungime 25-40 cm",
    ],
    evitati:
      "Strună prea groasă pe nălucă mică (gumă 6 cm + oțel 0.50) — distruge acțiunea. Folosește 0.30-0.40.",
    monturiAsociate: ["jighead-stiuca-batere"],
  },

  // ===== SOMN =====
  {
    slug: "clonc-montura",
    nume: "Montura de CLONC pentru somn",
    categorie: "static",
    scurt:
      "Sub barcă, pe verticală — chemi somnul cu cloncul (instrument de lemn), montura cu 2 cârlige + râme.",
    cand: [
      "Vară (iunie-septembrie) pe ape adânci 8-22 m",
      "Pe brațul Chilia, Sf. Gheorghe — apă cu cioate / gropi",
      "Dimineața și seara, somnul activ",
    ],
    unde: ["Brațul Chilia (Periprava → Tatanir), Sf. Gheorghe"],
    avantaje: [
      "Pescuit ACTIV — chemi peștele",
      "Vezi atacul pe Live Scope",
      "Captură pești MARI (peste 100 kg posibil)",
    ],
    dezavantaje: [
      "Cere TEHNICĂ — cloncul greșit nu cheamă peștele",
      "Setup scump (Live Scope, MadCat, BKK)",
    ],
    componente: [
      "Cloncul (B.B. Clonc TR/TNZ, Bogdan Munteanu)",
      "Les MadCat 'țigaretă' 200 g",
      "Ancora 4/0 BKK Viper + cârlig 7/0 'păcălici'",
      "Opritor MadCat sectionat (scurt sau 40-50 cm)",
      "Râme proaspete + geantă termo",
    ],
    evitati:
      "Cloncul folosit ca CIOCAN — nu funcționează. Mișcarea = din degete + încheietură, NU forță.",
    monturiAsociate: ["clonc-somn"],
  },
];

export function getTip(slug: string) {
  return tipuriMonturi.find((t) => t.slug === slug);
}

export const CATEGORII = ["static", "feeder", "spinning", "general"] as const;
export const CAT_LABELS: Record<(typeof CATEGORII)[number], string> = {
  static: "Static (crap, somn)",
  feeder: "Feeder",
  spinning: "Spinning (răpitori)",
  general: "Principii generale",
};
