const CACHE_NAME = 'aura-meteo-v1';
const ASSETS = [
  'index.html',
  'manifest.json',
  'icon-512.png'
];

// Installation du Service Worker et mise en cache des fichiers
self.addEventListener('install', e => {
  e.waitUntil(
    caches.open(CACHE_NAME).then(cache => {
      return cache.addAll(ASSETS);
    })
  );
});

// Stratégie de fetch : Réseau d'abord, sinon Cache
self.addEventListener('fetch', e => {
  e.respondWith(
    fetch(e.request).catch(() => {
      return caches.match(e.request);
    })
  );
});
