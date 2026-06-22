import type { MetadataRoute } from "next";

export default function robots(): MetadataRoute.Robots {
  return {
    rules: {
      userAgent: "*",
      allow: "/",
      disallow: ["/api/", "/propuneri"],
    },
    sitemap: "https://fishy.n01.app/sitemap.xml",
    host: "https://fishy.n01.app",
  };
}
