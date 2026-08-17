import type { Config } from 'tailwindcss';

const config: Config = {
  content: [
    './pages/**/*.{js,ts,jsx,tsx,mdx}',
    './components/**/*.{js,ts,jsx,tsx,mdx}',
    './app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  darkMode: 'class',
  theme: {
    extend: {
     colors: {
  primary: {
    dark: '#0B0A08',
    DEFAULT: '#151310',
  },
  forest: '#161310',
  oak: '#96774F',
  gold: {
    DEFAULT: '#B08D57',
    light: '#C9AC7C',
    dark: '#8F6F42',
  },
  cream: '#F3EFE6',
},
fontFamily: {
  display: ['var(--font-display)', 'system-ui', 'sans-serif'],
  sans: ['var(--font-inter)', 'system-ui', 'sans-serif'],
  mono: ['var(--font-jetbrains)', 'monospace'],
},
backgroundImage: {
  'gold-gradient': 'linear-gradient(135deg, #9C7B4E 0%, #C9AC7C 100%)',
  'dark-gradient': 'linear-gradient(180deg, #0B0A08 0%, #151310 100%)',
},
boxShadow: {
  gold: '0 20px 50px -20px rgba(176, 141, 87, 0.35)',
  'gold-lg': '0 25px 70px -20px rgba(176, 141, 87, 0.45)',
  card: '0 20px 60px -20px rgba(0, 0, 0, 0.5)',
},
      animation: {
        'pulse-slow': 'pulse 5s cubic-bezier(0.4, 0, 0.6, 1) infinite',
        float: 'float 6s ease-in-out infinite',
        marquee: 'marquee 30s linear infinite',
        'marquee-reverse': 'marquee-reverse 30s linear infinite',
        shimmer: 'shimmer 2s linear infinite',
        glow: 'glow 2s ease-in-out infinite alternate',
      },
      keyframes: {
        float: {
          '0%, 100%': { transform: 'translateY(0px)' },
          '50%': { transform: 'translateY(-20px)' },
        },
        marquee: {
          '0%': { transform: 'translateX(0%)' },
          '100%': { transform: 'translateX(-50%)' },
        },
        'marquee-reverse': {
          '0%': { transform: 'translateX(-50%)' },
          '100%': { transform: 'translateX(0%)' },
        },
        shimmer: {
          '0%': { backgroundPosition: '-200% 0' },
          '100%': { backgroundPosition: '200% 0' },
        },
        glow: {
          '0%': { boxShadow: '0 0 20px rgba(212, 175, 55, 0.3)' },
          '100%': { boxShadow: '0 0 40px rgba(212, 175, 55, 0.6)' },
        },
      },
    },
  },
  plugins: [],
};

export default config;
