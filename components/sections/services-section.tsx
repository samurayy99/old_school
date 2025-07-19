export function ServicesSection() {
  const services = [
    {
      id: 'service_01_evaluation.sh',
      title: 'Blockchain Investment Evaluation',
      items: [
        'Technical feasibility reviews',
        'Tokenomics & economic model validation',
        'Team and roadmap assessment',
        'Smart contract and codebase audits'
      ]
    },
    {
      id: 'service_02_advisory.sh',
      title: 'Portfolio Support & Advisory',
      items: [
        'Assess progress and performance',
        'Identify technical or strategic gaps',
        'Coach founding teams',
        'Restructure token models or roadmaps'
      ]
    },
    {
      id: 'service_03_development.sh',
      title: 'Custom Blockchain & AI Development',
      items: [
        'Smart contracts and decentralized protocols',
        'AI-integrated dApps',
        'Proof of Stake and validator infrastructure',
        'Wallets, token launch platforms, and DAOs'
      ]
    },
    {
      id: 'service_04_strategy.sh',
      title: 'Strategic Advisory on Emerging Trends',
      items: [
        'AI x Blockchain convergence',
        'DePIN (decentralized physical infrastructure networks)',
        'Restaking and modular security',
        'Zero-knowledge proofs'
      ]
    }
  ];

  return (
    <section className="py-16 lg:py-24 bg-ivory relative overflow-hidden">
      {/* Subtile Blueprint-Gitter-Textur im Hintergrund */}
      <div className="absolute inset-0 opacity-5">
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
        {/* Sektion-Header */}
        <div className="text-center mb-16">
          <h2 className="text-4xl lg:text-5xl font-serif text-charcoal mb-4">
            What We Offer
          </h2>
          <p className="text-lg text-brand-gray max-w-2xl mx-auto">
            Expert blockchain and AI services from the heart of Crypto Valley
          </p>
        </div>

        {/* Services Grid - 2x2 Desktop/Tablet, gestapelt Mobile */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 lg:gap-12 max-w-6xl mx-auto">
          {services.map((service, index) => (
            <ServiceCard key={index} service={service} />
          ))}
        </div>
      </div>
    </section>
  );
}

// Einzelne Service-Karte Komponente
function ServiceCard({ service }: { service: { id: string; title: string; items: string[] } }) {
  return (
    <div className="group relative bg-charcoal rounded-lg border border-brand-gray-dark p-6 transition-all duration-300 hover:shadow-2xl hover:shadow-blueprint-blue/20 hover:-translate-y-1">
      {/* Terminal Header mit macOS-Buttons */}
      <div className="flex items-center mb-6">
        {/* macOS Traffic Light Buttons */}
        <div className="flex items-center space-x-2">
          <div className="w-3 h-3 rounded-full bg-red-500"></div>
          <div className="w-3 h-3 rounded-full bg-terminal-amber"></div>
          <div className="w-3 h-3 rounded-full bg-terminal-green"></div>
        </div>
        
        {/* Terminal Titel */}
        <span className="ml-4 text-brand-gray-light font-mono text-sm">
          // {service.id}
        </span>
      </div>

      {/* Service-Überschrift */}
      <h3 className="text-xl lg:text-2xl font-serif text-ivory mb-6 leading-tight">
        {service.title}
      </h3>

      {/* Leistungsliste */}
      <ul className="space-y-3">
        {service.items.map((item, index) => (
          <li key={index} className="flex items-start">
            {/* Terminal-Green Pfeil */}
            <span className="text-terminal-green mr-3 mt-0.5 font-mono">
              &gt;
            </span>
            {/* Leistungstext */}
            <span className="text-brand-gray-light font-sans leading-relaxed">
              {item}
            </span>
          </li>
        ))}
      </ul>

      {/* Hover-Glow-Effekt */}
      <div className="absolute inset-0 rounded-lg opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none">
        <div className="absolute inset-0 rounded-lg ring-2 ring-blueprint-blue/30 ring-offset-2 ring-offset-ivory"></div>
      </div>
    </div>
  );
} 