import type { Config } from 'tailwindcss';

const config: Config = {
  content: [
    './src/pages/**/*.{js,ts,jsx,tsx,mdx}',
    './src/components/**/*.{js,ts,jsx,tsx,mdx}',
    './src/app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      colors: {
        primary: {
          DEFAULT: '#F97316',
          dark: '#EA580C',
          light: '#FDBA74',
          ghost: '#FFF7ED',
        },
        surface: {
          dark: '#1A1A2E',
          mid: '#16213E',
          card: '#FFFFFF',
          dashboard: '#0F1629',
        },
        page: {
          bg: '#F5F5F5',
          dark: '#0A0E1A',
        },
      },
      fontFamily: {
        outfit: ['Outfit', 'sans-serif'],
        inter: ['Inter', 'sans-serif'],
        mono: ['JetBrains Mono', 'monospace'],
      },
      borderRadius: {
        sm: '4px',
        md: '8px',
        lg: '12px',
        xl: '16px',
      },
      boxShadow: {
        glow: '0 0 30px rgba(249,115,22,0.3)',
      },
    },
  },
  plugins: [],
};

export default config;
