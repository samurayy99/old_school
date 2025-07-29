"use client";

import { LogoBadge } from "@/components/ui/LogoBadge";
import { motion, useReducedMotion } from "framer-motion";
import { useTheme } from "next-themes";
import { useEffect, useState } from "react";

type LogoItem = {
  alt: string;
  href: string;
  src: string;
  darkModeFilter?: string; // CSS filter for dark mode
};

const logos: LogoItem[] = [
  { 
    src: "/logos/ethereum", 
    alt: "Ethereum", 
    href: "https://ethereum.org/",
    darkModeFilter: "invert(1) brightness(1)" // Clean invert for dark logos
  },
  { 
    src: "/logos/lisk", 
    alt: "Lisk", 
    href: "https://lisk.com/",
    darkModeFilter: "invert(1) brightness(1)"
  },
  { 
    src: "/logos/near", 
    alt: "NEAR Protocol", 
    href: "https://near.org/",
    darkModeFilter: "invert(1) brightness(1)"
  },
  {
    src: "/logos/casper",
    alt: "Casper Network",
    href: "https://casper.network/",
    darkModeFilter: "invert(1) brightness(1)"
  },
  {
    src: "/logos/proxeus",
    alt: "Proxeus",
    href: "https://proxeus.com/",
    darkModeFilter: "invert(1) brightness(1)"
  },
  { 
    src: "/logos/avado", 
    alt: "AVADO", 
    href: "https://ava.do/",
    darkModeFilter: "" // Handled specially in LogoImage component
  },
  {
    src: "/logos/swarm-city",
    alt: "Swarm City",
    href: "https://swarm.city/",
    darkModeFilter: "invert(1) brightness(1)" // Clean invert for the new logo
  },
];

function LogoImage({ src, alt, darkModeFilter }: { 
  src: string; 
  alt: string; 
  darkModeFilter?: string;
}) {
  const { resolvedTheme } = useTheme();
  const [mounted, setMounted] = useState(false);
  const [imageFormat, setImageFormat] = useState<'png' | 'svg' | null>(null);
  const [imageLoaded, setImageLoaded] = useState(false);

  useEffect(() => {
    setMounted(true);
    
    // Detect image format by trying to load different extensions
    const checkImageFormat = async () => {
      // First try PNG
      const pngImage = new Image();
      pngImage.onload = () => {
        setImageFormat('png');
        setImageLoaded(true);
      };
      pngImage.onerror = () => {
        // If PNG fails, try SVG
        const svgImage = new Image();
        svgImage.onload = () => {
          setImageFormat('svg');
          setImageLoaded(true);
        };
        svgImage.onerror = () => {
          console.warn(`Could not load logo: ${src}`);
        };
        svgImage.src = `${src}.svg`;
      };
      pngImage.src = `${src}.png`;
    };

    checkImageFormat();
  }, [src]);

  if (!mounted || !imageLoaded) {
    return (
      <div className="logo-container relative w-48 h-20 sm:w-52 sm:h-22 md:w-56 md:h-24 lg:w-60 lg:h-26 xl:w-64 xl:h-28 flex items-center justify-center">
        <div className="w-32 h-16 bg-gray-200 dark:bg-gray-700 animate-pulse rounded" />
      </div>
    );
  }

  const logoSrc = `${src}.${imageFormat}`;
  const isDark = resolvedTheme === 'dark';
  
  // Apply CSS filters for dark mode
  const filterStyle = isDark && darkModeFilter ? { filter: darkModeFilter } : {};
  
  // Special handling for Swarm City - show symbol + custom text
  const isSwarmCity = src.includes('swarm-city');
  
  // Special handling for AVADO - different filters for light/dark mode
  const isAvado = src.includes('avado');
  
  if (isSwarmCity) {
    return (
      <div className="logo-container relative w-48 h-20 sm:w-52 sm:h-22 md:w-56 md:h-24 lg:w-60 lg:h-26 xl:w-64 xl:h-28 flex flex-col items-center justify-center">
        {/* Infinity Symbol */}
        <div className="flex items-center justify-center h-3/4">
          <img
            src={logoSrc}
            alt={alt}
            className="max-w-full max-h-full object-contain transition-all duration-300 hover:scale-105"
            loading="lazy"
            style={{
              width: 'auto',
              height: 'auto',
              ...filterStyle
            }}
            onError={(e) => {
              console.warn(`Failed to load logo: ${logoSrc}`);
              e.currentTarget.src = `/logos/${src.split('/').pop()}.png`;
            }}
          />
        </div>
        {/* Custom Text - closer to symbol */}
        <div className="text-center h-1/4 flex items-start justify-center pt-1">
          <span className="text-sm font-semibold text-charcoal dark:text-ivory transition-colors duration-300">
            swarm.city
          </span>
        </div>
      </div>
    );
  }
  
  // Special handling for AVADO - custom light/dark mode filters
  if (isAvado) {
    const avadoFilterStyle = isDark 
      ? {} // Keep original in dark mode
      : { filter: "brightness(0.3) contrast(1.2)" }; // Darken significantly for light mode
    
    return (
      <div className="logo-container relative w-48 h-20 sm:w-52 sm:h-22 md:w-56 md:h-24 lg:w-60 lg:h-26 xl:w-64 xl:h-28 flex items-center justify-center">
        <img
          src={logoSrc}
          alt={alt}
          className="max-w-full max-h-full object-contain transition-all duration-300 hover:scale-105"
          loading="lazy"
          style={{
            width: 'auto',
            height: 'auto',
            ...avadoFilterStyle
          }}
          onError={(e) => {
            console.warn(`Failed to load logo: ${logoSrc}`);
            e.currentTarget.src = `/logos/${src.split('/').pop()}.png`;
          }}
        />
      </div>
    );
  }
  
  return (
    <div className="logo-container relative w-48 h-20 sm:w-52 sm:h-22 md:w-56 md:h-24 lg:w-60 lg:h-26 xl:w-64 xl:h-28 flex items-center justify-center">
      <img
        src={logoSrc}
        alt={alt}
        className="max-w-full max-h-full object-contain transition-all duration-300 hover:scale-105"
        loading="lazy"
        style={{
          width: 'auto',
          height: 'auto',
          ...filterStyle
        }}
        onError={(e) => {
          console.warn(`Failed to load logo: ${logoSrc}`);
          // Fallback to original naming convention
          e.currentTarget.src = `/logos/${src.split('/').pop()}.png`;
        }}
      />
    </div>
  );
}

export function ReferencesSection() {
  const [active, setActive] = useState<number | null>(null);
  const reduce = useReducedMotion();

  // Touch: Tap erneut -> reset
  const handleActivate = (i: number) =>
    setActive((curr) => (curr === i ? null : i));

  return (
    <section
      id="references"
      className="relative isolate pt-24 sm:pt-28 lg:pt-32 xl:pt-36 pb-20 sm:pb-24 lg:pb-28 xl:pb-32 bg-ivory dark:bg-black text-charcoal dark:text-ivory overflow-hidden"
    >
      <div className="relative z-10 mx-auto max-w-7xl px-4 sm:px-8 text-center">
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, ease: "easeOut" }}
          viewport={{ once: true }}
          className="text-center"
        >
          <p className="font-mono text-sm tracking-widest text-brand/80 mb-3 lg:mb-4">REFERENCES</p>
          <div className="flex items-center justify-center mt-3 lg:mt-4">
            <div className="w-8 h-0.5 bg-brand mr-4"></div>
            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-lora font-medium tracking-tight">
              Trusted by Pioneers
            </h2>
            <div className="w-8 h-0.5 bg-brand ml-4"></div>
          </div>
        </motion.div>

        <motion.div
          className="mt-16 sm:mt-20 lg:mt-24 xl:mt-28 mx-auto w-full max-w-6xl px-4 sm:px-6 lg:px-8 flex flex-wrap justify-center items-center gap-x-4 sm:gap-x-6 md:gap-x-8 gap-y-6 sm:gap-y-8 lg:gap-y-10"
          style={{ perspective: "1000px" }}
          onMouseLeave={() => setActive(null)}
          {...(!reduce && {
            animate: {
              rotate: [0, 1.5, -1.5, 0],
              y: [0, -4, 4, 0],
            },
            transition: {
              duration: 25,
              repeat: Infinity,
              ease: "linear",
            }
          })}
        >
          {logos.map((logo, i) => {
            const isActive = active === i;
            return (
              <LogoBadge
                key={logo.alt}
                href={logo.href}
                alt={logo.alt}
                isActive={isActive}
                onActivate={() => handleActivate(i)}
                onDeactivate={() => setActive(null)}
              >
                <LogoImage
                  src={logo.src}
                  alt={logo.alt}
                  darkModeFilter={logo.darkModeFilter}
                />
              </LogoBadge>
            );
          })}
        </motion.div>
      </div>
    </section>
  );
}
