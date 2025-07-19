// app/layout.tsx

import type { Metadata } from "next";
import { IBM_Plex_Mono, Inter, Lora } from "next/font/google";
import "./globals.css";

// 1. Konfiguration unserer Schriftarten
const inter = Inter({
  subsets: ["latin"],
  display: "swap",
  variable: "--font-inter",
});

const lora = Lora({
  subsets: ["latin"],
  display: "swap",
  variable: "--font-lora",
});

const ibmPlexMono = IBM_Plex_Mono({
  subsets: ["latin"],
  weight: ["400", "700"],
  display: "swap",
  variable: "--font-ibm-plex-mono",
});

// 2. Metadaten für die Webseite (wichtig für SEO)
export const metadata: Metadata = {
  title: "Old School GmbH – Blockchain & AI Expertise",
  description: "Boutique-Beratung für Blockchain & KI im Herzen des Crypto Valley. Gegründet auf Erfahrung. Gebaut für die Zukunft.",
};

// 3. Das eigentliche Layout
export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="de">
      <body className={`${inter.variable} ${lora.variable} ${ibmPlexMono.variable} font-sans`}>
        {children}
      </body>
    </html>
  );
}