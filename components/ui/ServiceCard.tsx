// components/ui/ServiceCard.tsx
"use client";

import { Service } from "@/lib/services";
import { cn } from "@/lib/utils";
import { motion, useReducedMotion } from "framer-motion";
import Image from "next/image";
import { useCallback, useState } from "react";

type Props = Service & {
  open: boolean;
  setOpen: (id: string | null) => void;
  className?: string;
};

export default function ServiceCard(props: Props) {
  const { id, title, image, alt, copy, open, setOpen, className } = props;
  const reduce = useReducedMotion();
  const [hasFocus, setHasFocus] = useState(false);

  const toggle = useCallback(() => {
    setOpen(open ? null : id);
  }, [open, id, setOpen]);

  const onKeyDown = (e: React.KeyboardEvent<HTMLButtonElement>) => {
    if (e.key === "Enter" || e.key === " ") {
      e.preventDefault();
      toggle();
    }
    if (e.key === "Escape") {
      setOpen(null);
    }
  };

  // Flip vs. Expand (reduced motion)
  const flipStyle = reduce
    ? undefined
    : {
        transformStyle: "preserve-3d" as const,
      };

  const frontHidden = reduce ? (open ? "pointer-events-none opacity-0" : "") : "";
  const backStyle = reduce ? {} : { transform: "rotateY(180deg)" };
  const containerAnimate = reduce
    ? { height: open ? "auto" : "400px", scale: open ? 1.01 : 1 }
    : { rotateY: open ? 180 : 0 };

  return (
    <div className={cn("relative w-full perspective", className)}>
      <motion.div
        aria-hidden={false}
        animate={containerAnimate}
        transition={{ duration: 0.7, ease: [0.32, 0.72, 0, 1] }}
        className={cn(
          "relative h-[400px] w-full rounded-2xl shadow-xl will-change-transform",
          "sm:h-[420px]", // Slightly taller on larger mobile
          reduce && "h-auto"
        )}
        style={flipStyle}
      >
        {/* FRONT */}
        <button
          type="button"
          onClick={toggle}
          onKeyDown={onKeyDown}
          onFocus={() => setHasFocus(true)}
          onBlur={() => setHasFocus(false)}
          aria-expanded={open}
          aria-label={`${title} - open details`}
          className={cn(
            "absolute inset-0 backface-hidden overflow-hidden rounded-2xl text-left",
            "focus:outline-none focus-visible:ring-2 focus-visible:ring-brand/60",
            frontHidden
          )}
        >
          <div className="absolute inset-0">
            <Image
              src={image}
              alt={alt}
              fill
              priority={false}
              sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 600px"
              className={`object-cover transition-all duration-500 ${
                image.includes('evaluation') ? 'object-[center_20%]' :
                image.includes('strategy') ? 'object-[center_35%]' :
                'object-center'
              }`}
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/40 to-transparent" />
          </div>

          <div className="absolute inset-0 p-4 sm:p-6 flex flex-col">
            <h3 className="mt-auto font-lora text-xl sm:text-2xl lg:text-[clamp(1.4rem,2.6vw,2rem)] leading-tight text-ivory balance">
              {title}
            </h3>

            <div className="mt-3 flex items-center gap-2 text-ivory/80">
              <span className="text-sm font-medium">Learn more</span>
              <svg
                className={cn(
                  "h-4 w-4 transition-transform",
                  (hasFocus || open) && "translate-x-0.5"
                )}
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
              >
                <path strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" d="M9 5l7 7-7 7" />
              </svg>
            </div>
          </div>
        </button>

        {/* BACK */}
        <div
          className={cn(
            "absolute inset-0 rounded-2xl overflow-hidden backface-hidden",
            "bg-charcoal text-ivory"
          )}
          style={backStyle}
          aria-hidden={!open && !reduce} // bei Flip ist Rückseite unsichtbar wenn zu
        >
          {/* faint image overlay */}
          <div className="absolute inset-0">
            <Image
              src={image}
              alt=""
              fill
              sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 600px"
              className={`object-cover scale-110 opacity-10 transition-all duration-500 ${
                image.includes('evaluation') ? 'object-[center_30%]' :
                image.includes('strategy') ? 'object-[center_40%]' :
                'object-center'
              }`}
              priority={false}
            />
            <div className="absolute inset-0 bg-black/30" />
          </div>

          <div className="relative z-10 flex h-full flex-col p-4 sm:p-6">
            <div className="flex items-start justify-between mb-6 sm:mb-8">
              <h3 className="font-lora text-lg sm:text-xl lg:text-[clamp(1.35rem,2.3vw,1.9rem)] leading-tight text-brand pr-4">
                {title}
              </h3>
              <button
                type="button"
                onClick={() => setOpen(null)}
                className="text-ivory/60 hover:text-ivory transition-colors p-1 hover:bg-ivory/10 rounded-full flex-shrink-0"
                aria-label="Close details"
              >
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                </svg>
              </button>
            </div>

            <div className="space-y-4 sm:space-y-6 text-sm sm:text-base lg:text-[clamp(1rem,1.1vw,1.1rem)] leading-relaxed text-ivory/90">
              {copy.map((p) => (
                <p key={p} className="prose-smooth">
                  {p}
                </p>
              ))}
            </div>
          </div>
        </div>
      </motion.div>
    </div>
  );
} 