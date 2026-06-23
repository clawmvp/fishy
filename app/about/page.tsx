import Link from "next/link";
import JsonLd from "@/components/JsonLd";

export const metadata = {
  title: "Despre fishy — cum funcționează",
  description:
    "Ce este fishy, de unde vin datele (cote hidro, vreme, semnale YouTube) și cum se calculează recomandările de pescuit pentru Delta Dunării.",
  alternates: { canonical: "/about" },
};

const faqLd = {
  "@context": "https://schema.org",
  "@type": "FAQPage",
  mainEntity: [
    {
      "@type": "Question",
      name: "De unde vin datele live (cote, vreme)?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "Cotele Dunării vin de la hidro.ro (oficial INHGA — Tulcea, Isaccea), debitul brațului Chilia din modelul GloFAS (Open-Meteo Flood), iar vremea și temperatura apei din Open-Meteo. Datele se actualizează la fiecare ~30 de minute.",
      },
    },
    {
      "@type": "Question",
      name: "Cum se calculează scorul pe specie?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "Un algoritm combină 6 factori (temperatura apei, cota, presiunea, vântul, precipitațiile și faza lunii), ponderați diferit pentru fiecare specie, plus pattern-uri sezoniere și un istoric de 30 de zile al cotei. Rezultă un scor 0-100 și un verdict (du-te / du-te scurt / mută-te / stai acasă).",
      },
    },
    {
      "@type": "Question",
      name: "Ce este Beacon?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "Beacon scanează zilnic canalele de pescuit de pe YouTube și extrage automat semnale relevante (capturi, tehnici, locuri, condiții) folosind un model Claude. Informația e clasificată după relevanță și folosită pentru semnalele live și propunerile de conținut nou.",
      },
    },
    {
      "@type": "Question",
      name: "Datele despre prohibiție sunt oficiale?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "Calendarul de prohibiție și mărimile minime se bazează pe reglementările ANPA pentru 2026. Verifică întotdeauna sursa oficială ANPA înainte de a pescui — regulile se pot modifica.",
      },
    },
  ],
};

export default function AboutPage() {
  return (
    <div className="max-w-3xl">
      <JsonLd data={faqLd} />

      <header className="mb-10">
        <p className="text-xs uppercase tracking-[0.3em] text-moss mb-3">despre</p>
        <h1 className="text-4xl md:text-5xl font-display text-fog mb-3">
          Ce este fishy
        </h1>
        <p className="text-lg text-fog/80 leading-relaxed">
          Un ghid de pescuit pentru Delta Dunării care unește datele live (cote,
          vreme, lună) cu experiența pescarilor — ca să știi <em>unde</em>,{" "}
          <em>când</em> și <em>cum</em> merită să mergi.
        </p>
      </header>

      <section className="mb-8">
        <h2 className="text-xl font-display text-amber-glow mb-3">De unde vin datele</h2>
        <ul className="space-y-2">
          {[
            "Cote Dunării: hidro.ro (oficial INHGA) — Tulcea și Isaccea, plus debitul Chilia din modelul GloFAS.",
            "Vremea și temperatura apei: Open-Meteo, prognoză pe 14 zile.",
            "Faza lunii: calculată local.",
            "Semnale de teren: extrase automat din canalele de pescuit de pe YouTube (Beacon).",
          ].map((t, i) => (
            <li key={i} className="flex gap-3 text-fog leading-relaxed">
              <span className="text-moss flex-shrink-0">•</span>
              <span>{t}</span>
            </li>
          ))}
        </ul>
      </section>

      <section className="mb-8">
        <h2 className="text-xl font-display text-amber-glow mb-3">Cum funcționează recomandările</h2>
        <p className="text-fog/85 leading-relaxed mb-3">
          Pentru fiecare specie, un algoritm combină 6 factori (temperatura apei,
          cota, presiunea, vântul, precipitațiile, luna), ponderați diferit, cu
          pattern-uri sezoniere și istoricul cotei pe 30 de zile. Rezultă un scor
          0-100 și un verdict clar.{" "}
          <Link href="/algoritm" className="text-amber-glow hover:underline">
            Vezi exact cum se calculează →
          </Link>
        </p>
      </section>

      <section className="mb-8">
        <h2 className="text-xl font-display text-amber-glow mb-3">Surse și mulțumiri</h2>
        <p className="text-fog/85 leading-relaxed">
          Conținutul e extras și sintetizat din experiența pescarilor care
          documentează Delta pe YouTube. Informația e orientativă — verifică
          mereu reglementările oficiale{" "}
          <a href="https://anpa.ro" target="_blank" rel="noopener" className="text-amber-glow hover:underline">
            ANPA
          </a>{" "}
          și condițiile reale pe teren. Nu garantăm acuratețea.
        </p>
      </section>

      <section className="mt-12 pt-6 border-t border-amber-glow/15">
        <p className="text-sm text-fog/55">
          Întrebări sau corecții?{" "}
          <a href="https://n01.app" className="text-moss hover:text-amber-glow">
            n01.app
          </a>
        </p>
      </section>
    </div>
  );
}
