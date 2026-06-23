"use client";

import { useRouter } from "next/navigation";
import { useState } from "react";

export default function PropuneriBulkBar({ pendingIds }: { pendingIds: number[] }) {
  const router = useRouter();
  const [selected, setSelected] = useState<Set<number>>(new Set());
  const [loading, setLoading] = useState(false);

  // Expune set via DOM (simplu): găsim checkboxurile prin id
  if (typeof window !== "undefined") {
    (window as unknown as { __propuneriToggle: (id: number, on: boolean) => void }).__propuneriToggle = (id: number, on: boolean) => {
      setSelected((s) => {
        const next = new Set(s);
        if (on) next.add(id); else next.delete(id);
        return next;
      });
    };
  }

  function selectAll() {
    setSelected(new Set(pendingIds));
    pendingIds.forEach((id) => {
      const cb = document.getElementById(`propunere-cb-${id}`) as HTMLInputElement | null;
      if (cb) cb.checked = true;
    });
  }

  function selectNone() {
    setSelected(new Set());
    pendingIds.forEach((id) => {
      const cb = document.getElementById(`propunere-cb-${id}`) as HTMLInputElement | null;
      if (cb) cb.checked = false;
    });
  }

  async function batch(action: "accept" | "reject") {
    if (selected.size === 0) return;
    if (!confirm(`${action === "accept" ? "Acceptă" : "Respinge"} ${selected.size} propuneri?`)) return;
    setLoading(true);
    await fetch("/api/admin/propuneri/batch", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ ids: [...selected], action }),
    });
    selectNone();
    setLoading(false);
    router.refresh();
  }

  if (pendingIds.length === 0) return null;

  return (
    <div className="sticky top-16 z-30 card rounded-xl p-3 mb-4" style={{ background: "rgba(13,27,30,0.95)", backdropFilter: "blur(8px)" }}>
      <div className="flex items-center justify-between gap-3 flex-wrap">
        <div className="flex items-baseline gap-2 text-sm">
          <span className="text-amber-glow font-medium">{selected.size}</span>
          <span className="text-fog/65">/ {pendingIds.length} selectate</span>
          <button onClick={selectAll} className="text-xs text-moss hover:text-amber-glow underline ml-2">toate</button>
          <button onClick={selectNone} className="text-xs text-moss hover:text-amber-glow underline">niciuna</button>
        </div>
        <div className="flex gap-2">
          <button
            onClick={() => batch("accept")}
            disabled={selected.size === 0 || loading}
            className="text-sm px-3 py-1.5 rounded-md border border-moss/40 hover:bg-moss/15 text-moss disabled:opacity-40"
          >
            ✓ accept ({selected.size})
          </button>
          <button
            onClick={() => batch("reject")}
            disabled={selected.size === 0 || loading}
            className="text-sm px-3 py-1.5 rounded-md border border-red-400/40 hover:bg-red-400/15 text-red-400 disabled:opacity-40"
          >
            ✕ respinge ({selected.size})
          </button>
        </div>
      </div>
    </div>
  );
}
