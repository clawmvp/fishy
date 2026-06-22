import Link from "next/link";
import { notFound } from "next/navigation";
import { getUserProfile, displayName } from "@/lib/profile";
import { sql } from "@/lib/db";
import { getStats } from "@/lib/catches";

export const dynamic = "force-dynamic";

const SPECIE_LABEL: Record<string, string> = { crap: "Crap", somn: "Somn", stiuca: "Știucă", salau: "Șalău", biban: "Biban", avat: "Avat", caras: "Caras" };

export default async function PublicProfile({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  const profile = await getUserProfile(id);
  if (!profile || !profile.profile_public) notFound();

  const stats = await getStats(profile.id);
  const publice = await sql`
    SELECT id, specie, weight_kg, length_cm, locatie_slug, locatie_text, caught_at, nada, tehnica, photos, released
    FROM fishy_beacon.catches
    WHERE user_id = ${profile.id} AND public = TRUE
    ORDER BY caught_at DESC
    LIMIT 50
  `;

  return (
    <div>
      <Link href="/feed" className="text-sm text-moss hover:text-amber-glow">← feed</Link>

      <header className="mt-4 mb-6 flex items-baseline gap-4 flex-wrap">
        {profile.avatar_url && (
          <img src={profile.avatar_url} alt="" className="w-16 h-16 rounded-full border border-amber-glow/30" />
        )}
        <div>
          <p className="text-xs uppercase tracking-[0.3em] text-moss mb-1">profil public</p>
          <h1 className="text-3xl md:text-4xl font-display text-amber-glow">{profile.display_name}</h1>
          {profile.location && <p className="text-sm text-fog/65 mt-1">📍 {profile.location}</p>}
          {profile.bio && <p className="text-fog/85 mt-2 max-w-2xl leading-relaxed">{profile.bio}</p>}
        </div>
      </header>

      <section className="grid grid-cols-2 md:grid-cols-4 gap-3 mb-8">
        <Stat label="Capturi totale" v={String(stats.total)} />
        <Stat label="Kg totali" v={String(stats.totalKg)} />
        <Stat label="Cel mai mare" v={stats.bigest ? `${stats.bigest.weight_kg}kg` : "—"} />
        <Stat label="Specii prinse" v={String(Object.keys(stats.perSpecie).length)} />
      </section>

      {publice.length === 0 ? (
        <div className="card rounded-xl p-8 text-center">
          <p className="text-fog/70">Nicio captură publică încă.</p>
        </div>
      ) : (
        <section>
          <h2 className="text-xl font-display text-amber-glow mb-3">Capturi publice ({publice.length})</h2>
          <div className="grid sm:grid-cols-2 gap-3">
            {publice.map((c) => {
              const photos = (c.photos as string[]) ?? [];
              return (
                <article key={c.id} className="card rounded-lg p-4">
                  {photos[0] && <img src={photos[0]} alt="" className="w-full h-40 object-cover rounded-md mb-3" />}
                  <p className="text-sm font-display text-amber-glow">{SPECIE_LABEL[c.specie] ?? c.specie} {c.weight_kg && <span className="text-fog">{c.weight_kg}kg</span>}</p>
                  <p className="text-xs text-fog/55 mt-1">{new Date(c.caught_at).toLocaleDateString("ro-RO", { day: "numeric", month: "long", year: "numeric" })} {c.locatie_text && ` · ${c.locatie_text}`}</p>
                </article>
              );
            })}
          </div>
        </section>
      )}
    </div>
  );
}

function Stat({ label, v }: { label: string; v: string }) {
  return (
    <div className="card rounded-xl p-3">
      <p className="text-xs uppercase tracking-widest text-moss">{label}</p>
      <p className="text-2xl font-light text-amber-glow mt-1">{v}</p>
    </div>
  );
}
