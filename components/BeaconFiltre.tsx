"use client";

import { useMemo, useState, useEffect } from "react";
import type { BeaconSignal } from "@/lib/beacon-types";
import { CANALE } from "@/lib/beacon-channels";

const CANAL_LABEL: Record<string, string> = Object.fromEntries(
  CANALE.map((c) => [c.slug, c.nume])
);

function timeAgo(iso: string | null): string {
  if (!iso) return "?";
  const d = new Date(iso);
  const now = new Date();
  const days = Math.floor((now.getTime() - d.getTime()) / (1000 * 60 * 60 * 24));
  if (days <= 0) return "azi";
  if (days === 1) return "ieri";
  if (days < 7) return `acum ${days} zile`;
  if (days < 30) return `acum ${Math.floor(days / 7)} săpt`;
  return `acum ${Math.floor(days / 30)} luni`;
}

const PERIOADE: { val: string; label: string; zile: number | null }[] = [
  { val: "7", label: "ultima săpt", zile: 7 },
  { val: "30", label: "ultima lună", zile: 30 },
  { val: "90", label: "3 luni", zile: 90 },
  { val: "all", label: "tot", zile: null },
];

export function BeaconFiltre({
  semnale,
  initialSpecie,
}: {
  semnale: BeaconSignal[];
  initialSpecie?: string;
}) {
  const [q, setQ] = useState("");
  const [specie, setSpecie] = useState<string>(initialSpecie ?? "");
  const [canal, setCanal] = useState<string>("");
  const [perioada, setPerioada] = useState<string>("90");

  // Sync URL params on change (shareable)
  useEffect(() => {
    const params = new URLSearchParams();
    if (q) params.set("q", q);
    if (specie) params.set("specie", specie);
    if (canal) params.set("canal", canal);
    if (perioada !== "90") params.set("perioada", perioada);
    const next = params.toString();
    const url = next ? `?${next}` : window.location.pathname;
    window.history.replaceState({}, "", url);
  }, [q, specie, canal, perioada]);

  // Init from URL
  useEffect(() => {
    const sp = new URLSearchParams(window.location.search);
    const qParam = sp.get("q");
    const specieParam = sp.get("specie");
    const canalParam = sp.get("canal");
    const perioadaParam = sp.get("perioada");
    if (qParam) setQ(qParam);
    if (specieParam) setSpecie(specieParam);
    if (canalParam) setCanal(canalParam);
    if (perioadaParam) setPerioada(perioadaParam);
  }, []);

  // Compute disponibile
  const speciiDisp = useMemo(() => {
    const s = new Set<string>();
    semnale.forEach((sg) => sg.specii?.forEach((sp) => s.add(sp)));
    return [...s].sort();
  }, [semnale]);

  const canaleDisp = useMemo(() => {
    const c = new Set<string>();
    semnale.forEach((sg) => c.add(sg.channel));
    return [...c].sort();
  }, [semnale]);

  const filtrate = useMemo(() => {
    const ql = q.toLowerCase().trim();
    const periodaInfo = PERIOADE.find((p) => p.val === perioada);
    const cutoff = periodaInfo?.zile != null ? Date.now() - periodaInfo.zile * 24 * 60 * 60 * 1000 : null;

    return semnale.filter((s) => {
      if (specie && !(s.specii?.includes(specie))) return false;
      if (canal && s.channel !== canal) return false;
      if (cutoff && s.upload_date) {
        if (new Date(s.upload_date).getTime() < cutoff) return false;
      }
      if (ql) {
        const hay = `${s.title} ${s.locatie ?? ""} ${s.nada ?? ""} ${s.tehnica ?? ""} ${s.rezumat ?? ""} ${s.stare_apa ?? ""}`.toLowerCase();
        if (!hay.includes(ql)) return false;
      }
      return true;
    });
  }, [semnale, q, specie, canal, perioada]);

  const reset = () => { setQ(""); setSpecie(""); setCanal(""); setPerioada("90"); };
  const areFiltreActive = !!(q || specie || canal || perioada !== "90");

  return (
    <div>
      {/* FILTRE */}
      <div className="card rounded-xl p-4 mb-6">
        <input
          type="search"
          placeholder="Caută în titlu, locație, nadă, tehnică..."
          value={q}
          onChange={(e) => setQ(e.target.value)}
          className="w-full px-3 py-2.5 bg-water-2/40 border border-amber-glow/20 rounded-md text-sm text-fog placeholder:text-fog/40 focus:outline-none focus:border-amber-glow/50 mb-3"
        />

        <div className="space-y-3">
          <FiltrePastile label="Specii" valori={speciiDisp} curent={specie} setCurent={setSpecie} />
          <FiltrePastile
            label="Canale"
            valori={canaleDisp}
            curent={canal}
            setCurent={setCanal}
            renderLabel={(v) => CANAL_LABEL[v] ?? v}
          />
          <FiltrePastile
            label="Perioadă"
            valori={PERIOADE.map((p) => p.val)}
            curent={perioada}
            setCurent={setPerioada}
            renderLabel={(v) => PERIOADE.find((p) => p.val === v)?.label ?? v}
            permiteEmpty={false}
          />
        </div>

        {areFiltreActive && (
          <div className="flex items-center justify-between mt-3 pt-3 border-t border-amber-glow/15">
            <p className="text-xs text-fog/55">
              {filtrate.length} din {semnale.length} semnale
            </p>
            <button onClick={reset} className="text-xs text-amber-glow hover:text-amber-soft">
              șterge filtrele ✕
            </button>
          </div>
        )}
      </div>

      {/* FEED */}
      {filtrate.length === 0 ? (
        <div className="card rounded-xl p-8 text-center">
          <p className="text-fog/70 mb-2">Niciun semnal pentru aceste filtre.</p>
          {areFiltreActive && (
            <button onClick={reset} className="text-sm text-amber-glow hover:text-amber-soft">
              șterge filtrele
            </button>
          )}
        </div>
      ) : (
        <section className="space-y-3">
          {filtrate.map((s) => (
            <article key={s.id} className="card rounded-xl p-5">
              <div className="flex items-baseline justify-between gap-3 mb-2 flex-wrap">
                <div>
                  <p className="text-xs text-amber-glow uppercase tracking-widest">
                    {CANAL_LABEL[s.channel] ?? s.channel} · {timeAgo(s.upload_date)}
                    {s.is_short && <span className="ml-2 text-fog/40">SHORT</span>}
                  </p>
                  <h2 className="text-lg font-display text-fog mt-0.5">
                    <a href={s.video_url} target="_blank" rel="noopener noreferrer" className="hover:text-amber-glow">
                      {s.title}
                    </a>
                  </h2>
                </div>
                <span className="text-xs text-fog/40">{s.relevant_score}/100</span>
              </div>

              {s.rezumat && (
                <p className="text-sm text-fog/85 leading-relaxed mb-3">{s.rezumat}</p>
              )}

              <div className="grid sm:grid-cols-2 gap-2 mt-3">
                {s.locatie && <Detaliu eticheta="📍 Locație" valoare={s.locatie} />}
                {s.specii && s.specii.length > 0 && (
                  <Detaliu eticheta="🐟 Specii" valoare={s.specii.join(", ")} />
                )}
                {s.nada && <Detaliu eticheta="🪱 Nadă/momeală" valoare={s.nada} />}
                {s.tehnica && <Detaliu eticheta="🎣 Tehnică" valoare={s.tehnica} />}
                {s.stare_apa && <Detaliu eticheta="💧 Stare apă" valoare={s.stare_apa} />}
                {s.vant_vreme && <Detaliu eticheta="💨 Vânt/vreme" valoare={s.vant_vreme} />}
              </div>
            </article>
          ))}
        </section>
      )}
    </div>
  );
}

function FiltrePastile({
  label, valori, curent, setCurent, renderLabel, permiteEmpty = true,
}: {
  label: string;
  valori: string[];
  curent: string;
  setCurent: (v: string) => void;
  renderLabel?: (v: string) => string;
  permiteEmpty?: boolean;
}) {
  if (valori.length === 0) return null;
  return (
    <div>
      <p className="text-xs uppercase tracking-widest text-moss mb-1.5">{label}</p>
      <div className="flex flex-wrap gap-1.5">
        {permiteEmpty && (
          <button
            onClick={() => setCurent("")}
            className={`text-xs px-2.5 py-1 rounded-md border transition-all ${
              curent === ""
                ? "border-amber-glow/60 bg-amber-glow/10 text-amber-glow"
                : "border-amber-glow/15 text-fog/70 hover:border-amber-glow/35"
            }`}
          >
            toate
          </button>
        )}
        {valori.map((v) => (
          <button
            key={v}
            onClick={() => setCurent(v)}
            className={`text-xs px-2.5 py-1 rounded-md border transition-all ${
              curent === v
                ? "border-amber-glow/60 bg-amber-glow/10 text-amber-glow"
                : "border-amber-glow/15 text-fog/70 hover:border-amber-glow/35"
            }`}
          >
            {renderLabel ? renderLabel(v) : v}
          </button>
        ))}
      </div>
    </div>
  );
}

function Detaliu({ eticheta, valoare }: { eticheta: string; valoare: string }) {
  return (
    <div className="text-sm">
      <span className="text-xs text-moss uppercase tracking-widest">{eticheta}</span>
      <p className="text-fog/85 leading-snug mt-0.5">{valoare}</p>
    </div>
  );
}
