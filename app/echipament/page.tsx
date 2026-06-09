import { echipament, type Item } from "@/data/echipament";

const categoriiOrdine: Item["categoria"][] = [
  "barci",
  "motoare",
  "sonare",
  "lanseta",
  "mulineta",
  "fir",
  "carlige",
  "naluca",
  "boilies",
  "nada",
  "montura",
  "somn-specific",
  "accesorii",
];

const catLabel: Record<Item["categoria"], string> = {
  barci: "Bărci",
  motoare: "Motoare",
  sonare: "Sonare & Navomodele",
  lanseta: "Lansete",
  mulineta: "Mulinete",
  fir: "Fire",
  carlige: "Cârlige",
  naluca: "Năluci",
  boilies: "Boilies",
  nada: "Nadă",
  montura: "Monturi",
  "somn-specific": "Somn — momeli & echipament specific",
  accesorii: "Accesorii",
};

const prioritateLabel: Record<Item["prioritate"], string> = {
  must: "must-have",
  nice: "nice-to-have",
  expert: "expert",
};

const prioritateClass: Record<Item["prioritate"], string> = {
  must: "tag-amber",
  nice: "",
  expert: "tag-red",
};

export default function EchipamentPage() {
  return (
    <div>
      <header className="mb-10">
        <p className="text-xs uppercase tracking-[0.3em] text-moss mb-3">
          echipament
        </p>
        <h1 className="text-4xl md:text-5xl font-display text-fog mb-3">
          Ce să cumperi, ce să eviți
        </h1>
        <p className="text-fog/75 max-w-2xl">
          Mărci concrete, modele specifice, prețuri orientative. Categoria{" "}
          <span className="tag tag-amber">must-have</span> = de bază. Categoria{" "}
          <span className="tag tag-red">expert</span> = pentru pescari avansați
          care optimizează la maxim.
        </p>
      </header>

      {categoriiOrdine.map((cat) => {
        const items = echipament.filter((e) => e.categoria === cat);
        if (!items.length) return null;
        // sort: must → nice → expert
        const sortKey = { must: 0, nice: 1, expert: 2 };
        items.sort((a, b) => sortKey[a.prioritate] - sortKey[b.prioritate]);

        return (
          <section key={cat} className="mb-12">
            <h2 className="text-2xl md:text-3xl font-display text-amber-glow mb-4">
              {catLabel[cat]}
              <span className="text-fog/40 text-base ml-2">
                ({items.length})
              </span>
            </h2>
            <div className="grid md:grid-cols-2 gap-3">
              {items.map((e, i) => (
                <div key={i} className="card rounded-lg p-4">
                  <div className="flex items-start justify-between gap-3 mb-1.5">
                    <h3 className="text-base font-display text-fog">
                      {e.nume}
                    </h3>
                    <span
                      className={`tag ${prioritateClass[e.prioritate]} flex-shrink-0`}
                    >
                      {prioritateLabel[e.prioritate]}
                    </span>
                  </div>
                  {e.marca && (
                    <p className="text-xs text-moss uppercase tracking-wider mb-1">
                      {e.marca}
                    </p>
                  )}
                  {e.specific && (
                    <p className="text-sm text-amber-soft mb-2 font-mono">
                      {e.specific}
                    </p>
                  )}
                  {e.note && (
                    <p className="text-sm text-fog/75 leading-relaxed mb-2">
                      {e.note}
                    </p>
                  )}
                  <div className="flex flex-wrap gap-1 mt-2">
                    {e.pentru.map((p) => (
                      <span key={p} className="tag text-[10px]">
                        {p}
                      </span>
                    ))}
                  </div>
                </div>
              ))}
            </div>
          </section>
        );
      })}
    </div>
  );
}
