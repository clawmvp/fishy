import Link from "next/link";
import { getPending } from "@/lib/insights-pending";
import { PropunereCard } from "@/components/PropunereCard";

export const dynamic = "force-dynamic";

export default async function PropuneriPage() {
  const all = await getPending();
  const pending = all.filter((p) => p.status === "pending");
  const accepted = all.filter((p) => p.status === "accepted");
  const rejected = all.filter((p) => p.status === "rejected");

  const counts = {
    loc: pending.filter((p) => p.type === "loc").length,
    tehnica: pending.filter((p) => p.type === "tehnica").length,
    montura: pending.filter((p) => p.type === "montura").length,
    echipament: pending.filter((p) => p.type === "echipament").length,
    obs: pending.filter((p) => p.type === "obs").length,
  };

  return (
    <div>
      <nav className="flex flex-wrap gap-2 mb-6">
        <Link href="/admin" className="text-xs uppercase tracking-widest text-fog/70 hover:text-amber-glow border border-amber-glow/15 hover:border-amber-glow/40 rounded-md px-3 py-1.5 transition-colors">
          ← dashboard
        </Link>
      </nav>

      <header className="mb-8">
        <p className="text-xs uppercase tracking-[0.3em] text-moss mb-3">admin · review</p>
        <h1 className="text-4xl md:text-5xl font-display text-fog mb-3">Propuneri din videoclipuri noi</h1>
        <p className="text-fog/75 max-w-3xl leading-relaxed">
          Cron-ul zilnic la 7:30 AM extrage cunoștințe noi (locuri, tehnici, monturi, <strong className="text-cyan-300">echipament</strong>, observații) din
          semnalele Beacon cu scor &ge; 60 din ultimele 7 zile. <strong className="text-amber-glow">Acceptarea
          publică instantaneu</strong> entry-ul pe /locuri, /tehnici, /monturi sau /echipament.
        </p>
      </header>

      {/* Stats */}
      <section className="grid grid-cols-2 md:grid-cols-5 gap-3 mb-8">
        <Stat label="Locuri noi" n={counts.loc} color="#a8c87a" />
        <Stat label="Tehnici noi" n={counts.tehnica} color="#d4a657" />
        <Stat label="Monturi noi" n={counts.montura} color="#e89844" />
        <Stat label="Echipament" n={counts.echipament} color="#8cc7d1" />
        <Stat label="Observații" n={counts.obs} color="#9bb5a3" />
      </section>

      {/* Pending */}
      <section className="mb-10">
        <h2 className="text-xl md:text-2xl font-display text-amber-glow mb-4">
          ⏳ De review ({pending.length})
        </h2>
        {pending.length === 0 ? (
          <div className="card rounded-xl p-6 text-center">
            <p className="text-fog/70 mb-1">Nimic de review acum.</p>
            <p className="text-xs text-fog/50">Cron-ul zilnic la 7:30 AM extrage propuneri noi din semnale Beacon scor ≥60.</p>
          </div>
        ) : (
          <div className="grid md:grid-cols-2 gap-3">
            {pending.map((p) => <PropunereCard key={p.id} p={p} />)}
          </div>
        )}
      </section>

      {/* Accepted */}
      {accepted.length > 0 && (
        <section className="mb-10">
          <h2 className="text-xl md:text-2xl font-display text-moss mb-4">
            ✓ Acceptate ({accepted.length}) — gata de integrare
          </h2>
          <p className="text-xs text-fog/50 mb-3">
            Aceste propuneri vor fi adăugate la <code className="text-amber-glow">data/locuri.ts</code>, <code className="text-amber-glow">tehnici.ts</code>, <code className="text-amber-glow">monturi.ts</code> la următorul deploy manual.
          </p>
          <div className="grid md:grid-cols-2 gap-3">
            {accepted.map((p) => <PropunereCard key={p.id} p={p} />)}
          </div>
        </section>
      )}

      {/* Rejected — collapsed */}
      {rejected.length > 0 && (
        <section>
          <details>
            <summary className="cursor-pointer text-base text-fog/55 hover:text-amber-glow mb-3">
              ✕ Respinse ({rejected.length}) — arhivă
            </summary>
            <div className="grid md:grid-cols-2 gap-3 mt-3">
              {rejected.map((p) => <PropunereCard key={p.id} p={p} />)}
            </div>
          </details>
        </section>
      )}
    </div>
  );
}

function Stat({ label, n, color }: { label: string; n: number; color: string }) {
  return (
    <div className="card rounded-xl p-3 text-center" style={{ borderColor: `${color}30` }}>
      <div className="text-2xl font-light" style={{ color }}>{n}</div>
      <div className="text-[10px] uppercase tracking-wider text-fog/55 mt-0.5">{label}</div>
    </div>
  );
}
