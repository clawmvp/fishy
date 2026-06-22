import { ImageResponse } from "next/og";

export const size = { width: 180, height: 180 };
export const contentType = "image/png";

export default function AppleIcon() {
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
        }}
      >
        <svg width="140" height="92" viewBox="0 0 64 40" xmlns="http://www.w3.org/2000/svg">
          <path d="M5 20 Q12 8 26 8 Q44 8 52 14 L60 20 L52 26 Q44 32 26 32 Q12 32 5 20 Z" fill="#d4a657" />
          <path d="M52 14 L62 6 L60 20 L62 34 L52 26 Z" fill="#d4a657" opacity="0.85" />
          <circle cx="20" cy="18" r="3" fill="white" />
          <circle cx="20.5" cy="17.5" r="1.5" fill="#0d1b1e" />
          <path d="M14 23 Q18 27 22 24" stroke="#0d1b1e" strokeWidth="1.8" fill="none" strokeLinecap="round" />
          <path d="M30 13 L36 17 L30 21 Z" fill="#d4a657" opacity="0.6" />
          <circle cx="56" cy="11" r="1.5" fill="#d4a657" opacity="0.5" />
        </svg>
      </div>
    ),
    { ...size }
  );
}
