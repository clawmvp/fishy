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
];

export const categorii = [
  { id: "tehnica", nume: "Tehnici", desc: "Animații, abordări, principii de pescuit" },
  { id: "montura", nume: "Monturi", desc: "Termeni pentru asamblarea liniei de pescuit" },
  { id: "echipament", nume: "Echipament", desc: "Lansete, mulinete, fire, cârlige" },
  { id: "pesti", nume: "Pești", desc: "Speciile țintă și subtipuri" },
  { id: "locuri", nume: "Locuri", desc: "Brațe, canale, repere geografice" },
  { id: "general", nume: "General", desc: "Termeni transversali din pescuit" },
] as const;
