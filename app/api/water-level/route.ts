import { NextRequest, NextResponse } from "next/server";
import {
  DANUBE_STATIONS,
  classifyLevel,
  getLevelFishingImpact,
} from "@/lib/water-level";

interface ParsedStation {
  city: string;
  rkm: number;
  level: number;
  variation: number;
  waterTemp: number | null;
  date: string;
  forecast24h: number | null;
  forecast48h: number | null;
  forecast72h: number | null;
}

async function scrapeDanubeAlert(): Promise<ParsedStation[]> {
  const res = await fetch("https://danubealert.com/en/Romania", {
    headers: {
      "User-Agent": "iFishDelta/1.0 (fishing app)",
      Accept: "text/html",
    },
    next: { revalidate: 3600 },
  });

  if (!res.ok) throw new Error(`DanubeAlert responded with ${res.status}`);

  const html = await res.text();

  const stations: ParsedStation[] = [];

  const rowRegex = /<tr[^>]*>\s*<td[^>]*>(?:<a[^>]*>)?([^<]+)(?:<\/a>)?<\/td>\s*<td[^>]*>(\d+)<\/td>\s*<td[^>]*>(-?\d+)<\/td>\s*<td[^>]*>(-?\d+)<\/td>\s*<td[^>]*>([\d.]+|)<\/td>\s*<td[^>]*>([^<]+)<\/td>\s*<td[^>]*>(-?\d+)<\/td>\s*<td[^>]*>(-?\d+)<\/td>\s*<td[^>]*>(-?\d+)<\/td>\s*<td[^>]*>(-?\d+)<\/td>\s*<td[^>]*>(-?\d+)<\/td>/g;

  let match;
  while ((match = rowRegex.exec(html)) !== null) {
    const city = match[1].trim();
    const rkm = parseInt(match[2]);
    const level = parseInt(match[3]);
    const variation = parseInt(match[4]);
    const tempStr = match[5];
    const date = match[6].trim();
    const f24 = parseInt(match[7]);
    const f48 = parseInt(match[8]);
    const f72 = parseInt(match[9]);

    stations.push({
      city,
      rkm,
      level,
      variation,
      waterTemp: tempStr ? parseFloat(tempStr) : null,
      date,
      forecast24h: f24 || null,
      forecast48h: f48 || null,
      forecast72h: f72 || null,
    });
  }

  return stations;
}

function findMatchingStation(parsed: ParsedStation[], stationSlug: string) {
  const knownStation = DANUBE_STATIONS.find((s) => s.slug === stationSlug);
  if (!knownStation) return null;

  const normalizedCity = knownStation.city.toLowerCase();
  const found = parsed.find((p) => {
    const pCity = p.city
      .toLowerCase()
      .normalize("NFD")
      .replace(/[\u0300-\u036f]/g, "")
      .replace(/[ăâ]/g, "a")
      .replace(/[șş]/g, "s")
      .replace(/[țţ]/g, "t")
      .replace(/[îi]/g, "i");
    return pCity.includes(normalizedCity) || normalizedCity.includes(pCity);
  });

  if (!found) {
    const byRkm = parsed.find((p) => Math.abs(p.rkm - knownStation.rkm) <= 5);
    return byRkm ? { ...byRkm, matchedStation: knownStation } : null;
  }
  return { ...found, matchedStation: knownStation };
}

export async function GET(request: NextRequest) {
  const stationSlug = request.nextUrl.searchParams.get("station");

  if (!stationSlug) {
    return NextResponse.json({ error: "Station parameter required" }, { status: 400 });
  }

  try {
    const parsed = await scrapeDanubeAlert();

    if (parsed.length === 0) {
      return NextResponse.json(
        { error: "Could not parse water level data" },
        { status: 502 }
      );
    }

    const match = findMatchingStation(parsed, stationSlug);

    if (!match || !match.matchedStation) {
      return NextResponse.json(
        { error: `Station ${stationSlug} not found in data` },
        { status: 404 }
      );
    }

    const { matchedStation, level, variation, waterTemp, date, forecast24h, forecast48h, forecast72h } = match;

    const trend: "rising" | "falling" | "stable" =
      variation > 2 ? "rising" : variation < -2 ? "falling" : "stable";

    const relativeLevel = classifyLevel(level, matchedStation);
    const fishingImpact = getLevelFishingImpact(relativeLevel);

    const reading = {
      station: matchedStation,
      level,
      variation,
      waterTemp,
      date,
      forecast24h,
      forecast48h,
      forecast72h,
      trend,
      relativeLevel,
      fishingImpact,
    };

    return NextResponse.json(reading, {
      headers: { "Cache-Control": "public, max-age=3600, s-maxage=3600" },
    });
  } catch (err) {
    console.error("Water level fetch error:", err);
    return NextResponse.json(
      { error: "Failed to fetch water level data" },
      { status: 502 }
    );
  }
}
