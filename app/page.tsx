import Link from "next/link";
import { locuri } from "@/data/locuri";
import { tehnici } from "@/data/tehnici";
import { articole } from "@/data/articole";
import { echipament } from "@/data/echipament";
import { glosar } from "@/data/glosar";

export default function Home() {
  const stats = {
    locuri: locuri.length,
    tehnici: tehnici.length,
    articole: articole.length,
    echipament: echipament.length,
    glosar: glosar.length,
  };

  return (
    <div>
      {/* Hero */}
      <section className="py-14 mb-8">
        <p className="text-xs uppercase tracking-[0.3em] text-moss mb-4">
          glosar de teren
        </p>
        <h1 className="text-5xl md:text-6xl font-display font-light text-fog leading-[1.05] mb-6 max-w-4xl">
          Pescuit în <span className="text-amber-glow">Delta Dunării</span>,
          extras din 28 de partide reale.
        </h1>
        <p className="text-lg text-fog/70 max-w-2xl leading-relaxed">
          Locuri, tehnici, monturi, mărci de boilies și năluci — din transcrierile
          videourilor pescarilor români. Spinning la știucă, șalău, avat. Crap
          static pe brațe și canale. Filozofia lui Călin Vișoianu.
        </p>
      </section>

      {/* Live banner */}
      <section className="mb-8">
        <Link
          href="/azi"
          className="block card rounded-xl p-6 hover:scale-[1.01] transition-transform"
          style={{ background: "linear-gradient(135deg, rgba(212,166,87,0.15), rgba(107,163,104,0.1))" }}
        >
          <div className="flex items-baseline justify-between flex-wrap gap-2">
            <div>
              <p className="text-xs uppercase tracking-[0.3em] text-amber-glow mb-1">planifică partida</p>
              <h3 className="text-2xl font-display text-fog">Prognoză 14 zile + ferestre recomandate</h3>
              <p className="text-sm text-fog/70 mt-1">Detectăm automat ferestrele de 2-3 zile consecutive cu condiții bune. Plus prognoză 4 zile detaliată cu recomandări de locuri, tehnici și monturi pentru fiecare specie.</p>
            </div>
            <span className="text-amber-glow text-2xl">→</span>
          </div>
        </Link>
      </section>

      {/* Quick cards */}
      <section className="grid md:grid-cols-2 gap-4 mb-12">
        <Link
          href="/tehnici?metoda=spinning"
          className="card rounded-xl p-6 group"
        >
          <p className="text-xs uppercase tracking-widest text-moss mb-2">
            spinning
          </p>
          <h3 className="text-2xl font-display text-amber-glow mb-2">
            Știucă · Șalău · Avat
          </h3>
          <p className="text-fog/70 text-sm">
            Tehnici, năluci, monturi pe specie — din Neajlov până la Stația 11
            în Deltă.
          </p>
        </Link>

        <Link
          href="/tehnici?metoda=static"
          className="card rounded-xl p-6 group"
        >
          <p className="text-xs uppercase tracking-widest text-moss mb-2">
            crap
          </p>
          <h3 className="text-2xl font-display text-amber-glow mb-2">
            Crap pe brațe & canale
          </h3>
          <p className="text-fog/70 text-sm">
            Boilies, momitor, plumb pierdut, prag de iarnă. Filozofia Vișoianu
            pentru partide lungi.
          </p>
        </Link>
      </section>

      {/* Stats row */}
      <section className="grid grid-cols-2 md:grid-cols-5 gap-3 mb-16">
        {[
          { n: stats.locuri, l: "locuri", href: "/locuri" },
          { n: stats.tehnici, l: "tehnici", href: "/tehnici" },
          { n: stats.echipament, l: "echipament", href: "/echipament" },
          { n: stats.articole, l: "articole", href: "/articole" },
          { n: stats.glosar, l: "termeni", href: "/glosar" },
        ].map((s) => (
          <Link
            key={s.l}
            href={s.href}
            className="card rounded-lg p-4 text-center hover:scale-105 transition-transform"
          >
            <div className="text-3xl font-light text-amber-glow">{s.n}</div>
            <div className="text-xs uppercase tracking-wider text-fog/50 mt-1">
              {s.l}
            </div>
          </Link>
        ))}
      </section>

      {/* Recent articole */}
      <section className="mb-16">
        <div className="flex items-baseline justify-between mb-5">
          <h2 className="text-2xl font-display text-amber-glow">
            articole de citit
          </h2>
          <Link
            href="/articole"
            className="text-sm text-moss hover:text-amber-glow"
          >
            toate →
          </Link>
        </div>
        <div className="grid md:grid-cols-2 gap-3">
          {articole.slice(0, 4).map((a) => (
            <Link
              key={a.slug}
              href={`/articole/${a.slug}`}
              className="card rounded-lg p-5"
            >
              <h3 className="text-lg font-display text-fog mb-1">{a.titlu}</h3>
              <p className="text-sm text-fog/60 mb-3 leading-relaxed">
                {a.scurt}
              </p>
              <div className="flex flex-wrap gap-1.5">
                {a.tags.map((t) => (
                  <span key={t} className="tag">
                    {t}
                  </span>
                ))}
              </div>
            </Link>
          ))}
        </div>
      </section>

      {/* Top locuri */}
      <section>
        <div className="flex items-baseline justify-between mb-5">
          <h2 className="text-2xl font-display text-amber-glow">
            locuri celebre
          </h2>
          <Link href="/locuri" className="text-sm text-moss hover:text-amber-glow">
            toate →
          </Link>
        </div>
        <div className="grid md:grid-cols-3 gap-3">
          {locuri.slice(0, 6).map((l) => (
            <Link
              key={l.slug}
              href={`/locuri/${l.slug}`}
              className="card rounded-lg p-4"
            >
              <p className="text-xs uppercase tracking-widest text-moss mb-1">
                {l.tip}
              </p>
              <h3 className="text-base font-display text-fog mb-2">{l.nume}</h3>
              <p className="text-sm text-fog/60 leading-snug">{l.scurt}</p>
            </Link>
          ))}
        </div>
      </section>
    </div>
  );
}
