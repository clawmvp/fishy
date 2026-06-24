import Link from "next/link";
import { notFound, redirect } from "next/navigation";
import { getSession } from "@/lib/auth";
import { getCatch, catchSlug } from "@/lib/catches";
import DeleteButton from "@/components/DeleteCatchButton";
import ShareCatchButton from "@/components/ShareCatchButton";
import CatchConditions from "@/components/CatchConditions";

export const dynamic = "force-dynamic";

const SPECIE_LABEL: Record<string, string> = {
  crap: "Crap", somn: "Somn", stiuca: "Știucă", salau: "Șalău", biban: "Biban", avat: "Avat", caras: "Caras",
};

export default async function CatchDetailPage({ params }: { params: Promise<{ id: string }> }) {
  const user = await getSession();
  if (!user) redirect("/login");

  const { id: idStr } = await params;
  const id = parseInt(idStr, 10);
  const c = await getCatch(user.id, id);
  if (!c) notFound();

  const hasGps = c.lat != null && c.lng != null;

  return (
    <article className="max-w-2xl">
      <Link href="/capturi" className="text-sm text-moss hover:text-amber-glow">← toate capturile</Link>

      <header className="mt-4 mb-6">
        <p className="text-xs uppercase tracking-[0.3em] text-moss mb-2">captură</p>
        <h1 className="text-3xl md:text-4xl font-display text-amber-glow mb-2">
          {SPECIE_LABEL[c.specie] ?? c.specie}
          {c.weight_kg != null && <span className="text-fog/85 ml-3">{c.weight_kg} kg</span>}
        </h1>
        <div className="flex items-center gap-2 flex-wrap">
          <p className="text-sm text-fog/55">
            {new Date(c.caught_at).toLocaleDateString("ro-RO", { weekday: "long", day: "numeric", month: "long", year: "numeric" })}
          </p>
          {c.public && (
            <span className="text-xs px-2 py-0.5 rounded-full bg-amber-glow/15 text-amber-glow">📡 public</span>
          )}
          <span className="text-xs px-2 py-0.5 rounded-full bg-moss/15 text-moss">
            {c.released ? "↩ eliberat" : "🐟 păstrat"}
          </span>
        </div>
      </header>

      {/* Poze */}
      {c.photos && c.photos.length > 0 && (
        <div className={`grid gap-2 mb-6 ${c.photos.length === 1 ? "grid-cols-1" : "grid-cols-2 sm:grid-cols-3"}`}>
          {c.photos.map((url, i) => (
            // eslint-disable-next-line @next/next/no-img-element
            <img
              key={i}
              src={url}
              alt={`Captură ${SPECIE_LABEL[c.specie] ?? c.specie} ${i + 1}`}
              className="w-full rounded-lg border border-amber-glow/20 object-cover aspect-square"
            />
          ))}
        </div>
      )}

      {/* Condiții din ziua capturii */}
      <CatchConditions snapshot={c.conditions_snapshot} />

      <div className="card rounded-xl p-5 mb-6 space-y-3">
        {c.length_cm != null && <Row label="Lungime" value={`${c.length_cm} cm`} />}
        {(c.locatie_text || c.locatie_slug) && (
          <Row label="📍 Loc" value={c.locatie_text ?? c.locatie_slug ?? ""} link={c.locatie_slug ? `/locuri/${c.locatie_slug}` : undefined} />
        )}
        {hasGps && (
          <div>
            <p className="text-xs uppercase tracking-widest text-moss mb-0.5">🛰️ Coordonate</p>
            <a
              href={`https://www.openstreetmap.org/?mlat=${c.lat}&mlon=${c.lng}#map=15/${c.lat}/${c.lng}`}
              target="_blank"
              rel="noopener noreferrer"
              className="text-fog hover:text-amber-glow font-mono text-sm"
            >
              {c.lat!.toFixed(5)}, {c.lng!.toFixed(5)} ↗
            </a>
          </div>
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

      <div className="flex items-center gap-2 flex-wrap">
        <Link
          href={`/capturi/${c.id}/edit`}
          className="py-2 px-4 rounded-md border border-amber-glow/30 text-amber-glow hover:bg-amber-glow/10 text-sm transition-colors"
        >
          ✎ Editează
        </Link>
        {c.public && <ShareCatchButton path={catchSlug(c, user.name)} />}
        <div className="ml-auto">
          <DeleteButton id={c.id} />
        </div>
      </div>
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
