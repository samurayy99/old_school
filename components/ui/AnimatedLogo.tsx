"use client";

import { motion } from "framer-motion";

export function AnimatedLogo({ onComplete }: { onComplete?: () => void }) {
  const d = `M22.814 21.185 L 11.027 33.080 11.027 168.639 L 11.027 304.199 147.529 304.194 L 284.030 304.189 296.388 291.782 L 308.745 279.376 308.745 239.399 L 308.745 199.423 296.529 187.164 L 284.313 174.905 214.898 174.905 C 148.616 174.905,145.426 174.842,144.224 173.514 C 142.370 171.465,142.319 141.095,144.169 140.386 C 144.830 140.132,175.386 139.924,212.069 139.924 L 278.767 139.924 291.095 127.514 L 303.422 115.105 303.422 86.982 C 303.422 66.123,303.658 58.624,304.335 57.947 C 305.514 56.768,337.793 56.654,339.974 57.821 C 342.295 59.064,342.289 337.898,339.968 339.140 C 338.958 339.680,286.645 339.928,174.758 339.921 L 11.027 339.911 10.883 351.569 L 10.739 363.228 22.682 375.153 L 34.625 387.079 200.006 387.079 L 365.386 387.079 376.986 375.479 L 388.587 363.878 388.597 198.350 L 388.607 32.822 376.759 20.974 L 364.910 9.125 310.212 9.125 L 255.513 9.125 255.513 49.765 C 255.513 74.245,255.230 90.580,254.800 90.845 C 254.408 91.088,224.208 91.279,187.690 91.271 C 125.713 91.257,121.161 91.345,119.317 92.586 C 118.230 93.318,112.489 98.766,106.559 104.694 L 95.776 115.472 95.777 156.902 L 95.778 198.331 107.639 210.192 L 119.500 222.053 188.876 222.053 C 241.820 222.053,258.467 222.269,259.163 222.966 C 260.454 224.257,260.454 254.831,259.163 256.122 C 257.951 257.334,62.287 257.457,60.026 256.247 C 57.713 255.009,57.713 59.059,60.026 57.821 C 61.013 57.293,87.512 57.034,140.553 57.034 C 211.940 57.034,219.654 56.918,220.071 55.831 C 220.325 55.170,220.532 44.390,220.532 31.877 L 220.532 9.125 127.567 9.208 L 34.601 9.291 22.814 21.185`;

  const drawDur = 2.4;

  // Mittelpunkt zum sauberen Skalieren der Fill-Form
  const cx = 200;
  const cy = 198.5;

  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 400 397"
      className="h-32 w-auto md:h-40 text-brand dark:text-ivory"
      aria-hidden
      shapeRendering="geometricPrecision"
    >
      {/* 1) Draw: Stroke-only, danach ausblenden */}
      <motion.path
        d={d}
        fill="none"
        stroke="currentColor"
        strokeWidth={7}
        strokeLinejoin="miter"
        strokeMiterlimit={3}
        vectorEffect="non-scaling-stroke"
        initial={{ pathLength: 0, opacity: 1 }}
        animate={{ pathLength: 1, opacity: [1, 1, 0] }}
        transition={{
          pathLength: { duration: drawDur, ease: [0.65, 0, 0.35, 1] },
          opacity: { 
            duration: drawDur + 0.25, 
            times: [0, 0.9, 1],
            ease: "easeOut" 
          },
        }}
      />

      {/* 2) Fill: finale Form, mit CSS-variabler Skalierung */}
      <motion.path
        d={d}
        stroke="none"
        fill="currentColor"
        style={{
          transformOrigin: `${cx}px ${cy}px`,
          transform: `scale(var(--logo-scale))`,
        }}
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.9, delay: drawDur - 0.15, ease: "easeIn" }}
        onAnimationComplete={onComplete}
      />

      {/* 3) Choke: Hintergrundfarbe „schneidet" die Kante zurück */}
      <path
        d={d}
        fill="none"
        vectorEffect="non-scaling-stroke"
        className="stroke-ivory dark:stroke-black"
        style={{
          strokeWidth: 'var(--logo-choke)',
          paintOrder: 'stroke'
        }}
      />
      
      {/* DEBUG: Temporär rot für Sichtbarkeit - ENTFERNEN WENN ES FUNKTIONIERT */}
      <path
        d={d}
        fill="none"
        vectorEffect="non-scaling-stroke"
        stroke="red"
        strokeWidth="0.5"
        opacity="0.3"
        style={{ pointerEvents: 'none' }}
      />
    </svg>
  );
}
