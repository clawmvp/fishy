export type BeaconSignal = {
  id: number;
  video_id: string;
  video_url: string;
  channel: string;
  title: string;
  upload_date: string | null; // ISO date
  duration_sec: number | null;
  is_short: boolean;
  locatie: string | null;
  specii: string[] | null;
  nada: string | null;
  tehnica: string | null;
  stare_apa: string | null;
  vant_vreme: string | null;
  rezumat: string | null;
  semnale_concrete: Record<string, unknown> | null;
  scanned_at: string;
  relevant_score: number;
};

export type ExtractedSignal = {
  locatie: string | null;
  specii: string[];
  nada: string | null;
  tehnica: string | null;
  stare_apa: string | null;
  vant_vreme: string | null;
  rezumat: string;
  relevant_score: number; // 0-100, cât de informativ e
};
