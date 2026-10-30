/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  theme: { extend: { fontFamily: { sans: ['DM Sans', 'sans-serif'], display: ['Manrope', 'sans-serif'] }, colors: { ink: '#242821', muted: '#858981', sage: '#71806a', paper: '#f7f7f5' } } },
  plugins: [],
}
