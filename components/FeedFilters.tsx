"use client";

import { useRouter, useSearchParams } from "next/navigation";

const SPECII = [
  { val: "toate", label: "🌍 toate" },
  { val: "crap", label: "🎣 crap" },
  { val: "somn", label: "🐊 somn" },
  { val: "carnasiere", label: "🦈 carnasiere" },
];

const SORT = [
  { val: "recent", label: "recent" },
  { val: "biggest", label: "cele mai mari" },
  { val: "popular", label: "cele mai apreciate" },
];

export function FeedFilters({ currentSpecie, currentSort }: { currentSpecie: string; currentSort: string }) {
  const router = useRouter();
  const params = useSearchParams();

  function setParam(key: string, value: string) {
    const next = new URLSearchParams(params.toString());
    next.set(key, value);
    router.replace(`/feed?${next.toString()}`);
  }

  return (
    <div className="card rounded-xl p-3 mb-4">
      <div className="flex flex-wrap items-center gap-4 text-xs">
        <div className="flex items-center gap-1.5">
          <span className="text-moss uppercase tracking-widest mr-1">specie:</span>
          {SPECII.map((s) => (
            <button
              key={s.val}
              onClick={() => setParam("specie", s.val)}
              className={`px-2 py-1 rounded-md border transition-all ${
                currentSpecie === s.val
                  ? "border-amber-glow/60 bg-amber-glow/10 text-amber-glow"
                  : "border-amber-glow/15 text-fog/70 hover:border-amber-glow/40"
              }`}
            >{s.label}</button>
          ))}
        </div>
        <div className="flex items-center gap-1.5">
          <span className="text-moss uppercase tracking-widest mr-1">sort:</span>
          {SORT.map((s) => (
            <button
              key={s.val}
              onClick={() => setParam("sort", s.val)}
              className={`px-2 py-1 rounded-md border transition-all ${
                currentSort === s.val
                  ? "border-amber-glow/60 bg-amber-glow/10 text-amber-glow"
                  : "border-amber-glow/15 text-fog/70 hover:border-amber-glow/40"
              }`}
            >{s.label}</button>
          ))}
        </div>
      </div>
    </div>
  );
}
