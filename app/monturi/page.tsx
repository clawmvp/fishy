import Link from "next/link";
import { monturi } from "@/data/monturi";

const specieLabel: Record<string, string> = {
  crap: "Crap",
  stiuca: "Știucă",
  salau: "Șalău",
  avat: "Avat",
  biban: "Biban",
  somn: "Somn",
};

export default function MonturiPage() {
  const grupate = monturi.reduce((acc, m) => {
    const sp = m.pentru[0];
    if (!acc[sp]) acc[sp] = [];
    acc[sp].push(m);
    return acc;
  }, {} as Record<string, typeof monturi>);

  const ordine: Array<keyof typeof grupate> = ["crap", "stiuca", "salau", "avat", "biban", "somn"];

  return (
    <div>
      <header className="mb-10">
        <p className="text-xs uppercase tracking-[0.3em] text-moss mb-3">monturi</p>
        <h1 className="text-4xl font-display text-fog mb-3">Cum legi linia, pe ce specie</h1>
        <p className="text-fog/70 max-w-2xl">
          {monturi.length} monturi explicate cu componente, diagramă ASCII și pași de
          montaj. Fiecare e validată într-un video YouTube. Citează lecții de teren
          (Vișoianu, Anelin Enache, Baltacul, MarelePescar).
        </p>
      </header>

      {ordine.map((sp) => {
        const items = grupate[sp];
        if (!items?.length) return null;
        return (
          <section key={sp} className="mb-10">
            <h2 className="text-2xl font-display text-amber-glow mb-4">
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
                  <p className="text-sm text-fog/65 mb-3 leading-relaxed">{m.scop}</p>
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
