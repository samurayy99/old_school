// /Users/lenox27/old_school/tailwind.config.ts

import type { Config } from 'tailwindcss';

const config: Config = {
  darkMode: 'class',
  content: [
    './pages/**/*.{js,ts,jsx,tsx,mdx}',
    './components/**/*.{js,ts,jsx,tsx,mdx}',
    './app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    container: {
      center: true,
      padding: '1.5rem',
    },
    extend: {
      fontFamily: {
        sans: ['var(--font-inter)'],
        serif: ['var(--font-lora)'],
        mono: ['var(--font-ibm-plex-mono)'],
        logo: ['var(--font-teko)', 'Impact', 'Arial Black', 'sans-serif'], // Teko - die perfekte eckige Schrift für Bernd
      },
      colors: {
        brand: {
          DEFAULT: 'var(--brand-green)',
          dark: 'var(--brand-green-dark)',
          light: 'var(--brand-green-light)',
        },
        charcoal: '#111111',
        ivory: '#F5F5F3',
        'accent-gold': '#D4AF37',
      },
      // HIER IST DIE BEREINIGTE UND FINALE ANIMATIONS-SEKTION
      keyframes: {
        'fade-in-up': {
          '0%': {
            opacity: '0',
            transform: 'translateY(15px)',
          },
          '100%': {
            opacity: '1',
            transform: 'translateY(0)',
          },
        },
        marquee: {
          '0%': { transform: 'translateX(0%)' },
          '100%': { transform: 'translateX(-100%)' },
        },
        'marquee-reverse': {
          '0%': { transform: 'translateX(-100%)' },
          '100%': { transform: 'translateX(0%)' },
        },
      },
      animation: {
        'fade-in-up': 'fade-in-up 0.8s cubic-bezier(0.22, 1, 0.36, 1) forwards',
        marquee: 'marquee 40s linear infinite',
        'marquee-reverse': 'marquee-reverse 35s linear infinite',
      },
    },
  },
  plugins: [
    require('tailwindcss-animate'),
    require('@tailwindcss/typography'),
  ],
};
export default config;