// components/sections/services-section.tsx
"use client";

import ServiceCard from "@/components/ui/ServiceCard";
import { services } from "@/lib/services";
import { motion, useInView, Variants } from "framer-motion";
import { useEffect, useRef, useState } from "react";

export function ServicesSection() {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, amount: 0.1 });
  const [openId, setOpenId] = useState<string | null>(null);

  // ESC global schließen (nur wenn eine Karte offen)
  useEffect(() => {
    if (!openId) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") setOpenId(null);
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [openId]);

  const container: Variants = {
    hidden: {},
    show: { transition: { staggerChildren: 0.12 } },
  };

  return (
    <section
      id="services"
      ref={ref}
      className="relative pt-16 sm:pt-20 lg:pt-24 xl:pt-28 pb-20 sm:pb-24 lg:pb-28 xl:pb-32 bg-ivory dark:bg-black text-charcoal dark:text-ivory overflow-hidden"
    >
      <div className="relative mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        {/* Heading */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
          className="mb-24 text-center"
        >
          <p className="font-mono text-sm tracking-widest text-brand/80 text-center mb-3 lg:mb-4">SERVICES</p>
          <div className="flex items-center justify-center mb-8 lg:mb-10">
            <div className="w-8 h-0.5 bg-brand mr-4"></div>
            <h2 className="font-lora text-3xl sm:text-4xl lg:text-5xl balance tracking-tight">
              Our Expertise
            </h2>
            <div className="w-8 h-0.5 bg-brand ml-4"></div>
          </div>
          <p className="text-lg sm:text-xl lg:text-2xl text-charcoal/70 dark:text-ivory/60 max-w-3xl mx-auto balance leading-relaxed">
            From AI to blockchain, we deliver clarity, strategy, and execution across emerging technologies.
          </p>
        </motion.div>

        {/* Grid */}
        <motion.div
          variants={container}
          initial="hidden"
          animate={inView ? "show" : "hidden"}
          className="grid grid-cols-1 md:grid-cols-2 gap-6 sm:gap-8 lg:gap-12"
        >
          {services.map((s) => (
            <motion.div
              key={s.id}
              variants={{
                hidden: { opacity: 0, y: 40, scale: 0.98 },
                show: { opacity: 1, y: 0, scale: 1, transition: { duration: 0.7, ease: [0.16, 1, 0.3, 1] } },
              }}
            >
              <ServiceCard
                {...s}
                open={openId === s.id}
                setOpen={setOpenId}
              />
            </motion.div>
          ))}
        </motion.div>
      </div>
      
      {/* Elegant separator */}
      <div className="relative">
        <div className="absolute inset-0 flex items-center justify-center">
          <div className="w-16 h-px bg-gradient-to-r from-transparent via-brand/20 to-transparent"></div>
        </div>
      </div>
    </section>
  );
}
