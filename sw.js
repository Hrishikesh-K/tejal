const PRECACHE = 'Bubble Breaker v1';
const RUNTIME = 'runtime';
const PRECACHE_URLS = [
  'index.html',
  'Bubble%20Breaker.hyperesources/android-chrome-36x36.png',
  'Bubble%20Breaker.hyperesources/android-chrome-48x48.png',
  'Bubble%20Breaker.hyperesources/android-chrome-72x72.png',
  'Bubble%20Breaker.hyperesources/android-chrome-96x96.png',
  'Bubble%20Breaker.hyperesources/android-chrome-144x144.png',
  'Bubble%20Breaker.hyperesources/android-chrome-192x192.png',
  'Bubble%20Breaker.hyperesources/android-chrome-256x256.png',
  'Bubble%20Breaker.hyperesources/android-chrome-384x384.png',
  'Bubble%20Breaker.hyperesources/android-chrome-512x512.png',
  'Bubble%20Breaker.hyperesources/apple-touch-icon.png',
  'Bubble%20Breaker.hyperesources/apple-touch-icon-57x57.png',
  'Bubble%20Breaker.hyperesources/apple-touch-icon-57x57-precomposed.png',
  'Bubble%20Breaker.hyperesources/apple-touch-icon-60x60.png',
  'Bubble%20Breaker.hyperesources/apple-touch-icon-60x60-precomposed.png',
  'Bubble%20Breaker.hyperesources/apple-touch-icon-72x72.png',
  'Bubble%20Breaker.hyperesources/apple-touch-icon-72x72-precomposed.png',
  'Bubble%20Breaker.hyperesources/apple-touch-icon-76x76.png',
  'Bubble%20Breaker.hyperesources/apple-touch-icon-76x76-precomposed.png',
  'Bubble%20Breaker.hyperesources/apple-touch-icon-114x114.png',
  'Bubble%20Breaker.hyperesources/apple-touch-icon-114x114-precomposed.png',
  'Bubble%20Breaker.hyperesources/apple-touch-icon-120x120.png',
  'Bubble%20Breaker.hyperesources/apple-touch-icon-120x120-precomposed.png',
  'Bubble%20Breaker.hyperesources/apple-touch-icon-144x144.png',
  'Bubble%20Breaker.hyperesources/apple-touch-icon-144x144-precomposed.png',
  'Bubble%20Breaker.hyperesources/apple-touch-icon-152x152.png',
  'Bubble%20Breaker.hyperesources/apple-touch-icon-152x152-precomposed.png',
  'Bubble%20Breaker.hyperesources/apple-touch-icon-180x180.png',
  'Bubble%20Breaker.hyperesources/apple-touch-icon-180x180-precomposed.png',
  'Bubble%20Breaker.hyperesources/apple-touch-icon-precomposed.png',
  'Bubble%20Breaker.hyperesources/blank.gif',
  'Bubble%20Breaker.hyperesources/Blog%201.jpg',
  'Bubble%20Breaker.hyperesources/Blog%202.jpg',
  'Bubble%20Breaker.hyperesources/browserconfig.xml',
  'Bubble%20Breaker.hyperesources/Dark.svg',
  'Bubble%20Breaker.hyperesources/Edited.jpg',
  'Bubble%20Breaker.hyperesources/Egg.mp4',
  'Bubble%20Breaker.hyperesources/favicon.ico',
  'Bubble%20Breaker.hyperesources/favicon-16x16.png',
  'Bubble%20Breaker.hyperesources/favicon-32x32.png',
  'Bubble%20Breaker.hyperesources/form-submission-handler.js',
  'Bubble%20Breaker.hyperesources/Garfield.mp4',
  'Bubble%20Breaker.hyperesources/HYPE-664.full.min.js',
  'Bubble%20Breaker.hyperesources/HypeLottiePlayer.min.js',
  'Bubble%20Breaker.hyperesources/Illustration%201.jpg',
  'Bubble%20Breaker.hyperesources/Illustration%202.jpg',
  'Bubble%20Breaker.hyperesources/Illustration%203.jpg',
  'Bubble%20Breaker.hyperesources/Illustration%204.jpg',
  'Bubble%20Breaker.hyperesources/Illustration%205.jpg',
  'Bubble%20Breaker.hyperesources/Illustration%206.jpg',
  'Bubble%20Breaker.hyperesources/Illustration%207.jpg',
  'Bubble%20Breaker.hyperesources/Illustration%208.jpg',
  'Bubble%20Breaker.hyperesources/Illustration%209.jpg',
  'Bubble%20Breaker.hyperesources/Illustration%2010.jpg',
  'Bubble%20Breaker.hyperesources/Illustration%2011.jpg',
  'Bubble%20Breaker.hyperesources/Illustration%2012.jpg',
  'Bubble%20Breaker.hyperesources/Illustration%2013.jpg',
  'Bubble%20Breaker.hyperesources/jquery-3.4.1.slim.min.js',
  'Bubble%20Breaker.hyperesources/Just%20Me%20Again%20Down%20Here.woff2',
  'Bubble%20Breaker.hyperesources/loader.json',
  'Bubble%20Breaker.hyperesources/Lobster%20Two.woff2',
  'Bubble%20Breaker.hyperesources/Logo.svg',
  'Bubble%20Breaker.hyperesources/lottie.js',
  'Bubble%20Breaker.hyperesources/Marshmallow.mp4',
  'Bubble%20Breaker.hyperesources/Monoton.woff2',
  'Bubble%20Breaker.hyperesources/mstile-70x70.png',
  'Bubble%20Breaker.hyperesources/mstile-144x144.png',
  'Bubble%20Breaker.hyperesources/mstile-150x150.png',
  'Bubble%20Breaker.hyperesources/mstile-310x150.png',
  'Bubble%20Breaker.hyperesources/mstile-310x310.png',
  'Bubble%20Breaker.hyperesources/offline.min.js',
  'Bubble%20Breaker.hyperesources/offline-language-english.css',
  'Bubble%20Breaker.hyperesources/offline-theme-chrome.css',
  'Bubble%20Breaker.hyperesources/Open%20Sans.woff2',
  'Bubble%20Breaker.hyperesources/Original.jpg',
  'Bubble%20Breaker.hyperesources/PIE.htc',
  'Bubble%20Breaker.hyperesources/playerjs.js',
  'Bubble%20Breaker.hyperesources/safari-pinned-tab.svg',
  'Bubble%20Breaker.hyperesources/site.webmanifest'
];
self.addEventListener('install', event =>
    {
        event.waitUntil(caches.open(PRECACHE).then(cache => cache.addAll(PRECACHE_URLS)).then(self.skipWaiting()));
    });
self.addEventListener('activate', event =>
    {
        const currentCaches = [PRECACHE, RUNTIME];
        event.waitUntil(caches.keys().then(cacheNames =>
            {
                return cacheNames.filter(cacheName => !currentCaches.includes(cacheName));
            }).then(cachesToDelete =>
                {
                    return Promise.all(cachesToDelete.map(cacheToDelete =>
                        {
                            return caches.delete(cacheToDelete);
                        }));
                }).then(() => self.clients.claim()));
    });
self.addEventListener('fetch', event =>
    {
        if (event.request.url.startsWith(self.location.origin))
            {
                event.respondWith(caches.match(event.request).then(cachedResponse =>
                    {
                        if (cachedResponse)
                            {
                                return cachedResponse;
                            }
                        return caches.open(RUNTIME).then(cache =>
                            {
                                return fetch(event.request).then(response =>
                                    {
                                        return cache.put(event.request, response.clone()).then(() =>
                                            {
                                                return response;
                                            });
                                    });
                            });
                    }));
            }
    });