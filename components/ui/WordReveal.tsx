"use client";

import { motion } from "framer-motion";

interface WordRevealProps {
  text: string;
  delay?: number;
  className?: string;
}

export function WordReveal({ text, delay = 0, className = "" }: WordRevealProps) {
  const words = text.split(" ");
  
  return (
    <span className={className} style={{ display: "inline" }}>
      {words.map((word, index) => (
        <motion.span
          key={index}
          className="inline-block"
          initial={{ 
            opacity: 0, 
            y: "0.5em", 
            filter: "blur(4px)" 
          }}
          whileInView={{ 
            opacity: 1, 
            y: "0em", 
            filter: "blur(0px)" 
          }}
          viewport={{ once: true, amount: 0.6 }}
          transition={{ 
            duration: 0.5, 
            delay: delay + index * 0.06, 
            ease: [0.16, 1, 0.3, 1] 
          }}
        >
          {word + (index < words.length - 1 ? " " : "")}
        </motion.span>
      ))}
    </span>
  );
} 