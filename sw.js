const CACHE_NAME = 'practical-english-v100';
const ASSETS = [
  './',
  './index.html',
  './styles.css',
  './categories-words.js',
  './categories-more.js',
  './reading-words.js',
  './i18n.js',
  './app.js',
  './words.js',
  './sentences.js',
  './sentences-extra.js',
  './examples.js',
  './career.js',
  './career-notes.js',
  './career-mistakes.js',
  './career-extra.js',
  './reading.js',
  './reading-extra-1.js',
  './reading-extra-2.js',
  './reading-extra-3.js',
  './grammar.js',
  './grammar-more.js',
  './placement-bank.js',
  './manifest.json',
  './icon-192.png',
  './icon-512.png'
];

self.addEventListener('install', e => {
  e.waitUntil(
    caches.open(CACHE_NAME).then(cache => cache.addAll(ASSETS))
  );
  self.skipWaiting();
});

self.addEventListener('activate', e => {
  e.waitUntil(
    caches.keys().then(keys =>
      Promise.all(keys.filter(k => k !== CACHE_NAME).map(k => caches.delete(k)))
    )
  );
  self.clients.claim();
});

self.addEventListener('fetch', e => {
  e.respondWith(
    fetch(e.request).catch(() => caches.match(e.request))
  );
});
