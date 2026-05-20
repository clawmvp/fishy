export type Tehnica = {
  slug: string;
  specie: "stiuca" | "salau" | "avat" | "crap" | "biban" | "somn";
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

// Tehnici noi din batch 2
tehnici.push(
  {
    slug: "stiuca-slider-lac",
    specie: "stiuca",
    metoda: "spinning",
    titlu: "Slider Salmo 7 pe lacurile interioare Delta",
    scurt: "Sliderul jercat din vârf bate lingurița pentru știucile mai mari. Septembrie pe apă în scădere.",
    perioada: "Septembrie - noiembrie",
    pasi: [
      "Sliderul NU se mulinează liniar — se jercăie din vârful lansetei",
      "Smucituri scurte + pauze de 1-2 sec cu nălucă suspendată",
      "Recuperare lentă cu lansare la 30-40 m (lansaje lungi = nu sperii peștii mari)",
      "Caută ZONA MICĂ DE APĂ LIMPEDE din lacul tulbure — acolo stă știuca",
    ],
    naluci: [
      "Slider Salmo 7 cm — floating 17 g (apă mică <1 m), sinking 21 g (apă mai mare)",
      "Culori MarelePescar exclusive: galben-negru, portocaliu-galben-negru",
      "Sliderul atrage știucă chiar din Dunărea Veche în lac la portocaliu",
    ],
    echipament: [
      "Lansetă moale: Rapala Countdown 2.13 m / 5-21 g",
      "Combo extra-fast pentru slidere: Daiwa SZ 728 (lansetă de șalău!)",
      "Mulinetă Okuma Inspira 2500 / Shimano Stradic 2500",
      "Fir Sufix 131 9 lb sau YGK 22 lb",
    ],
    monturi: [
      "Strună Traco titan din 7 fire — revine la forma inițială după mototolire",
      "Cârlig agrafă cu inel rotativ",
    ],
    sfaturi: [
      "Sliderele prind constant știuci MAI MARI decât lingurițele",
      "Lingurițe 10 g (nu 16-17) la apă 0.5 m cu iarbă — recuperare lentă fără agățare",
      "Schimbă spotul când furtuna se apropie — știuca se ascunde",
    ],
  },
  {
    slug: "avat-epi-noiembrie",
    specie: "avat",
    metoda: "spinning",
    titlu: "Avat pe epi-urile Sulinei în noiembrie",
    scurt: "Diguri de piatră perpendiculare = anafor în spate. Avat 45-50 cm pe vobler sinking.",
    perioada: "Noiembrie",
    pasi: [
      "Identifică epi-urile (diguri perpendiculare pe mal) între Gorgova și Crișan",
      "Lansează SPRE / DUPĂ epi, în anaforul din spate",
      "Caută adâncime MICĂ (2-3 m max) după epi — NU curent + adâncime mare (acolo doar mici)",
      "Mulinare în pauze + dat de fund pe nălucă sinking",
    ],
    naluci: [
      "Duo Realis 14.5 g și 21 g — natural cu spate negru",
      "Rapala Countdown Elite — verde-cap roșu",
      "Fast Strike Hunter Big River 21 g",
      "Cicade Lazer Tactic Fishing (Ticu Fishing) 18-22 g",
      "Rapture Under Silent — vobler ieftin <30 RON, prinde și șalău",
    ],
    echipament: [
      "Lansetă extra-fast: A.Sava Custom ASAVA72HF 7-40 g (blanc MHX cu vârf fibră sticlă)",
      "Lansetă alternativă: Daiwa Basti 7-28 g",
      "Mulinetă Shimano Stella 2500 / Stradic 2500",
      "Fir împletit YGK 22 lb",
    ],
    monturi: [
      "Fluorocarbon 0.32-0.35 mm",
      "Fără strună la avat",
    ],
    sfaturi: [
      "NU FIECARE EPI PRODUCE — variabilitate zilnică. Mută între epi-uri",
      "Pe vreme rece avatul iese din curent pe platouri liniștite",
      "Vârful de fibră sticlă absoarbe atacul violent al avatului",
    ],
  },
  {
    slug: "biban-dunarea-veche-noiembrie",
    specie: "biban",
    metoda: "spinning",
    titlu: "Biban pe Dunărea Veche când lacurile devin cristal",
    scurt: "Când nu găsești biban pe lacuri/canale, mergi la confluența cu Dunărea Veche. Cei mari lipiți de mal.",
    perioada: "1-15 noiembrie",
    pasi: [
      "Caută confluența unui canal cu Dunărea Veche (ex: Canalul Lopatna)",
      "Bibanii MARI sunt LIPIȚI de malul cu piatră — lansare paralelă cu malul",
      "Bibanii MICI se văd în larg sub barcă pe Live Scope — pescuit vertical",
      "Folosește gume + microjig",
    ],
    naluci: [
      "Fast Strike gumă 'Motoroil'",
      "Bass Assassin Electric Chicken (gumă cu coadă curly)",
    ],
    echipament: [
      "Rapture Furon XF L 2.18 m / 0.8-10 g",
      "Rapture Edge Master Solid 1.95 m / 1-7 g (ultra-light, vârf solid)",
      "Mulinetă Trabuco Helium 1000 (carbon)",
      "Fir Momoi Tacumi Zigline 0.05 mm — scufundător, nu absoarbe apă",
    ],
    monturi: [
      "Jighead 5 g (NU 7-10 g — agață piatra)",
      "Microjig BKK cu sârmă îndoită ce ține guma fără s-o distrugă",
    ],
    sfaturi: [
      "Live Scope Garmin 841 + LiveScope 34 = localizare bancuri",
      "La banc mare de bibani mici, folosește jighead mai mare (7 g) ca să selectezi cei mari",
      "Final de sezon (noiembrie) bibanul se mută de pe o zi pe alta",
    ],
  },
  {
    slug: "salau-finval-iarna-sulina",
    specie: "salau",
    metoda: "spinning",
    titlu: "Șalău post-ger pe Sulina cu Finval",
    scurt: "După 2 săptămâni de ger, gramajul jighead-ului trebuie crescut cu ~50% (21→28-35 g).",
    perioada: "Februarie",
    pasi: [
      "Ancorare la 6-7 m apă lângă talweg de 15 m (Dana 1 Mai, Vulturul, Maliuc)",
      "Jig vertical pe prag — recuperare cu pauze, cădere între smucituri",
      "Pelicanii care vânează șalău în zonă = indicator GOOD",
    ],
    naluci: [
      "Storm Largo Shad 'Houdini' (rozaliu)",
      "Micado shad galben-roșu cu puncte negre",
      "Fish Up shad maro cu gliter — pe cădere",
    ],
    echipament: [
      "Lansete A.Sava (Asava) custom",
      "Mulinete Shimano Stella + Stradic",
      "Fir împletit YGK X-Braid Upgrade X8 Light Green",
    ],
    monturi: [
      "Jighead 28-35 g iarna pe Sulina după ger (NU 21 g standard)",
      "Cârlig 3/0",
    ],
    sfaturi: [
      "Curentul post-ger pe Sulina = jigul ușor cade direct pe fund fără să 'lucreze' — crește gramajul",
      "Setup avansat: Finval 595 + motor electric Quest + Live Scope pe LiFePO4",
      "Verifică șalăii prinși — cicatrice de pelican = ești în zonă",
    ],
  },
  {
    slug: "stiuca-concurs-delta",
    specie: "stiuca",
    metoda: "spinning",
    titlu: "Strategie de concurs pentru știuci mari în Delta",
    scurt: "Media 55+ cm pentru top 10. Selecție cu gramaj nălucă, NU schimbare spot.",
    perioada: "Octombrie - noiembrie",
    pasi: [
      "Folosește voblere MAI GRELE = lansări mai lungi = nu sperii peștii mari",
      "La lingură folosește lansetă MAI LUNGĂ (2.48 m) ca să pescuiești PESTE iarbă fără agățare",
      "Caută apa intermediară — NICI tulbure, NICI cristal",
    ],
    naluci: [
      "Rapture vobler cu bile (zgomot) — record la 65 cm",
      "Dorado voblere scufundătoare",
      "Rublex 'Irlandeza' originale — 12, 15, 18, 21, 24, 30 g (argint/aur/cupru)",
      "Fast Strike shad alb cu cap roșu",
    ],
    echipament: [
      "Rapture Acrux Concept R Racing Magworm XF 2.15 m / 7-28 g (blanc Toray Japonia)",
      "Lansetă lungă pentru lingură: 2.48 m / 7-35 g",
      "Mulinetă Shimano Stradic 2500 / Stella 2500",
      "Strună Traco titan 7 fire",
    ],
    monturi: [
      "Strună titan flexibilă",
      "Fir Momoi Ryujin 0.06-0.20 mm",
    ],
    sfaturi: [
      "Apa cristal NU produce, apa stricată cu miros NU produce — căut apa intermediară",
      "Peștii MARI nu sunt proști — au experiență; lansaje lungi cu năluci grele = strategie cheia",
      "Bibanii mari sunt GRUPAȚI — odată găsit bancul, prinzi mulți la rând",
    ],
  },
  {
    slug: "crap-strategie-bate-norocul",
    specie: "crap",
    metoda: "static",
    titlu: "Strategia 'Bate Norocul' pentru crap în noiembrie",
    scurt: "Nadă 2× pe zi cu boilies TARI + cârlig cu SOLUBILE schimbate la 30 min. Pescuit contra curent.",
    perioada: "Noiembrie",
    pasi: [
      "Nădire DE 2 ORI PE ZI (dimineața + seara) cu 2-2.5 kg boilies TARI care rămân pe substrat",
      "Pe cârlig: boilies/dumble-uri SOLUBILE GDA — se topesc în 30-40 min",
      "Schimbă cârligele constant (la 30-40 min)",
      "TAIE dumble-urile cu cutter în formă DREPTUNGHI/PĂTRAT ca să se activeze și mai repede",
      "Pescuit CONTRA curentului — momitorul stă în curent, dâra duce particulele înspre cârlig",
    ],
    naluci: [],
    echipament: [
      "Lansete cu vârf moale + putere mare în rezervă",
      "Foarfecă Haku pentru tăiat dumble-uri",
    ],
    monturi: [
      "Momitor 120 g + cârlig nr. 8 (toamnă/iarnă; nr. 6 vara)",
      "Rig 8-9 cm cu fir textil 0.20 mm (Feeder, foarte subțire)",
      "Opritor pe firul principal deasupra momitorului = auto-înțepare",
      "'Cireașa pe tort' — peleta/dumble băgat SUPERFICIAL deasupra cârligului în nadă (NU îngropat)",
    ],
    sfaturi: [
      "Localizare = cel mai important. Schimbă local când dispar pe Tranzit",
      "Pescuiește pe apă 4 m — presiune scăzută = peștele jos",
      "Cere bărcilor să meargă glisat sau OPRIT lângă pescari — semi-glisajul face valuri care taie peștele",
    ],
    citate: [
      "Localizarea singură nu garantează capturi iarna — apa, temperatura, oxigenul din canal contează mai mult",
    ],
  },
  {
    slug: "crap-iarna-canale-alegere",
    specie: "crap",
    metoda: "static",
    titlu: "Iarna pe canale: alege Litcov, NU Îngusta",
    scurt: "Diferența vitală: canalele Deltei NU au aceeași apă. Litcov vine din lacuri = mai cald. Îngusta direct din Dunăre = rece.",
    perioada: "Decembrie",
    pasi: [
      "Localizează cu sonar live cioate cu pești cantonați (nu se plimbă iarna)",
      "Verifică sursa apei canalului — Litcov primește din lacuri Isac/Isăcel + Sf. Gheorghe (caldă, curată)",
      "Îngusta primește direct din Dunăre + tulbure de la munte (rece)",
      "Mută activ — 3 mutări/zi; nu stai 30-60 min fără trăsătură",
      "Folosește 'minciunele' (wafter moi GDA 8-15 mm) — peștele apatic mușcă din CURIOZITATE, nu foame",
    ],
    naluci: [],
    echipament: [
      "Sonar live obligatoriu (vezi peștii cantonați)",
      "Lansete cu frână strânsă (puțin fir disponibil)",
    ],
    monturi: [
      "Mono 0.55 mm + plumb pierdut + rig fir cămășuit + cârlig nr. 6",
      "Pentru pescuit lângă cioată: fir mai gros (0.35-0.55 mm)",
      "Wafter-uri GDA 'minciunele' 8 mm și 15 mm — moi, se ridică ele singure fără să ridice cârligul",
      "Fir textil 0.13 mm + cârlig nr. 10 PREA FRAGIL pentru drill (testat — îndoit)",
    ],
    sfaturi: [
      "Vorbește cu localnicii (Luci, Mihai Manea, Costeluș) pentru info zilnice",
      "Peștele apatic + zonă bună ≠ trăsături — apa este factorul cheie iarna",
      "Speranța hrănirii: stârnește peștii cantonați cu câteva mâini de bile aruncate pe loc",
    ],
    citate: [
      "1°C diferență + apă murdară = pește localizat dar nehrănit",
    ],
  },
  {
    slug: "crap-pva-navomodel",
    specie: "crap",
    metoda: "static",
    titlu: "PVA versus plantare cu navomodel pe Lacul Corbu",
    scurt: "2 lansete PVA lansate manual la 95-110 m + 2 lansete plantate cu Deeper Quest. Combo win.",
    perioada: "Iunie - august",
    pasi: [
      "Sondează cu marker zona tare (substrat nisipos vs mâlos)",
      "PVA: lansare MANUALĂ cu pungă PVA solubilă + plumb 90 g + boilies/wafter",
      "Plantat: navomodel Deeper Quest cu sonar — auto-pilot pe puncte salvate; conuri 47°/20°/7°",
      "Întreținere zonă cu spomb la fiecare oră (2 mâini boilies + porumb + spărtură alună + pelete)",
      "Repoziționează lansetele la 2-3 ore fără trăsături",
    ],
    naluci: [],
    echipament: [
      "Lansete: Shimano TX4A + mulinete Ultegra XR + fir Sufix 0.25 (pentru PVA distanță)",
      "Plantat: CarPro Torque + mulinete Penn Hidal XT 8000",
      "Navomodel: Deeper Quest (rază 400 m, sonar integrat, auto-pilot pe puncte)",
      "Rod-pod Prologic Tri-Sky 4 posturi + avertizoare Prologic Cies",
      "Cleștele plantat Ridge Monkey + lanternă albastră Formax (vede fir fluo noaptea)",
    ],
    monturi: [
      "Plantat: ledcore 90 cm-1 m + clips plumb pierdut Carp Spirit + plumb 160 g + rig lung + con antitangle",
      "PVA: plumb 90 g (90 g e UȘOR pentru curent — testează cu mai greu dacă plouă)",
      "Rest stopper sub shrink tube — esențial când valurile scufundă firul",
    ],
    sfaturi: [
      "Sensibilitatea sonarului Deeper Quest: 70% (echilibru optim)",
      "Switch de la boilies la wafter bi-color cu kicker (Mr Dudy Bites) când nu mai mănâncă",
      "Crapii intră în stuf la drill — truc cu piatra (uneori funcționează), presiune cu fir gros",
    ],
  },
  {
    slug: "crap-sonar-garmin-mila23",
    specie: "crap",
    metoda: "static",
    titlu: "Localizare crap cu sonar Garmin pe canalele Mila 23",
    scurt: "NU PESCUI dacă nu vezi crap pe sonar. Migrație zilnică — astăzi pe cioată X, mâine pe Y.",
    perioada: "Martie - aprilie",
    pasi: [
      "Folosește sonar GARMIN GPSMAP 923 XSV (9 inch) cu Down + Side Imaging",
      "Identifică crapii după mărimea 'buburuzelor' pe Down — puncte mari = crap, mici = caras",
      "Aruncă LIPIT de cioată — 2 m mai departe NU trage",
      "Prinzi 2-4 crapi, restul fug — MUTĂ barca cu sonarul, găsește-i din nou",
    ],
    naluci: [],
    echipament: [
      "Barcă Mary Fisher 695 + sonar Garmin GPSMAP 923 XSV (preferat față de Finval/Humminbird/Lowrance)",
      "Lansete Trabucco Astore ISO Hunter 2.40 m / 250 g",
      "Mulinete Daiwa BG Black 6000",
      "Fir Shimano Technium Invistec 0.30 mm (primăvara) / 0.35 mm (vara)",
    ],
    monturi: [
      "Momitor Lazy Fish 40-130+ g",
      "Cârlig Carp Spirit nr. 6 primăvara / nr. 4 vara",
      "Forfac SCURT primăvara, LUNG vara",
      "Pe par: 2 boabe porumb la Cuc cu miere sau peletă 10 mm Feeder X cu spin",
      "Cârlig înfipt în momitor la lansare",
      "Cârlig cu varnish ghidant — direcționează în buza de jos",
    ],
    sfaturi: [
      "Migrație continuă — schimbă reperul pe cioată zilnic",
      "Pragul 3-4 m → șenal 16 m — variabil în funcție de cotă",
      "Pescuit la boilies + plumb pierdut ca vara NU funcționează primăvara — folosește momitor cu porumb",
      "O lansetă aruncată CONTRA curentului spre o cioată din amonte = invenție care a prins crap de 10 kg",
    ],
  },
  {
    slug: "somn-clonc-chilia",
    specie: "somn",
    metoda: "spinning",
    titlu: "Pescuit la CLONC pe Chilia",
    scurt: "Chemarea somnului prin lovirea apei cu instrument de lemn cu pastilă. Imită vibrația de hrănire.",
    perioada: "Vară",
    pasi: [
      "Scanare zonă fierbinte cu sonar live ('toană' = traseu somn)",
      "Ancorare în spatele structurii (cioată / groapă)",
      "Cloncănit RITMIC din DEGETE + ÎNCHEIETURĂ (NU din cot/forță)",
      "Conștient de nivelul apei față de pastilă — vânt/valuri rup ritmul",
      "Atac de JOS ÎN SUS — mandibula inferioară proeminentă",
    ],
    naluci: [],
    echipament: [
      "Sonar Lowrance HDS Pro 16 + sondă Active Target 2 (live sonar) — afișează silueta naturală a somnului",
      "Lansete: Ugly Stik Silurus Clonk 1.95 m / 80-200 g; MadCat Full Force vertical bait casting",
      "Mulinetă Penn Slammer 560",
      "Fir MadCat 0.40 mm (mai subțire = taie apa în curent)",
    ],
    monturi: [
      "Les 'țigaretă' MadCat 200 g (se scufundă, taie curentul)",
      "Fir înaintaș textil 100 kg",
      "Ancoră 4/0 BKK Viper (cu râme în masă) + cârlig 7/0 BKK ('păcălici', doar acoperit)",
      "Când peștii suspicioși: DOUĂ CÂRLIGE ÎN LINIE (somnul evită ancora dublă)",
      "Opritor MadCat sectionat pentru distanța plumb-cârlig: scurt = vibrație + atracție; lung 40-50 cm = pește suspicios",
      "Nod fără nod + nod simplu + varnish siliconic peste noduri = ținut linia rigidă cu tija",
    ],
    sfaturi: [
      "Pastile CONVEXE = pentru începători (intră ușor); concave/drepte = avansați (presiune pe încheietură)",
      "Dimensiuni pastilă: 36-38 mm la 6-10 m apă, 40-42 mm la 10-15 m, mai mari la >20 m",
      "Bătaie GRAVĂ (clonc mai înfundat) pentru apă mai adâncă → vibrație mai pătrunzătoare",
      "Cloncuri B.B. Clonc (manufactor Bogdan Munteanu) — modele TR și TNZ convexe pentru începători",
      "Teasere MadCat Adjust (caracatiță cu tentacule + bile) pentru vibrație suplimentară",
      "Râme în geantă termo MadCat + sac de rafie pentru umezeală — fluctuațiile de temp deteriorează",
      "Somn mare = atac FERM, fără joacă; somotei = se joacă cu râmele",
    ],
    citate: [
      "Somnul = ca pisica → urmărește când fugi, se oprește când te oprești",
    ],
  },
  {
    slug: "somn-stationar-chilia-veche",
    specie: "somn",
    metoda: "static",
    titlu: "Somn staționar la Chilia Veche cu vier de salcie",
    scurt: "Test concludent: vier de salcie + coropișniță = TOATE trăsăturile. Râme + mațe macrou = ZERO.",
    perioada: "Octombrie - noiembrie",
    pasi: [
      "Ancorează în apă 18 m pe un prag (între 16-17 m și 22 m)",
      "Dimineața: lansete pe pragul de 16-17 m (acolo sunt somnii)",
      "După ora 12: mută-te la pragul de 22 m (peștii migrează)",
      "Plumb culsant + cârlig mare + buchet de vier de salcie + coropișniță",
    ],
    naluci: [],
    echipament: [
      "Lansete MadCat Black Spin 2.40 m / 40-150 g (combo productiv)",
      "Mulinete Penn Slammer 560",
      "Fir MONO 0.40 mm Madcat — frecvență mai mare de trăsături decât textilul 0.40",
      "Lansete pentru somn mare pe groapă: Unichet 500-1000 g + Penn Slammer 560 + textil 0.40",
    ],
    monturi: [
      "Plumb culisant 200-300 g (300 g pe textil, 200 g pe mono)",
      "Cârlig mare — nemenționat număr exact",
      "Forfac din textil + fir principal mono (autorul a renunțat la textilul ca fir principal pe Chilia)",
    ],
    sfaturi: [
      "Vier de salcie + coropișniță cumpărate de la Tulcea, piață",
      "Vier de salcie CIUPEȘTE — bagă pe cârlig cu PATENT",
      "Râme negre + mațe de macrou = ZERO trăsături (testat în aceeași partidă)",
      "Pe pragul de 22 m există scoici tăietoare — risc rupere",
      "Mută barca după pește — la ora 12 prinde la altă adâncime",
    ],
    citate: [
      "Cea mai bună momeală pentru somn = coropișniță cu vierme de salcie",
    ],
  }
);

export function getTehnica(slug: string) {
  return tehnici.find((t) => t.slug === slug);
}

export function tehniciDeSpecie(specie: Tehnica["specie"]) {
  return tehnici.filter((t) => t.specie === specie);
}
