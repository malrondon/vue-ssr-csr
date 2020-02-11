const CACHE_NAME = `app-${process.env.npm_package_version}`;

const CACHED_URLS = ['/main.min.js', '/main.min.css', '/offline/index.html', '/?utm_source=homescreen'];

self.addEventListener('install', function(event) {
  event.waitUntil(
    caches.open(CACHE_NAME).then(cache => {
      // Opens a cache and caches our files
      return cache.addAll(CACHED_URLS);
    })
  );
});

// removes old caches that are not current ones
self.addEventListener('activate', event => {
  event.waitUntil(
    caches.keys().then(cacheNames => {
      return Promise.all(
        cacheNames
          .filter(cacheName => cacheName.startsWith('app-'))
          .filter(cacheName => cacheName !== CACHE_NAME)
          .map(cacheName => caches.delete(cacheName))
      );
    })
  );
});

self.addEventListener('fetch', event => {
  event.respondWith(
    caches
      .match(event.request)
      .then(response => {
        return response || fetch(event.request);
      })
      .catch(() => {
        return caches.match('/offline/index.html');
      })
  );
});
