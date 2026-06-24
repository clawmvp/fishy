"use client";
import { useState } from "react";

export default function ShareCatchButton({ id }: { id: number }) {
  const [copied, setCopied] = useState(false);

  async function share() {
    const url = `https://fishy.n01.app/captura/${id}`;
    try {
      if (navigator.share) {
        await navigator.share({ title: "Captură pe fishy", url });
        return;
      }
      await navigator.clipboard.writeText(url);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch {
      /* user cancelled / no clipboard */
    }
  }

  return (
    <button
      type="button"
      onClick={share}
      className="py-2 px-4 rounded-md border border-amber-glow/30 text-amber-glow hover:bg-amber-glow/10 text-sm transition-colors"
    >
      {copied ? "✓ Link copiat" : "↗ Share"}
    </button>
  );
}
