import Link from "next/link";
import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { getPublicCatch, catchSlug } from "@/lib/catches";
import { displayName } from "@/lib/profile";
import CatchConditions from "@/components/CatchConditions";

export const dynamic = "force-dynamic";

const SPECIE_LABEL: Record<string, string> = {
  crap: "Crap", somn: "Somn", stiuca: "Știucă", salau: "Șalău", biban: "Biban", avat: "Avat", caras: "Caras",
};

export async function generateMetadata({ params }: { params: Promise<{ id: string }> }): Promise<Metadata> {
  const { id: idStr } = await params;
  const c = await getPublicCatch(parseInt(idStr, 10));
  if (!c) return { title: "Captură" };
  const specie = SPECIE_LABEL[c.specie] ?? c.specie;
  const who = displayName({ name: c.user_name, nickname: c.user_nickname });
  const title = `${specie}${c.weight_kg != null ? ` ${c.weight_kg} kg` : ""} — captură de ${who}`;
  const desc = `Captură de ${specie} în Delta Dunării, raportată de ${who} pe fishy.`;
  return {
    title,
    description: desc,
    alternates: { canonical: catchSlug(c, who) },
    openGraph: {
      type: "article",
      title,
      description: desc,
      images: c.photos && c.photos.length > 0 ? [c.photos[0]] : undefined,
    },
  };
}

export default async function PublicCatchPage({ params }: { params: Promise<{ id: string }> }) {
  const { id: idStr } = await params;
  const id = parseInt(idStr, 10);
  const c = await getPublicCatch(id);
  if (!c) notFound();

  const specie = SPECIE_LABEL[c.specie] ?? c.specie;
  const who = displayName({ name: c.user_name, nickname: c.user_nickname });

  return (
    <article className="max-w-2xl">
      <Link href="/feed" className="text-sm text-moss hover:text-amber-glow">← feed comunitate</Link>

      <header className="mt-4 mb-6">
        <p className="text-xs uppercase tracking-[0.3em] text-moss mb-2">captură publică</p>
        <h1 className="text-3xl md:text-4xl font-display text-amber-glow mb-2">
          {specie}
          {c.weight_kg != null && <span className="text-fog/85 ml-3">{c.weight_kg} kg</span>}
        </h1>
        <p className="text-sm text-fog/55">
          de{" "}
          <Link href={`/users/${c.user_id}`} className="text-moss hover:text-amber-glow">{who}</Link>
          {" · "}
          {new Date(c.caught_at).toLocaleDateString("ro-RO", { day: "numeric", month: "long", year: "numeric" })}
          {" · "}
          {c.released ? "↩ eliberat" : "🐟 păstrat"}
        </p>
      </header>

      {c.photos && c.photos.length > 0 && (
        <div className={`grid gap-2 mb-6 ${c.photos.length === 1 ? "grid-cols-1" : "grid-cols-2 sm:grid-cols-3"}`}>
          {c.photos.map((url, i) => (
            // eslint-disable-next-line @next/next/no-img-element
            <img key={i} src={url} alt={`${specie} ${i + 1}`} className="w-full rounded-lg border border-amber-glow/20 object-cover aspect-square" />
          ))}
        </div>
      )}

      <CatchConditions snapshot={c.conditions_snapshot} />

      <div className="card rounded-xl p-5 space-y-3">
        {c.length_cm != null && <Row label="Lungime" value={`${c.length_cm} cm`} />}
        {/* Locația: doar regiune dacă hide_exact_location */}
        {(c.locatie_text || c.locatie_slug) && (
          <Row
            label="📍 Loc"
            value={c.hide_exact_location ? "Delta Dunării (zonă ascunsă de pescar)" : (c.locatie_text ?? c.locatie_slug ?? "")}
            link={!c.hide_exact_location && c.locatie_slug ? `/locuri/${c.locatie_slug}` : undefined}
          />
        )}
        {c.nada && <Row label="🪱 Nadă" value={c.nada} />}
        {c.tehnica && <Row label="🎣 Tehnică" value={c.tehnica} />}
        {c.note && (
          <div>
            <p className="text-xs uppercase tracking-widest text-moss mb-1">Note</p>
            <p className="text-fog/85 leading-relaxed whitespace-pre-wrap">{c.note}</p>
          </div>
        )}
      </div>

      <p className="text-sm text-fog/50 mt-6">
        Vrei să-ți ții și tu jurnalul de capturi?{" "}
        <Link href="/login" className="text-moss hover:text-amber-glow">Intră pe fishy</Link>.
      </p>
    </article>
  );
}

function Row({ label, value, link }: { label: string; value: string; link?: string }) {
  return (
    <div>
      <p className="text-xs uppercase tracking-widest text-moss mb-0.5">{label}</p>
      {link ? <Link href={link} className="text-fog hover:text-amber-glow">{value}</Link> : <p className="text-fog">{value}</p>}
    </div>
  );
}
