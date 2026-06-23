import Link from "next/link";
import { getAllLocuri } from "@/lib/data-combined";

export const dynamic = "force-dynamic";

const tipLabel: Record<string, string> = {
  brat: "braț",
  canal: "canal",
  lac: "lac",
  rau: "râu",
  balastiera: "balastieră",
};

export const metadata = {
  title: "Locuri de pescuit în Delta Dunării",
  description:
    "Spoturi pe brațele, canalele, râurile și lacurile Deltei — sezon, specii țintă, pericole și sfaturi de la pescarii care merg acolo.",
  alternates: { canonical: "/locuri" },
};

export default async function LocuriPage() {
  const locuri = await getAllLocuri();
  const grupuri = ["brat", "canal", "rau", "lac", "balastiera"] as const;

  return (
    <div>
      <header className="mb-10">
        <p className="text-xs uppercase tracking-[0.3em] text-moss mb-3">
          locuri celebre
        </p>
        <h1 className="text-4xl md:text-5xl font-display text-fog mb-3">
          Unde se prinde, când și de ce
        </h1>
        <p className="text-fog/75 max-w-2xl">
          Brațele Deltei, canalele de migrație, râurile spinning din sud.
          Fiecare loc are sezon, pericole concrete și sfaturi de la pescarii
          care merg acolo.
        </p>
      </header>

      {grupuri.map((tip) => {
        const items = locuri.filter((l) => l.tip === tip && l.regiune === "delta");
        if (!items.length) return null;
        return (
          <section key={tip} className="mb-10">
            <h2 className="text-2xl md:text-3xl font-display text-amber-glow mb-4">
              {tipLabel[tip]}
              <span className="text-fog/40 text-base ml-2">
                ({items.length})
              </span>
            </h2>
            <div className="grid md:grid-cols-2 gap-3">
              {items.map((l) => (
                <Link
                  key={l.slug}
                  href={`/locuri/${l.slug}`}
                  className="card rounded-lg p-5"
                >
                  <h3 className="text-lg font-display text-fog mb-2">{l.nume}</h3>
                  <p className="text-sm text-fog/55 mb-3">{l.scurt}</p>
                  <div className="flex flex-wrap gap-1.5 mb-2">
                    {l.specii.map((s) => (
                      <span key={s} className="tag">
                        {s}
                      </span>
                    ))}
                  </div>
                  <p className="text-xs text-fog/40">
                    sezon: {l.sezon.join(", ")}
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
