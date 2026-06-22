"use client";

import { useEffect, useState } from "react";
import { MapContainer, TileLayer, Marker, Popup, LayersControl, LayerGroup, CircleMarker, Tooltip } from "react-leaflet";
import L from "leaflet";
import "leaflet/dist/leaflet.css";
import type { Loc } from "@/data/locuri";
import type { BeaconSignal } from "@/lib/beacon-types";

// Fix default Leaflet icon paths (Next.js bundling)
const DefaultIcon = L.icon({
  iconUrl: "https://unpkg.com/leaflet@1.9.4/dist/images/marker-icon.png",
  iconRetinaUrl: "https://unpkg.com/leaflet@1.9.4/dist/images/marker-icon-2x.png",
  shadowUrl: "https://unpkg.com/leaflet@1.9.4/dist/images/marker-shadow.png",
  iconSize: [25, 41],
  iconAnchor: [12, 41],
  popupAnchor: [1, -34],
  shadowSize: [41, 41],
});
L.Marker.prototype.options.icon = DefaultIcon;

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

function cotaColor(level: number | null, unit: string): string {
  if (level == null) return "#9bb5a3";
  if (unit === "m3s") {
    if (level > 6000) return "#e89844";
    if (level >= 4500) return "#a8c87a";
    return "#d4a657";
  }
  // cm
  if (level < 100) return "#c84a3c";
  if (level < 150) return "#d4a657";
  if (level < 200) return "#a8c87a";
  return "#6ba368";
}

export default function HartaDelta({ locuri, cotaStations, semnale }: Props) {
  const [mounted, setMounted] = useState(false);
  useEffect(() => { setMounted(true); }, []);

  if (!mounted) return <div className="h-[600px] bg-water-2/30 rounded-xl flex items-center justify-center text-fog/50">Se încarcă harta...</div>;

  // Center pe Deltă (Mila 23 aprox)
  const center: [number, number] = [45.18, 29.25];

  return (
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
              attribution='Map data: &copy; OpenStreetMap contributors, SRTM | Map style: &copy; OpenTopoMap'
              url="https://{s}.tile.opentopomap.org/{z}/{x}/{y}.png"
            />
          </LayersControl.BaseLayer>

          {/* Layer locuri */}
          <LayersControl.Overlay checked name={`📍 Locuri (${locuri.length})`}>
            <LayerGroup>
              {locuri.map((l) => (
                <CircleMarker
                  key={l.slug}
                  center={[l.lat, l.lng]}
                  radius={7}
                  pathOptions={{
                    color: TIP_COLOR[l.tip] ?? "#d4a657",
                    fillColor: TIP_COLOR[l.tip] ?? "#d4a657",
                    fillOpacity: 0.65,
                    weight: 2,
                  }}
                >
                  <Tooltip direction="top" offset={[0, -5]}>
                    <strong>{l.nume}</strong>
                  </Tooltip>
                  <Popup>
                    <div style={{ minWidth: 180 }}>
                      <p style={{ fontSize: 11, textTransform: "uppercase", letterSpacing: "0.1em", color: "#888", margin: 0 }}>{l.tip}</p>
                      <strong style={{ fontSize: 15 }}>{l.nume}</strong>
                      <p style={{ fontSize: 12, margin: "4px 0", color: "#444" }}>{l.scurt.slice(0, 120)}</p>
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
                </CircleMarker>
              ))}
            </LayerGroup>
          </LayersControl.Overlay>

          {/* Layer cota stations */}
          <LayersControl.Overlay checked name={`💧 Cote live (${cotaStations.length})`}>
            <LayerGroup>
              {cotaStations.map((s) => (
                <CircleMarker
                  key={s.slug}
                  center={[s.lat, s.lng]}
                  radius={12}
                  pathOptions={{
                    color: cotaColor(s.level, s.unit),
                    fillColor: cotaColor(s.level, s.unit),
                    fillOpacity: 0.85,
                    weight: 3,
                  }}
                >
                  <Tooltip direction="top" offset={[0, -5]} permanent>
                    <strong>{s.name}: {s.level ?? "?"} {s.unit === "m3s" ? "m³/s" : "cm"}</strong>
                  </Tooltip>
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
                </CircleMarker>
              ))}
            </LayerGroup>
          </LayersControl.Overlay>

          {/* Layer semnale Beacon */}
          {semnale.length > 0 && (
            <LayersControl.Overlay name={`📡 Semnale Beacon ultimele 90z (${semnale.length})`}>
              <LayerGroup>
                {semnale.map((s) => (
                  <CircleMarker
                    key={s.id}
                    center={[s.lat, s.lng]}
                    radius={6}
                    pathOptions={{
                      color: "#c84a3c",
                      fillColor: "#c84a3c",
                      fillOpacity: 0.6,
                      weight: 1,
                    }}
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
                  </CircleMarker>
                ))}
              </LayerGroup>
            </LayersControl.Overlay>
          )}
        </LayersControl>
      </MapContainer>
    </div>
  );
}
