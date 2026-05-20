export type Termen = {
  termen: string;
  categorie: "tehnica" | "montura" | "echipament" | "pesti" | "locuri" | "general";
  definitie: string;
  exemplu?: string;
};

export const glosar: Termen[] = [
  // TEHNICI
  { termen: "Jigging", categorie: "tehnica", definitie: "Tehnică de spinning cu jighead și gumă, în care nălucul cade până la fund, e ridicat, lăsat să cadă din nou — atacurile vin pe pauza de cădere.", exemplu: "Jigging la șalău pe primul prag de mal." },
  { termen: "Twitching", categorie: "tehnica", definitie: "Animație nervoasă a voblerului cu vârful lansetei — scurte smucituri urmate de pauze. Imită un peștișor speriat sau rănit." },
  { termen: "Jerking / Jerkbait", categorie: "tehnica", definitie: "Animație cu jerkuri mari ale lansetei pentru voblere fără barbetă (jerkbaits). Pauzele lungi sunt critice." },
  { termen: "Topwater", categorie: "tehnica", definitie: "Năluci care lucrează la suprafața apei — popper, walking bait, prop bait, chopper. Atacuri spectaculoase, dar răbdare la înțepare." },
  { termen: "Walk-the-dog", categorie: "tehnica", definitie: "Animație topwater în zigzag stânga-dreapta. Imită un pește pe suprafață." },
  { termen: "Vânat vizual", categorie: "tehnica", definitie: "Identifici peștele activ (sărituri, fierberi) și lansezi DIRECT în zonă, nu pescuiești orb. Standard pentru avat." },
  { termen: "Nadire descrescătoare", categorie: "tehnica", definitie: "Strategie pentru partide lungi: nadă masivă în primele zile (10-13 kg/seară), scădere graduală până la 20 boilies/lansetă în ultimele zile. Crapul devine dependent." },
  { termen: "Spotare", categorie: "tehnica", definitie: "Identificarea locului productiv — cu sonar, dipper, sau marcare cu balon. Esențial înainte de orice lansetă." },
  { termen: "Line bite", categorie: "tehnica", definitie: "Trăsătură falsă — peștele se plimbă printre fire fără să muște. Sezon rece, primăvara, semn că peștii sunt în zonă dar nu se hrănesc." },

  // MONTURI
  { termen: "Hairrig (fir de păr)", categorie: "montura", definitie: "Boilie sau bait legat DEASUPRA cârligului pe un fir scurt — nu pe cârlig direct. Crapul ia bila, simte cârligul, se înțepă singur la auto-înțepare." },
  { termen: "In-line", categorie: "montura", definitie: "Plumb cu canal interior prin care trece firul principal. Centrat pe leader. Standard pentru pescuit static pe curent." },
  { termen: "Plumb pierdut", categorie: "montura", definitie: "Montura în care plumbul cade liber la rupere/agățare — peștele rămâne pe fir fără greutatea care să-l proptiească în structuri. Critic pe cioate / pietre." },
  { termen: "Lead clip", categorie: "montura", definitie: "Clip de plastic în care plumbul intră — la trăsătură puternică plumbul iese, eliberează peștele." },
  { termen: "Helicopter rig", categorie: "montura", definitie: "Forfac liber pe firul principal, deasupra plumbului — se rotește la lansare ca o elice. Pentru distanțe mari fără încurcături." },
  { termen: "Method feeder / Momitor", categorie: "montura", definitie: "Coșuleț de plumb pe care se presează nada — în jurul cârligului. Eliberează nada exact unde e cârligul. Stil 'method' italian." },
  { termen: "Shock leader", categorie: "montura", definitie: "Fir gros (0.50-0.80 mm) de 10-15 m între firul principal și plumb — absoarbe șocul lansării grele și protejează la frecare pe pietre / scoică." },
  { termen: "Leader / Forfac", categorie: "montura", definitie: "Bucata de fir între firul principal (sau swivel) și cârlig. Lungimi tipice 25-40 cm pentru crap." },
  { termen: "Leadcore", categorie: "montura", definitie: "Fir împletit cu miez de plumb — se așază pe fund, ascunde firul la baza monturii. 0.5-1 m lungime tipică." },
  { termen: "Snowman", categorie: "montura", definitie: "Combo de boilie tare + pop-up pe același fir de păr. Pop-up-ul ridică ușor boilia tare — prezentare 'om de zăpadă'." },
  { termen: "Anti-tangle sleeve", categorie: "montura", definitie: "Tub de cauciuc moale între forfac și swivel — previne încurcarea la lansare." },
  { termen: "Dublu lagăr", categorie: "montura", definitie: "Vârtej cu rulment dublu — nu se înțepenește pe curent puternic. OBLIGATORIU pe Dunăre după Vișoianu." },

  // ECHIPAMENT
  { termen: "Big pit", categorie: "echipament", definitie: "Mulinetă cu tambur foarte mare (8000-10000+) pentru lansări lungi — capacitate 400-500+ m de fir." },
  { termen: "Baitrunner", categorie: "echipament", definitie: "Sistem cu două frâne pe mulinetă — una principală + una secundară 'liberă' care permite peștelui să tragă fără rezistență până anulezi cu manivela." },
  { termen: "Wide gape", categorie: "echipament", definitie: "Cârlig cu deschidere largă între tijă și vârf — ține mai sigur peștele, mai greu de scuipat. Standard pentru hairrig." },
  { termen: "Kamakura", categorie: "echipament", definitie: "Tehnologie de ascuțire a vârfului cârligului — extrem de ascuțit, înțeapă la cel mai mic contact." },
  { termen: "Power Pro / Sufix / Berkley X9", categorie: "echipament", definitie: "Fire împletite premium — diametre mici, rezistență mare, sensibilitate excelentă pentru spinning." },

  // PESTI
  { termen: "Știucă", categorie: "pesti", definitie: "Esox lucius. Răpitor de top în apele românești. Bătaia în februarie-martie. Trofeu local 5-10 kg, exemplare 90+ cm." },
  { termen: "Șalău", categorie: "pesti", definitie: "Sander lucioperca. Răpitor de adâncime, preferă apa rece. Stă pe praguri lângă mal. Verdele = culoarea favorită la gume." },
  { termen: "Avat", categorie: "pesti", definitie: "Aspius aspius. Răpitor de suprafață rapid, atacă în bancuri de pești mici. Vânat vizual matinal pe Dunăre." },
  { termen: "Biban", categorie: "pesti", definitie: "Perca fluviatilis. Răpitor mic, atacă orice nălucă mică. Pescuit ușor, ideal pentru ucenicie spinning." },
  { termen: "Crap comun (de Dunăre)", categorie: "pesti", definitie: "Cyprinus carpio. Alungit, alergător, viață lentă — 10 kg = 50 ani. Capturat de pescari profesioniști pe Sulina / Chilia." },
  { termen: "Ciortan", categorie: "pesti", definitie: "Crap tânăr (1-3 kg). 'Albitura' în jargonul pescarilor — mănâncă nada destinată crapilor mari. Limita legală 40 cm fără coadă." },
  { termen: "Plătică", categorie: "pesti", definitie: "Pește alb, dăunător pentru pescuit la crap (mănâncă boilies solubile rapid)." },
  { termen: "Caras", categorie: "pesti", definitie: "Pește alb, foarte agresiv pe nada de crap. Distruge boilies solubile pe canale." },

  // LOCURI
  { termen: "Brațul Chilia", categorie: "locuri", definitie: "Brațul nordic al Deltei, frontiera cu Ucraina. Apă adâncă cu cioate. Vară-toamnă = crap mare." },
  { termen: "Brațul Sulina", categorie: "locuri", definitie: "Brațul navigabil. Trafic intens — 'autostradă'. Pietre + scoică la mal, dificil de pe mal." },
  { termen: "Brațul Sfântu Gheorghe", categorie: "locuri", definitie: "Brațul sudic. Apă adâncă cu cioate, tradițional pentru pești mari (record cunoscut 27 kg)." },
  { termen: "Dunărea Veche", categorie: "locuri", definitie: "Brațul vechi între Mila 23 și Crișan. Apă <7 m. Loc istoric pentru crapi capitali — vezi strategia Vișoianu." },
  { termen: "Mila 23", categorie: "locuri", definitie: "Sat în Deltă, hub pentru pensiuni (Gigant Fish, etc.). Acces la canale interioare și Dunărea Veche." },
  { termen: "Crișan", categorie: "locuri", definitie: "Localitate pe brațul Sulina, lângă hotelul Lebăda. Punct de plecare pentru canalul Îngusta." },
  { termen: "Periprava", categorie: "locuri", definitie: "Sat în nordul Deltei, pe brațul Chilia. Cunoscut pentru pescuit crap cu Marian Mincu." },
  { termen: "Cotă Tulcea", categorie: "locuri", definitie: "Înălțimea apei Dunării la Tulcea, în cm. 150-200 = optim crap pe canale. Sub 45 = doar ciortani." },

  // GENERAL
  { termen: "Burfood", categorie: "general", definitie: "Boilie cu compoziție 'birdfood' — semințe, cereale, ingrediente naturale. Mai puțin agresiv ca fishmeal, atrage progresiv." },
  { termen: "Fishmeal", categorie: "general", definitie: "Boilie cu făină de pește. Foarte atractiv, creează 'dependență' în câteva zile. Recomandat pentru partide lungi." },
  { termen: "Pop-up", categorie: "general", definitie: "Boilie flotantă — stă deasupra fundului. Marker vizual, ușor de absorbit." },
  { termen: "Wafter", categorie: "general", definitie: "Boilie neutră — nici nu se scufundă, nici nu plutește. Imită mai bine o boilia naturală în gura crapului." },
  { termen: "Dumbbell", categorie: "general", definitie: "Boilie în formă de gantere mici, mai aerodinamică. 10 mm = randament excelent pre-prohibiție." },
  { termen: "Spod / Cobra / Praștie", categorie: "general", definitie: "Unelte pentru nadire la distanță — spod = rachetă plutitoare, cobra = aruncător manual lung, praștie = simplă dar precisă pe distanțe medii." },
  { termen: "Sticking ball", categorie: "general", definitie: "Bilă de nadă comprimată cu boilies înăuntru — se desface lent pe substrat." },
  { termen: "Drill", categorie: "general", definitie: "Lupta cu peștele de la cârlig până la minciog. Drill prost = pește pierdut." },
  { termen: "Prohibiție", categorie: "general", definitie: "Perioada legală în care pescuitul răpitorilor (sau crapului) este interzis pentru depunere. România: ~24 aprilie - 24 mai pentru majoritatea speciilor; variabil pe zone." },
  { termen: "Sondaj cu dipper", categorie: "general", definitie: "Dispozitiv portabil pentru măsurat adâncimea + temperatura — alternativă la sonar." },

  // === TERMENI NOI BATCH 2 ===
  { termen: "Clonc / Cloncănit", categorie: "tehnica", definitie: "Tehnică de chemare a somnului — un instrument de lemn cu pastilă lovește apa, creând o vibrație care imită hrănirea / împerecherea. Pastila concavă, convexă sau dreaptă; mișcarea din degete + încheietură." },
  { termen: "Pastilă de clonc", categorie: "echipament", definitie: "Capul de lemn al cloncului. Convex pentru începători (intră ușor în apă), concav sau drept pentru avansați. Dimensiuni: 36-38 mm la 6-10 m apă, 40-42 mm la 10-15 m, mai mari peste 20 m." },
  { termen: "Păcălici (la somn)", categorie: "montura", definitie: "Cârligul de jos pe montura de clonc (7/0), doar acoperit cu râmă (NU înfundat). Ancora 4/0 BKK ține masa de râme; păcăliciul = surpriză când somnul pune gura." },
  { termen: "Teaser", categorie: "echipament", definitie: "Atractor mecanic — caracatiță cu tentacule + bile (MadCat Adjust) care vibrează pe lângă cârlig pentru somn suspicios." },
  { termen: "Live sonar / Active Target", categorie: "echipament", definitie: "Sonar care arată peștele și năluca în TIMP REAL pe o linie de imagine (Lowrance Active Target, Garmin LiveScope). Vezi cum se apropie peștele de cârlig. Vs 2D care comprimă și arată acolade." },
  { termen: "Down Imaging / Side Imaging", categorie: "echipament", definitie: "Tehnologii sonar — Down vede direct sub barcă (substrat detaliu), Side vede lateral pe 50-100 m. Crapii apar ca 'buburuze' pe Down — mari = crap, mici = caras / roșioare." },
  { termen: "Navomodel", categorie: "echipament", definitie: "Bărcuță telecomandată care plantează momeli + monturi pe puncte salvate. Deeper Quest are sonar integrat + rază 400 m + auto-pilot. Pentru poziționare precisă pe structuri, nu doar distanță maximă." },
  { termen: "PVA (pungă PVA)", categorie: "montura", definitie: "Pungă solubilă în apă care conține boilies/pelete în jurul cârligului. La contactul cu apa, pungă se dizolvă și creează nucleu de momeală. Plumb minim 90 g (mai gros pe curent)." },
  { termen: "Wafter", categorie: "general", definitie: "Boilie neutră (NICI nu plutește, NICI nu se scufundă). Imită mai natural o boilie naturală în gura crapului. Variantele MOI ('minciunele' GDA) — 8-15 mm — pentru pești apatici iarna." },
  { termen: "Minciunele", categorie: "general", definitie: "Wafter foarte moi (GDA Fishing) — 8 mm și 15 mm. Mecanism: peștele apatic nu mănâncă din foame, ci din CURIOZITATE pe dâra de nadă. Se ridică ele singure fără să ridice cârligul." },
  { termen: "Cireașa pe tort", categorie: "general", definitie: "Tehnica de a băga peletul/dumble SUPERFICIAL deasupra cârligului în nada momitorului — NU îngropat. Atrage peștele să mănânce ce e la suprafață mai întâi." },
  { termen: "Epi (dig de piatră)", categorie: "locuri", definitie: "Dig de piatră perpendicular pe mal — construit pentru a controla colmatarea sau pentru cărărea șenalului. Pe Sulina între Gorgova-Crișan, anaforul din spatele epiului = avat 45-50 cm noiembrie." },
  { termen: "Dâră de nadă", categorie: "tehnica", definitie: "Curentul de apă duce particulele de nadă în aval de momitor — peștele găsește cârligul pe dâră. Pescuitul CONTRA curentului = dâra perfectă (momitorul stă, particulele curg)." },
  { termen: "Toană (la somn)", categorie: "locuri", definitie: "Traseul somnului — succesiune de gropi, pomi scufundați, praguri pe care somnul le frecventează regulat. Scanezi cu sonar până găsești 'toană' fierbinte, ancorezi, cloncuieși." },
  { termen: "Vier de salcie", categorie: "general", definitie: "Larvă albă de gândac din scoarța sălciilor. Cea mai bună momeală pentru somn (testat vs râme + mațe macrou = câștigă clar). Cumpărat de la Tulcea (piață). CIUPEȘTE — bagă cu PATENT pe cârlig." },
  { termen: "Coropișniță", categorie: "general", definitie: "Insectă subterană (Gryllotalpa) — momeală excelentă pentru somn, combinată cu vier de salcie. Tulcea, piață." },
  { termen: "Spomb", categorie: "echipament", definitie: "Rachetă plutitoare pentru nadă — se aruncă cu lanseta la distanță, se deschide pe apă și eliberează nada. Folosit pe lacuri mari (ex: Corbu)." },
  { termen: "Som / Somn", categorie: "pesti", definitie: "Silurus glanis. Cel mai mare răpitor european. Atacă de jos în sus (mandibula inferioară proeminentă). Aude prin vezica înotătoare ca prin difuzor. Pescuit cu clonc (chemare prin vibrație) sau staționar." },
  { termen: "Cotă Tulcea", categorie: "locuri", definitie: "Înălțimea apei Dunării la Tulcea. Clasificare Vișoianu: 150-200 = optim crap pe canale; sub 45 = doar ciortani; 270-300 = ape mari, crapul în lacuri; pe Iacub 150-170 cotă ideală." },
  { termen: "Rest stopper", categorie: "montura", definitie: "Opritor de cauciuc sub shrink tube pe linia principală. Esențial când vântul + valurile scufundă firul, pentru a evita ca plumbul să cadă cu totul." },
  { termen: "Vezica înotătoare", categorie: "pesti", definitie: "Organ al peștelui care servește la flotabilitate + AMPLIFICARE A SUNETULUI ca o membrană de difuzor. De aceea crapul + somnul aud foarte bine vibrații (spomb, motor, atv pe mal)." },
];

export const categorii = [
  { id: "tehnica", nume: "Tehnici", desc: "Animații, abordări, principii de pescuit" },
  { id: "montura", nume: "Monturi", desc: "Termeni pentru asamblarea liniei de pescuit" },
  { id: "echipament", nume: "Echipament", desc: "Lansete, mulinete, fire, cârlige" },
  { id: "pesti", nume: "Pești", desc: "Speciile țintă și subtipuri" },
  { id: "locuri", nume: "Locuri", desc: "Brațe, canale, repere geografice" },
  { id: "general", nume: "General", desc: "Termeni transversali din pescuit" },
] as const;
