"use client";

import { useState } from "react";

type ActionKey = "beacon-scan" | "extract-insights" | "cota-snapshot";

type State = { loading: boolean; result: unknown; error: string | null };

const initial: State = { loading: false, result: null, error: null };

export default function AdminTriggers() {
  const [states, setStates] = useState<Record<ActionKey, State>>({
    "beacon-scan": initial,
    "extract-insights": initial,
    "cota-snapshot": initial,
  });
  const [extractZile, setExtractZile] = useState(7);
  const [extractMin, setExtractMin] = useState(60);
  const [beaconZile, setBeaconZile] = useState(14);

  async function run(action: ActionKey, options: { zile?: number; min?: number } = {}) {
    setStates((s) => ({ ...s, [action]: { loading: true, result: null, error: null } }));
    try {
      const resp = await fetch("/api/admin/run", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ action, ...options }),
      });
      const data = await resp.json();
      setStates((s) => ({ ...s, [action]: { loading: false, result: data.result, error: data.ok ? null : (data.error ?? "Eroare") } }));
    } catch (e) {
      setStates((s) => ({ ...s, [action]: { loading: false, result: null, error: (e as Error).message } }));
    }
  }

  return (
    <div className="space-y-4">
      {/* Beacon scan */}
      <div className="card rounded-xl p-4">
        <div className="flex items-baseline justify-between gap-2 mb-2">
          <div>
            <h3 className="text-base font-display text-amber-glow">📡 Beacon scan</h3>
            <p className="text-xs text-fog/55">Caută videoclipuri noi Delta din toate canalele YouTube.</p>
          </div>
          <span className="text-xs text-fog/45">cron: 05:00 zilnic</span>
        </div>
        <div className="flex items-center gap-2 mb-2">
          <label className="text-xs text-moss">zile lookback:</label>
          <input
            type="number"
            value={beaconZile}
            onChange={(e) => setBeaconZile(parseInt(e.target.value) || 14)}
            min={1} max={90}
            className="w-16 px-2 py-1 bg-water-2/40 border border-amber-glow/20 rounded text-xs text-fog focus:outline-none focus:border-amber-glow/50"
          />
        </div>
        <RunButton
          loading={states["beacon-scan"].loading}
          onClick={() => run("beacon-scan", { zile: beaconZile })}
          label="Rulează beacon-scan"
        />
        <ResultPanel state={states["beacon-scan"]} />
      </div>

      {/* Extract insights */}
      <div className="card rounded-xl p-4">
        <div className="flex items-baseline justify-between gap-2 mb-2">
          <div>
            <h3 className="text-base font-display text-amber-glow">🔍 Extract insights</h3>
            <p className="text-xs text-fog/55">Extrage propuneri locuri/tehnici/monturi/echipament din semnalele scor ≥ min.</p>
          </div>
          <span className="text-xs text-fog/45">cron: 07:30 zilnic</span>
        </div>
        <div className="flex items-center gap-3 mb-2 flex-wrap">
          <div className="flex items-center gap-1.5">
            <label className="text-xs text-moss">zile:</label>
            <select
              value={extractZile}
              onChange={(e) => setExtractZile(parseInt(e.target.value))}
              className="px-2 py-1 bg-water-2/40 border border-amber-glow/20 rounded text-xs text-fog focus:outline-none focus:border-amber-glow/50"
            >
              <option value="7">7 zile</option>
              <option value="14">14 zile</option>
              <option value="30">30 zile</option>
              <option value="60">60 zile</option>
              <option value="90">90 zile</option>
            </select>
          </div>
          <div className="flex items-center gap-1.5">
            <label className="text-xs text-moss">scor min:</label>
            <select
              value={extractMin}
              onChange={(e) => setExtractMin(parseInt(e.target.value))}
              className="px-2 py-1 bg-water-2/40 border border-amber-glow/20 rounded text-xs text-fog focus:outline-none focus:border-amber-glow/50"
            >
              <option value="50">50</option>
              <option value="60">60</option>
              <option value="70">70</option>
              <option value="80">80</option>
            </select>
          </div>
        </div>
        <RunButton
          loading={states["extract-insights"].loading}
          onClick={() => run("extract-insights", { zile: extractZile, min: extractMin })}
          label="Rulează extract-insights"
        />
        <ResultPanel state={states["extract-insights"]} />
      </div>

      {/* Cota snapshot */}
      <div className="card rounded-xl p-4">
        <div className="flex items-baseline justify-between gap-2 mb-2">
          <div>
            <h3 className="text-base font-display text-amber-glow">💧 Cota snapshot</h3>
            <p className="text-xs text-fog/55">Refresh cota Tulcea/Isaccea/Brăila + debit Chilia.</p>
          </div>
          <span className="text-xs text-fog/45">cron: 06:30 zilnic</span>
        </div>
        <RunButton
          loading={states["cota-snapshot"].loading}
          onClick={() => run("cota-snapshot")}
          label="Rulează cota-snapshot"
        />
        <ResultPanel state={states["cota-snapshot"]} />
      </div>
    </div>
  );
}

function RunButton({ loading, onClick, label }: { loading: boolean; onClick: () => void; label: string }) {
  return (
    <button
      onClick={onClick}
      disabled={loading}
      className="text-sm px-3 py-1.5 rounded-md bg-amber-glow/15 hover:bg-amber-glow/25 border border-amber-glow/40 text-amber-glow font-medium transition-colors disabled:opacity-40"
    >
      {loading ? "⏳ Rulează..." : `▶ ${label}`}
    </button>
  );
}

function ResultPanel({ state }: { state: State }) {
  if (state.loading) return null;
  if (state.error) return <p className="text-xs text-red-400 mt-2">⚠️ {state.error}</p>;
  if (!state.result) return null;
  return (
    <details className="mt-2">
      <summary className="text-xs text-moss cursor-pointer hover:text-amber-glow">✓ rezultat (click pentru detalii)</summary>
      <pre className="mt-1 p-2 bg-water-2/40 rounded text-[10px] text-fog/85 overflow-x-auto whitespace-pre-wrap max-h-60">
        {JSON.stringify(state.result, null, 2)}
      </pre>
    </details>
  );
}
