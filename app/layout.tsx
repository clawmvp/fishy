import type { Metadata, Viewport } from "next";
import "./globals.css";
import Nav from "@/components/Nav";
import ServiceWorker from "@/components/ServiceWorker";
import FloatingChat from "@/components/FloatingChat";

const DESC =
  "Glosar, locuri, tehnici și echipament pentru pescuit în Delta Dunării — cote hidro live, prognoză mușcătură și experiența pescarilor extrasă din transcripte YouTube.";

export const metadata: Metadata = {
  metadataBase: new URL("https://fishy.n01.app"),
  title: {
    default: "fishy — pescuit în Delta Dunării",
    template: "%s · fishy",
  },
  description: DESC,
  applicationName: "fishy",
  keywords: [
    "pescuit Delta Dunării",
    "locuri pescuit Delta",
    "tehnici pescuit",
    "prohibiție pescuit 2026",
    "crap",
    "știucă",
    "șalău",
    "somn",
    "avat",
    "biban",
    "cote hidro Tulcea",
    "spinning Delta",
  ],
  alternates: { canonical: "/" },
  openGraph: {
    type: "website",
    locale: "ro_RO",
    siteName: "fishy",
    url: "https://fishy.n01.app",
    title: "fishy — pescuit în Delta Dunării",
    description: DESC,
  },
  twitter: {
    card: "summary_large_image",
    title: "fishy — pescuit în Delta Dunării",
    description: DESC,
  },
  robots: {
    index: true,
    follow: true,
    googleBot: { index: true, follow: true, "max-image-preview": "large" },
  },
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
        <a
          href="#content"
          className="sr-only focus:not-sr-only focus:fixed focus:top-2 focus:left-2 focus:z-[100] focus:px-4 focus:py-2 focus:rounded-md focus:bg-amber-glow focus:text-water focus:outline-none focus:ring-2 focus:ring-amber-glow"
        >
          Sări la conținut
        </a>
        <ServiceWorker />
        <Nav />

        <main id="content" className="max-w-6xl mx-auto px-4 md:px-5 py-6 md:py-10">{children}</main>

        <FloatingChat />

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
