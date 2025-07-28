"use client";

import { cn } from "@/lib/utils";
import { motion, useReducedMotion } from "framer-motion";
import React from "react";

type Props = {
  href: string;
  alt: string;
  isActive: boolean;
  onActivate: () => void;       // hover/tap setzt aktiv
  onDeactivate: () => void;     // mouseleave / blur
  children: React.ReactNode;    // SVG (nutzt currentColor) ODER <Image/>
  isBitmap?: boolean;           // PNG/JPG? -> kann nicht via currentColor gefärbt werden
  className?: string;
};

export function LogoBadge({
  href,
  alt,
  isActive,
  onActivate,
  onDeactivate,
  children,
  isBitmap = false,
  className,
}: Props) {
  const reduce = useReducedMotion();

  const variants = {
    idle: {
      opacity: 0.6,
      scale: 1,
      filter: "blur(1px)",
      z: 0,
    },
    active: {
      opacity: 1,
      scale: 1.08,
      filter: "blur(0px)",
      z: 24,
    },
  } as const;

  // Farb-Handling:
  // - SVGs nutzen currentColor -> wir färben über text-*
  // - Bitmaps (PNG) können wir nicht einfärben; wir machen sie im Light schwarz (brightness-0)
  //   und im Dark weiß (dark:invert), plus Fokus-Glow/Ring.
  const colorClass = isBitmap
    ? cn(
        // Bitmaps werden via Filter einheitlich behandelt
        isActive ? "grayscale-0" : "grayscale",
        "dark:invert",
        isActive ? "opacity-100" : "opacity-60"
      )
    : cn(
        // SVG via currentColor & grayscale Filter
        isActive ? "grayscale-0" : "grayscale",
        isActive
          ? "text-brand dark:text-ivory"
          : "text-charcoal/60 dark:text-ivory/60"
      );

  return (
    <motion.a
      href={href}
      target="_blank"
      rel="noopener noreferrer"
      aria-label={`${alt} - open website`}
      aria-pressed={isActive}
      onMouseEnter={onActivate}
      onMouseLeave={onDeactivate}
      onFocus={onActivate}
      onBlur={onDeactivate}
      onPointerDown={onActivate} // Tap auf Mobile
      onPointerCancel={onDeactivate}
      onPointerLeave={onDeactivate}
      className={cn(
        "group relative flex items-center justify-center p-4 outline-none focus-visible:ring-2 focus-visible:ring-brand focus-visible:ring-offset-2 focus-visible:ring-offset-ivory dark:focus-visible:ring-offset-black",
        // Glow / Ring im Fokuszustand (für beide Medientypen)
        isActive
          ? "drop-shadow-[0_0_18px_rgba(13,126,127,0.45)]"
          : "drop-shadow-none",
        className
      )}
      style={{ transformStyle: "preserve-3d" }}
      variants={variants}
      animate={isActive ? "active" : "idle"}
      transition={
        reduce
          ? { duration: 0 }
          : { type: "spring", stiffness: 220, damping: 18, mass: 0.6 }
      }
    >
      {/* Wrapper, damit wir die Farbklassen sauber setzen können */}
      <span className={cn(colorClass, "flex items-center justify-center")}>
        {children}
      </span>
    </motion.a>
  );
}
