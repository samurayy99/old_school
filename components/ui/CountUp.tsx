"use client";

import { animate, useInView } from "framer-motion";
import { useEffect, useMemo, useRef } from "react";

type Props = {
  value: number;              // Zielwert
  duration?: number;          // Sek.
  delay?: number;             // Sek. Startverzögerung
  decimals?: number;          // Nachkommastellen
  locale?: string;            // z.B. "en-US" | "de-CH"
  className?: string;
  onComplete?: () => void;
};

export function CountUp({
  value,
  duration = 3.2,
  delay = 0,
  decimals = 0,
  locale = "en-US",
  className,
  onComplete,
}: Props) {
  const ref = useRef<HTMLSpanElement>(null);
  const inView = useInView(ref, { once: true, amount: 0.5 });

  const formatter = useMemo(
    () =>
      new Intl.NumberFormat(locale, {
        minimumFractionDigits: decimals,
        maximumFractionDigits: decimals,
      }),
    [locale, decimals]
  );

  useEffect(() => {
    if (!inView || !ref.current) return;

    const node = ref.current;
    // Start bei 0; wenn gewünscht, könnte man hier einen prop `start` erlauben.
    const controls = animate(0, value, {
      duration,
      delay,
      ease: "easeOut",
      onUpdate(latest) {
        // Vermeidet Flackern, formatiert stabil
        const fixed = Number(latest.toFixed(decimals));
        node.textContent = formatter.format(fixed);
      },
      onComplete,
    });

    return () => {
      controls.stop();
    };
  }, [inView, value, duration, delay, decimals, formatter, onComplete]);

  return <span ref={ref} className={className} />;
}
