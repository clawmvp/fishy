import { articole, getArticol } from "@/data/articole";
import { renderMd } from "@/lib/md";
import Link from "next/link";
import { notFound } from "next/navigation";

export function generateStaticParams() {
  return articole.map((a) => ({ slug: a.slug }));
}

export default async function ArticolPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const a = getArticol(slug);
  if (!a) notFound();

  const html = renderMd(a.body);

  return (
    <article className="max-w-3xl">
      <Link href="/articole" className="text-sm text-moss hover:text-amber-glow">
        ← toate articolele
      </Link>

      <header className="mb-10 mt-4">
        <h1 className="text-4xl md:text-5xl font-display text-amber-glow mb-3 leading-tight">
          {a.titlu}
        </h1>
        <p className="text-lg text-fog/80 mb-4">{a.scurt}</p>
        <div className="flex flex-wrap gap-1.5">
          {a.tags.map((t) => (
            <span key={t} className="tag">
              {t}
            </span>
          ))}
        </div>
      </header>

      <div
        className="prose-fishy text-fog"
        dangerouslySetInnerHTML={{ __html: html }}
      />

      <style>{`
        .prose-fishy .md-table { border-collapse: collapse; margin: 1rem 0; width: 100%; display: block; overflow-x: auto; }
        .prose-fishy .md-table th { text-align: left; padding: 8px 12px; background: rgba(212,166,87,0.1); color: var(--color-amber-glow); border: 1px solid rgba(212,166,87,0.2); font-weight: 500; white-space: nowrap; }
        .prose-fishy .md-table td { padding: 8px 12px; border: 1px solid rgba(212,166,87,0.15); }
        .prose-fishy ol { list-style: decimal; padding-left: 1.4rem; margin-bottom: 0.75rem; }
        .prose-fishy ol li { margin-bottom: 0.3rem; }
      `}</style>
    </article>
  );
}
