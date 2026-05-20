import { glosar, categorii } from "@/data/glosar";

export default function GlosarPage() {
  return (
    <div>
      <header className="mb-10">
        <p className="text-xs uppercase tracking-[0.3em] text-moss mb-3">
          glosar
        </p>
        <h1 className="text-4xl font-display text-fog mb-3">
          Termeni de pescuit
        </h1>
        <p className="text-fog/70 max-w-2xl">
          {glosar.length} termeni — de la jigging și hairrig la cota Tulcea și
          buturi lipovenești. Tot ce auzi în filmele de YouTube și nu știi.
        </p>
      </header>

      {categorii.map((cat) => {
        const items = glosar.filter((t) => t.categorie === cat.id);
        if (!items.length) return null;
        return (
          <section key={cat.id} className="mb-12">
            <div className="mb-4">
              <h2 className="text-2xl font-display text-amber-glow inline-block">
                {cat.nume}
              </h2>
              <p className="text-sm text-fog/50 mt-1">{cat.desc}</p>
            </div>
            <dl className="space-y-3">
              {items.map((t, i) => (
                <div key={i} className="card rounded-lg p-4">
                  <dt className="text-fog font-display text-lg mb-1">
                    {t.termen}
                  </dt>
                  <dd className="text-fog/80 leading-relaxed">{t.definitie}</dd>
                  {t.exemplu && (
                    <p className="text-sm text-moss mt-2 italic">
                      ex: {t.exemplu}
                    </p>
                  )}
                </div>
              ))}
            </dl>
          </section>
        );
      })}
    </div>
  );
}
