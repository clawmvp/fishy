import type { Metadata, Viewport } from "next";
import "./globals.css";
import Nav from "@/components/Nav";

export const metadata: Metadata = {
  title: "fishy — pescuit în Delta Dunării",
  description:
    "Glosar, locuri, tehnici și echipament pentru pescuit în Delta Dunării — extras din experiența pescarilor de pe YouTube",
};

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  maximumScale: 5,
  themeColor: "#0d1b1e",
};

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="ro">
      <body className="fish-grain">
        <Nav />

        <main className="max-w-6xl mx-auto px-4 md:px-5 py-6 md:py-10">{children}</main>

        <footer className="border-t border-amber-glow/10 mt-12 md:mt-20">
          <div className="max-w-6xl mx-auto px-4 md:px-5 py-6 md:py-8 text-sm text-fog/40 flex flex-col md:flex-row justify-between gap-2">
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
