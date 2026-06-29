import Link from "next/link";
import { getAdminStats } from "@/lib/admin-stats";
import { feedbackCounts } from "@/lib/feedback";
import AdminTriggers from "@/components/AdminTriggers";

export const dynamic = "force-dynamic";

function timeAgo(iso: string | null): string {
  if (!iso) return "niciodată";
  const min = Math.floor((Date.now() - new Date(iso).getTime()) / 60000);
  if (min < 60) return `acum ${min}min`;
  if (min < 1440) return `acum ${Math.floor(min / 60)}h`;
  return `acum ${Math.floor(min / 1440)}z`;
}

export default async function AdminDashboard() {
  const s = await getAdminStats();
  const fb = await feedbackCounts();

  return (
    <div>
      <header className="mb-8">
        <p className="text-xs uppercase tracking-[0.3em] text-moss mb-3">admin · dashboard</p>
        <h1 className="text-4xl font-display text-fog mb-2">Control fishy</h1>
        <p className="text-fog/65 text-sm">Stats live, manual triggers, link-uri rapide.</p>
      </header>

      {/* Section nav */}
      <nav className="flex flex-wrap gap-2 mb-8 pb-4 border-b border-amber-glow/15">
        <span className="text-xs uppercase tracking-widest text-amber-glow border border-amber-glow/40 bg-amber-glow/10 rounded-md px-3 py-1.5">dashboard</span>
        <Link href="/admin/propuneri" className="text-xs uppercase tracking-widest text-fog/70 hover:text-amber-glow border border-amber-glow/15 hover:border-amber-glow/40 rounded-md px-3 py-1.5 transition-colors">
          ⏳ propuneri ({s.pending.total})
        </Link>
        <Link href="/admin/users" className="text-xs uppercase tracking-widest text-fog/70 hover:text-amber-glow border border-amber-glow/15 hover:border-amber-glow/40 rounded-md px-3 py-1.5 transition-colors">
          👤 useri ({s.users.total})
        </Link>
        <Link href="/admin/channels" className="text-xs uppercase tracking-widest text-fog/70 hover:text-amber-glow border border-amber-glow/15 hover:border-amber-glow/40 rounded-md px-3 py-1.5 transition-colors">
          📺 canale
        </Link>
        <Link href="/admin/logs" className="text-xs uppercase tracking-widest text-fog/70 hover:text-amber-glow border border-amber-glow/15 hover:border-amber-glow/40 rounded-md px-3 py-1.5 transition-colors">
          📋 logs
        </Link>
        <Link href="/admin/feedback" className="text-xs uppercase tracking-widest text-fog/70 hover:text-amber-glow border border-amber-glow/15 hover:border-amber-glow/40 rounded-md px-3 py-1.5 transition-colors">
          📣 feedback{fb.new > 0 ? ` (${fb.new})` : ""}
        </Link>
      </nav>

      {/* Stats grid */}
      <section className="mb-10">
        <h2 className="text-xl font-display text-amber-glow mb-4">📊 Stats live</h2>
        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-3">
          <Card title="Semnale Beacon" value={s.signals.total} subtitle={`+${s.signals.recent7d} ultimele 7z · ultim scan: ${timeAgo(s.signals.lastScannedAt)}`} color="#a8c87a" />
          <Card title="Propuneri pending" value={s.pending.total} subtitle={`loc ${s.pending.loc} · teh ${s.pending.tehnica} · mon ${s.pending.montura} · ech ${s.pending.echipament} · obs ${s.pending.obs}`} color="#d4a657" />
          <Card title="Acceptate / Respinse" value={`${s.accepted.total} / ${s.rejected.total}`} subtitle="propuneri review-uite" color="#9bb5a3" />
          <Card title="Cota snapshots" value={s.cota.pointsCount} subtitle={`ultim snapshot: ${timeAgo(s.cota.lastSnapshotAt)}`} color="#8cc7d1" />
          <Card title="Useri" value={s.users.total} subtitle={`${s.users.activeLast7d} activi ultimele 7z`} color="#e89844" />
          <Card title="Capturi" value={s.catches.total} subtitle={`${s.catches.public} publice · +${s.catches.recent7d} ultimele 7z`} color="#c84a3c" />
          <Card title="Conversații chat" value={s.conversations.total} subtitle={`${s.conversations.messages} mesaje · +${s.conversations.recent7d} ultimele 7z`} color="#6ba368" />
          <Card title="Total review-uite" value={s.accepted.total + s.rejected.total} subtitle={`${Math.round((s.accepted.total / Math.max(1, s.accepted.total + s.rejected.total)) * 100)}% acceptare`} color="#9bb5a3" />
        </div>
      </section>

      {/* Manual triggers */}
      <section className="mb-10">
        <h2 className="text-xl font-display text-amber-glow mb-2">⚡ Manual triggers</h2>
        <p className="text-xs text-fog/55 mb-4">Forțează rularea cron-urilor cu parametri customizați (utilizat când vrei să procesezi semnale vechi sau să verifici imediat după modificări de cod).</p>
        <AdminTriggers />
      </section>

      {/* Quick links */}
      <section className="mb-10">
        <h2 className="text-xl font-display text-amber-glow mb-4">🔗 Acces rapid</h2>
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-3">
          <QuickLink href="/admin/propuneri" emoji="⏳" title="Propuneri pending" subtitle={`${s.pending.total} de review-uit`} />
          <QuickLink href="/beacon" emoji="📡" title="Beacon feed" subtitle="vezi semnale recente" />
          <QuickLink href="/feed" emoji="🐟" title="Feed comunitate" subtitle="capturi publice" />
          <QuickLink href="/azi" emoji="🎯" title="/azi" subtitle="dashboard live partidă" />
          <QuickLink href="/harta" emoji="🗺️" title="Hartă Delta" subtitle="locuri + cote + semnale" />
          <QuickLink href="/cont" emoji="👤" title="Cont user" subtitle="profil propriu" />
        </div>
      </section>

      {/* Config info */}
      <section>
        <h2 className="text-xl font-display text-amber-glow mb-4">⚙️ Configurare sistem</h2>
        <div className="card rounded-xl p-5 space-y-2 text-sm">
          <Row label="Crons" value="beacon-scan 05:00 · cota-snapshot 10:30 · extract-insights 07:30 (zilnic)" />
          <Row label="Model chat" value="DeepSeek V3 (deepseek-chat) cu prompt caching" />
          <Row label="Model extract" value="Claude Opus 4.7 (deduplicare vs entries existente)" />
          <Row label="Model beacon" value="Claude Haiku 4.5 (extracție rapidă)" />
          <Row label="Storage poze" value="Vercel Blob (8MB max, max 3 per captură)" />
          <Row label="Auth user" value="Magic link (Resend) + Google OAuth" />
          <Row label="Auth admin" value="HTTP Basic Auth (middleware /admin/*)" />
        </div>
      </section>
    </div>
  );
}

function Card({ title, value, subtitle, color }: { title: string; value: string | number; subtitle: string; color: string }) {
  return (
    <div className="card rounded-xl p-4" style={{ borderColor: `${color}30` }}>
      <p className="text-xs uppercase tracking-widest text-moss mb-1">{title}</p>
      <p className="text-2xl font-light mb-1" style={{ color }}>{value}</p>
      <p className="text-[10px] text-fog/50 leading-snug">{subtitle}</p>
    </div>
  );
}

function QuickLink({ href, emoji, title, subtitle }: { href: string; emoji: string; title: string; subtitle: string }) {
  return (
    <Link href={href} className="card rounded-lg p-3 flex items-baseline gap-2 hover:border-amber-glow/40 transition-colors">
      <span className="text-xl">{emoji}</span>
      <div className="flex-1">
        <p className="text-sm font-medium text-fog">{title}</p>
        <p className="text-xs text-fog/55">{subtitle}</p>
      </div>
      <span className="text-amber-glow">→</span>
    </Link>
  );
}

function Row({ label, value }: { label: string; value: string }) {
  return (
    <div className="flex items-baseline justify-between gap-3 text-xs">
      <span className="text-moss uppercase tracking-widest">{label}</span>
      <span className="text-fog/85 text-right">{value}</span>
    </div>
  );
}
