// Self-check for the "10 random words" option: loads the real app in a Node VM with a stub DOM,
// clicks the menu card and checks that a 10-question quiz starts. Run: node tests/random10.test.js
const assert = require('assert');
const fs = require('fs');
const path = require('path');
const vm = require('vm');

const root = path.join(__dirname, '..');
const read = (f) => fs.readFileSync(path.join(root, f), 'utf8');

// Stub element: accepts any property and method the app touches
function makeEl(id) {
    const handlers = {};
    return {
        id: id || '', textContent: '', innerHTML: '', value: '', disabled: false, checked: false,
        dataset: {}, style: {}, children: [], offsetWidth: 0,
        classList: { add() {}, remove() {}, toggle() {}, contains() { return false; } },
        addEventListener(type, fn) { (handlers[type] = handlers[type] || []).push(fn); },
        fire(type) { (handlers[type] || []).forEach((fn) => fn.call(this)); },
        appendChild(c) { return c; }, insertBefore() {}, remove() {}, focus() {}, click() {},
        querySelectorAll() { return []; }, querySelector() { return makeEl(); }, closest() { return null; },
        getBoundingClientRect() { return { left: 0, right: 0, top: 0, bottom: 0, width: 0 }; }
    };
    // querySelector would return null for these; the stub returns itself so the app's init code runs

}

// Menu cards come from index.html, so the test also checks the card exists there
const html = read('index.html');
const elements = {};
const answerBtns = [0, 1, 2, 3].map(() => makeEl());
const cards = [...html.matchAll(/data-level="([^"]+)"/g)].map((m) => {
    const el = makeEl();
    el.dataset.level = m[1];
    return el;
});
const document = {
    readyState: 'complete',
    body: { dataset: {} },
    documentElement: { dataset: {} },
    getElementById(id) { return elements[id] || (elements[id] = makeEl(id)); },
    querySelectorAll(sel) {
        if (sel === '.level-card') return cards;
        if (sel === '.answer-btn') return answerBtns;
        return [];
    },
    querySelector() { return makeEl(); },
    addEventListener() {},
    removeEventListener() {},
    createElement() { return makeEl(); }
};
const storage = {};
const sandbox = {
    document,
    localStorage: { getItem: (k) => (k in storage ? storage[k] : null), setItem: (k, v) => { storage[k] = String(v); } },
    matchMedia() { return { matches: false }; },
    navigator: {},
    // Timers are no-ops so the process exits; the test does not wait for them
    setInterval() { return 0; }, clearInterval() {}, setTimeout() { return 0; }, clearTimeout() {},
    console
};
vm.createContext(sandbox);
// In a browser window is the global object; the scripts publish window.tr, so the sandbox plays that role
sandbox.window = sandbox;
sandbox.addEventListener = () => {};
['words.js', 'sentences.js', 'sentences-extra.js', 'examples.js', 'career.js', 'career-notes.js',
    'career-mistakes.js', 'career-extra.js', 'reading.js', 'grammar.js', 'grammar-more.js',
    'placement-bank.js', 'categories-words.js', 'categories-more.js', 'reading-words.js', 'i18n.js', 'app.js'].forEach((f) => vm.runInContext(read(f), sandbox, { filename: f }));

// 1. The menu has the card
const card = cards.find((c) => c.dataset.level === 'random10');
assert.ok(card, 'index.html has a level card with data-level="random10"');

// 2. Clicking it starts a 10-question quiz with a real word and four answer options
card.fire('click');
assert.strictEqual(elements['word-counter'].textContent, 'שאלה 1 מתוך 10', 'quiz has 10 questions');
const word = elements['english-word'].textContent;
assert.ok(word.length > 0, 'first question shows an English word');
const options = answerBtns.map((b) => b.textContent);
assert.strictEqual(new Set(options).size, 4, 'four different answer options');

// 3. Answering marks the right answer with ✓ and a wrong pick with ✗, so colour is not the only signal
answerBtns[0].fire('click');
const marked = answerBtns.filter((b) => /^[✓✗] /.test(b.textContent));
assert.strictEqual(marked.filter((b) => b.textContent.startsWith('✓')).length, 1, 'exactly one answer is marked ✓');
assert.ok(marked.length === 1 || marked.length === 2, 'the right answer and, if wrong, the pick are marked');

console.log('random10: all checks passed');
