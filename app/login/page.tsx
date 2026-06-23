"use client";

import { useState } from "react";

export default function LoginPage() {
  const [email, setEmail] = useState("");
  const [loading, setLoading] = useState(false);
  const [sent, setSent] = useState(false);
  const [error, setError] = useState<string | null>(null);

  async function submit(e: React.FormEvent) {
    e.preventDefault();
    setLoading(true);
    setError(null);
    try {
      const resp = await fetch("/api/auth/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email }),
      });
      const data = await resp.json();
      if (!data.ok) {
        setError(data.error ?? "Eroare la conectare");
        setLoading(false);
        return;
      }
      setSent(true);
    } catch {
      setError("Eroare de rețea");
    }
    setLoading(false);
  }

  return (
    <div className="max-w-md mx-auto pt-12">
      <header className="mb-8 text-center">
        <p className="text-xs uppercase tracking-[0.3em] text-moss mb-3">cont · pescari</p>
        <h1 className="text-3xl font-display text-fog mb-3">Conectează-te la fishy</h1>
        <p className="text-fog/70 leading-relaxed">
          Trimitem un link de conectare pe email. Fără parolă, valabil 15 minute.
        </p>
      </header>

      <div className="grid grid-cols-2 gap-2.5 mb-6">
        {[
          { icon: "🎣", t: "Jurnal de capturi", d: "cu poze, GPS și condițiile din ziua aia" },
          { icon: "📊", t: "Statistici personale", d: "total, recorduri, locuri productive" },
          { icon: "🤖", t: "Chat AI cu istoric", d: "salvează conversațiile" },
          { icon: "🌊", t: "Feed comunitate", d: "împarte capturile cu ceilalți" },
        ].map((b) => (
          <div key={b.t} className="card rounded-lg p-3">
            <p className="text-lg mb-0.5">{b.icon}</p>
            <p className="text-sm text-fog font-medium leading-tight">{b.t}</p>
            <p className="text-xs text-fog/50 leading-tight mt-0.5">{b.d}</p>
          </div>
        ))}
      </div>

      {!sent ? (
        <div className="card rounded-xl p-6">
          <a
            href="/api/auth/google"
            className="flex items-center justify-center gap-2 w-full py-3 mb-4 rounded-md bg-white text-gray-700 hover:bg-gray-100 border border-gray-300 font-medium transition-colors"
          >
            <svg width="20" height="20" viewBox="0 0 48 48">
              <path fill="#FFC107" d="M43.611 20.083H42V20H24v8h11.303c-1.649 4.657-6.08 8-11.303 8-6.627 0-12-5.373-12-12s5.373-12 12-12c3.059 0 5.842 1.154 7.961 3.039l5.657-5.657C34.046 6.053 29.268 4 24 4 12.955 4 4 12.955 4 24s8.955 20 20 20 20-8.955 20-20c0-1.341-.138-2.65-.389-3.917z"/>
              <path fill="#FF3D00" d="M6.306 14.691l6.571 4.819C14.655 15.108 18.961 12 24 12c3.059 0 5.842 1.154 7.961 3.039l5.657-5.657C34.046 6.053 29.268 4 24 4 16.318 4 9.656 8.337 6.306 14.691z"/>
              <path fill="#4CAF50" d="M24 44c5.166 0 9.86-1.977 13.409-5.192l-6.19-5.238A11.91 11.91 0 0124 36c-5.202 0-9.619-3.317-11.283-7.946l-6.522 5.025C9.505 39.556 16.227 44 24 44z"/>
              <path fill="#1976D2" d="M43.611 20.083H42V20H24v8h11.303a12.04 12.04 0 01-4.087 5.571l.003-.002 6.19 5.238C36.971 39.205 44 34 44 24c0-1.341-.138-2.65-.389-3.917z"/>
            </svg>
            Continuă cu Google
          </a>

          <div className="relative my-4">
            <div className="absolute inset-0 flex items-center"><div className="w-full border-t border-amber-glow/15"></div></div>
            <div className="relative flex justify-center text-xs"><span className="bg-water px-2 text-fog/50">sau</span></div>
          </div>

          <form onSubmit={submit}>
            <label className="block text-xs uppercase tracking-widest text-moss mb-2">Magic link prin email</label>
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="ion.pescar@example.com"
              required
              className="w-full px-3 py-2.5 bg-water-2/40 border border-amber-glow/20 rounded-md text-fog placeholder:text-fog/40 focus:outline-none focus:border-amber-glow/50 mb-3"
            />
            {error && <p className="text-sm text-red-400 mb-2">{error}</p>}
            <button
              type="submit"
              disabled={loading}
              className="w-full py-3 rounded-md bg-amber-glow/15 hover:bg-amber-glow/25 border border-amber-glow/40 text-amber-glow font-medium transition-colors"
            >
              {loading ? "Se trimite..." : "Trimite link →"}
            </button>
          </form>
        </div>
      ) : (
        <div className="card rounded-xl p-6 text-center" style={{ borderColor: "rgba(168,200,122,0.40)" }}>
          <p className="text-2xl mb-3">📧</p>
          <h2 className="text-xl font-display text-moss mb-2">Verifică emailul</h2>
          <p className="text-fog/80 text-sm leading-relaxed">
            Am trimis un link la <strong className="text-amber-glow">{email}</strong>.
            <br />Apasă pe el și te conectăm. Linkul e valabil 15 minute.
          </p>
        </div>
      )}
    </div>
  );
}
