import Link from "next/link";
import type { Metadata } from "next";
import { search } from "@/lib/search";

export const dynamic = "force-dynamic";

export const metadata: Metadata = {
  title: "Caută",
  description: "Caută în locuri, tehnici, monturi, specii, articole și glosar — pescuit în Delta Dunării.",
  robots: { index: false, follow: true },
};

export default async function CautaPage({
  searchParams,
}: {
  searchParams: Promise<{ q?: string }>;
}) {
  const { q = "" } = await searchParams;
  const query = q.trim();
  const results = query.length >= 2 ? await search(query) : [];

  return (
    <div className="max-w-3xl">
      <header className="mb-8">
        <p className="text-xs uppercase tracking-[0.3em] text-moss mb-3">caută</p>
        <h1 className="text-3xl md:text-4xl font-display text-fog mb-4">Caută în fishy</h1>
        <form action="/cauta" method="get">
          <input
            type="search"
            name="q"
            defaultValue={query}
            autoFocus
            placeholder="ex. somn clonc, cota mică, dropshot, prohibiție crap…"
            className="w-full rounded-lg bg-water-2/50 border border-amber-glow/25 px-4 py-3 text-fog placeholder:text-fog/35 focus:outline-none focus:border-amber-glow/60"
          />
        </form>
      </header>

      {query.length >= 2 && (
        <p className="text-sm text-fog/50 mb-5">
          {results.length} {results.length === 1 ? "rezultat" : "rezultate"} pentru „{query}"
        </p>
      )}

      {query.length >= 2 && results.length === 0 && (
        <p className="text-fog/60">
          Nimic găsit. Încearcă alt termen, sau răsfoiește{" "}
          <Link href="/locuri" className="text-moss hover:text-amber-glow">locurile</Link>,{" "}
          <Link href="/tehnici" className="text-moss hover:text-amber-glow">tehnicile</Link> sau{" "}
          <Link href="/specii" className="text-moss hover:text-amber-glow">speciile</Link>.
        </p>
      )}

      <div className="space-y-2.5">
        {results.map((r, i) => (
          <Link key={`${r.href}-${i}`} href={r.href} className="card rounded-lg p-4 flex items-start gap-3">
            <span className="tag flex-shrink-0 mt-0.5">{r.label}</span>
            <span className="min-w-0">
              <span className="block text-fog font-display">{r.title}</span>
              {r.desc && <span className="block text-sm text-fog/55 line-clamp-2">{r.desc}</span>}
            </span>
          </Link>
        ))}
      </div>
    </div>
  );
}
