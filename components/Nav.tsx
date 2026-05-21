"use client";
import Link from "next/link";
import { useState } from "react";

const nav = [
  { href: "/", label: "acasă" },
  { href: "/azi", label: "partidă" },
  { href: "/prognoza", label: "prognoză" },
  { href: "/locuri", label: "locuri" },
  { href: "/tehnici", label: "tehnici" },
  { href: "/monturi", label: "monturi" },
  { href: "/prohibitie", label: "prohibiție" },
  { href: "/echipament", label: "echipament" },
  { href: "/articole", label: "articole" },
  { href: "/glosar", label: "glosar" },
];

export default function Nav() {
  const [open, setOpen] = useState(false);

  return (
    <header className="border-b border-amber-glow/15 backdrop-blur-sm sticky top-0 z-50 bg-water/80">
      <div className="max-w-6xl mx-auto px-4 md:px-5 py-3 md:py-4 flex items-center justify-between gap-3">
        <Link href="/" onClick={() => setOpen(false)} className="flex items-baseline gap-2 group flex-shrink-0">
          <span className="text-xl font-semibold tracking-tight text-amber-glow group-hover:text-amber-soft transition-colors">
            fishy
          </span>
          <span className="hidden sm:inline text-xs text-fog/50 uppercase tracking-widest">
            delta dunării
          </span>
        </Link>

        {/* Desktop nav */}
        <nav className="hidden lg:flex items-center gap-0.5 text-sm">
          {nav.map((n) => (
            <Link
              key={n.href}
              href={n.href}
              className="px-3 py-2 rounded-md text-fog/70 hover:text-amber-glow hover:bg-water-2/40 transition-all"
            >
              {n.label}
            </Link>
          ))}
        </nav>

        {/* Mobile hamburger */}
        <button
          type="button"
          aria-label={open ? "Închide meniul" : "Deschide meniul"}
          aria-expanded={open}
          onClick={() => setOpen((v) => !v)}
          className="lg:hidden inline-flex items-center justify-center w-11 h-11 rounded-md border border-amber-glow/20 text-amber-glow hover:bg-water-2/40 transition-all"
        >
          <span className="sr-only">Menu</span>
          {open ? (
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round">
              <line x1="6" y1="6" x2="18" y2="18" />
              <line x1="6" y1="18" x2="18" y2="6" />
            </svg>
          ) : (
            <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round">
              <line x1="3" y1="6" x2="21" y2="6" />
              <line x1="3" y1="12" x2="21" y2="12" />
              <line x1="3" y1="18" x2="21" y2="18" />
            </svg>
          )}
        </button>
      </div>

      {/* Mobile drawer */}
      {open && (
        <div className="lg:hidden border-t border-amber-glow/15 bg-water/95 backdrop-blur-sm">
          <nav aria-label="Navigare principală" className="max-w-6xl mx-auto px-4 py-3 grid grid-cols-2 gap-2">
            {nav.map((n) => (
              <Link
                key={n.href}
                href={n.href}
                onClick={() => setOpen(false)}
                className="px-4 py-3 rounded-md text-fog/85 hover:text-amber-glow hover:bg-water-2/50 focus:outline-none focus-visible:ring-2 focus-visible:ring-amber-glow border border-amber-glow/15 text-base transition-all"
              >
                {n.label}
              </Link>
            ))}
          </nav>
        </div>
      )}
    </header>
  );
}
