/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./*.{htm,js}", "./node_modules/flowbite/**/*.js"],
  theme: {
    extend: {},
  },
  plugins: [
    require('flowbite/plugin')
]
}
