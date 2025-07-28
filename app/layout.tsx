import { BackgroundGrid } from "@/components/ui/BackgroundGrid";
import { Navbar } from "@/components/ui/Navbar";
import { ThemeProvider } from "@/components/ui/theme-provider";
import type { Metadata } from "next";
import { IBM_Plex_Mono, Inter, Lora } from "next/font/google";
import React from 'react';
import "./globals.css";

// Konfiguration unserer Kern-Schriftarten
const inter = Inter({ subsets: ["latin"], display: "swap", variable: "--font-inter" });
const lora = Lora({ subsets: ["latin"], display: "swap", variable: "--font-lora" });
const ibmPlexMono = IBM_Plex_Mono({ subsets: ["latin"], weight: ["400", "700"], display: "swap", variable: "--font-ibm-plex-mono" });

// Finale Metadaten für die Webseite
export const metadata: Metadata = {
  title: "Old School GmbH – Blockchain & AI Expertise",
  description: "Trusted Blockchain & AI Experts from the Heart of Crypto Valley.",
};

export default function RootLayout({ children }: { children: React.ReactNode; }) {
  return (
    <html lang="de" suppressHydrationWarning>
      <body className={`${inter.variable} ${lora.variable} ${ibmPlexMono.variable} font-sans`}>
        <BackgroundGrid />
        <ThemeProvider attribute="class" defaultTheme="dark" enableSystem disableTransitionOnChange>
          <Navbar />
          <main className="text-charcoal dark:text-ivory">
            {children}
          </main>
        </ThemeProvider>
      </body>
    </html>
  );
}