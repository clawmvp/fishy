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

export default function NewCatchForm({ locuri }: { locuri: Array<{ slug: string; nume: string }> }) {
  const router = useRouter();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const today = new Date().toISOString().slice(0, 10);

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
    };
    try {
      const resp = await fetch("/api/catches", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });
      const data = await resp.json();
      if (!data.ok) {
        setError(data.error ?? "Eroare");
        setLoading(false);
        return;
      }
      router.push("/capturi");
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
          <label className="block text-xs uppercase tracking-widest text-moss mb-1">Specie *</label>
          <select name="specie" required defaultValue="crap" className="w-full px-3 py-2 bg-water-2/40 border border-amber-glow/20 rounded-md text-fog focus:outline-none focus:border-amber-glow/50">
            {SPECII.map((s) => <option key={s.val} value={s.val}>{s.label}</option>)}
          </select>
        </div>
        <div>
          <label className="block text-xs uppercase tracking-widest text-moss mb-1">Data *</label>
          <input type="date" name="caught_at" required defaultValue={today} className="w-full px-3 py-2 bg-water-2/40 border border-amber-glow/20 rounded-md text-fog focus:outline-none focus:border-amber-glow/50" />
        </div>
      </div>

      <div className="grid sm:grid-cols-2 gap-3">
        <div>
          <label className="block text-xs uppercase tracking-widest text-moss mb-1">Greutate (kg)</label>
          <input type="number" step="0.1" name="weight_kg" placeholder="5.5" className="w-full px-3 py-2 bg-water-2/40 border border-amber-glow/20 rounded-md text-fog placeholder:text-fog/40 focus:outline-none focus:border-amber-glow/50" />
        </div>
        <div>
          <label className="block text-xs uppercase tracking-widest text-moss mb-1">Lungime (cm)</label>
          <input type="number" name="length_cm" placeholder="72" className="w-full px-3 py-2 bg-water-2/40 border border-amber-glow/20 rounded-md text-fog placeholder:text-fog/40 focus:outline-none focus:border-amber-glow/50" />
        </div>
      </div>

      <div>
        <label className="block text-xs uppercase tracking-widest text-moss mb-1">Loc cunoscut</label>
        <select name="locatie_slug" defaultValue="" className="w-full px-3 py-2 bg-water-2/40 border border-amber-glow/20 rounded-md text-fog focus:outline-none focus:border-amber-glow/50">
          <option value="">— Alege sau lasă gol —</option>
          {locuri.map((l) => <option key={l.slug} value={l.slug}>{l.nume}</option>)}
        </select>
      </div>

      <div>
        <label className="block text-xs uppercase tracking-widest text-moss mb-1">Sau text liber</label>
        <input type="text" name="locatie_text" placeholder="ex: Brațul Sulina, mila 12, cot stâng" className="w-full px-3 py-2 bg-water-2/40 border border-amber-glow/20 rounded-md text-fog placeholder:text-fog/40 focus:outline-none focus:border-amber-glow/50" />
      </div>

      <div className="grid sm:grid-cols-2 gap-3">
        <div>
          <label className="block text-xs uppercase tracking-widest text-moss mb-1">Nadă/momeală</label>
          <input type="text" name="nada" placeholder="ex: boilies tigernut 20mm" className="w-full px-3 py-2 bg-water-2/40 border border-amber-glow/20 rounded-md text-fog placeholder:text-fog/40 focus:outline-none focus:border-amber-glow/50" />
        </div>
        <div>
          <label className="block text-xs uppercase tracking-widest text-moss mb-1">Tehnică</label>
          <input type="text" name="tehnica" placeholder="ex: method feeder" className="w-full px-3 py-2 bg-water-2/40 border border-amber-glow/20 rounded-md text-fog placeholder:text-fog/40 focus:outline-none focus:border-amber-glow/50" />
        </div>
      </div>

      <div>
        <label className="block text-xs uppercase tracking-widest text-moss mb-1">Note (vremea, cota, observații)</label>
        <textarea name="note" rows={3} placeholder="ex: cota 95cm, vânt 12km/h N, cap-uri rare dar mari" className="w-full px-3 py-2 bg-water-2/40 border border-amber-glow/20 rounded-md text-fog placeholder:text-fog/40 focus:outline-none focus:border-amber-glow/50 resize-y"></textarea>
      </div>

      <label className="flex items-center gap-2 text-sm text-fog/85 cursor-pointer">
        <input type="checkbox" name="released" defaultChecked className="accent-amber-glow w-4 h-4" />
        Eliberat (catch &amp; release)
      </label>

      {error && <p className="text-sm text-red-400">{error}</p>}

      <div className="flex gap-2 pt-2">
        <button type="submit" disabled={loading} className="flex-1 py-2.5 rounded-md bg-amber-glow/15 hover:bg-amber-glow/25 border border-amber-glow/40 text-amber-glow font-medium transition-colors">
          {loading ? "Se salvează..." : "✓ Salvează captura"}
        </button>
        <a href="/capturi" className="py-2.5 px-4 rounded-md border border-amber-glow/15 text-fog/55 hover:text-fog hover:border-amber-glow/30 transition-colors">
          Anulează
        </a>
      </div>
    </form>
  );
}
