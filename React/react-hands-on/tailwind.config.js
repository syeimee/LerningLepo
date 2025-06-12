import daisyui from 'daisyui';
/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{jsx,tsx,js,html}'],
  theme: {
    extend: {},
  },
  plugins: [daisyui],
  daisyui: {
    logs: false,
    themes: ['dark', 'cupcake'],
  },
};
