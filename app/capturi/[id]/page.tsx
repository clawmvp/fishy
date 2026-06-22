import Link from "next/link";
import { notFound, redirect } from "next/navigation";
import { getSession } from "@/lib/auth";
import { getCatch } from "@/lib/catches";
import DeleteButton from "@/components/DeleteCatchButton";

export const dynamic = "force-dynamic";

const SPECIE_LABEL: Record<string, string> = {
  crap: "Crap", somn: "Somn", stiuca: "Știucă", salau: "Șalău", biban: "Biban", avat: "Avat", caras: "Caras",
};

export default async function CatchDetailPage({ params }: { params: Promise<{ id: string }> }) {
  const user = await getSession();
  if (!user) redirect("/login");

  const { id: idStr } = await params;
  const id = parseInt(idStr, 10);
  const c = await getCatch(user.id, id);
  if (!c) notFound();

  return (
    <article className="max-w-2xl">
      <Link href="/capturi" className="text-sm text-moss hover:text-amber-glow">← toate capturile</Link>

      <header className="mt-4 mb-6">
        <p className="text-xs uppercase tracking-[0.3em] text-moss mb-2">captură</p>
        <h1 className="text-3xl md:text-4xl font-display text-amber-glow mb-2">
          {SPECIE_LABEL[c.specie] ?? c.specie}
          {c.weight_kg != null && <span className="text-fog/85 ml-3">{c.weight_kg} kg</span>}
        </h1>
        <p className="text-sm text-fog/55">
          {new Date(c.caught_at).toLocaleDateString("ro-RO", { weekday: "long", day: "numeric", month: "long", year: "numeric" })}
        </p>
      </header>

      <div className="card rounded-xl p-5 mb-6 space-y-3">
        {c.length_cm != null && <Row label="Lungime" value={`${c.length_cm} cm`} />}
        {(c.locatie_text || c.locatie_slug) && (
          <Row label="📍 Loc" value={c.locatie_text ?? c.locatie_slug ?? ""} link={c.locatie_slug ? `/locuri/${c.locatie_slug}` : undefined} />
        )}
        {c.nada && <Row label="🪱 Nadă" value={c.nada} />}
        {c.tehnica && <Row label="🎣 Tehnică" value={c.tehnica} />}
        <Row label="Status" value={c.released ? "↩ eliberat" : "🐟 păstrat"} />
        {c.note && (
          <div>
            <p className="text-xs uppercase tracking-widest text-moss mb-1">Note</p>
            <p className="text-fog/85 leading-relaxed whitespace-pre-wrap">{c.note}</p>
          </div>
        )}
      </div>

      <DeleteButton id={c.id} />
    </article>
  );
}

function Row({ label, value, link }: { label: string; value: string; link?: string }) {
  return (
    <div>
      <p className="text-xs uppercase tracking-widest text-moss mb-0.5">{label}</p>
      {link ? <Link href={link} className="text-fog hover:text-amber-glow">{value}</Link> : <p className="text-fog">{value}</p>}
    </div>
  );
}
