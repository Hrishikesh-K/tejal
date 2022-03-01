const {black, coolGray, pink, white} = require('windicss/colors')
const {defineConfig} = require('windicss/helpers')
module.exports = defineConfig({
  attributify: {
    prefix: 'w-'
  },
  extract: {
    include: [
      './content/**/*.md',
      './layouts/**/*.html'
    ]
  },
  plugins: [
    //require('@windicss/plugin-interaction-variants'),
    require('@windicss/plugin-scrollbar'),
    //require('windicss/plugin/aspect-ratio'),
    //require('windicss/plugin/scroll-snap')
  ],
  theme: {
    colors: {
      black,
      coolGray,
      pink,
      white
    },
    extend: {
      fontFamily: {
        sans: ['ftnk', 'ui-sans-serif', 'system-ui']
      },
      height: {
        '100-5': 'calc(100% - 5rem)'
      },
      transitionDuration: {
        250: '250ms'
      },
      transitionProperty: {
        height: 'height',
        opacity: 'opacity'
      }
    },
  }
})