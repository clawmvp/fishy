import Link from "next/link";
import type { BeaconSignal } from "@/lib/beacon-types";
import { CANALE } from "@/lib/beacon-channels";

const CANAL_LABEL: Record<string, string> = Object.fromEntries(
  CANALE.map((c) => [c.slug, c.nume])
);

function timeAgo(iso: string | null): string {
  if (!iso) return "?";
  const d = new Date(iso);
  const now = new Date();
  const days = Math.floor((now.getTime() - d.getTime()) / (1000 * 60 * 60 * 24));
  if (days <= 0) return "azi";
  if (days === 1) return "ieri";
  if (days < 7) return `${days} zile`;
  if (days < 30) return `${Math.floor(days / 7)} săpt`;
  return `${Math.floor(days / 30)} luni`;
}

export function SemnaleBeacon({ semnale, specie }: { semnale: BeaconSignal[]; specie: string }) {
  if (semnale.length === 0) return null;

  return (
    <div className="mb-4 p-4 rounded-lg" style={{
      background: "linear-gradient(135deg, rgba(107,163,104,0.06), rgba(212,166,87,0.03))",
      border: "1px solid rgba(107,163,104,0.20)",
    }}>
      <div className="flex items-baseline justify-between gap-2 mb-3">
        <div className="flex items-baseline gap-2">
          <span className="text-moss text-base">📡</span>
          <div>
            <p className="text-xs uppercase tracking-widest text-moss">
              ce-au prins ultimii pescari · {specie}
            </p>
            <p className="text-xs text-fog/50 mt-0.5">semnale teren YouTube ultimele 90 zile</p>
          </div>
        </div>
        <Link href={`/beacon?specie=${specie}`} className="text-xs text-amber-glow hover:text-amber-soft whitespace-nowrap">
          toate →
        </Link>
      </div>

      <div className="space-y-2.5">
        {semnale.map((s) => (
          <article key={s.id} className="rounded-md p-3 bg-water-2/30 border border-moss/15">
            <div className="flex items-baseline justify-between gap-2 mb-1 flex-wrap">
              <a href={s.video_url} target="_blank" rel="noopener noreferrer"
                className="text-sm font-display text-fog hover:text-amber-glow leading-snug">
                {s.title.length > 80 ? s.title.slice(0, 80) + "…" : s.title}
              </a>
              <span className="text-xs text-fog/40 whitespace-nowrap">
                {CANAL_LABEL[s.channel] ?? s.channel} · acum {timeAgo(s.upload_date)}
              </span>
            </div>
            {s.rezumat && (
              <p className="text-xs text-fog/80 leading-relaxed mb-1.5">{s.rezumat}</p>
            )}
            <div className="flex flex-wrap gap-x-3 gap-y-0.5 text-xs">
              {s.locatie && <span className="text-fog/70">📍 <span className="text-fog">{s.locatie.length > 60 ? s.locatie.slice(0,60)+"…" : s.locatie}</span></span>}
              {s.nada && <span className="text-fog/70">🪱 <span className="text-fog">{s.nada.length > 50 ? s.nada.slice(0,50)+"…" : s.nada}</span></span>}
              {s.tehnica && <span className="text-fog/70">🎣 <span className="text-fog">{s.tehnica.length > 50 ? s.tehnica.slice(0,50)+"…" : s.tehnica}</span></span>}
            </div>
          </article>
        ))}
      </div>
    </div>
  );
}
