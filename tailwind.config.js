/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        svvv: {
          primary: '#1e3a8a', // Navy Blue
          accent: '#f97316'   // Orange
        }
      }
    },
  },
  plugins: [],
}