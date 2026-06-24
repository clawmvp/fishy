"use client";

import { useRouter } from "next/navigation";
import { useState } from "react";

const SPECII = [
  { val: "crap", label: "Crap" },
  { val: "somn", label: "Somn" },
  { val: "stiuca", label: "Știucă" },
  { val: "salau", label: "Șalău" },
  { val: "biban", label: "Biban" },
  { val: "avat", label: "Avat" },
  { val: "caras", label: "Caras" },
];

type CatchData = {
  id: number;
  specie: string;
  weight_kg: number | null;
  length_cm: number | null;
  locatie_slug: string | null;
  locatie_text: string | null;
  caught_at: string;
  nada: string | null;
  tehnica: string | null;
  note: string | null;
  released: boolean;
  public: boolean;
  hide_exact_location: boolean;
};

const inp =
  "w-full px-3 py-2 bg-water-2/40 border border-amber-glow/20 rounded-md text-fog placeholder:text-fog/40 focus:outline-none focus:border-amber-glow/50";
const lbl = "block text-xs uppercase tracking-widest text-moss mb-1";

export default function EditCatchForm({
  c,
  locuri,
}: {
  c: CatchData;
  locuri: Array<{ slug: string; nume: string }>;
}) {
  const router = useRouter();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [isPublic, setIsPublic] = useState(c.public);
  const [hideExact, setHideExact] = useState(c.hide_exact_location);

  async function submit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setLoading(true);
    setError(null);
    const fd = new FormData(e.currentTarget);
    const payload = {
      specie: fd.get("specie") as string,
      weight_kg: fd.get("weight_kg") ? parseFloat(fd.get("weight_kg") as string) : null,
      length_cm: fd.get("length_cm") ? parseInt(fd.get("length_cm") as string, 10) : null,
      locatie_slug: (fd.get("locatie_slug") as string) || null,
      locatie_text: (fd.get("locatie_text") as string)?.trim() || null,
      caught_at: fd.get("caught_at") as string,
      nada: (fd.get("nada") as string)?.trim() || null,
      tehnica: (fd.get("tehnica") as string)?.trim() || null,
      note: (fd.get("note") as string)?.trim() || null,
      released: fd.get("released") === "on",
      public: isPublic,
      hide_exact_location: hideExact,
    };
    try {
      const resp = await fetch(`/api/catches/${c.id}`, {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });
      const data = await resp.json();
      if (!data.ok) {
        setError(data.error ?? "Eroare");
        setLoading(false);
        return;
      }
      router.push(`/capturi/${c.id}`);
      router.refresh();
    } catch {
      setError("Eroare de rețea");
      setLoading(false);
    }
  }

  return (
    <form onSubmit={submit} className="card rounded-xl p-5 space-y-4">
      <div className="grid sm:grid-cols-2 gap-3">
        <div>
          <label className={lbl}>Specie *</label>
          <select name="specie" required defaultValue={c.specie} className={inp}>
            {SPECII.map((s) => (
              <option key={s.val} value={s.val}>{s.label}</option>
            ))}
          </select>
        </div>
        <div>
          <label className={lbl}>Data *</label>
          <input type="date" name="caught_at" required defaultValue={c.caught_at.slice(0, 10)} className={inp} />
        </div>
      </div>

      <div className="grid sm:grid-cols-2 gap-3">
        <div>
          <label className={lbl}>Greutate (kg)</label>
          <input type="number" step="0.1" name="weight_kg" defaultValue={c.weight_kg ?? ""} className={inp} />
        </div>
        <div>
          <label className={lbl}>Lungime (cm)</label>
          <input type="number" name="length_cm" defaultValue={c.length_cm ?? ""} className={inp} />
        </div>
      </div>

      <div>
        <label className={lbl}>Loc cunoscut</label>
        <select name="locatie_slug" defaultValue={c.locatie_slug ?? ""} className={inp}>
          <option value="">— Alege sau lasă gol —</option>
          {locuri.map((l) => (
            <option key={l.slug} value={l.slug}>{l.nume}</option>
          ))}
        </select>
      </div>

      <div>
        <label className={lbl}>Sau text liber</label>
        <input type="text" name="locatie_text" defaultValue={c.locatie_text ?? ""} className={inp} />
      </div>

      <div className="grid sm:grid-cols-2 gap-3">
        <div>
          <label className={lbl}>Nadă/momeală</label>
          <input type="text" name="nada" defaultValue={c.nada ?? ""} className={inp} />
        </div>
        <div>
          <label className={lbl}>Tehnică</label>
          <input type="text" name="tehnica" defaultValue={c.tehnica ?? ""} className={inp} />
        </div>
      </div>

      <div>
        <label className={lbl}>Note</label>
        <textarea name="note" rows={3} defaultValue={c.note ?? ""} className={`${inp} resize-y`}></textarea>
      </div>

      <label className="flex items-center gap-2 text-sm text-fog/85 cursor-pointer">
        <input type="checkbox" name="released" defaultChecked={c.released} className="accent-amber-glow w-4 h-4" />
        Eliberat (catch &amp; release)
      </label>

      <div className="pt-3 border-t border-amber-glow/15 space-y-2">
        <label className="flex items-center gap-2 text-sm text-fog/85 cursor-pointer">
          <input type="checkbox" checked={isPublic} onChange={(e) => setIsPublic(e.target.checked)} className="accent-amber-glow w-4 h-4" />
          📡 <strong className="text-amber-glow">Share pe feed public</strong>
        </label>
        {isPublic && (
          <label className="flex items-center gap-2 text-xs text-fog/70 cursor-pointer ml-6">
            <input type="checkbox" checked={hideExact} onChange={(e) => setHideExact(e.target.checked)} className="accent-amber-glow w-3.5 h-3.5" />
            🌫️ Ascunde locația exactă (recomandat)
          </label>
        )}
      </div>

      {error && <p className="text-sm text-red-400">{error}</p>}

      <div className="flex gap-2 pt-2">
        <button type="submit" disabled={loading} className="flex-1 py-2.5 rounded-md bg-amber-glow/15 hover:bg-amber-glow/25 border border-amber-glow/40 text-amber-glow font-medium transition-colors">
          {loading ? "Se salvează..." : "✓ Salvează modificările"}
        </button>
        <a href={`/capturi/${c.id}`} className="py-2.5 px-4 rounded-md border border-amber-glow/15 text-fog/55 hover:text-fog hover:border-amber-glow/30 transition-colors">
          Anulează
        </a>
      </div>
    </form>
  );
}
