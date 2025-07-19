export function FooterSection() {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="bg-charcoal text-terminal-green relative overflow-hidden">
      {/* Terminal-style background grid */}
      <div className="absolute inset-0 opacity-10">
        <div className="grid grid-cols-8 sm:grid-cols-12 lg:grid-cols-16 h-full">
          {Array.from({ length: 128 }).map((_, i) => (
            <div key={i} className="border-r border-terminal-green/20 h-full" />
          ))}
        </div>
      </div>

      {/* Oberer CTA-Bereich */}
      <div className="relative z-10 py-16 lg:py-24">
        <div className="container mx-auto px-4 text-center">
          {/* Hauptheadline */}
          <h2 className="text-4xl lg:text-5xl xl:text-6xl font-serif text-ivory mb-6 leading-tight">
            Ready to shape the future together?
          </h2>

          {/* Sub-Text */}
          <p className="font-sans text-brand-gray-light text-lg lg:text-xl leading-relaxed max-w-3xl mx-auto mb-10">
            Whether investment, advisory, or a breakthrough project at the frontier of blockchain & AI — let's talk confidentially.
          </p>

          {/* Haupt-Button */}
          <div className="mb-8">
            <a
              href="mailto:bernd@oldschool.ag"
              className="inline-flex items-center bg-accent-gold text-charcoal px-8 py-4 lg:px-12 lg:py-6 rounded-lg font-bold text-lg lg:text-xl hover:bg-accent-gold/90 transition-all duration-300 hover:scale-105 hover:shadow-2xl hover:shadow-accent-gold/20"
            >
              Send Direct Message
            </a>
          </div>

          {/* Terminal-Prompt (Das OG-Detail) */}
          <div className="font-mono text-terminal-green text-sm lg:text-base">
            <span className="mr-2">&gt;</span>
            contact bernd@oldschool.ag
          </div>
        </div>
      </div>

      {/* Trennlinie */}
      <hr className="border-brand-gray-dark mx-4 lg:mx-8" />

      {/* Unterer Footer-Bereich */}
      <div className="relative z-10 py-12">
        <div className="container mx-auto px-4">
          {/* 3-spaltiges Grid */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 items-center text-center md:text-left">
            
            {/* Linke Spalte: Company Info */}
            <div className="text-brand-gray-light font-sans">
              <div className="font-semibold">Old School GmbH</div>
              <div>Zug, Switzerland</div>
            </div>

            {/* Mittlere Spalte: LinkedIn Icon */}
            <div className="flex justify-center">
              <a
                href="https://linkedin.com/in/berndlapp"
                target="_blank"
                rel="noopener noreferrer"
                aria-label="Connect with Bernd Lapp on LinkedIn"
                className="text-brand-gray-light hover:text-ivory transition-colors duration-300 hover:scale-110 transform"
              >
                <svg className="w-8 h-8 lg:w-10 lg:h-10" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z"/>
                </svg>
              </a>
            </div>

            {/* Rechte Spalte: Legal Links */}
            <div className="flex flex-col md:flex-row md:justify-end space-y-2 md:space-y-0 md:space-x-6 text-brand-gray-light font-sans">
              <a
                href="/impressum"
                className="hover:text-ivory transition-colors duration-300"
              >
                Impressum
              </a>
              <a
                href="/privacy"
                className="hover:text-ivory transition-colors duration-300"
              >
                Privacy Policy
              </a>
            </div>
          </div>

          {/* Copyright */}
          <div className="text-center text-brand-gray-light font-sans text-sm mt-12 pt-8 border-t border-brand-gray-dark">
            © {currentYear} Old School GmbH. All Rights Reserved.
          </div>
        </div>
      </div>
    </footer>
  );
} 