import { toateSemnalele } from "@/lib/beacon-query";
import type { BeaconSignal } from "@/lib/beacon-types";
import { CANALE } from "@/lib/beacon-channels";
import { BeaconFiltre } from "@/components/BeaconFiltre";

export const dynamic = "force-dynamic";

export default async function BeaconPage({
  searchParams,
}: {
  searchParams: Promise<{ specie?: string }>;
}) {
  const params = await searchParams;
  let semnale: BeaconSignal[] = [];
  let err: string | null = null;
  try {
    semnale = await toateSemnalele();
  } catch (e) {
    err = (e as Error).message;
  }

  // Stats overview
  const specieCount = new Map<string, number>();
  const locCount = new Map<string, number>();
  for (const s of semnale) {
    s.specii?.forEach((sp) => specieCount.set(sp, (specieCount.get(sp) ?? 0) + 1));
    if (s.locatie) {
      const loc = s.locatie.length > 50 ? s.locatie.slice(0, 50) + "…" : s.locatie;
      locCount.set(loc, (locCount.get(loc) ?? 0) + 1);
    }
  }
  const topSpecii = [...specieCount.entries()].sort((a, b) => b[1] - a[1]).slice(0, 6);
  const topLocuri = [...locCount.entries()].sort((a, b) => b[1] - a[1]).slice(0, 5);

  return (
    <div>
      <header className="mb-6">
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

      {semnale.length > 0 && (
        <section className="grid sm:grid-cols-2 gap-4 mb-6">
          <div className="card rounded-xl p-4">
            <p className="text-xs uppercase tracking-widest text-moss mb-2">Specii active</p>
            <div className="flex flex-wrap gap-1.5">
              {topSpecii.map(([sp, n]) => (
                <span key={sp} className="tag">
                  {sp} <span className="text-amber-glow ml-1">{n}</span>
                </span>
              ))}
            </div>
          </div>
          <div className="card rounded-xl p-4">
            <p className="text-xs uppercase tracking-widest text-moss mb-2">Locații mențiuni</p>
            <ul className="space-y-0.5">
              {topLocuri.map(([loc, n]) => (
                <li key={loc} className="text-sm text-fog/85 flex justify-between gap-2">
                  <span className="truncate">{loc}</span>
                  <span className="text-amber-glow flex-shrink-0">{n}</span>
                </li>
              ))}
            </ul>
          </div>
        </section>
      )}

      <BeaconFiltre semnale={semnale} initialSpecie={params.specie} />
    </div>
  );
}
