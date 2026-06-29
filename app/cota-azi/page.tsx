import type { Metadata } from "next";
import ShareLinkButton from "@/components/ShareLinkButton";

export const dynamic = "force-dynamic";

export const metadata: Metadata = {
  title: "Cota azi — imagine de share",
  description: "Imaginea cu cota Dunării, vremea și luna de azi în Delta — gata de postat pe Instagram, TikTok sau Facebook.",
  alternates: { canonical: "/cota-azi" },
  openGraph: {
    type: "website",
    title: "Cota Dunării azi · fishy",
    description: "Cota, vremea și luna de azi în Delta Dunării.",
    images: ["/cota-azi/card"],
  },
};

export default function CotaAziPage() {
  return (
    <div className="max-w-xl mx-auto">
      <header className="mb-6 text-center">
        <p className="text-xs uppercase tracking-[0.3em] text-moss mb-3">imagine de share</p>
        <h1 className="text-3xl md:text-4xl font-display text-fog mb-2">Cota azi, gata de postat</h1>
        <p className="text-fog/70 text-sm">
          O imagine pătrată (1080×1080) cu cota Dunării, vremea și luna de azi. Descarc-o și postează-o pe
          Instagram, TikTok sau în grupurile de pescuit.
        </p>
      </header>

      <div className="card rounded-xl p-3 mb-5">
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img src="/cota-azi/card" alt="Cota Dunării azi — Delta" className="w-full rounded-lg" />
      </div>

      <div className="flex flex-wrap items-center justify-center gap-3">
        <a
          href="/cota-azi/card"
          download="fishy-cota-azi.png"
          className="py-2.5 px-5 rounded-md bg-amber-glow/15 hover:bg-amber-glow/25 border border-amber-glow/40 text-amber-glow font-medium transition-colors"
        >
          ⬇ Descarcă imaginea
        </a>
        <ShareLinkButton url="https://fishy.n01.app/cota-azi" title="Cota Dunării azi · fishy" />
      </div>

      <p className="text-xs text-fog/45 text-center mt-5">
        Imaginea se generează live — de fiecare dată afișează cotele și vremea curentă.
      </p>
    </div>
  );
}
