import { ImageResponse } from "next/og";
import { getWaterLevel } from "@/lib/conditii-live";
import { fetchWeather, getWindDirection } from "@/lib/weather";
import { getMoonPhase } from "@/lib/moon";
import { getLevelLabel } from "@/lib/water-level";

export const dynamic = "force-dynamic";

const REF_LAT = 45.211;
const REF_LON = 29.131;

export async function GET() {
  const [tulcea, isaccea] = await Promise.all([
    getWaterLevel("tulcea").catch(() => null),
    getWaterLevel("isaccea").catch(() => null),
  ]);
  let f = null;
  try {
    const fc = await fetchWeather(REF_LAT, REF_LON, 1);
    f = fc[0] ?? null;
  } catch {
    /* ignore */
  }
  const moon = getMoonPhase(new Date());
  const dateStr = new Date().toLocaleDateString("ro-RO", { weekday: "long", day: "numeric", month: "long" });
  const trend = tulcea ? (tulcea.variation > 0 ? "↑" : tulcea.variation < 0 ? "↓" : "→") : "";

  const stat = (label: string, value: string) => ({ label, value });
  const stats = [
    isaccea ? stat("Isaccea", `${isaccea.level} cm`) : null,
    f?.windMax != null ? stat("Vânt", `${f.windMax} km/h ${getWindDirection(f.windDirection)}`) : null,
    f?.waterTempDeep != null ? stat("Apă", `${Math.round(f.waterTempDeep)}°C`) : null,
    stat("Luna", `${moon.illumination}%`),
  ].filter(Boolean) as { label: string; value: string }[];

  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          padding: 72,
          background: "linear-gradient(160deg, #0d1b1e 0%, #0a1518 100%)",
          color: "#e8e0c8",
          fontFamily: "Georgia, serif",
        }}
      >
        {/* Top */}
        <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", marginBottom: 24 }}>
          <div style={{ display: "flex", alignItems: "center", gap: 14 }}>
            <span style={{ fontSize: 52 }}>🎣</span>
            <span style={{ fontSize: 48, color: "#d4a657", fontWeight: 700 }}>fishy</span>
          </div>
          <span style={{ fontSize: 30, color: "#7a8a6f", textTransform: "capitalize" }}>{dateStr}</span>
        </div>

        <div style={{ display: "flex", fontSize: 30, color: "#7a8a6f", letterSpacing: 8, textTransform: "uppercase", marginBottom: 30 }}>
          Cota Dunării · azi
        </div>

        {/* Tulcea hero */}
        <div style={{ display: "flex", flexDirection: "column", marginBottom: 20 }}>
          <span style={{ fontSize: 34, color: "#7a8a6f" }}>Tulcea</span>
          <div style={{ display: "flex", alignItems: "baseline", gap: 18 }}>
            <span style={{ fontSize: 220, color: "#d4a657", fontWeight: 700, lineHeight: 1 }}>
              {tulcea ? tulcea.level : "—"}
            </span>
            <span style={{ fontSize: 56, color: "#e8e0c8" }}>cm</span>
            <span style={{ fontSize: 80, color: "#a8c87a" }}>{trend}</span>
          </div>
          {tulcea && (
            <span style={{ fontSize: 34, color: "#d4a657" }}>{getLevelLabel(tulcea.relativeLevel)}</span>
          )}
        </div>

        {/* Stats row */}
        <div style={{ display: "flex", gap: 20, marginTop: 30 }}>
          {stats.map((s) => (
            <div
              key={s.label}
              style={{
                display: "flex",
                flexDirection: "column",
                flex: 1,
                padding: "26px 24px",
                borderRadius: 18,
                background: "rgba(255,255,255,0.04)",
                border: "1px solid rgba(212,166,87,0.18)",
              }}
            >
              <span style={{ fontSize: 26, color: "#7a8a6f", textTransform: "uppercase", letterSpacing: 2 }}>{s.label}</span>
              <span style={{ fontSize: 44, color: "#e8e0c8" }}>{s.value}</span>
            </div>
          ))}
        </div>

        {/* Footer */}
        <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", marginTop: "auto" }}>
          <span style={{ fontSize: 34, color: "#d4a657" }}>fishy.n01.app</span>
          <span style={{ fontSize: 28, color: "#7a8a6f" }}>pescuit în Delta Dunării</span>
        </div>
      </div>
    ),
    { width: 1080, height: 1080 }
  );
}
