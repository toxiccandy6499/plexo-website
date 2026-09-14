/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        fin: {
          dark: '#0B0F17',
          card: '#131B2A',
          border: '#1E293B',
          accent: '#6366F1',
          cyan: '#06B6D4',
          emerald: '#10B981',
          rose: '#F43F5E',
          amber: '#F59E0B',
          purple: '#8B5CF6'
        },
        plexo: {
          yellow: '#FFE600',
          'yellow-light': '#FFF500',
          red: '#E52320',
          'red-dark': '#C91B18',
          cream: '#F6F4EE',
          'cream-dark': '#ECE8DC',
          dark: '#111111',
          charcoal: '#1A1A1A',
          border: '#D8D3C5',
          gold: '#FFB800'
        }
      },
      fontFamily: {
        sans: ['Inter', 'sans-serif'],
        headline: ['"Cabinet Grotesk"', 'sans-serif'],
        mono: ['"Space Mono"', 'JetBrains Mono', 'monospace'],
        display: ['"Cabinet Grotesk"', 'sans-serif'],
        bebas: ['"Bebas Neue"', 'Impact', 'sans-serif'],
        handwriting: ['"Caveat"', 'cursive'],
        rubik: ['"Rubik"', 'sans-serif']
      }
    },
  },
  plugins: [],
}
