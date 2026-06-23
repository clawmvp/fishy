import Link from "next/link";
import { listCronLogs } from "@/lib/cron-log";

export const dynamic = "force-dynamic";

function timeAgo(iso: string | null): string {
  if (!iso) return "—";
  const min = Math.floor((Date.now() - new Date(iso).getTime()) / 60000);
  if (min < 60) return `${min}min`;
  if (min < 1440) return `${Math.floor(min / 60)}h`;
  return `${Math.floor(min / 1440)}z`;
}

const ACTION_LABEL: Record<string, string> = {
  "beacon-scan": "📡 Beacon scan",
  "extract-insights": "🔍 Extract insights",
  "cota-snapshot": "💧 Cota snapshot",
};

export default async function AdminLogsPage() {
  const logs = await listCronLogs(100);

  return (
    <div>
      <nav className="flex flex-wrap gap-2 mb-6">
        <Link href="/admin" className="text-xs uppercase tracking-widest text-fog/70 hover:text-amber-glow border border-amber-glow/15 hover:border-amber-glow/40 rounded-md px-3 py-1.5 transition-colors">← dashboard</Link>
      </nav>

      <header className="mb-6">
        <p className="text-xs uppercase tracking-[0.3em] text-moss mb-2">admin · cron logs</p>
        <h1 className="text-3xl font-display text-fog">Logs ultimele {logs.length} rulări</h1>
      </header>

      {logs.length === 0 ? (
        <div className="card rounded-xl p-8 text-center">
          <p className="text-fog/70">Niciun cron rulat încă cu logging. Logging-ul a fost activat acum — primele rulări vor apărea aici.</p>
        </div>
      ) : (
        <div className="space-y-2">
          {logs.map((l) => {
            const color = l.status === "ok" ? "#a8c87a" : l.status === "error" ? "#c84a3c" : "#d4a657";
            return (
              <article key={l.id} className="card rounded-lg p-3" style={{ borderColor: `${color}30` }}>
                <div className="flex items-baseline justify-between gap-2 mb-1 flex-wrap">
                  <div className="flex items-baseline gap-2">
                    <span className="text-sm font-medium" style={{ color }}>
                      {l.status === "ok" ? "✓" : l.status === "error" ? "✕" : "⏳"} {ACTION_LABEL[l.action] ?? l.action}
                    </span>
                    {l.duration_ms != null && <span className="text-xs text-fog/55">{Math.round(l.duration_ms / 100) / 10}s</span>}
                  </div>
                  <span className="text-xs text-fog/45">acum {timeAgo(l.started_at)}</span>
                </div>
                {l.error && <p className="text-xs text-red-400">⚠️ {l.error.slice(0, 200)}</p>}
                {l.result && (
                  <details>
                    <summary className="text-xs text-moss hover:text-amber-glow cursor-pointer">rezultat</summary>
                    <pre className="mt-1 p-2 bg-water-2/40 rounded text-[10px] text-fog/85 overflow-x-auto whitespace-pre-wrap max-h-40">
                      {JSON.stringify(l.result, null, 2)}
                    </pre>
                  </details>
                )}
              </article>
            );
          })}
        </div>
      )}
    </div>
  );
}
