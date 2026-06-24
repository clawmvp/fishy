import Link from "next/link";
import type { Metadata } from "next";
import { ghiduri } from "@/data/ghiduri";

export const metadata: Metadata = {
  title: "Ghiduri sezoniere de pescuit în Delta Dunării",
  description:
    "Ce se prinde în Delta Dunării în fiecare sezon — primăvară, vară, toamnă, iarnă. Specii de țintit, tehnici și condiții.",
  alternates: { canonical: "/ghiduri" },
};

const EMOJI: Record<string, string> = { primavara: "🌱", vara: "☀️", toamna: "🍂", iarna: "❄️" };

export default function GhiduriPage() {
  return (
    <div>
      <header className="mb-10">
        <p className="text-xs uppercase tracking-[0.3em] text-moss mb-3">ghiduri sezoniere</p>
        <h1 className="text-4xl md:text-5xl font-display text-fog mb-3">Ce se prinde, în ce sezon</h1>
        <p className="text-fog/75 max-w-2xl">
          Fiecare sezon are speciile, tehnicile și ferestrele lui în Deltă. Ghiduri pe
          anotimp — de la fereastra de aur a crapului primăvara la vârful răpitorilor toamna.
        </p>
      </header>

      <div className="grid md:grid-cols-2 gap-3">
        {ghiduri.map((g) => (
          <Link key={g.slug} href={`/ghiduri/${g.slug}`} className="card rounded-lg p-5">
            <div className="flex items-baseline gap-2 mb-2">
              <span className="text-xl">{EMOJI[g.slug]}</span>
              <h2 className="text-xl font-display text-amber-glow">{g.sezon}</h2>
              <span className="text-xs text-fog/40">{g.perioada}</span>
            </div>
            <p className="text-sm text-fog/70 leading-relaxed">{g.intro}</p>
          </Link>
        ))}
      </div>
    </div>
  );
}
