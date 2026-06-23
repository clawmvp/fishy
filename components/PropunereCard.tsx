"use client";

import { useState } from "react";
import type { InsightPending } from "@/lib/insights-pending";

const TYPE_LABEL: Record<InsightPending["type"], string> = {
  loc: "📍 Loc nou",
  tehnica: "🎣 Tehnică nouă",
  montura: "🪱 Montură nouă",
  echipament: "🎣 Echipament nou",
  obs: "💡 Observație",
};

const TYPE_COLOR: Record<InsightPending["type"], string> = {
  loc: "#a8c87a",
  tehnica: "#d4a657",
  montura: "#e89844",
  echipament: "#8cc7d1",
  obs: "#9bb5a3",
};

export function PropunereCard({ p }: { p: InsightPending }) {
  const [status, setStatus] = useState(p.status);
  const [loading, setLoading] = useState(false);
  const color = TYPE_COLOR[p.type];

  async function act(action: "accept" | "reject") {
    setLoading(true);
    const resp = await fetch(`/api/propuneri/${p.id}`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ action }),
    });
    const data = await resp.json();
    if (data.ok) setStatus(action === "accept" ? "accepted" : "rejected");
    setLoading(false);
  }

  const payload = p.payload as Record<string, unknown>;
  const nume = (payload.nume as string) ?? (payload.txt as string) ?? "—";
  const scurt = (payload.scurt as string) ?? "";
  const isHandled = status !== "pending";

  return (
    <article className="card rounded-xl p-4" style={{
      borderColor: `${color}40`,
      opacity: isHandled ? 0.55 : 1,
    }}>
      <div className="flex items-baseline justify-between gap-2 mb-2 flex-wrap">
        <div>
          <p className="text-xs uppercase tracking-widest" style={{ color }}>
            {TYPE_LABEL[p.type]} · confidence {p.confidence}
          </p>
          <h3 className="text-base font-display text-fog mt-0.5">{nume}</h3>
        </div>
        {isHandled ? (
          <span className="text-xs px-2 py-1 rounded-md" style={{
            background: status === "accepted" ? "rgba(168,200,122,0.15)" : "rgba(200,74,60,0.15)",
            color: status === "accepted" ? "#a8c87a" : "#c84a3c",
          }}>
            {status === "accepted" ? "✓ acceptat" : "✕ respins"}
          </span>
        ) : (
          <div className="flex gap-1.5">
            <button
              onClick={() => act("accept")}
              disabled={loading}
              className="text-xs px-3 py-1 rounded-md border transition-colors"
              style={{ borderColor: "rgba(168,200,122,0.40)", color: "#a8c87a", background: "rgba(168,200,122,0.08)" }}
            >
              {loading ? "..." : "✓ accept"}
            </button>
            <button
              onClick={() => act("reject")}
              disabled={loading}
              className="text-xs px-3 py-1 rounded-md border transition-colors"
              style={{ borderColor: "rgba(200,74,60,0.30)", color: "#c84a3c", background: "rgba(200,74,60,0.05)" }}
            >
              {loading ? "..." : "✕ respinge"}
            </button>
          </div>
        )}
      </div>

      {scurt && <p className="text-sm text-fog/85 leading-relaxed mb-2">{scurt}</p>}

      {/* Payload details */}
      <details className="text-xs text-fog/65 mb-2">
        <summary className="cursor-pointer text-moss hover:text-amber-glow">conținut complet</summary>
        <pre className="mt-2 p-2 bg-water-2/40 rounded text-[10px] overflow-x-auto whitespace-pre-wrap">
          {JSON.stringify(payload, null, 2)}
        </pre>
      </details>

      {p.source_title && (
        <p className="text-xs text-fog/55 mt-2">
          sursă:{" "}
          {p.source_url ? (
            <a href={p.source_url} target="_blank" rel="noopener noreferrer" className="text-amber-glow hover:text-amber-soft">
              {p.source_title.slice(0, 80)}
            </a>
          ) : (
            <span>{p.source_title.slice(0, 80)}</span>
          )}
        </p>
      )}
    </article>
  );
}
