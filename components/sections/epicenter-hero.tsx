"use client";

import { WorldMap } from "@/components/ui/world-map";
import { Engine } from "@tsparticles/engine";
import Particles from "@tsparticles/react";
import { motion, useScroll, useTransform } from "framer-motion";
import { Inter, Lora } from "next/font/google";
import { useCallback, useRef } from "react";
import { loadFull } from "tsparticles";

const lora = Lora({ subsets: ["latin"], weight: ["400"] });
const inter = Inter({ subsets: ["latin"], weight: ["400"] });

export function EpicenterHero() {
  const containerRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end end"],
  });

  // Akt 2: Der filmische Zoom
  // Die Karte skaliert hoch und blendet aus, um einen Zoom-Effekt zu simulieren.
  const mapScale = useTransform(scrollYProgress, [0, 0.4], [1, 2.5]);
  const mapOpacity = useTransform(scrollYProgress, [0.2, 0.4], [1, 0]);

  // Die initialen Titel blenden mit der Karte aus.
  const initialTitlesOpacity = useTransform(scrollYProgress, [0.2, 0.4], [1, 0]);

  // Akt 3: Die Enthüllung des finalen Slogans
  // Der Slogan erscheint, nachdem die Bühne leer ist.
  const sloganOpacity = useTransform(scrollYProgress, [0.5, 0.7], [0, 1]);
  const sloganScale = useTransform(scrollYProgress, [0.5, 0.7], [0.9, 1]);

  const particlesInit = useCallback(async (engine: Engine) => {
    await loadFull(engine);
  }, []);

  return (
    <section ref={containerRef} className="relative w-full h-[250vh] bg-charcoal">
      <div className="sticky top-0 h-screen w-full overflow-hidden flex items-center justify-center">
        {/* Parallax Layer 1: Map Background (scales slower) */}
        <motion.div className="absolute inset-0" style={{ scale: useTransform(scrollYProgress, [0, 0.4], [1, 1.5]), opacity: mapOpacity }}>
          <WorldMap showBackgroundOnly={true} />
        </motion.div>

        {/* Parallax Layer 2: Connections (scales medium) */}
        <motion.div className="absolute inset-0" style={{ scale: mapScale, opacity: mapOpacity }}>
          <WorldMap showConnectionsOnly={true} />
        </motion.div>

        {/* Parallax Layer 3: Epicenter (scales faster, with particles) */}
        <motion.div className="absolute inset-0" style={{ scale: useTransform(scrollYProgress, [0, 0.4], [1, 3]), opacity: mapOpacity }}>
          <WorldMap showEpicenterOnly={true} />
          <Particles
            id="epicenter-particles"
            options={{
              particles: {
                number: { value: 50 },
                color: { value: ["#D4AF37", "#3a7ca5"] },
                shape: { type: "circle" },
                opacity: { value: 0.5 },
                size: { value: 3 },
                move: {
                  enable: true,
                  speed: 6,
                  direction: "none",
                  random: true,
                  outModes: { default: "out" },
                },
              },
              interactivity: { detectsOn: "canvas", modes: { push: { quantity: 4 } } },
              detectRetina: true,
            }}
            style={{ position: "absolute", top: 0, left: 0, width: "100%", height: "100%" }}
          />
        </motion.div>

        {/* Titles with custom easing */}
        <motion.div className="absolute text-center z-10 pointer-events-none" style={{ opacity: initialTitlesOpacity }}>
          <motion.h1
            className={`${lora.className} text-5xl md:text-7xl font-bold text-ivory`}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1, delay: 0.5, ease: [0.16, 1, 0.3, 1] }}
          >
            Old School
          </motion.h1>
          <motion.p
            className={`${inter.className} text-xl md:text-2xl text-ivory/80 mt-4`}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1, delay: 0.8, ease: [0.16, 1, 0.3, 1] }}
          >
            New Tech | Traditional Values
          </motion.p>
        </motion.div>

        <motion.div className="absolute inset-0 z-20 flex items-center justify-center pointer-events-none" style={{ opacity: sloganOpacity, scale: sloganScale }}>
          <h1 className={`${lora.className} text-5xl text-ivory text-center max-w-4xl leading-tight`}>
            Pioneering the decentralized world with strategic clarity.
          </h1>
        </motion.div>
      </div>
    </section>
  );
} 