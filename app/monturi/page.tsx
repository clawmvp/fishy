import Link from "next/link";
import { getAllMonturi } from "@/lib/data-combined";

export const dynamic = "force-dynamic";

const specieLabel: Record<string, string> = {
  crap: "Crap",
  stiuca: "Știucă",
  salau: "Șalău",
  avat: "Avat",
  biban: "Biban",
  somn: "Somn",
};

export const metadata = {
  title: "Monturi și montaje de pescuit pe specie",
  description:
    "Montaje pe specie cu componente, diagrame și pași de asamblare — inline, helicopter, method feeder, dropshot, jighead și altele pentru Delta Dunării.",
  alternates: { canonical: "/monturi" },
};

export default async function MonturiPage() {
  const monturi = await getAllMonturi();
  const grupate = monturi.reduce((acc, m) => {
    const sp = m.pentru[0];
    if (!acc[sp]) acc[sp] = [];
    acc[sp].push(m);
    return acc;
  }, {} as Record<string, typeof monturi>);

  const ordine: Array<keyof typeof grupate> = ["crap", "stiuca", "salau", "avat", "biban", "somn"];

  return (
    <div>
      <header className="mb-8">
        <p className="text-xs uppercase tracking-[0.3em] text-moss mb-3">monturi</p>
        <h1 className="text-4xl md:text-5xl font-display text-fog mb-3">Cum legi linia, pe ce specie</h1>
        <p className="text-fog/75 max-w-2xl">
          {monturi.length} rețete de monturi cu diagrame ASCII, componente și pași de
          montaj. Fiecare validată într-un video YouTube.
        </p>
      </header>

      {/* Banner spre Tipuri */}
      <Link
        href="/monturi/tipuri"
        className="block card rounded-xl p-5 mb-10 hover:scale-[1.005] transition-transform"
        style={{ background: "linear-gradient(135deg, rgba(212,166,87,0.12), rgba(107,163,104,0.08))" }}
      >
        <div className="flex items-baseline justify-between flex-wrap gap-2">
          <div>
            <p className="text-xs uppercase tracking-[0.3em] text-amber-glow mb-1">nu știi de unde să începi?</p>
            <h3 className="text-xl md:text-2xl font-display text-fog">Ghid — tipuri de monturi: când și unde</h3>
            <p className="text-sm text-fog/75 mt-1">14 tipuri principale (inline, plumb pierdut, helicopter, method-feeder, hairrig, PVA, jighead, dropshot, topwater, fluorocarbon leader, oțel...) explicate cu capcane și recomandări.</p>
          </div>
          <span className="text-amber-glow text-2xl">→</span>
        </div>
      </Link>

      {ordine.map((sp) => {
        const items = grupate[sp];
        if (!items?.length) return null;
        return (
          <section key={sp} className="mb-10">
            <h2 className="text-2xl md:text-3xl font-display text-amber-glow mb-4">
              {specieLabel[sp]}
              <span className="text-fog/40 text-base ml-2">({items.length})</span>
            </h2>
            <div className="grid md:grid-cols-2 gap-3">
              {items.map((m) => (
                <Link
                  key={m.slug}
                  href={`/monturi/${m.slug}`}
                  className="card rounded-lg p-5"
                >
                  <h3 className="text-base font-display text-fog mb-1">{m.nume}</h3>
                  <p className="text-sm text-fog/75 mb-3 leading-relaxed">{m.scop}</p>
                  <p className="text-xs text-amber-soft uppercase tracking-wider">{m.cand}</p>
                </Link>
              ))}
            </div>
          </section>
        );
      })}
    </div>
  );
}
