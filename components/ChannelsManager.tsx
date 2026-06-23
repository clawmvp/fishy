"use client";

import { useRouter } from "next/navigation";
import { useState } from "react";
import type { AdminChannel } from "@/lib/admin-channels";

export default function ChannelsManager({ channels }: { channels: AdminChannel[] }) {
  const router = useRouter();
  const [addOpen, setAddOpen] = useState(false);
  const [newSlug, setNewSlug] = useState("");
  const [newChannelId, setNewChannelId] = useState("");
  const [newNume, setNewNume] = useState("");
  const [newFocus, setNewFocus] = useState("");
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);

  async function toggle(ch: AdminChannel) {
    await fetch("/api/admin/channels", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        op: "toggle",
        slug: ch.slug,
        enabled: !ch.enabled,
        fallback: { channelId: ch.channelId, nume: ch.nume, focus: ch.focus },
      }),
    });
    router.refresh();
  }

  async function remove(ch: AdminChannel) {
    if (!confirm(`Ștergi ${ch.nume}?`)) return;
    await fetch("/api/admin/channels", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ op: "remove", slug: ch.slug }),
    });
    router.refresh();
  }

  async function add(e: React.FormEvent) {
    e.preventDefault();
    setError(null);
    setLoading(true);
    const resp = await fetch("/api/admin/channels", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ op: "add", slug: newSlug.trim(), channelId: newChannelId.trim(), nume: newNume.trim(), focus: newFocus.trim() }),
    });
    const data = await resp.json();
    if (!data.ok) setError(data.error ?? "Eroare");
    else {
      setNewSlug(""); setNewChannelId(""); setNewNume(""); setNewFocus("");
      setAddOpen(false);
      router.refresh();
    }
    setLoading(false);
  }

  const active = channels.filter((c) => c.enabled).length;

  return (
    <>
      <div className="flex items-baseline justify-between mb-4">
        <p className="text-sm text-fog/75">
          {active} active din {channels.length} totale
        </p>
        <button
          onClick={() => setAddOpen(!addOpen)}
          className="text-sm px-3 py-1.5 rounded-md bg-amber-glow/15 hover:bg-amber-glow/25 border border-amber-glow/40 text-amber-glow font-medium"
        >
          {addOpen ? "✕ anulează" : "+ adaugă canal"}
        </button>
      </div>

      {addOpen && (
        <form onSubmit={add} className="card rounded-xl p-4 mb-4 space-y-3">
          <div className="grid sm:grid-cols-2 gap-2">
            <div>
              <label className="text-xs text-moss block mb-1">Slug (unic, kebab-case)</label>
              <input value={newSlug} onChange={(e) => setNewSlug(e.target.value)} required placeholder="ex: pescuit-baltacu" className="w-full px-3 py-2 bg-water-2/40 border border-amber-glow/20 rounded-md text-sm text-fog focus:outline-none focus:border-amber-glow/50" />
            </div>
            <div>
              <label className="text-xs text-moss block mb-1">Channel ID YouTube (UC...)</label>
              <input value={newChannelId} onChange={(e) => setNewChannelId(e.target.value)} required placeholder="UC..." className="w-full px-3 py-2 bg-water-2/40 border border-amber-glow/20 rounded-md text-sm text-fog focus:outline-none focus:border-amber-glow/50" />
            </div>
            <div>
              <label className="text-xs text-moss block mb-1">Nume afișat</label>
              <input value={newNume} onChange={(e) => setNewNume(e.target.value)} required placeholder="ex: Baltacul" className="w-full px-3 py-2 bg-water-2/40 border border-amber-glow/20 rounded-md text-sm text-fog focus:outline-none focus:border-amber-glow/50" />
            </div>
            <div>
              <label className="text-xs text-moss block mb-1">Focus (scurt)</label>
              <input value={newFocus} onChange={(e) => setNewFocus(e.target.value)} placeholder="ex: spinning, somn clonc" className="w-full px-3 py-2 bg-water-2/40 border border-amber-glow/20 rounded-md text-sm text-fog focus:outline-none focus:border-amber-glow/50" />
            </div>
          </div>
          {error && <p className="text-xs text-red-400">{error}</p>}
          <button type="submit" disabled={loading} className="text-sm px-3 py-1.5 rounded-md bg-amber-glow/15 border border-amber-glow/40 text-amber-glow">
            {loading ? "..." : "✓ adaugă"}
          </button>
          <p className="text-xs text-fog/55">
            Cum obții Channel ID: deschide canalul YouTube → click pe avatarul canalului → URL conține <code className="text-amber-glow">/channel/UC...</code>. Sau folosește <a href="https://commentpicker.com/youtube-channel-id.php" target="_blank" rel="noopener noreferrer" className="text-amber-glow underline">commentpicker</a> cu un handle.
          </p>
        </form>
      )}

      <div className="space-y-2">
        {channels.map((c) => (
          <article key={c.slug} className="card rounded-lg p-3 flex items-baseline justify-between gap-3 flex-wrap" style={{ opacity: c.enabled ? 1 : 0.4 }}>
            <div className="flex-1 min-w-0">
              <div className="flex items-baseline gap-2">
                <p className="text-sm font-medium text-fog">{c.nume}</p>
                <span className="text-[10px] uppercase tracking-widest text-fog/40">{c.source}</span>
                {!c.enabled && <span className="text-[10px] text-red-400">DEZACTIVAT</span>}
              </div>
              <p className="text-xs text-fog/55">{c.focus}</p>
              <p className="text-[10px] text-fog/40 mt-0.5 font-mono">{c.channelId}</p>
            </div>
            <div className="flex gap-1.5">
              <button onClick={() => toggle(c)} className="text-xs px-2 py-1 rounded-md border border-amber-glow/20 hover:border-amber-glow/50 text-fog/75 hover:text-amber-glow">
                {c.enabled ? "⏸ dezactivează" : "▶ activează"}
              </button>
              {c.source === "db" && (
                <button onClick={() => remove(c)} className="text-xs px-2 py-1 rounded-md border border-red-400/30 hover:border-red-400/60 text-red-400/80 hover:text-red-400">✕</button>
              )}
            </div>
          </article>
        ))}
      </div>
    </>
  );
}
