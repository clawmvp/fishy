// Coordonate aproximative pentru locurile Delta (lat, lng)
// Sursă: INHGA stations + Wikipedia + cunoștințe locale
// Format: slug → [lat, lng]

export const LOC_COORDS: Record<string, [number, number]> = {
  // Brațe Delta — markeri la mijloc
  "bratul-chilia": [45.35, 29.10],
  "bratul-sulina": [45.18, 29.20],
  "bratul-sfantu-gheorghe": [45.00, 29.30],
  "bratul-tulcea": [45.18, 28.85],

  // Sate / așezări
  "mila-23": [45.2300, 29.2486],
  "crisan": [45.1756, 29.3720],
  "chilia-veche": [45.4129, 29.2813],
  "sulina": [45.1575, 29.6611],
  "sf-gheorghe": [44.8951, 29.5855],
  "sfantu-gheorghe": [44.8951, 29.5855],
  "periprava": [45.4084, 29.5494],
  "pardina": [45.3037, 28.9559],
  "mahmudia": [45.0917, 29.0910],
  "murighiol": [45.0306, 29.1542],
  "maliuc": [45.1842, 29.0950],
  "caraorman": [45.0747, 29.4164],
  "letea": [45.2679, 29.5271],
  "tatanir": [45.330, 29.10],

  // Canale & Lacuri
  "canal-sontea": [45.205, 29.215],
  "canalul-sontea": [45.205, 29.215],
  "canalul-litcov": [45.13, 29.21],
  "canalul-ingusta": [45.15, 29.18],
  "canal-litcov": [45.13, 29.21],
  "lacul-fortuna": [45.160, 29.450],
  "fortuna": [45.160, 29.450],
  "lacul-rosu": [45.047, 29.515],
  "rosu": [45.047, 29.515],
  "lacul-puiu": [45.080, 29.510],
  "puiu": [45.080, 29.510],
  "lacul-matita": [45.270, 29.380],
  "matita": [45.270, 29.380],
  "lopatna": [45.190, 29.350],
  "boda-proste": [45.180, 29.310],
  "boda": [45.180, 29.310],
  "bogdaproste": [45.180, 29.310],
  "lacul-tatanir": [45.330, 29.105],
  "lacul-obretin": [45.220, 29.295],
  "obretin": [45.220, 29.295],
  "lacul-saon": [45.260, 28.890],
  "saon": [45.260, 28.890],
  "lacul-erenciuc": [45.060, 29.420],
  "lacul-isac": [45.155, 29.240],

  // Inserții noi GDA insights
  "bratul-sulina-mila-8": [45.16, 29.05],
  "bratul-sulina-maliuc": [45.184, 29.095],
  "bratul-chilia-tatanir": [45.330, 29.105],
  "bratul-chilia-canal-36": [45.42, 29.30],
  "bratul-chilia-obrize": [45.41, 29.55],
  "bratul-sulina-crisan-epi": [45.175, 29.370],
  "canal-tranzit-crisan": [45.180, 29.350],
  "lopatna-boda-proste-fortuna": [45.175, 29.380],

  // Locații Dunăre din afara Deltei (regiune dunare-larga) — au lat/lng dar nu sunt afișate pe hartă filtrată Delta
  "isaccea": [45.288, 28.453],
  "braila": [45.270, 27.970],
  "galati": [45.435, 28.046],
  "tulcea": [45.182, 28.799],
};

// Cota stations cu coords
export const COTA_STATIONS_COORDS: Record<string, { name: string; lat: number; lng: number; }> = {
  tulcea:  { name: "Tulcea",  lat: 45.1819, lng: 28.7988 },
  isaccea: { name: "Isaccea", lat: 45.288,  lng: 28.453 },
  braila:  { name: "Brăila",  lat: 45.270,  lng: 27.970 },
  chilia:  { name: "Brațul Chilia (debit)", lat: 45.42, lng: 29.26 },
};
