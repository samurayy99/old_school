// tailwind.config.ts

import type { Config } from 'tailwindcss'

const config: Config = {
  content: [
    './pages/**/*.{js,ts,jsx,tsx,mdx}',
    './components/**/*.{js,ts,jsx,tsx,mdx}',
    './app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    // NEU: Globale Container-Styles für einheitliches Padding
    container: {
      center: true,
      padding: '1.5rem', // 24px
    },
    extend: {
      fontFamily: {
        sans: ['var(--font-inter)'],
        serif: ['var(--font-lora)'],
        mono: ['var(--font-ibm-plex-mono)'],
      },
      // HIER FÜGEN WIR UNSERE FARBEN EIN
      colors: {
        'charcoal': '#1a1a1a', // Unser "Schwarz"
        'ivory': '#F5F5F3',     // Unser "Weiss" / Papier
        'blueprint-blue': '#3a7ca5', // Unser Akzentblau
        'accent-gold': '#D4AF37', // Unser Gold-Akzent
        'terminal-green': '#00ff41', // Classic terminal green
        'terminal-amber': '#ffb000', // Classic terminal amber
        // NEU: Neutrale Grautöne
        'brand-gray': {
          DEFAULT: '#888888',
          light: '#CCCCCC',
          dark: '#555555',
        },
      },
      animation: {
        'marquee': 'marquee 25s linear infinite',
        'typing': 'typing 3.5s steps(40, end)',
        'blink-caret': 'blink-caret .75s step-end infinite',
      },
      keyframes: {
        marquee: {
          '0%': { transform: 'translateX(100%)' },
          '100%': { transform: 'translateX(-100%)' },
        },
        typing: {
          'from': { width: '0' },
          'to': { width: '100%' },
        },
        'blink-caret': {
          'from, to': { borderColor: 'transparent' },
          '50%': { borderColor: '#00ff41' },
        },
      },
    },
  },
  plugins: [require('tailwindcss-animate')],
}
export default config