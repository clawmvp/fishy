import { getCotaHistory } from "@/lib/cota-history";

type Props = {
  currentDebit?: number;
  days?: number;
};

type Tier = {
  zona: string;
  prag: string;
  semnal: string;
  detaliu: string;
  match: (value: number) => boolean;
  cssColor: string;
};

const TIERS: Tier[] = [
  {
    zona: "puternic",
    prag: "> 6000",
    semnal: "curent puternic",
    detaliu: "pește pe maluri și cot adăpostite, ancoră dublă obligatorie, plumb 150g+",
    match: (v) => v > 6000,
    cssColor: "#e89844",
  },
  {
    zona: "normal",
    prag: "4500-6000",
    semnal: "pescuit standard",
    detaliu: "șenal central + epi-uri, plumb 100-120g",
    match: (v) => v >= 4500 && v <= 6000,
    cssColor: "#a8c87a",
  },
  {
    zona: "scăzut",
    prag: "< 4000",
    semnal: "cota scăzută",
    detaliu: "peștii pe șenal adânc, evită zone laterale, plumb 80g",
    match: (v) => v < 4000,
    cssColor: "#d4a657",
  },
];

function activeTier(v: number): Tier | null {
  return TIERS.find((t) => t.match(v)) ?? null;
}

function fmt(v: number): string {
  return v >= 1000 ? `${(v / 1000).toFixed(1)}k` : `${v}`;
}

export async function ChiliaDebitCard({ currentDebit, days = 30 }: Props) {
  const history = await getCotaHistory("chilia", days);
  const tier = typeof currentDebit === "number" ? activeTier(currentDebit) : null;

  // Sparkline
  let pathD = "";
  let areaD = "";
  let pts: { x: number; y: number }[] = [];
  let min = 0;
  let max = 0;
  let delta = 0;
  const w = 280;
  const h = 60;
  const pad = 4;

  if (history.length >= 2) {
    const levels = history.map((h) => h.level_cm);
    min = Math.min(...levels);
    max = Math.max(...levels);
    const range = Math.max(max - min, 100);
    pts = history.map((p, i) => {
      const x = pad + (i / (history.length - 1)) * (w - 2 * pad);
      const y = pad + ((max - p.level_cm) / range) * (h - 2 * pad);
      return { x, y };
    });
    pathD = pts.map((p, i) => `${i === 0 ? "M" : "L"}${p.x.toFixed(1)},${p.y.toFixed(1)}`).join(" ");
    areaD = `${pathD} L${pts[pts.length - 1].x.toFixed(1)},${h - pad} L${pts[0].x.toFixed(1)},${h - pad} Z`;
    delta = levels[levels.length - 1] - levels[0];
  }

  const deltaColor = delta > 200 ? "#a8c87a" : delta < -200 ? "#e89844" : "#d4a657";

  return (
    <div className="card rounded-xl p-4 sm:col-span-2 lg:col-span-2">
      <div className="flex items-baseline justify-between mb-1">
        <p className="text-xs uppercase tracking-widest text-moss">
          Brațul Chilia — debit {history.length >= 2 ? `${history.length}z` : ""}
        </p>
        {history.length >= 2 && (
          <span className="text-xs" style={{ color: deltaColor }}>
            {delta > 0 ? "+" : ""}{fmt(delta)} m³/s
          </span>
        )}
      </div>

      {typeof currentDebit === "number" ? (
        <>
          <div className="flex items-baseline gap-3 mb-2">
            <p className="text-3xl font-light text-amber-glow">
              {fmt(currentDebit)}<span className="text-sm text-fog/55 ml-1">m³/s</span>
            </p>
            {tier && (
              <span className="text-xs px-2 py-0.5 rounded-md border" style={{
                color: tier.cssColor,
                borderColor: `${tier.cssColor}55`,
                background: `${tier.cssColor}15`,
              }}>
                {tier.zona} · {tier.semnal}
              </span>
            )}
          </div>
          <p className="text-xs text-fog/55 mb-3">Open-Meteo flood (GloFAS) — util doar pentru cei care pescuiesc pe Brațul Chilia (Tatanir, Periprava, Letea, Pardina)</p>

          {history.length >= 2 && (
            <svg viewBox={`0 0 ${w} ${h}`} className="w-full h-12 mb-2">
              <defs>
                <linearGradient id="grad-chilia-card" x1="0" x2="0" y1="0" y2="1">
                  <stop offset="0%" stopColor="#d4a657" stopOpacity="0.35" />
                  <stop offset="100%" stopColor="#d4a657" stopOpacity="0" />
                </linearGradient>
              </defs>
              <path d={areaD} fill="url(#grad-chilia-card)" />
              <path d={pathD} stroke="#d4a657" strokeWidth="1.5" fill="none" strokeLinecap="round" strokeLinejoin="round" />
              {pts.map((p, i) => (
                <circle key={i} cx={p.x} cy={p.y} r="1.5" fill="#d4a657" />
              ))}
            </svg>
          )}

          {/* Interpretare 3 trepte */}
          <div className="mt-3 pt-3 border-t border-amber-glow/15">
            <p className="text-[10px] uppercase tracking-widest text-moss mb-2">Cum se folosește</p>
            <div className="space-y-1.5">
              {TIERS.map((t) => {
                const isActive = tier?.zona === t.zona;
                return (
                  <div key={t.zona} className="flex items-baseline gap-2 text-xs">
                    <span
                      className="flex-shrink-0 px-1.5 py-0.5 rounded font-medium tabular-nums"
                      style={{
                        color: isActive ? t.cssColor : "rgba(232,229,217,0.55)",
                        background: isActive ? `${t.cssColor}18` : "transparent",
                        border: isActive ? `1px solid ${t.cssColor}40` : "1px solid rgba(212,166,87,0.10)",
                        minWidth: "76px",
                        textAlign: "center",
                      }}
                    >
                      {t.prag}
                    </span>
                    <span className={isActive ? "text-fog" : "text-fog/65"}>
                      <strong className={isActive ? "" : "text-fog/85"}>{t.semnal}</strong> — {t.detaliu}
                    </span>
                  </div>
                );
              })}
            </div>
          </div>
        </>
      ) : (
        <>
          <p className="text-base font-display text-fog/60 mt-1">indisponibil</p>
          <p className="text-xs text-fog/50 mt-1.5">Open-Meteo flood nu raportează acum. Verifică din nou mai târziu.</p>
        </>
      )}
    </div>
  );
}
