const {dark, gray, light} = require('windicss/colors')
const {defineConfig} = require('windicss/helpers')
module.exports = defineConfig({
  attributify: {
    prefix: 'w-'
  },
  darkMode: 'class',
  extract: {
    exclude: ['node_modules/**/*'],
    include: ['**/*.{html,md}']
  },
  plugins: [require('@windicss/plugin-scrollbar'), require('windicss/plugin/aspect-ratio')],
  theme: {
    colors: {
      current: 'currentColor',
      dark,
      gray,
      inherit: 'inherit',
      light,
      transparent: 'transparent',
    },
    extend: {
      fontFamily: {
        orbitron: ['Orbitron', 'sans-serif'],
        space: ['Space Mono', 'monospace']
      }
    }
  }
})