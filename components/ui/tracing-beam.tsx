"use client";

import { cn } from "@/lib/utils";
import {
  motion,
  useScroll,
  useSpring,
  useTransform,
} from "framer-motion";
import React, { useEffect, useRef, useState } from "react";

// Farben aus Tailwind-Konfiguration
const BASE_COLOR = "#3a7ca5"; // blueprint-blue
const HIGHLIGHT_COLOR = "#D4AF37"; // accent-gold
const END_COLOR = "#00ff41"; // terminal-green

export const TracingBeam = ({
  children,
  className,
}: {
  children: React.ReactNode;
  className?: string;
}) => {
  /*
    STRUKTUR
    ┌───────────────────────────────────────────────────────────┐
    │ motion.div (containerRef)                                │
    │   ├─ Beam (absolute im linken Margin)                    │
    │   └─ Content (max-w-6xl, zentriert)                      │
    └───────────────────────────────────────────────────────────┘
  */

  const containerRef = useRef<HTMLDivElement>(null); // Für Scroll-Tracking
  const contentRef = useRef<HTMLDivElement>(null); // Für Höhenmessung

  // Scroll-Progress von 0 (Top) bis 1 (Bottom ‑ Viewport Top erreicht Container Bottom)
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end start"],
  });

  // Dynamische SVG-Höhe
  const [svgHeight, setSvgHeight] = useState(0);
  useEffect(() => {
    const updateHeight = () => {
      if (!contentRef.current) return;
      setSvgHeight(contentRef.current.offsetHeight);
    };

    updateHeight(); // initial

    // Beobachte Content-Größe (reagiert auf lazy-geladene Bilder etc.)
    const resizeObserver = new ResizeObserver(updateHeight);
    if (contentRef.current) resizeObserver.observe(contentRef.current);

    window.addEventListener("resize", updateHeight);
    return () => {
      resizeObserver.disconnect();
      window.removeEventListener("resize", updateHeight);
    };
  }, []);

  // Sanftes Gleiten des Gradients
  const y1 = useSpring(useTransform(scrollYProgress, [0, 0.8], [50, svgHeight]), {
    stiffness: 500,
    damping: 90,
  });
  const y2 = useSpring(
    useTransform(scrollYProgress, [0, 1], [50, Math.max(0, svgHeight - 200)]),
    {
      stiffness: 500,
      damping: 90,
    }
  );

  // Punkt-Farbe und Shadow abhängig vom Scroll-Start
  const dotColor = useTransform(scrollYProgress, [0, 0.05], [BASE_COLOR, HIGHLIGHT_COLOR]);
  const dotShadow = useTransform(
    scrollYProgress,
    [0, 0.05],
    [
      "0 0 10px rgba(212, 175, 55, 0.2)",
      "0 0 20px rgba(212, 175, 55, 0.4)",
    ]
  );

  return (
    <motion.div
      ref={containerRef}
      className={cn("relative w-full", className)}
    >
      {/* ========== BEAM ========== */}
      <div className="absolute top-3 left-0 z-20 flex flex-col items-center">
        {/* Start-Dot */}
        <motion.div
          style={{ boxShadow: dotShadow }}
          className="ml-[27px] flex h-4 w-4 items-center justify-center rounded-full border-2 border-accent-gold/40 bg-charcoal shadow-sm"
        >
          <motion.div
            style={{ backgroundColor: dotColor, borderColor: dotColor }}
            className="h-2 w-2 rounded-full border-2"
          />
        </motion.div>

        {/* Linien-SVG */}
        <svg
          viewBox={`0 0 20 ${svgHeight}`}
          width={20}
          height={svgHeight}
          className="ml-4 block"
          aria-hidden="true"
        >
          {/* Grundlinie */}
          <motion.path
            d={`M 1 0V -36 l 18 24 V ${svgHeight * 0.8} l -18 24V ${svgHeight}`}
            fill="none"
            stroke={BASE_COLOR}
            strokeOpacity={0.16}
            strokeWidth={2}
          />

          {/* Farbverlauf */}
          <motion.path
            d={`M 1 0V -36 l 18 24 V ${svgHeight * 0.8} l -18 24V ${svgHeight}`}
            fill="none"
            stroke="url(#oldschool-tracing-gradient)"
            strokeWidth={3}
            className="motion-reduce:hidden"
          />

          <defs>
            <motion.linearGradient
              id="oldschool-tracing-gradient"
              gradientUnits="userSpaceOnUse"
              x1="0"
              x2="0"
              y1={y1}
              y2={y2}
            >
              <stop stopColor={HIGHLIGHT_COLOR} stopOpacity={0} />
              <stop stopColor={HIGHLIGHT_COLOR} />
              <stop offset={0.325} stopColor={BASE_COLOR} />
              <stop offset={1} stopColor={END_COLOR} stopOpacity={0} />
            </motion.linearGradient>
          </defs>
        </svg>
      </div>

      {/* ========== CONTENT (zentriert) ========== */}
      <div
        ref={contentRef}
        className="max-w-6xl mx-auto pl-12 pr-4 lg:pl-20 grid grid-cols-1"
      >
        {children}
      </div>
    </motion.div>
  );
}; 