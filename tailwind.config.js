/** @type {import('tailwindcss').Config} */
// ScholarNexus brand: navy #0a1f44, gold #c9a227, light blue-grey #eef1f8.
// The component uses Tailwind's `blue-*` and `amber-*` classes; they are remapped to the brand palette here.
module.exports = {
  content: ['./app/**/*.{js,jsx}', './components/**/*.{js,jsx}'],
  theme: {
    extend: {
      colors: {
        blue: {
          50: '#eef1f8', 100: '#dde3f0', 200: '#c0cbe2', 300: '#93a5cb', 400: '#c9a227',
          500: '#1f3a6e', 600: '#0a1f44', 700: '#081936', 800: '#06132a', 900: '#040d1d',
        },
        indigo: { 50: '#f7f3e3' },
        amber: { 500: '#c9a227' },
        navy: '#0a1f44',
        gold: '#c9a227',
      },
    },
  },
  plugins: [],
};
