import type { Config } from 'tailwindcss';
import syltConfig from '@sylt/config/tailwind';

const config: Config = {
  content: [
    './src/**/*.{js,ts,jsx,tsx,mdx}',
    '../../packages/ui/src/**/*.{js,ts,jsx,tsx}',
  ],
  theme: {
    extend: {
      ...syltConfig.theme?.extend,
    },
  },
  plugins: [],
};

export default config;
