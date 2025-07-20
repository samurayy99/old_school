// app/page.tsx

import { EpicenterHero } from "@/components/sections/epicenter-hero"; // NEU
import { FooterSection } from "@/components/sections/footer-section";
import { FounderSection } from "@/components/sections/founder-section";
import { ReferencesSection } from "@/components/sections/references-section";
import { ServicesSection } from "@/components/sections/services-section";

export default function Home() {
  return (
    <main className="bg-charcoal text-ivory">
      {/* Das TracingBeam wird später für die folgenden Sections wieder aktiviert */}
      {/* <TracingBeam> */}
        <div className="space-y-16 lg:space-y-24">
          <EpicenterHero />
          <ServicesSection />
          <FounderSection />
          <ReferencesSection />
          <FooterSection />
        </div>
      {/* </TracingBeam> */}
    </main>
  );
}