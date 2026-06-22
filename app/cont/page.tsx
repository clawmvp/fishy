import Link from "next/link";
import { redirect } from "next/navigation";
import { getSession } from "@/lib/auth";
import { getStats, listCatches } from "@/lib/catches";
import { listConversations } from "@/lib/chat-storage";

export const dynamic = "force-dynamic";

const SPECIE_LABEL: Record<string, string> = {
  crap: "Crap",
  somn: "Somn",
  stiuca: "Știucă",
  salau: "Șalău",
  biban: "Biban",
  avat: "Avat",
  caras: "Caras",
};

export default async function ContPage() {
  const user = await getSession();
  if (!user) redirect("/login");

  const [stats, capturi, conversations] = await Promise.all([
    getStats(user.id),
    listCatches(user.id),
    listConversations(user.id, 5),
  ]);

  const recente = capturi.slice(0, 5);

  return (
    <div>
      <header className="mb-8 flex items-baseline justify-between flex-wrap gap-2">
        <div>
          <p className="text-xs uppercase tracking-[0.3em] text-moss mb-2">cont</p>
          <h1 className="text-3xl md:text-4xl font-display text-fog mb-1">{user.name ?? user.email}</h1>
          <p className="text-sm text-fog/55">{user.email}</p>
        </div>
        <div className="flex items-center gap-2">
          <Link href="/cont/edit" className="text-xs text-fog/65 hover:text-amber-glow border border-amber-glow/20 hover:border-amber-glow/50 rounded-md px-3 py-1.5 transition-colors">
            ✎ editează profil
          </Link>
          <form action="/api/auth/logout" method="post">
            <button type="submit" className="text-xs text-fog/50 hover:text-amber-glow border border-amber-glow/20 hover:border-amber-glow/50 rounded-md px-3 py-1.5 transition-colors">
              ieșire
            </button>
          </form>
        </div>
      </header>

      {/* Stats top */}
      <section className="grid grid-cols-2 md:grid-cols-4 gap-3 mb-8">
        <div className="card rounded-xl p-4">
          <p className="text-xs uppercase tracking-widest text-moss mb-1">Capturi totale</p>
          <p className="text-3xl font-light text-amber-glow">{stats.total}</p>
        </div>
        <div className="card rounded-xl p-4">
          <p className="text-xs uppercase tracking-widest text-moss mb-1">Kg totali</p>
          <p className="text-3xl font-light text-amber-glow">{stats.totalKg}</p>
        </div>
        <div className="card rounded-xl p-4">
          <p className="text-xs uppercase tracking-widest text-moss mb-1">Cel mai mare</p>
          {stats.bigest ? (
            <>
              <p className="text-2xl font-light text-amber-glow">{stats.bigest.weight_kg}<span className="text-sm text-fog/55"> kg</span></p>
              <p className="text-xs text-fog/55 mt-0.5">{SPECIE_LABEL[stats.bigest.specie] ?? stats.bigest.specie}</p>
            </>
          ) : (
            <p className="text-base text-fog/40">—</p>
          )}
        </div>
        <div className="card rounded-xl p-4">
          <p className="text-xs uppercase tracking-widest text-moss mb-1">Specii prinse</p>
          <p className="text-3xl font-light text-amber-glow">{Object.keys(stats.perSpecie).length}</p>
        </div>
      </section>

      {/* Quick actions */}
      <section className="grid sm:grid-cols-2 gap-3 mb-8">
        <Link href="/capturi/new" className="card rounded-xl p-5 hover:border-amber-glow/60 transition-colors">
          <p className="text-xs uppercase tracking-widest text-moss mb-1">acțiune</p>
          <h3 className="text-xl font-display text-amber-glow">+ Adaugă captură</h3>
          <p className="text-sm text-fog/55 mt-1">specie, kg, loc, nadă, dată</p>
        </Link>
        <Link href="/capturi" className="card rounded-xl p-5 hover:border-amber-glow/60 transition-colors">
          <p className="text-xs uppercase tracking-widest text-moss mb-1">istoric</p>
          <h3 className="text-xl font-display text-amber-glow">Toate capturile ({stats.total})</h3>
          <p className="text-sm text-fog/55 mt-1">listă completă cu filtre</p>
        </Link>
      </section>

      {/* Per specie */}
      {Object.keys(stats.perSpecie).length > 0 && (
        <section className="mb-8">
          <h2 className="text-xl font-display text-amber-glow mb-3">Pe specii</h2>
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-3">
            {Object.entries(stats.perSpecie)
              .sort((a, b) => b[1].count - a[1].count)
              .map(([sp, s]) => (
                <div key={sp} className="card rounded-lg p-4">
                  <p className="text-xs uppercase tracking-widest text-moss">{SPECIE_LABEL[sp] ?? sp}</p>
                  <p className="text-2xl font-light text-fog mt-1">{s.count}<span className="text-sm text-fog/55"> capturi</span></p>
                  <p className="text-xs text-fog/55 mt-1">{s.kgTotal.toFixed(1)}kg total · max {s.bigest}kg</p>
                </div>
              ))}
          </div>
        </section>
      )}

      {/* Top locuri */}
      {stats.topLocuri.length > 0 && (
        <section className="mb-8">
          <h2 className="text-xl font-display text-amber-glow mb-3">Locurile tale productive</h2>
          <div className="card rounded-xl p-4">
            <ul className="space-y-1.5">
              {stats.topLocuri.map((l) => (
                <li key={l.locatie} className="flex justify-between items-baseline text-sm">
                  <span className="text-fog">{l.locatie}</span>
                  <span className="text-amber-glow font-medium">{l.count} capturi</span>
                </li>
              ))}
            </ul>
          </div>
        </section>
      )}

      {/* Recente */}
      {recente.length > 0 && (
        <section>
          <div className="flex items-baseline justify-between mb-3">
            <h2 className="text-xl font-display text-amber-glow">Recente</h2>
            <Link href="/capturi" className="text-sm text-moss hover:text-amber-glow">toate →</Link>
          </div>
          <div className="space-y-2">
            {recente.map((c) => (
              <Link key={c.id} href={`/capturi/${c.id}`} className="card rounded-lg p-3 flex items-baseline justify-between gap-3 hover:border-amber-glow/40 transition-colors">
                <div>
                  <p className="text-base text-fog">{SPECIE_LABEL[c.specie] ?? c.specie} {c.weight_kg && <span className="text-amber-glow">{c.weight_kg}kg</span>}</p>
                  <p className="text-xs text-fog/55">{new Date(c.caught_at).toLocaleDateString("ro-RO")} · {c.locatie_text ?? c.locatie_slug ?? "—"}</p>
                </div>
                <span className="text-xs text-fog/40">{c.released ? "↩ eliberat" : "🐟 păstrat"}</span>
              </Link>
            ))}
          </div>
        </section>
      )}

      {/* Conversații chat */}
      {conversations.length > 0 && (
        <section className="mt-8">
          <div className="flex items-baseline justify-between mb-3">
            <h2 className="text-xl font-display text-amber-glow">🐟 Conversații fishy chat</h2>
            <p className="text-xs text-fog/40">{conversations.length} recente</p>
          </div>
          <div className="space-y-2">
            {conversations.map((c) => (
              <div key={c.id} className="card rounded-lg p-3">
                <div className="flex items-baseline justify-between gap-2 mb-1">
                  <p className="text-sm font-medium text-fog truncate flex-1">{c.title ?? "Conversație"}</p>
                  <p className="text-xs text-fog/45 flex-shrink-0">{new Date(c.updated_at).toLocaleDateString("ro-RO", { day: "numeric", month: "short" })}</p>
                </div>
                <p className="text-xs text-fog/55 line-clamp-1">{c.preview?.slice(0, 120) ?? ""}</p>
                <p className="text-[10px] text-fog/40 mt-1">{c.message_count} mesaje</p>
              </div>
            ))}
          </div>
          <p className="text-xs text-fog/50 mt-3 text-center">
            Deschide chat-ul cu peștișorul aurit din colț pentru istoric complet 🐟
          </p>
        </section>
      )}

      {stats.total === 0 && (
        <div className="card rounded-xl p-8 text-center mt-8">
          <p className="text-fog/70 mb-3">Niciun catch înregistrat încă.</p>
          <Link href="/capturi/new" className="text-amber-glow hover:text-amber-soft text-sm">
            + Adaugă prima captură
          </Link>
        </div>
      )}
    </div>
  );
}
