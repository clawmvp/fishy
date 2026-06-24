import Link from "next/link";
import { listPublicCatches } from "@/lib/catches";
import type { CatchWithUser } from "@/lib/catches";
import { getAllLocuri } from "@/lib/data-combined";
import { getSession } from "@/lib/auth";
import { getReactionsForCatches } from "@/lib/reactions";
import { getCatchContextsForDates, formatDateLabel } from "@/lib/catch-context";
import { ReactionsBar } from "@/components/ReactionsBar";
import { UserPopover } from "@/components/UserPopover";
import { FeedFilters } from "@/components/FeedFilters";
import ShareCatchButton from "@/components/ShareCatchButton";

export const dynamic = "force-dynamic";

const SPECIE_LABEL: Record<string, string> = {
  crap: "Crap", somn: "Somn", stiuca: "Știucă", salau: "Șalău", biban: "Biban", avat: "Avat", caras: "Caras",
};

const SPECIE_ICON: Record<string, string> = {
  crap: "🎣", somn: "🐊", stiuca: "🦈", salau: "🐠", biban: "🐡", avat: "🐟", caras: "🐟",
};

function timeAgo(iso: string): string {
  const d = new Date(iso);
  const now = new Date();
  const min = Math.floor((now.getTime() - d.getTime()) / 60000);
  if (min < 1) return "acum";
  if (min < 60) return `acum ${min}min`;
  if (min < 1440) return `acum ${Math.floor(min / 60)}h`;
  const days = Math.floor(min / 1440);
  if (days < 7) return `${days} zile`;
  return d.toLocaleDateString("ro-RO", { day: "numeric", month: "long" });
}

function staticMapUrl(lat: number, lng: number, zoom: number = 12): string {
  // Esri WorldImagery tile static — folosim 1 tile center la zoom
  const n = Math.pow(2, zoom);
  const x = Math.floor(((lng + 180) / 360) * n);
  const y = Math.floor(((1 - Math.log(Math.tan((lat * Math.PI) / 180) + 1 / Math.cos((lat * Math.PI) / 180)) / Math.PI) / 2) * n);
  return `https://server.arcgisonline.com/ArcGIS/rest/services/World_Imagery/MapServer/tile/${zoom}/${y}/${x}`;
}

export default async function FeedPage({ searchParams }: { searchParams: Promise<{ specie?: string; sort?: string }> }) {
  const params = await searchParams;
  const [session, locuri, capturiAll] = await Promise.all([
    getSession(),
    getAllLocuri(),
    listPublicCatches(120),
  ]);

  const locMap = new Map(locuri.map((l) => [l.slug, l.nume]));

  // Filter
  let capturi = capturiAll;
  if (params.specie && params.specie !== "toate") {
    if (params.specie === "carnasiere") {
      capturi = capturi.filter((c) => ["stiuca", "salau", "avat", "biban"].includes(c.specie));
    } else {
      capturi = capturi.filter((c) => c.specie === params.specie);
    }
  }

  // Reactions
  const reactionMap = await getReactionsForCatches(capturi.map((c) => c.id), session?.id);

  // Sort
  if (params.sort === "biggest") {
    capturi = [...capturi].sort((a, b) => (b.weight_kg ?? 0) - (a.weight_kg ?? 0));
  } else if (params.sort === "popular") {
    capturi = [...capturi].sort((a, b) => {
      const ra = reactionMap.get(a.id);
      const rb = reactionMap.get(b.id);
      const sumA = ra ? Object.values(ra.counts).reduce((s, n) => s + n, 0) : 0;
      const sumB = rb ? Object.values(rb.counts).reduce((s, n) => s + n, 0) : 0;
      return sumB - sumA;
    });
  }
  // default sort = chronological (already by caught_at DESC)

  // Context per dată (cota Tulcea + pattern hint)
  const ctxMap = await getCatchContextsForDates(capturi.map((c) => new Date(c.caught_at)));

  // Insights pre-computed
  const insights = computeInsights(capturiAll, locMap);

  // Group by period
  const grouped = groupByPeriod(capturi);
  const periods = Object.keys(grouped);

  // Stats top
  const totalKg = capturiAll.reduce((s, c) => s + (c.weight_kg ?? 0), 0);
  const perSpecie = new Map<string, number>();
  capturiAll.forEach((c) => perSpecie.set(c.specie, (perSpecie.get(c.specie) ?? 0) + 1));

  return (
    <div>
      <header className="mb-6">
        <p className="text-xs uppercase tracking-[0.3em] text-moss mb-3">feed · timeline</p>
        <h1 className="text-3xl md:text-4xl font-display text-fog mb-2">Ce s-a prins în Delta</h1>
        <p className="text-fog/75 max-w-2xl text-sm">
          {capturiAll.length} capturi publice · {totalKg.toFixed(1)}kg total · {perSpecie.size} specii.
          {!session && <> <Link href="/login" className="text-amber-glow hover:text-amber-soft">Loghează-te</Link> ca să adaugi capturile tale.</>}
        </p>
      </header>

      <FeedFilters currentSpecie={params.specie ?? "toate"} currentSort={params.sort ?? "recent"} />

      {capturi.length === 0 ? (
        <div className="card rounded-xl p-8 text-center mt-4">
          <p className="text-fog/70">Niciun catch pentru filtrele alese.</p>
        </div>
      ) : (
        <div className="relative mt-4">
          {/* Timeline rail */}
          <div className="absolute left-3 top-2 bottom-2 w-px bg-amber-glow/15 hidden md:block"></div>

          {periods.map((period, periodIdx) => (
            <section key={period} className="mb-8">
              <h2 className="md:ml-10 text-base uppercase tracking-widest text-amber-glow mb-3 sticky top-16 z-10 bg-water/80 backdrop-blur-sm py-1 inline-block">
                {period}
              </h2>

              {/* Insight inserat după primul period dacă există */}
              {periodIdx === 0 && insights[0] && (
                <div className="md:ml-10 mb-4">
                  <div className="card rounded-lg p-4" style={{ background: "linear-gradient(135deg, rgba(168,200,122,0.08), rgba(212,166,87,0.04))", border: "1px solid rgba(168,200,122,0.30)" }}>
                    <p className="text-xs uppercase tracking-widest text-moss mb-1">📊 insight automat</p>
                    <p className="text-sm text-fog/90">{insights[0]}</p>
                  </div>
                </div>
              )}

              <div className="space-y-3">
                {grouped[period].map((c, idx) => {
                  const photos = (c.photos as string[]) ?? [];
                  const isRecent = (Date.now() - new Date(c.caught_at).getTime()) < 12 * 60 * 60 * 1000;
                  const ctx = ctxMap.get(new Date(c.caught_at).toISOString().slice(0, 10));
                  const reactions = reactionMap.get(c.id);
                  const locStr = c.locatie_slug
                    ? (c.hide_exact_location ? "📍 zona " : "📍 ") + (locMap.get(c.locatie_slug) ?? c.locatie_slug)
                    : c.locatie_text ? `📍 ${c.locatie_text}` : null;
                  const showMap = !c.hide_exact_location && c.lat != null && c.lng != null;

                  // Insert insight every 8 catches
                  const showInsight = periodIdx === 0 && idx > 0 && idx % 8 === 0 && insights[Math.floor(idx / 8)];

                  return (
                    <div key={c.id} className="relative">
                      {/* Timeline dot */}
                      <div className="absolute left-3 top-5 w-2 h-2 rounded-full bg-amber-glow border-2 border-water -ml-1 hidden md:block z-10"></div>

                      <article className="md:ml-10 card rounded-xl p-4">
                        <header className="flex items-baseline justify-between gap-2 mb-2 flex-wrap">
                          <div className="flex items-baseline gap-2 flex-wrap">
                            <span className="text-lg">{SPECIE_ICON[c.specie] ?? "🐟"}</span>
                            <span className="text-base font-display text-amber-glow">{SPECIE_LABEL[c.specie] ?? c.specie}</span>
                            {c.weight_kg != null && <span className="text-base text-fog">{c.weight_kg}kg</span>}
                            {c.length_cm != null && <span className="text-xs text-fog/55">{c.length_cm}cm</span>}
                            {isRecent && (
                              <span className="text-xs px-1.5 py-0.5 rounded-md bg-moss/15 text-moss border border-moss/30 flex items-center gap-1">
                                <span className="w-1.5 h-1.5 rounded-full bg-moss animate-pulse"></span>
                                live
                              </span>
                            )}
                          </div>
                          <p className="text-xs text-fog/55 flex items-center gap-1.5">
                            <UserPopover userId={c.user_id} displayName={c.user_nickname || c.user_name || "pescar"} avatar={c.user_avatar} />
                            · {timeAgo(c.caught_at)}
                            {c.released && <> · ↩</>}
                          </p>
                        </header>

                        {/* Photos */}
                        {photos.length > 0 && (
                          <div className="flex gap-2 mb-3 overflow-x-auto">
                            {photos.map((url, i) => (
                              <a key={i} href={url} target="_blank" rel="noopener noreferrer">
                                <img src={url} alt="" className="h-40 rounded-md object-cover border border-amber-glow/20 hover:border-amber-glow/60 transition-colors" />
                              </a>
                            ))}
                          </div>
                        )}

                        {/* Mini-map preview cu satelit */}
                        {showMap && (
                          <div className="mb-3 flex items-start gap-2">
                            <a
                              href={`https://www.openstreetmap.org/?mlat=${c.lat}&mlon=${c.lng}&zoom=14`}
                              target="_blank"
                              rel="noopener noreferrer"
                              className="block w-20 h-20 rounded-md overflow-hidden border border-amber-glow/30 flex-shrink-0 relative group"
                            >
                              <img src={staticMapUrl(c.lat!, c.lng!, 13)} alt="" className="w-full h-full object-cover" />
                              <div className="absolute inset-0 flex items-center justify-center text-2xl">📍</div>
                            </a>
                            <p className="text-xs text-fog/55 leading-relaxed">
                              GPS exact: <code className="text-fog/85">{c.lat?.toFixed(4)}, {c.lng?.toFixed(4)}</code>
                              <br />Click pentru hartă completă →
                            </p>
                          </div>
                        )}

                        {/* Context strip */}
                        {(ctx?.cota_tulcea || ctx?.pattern_hint) && (
                          <div className="flex flex-wrap items-center gap-2 mb-3 text-xs">
                            {ctx.cota_tulcea != null && (
                              <span className="px-2 py-0.5 rounded-md bg-water-2/40 border border-amber-glow/15 text-fog/75">
                                💧 {ctx.cota_label}
                                {ctx.cota_variation != null && <span className="ml-1 text-fog/55">({ctx.cota_variation > 0 ? "+" : ""}{ctx.cota_variation}cm/zi)</span>}
                              </span>
                            )}
                            {ctx.pattern_hint && (
                              <span className="px-2 py-0.5 rounded-md bg-amber-glow/10 border border-amber-glow/30 text-amber-glow">
                                {ctx.pattern_hint}
                              </span>
                            )}
                          </div>
                        )}

                        {/* Loc + nadă + tehnică */}
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

                        {/* Reactions + share */}
                        <div className="flex items-center justify-between gap-3 mt-1">
                          <div className="min-w-0">
                            {reactions && (
                              <ReactionsBar
                                catchId={c.id}
                                initialCounts={reactions.counts}
                                initialMyEmojis={reactions.my_emojis}
                                isAuthed={!!session}
                              />
                            )}
                          </div>
                          <ShareCatchButton id={c.id} compact />
                        </div>
                      </article>

                      {showInsight && (
                        <div className="md:ml-10 mt-3 card rounded-lg p-4" style={{ background: "linear-gradient(135deg, rgba(212,166,87,0.06), rgba(168,200,122,0.04))" }}>
                          <p className="text-xs uppercase tracking-widest text-moss mb-1">📊 insight automat</p>
                          <p className="text-sm text-fog/90">{insights[Math.floor(idx / 8)]}</p>
                        </div>
                      )}
                    </div>
                  );
                })}
              </div>
            </section>
          ))}
        </div>
      )}
    </div>
  );
}

function groupByPeriod(catches: CatchWithUser[]): Record<string, CatchWithUser[]> {
  const groups: Record<string, CatchWithUser[]> = {};
  const now = new Date();
  for (const c of catches) {
    const label = formatDateLabel(new Date(c.caught_at), now);
    if (!groups[label]) groups[label] = [];
    groups[label].push(c);
  }
  return groups;
}

function computeInsights(catches: CatchWithUser[], _locMap: Map<string, string>): string[] {
  const insights: string[] = [];
  if (catches.length === 0) return insights;

  const week = catches.filter((c) => (Date.now() - new Date(c.caught_at).getTime()) < 7 * 24 * 60 * 60 * 1000);
  if (week.length >= 5) {
    const specCount = new Map<string, number>();
    week.forEach((c) => specCount.set(c.specie, (specCount.get(c.specie) ?? 0) + 1));
    const top = [...specCount.entries()].sort((a, b) => b[1] - a[1])[0];
    insights.push(`📈 Săptămâna asta: ${week.length} capturi share-uite, ${SPECIE_LABEL[top[0]] ?? top[0]} dominant (${top[1]} capturi).`);
  }

  // Biggest catch this period
  const bigest = catches.filter((c) => c.weight_kg != null).sort((a, b) => (b.weight_kg ?? 0) - (a.weight_kg ?? 0))[0];
  if (bigest && bigest.weight_kg && bigest.weight_kg >= 5) {
    insights.push(`🏆 Cea mai mare captură: ${SPECIE_LABEL[bigest.specie] ?? bigest.specie} ${bigest.weight_kg}kg — ${new Date(bigest.caught_at).toLocaleDateString("ro-RO")}`);
  }

  // Specie hot now
  const recent3d = catches.filter((c) => (Date.now() - new Date(c.caught_at).getTime()) < 3 * 24 * 60 * 60 * 1000);
  if (recent3d.length >= 3) {
    const sc = new Map<string, number>();
    recent3d.forEach((c) => sc.set(c.specie, (sc.get(c.specie) ?? 0) + 1));
    const top = [...sc.entries()].sort((a, b) => b[1] - a[1])[0];
    insights.push(`🔥 Hot acum: ${SPECIE_LABEL[top[0]] ?? top[0]} se prinde activ (${top[1]} capturi în 3 zile)`);
  }

  return insights;
}
