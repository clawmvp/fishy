import Link from "next/link";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Offline",
  robots: { index: false, follow: false },
};

export default function OfflinePage() {
  return (
    <div className="max-w-xl mx-auto text-center py-16">
      <p className="text-xs uppercase tracking-[0.3em] text-moss mb-4">fără conexiune</p>
      <h1 className="text-3xl md:text-4xl font-display text-amber-glow mb-4">
        Ești offline
      </h1>
      <p className="text-fog/75 leading-relaxed mb-8">
        Nu ai semnal acum. Paginile pe care le-ai deschis deja rămân disponibile —
        cotele și prognoza live se actualizează când revii online.
      </p>
      <div className="flex flex-wrap justify-center gap-3">
        <Link href="/specii" className="card rounded-lg px-5 py-3 text-fog hover:text-amber-glow">
          specii
        </Link>
        <Link href="/locuri" className="card rounded-lg px-5 py-3 text-fog hover:text-amber-glow">
          locuri
        </Link>
        <Link href="/tehnici" className="card rounded-lg px-5 py-3 text-fog hover:text-amber-glow">
          tehnici
        </Link>
        <Link href="/glosar" className="card rounded-lg px-5 py-3 text-fog hover:text-amber-glow">
          glosar
        </Link>
      </div>
    </div>
  );
}
