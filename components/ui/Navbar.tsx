"use client";

import { AnimatePresence, motion, useMotionValueEvent, useScroll } from 'framer-motion';
import Link from 'next/link';
import { useEffect, useState } from 'react';
import { AIChatModal } from './AIChatModal';
import { LogoMark } from './LogoMark';
import { ThemeToggle } from './ThemeToggle';

const Logo = () => (
  <Link href="/" className="text-brand dark:text-ivory">
    <LogoMark />
  </Link>
);

// Desktop Navigation Links
const NavLinks = () => (
  <div className="hidden md:flex items-center gap-6">
    <Link href="#services" className="font-mono text-sm text-charcoal/70 dark:text-ivory/70 hover:text-charcoal dark:hover:text-ivory transition-colors">
      Services
    </Link>
    <Link href="#founder" className="font-mono text-sm text-charcoal/70 dark:text-ivory/70 hover:text-charcoal dark:hover:text-ivory transition-colors">
      Founder
    </Link>
    <Link href="#references" className="font-mono text-sm text-charcoal/70 dark:text-ivory/70 hover:text-charcoal dark:hover:text-ivory transition-colors">
      References
    </Link>
  </div>
);

// Mobile Navigation Menu
const MobileMenu = ({ 
  isOpen, 
  onClose 
}: { 
  isOpen: boolean; 
  onClose: () => void; 
}) => (
  <AnimatePresence>
    {isOpen && (
      <>
        {/* Backdrop */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="fixed inset-0 bg-black/20 dark:bg-black/40 backdrop-blur-sm z-40"
          onClick={onClose}
        />
        
        {/* Mobile Menu */}
        <motion.div
          initial={{ opacity: 0, x: '100%' }}
          animate={{ opacity: 1, x: 0 }}
          exit={{ opacity: 0, x: '100%' }}
          transition={{ duration: 0.3, ease: [0.32, 0.72, 0, 1] }}
          className="fixed top-0 right-0 h-full w-80 max-w-[85vw] bg-ivory/95 dark:bg-charcoal/95 backdrop-blur-xl border-l border-charcoal/20 dark:border-ivory/20 z-50"
        >
          <div className="flex flex-col h-full">
            {/* Header */}
            <div className="flex items-center justify-between p-6 border-b border-charcoal/10 dark:border-ivory/10">
              <h3 className="font-lora text-lg font-medium text-charcoal dark:text-ivory">Menu</h3>
              <button
                onClick={onClose}
                className="p-2 rounded-full text-charcoal/60 dark:text-ivory/60 hover:bg-charcoal/10 dark:hover:bg-ivory/10 hover:text-charcoal dark:hover:text-ivory transition-colors"
              >
                <svg className="h-5 w-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                </svg>
              </button>
            </div>

            {/* Navigation Links */}
            <div className="flex-1 p-6 space-y-6">
              <Link 
                href="#services" 
                onClick={onClose}
                className="block font-mono text-lg text-charcoal/70 dark:text-ivory/70 hover:text-charcoal dark:hover:text-ivory transition-colors"
              >
                Services
              </Link>
              <Link 
                href="#founder" 
                onClick={onClose}
                className="block font-mono text-lg text-charcoal/70 dark:text-ivory/70 hover:text-charcoal dark:hover:text-ivory transition-colors"
              >
                Founder
              </Link>
              <Link 
                href="#references" 
                onClick={onClose}
                className="block font-mono text-lg text-charcoal/70 dark:text-ivory/70 hover:text-charcoal dark:hover:text-ivory transition-colors"
              >
                References
              </Link>
            </div>

            {/* Footer */}
            <div className="p-6 border-t border-charcoal/10 dark:border-ivory/10">
              <div className="flex items-center justify-between">
                <span className="text-xs text-charcoal/50 dark:text-ivory/50 font-mono">Old School GmbH</span>
                <ThemeToggle />
              </div>
            </div>
          </div>
        </motion.div>
      </>
    )}
  </AnimatePresence>
);

// Desktop CTA Container
const CtaContainer = ({ onOpenAI }: { onOpenAI: () => void }) => (
  <div className="hidden md:flex items-center gap-2">
    <button
      onClick={onOpenAI}
      className="font-mono text-sm bg-charcoal/5 dark:bg-ivory/10 border border-charcoal/20 dark:border-ivory/20 text-charcoal dark:text-ivory px-4 py-2 rounded-full hover:bg-charcoal/10 dark:hover:bg-ivory/20 transition-all duration-300 flex items-center gap-2 group"
    >
      <div className="h-2 w-2 rounded-full bg-brand animate-pulse" />
      <span>AI Assistant</span>
      <svg className="h-3 w-3 group-hover:translate-x-0.5 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z" />
      </svg>
    </button>
    <ThemeToggle />
  </div>
);

// Mobile Controls (Hamburger + Theme Toggle)
const MobileControls = ({ 
  onOpenMenu, 
  onOpenAI 
}: { 
  onOpenMenu: () => void; 
  onOpenAI: () => void; 
}) => (
  <div className="flex md:hidden items-center gap-2">
    {/* Mobile AI Assistant - Just Icon */}
    <button
      onClick={onOpenAI}
      className="p-2 rounded-full text-charcoal/70 dark:text-ivory/70 hover:bg-charcoal/10 dark:hover:bg-ivory/10 hover:text-charcoal dark:hover:text-ivory transition-all relative"
      aria-label="Open AI Assistant"
    >
      <div className="absolute -top-1 -right-1 h-2 w-2 rounded-full bg-brand animate-pulse" />
      <svg className="h-5 w-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z" />
      </svg>
    </button>

    {/* Hamburger Menu */}
    <button
      onClick={onOpenMenu}
      className="p-2 rounded-full text-charcoal/70 dark:text-ivory/70 hover:bg-charcoal/10 dark:hover:bg-ivory/10 hover:text-charcoal dark:hover:text-ivory transition-colors"
      aria-label="Open menu"
    >
      <svg className="h-5 w-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
      </svg>
    </button>
  </div>
);

export function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [isMobile, setIsMobile] = useState(false);
  const [isAIOpen, setIsAIOpen] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const { scrollY } = useScroll();

  /* Mobile detection for optimized timing */
  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth < 768);
    };
    checkMobile();
    window.addEventListener('resize', checkMobile);
    return () => window.removeEventListener('resize', checkMobile);
  }, []);

  useMotionValueEvent(scrollY, "change", (latest) => {
    setScrolled(latest > 50);
  });

  /* Calculate delay: Logo (3s) + Title (0.2s) + Motto (0.2s) + Buffer */
  const navDelay = isMobile ? 3.2 : 3.6; // Mobile: 30% faster

  return (
    <>
      <motion.nav
        initial={{ y: -100, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.6, delay: navDelay, ease: "easeOut" }}
        className={`fixed top-0 left-0 right-0 w-full z-50`}
      >
        <div
          className={`absolute inset-0 w-full h-full border-b border-charcoal/10 dark:border-ivory/10 transition-all duration-300 ${
            scrolled ? 'opacity-100 bg-ivory/80 dark:bg-charcoal/80 backdrop-blur-lg' : 'opacity-0'
          }`}
        ></div>
        <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-3 items-center h-20">
            {/* Left: Logo */}
            <div className="flex justify-start">
              <Logo />
            </div>
            
            {/* Center: Navigation */}
            <div className="flex justify-center">
              <NavLinks />
            </div>
            
            {/* Right: Controls */}
            <div className="flex justify-end">
              <CtaContainer onOpenAI={() => setIsAIOpen(true)} />
              <MobileControls 
                onOpenMenu={() => setIsMobileMenuOpen(true)}
                onOpenAI={() => setIsAIOpen(true)}
              />
            </div>
          </div>
        </div>
      </motion.nav>

      {/* Mobile Menu */}
      <MobileMenu 
        isOpen={isMobileMenuOpen}
        onClose={() => setIsMobileMenuOpen(false)}
      />

      {/* AI Chat Modal */}
      <AIChatModal 
        isOpen={isAIOpen} 
        onClose={() => setIsAIOpen(false)} 
      />
    </>
  );
}