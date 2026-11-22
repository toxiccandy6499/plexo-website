/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,jsx}'],
  theme: {
    extend: {
      // Same palette as the original PLEXO site (calm-galileo/tailwind.config.js)
      colors: {
        paper: '#F6F4EE',      // plexo cream
        'paper-dark': '#ECE8DC',
        ivory: '#FAF8F5',
        beige: '#EEE7D8',      // replaces plain white surfaces
        line: '#D8D3C5',       // plexo border
        ink: '#111111',        // plexo dark
        charcoal: '#1A1A1A',
        plexo: { red: '#E52320', 'red-dark': '#C91B18', yellow: '#FFE600', gold: '#FFB800' }
      },
      fontFamily: {
        sans: ['"General Sans"', 'Inter', 'system-ui', 'sans-serif'],
        rubik: ['Rubik', 'sans-serif'],
        mono: ['"Space Mono"', 'monospace'],
        hand: ['Caveat', 'cursive']
      },
      letterSpacing: { tightest: '-0.045em' }
    }
  },
  plugins: []
}
