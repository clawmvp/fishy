import Link from "next/link";
import { listAllChannels } from "@/lib/admin-channels";
import ChannelsManager from "@/components/ChannelsManager";

export const dynamic = "force-dynamic";

export default async function AdminChannelsPage() {
  const channels = await listAllChannels();

  return (
    <div>
      <nav className="flex flex-wrap gap-2 mb-6">
        <Link href="/admin" className="text-xs uppercase tracking-widest text-fog/70 hover:text-amber-glow border border-amber-glow/15 hover:border-amber-glow/40 rounded-md px-3 py-1.5 transition-colors">← dashboard</Link>
      </nav>

      <header className="mb-6">
        <p className="text-xs uppercase tracking-[0.3em] text-moss mb-2">admin · canale YouTube</p>
        <h1 className="text-3xl font-display text-fog">Canale beacon</h1>
        <p className="text-sm text-fog/65 mt-1">
          Canale monitorizate de beacon-scan (RSS). <strong className="text-amber-glow">Adaugă</strong> canale noi sau <strong className="text-amber-glow">dezactivează</strong> pe cele existente. Static = din cod; admin = adăugat aici.
        </p>
      </header>

      <ChannelsManager channels={channels} />
    </div>
  );
}
