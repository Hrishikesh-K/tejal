// noinspection JSCheckFunctionSignatures, JSUnresolvedFunction, JSUnusedGlobalSymbols

import Alpine from 'alpinejs'
import {AmbientLight} from 'three'
import {AnimationMixer} from 'three'
import {Autoplay} from 'swiper'
import Axios from 'axios'
import {BufferAttribute} from 'three'
import {BufferGeometry} from'three'
import {Clock} from 'three'
import Collapse from '@alpinejs/collapse'
import {EffectCards} from 'swiper'
import {EffectFade} from 'swiper'
import {FBXLoader} from 'three/examples/jsm/loaders/FBXLoader.js'
import {FileLoader} from 'three/src/loaders/FileLoader.js'
import ImagesLoaded from 'imagesloaded'
import Masonry from 'masonry-layout'
import {Navigation} from 'swiper'
import {OrbitControls} from 'three/examples/jsm/controls/OrbitControls.js'
import {PerspectiveCamera} from 'three'
import {Points} from 'three'
import {PointsMaterial} from 'three'
import {Scene} from 'three'
import {sRGBEncoding} from 'three'
import Swiper from 'swiper'
import {TextureLoader} from 'three/src/loaders/TextureLoader.js'
import {Thumbs} from 'swiper'
import {WebGLRenderer} from 'three'
function onLoad() {
  window.removeEventListener('load', onLoad)
  Alpine.data('animation', () => ({
    loaded: false,
    progress: null
  }))
  Alpine.data('contact', () => ({
    email: null,
    error: false,
    message: null,
    name: null,
    progress: false,
    setHeight(event) {
      event.currentTarget.style.height = '12rem'
      event.currentTarget.style.height = `${event.currentTarget.scrollHeight}px`
    },
    subject: null,
    submitData() {
      this.progress = true
      Axios({
        data: {
          email: this.email,
          message: this.message,
          name: this.name,
          subject: this.subject
        },
        method: 'post',
        url: '/.netlify/functions/submit/'
      }).then(() => {
        this.$el.reset()
        this.progress = false
      }).catch(({response}) => {
        this.error = true
        this.progress = false
        console.log(response)
      })
    }
  }))
  Alpine.data('gallery', () => ({
    current: 0,
    last: null
  }))
  Alpine.data('global', () => ({
    checkTheme() {
      const selectedTheme = localStorage.getItem('theme')
      if (selectedTheme) {
        this.theme = selectedTheme
      } else {
        if (window.matchMedia('(prefers-color-scheme: dark)').matches) {
          this.theme = 'dark'
        } else {
          this.theme = 'light'
        }
      }
    },
    hash: {
      art: true,
      check() {
        if (location.hash) {
          if (location.hash === '#art') {
            this.art = true
            this.projects = false
          } else if (location.hash === '#projects') {
            this.projects = true
            this.about = true
          }
        }
      },
      projects: true
    },
    init() {
      this.checkTheme()
      if (location.pathname === '/work/') {
        this.hash.check()
      }
    },
    js: false,
    theme: 'light',
    toggleTheme() {
      if (this.theme === 'dark') {
        this.theme = 'light'
      } else {
        this.theme = 'dark'
      }
      localStorage.setItem('theme', this.theme)
    }
  }))
  Alpine.plugin(Collapse)
  Alpine.start()
  if (location.pathname === '/' || location.pathname === '/contact/') {
    const progressManager = Alpine.reactive({
      astronaut: 0,
      earth: 0,
      keyboard: 0,
      texture: 0
    })
    Alpine.effect(() => {
      const progress = ((progressManager.astronaut + progressManager.earth + progressManager.keyboard + progressManager.texture) * 100).toFixed(2)
      document.querySelector('[x-data="animation"]')._x_dataStack[0].progress = progress
      if (progress >= 100) {
        setTimeout(() => {
          orbitControls()
          canvas.render(scene, camera)
          canvas.setSize(width, height)
          canvas.outputEncoding = sRGBEncoding
          document.body.querySelector('div').appendChild(canvas.domElement)
          scene.add(particleMesh, new AmbientLight(0xeeeeee))
          document.querySelector('[x-data="animation"]')._x_dataStack[0].loaded = true
          if (location.pathname === '/contact/') {
            document.querySelector('form').removeAttribute('w-display')
          }
        }, 250)
      }
    })
    function orbitControls() {
      cameraControl.update()
      canvas.render(scene, camera)
      requestAnimationFrame(orbitControls)
    }
    let width = window.innerWidth
    let height = window.innerHeight
    const scene = new Scene()
    const canvas = new WebGLRenderer({
      antialias: true
    })
    const camera = new PerspectiveCamera(50, width / height)
    camera.translateZ(10)
    const cameraControl = new OrbitControls(camera, canvas.domElement)
    cameraControl.enablePan = cameraControl.enableZoom = false
    const earthSize = 107628
    const astronautTypeSize = 1083804
    const astronautWalkSize = 517820
    const astronautTextureSize = 1808728
    const keyboardSize = 79980
    function calculateProgress(progress, total) {
      if (location.pathname === '/') {
        return (progress.loaded / total) * (total / (earthSize + astronautWalkSize + astronautTextureSize))
      } else {
        return (progress.loaded / total) * (total / (earthSize + astronautTypeSize + astronautTextureSize + keyboardSize))
      }
    }
    if (location.pathname === '/contact/') {
      new FBXLoader().load('/3d/keyboard.fbx', fbx => {
        fbx.rotation.x = (-Math.PI / 2).toFixed(2)
        fbx.position.set(0.125, -0.25, 1)
        fbx.scale.set(1.25, 1.25, 1.25)
        scene.add(fbx)
      }, progress => {
        progressManager.keyboard = calculateProgress(progress, keyboardSize)
      })
    }
    new FBXLoader().load('/3d/earth.fbx', fbx => {
      fbx.children[0].material.color = {
        b: 1,
        g: 0.125,
        r: 0
      }
      fbx.children[1].material.color = {
        b: 0.0625,
        g: 1,
        r: 0
      }
      function rotateEarth() {
        fbx.rotation.z -= 0.005
        requestAnimationFrame(rotateEarth)
      }
      rotateEarth()
      scene.add(fbx)
      fbx.translateZ(-3.75)
    }, progress => {
      progressManager.earth = calculateProgress(progress, earthSize)
    })
    let astronaut = '/3d/astronaut'
    if (location.pathname === '/') {
      astronaut += 'Walk.fbx'
    } else {
      astronaut += 'Type.fbx'
    }
    new FBXLoader().load(astronaut, fbx => {
      const fileLoader = new FileLoader()
      fileLoader.setResponseType('blob')
      const textureUrl = '/3d/astronautBaseColor.png'
      fileLoader.load(textureUrl, blob => {
        const blobUrl = URL.createObjectURL(blob)
        let image = document.createElement('img')
        image.onload = () => {
          image.remove()
          image = null
          new TextureLoader().load(blobUrl, texture => {
            URL.revokeObjectURL(blobUrl)
            texture.encoding = sRGBEncoding
            if (location.pathname === '/') {
              fbx.children[0].material.map = texture
              fbx.children[0].material.needsUpdate = true
            } else {
              fbx.children[1].material.map = texture
              fbx.children[1].material.needsUpdate = true
            }
          })
        }
        image.src = blobUrl
      }, progress => {
        progressManager.texture = calculateProgress(progress, astronautTextureSize)
      })
      function playAstronaut() {
        mixer.update(time.getDelta())
        requestAnimationFrame(playAstronaut)
      }
      let time = new Clock()
      let mixer = new AnimationMixer(fbx)
      let playAnimation = mixer.clipAction(fbx.animations[0])
      playAstronaut()
      playAnimation.play()
      fbx.translateY(-1.5)
      fbx.scale.set(0.0125, 0.0125, 0.0125)
      scene.add(fbx)
    }, progress => {
      if (location.pathname === '/') {
        progressManager.astronaut = calculateProgress(progress, astronautWalkSize)
      } else {
        progressManager.astronaut = calculateProgress(progress, astronautTypeSize)
      }
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
    const remToPixel = parseFloat(getComputedStyle(document.documentElement).fontSize)
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
        rootMargin: `${remToPixel * 5}px 0px ${remToPixel * 2.5}px`,
        threshold: 0
      })
      lazyImages.forEach(element => {
        lazyImagesObserver.observe(element)
      })
    }
    const swipers = document.querySelectorAll('[data-gallery]')
    if (swipers.length > 0) {
      swipers.forEach(element => {
        const swiperElement = element.querySelector('.swiper')
        new Swiper(swiperElement, {
          grabCursor: true,
          modules: [Autoplay, EffectCards, EffectFade, Navigation, Thumbs],
          navigation: {
            nextEl: element.querySelector('.swiper-button-next'),
            prevEl: element.querySelector('.swiper-button-prev')
          },
          on: {
            activeIndexChange: () => {
              element._x_dataStack[0].current = swiperElement.swiper.activeIndex
            },
            afterInit: () => {
              element._x_dataStack[0].last = swiperElement.swiper.slides.length
            }
          },
          preloadImages: false,
          speed: 250,
          thumbs: {
            swiper: new Swiper(swiperElement.nextElementSibling, {
              breakpoints: {
                640: {
                  slidesPerView: 5
                },
                960: {
                  slidesPerView: 7
                }
              },
              centerInsufficientSlides: true,
              grabCursor: true,
              preloadImages: false,
              slidesPerView: 5,
              spaceBetween: remToPixel * 1.25,
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
        function loadMasonry() {
          element.masonry = new Masonry(element, {
            gutter: remToPixel * 1.25,
            percentPosition: true,
            stagger: 0,
            transitionDuration: 0
          })
        }
        new ImagesLoaded(element, () => {
          const videos = element.querySelectorAll('video')
          if (videos.length > 0) {
            const promises = []
            videos.forEach(video => {
              promises.push(new Promise(resolve => {
                video.onloadedmetadata = () => {
                  resolve()
                  video.onloadedmetadata = null
                }
              }))
            })
            Promise.all(promises).then(() => {
              loadMasonry()
            })
          } else {
            loadMasonry()
          }
        })
      })
    }
  }
}
window.addEventListener('load', onLoad)