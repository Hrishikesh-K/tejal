// noinspection JSCheckFunctionSignatures

const {black, dark, green, gray, light, red, yellow} = require('windicss/colors')
const {defineConfig} = require('windicss/helpers')
const gap2 = 'calc((100%/3) - (2.5rem/3))'
const gap3 = 'calc((100%/4) - (3.75rem/4))'
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
  safelist: 'delay-2500 opacity-0 opacity-100 translate-y-0 translate-y-20',
  theme: {
    colors: {
      black,
      current: 'currentColor',
      dark,
      gray,
      green,
      inherit: 'inherit',
      light,
      red,
      space: '#0e0042',
      transparent: 'transparent',
      yellow
    },
    extend: {
      height: {
        content: 'calc(100% - 7.5rem)'
      },
      maxWidth: {
        gap2: 'calc(50% - 1.25rem)',
        header2: 'calc(100% - 3.75rem)',
        headerText1: gap3,
        headerText2: gap2
      },
      screens: {
        xs: '420px'
      },
      transitionProperty: {
        background: 'background',
        filter: 'filter',
        filterTransform: 'filter,transform',
        opacityTransform: 'opacity,transform',
        paddingTextTransform: 'font-size,line-height,padding,transform'
      },
      width: {
        card: 'calc(100% - 5rem)',
        form: 'calc(100% - 2.5rem)',
        gap2: 'calc(50% - 1.25rem)',
        masonryLg: gap2,
        masonrySm: 'calc((100%/2) - (1.25rem/2))',
        masonryXl: gap3
      }
    },
    fontFamily: {
      orbitron: ['Orbitron', 'sans-serif'],
      space: ['Space Mono', 'monospace']
    }
  }
})