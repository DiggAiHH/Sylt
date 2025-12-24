import type { Config } from 'tailwindcss';

const config: Config = {
  content: [
    './src/pages/**/*.{js,ts,jsx,tsx,mdx}',
    './src/components/**/*.{js,ts,jsx,tsx,mdx}',
    './src/app/**/*.{js,ts,jsx,tsx,mdx}',
    '../../packages/ui/src/**/*.{js,ts,jsx,tsx}',
  ],
  theme: {
    extend: {
      colors: {
        // Sand - warm beige tones
        sand: {
          50: '#faf8f5',
          100: '#f5f0e8',
          200: '#ebe3d5',
          300: '#dcd0bc',
          400: '#c9b89e',
          500: '#b8a182',
          600: '#a08a6a',
          700: '#857158',
          800: '#6d5c4a',
          900: '#5a4c3e',
        },
        // Reetdach-Grau - thatched roof grey
        reetdach: {
          50: '#f7f7f6',
          100: '#e8e7e4',
          200: '#d4d2cd',
          300: '#b8b5ae',
          400: '#9a968d',
          500: '#7f7a70',
          600: '#68635a',
          700: '#55514a',
          800: '#47443e',
          900: '#3d3a36',
        },
        // Nordsee-Blau - North Sea blue
        nordsee: {
          50: '#f0f7fa',
          100: '#dceef5',
          200: '#bde0ed',
          300: '#8ecce0',
          400: '#58b1cd',
          500: '#3896b5',
          600: '#2d7a99',
          700: '#28647d',
          800: '#265467',
          900: '#244757',
        },
      },
      fontFamily: {
        serif: ['var(--font-cormorant)', 'Cormorant Garamond', 'Playfair Display', 'Georgia', 'serif'],
        sans: ['var(--font-inter)', 'Inter', '-apple-system', 'BlinkMacSystemFont', 'Segoe UI', 'Roboto', 'sans-serif'],
      },
      spacing: {
        '18': '4.5rem',
        '22': '5.5rem',
        '30': '7.5rem',
      },
      animation: {
        'fade-in': 'fadeIn 0.5s ease-out',
        'fade-in-up': 'fadeInUp 0.6s ease-out',
        'fade-in-down': 'fadeInDown 0.6s ease-out',
        'slide-in-right': 'slideInRight 0.5s ease-out',
        'slide-in-left': 'slideInLeft 0.5s ease-out',
      },
      keyframes: {
        fadeIn: {
          '0%': { opacity: '0' },
          '100%': { opacity: '1' },
        },
        fadeInUp: {
          '0%': { opacity: '0', transform: 'translateY(20px)' },
          '100%': { opacity: '1', transform: 'translateY(0)' },
        },
        fadeInDown: {
          '0%': { opacity: '0', transform: 'translateY(-20px)' },
          '100%': { opacity: '1', transform: 'translateY(0)' },
        },
        slideInRight: {
          '0%': { opacity: '0', transform: 'translateX(20px)' },
          '100%': { opacity: '1', transform: 'translateX(0)' },
        },
        slideInLeft: {
          '0%': { opacity: '0', transform: 'translateX(-20px)' },
          '100%': { opacity: '1', transform: 'translateX(0)' },
        },
      },
    },
  },
  plugins: [],
};

export default config;
