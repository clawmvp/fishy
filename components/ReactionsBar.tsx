"use client";

import { useState } from "react";

const EMOJIS = ["🎣", "🔥", "💪", "👏"] as const;
type Emoji = (typeof EMOJIS)[number];

type Props = {
  catchId: number;
  initialCounts: Record<Emoji, number>;
  initialMyEmojis: Emoji[];
  isAuthed: boolean;
};

export function ReactionsBar({ catchId, initialCounts, initialMyEmojis, isAuthed }: Props) {
  const [counts, setCounts] = useState(initialCounts);
  const [mine, setMine] = useState<Set<Emoji>>(new Set(initialMyEmojis));
  const [loading, setLoading] = useState<Emoji | null>(null);

  async function react(emoji: Emoji) {
    if (!isAuthed) {
      window.location.href = "/login";
      return;
    }
    setLoading(emoji);
    try {
      const resp = await fetch(`/api/catches/${catchId}/react`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ emoji }),
      });
      const data = await resp.json();
      if (data.ok) {
        setCounts(data.counts);
        const newMine = new Set(mine);
        if (data.added) newMine.add(emoji); else newMine.delete(emoji);
        setMine(newMine);
      }
    } catch { /* swallow */ }
    setLoading(null);
  }

  return (
    <div className="flex items-center gap-1 mt-3 flex-wrap">
      {EMOJIS.map((e) => {
        const active = mine.has(e);
        const count = counts[e] ?? 0;
        return (
          <button
            key={e}
            onClick={() => react(e)}
            disabled={loading === e}
            className={`text-xs px-2 py-1 rounded-md border transition-all ${
              active
                ? "border-amber-glow/60 bg-amber-glow/15 text-amber-glow"
                : "border-amber-glow/15 bg-water-2/30 text-fog/65 hover:border-amber-glow/40 hover:bg-water-2/50"
            }`}
          >
            <span className="text-sm">{e}</span>
            {count > 0 && <span className="ml-1 text-xs font-medium">{count}</span>}
          </button>
        );
      })}
    </div>
  );
}
