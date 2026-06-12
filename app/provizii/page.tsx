"use client";

import { useEffect, useMemo, useState } from "react";

type Regula = { titlu: string; text: string };

const TOATE_REGULILE: Regula[] = [
  { titlu: "Legea Costache", text: "Primul pahar se bea în picioare, ultimul nu se mai numără." },
  { titlu: "Coeficient Vișoianu", text: "Pentru fiecare crap pierdut din mână — 1 pahar în plus. Pentru fiecare prins — 2." },
  { titlu: "Bonus Mila 23", text: "Palinca de prune începe DUPĂ ce treci de Crișan, NU înainte." },
  { titlu: "Taxă socru", text: "Ginerele plătește berea. Întotdeauna. Fără discuții." },
  { titlu: "Sfânta Treime de cumpărături", text: "Palincă — slană — castraveți. Restul e detaliu." },
  { titlu: "Regula Baltacul", text: "Beat prinzi, treaz povestești. Pescarii adevărați aleg ambele." },
  { titlu: "Regula 5 AM", text: "Dacă te-ai trezit la 5 fără palincă, ești bolnav. Mergi la doctor." },
  { titlu: "Verdict pescar adevărat", text: "Îți recunoști propria undiță după sunet, nu după vedere." },
  { titlu: "Tradiția primului pește", text: "Primul pește prins se udă cu palincă în barcă (peștele, nu tu — încă)." },
  { titlu: "Legea borșului", text: "Borșul de pește se face DOAR cu cap și coadă. Mușchiul se mănâncă la grătar." },
  { titlu: "Regula nevestei", text: "Dacă te sună de 3 ori, închizi telefonul. Dacă te sună de 5 ori, te întorci." },
  { titlu: "Codul lanetei", text: "Laneta NU se împrumută. Punct. Sfârșit." },
  { titlu: "Tradiția tăcerii la cap", text: "Când vine cap, tăcere absolută. Cine vorbește plătește berea seara." },
  { titlu: "Regula Lipovenească a Vinului", text: "Vinul roșu se bea de la mâna stângă, palinca de la dreapta. Nu confunda." },
  { titlu: "Bonus Sulina", text: "Orice partidă care trece de Sulina merită +1 sticlă în plus, „pentru drum”." },
  { titlu: "Anti-regula corporatistului", text: "Dacă vine cu undiță nouă de 3000€ și prinde mai puțin decât cel cu băț de bambus, plătește seara." },
  { titlu: "Regula câinelui pescarului", text: "Câinele are dreptul la prima bucată de slană. Întotdeauna. Sfârșit." },
  { titlu: "Decizia dimineții", text: "Ultimul care se trezește spală tigaia de ouă." },
];

function shuffleN<T>(arr: T[], n: number): T[] {
  const copy = arr.slice();
  for (let i = copy.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [copy[i], copy[j]] = [copy[j], copy[i]];
  }
  return copy.slice(0, n);
}

type TipPartida = "spinning" | "crap" | "clonc" | "pensiune";
type Anotimp = "iarna" | "tranzitie" | "vara";
type Companie = "amici" | "socrul" | "sefii" | "nevasta" | "pensionari";
type Locatie = "sat" | "izolat" | "pensiune-bar";

const TIPURI: { val: TipPartida; label: string; nota: string }[] = [
  { val: "spinning", label: "Spinning de zi", nota: "vii înapoi seara — moderație impusă" },
  { val: "crap", label: "Crap multi-day pe insulă", nota: "ai timp să te plictisești între cap-uri" },
  { val: "clonc", label: "Clonc nocturn pe Borcea", nota: "stai treaz până la 4 AM — palincă obligatorie" },
  { val: "pensiune", label: "Răsfăț la pensiune", nota: "vinul curge ca Dunărea" },
];

const ANOTIMPURI: { val: Anotimp; label: string; nota: string }[] = [
  { val: "iarna", label: "Iarna (clonc, știucă jig)", nota: "palincă fierbinte > bere rece" },
  { val: "tranzitie", label: "Primăvara / Toamna", nota: "echilibru sfânt" },
  { val: "vara", label: "Vara (canicula Deltei)", nota: "bere lichidă, palincă lichidă, toate lichide" },
];

const COMPANII: { val: Companie; label: string; nota: string }[] = [
  { val: "amici", label: "Doar amici", nota: "baseline — democratic" },
  { val: "socrul", label: "Cu socrul", nota: "+50% palincă (legea nescrisă)" },
  { val: "sefii", label: "Cu șefii de la birou", nota: "toți se țin tari → consum ridicat" },
  { val: "nevasta", label: "Cu nevasta", nota: "vin elegant, palincă pe ascuns" },
  { val: "pensionari", label: "Pensionari veterani din sat", nota: "categorie OLIMPICĂ" },
];

const LOCATII: { val: Locatie; label: string; nota: string }[] = [
  { val: "sat", label: "Sat lipovenesc cu magazin", nota: "ieși după rezerve dacă se termină" },
  { val: "izolat", label: "Insulă / Stuf izolat", nota: "+20% panică să nu rămâi sec" },
  { val: "pensiune-bar", label: "Pensiune cu bar deschis", nota: "necontrolat — variabila scapă" },
];

type Bauturi = {
  palincaMl: number;
  bereDoze: number;
  vinMl: number;
  whiskyMl: number;
  apaL: number;
  cafea: number;
};

function calculeazaBauturi(
  pescari: number, zile: number, tip: TipPartida, anotimp: Anotimp, companie: Companie, locatie: Locatie
): Bauturi {
  let palinca = 150, bere = 3, vin = 200, whisky = 0;

  if (tip === "spinning") { palinca *= 0.7; bere *= 0.8; vin *= 0.7; }
  else if (tip === "clonc") { palinca *= 1.6; bere *= 0.8; vin *= 0.5; }
  else if (tip === "pensiune") { palinca *= 0.9; bere *= 1.3; vin *= 2.0; whisky = 60; }

  if (anotimp === "iarna") { palinca *= 1.4; bere *= 0.4; vin *= 1.1; }
  else if (anotimp === "vara") { palinca *= 0.8; bere *= 1.8; vin *= 0.9; }

  if (companie === "socrul") { palinca *= 1.5; bere *= 1.1; }
  else if (companie === "sefii") { palinca *= 1.4; bere *= 1.6; vin *= 1.3; whisky += 80; }
  else if (companie === "nevasta") { palinca *= 0.5; bere *= 0.7; vin *= 1.8; }
  else if (companie === "pensionari") { palinca *= 2.0; bere *= 1.1; vin *= 1.4; }

  if (locatie === "izolat") { palinca *= 1.2; bere *= 1.2; vin *= 1.2; }
  else if (locatie === "pensiune-bar") { palinca *= 1.4; bere *= 1.5; vin *= 1.5; whisky += 50; }

  const t = pescari * zile;
  return {
    palincaMl: Math.round(palinca * t),
    bereDoze: Math.round(bere * t),
    vinMl: Math.round(vin * t),
    whiskyMl: Math.round(whisky * t),
    apaL: Math.round(2 * t * 10) / 10,
    cafea: Math.ceil(2.5 * t),
  };
}

type Mancare = {
  paineGr: number;
  oua: number;
  branzaTelemea: number;  // grame
  salamPateuGr: number;
  rosiiGr: number;
  ceapaGr: number;
  cartofiGr: number;
  malaiGr: number;
  fasoleGr: number;
  conserveBuc: number;     // pateu/sardine/fasole cutie
  slanaGr: number;
  castravetiBorcane: number;
  biscuitiPungi: number;
  fructeBuc: number;
  semintePungi: number;
  calTotalKcal: number;
};

function calculeazaMancare(pescari: number, zile: number, tip: TipPartida): Mancare {
  // dacă pensiune: cina inclusă → tăiem ~50% din mâncarea adusă
  const f = tip === "pensiune" ? 0.5 : 1.0;
  const t = pescari * zile;

  return {
    paineGr: Math.round(300 * t * f),
    oua: Math.ceil(3 * pescari * Math.min(zile, 2)), // ouă doar primele 2 dimineți
    branzaTelemea: Math.round(180 * t * f),
    salamPateuGr: Math.round(150 * t * f),
    rosiiGr: Math.round(250 * t * f),
    ceapaGr: Math.round(120 * t * f),
    cartofiGr: Math.round(250 * t * f),
    malaiGr: Math.round(100 * t * f),
    fasoleGr: Math.round(80 * t * f),
    conserveBuc: Math.ceil(t * f),
    slanaGr: Math.round(100 * t * f),
    castravetiBorcane: Math.max(1, Math.ceil(t / 3)),
    biscuitiPungi: Math.max(1, Math.ceil(t / 3)),
    fructeBuc: Math.ceil(t * f),
    semintePungi: Math.ceil(pescari * Math.max(1, zile / 2)),
    calTotalKcal: Math.round(2800 * t * f),
  };
}

type ZiMeniu = {
  numar: number;
  micDejun: string[];
  pranz: string[];
  cina: string[];
  gluma?: string;
};

function genereazaMeniu(zile: number, tip: TipPartida): ZiMeniu[] {
  const lista: ZiMeniu[] = [];
  for (let i = 1; i <= zile; i++) {
    const ultima = i === zile && zile > 1;
    if (ultima && tip !== "pensiune") {
      lista.push({
        numar: i,
        micDejun: ["Cafea + biscuiți + ce-a mai rămas din slană"],
        pranz: ["Sandwich cu telemea + roșii + ceapă verde"],
        cina: ["🐟 Crap la proțap / saramură de crap"],
        gluma: "Aici v-am pus crap în meniu. Dacă nu-l prindeți... aveți pâine cu castraveți. Succes!",
      });
    } else if (tip === "pensiune") {
      lista.push({
        numar: i,
        micDejun: ["Mic dejun la pensiune (inclus)"],
        pranz: ["Sandwich-uri în barcă: pateu + brânză + roșii"],
        cina: ["Cina la pensiune (inclusă)"],
      });
    } else if (i === 1) {
      lista.push({
        numar: i,
        micDejun: ["Ouă jumări cu slană", "Pâine caldă + roșii + ceapă verde", "Cafea tare"],
        pranz: ["Sandwich cu pateu/șuncă", "Telemea + roșii", "Măr"],
        cina: ["Ciorbă pescărească (din ce-ai adus)", "Mămăligă + brânză", "Murături"],
      });
    } else {
      lista.push({
        numar: i,
        micDejun: ["Ouă cu slană (dacă mai sunt)", "Pâine + telemea + ceapă", "Cafea"],
        pranz: ["Conservă pateu + pâine", "Brânză + castraveți", "Semințe"],
        cina: ["Fasole boabe cu ciolan", "Mămăligă + murături"],
      });
    }
  }
  return lista;
}

function gramHigh(g: number): string {
  return g >= 1000 ? `${(g / 1000).toFixed(1)}kg` : `${g}g`;
}

export default function ProviziiPage() {
  const [pescari, setPescari] = useState(4);
  const [zile, setZile] = useState(2);
  const [tip, setTip] = useState<TipPartida>("crap");
  const [anotimp, setAnotimp] = useState<Anotimp>("tranzitie");
  const [companie, setCompanie] = useState<Companie>("amici");
  const [locatie, setLocatie] = useState<Locatie>("izolat");

  const b = useMemo(
    () => calculeazaBauturi(pescari, zile, tip, anotimp, companie, locatie),
    [pescari, zile, tip, anotimp, companie, locatie]
  );
  const m = useMemo(() => calculeazaMancare(pescari, zile, tip), [pescari, zile, tip]);
  const meniu = useMemo(() => genereazaMeniu(zile, tip), [zile, tip]);

  // Reguli rotative — SSR-safe: primele 5, apoi shuffle pe client la mount
  const [reguli, setReguli] = useState<Regula[]>(TOATE_REGULILE.slice(0, 5));
  useEffect(() => {
    setReguli(shuffleN(TOATE_REGULILE, 5));
  }, []);
  const roteste = () => setReguli(shuffleN(TOATE_REGULILE, 5));

  return (
    <div>
      <header className="mb-10">
        <p className="text-xs uppercase tracking-[0.3em] text-moss mb-3">
          calculator de provizii
        </p>
        <h1 className="text-4xl md:text-5xl font-display text-fog mb-3">
          Necesarul real pentru o partidă în Deltă
        </h1>
        <p className="text-fog/75 max-w-3xl leading-relaxed">
          Calculator bazat pe observații de teren cu pescari adevărați. Nu garantăm
          că prinzi pește, dar garantăm că nu rămâi sec. Reglat fin după rețeta GFT,
          coeficient Vișoianu, taxă socru și bonus Mila 23.
        </p>
      </header>

      {/* INPUTURI */}
      <section className="card rounded-xl p-5 md:p-6 mb-6">
        <h2 className="text-lg font-display text-amber-glow mb-4">Cine, când, unde</h2>

        <div className="grid md:grid-cols-2 gap-5 mb-5">
          <div>
            <label className="block text-xs uppercase tracking-widest text-moss mb-2">
              Număr de pescari: <span className="text-amber-glow text-base ml-1">{pescari}</span>
            </label>
            <input type="range" min={1} max={12} value={pescari}
              onChange={(e) => setPescari(+e.target.value)}
              className="w-full accent-amber-glow" />
            <div className="flex justify-between text-xs text-fog/40 mt-1">
              <span>1 (solo)</span><span>6 (echipă)</span><span>12 (cumetrie)</span>
            </div>
          </div>
          <div>
            <label className="block text-xs uppercase tracking-widest text-moss mb-2">
              Număr de zile: <span className="text-amber-glow text-base ml-1">{zile}</span>
            </label>
            <input type="range" min={1} max={7} value={zile}
              onChange={(e) => setZile(+e.target.value)}
              className="w-full accent-amber-glow" />
            <div className="flex justify-between text-xs text-fog/40 mt-1">
              <span>1 zi</span><span>3 zile</span><span>7 zile</span>
            </div>
          </div>
        </div>

        <RadioGroup label="Tipul partidei" options={TIPURI} value={tip} onChange={(v) => setTip(v as TipPartida)} />
        <RadioGroup label="Anotimpul" options={ANOTIMPURI} value={anotimp} onChange={(v) => setAnotimp(v as Anotimp)} />
        <RadioGroup label="Compania" options={COMPANII} value={companie} onChange={(v) => setCompanie(v as Companie)} />
        <RadioGroup label="Locația" options={LOCATII} value={locatie} onChange={(v) => setLocatie(v as Locatie)} last />
      </section>

      {/* BĂUTURI */}
      <section className="card rounded-xl p-5 md:p-6 mb-6">
        <h2 className="text-lg font-display text-amber-glow mb-1">
          Băuturi — {pescari} pescari × {zile} {zile === 1 ? "zi" : "zile"}
        </h2>
        <p className="text-sm text-fog/55 mb-4">Bere, vin, palincă — ajustate la profilul echipei.</p>

        <div className="grid sm:grid-cols-2 gap-3">
          <Linie nume="Palincă" cantitate={`${(b.palincaMl / 1000).toFixed(1)} L`}
            sub={`≈ ${Math.ceil(b.palincaMl / 500)} sticle de 0.5L`} icon="🥃" />
          <Linie nume="Bere" cantitate={`${b.bereDoze} doze`}
            sub={`≈ ${Math.ceil(b.bereDoze / 24)} bax de 24`} icon="🍺" />
          <Linie nume="Vin" cantitate={`${(b.vinMl / 1000).toFixed(1)} L`}
            sub={`≈ ${Math.ceil(b.vinMl / 750)} sticle / damigene`} icon="🍷" />
          {b.whiskyMl > 0 && (
            <Linie nume="Whisky / coniac" cantitate={`${b.whiskyMl} ml`}
              sub="pentru aere și fotografii" icon="🥃" />
          )}
          <Linie nume="Apă plată" cantitate={`${b.apaL} L`}
            sub="dublul dacă-i caniculă" icon="💧" />
          <Linie nume="Cafea" cantitate={`${b.cafea} doze`}
            sub="la 4 AM cu 2°C, te salvează" icon="☕" />
        </div>
      </section>

      {/* MÂNCARE */}
      <section className="card rounded-xl p-5 md:p-6 mb-6">
        <h2 className="text-lg font-display text-amber-glow mb-1">
          Mâncare — listă de cumpărături
        </h2>
        <p className="text-sm text-fog/55 mb-4">
          Calculat la ~2800 kcal/pescar/zi. Total: <strong className="text-fog">{m.calTotalKcal.toLocaleString("ro-RO")} kcal</strong>.
          {tip === "pensiune" && " (Pensiune: mesele principale incluse, doar gustări de zi.)"}
        </p>

        <div className="grid sm:grid-cols-2 gap-3 mb-6">
          <Linie nume="Pâine" cantitate={gramHigh(m.paineGr)} sub="de casă, dacă găsești" icon="🍞" />
          <Linie nume="Ouă" cantitate={`${m.oua} buc`} sub="pentru jumări dimineața" icon="🥚" />
          <Linie nume="Slană / mușchi țigănesc" cantitate={gramHigh(m.slanaGr)} sub="la lumânare, subțire" icon="🥓" />
          <Linie nume="Brânză telemea / cașcaval" cantitate={gramHigh(m.branzaTelemea)} sub="cu roșii și ceapă verde" icon="🧀" />
          <Linie nume="Salam / pateu" cantitate={gramHigh(m.salamPateuGr)} sub="pentru sandwich în barcă" icon="🥪" />
          <Linie nume="Conserve" cantitate={`${m.conserveBuc} cutii`} sub="pateu, sardine, fasole — backup" icon="🥫" />
          <Linie nume="Roșii" cantitate={gramHigh(m.rosiiGr)} sub="rezistente, NU foarte coapte" icon="🍅" />
          <Linie nume="Ceapă (verde + uscată)" cantitate={gramHigh(m.ceapaGr)} sub="nelipsită la orice masă" icon="🧅" />
          <Linie nume="Cartofi" cantitate={gramHigh(m.cartofiGr)} sub="ciorbă, tocăniță, jar" icon="🥔" />
          <Linie nume="Mălai" cantitate={gramHigh(m.malaiGr)} sub="mămăligă obligatorie" icon="🌽" />
          <Linie nume="Fasole boabe" cantitate={gramHigh(m.fasoleGr)} sub="cu ciolan afumat, cina #2" icon="🫘" />
          <Linie nume="Castraveți murați" cantitate={`${m.castravetiBorcane} ${m.castravetiBorcane === 1 ? "borcan" : "borcane"}`} sub="anti-mahmureală absolută" icon="🥒" />
          <Linie nume="Biscuiți" cantitate={`${m.biscuitiPungi} ${m.biscuitiPungi === 1 ? "pungă" : "pungi"}`} sub="pentru cafea și prânz rapid" icon="🍪" />
          <Linie nume="Fructe (mere, banane)" cantitate={`${m.fructeBuc} buc`} sub="vitamine și energie rapidă" icon="🍎" />
          <Linie nume="Semințe / alune" cantitate={`${m.semintePungi} ${m.semintePungi === 1 ? "pungă" : "pungi"}`} sub="așteptarea de 6 ore între cap-uri" icon="🌰" />
        </div>

        {/* MENIU PE ZILE */}
        <div className="mt-6">
          <h3 className="text-sm uppercase tracking-widest text-moss mb-3">Meniu propus pe zile</h3>
          <div className="grid md:grid-cols-2 gap-3">
            {meniu.map((zi) => (
              <div key={zi.numar} className="rounded-lg p-4 border border-amber-glow/20 bg-water-2/30">
                <p className="text-xs uppercase tracking-widest text-amber-glow mb-3">Ziua {zi.numar}</p>
                <Masa nume="Mic dejun" items={zi.micDejun} />
                <Masa nume="Prânz" items={zi.pranz} />
                <Masa nume="Cina" items={zi.cina} last />
                {zi.gluma && (
                  <p className="mt-3 pt-3 border-t border-amber-glow/15 text-sm text-amber-soft italic leading-snug">
                    😄 {zi.gluma}
                  </p>
                )}
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* REGULI NESCRISE — rotative */}
      <section className="card rounded-xl p-5 md:p-6 mb-6" style={{
        background: "linear-gradient(135deg, rgba(212,166,87,0.05), rgba(107,163,104,0.03))",
      }}>
        <div className="flex items-baseline justify-between gap-3 mb-3">
          <div>
            <h2 className="text-lg font-display text-amber-glow">Reguli nescrise</h2>
            <p className="text-xs text-fog/50 mt-0.5">5 din {TOATE_REGULILE.length} — se schimbă la fiecare refresh</p>
          </div>
          <button
            type="button"
            onClick={roteste}
            className="text-xs uppercase tracking-widest text-amber-glow hover:text-amber-soft border border-amber-glow/30 hover:border-amber-glow/60 rounded-md px-3 py-1.5 transition-all flex items-center gap-1.5"
            aria-label="Rotește regulile"
          >
            <span>🎲</span> schimbă
          </button>
        </div>
        <ul className="space-y-2 text-sm text-fog/85 leading-relaxed">
          {reguli.map((r, i) => (
            <li key={`${r.titlu}-${i}`} className="flex gap-2">
              <span className="text-amber-soft flex-shrink-0">·</span>
              <span><strong className="text-fog">{r.titlu}:</strong> {r.text}</span>
            </li>
          ))}
        </ul>
      </section>

      {/* SERIOS — GLUMA GLUMA, DAR */}
      <section className="rounded-xl p-5 md:p-6 mb-6" style={{
        background: "linear-gradient(135deg, rgba(189,78,65,0.08), rgba(189,78,65,0.02))",
        border: "1px solid rgba(189,78,65,0.30)",
      }}>
        <div className="flex items-baseline gap-2 mb-3">
          <span className="text-xl">⚠️</span>
          <h2 className="text-lg font-display text-fog">Gluma gluma, dar nu uitați</h2>
        </div>
        <p className="text-sm text-fog/80 leading-relaxed mb-4">
          Calculator-ul de sus e satiric. <strong>Astea de jos NU sunt.</strong> Delta nu iartă neatenția —
          vânt brusc, motor stricat, deshidratare, căpușă infectată, accident la curățat pește.
          Lista minimă reală:
        </p>

        <div className="grid sm:grid-cols-2 gap-2.5">
          <ItemSerios icon="🦺" titlu="Vestă de salvare per pescar"
            text="Obligatoriu pe Dunăre și brațe (Garda Mediu + ANR). Nu sub scaun — pe corp." />
          <ItemSerios icon="📋" titlu="Permise actualizate"
            text="Permis ANPA recreativ + permis ARBDD (sezonier 30 zile sau anual). Fără ele = amendă 1.500-3.000 RON." />
          <ItemSerios icon="🧴" titlu="Repelent puternic"
            text="DEET 30%+ sau Picaridin. Țânțari + căpușe Delta = risc borrelioză reală. Aplică inclusiv pe glezne." />
          <ItemSerios icon="🆘" titlu="Trusă prim ajutor"
            text="Pansamente, dezinfectant, antialgice, antihistaminice, cărbune medicinal, pensetă pentru căpușe." />
          <ItemSerios icon="📡" titlu="Telefon încărcat + baterie externă"
            text="Semnal slab pe canalele interioare. Memorează 112 și salvează coordonatele de bivuac." />
          <ItemSerios icon="🌡️" titlu="Verifică RoAlert + prognoza vânt"
            text="Cod portocaliu / vânt >30 km/h pe brațe = rămâi la mal. Furtuna pe Dunăre răstoarnă bărci mici." />
          <ItemSerios icon="💧" titlu="Apă potabilă verificată"
            text="2L/persoană/zi minim, 3-4L pe caniculă. Apa Dunării NU se bea direct, nici fiartă (microplastice, agricultură)." />
          <ItemSerios icon="⚓" titlu="Ancoră + funie 20m + colac"
            text="Motor stricat = derivă rapidă cu cota mare. Colac de salvare în barcă, nu doar veste." />
          <ItemSerios icon="🔧" titlu="Trusă motor + benzină rezervă"
            text="Bujie, sfoară demaror, ulei amestec, 5L benzină în plus. Distanțele înșeală în Deltă." />
          <ItemSerios icon="🔦" titlu="Lanternă frontală + baterii"
            text="Întoarcerea seara pe canale fără lumini = riscuri reale. Frontală îți lasă mâinile libere." />
          <ItemSerios icon="🚿" titlu="Schimb haine uscate + folie izotermică"
            text="O răsturnare + 2h ud în vânt = hipotermie reală chiar la 18°C. Folia stă în trusa de salvare." />
          <ItemSerios icon="🧭" titlu="GPS + hartă imprimată backup"
            text="Telefonul moare, GPS-ul se confuză pe canalele înguste. Hartă pe hârtie e backup-ul care nu cedează." />
        </div>

        <div className="mt-5 pt-4 border-t border-red-400/20">
          <p className="text-sm text-fog/85 leading-relaxed">
            <strong className="text-red-400/90">Hidratare reală:</strong> 1L apă pentru fiecare 100ml alcool tare consumat.
            Cafeaua deshidratează, NU înlocuiește apa. Și — <strong className="text-fog">nu conduci barca cu motor sub influență</strong>:
            limita e 0.0‰ pentru ambarcațiuni cu motor peste 15 CP (NU 0.5‰ ca la auto). Garda Mediu și Poliția fluvială verifică.
          </p>
        </div>
      </section>

      <p className="text-xs text-fog/40 italic text-center">
        Adultul ești tu. Calculator-ul îți spune ce să iei, nu cât să bei.
      </p>
    </div>
  );
}

function RadioGroup<T extends string>({
  label, options, value, onChange, last
}: {
  label: string;
  options: { val: T; label: string; nota: string }[];
  value: T;
  onChange: (v: T) => void;
  last?: boolean;
}) {
  return (
    <div className={last ? "" : "mb-5"}>
      <p className="text-xs uppercase tracking-widest text-moss mb-2">{label}</p>
      <div className="grid sm:grid-cols-2 gap-2">
        {options.map((o) => (
          <button
            key={o.val}
            type="button"
            onClick={() => onChange(o.val)}
            className={`text-left px-3 py-2.5 rounded-md border transition-all ${
              value === o.val
                ? "border-amber-glow/60 bg-amber-glow/10"
                : "border-amber-glow/15 hover:border-amber-glow/35 bg-water-2/30"
            }`}
          >
            <div className={`text-sm font-medium ${value === o.val ? "text-amber-glow" : "text-fog"}`}>
              {o.label}
            </div>
            <div className="text-xs text-fog/55 mt-0.5 leading-snug">{o.nota}</div>
          </button>
        ))}
      </div>
    </div>
  );
}

function Linie({ nume, cantitate, sub, icon }: { nume: string; cantitate: string; sub: string; icon: string }) {
  return (
    <div className="flex items-start gap-3 p-3 rounded-md bg-water-2/30 border border-amber-glow/15">
      <span className="text-2xl flex-shrink-0">{icon}</span>
      <div className="flex-1 min-w-0">
        <div className="flex items-baseline justify-between gap-2">
          <span className="text-fog font-display text-base">{nume}</span>
          <span className="text-amber-glow font-medium text-sm whitespace-nowrap">{cantitate}</span>
        </div>
        <p className="text-xs text-fog/55 mt-0.5 leading-snug">{sub}</p>
      </div>
    </div>
  );
}

function Masa({ nume, items, last }: { nume: string; items: string[]; last?: boolean }) {
  return (
    <div className={last ? "" : "mb-2"}>
      <p className="text-xs text-moss mb-1">{nume}</p>
      <ul className="space-y-0.5">
        {items.map((it, i) => (
          <li key={i} className="text-sm text-fog/85 flex gap-1.5">
            <span className="text-amber-soft flex-shrink-0">·</span>
            <span>{it}</span>
          </li>
        ))}
      </ul>
    </div>
  );
}

function ItemSerios({ icon, titlu, text }: { icon: string; titlu: string; text: string }) {
  return (
    <div className="flex gap-3 p-3 rounded-md bg-water-2/20 border border-red-400/15">
      <span className="text-xl flex-shrink-0 mt-0.5">{icon}</span>
      <div>
        <p className="text-sm font-display text-fog mb-0.5">{titlu}</p>
        <p className="text-xs text-fog/70 leading-snug">{text}</p>
      </div>
    </div>
  );
}
