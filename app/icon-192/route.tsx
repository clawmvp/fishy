import { ImageResponse } from "next/og";

export function GET() {
  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          background: "linear-gradient(160deg, #0d1b1e 0%, #0a1518 100%)",
          color: "#d4a657",
          fontSize: 128,
          fontWeight: 700,
          fontFamily: "Georgia, serif",
        }}
      >
        f
      </div>
    ),
    { width: 192, height: 192 }
  );
}
