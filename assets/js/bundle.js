// noinspection JSValidateTypes,JSUnresolvedFunction,JSCheckFunctionSignatures,JSVoidFunctionReturnValueUsed,JSUnusedGlobalSymbols,JSIgnoredPromiseFromCall

import Alpine from 'alpinejs'
import Axios from 'axios'
import Masonry from 'masonry-layout'
import Swiper, {EffectCards, Navigation, Thumbs} from 'swiper'
import * as Pdf from 'pdfjs-dist'
import Swup from 'swup'
import SwupProgressPlugin from '@swup/progress-plugin'
function onLoad() {
  Pdf.GlobalWorkerOptions.workerSrc = '/js/pdf-worker.min.js'
  let contactForm, lazyImagesObserver, pdfs, portfolioCardsObserver
  const intersectionOptions = {
    rootMargin: `${parseFloat(getComputedStyle(document.documentElement).fontSize) * 3.5}px 0px`,
    threshold: 0
  }
  const swup = new Swup({
    animateHistoryBrowsing: true,
    animationSelector: '[class*="swup-transition-"]',
    plugins: [new SwupProgressPlugin({
      delay: 0,
      transition: 250
    })]
  })
  function onInput(event) {
    event.currentTarget.style.height = '125px'
    event.currentTarget.style.height = `${event.currentTarget.scrollHeight}px`
  }
  function onPageLoad() {
    contactForm = document.querySelector('form')
    const lazyImages = document.querySelectorAll('[data-lazy]')
    const portfolioCards = document.querySelectorAll('.group')
    if (contactForm) {
      contactForm.addEventListener('submit', onSubmit)
      contactForm.querySelector('textarea').addEventListener('input', onInput)
    }
    if (lazyImages.length > 0) {
      lazyImagesObserver = new IntersectionObserver((entries, observer) => {
        entries.forEach(({isIntersecting, target}) => {
          if (isIntersecting) {
            const image = new Image()
            image.onload = function() {
              if (target.tagName === 'IMG') {
                target.src = this.src
              } else {
                target.style.backgroundImage = `url(${this.src})`
              }
              ['data-lazy', 'w:filter'].forEach(attribute => {
                target.removeAttribute(attribute)
              })
              const transform = target.getAttribute('w:transform')
              if (transform.includes('group')) {
                target.setAttribute('w:transform', transform.replace(' scale-110', ''))
              } else {
                target.removeAttribute('w:transform')
              }
              observer.unobserve(target)
              target.observer = false
            }
            image.src = target.getAttribute('data-lazy')
          }
        })
      }, intersectionOptions)
      lazyImages.forEach(element => {
        element.observer = true
        lazyImagesObserver.observe(element)
      })
    }
    if (portfolioCards.length > 0) {
      let index = 0
      const attributeNames = ['w:opacity', 'w:transform']
      portfolioCardsObserver = new IntersectionObserver((entries, observer) => {
        entries.forEach(entry => {
          if (entry.isIntersecting) {
            entry.target.style.transitionDelay = `${index * 250}ms`
            attributeNames.forEach(attributeName => {
              entry.target.removeAttribute(attributeName)
            })
            observer.unobserve(entry.target)
            entry.target.observer = false
            index++
          } else {
            index = 0
          }
        })
      }, intersectionOptions)
      portfolioCards.forEach(element => {
        element.observer = true
        portfolioCardsObserver.observe(element)
      })
    }
  }
  function onPageUnload() {
    document.querySelectorAll('[x-data]:not(body)').forEach(element => {
      element._x_dataStack[0].destroy()
    })
    if (contactForm) {
      contactForm.removeEventListener('submit', onSubmit)
      contactForm.querySelector('textarea').removeEventListener('input', onInput)
    }
    if (lazyImagesObserver) {
      lazyImagesObserver.disconnect()
    }
    if (portfolioCardsObserver) {
      portfolioCardsObserver.disconnect()
    }
    Alpine.store('navOpen', false)
    contactForm  = lazyImagesObserver = portfolioCardsObserver = pdfs  = null
  }
  function onResize() {
    Alpine.store('navToggle', window.innerWidth < 640)
    if (pdfs) {
      pdfs.forEach(pdf => {
        pdf._x_dataStack[0].displayPdf()
      })
    }
  }
  function onSubmit(event) {
    event.preventDefault()
    Alpine.store('formError', false)
    Alpine.store('formProgress', true)
    Axios({
      data: Object.fromEntries(new FormData(event.target).entries()),
      method: 'post',
      url: '/api/submit/'
    }).then(() => {
      event.target.reset()
      Alpine.store('formProgress', false)
    }).catch(({response}) => {
      Alpine.store('formError', true)
      Alpine.store('formProgress', false)
      console.log(response)
    })
  }
  Alpine.data('gallery', element => ({
    destroy() {
      if (element) {
        element.swiper.destroy(true, true)
        element.nextElementSibling.swiper.destroy(true, true)
      }
    },
    init() {
      const thumbItem = new Swiper(element.nextElementSibling, {
        breakpoints: {
          640: {
            slidesPerView: 7
          }
        },
        centerInsufficientSlides: true,
        grabCursor: true,
        preloadImages: false,
        slidesPerView: 3,
        spaceBetween: parseFloat(getComputedStyle(document.documentElement).fontSize) * 1.25,
        speed: 250
      })
      new Swiper(element, {
        effect: element.getAttribute('data-effect'),
        grabCursor: true,
        modules: [EffectCards, Navigation, Thumbs],
        navigation: {
          nextEl: '.swiper-button-next',
          prevEl: '.swiper-button-prev'
        },
        preloadImages: false,
        speed: 250,
        thumbs: {
          swiper: thumbItem
        }
      })
    }
  }))
  Alpine.data('masonry', element => ({
    destroy() {
      element.masonry.destroy()
    },
    init() {
      Promise.all(Array.from(element.querySelectorAll('img')).filter(checkImage => {
        return !checkImage.complete
      }).map(actualImage => {
        return new Promise(resolve => {
          actualImage.onerror = actualImage.onload = resolve
        })
      })).then(() => {
        element.masonry =  new Masonry(element, {
          gutter: parseFloat(getComputedStyle(document.documentElement).fontSize) * 1.25,
          stagger: 0,
          transitionDuration: 0
        })
      })
    }
  }))
  Alpine.data('pdf', element => ({
    destroy() {
      if (this.loaded === 'done') {
        element.pdf.destroy()
      }
    },
    init() {
      if (!pdfs) {
        pdfs = []
      }
      pdfs.push(element)
    },
    displayPdf() {
      if (element.pdf) {
        const canvasElement = element.querySelector('canvas')
        element.pdf.getPage(parseInt(this.page)).then(page => {
          const viewport = page.getViewport({
            scale: parseInt(window.getComputedStyle(element.querySelector('[data-pdf-container]')).width) / page.getViewport({
              scale: this.scale
            }).width
          })
          canvasElement.height = viewport.height
          canvasElement.width = viewport.width
          canvasElement.style.height = `${viewport.height}px`
          canvasElement.style.width = `${viewport.width}px`
          if (this.render) {
            this.render.cancel()
            if (this.render._internalRenderTask._pageIndex + 1 === this.page) {
              this.displayPdf()
            }
            this.render = null
          } else {
            this.render = page.render({
              canvasContext: canvasElement.getContext('2d'),
              viewport
            })
            this.render.promise.then(() => {
              this.render = null
            }).catch(error => {
              if (error.name !== 'RenderingCancelledException') {
                this.error = true
                console.log(error)
              }
            })
          }
        })
      }
    },
    error: null,
    load() {
      this.loaded = 'loading'
      const loadPdf = Pdf.getDocument({
        disableAutoFetch: true,
        disableFontFace: true,
        disableStream: true,
        length: element.getAttribute('data-pdf-size'),
        url: element.getAttribute('data-pdf')
      })
      loadPdf.onProgress = ({loaded, total}) => {
        this.loaded = ((loaded / total) * 100).toFixed(0)
      }
      loadPdf.promise.then(pdf => {
        this.loaded = 'done'
        element.pdf = pdf
        this.maxPage = pdf.numPages
        this.displayPdf()
        element.addEventListener('resize', this.displayPdf)
      }).catch(error => {
        this.error = true
        console.log(error)
      })
    },
    loaded: null,
    maxPage: null,
    page: 1,
    render: null,
    scale: 1
  }))
  Alpine.store('currentPage', false)
  Alpine.store('formError', false)
  Alpine.store('formProgress', false)
  Alpine.store('img', false)
  Alpine.store('navOpen', false)
  Alpine.store('navToggle', window.innerWidth < 640)
  Alpine.start()
  document.querySelector('body>div').style.display = 'block'
  onPageLoad()
  swup.on('transitionEnd', onPageLoad)
  swup.on('transitionStart', onPageUnload)
  window.addEventListener('resize', onResize)
  window.removeEventListener('load', onLoad)
}
window.addEventListener('load', onLoad)