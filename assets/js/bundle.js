// noinspection JSCheckFunctionSignatures, JSUnusedGlobalSymbols

import Alpine from 'alpinejs'
import {AmbientLight} from 'three'
import {AnimationMixer} from 'three'
import {Autoplay} from 'swiper'
import {BufferAttribute} from 'three'
import {BufferGeometry} from'three'
import {Clock} from 'three'
import {Color} from 'three'
import {EffectCards} from 'swiper'
import {EffectFade} from 'swiper'
import {FBXLoader} from 'three/examples/jsm/loaders/FBXLoader.js'
import ImagesLoaded from 'imagesloaded'
import {LoadingManager} from 'three'
import Masonry from 'masonry-layout'
import {Navigation} from 'swiper'
import {OrbitControls} from 'three/examples/jsm/controls/OrbitControls.js'
import {PerspectiveCamera} from 'three'
import {Points} from 'three'
import {PointsMaterial} from 'three'
import {Scene} from 'three'
import {sRGBEncoding} from 'three'
import Swiper from 'swiper'
import {Thumbs} from 'swiper'
import {WebGLRenderer} from 'three'
function onLoad() {
  window.removeEventListener('load', onLoad)
  Alpine.data('alpine', () => ({
    theme: 'light'
  }))
  Alpine.data('gallery', () => ({
    current: 0,
    last: null
  }))
  Alpine.start()
  if (location.pathname === '/') {
    function orbitControls() {
      cameraControl.update()
      canvas.render(scene, camera)
      requestAnimationFrame(orbitControls)
    }
    let width = window.innerWidth
    let height = window.innerHeight
    const manager = new LoadingManager()
    manager.onLoad = () => {
      orbitControls()
      camera.translateZ(10)
      canvas.render(scene, camera)
      canvas.setSize(width, height)
      canvas.outputEncoding = sRGBEncoding
      scene.background = new Color(0x0e0042)
      document.body.appendChild(canvas.domElement)
      scene.add(particleMesh, new AmbientLight(0xffffff, 1))
    }
    manager.onError = (url) => {
      console.log('There was an error loading ' + url)
    }
    manager.onProgress = (url, itemsLoaded, itemsTotal) => {
      console.log('Loading file: ' + url + '\nLoaded ' + itemsLoaded + ' of ' + itemsTotal + ' files')
    }
    const scene = new Scene()
    const canvas = new WebGLRenderer({
      antialias: true
    })
    const camera = new PerspectiveCamera(50, width / height)
    const cameraControl = new OrbitControls(camera, canvas.domElement)
    cameraControl.enablePan = cameraControl.enableZoom = false
    new FBXLoader(manager).load('/3d/earth.fbx', fbx => {
      function rotateEarth() {
        fbx.rotation.z -= 0.005
        requestAnimationFrame(rotateEarth)
      }
      rotateEarth()
      scene.add(fbx)
      fbx.translateZ(-3.75)
    })
    new FBXLoader(manager).load('/3d/astronaut.fbx', fbx => {
      function walkAstronaut() {
        mixer.update(time.getDelta())
        requestAnimationFrame(walkAstronaut)
      }
      let time = new Clock()
      let mixer = new AnimationMixer(fbx)
      let walkAnimation = mixer.clipAction(fbx.animations[0])
      scene.add(fbx)
      walkAstronaut()
      walkAnimation.play()
      fbx.translateY(-1.5)
      fbx.scale.set(0.0125, 0.0125, 0.0125)
    })
    const particleCount = 1000
    const particleGeometry = new BufferGeometry()
    const particlePositionArray = new Float32Array(particleCount * 3)
    const particleMesh = new Points(particleGeometry, new PointsMaterial({
      size: 0.05
    }))
    particleGeometry.setAttribute('position', new BufferAttribute(particlePositionArray, 3))
    for (let i = 0; i < particleCount * 3; i++) {
      particlePositionArray[i] = (Math.random() - 0.5) * 25
    }
    window.addEventListener('resize', () => {
      width = window.innerWidth
      height = window.innerHeight
      canvas.setSize(width, height)
      camera.aspect = width / height
      camera.updateProjectionMatrix()
    }, false)
  } else {
    const lazyImages = document.querySelectorAll('[data-lazy]')
    if (lazyImages.length > 0) {
      const lazyImagesObserver = new IntersectionObserver((entries, observer) => {
        entries.forEach(({isIntersecting, target}) => {
          if (isIntersecting) {
            const image = new Image()
            image.onload = function() {
              if (target.tagName === 'IMG') {
                target.src = this.src
              } else {
                target.style.backgroundImage = `url(${this.src})`
              }
              target.removeAttribute('data-lazy')
              observer.unobserve(target)
            }
            image.src = target.getAttribute('data-lazy')
          }
        })
      }, {
        rootMargin: `${parseFloat(getComputedStyle(document.documentElement).fontSize) * 5}px 0px 0px`,
        threshold: 0
      })
      lazyImages.forEach(element => {
        lazyImagesObserver.observe(element)
      })
    }
    const swipers = document.querySelectorAll('[data-gallery]')
    if (swipers.length > 0) {
      swipers.forEach(element => {
        new Swiper(element, {
          grabCursor: true,
          modules: [Autoplay, EffectCards, EffectFade, Navigation, Thumbs],
          navigation: {
            nextEl: '.swiper-button-next',
            prevEl: '.swiper-button-prev'
          },
          on: {
            activeIndexChange: () => {
              element._x_dataStack[0].current = element.swiper.activeIndex
            },
            afterInit: () => {
              element._x_dataStack[0].last = element.swiper.slides.length
            }
          },
          preloadImages: false,
          speed: 250,
          thumbs: {
            swiper: new Swiper(element.nextElementSibling, {
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
          },
          ...JSON.parse(element.getAttribute('data-gallery'))
        })
      })
    }
    const masonries = document.querySelectorAll('[data-masonry]')
    if (masonries.length > 0) {
      masonries.forEach(element => {
        new ImagesLoaded(element, () => {
          element.masonry = new Masonry(element, {
            gutter: parseFloat(getComputedStyle(document.documentElement).fontSize) * 1.25,
            percentPosition: true,
            stagger: 0,
            transitionDuration: 0
          })
        })
      })
      window.addEventListener('resize', () => {
        masonries.forEach(element => {
          setTimeout(() => {
            element.masonry.layout()
          }, 250)
        })
      })
    }
  }
}
window.addEventListener('load', onLoad)