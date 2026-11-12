# Practical English

A static, offline-capable web app (PWA) for learning English vocabulary, reading, grammar and career phrases. Interface in Hebrew and English. No build step, no dependencies.

## Run locally

```
python -m http.server 8000
```

Open http://localhost:8000.

## Tests

```
node tests/placement.test.js
node tests/random10.test.js
```

## Structure

```
index.html        entry point
sw.js             service worker (must stay in the root to control the whole app)
manifest.json     PWA manifest
css/              styles
icons/            app icons
js/               app logic and translations
js/data/          word lists, sentences, reading texts, grammar, placement bank
tests/            Node tests
docs/             product notes and UX proposals
```
