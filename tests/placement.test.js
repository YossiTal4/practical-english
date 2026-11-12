// Self-check for the placement test draw: loads the real app in a Node VM with a stub DOM,
// presses "הגרל מבחן חדש" and "התחל מבחן", and reads the 40 questions. Run: node tests/placement.test.js
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
}

const elements = {};
const document = {
    readyState: 'complete',
    body: { dataset: {} },
    documentElement: { dataset: {} },
    getElementById(id) { return elements[id] || (elements[id] = makeEl(id)); },
    querySelectorAll() { return []; },
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
    setInterval() { return 0; }, clearInterval() {}, setTimeout() { return 0; }, clearTimeout() {},
    console
};
vm.createContext(sandbox);
sandbox.window = sandbox;
sandbox.addEventListener = () => {};
['js/data/words.js', 'js/data/sentences.js', 'js/data/sentences-extra.js', 'js/data/examples.js', 'js/data/career.js', 'js/data/career-notes.js',
    'js/data/career-mistakes.js', 'js/data/career-extra.js', 'js/data/reading.js', 'js/data/grammar.js', 'js/data/grammar-more.js',
    'js/data/placement-bank.js', 'js/data/categories-words.js', 'js/data/categories-more.js', 'js/data/reading-words.js', 'js/i18n.js', 'js/app.js'].forEach((f) => vm.runInContext(read(f), sandbox, { filename: f }));

// Presses the draw button, starts the test and reads all 40 questions (text and section label)
function drawTest() {
    elements['pl-draw'].fire('click');
    elements['pl-start'].fire('click');
    const questions = [];
    const labels = [];
    for (let i = 0; i < 40; i++) {
        questions.push(elements['pl-question'].textContent);
        labels.push(elements['pl-section'].textContent);
        elements['pl-next'].fire('click');
    }
    return { questions, labels };
}

// The band (A, B or C) of every question in the pool, by the text the test shows
const bank = vm.runInNewContext(read('js/data/placement-bank.js') + ';PLACEMENT_BANK');
const bandOf = {};
bank.vocab.forEach((v) => { bandOf[v.en] = v.band; });
[bank.grammar, bank.completion].forEach((list) => list.forEach((x) => { bandOf[x.q] = x.band; }));
bank.reading.forEach((p) => p.questions.forEach((x) => { bandOf[x.q] = p.band; }));

const first = drawTest();
assert.strictEqual(new Set(first.questions).size, 40, 'the first draw has 40 different questions');
const count = (prefix) => first.labels.filter((l) => l.indexOf(prefix) === 0).length;
assert.strictEqual(count('אוצר מילים'), 10, '10 vocabulary questions');
assert.strictEqual(count('דקדוק'), 10, '10 grammar questions');
assert.strictEqual(count('השלמת משפטים'), 10, '10 sentence completion questions');
assert.strictEqual(count('קריאה'), 10, '10 reading questions');

// Levels: 20 medium (B) and 20 hard (C) questions in every draw, and no easy ones
const bandCount = (draw, band) => draw.questions.filter((q) => bandOf[q] === band).length;
assert.strictEqual(bandCount(first, 'B'), 20, '20 medium questions (B)');
assert.strictEqual(bandCount(first, 'C'), 20, '20 hard questions (C)');
assert.strictEqual(bandCount(first, 'A'), 0, 'no easy questions');

// A second press must give a really new test: no question from the first draw comes back
const second = drawTest();
assert.strictEqual(new Set(second.questions).size, 40, 'the second draw has 40 different questions');
const repeated = second.questions.filter((q) => first.questions.indexOf(q) >= 0);
assert.strictEqual(repeated.length, 0, 'the second draw shares no question with the first');
assert.strictEqual(bandCount(second, 'B'), 20, 'the second draw also has 20 medium questions');

console.log('placement: all checks passed');
