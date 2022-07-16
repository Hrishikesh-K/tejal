export default () => {
  const remToPixel = parseFloat(getComputedStyle(document.documentElement).fontSize)
  const lazyImagesObserver = new IntersectionObserver((entries, observer) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        const image = new Image()
        const src = entry.target.getAttribute('data-lazy') || 'blank'
        image.addEventListener('load', () => {
          entry.target.setAttribute('src', src)
          entry.target.removeAttribute('data-lazy')
          observer.unobserve(entry.target)
        }, {
          once: true
        })
        image.src = src
      }
    })
  }, {
    rootMargin: `${remToPixel * 5}px 0px`,
    threshold: 0
  })
  document.querySelectorAll('[data-lazy]').forEach(element => {
    lazyImagesObserver.observe(element)
  })
}