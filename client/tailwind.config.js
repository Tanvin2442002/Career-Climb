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
        "kanit": ["Kanit", "sans-serif"],
        "Bai_Jamjuree": ["Bai Jamjuree", "sans-serif"],
        sans: ["Inter", "sans-serif"],
      },
      letterSpacing: {
        wider: '0.1em',
        widest: '0.25em',
      },
      colors: {
        // cg: '#419A5B',
        green: {
          DEFAULT: '#419A5B',
          'opacity-80': 'rgba(65, 154, 91, 0.8)',
          'opacity-50': 'rgba(65, 154, 91, 0.5)',
          'opacity-30': 'rgba(65, 154, 91, 0.3)',
          'opacity-20': 'rgba(65, 154, 91, 0.2)',
          'opacity-10': 'rgba(65, 154, 91, 0.1)',
          'opacity-5': 'rgba(65, 154, 91, 0.05)',
          'opacity-2': 'rgba(65, 154, 91, 0.02)',
        },
        background: '#FFFFFF'
      }
    },
  },
  plugins: [],
}