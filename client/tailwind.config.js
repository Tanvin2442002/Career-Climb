/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/**/*.{js,jsx,ts,tsx}",
  ],
  theme: {
    extend: {
      fontFamily: {
        "Poppins": ["Poppins", "sans-serif"],
        "Martel": ["Martel", "sans-serif"],
        sans: ["Inter", "sans-serif"],
      },
      letterSpacing: {
        wider: '0.1em',
        widest: '0.25em',
      },
      colors: {
        CG: '#419A5B',
      },
    },
  },
  plugins: [],
}