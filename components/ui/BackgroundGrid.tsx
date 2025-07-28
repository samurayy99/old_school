/* components/ui/BackgroundGrid.tsx */
"use client";

import { motion } from "framer-motion";

export const BackgroundGrid = () => (
  <motion.div
    aria-hidden
    initial={{ opacity: 0 }}
    animate={{ opacity: 1 }}
    transition={{ duration: 1.2, ease: "easeOut" }}
    className="fixed inset-0 -z-20 h-full w-full pointer-events-none"
  >
    {/* subtle breathing animation */}
    <motion.div
      className="absolute inset-0 h-full w-full bg-[linear-gradient(to_right,rgba(26,26,26,0.08)_1px,transparent_1px),linear-gradient(to_bottom,rgba(26,26,26,0.08)_1px,transparent_1px)] dark:bg-[linear-gradient(to_right,rgba(245,245,243,0.08)_1px,transparent_1px),linear-gradient(to_bottom,rgba(245,245,243,0.08)_1px,transparent_1px)] bg-[size:32px_32px] [mask-image:radial-gradient(ellipse_at_center,transparent_20%,black)]"
      animate={{ backgroundPosition: ["0 0", "32px 32px", "0 0"] }}
      transition={{ duration: 30, repeat: Infinity, ease: "linear" }}
    />
    {/* Ensure proper background coverage */}
    <div className="absolute inset-0 h-full w-full bg-ivory dark:bg-black" />
  </motion.div>
);