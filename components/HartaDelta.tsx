"use client";

import { useEffect, useMemo, useState } from "react";
import { MapContainer, TileLayer, Marker, Popup, LayersControl, LayerGroup, Tooltip } from "react-leaflet";
import MarkerClusterGroup from "react-leaflet-cluster";
import L from "leaflet";
import "leaflet/dist/leaflet.css";
import type { Loc } from "@/data/locuri";
import type { BeaconSignal } from "@/lib/beacon-types";

type LocConCoord = Loc & { lat: number; lng: number };
type CotaStation = { slug: string; name: string; lat: number; lng: number; level: number | null; unit: string };
type SemnalConCoord = BeaconSignal & { lat: number; lng: number };

type Props = {
  locuri: LocConCoord[];
  cotaStations: CotaStation[];
  semnale: SemnalConCoord[];
};

const TIP_COLOR: Record<string, string> = {
  brat: "#d4a657",
  canal: "#a8c87a",
  lac: "#6ba368",
  rau: "#9bb5a3",
  balastiera: "#e89844",
};

const TIP_LABEL: Record<string, string> = {
  brat: "braț",
  canal: "canal",
  lac: "lac",
  rau: "râu",
  balastiera: "balastieră",
};

const TIP_ICON_SVG: Record<string, string> = {
  // braț — undă mare
  brat: `<svg viewBox="0 0 24 24" fill="none" stroke="white" stroke-width="2.5" stroke-linecap="round"><path d="M2 12 Q6 6 12 12 T22 12" /></svg>`,
  // canal — două linii drepte (canal canalizat)
  canal: `<svg viewBox="0 0 24 24" fill="none" stroke="white" stroke-width="2.5" stroke-linecap="round"><path d="M2 8 L22 8 M2 16 L22 16" /></svg>`,
  // lac — picătură
  lac: `<svg viewBox="0 0 24 24" fill="white" stroke="none"><path d="M12 2 C7 9 5 13 5 16 C5 20 8 22 12 22 C16 22 19 20 19 16 C19 13 17 9 12 2 Z" /></svg>`,
  // râu — undă subțire
  rau: `<svg viewBox="0 0 24 24" fill="none" stroke="white" stroke-width="2" stroke-linecap="round"><path d="M2 8 Q6 4 12 8 T22 8 M2 16 Q6 12 12 16 T22 16" /></svg>`,
  balastiera: `<svg viewBox="0 0 24 24" fill="white" stroke="none"><rect x="4" y="4" width="16" height="16" rx="2" /></svg>`,
};

const SPECII_DISPONIBILE = ["crap", "stiuca", "salau", "biban", "avat", "somn", "caras"] as const;

function makeLocIcon(tip: string): L.DivIcon {
  const color = TIP_COLOR[tip] ?? "#d4a657";
  const svg = TIP_ICON_SVG[tip] ?? TIP_ICON_SVG.canal;
  const html = `
    <div style="
      width: 28px; height: 28px;
      background: ${color};
      border: 2px solid white;
      border-radius: 50%;
      display: flex; align-items: center; justify-content: center;
      box-shadow: 0 2px 4px rgba(0,0,0,0.3);
      padding: 4px;
    ">${svg}</div>
  `;
  return L.divIcon({
    html,
    className: "loc-marker",
    iconSize: [28, 28],
    iconAnchor: [14, 14],
    popupAnchor: [0, -14],
  });
}

function makeCotaIcon(level: number | null, unit: string, name: string): L.DivIcon {
  const color = cotaColor(level, unit);
  const displayVal = level == null ? "?" : (unit === "m3s" && level >= 1000 ? `${(level / 1000).toFixed(1)}k` : `${level}`);
  const displayUnit = unit === "m3s" ? "m³/s" : "cm";
  const html = `
    <div style="
      background: ${color};
      border: 3px solid white;
      border-radius: 8px;
      padding: 4px 8px;
      box-shadow: 0 2px 6px rgba(0,0,0,0.4);
      color: white;
      font-family: system-ui, sans-serif;
      font-weight: 600;
      text-align: center;
      white-space: nowrap;
    ">
      <div style="font-size: 9px; text-transform: uppercase; letter-spacing: 1px; opacity: 0.9;">${name}</div>
      <div style="font-size: 13px; line-height: 1;">${displayVal}<span style="font-size: 9px; opacity: 0.85;"> ${displayUnit}</span></div>
    </div>
  `;
  return L.divIcon({
    html,
    className: "cota-marker",
    iconSize: [80, 38],
    iconAnchor: [40, 19],
    popupAnchor: [0, -19],
  });
}

function makeSemnalIcon(specii: string[]): L.DivIcon {
  const sp = specii[0] ?? "?";
  const emoji: Record<string, string> = {
    crap: "🐟", somn: "🐊", stiuca: "🦈", salau: "🐠",
    biban: "🐡", avat: "🐟", caras: "🐟", "țenușă": "🦴",
  };
  const html = `
    <div style="
      width: 24px; height: 24px;
      background: #c84a3c;
      border: 2px solid white;
      border-radius: 50%;
      display: flex; align-items: center; justify-content: center;
      box-shadow: 0 2px 4px rgba(0,0,0,0.3);
      font-size: 12px;
    ">${emoji[sp] ?? "🐟"}</div>
  `;
  return L.divIcon({
    html,
    className: "semnal-marker",
    iconSize: [24, 24],
    iconAnchor: [12, 12],
    popupAnchor: [0, -12],
  });
}

function cotaColor(level: number | null, unit: string): string {
  if (level == null) return "#9bb5a3";
  if (unit === "m3s") {
    if (level > 6000) return "#e89844";
    if (level >= 4500) return "#a8c87a";
    return "#d4a657";
  }
  if (level < 100) return "#c84a3c";
  if (level < 150) return "#d4a657";
  if (level < 200) return "#a8c87a";
  return "#6ba368";
}

// Cluster custom icon
function clusterIcon(cluster: { getChildCount: () => number }): L.DivIcon {
  const count = cluster.getChildCount();
  const size = count < 10 ? 36 : count < 50 ? 44 : 52;
  const html = `
    <div style="
      width: ${size}px; height: ${size}px;
      background: rgba(212, 166, 87, 0.9);
      border: 3px solid white;
      border-radius: 50%;
      display: flex; align-items: center; justify-content: center;
      color: white;
      font-weight: 700;
      font-family: system-ui;
      font-size: ${size > 40 ? 16 : 14}px;
      box-shadow: 0 2px 8px rgba(0,0,0,0.4);
    ">${count}</div>
  `;
  return L.divIcon({
    html,
    className: "cluster-marker",
    iconSize: [size, size],
  });
}

export default function HartaDelta({ locuri, cotaStations, semnale }: Props) {
  const [mounted, setMounted] = useState(false);
  const [filtruSpecie, setFiltruSpecie] = useState<string>("");
  const [filtruTip, setFiltruTip] = useState<string>("");

  useEffect(() => { setMounted(true); }, []);

  const filtrate = useMemo(() => {
    return locuri.filter((l) => {
      if (filtruSpecie && !l.specii.includes(filtruSpecie as (typeof l.specii)[number])) return false;
      if (filtruTip && l.tip !== filtruTip) return false;
      return true;
    });
  }, [locuri, filtruSpecie, filtruTip]);

  const speciiSet = useMemo(() => {
    const s = new Set<string>();
    locuri.forEach((l) => l.specii.forEach((sp) => s.add(sp)));
    return [...s].sort();
  }, [locuri]);

  if (!mounted) {
    return <div className="h-[600px] bg-water-2/30 rounded-xl flex items-center justify-center text-fog/50">Se încarcă harta...</div>;
  }

  const center: [number, number] = [45.18, 29.25];

  return (
    <div>
      {/* Filtre */}
      <div className="card rounded-lg p-3 mb-3">
        <div className="flex flex-wrap gap-3 items-center text-xs">
          <div>
            <span className="text-moss uppercase tracking-widest mr-2">Specie:</span>
            <FilterPills value={filtruSpecie} setValue={setFiltruSpecie} options={speciiSet} renderLabel={(v) => v} />
          </div>
          <div>
            <span className="text-moss uppercase tracking-widest mr-2">Tip:</span>
            <FilterPills
              value={filtruTip}
              setValue={setFiltruTip}
              options={["brat", "canal", "lac", "rau"]}
              renderLabel={(v) => TIP_LABEL[v] ?? v}
            />
          </div>
          {(filtruSpecie || filtruTip) && (
            <span className="text-fog/55 ml-auto">{filtrate.length} / {locuri.length} locuri</span>
          )}
        </div>
      </div>

      <div className="rounded-xl overflow-hidden border border-amber-glow/20" style={{ height: 600 }}>
        <MapContainer center={center} zoom={9} style={{ height: "100%", width: "100%" }} scrollWheelZoom={true}>
          <LayersControl position="topright">
            <LayersControl.BaseLayer checked name="OpenStreetMap">
              <TileLayer
                attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a>'
                url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
              />
            </LayersControl.BaseLayer>
            <LayersControl.BaseLayer name="Satellite (Esri)">
              <TileLayer
                attribution='Tiles &copy; Esri'
                url="https://server.arcgisonline.com/ArcGIS/rest/services/World_Imagery/MapServer/tile/{z}/{y}/{x}"
              />
            </LayersControl.BaseLayer>
            <LayersControl.BaseLayer name="Topo (OpenTopoMap)">
              <TileLayer
                attribution='&copy; OpenTopoMap'
                url="https://{s}.tile.opentopomap.org/{z}/{x}/{y}.png"
              />
            </LayersControl.BaseLayer>

            {/* Locuri cu cluster */}
            <LayersControl.Overlay checked name={`📍 Locuri (${filtrate.length})`}>
              <LayerGroup>
                <MarkerClusterGroup
                  iconCreateFunction={clusterIcon}
                  showCoverageOnHover={false}
                  spiderfyOnMaxZoom={true}
                  disableClusteringAtZoom={11}
                  maxClusterRadius={50}
                >
                  {filtrate.map((l) => (
                    <Marker key={l.slug} position={[l.lat, l.lng]} icon={makeLocIcon(l.tip)}>
                      <Tooltip direction="top" offset={[0, -14]}>
                        <strong>{l.nume}</strong>
                      </Tooltip>
                      <Popup>
                        <div style={{ minWidth: 200 }}>
                          <p style={{ fontSize: 11, textTransform: "uppercase", letterSpacing: "0.1em", color: "#888", margin: 0 }}>
                            {TIP_LABEL[l.tip] ?? l.tip}
                          </p>
                          <strong style={{ fontSize: 15 }}>{l.nume}</strong>
                          <p style={{ fontSize: 12, margin: "4px 0", color: "#444" }}>{l.scurt.slice(0, 130)}</p>
                          <p style={{ fontSize: 11, margin: "4px 0", color: "#666" }}>
                            <strong>Specii:</strong> {l.specii.join(", ")}
                          </p>
                          <p style={{ fontSize: 11, margin: "4px 0", color: "#666" }}>
                            <strong>Sezon:</strong> {l.sezon.slice(0, 4).join(", ")}
                          </p>
                          <a href={`/locuri/${l.slug}`} style={{ color: "#d4a657", fontWeight: "bold", fontSize: 12 }}>
                            Vezi detalii →
                          </a>
                        </div>
                      </Popup>
                    </Marker>
                  ))}
                </MarkerClusterGroup>
              </LayerGroup>
            </LayersControl.Overlay>

            {/* Cota stations */}
            <LayersControl.Overlay checked name={`💧 Cote live (${cotaStations.length})`}>
              <LayerGroup>
                {cotaStations.map((s) => (
                  <Marker key={s.slug} position={[s.lat, s.lng]} icon={makeCotaIcon(s.level, s.unit, s.name.split(" ")[0])}>
                    <Popup>
                      <div style={{ minWidth: 160 }}>
                        <strong>{s.name}</strong>
                        <p style={{ fontSize: 14, margin: "4px 0", color: "#d4a657", fontWeight: "bold" }}>
                          {s.level ?? "—"} {s.unit === "m3s" ? "m³/s" : "cm"}
                        </p>
                        <p style={{ fontSize: 11, color: "#666" }}>
                          Sursă: {s.unit === "m3s" ? "Open-Meteo flood" : "hidro.ro"}
                        </p>
                      </div>
                    </Popup>
                  </Marker>
                ))}
              </LayerGroup>
            </LayersControl.Overlay>

            {/* Semnale Beacon cu cluster */}
            {semnale.length > 0 && (
              <LayersControl.Overlay name={`📡 Semnale Beacon ultimele 90z (${semnale.length})`}>
                <LayerGroup>
                  <MarkerClusterGroup
                    iconCreateFunction={(cluster: { getChildCount: () => number }) => {
                      const count = cluster.getChildCount();
                      const size = count < 10 ? 32 : 40;
                      const html = `
                        <div style="width:${size}px;height:${size}px;background:rgba(200,74,60,0.85);border:2px solid white;border-radius:50%;display:flex;align-items:center;justify-content:center;color:white;font-weight:700;font-size:13px;font-family:system-ui;box-shadow:0 2px 6px rgba(0,0,0,0.4);">${count}</div>
                      `;
                      return L.divIcon({ html, className: "cluster-marker", iconSize: [size, size] });
                    }}
                    showCoverageOnHover={false}
                    maxClusterRadius={30}
                  >
                    {semnale.map((s) => (
                      <Marker
                        key={s.id}
                        position={[s.lat, s.lng]}
                        icon={makeSemnalIcon(s.specii ?? [])}
                      >
                        <Tooltip direction="top">{s.title.slice(0, 50)}…</Tooltip>
                        <Popup>
                          <div style={{ minWidth: 220 }}>
                            <strong style={{ fontSize: 13 }}>{s.title.slice(0, 80)}</strong>
                            {s.rezumat && <p style={{ fontSize: 11, margin: "4px 0", color: "#444" }}>{s.rezumat.slice(0, 150)}</p>}
                            {s.locatie && <p style={{ fontSize: 11, color: "#666", margin: "2px 0" }}>📍 {s.locatie.slice(0, 60)}</p>}
                            {s.specii && s.specii.length > 0 && (
                              <p style={{ fontSize: 11, color: "#666", margin: "2px 0" }}>🐟 {s.specii.join(", ")}</p>
                            )}
                            <a href={s.video_url} target="_blank" rel="noopener noreferrer" style={{ color: "#d4a657", fontSize: 12 }}>
                              ▶ video
                            </a>
                          </div>
                        </Popup>
                      </Marker>
                    ))}
                  </MarkerClusterGroup>
                </LayerGroup>
              </LayersControl.Overlay>
            )}
          </LayersControl>
        </MapContainer>
      </div>
    </div>
  );
}

function FilterPills<T extends string>({
  value, setValue, options, renderLabel,
}: {
  value: string;
  setValue: (v: string) => void;
  options: readonly T[] | T[];
  renderLabel: (v: T) => string;
}) {
  return (
    <span className="inline-flex flex-wrap gap-1">
      <button
        onClick={() => setValue("")}
        className={`text-xs px-2 py-0.5 rounded border transition-colors ${
          value === "" ? "border-amber-glow/60 bg-amber-glow/10 text-amber-glow" : "border-amber-glow/15 text-fog/70 hover:border-amber-glow/40"
        }`}
      >toate</button>
      {(options as T[]).map((opt) => (
        <button
          key={opt}
          onClick={() => setValue(opt)}
          className={`text-xs px-2 py-0.5 rounded border transition-colors ${
            value === opt ? "border-amber-glow/60 bg-amber-glow/10 text-amber-glow" : "border-amber-glow/15 text-fog/70 hover:border-amber-glow/40"
          }`}
        >{renderLabel(opt)}</button>
      ))}
    </span>
  );
}
