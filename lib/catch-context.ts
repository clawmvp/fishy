import { sql } from "./db";

export type CatchContext = {
  cota_tulcea: number | null;
  cota_variation: number | null;
  cota_label: string;
  pattern_hint: string | null;
};

const monthNames = ["ianuarie","februarie","martie","aprilie","mai","iunie","iulie","august","septembrie","octombrie","noiembrie","decembrie"];

// Returnează contextul (cota, pattern probabil) pentru fiecare captură pe baza datei
export async function getCatchContextsForDates(dates: Date[]): Promise<Map<string, CatchContext>> {
  if (dates.length === 0) return new Map();
  const minDate = new Date(Math.min(...dates.map((d) => d.getTime())));
  const maxDate = new Date(Math.max(...dates.map((d) => d.getTime())));
  // extindem cu ±3 zile pentru a captura cele mai apropiate snapshot-uri
  const from = new Date(minDate.getTime() - 3 * 24 * 60 * 60 * 1000);
  const to = new Date(maxDate.getTime() + 3 * 24 * 60 * 60 * 1000);

  const snapshots = await sql`
    SELECT level_cm, variation_cm, measured_at
    FROM fishy_beacon.cota_snapshots
    WHERE station_slug = 'tulcea'
      AND measured_at >= ${from.toISOString()}
      AND measured_at <= ${to.toISOString()}
    ORDER BY measured_at ASC
  `;
  const snapList = snapshots as Array<{ level_cm: number; variation_cm: number | null; measured_at: string }>;

  const map = new Map<string, CatchContext>();
  for (const d of dates) {
    const key = d.toISOString().slice(0, 10);
    if (map.has(key)) continue;
    // Find closest snapshot
    let closest: (typeof snapList)[number] | null = null;
    let minDiff = Infinity;
    for (const s of snapList) {
      const diff = Math.abs(new Date(s.measured_at).getTime() - d.getTime());
      if (diff < minDiff) { minDiff = diff; closest = s; }
    }
    const cota = closest ? closest.level_cm : null;
    const variation = closest ? closest.variation_cm : null;
    let cota_label = "cotă necunoscută";
    if (cota != null) {
      if (cota < 100) cota_label = `cotă scăzută (${cota}cm)`;
      else if (cota < 150) cota_label = `cotă moderată (${cota}cm)`;
      else if (cota < 200) cota_label = `cotă optimă (${cota}cm)`;
      else cota_label = `cotă ridicată (${cota}cm)`;
    }

    const month = d.getMonth() + 1;
    const day = d.getDate();
    let pattern_hint: string | null = null;
    if (month === 6 && day >= 8 && day <= 25) pattern_hint = "💪 Era begului";
    else if (month >= 3 && month <= 5) pattern_hint = "🌸 Săptămâna magică posibilă";
    else if (month === 11) pattern_hint = "🍂 Bate norocul (cotă în creștere ideală)";
    else if (month === 10) pattern_hint = "🍂 Bibanul de toamnă";
    else if ((month === 2 || month === 3)) pattern_hint = "🌸 Bătaia știucii";
    else if (month >= 7 && month <= 8) pattern_hint = "🌞 Caniculă/Frenezia grâului";

    map.set(key, { cota_tulcea: cota, cota_variation: variation, cota_label, pattern_hint });
  }
  return map;
}

export function formatDateLabel(d: Date, now: Date = new Date()): string {
  const today = new Date(now.getFullYear(), now.getMonth(), now.getDate());
  const target = new Date(d.getFullYear(), d.getMonth(), d.getDate());
  const diffDays = Math.floor((today.getTime() - target.getTime()) / (24 * 60 * 60 * 1000));
  if (diffDays === 0) return "Azi";
  if (diffDays === 1) return "Ieri";
  if (diffDays < 7) return "Săptămâna asta";
  if (diffDays < 14) return "Săptămâna trecută";
  if (diffDays < 30) return "Luna asta";
  if (target.getFullYear() === now.getFullYear()) return `${d.getDate()} ${monthNames[d.getMonth()]}`;
  return `${monthNames[d.getMonth()]} ${d.getFullYear()}`;
}
