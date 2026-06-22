"use client";

import { useRouter } from "next/navigation";
import { useState } from "react";

type Props = {
  initial: {
    nickname: string;
    bio: string;
    location: string;
    profile_public: boolean;
  };
};

export default function EditProfileForm({ initial }: Props) {
  const router = useRouter();
  const [nickname, setNickname] = useState(initial.nickname);
  const [bio, setBio] = useState(initial.bio);
  const [location, setLocation] = useState(initial.location);
  const [profilePublic, setProfilePublic] = useState(initial.profile_public);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [saved, setSaved] = useState(false);

  async function save(e: React.FormEvent) {
    e.preventDefault();
    setLoading(true);
    setError(null);
    setSaved(false);
    try {
      const resp = await fetch("/api/profile", {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ nickname, bio, location, profile_public: profilePublic }),
      });
      const data = await resp.json();
      if (!data.ok) {
        setError(data.error ?? "Eroare");
        setLoading(false);
        return;
      }
      setSaved(true);
      router.refresh();
    } catch {
      setError("Eroare de rețea");
    }
    setLoading(false);
  }

  return (
    <form onSubmit={save} className="card rounded-xl p-5 space-y-4">
      <div>
        <label className="block text-xs uppercase tracking-widest text-moss mb-1">Nickname (URL: /users/X)</label>
        <input
          value={nickname}
          onChange={(e) => setNickname(e.target.value)}
          maxLength={30}
          placeholder="ex: marele_pescar"
          className="w-full px-3 py-2 bg-water-2/40 border border-amber-glow/20 rounded-md text-fog placeholder:text-fog/40 focus:outline-none focus:border-amber-glow/50"
        />
        <p className="text-xs text-fog/50 mt-1">3-30 caractere, doar litere/cifre/_/-. Lasă gol pentru a folosi numele.</p>
      </div>

      <div>
        <label className="block text-xs uppercase tracking-widest text-moss mb-1">Bio (max 500 caractere)</label>
        <textarea
          value={bio}
          onChange={(e) => setBio(e.target.value)}
          maxLength={500}
          rows={3}
          placeholder="ex: Pescuit static cu boilies din 2018, focus Brațul Chilia"
          className="w-full px-3 py-2 bg-water-2/40 border border-amber-glow/20 rounded-md text-fog placeholder:text-fog/40 focus:outline-none focus:border-amber-glow/50 resize-y"
        />
        <p className="text-xs text-fog/50 mt-1">{bio.length}/500</p>
      </div>

      <div>
        <label className="block text-xs uppercase tracking-widest text-moss mb-1">Locație (orașul/zona ta)</label>
        <input
          value={location}
          onChange={(e) => setLocation(e.target.value)}
          maxLength={100}
          placeholder="ex: București / Tulcea / Mila 23"
          className="w-full px-3 py-2 bg-water-2/40 border border-amber-glow/20 rounded-md text-fog placeholder:text-fog/40 focus:outline-none focus:border-amber-glow/50"
        />
      </div>

      <label className="flex items-center gap-2 text-sm text-fog/85 cursor-pointer">
        <input
          type="checkbox"
          checked={profilePublic}
          onChange={(e) => setProfilePublic(e.target.checked)}
          className="accent-amber-glow w-4 h-4"
        />
        🌍 Profil public — afișează pe <code className="text-amber-glow">/users/{nickname || "id"}</code>
      </label>

      {error && <p className="text-sm text-red-400">{error}</p>}
      {saved && <p className="text-sm text-moss">✓ Salvat</p>}

      <button
        type="submit"
        disabled={loading}
        className="w-full py-2.5 rounded-md bg-amber-glow/15 hover:bg-amber-glow/25 border border-amber-glow/40 text-amber-glow font-medium transition-colors"
      >
        {loading ? "Se salvează..." : "Salvează"}
      </button>
    </form>
  );
}
