import Image from "next/image";
import { Timeline } from "../ui/timeline";

export function FounderSection() {
  // Bernd's OG Career Journey Data
  const timelineData = [
    {
      title: "Ethereum Foundation",
      date: "2015-2017",
      content: (
        <p className="text-lg leading-relaxed">
          As Advisory Board Member of the Ethereum Foundation, Bernd helped set the course 
          for Ethereum's early ecosystem and decentralization. His insights shaped the foundation's 
          approach to supporting developers and growing the Web3 space from the ground up.
        </p>
      ),
    },
    {
      title: "Groundbreaking Fundraising",
      date: "2017",
      content: (
        <p className="text-lg leading-relaxed">
          Raised over <span className="text-accent-gold font-semibold">77,000 ETH</span> for 
          projects like Swarm City and CasperLabs, demonstrating expertise in tokenomics and 
          community-building during crypto's most transformative period.
        </p>
      ),
    },
    {
      title: "Hands-on Founder",
      date: "2018-Present",
      content: (
        <p className="text-lg leading-relaxed">
          As founder and core contributor at <span className="text-blueprint-blue font-semibold">
          Swarm City</span>, <span className="text-blueprint-blue font-semibold">AVADO</span>, 
          and <span className="text-blueprint-blue font-semibold">CasperLabs</span>, Bernd has 
          proven that vision can be shipped as working, decentralized products that serve real users.
        </p>
      ),
    },
    {
      title: "Old School GmbH",
      date: "Present",
      content: (
        <p className="text-lg leading-relaxed">
          Founded Old School GmbH in the heart of <span className="text-terminal-green font-semibold">
          Crypto Valley</span> to channel his experience into the next generation of founders, 
          family offices, and investors seeking authentic blockchain expertise.
        </p>
      ),
    },
  ];

  return (
    <section className="py-16 lg:py-24 bg-ivory relative overflow-hidden">
      {/* Subtiles Blueprint-Gitter im Hintergrund */}
      <div className="absolute inset-0 opacity-[0.03]">
        <div className="grid grid-cols-12 h-full">
          {Array.from({ length: 48 }).map((_, i) => (
            <div key={i} className="border-r border-blueprint-blue h-full" />
          ))}
        </div>
        <div className="absolute inset-0 grid grid-rows-12 w-full">
          {Array.from({ length: 48 }).map((_, i) => (
            <div key={i} className="border-b border-blueprint-blue w-full" />
          ))}
        </div>
      </div>

      <div className="relative z-10">
        {/* Desktop: Zwei-Spalten Layout, Mobile: Gestapelt */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-16">
          
          {/* Linke Spalte: Timeline */}
          <div className="order-2 lg:order-1">
            <div className="max-w-2xl mx-auto lg:mx-0 pl-8 lg:pl-16">
              {/* Section Header */}
              <div className="mb-16">
                <p className="text-sm font-mono text-blueprint-blue uppercase tracking-widest mb-4">
                  THE PIONEER
                </p>
                <h2 className="text-4xl lg:text-5xl font-serif text-charcoal mb-6 leading-tight">
                  Expertise since Day One.
                </h2>
                <p className="text-lg text-brand-gray leading-relaxed">
                  From Ethereum's founding days to today's AI revolution, 
                  Bernd has been shaping the future of decentralized technologies.
                </p>
              </div>

              {/* Timeline */}
              <Timeline data={timelineData} />
            </div>
          </div>

          {/* Rechte Spalte: Sticky Portrait + CTA */}
          <div className="order-1 lg:order-2">
            <div className="lg:sticky lg:top-24 space-y-8">
              {/* Portrait */}
              <div className="relative">
                {/* Glow Effect Background */}
                <div className="absolute inset-0 bg-gradient-to-br from-blueprint-blue/5 via-transparent to-accent-gold/5 rounded-2xl transform rotate-1"></div>
                
                {/* Portrait Container */}
                <div className="relative bg-ivory rounded-2xl p-1 ring-2 ring-blueprint-blue/20 shadow-2xl">
                  {/* Placeholder for Portrait - Replace with actual image */}
                  <div className="aspect-[4/5] overflow-hidden rounded-xl">
                    <Image
                      src="/bernd_lapp.jpeg"
                      alt="Portrait of Bernd Lapp, Founder of Old School GmbH"
                      width={500}
                      height={625}
                      className="object-cover object-top w-full h-full"
                      priority
                    />
                  </div>
                </div>

                {/* Subtle floating elements */}
                <div className="absolute -top-2 -right-2 w-4 h-4 bg-accent-gold rounded-full opacity-60"></div>
                <div className="absolute -bottom-2 -left-2 w-3 h-3 bg-blueprint-blue rounded-full opacity-40"></div>
              </div>

              {/* CTA Section */}
              <div className="text-center lg:text-left space-y-4">
                <h3 className="text-2xl font-serif text-charcoal">
                  Connect with Bernd
                </h3>
                <p className="text-brand-gray leading-relaxed">
                  Ready to discuss your blockchain or AI project? 
                  Let's explore how Old School GmbH can help.
                </p>
                
                {/* LinkedIn Button */}
                <a
                  href="https://linkedin.com/in/berndlapp"
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label="Connect with Bernd Lapp on LinkedIn"
                  className="inline-flex items-center justify-center w-full lg:w-auto bg-accent-gold text-charcoal px-8 py-4 rounded-lg font-semibold hover:bg-accent-gold/90 transition-all duration-300 hover:scale-105 shadow-lg"
                >
                  <svg className="w-5 h-5 mr-3" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z"/>
                  </svg>
                  Connect on LinkedIn
                </a>

                {/* Email CTA */}
                <a
                  href="mailto:bernd@oldschool.ag"
                  className="block w-full lg:w-auto text-center bg-transparent border-2 border-blueprint-blue text-blueprint-blue px-8 py-4 rounded-lg font-semibold hover:bg-blueprint-blue hover:text-ivory transition-all duration-300"
                >
                  bernd@oldschool.ag
                </a>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
} 