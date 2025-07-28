"use client";

import { AnimatePresence, motion } from "framer-motion";
import { useState } from "react";

export function FooterSection() {
  const year = new Date().getFullYear();

  return (
    <footer
      id="contact"
      className="relative isolate bg-ivory dark:bg-black text-charcoal dark:text-ivory overflow-hidden"
      aria-labelledby="contact-heading"
    >
      {/* Top: Statement */}
      <div className="relative z-10 mx-auto max-w-5xl px-4 sm:px-6 lg:px-8 pt-24 sm:pt-28 lg:pt-32 xl:pt-36 pb-28 sm:pb-32 lg:pb-36 xl:pb-40 text-center">
        <div className="flex items-center justify-center">
          <div className="w-8 h-0.5 bg-brand mr-4"></div>
          <h2
            id="contact-heading"
            className="font-lora text-3xl sm:text-4xl lg:text-5xl tracking-tight text-charcoal dark:text-ivory"
          >
            Ready to shape the future?
          </h2>
          <div className="w-8 h-0.5 bg-brand ml-4"></div>
        </div>

        <figure className="mt-10 lg:mt-12">
          <blockquote className="text-base sm:text-lg lg:text-xl text-charcoal/70 dark:text-ivory/70 italic leading-relaxed max-w-4xl mx-auto balance">
            “Let’s connect, confidentially and strategically, to explore how we can bring your vision to life.”
          </blockquote>
          <figcaption className="mt-6 lg:mt-8 text-lg sm:text-xl font-medium text-charcoal/70 dark:text-ivory/70">
            Bernd Lapp
          </figcaption>
        </figure>

        {/* Contact chips */}
        <div className="mt-12 sm:mt-16 lg:mt-20 flex flex-wrap items-center justify-center gap-3 sm:gap-4 lg:gap-6 px-4">
          <CopyEmailChip email="bernd@oldschool.ag" />
          <LinkChip
            href="https://www.linkedin.com/in/berndlapp/"
            label="LinkedIn"
            ariaLabel="Open Bernd Lapp on LinkedIn"
          >
            <LinkedInIcon className="h-4 w-4" />
          </LinkChip>
        </div>
      </div>

      {/* Bottom bar */}
      <div className="relative z-10 border-t border-charcoal/10 dark:border-ivory/10">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-4 sm:py-6 flex flex-col gap-4 sm:gap-6 sm:flex-row sm:items-center sm:justify-between">
          <nav
            aria-label="Legal"
            className="flex items-center justify-center sm:justify-start gap-6 text-xs text-charcoal/60 dark:text-ivory/60"
          >
            <a
              href="/impressum"
              className="hover:text-charcoal dark:hover:text-ivory transition-colors"
            >
              Legal
            </a>
            <a
              href="/privacy"
              className="hover:text-charcoal dark:hover:text-ivory transition-colors"
            >
              Privacy
            </a>
          </nav>

          <p className="text-xs text-charcoal/60 dark:text-ivory/60 text-center sm:text-right">
            © {year} Old School GmbH. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  );
}

/* ---------- Chips ---------- */

function baseChipClasses(extra = "") {
  return [
    "group inline-flex items-center gap-2 rounded-full",
    "border border-charcoal/12 dark:border-ivory/12",
    "bg-white/60 dark:bg-white/[0.04]",
    "px-4 py-2 text-sm",
    "text-charcoal dark:text-ivory",
    "transition-colors",
    extra,
  ].join(" ");
}

// function StaticChip({ children }: { children: React.ReactNode }) {
//   return <div className={baseChipClasses()}>{children}</div>;
// }

function LinkChip({
  href,
  label,
  ariaLabel,
  children,
}: {
  href: string;
  label: string;
  ariaLabel: string;
  children?: React.ReactNode;
}) {
  return (
    <a
      href={href}
      target="_blank"
      rel="noopener noreferrer"
      aria-label={ariaLabel}
      className={baseChipClasses(
        "hover:border-brand/30 hover:bg-white/70 dark:hover:bg-white/[0.06]"
      )}
    >
      {children}
      <span className="font-medium">{label}</span>
    </a>
  );
}

function CopyEmailChip({ email }: { email: string }) {
  const [copied, setCopied] = useState(false);

  async function onCopy() {
    try {
      await navigator.clipboard.writeText(email);
      setCopied(true);
      setTimeout(() => setCopied(false), 1600);
    } catch {
      // Fallback: öffne Mailto wenn Clipboard blockiert ist
      window.location.href = `mailto:${email}`;
    }
  }

  return (
    <button
      type="button"
      onClick={onCopy}
      className={baseChipClasses(
        "hover:border-brand/30 hover:bg-white/70 dark:hover:bg-white/[0.06] focus:outline-none focus-visible:ring-2 focus-visible:ring-brand/60"
      )}
      aria-live="polite"
    >
      <MailIcon className="h-4 w-4" />
      <span className="font-medium">{email}</span>

      <AnimatePresence initial={false}>
        {copied && (
          <motion.span
            key="copied"
            initial={{ opacity: 0, y: 4 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -4 }}
            transition={{ duration: 0.18 }}
            className="ml-2 inline-flex items-center gap-1 rounded-full bg-brand/15 px-2 py-0.5 text-xs font-semibold text-brand"
          >
            <CheckIcon className="h-3 w-3" />
            Copied
          </motion.span>
        )}
      </AnimatePresence>
    </button>
  );
}

/* ---------- Icons (inline, schlank) ---------- */

function LinkedInIcon({ className = "h-4 w-4" }: { className?: string }) {
  return (
    <svg viewBox="0 0 24 24" className={className} fill="currentColor" aria-hidden>
      <path d="M4.98 3.5A2.5 2.5 0 1 0 5 8.5a2.5 2.5 0 0 0-.02-5ZM3 9h4v12H3V9Zm7 0h3.8v1.64h.05c.53-.94 1.82-1.93 3.75-1.93 4.01 0 4.75 2.64 4.75 6.08V21h-4v-5.3c0-1.26-.02-2.88-1.76-2.88-1.77 0-2.04 1.38-2.04 2.79V21h-4V9Z" />
    </svg>
  );
}

function MailIcon({ className = "h-4 w-4" }: { className?: string }) {
  return (
    <svg viewBox="0 0 24 24" className={className} fill="currentColor" aria-hidden>
      <path d="M2 6.5A2.5 2.5 0 0 1 4.5 4h15A2.5 2.5 0 0 1 22 6.5v11A2.5 2.5 0 0 1 19.5 20h-15A2.5 2.5 0 0 1 2 17.5v-11Zm2.5-.5a.5.5 0 0 0-.5.5v.36l8 4.64 8-4.64V6.5a.5.5 0 0 0-.5-.5h-15ZM20 9.86l-7.55 4.38a1.5 1.5 0 0 1-1.9 0L3 9.86V17.5a.5.5 0 0 0 .5.5h15a.5.5 0 0 0 .5-.5V9.86Z" />
    </svg>
  );
}

// function LocationIcon({ className = "h-4 w-4" }: { className?: string }) {
//   return (
//     <svg viewBox="0 0 24 24" className={className} fill="currentColor" aria-hidden>
//       <path d="M12 2.5a7 7 0 0 0-7 7c0 5.25 7 12 7 12s7-6.75 7-12a7 7 0 0 0-7-7Zm0 9.5a2.5 2.5 0 1 1 0-5 2.5 2.5 0 0 1 0 5Z" />
//     </svg>
//   );
// }

function CheckIcon({ className = "h-3 w-3" }: { className?: string }) {
  return (
    <svg viewBox="0 0 24 24" className={className} fill="currentColor" aria-hidden>
      <path d="M9 16.17 4.83 12l-1.42 1.41L9 19 21 7l-1.41-1.41z" />
    </svg>
  );
}