import type { MetadataRoute } from "next";

export default function manifest(): MetadataRoute.Manifest {
  return {
    name: "fishy — pescuit în Delta Dunării",
    short_name: "fishy",
    description:
      "Locuri, tehnici, monturi și cote hidro live pentru pescuit în Delta Dunării.",
    start_url: "/",
    display: "standalone",
    background_color: "#0d1b1e",
    theme_color: "#0d1b1e",
    lang: "ro",
    categories: ["sports", "lifestyle", "navigation"],
    icons: [
      { src: "/icon", sizes: "32x32", type: "image/png" },
      { src: "/apple-icon", sizes: "180x180", type: "image/png" },
      { src: "/icon-192", sizes: "192x192", type: "image/png", purpose: "any" },
      { src: "/icon-512", sizes: "512x512", type: "image/png", purpose: "any" },
      { src: "/icon-512", sizes: "512x512", type: "image/png", purpose: "maskable" },
    ],
  };
}
