import Link from "next/link";
import type { Metadata } from "next";
import { specii, isInProhibitie } from "@/data/specii";

export const metadata: Metadata = {
  title: "Specii de pești — prohibiție, mărime minimă și condiții optime",
  description:
    "Crap, știucă, șalău, somn, avat și biban în Delta Dunării: perioada de prohibiție 2026, mărimea minimă legală, cota optimă și condițiile în care mușcă cel mai bine.",
  alternates: { canonical: "/specii" },
};

const LUNI = ["", "ian", "feb", "mar", "apr", "mai", "iun", "iul", "aug", "sep", "oct", "noi", "dec"];
const metodaLabel: Record<string, string> = { spinning: "spinning", static: "la fund / static" };

export default function SpeciiPage() {
  const now = new Date();

  return (
    <div>
      <header className="mb-10">
        <p className="text-xs uppercase tracking-[0.3em] text-moss mb-3">specii țintă</p>
        <h1 className="text-4xl md:text-5xl font-display text-fog mb-3">
          Ce se pescuiește în Deltă
        </h1>
        <p className="text-fog/75 max-w-2xl">
          Șase specii principale, fiecare cu prohibiția ei, mărimea minimă legală și
          fereastra în care mușcă. Apasă pe o specie pentru tehnici, locuri și condiții optime.
        </p>
      </header>

      <div className="grid md:grid-cols-2 gap-3">
        {specii.map((s) => {
          const inProh = isInProhibitie(s, now);
          return (
            <Link key={s.id} href={`/specii/${s.id}`} className="card rounded-lg p-5">
              <div className="flex items-start justify-between gap-3 mb-2">
                <h2 className="text-xl font-display text-fog">{s.nume}</h2>
                <span
                  className={`text-xs px-2 py-0.5 rounded-full whitespace-nowrap ${
                    inProh
                      ? "bg-red-500/15 text-red-300"
                      : "bg-moss/15 text-moss"
                  }`}
                >
                  {inProh ? "prohibiție" : "se poate pescui"}
                </span>
              </div>
              <p className="text-sm italic text-fog/45 mb-3">{s.latin}</p>
              <p className="text-sm text-fog/65 mb-3">{s.sezonScurt}</p>
              <div className="flex flex-wrap gap-1.5">
                <span className="tag">{metodaLabel[s.metoda] ?? s.metoda}</span>
                <span className="tag">min. {s.marimeMinima} cm</span>
                <span className="tag">
                  prohibiție {s.prohibitie.start.d} {LUNI[s.prohibitie.start.m]} – {s.prohibitie.end.d} {LUNI[s.prohibitie.end.m]}
                </span>
              </div>
            </Link>
          );
        })}
      </div>
    </div>
  );
}
