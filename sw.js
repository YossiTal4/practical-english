const CACHE_NAME = 'practical-english-v101';
const ASSETS = [
  './',
  './index.html',
  './css/styles.css',
  './js/data/categories-words.js',
  './js/data/categories-more.js',
  './js/data/reading-words.js',
  './js/i18n.js',
  './js/app.js',
  './js/data/words.js',
  './js/data/sentences.js',
  './js/data/sentences-extra.js',
  './js/data/examples.js',
  './js/data/career.js',
  './js/data/career-notes.js',
  './js/data/career-mistakes.js',
  './js/data/career-extra.js',
  './js/data/reading.js',
  './js/data/reading-extra-1.js',
  './js/data/reading-extra-2.js',
  './js/data/reading-extra-3.js',
  './js/data/grammar.js',
  './js/data/grammar-more.js',
  './js/data/placement-bank.js',
  './manifest.json',
  './icons/icon-192.png',
  './icons/icon-512.png'
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
