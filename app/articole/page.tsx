import Link from "next/link";
import { articole } from "@/data/articole";

export const metadata = {
  title: "Articole de pescuit în Delta Dunării",
  description:
    "Lecții de teren, filozofii de pescuit și analize extrase din experiența pescarilor din Delta Dunării.",
  alternates: { canonical: "/articole" },
};

export default function ArticolePage() {
  return (
    <div>
      <header className="mb-10">
        <p className="text-xs uppercase tracking-[0.3em] text-moss mb-3">
          articole
        </p>
        <h1 className="text-4xl md:text-5xl font-display text-fog mb-3">
          Lecții și principii
        </h1>
        <p className="text-fog/75 max-w-2xl">
          Sinteze din partidele documentate — strategii pe termen lung, săptămâna magică
          de primăvară, capcane comune. Lecturi de 5-10 minute fiecare.
        </p>
      </header>

      <div className="grid gap-3">
        {articole.map((a) => (
          <Link
            key={a.slug}
            href={`/articole/${a.slug}`}
            className="card rounded-lg p-5"
          >
            <h2 className="text-xl font-display text-fog mb-1.5">{a.titlu}</h2>
            <p className="text-fog/75 mb-3 leading-relaxed">{a.scurt}</p>
            <div className="flex flex-wrap gap-1.5">
              {a.tags.map((t) => (
                <span key={t} className="tag">
                  {t}
                </span>
              ))}
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
}
