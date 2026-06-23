import { NextResponse } from "next/server";
import { getWaterLevel } from "@/lib/conditii-live";
import { getCotaHistory } from "@/lib/cota-history";

export const dynamic = "force-dynamic";

// Health check pentru sursele de date fragile (scraping + DB + API extern).
// GET /api/health → 200 "ok" / 503 "degraded". De monitorizat extern (uptime ping).
export async function GET() {
  const checks: Record<string, { ok: boolean; [k: string]: unknown }> = {};

  // 1. hidro.ro scraping (cel mai fragil — regex pe HTML)
  try {
    const tulcea = await getWaterLevel("tulcea");
    checks.hidro_tulcea = tulcea
      ? { ok: true, level: tulcea.level, date: tulcea.date }
      : { ok: false, note: "parse failed / station missing" };
  } catch (e) {
    checks.hidro_tulcea = { ok: false, error: String(e) };
  }

  // 2. Open-Meteo (vreme)
  try {
    const r = await fetch(
      "https://api.open-meteo.com/v1/forecast?latitude=45.21&longitude=29.13&daily=temperature_2m_max&forecast_days=1&timezone=auto",
      { cache: "no-store" }
    );
    checks.open_meteo = { ok: r.ok, status: r.status };
  } catch (e) {
    checks.open_meteo = { ok: false, error: String(e) };
  }

  // 3. DB — prospețimea snapshot-urilor de cotă (cron-ul rulează zilnic)
  try {
    const hist = await getCotaHistory("tulcea", 3);
    const latest = hist[hist.length - 1];
    if (latest) {
      const ageH = Math.round(
        (Date.now() - new Date(latest.measured_at).getTime()) / 3600000
      );
      checks.db_cota = { ok: ageH < 48, latest: latest.measured_at, age_hours: ageH };
    } else {
      checks.db_cota = { ok: false, note: "no snapshots in last 3 days" };
    }
  } catch (e) {
    checks.db_cota = { ok: false, error: String(e) };
  }

  const allOk = Object.values(checks).every((c) => c.ok);
  return NextResponse.json(
    { status: allOk ? "ok" : "degraded", checkedAt: new Date().toISOString(), checks },
    { status: allOk ? 200 : 503 }
  );
}
