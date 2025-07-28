"use client";

import { cn } from "@/lib/utils";
import { motion, useScroll, useSpring, useTransform } from "framer-motion";
import React, { useEffect, useRef, useState } from "react";

export const TracingBeam = ({
  children,
  className,
}: {
  children: React.ReactNode;
  className?: string;
}) => {
  const ref = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start start", "end start"],
  });

  const contentRef = useRef<HTMLDivElement>(null);
  const [svgHeight, setSvgHeight] = useState(0);

  useEffect(() => {
    if (contentRef.current) {
      setSvgHeight(contentRef.current.offsetHeight);
    }
  }, []);

  // Erzeugt einen weichen "Lag"-Effekt für die Beam-Animation
  const y1 = useSpring(useTransform(scrollYProgress, [0, 0.8], [50, svgHeight]), {
    stiffness: 500,
    damping: 90,
  });
  const y2 = useSpring(useTransform(scrollYProgress, [0, 1], [50, svgHeight - 200]), {
    stiffness: 500,
    damping: 90,
  });

  return (
    <motion.div
      ref={ref}
      className={cn("relative w-full max-w-4xl mx-auto h-full", className)}
    >
      {/* Der vertikale Beam auf der linken Seite */}
      <div className="absolute top-0 -left-4 md:-left-20 h-full">
        <svg
          viewBox={`0 0 20 ${svgHeight}`}
          width="20"
          height={svgHeight}
          className="ml-4 block"
          aria-hidden="true"
        >
          {/* Der statische, graue Pfad im Hintergrund */}
          <motion.path
            d={`M 1 0V ${svgHeight}`}
            fill="none"
            stroke="rgba(245, 245, 243, 0.1)" // ivory/10
            strokeWidth="1.5"
          />
          
          {/* Der animierte, leuchtende Pfad */}
          <motion.path
            d={`M 1 0V ${svgHeight}`}
            fill="none"
            stroke="url(#gradient)"
            strokeWidth="1.5"
            className="motion-reduce:hidden"
          />
          <defs>
            <motion.linearGradient
              id="gradient"
              gradientUnits="userSpaceOnUse"
              x1="0"
              x2="0"
              y1={y1}
              y2={y2}
            >
              {/* Farbverlauf in unserer Markenfarbe accent-gold */}
              <stop stopColor="#D4AF37" stopOpacity="0" />
              <stop stopColor="#D4AF37" />
              <stop offset="0.325" stopColor="#D4AF37" />
              <stop offset="1" stopColor="#D4AF37" stopOpacity="0" />
            </motion.linearGradient>
          </defs>
        </svg>
      </div>
      <div ref={contentRef}>{children}</div>
    </motion.div>
  );
};