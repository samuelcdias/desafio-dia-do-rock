/** @type {import('tailwindcss').Config} */
module.exports = {
  darkMode: 'selector',
  content: [
    "./src/**/*.{js,jsx,ts,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        'primary': '#8625D2',
        'primary-600': '#6819a8',
        'dark': '#131219',
        'dark-100': '#18171E',
        'dark-50': '#272631',
        'light': '#ECEDE6',
        'success': '#89DD13',
        'danger': '#FF413A',
      },
    },
    keyframes: {
      slideIn: {
        '0%': { transform: 'translateY(-10%)' },
        '100%': { transform: 'translateY(0)' },
      },
      slideRight: {
        '0%': { transform: 'translateX(-100%)' },
        '100%': { transform: 'translateX(200%)' },
      }
    },
    animation: {
      slideIn: 'slideIn 0.3s ease-in-out forwards',
      slideRight: 'slideRight 1.6s ease-in-out infinite',
    }
  },
  plugins: [],
}

