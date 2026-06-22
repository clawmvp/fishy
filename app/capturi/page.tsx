import Link from "next/link";
import { redirect } from "next/navigation";
import { getSession } from "@/lib/auth";
import { listCatches } from "@/lib/catches";

export const dynamic = "force-dynamic";

const SPECIE_LABEL: Record<string, string> = {
  crap: "Crap", somn: "Somn", stiuca: "Știucă", salau: "Șalău", biban: "Biban", avat: "Avat", caras: "Caras",
};

export default async function CapturiPage() {
  const user = await getSession();
  if (!user) redirect("/login");

  const capturi = await listCatches(user.id);

  return (
    <div>
      <header className="flex items-baseline justify-between mb-6 flex-wrap gap-2">
        <div>
          <p className="text-xs uppercase tracking-[0.3em] text-moss mb-2">jurnal</p>
          <h1 className="text-3xl md:text-4xl font-display text-fog">Capturile mele ({capturi.length})</h1>
        </div>
        <Link href="/capturi/new" className="text-sm bg-amber-glow/15 hover:bg-amber-glow/25 border border-amber-glow/40 text-amber-glow font-medium rounded-md px-3 py-2 transition-colors">
          + Adaugă captură
        </Link>
      </header>

      {capturi.length === 0 ? (
        <div className="card rounded-xl p-8 text-center">
          <p className="text-fog/70 mb-3">Niciun catch înregistrat încă.</p>
          <Link href="/capturi/new" className="text-amber-glow hover:text-amber-soft">+ Adaugă prima captură</Link>
        </div>
      ) : (
        <div className="space-y-2">
          {capturi.map((c) => (
            <Link key={c.id} href={`/capturi/${c.id}`} className="card rounded-lg p-4 hover:border-amber-glow/40 transition-colors flex items-baseline justify-between gap-3">
              <div className="flex-1 min-w-0">
                <div className="flex items-baseline gap-3 mb-1">
                  <span className="text-lg font-display text-fog">{SPECIE_LABEL[c.specie] ?? c.specie}</span>
                  {c.weight_kg != null && <span className="text-base text-amber-glow font-medium">{c.weight_kg} kg</span>}
                  {c.length_cm != null && <span className="text-xs text-fog/55">{c.length_cm} cm</span>}
                </div>
                <p className="text-xs text-fog/55">
                  {new Date(c.caught_at).toLocaleDateString("ro-RO", { day: "numeric", month: "long", year: "numeric" })}
                  {(c.locatie_text || c.locatie_slug) && <> · 📍 {c.locatie_text ?? c.locatie_slug}</>}
                  {c.tehnica && <> · 🎣 {c.tehnica}</>}
                  {c.nada && <> · 🪱 {c.nada}</>}
                </p>
                {c.note && <p className="text-xs text-fog/70 mt-1 italic line-clamp-1">{c.note}</p>}
              </div>
              <span className="text-xs text-fog/40 flex-shrink-0">{c.released ? "↩ eliberat" : "🐟 păstrat"}</span>
            </Link>
          ))}
        </div>
      )}
    </div>
  );
}
