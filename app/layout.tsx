import type { Metadata } from "next";
import "./globals.css";
import Link from "next/link";

export const metadata: Metadata = {
  title: "fishy — pescuit în Delta Dunării",
  description:
    "Glosar, locuri, tehnici și echipament pentru pescuit în Delta Dunării — extras din experiența pescarilor de pe YouTube",
};

const nav = [
  { href: "/", label: "acasă" },
  { href: "/azi", label: "partidă" },
  { href: "/locuri", label: "locuri" },
  { href: "/tehnici", label: "tehnici" },
  { href: "/monturi", label: "monturi" },
  { href: "/echipament", label: "echipament" },
  { href: "/articole", label: "articole" },
  { href: "/glosar", label: "glosar" },
];

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="ro">
      <body className="fish-grain">
        <header className="border-b border-amber-glow/15 backdrop-blur-sm sticky top-0 z-50 bg-water/60">
          <div className="max-w-6xl mx-auto px-5 py-4 flex items-center justify-between flex-wrap gap-3">
            <Link href="/" className="flex items-baseline gap-2 group">
              <span className="text-xl font-semibold tracking-tight text-amber-glow group-hover:text-amber-soft transition-colors">
                fishy
              </span>
              <span className="text-xs text-fog/50 uppercase tracking-widest">
                delta dunării
              </span>
            </Link>
            <nav className="flex items-center gap-1 text-sm">
              {nav.map((n) => (
                <Link
                  key={n.href}
                  href={n.href}
                  className="px-3 py-1.5 rounded-md text-fog/70 hover:text-amber-glow hover:bg-water-2/40 transition-all"
                >
                  {n.label}
                </Link>
              ))}
            </nav>
          </div>
        </header>

        <main className="max-w-6xl mx-auto px-5 py-10">{children}</main>

        <footer className="border-t border-amber-glow/10 mt-20">
          <div className="max-w-6xl mx-auto px-5 py-8 text-sm text-fog/40 flex justify-between flex-wrap gap-2">
            <p>fishy · informații extrase din transcripte YouTube · nu garantăm acuratețea</p>
            <p>
              <a
                href="https://n01.app"
                className="hover:text-amber-glow transition-colors"
              >
                n01.app
              </a>
            </p>
          </div>
        </footer>
      </body>
    </html>
  );
}
