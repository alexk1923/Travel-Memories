/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.{js,jsx,ts,tsx}", "./index.html"],
  theme: {
    extend: {
      colors: {
        'white': '#f5f5f5',
        'input-white': '#d9d9d9',
        'pure-white': '#ffffff',
        'primary': '#001A5C',
        'dark-gray': '#333333',
        'gray': '#555555',
        'light-gray': '#f7f7f7',
        'red': '#c62525'
      },
      backgroundImage: {
        'hero-pattern': "url('/img/hero-pattern.svg')",
        'waves-bg': "url('./img/waves-bg.png')",
      }
    },

  },
  plugins: [],
}

