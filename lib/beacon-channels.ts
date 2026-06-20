// Canale YouTube monitorizate de Beacon — pescuit Delta Dunării

export type Canal = {
  slug: string;       // identificator scurt
  handle: string;     // @handle YouTube fără @
  nume: string;       // nume afișat
  focus: string;      // ce face
};

export const CANALE: Canal[] = [
  { slug: "marele-pescar", handle: "MarelePescar", nume: "Marele Pescar", focus: "crap, spinning, multi-day" },
  { slug: "gda-fishing", handle: "GDAFishing", nume: "GDA Fishing", focus: "crap Delta, brațe principale" },
  { slug: "baltacul", handle: "Baltacul", nume: "Baltacul", focus: "spinning, somn clonc" },
  { slug: "gigant-fish", handle: "GigantFishTeam", nume: "Gigant Fish Team", focus: "crap, carnasiere" },
  { slug: "dpd", handle: "DPDelta", nume: "DPD", focus: "feeder, plută" },
  { slug: "pcs", handle: "PCSdelta", nume: "PCS", focus: "Delta clasic" },
  { slug: "moga", handle: "MihaiMoga", nume: "Moga Mihai", focus: "tehnici Delta" },
  { slug: "claumar", handle: "ClaudiuPopaClaumarPescar", nume: "Claudiu Popa (Claumar)", focus: "Delta dintre sate, crap" },
  { slug: "totalfishing", handle: "LapescuitcuTotalFishing", nume: "Total Fishing", focus: "Dunăre, somn primăvară" },
  { slug: "visoianu", handle: "VladVisoianu", nume: "Vlad Vișoianu", focus: "școala săptămânii magice" },
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
