type Snapshot = {
  cota?: { tulcea: number | null; isaccea: number | null; variation: number | null } | null;
  weather?: {
    tempMax: number | null;
    tempMin: number | null;
    windMax: number | null;
    windDirection: number | null;
    pressure: number | null;
    precipitation: number | null;
    waterTemp: number | null;
  } | null;
  moon?: { illumination: number; phase: string } | null;
  patternsHint?: string[];
};

function windDir(deg: number | null | undefined): string {
  if (deg == null) return "";
  const dirs = ["N", "NE", "E", "SE", "S", "SV", "V", "NV"];
  return dirs[Math.round(deg / 45) % 8];
}

export default function CatchConditions({ snapshot }: { snapshot: Record<string, unknown> | null }) {
  if (!snapshot) return null;
  const s = snapshot as Snapshot;
  const hasAny = s.cota?.tulcea != null || s.weather?.tempMax != null || !!s.moon;
  if (!hasAny) return null;

  return (
    <div
      className="card rounded-lg p-4 mb-6"
      style={{
        background: "linear-gradient(135deg, rgba(168,200,122,0.06), rgba(212,166,87,0.03))",
        borderColor: "rgba(168,200,122,0.20)",
      }}
    >
      <p className="text-xs uppercase tracking-widest text-moss mb-2">📊 Condiții în ziua capturii</p>
      <div className="flex flex-wrap gap-x-3 gap-y-1 text-sm text-fog/85">
        {s.cota?.tulcea != null && (
          <span>
            💧 Tulcea <strong className="text-amber-glow">{s.cota.tulcea}cm</strong>
            {s.cota.variation != null && (
              <span className="text-fog/55"> ({s.cota.variation > 0 ? "+" : ""}{s.cota.variation}/zi)</span>
            )}
          </span>
        )}
        {s.cota?.isaccea != null && (
          <span>Isaccea <strong className="text-fog">{s.cota.isaccea}cm</strong></span>
        )}
        {s.weather?.waterTemp != null && (
          <span>🌡️ Apa <strong className="text-amber-glow">{Math.round(s.weather.waterTemp)}°C</strong></span>
        )}
        {s.weather?.tempMax != null && s.weather?.tempMin != null && (
          <span>🌤️ {s.weather.tempMax}°/{s.weather.tempMin}°</span>
        )}
        {s.weather?.windMax != null && (
          <span>💨 {s.weather.windMax}km/h {windDir(s.weather.windDirection)}</span>
        )}
        {s.weather?.pressure != null && <span>{Math.round(s.weather.pressure)}hPa</span>}
        {s.moon && <span>🌙 {s.moon.illumination}% {s.moon.phase}</span>}
      </div>
      {s.patternsHint && s.patternsHint.length > 0 && (
        <p className="text-xs text-amber-glow mt-2">
          <strong className="text-fog/55">Patterns posibile:</strong> {s.patternsHint.join(" · ")}
        </p>
      )}
    </div>
  );
}
