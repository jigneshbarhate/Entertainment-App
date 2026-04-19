/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        'red-netflix': '#E50914',
        'dark-bg': '#141414',
        'dark-blue': '#10141e',
        'darkish-blue': '#161d2f',
        'greyish-blue': '#5a698f',
      },
      fontFamily: {
        outfit: ['Outfit', 'sans-serif'],
      }
    },
  },
  plugins: [],
}
