import type { MetadataRoute } from "next";
import { locuri } from "@/data/locuri";
import { tehnici } from "@/data/tehnici";
import { monturi } from "@/data/monturi";
import { articole } from "@/data/articole";
import { specii } from "@/data/specii";

const BASE = "https://fishy.n01.app";

export default function sitemap(): MetadataRoute.Sitemap {
  const now = new Date();

  const staticPaths: [string, number][] = [
    ["", 1],
    ["/azi", 0.9],
    ["/harta", 0.8],
    ["/feed", 0.7],
    ["/about", 0.5],
    ["/specii", 0.9],
    ["/locuri", 0.9],
    ["/tehnici", 0.9],
    ["/prognoza", 0.8],
    ["/beacon", 0.7],
    ["/monturi", 0.8],
    ["/monturi/tipuri", 0.6],
    ["/prohibitie", 0.8],
    ["/echipament", 0.7],
    ["/articole", 0.8],
    ["/glosar", 0.7],
    ["/provizii", 0.5],
    ["/algoritm", 0.4],
  ];

  const staticEntries: MetadataRoute.Sitemap = staticPaths.map(([path, priority]) => ({
    url: `${BASE}${path}`,
    lastModified: now,
    changeFrequency: path === "" || path === "/azi" ? "daily" : "weekly",
    priority,
  }));

  const dynamic = (items: { slug: string }[], prefix: string, priority: number): MetadataRoute.Sitemap =>
    items.map((it) => ({
      url: `${BASE}${prefix}/${it.slug}`,
      lastModified: now,
      changeFrequency: "monthly",
      priority,
    }));

  return [
    ...staticEntries,
    ...specii.map((s) => ({
      url: `${BASE}/specii/${s.id}`,
      lastModified: now,
      changeFrequency: "monthly" as const,
      priority: 0.8,
    })),
    ...dynamic(locuri, "/locuri", 0.7),
    ...dynamic(tehnici, "/tehnici", 0.7),
    ...dynamic(monturi, "/monturi", 0.6),
    ...dynamic(articole, "/articole", 0.6),
  ];
}
