import HartaDelta from "@/components/HartaDeltaClient";
import { getAllLocuri } from "@/lib/data-combined";
import { LOC_COORDS, COTA_STATIONS_COORDS } from "@/data/locuri-coords";
import { getWaterLevel } from "@/lib/conditii-live";
import { getChiliaDebit } from "@/lib/chilia-debit";
import { toateSemnalele } from "@/lib/beacon-query";
import type { Loc } from "@/data/locuri";

export const dynamic = "force-dynamic";

export default async function HartaPage() {
  const [locuriAll, waterTulcea, waterIsaccea, waterBraila, chilia, semnaleAll] = await Promise.all([
    getAllLocuri(),
    getWaterLevel("tulcea"),
    getWaterLevel("isaccea"),
    getWaterLevel("braila"),
    getChiliaDebit(),
    toateSemnalele().catch(() => []),
  ]);

  // Asociez coordonate
  const locuriConCoord = locuriAll
    .filter((l) => (l.regiune ?? "delta") === "delta")
    .map((l) => {
      const c = LOC_COORDS[l.slug];
      return c ? { ...l, lat: c[0], lng: c[1] } : null;
    })
    .filter((l): l is Loc & { lat: number; lng: number } => l !== null);

  const cotaStations = [
    { slug: "tulcea",  ...COTA_STATIONS_COORDS.tulcea,  level: waterTulcea?.level ?? null,  unit: "cm" },
    { slug: "isaccea", ...COTA_STATIONS_COORDS.isaccea, level: waterIsaccea?.level ?? null, unit: "cm" },
    { slug: "braila",  ...COTA_STATIONS_COORDS.braila,  level: waterBraila?.level ?? null,  unit: "cm" },
    { slug: "chilia",  ...COTA_STATIONS_COORDS.chilia,  level: chilia.todayM3s ?? null,     unit: "m3s" },
  ];

  // Asociez semnale beacon cu locuri (fuzzy match pe locatie field)
  const semnaleConCoord = semnaleAll.flatMap((s) => {
    if (!s.locatie) return [];
    const locStr = s.locatie.toLowerCase();
    // Caut match cu slug-uri cunoscute
    for (const [slug, [lat, lng]] of Object.entries(LOC_COORDS)) {
      const key = slug.replace(/-/g, " ");
      if (locStr.includes(key) || (key.length > 4 && locStr.includes(key.split(" ")[0]))) {
        // Jitter mic pentru a evita suprapunere completă
        const jitter = () => (Math.random() - 0.5) * 0.02;
        return [{ ...s, lat: lat + jitter(), lng: lng + jitter() }];
      }
    }
    return [];
  }).slice(0, 50);

  const totalLocuri = locuriAll.filter((l) => (l.regiune ?? "delta") === "delta").length;
  const fărăCoord = totalLocuri - locuriConCoord.length;

  return (
    <div>
      <header className="mb-6">
        <p className="text-xs uppercase tracking-[0.3em] text-moss mb-3">hartă · live</p>
        <h1 className="text-4xl md:text-5xl font-display text-fog mb-3">Hartă interactivă Delta Dunării</h1>
        <p className="text-fog/75 max-w-3xl leading-relaxed">
          {locuriConCoord.length} locuri marcate · {cotaStations.length} stații cota live · {semnaleConCoord.length} semnale Beacon ultimele 90 zile.
          Click pe marker pentru detalii. Schimbă fundal (sus dreapta): OpenStreetMap / satelit / topo.
        </p>
      </header>

      <HartaDelta locuri={locuriConCoord} cotaStations={cotaStations} semnale={semnaleConCoord} />

      <section className="mt-6 grid sm:grid-cols-2 lg:grid-cols-4 gap-3">
        <Legend color="#d4a657" label="braț" />
        <Legend color="#a8c87a" label="canal" />
        <Legend color="#6ba368" label="lac" />
        <Legend color="#9bb5a3" label="râu" />
      </section>

      {fărăCoord > 0 && (
        <p className="mt-4 text-xs text-fog/40">
          {fărăCoord} loc{fărăCoord > 1 ? "uri" : ""} fără coordonate definite — adăugare manuală în <code className="text-amber-glow">data/locuri-coords.ts</code>.
        </p>
      )}
    </div>
  );
}

function Legend({ color, label }: { color: string; label: string }) {
  return (
    <div className="card rounded-md p-2 flex items-center gap-2">
      <span style={{ display: "inline-block", width: 14, height: 14, borderRadius: "50%", background: color, opacity: 0.65, border: `2px solid ${color}` }} />
      <span className="text-xs text-fog/85 uppercase tracking-wider">{label}</span>
    </div>
  );
}
