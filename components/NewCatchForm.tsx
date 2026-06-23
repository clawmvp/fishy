"use client";

import { useRouter } from "next/navigation";
import { useEffect, useRef, useState } from "react";

const SPECII = [
  { val: "crap", label: "Crap" },
  { val: "somn", label: "Somn" },
  { val: "stiuca", label: "Știucă" },
  { val: "salau", label: "Șalău" },
  { val: "biban", label: "Biban" },
  { val: "avat", label: "Avat" },
  { val: "caras", label: "Caras" },
];

type Conditions = {
  date: string;
  cota: { tulcea: number | null; isaccea: number | null; variation: number | null } | null;
  weather: { tempMax: number | null; tempMin: number | null; windMax: number | null; windDirection: number | null; pressure: number | null; precipitation: number | null; waterTemp: number | null } | null;
  moon: { illumination: number; phase: string } | null;
  patternsHint: string[];
};

function windDir(deg: number | null): string {
  if (deg == null) return "";
  const dirs = ["N","NE","E","SE","S","SV","V","NV"];
  return dirs[Math.round(deg / 45) % 8];
}

export default function NewCatchForm({ locuri }: { locuri: Array<{ slug: string; nume: string }> }) {
  const router = useRouter();
  const [loading, setLoading] = useState(false);
  const [uploading, setUploading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [coords, setCoords] = useState<{ lat: number; lng: number } | null>(null);
  const [photos, setPhotos] = useState<string[]>([]);
  const [isPublic, setIsPublic] = useState(false);
  const [hideExact, setHideExact] = useState(true);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const today = new Date().toISOString().slice(0, 10);
  const [selectedDate, setSelectedDate] = useState(today);
  const [conditions, setConditions] = useState<Conditions | null>(null);
  const [loadingCtx, setLoadingCtx] = useState(false);
  const [saveContext, setSaveContext] = useState(true);

  // Auto-fetch context when date changes
  useEffect(() => {
    if (!selectedDate || !/^\d{4}-\d{2}-\d{2}$/.test(selectedDate)) return;
    setLoadingCtx(true);
    setConditions(null);
    fetch(`/api/catch-context?date=${selectedDate}`)
      .then((r) => r.json())
      .then((data) => { if (!data.error) setConditions(data); })
      .catch(() => { /* swallow */ })
      .finally(() => setLoadingCtx(false));
  }, [selectedDate]);

  async function getGPS() {
    if (!navigator.geolocation) {
      setError("Browserul tău nu suportă geolocation");
      return;
    }
    navigator.geolocation.getCurrentPosition(
      (pos) => setCoords({ lat: pos.coords.latitude, lng: pos.coords.longitude }),
      (err) => setError(`GPS: ${err.message}`),
      { enableHighAccuracy: true, timeout: 10000 }
    );
  }

  async function handlePhotoUpload(e: React.ChangeEvent<HTMLInputElement>) {
    const files = e.target.files;
    if (!files || files.length === 0) return;
    if (photos.length + files.length > 3) {
      setError("Max 3 poze per captură");
      return;
    }
    setUploading(true);
    setError(null);
    const newPhotos: string[] = [];
    for (const file of Array.from(files)) {
      if (!file.type.startsWith("image/")) continue;
      if (file.size > 8 * 1024 * 1024) {
        setError(`${file.name} e prea mare (max 8MB)`);
        continue;
      }
      try {
        const formData = new FormData();
        formData.append("file", file);
        const resp = await fetch("/api/upload", { method: "POST", body: formData });
        const data = await resp.json();
        if (data.url) newPhotos.push(data.url);
        else setError(data.error ?? "Eroare upload");
      } catch (e) {
        setError(`Upload: ${(e as Error).message}`);
      }
    }
    setPhotos([...photos, ...newPhotos]);
    setUploading(false);
    if (fileInputRef.current) fileInputRef.current.value = "";
  }

  function removePhoto(idx: number) {
    setPhotos(photos.filter((_, i) => i !== idx));
  }

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
      lat: coords?.lat ?? null,
      lng: coords?.lng ?? null,
      caught_at: fd.get("caught_at") as string,
      nada: (fd.get("nada") as string)?.trim() || null,
      tehnica: (fd.get("tehnica") as string)?.trim() || null,
      note: (fd.get("note") as string)?.trim() || null,
      released: fd.get("released") === "on",
      public: isPublic,
      hide_exact_location: hideExact,
      photos,
      conditions_snapshot: saveContext && conditions ? conditions : null,
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
          <input
            type="date"
            name="caught_at"
            required
            value={selectedDate}
            onChange={(e) => setSelectedDate(e.target.value)}
            className="w-full px-3 py-2 bg-water-2/40 border border-amber-glow/20 rounded-md text-fog focus:outline-none focus:border-amber-glow/50"
          />
        </div>
      </div>

      {/* Auto-detected conditions */}
      {(loadingCtx || conditions) && (
        <div className="card rounded-lg p-3" style={{ background: "linear-gradient(135deg, rgba(168,200,122,0.06), rgba(212,166,87,0.03))", borderColor: "rgba(168,200,122,0.20)" }}>
          {loadingCtx ? (
            <p className="text-xs text-fog/65">⏳ Detectează condițiile la {selectedDate}...</p>
          ) : conditions ? (
            <>
              <div className="flex items-baseline justify-between mb-2">
                <p className="text-xs uppercase tracking-widest text-moss">📊 Condiții detectate</p>
                <label className="flex items-center gap-1.5 text-xs text-fog/75 cursor-pointer">
                  <input type="checkbox" checked={saveContext} onChange={(e) => setSaveContext(e.target.checked)} className="accent-amber-glow w-3.5 h-3.5" />
                  salvează cu captura
                </label>
              </div>
              <div className="flex flex-wrap gap-x-3 gap-y-1 text-xs text-fog/85">
                {conditions.cota?.tulcea != null && (
                  <span>💧 Tulcea <strong className="text-amber-glow">{conditions.cota.tulcea}cm</strong>{conditions.cota.variation != null && <span className="text-fog/55"> ({conditions.cota.variation > 0 ? "+" : ""}{conditions.cota.variation}/zi)</span>}</span>
                )}
                {conditions.cota?.isaccea != null && (
                  <span>Isaccea <strong className="text-fog">{conditions.cota.isaccea}cm</strong></span>
                )}
                {conditions.weather?.waterTemp != null && (
                  <span>🌡️ Apa <strong className="text-amber-glow">{Math.round(conditions.weather.waterTemp)}°C</strong></span>
                )}
                {conditions.weather?.tempMax != null && conditions.weather?.tempMin != null && (
                  <span>🌤️ {conditions.weather.tempMax}°/{conditions.weather.tempMin}°</span>
                )}
                {conditions.weather?.windMax != null && (
                  <span>💨 {conditions.weather.windMax}km/h {windDir(conditions.weather.windDirection)}</span>
                )}
                {conditions.weather?.pressure != null && (
                  <span>{Math.round(conditions.weather.pressure)}hPa</span>
                )}
                {conditions.moon && (
                  <span>🌙 {conditions.moon.illumination}% {conditions.moon.phase}</span>
                )}
              </div>
              {conditions.patternsHint.length > 0 && (
                <p className="text-xs text-amber-glow mt-2"><strong className="text-fog/55">Patterns posibile:</strong> {conditions.patternsHint.join(" · ")}</p>
              )}
              {!conditions.cota?.tulcea && !conditions.weather?.tempMax && (
                <p className="text-xs text-fog/55 italic">Pentru date foarte vechi (înainte de iunie 2026) avem doar luna calculată. Cota și vremea istorice nu sunt cached.</p>
              )}
            </>
          ) : null}
        </div>
      )}

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

      {/* GPS */}
      <div>
        <label className="block text-xs uppercase tracking-widest text-moss mb-1">Coordonate GPS</label>
        <div className="flex items-center gap-2">
          <button type="button" onClick={getGPS} className="text-sm px-3 py-2 rounded-md border border-amber-glow/30 hover:border-amber-glow/60 text-amber-glow transition-colors">
            📍 Ia locația mea acum
          </button>
          {coords && (
            <span className="text-xs text-fog/70 font-mono">
              {coords.lat.toFixed(5)}, {coords.lng.toFixed(5)}
            </span>
          )}
        </div>
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

      {/* Photos */}
      <div>
        <label className="block text-xs uppercase tracking-widest text-moss mb-2">Poze ({photos.length}/3)</label>
        {photos.length < 3 && (
          <input
            ref={fileInputRef}
            type="file"
            accept="image/*"
            multiple
            onChange={handlePhotoUpload}
            disabled={uploading}
            className="block text-sm text-fog/80 file:mr-3 file:py-2 file:px-3 file:rounded-md file:border-0 file:text-sm file:bg-amber-glow/15 file:text-amber-glow file:hover:bg-amber-glow/25 file:cursor-pointer"
          />
        )}
        {uploading && <p className="text-xs text-fog/55 mt-1">Se încarcă...</p>}
        {photos.length > 0 && (
          <div className="flex gap-2 mt-3 flex-wrap">
            {photos.map((url, i) => (
              <div key={i} className="relative">
                <img src={url} alt={`Captură ${i + 1}`} className="h-20 w-20 object-cover rounded-md border border-amber-glow/30" />
                <button type="button" onClick={() => removePhoto(i)} className="absolute -top-1 -right-1 w-5 h-5 rounded-full bg-red-500 text-white text-xs flex items-center justify-center">×</button>
              </div>
            ))}
          </div>
        )}
      </div>

      <label className="flex items-center gap-2 text-sm text-fog/85 cursor-pointer">
        <input type="checkbox" name="released" defaultChecked className="accent-amber-glow w-4 h-4" />
        Eliberat (catch &amp; release)
      </label>

      <div className="pt-3 border-t border-amber-glow/15 space-y-2">
        <label className="flex items-center gap-2 text-sm text-fog/85 cursor-pointer">
          <input
            type="checkbox"
            checked={isPublic}
            onChange={(e) => setIsPublic(e.target.checked)}
            className="accent-amber-glow w-4 h-4"
          />
          📡 <strong className="text-amber-glow">Share pe feed public</strong> (vor vedea toți pescarii)
        </label>
        {isPublic && (
          <label className="flex items-center gap-2 text-xs text-fog/70 cursor-pointer ml-6">
            <input
              type="checkbox"
              checked={hideExact}
              onChange={(e) => setHideExact(e.target.checked)}
              className="accent-amber-glow w-3.5 h-3.5"
            />
            🌫️ Ascunde locația exactă (afișează doar regiunea — recomandat)
          </label>
        )}
      </div>

      {error && <p className="text-sm text-red-400">{error}</p>}

      <div className="flex gap-2 pt-2">
        <button type="submit" disabled={loading || uploading} className="flex-1 py-2.5 rounded-md bg-amber-glow/15 hover:bg-amber-glow/25 border border-amber-glow/40 text-amber-glow font-medium transition-colors">
          {loading ? "Se salvează..." : "✓ Salvează captura"}
        </button>
        <a href="/capturi" className="py-2.5 px-4 rounded-md border border-amber-glow/15 text-fog/55 hover:text-fog hover:border-amber-glow/30 transition-colors">
          Anulează
        </a>
      </div>
    </form>
  );
}
