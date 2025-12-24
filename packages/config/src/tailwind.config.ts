import type { Config } from 'tailwindcss';
import { colors, typography, spacing } from './index';

const config: Partial<Config> = {
  theme: {
    extend: {
      colors: {
        sand: colors.sand,
        reetdach: colors.reetdach,
        nordsee: colors.nordsee,
        cream: colors.cream,
        charcoal: colors.charcoal,
      },
      fontFamily: {
        heading: ['Playfair Display', 'Georgia', 'serif'],
        body: ['Cormorant', 'Georgia', 'serif'],
        accent: ['Cormorant Garamond', 'Georgia', 'serif'],
      },
      fontSize: {
        '8xl': ['6rem', { lineHeight: '1.1' }],
        '9xl': ['8rem', { lineHeight: '1' }],
      },
      letterSpacing: {
        luxury: '0.05em',
        'luxury-wide': '0.1em',
      },
      spacing: {
        'section-sm': spacing.section.sm,
        'section-md': spacing.section.md,
        'section-lg': spacing.section.lg,
        'section-xl': spacing.section.xl,
      },
      maxWidth: {
        'container-sm': spacing.container.sm,
        'container-md': spacing.container.md,
        'container-lg': spacing.container.lg,
        'container-xl': spacing.container.xl,
        'container-2xl': spacing.container['2xl'],
      },
      animation: {
        'fade-in': 'fadeIn 0.5s ease-in-out',
        'slide-up': 'slideUp 0.6s ease-out',
        'slide-in-right': 'slideInRight 0.6s ease-out',
        'parallax': 'parallax 1s ease-out',
        'luxury-fade': 'luxuryFade 1.2s cubic-bezier(0.16, 1, 0.3, 1)',
        'wave': 'wave 8s ease-in-out infinite',
      },
      keyframes: {
        fadeIn: {
          '0%': { opacity: '0' },
          '100%': { opacity: '1' },
        },
        slideUp: {
          '0%': { opacity: '0', transform: 'translateY(20px)' },
          '100%': { opacity: '1', transform: 'translateY(0)' },
        },
        slideInRight: {
          '0%': { opacity: '0', transform: 'translateX(-20px)' },
          '100%': { opacity: '1', transform: 'translateX(0)' },
        },
        parallax: {
          '0%': { transform: 'translateY(10%)' },
          '100%': { transform: 'translateY(0)' },
        },
        luxuryFade: {
          '0%': { opacity: '0', transform: 'translateY(30px) scale(0.98)' },
          '100%': { opacity: '1', transform: 'translateY(0) scale(1)' },
        },
        wave: {
          '0%, 100%': { transform: 'translateX(0) translateY(0)' },
          '25%': { transform: 'translateX(-2%) translateY(1%)' },
          '50%': { transform: 'translateX(0) translateY(2%)' },
          '75%': { transform: 'translateX(2%) translateY(1%)' },
        },
      },
      transitionDuration: {
        '400': '400ms',
        '600': '600ms',
        '800': '800ms',
        '1200': '1200ms',
      },
      transitionTimingFunction: {
        'luxury': 'cubic-bezier(0.16, 1, 0.3, 1)',
      },
      backgroundImage: {
        'gradient-luxury': 'linear-gradient(135deg, var(--tw-gradient-stops))',
        'gradient-radial': 'radial-gradient(ellipse at center, var(--tw-gradient-stops))',
        'gradient-beach': `linear-gradient(180deg, ${colors.nordsee[50]} 0%, ${colors.sand[100]} 100%)`,
      },
      boxShadow: {
        'luxury': '0 25px 50px -12px rgba(0, 0, 0, 0.15)',
        'luxury-sm': '0 10px 25px -5px rgba(0, 0, 0, 0.1)',
        'card': '0 4px 30px rgba(0, 0, 0, 0.08)',
      },
      backdropBlur: {
        'luxury': '20px',
      },
    },
  },
  plugins: [],
};

export default config;
