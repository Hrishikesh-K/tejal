// noinspection JSCheckFunctionSignatures

const {black, green, red, white, yellow} = require('windicss/colors')
const {defineConfig} = require('windicss/helpers')
module.exports = defineConfig({
  attributify: {
    prefix: 'w:'
  },
  extract: {
    include: [
      './content/**/*.md',
      './layouts/**/*.html'
    ]
  },
  plugins: [
    require('@windicss/plugin-interaction-variants'),
    require('@windicss/plugin-scrollbar'),
    require('windicss/plugin/aspect-ratio'),
    require('windicss/plugin/scroll-snap')
  ],
  safelist: 'delay-[2500ms] opacity-0 opacity-100 translate-y-0 translate-y-20',
  theme: {
    colors: {
      black,
      green,
      current: 'currentColor',
      red,
      transparent: 'transparent',
      white,
      yellow
    },
    extend: {
      cursor: {
        'zoom-in': 'zoom-in',
        'zoom-out': 'zoom-out'
      },
      transitionDuration: {
        250: '250ms'
      },
      transitionProperty: {
        background: 'background',
        'font-size': 'font-size',
        height: 'height',
        slide: 'opacity,transform'
      },
      width: {
        fit: 'fit-content'
      }
    }
  },
  variants: {
    transform: [
      'can-hover'
    ]
  }
})