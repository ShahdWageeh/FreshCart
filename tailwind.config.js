/** @type {import('tailwindcss').Config} */
export default {
  content: [ "./index.html", "./src/**/*.{js,ts,jsx,tsx}", './node_modules/flowbite/**/*.js'],
  theme: {
    extend: {
      container: {
        center: true,
        padding: {
          default: '4rem',
          sm: '4rem',
          lg: '4rem',
          xl: '5rem',
          '2xl': '6rem',
        },
      },
    },
  },
  plugins: [
    require('flowbite/plugin')
  ],
}

