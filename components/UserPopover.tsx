"use client";

import Link from "next/link";
import { useState, useRef, useEffect } from "react";

type MiniProfile = {
  id: number;
  display_name: string;
  avatar_url: string | null;
  bio: string | null;
  stats: { total: number; totalKg: number; specii: number };
  recente: Array<{ id: number; specie: string; weight_kg: number | null; caught_at: string; photos: string[] }>;
};

const SPECIE_LABEL: Record<string, string> = { crap: "Crap", somn: "Somn", stiuca: "Știucă", salau: "Șalău", biban: "Biban", avat: "Avat", caras: "Caras" };

export function UserPopover({ userId, displayName, avatar }: { userId: number; displayName: string; avatar?: string | null }) {
  const [open, setOpen] = useState(false);
  const [data, setData] = useState<MiniProfile | null>(null);
  const [loading, setLoading] = useState(false);
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!open || data || loading) return;
    setLoading(true);
    fetch(`/api/users/${userId}/mini`)
      .then((r) => r.json())
      .then((d) => { if (!d.error) setData(d); })
      .finally(() => setLoading(false));
  }, [open, data, loading, userId]);

  useEffect(() => {
    if (!open) return;
    function onClick(e: MouseEvent) {
      if (ref.current && !ref.current.contains(e.target as Node)) setOpen(false);
    }
    document.addEventListener("click", onClick);
    return () => document.removeEventListener("click", onClick);
  }, [open]);

  return (
    <span className="relative inline-block" ref={ref}>
      <button
        onClick={(e) => { e.stopPropagation(); setOpen(!open); }}
        className="inline-flex items-center gap-1.5 text-fog/85 hover:text-amber-glow transition-colors"
      >
        {avatar && <img src={avatar} alt="" className="w-5 h-5 rounded-full" />}
        <span className="font-medium">{displayName}</span>
      </button>
      {open && (
        <div className="absolute z-50 mt-2 right-0 min-w-[280px] max-w-[320px] card rounded-lg p-4 shadow-xl" style={{ background: "rgba(13, 27, 30, 0.98)" }}>
          {loading ? (
            <p className="text-sm text-fog/55">Se încarcă...</p>
          ) : data ? (
            <>
              <div className="flex items-baseline gap-3 mb-2">
                {data.avatar_url && <img src={data.avatar_url} alt="" className="w-10 h-10 rounded-full" />}
                <div>
                  <h3 className="text-base font-display text-amber-glow">{data.display_name}</h3>
                  {data.bio && <p className="text-xs text-fog/65 leading-snug mt-0.5">{data.bio.slice(0, 100)}</p>}
                </div>
              </div>
              <div className="grid grid-cols-3 gap-2 my-3 text-center">
                <div><p className="text-lg text-amber-glow font-light">{data.stats.total}</p><p className="text-[10px] uppercase text-fog/50">capturi</p></div>
                <div><p className="text-lg text-amber-glow font-light">{data.stats.totalKg}</p><p className="text-[10px] uppercase text-fog/50">kg</p></div>
                <div><p className="text-lg text-amber-glow font-light">{data.stats.specii}</p><p className="text-[10px] uppercase text-fog/50">specii</p></div>
              </div>
              {data.recente.length > 0 && (
                <div className="mb-2">
                  <p className="text-[10px] uppercase tracking-widest text-moss mb-1">Recente</p>
                  <div className="space-y-1">
                    {data.recente.map((c) => (
                      <div key={c.id} className="text-xs text-fog/85 flex justify-between gap-2">
                        <span>{SPECIE_LABEL[c.specie] ?? c.specie}{c.weight_kg ? ` ${c.weight_kg}kg` : ""}</span>
                        <span className="text-fog/50">{new Date(c.caught_at).toLocaleDateString("ro-RO", { day: "numeric", month: "short" })}</span>
                      </div>
                    ))}
                  </div>
                </div>
              )}
              <Link href={`/users/${data.id}`} className="text-xs text-amber-glow hover:text-amber-soft block text-center mt-2 pt-2 border-t border-amber-glow/10">
                vezi profil complet →
              </Link>
            </>
          ) : (
            <p className="text-sm text-fog/55">Nu pot încărca profilul</p>
          )}
        </div>
      )}
    </span>
  );
}
