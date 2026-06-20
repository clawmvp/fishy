export type Loc = {
  slug: string;
  nume: string;
  tip: "brat" | "canal" | "lac" | "rau" | "balastiera";
  // regiune: "delta" = Delta Dunării propriu-zisă; "dunare-larga" = Dunărea în afara Deltei; "interior" = alte ape (referință)
  regiune?: "delta" | "dunare-larga" | "interior";
  scurt: string;
  sezon: string[];
  specii: Array<"crap" | "stiuca" | "salau" | "avat" | "biban" | "somn" | "caras">;
  caracteristici: string[];
  pericole: string[];
  sfaturi: string[];
  sursa: string[];
  // Profile pentru recomandare inteligentă
  adapostitDeVant?: boolean; // canal/braț îngust cu maluri înalte = bun pe vânt mare
  preferaCotaMica?: boolean; // funcționează când cota < 100
  preferaCotaMare?: boolean; // funcționează când cota > 200 (peștii în lacuri)
};

export const locuri: Loc[] = [
  {
    slug: "bratul-chilia",
    nume: "Brațul Chilia",
    tip: "brat",
    regiune: "delta",
    preferaCotaMica: true,
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
    regiune: "delta",
    preferaCotaMica: true,
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
    regiune: "delta",
    preferaCotaMica: true,
    scurt: "Brațul sudic, apă adâncă 10-14 m cu cioate. Tradițional pentru pești mari — record cunoscut 27 kg.",
    sezon: ["iunie", "iulie", "august", "septembrie"],
    specii: ["crap", "somn"],
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
    regiune: "delta",
    adapostitDeVant: true,
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
    regiune: "delta",
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
    regiune: "delta",
    adapostitDeVant: true,
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
    regiune: "delta",
    adapostitDeVant: true,
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
    regiune: "delta",
    adapostitDeVant: true,
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
    regiune: "interior",
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
    regiune: "interior",
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
    regiune: "interior",
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
    regiune: "interior",
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
    regiune: "dunare-larga",
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
    regiune: "delta",
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
  // === INSIGHTS GDA 2026 (auto-extras din transcripts) ===
  {
    slug: "canalul-sontea",
    nume: "Canalul Șontea (Delta Dunării)",
    tip: "canal",
    regiune: "delta",
    scurt: "Canal din Delta Dunării unde crapul se mișcă pe substrat aproape de stuf, ieșind din vegetație pentru hrănire.",
    sezon: ["martie", "aprilie", "mai", "iunie", "iulie", "august"],
    specii: ["crap"],
    caracteristici: [
      "Peștele nu stă în mijlocul canalului, ci aproape de stuf",
      "Se deplasează pe substrat, rar urcă în coloana de apă",
      "Iese din stuf pentru hrănire — montaj aproape de marginea stufului",
      "Necesită ancorare la barcă în buclele canalului",
      "Activitate bună dimineața până la ora 14:00, după care se taie trăsăturile"
    ],
    pericole: [
      "Cu apă crescută vine multă iarbă pe fir — pescuit dificil",
      "Stuf dens pe maluri — risc de agățare la lansare"
    ],
    sfaturi: [
      "Lansează montajul aproape de marginea stufului",
      "Ancorează barca în buclele canalului pentru poziționare stabilă",
      "Pescuiește prioritar dimineața până la ora 14:00"
    ],
    sursa: ["HLjnRrY_ijU"],
    adapostitDeVant: true,
    preferaCotaMica: true,
  },
  {
    slug: "bratul-sulina-mila-8",
    nume: "Brațul Sulina — Mila 8 (prag adânc)",
    tip: "brat",
    regiune: "delta",
    scurt: "Sector pe Sulina cu adâncime ~12 m, plan B când canalele și zonele de 3-5 m nu produc.",
    sezon: ["septembrie", "octombrie", "noiembrie", "decembrie", "ianuarie", "februarie"],
    specii: ["crap"],
    caracteristici: [
      "Adâncime de pescuit ~12 m",
      "Se pescuiește pe plumb pierdut, minim 3 lansete",
      "Bilă direct la cârlig (fără momitor) datorită adâncimii",
      "Loc deja înădit recurent",
      "Recomandat când peștele dispare de pe canalele înconjurătoare"
    ],
    pericole: [
      "Adâncime mare îngreunează recuperarea peștelui",
      "Trafic naval pe Sulina"
    ],
    sfaturi: [
      "Folosește plumb pierdut pentru a evita pierderea montajului",
      "Pune bila direct la cârlig fără momitor la adâncimea mare",
      "Tratează locul ca plan B când zonele de 3-5 m nu produc"
    ],
    sursa: ["PFwNriYmmk4"],
    preferaCotaMare: true,
  },
  {
    slug: "bratul-sulina-mal-maliuc",
    nume: "Brațul Sulina — mal Maliuc (dig de piatră)",
    tip: "brat",
    regiune: "delta",
    scurt: "Pescuit de pe mal pe brațul Sulina în zona Maliuc, unde digul artificial de piatră creează profil specific cu praguri.",
    sezon: ["iunie", "iulie", "august"],
    specii: ["crap"],
    caracteristici: [
      "Profil: mal → prag descendent până la 2.5-3.5m → platou de 5-15m lățime la 3m adâncime → al doilea prag până la 10-13m",
      "Pe platoul de 3m se pot scoate peștii (1-2 kg)",
      "Pe buza coborârii spre pragul al doilea se prind pești mai mari (3-4 kg)",
      "Dig artificial de piatră creează structura pragurilor",
      "Pietrele de pe fund zdrelesc firul"
    ],
    pericole: [
      "Pe pragul adânc de 12m se taie firul în pietre la drill",
      "Plumbul se blochează frecvent printre pietre",
      "Fir vizibil zdrelit după fiecare lansare"
    ],
    sfaturi: [
      "Folosește fir cămășuit la rig pentru a rezista la pietre",
      "Plumb pierdut obligatoriu pentru a elibera blocajele",
      "Pescuiește pe buza coborârii pentru exemplarele mari",
      "Evită pragul adânc de 12m — pierzi peștii în pietre"
    ],
    sursa: ["PZOJbG8e92I"],
  },
  {
    slug: "canal-tranzit-crisan-dunarea-veche",
    nume: "Canal de tranzit lângă Crișan (Dunărea Veche)",
    tip: "canal",
    regiune: "delta",
    scurt: "Canal de legătură între un lac și Dunărea principală, aproape de Crișan/Dunărea Veche, productiv pentru crap în noiembrie când apa este în scădere.",
    sezon: ["septembrie", "octombrie", "noiembrie"],
    specii: ["crap"],
    caracteristici: [
      "Canal de tranzit între lac și Dunăre — peștele circulă activ prin el",
      "Funcționează cel mai bine când apa este în scădere",
      "Curent suficient cât să justifice momitor + fir textil subțire 0.14-0.15",
      "Trăsături rapide (sub 15-20 min) dacă peștele e prezent",
      "Pescuit din barcă posibil până spre sfârșit de noiembrie (apă 8-13°C ziua)"
    ],
    pericole: [
      "Cioate prezente — risc de pierdere a peștelui în lemn",
      "Temperaturi scăzute în noiembrie"
    ],
    sfaturi: [
      "Pescuiește când cota este în scădere (migrație din lac spre Dunăre)",
      "Folosește fir textil subțire 0.14-0.15 cu momitor",
      "Forțează peștele spre larg după înțepare pentru a evita cioatele"
    ],
    sursa: ["TpVCnpZiC5o"],
    preferaCotaMica: true,
  },
  {
    slug: "canalul-litcov-cioate",
    nume: "Canalul Litcov — cioate decembrie",
    tip: "canal",
    regiune: "delta",
    scurt: "Canal din Deltă unde crapul și carasul se cantonează în cioate adânci în decembrie, cu peștele băgat efectiv în lemn.",
    sezon: ["decembrie", "ianuarie", "februarie"],
    specii: ["crap", "caras"],
    caracteristici: [
      "Crapul stă cantonat în cioate, nu se plimbă",
      "Carasul stă la un loc cu crapul în decembrie",
      "Curent puternic în canal",
      "Peștii ies din cioată pe șenal și se întorc — mișcări scurte",
      "Necesită ancorare cu botul bărcii în cioată"
    ],
    pericole: [
      "Mizerie/frunze tocate pe fir — necesită curățare frecventă",
      "Risc mare de agățare în cioate"
    ],
    sfaturi: [
      "Aruncă fix în lemn, nu plimba momeala",
      "Folosește fir 0.35 mm (nu 0.13 textil, nu 0.55 mono)",
      "Curăță firele la fiecare 40 minute",
      "Ancorează cu botul bărcii direct în cioată"
    ],
    sursa: ["VkkAhdBEtaE"],
  },
  {
    slug: "canalul-ingusta-plop-cazut",
    nume: "Canalul Îngusta — cioate cu plop căzut",
    tip: "canal",
    regiune: "delta",
    scurt: "Sector pe Îngusta cu plop răsturnat de pe mal și cioată secundară pe mijlocul canalului, unde peștele face naveta între cele două agățături.",
    sezon: ["decembrie", "ianuarie", "februarie"],
    specii: ["crap"],
    caracteristici: [
      "Plop căzut pe mal creează cioată până spre mijlocul șenalului",
      "Peștele face naveta între cioata de mal și cea din șenal",
      "Densitate mare de pește vizibilă pe sonar live",
      "Comportament iarnă: pește cu capul în jos pe substrat, fără hrănire activă",
      "Posibil 2-3 zile fără trăsături urmate de explozie pe ziua 3-4"
    ],
    pericole: [
      "Două zone majore de agățare (plop și cioată centrală)",
      "Pește apatic — risc de pescuit lung fără rezultat"
    ],
    sfaturi: [
      "Verifică zona cu sonar live înainte de lansare",
      "Plasează montajul pe ruta de navetă între cele două cioate",
      "Insistă 3-4 zile pe același loc — explozia vine întârziat"
    ],
    sursa: ["VkkAhdBEtaE"],
  },
  {
    slug: "bratul-chilia-tatanir-prag-vertical",
    nume: "Brațul Chilia — zona Tatanir, prag vertical 8-11m",
    tip: "brat",
    regiune: "delta",
    scurt: "Zonă pe Chilia aproape de Tatanir cu un prag aproape vertical de la 8 la 11 metri, productiv pentru crap mare.",
    sezon: ["iunie", "iulie", "august"],
    specii: ["crap"],
    caracteristici: [
      "Prag aproape vertical de la 8m la 11m",
      "Crap mare cantonat pe prag",
      "Activitate intensă în mijlocul zilei (12:30-19:00)",
      "Se folosesc bile 24-32mm pentru pește mare",
      "Există agățături (crengi) direct pe prag"
    ],
    pericole: [
      "Agățături pe prag — se verifică cu sonarul înainte",
      "Greu de ancorat larg pe vânt tare",
      "Plumbul se agață frecvent când nu ai trăsătură"
    ],
    sfaturi: [
      "Scanează pragul cu sonarul înainte de poziționare",
      "Folosește bile 24-32mm pentru selectarea exemplarelor mari",
      "Pescuiește prioritar între 12:30 și 19:00"
    ],
    sursa: ["WgqDiw13peo"],
  },
  {
    slug: "bratul-chilia-bifurcatie-canal-36",
    nume: "Brațul Chilia — bifurcația spre Canal 36 (frontiera ucraineană)",
    tip: "brat",
    regiune: "delta",
    scurt: "Punctul unde Chilia se bifurcă — stânga e Ucraina, dreapta e România; obligatoriu să ții malul drept.",
    sezon: ["martie", "aprilie", "mai", "iunie", "iulie", "august", "septembrie", "octombrie", "noiembrie"],
    specii: ["crap"],
    caracteristici: [
      "Bifurcație pe Chilia: stânga = Ucraina, dreapta = România",
      "Ieșirea pe Canalul 36 trece prin zona de frontieră",
      "Zonă supravegheată de Poliția de Frontieră",
      "Polițiștii de frontieră sunt cooperanți dacă te anunți"
    ],
    pericole: [
      "Trecere accidentală în apele ucrainene dacă mergi pe stânga",
      "Probleme legale serioase la încălcare frontieră"
    ],
    sfaturi: [
      "Oprește obligatoriu la Poliția de Frontieră pentru a anunța traseul",
      "Ține mereu malul din DREAPTA la bifurcație",
      "Verifică actele înainte de plecare pe brațul Chilia"
    ],
    sursa: ["WgqDiw13peo"],
  },
  {
    slug: "bratul-chilia-obrize-varsare",
    nume: "Brațul Chilia — zona Obrize (vărsare)",
    tip: "brat",
    regiune: "delta",
    scurt: "Zona de vărsare a Chiliei spre Obrize, cu cioate și locuri de campare pe mal.",
    sezon: ["iunie", "iulie", "august"],
    specii: ["crap"],
    caracteristici: [
      "Bune locuri de campare pe mal pentru sesiuni multi-day",
      "Cioate prezente — necesită ancorare corectă",
      "Zonă cu presiune de pescari",
      "Pragul trebuie verificat cu sondă înainte"
    ],
    pericole: [
      "Ancorare proastă dacă scrii în spatele cioatei",
      "Aglomerație — risc de conflicte cu alți pescari"
    ],
    sfaturi: [
      "Sondează pragul înainte de a te poziționa",
      "Respectă locurile altor pescari",
      "Verifică unghiul de ancorare față de cioate"
    ],
    sursa: ["WgqDiw13peo"],
  },
  {
    slug: "canal-lopatna-boda-proste-fortuna",
    nume: "Canal Delta lângă Lopatna / Boda Proste / Lacul Fortuna",
    tip: "canal",
    regiune: "delta",
    scurt: "Canal cu cioate dense în Delta, zonă unde crapul are culoar fix de trecere pe lângă stuf și cioată, pescuit înainte de prohibiție.",
    sezon: ["martie", "aprilie", "mai"],
    specii: ["crap"],
    caracteristici: [
      "Crapul trece pe un culoar bine definit între stuf și cioată",
      "Cioata în fața bărcii forțează peștele să treacă prin spate",
      "Apa curată permite vizualizarea peștilor săritori",
      "Vremea schimbătoare (ploaie + grindină + soare) — activitate intensă după ploaie",
      "Crapul mușcă în special după furtună / grindină"
    ],
    pericole: [
      "Cioate dense — risc de agățare și pierdere pește",
      "Vreme schimbătoare cu grindină primăvara"
    ],
    sfaturi: [
      "Lansează din mână pe sub mână în spatele bărcii, pe culoar",
      "Pescuiește activ după trecerea furtunii sau grindinii",
      "Observă peștii săritori pentru a identifica zona activă"
    ],
    sursa: ["kjrGXYKOnH0"],
  },
  {
    slug: "bratul-sulina-epiuri-crisan",
    nume: "Brațul Sulina — Epi-uri zona Crișan",
    tip: "brat",
    regiune: "delta",
    scurt: "Zonă pe Sulina cu epi-uri (pereți artificiali anti-colmatare) între cioate, productivă la sfârșit de octombrie - început de noiembrie.",
    sezon: ["octombrie", "noiembrie"],
    specii: ["crap", "caras"],
    caracteristici: [
      "Pescuit la baza epiului (perete artificial în apă)",
      "Cioate dense în stânga și dreapta poziției",
      "Adâncimi mari (peste 7m) productive pentru crapi mari",
      "Pe prag în josul curentului vine peștele activ",
      "Lansare pe larg cu bile semisolubile 24mm aduce crapi de bancuri"
    ],
    pericole: [
      "Cioate dense pe ambele laturi — risc de agățare",
      "Curent puternic lângă epi"
    ],
    sfaturi: [
      "Pescuiește CONTRA curentului — strategie neconvențională care dă roade",
      "Folosește bile semisolubile 24mm la lansare pe larg",
      "Plasează o lansetă la intercepție pe pragul din josul curentului"
    ],
    sursa: ["o48pxAziGeY"],
  }
];

// Locuri noi adăugate din batch 2 (28 videouri analizate)
locuri.push(
  {
    slug: "canalul-iacub",
    nume: "Canalul Iacub",
    tip: "canal",
    regiune: "delta",
    adapostitDeVant: true,
    scurt: "Singurul canal izolat din zona Sf. Gheorghe / Uzlina cu palmares de crapi 10-15+ kg primăvara. Necesită condiții stricte.",
    sezon: ["martie", "aprilie", "mai"],
    specii: ["crap"],
    caracteristici: [
      "Canal de legătură între Dunăre și lacul Iacub",
      "Apă tipic 6-7°C primăvara devreme; ideal >8°C",
      "Trafic redus de bărci (mult mai liniștit ca Litcov/Tătaru)",
      "Acces din Dunavățu de Jos prin Pensiunea Timona (Nelu)",
    ],
    pericole: [
      "Braconaj puternic cu curent electric",
      "Cotă Tulcea peste 200 = apă murdară de la Dunăre intră în lac, crapii nu ies",
      "Frunze căzute pe fire (toamna), păienjeni pe mal",
    ],
    sfaturi: [
      "Cotă optimă Tulcea: 150-170 (NU 240+)",
      "Apă minimum 8°C — sub asta peștii nu sunt activi",
      "Curent canal↔lac echilibrat = cheia (curentul invers e cel productiv)",
      "Stopper Leucoplast / bandă izolieră la 40-50 cm deasupra plumbului — frunze căzute se opresc acolo, nu alunecă pe forfac (pont Costel Velicu)",
    ],
    sursa: ["AMB17xHU8YE"],
  },
  {
    slug: "lacul-corbu",
    nume: "Lacul Corbu",
    tip: "lac",
    regiune: "interior",
    scurt: "Lac mare cu crapi 17-21 kg foarte nervoși ('șui', alungiți). Tehnică PVA + plantare cu navomodel. Substrat nisipos-mâlos.",
    sezon: ["iunie", "iulie", "august"],
    specii: ["crap"],
    caracteristici: [
      "Mal cu stuf / peninsule, substrat nisipos-mâlos",
      "Crapi 'șui' — alungiți, foarte nervoși la drill, intră în stuf",
      "Vânt frecvent puternic cu valuri",
      "Crapii vin în VALURI — nu liniar",
    ],
    pericole: [
      "Peștii intră în stufăriș la drill — pierderi frecvente",
      "Vânt puternic scufundă firul cu rest stopper sub shrink tube",
    ],
    sfaturi: [
      "VERSUS: 2 lansete PVA la 95-110 m + 2 lansete plantate cu navomodel Deeper Quest",
      "Întreținere zonă cu spomb la fiecare oră (2 mâini boilies + porumb + spărtură alună + pelete)",
      "Switch de la boilies la wafter bi-color cu kicker când nu mai mănâncă (Mr. Dudy Bites)",
      "Repoziționare lansete la 2-3 ore fără trăsături",
    ],
    sursa: ["UrrliATUh9o"],
  },
  {
    slug: "canalul-litcov",
    nume: "Canalul Litcov",
    tip: "canal",
    regiune: "delta",
    adapostitDeVant: true,
    scurt: "Canal primit din lacurile Isac/Isăcel + Sf. Gheorghe — apă mai caldă și curată ca pe Îngusta. Critic iarna.",
    sezon: ["noiembrie", "decembrie"],
    specii: ["crap"],
    caracteristici: [
      "Apă vine din lacuri interioare = mai caldă și mai curată decât pe Îngusta",
      "Iarna face diferența vitală — același sezon dă 7-8 kg vs 0 pe Îngusta",
      "Cioate scufundate care adăpostesc crapii apatici",
    ],
    pericole: [
      "Mizerie / frunze tocate pe fire (decembrie)",
      "Pești cantonați dar nu mereu se hrănesc",
    ],
    sfaturi: [
      "Pe iarnă, alege Litcov FAȚĂ DE Îngusta (apa mai caldă din lacuri)",
      "Vorbește cu localnici — Luci, Mihai Manea, Costeluș — pentru info zilnice",
      "Pescuit lângă cioată căzută, ancorat aproape; dă chiar sub barcă cu wafter solubil",
      "Folosește 'minciunele' (wafter moi GDA 8-15 mm) — peștele apatic mușcă din curiozitate, nu foame",
    ],
    sursa: ["VkkAhdBEtaE"],
  },
  {
    slug: "epiuri-sulina-gorgova-crisan",
    nume: "Epi-uri Sulina (Gorgova - Crișan)",
    tip: "brat",
    regiune: "delta",
    preferaCotaMica: true,
    scurt: "Diguri de piatră perpendiculare pe Brațul Sulina între Gorgova și Crișan. Avat în anaforul din spate, mai ales noiembrie.",
    sezon: ["noiembrie"],
    specii: ["avat"],
    caracteristici: [
      "Diguri artificiale perpendiculare pe mal (epiuri)",
      "Anafor în spatele epiului — locul productiv",
      "Avat 45-50 cm (record document 49-50 cm pe Duo Realis 14.5 g)",
    ],
    pericole: [
      "NU fiecare epi produce — variabilitate zilnică",
      "Curent puternic + adâncime mare după epi = doar pești mici",
    ],
    sfaturi: [
      "Caută zone cu curent puternic + adâncime MICĂ (2-3 m max) după epi",
      "Pe vreme rece avatul se mută din curent pe platouri 2 m mai liniștite",
      "Năluci: Duo Realis 14.5/21 g (natural cu spate negru), Rapala Countdown Elite (verde-cap roșu), Fast Strike Hunter Big River 21 g, cicade Lazer Tactic 18-22 g",
    ],
    sursa: ["cW-oEqrDpdI"],
  },
  {
    slug: "dunarea-veche-mila23-lopatna",
    nume: "Confluența Dunărea Veche - Canalul Lopatna (Mila 23)",
    tip: "brat",
    regiune: "delta",
    adapostitDeVant: true,
    scurt: "Spot pentru biban noiembrie când lacurile/canalele sunt cristale. 'În curtea școlii' la Mila 23.",
    sezon: ["noiembrie"],
    specii: ["biban"],
    caracteristici: [
      "Bibani 24-30 cm pe mal cu piatră",
      "Sezon: 1-15 noiembrie când apa crește în lacuri și restul devine cristal",
      "Bibanii MARI LIPIȚI de malul cu piatră; cei MICI în larg sub barcă",
    ],
    pericole: [
      "Piatra agață jighead-urile mai grele",
      "Bibanul se mută de pe o zi pe alta în sezon târziu",
    ],
    sfaturi: [
      "Jighead 5 g (nu 7-10 g — agață piatra)",
      "Gume preferate: Fast Strike 'Motoroil', Bass Assassin Electric Chicken",
      "Fir Momoi Tacumi Zigline 0.05 mm — subțire real, scufundător, nu absoarbe apă",
      "Live Scope Garmin 841 + LiveScope 34 = localizare bancuri",
    ],
    sursa: ["hkWNmG-BfgI"],
  },
  {
    slug: "lacuri-mila23-nord",
    nume: "Lacurile din nord de Mila 23",
    tip: "lac",
    regiune: "delta",
    preferaCotaMare: true,
    scurt: "Lacuri interconectate cu Dunărea Veche. Știucă cu slider Salmo 7 în septembrie pe apă în scădere.",
    sezon: ["septembrie", "octombrie", "noiembrie"],
    specii: ["stiuca", "biban"],
    caracteristici: [
      "Apă în scădere toamna, vegetație multă",
      "Capturi: știucă până la 60 cm pe slider; bibani 28-30 cm grupați",
      "Apa ideală: nici cristal, nici tulbure cu miros",
    ],
    pericole: [
      "Furtuni bruște — mută-te între lacuri",
      "Iarba (mătasea broaștei) umple firele în 15 min după depunere de algă",
    ],
    sfaturi: [
      "Caută zona MICĂ de apă LIMPEDE în lacul tulbure — acolo stă știuca",
      "Sliderul atrage știuca chiar din Dunărea Veche (vine la portocaliu)",
      "Lingurițe 10 g (NU 16-17) pe apă 0.5 m cu iarbă — recuperare lentă fără agățare",
      "La biban: jighead 7 g mai mare ca să selectezi cei mari din bancurile cu mici",
    ],
    sursa: ["7fu16D7vADs", "i3zmwLUI3FQ"],
  },
  {
    slug: "sulina-maliuc-vulturul",
    nume: "Sulina între Tulcea și Maliuc (Vulturul, Dana 1 Mai)",
    tip: "brat",
    scurt: "Spot iconic pentru șalău cu Finval — Dana 1 Mai, Vulturul, Maliuc. Februarie greu pe ger.",
    sezon: ["februarie", "iulie"],
    specii: ["salau", "avat"],
    caracteristici: [
      "Praguri cu talweg 15 m, ancorare la 6-7 m",
      "Pelicanii vânează șalău aici — cicatrice clare pe pești = indicator",
      "Vara: și somn la cicadă; șalău la jig pe prag",
    ],
    pericole: [
      "Post-ger profund (-7°C 2 săptămâni) → curent ciudat de scădere, jigul cade direct pe fund",
      "Curent puternic cere upgrade gramaj jighead (21 g → 28-35 g)",
    ],
    sfaturi: [
      "Jighead 28-35 g iarna pe Sulina după ger (NU 21 g standard)",
      "Vara: șalău cu vobler în mal DOAR la apus — în timpul zilei doar jig pe prag",
      "Năluci câștigătoare șalău: Storm Largo Shad (Houdini rozaliu), Micado galben-roșu, Fish Up maro+gliter",
      "Setup serios: Finval 595 + motor electric Quest + Live Scope pe baterie LiFePO4 36V/100Ah",
    ],
    sursa: ["mf4ssbBtBe8", "qF2duTpS9Cg"],
  },
  {
    slug: "chilia-veche-pragul-22m",
    nume: "Chilia Veche — Pragul de 22 m",
    tip: "brat",
    regiune: "delta",
    preferaCotaMica: true,
    scurt: "Apă adâncă pe brațul Chilia, lângă Chilia Veche. Somn cu viermi de salcie + coropișniță.",
    sezon: ["octombrie", "noiembrie"],
    specii: ["somn"],
    caracteristici: [
      "Praguri 16-17 m și 22 m",
      "Dimineața somnii pe 16-17 m, după ora 12 se mută pe 22 m",
      "Scoici tăietoare pe pragul de 22 m",
    ],
    pericole: [
      "Scoică taie firul pe pragul de 22 m",
      "Trebuie mutare cu barca după pește",
    ],
    sfaturi: [
      "Vier de salcie + coropișniță = câștigătoare CLARĂ pe somn (testat vs râme negre + mațe macrou = ZERO trăsături)",
      "Cumpără viermi de salcie + coropișniță de la Tulcea, piață",
      "Vier de salcie CIUPEȘTE — bagă cu patent",
      "Fir principal MONO 0.40 (Madcat) > textil 0.40 pentru somni până în 10 kg",
    ],
    sursa: ["p3C-k5EANv4", "BvKHcDft9Gc"],
  }
);

// Locuri noi din batch 3 (canalul GigantFishTeam — 10 videouri extra)
locuri.push(
  {
    slug: "gura-canalului-erenciuc",
    nume: "Gura canalului Erenciuc — Sf. Gheorghe",
    tip: "canal",
    scurt: "Locul vărsării canalului Erenciuc în brațul Sfântu Gheorghe. Somn de primăvară pe prag 8-14 m cu lipitori groase și coropișnițe.",
    sezon: ["aprilie", "mai"],
    specii: ["somn"],
    caracteristici: [
      "Prag care urcă din 10 m, plin de copaci scufundați și cioate",
      "Apă: 8-14 m, ancorat cu botul în mal",
      "Trăsăturile vin predominant din mal/prag, nu din larg",
      "Apa Dunării mai tulbure deasupra preferată — peștii vin la curenții cu sediment",
    ],
    pericole: [
      "Cioate scufundate — risc de blocaj",
      "Mărunțișul tocă lipitorile rapid",
      "Acces: 2h cu barca din Mila 23 prin Lacul Puiul",
    ],
    sfaturi: [
      "Lipitori groase > lipitori subțiri (mai rezistente la mărunțiș)",
      "Coropișnițe — 2 pe cârlig 'ca regina + coada'",
      "Plumb culisant 200 g + forfac Zeck 0.8 + cârlige Zeck",
      "Mută-te după activitate (de 3 ori pe zi e normal)",
      "Activitate maximă spre seară (17:00+)",
    ],
    sursa: ["JGubUnLIqQ0"],
  },
  {
    slug: "lacul-babina",
    nume: "Lacul Babina (Mila 23)",
    tip: "lac",
    scurt: "Lac accesat prin canalul Lopatna. Pentru știucă — NU vara la caniculă (apa verde = condiții slabe). Recomandat toamna.",
    sezon: ["septembrie", "octombrie", "noiembrie"],
    specii: ["stiuca", "biban"],
    caracteristici: [
      "Acces din Mila 23 prin canalul Lopatna",
      "Golfuleț pe malul opus = spotul productiv",
      "La caniculă apa devine verde — știuca atacă dar NU înghite",
      "Lacurile Matița și Merhei (vecine) — testate negativ vara",
    ],
    pericole: [
      "Caniculă = condiții slabe pentru știucă; alegi alt sezon",
      "Ceață densă dimineața vara (plecare târzie obligatoriu)",
    ],
    sfaturi: [
      "Voblere Sebile (Magic Swimmer / Stick Shadd) când lingurițele nu produc",
      "Animație în vârful lansetei = imită pește rănit",
      "Motor electric obligatoriu (motorul termic sperie știuca)",
      "Pentru caniculă — alege Bibanul pe Mila 23 în loc",
    ],
    sursa: ["3YxHQjulsls"],
  },
  {
    slug: "chilia-deasupra-veche",
    nume: "Brațul Chilia, deasupra Chilia Veche",
    tip: "brat",
    scurt: "Loc capital pentru crap + somn. Salcie în mal, apă 12 m abruptă, scoică pe prag. Andrei Chirciu a prins 12-13-14 kg într-o zi.",
    sezon: ["august", "septembrie", "octombrie"],
    specii: ["crap", "somn"],
    caracteristici: [
      "Salcie în mal ca reper",
      "Apă 12 m cu prag abrupt 6→12 m (scoică pe perete)",
      "Acces: barca-shuttle de la Pensiunea Gigant Fish (Mila 23) sau de la Chilia Veche",
      "Cu cotă scăzută Dunăre → crapul stă în adânc (12 m), nu pe platou",
    ],
    pericole: [
      "Scoică pe perete = risc tăiere fir la drill",
      "Alarme militare audibile noaptea (frontiera Ucraina)",
      "Pe prag, peștele intră în cioată — așteaptă 1 minut, iese singur",
    ],
    sfaturi: [
      "Forțează MINIM în drill — lasă peștele să iasă din cioată",
      "Boilies Burfood = activare instantă (prima zi); Fishmeal = activare lentă (1-2 zile), atrage crap mare",
      "Coropișnițe (2 buchet) pentru somn capital",
      "Filozofia 'o zi mănâncă, o zi bea apă' — nu te muta după o zi proastă",
      "Sonar live = crap mare apare ca 'arc înalt' pe întinsură",
    ],
    sursa: ["i7IjD49j25w"],
  }
);

// Locuri noi batch 4 (77 videouri analizate cu 6 agenți paraleli)
locuri.push(
  {
    slug: "lacul-babadag",
    nume: "Lacul Babadag / Ghiolul Babadag",
    tip: "lac",
    regiune: "delta",
    scurt: "23 km² lângă Razim. Sălbăticie totală, multă piatră, șerpi. Regula caniculei: peștii muscă DUPĂ ora 9:00 dimineața.",
    sezon: ["iunie", "iulie", "august"],
    specii: ["crap", "salau"],
    caracteristici: [
      "23 km² — lac semi-marin lângă Cetatea Enisala",
      "Drumuri groaznice de acces, peisaj cu piatră",
      "Capturi: șalău record ~3 kg (Rapala live verde), plătică, caraș",
      "Apa devine agitată ca la mare cu valuri",
    ],
    pericole: [
      "Foarte mulți șerpi pe maluri (Ionel: 'limita atacului de panică')",
      "Pietre la 30 m de mal — risc rupere năluci",
      "Trahere apei agitată în vânt",
    ],
    sfaturi: [
      "REGULA: în caniculă peștii NU muscă înainte de ora 9 dimineața (confirmat 2 zile la rând)",
      "Vântul oprit = trăsăturile oprite (confirmat și pe Corbu)",
      "Porumb de silicon Enterprise Midi Pop când porumbul real nu merge",
      "Nadă cu LAPTE DE PORUMB (rețetă Mircea Agheran) — 1 kg porumb la 1 kg nadă",
      "Wafter MAI MARE pe momitor (contraintuitiv) — funcționează aici",
    ],
    sursa: ["-CZo8EkADdU"],
  },
  {
    slug: "iannis-lake-bihor",
    nume: "Iannis Lake (Bihor)",
    tip: "lac",
    regiune: "interior",
    scurt: "Lac privat de elită pentru plantat. Recorduri 32+ kg crap. Masterclass plantare cu navomodel.",
    sezon: ["aprilie", "mai", "iunie", "iulie", "august", "septembrie", "octombrie"],
    specii: ["crap"],
    caracteristici: [
      "Max 160 m distanță legal — lac mare cu sectoare profunde",
      "Recorduri zonă: Claudiu 32.2 kg, Darius 32 kg, multipli 20+ kg",
      "Adâncimi 1.4 / 1.8 / 2.2 / 3 m — zona productivă pe 3 m",
      "Stand 6 cu insulele 8-9 = adâncimea 3 m optimă",
    ],
    pericole: [
      "Team-building Claumar — locuri populare, rezervare obligatorie",
    ],
    sfaturi: [
      "Plantat ÎN PÂLNIE pe 4 adâncimi diferite — nu doar pe malul opus (greșeala #1)",
      "Substrat mâlos → forfac 40-50 cm + fir rigid pentru auto-înțepare",
      "Substrat tare → plumbi grei + riguri scurte",
      "Nadiere PROGRESIVĂ, nu masivă din start — 'odată dată nu o iei înapoi'",
      "Precizia bate frecvența — 100 plantări pe loc prost = 0 rezultate",
      "Boilies Claumar Nuclear cril-căpșună 20 mm pe păr",
    ],
    sursa: ["uAktQy2YCmo"],
  },
  {
    slug: "bratul-valciu-braila",
    nume: "Brațul Vâlciu (Insula Mare a Brăilei)",
    tip: "rau",
    scurt: "Cot 90° pe Dunăre cu plajă de nisip. Caniculă = plantare pe șenal 120m+ în prag 16m. Crap, șalău, somotel.",
    sezon: ["iunie", "iulie", "august"],
    specii: ["crap", "salau", "somn"],
    caracteristici: [
      "Cot 90° cu plajă de nisip pe Insula Mare a Brăilei",
      "3 curenți simultan pe loc: contracurent mal, curent golf, șenal principal",
      "Apă 29-31°C la suprafață vara — oxigen scăzut superficial",
      "Prag de la 14 m care cade brusc la 16+ m pe șenal",
    ],
    pericole: [
      "Caniculă infernală fără umbră",
      "Curent complex pe 3 direcții cere ancorare specială",
    ],
    sfaturi: [
      "Plantează la 120+ m de mal pe șenal — unde e oxigenul",
      "Plumb pierdut 2×200 g sau 400 g (NU legat cu ață ca să se piardă)",
      "Riguri LUNGI 35 cm",
      "Nodul FG de la Cătălin Constantinescu (Utopia) pentru fluorocarbon pe textil",
      "Unde e somn nu e crap — alegi specia după sonar",
    ],
    sursa: ["7hYVhIizF3g"],
  },
  {
    slug: "bratul-cernovca",
    nume: "Brațul Cernovca (Chilia secundar)",
    tip: "brat",
    regiune: "delta",
    adapostitDeVant: true,
    scurt: "Brațul secundar al Chiliei. Pustietate, fără nave militare ucrainene. Apă 6 m productivă pentru crap + somn.",
    sezon: ["august", "septembrie", "octombrie"],
    specii: ["crap", "somn"],
    caracteristici: [
      "Braț secundar — fără trafic, ideal pentru pescuit liniștit",
      "Apa 6 m la malul productiv (vs 16 m larg pe Chilia principală)",
      "Fără alarme militare nocturne",
      "Locul echipei Blue Kokilia care a câștigat Delta Carp Challenge 2025",
    ],
    pericole: [
      "Acces dificil — necesită barca de la Mila 23 / Chilia Veche",
    ],
    sfaturi: [
      "Cota mai mare + vânt NE → peștii mari cantonați urcă pe Chilia spre Babina și Cernovca",
      "Boilies Burfood Baltacul semisolubile + Monster Crab pe ciotă",
      "Forfacul textil se taie ușor în cioată → trecere pe MONO pentru retenție",
    ],
    sursa: ["WHbDy7eGWyQ", "YmTCno6IdUM"],
  },
  {
    slug: "goldfish-lake",
    nume: "Goldfish Lake (lac privat)",
    tip: "lac",
    regiune: "interior",
    scurt: "Lac de elită cu crapi 10+ kg, sturioni, distanțe lansat 150+ m. Loc pentru partide scurte iarnă cu PVA.",
    sezon: ["aprilie", "mai", "iunie", "iulie", "august", "septembrie", "octombrie", "noiembrie", "decembrie"],
    specii: ["crap"],
    caracteristici: [
      "Populat cu 'balube' ~9-10 kg medie",
      "Specii bonus: sturion (bifare nouă în CV pescar)",
      "Malul opus la 170 m — cere lansete 3.90 m și tehnică",
      "Stand 12 = punct de referință (rețetă confirmată)",
    ],
    pericole: [
      "Vânt puternic frecvent — cort/broly obligatoriu iarna",
    ],
    sfaturi: [
      "Strategie 2-4 ore iarna: lac cunoscut + monturi pre-făcute acasă + bagaj minim fără rodpod",
      "PVA + lichid PVA scopex + emburic — randament mai bun iarna pe rece",
      "Lanseta să revină rapid pe poziție după trăsătură (peștii cantonați)",
      "Fir închis/transparent (apă mai limpede iarna)",
    ],
    sursa: ["dLnqXP854r0", "a0e8Ykiy9Ic"],
  },
  {
    slug: "olt-cainenii-mari",
    nume: "Olt — Câinenii Mari",
    tip: "rau",
    regiune: "interior",
    scurt: "Râu de munte pentru scobar + mreana. Regulile englezești: viermi colanți + tehnica burtă fir pe monofilament.",
    sezon: ["mai", "iunie", "iulie", "august", "septembrie", "octombrie", "decembrie"],
    specii: ["caras"],
    caracteristici: [
      "Aproape Sibiu, prăiș cu piatră, 1 m apă",
      "Curent puternic — drumul de la baraj e cheia",
      "Specii: SCOBAR (Chondrostoma nasus), mreana, oblete",
      "Iarnă: 2°C, apă tulbure neașteptat, sub coșuleț 60-80 g maxim",
    ],
    pericole: [
      "Coșulețe mari iarna = greșeală comună (supranădesc)",
      "Pietre pe fund — abraziune",
    ],
    sfaturi: [
      "Nada ROȘIE pe apă tulbure / NEAGRĂ pe apă curată — camuflaj cu burta peștelui",
      "Viermi colanți: APĂ DE ROBINET + colant guma arabică Colmic (NU apă baltă)",
      "Lasă 10-15 min să transpire viermii — se lipesc",
      "Tehnică englezească: după ce plumbul atinge fundul, dai PICK-UP și lași BURTĂ MARE de fir mono. Trăsături drop-back pe detensionare",
      "DOAR monofilament — textilul nu funcționează pe curent puternic",
      "Cârlig nr. 16-18 Gamakatsu 210B + fluorocarbon Trabucco 0.12-0.14",
      "Aditiv praf pentru priză durabilă; aditiv lichid pentru semnal rapid",
    ],
    sursa: ["cTbjiLkzWcI", "dlk6kRmf97c"],
  },
  {
    slug: "balta-valea-argovei-2",
    nume: "Balta Valea Argovei 2",
    tip: "balastiera",
    regiune: "interior",
    scurt: "Baltă privată 8 ha (Lehliu - Valea Argovei). Method feeder primăvara DEVREME pe apă rece 3-4°C. Substrat citit prin plumb.",
    sezon: ["martie"],
    specii: ["crap", "caras"],
    caracteristici: [
      "8 ha, zăpadă în jurul lacului mart",
      "Taxă 100 RON / 12 ore (administrator Beca)",
      "Cotloane la 8-10 m de mal — locuri iernat",
      "Recordul ~10 kg crap",
    ],
    pericole: [
      "Gheață pe inele dimineața",
      "Densitate oscilantă (înainte/după populare)",
    ],
    sfaturi: [
      "CHEIA: zona de TRANZIȚIE mâl gros → mâl subțire / pământ tare (chiar 50 cm de pământ tare)",
      "Mâlul cedează căldura repede, pământul tare lent → microclimat la limita celor două",
      "CITIREA SUBSTRATULUI prin plumb: mâl = vârf coboară lent constant; piatră = ciocăneli; SCOICĂ = STRIAȚII LONGITUDINALE FINE pe plumb (muchia taie vopseaua); pământ tare = patinare ușoară constantă",
      "Method feeder doar ~5 g — finețe extremă",
      "Informația de la ADMINISTRAȚIE + vecinii pescari > orice YouTube",
    ],
    sursa: ["wAhmLXrYFoU"],
  },
  {
    slug: "crapologia-fulga",
    nume: "Crapologia (Fulga)",
    tip: "lac",
    regiune: "interior",
    scurt: "Lac premium 19 ha între Fulga de Jos și Fulga de Sus. Crap + ten densități uriașe, record 18.75 kg. Reguli stricte.",
    sezon: ["aprilie", "mai", "iunie", "iulie", "august", "septembrie", "octombrie"],
    specii: ["crap"],
    caracteristici: [
      "19 ha, 1.20-1.70 m adâncime — pescuit de cantitate",
      "Substrat tare cu zone mâl subțire / pietriș",
      "24 standuri (jumătate premium), spațiate la 40 m",
      "Densitate: ~1 t/ha total (2.25 t crap + 2.25 t ten)",
      "Medie capturi 4-5 kg; record 18.750 kg",
      "75 km de București / 50 de Ploiești",
    ],
    pericole: [
      "Reglementare strictă: max 4 lansete, 1 cârlig, plumb cu eliberare, catch & release",
    ],
    sfaturi: [
      "PRIMĂVARA: carbohidrați — alune tigrate, semințe fierte (rachetă/spod sau săculeți solubili)",
      "VARA: boilies pure",
      "Monturi IN-LINE cu săculeț + WAFTERS — cele mai productive în concursuri",
      "Vântul împinge peștele spre standurile 1 și 20",
      "Cupa Baltacul ed. 7: 3.66 t pește, medie 4.41 kg",
      "Lac de CANTITATE — câștigi cu volum și constanță, NU cu un exemplar mare",
    ],
    sursa: ["l7f-ylbiEzc"],
  },
);

// Locuri noi batch 5 (DPD + PCS, 90 video analizate cu 6 agenți paraleli)
locuri.push(
  {
    slug: "canal-apa-calda-cernavoda",
    nume: "Canalul cu apă caldă Cernavodă (CNE)",
    tip: "canal",
    regiune: "dunare-larga",
    scurt: "Canalul de evacuare CNE Cernavodă. Pescuit ALL-YEAR — în ianuarie are 15°C apă, peștele e activ când restul Dunării e înghețat.",
    sezon: ["ianuarie", "februarie", "martie", "noiembrie", "decembrie"],
    specii: ["crap", "salau", "caras"],
    caracteristici: [
      "Apă caldă constantă (15°C ianuarie) — peștele activ tot anul",
      "Activitate DOAR ZIUA (noaptea NU se prinde — confirmat de multiple partide)",
      "Mal cu Seimeni (vis-à-vis de perne) — spot 'la salcia clasică'",
      "Mal cu Cernavodă — la ruptura unde apa intră în pădure (pom căzut blochează trecerea)",
      "Multe perne / agățători — pierdere monturi frecventă",
      "Crapi 1-1.7 kg comuni, până la 10+ kg",
    ],
    pericole: [
      "Spumă albă de la reactor = peștele inactiv (rufele spălate cu detergent)",
      "Foarte aglomerat în weekend — sosește devreme",
      "Apă crescută peste 2m + vânt = imposibil de pescuit",
    ],
    sfaturi: [
      "Method feeder cu cârlige fine (VMC Mystic Match nr. 12-14) — domină 95% capturi",
      "Vierme ROȘU > vierme alb iarna (combinația 2 viermi roșii câștigătoare)",
      "Papanele Total Fishing 'Sweet Corn & Tiger Nut' — TOP pentru caraș/crap iarnă",
      "Nadă Greenham Pro proteică pentru iarnă",
      "Tehnica 'Bădia' — 3 cârlige pe lungimi diferite + mămăligă moale la teracotă",
      "Pe crap mare: Method de finețe 60g + textil 0.10 + VMC Mystic Match nr. 14 + wafter ananas 8mm (rezultat record 10.68 kg)",
      "Cărășei vii din magazin București pentru șalău",
    ],
    sursa: ["iGsxRDfrRIc", "AouwH2bX0-s", "9jMYxEYZ0l0", "Dh4F32C9mNw", "V9jr81RI-fE"],
  },
  {
    slug: "insula-albina-calarasi",
    nume: "Insula Albina (Călărași)",
    tip: "rau",
    regiune: "dunare-larga",
    scurt: "Insulă pe Dunăre lângă sat bulgăresc pescari. Vârful insulei = apă mică, ideal pentru somn + crap la deschidere de sezon.",
    sezon: ["iunie"],
    specii: ["somn", "crap"],
    caracteristici: [
      "Vârf insulă cu apă <1m între insulă și bucățică nisipoasă",
      "Deschidere sezon iunie — puf de plop pe fire face pescuitul de pe mal imposibil",
      "Somotei 1-2 kg la clonc; recorduri personale crap la metod 9 kg",
      "Somni MARI estimat 20-30 kg s-au ridicat dar n-au mușcat",
    ],
    pericole: [
      "Țânțari devastatori 21-22:30",
      "Puful de plop blochează firul în zilele 1-2 după deschidere",
    ],
    sfaturi: [
      "Clonc din aluminiu (~70-80 g) cu dublu teaser — rezonează diferit ca lemnul",
      "Două cârlige pe lansetă clonc: sus râme negre/lipitori, jos râme roșii",
      "Pelete Wild Carp Feeder Fix + Dynamite Baits pentru metod",
      "Acces: drum/barcă din Călărași",
    ],
    sursa: ["5Iu8MndKXCw"],
  },
  {
    slug: "ostrovul-nebuna-dolj",
    nume: "Ostrovul Nebuna (Dolj — frontieră Bulgaria)",
    tip: "rau",
    regiune: "dunare-larga",
    scurt: "Între Piscu Vechi și Desa, lângă Porțile de Fier. Festivalul scrumbiei la sfârșit mai — în PROHIBIȚIE pe restul Dunării.",
    sezon: ["mai"],
    specii: ["caras"],
    caracteristici: [
      "Scrumbia URCĂ dar nu mai trece de Porțile de Fier — se învârte în zonă",
      "Frontieră Bulgaria — ferestre legale unice",
      "Vremea: 3 anotimpuri/zi, frig dimineața 5-7°C, vânt",
      "~10 kg scrumbie (rizeafcă mică + scrumbie 250-300g) / 2 zile",
    ],
    pericole: [
      "În prohibiție pe restul Dunării — verifică legalitatea exactă",
      "~100 bărci pe șenal seara — aglomerat",
    ],
    sfaturi: [
      "DIMINEAȚA — în mal lângă copaci scufundați, max 20m (cu albastru)",
      "SEARA — în șenal cu ancură pe curent puternic (cu verde)",
      "Țaparine Profi Blinker + Hayabusa de la Total Fishing",
      "Plumbi lunguieți 110-180g, plumbul să cadă pe substrat — scrumbia simte trepidația",
      "La Giurgiu/Călărași doar la întoarcerea spre mare (nu la urcare)",
    ],
    sursa: ["m9WENYO2E10"],
  },
  {
    slug: "groapa-cu-caramizi-calarasi",
    nume: "Groapa cu cărămizi (Călărași)",
    tip: "rau",
    regiune: "dunare-larga",
    scurt: "Groapă perfect rotundă pe Dunăre — formată din bombă WWII după localnici. 8m adâncime cu prag.",
    sezon: ["aprilie", "mai"],
    specii: ["somn"],
    caracteristici: [
      "Formă perfect circulară (origine WWII)",
      "Adâncime 8m + prag",
      "Somnii apar pe sonar dar refuză frecvent",
    ],
    pericole: [
      "Inconsistent — multe partide gherlă",
    ],
    sfaturi: [
      "Râme de ploaie (Cristi, din Arad) + râme negre",
      "Clonc cu teaser negru Tec 200g + Leader Carp Spirit 100kg + VMC 3/0",
      "REGULĂ râme: după buchet, băgați un vierme care să țină râmele",
    ],
    sursa: ["k_IHfnUpoEs"],
  },
  {
    slug: "gostinu-giurgiu-canal",
    nume: "Gostinu (Giurgiu) — canal direct Dunăre",
    tip: "rau",
    regiune: "dunare-larga",
    scurt: "Canal care pleacă direct din Dunăre. Mal abrupt cu cioate. Șalău staționar iarnă + feeder mreană toamnă.",
    sezon: ["februarie", "octombrie", "noiembrie"],
    specii: ["salau", "caras"],
    caracteristici: [
      "Mal abrupt cu cioate scufundate",
      "Apă rece în februarie (3.6-3.8°C testat)",
      "Plaja Gostineștii cu terasă Trică = destinație familie",
    ],
    pericole: [
      "Sub 4°C apă = pescuit dificil, prima ieșire de an doar 'ieșirea contează'",
    ],
    sfaturi: [
      "Plumb culsiant 60-70g (NU peste — chiar pe curent)",
      "Forfac fluorocarbon Sufix Advance 0.28 + VMC 2/0",
      "Magazin Total Fishing — 10 min de centrul Bucureștiului, 700 m²",
    ],
    sursa: ["DQGZRstNB7A", "v7fXI9MnT_A"],
  },
  {
    slug: "musura-frontiera-ucraina",
    nume: "Golful Musura / Canalul Musura (frontieră Ucraina)",
    tip: "canal",
    regiune: "delta",
    adapostitDeVant: true,
    scurt: "La granița cu Ucraina, în Deltă. Ferestre de pescuit legale + pescuit cu cortul în barcă (interzis pe mal).",
    sezon: ["mai", "iunie", "septembrie"],
    specii: ["crap", "somn", "caras"],
    caracteristici: [
      "Granița cu Ucraina — bruiaj GSM/4G (drone se pierd)",
      "Cortul interzis pe mal Deltă — DOAR în barcă",
      "Apă tulbure după viituri Siret/Prut",
    ],
    pericole: [
      "Camparea pe mal = amendă ARBDD 5000 RON (1500 plătit în 15 zile)",
      "Țânțari critici 20:30-22:00",
      "Bruiaj de comunicații în zonă",
    ],
    sfaturi: [
      "Permise ARBDD online: pescuit 0 RON + acces turist 3/7/30 RON",
      "Coropișnița trage somnul instant pe apă tulbure",
      "Cort barcă Husky Bizam 2 Plus (~580 RON, 2 ieșiri prova+pupa)",
    ],
    sursa: ["3a0kg5JRiMU", "ZjHwU6e-elA", "DTsbxDs6lWM"],
  },
);

// Locuri noi batch 6
locuri.push(
  {
    slug: "boldesti-gradistea",
    nume: "Boldești Grădiștea (Buzău)",
    tip: "balastiera",
    regiune: "interior",
    scurt: "Balastieră 100+ ha cu reținere lângă București. 3 zone, regulament strict. Sub 8 kg ții, peste = release obligatoriu.",
    sezon: ["aprilie", "mai", "iunie", "iulie", "august", "septembrie", "octombrie"],
    specii: ["crap"],
    caracteristici: [
      "100+ ha, accesibilă mașină + bicicletă (zona 'la roabă')",
      "3 zone distincte: la roabă (zi), dig (vizavi de mal), pământ (zi + noapte)",
      "Capturi maxim 8 kg (peste = catch & release obligatoriu)",
      "Stand fără rezervare — te pui unde găsești",
    ],
    pericole: [
      "Agățătură severă peste 130 m distanță",
      "Influențat masiv de vânt — 'apă oglindă = nu trage'",
      "Pre-depunere primăvara: peștii inactivi 2-3 săptămâni",
    ],
    sfaturi: [
      "Tehnica 2026 — pungă PVA cu plumb GREU 95-130g auto-înțepare",
      "Cârlig Ridge Monkey White Gape nr. 4 + shrink tube pentru agresivitate",
      "Sondare obligatorie indiferent de experiență (substrat variat)",
      "Vârtej cu ANOU (NU agrafă rapidă) la pungă PVA",
      "Profit: 6-7 kg = scoți taxa, restul = profit",
    ],
    sursa: ["37Ul4ArZUIs"],
  },
);

// Locuri noi — insight #10 + #11
locuri.push(
  {
    slug: "boda-proste-lopatna",
    nume: "Boda Proste + Canalul Lopatna",
    tip: "canal",
    regiune: "delta",
    adapostitDeVant: true,
    scurt: "Canale lângă Crișan unde GDA a prins 13 pești în ziua 3 cu pelete mov/vișiniu. Specific pentru pelete CPK + Secret Aromă galben.",
    sezon: ["mai", "iunie", "iulie", "august", "septembrie", "octombrie"],
    specii: ["crap"],
    caracteristici: [
      "Canale interioare cu cioate + stuf — traseu pește între ele",
      "Apă cu vizibilitate mai bună ca Dunărea (când Dunărea e tulbure)",
      "Preluate ca info de la Vali — 'Aventuri cu Gust'",
    ],
    pericole: [
      "Pe canalul Lopatna se face curent la confluență cu Sulina",
    ],
    sfaturi: [
      "Pelete 15mm CPK Căpșună mov sau vișiniu pe păr — culoarea câștigătoare 2026",
      "Secret Aromă galben deasupra ca 'cireașa pe tort'",
      "Lansetele DIN MÂNĂ (NU cu navomodel) — traseu pește chiar lângă mal",
      "'Lași până vârful coboară. El absoarbe, expiră' — NU țapezi la prima mișcare",
    ],
    sursa: ["kjrGXYKOnH0"],
  },
  {
    slug: "groapa-25m-chilia-tatanir",
    nume: "Groapa de 25-27 m Chilia (lângă Tatanir)",
    tip: "brat",
    regiune: "delta",
    preferaCotaMica: true,
    scurt: "Groapă adâncă clasică pentru clonc + somn. Lângă Ostrov Tatanir. Sergei = punct de contact local pentru info pe loc.",
    sezon: ["iunie", "iulie", "august", "septembrie", "octombrie"],
    specii: ["somn"],
    caracteristici: [
      "Adâncime 25-27 m — printre cele mai adânci puncte Chilia",
      "Somnii vin la clonc dar SUNT MUFTUROȘI — atac slab",
      "Pădurea Tatanir arsă în 2025 — acces dificil pe mal",
    ],
    pericole: [
      "După incendiul 2025, acces dificil + lipsa locuri tabără",
      "Efemeride masive în iunie = somn nu mănâncă pe ele",
    ],
    sfaturi: [
      "Sergei (local) = informații live despre cum mănâncă peștele",
      "Tehnica: 'Lași până când îl ai cu monturile între voi' — NU țapezi de prima oară",
      "Sonar HumingBird sau Garmin LiveScope pentru a vedea somnul ridicând-se la clonc",
      "Apă tulbure de crap = OK pentru somn (dar dacă somnul are chef)",
    ],
    sursa: ["jzBZucsULsU", "GUUrOHxsQ70"],
  },
);

export function getLoc(slug: string) {
  return locuri.find((l) => l.slug === slug);
}
