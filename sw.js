const CACHE_NAME = 'sst-app-v1';
const urlsToCache = [
  '/SST-APP-PWA/',
  '/SST-APP-PWA/index.html',
  '/SST-APP-PWA/manifest.json',
  '/SST-APP-PWA/icon-192.png',
  '/SST-APP-PWA/icon-512.png'
];

self.addEventListener('install', (event) => {
  event.waitUntil(
    caches.open(CACHE_NAME)
      .then((cache) => {
        console.log('Opened cache');
        return cache.addAll(urlsToCache);
      })
  );
  self.skipWaiting();
});

self.addEventListener('fetch', (event) => {
  event.respondWith(
    caches.match(event.request)
      .then((response) => {
        if (response) {
          return response;
        }
        return fetch(event.request);
      })
  );
});