/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        dark: '#0d1216',
        darker: '#0a0a0c',
        surface: '#18191b',
        'surface-highlight': '#1f2124',
        lime: '#a7f175',
        limehover: '#96d969',
      },
      fontFamily: {
        sans: ['Manrope', 'sans-serif'],
        serif: ['"DM Serif Display"', 'serif'],
        display: ['"DM Serif Display"', 'serif'],
        mono: ['JetBrains Mono', 'monospace'],
      },
      boxShadow: {
        'float': '0 25px 50px -12px rgba(0, 0, 0, 0.5)',
        'glow-lime': '0 0 30px rgba(167, 241, 117, 0.1)',
      },
    },
  },
  plugins: [],
}
