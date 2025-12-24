import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        background: "var(--background)",
        foreground: "var(--foreground)",
        // Maritime color palette
        "deep-sea-blue": {
          DEFAULT: "#0A2540",
          50: "#E8F4FC",
          100: "#C5E1F5",
          200: "#8DC5ED",
          300: "#4DA3DC",
          400: "#1E7BBF",
          500: "#0A2540",
          600: "#081E34",
          700: "#061728",
          800: "#04101C",
          900: "#020910",
        },
        "rich-gold": {
          DEFAULT: "#C9A962",
          50: "#FCF8EE",
          100: "#F7EDCF",
          200: "#EFD99F",
          300: "#E4C26F",
          400: "#C9A962",
          500: "#B89442",
          600: "#937733",
          700: "#6E5927",
          800: "#493C1A",
          900: "#251E0D",
        },
      },
    },
  },
  plugins: [],
};
export default config;
