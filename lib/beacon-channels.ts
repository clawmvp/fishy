// Canale YouTube monitorizate de Beacon — pescuit Delta Dunării

export type Canal = {
  slug: string;       // identificator scurt
  channelId: string;  // YouTube channel ID (UC...) — stabil, RSS direct
  nume: string;       // nume afișat
  focus: string;      // ce face
};

// Channel IDs rezolvate prin yt-dlp / căutare directă
export const CANALE: Canal[] = [
  { slug: "marele-pescar", channelId: "UCK9lWjpOcWz6K8-Ptm8Wyyg", nume: "Marele Pescar", focus: "crap, spinning, multi-day" },
  { slug: "gda-fishing", channelId: "UCtqM2w3F5OTjqLc4QK7tiFQ", nume: "GDA Fishing", focus: "crap Delta, brațe principale" },
  { slug: "baltacul", channelId: "UCNcpEBxFqt9BVEPfB16pfNA", nume: "Baltacul", focus: "spinning, somn clonc" },
  { slug: "gigant-fish", channelId: "UC6maYkDcVleOlQ3-nkimjlw", nume: "Gigant Fish Team", focus: "crap, carnasiere" },
  { slug: "claumar", channelId: "UCf2wohxIjzzsEzSc7-uScXw", nume: "Claudiu Popa (Claumar)", focus: "Delta dintre sate, crap" },
  { slug: "totalfishing", channelId: "UCgpaEr_7PSedOfV-dNE7QDA", nume: "Total Fishing", focus: "Dunăre, somn primăvară" },
  { slug: "dpd", channelId: "UCbxbPIxUqT8oILkpmg4tPLw", nume: "DOAR PENTRU DUNĂRENI (DPD)", focus: "Dunăre, somn" },
];

// Cuvinte cheie pentru filtrul Delta Dunării — extinde la nevoie
export const KEYWORDS_DELTA = [
  "delta", "dunăr", "dunare", "sulina", "chilia", "sf. gheorghe", "sfantu gheorghe", "sfântu gheorghe",
  "mila 23", "mila23", "braț", "brat sulina", "brat chilia",
  "crișan", "crisan", "maliuc", "murighiol", "borcea", "periboina",
  "saon", "obretin", "fortuna", "isaccea", "tulcea", "ceatalchioi",
  "ucenicul", "rosca", "roșca", "matița", "matita", "tatanir", "puiu",
  "lopatna", "bogdaproste",
];

export function esteRelevantDelta(titlu: string, descriere?: string): boolean {
  const text = `${titlu} ${descriere ?? ""}`.toLowerCase();
  return KEYWORDS_DELTA.some(kw => text.includes(kw));
}
