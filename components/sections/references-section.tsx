"use client";

import { LogoBadge } from "@/components/ui/LogoBadge";
import { motion, useReducedMotion } from "framer-motion";
import Image from "next/image";
import { useState } from "react";

import { AvadoLogo } from "@/components/logos/AvadoLogo";
import { EthereumLogo } from "@/components/logos/EthereumLogo";
import { InternetComputerLogo } from "@/components/logos/InternetComputerLogo";
import { LiskLogo } from "@/components/logos/LiskLogo";
import { NearLogo } from "@/components/logos/NearLogo";

type LogoItem =
  | {
      alt: string;
      href: string;
      component: (props: React.SVGProps<SVGSVGElement>) => JSX.Element;
      isBitmap?: false;
    }
  | {
      alt: string;
      href: string;
      src: string;
      isBitmap: true;
    };

const logos: LogoItem[] = [
  { component: EthereumLogo, alt: "Ethereum", href: "https://ethereum.org/" },
  { component: LiskLogo, alt: "Lisk", href: "https://lisk.com/" },
  { component: NearLogo, alt: "NEAR Protocol", href: "https://near.org/" },
  {
    isBitmap: true,
    src: "/logos/Casper_Wordmark_Horizontal_Black_RGB.png",
    alt: "CasperLabs",
    href: "https://casper.network/",
  },
  { component: AvadoLogo, alt: "AVADO", href: "https://ava.do/" },
  {
    component: InternetComputerLogo,
    alt: "DFINITY / Internet Computer",
    href: "https://internetcomputer.org/",
  },
];

export function ReferencesSection() {
  const [active, setActive] = useState<number | null>(null);
  const reduce = useReducedMotion();

  // Touch: Tap erneut -> reset
  const handleActivate = (i: number) =>
    setActive((curr) => (curr === i ? null : i));

  return (
    <section
      id="references"
      className="relative isolate pt-24 sm:pt-28 lg:pt-32 xl:pt-36 pb-20 sm:pb-24 lg:pb-28 xl:pb-32 bg-ivory dark:bg-black text-charcoal dark:text-ivory overflow-hidden"
    >
      <div className="relative z-10 mx-auto max-w-7xl px-4 sm:px-8 text-center">
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, ease: "easeOut" }}
          viewport={{ once: true }}
          className="text-center"
        >
          <p className="font-mono text-sm tracking-widest text-brand/80 mb-3 lg:mb-4">REFERENCES</p>
          <div className="flex items-center justify-center mt-3 lg:mt-4">
            <div className="w-8 h-0.5 bg-brand mr-4"></div>
            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-lora font-medium tracking-tight">
              Trusted by Pioneers
            </h2>
            <div className="w-8 h-0.5 bg-brand ml-4"></div>
          </div>
        </motion.div>

        {/* Optionaler Untertitel – wenn du ihn nicht willst, einfach löschen */}
        {/* <motion.p
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.06, ease: "easeOut" }}
          viewport={{ once: true }}
          className="mt-4 text-lg text-charcoal/70 dark:text-ivory/70 max-w-2xl mx-auto"
        >
          Trusted by pioneers of the decentralized world.
        </motion.p> */}

        <motion.div
          className="mt-16 sm:mt-20 lg:mt-24 xl:mt-28 mx-auto w-full max-w-5xl px-4 sm:px-6 lg:px-8 grid grid-cols-2 md:grid-cols-3 gap-x-4 sm:gap-x-6 md:gap-x-8 gap-y-12 sm:gap-y-16 lg:gap-y-20 items-center justify-items-center"
          style={{ perspective: "1000px" }}
          onMouseLeave={() => setActive(null)}
          {...(!reduce && {
            animate: {
              rotate: [0, 2.5, -2.5, 0],
              y: [0, -6, 6, 0],
            },
            transition: {
              duration: 20,
              repeat: Infinity,
              ease: "linear",
            }
          })}
        >
          {logos.map((logo, i) => {
            const isActive = active === i;

            return (
              <LogoBadge
                key={logo.alt}
                href={logo.href}
                alt={logo.alt}
                isActive={isActive}
                onActivate={() => handleActivate(i)}
                onDeactivate={() => setActive(null)}
                isBitmap={"isBitmap" in logo ? logo.isBitmap : false}
              >
                {"component" in logo ? (
                  <logo.component className="h-8 w-auto sm:h-10 lg:h-12 transition-all duration-300" />
                ) : (
                  <Image
                    src={logo.src}
                    alt={logo.alt}
                    width={180}
                    height={64}
                    className="h-8 w-auto sm:h-10 lg:h-12 object-contain transition-all duration-300"
                    loading="lazy"
                  />
                )}
              </LogoBadge>
            );
          })}
        </motion.div>
      </div>
    </section>
  );
}
