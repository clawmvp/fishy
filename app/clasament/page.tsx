import Link from "next/link";
import type { Metadata } from "next";
import { topAnglers, speciesRecords } from "@/lib/leaderboard";
import { displayName } from "@/lib/profile";

export const dynamic = "force-dynamic";

export const metadata: Metadata = {
  title: "Clasament — pescari și recorduri",
  description:
    "Cei mai activi pescari și recordurile pe specie din comunitatea fishy — capturi publice în Delta Dunării.",
  alternates: { canonical: "/clasament" },
};

const specieLabel: Record<string, string> = {
  crap: "Crap",
  stiuca: "Știucă",
  salau: "Șalău",
  avat: "Avat",
  biban: "Biban",
  somn: "Somn",
};

const MEDALS = ["🥇", "🥈", "🥉"];

export default async function ClasamentPage() {
  const [anglers, records] = await Promise.all([topAnglers(10), speciesRecords()]);

  return (
    <div className="max-w-3xl">
      <header className="mb-8">
        <p className="text-xs uppercase tracking-[0.3em] text-moss mb-3">comunitate</p>
        <h1 className="text-4xl md:text-5xl font-display text-fog mb-3">Clasament</h1>
        <p className="text-fog/75 max-w-2xl">
          Cei mai activi pescari și recordurile pe specie — din capturile publice.{" "}
          <Link href="/capturi/new" className="text-moss hover:text-amber-glow">
            Adaugă-ți captura
          </Link>{" "}
          ca să intri în clasament.
        </p>
      </header>

      <section className="mb-10">
        <h2 className="text-2xl font-display text-amber-glow mb-4">Top pescari</h2>
        {anglers.length === 0 ? (
          <p className="text-fog/55 text-sm">Încă nu sunt capturi publice. Fii primul!</p>
        ) : (
          <div className="space-y-2">
            {anglers.map((a, i) => (
              <Link
                key={a.user_id}
                href={`/users/${a.user_id}`}
                className="card rounded-lg p-4 flex items-center gap-3"
              >
                <span className="w-7 text-center text-lg flex-shrink-0">
                  {MEDALS[i] ?? <span className="text-fog/40 text-sm">{i + 1}</span>}
                </span>
                <span className="flex-1 min-w-0 text-fog font-display truncate">
                  {displayName({ name: a.name, nickname: a.nickname })}
                </span>
                <span className="text-sm text-fog/55 flex-shrink-0">
                  {a.n} {a.n === 1 ? "captură" : "capturi"}
                  {a.kg > 0 && <span className="text-fog/35"> · {a.kg.toFixed(1)} kg</span>}
                </span>
              </Link>
            ))}
          </div>
        )}
      </section>

      <section>
        <h2 className="text-2xl font-display text-amber-glow mb-4">Recorduri pe specie</h2>
        {records.length === 0 ? (
          <p className="text-fog/55 text-sm">Niciun record încă.</p>
        ) : (
          <div className="grid sm:grid-cols-2 gap-3">
            {records.map((r) => (
              <div key={r.specie} className="card rounded-lg p-4">
                <p className="text-xs uppercase tracking-widest text-moss mb-1">
                  {specieLabel[r.specie] ?? r.specie}
                </p>
                <p className="text-2xl font-light text-amber-glow">
                  {r.weight_kg.toFixed(2)} <span className="text-sm text-fog/55">kg</span>
                </p>
                <Link href={`/users/${r.user_id}`} className="text-sm text-fog/65 hover:text-amber-glow">
                  {displayName({ name: r.name, nickname: r.nickname })}
                </Link>
              </div>
            ))}
          </div>
        )}
      </section>
    </div>
  );
}
