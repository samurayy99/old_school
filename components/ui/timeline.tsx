"use client";
import {
    motion,
    useScroll,
    useTransform
} from "framer-motion";
import React, { useEffect, useRef, useState } from "react";

interface TimelineEntry {
  title: string;
  date: string;
  content: React.ReactNode;
}

export const Timeline = ({ data }: { data: TimelineEntry[] }) => {
  const ref = useRef<HTMLDivElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);
  const [height, setHeight] = useState(0);

  useEffect(() => {
    if (ref.current) {
      const rect = ref.current.getBoundingClientRect();
      setHeight(rect.height);
    }
  }, [ref]);

  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start 10%", "end 50%"],
  });

  const heightTransform = useTransform(scrollYProgress, [0, 1], [0, height]);
  const opacityTransform = useTransform(scrollYProgress, [0, 0.1], [0, 1]);

  return (
    <div className="w-full" ref={containerRef}>
      <div ref={ref} className="relative">
        {data.map((item, index) => (
          <div
            key={index}
            className="flex justify-start pt-10 md:pt-20 md:gap-10"
          >
            <div className="sticky flex flex-col md:flex-row z-40 items-center top-40 self-start max-w-xs lg:max-w-sm md:w-full">
              <div className="h-10 absolute left-3 md:left-3 w-10 rounded-full bg-ivory flex items-center justify-center shadow-lg ring-2 ring-blueprint-blue/20">
                <div className="h-4 w-4 rounded-full bg-blueprint-blue border-2 border-accent-gold" />
              </div>
              <h3 className="hidden md:block text-xl md:pl-20 md:text-3xl font-bold text-charcoal font-serif">
                {item.date}
              </h3>
            </div>

            <div className="relative pl-20 pr-4 md:pl-4 w-full">
              <h3 className="md:hidden block text-xl mb-2 text-left font-bold text-charcoal font-serif">
                {item.date}
              </h3>
              <h4 className="text-2xl md:text-3xl font-bold text-charcoal mb-4 font-serif">
                {item.title}
              </h4>
              <div className="text-brand-gray font-sans leading-relaxed">
                {item.content}
              </div>
            </div>
          </div>
        ))}
        <div
          style={{
            height: height + "px",
          }}
          className="absolute md:left-8 left-8 top-0 overflow-hidden w-[2px] bg-gradient-to-b from-transparent from-[0%] via-blueprint-blue/30 to-transparent to-[99%] [mask-image:linear-gradient(to_bottom,transparent_0%,black_10%,black_90%,transparent_100%)]"
        >
          <motion.div
            style={{
              height: heightTransform,
              opacity: opacityTransform,
            }}
            className="absolute inset-x-0 top-0 w-[2px] bg-gradient-to-t from-accent-gold via-blueprint-blue to-terminal-green from-[0%] via-[50%] to-[100%] rounded-full"
          />
        </div>
      </div>
    </div>
  );
}; 