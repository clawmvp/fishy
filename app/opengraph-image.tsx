import { ImageResponse } from "next/og";

export const alt = "fishy — pescuit în Delta Dunării";
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

export default function OpengraphImage() {
  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
          padding: "80px",
          background: "linear-gradient(160deg, #0d1b1e 0%, #0a1518 100%)",
          color: "#e8e0c8",
          fontFamily: "Georgia, serif",
        }}
      >
        <div
          style={{
            display: "flex",
            alignItems: "center",
            gap: 18,
            fontSize: 34,
            color: "#7a8a6f",
            letterSpacing: 8,
            textTransform: "uppercase",
            marginBottom: 28,
          }}
        >
          <span style={{ fontSize: 56 }}>🎣</span>
          <span>Delta Dunării</span>
        </div>
        <div style={{ fontSize: 132, color: "#d4a657", fontWeight: 700, lineHeight: 1 }}>
          fishy
        </div>
        <div style={{ fontSize: 44, marginTop: 30, color: "#e8e0c8", maxWidth: 920, lineHeight: 1.25 }}>
          Locuri, tehnici, monturi și cote hidro live pentru pescuit în Deltă
        </div>
        <div style={{ fontSize: 30, marginTop: 40, color: "#7a8a6f" }}>
          fishy.n01.app
        </div>
      </div>
    ),
    { ...size }
  );
}
