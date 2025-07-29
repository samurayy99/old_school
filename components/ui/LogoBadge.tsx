"use client";

import { cn } from "@/lib/utils";
import { motion, useReducedMotion } from "framer-motion";
import React from "react";

type Props = {
  href: string;
  alt: string;
  isActive: boolean;
  onActivate: () => void;
  onDeactivate: () => void;
  children: React.ReactNode;
  className?: string;
};

export function LogoBadge({
  href,
  alt,
  isActive,
  onActivate,
  onDeactivate,
  children,
  className,
}: Props) {
  const reduce = useReducedMotion();

  const variants = {
    idle: {
      opacity: 1,
      scale: 1,
      z: 0,
    },
    active: {
      opacity: 1,
      scale: 1.12,
      z: 24,
    },
  } as const;

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
      onPointerDown={onActivate}
      onPointerCancel={onDeactivate}
      onPointerLeave={onDeactivate}
      className={cn(
        "group relative flex items-center justify-center p-1 sm:p-2 md:p-2 lg:p-2 xl:p-3 outline-none focus-visible:ring-2 focus-visible:ring-brand focus-visible:ring-offset-2 focus-visible:ring-offset-ivory dark:focus-visible:ring-offset-black rounded-lg transition-all duration-300",
        isActive
          ? "drop-shadow-[0_0_20px_rgba(13,126,127,0.6)] dark:drop-shadow-[0_0_20px_rgba(255,255,255,0.4)]"
          : "drop-shadow-none hover:drop-shadow-[0_0_12px_rgba(13,126,127,0.3)] dark:hover:drop-shadow-[0_0_12px_rgba(255,255,255,0.2)]",
        className
      )}
      style={{ transformStyle: "preserve-3d" }}
      variants={variants}
      animate={isActive ? "active" : "idle"}
      transition={
        reduce
          ? { duration: 0 }
          : { type: "spring", stiffness: 200, damping: 20, mass: 0.8 }
      }
    >
      {children}
    </motion.a>
  );
}
