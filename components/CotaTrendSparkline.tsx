import { getCotaHistory } from "@/lib/cota-history";

type Props = {
  stationSlug: string;
  stationName: string;
  currentLevel?: number;
  days?: number;
};

export async function CotaTrendSparkline({ stationSlug, stationName, currentLevel, days = 30 }: Props) {
  const history = await getCotaHistory(stationSlug, days);

  if (history.length < 2) {
    return (
      <div className="card rounded-xl p-4">
        <p className="text-xs uppercase tracking-widest text-moss mb-1">Cota {stationName} — trend {days}z</p>
        {currentLevel != null && (
          <p className="text-3xl font-light text-amber-glow mb-1">
            {currentLevel}<span className="text-sm text-fog/55 ml-1">cm acum</span>
          </p>
        )}
        <p className="text-xs text-fog/50 mt-1.5">
          {history.length === 0
            ? "Trendul se construiește — primul snapshot mâine la 6:30"
            : "Trendul se construiește — 1 punct disponibil, mai vine câte unul pe zi"}
        </p>
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
    return { x, y, level: p.level_cm, date: p.measured_at };
  });
  const pathD = pts.map((p, i) => `${i === 0 ? "M" : "L"}${p.x.toFixed(1)},${p.y.toFixed(1)}`).join(" ");
  const areaD = `${pathD} L${pts[pts.length - 1].x.toFixed(1)},${h - pad} L${pts[0].x.toFixed(1)},${h - pad} Z`;

  const first = levels[0];
  const last = levels[levels.length - 1];
  const delta = last - first;
  const deltaColor = delta > 5 ? "#a8c87a" : delta < -5 ? "#e89844" : "#d4a657";

  return (
    <div className="card rounded-xl p-4">
      <div className="flex items-baseline justify-between mb-2">
        <p className="text-xs uppercase tracking-widest text-moss">
          Cota {stationName} — trend {history.length}z
        </p>
        <span className="text-xs" style={{ color: deltaColor }}>
          {delta > 0 ? "+" : ""}{delta} cm
        </span>
      </div>
      <p className="text-3xl font-light text-amber-glow mb-2">
        {last}<span className="text-sm text-fog/55 ml-1">cm</span>
      </p>
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
        <span>min {min}</span>
        <span>max {max}</span>
      </div>
    </div>
  );
}
