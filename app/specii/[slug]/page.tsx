import Link from "next/link";
import type { Metadata } from "next";
import { notFound } from "next/navigation";
import {
  specii,
  getSpecieBySlug,
  isInProhibitie,
  zileLaDeschidere,
} from "@/data/specii";
import { tehnici } from "@/data/tehnici";
import { locuri } from "@/data/locuri";
import { articole } from "@/data/articole";
import { monturi } from "@/data/monturi";
import { echipament } from "@/data/echipament";

const LUNI = ["", "ianuarie", "februarie", "martie", "aprilie", "mai", "iunie", "iulie", "august", "septembrie", "octombrie", "noiembrie", "decembrie"];
const metodaLabel: Record<string, string> = { spinning: "spinning", static: "la fund / static" };

const precipLabel: Record<string, string> = {
  dry: "vreme uscată",
  light_rain: "ploaie ușoară",
  any: "indiferent",
  after_rain: "după ploaie",
};
const cloudLabel: Record<string, string> = {
  clear: "senin",
  overcast: "înnorat",
  any: "indiferent",
};
const moonLabel: Record<string, string> = {
  new: "lună nouă",
  full: "lună plină",
  new_or_full: "lună nouă sau plină",
  any: "indiferent",
};
const pressureLabel: Record<string, string> = {
  stable: "presiune stabilă",
  falling: "presiune în scădere",
  rising: "presiune în creștere",
  any: "indiferent",
};

export function generateStaticParams() {
  return specii.map((s) => ({ slug: s.id }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const s = getSpecieBySlug(slug);
  if (!s) return {};
  const desc = `Pescuit la ${s.nume.toLowerCase()} (${s.latin}) în Delta Dunării: prohibiție ${s.prohibitie.start.d} ${LUNI[s.prohibitie.start.m]} – ${s.prohibitie.end.d} ${LUNI[s.prohibitie.end.m]}, mărime minimă ${s.marimeMinima} cm, tehnici, locuri și condiții optime.`;
  return {
    title: `${s.nume} — pescuit, prohibiție și condiții optime`,
    description: desc,
    alternates: { canonical: `/specii/${s.id}` },
    openGraph: { title: `${s.nume} în Delta Dunării · fishy`, description: desc },
  };
}

export default async function SpeciePage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const s = getSpecieBySlug(slug);
  if (!s) notFound();

  const now = new Date();
  const inProh = isInProhibitie(s, now);
  const zile = inProh ? zileLaDeschidere(s, now) : 0;
  const oc = s.optimalConditions;

  const tehniciSpecie = tehnici.filter((t) => t.specie === s.id);
  const monturiSpecie = monturi.filter((m) => m.pentru.includes(s.id));
  const locuriSpecie = locuri.filter((l) => l.specii.includes(s.id));
  const echipamentSpecie = echipament.filter((e) => e.pentru.includes(s.id));
  const articoleSpecie = articole.filter((a) => a.tags.includes(s.id));

  return (
    <article className="max-w-3xl">
      <Link href="/specii" className="text-sm text-moss hover:text-amber-glow">
        ← toate speciile
      </Link>

      <header className="mb-8 mt-4">
        <p className="text-xs uppercase tracking-[0.3em] text-moss mb-3">
          {metodaLabel[s.metoda] ?? s.metoda}
        </p>
        <h1 className="text-4xl md:text-5xl font-display text-amber-glow mb-2">{s.nume}</h1>
        <p className="text-lg italic text-fog/55 mb-4">{s.latin}</p>
        <p className="text-lg text-fog/80 leading-relaxed">{s.descriere}</p>
      </header>

      {/* Status prohibiție */}
      <div
        className={`rounded-lg p-4 mb-8 border ${
          inProh
            ? "bg-red-500/10 border-red-500/30"
            : "bg-moss/10 border-moss/30"
        }`}
      >
        {inProh ? (
          <p className="text-red-200">
            <strong>Prohibiție activă</strong> — se redeschide în {zile}{" "}
            {zile === 1 ? "zi" : "zile"} (după {s.prohibitie.end.d} {LUNI[s.prohibitie.end.m]}).
          </p>
        ) : (
          <p className="text-moss">
            <strong>Se poate pescui</strong> — în afara perioadei de prohibiție.
          </p>
        )}
      </div>

      {/* Date legale */}
      <div className="card rounded-lg p-5 mb-8 grid sm:grid-cols-3 gap-4">
        <div>
          <p className="text-xs uppercase tracking-widest text-moss mb-1.5">prohibiție</p>
          <p className="text-fog">
            {s.prohibitie.start.d} {LUNI[s.prohibitie.start.m]} – {s.prohibitie.end.d}{" "}
            {LUNI[s.prohibitie.end.m]}
          </p>
        </div>
        <div>
          <p className="text-xs uppercase tracking-widest text-moss mb-1.5">mărime minimă</p>
          <p className="text-fog">{s.marimeMinima} cm</p>
        </div>
        <div>
          <p className="text-xs uppercase tracking-widest text-moss mb-1.5">metodă</p>
          <p className="text-fog">{metodaLabel[s.metoda] ?? s.metoda}</p>
        </div>
      </div>

      {/* Sezon */}
      <section className="mb-8">
        <h2 className="text-xl font-display text-amber-glow mb-3">Sezon</h2>
        <p className="text-fog leading-relaxed">{s.sezonScurt}</p>
      </section>

      {/* Comportament */}
      <section className="mb-8">
        <h2 className="text-xl font-display text-amber-glow mb-3">Comportament</h2>
        <p className="text-fog leading-relaxed">{s.comportament}</p>
      </section>

      {/* Momeli */}
      <section className="mb-8">
        <h2 className="text-xl font-display text-amber-glow mb-3">Momeli și năluci</h2>
        <ul className="space-y-2">
          {s.momeli.map((m, i) => (
            <li key={i} className="flex gap-3 text-fog leading-relaxed">
              <span className="text-amber-glow flex-shrink-0">→</span>
              <span>{m}</span>
            </li>
          ))}
        </ul>
      </section>

      {/* Condiții optime */}
      <section className="mb-8">
        <h2 className="text-xl font-display text-amber-glow mb-3">Condiții optime</h2>
        <div className="card rounded-lg p-5 grid sm:grid-cols-2 gap-4 text-sm">
          <Detail label="temperatura apei">
            {oc.waterTempMin}–{oc.waterTempMax} °C
          </Detail>
          <Detail label="vânt maxim">{oc.windMax} km/h</Detail>
          <Detail label="cotă optimă">
            {oc.cotaOptima.min}–{oc.cotaOptima.max} cm
          </Detail>
          <Detail label="cer">{cloudLabel[oc.cloudPreference]}</Detail>
          <Detail label="precipitații">{precipLabel[oc.precipPreference]}</Detail>
          <Detail label="presiune">{pressureLabel[oc.pressurePreference]}</Detail>
          <Detail label="lună">{moonLabel[oc.moonPreference]}</Detail>
          <Detail label="cel mai bun moment">{oc.bestTimeOfDay}</Detail>
        </div>
        <p className="text-sm text-fog/60 mt-3 leading-relaxed">
          <span className="text-moss">Cotă:</span> {oc.cotaOptima.nota}
        </p>
      </section>

      {/* Tehnici */}
      {tehniciSpecie.length > 0 && (
        <CrossSection title={`Tehnici pentru ${s.nume.toLowerCase()}`} count={tehniciSpecie.length}>
          {tehniciSpecie.map((t) => (
            <Link key={t.slug} href={`/tehnici/${t.slug}`} className="card rounded-lg p-4">
              <h3 className="text-base font-display text-fog mb-1">{t.titlu}</h3>
              <p className="text-sm text-fog/55">{t.scurt}</p>
            </Link>
          ))}
        </CrossSection>
      )}

      {/* Monturi */}
      {monturiSpecie.length > 0 && (
        <CrossSection title={`Monturi pentru ${s.nume.toLowerCase()}`} count={monturiSpecie.length}>
          {monturiSpecie.map((m) => (
            <Link key={m.slug} href={`/monturi/${m.slug}`} className="card rounded-lg p-4">
              <h3 className="text-base font-display text-fog mb-1">{m.nume}</h3>
              <p className="text-sm text-fog/55">{m.scop}</p>
            </Link>
          ))}
        </CrossSection>
      )}

      {/* Locuri */}
      {locuriSpecie.length > 0 && (
        <CrossSection title={`Locuri pentru ${s.nume.toLowerCase()}`} count={locuriSpecie.length}>
          {locuriSpecie.map((l) => (
            <Link key={l.slug} href={`/locuri/${l.slug}`} className="card rounded-lg p-4">
              <h3 className="text-base font-display text-fog mb-1">{l.nume}</h3>
              <p className="text-sm text-fog/55">{l.scurt}</p>
            </Link>
          ))}
        </CrossSection>
      )}

      {/* Echipament */}
      {echipamentSpecie.length > 0 && (
        <section className="mb-8">
          <h2 className="text-xl font-display text-amber-glow mb-3">
            Echipament recomandat
            <span className="text-fog/40 text-base ml-2">({echipamentSpecie.length})</span>
          </h2>
          <div className="card rounded-lg p-5">
            <ul className="space-y-2.5">
              {echipamentSpecie.map((e, i) => (
                <li key={i} className="flex gap-3 text-fog leading-relaxed">
                  <span className="text-moss flex-shrink-0">•</span>
                  <span>
                    <span className="text-fog">{e.nume}</span>
                    {e.specific && <span className="text-fog/50"> — {e.specific}</span>}
                  </span>
                </li>
              ))}
            </ul>
            <Link
              href="/echipament"
              className="inline-block mt-4 text-sm text-moss hover:text-amber-glow"
            >
              vezi tot echipamentul →
            </Link>
          </div>
        </section>
      )}

      {/* Articole */}
      {articoleSpecie.length > 0 && (
        <CrossSection title={`Articole despre ${s.nume.toLowerCase()}`} count={articoleSpecie.length}>
          {articoleSpecie.map((a) => (
            <Link key={a.slug} href={`/articole/${a.slug}`} className="card rounded-lg p-4">
              <h3 className="text-base font-display text-fog">{a.titlu}</h3>
            </Link>
          ))}
        </CrossSection>
      )}
    </article>
  );
}

function Detail({ label, children }: { label: string; children: React.ReactNode }) {
  return (
    <div>
      <p className="text-xs uppercase tracking-widest text-moss mb-1">{label}</p>
      <p className="text-fog">{children}</p>
    </div>
  );
}

function CrossSection({
  title,
  count,
  children,
}: {
  title: string;
  count: number;
  children: React.ReactNode;
}) {
  return (
    <section className="mb-8">
      <h2 className="text-xl font-display text-amber-glow mb-3">
        {title}
        <span className="text-fog/40 text-base ml-2">({count})</span>
      </h2>
      <div className="grid sm:grid-cols-2 gap-3">{children}</div>
    </section>
  );
}
