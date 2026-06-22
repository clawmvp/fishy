import FishyChat from "@/components/FishyChat";

export const dynamic = "force-dynamic";

export default function ChatPage() {
  return (
    <div>
      <header className="mb-4">
        <p className="text-xs uppercase tracking-[0.3em] text-moss mb-2">ai · asistent personalizat</p>
        <h1 className="text-3xl md:text-4xl font-display text-fog mb-1">
          🤖 fishy <span className="text-amber-glow text-2xl">chat</span>
        </h1>
        <p className="text-sm text-fog/65 max-w-2xl">
          Întreabă-mă despre locuri, tehnici, monturi, ferestre meteo, sau cum să-ți planifici partida.
        </p>
      </header>

      <FishyChat />
    </div>
  );
}
