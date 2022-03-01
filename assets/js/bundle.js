import Alpine from 'alpinejs'
import Swup from 'swup'
import SwupProgressPlugin from '@swup/progress-plugin'
function onLoad() {
  new Swup({
    animateHistoryBrowsing: true,
    plugins: [
      new SwupProgressPlugin({
        delay: 0,
        transition: 250
      })
    ]
  })
  function onResize() {
    document.querySelector('[x-data="header"]')._x_dataStack[0].enable = window.innerWidth < 640
  }
  Alpine.data('header', () => ({
    enable: window.innerWidth < 640,
    expand: false
  }))
  Alpine.start()
  document.querySelectorAll('body>*:not(noscript)').forEach(element => {
    element.style.display = 'block'
  })
  window.removeEventListener('load', onLoad)
  window.addEventListener('resize', onResize)
}
window.addEventListener('load', onLoad)