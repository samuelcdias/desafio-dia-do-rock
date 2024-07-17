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
        'dark-200': '#1D1C24',
        'dark-300': '#22212A',
        'dark-400': '#27262F',
        'light': '#ECEDE6',
        'success': '#89DD13',
        'danger': '#FF413A',
      },
    },
  },
  plugins: [],
}

