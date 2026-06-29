"use client";
import { useState } from "react";

export default function FeedbackStatusButton({ id, status }: { id: number; status: string }) {
  const [cur, setCur] = useState(status);
  const [busy, setBusy] = useState(false);

  async function toggle() {
    setBusy(true);
    const next = cur === "done" ? "new" : "done";
    try {
      const r = await fetch(`/api/admin/feedback/${id}`, {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ status: next }),
      });
      if ((await r.json()).ok) setCur(next);
    } catch {
      /* ignore */
    }
    setBusy(false);
  }

  return (
    <button
      onClick={toggle}
      disabled={busy}
      className={`text-xs px-2.5 py-1 rounded-full border transition-colors ${
        cur === "done"
          ? "bg-moss/15 text-moss border-moss/30"
          : "bg-amber-glow/15 text-amber-glow border-amber-glow/40"
      }`}
    >
      {cur === "done" ? "✓ rezolvat" : "nou — marchează rezolvat"}
    </button>
  );
}
