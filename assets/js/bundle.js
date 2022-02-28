import Alpine from 'alpinejs'
function onLoad() {
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