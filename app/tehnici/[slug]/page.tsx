import { getTehnicaBySlug } from "@/lib/data-combined";
import Link from "next/link";
import { notFound } from "next/navigation";
import SpeciesIcon from "@/components/SpeciesIcon";

export const dynamic = "force-dynamic";

const specieLabel: Record<string, string> = {
  stiuca: "Știucă",
  salau: "Șalău",
  avat: "Avat",
  biban: "Biban",
  crap: "Crap",
  somn: "Somn",
};

export default async function TehnicaPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const t = await getTehnicaBySlug(slug);
  if (!t) notFound();

  return (
    <article className="max-w-3xl">
      <Link href="/tehnici" className="text-sm text-moss hover:text-amber-glow">
        ← toate tehnicile
      </Link>

      <header className="mb-8 mt-4">
        <div className="flex flex-wrap items-center gap-3 mb-3">
          <span className="text-amber-soft">
            <SpeciesIcon specie={t.specie === "biban" || t.specie === "somn" || t.specie === "stiuca" || t.specie === "salau" || t.specie === "avat" || t.specie === "crap" ? t.specie : "crap"} size={26} />
          </span>
          <p className="text-xs uppercase tracking-[0.3em] text-moss">
            {specieLabel[t.specie]} · {t.metoda}
          </p>
          <span className="tag-amber tag">{t.perioada}</span>
        </div>
        <h1 className="text-3xl md:text-4xl font-display text-amber-glow mb-3 leading-tight">
          {t.titlu}
        </h1>
        <p className="text-lg text-fog/80 leading-relaxed">{t.scurt}</p>
      </header>

      <section className="mb-8">
        <h2 className="text-xl font-display text-amber-glow mb-3">Pași</h2>
        <ol className="space-y-2.5">
          {t.pasi.map((p, i) => (
            <li key={i} className="flex gap-3 text-fog leading-relaxed">
              <span className="text-amber-glow flex-shrink-0 font-mono text-sm pt-0.5">
                {String(i + 1).padStart(2, "0")}
              </span>
              <span>{p}</span>
            </li>
          ))}
        </ol>
      </section>

      {t.naluci && t.naluci.length > 0 && (
        <section className="mb-8">
          <h2 className="text-xl font-display text-amber-glow mb-3">
            Năluci recomandate
          </h2>
          <ul className="space-y-2">
            {t.naluci.map((n, i) => (
              <li key={i} className="card rounded-md p-3 text-fog">
                {n}
              </li>
            ))}
          </ul>
        </section>
      )}

      {t.monturi.length > 0 && (
        <section className="mb-8">
          <h2 className="text-xl font-display text-amber-glow mb-3">Monturi</h2>
          <ul className="space-y-2">
            {t.monturi.map((m, i) => (
              <li key={i} className="flex gap-3 text-fog leading-relaxed">
                <span className="text-moss flex-shrink-0">•</span>
                <span>{m}</span>
              </li>
            ))}
          </ul>
        </section>
      )}

      {t.echipament.length > 0 && (
        <section className="mb-8">
          <h2 className="text-xl font-display text-amber-glow mb-3">
            Echipament
          </h2>
          <ul className="space-y-2">
            {t.echipament.map((e, i) => (
              <li key={i} className="flex gap-3 text-fog leading-relaxed">
                <span className="text-moss flex-shrink-0">•</span>
                <span>{e}</span>
              </li>
            ))}
          </ul>
        </section>
      )}

      <section className="mb-8">
        <h2 className="text-xl font-display text-amber-glow mb-3">Sfaturi</h2>
        <ul className="space-y-2">
          {t.sfaturi.map((s, i) => (
            <li key={i} className="flex gap-3 text-fog leading-relaxed">
              <span className="text-amber-glow flex-shrink-0">→</span>
              <span>{s}</span>
            </li>
          ))}
        </ul>
      </section>

      {t.citate && t.citate.length > 0 && (
        <section className="mb-8">
          {t.citate.map((c, i) => (
            <blockquote
              key={i}
              className="border-l-2 border-amber-glow pl-4 italic text-paper my-4"
            >
              {c}
            </blockquote>
          ))}
        </section>
      )}
    </article>
  );
}
