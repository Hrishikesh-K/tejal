// noinspection JSCheckFunctionSignatures

const {dark, light} = require('windicss/colors')
const {defineConfig} = require('windicss/helpers')
module.exports = defineConfig({
  attributify: {
    prefix: 'w-'
  },
  darkMode: 'class',
  extract: {
    include: [
      './content/**/*.md',
      './layouts/**/*.html'
    ]
  },
  plugins: [
    require('@windicss/plugin-scrollbar'),
    require('windicss/plugin/aspect-ratio')
  ],
  theme: {
    colors: {
      current: 'currentColor',
      dark,
      inherit: 'inherit',
      light,
      transparent: 'transparent'
    },
    extend: {
      backgroundImage: {
        profile: `url('/img/profile.jpg')`
      },
      height: {
        content: 'calc(100% - 5rem)'
      },
      transitionProperty: {
        filter: 'filter'
      },
      width: {
        gap2: 'calc(50% - 1.25rem)',
        masonryLg: 'calc((100%/3) - ((2*1.25rem)/3))',
        masonrySm: 'calc((100%/2) - (1.25rem/2))'
      }
    },
    fontFamily: {
      sans: ['Caveat', 'sans-serif']
    }
  }
})