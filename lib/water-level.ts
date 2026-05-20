export interface WaterLevelStation {
  city: string;
  slug: string;
  rkm: number;
  lat: number;
  lon: number;
  ldc: number;
  hdc: number;
}

export interface WaterLevelReading {
  station: WaterLevelStation;
  level: number;
  variation: number;
  waterTemp: number | null;
  date: string;
  forecast24h: number | null;
  forecast48h: number | null;
  forecast72h: number | null;
  trend: "rising" | "falling" | "stable";
  relativeLevel: "foarte_scazut" | "scazut" | "normal" | "ridicat" | "foarte_ridicat" | "pericol";
  fishingImpact: string;
}

export const DANUBE_STATIONS: WaterLevelStation[] = [
  { city: "Sulina",      slug: "sulina",       rkm: 0,    lat: 45.157, lon: 29.663, ldc: 50,  hdc: 300 },
  { city: "Tulcea",      slug: "tulcea",       rkm: 71,   lat: 45.178, lon: 28.802, ldc: 60,  hdc: 400 },
  { city: "Isaccea",     slug: "isaccea",      rkm: 103,  lat: 45.289, lon: 28.454, ldc: 72,  hdc: 478 },
  { city: "Galati",      slug: "galati",       rkm: 150,  lat: 45.435, lon: 28.046, ldc: 80,  hdc: 550 },
  { city: "Braila",      slug: "braila",       rkm: 170,  lat: 45.269, lon: 27.970, ldc: 80,  hdc: 580 },
  { city: "Harsova",     slug: "harsova",      rkm: 253,  lat: 44.689, lon: 27.956, ldc: 100, hdc: 650 },
  { city: "Cernavoda",   slug: "cernavoda",    rkm: 300,  lat: 44.339, lon: 28.035, ldc: 80,  hdc: 600 },
  { city: "Calarasi",    slug: "calarasi",     rkm: 370,  lat: 44.203, lon: 27.333, ldc: 80,  hdc: 600 },
  { city: "Giurgiu",     slug: "giurgiu",      rkm: 493,  lat: 43.897, lon: 25.972, ldc: 80,  hdc: 700 },
];

export const HIDRO_IDS: Record<string, number> = {
  sulina: 9149,
  tulcea: 42057,
  isaccea: 42050,
  galati: 42052,
  braila: 42051,
  harsova: 42045,
  cernavoda: 42043,
  calarasi: 42040,
  giurgiu: 42022,
};

function haversineDistance(lat1: number, lon1: number, lat2: number, lon2: number): number {
  const R = 6371;
  const dLat = ((lat2 - lat1) * Math.PI) / 180;
  const dLon = ((lon2 - lon1) * Math.PI) / 180;
  const a =
    Math.sin(dLat / 2) * Math.sin(dLat / 2) +
    Math.cos((lat1 * Math.PI) / 180) * Math.cos((lat2 * Math.PI) / 180) *
    Math.sin(dLon / 2) * Math.sin(dLon / 2);
  return R * 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
}

export function findNearestStation(lat: number, lon: number): WaterLevelStation {
  let nearest = DANUBE_STATIONS[0];
  let minDist = Infinity;
  for (const station of DANUBE_STATIONS) {
    const d = haversineDistance(lat, lon, station.lat, station.lon);
    if (d < minDist) {
      minDist = d;
      nearest = station;
    }
  }
  return nearest;
}

export function findNearestStations(lat: number, lon: number, count: number = 2): WaterLevelStation[] {
  const sorted = [...DANUBE_STATIONS]
    .map((s) => ({ station: s, dist: haversineDistance(lat, lon, s.lat, s.lon) }))
    .sort((a, b) => a.dist - b.dist);
  return sorted.slice(0, count).map((s) => s.station);
}

export function classifyLevel(
  level: number,
  station: WaterLevelStation
): WaterLevelReading["relativeLevel"] {
  const range = station.hdc - station.ldc;
  const pct = ((level - station.ldc) / range) * 100;

  if (pct <= 5) return "foarte_scazut";
  if (pct <= 25) return "scazut";
  if (pct <= 60) return "normal";
  if (pct <= 80) return "ridicat";
  if (pct <= 95) return "foarte_ridicat";
  return "pericol";
}

export function getLevelFishingImpact(relativeLevel: WaterLevelReading["relativeLevel"]): string {
  switch (relativeLevel) {
    case "foarte_scazut":
      return "Apa foarte scazuta. Pestii se concentreaza in gropile adanci si in canalele principale. Accesul cu barca poate fi limitat. Pescuitul pe canale mici este dificil.";
    case "scazut":
      return "Nivel sub medie. Pestii stau pe canalele adanci. Bun pentru pescuit pe gropi, dar zonele laterale sunt prea putin adanci.";
    case "normal":
      return "Nivel optim pentru pescuit! Pestii sunt distribuiti normal. Toate zonele sunt accesibile, balti si canale deopotriva.";
    case "ridicat":
      return "Apa ridicata. Pestii se raspandesc pe zonele inundate si in stuf. Pescar mai dificil — pestii au mult spatiu si hrana naturala abundenta.";
    case "foarte_ridicat":
      return "Nivel foarte ridicat. Pestii migreaza spre zonele inundate. Pescuitul in locurile obisnuite este dificil — cauta marginile de inundatie.";
    case "pericol":
      return "PERICOL! Nivel de alerta. NU se recomanda deplasarea pe apa. Curentii sunt puternici si periculosi.";
  }
}

export function getLevelIcon(relativeLevel: WaterLevelReading["relativeLevel"]): string {
  switch (relativeLevel) {
    case "foarte_scazut": return "🔻";
    case "scazut": return "📉";
    case "normal": return "✅";
    case "ridicat": return "📈";
    case "foarte_ridicat": return "⚠️";
    case "pericol": return "🚨";
  }
}

export function getLevelLabel(relativeLevel: WaterLevelReading["relativeLevel"]): string {
  switch (relativeLevel) {
    case "foarte_scazut": return "Foarte scazut";
    case "scazut": return "Sub medie";
    case "normal": return "Normal";
    case "ridicat": return "Ridicat";
    case "foarte_ridicat": return "Foarte ridicat";
    case "pericol": return "PERICOL";
  }
}

export function getLevelColor(relativeLevel: WaterLevelReading["relativeLevel"]): string {
  switch (relativeLevel) {
    case "foarte_scazut": return "text-low";
    case "scazut": return "text-moderate";
    case "normal": return "text-peak";
    case "ridicat": return "text-moderate";
    case "foarte_ridicat": return "text-low";
    case "pericol": return "text-danger";
  }
}

export async function fetchWaterLevel(stationSlug: string): Promise<WaterLevelReading | null> {
  try {
    const res = await fetch(`/api/water-level?station=${stationSlug}`);
    if (!res.ok) return null;
    return await res.json();
  } catch {
    return null;
  }
}
