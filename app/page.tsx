/* app/page.tsx – clean architecture, no duplicates */
import { FooterSection } from "@/components/sections/footer-section";
import { FounderSection } from "@/components/sections/founder-section";
import { HeroSection } from "@/components/sections/HeroSection";
import { ReferencesSection } from "@/components/sections/references-section";
import { ServicesSection } from "@/components/sections/services-section";

export default function Home() {
  return (
    <>
      <HeroSection />
      <ServicesSection />
      <FounderSection />
      <ReferencesSection />
      <FooterSection />
    </>
  );
}