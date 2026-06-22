// Coordonate aproximative pentru locurile Delta (lat, lng)
// Sourcing: INHGA stations + cunoștințe locale + Wikipedia
// Format: slug → [lat, lng]
// SLUG-urile sunt EXACT cele din data/locuri.ts

export const LOC_COORDS: Record<string, [number, number]> = {
  // Brațe Delta — markere la mijlocul brațului
  "bratul-chilia": [45.35, 29.10],
  "bratul-sulina": [45.18, 29.20],
  "bratul-sfantu-gheorghe": [45.00, 29.30],
  "bratul-tataru": [45.40, 29.15],
  "bratul-babina": [45.30, 29.30],
  "bratul-cernovca": [45.40, 29.40],
  "bratul-valciu-braila": [45.10, 27.90],
  "chilia-deasupra-veche": [45.43, 29.20],
  "musura-frontiera-ucraina": [45.30, 29.75],

  // Sate / așezări
  "mila-23": [45.2300, 29.2486],
  "chilia-veche": [45.4129, 29.2813],

  // Brațe — puncte specifice (GDA insights)
  "bratul-sulina-mila-8": [45.16, 29.05],
  "bratul-sulina-mal-maliuc": [45.184, 29.095],
  "bratul-sulina-epiuri-crisan": [45.175, 29.370],
  "epiuri-sulina-gorgova-crisan": [45.175, 29.310],
  "sulina-maliuc-vulturul": [45.185, 28.940],
  "bratul-chilia-tatanir-prag-vertical": [45.330, 29.105],
  "bratul-chilia-bifurcatie-canal-36": [45.42, 29.30],
  "bratul-chilia-obrize-varsare": [45.41, 29.55],
  "chilia-veche-pragul-22m": [45.41, 29.27],
  "groapa-25m-chilia-tatanir": [45.330, 29.110],
  "gura-canalului-erenciuc": [44.95, 29.45],

  // Canale Delta
  "canalul-sontea": [45.205, 29.215],
  "canalul-litcov": [45.13, 29.21],
  "canalul-litcov-cioate": [45.13, 29.21],
  "canalul-ingusta": [45.15, 29.18],
  "canalul-ingusta-plop-cazut": [45.15, 29.18],
  "canalul-iacub": [45.10, 29.40],
  "canal-tranzit-crisan-dunarea-veche": [45.180, 29.350],
  "canal-lopatna-boda-proste-fortuna": [45.175, 29.380],
  "dunarea-veche": [45.20, 29.30],
  "dunarea-veche-mila23-lopatna": [45.215, 29.275],
  "boda-proste-lopatna": [45.190, 29.350],

  // Lacuri Delta
  "lacul-babina": [45.27, 29.27],
  "lacuri-mila23-nord": [45.250, 29.250],
  "lacul-babadag": [44.875, 28.700],
  "statia-11-delta": [45.10, 29.50],
};

// Cota stations cu coords
export const COTA_STATIONS_COORDS: Record<string, { name: string; lat: number; lng: number; }> = {
  tulcea:  { name: "Tulcea",  lat: 45.1819, lng: 28.7988 },
  isaccea: { name: "Isaccea", lat: 45.288,  lng: 28.453 },
  braila:  { name: "Brăila",  lat: 45.270,  lng: 27.970 },
  chilia:  { name: "Brațul Chilia (debit)", lat: 45.42, lng: 29.26 },
};
