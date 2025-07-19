// app/page.tsx

import { FooterSection } from "@/components/sections/footer-section";
import { FounderSection } from "@/components/sections/founder-section";
import { HeroSection } from "@/components/sections/hero-section";
import { ReferencesSection } from "@/components/sections/references-section";
import { ServicesSection } from "@/components/sections/services-section";
import { TracingBeam } from "@/components/ui/tracing-beam";

export default function Home() {
  return (
    <main className="bg-charcoal text-parchment">
      {/* TracingBeam umschließt die GESAMTE Seite bis zum Footer */}
      <TracingBeam>
        <div className="space-y-16 lg:space-y-24">
          <HeroSection />
          <ServicesSection />
          <FounderSection />
          <ReferencesSection />
          <FooterSection />
        </div>
      </TracingBeam>
    </main>
  );
}