"use client";

import { useMemo, useState } from "react";

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
  { val: "socrul", label: "Cu socrul", nota: "+50% palincă obligatoriu (legea nescrisă)" },
  { val: "sefii", label: "Cu șefii de la birou", nota: "toți încearcă să se țină tari → consum ridicat" },
  { val: "nevasta", label: "Cu nevasta", nota: "vin elegant, palincă pe ascuns" },
  { val: "pensionari", label: "Pensionari veterani din sat", nota: "categorie OLIMPICĂ" },
];

const LOCATII: { val: Locatie; label: string; nota: string }[] = [
  { val: "sat", label: "Sat lipovenesc cu magazin", nota: "poți ieși după rezerve dacă se termină" },
  { val: "izolat", label: "Insulă / Stuf izolat", nota: "+20% panică să nu rămâi sec" },
  { val: "pensiune-bar", label: "Pensiune cu bar deschis", nota: "necontrolat — variabila scapă" },
];

type Provizii = {
  palincaMl: number;     // mililitri totali
  bereDoze: number;      // doze 500ml
  vinMl: number;
  whiskyMl: number;
  apaL: number;
  cafea: number;         // capsule
  slanaG: number;
  branzaG: number;
  castravetiBorcane: number;
  semintePungi: number;
};

function calculeaza(
  pescari: number,
  zile: number,
  tip: TipPartida,
  anotimp: Anotimp,
  companie: Companie,
  locatie: Locatie
): Provizii {
  // BASE per persoană per zi
  let palinca = 150; // ml
  let bere = 3; // doze 500ml
  let vin = 200; // ml
  let whisky = 0;

  // Tip de partidă
  if (tip === "spinning") {
    palinca *= 0.7; bere *= 0.8; vin *= 0.7;
  } else if (tip === "clonc") {
    palinca *= 1.6; bere *= 0.8; vin *= 0.5; // palincă pentru somn
  } else if (tip === "pensiune") {
    palinca *= 0.9; bere *= 1.3; vin *= 2.0; whisky = 60;
  }

  // Anotimp
  if (anotimp === "iarna") {
    palinca *= 1.4; bere *= 0.4; vin *= 1.1;
  } else if (anotimp === "vara") {
    palinca *= 0.8; bere *= 1.8; vin *= 0.9;
  }

  // Companie
  if (companie === "socrul") {
    palinca *= 1.5; bere *= 1.1; vin *= 1.0;
  } else if (companie === "sefii") {
    palinca *= 1.4; bere *= 1.6; vin *= 1.3; whisky += 80;
  } else if (companie === "nevasta") {
    palinca *= 0.5; bere *= 0.7; vin *= 1.8;
  } else if (companie === "pensionari") {
    palinca *= 2.0; bere *= 1.1; vin *= 1.4;
  }

  // Locație
  if (locatie === "izolat") {
    palinca *= 1.2; bere *= 1.2; vin *= 1.2;
  } else if (locatie === "pensiune-bar") {
    palinca *= 1.4; bere *= 1.5; vin *= 1.5; whisky += 50;
  }

  const total = pescari * zile;

  return {
    palincaMl: Math.round(palinca * total),
    bereDoze: Math.round(bere * total),
    vinMl: Math.round(vin * total),
    whiskyMl: Math.round(whisky * total),
    apaL: Math.round(2 * total * 10) / 10, // 2L apă / persoană / zi (deshidratare iminentă)
    cafea: Math.ceil(2.5 * total),
    slanaG: 120 * total,
    branzaG: 200 * total,
    castravetiBorcane: Math.max(1, Math.ceil(total / 3)),
    semintePungi: Math.ceil(pescari / 2) * zile, // o pungă pe pescar la 2 zile
  };
}

function verdict(p: Provizii, pescari: number, zile: number): { titlu: string; descriere: string; emoji: string; culoare: string } {
  // Total alcool pur estimat (40% palincă, 5% bere, 12% vin, 40% whisky)
  const alcoolPur =
    p.palincaMl * 0.40 +
    p.bereDoze * 500 * 0.05 +
    p.vinMl * 0.12 +
    p.whiskyMl * 0.40;
  const perPescarPeZi = alcoolPur / (pescari * zile);

  if (perPescarPeZi < 80) return {
    emoji: "🎓", culoare: "#9bb5a3",
    titlu: "NOVICE — abia ai trecut testul berii",
    descriere: "Pescarii din Deltă te-ar adopta ca pe un nepoțel. Te lasă să prinzi babușcă. Te trimit după lemne. Te-ai nimerit aici din greșeală sau ești corporatist evadat?",
  };
  if (perPescarPeZi < 140) return {
    emoji: "🎣", culoare: "#a8c87a",
    titlu: "PESCAR DECENT — îți ții berea când prinzi",
    descriere: "Echilibru sănătos. Costache nu te dă afară de la masă, dar nici nu te invită la rondul al doilea. Ai potențial.",
  };
  if (perPescarPeZi < 220) return {
    emoji: "🍻", culoare: "#d4a657",
    titlu: "GFT VETERAN — ai locul tău la masa lui Costache",
    descriere: "Numele tău e pronunțat cu respect la magazinul din Crișan. Aduci palincă proprie. Ai propria farfurie de borș. Ești noi (în sens bun).",
  };
  if (perPescarPeZi < 320) return {
    emoji: "🦅", culoare: "#e89844",
    titlu: "BALTACUL VENERABIL — caracajos legendar",
    descriere: "Localnicii te confundă cu un călugăr de la Mănăstirea Saon care a luat-o pe scurtătură. Bărci de pescari trec pe lângă tine în liniște religioasă.",
  };
  return {
    emoji: "🐻", culoare: "#c84a3c",
    titlu: "LIPOVEAN AUTENTIC — sau urs deghizat?",
    descriere: "Statisticile sunt depășite. Calculatorul cere protecție sindicală. ANPA discută să te declare specie protejată. Recomandăm verificare medicală post-partidă.",
  };
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

  const p = useMemo(
    () => calculeaza(pescari, zile, tip, anotimp, companie, locatie),
    [pescari, zile, tip, anotimp, companie, locatie]
  );
  const v = useMemo(() => verdict(p, pescari, zile), [p, pescari, zile]);

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
        <h2 className="text-lg font-display text-amber-glow mb-4">
          Cine, când, unde
        </h2>

        <div className="grid md:grid-cols-2 gap-5 mb-5">
          <div>
            <label className="block text-xs uppercase tracking-widest text-moss mb-2">
              Număr de pescari: <span className="text-amber-glow text-base ml-1">{pescari}</span>
            </label>
            <input
              type="range" min={1} max={12} value={pescari}
              onChange={(e) => setPescari(+e.target.value)}
              className="w-full accent-amber-glow"
            />
            <div className="flex justify-between text-xs text-fog/40 mt-1">
              <span>1 (solo)</span><span>6 (echipă)</span><span>12 (cumetrie)</span>
            </div>
          </div>

          <div>
            <label className="block text-xs uppercase tracking-widest text-moss mb-2">
              Număr de zile: <span className="text-amber-glow text-base ml-1">{zile}</span>
            </label>
            <input
              type="range" min={1} max={7} value={zile}
              onChange={(e) => setZile(+e.target.value)}
              className="w-full accent-amber-glow"
            />
            <div className="flex justify-between text-xs text-fog/40 mt-1">
              <span>1 zi</span><span>3 zile</span><span>7 zile</span>
            </div>
          </div>
        </div>

        <RadioGroup
          label="Tipul partidei"
          options={TIPURI}
          value={tip}
          onChange={(v) => setTip(v as TipPartida)}
        />
        <RadioGroup
          label="Anotimpul"
          options={ANOTIMPURI}
          value={anotimp}
          onChange={(v) => setAnotimp(v as Anotimp)}
        />
        <RadioGroup
          label="Compania"
          options={COMPANII}
          value={companie}
          onChange={(v) => setCompanie(v as Companie)}
        />
        <RadioGroup
          label="Locația"
          options={LOCATII}
          value={locatie}
          onChange={(v) => setLocatie(v as Locatie)}
          last
        />
      </section>

      {/* VERDICT */}
      <section className="card rounded-xl p-6 mb-6" style={{
        background: `linear-gradient(135deg, ${v.culoare}22, ${v.culoare}08)`,
        borderColor: `${v.culoare}55`,
      }}>
        <p className="text-xs uppercase tracking-widest text-fog/60 mb-2">verdict</p>
        <div className="flex items-start gap-4">
          <div className="text-5xl flex-shrink-0">{v.emoji}</div>
          <div>
            <h2 className="text-2xl md:text-3xl font-display mb-2" style={{ color: v.culoare }}>
              {v.titlu}
            </h2>
            <p className="text-fog/85 leading-relaxed">{v.descriere}</p>
          </div>
        </div>
      </section>

      {/* SHOPPING LIST */}
      <section className="card rounded-xl p-5 md:p-6 mb-6">
        <h2 className="text-lg font-display text-amber-glow mb-4">
          Listă de cumpărături pentru {pescari} pescari × {zile} {zile === 1 ? "zi" : "zile"}
        </h2>

        <div className="grid sm:grid-cols-2 gap-3">
          <Linie nume="Palincă" cantitate={`${(p.palincaMl / 1000).toFixed(1)} L`}
            sub={`≈ ${Math.ceil(p.palincaMl / 500)} sticle de 0.5L`} icon="🥃" />
          <Linie nume="Bere" cantitate={`${p.bereDoze} doze`}
            sub={`≈ ${Math.ceil(p.bereDoze / 24)} bax de 24`} icon="🍺" />
          <Linie nume="Vin" cantitate={`${(p.vinMl / 1000).toFixed(1)} L`}
            sub={`≈ ${Math.ceil(p.vinMl / 750)} sticle / damigene`} icon="🍷" />
          {p.whiskyMl > 0 && (
            <Linie nume="Whisky / coniac" cantitate={`${p.whiskyMl} ml`}
              sub="pentru aere și fotografii" icon="🥃" />
          )}
          <Linie nume="Apă plată" cantitate={`${p.apaL} L`}
            sub="OBLIGATORIU — altfel a doua zi e jale" icon="💧" />
          <Linie nume="Cafea" cantitate={`${p.cafea} doze / cafele`}
            sub="la 4 AM cu 2°C, te salvează" icon="☕" />
          <Linie nume="Slană / mușchi țigănesc" cantitate={gramHigh(p.slanaG)}
            sub="se taie subțire la lumânare" icon="🥓" />
          <Linie nume="Brânză telemea" cantitate={gramHigh(p.branzaG)}
            sub="cu roșii, ceapă verde, pâine de casă" icon="🧀" />
          <Linie nume="Castraveți murați" cantitate={`${p.castravetiBorcane} ${p.castravetiBorcane === 1 ? "borcan" : "borcane"}`}
            sub="anti-mahmureală absolută" icon="🥒" />
          <Linie nume="Semințe / alune" cantitate={`${p.semintePungi} ${p.semintePungi === 1 ? "pungă" : "pungi"}`}
            sub="pentru așteptarea de 6 ore între cap-uri" icon="🌰" />
        </div>
      </section>

      {/* MICUL PRINȚ DE PESCAR */}
      <section className="card rounded-xl p-5 md:p-6 mb-6" style={{
        background: "linear-gradient(135deg, rgba(212,166,87,0.04), rgba(107,163,104,0.03))",
      }}>
        <h2 className="text-lg font-display text-amber-glow mb-3">Reguli nescrise</h2>
        <ul className="space-y-2 text-sm text-fog/85 leading-relaxed">
          <li className="flex gap-2">
            <span className="text-amber-soft flex-shrink-0">·</span>
            <span><strong className="text-fog">Legea Costache:</strong> primul pahar se bea în picioare, ultimul nu se mai numără.</span>
          </li>
          <li className="flex gap-2">
            <span className="text-amber-soft flex-shrink-0">·</span>
            <span><strong className="text-fog">Coeficient Vișoianu:</strong> pentru fiecare crap pierdut din mână — 1 pahar în plus. Pentru fiecare crap prins — 2.</span>
          </li>
          <li className="flex gap-2">
            <span className="text-amber-soft flex-shrink-0">·</span>
            <span><strong className="text-fog">Bonus Mila 23:</strong> palinca de prune începe după ce trece de Crișan, NU înainte.</span>
          </li>
          <li className="flex gap-2">
            <span className="text-amber-soft flex-shrink-0">·</span>
            <span><strong className="text-fog">Taxă socru:</strong> ginerele plătește berea. Întotdeauna. Fără discuții.</span>
          </li>
          <li className="flex gap-2">
            <span className="text-amber-soft flex-shrink-0">·</span>
            <span><strong className="text-fog">Regula Baltacul:</strong> dacă pescuiești beat, prinzi. Dacă pescuiești treaz, povestești. Pescarii adevărați aleg ambele.</span>
          </li>
          <li className="flex gap-2">
            <span className="text-amber-soft flex-shrink-0">·</span>
            <span><strong className="text-fog">Sfânta Treime de cumpărături:</strong> palincă — slană — castraveți. Restul e detaliu.</span>
          </li>
          <li className="flex gap-2">
            <span className="text-amber-soft flex-shrink-0">·</span>
            <span><strong className="text-fog">Curse de eficiență:</strong> 1L palincă rezistă 4 pescari × 1 noapte sau 1 pescar × 4 nopți. Matematica nu minte.</span>
          </li>
        </ul>
      </section>

      <p className="text-xs text-fog/40 italic text-center">
        Calculator satiric. Pescuit cu barca peste 0.5‰ = OK, doar dacă nu te prinde Garda. Hidratează-te cu apă, nu cu palincă. Sau cu ambele. Adultul ești tu.
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
