/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}"
  ],
  theme: {
    extend: {
      fontFamily: {
        poppins: ['Poppins', 'sans-serif'],
      },
      colors: {
        primary: '#EC4899',
        secondary: '#F472B6',
        cream: '#FFF7ED',
        dark: '#0F172A'
      }
    },
  },
  plugins: [],
}
