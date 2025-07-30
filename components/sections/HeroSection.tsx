/* HeroSection.tsx – orchestrated version with mobile optimization */
"use client";

import { AnimatedLogo } from "@/components/ui/AnimatedLogo";
import { motion, useAnimationControls, Variants } from "framer-motion";
import { useEffect, useState } from "react";

export function HeroSection() {
  /* local flag: logo finished */
  const [logoDone, setLogoDone] = useState(false);
  const [isMobile, setIsMobile] = useState(false);

  /* animation controls for title & motto */
  const titleCtrl = useAnimationControls();
  const mottoCtrl = useAnimationControls();

  /* Mobile detection */
  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth < 768);
    };
    checkMobile();
    window.addEventListener('resize', checkMobile);
    return () => window.removeEventListener('resize', checkMobile);
  }, []);

  /* kick off title → motto once logo is done with mobile optimization */
  useEffect(() => {
    if (logoDone) {
      titleCtrl.start("show");
      // Mobile: 30% faster delays (Grok-4 optimization)
      const mottoDelay = isMobile ? 140 : 200;
      setTimeout(() => mottoCtrl.start("show"), mottoDelay);
    }
  }, [logoDone, titleCtrl, mottoCtrl, isMobile]);

  /* simple fade-up variant */
  const rise: Variants = {
    hidden: { y: 24, opacity: 0 },
    show: { y: 0, opacity: 1, transition: { duration: 0.8, ease: "easeOut" } },
  };

  return (
    <section className="relative isolate flex h-screen min-h-[100dvh] w-full items-center justify-center overflow-hidden px-4 md:px-8 pt-12">
      {/* Removed gradient overlay - was causing gray top in light mode */}

      {/* Content container - VERTICAL STACK */}
      <div className="z-10 flex flex-col items-center text-center">
        {/* 1. animated logo */}
        <AnimatedLogo onComplete={() => setLogoDone(true)} />

        {/* 2. title */}
        <motion.h1
          variants={rise}
          initial="hidden"
          animate={titleCtrl}
          className="mt-8 lg:mt-10 font-logo text-6xl tracking-tight text-charcoal dark:text-ivory sm:text-7xl md:text-8xl lg:text-9xl xl:text-9xl"
        >
          OLDSCHOOL
        </motion.h1>

        {/* 3. motto */}
        <motion.p
          variants={rise}
          initial="hidden"
          animate={mottoCtrl}
          className="mt-3 lg:mt-4 font-mono text-sm uppercase tracking-[0.3em] text-brand dark:text-brand sm:text-base"
        >
          New&nbsp;Tech&nbsp;|&nbsp;Traditional&nbsp;Values
        </motion.p>
      </div>
    </section>
  );
}