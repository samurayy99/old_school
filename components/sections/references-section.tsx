// app/components/sections/references-section.tsx

export function ReferencesSection() {
  const logos = [
    { src: "/logos/eth-diamond-purple.svg", alt: "Ethereum", href: "https://ethereum.org/" },
    { src: "/logos/lisk-wordmark-b.svg", alt: "Lisk", href: "https://lisk.com/" },
    { src: "/logos/near-protocol-near-logo.svg", alt: "NEAR Protocol", href: "https://near.org/" },
    { src: "/logos/Casper_Wordmark_Horizontal_Black_RGB.png", alt: "CasperLabs", href: "https://casper.network/" },
    { src: "/logos/ava.do-logo.svg", alt: "AVADO", href: "https://ava.do/" },
    { src: "/logos/01 Internet Computer Logo 2 lines horizontal HEX.svg", alt: "DFINITY / Internet Computer", href: "https://internetcomputer.org/" },
  ];

  return (
    <section className="py-20 bg-ivory relative">
      {/* Optional: Blueprint Grid as bg */}
      <div className="absolute inset-0 opacity-5 pointer-events-none">
        {/* Hier kann die Blueprint-Grid-Komponente eingefügt werden, falls gewünscht */}
      </div>

      <div className="relative z-10">
        <h2 className="text-center text-3xl md:text-4xl font-serif font-bold mb-12 text-charcoal">
          In good company
        </h2>
        <div className="grid grid-cols-2 sm:grid-cols-4 lg:grid-cols-7 gap-x-6 gap-y-10 items-center justify-items-center">
          {logos.map((logo) => (
            <a
              key={logo.alt}
              href={logo.href}
              target="_blank"
              rel="noopener noreferrer"
              className="flex justify-center items-center"
            >
              <img
                src={logo.src}
                alt={logo.alt}
                className="max-h-10 sm:max-h-12 w-auto filter grayscale opacity-60 hover:filter-none hover:opacity-100 hover:scale-110 transition-all duration-300"
                loading="lazy"
              />
            </a>
          ))}
        </div>
      </div>
    </section>
  );
} 