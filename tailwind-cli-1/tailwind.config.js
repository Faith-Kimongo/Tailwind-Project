const tailwindcss = require("tailwindcss");

module.exports = {
  content: ['./tailwind-cli/**/*.{html,js}'],
  theme: {
    extend: {},
  },
  corePlugins: {
    aspectRatio: false,
  },
  plugins: [require('@tailwindcss/aspect-ratio')],
}
