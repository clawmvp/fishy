"use client";
import { useState } from "react";

export default function ShareLinkButton({
  url,
  title,
  label = "↗ Share",
}: {
  url: string;
  title?: string;
  label?: string;
}) {
  const [copied, setCopied] = useState(false);
  async function share() {
    try {
      if (navigator.share) {
        await navigator.share({ title, url });
        return;
      }
      await navigator.clipboard.writeText(url);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch {
      /* ignore */
    }
  }
  return (
    <button
      type="button"
      onClick={share}
      className="py-2.5 px-5 rounded-md border border-amber-glow/30 text-amber-glow hover:bg-amber-glow/10 transition-colors"
    >
      {copied ? "✓ Link copiat" : label}
    </button>
  );
}
