import Link from "next/link";
import { tipuriMonturi, CATEGORII, CAT_LABELS } from "@/data/tipuri-monturi";
import { getMontura } from "@/data/monturi";

export default function TipuriMonturiPage() {
  return (
    <div>
      <Link href="/monturi" className="text-sm text-moss hover:text-amber-glow">
        ← rețete concrete de monturi
      </Link>

      <header className="mb-10 mt-4">
        <p className="text-xs uppercase tracking-[0.3em] text-moss mb-3">tipuri de monturi</p>
        <h1 className="text-4xl font-display text-fog mb-3">Ghid — când și unde folosești fiecare tip</h1>
        <p className="text-fog/70 max-w-3xl">
          {tipuriMonturi.length} tipuri principale de monturi explicate: <strong>când le folosești</strong>,{" "}
          <strong>unde funcționează</strong>, ce avantaje și capcane au. Fiecare tip linkează la <Link href="/monturi" className="text-amber-glow hover:underline">rețete concrete</Link> validate pe teren.
        </p>
      </header>

      {CATEGORII.map((cat) => {
        const items = tipuriMonturi.filter((t) => t.categorie === cat);
        if (!items.length) return null;
        return (
          <section key={cat} className="mb-12">
            <h2 className="text-2xl font-display text-amber-glow mb-4">
              {CAT_LABELS[cat]}
              <span className="text-fog/40 text-base ml-2">({items.length})</span>
            </h2>
            <div className="space-y-4">
              {items.map((t) => {
                const monturiAsociate = t.monturiAsociate.map((s) => getMontura(s)).filter(Boolean);
                return (
                  <article key={t.slug} className="card rounded-xl p-6">
                    <h3 className="text-2xl font-display text-fog mb-2">{t.nume}</h3>
                    <p className="text-fog/75 mb-5 leading-relaxed">{t.scurt}</p>

                    <div className="grid md:grid-cols-2 gap-5 mb-5">
                      <div>
                        <p className="text-xs uppercase tracking-widest text-amber-glow mb-2">Când</p>
                        <ul className="space-y-1">
                          {t.cand.map((c, i) => (
                            <li key={i} className="text-sm flex gap-2 text-fog/80">
                              <span className="text-amber-soft flex-shrink-0">·</span>
                              <span>{c}</span>
                            </li>
                          ))}
                        </ul>
                      </div>
                      <div>
                        <p className="text-xs uppercase tracking-widest text-amber-glow mb-2">Unde</p>
                        <ul className="space-y-1">
                          {t.unde.map((u, i) => (
                            <li key={i} className="text-sm flex gap-2 text-fog/80">
                              <span className="text-moss flex-shrink-0">·</span>
                              <span>{u}</span>
                            </li>
                          ))}
                        </ul>
                      </div>
                    </div>

                    <div className="grid md:grid-cols-2 gap-5 mb-5">
                      <div>
                        <p className="text-xs uppercase tracking-widest text-moss mb-2">Avantaje</p>
                        <ul className="space-y-1">
                          {t.avantaje.map((a, i) => (
                            <li key={i} className="text-sm flex gap-2 text-fog/80">
                              <span className="text-moss flex-shrink-0">+</span>
                              <span>{a}</span>
                            </li>
                          ))}
                        </ul>
                      </div>
                      <div>
                        <p className="text-xs uppercase tracking-widest text-red-400/80 mb-2">Capcane</p>
                        <ul className="space-y-1">
                          {t.dezavantaje.map((d, i) => (
                            <li key={i} className="text-sm flex gap-2 text-fog/80">
                              <span className="text-orange-400 flex-shrink-0">−</span>
                              <span>{d}</span>
                            </li>
                          ))}
                        </ul>
                      </div>
                    </div>

                    <div className="mb-4">
                      <p className="text-xs uppercase tracking-widest text-amber-glow mb-2">Componente esențiale</p>
                      <ul className="space-y-1">
                        {t.componente.map((c, i) => (
                          <li key={i} className="text-sm flex gap-2 text-fog/80">
                            <span className="text-amber-soft flex-shrink-0">·</span>
                            <span>{c}</span>
                          </li>
                        ))}
                      </ul>
                    </div>

                    <div className="card rounded-md p-3 mb-4" style={{ background: "rgba(189,78,65,0.05)", borderColor: "rgba(189,78,65,0.2)" }}>
                      <p className="text-xs uppercase tracking-widest text-red-400/80 mb-1">De evitat</p>
                      <p className="text-sm text-fog/85 italic">{t.evitati}</p>
                    </div>

                    {monturiAsociate.length > 0 && (
                      <div>
                        <p className="text-xs uppercase tracking-widest text-moss mb-2">Rețete concrete</p>
                        <div className="flex flex-wrap gap-2">
                          {monturiAsociate.map((m) =>
                            m ? (
                              <Link
                                key={m.slug}
                                href={`/monturi/${m.slug}`}
                                className="text-xs px-2 py-1 rounded-md bg-water-2/50 border border-amber-glow/25 text-fog hover:border-amber-glow/60"
                              >
                                {m.nume} →
                              </Link>
                            ) : null
                          )}
                        </div>
                      </div>
                    )}
                  </article>
                );
              })}
            </div>
          </section>
        );
      })}
    </div>
  );
}
