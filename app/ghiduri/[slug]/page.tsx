import Link from "next/link";
import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { ghiduri, getGhid } from "@/data/ghiduri";
import { getSpecie, isInProhibitie } from "@/data/specii";
import JsonLd, { breadcrumb } from "@/components/JsonLd";

export function generateStaticParams() {
  return ghiduri.map((g) => ({ slug: g.slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const g = getGhid(slug);
  if (!g) return {};
  return {
    title: g.titlu,
    description: g.meta,
    alternates: { canonical: `/ghiduri/${g.slug}` },
    openGraph: { type: "article", title: g.titlu, description: g.meta },
  };
}

export default async function GhidPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const g = getGhid(slug);
  if (!g) notFound();

  const refDate = new Date(new Date().getFullYear(), g.midDate.m - 1, g.midDate.d);

  const articleLd = {
    "@context": "https://schema.org",
    "@type": "Article",
    headline: g.titlu,
    description: g.meta,
    inLanguage: "ro-RO",
    mainEntityOfPage: `https://fishy.n01.app/ghiduri/${g.slug}`,
    publisher: {
      "@type": "Organization",
      name: "fishy",
      logo: { "@type": "ImageObject", url: "https://fishy.n01.app/icon-512" },
    },
  };

  return (
    <article className="max-w-3xl">
      <JsonLd data={articleLd} />
      <JsonLd
        data={breadcrumb([
          { name: "Acasă", path: "/" },
          { name: "Ghiduri", path: "/ghiduri" },
          { name: g.sezon, path: `/ghiduri/${g.slug}` },
        ])}
      />

      <Link href="/ghiduri" className="text-sm text-moss hover:text-amber-glow">← toate ghidurile</Link>

      <header className="mb-8 mt-4">
        <p className="text-xs uppercase tracking-[0.3em] text-moss mb-3">{g.sezon} · {g.perioada}</p>
        <h1 className="text-3xl md:text-4xl font-display text-amber-glow mb-3 leading-tight">{g.titlu}</h1>
        <p className="text-lg text-fog/80 leading-relaxed">{g.intro}</p>
      </header>

      <section className="mb-8">
        <h2 className="text-xl font-display text-amber-glow mb-3">Condiții</h2>
        <p className="text-fog/85 leading-relaxed">{g.conditii}</p>
      </section>

      <section className="mb-8">
        <h2 className="text-xl font-display text-amber-glow mb-4">Specii de țintit</h2>
        <div className="space-y-3">
          {g.speciiTinta.map((st) => {
            const sp = getSpecie(st.id);
            if (!sp) return null;
            const inProh = isInProhibitie(sp, refDate);
            return (
              <Link key={st.id} href={`/specii/${st.id}`} className="card rounded-lg p-4 block">
                <div className="flex items-center justify-between gap-2 mb-1">
                  <h3 className="text-lg font-display text-fog">{sp.nume}</h3>
                  <span className={`text-xs px-2 py-0.5 rounded-full whitespace-nowrap ${inProh ? "bg-red-500/15 text-red-300" : "bg-moss/15 text-moss"}`}>
                    {inProh ? "prohibiție mid-sezon" : "se poate pescui"}
                  </span>
                </div>
                <p className="text-sm text-fog/70 leading-relaxed">{st.deCe}</p>
              </Link>
            );
          })}
        </div>
      </section>

      <section className="mb-8">
        <h2 className="text-xl font-display text-amber-glow mb-3">Tehnici recomandate</h2>
        <ul className="space-y-2">
          {g.tehnici.map((t, i) => (
            <li key={i} className="flex gap-3 text-fog leading-relaxed">
              <span className="text-amber-glow flex-shrink-0">→</span>
              <span>{t}</span>
            </li>
          ))}
        </ul>
      </section>

      <section className="mb-8">
        <h2 className="text-xl font-display text-amber-glow mb-3">Atenție</h2>
        <ul className="space-y-2">
          {g.atentie.map((a, i) => (
            <li key={i} className="flex gap-3 text-fog leading-relaxed">
              <span className="text-orange-400 flex-shrink-0">!</span>
              <span>{a}</span>
            </li>
          ))}
        </ul>
      </section>

      <section className="mt-10 pt-6 border-t border-amber-glow/15 flex flex-wrap gap-3 text-sm">
        <Link href="/azi" className="text-moss hover:text-amber-glow">→ Vezi recomandările pentru azi</Link>
        <Link href="/prohibitie" className="text-moss hover:text-amber-glow">→ Calendar prohibiție 2026</Link>
        <Link href="/locuri" className="text-moss hover:text-amber-glow">→ Locuri de pescuit</Link>
      </section>
    </article>
  );
}
