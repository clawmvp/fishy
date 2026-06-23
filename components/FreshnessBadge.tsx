// Afișează vechimea unei măsurători. Dacă datele sunt prea vechi (scraping picat
// silențios — ex. hidro.ro schimbă pagina), arată un avertisment vizibil.
export default function FreshnessBadge({ date }: { date?: string | null }) {
  if (!date) return null;
  const measured = new Date(`${date}T00:00:00`);
  if (isNaN(measured.getTime())) return null;

  const ageDays = Math.floor((Date.now() - measured.getTime()) / 86400000);

  if (ageDays <= 1) {
    return <p className="text-[10px] text-fog/40 mt-1">măsurat {date}</p>;
  }
  return (
    <p className="text-[10px] text-orange-400/90 mt-1">
      ⚠ date vechi ({ageDays} zile) — {date}
    </p>
  );
}
