import { monturi, getMontura } from "@/data/monturi";
import Link from "next/link";
import { notFound } from "next/navigation";

export function generateStaticParams() {
  return monturi.map((m) => ({ slug: m.slug }));
}

const specieLabel: Record<string, string> = {
  crap: "Crap",
  stiuca: "Știucă",
  salau: "Șalău",
  avat: "Avat",
  biban: "Biban",
  somn: "Somn",
};

export default async function MonturaPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const m = getMontura(slug);
  if (!m) notFound();

  return (
    <article className="max-w-4xl">
      <Link href="/monturi" className="text-sm text-moss hover:text-amber-glow">
        ← toate monturile
      </Link>

      <header className="mb-8 mt-4">
        <div className="flex flex-wrap items-center gap-2 mb-3">
          {m.pentru.map((sp) => (
            <span key={sp} className="tag tag-amber">
              {specieLabel[sp]}
            </span>
          ))}
          <span className="tag">{m.metoda}</span>
        </div>
        <h1 className="text-3xl md:text-4xl font-display text-amber-glow mb-3 leading-tight">
          {m.nume}
        </h1>
        <p className="text-lg text-fog/80 leading-relaxed mb-2">{m.scop}</p>
        <p className="text-sm text-amber-soft">{m.cand}</p>
      </header>

      {/* Diagrama */}
      <section className="mb-8">
        <h2 className="text-xl font-display text-amber-glow mb-3">Diagrama</h2>
        <pre className="card rounded-lg p-5 text-sm text-fog/90 font-mono overflow-x-auto leading-tight whitespace-pre">
{m.diagrama}
        </pre>
      </section>

      {/* Componente */}
      <section className="mb-8">
        <h2 className="text-xl font-display text-amber-glow mb-3">Componente</h2>
        <div className="space-y-2">
          {m.components.map((c, i) => (
            <div key={i} className="card rounded-md p-3">
              <div className="flex items-baseline justify-between flex-wrap gap-2 mb-1">
                <p className="text-fog font-medium">{c.item}</p>
                <p className="text-amber-soft font-mono text-sm">{c.spec}</p>
              </div>
              {c.nota && <p className="text-sm text-fog/60 italic">{c.nota}</p>}
            </div>
          ))}
        </div>
      </section>

      {/* Pași */}
      <section className="mb-8">
        <h2 className="text-xl font-display text-amber-glow mb-3">Pași de montaj</h2>
        <ol className="space-y-2.5">
          {m.pasi.map((p, i) => (
            <li key={i} className="flex gap-3 text-fog/85 leading-relaxed">
              <span className="text-amber-glow flex-shrink-0 font-mono text-sm pt-0.5">
                {String(i + 1).padStart(2, "0")}
              </span>
              <span>{p}</span>
            </li>
          ))}
        </ol>
      </section>

      {/* Sfaturi */}
      <section className="mb-8">
        <h2 className="text-xl font-display text-amber-glow mb-3">Sfaturi</h2>
        <ul className="space-y-2">
          {m.sfaturi.map((s, i) => (
            <li key={i} className="flex gap-3 text-fog/85 leading-relaxed">
              <span className="text-amber-glow flex-shrink-0">→</span>
              <span>{s}</span>
            </li>
          ))}
        </ul>
      </section>

      {/* Citate */}
      {m.citate && m.citate.length > 0 && (
        <section className="mb-8">
          {m.citate.map((c, i) => (
            <blockquote
              key={i}
              className="border-l-2 border-amber-glow pl-4 italic text-paper my-4"
            >
              {c}
            </blockquote>
          ))}
        </section>
      )}

      {/* Surse */}
      <section className="mt-12 pt-6 border-t border-amber-glow/15">
        <p className="text-xs uppercase tracking-widest text-fog/50 mb-2">
          surse video
        </p>
        <div className="flex flex-wrap gap-2">
          {m.surse.map((s) => (
            <a
              key={s}
              href={`https://www.youtube.com/watch?v=${s}`}
              target="_blank"
              rel="noopener noreferrer"
              className="text-sm text-moss hover:text-amber-glow font-mono"
            >
              ↗ {s}
            </a>
          ))}
        </div>
      </section>
    </article>
  );
}
