/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{ts,tsx}'],
  theme: {
    extend: {
      colors: {
        gold: {
          primary: '#C8960C',
          light: '#F2C94C',
        },
        crimson: {
          DEFAULT: '#8B1A1A',
        },
        ivory: {
          DEFAULT: '#FAF3E0',
        },
        stone: {
          DEFAULT: '#5C4A32',
          light: '#8C7355',
        },
        teal: {
          accent: '#1A6B6B',
        },
      },
      fontFamily: {
        display: ['Cinzel', 'serif'],
        body: ['Lato', 'sans-serif'],
      },
    },
  },
  plugins: [],
}
