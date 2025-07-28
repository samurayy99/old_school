"use client";

import { CountUp } from "@/components/ui/CountUp";
import { motion, useInView } from "framer-motion";
import Image from "next/image";
import { useRef } from "react";

type Milestone = {
  id: string;
  date: string;
  title: string;
  body: string;
  eth?: number;
};

const timeline: Milestone[] = [
  {
    id: "ethereum",
    date: "2015-2017",
    title: "Ethereum Foundation",
    body:
      "Early strategy & ecosystem growth focusing on governance, community trust and decentralisation principles at the core.",
  },
  {
    id: "fundraising",
    date: "2017",
    title: "Groundbreaking Fundraising",
    body:
      "Structured, compliant token sales for real products combining economic design with responsible execution.",
    // eth removed - already shown in KPI chips above
  },
  {
    id: "builder",
    date: "2018-Present",
    title: "Builder & Founder",
    body:
      "Co-created Swarm City, AVADO and CasperLabs delivering infrastructure, tooling and user-facing dApps that actually shipped.",
  },
  {
    id: "oldschool",
    date: "Today",
    title: "Old School GmbH",
    body:
      "Based in Zug's Crypto Valley. Bridging Web3 & AI with rigorous evaluation, hands-on building and decisive strategy.",
  },
];

export function FounderSection() {
  const sectionRef = useRef<HTMLDivElement>(null);
  const inView = useInView(sectionRef, { once: true, amount: 0.2 });

  return (
    <section
      id="founder"
      ref={sectionRef}
      className="relative isolate pt-24 sm:pt-28 lg:pt-32 xl:pt-36 pb-24 sm:pb-28 lg:pb-32 xl:pb-36 bg-ivory dark:bg-black text-charcoal dark:text-ivory overflow-hidden"
    >
      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Headline */}
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
          className="text-center"
        >
          <p className="font-mono text-sm tracking-widest text-brand/80">FOUNDER</p>
          <div className="flex items-center justify-center mt-3 lg:mt-4">
            <div className="w-8 h-0.5 bg-brand mr-4"></div>
            <h2 className="font-lora text-3xl sm:text-4xl lg:text-5xl tracking-tight">Bernd Lapp</h2>
            <div className="w-8 h-0.5 bg-brand ml-4"></div>
          </div>
          <p className="mt-6 lg:mt-8 text-lg sm:text-xl lg:text-2xl text-charcoal/70 dark:text-ivory/70 max-w-3xl mx-auto balance leading-relaxed">
            From Ethereum&apos;s inner circle to founder and advisor, a steady hand for ambitious Web3 & AI initiatives.
          </p>
        </motion.div>

        {/* Portrait + KPI Chips */}
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6, delay: 0.1, ease: "easeOut" }}
          className="mt-12 flex flex-col items-center"
        >
          <div className="relative w-40 h-48 sm:w-48 sm:h-60 md:w-56 md:h-72 lg:w-64 lg:h-80 rounded-2xl overflow-hidden border border-charcoal/10 dark:border-ivory/10 shadow-2xl">
            <Image
              src="/bernd_lapp.jpeg"
              alt="Bernd Lapp - Founder of Old School GmbH"
              fill
              sizes="(max-width: 640px) 50vw, (max-width: 1024px) 40vw, 480px"
              className="object-cover object-top"
              priority
            />
            {/* subtiler Brand‑Ring */}
            <div className="pointer-events-none absolute inset-0 ring-1 ring-brand/20 rounded-2xl" />
          </div>

          {/* KPIs */}
          <div className="mt-6 sm:mt-8 flex flex-wrap justify-center gap-2 sm:gap-3 px-4">
            <KPI 
              label="Years in crypto" 
              value={
                <>
                  <CountUp
                    value={new Date().getFullYear() - 2014}
                    duration={4.0}
                    delay={0.2}
                    className="tabular-nums font-semibold"
                  />
                  <span className="font-semibold"> years</span>
                </>
              } 
            />
            <KPI 
              label="ETH raised" 
              value={
                <>
                  <CountUp
                    value={77000}
                    duration={3.5}
                    delay={0.4}
                    className="tabular-nums font-semibold"
                  />
                  <span className="font-semibold"> ETH</span>
                </>
              } 
            />
            <KPI 
              label="Ventures shipped" 
              value={
                <>
                  <CountUp
                    value={3}
                    duration={3.0}
                    delay={0.6}
                    className="tabular-nums font-semibold"
                  />
                  <span className="font-semibold">+</span>
                </>
              } 
            />
          </div>
        </motion.div>

        {/* Timeline */}
        <div className="mt-24 sm:mt-28 lg:mt-32 xl:mt-36 grid grid-cols-1 lg:grid-cols-[minmax(0,800px)] justify-center">
          <div className="relative mx-auto w-full max-w-3xl">
            <div className="space-y-10">
              {timeline.map((milestone, index) => (
                <TimelineItem key={milestone.id} milestone={milestone} index={index} />
              ))}
            </div>
          </div>
        </div>
      </div>
      
      {/* Elegant separator */}
      <div className="relative">
        <div className="absolute inset-0 flex items-center justify-center">
          <div className="w-16 h-px bg-gradient-to-r from-transparent via-brand/20 to-transparent"></div>
        </div>
      </div>
    </section>
  );
}

// Timeline Item Component - Clean & Elegant
function TimelineItem({ milestone }: { milestone: Milestone; index: number }) {
  return (
    <motion.article
      initial={{ opacity: 0, y: 16 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.35 }}
      transition={{ duration: 0.5, ease: "easeOut" }}
      className="rounded-xl border border-charcoal/20 dark:border-ivory px-5 py-5 shadow-lg shadow-brand/10"
    >
      <p className="font-mono text-[13px] text-charcoal/60 dark:text-ivory/60">
        {milestone.date}
      </p>
      <h3 className="mt-1 text-xl font-semibold tracking-tight font-lora">
        {milestone.title}
      </h3>
      <p className="mt-3 text-base leading-relaxed text-charcoal/80 dark:text-ivory/80">
        {milestone.body}
      </p>

      {milestone.eth ? (
        <div className="mt-5 inline-flex items-center gap-2 rounded-md border border-charcoal/12 dark:border-ivory/12 bg-white/40 dark:bg-white/[0.04] px-3 py-2">
          <span className="text-base font-bold text-charcoal dark:text-ivory">
            <CountUp
              value={milestone.eth}
              duration={3.0}
              className="tabular-nums font-bold"
            />
          </span>
          <span className="text-base font-bold">ETH</span>
          <span className="text-[11px] px-2 py-0.5 rounded-full bg-charcoal/5 dark:bg-ivory/10 text-charcoal/60 dark:text-ivory/60">
            raised
          </span>
        </div>
      ) : null}
    </motion.article>
  );
}

/* ---------- helpers ---------- */
function KPI({
  label,
  value,
}: {
  label: string;
  value: string | React.ReactNode;
}) {
  return (
    <div className="rounded-full border border-charcoal/12 dark:border-ivory/12 bg-white/60 dark:bg-white/[0.04] px-3 py-2 sm:px-4 text-xs sm:text-sm">
      <span className="mr-1 sm:mr-2 text-charcoal/60 dark:text-ivory/60">{label}</span>
      <span className="font-semibold text-charcoal dark:text-ivory">{value}</span>
    </div>
  );
}
