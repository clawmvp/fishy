"use client";

import { useRouter } from "next/navigation";
import { useState } from "react";

export default function DeleteCatchButton({ id }: { id: number }) {
  const router = useRouter();
  const [loading, setLoading] = useState(false);
  const [confirming, setConfirming] = useState(false);

  async function del() {
    setLoading(true);
    await fetch(`/api/catches/${id}`, { method: "DELETE" });
    router.push("/capturi");
    router.refresh();
  }

  if (!confirming) {
    return (
      <button onClick={() => setConfirming(true)} className="text-xs text-red-400/80 hover:text-red-400 border border-red-400/20 hover:border-red-400/50 rounded-md px-3 py-1.5 transition-colors">
        Șterge captura
      </button>
    );
  }
  return (
    <div className="flex items-center gap-2">
      <span className="text-sm text-fog/70">Sigur?</span>
      <button onClick={del} disabled={loading} className="text-xs text-red-400 border border-red-400/40 rounded-md px-3 py-1.5">
        {loading ? "..." : "Da, șterge"}
      </button>
      <button onClick={() => setConfirming(false)} className="text-xs text-fog/55 border border-amber-glow/15 rounded-md px-3 py-1.5">
        Nu
      </button>
    </div>
  );
}
