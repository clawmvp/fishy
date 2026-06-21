import { getCotaHistory } from "@/lib/cota-history";

type Props = {
  stationSlug: string;
  stationName: string;
  currentLevel?: number;
  unit?: "cm" | "m3s";
  hint?: string; // text mic sub valoare
  days?: number;
};

function formatValue(value: number, unit: "cm" | "m3s"): string {
  if (unit === "m3s") {
    if (Math.abs(value) >= 1000) return `${(value / 1000).toFixed(1)}k`;
    return `${value}`;
  }
  return `${value}`;
}

function unitLabel(unit: "cm" | "m3s"): string {
  return unit === "m3s" ? "m³/s" : "cm";
}

export async function CotaTrendSparkline({
  stationSlug, stationName, currentLevel, unit = "cm", hint, days = 30,
}: Props) {
  const history = await getCotaHistory(stationSlug, days);

  if (history.length < 2) {
    const hasCurrent = typeof currentLevel === "number";
    return (
      <div className="card rounded-xl p-4">
        <p className="text-xs uppercase tracking-widest text-moss mb-1">{stationName} — trend {days}z</p>
        {hasCurrent ? (
          <>
            <p className="text-3xl font-light text-amber-glow mb-1">
              {formatValue(currentLevel!, unit)}<span className="text-sm text-fog/55 ml-1">{unitLabel(unit)}</span>
            </p>
            {hint && <p className="text-xs text-fog/55 mb-1">{hint}</p>}
            <p className="text-xs text-fog/50 mt-1">
              {history.length === 0
                ? "Trendul se construiește — primul snapshot mâine la 6:30"
                : "Trendul se construiește — 1 punct, mai vine câte unul pe zi"}
            </p>
          </>
        ) : (
          <>
            <p className="text-base font-display text-fog/60 mt-1">indisponibil</p>
            <p className="text-xs text-fog/50 mt-1.5">
              {stationName} nu raportează acum. Verifică pe <a className="text-amber-glow" href="https://www.hidro.ro" target="_blank" rel="noopener noreferrer">hidro.ro</a>.
            </p>
          </>
        )}
      </div>
    );
  }

  const levels = history.map((h) => h.level_cm);
  const min = Math.min(...levels);
  const max = Math.max(...levels);
  const range = Math.max(max - min, 10);

  const w = 280;
  const h = 60;
  const pad = 4;
  const pts = history.map((p, i) => {
    const x = pad + (i / (history.length - 1)) * (w - 2 * pad);
    const y = pad + ((max - p.level_cm) / range) * (h - 2 * pad);
    return { x, y };
  });
  const pathD = pts.map((p, i) => `${i === 0 ? "M" : "L"}${p.x.toFixed(1)},${p.y.toFixed(1)}`).join(" ");
  const areaD = `${pathD} L${pts[pts.length - 1].x.toFixed(1)},${h - pad} L${pts[0].x.toFixed(1)},${h - pad} Z`;

  const first = levels[0];
  const last = levels[levels.length - 1];
  const delta = last - first;
  const deltaColor = delta > 5 ? "#a8c87a" : delta < -5 ? "#e89844" : "#d4a657";
  const deltaThreshold = unit === "m3s" ? 200 : 5;
  const finalDeltaColor = delta > deltaThreshold ? "#a8c87a" : delta < -deltaThreshold ? "#e89844" : "#d4a657";

  return (
    <div className="card rounded-xl p-4">
      <div className="flex items-baseline justify-between mb-2">
        <p className="text-xs uppercase tracking-widest text-moss">
          {stationName} — trend {history.length}z
        </p>
        <span className="text-xs" style={{ color: finalDeltaColor }}>
          {delta > 0 ? "+" : ""}{formatValue(delta, unit)} {unitLabel(unit)}
        </span>
      </div>
      <p className="text-3xl font-light text-amber-glow mb-1">
        {formatValue(last, unit)}<span className="text-sm text-fog/55 ml-1">{unitLabel(unit)}</span>
      </p>
      {hint && <p className="text-xs text-fog/55 mb-1">{hint}</p>}
      <svg viewBox={`0 0 ${w} ${h}`} className="w-full h-12 mb-1">
        <defs>
          <linearGradient id={`grad-${stationSlug}`} x1="0" x2="0" y1="0" y2="1">
            <stop offset="0%" stopColor="#d4a657" stopOpacity="0.35" />
            <stop offset="100%" stopColor="#d4a657" stopOpacity="0" />
          </linearGradient>
        </defs>
        <path d={areaD} fill={`url(#grad-${stationSlug})`} />
        <path d={pathD} stroke="#d4a657" strokeWidth="1.5" fill="none" strokeLinecap="round" strokeLinejoin="round" />
        {pts.map((p, i) => (
          <circle key={i} cx={p.x} cy={p.y} r="1.5" fill="#d4a657" />
        ))}
      </svg>
      <div className="flex items-baseline justify-between text-xs text-fog/40">
        <span>min {formatValue(min, unit)}</span>
        <span>max {formatValue(max, unit)}</span>
      </div>
    </div>
  );
}
