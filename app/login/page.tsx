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
          <br />
          Cu cont poți să-ți ții jurnal de capturi și să vezi statistici personale.
        </p>
      </header>

      {!sent ? (
        <form onSubmit={submit} className="card rounded-xl p-6">
          <label className="block text-xs uppercase tracking-widest text-moss mb-2">Email</label>
          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="ion.pescar@example.com"
            required
            autoFocus
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
