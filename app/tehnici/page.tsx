import Link from "next/link";
import { getAllTehnici } from "@/lib/data-combined";
import SpeciesIcon from "@/components/SpeciesIcon";

export const dynamic = "force-dynamic";

const specieLabel: Record<string, string> = {
  stiuca: "Știucă",
  salau: "Șalău",
  avat: "Avat",
  biban: "Biban",
  crap: "Crap",
  somn: "Somn",
};

export default async function TehniciPage() {
  const tehnici = await getAllTehnici();
  const speciiOrdine: Array<"stiuca" | "salau" | "avat" | "biban" | "crap" | "somn"> = [
    "stiuca",
    "salau",
    "avat",
    "biban",
    "crap",
    "somn",
  ];

  return (
    <div>
      <header className="mb-10">
        <p className="text-xs uppercase tracking-[0.3em] text-moss mb-3">
          tehnici de pescuit
        </p>
        <h1 className="text-4xl md:text-5xl font-display text-fog mb-3">
          Spinning și crap, pe specie
        </h1>
        <p className="text-fog/75 max-w-2xl">
          Fiecare tehnică e descompusă: pași, năluci sau monturi, echipament și
          sfaturi specifice. Sursa: pescari care le-au testat pe teren.
        </p>
      </header>

      {speciiOrdine.map((sp) => {
        const items = tehnici.filter((t) => t.specie === sp);
        if (!items.length) return null;
        const hasStatic = items.some((t) => t.metoda === "static");
        const hasSpinning = items.some((t) => t.metoda === "spinning");
        return (
          <section key={sp} className="mb-12">
            <div className="flex items-baseline gap-3 mb-5">
              <span className="text-amber-soft">
                <SpeciesIcon specie={sp} size={32} />
              </span>
              <h2 className="text-2xl md:text-3xl font-display text-amber-glow">
                {specieLabel[sp]}
              </h2>
              {hasSpinning && <span className="tag">spinning</span>}
              {hasStatic && <span className="tag">static</span>}
            </div>
            <div className="grid gap-3">
              {items.map((t) => (
                <Link
                  key={t.slug}
                  href={`/tehnici/${t.slug}`}
                  className="card rounded-lg p-5"
                >
                  <h3 className="text-lg font-display text-fog mb-1.5">
                    {t.titlu}
                  </h3>
                  <p className="text-sm text-fog/75 mb-2 leading-relaxed">
                    {t.scurt}
                  </p>
                  <p className="text-xs text-amber-soft uppercase tracking-wider">
                    {t.perioada}
                  </p>
                </Link>
              ))}
            </div>
          </section>
        );
      })}
    </div>
  );
}
