import { getLocBySlug } from "@/lib/data-combined";
import Link from "next/link";
import type { Metadata } from "next";
import { notFound } from "next/navigation";
import JsonLd, { breadcrumb } from "@/components/JsonLd";

export const dynamic = "force-dynamic";

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const loc = await getLocBySlug(slug);
  if (!loc) return {};
  const desc = `${loc.scurt} Specii: ${loc.specii.join(", ")}. Sezon: ${loc.sezon.join(", ")}.`;
  return {
    title: `${loc.nume} — pescuit, sezon și sfaturi`,
    description: desc,
    alternates: { canonical: `/locuri/${loc.slug}` },
    openGraph: { type: "article", title: `${loc.nume} · fishy`, description: desc },
  };
}

export default async function LocPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const loc = await getLocBySlug(slug);
  if (!loc) notFound();

  return (
    <article className="max-w-3xl">
      <JsonLd
        data={breadcrumb([
          { name: "Acasă", path: "/" },
          { name: "Locuri", path: "/locuri" },
          { name: loc.nume, path: `/locuri/${loc.slug}` },
        ])}
      />
      <Link href="/locuri" className="text-sm text-moss hover:text-amber-glow">
        ← toate locurile
      </Link>

      <header className="mb-8 mt-4">
        <p className="text-xs uppercase tracking-[0.3em] text-moss mb-3">
          {loc.tip}
        </p>
        <h1 className="text-4xl md:text-5xl font-display text-amber-glow mb-3">
          {loc.nume}
        </h1>
        <p className="text-lg text-fog/80 leading-relaxed">{loc.scurt}</p>
      </header>

      <div className="card rounded-lg p-5 mb-8 grid md:grid-cols-2 gap-4">
        <div>
          <p className="text-xs uppercase tracking-widest text-moss mb-1.5">
            sezon
          </p>
          <p className="text-fog">{loc.sezon.join(", ")}</p>
        </div>
        <div>
          <p className="text-xs uppercase tracking-widest text-moss mb-1.5">
            specii
          </p>
          <div className="flex flex-wrap gap-1.5">
            {loc.specii.map((s) => (
              <span key={s} className="tag">
                {s}
              </span>
            ))}
          </div>
        </div>
      </div>

      <section className="mb-8">
        <h2 className="text-xl font-display text-amber-glow mb-3">
          Caracteristici
        </h2>
        <ul className="space-y-2">
          {loc.caracteristici.map((c, i) => (
            <li key={i} className="flex gap-3 text-fog leading-relaxed">
              <span className="text-moss flex-shrink-0">•</span>
              <span>{c}</span>
            </li>
          ))}
        </ul>
      </section>

      <section className="mb-8">
        <h2 className="text-xl font-display text-amber-glow mb-3">Sfaturi</h2>
        <ul className="space-y-2">
          {loc.sfaturi.map((s, i) => (
            <li key={i} className="flex gap-3 text-fog leading-relaxed">
              <span className="text-amber-glow flex-shrink-0">→</span>
              <span>{s}</span>
            </li>
          ))}
        </ul>
      </section>

      <section className="mb-8">
        <h2 className="text-xl font-display text-amber-glow mb-3">Pericole</h2>
        <ul className="space-y-2">
          {loc.pericole.map((p, i) => (
            <li key={i} className="flex gap-3 text-fog leading-relaxed">
              <span className="text-red-400 flex-shrink-0">!</span>
              <span>{p}</span>
            </li>
          ))}
        </ul>
      </section>

      <section className="mt-12 pt-6 border-t border-amber-glow/15">
        <p className="text-xs uppercase tracking-widest text-fog/55 mb-2">
          surse video
        </p>
        <div className="flex flex-wrap gap-2">
          {loc.sursa.map((s) => (
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
