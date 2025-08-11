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
      },
      fontFamily: {
        lato: ['Lato', 'sans-serif'],
      },
      animation: {
        "slide-in-bck-center": "slide-in-bck-center 0.7s cubic-bezier(0.250, 0.460, 0.450, 0.940) 1s  both"
      },
      keyframes: {
        "slide-in-bck-center": {
          "0%": {
            transform: "translateZ(600px)",
            opacity: "0"
          },
          to: {
            transform: "translateZ(0)",
            opacity: "1"
          }
        }
      }
    },
  },
  plugins: [],
};
export default config;
