import { sql } from "@/lib/db";
import type { BeaconSignal } from "@/lib/beacon-types";
import { CANALE } from "@/lib/beacon-channels";

export const revalidate = 600; // 10 min — beacon nu se schimbă des

const CANAL_LABEL: Record<string, string> = Object.fromEntries(
  CANALE.map((c) => [c.slug, c.nume])
);

async function getSemnale(): Promise<BeaconSignal[]> {
  const rows = await sql`
    SELECT id, video_id, video_url, channel, title, upload_date,
           duration_sec, is_short, locatie, specii, nada, tehnica,
           stare_apa, vant_vreme, rezumat, semnale_concrete,
           scanned_at, relevant_score
    FROM fishy_beacon.signals
    WHERE relevant_score >= 30
    ORDER BY upload_date DESC NULLS LAST, scanned_at DESC
    LIMIT 60
  `;
  return rows as BeaconSignal[];
}

function timeAgo(iso: string | null): string {
  if (!iso) return "?";
  const d = new Date(iso);
  const now = new Date(2026, 5, 20); // fallback fix pentru SSG cache; cu revalidate=600 e dinamic
  const days = Math.floor((now.getTime() - d.getTime()) / (1000 * 60 * 60 * 24));
  if (days === 0) return "azi";
  if (days === 1) return "ieri";
  if (days < 7) return `acum ${days} zile`;
  if (days < 30) return `acum ${Math.floor(days / 7)} săpt`;
  return `acum ${Math.floor(days / 30)} luni`;
}

export default async function BeaconPage() {
  let semnale: BeaconSignal[] = [];
  let err: string | null = null;
  try {
    semnale = await getSemnale();
  } catch (e) {
    err = (e as Error).message;
  }

  // Stats
  const specieCount = new Map<string, number>();
  const locCount = new Map<string, number>();
  for (const s of semnale) {
    s.specii?.forEach((sp) => specieCount.set(sp, (specieCount.get(sp) ?? 0) + 1));
    if (s.locatie) locCount.set(s.locatie, (locCount.get(s.locatie) ?? 0) + 1);
  }
  const topSpecii = [...specieCount.entries()].sort((a, b) => b[1] - a[1]).slice(0, 6);
  const topLocuri = [...locCount.entries()].sort((a, b) => b[1] - a[1]).slice(0, 5);

  return (
    <div>
      <header className="mb-8">
        <p className="text-xs uppercase tracking-[0.3em] text-moss mb-3">beacon · semnale de teren</p>
        <h1 className="text-4xl md:text-5xl font-display text-fog mb-3">
          Ce se prinde acum în Delta
        </h1>
        <p className="text-fog/75 max-w-3xl leading-relaxed">
          Beacon scanează zilnic {CANALE.length} canale YouTube de pescuit și extrage semnale concrete
          din videoclipurile noi: locație, specie prinsă, nadă, tehnică, starea apei. Filtrate strict
          pe Delta Dunării și Dunărea inferioară.
        </p>
      </header>

      {err && (
        <div className="card rounded-lg p-4 mb-6 border-red-400/30">
          <p className="text-sm text-red-400">Eroare la încărcare: {err}</p>
        </div>
      )}

      {/* Stats */}
      {semnale.length > 0 && (
        <section className="grid sm:grid-cols-2 gap-4 mb-8">
          <div className="card rounded-xl p-4">
            <p className="text-xs uppercase tracking-widest text-moss mb-2">Specii active</p>
            {topSpecii.length === 0 ? <p className="text-sm text-fog/55">Niciuna încă</p> : (
              <div className="flex flex-wrap gap-1.5">
                {topSpecii.map(([sp, n]) => (
                  <span key={sp} className="tag">
                    {sp} <span className="text-amber-glow ml-1">{n}</span>
                  </span>
                ))}
              </div>
            )}
          </div>
          <div className="card rounded-xl p-4">
            <p className="text-xs uppercase tracking-widest text-moss mb-2">Locații mențiuni</p>
            {topLocuri.length === 0 ? <p className="text-sm text-fog/55">Niciuna încă</p> : (
              <ul className="space-y-0.5">
                {topLocuri.map(([loc, n]) => (
                  <li key={loc} className="text-sm text-fog/85 flex justify-between">
                    <span>{loc}</span>
                    <span className="text-amber-glow">{n}</span>
                  </li>
                ))}
              </ul>
            )}
          </div>
        </section>
      )}

      {/* Feed */}
      {semnale.length === 0 && !err ? (
        <div className="card rounded-xl p-8 text-center">
          <p className="text-fog/70 mb-2">Niciun semnal scanat încă.</p>
          <p className="text-sm text-fog/55">
            Beacon-ul rulează zilnic la 5 AM și caută videoclipuri noi pe {CANALE.length} canale.
            Revino mâine pentru primele semnale.
          </p>
        </div>
      ) : (
        <section className="space-y-3">
          {semnale.map((s) => (
            <article key={s.id} className="card rounded-xl p-5">
              <div className="flex items-baseline justify-between gap-3 mb-2 flex-wrap">
                <div>
                  <p className="text-xs text-amber-glow uppercase tracking-widest">
                    {CANAL_LABEL[s.channel] ?? s.channel} · {timeAgo(s.upload_date)}
                    {s.is_short && <span className="ml-2 text-fog/40">SHORT</span>}
                  </p>
                  <h2 className="text-lg font-display text-fog mt-0.5">
                    <a href={s.video_url} target="_blank" rel="noopener noreferrer" className="hover:text-amber-glow">
                      {s.title}
                    </a>
                  </h2>
                </div>
                <span className="text-xs text-fog/40">{s.relevant_score}/100</span>
              </div>

              {s.rezumat && (
                <p className="text-sm text-fog/85 leading-relaxed mb-3">{s.rezumat}</p>
              )}

              <div className="grid sm:grid-cols-2 gap-2 mt-3">
                {s.locatie && <Detaliu eticheta="📍 Locație" valoare={s.locatie} />}
                {s.specii && s.specii.length > 0 && (
                  <Detaliu eticheta="🐟 Specii" valoare={s.specii.join(", ")} />
                )}
                {s.nada && <Detaliu eticheta="🪱 Nadă/momeală" valoare={s.nada} />}
                {s.tehnica && <Detaliu eticheta="🎣 Tehnică" valoare={s.tehnica} />}
                {s.stare_apa && <Detaliu eticheta="💧 Stare apă" valoare={s.stare_apa} />}
                {s.vant_vreme && <Detaliu eticheta="💨 Vânt/vreme" valoare={s.vant_vreme} />}
              </div>
            </article>
          ))}
        </section>
      )}
    </div>
  );
}

function Detaliu({ eticheta, valoare }: { eticheta: string; valoare: string }) {
  return (
    <div className="text-sm">
      <span className="text-xs text-moss uppercase tracking-widest">{eticheta}</span>
      <p className="text-fog/85 leading-snug mt-0.5">{valoare}</p>
    </div>
  );
}
