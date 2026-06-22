import Link from "next/link";
import { listPublicCatches } from "@/lib/catches";
import type { CatchWithUser } from "@/lib/catches";
import { getAllLocuri } from "@/lib/data-combined";

export const dynamic = "force-dynamic";

const SPECIE_LABEL: Record<string, string> = {
  crap: "Crap", somn: "Somn", stiuca: "Știucă", salau: "Șalău", biban: "Biban", avat: "Avat", caras: "Caras",
};

function timeAgo(iso: string): string {
  const d = new Date(iso);
  const now = new Date();
  const min = Math.floor((now.getTime() - d.getTime()) / 60000);
  if (min < 60) return `acum ${min}min`;
  if (min < 1440) return `acum ${Math.floor(min / 60)}h`;
  const days = Math.floor(min / 1440);
  if (days < 7) return `${days} zile`;
  return d.toLocaleDateString("ro-RO", { day: "numeric", month: "long" });
}

function displayName(c: CatchWithUser): string {
  return c.user_nickname || c.user_name || "pescar";
}

export default async function FeedPage() {
  const [capturi, locuri] = await Promise.all([
    listPublicCatches(60),
    getAllLocuri(),
  ]);

  const locMap = new Map(locuri.map((l) => [l.slug, l.nume]));

  // Stats
  const totalKg = capturi.reduce((s, c) => s + (c.weight_kg ?? 0), 0);
  const perSpecie = new Map<string, number>();
  capturi.forEach((c) => perSpecie.set(c.specie, (perSpecie.get(c.specie) ?? 0) + 1));
  const topSpecii = [...perSpecie.entries()].sort((a, b) => b[1] - a[1]).slice(0, 6);

  return (
    <div>
      <header className="mb-6">
        <p className="text-xs uppercase tracking-[0.3em] text-moss mb-3">feed · capturi publice</p>
        <h1 className="text-3xl md:text-4xl font-display text-fog mb-2">Ce s-a prins în Delta</h1>
        <p className="text-fog/75 max-w-2xl">
          Capturi share-uite de pescarii fishy în ultimele săptămâni. <Link href="/cont" className="text-amber-glow hover:text-amber-soft">Loghează-te</Link> ca să-ți adaugi propriile capturi.
        </p>
      </header>

      {/* Stats */}
      {capturi.length > 0 && (
        <section className="grid grid-cols-2 md:grid-cols-4 gap-3 mb-6">
          <div className="card rounded-xl p-3">
            <p className="text-xs uppercase tracking-widest text-moss">Capturi total</p>
            <p className="text-2xl font-light text-amber-glow mt-1">{capturi.length}</p>
          </div>
          <div className="card rounded-xl p-3">
            <p className="text-xs uppercase tracking-widest text-moss">Kg totali</p>
            <p className="text-2xl font-light text-amber-glow mt-1">{totalKg.toFixed(1)}</p>
          </div>
          <div className="card rounded-xl p-3">
            <p className="text-xs uppercase tracking-widest text-moss">Specii</p>
            <p className="text-2xl font-light text-amber-glow mt-1">{perSpecie.size}</p>
          </div>
          <div className="card rounded-xl p-3">
            <p className="text-xs uppercase tracking-widest text-moss">Top specie</p>
            <p className="text-base text-fog mt-1">
              {topSpecii[0] ? `${SPECIE_LABEL[topSpecii[0][0]] ?? topSpecii[0][0]} (${topSpecii[0][1]})` : "—"}
            </p>
          </div>
        </section>
      )}

      {capturi.length === 0 ? (
        <div className="card rounded-xl p-8 text-center">
          <p className="text-fog/70 mb-3">Niciun catch share-uit public încă.</p>
          <p className="text-sm text-fog/55 mb-4">Fii primul care share-uiește o captură!</p>
          <Link href="/capturi/new" className="text-amber-glow hover:text-amber-soft">+ Adaugă captură →</Link>
        </div>
      ) : (
        <section className="space-y-3">
          {capturi.map((c) => {
            const locStr = c.locatie_slug
              ? (c.hide_exact_location ? "📍 zona " : "📍 ") + (locMap.get(c.locatie_slug) ?? c.locatie_slug)
              : c.locatie_text
                ? `📍 ${c.locatie_text}`
                : null;
            return (
              <article key={c.id} className="card rounded-xl p-4">
                <header className="flex items-baseline justify-between gap-2 mb-2 flex-wrap">
                  <div className="flex items-baseline gap-2">
                    <span className="text-base font-display text-amber-glow">
                      {SPECIE_LABEL[c.specie] ?? c.specie}
                    </span>
                    {c.weight_kg != null && <span className="text-base text-fog">{c.weight_kg} kg</span>}
                    {c.length_cm != null && <span className="text-xs text-fog/55">{c.length_cm}cm</span>}
                  </div>
                  <p className="text-xs text-fog/55">
                    <span className="text-fog/85">{displayName(c)}</span> · {timeAgo(c.caught_at)}
                    {c.released && <> · ↩ eliberat</>}
                  </p>
                </header>

                {c.photos && c.photos.length > 0 && (
                  <div className="flex gap-2 mb-2 overflow-x-auto">
                    {c.photos.map((url, i) => (
                      <a key={i} href={url} target="_blank" rel="noopener noreferrer">
                        <img src={url} alt={`Captură ${SPECIE_LABEL[c.specie] ?? c.specie}`} className="h-32 rounded-md object-cover border border-amber-glow/20 hover:border-amber-glow/60 transition-colors" />
                      </a>
                    ))}
                  </div>
                )}

                <div className="text-sm text-fog/85 flex flex-wrap gap-x-3 gap-y-1">
                  {locStr && (
                    <span>
                      {c.locatie_slug && !c.hide_exact_location ? (
                        <Link href={`/locuri/${c.locatie_slug}`} className="text-fog hover:text-amber-glow">{locStr}</Link>
                      ) : (
                        <span className="text-fog">{locStr}</span>
                      )}
                    </span>
                  )}
                  {c.nada && <span>🪱 {c.nada}</span>}
                  {c.tehnica && <span>🎣 {c.tehnica}</span>}
                </div>

                {c.note && (
                  <p className="text-sm text-fog/75 mt-2 leading-relaxed italic line-clamp-2">{c.note}</p>
                )}
              </article>
            );
          })}
        </section>
      )}
    </div>
  );
}
