(function () {
    'use strict';

    const MASTERY_THRESHOLD = 1;

    const state = {
        currentScreen: 'menu',
        level: 0,
        sessionSize: 0,
        sessionWords: [],
        currentIndex: 0,
        currentWord: null,
        correctAnswer: '',
        answered: false,
        score: 0,
        sessionCorrect: 0,
        sessionTotal: 0,
        mistakes: [],
        favorites: [],
        stats: {
            totalAnswered: 0,
            totalCorrect: 0,
            bestStreak: 0,
            currentStreak: 0,
            bestScore: 0,
            bestSessionPct: 0,
            wordHistory: {},
            levelStats: { 1: { answered: 0, correct: 0 }, 2: { answered: 0, correct: 0 }, 3: { answered: 0, correct: 0 } }
        }
    };

    // Level comes from the CEFR label in words.js: 1 = A1-A2, 2 = B1-B2, 3 = C1-C2
    function getLevel(index) {
        return WORDS[index][2];
    }

    function loadState() {
        try {
            var f = localStorage.getItem('wq_favorites');
            if (f) state.favorites = JSON.parse(f);
        } catch (e) {}
        // Drop saved favorites whose words were removed from the word list
        state.favorites = (Array.isArray(state.favorites) ? state.favorites : []).filter(function (eng) {
            return WORDS.some(function (w) { return w[0] === eng; });
        });
        try {
            var s = localStorage.getItem('wq_stats');
            if (s) {
                var parsed = JSON.parse(s);
                Object.assign(state.stats, parsed);
                if (!state.stats.levelStats) {
                    state.stats.levelStats = { 1: { answered: 0, correct: 0 }, 2: { answered: 0, correct: 0 }, 3: { answered: 0, correct: 0 } };
                }
            }
        } catch (e) {}
    }

    function saveFavorites() {
        try { localStorage.setItem('wq_favorites', JSON.stringify(state.favorites)); } catch (e) {}
    }

    function saveStats() {
        try { localStorage.setItem('wq_stats', JSON.stringify(state.stats)); } catch (e) {}
    }

    // ---- Practice by category: the level value 'cat:<id>' starts a quiz on one category (categories-words.js) ----
    function categoryOf(level) {
        if (typeof level !== 'string' || level.indexOf('cat:') !== 0) return null;
        for (var i = 0; i < CATEGORIES.length; i++) {
            if (CATEGORIES[i].id === level.slice(4)) return CATEGORIES[i];
        }
        return null;
    }

    function categoryWords(c) {
        return c.words.map(function (w) { return { e: w[0], h: w[1], idx: WORDS.indexOf(w) }; });
    }

    function openCategories() {
        showScreen('categories');
        var grid = document.getElementById('category-grid');
        grid.innerHTML = '';
        CATEGORIES.forEach(function (c) {
            var b = document.createElement('button');
            b.className = 'category-card';
            b.innerHTML = '<span class="category-icon"><svg viewBox="0 0 24 24" width="22" height="22" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M4 19.5A2.5 2.5 0 0 1 6.5 17H20V2H6.5A2.5 2.5 0 0 0 4 4.5z"/></svg></span>' +
                '<span class="category-text"><span class="category-name"></span><span class="category-badge"></span></span>';
            b.querySelector('.category-name').textContent = tr(c.he);
            b.querySelector('.category-badge').textContent = tr(c.level === 2 ? 'בינוני' : 'קשה');
            b.addEventListener('click', function () { startQuiz('cat:' + c.id); });
            grid.appendChild(b);
        });
    }

    function getWordsForLevel(level) {
        var cat = categoryOf(level);
        if (cat) return categoryWords(cat);
        if (level === 'test') return shuffle(getWordsForLevel(0)).slice(0, 30);
        if (level === 'random10') return shuffle(getWordsForLevel(0)).slice(0, 10);
        if (level === 'fav') {
            return state.favorites.map(function (eng) {
                for (var i = 0; i < WORDS.length; i++) {
                    if (WORDS[i][0] === eng) return { e: WORDS[i][0], h: WORDS[i][1], idx: i };
                }
                return null;
            }).filter(Boolean);
        }
        if (level === 'smart') {
            return getSmartWords();
        }
        if (level === 'srs') return getSrsWords();
        var words = [];
        for (var i = 0; i < WORDS.length; i++) {
            var wLevel = getLevel(i);
            if (level === 0 || wLevel === level) {
                words.push({ e: WORDS[i][0], h: WORDS[i][1], idx: i });
            }
        }
        return words;
    }

    function getSmartWords() {
        var history = state.stats.wordHistory;
        var wrong = [];
        var unseen = [];
        for (var i = 0; i < WORDS.length; i++) {
            var w = { e: WORDS[i][0], h: WORDS[i][1], idx: i };
            var h = history[WORDS[i][0]];
            if (!h) {
                unseen.push(w);
            } else if (h.correct < MASTERY_THRESHOLD) {
                if (h.wrong > 0) wrong.push(w);
                else unseen.push(w);
            }
        }
        shuffle(wrong);
        shuffle(unseen);
        return wrong.concat(unseen);
    }

    function shuffle(arr) {
        for (var i = arr.length - 1; i > 0; i--) {
            var j = Math.floor(Math.random() * (i + 1));
            var tmp = arr[i]; arr[i] = arr[j]; arr[j] = tmp;
        }
        return arr;
    }

    function getWrongAnswers(correctHebrew, level, count) {
        var pool = [];
        var lvl = (categoryOf(level) || level === 'fav' || level === 'smart' || level === 'test' || level === 'srs' || level === 'random10') ? 0 : level;
        for (var i = 0; i < WORDS.length; i++) {
            if (WORDS[i][1] !== correctHebrew && (lvl === 0 || getLevel(i) === lvl)) {
                pool.push(WORDS[i][1]);
            }
        }
        shuffle(pool);
        var unique = [];
        var seen = {};
        seen[correctHebrew] = true;
        for (var i = 0; i < pool.length && unique.length < count; i++) {
            if (!seen[pool[i]]) {
                seen[pool[i]] = true;
                unique.push(pool[i]);
            }
        }
        return unique;
    }

    function showScreen(name) {
        var screens = document.querySelectorAll('.screen');
        for (var i = 0; i < screens.length; i++) screens[i].classList.remove('active');
        document.getElementById(name + '-screen').classList.add('active');

        var navBtns = document.querySelectorAll('.nav-btn');
        for (var i = 0; i < navBtns.length; i++) {
            navBtns[i].classList.toggle('active', navBtns[i].dataset.screen === name);
        }

        // no header stats needed, sidebar handles it

        state.currentScreen = name;
        document.body.dataset.screen = name;

        if (name === 'menu') { showHomeTiles(); updateMenuUI(); }
        if (name === 'favorites') renderFavorites();
        if (name === 'stats') { renderStats(); updateMenuUI(); }
    }

    // ---- Home tiles: each tile opens its own area; the vocabulary tile opens a menu of word options ----
    function showHomeTiles() {
        document.getElementById('home-tiles').classList.remove('hidden');
        document.getElementById('vocab-menu').classList.add('hidden');
    }

    function showVocabMenu() {
        document.getElementById('home-tiles').classList.add('hidden');
        document.getElementById('vocab-menu').classList.remove('hidden');
    }

    function openHomeTile(tile) {
        if (tile === 'vocab') return showVocabMenu();
        if (tile === 'grammar' || tile === 'placement') return openTool(tile);
        if (tile === 'reading') return openReading();
        if (tile === 'sentences') return openSentenceMenu();
        if (tile === 'career') return openCareerMap();
        if (tile === 'slang') return startQuiz(4);
    }

    function updateMenuUI() {
        var favCount = state.favorites.length;
        var favBtn = document.getElementById('fav-play-btn');
        var favDesc = document.getElementById('fav-count-desc');
        favBtn.disabled = favCount === 0;
        favDesc.textContent = tr(favCount + ' מילים');

        var s = state.stats;

        var mastered = 0;
        var masteredByLevel = { 1: 0, 2: 0, 3: 0 };
        var history = s.wordHistory;
        for (var word in history) {
            if (history.hasOwnProperty(word) && history[word].correct >= MASTERY_THRESHOLD) {
                mastered++;
                for (var wi = 0; wi < WORDS.length; wi++) {
                    if (WORDS[wi][0] === word) { masteredByLevel[getLevel(wi)]++; break; }
                }
            }
        }

        var levelTotals = { 1: 0, 2: 0, 3: 0 };
        for (var t = 0; t < WORDS.length; t++) levelTotals[getLevel(t)]++;
        for (var lvl = 1; lvl <= 3; lvl++) {
            var barPct = levelTotals[lvl] > 0 ? Math.round((masteredByLevel[lvl] / levelTotals[lvl]) * 100) : 0;
            var barEl = document.getElementById('home-bar-' + lvl);
            if (barEl) barEl.style.width = barPct + '%';
            var mEl = document.getElementById('home-mastered-' + lvl);
            if (mEl) mEl.textContent = tr(masteredByLevel[lvl] + ' / ' + levelTotals[lvl] + ' נלמדו');
        }
        var allPct = WORDS.length > 0 ? Math.round((mastered / WORDS.length) * 100) : 0;
        var barAll = document.getElementById('home-bar-0');
        if (barAll) barAll.style.width = allPct + '%';
        var mAll = document.getElementById('home-mastered-0');
        if (mAll) mAll.textContent = tr(mastered + ' / ' + WORDS.length + ' נלמדו');

        // Overall progress: a word counts as learned after one correct answer; a level is passed at 60% learned
        // Three bands (beginner, intermediate, advanced), each split into an early (א') and a late (ב') half
        var band = 1;
        if (masteredByLevel[1] / levelTotals[1] >= 0.6) band = 2;
        if (masteredByLevel[2] / levelTotals[2] >= 0.6) band = 3;
        var bandRatio = masteredByLevel[band] / levelTotals[band];
        var bandNames = { 1: 'מתחיל', 2: 'בינוני', 3: 'מתקדם' };
        var half = bandRatio >= 0.3 ? " ב'" : " א'";
        document.getElementById('home-level').textContent = tr('רמה נוכחית: ' + bandNames[band] + half);
        document.getElementById('home-progress-text').textContent = tr(mastered + ' / ' + WORDS.length + ' מילים נלמדו');
        document.getElementById('home-progress-fill').style.width = allPct + '%';
    }

    function updateSidebar() {
        document.getElementById('sidebar-score').textContent = state.score;
        document.getElementById('sidebar-correct').textContent = state.sessionCorrect;
        document.getElementById('sidebar-wrong').textContent = state.sessionTotal - state.sessionCorrect;
        document.getElementById('sidebar-streak').textContent = state.stats.currentStreak;
        updateTimedBox();
    }

    // Pronounce an English word using the browser's built-in speech engine (works offline)
    // Common English female voice names across Windows, Android, iOS and Chrome
    var FEMALE_VOICE_RE = /zira|samantha|aria|jenny|karen|libby|sonia|hazel|susan|female|woman|google us english|google uk english female/i;

    function speak(text, rate) {
        if (!('speechSynthesis' in window) || !text) return;
        window.speechSynthesis.cancel();
        var utter = new SpeechSynthesisUtterance(text);
        utter.lang = 'en-US';
        utter.rate = rate || 0.9;
        // Prefer an English female voice by name; the browser does not expose gender, so this is a best guess
        var voices = window.speechSynthesis.getVoices();
        var fallback = null;
        for (var i = 0; i < voices.length; i++) {
            if (!voices[i].lang || voices[i].lang.indexOf('en') !== 0) continue;
            if (FEMALE_VOICE_RE.test(voices[i].name)) { utter.voice = voices[i]; break; }
            if (!fallback) fallback = voices[i];
        }
        if (!utter.voice && fallback) utter.voice = fallback;
        window.speechSynthesis.speak(utter);
    }

    // ---- Timed round: as many correct answers as possible in 60 seconds, with medal goals ----
    var TIMED_SECONDS = 60;
    var TIMED_GOALS = [{ label: 'מדליית ארד', min: 10 }, { label: 'מדליית כסף', min: 15 }, { label: 'מדליית זהב', min: 20 }];
    var timedRun = null;    // { endAt, interval } while a timed round is running
    var timedMode = false;  // true for a timed round, so its results show medals and "play again" restarts it
    var advanceTimer = null;

    function stopTimed() {
        if (!timedRun) return;
        clearInterval(timedRun.interval);
        timedRun = null;
    }

    function tickTimed() {
        var left = Math.max(0, Math.ceil((timedRun.endAt - Date.now()) / 1000));
        document.getElementById('timed-time').textContent = left;
        if (state.currentScreen !== 'quiz') return stopTimed();
        if (left === 0) {
            stopTimed();
            showResults();
        }
    }

    function startTimed() {
        startQuiz(0);
        timedMode = true;
        timedRun = { endAt: Date.now() + TIMED_SECONDS * 1000 };
        timedRun.interval = setInterval(tickTimed, 250);
        tickTimed();
        updateSidebar();
    }

    function updateTimedBox() {
        var box = document.getElementById('timed-box');
        box.classList.toggle('hidden', !timedMode);
        if (!timedMode) return;
        var goal = TIMED_GOALS.filter(function (g) { return state.sessionCorrect < g.min; })[0];
        document.getElementById('timed-goal').textContent = goal
            ? tr(goal.label + ': ' + state.sessionCorrect + ' מתוך ' + goal.min)
            : tr('כל היעדים הושגו!');
    }

    function startQuiz(level) {
        stopTimed();
        timedMode = false;
        clearTimeout(advanceTimer);
        state.level = level;
        var words = getWordsForLevel(level);
        if (words.length === 0) return;

        shuffle(words);
        state.sessionWords = words;
        state.currentIndex = 0;
        state.sessionCorrect = 0;
        state.sessionTotal = 0;
        state.score = 0;
        state.mistakes = [];

        showScreen('quiz');
        updateSidebar();
        showQuestion();
    }

    function showQuestion() {
        if (state.currentIndex >= state.sessionWords.length) {
            showResults();
            return;
        }

        state.answered = false;
        state.currentWord = state.sessionWords[state.currentIndex];

        document.getElementById('word-counter').textContent = tr('שאלה ' + (state.currentIndex + 1) + ' מתוך ' + state.sessionWords.length);

        var wordEl = document.getElementById('english-word');
        wordEl.textContent = state.currentWord.e;
        wordEl.classList.remove('word-enter');
        void wordEl.offsetWidth;
        wordEl.classList.add('word-enter');

        var isFav = state.favorites.indexOf(state.currentWord.e) !== -1;
        var addFavBtn = document.getElementById('add-fav-btn');
        addFavBtn.innerHTML = isFav ? '&#x2605; ' + tr('במועדפים') : '&#x2606; ' + tr('הוסף למועדפים');
        addFavBtn.classList.toggle('favorited', isFav);

        var wrongAnswers = getWrongAnswers(state.currentWord.h, state.level, 3);
        var options = shuffle([state.currentWord.h].concat(wrongAnswers));

        var btns = document.querySelectorAll('.answer-btn');
        for (var i = 0; i < btns.length; i++) {
            btns[i].textContent = options[i];
            btns[i].className = 'answer-btn';
            btns[i].dataset.answer = options[i];
        }

        state.correctAnswer = state.currentWord.h;

        document.getElementById('feedback').className = 'hidden';
        document.getElementById('feedback-text').textContent = '';
        document.getElementById('feedback-example').textContent = '';
    }

    // Short tones for right and wrong answers, made in the browser so no sound files are needed
    var audioCtx = null;
    function playTone(freqs, step, type) {
        try {
            if (!audioCtx) audioCtx = new (window.AudioContext || window.webkitAudioContext)();
            var t = audioCtx.currentTime;
            freqs.forEach(function (f, i) {
                var osc = audioCtx.createOscillator();
                var gain = audioCtx.createGain();
                var start = t + i * step;
                osc.type = type;
                osc.frequency.value = f;
                gain.gain.setValueAtTime(0.0001, start);
                gain.gain.exponentialRampToValueAtTime(0.2, start + 0.02);
                gain.gain.exponentialRampToValueAtTime(0.0001, start + 0.25);
                osc.connect(gain);
                gain.connect(audioCtx.destination);
                osc.start(start);
                osc.stop(start + 0.3);
            });
        } catch (e) { /* no audio support: stay silent */ }
    }

    // Two rising notes for a right answer, one low falling pair for a wrong one
    function playCorrect() { playTone([660, 880], 0.12, 'sine'); }
    function playWrong() { playTone([220, 165], 0.18, 'triangle'); }

    // First English sentence from the sentence bank that contains the word as a whole word, or undefined
    // shortcut: matches only the exact form, so "abandoned" does not find "abandon" sentences
    function findSentenceWith(word) {
        var re = new RegExp('\\b' + word.replace(/[.*+?^${}()|[\]\\]/g, '\\$&') + '\\b', 'i');
        for (var i = 0; i < SENTENCES.length; i++) {
            if (re.test(SENTENCES[i][2])) return SENTENCES[i][2];
        }
        return undefined;
    }

    function handleAnswer(selectedAnswer) {
        if (state.answered) return;
        state.answered = true;

        var isCorrect = selectedAnswer === state.correctAnswer;
        if (isCorrect) playCorrect(); else playWrong();
        var example;
        var btns = document.querySelectorAll('.answer-btn');

        for (var i = 0; i < btns.length; i++) {
            // The mark is text, so the result is visible without relying on colour
            if (btns[i].dataset.answer === state.correctAnswer) {
                btns[i].classList.add('correct');
                btns[i].textContent = '✓ ' + btns[i].dataset.answer;
            } else if (btns[i].dataset.answer === selectedAnswer && !isCorrect) {
                btns[i].classList.add('wrong');
                btns[i].textContent = '✗ ' + btns[i].dataset.answer;
            }
            btns[i].classList.add('disabled');
        }

        var feedback = document.getElementById('feedback');
        var feedbackText = document.getElementById('feedback-text');
        feedback.classList.remove('hidden', 'correct', 'wrong');

        state.sessionTotal++;
        state.stats.totalAnswered++;

        var wordLevel = getLevel(state.currentWord.idx);
        if (!state.stats.levelStats[wordLevel]) {
            state.stats.levelStats[wordLevel] = { answered: 0, correct: 0 };
        }
        state.stats.levelStats[wordLevel].answered++;

        if (!state.stats.wordHistory[state.currentWord.e]) {
            state.stats.wordHistory[state.currentWord.e] = { correct: 0, wrong: 0 };
        }

        if (isCorrect) {
            state.sessionCorrect++;
            state.score += 10;
            state.stats.totalCorrect++;
            state.stats.currentStreak++;
            state.stats.levelStats[wordLevel].correct++;
            state.stats.wordHistory[state.currentWord.e].correct++;

            if (state.stats.currentStreak > state.stats.bestStreak) {
                state.stats.bestStreak = state.stats.currentStreak;
            }

            feedback.classList.add('correct');
            feedbackText.textContent = tr('נכון!');
            // Slang phrases stay on screen so the example sentence can be read; the user presses "הבא"
            example = wordLevel === 4 ? SLANG_EXAMPLES[state.currentWord.e] : undefined;
            if (example) document.getElementById('feedback-example').textContent = example;
        } else {
            state.stats.currentStreak = 0;
            state.stats.wordHistory[state.currentWord.e].wrong++;
            state.mistakes.push(state.currentWord);

            feedback.classList.add('wrong');
            feedbackText.textContent = state.currentWord.e + ' = ' + state.correctAnswer;
            // Show a sentence that uses the word, so the mistake is seen in context
            example = findSentenceWith(state.currentWord.e);
            if (example) document.getElementById('feedback-example').textContent = example;
        }

        srsRecord('w:' + state.currentWord.e, isCorrect);
        recordDaily();
        document.getElementById('example-speak').classList.toggle('hidden', !example);
        updateSidebar();
        saveStats();

        // Timed rounds move on fast; normal rounds wait for a correct answer with no example, or the "next" button
        if (timedRun) advanceTimer = setTimeout(nextQuestion, isCorrect ? 600 : 1000);
        else if (isCorrect && !example) advanceTimer = setTimeout(nextQuestion, 700);
    }

    function nextQuestion() {
        clearTimeout(advanceTimer);
        state.currentIndex++;
        showQuestion();
    }

    function showResults() {
        renderMistakes();
        var pct = state.sessionTotal > 0 ? Math.round((state.sessionCorrect / state.sessionTotal) * 100) : 0;

        if (state.score > state.stats.bestScore) state.stats.bestScore = state.score;
        if (pct > state.stats.bestSessionPct) state.stats.bestSessionPct = pct;

        var details = '';
        if (timedMode) {
            var got = state.sessionCorrect;
            var medal = 'לא הגעתם ליעד הראשון';
            TIMED_GOALS.forEach(function (g) { if (got >= g.min) medal = g.label; });
            if (got > (state.stats.bestTimed || 0)) state.stats.bestTimed = got;
            document.getElementById('results-score').textContent = got;
            details += tr(got + ' תשובות נכונות ב-' + TIMED_SECONDS + ' שניות') + '\n';
            details += tr(medal) + '\n';
            details += tr('שיא נגד הזמן: ' + state.stats.bestTimed);
            document.getElementById('results-details').textContent = details;
            document.getElementById('review-mistakes-btn').disabled = state.mistakes.length === 0;
            saveStats();
            showScreen('results');
            return;
        }

        saveStats();
        document.getElementById('results-score').textContent = pct + '%';

        // Short level assessment for every round, based on the score
        details += (pct >= 90 ? tr('מצוין, הרמה שלכם בתרגיל הזה גבוהה') : pct >= 75 ? tr('טוב מאוד, אתם שולטים ברוב המילים') : pct >= 50 ? tr('סביר, כדאי לחזור על המילים הקשות') : tr('צריך עוד תרגול במילים האלה')) + '\n';
        details += tr(state.sessionCorrect + ' מתוך ' + state.sessionTotal + ' תשובות נכונות') + '\n';
        details += tr('ניקוד: ' + state.score) + '\n';
        details += tr('רצף נוכחי: ' + state.stats.currentStreak);
        document.getElementById('results-details').textContent = details;

        document.getElementById('review-mistakes-btn').disabled = state.mistakes.length === 0;

        showScreen('results');
    }

    function toggleFavorite(word) {
        var idx = state.favorites.indexOf(word);
        if (idx === -1) {
            state.favorites.push(word);
        } else {
            state.favorites.splice(idx, 1);
        }
        saveFavorites();
    }

    function renderFavorites() {
        var list = document.getElementById('favorites-list');
        var noMsg = document.getElementById('no-favs-message');
        var practiceBtn = document.getElementById('practice-favs-btn');
        var searchVal = document.getElementById('fav-search').value.toLowerCase().trim();

        var filtered = state.favorites.filter(function (eng) {
            if (!searchVal) return true;
            for (var i = 0; i < WORDS.length; i++) {
                if (WORDS[i][0] === eng) {
                    return eng.toLowerCase().indexOf(searchVal) !== -1 || WORDS[i][1].indexOf(searchVal) !== -1;
                }
            }
            return eng.toLowerCase().indexOf(searchVal) !== -1;
        });

        if (state.favorites.length === 0) {
            list.innerHTML = '';
            noMsg.classList.remove('hidden');
            practiceBtn.disabled = true;
            return;
        }

        noMsg.classList.add('hidden');
        practiceBtn.disabled = false;

        var html = '';
        for (var i = 0; i < filtered.length; i++) {
            var eng = filtered[i];
            var heb = '';
            for (var j = 0; j < WORDS.length; j++) {
                if (WORDS[j][0] === eng) { heb = WORDS[j][1]; break; }
            }
            html += '<div class="fav-item" data-word="' + eng + '">';
            html += '<div class="fav-item-words">';
            html += '<span class="fav-item-en">' + eng + '</span>';
            html += '<span class="fav-item-he">' + heb + '</span>';
            html += '</div>';
            html += '<div class="fav-item-actions">';
            html += '<button class="fav-speak-btn" data-word="' + eng + '" aria-label="' + tr('השמע את המילה') + '" title="' + tr('השמע את המילה') + '"><svg viewBox="0 0 24 24" width="18" height="18" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><polygon points="11 5 6 9 2 9 2 15 6 15 11 19 11 5"/><path d="M15.54 8.46a5 5 0 010 7.07M19.07 4.93a10 10 0 010 14.14"/></svg></button>';
            html += '<button class="fav-remove-btn" data-word="' + eng + '" title="' + tr('הסר') + '">&#x2715;</button>';
            html += '</div>';
            html += '</div>';
        }
        list.innerHTML = html;
    }

    function renderStats() {
        var s = state.stats;
        document.getElementById('stat-total').textContent = s.totalAnswered;

        var pct = s.totalAnswered > 0 ? Math.round((s.totalCorrect / s.totalAnswered) * 100) : 0;
        document.getElementById('stat-correct').textContent = pct + '%';
        document.getElementById('stat-streak').textContent = s.bestStreak;

        var mastered = 0;
        var history = s.wordHistory;
        for (var word in history) {
            if (history.hasOwnProperty(word) && history[word].correct >= MASTERY_THRESHOLD) {
                mastered++;
            }
        }
        document.getElementById('stat-mastered').textContent = mastered;
        renderWeekChart();

        for (var lvl = 1; lvl <= 3; lvl++) {
            var ls = s.levelStats[lvl] || { answered: 0, correct: 0 };
            var bar = document.getElementById('level' + lvl + '-bar');
            var label = document.getElementById('level' + lvl + '-stat');
            var barPct = ls.answered > 0 ? Math.round((ls.correct / ls.answered) * 100) : 0;
            bar.style.width = barPct + '%';
            label.textContent = ls.correct + '/' + ls.answered;
        }
    }

    function exportFavorites() {
        var lines = ['English,Hebrew'];
        for (var i = 0; i < state.favorites.length; i++) {
            var eng = state.favorites[i];
            var heb = '';
            for (var j = 0; j < WORDS.length; j++) {
                if (WORDS[j][0] === eng) { heb = WORDS[j][1]; break; }
            }
            lines.push(eng + ',' + heb);
        }
        var csv = lines.join('\n');
        var blob = new Blob(['﻿' + csv], { type: 'text/csv;charset=utf-8;' });
        var url = URL.createObjectURL(blob);
        var a = document.createElement('a');
        a.href = url;
        a.download = 'favorites.csv';
        a.click();
        URL.revokeObjectURL(url);
    }

    // Full screen: installed app uses the manifest; in a mobile browser we
    // request it on the first touch (Android). iOS Safari has no such API.
    // Light/dark switch: saves the choice and updates the browser bar colour
    function initTheme() {
        var btn = document.getElementById('theme-btn');
        if (!btn) return;
        var text = btn.querySelector('.theme-label');
        function showLabel(theme) {
            // The button names the theme it switches to
            var label = theme === 'light' ? tr('מצב כהה') : tr('מצב בהיר');
            text.textContent = label;
            btn.title = label;
        }
        showLabel(document.documentElement.dataset.theme);
        btn.addEventListener('click', function () {
            var next = document.documentElement.dataset.theme === 'light' ? 'dark' : 'light';
            document.documentElement.dataset.theme = next;
            try { localStorage.setItem('wq_theme', next); } catch (e) { /* ignored */ }
            showLabel(next);
            var meta = document.querySelector('meta[name="theme-color"]');
            if (meta) meta.content = next === 'light' ? '#f3f4fb' : '#0c1424';
        });
    }

    function initFullscreen() {
        var root = document.documentElement;
        var request = root.requestFullscreen || root.webkitRequestFullscreen;
        var isStandalone = window.matchMedia('(display-mode: fullscreen), (display-mode: standalone)').matches ||
            window.navigator.standalone === true;
        var btn = document.getElementById('fullscreen-btn');
        if (!request || isStandalone) return;

        function isFull() { return !!(document.fullscreenElement || document.webkitFullscreenElement); }
        function enter() {
            if (isFull()) return;
            try {
                var p = request.call(root);
                if (p && p.catch) p.catch(function () {});
            } catch (e) {}
        }
        function exit() {
            var ex = document.exitFullscreen || document.webkitExitFullscreen;
            try { if (ex) ex.call(document); } catch (e) {}
        }

        btn.classList.remove('hidden');
        btn.addEventListener('click', function (e) {
            e.stopPropagation();
            if (isFull()) exit(); else enter();
        });

        var isTouch = window.matchMedia('(pointer: coarse)').matches;
        if (isTouch) {
            document.addEventListener('click', function once() {
                document.removeEventListener('click', once);
                enter();
            });
        }
    }

    // ---- Sentence building: put the words in order by tapping or dragging the tiles ----
    var sentenceQueue = [];
    var sentenceIdx = 0;
    var sentenceMissed = [];
    var sentenceBlank = null;
    var hintWords = 0;
    var wrongTries = 0;
    var drag = null;

    // Compare words only: case and punctuation do not matter
    function sentenceWords(s) {
        return s.toLowerCase().replace(/[^a-z0-9' ]/g, ' ').split(/\s+/).filter(Boolean).join(' ');
    }

    var sentenceLevel = 'all';
    // Exercise type: 'mixed' (both kinds at random), 'arrange' or 'blank'
    var sentenceType = 'mixed';

    // Shows the level picker first; the game starts after a level is chosen
    function openSentenceMenu() {
        showScreen('sentence');
        document.getElementById('sentence-levels').classList.remove('hidden');
        document.getElementById('sentence-game').classList.add('hidden');
    }

    function sentencePool(level) {
        if (level === 'srs') {
            var sdata = loadSrs();
            var due = SENTENCES.filter(function (s) { return srsIsDue('s:' + s[1]); });
            var fresh = SENTENCES.filter(function (s) { return !sdata['s:' + s[1]]; });
            return due.concat(shuffle(fresh).slice(0, 10));
        }
        return level === 'all' ? SENTENCES : SENTENCES.filter(function (s) { return s[0] === level; });
    }

    // level: 1, 2, 3 or 'all'. retry: sentences missed in the last round, asked again first
    function startSentences(level, retry) {
        if (level !== undefined) sentenceLevel = level;
        retry = retry || [];
        var fresh = sentencePool(sentenceLevel).filter(function (s) { return retry.indexOf(s) < 0; });
        sentenceQueue = shuffle(retry.concat(shuffle(fresh).slice(0, 10 - retry.length)));
        sentenceIdx = 0;
        sentenceMissed = [];
        careerStage = null;
        document.getElementById('career-note').classList.add('hidden');
        document.getElementById('career-dialogue').classList.add('hidden');
        document.getElementById('sentence-levels').classList.add('hidden');
        document.getElementById('sentence-game').classList.remove('hidden');
        renderSentence();
    }

    // Keeps only the letters and apostrophes, so "coffee." becomes "coffee"
    function cleanWord(w) {
        return w.replace(/[^A-Za-z']/g, '');
    }

    // Picks a word (3+ letters) to leave blank; null means this round uses the arrange exercise
    function pickBlank(s) {
        var words = s[2].split(' ');
        var options = [];
        words.forEach(function (w, i) { if (cleanWord(w).length >= 3) options.push(i); });
        if (!options.length || sentenceType === 'arrange') return null;
        if (sentenceType === 'mixed' && Math.random() < 0.5) return null;
        var i = options[Math.floor(Math.random() * options.length)];
        return { index: i, word: cleanWord(words[i]) };
    }

    // The correct word plus 3 random words from other sentences, none of them in this sentence
    function blankChoices(s, correct) {
        var own = s[2].split(' ').map(function (w) { return cleanWord(w).toLowerCase(); });
        var others = [];
        sentencePool(sentenceLevel).forEach(function (o) {
            o[2].split(' ').forEach(function (w) {
                var c = cleanWord(w);
                if (c.length >= 3 && own.indexOf(c.toLowerCase()) < 0 && others.indexOf(c) < 0) others.push(c);
            });
        });
        return shuffle(shuffle(others).slice(0, 3).concat([correct]));
    }

    function renderSentence() {
        var s = sentenceQueue[sentenceIdx];
        sentenceBlank = pickBlank(s);
        var blankMode = sentenceBlank !== null;
        document.getElementById('sentence-prompt').textContent = s[1];
        document.getElementById('sentence-feedback').textContent = '';
        document.getElementById('sentence-explain').textContent = '';
        document.getElementById('sentence-check').disabled = false;
        document.getElementById('sentence-next').classList.add('hidden');
        document.getElementById('sentence-speak').classList.add('hidden');
        document.getElementById('sentence-reveal').classList.remove('hidden');
        // Career stages give hints instead of the answer; each press shows one more word
        document.getElementById('sentence-reveal').textContent = careerStage !== null ? tr('רמז') : tr('הצג תשובה');
        hintWords = 0;
        wrongTries = 0;
        // Show only the exercise that matches this sentence
        document.getElementById('sentence-check').classList.toggle('hidden', blankMode);
        document.getElementById('sentence-answer').classList.toggle('hidden', blankMode);
        document.getElementById('sentence-bank').classList.toggle('hidden', blankMode);
        document.getElementById('sentence-blank').classList.toggle('hidden', !blankMode);
        document.getElementById('sentence-choices').classList.toggle('hidden', !blankMode);
        document.getElementById('sentence-answer').innerHTML = '';
        var bank = document.getElementById('sentence-bank');
        bank.innerHTML = '';
        if (blankMode) {
            var words = s[2].split(' ');
            words[sentenceBlank.index] = words[sentenceBlank.index].replace(sentenceBlank.word, '____');
            document.getElementById('sentence-blank').textContent = words.join(' ');
            var choices = document.getElementById('sentence-choices');
            choices.innerHTML = '';
            blankChoices(s, sentenceBlank.word).forEach(function (w) {
                var btn = document.createElement('button');
                btn.className = 'secondary-btn choice-btn';
                btn.textContent = w;
                choices.appendChild(btn);
            });
            return;
        }
        shuffle(s[2].split(' ')).forEach(function (word) {
            var tile = document.createElement('button');
            tile.className = 'tile';
            tile.textContent = word;
            bank.appendChild(tile);
        });
    }

    // A sentence counts as missed once the user answers it wrong or reveals it; missed ones come back next round
    function markMissed() {
        var s = sentenceQueue[sentenceIdx];
        if (sentenceMissed.indexOf(s) < 0) sentenceMissed.push(s);
    }

    // Drop a tile into the answer row (before the tile it is over) or the bank row
    function dropTile(tile, x, y) {
        var answer = document.getElementById('sentence-answer');
        var bank = document.getElementById('sentence-bank');
        var zone = [answer, bank].find(function (z) {
            var r = z.getBoundingClientRect();
            return x >= r.left && x <= r.right && y >= r.top && y <= r.bottom;
        });
        if (zone === bank) return bank.appendChild(tile);
        if (!zone) return;
        var before = null;
        Array.prototype.some.call(answer.children, function (c) {
            if (c === tile) return false;
            var r = c.getBoundingClientRect();
            if (x < r.left + r.width / 2) { before = c; return true; }
            return false;
        });
        answer.insertBefore(tile, before);
    }

    // Wrong answers only ask to retry; the correct sentence is shown only on "הצג תשובה"
    function checkSentence() {
        var said = Array.prototype.map.call(document.querySelectorAll('#sentence-answer .tile'), function (t) {
            return t.textContent;
        }).join(' ');
        if (sentenceWords(said) !== sentenceWords(sentenceQueue[sentenceIdx][2])) {
            markMissed();
            wrongTries++;
            // In career stages, after two wrong tries the teacher shows the right sentence
            if (careerStage !== null && wrongTries >= 2) return revealSentence();
            document.getElementById('sentence-feedback').textContent = tr('לא נכון, נסה שוב');
            return;
        }
        document.getElementById('sentence-feedback').textContent = tr('נכון!');
        finishSentence();
    }

    function revealSentence() {
        markMissed();
        document.getElementById('sentence-feedback').textContent = tr('התשובה הנכונה: ' + sentenceQueue[sentenceIdx][2]);
        if (sentenceBlank) document.getElementById('sentence-blank').textContent = sentenceQueue[sentenceIdx][2];
        finishSentence();
    }

    // Shows the first words of the answer, one more each press, but never the whole sentence; a hint is not a miss
    function hintSentence() {
        var words = sentenceQueue[sentenceIdx][2].split(' ');
        hintWords = Math.min(hintWords + 1, words.length - 1);
        document.getElementById('sentence-feedback').textContent = tr('רמז: ' + words.slice(0, hintWords).join(' ') + ' ...');
    }

    function finishSentence() {
        // Career sentences carry a teaching note as their fourth item
        var cur = sentenceQueue[sentenceIdx];
        if (cur.length === 3) srsRecord('s:' + cur[1], sentenceMissed.indexOf(cur) < 0);
        recordDaily();
        document.getElementById('sentence-speak').classList.remove('hidden');
        var ex = cur[3];
        if (ex) document.getElementById('sentence-explain').textContent = tr('הערה: ' + ex);
        document.getElementById('sentence-check').disabled = true;
        Array.prototype.forEach.call(document.querySelectorAll('.choice-btn'), function (b) { b.disabled = true; });
        document.getElementById('sentence-reveal').classList.add('hidden');
        document.getElementById('sentence-next').classList.remove('hidden');
    }

    function nextSentence() {
        sentenceIdx++;
        if (sentenceIdx >= sentenceQueue.length) {
            if (careerStage !== null) return finishCareerRound();
            return startSentences(sentenceLevel, sentenceMissed);
        }
        renderSentence();
    }

    // ---- Reading passages: hover (desktop) or tap (phone) a word to see its translation from the word list ----
    var READING_KEY = 'wq_reading';
    var readingLevel = 1;
    var currentReadingText = '';
    var wordMap = null;

    // English word -> Hebrew, single words only; the first entry wins
    function getWordMap() {
        if (!wordMap) {
            wordMap = {};
            WORDS.forEach(function (w) {
                var k = w[0].toLowerCase();
                if (k.indexOf(' ') < 0 && wordMap[k] === undefined) wordMap[k] = w[1];
            });
        }
        return wordMap;
    }

    function loadReadingDone() {
        try { return JSON.parse(localStorage.getItem(READING_KEY)) || []; } catch (e) { return []; }
    }

    function saveReadingDone(id) {
        var done = loadReadingDone();
        if (done.indexOf(id) < 0) done.push(id);
        try { localStorage.setItem(READING_KEY, JSON.stringify(done)); } catch (e) { /* ignored */ }
    }

    function openReading() {
        showScreen('reading');
        document.getElementById('reading-levels').classList.remove('hidden');
        document.getElementById('reading-list').classList.add('hidden');
        document.getElementById('reading-view').classList.add('hidden');
    }

    function showReadingList(level) {
        readingLevel = level;
        var done = loadReadingDone();
        var box = document.getElementById('reading-list');
        box.innerHTML = '';
        var back = document.createElement('button');
        back.className = 'secondary-btn';
        back.textContent = tr('חזרה לרמות');
        back.addEventListener('click', openReading);
        box.appendChild(back);
        READING.filter(function (p) { return p.level === level; }).forEach(function (p, i) {
            var b = document.createElement('button');
            b.className = 'secondary-btn reading-item';
            b.textContent = (i + 1) + '. ' + p.title + (done.indexOf(p.id) >= 0 ? ' ✓' : '');
            b.addEventListener('click', function () { showReadingPassage(p); });
            box.appendChild(b);
        });
        document.getElementById('reading-levels').classList.add('hidden');
        document.getElementById('reading-view').classList.add('hidden');
        box.classList.remove('hidden');
    }

    function showReadingPassage(p) {
        document.getElementById('reading-list').classList.add('hidden');
        document.getElementById('reading-view').classList.remove('hidden');
        document.getElementById('reading-title').textContent = p.title;
        currentReadingText = p.text;
        document.getElementById('reading-popup').classList.add('hidden');
        document.getElementById('reading-score').textContent = '';

        // Each English word becomes a clickable span; the title attribute shows the translation on hover
        var body = document.getElementById('reading-text');
        var map = getWordMap();
        body.innerHTML = '';
        p.text.split(/([A-Za-z][A-Za-z']*)/).forEach(function (part) {
            if (!/^[A-Za-z]/.test(part)) { body.appendChild(document.createTextNode(part)); return; }
            var span = document.createElement('span');
            var key = part.toLowerCase();
            span.className = 'rw';
            span.dataset.w = part;
            span.textContent = part;
            span.title = map[key] || tr('לא נמצא ברשימה');
            body.appendChild(span);
        });

        var qbox = document.getElementById('reading-questions');
        qbox.innerHTML = '';
        var answered = 0;
        var correct = 0;
        p.questions.forEach(function (item, qi) {
            var block = document.createElement('div');
            block.className = 'reading-q';
            var qt = document.createElement('p');
            qt.textContent = (qi + 1) + '. ' + item.q;
            qt.dir = 'ltr';
            block.appendChild(qt);
            item.options.forEach(function (opt, oi) {
                var b = document.createElement('button');
                b.className = 'secondary-btn reading-opt';
                b.dir = 'ltr';
                b.textContent = opt;
                b.addEventListener('click', function () {
                    if (block.dataset.done) return;
                    block.dataset.done = '1';
                    answered++;
                    var ok = oi === item.answer;
                    if (ok) correct++;
                    b.classList.add(ok ? 'correct' : 'wrong');
                    block.querySelectorAll('.reading-opt')[item.answer].classList.add('correct');
                    if (answered === p.questions.length) {
                        document.getElementById('reading-score').textContent = tr('ענית נכון על ' + correct + ' מתוך ' + p.questions.length + '.');
                        if (correct >= 2) saveReadingDone(p.id);
                    }
                });
                block.appendChild(b);
            });
            qbox.appendChild(block);
        });
    }

    function initReading() {
        var levelBtns = document.querySelectorAll('.reading-level-btn');
        for (var i = 0; i < levelBtns.length; i++) {
            levelBtns[i].addEventListener('click', function () { showReadingList(parseInt(this.dataset.rlevel, 10)); });
        }
        document.getElementById('reading-back').addEventListener('click', function () { showReadingList(readingLevel); });
        // Tapping a word opens a small box next to it with the translation; it closes on its button, outside tap, Escape or scroll
        var popup = document.getElementById('reading-popup');
        function closeReadingPopup() { popup.classList.add('hidden'); }
        document.getElementById('reading-popup-close').addEventListener('click', closeReadingPopup);
        document.getElementById('reading-text').addEventListener('click', function (e) {
            var span = e.target.closest('.rw');
            if (!span) return;
            var he = getWordMap()[span.dataset.w.toLowerCase()];
            document.getElementById('reading-popup-text').textContent = span.dataset.w + ' = ' + (he || tr('לא נמצא ברשימה'));
            popup.classList.remove('hidden');
            var rect = span.getBoundingClientRect();
            var width = popup.offsetWidth;
            var height = popup.offsetHeight;
            var left = Math.min(Math.max(rect.left, 8), window.innerWidth - width - 8);
            var top = rect.bottom + 8;
            if (top + height > window.innerHeight - 8) top = rect.top - height - 8;
            popup.style.left = left + 'px';
            popup.style.top = Math.max(8, top) + 'px';
        });
        document.addEventListener('click', function (e) {
            if (popup.classList.contains('hidden')) return;
            if (e.target.closest('#reading-popup') || e.target.closest('.rw')) return;
            closeReadingPopup();
        });
        document.addEventListener('keydown', function (e) {
            if (e.key === 'Escape') closeReadingPopup();
        });
        window.addEventListener('scroll', closeReadingPopup, { passive: true });
    }

    // ---- Spaced repetition: a right answer moves an item one box up (longer wait), a wrong one resets it to box 0 ----
    var SRS_KEY = 'wq_srs';
    var SRS_DAYS = [0, 1, 3, 7, 14, 30];
    var srsData = null;

    function loadSrs() {
        if (!srsData) {
            try { srsData = JSON.parse(localStorage.getItem(SRS_KEY)) || {}; } catch (e) { srsData = {}; }
        }
        return srsData;
    }

    function saveSrs() {
        try { localStorage.setItem(SRS_KEY, JSON.stringify(srsData)); } catch (e) { /* ignored */ }
    }

    // key: 'w:' + English word, or 's:' + Hebrew sentence
    function srsRecord(key, ok) {
        var data = loadSrs();
        var item = data[key] || { b: 0, d: 0 };
        item.b = ok ? Math.min(item.b + 1, SRS_DAYS.length - 1) : 0;
        item.d = Date.now() + SRS_DAYS[item.b] * 86400000;
        data[key] = item;
        saveSrs();
    }

    function srsIsDue(key) {
        var item = loadSrs()[key];
        return !!item && item.d <= Date.now();
    }

    // Words due today (most overdue first), then up to 10 words never scheduled before
    function getSrsWords() {
        var data = loadSrs();
        var byEng = {};
        WORDS.forEach(function (w, i) { byEng[w[0]] = i; });
        var due = Object.keys(data).filter(function (k) { return k.indexOf('w:') === 0 && srsIsDue(k); })
            .sort(function (a, b) { return data[a].d - data[b].d; });
        var words = [];
        due.forEach(function (k) {
            var e = k.slice(2);
            if (byEng[e] !== undefined) words.push({ e: e, h: WORDS[byEng[e]][1], idx: byEng[e] });
        });
        var fresh = [];
        WORDS.forEach(function (w, i) { if (!data['w:' + w[0]]) fresh.push({ e: w[0], h: w[1], idx: i }); });
        return words.concat(shuffle(fresh).slice(0, 10)).slice(0, 30);
    }

    // Short message that disappears by itself, e.g. when the daily goal is reached
    var toastTimer = null;
    function showToast(text) {
        var el = document.getElementById('toast');
        el.textContent = text;
        el.classList.remove('hidden');
        clearTimeout(toastTimer);
        toastTimer = setTimeout(function () { el.classList.add('hidden'); }, 2500);
    }

    // ---- Answers per day for the weekly chart, kept after the daily count resets ----
    var DAILY_HIST_KEY = 'wq_daily_hist';

    function saveDailyHist(count) {
        var hist = {};
        try { hist = JSON.parse(localStorage.getItem(DAILY_HIST_KEY)) || {}; } catch (e) { hist = {}; }
        hist[todayKey()] = count;
        try { localStorage.setItem(DAILY_HIST_KEY, JSON.stringify(hist)); } catch (e) { /* ignored */ }
    }

    function renderWeekChart() {
        var hist = {};
        try { hist = JSON.parse(localStorage.getItem(DAILY_HIST_KEY)) || {}; } catch (e) { hist = {}; }
        var days = [];
        for (var i = 6; i >= 0; i--) {
            var d = new Date();
            d.setDate(d.getDate() - i);
            days.push({ label: d.getDate() + '/' + (d.getMonth() + 1), count: hist[dayKey(d)] || 0 });
        }
        var max = Math.max(1, Math.max.apply(null, days.map(function (x) { return x.count; })));
        var box = document.getElementById('week-chart');
        box.textContent = '';
        days.forEach(function (x) {
            var col = document.createElement('div');
            col.className = 'week-col';
            var num = document.createElement('span');
            num.textContent = x.count;
            var track = document.createElement('div');
            track.className = 'week-track';
            var bar = document.createElement('div');
            bar.className = 'week-bar';
            bar.style.height = Math.round(x.count / max * 100) + '%';
            track.appendChild(bar);
            var lbl = document.createElement('span');
            lbl.className = 'week-label';
            lbl.textContent = x.label;
            col.appendChild(num);
            col.appendChild(track);
            col.appendChild(lbl);
            box.appendChild(col);
        });
    }

    // Words missed in the round, each once, shown on the results screen
    function renderMistakes() {
        var box = document.getElementById('results-mistakes');
        box.textContent = '';
        var seen = {};
        var words = state.mistakes.filter(function (w) {
            if (seen[w.e]) return false;
            seen[w.e] = true;
            return true;
        });
        box.classList.toggle('hidden', words.length === 0);
        if (words.length === 0) return;
        var title = document.createElement('h3');
        title.textContent = tr('המילים שטעיתם');
        box.appendChild(title);
        words.forEach(function (w) {
            var row = document.createElement('div');
            row.className = 'results-mistake';
            var en = document.createElement('span');
            en.dir = 'ltr';
            en.textContent = w.e;
            var he = document.createElement('span');
            he.textContent = w.h;
            row.appendChild(en);
            row.appendChild(he);
            box.appendChild(row);
        });
    }

    // Hint for active writing: first letter, then one blank per remaining letter
    function showWriteHint() {
        var w = writeQueue[writeIdx];
        if (!w) return;
        document.getElementById('write-hint').textContent = w.e.charAt(0) + w.e.slice(1).replace(/[a-zA-Z]/g, ' _');
    }

    // ---- Daily goal (answers per day) and optional reminder while the page is open ----
    var SETTINGS_KEY = 'wq_settings';
    var DAILY_KEY = 'wq_daily';
    var goalSteps = [10, 20, 30, 50];

    function loadSettings() {
        var s = {};
        try { s = JSON.parse(localStorage.getItem(SETTINGS_KEY)) || {}; } catch (e) { s = {}; }
        return { goal: s.goal || 20, remind: !!s.remind, remindAt: s.remindAt || '19:00' };
    }

    function saveSettings(s) {
        try { localStorage.setItem(SETTINGS_KEY, JSON.stringify(s)); } catch (e) { /* ignored */ }
    }

    function dayKey(d) {
        return d.getFullYear() + '-' + (d.getMonth() + 1) + '-' + d.getDate();
    }

    function todayKey() {
        return dayKey(new Date());
    }

    function loadDaily() {
        var d = {};
        try { d = JSON.parse(localStorage.getItem(DAILY_KEY)) || {}; } catch (e) { d = {}; }
        if (d.date !== todayKey()) d = { date: todayKey(), count: 0, notified: false };
        return d;
    }

    // Called after every answer in any exercise
    function recordDaily() {
        var d = loadDaily();
        d.count++;
        try { localStorage.setItem(DAILY_KEY, JSON.stringify(d)); } catch (e) { /* ignored */ }
        saveDailyHist(d.count);
        if (d.count === loadSettings().goal) showToast(tr('כל הכבוד! הגעתם ליעד של היום'));
        updateDailyBox();
    }

    function updateDailyBox() {
        var s = loadSettings();
        var d = loadDaily();
        var pct = Math.min(100, Math.round(d.count / s.goal * 100));
        document.getElementById('daily-text').textContent = tr('היום: ' + d.count + ' מתוך ' + s.goal + ' תשובות');
        document.getElementById('daily-fill').style.width = pct + '%';
        document.getElementById('remind-toggle').checked = s.remind;
        document.getElementById('remind-time').value = s.remindAt;
        var note = '';
        if (s.remind && !('Notification' in window)) note = tr('הדפדפן הזה לא תומך בתזכורות.');
        else if (s.remind && Notification.permission !== 'granted') note = tr('כדי לקבל תזכורות צריך לאשר התראות בדפדפן.');
        else if (s.remind) note = tr('התזכורת תופיע רק כשהאתר פתוח בדפדפן.');
        document.getElementById('remind-note').textContent = note;
    }

    function checkReminder() {
        var s = loadSettings();
        if (!s.remind || !('Notification' in window) || Notification.permission !== 'granted') return;
        var d = loadDaily();
        var now = new Date();
        var hm = now.getHours() * 60 + now.getMinutes();
        var parts = s.remindAt.split(':');
        var at = parseInt(parts[0], 10) * 60 + parseInt(parts[1], 10);
        if (hm >= at && d.count < s.goal && !d.notified) {
            new Notification(tr('אוצר מילים'), { body: tr('עדיין לא הגעת ליעד של היום (' + d.count + ' מתוך ' + s.goal + ')') });
            d.notified = true;
            try { localStorage.setItem(DAILY_KEY, JSON.stringify(d)); } catch (e) { /* ignored */ }
        }
    }

    function initDaily() {
        document.getElementById('daily-goal-btn').addEventListener('click', function () {
            var s = loadSettings();
            var i = goalSteps.indexOf(s.goal);
            s.goal = goalSteps[(i + 1) % goalSteps.length];
            saveSettings(s);
            updateDailyBox();
        });
        document.getElementById('remind-toggle').addEventListener('change', function () {
            var s = loadSettings();
            s.remind = this.checked;
            saveSettings(s);
            if (s.remind && 'Notification' in window && Notification.permission === 'default') Notification.requestPermission().then(updateDailyBox);
            updateDailyBox();
        });
        document.getElementById('remind-time').addEventListener('change', function () {
            var s = loadSettings();
            s.remindAt = this.value || '19:00';
            saveSettings(s);
            updateDailyBox();
        });
        updateDailyBox();
        checkReminder();
        setInterval(checkReminder, 60000);
    }

    // ---- Tool cards on the home screen ----
    function openTool(tool) {
        if (tool === 'srs') {
            if (getSrsWords().length === 0) { document.getElementById('tool-note').textContent = tr('אין כרגע מילים לחזרה. נסו שוב מאוחר יותר.'); return; }
            document.getElementById('tool-note').textContent = '';
            return startQuiz('srs');
        }
        if (tool === 'write') return openWrite();
        if (tool === 'cards') return openCards();
        if (tool === 'grammar') return openGrammar();
        if (tool === 'dictation') return openDictation();
        if (tool === 'placement') return openPlacement();
    }

    // ---- Active writing: see the Hebrew, type the English word ----
    var writeQueue = [];
    var writeIdx = 0;
    var writeTries = 0;

    function openWrite() {
        showScreen('write');
        document.getElementById('write-levels').classList.remove('hidden');
        document.getElementById('write-game').classList.add('hidden');
    }

    function startWrite(level) {
        var pool = getWordsForLevel(level);
        writeQueue = shuffle(pool).slice(0, 20);
        writeIdx = 0;
        document.getElementById('write-levels').classList.add('hidden');
        document.getElementById('write-game').classList.remove('hidden');
        renderWrite();
    }

    function normalizeEn(s) {
        return s.toLowerCase().replace(/[^a-z' ]/g, ' ').replace(/\s+/g, ' ').trim();
    }

    function renderWrite() {
        var w = writeQueue[writeIdx];
        writeTries = 0;
        document.getElementById('write-hebrew').textContent = w.h;
        var input = document.getElementById('write-input');
        input.value = '';
        input.disabled = false;
        document.getElementById('write-feedback').textContent = '';
        document.getElementById('write-hint').textContent = '';
        document.getElementById('write-check').disabled = false;
        document.getElementById('write-check').classList.remove('hidden');
        document.getElementById('write-next').classList.add('hidden');
        document.getElementById('write-speak').classList.add('hidden');
        input.focus();
    }

    function checkWrite() {
        var w = writeQueue[writeIdx];
        var said = normalizeEn(document.getElementById('write-input').value);
        if (!said) return;
        if (said === normalizeEn(w.e)) {
            document.getElementById('write-feedback').textContent = tr('נכון!');
            srsRecord('w:' + w.e, true);
            recordDaily();
            return finishWrite(w);
        }
        writeTries++;
        if (writeTries >= 2) {
            document.getElementById('write-feedback').textContent = tr('התשובה הנכונה: ' + w.e);
            srsRecord('w:' + w.e, false);
            recordDaily();
            return finishWrite(w);
        }
        document.getElementById('write-feedback').textContent = tr('לא מדויק, נסה שוב');
    }

    function finishWrite(w) {
        document.getElementById('write-input').disabled = true;
        document.getElementById('write-check').classList.add('hidden');
        document.getElementById('write-next').classList.remove('hidden');
        document.getElementById('write-speak').classList.remove('hidden');
        speak(w.e);
    }

    function initWrite() {
        var btns = document.querySelectorAll('.write-level-btn');
        for (var i = 0; i < btns.length; i++) {
            btns[i].addEventListener('click', function () {
                var lvl = parseInt(this.dataset.wlevel, 10);
                startWrite(lvl);
            });
        }
        document.getElementById('write-check').addEventListener('click', checkWrite);
        document.getElementById('write-input').addEventListener('keydown', function (e) {
            if (e.key === 'Enter' && !document.getElementById('write-check').classList.contains('hidden')) checkWrite();
        });
        document.getElementById('write-next').addEventListener('click', function () {
            writeIdx++;
            if (writeIdx >= writeQueue.length) return openWrite();
            renderWrite();
        });
        document.getElementById('write-speak').addEventListener('click', function () { speak(writeQueue[writeIdx].e); });
        document.getElementById('write-back').addEventListener('click', openWrite);
    }

    // ---- Flashcards: flip to see the translation, then mark known / not known ----
    var cardQueue = [];
    var cardIdx = 0;
    var cardFlipped = false;

    function openCards() {
        showScreen('cards');
        document.getElementById('cards-levels').classList.remove('hidden');
        document.getElementById('cards-game').classList.add('hidden');
    }

    function startCards(source) {
        cardQueue = source === 'srs' ? getSrsWords() : shuffle(getWordsForLevel(source)).slice(0, 30);
        cardIdx = 0;
        document.getElementById('cards-levels').classList.add('hidden');
        document.getElementById('cards-game').classList.remove('hidden');
        if (cardQueue.length === 0) {
            document.getElementById('card-progress').textContent = tr('אין כרטיסיות לתרגול עכשיו.');
            document.getElementById('card-front').textContent = '';
            return;
        }
        renderCard();
    }

    function renderCard() {
        var c = cardQueue[cardIdx];
        cardFlipped = false;
        document.getElementById('card-front').textContent = c.e;
        document.getElementById('card-back').textContent = '';
        document.getElementById('card-know').classList.add('hidden');
        document.getElementById('card-dont').classList.add('hidden');
        document.getElementById('card-progress').textContent = tr('כרטיס ' + (cardIdx + 1) + ' מתוך ' + cardQueue.length + ' · לחצו על הכרטיס כדי לראות את התרגום');
    }

    function flipCard() {
        if (cardQueue.length === 0 || cardFlipped) return;
        cardFlipped = true;
        document.getElementById('card-back').textContent = cardQueue[cardIdx].h;
        document.getElementById('card-know').classList.remove('hidden');
        document.getElementById('card-dont').classList.remove('hidden');
        speak(cardQueue[cardIdx].e);
    }

    function answerCard(ok) {
        if (!cardFlipped) return;
        srsRecord('w:' + cardQueue[cardIdx].e, ok);
        recordDaily();
        cardIdx++;
        if (cardIdx >= cardQueue.length) return openCards();
        renderCard();
    }

    function initCards() {
        var btns = document.querySelectorAll('.cards-level-btn');
        for (var i = 0; i < btns.length; i++) {
            btns[i].addEventListener('click', function () {
                var v = this.dataset.clevel;
                startCards(v === 'srs' ? 'srs' : parseInt(v, 10));
            });
        }
        document.getElementById('card-face').addEventListener('click', flipCard);
        document.getElementById('card-know').addEventListener('click', function () { answerCard(true); });
        document.getElementById('card-dont').addEventListener('click', function () { answerCard(false); });
        document.getElementById('card-speak').addEventListener('click', function () {
            if (cardQueue.length) speak(cardQueue[cardIdx].e);
        });
        document.getElementById('card-back-levels').addEventListener('click', openCards);
    }

    // ---- Grammar: explanation, pattern, examples and three quick exercises per topic ----
    // The first ten topics live in grammar.js, the rest in grammar-more.js
    function grammarTopics() {
        return GRAMMAR_TOPICS.concat(typeof GRAMMAR_MORE !== 'undefined' ? GRAMMAR_MORE : []);
    }

    function openGrammar() {
        showScreen('grammar');
        document.getElementById('grammar-detail').classList.add('hidden');
        var list = document.getElementById('grammar-list');
        list.innerHTML = '';
        list.classList.remove('hidden');
        grammarTopics().forEach(function (t, i) {
            var b = document.createElement('button');
            b.className = 'secondary-btn reading-item';
            b.textContent = (i + 1) + '. ' + t.title;
            b.addEventListener('click', function () { showGrammarTopic(i); });
            list.appendChild(b);
        });
    }

    function showGrammarTopic(i) {
        var t = grammarTopics()[i];
        document.getElementById('grammar-list').classList.add('hidden');
        document.getElementById('grammar-detail').classList.remove('hidden');
        document.getElementById('grammar-title').textContent = t.title;
        document.getElementById('grammar-explain').textContent = t.explain;
        document.getElementById('grammar-pattern').textContent = t.pattern;
        document.getElementById('grammar-tip').textContent = tr('שימו לב: ' + t.tip);

        var ex = document.getElementById('grammar-examples');
        ex.innerHTML = '';
        t.examples.forEach(function (pair) {
            var p = document.createElement('p');
            p.className = 'grammar-example';
            var en = document.createElement('span');
            en.dir = 'ltr';
            en.textContent = pair[0];
            var he = document.createElement('span');
            he.className = 'career-dialogue-he';
            he.textContent = pair[1];
            p.appendChild(en);
            p.appendChild(he);
            ex.appendChild(p);
        });

        var box = document.getElementById('grammar-exercises');
        box.innerHTML = '';
        var answered = 0;
        var correct = 0;
        t.exercises.forEach(function (item, qi) {
            var block = document.createElement('div');
            block.className = 'reading-q';
            var qt = document.createElement('p');
            qt.dir = 'ltr';
            qt.textContent = (qi + 1) + '. ' + item.q;
            block.appendChild(qt);
            item.options.forEach(function (opt, oi) {
                var b = document.createElement('button');
                b.className = 'secondary-btn reading-opt';
                b.dir = 'ltr';
                b.textContent = opt;
                b.addEventListener('click', function () {
                    if (block.dataset.done) return;
                    block.dataset.done = '1';
                    answered++;
                    var ok = oi === item.answer;
                    if (ok) correct++;
                    b.classList.add(ok ? 'correct' : 'wrong');
                    block.querySelectorAll('.reading-opt')[item.answer].classList.add('correct');
                    if (answered === t.exercises.length) {
                        var msg = document.createElement('p');
                        msg.className = 'reading-score';
                        msg.textContent = tr('ענית נכון על ' + correct + ' מתוך ' + t.exercises.length + '.');
                        box.appendChild(msg);
                    }
                });
                block.appendChild(b);
            });
            box.appendChild(block);
        });
    }

    function initGrammar() {
        document.getElementById('grammar-back').addEventListener('click', openGrammar);
    }

    // ---- Progress transfer between devices: export a file, import it on the other device ----
    var SYNC_KEYS = ['wq_favorites', 'wq_stats', 'wq_srs', 'wq_daily', 'wq_settings', 'wq_reading', 'wq_career'];

    function exportProgress() {
        var out = {};
        SYNC_KEYS.forEach(function (k) {
            var v = localStorage.getItem(k);
            if (v !== null) out[k] = v;
        });
        var blob = new Blob([JSON.stringify(out)], { type: 'application/json' });
        var a = document.createElement('a');
        a.href = URL.createObjectURL(blob);
        a.download = 'vocab-progress.json';
        a.click();
        setTimeout(function () { URL.revokeObjectURL(a.href); }, 1000);
    }

    function importProgress(file) {
        var reader = new FileReader();
        reader.onload = function () {
            var data;
            try { data = JSON.parse(reader.result); } catch (e) { alert(tr('הקובץ לא תקין.')); return; }
            SYNC_KEYS.forEach(function (k) {
                if (typeof data[k] === 'string') localStorage.setItem(k, data[k]);
            });
            location.reload();
        };
        reader.readAsText(file);
    }

    function initSync() {
        document.getElementById('export-btn').addEventListener('click', exportProgress);
        document.getElementById('import-btn').addEventListener('click', function () {
            document.getElementById('import-file').click();
        });
        document.getElementById('import-file').addEventListener('change', function () {
            if (this.files[0]) importProgress(this.files[0]);
        });
    }

    // ---- Dictation: the sentence is read aloud, the user types what they heard ----
    var dictQueue = [];
    var dictIdx = 0;
    var dictTries = 0;

    function openDictation() {
        showScreen('dictation');
        document.getElementById('dict-levels').classList.remove('hidden');
        document.getElementById('dict-game').classList.add('hidden');
    }

    function dictSource(level) {
        if (level === 'srs') {
            var data = loadSrs();
            var due = SENTENCES.filter(function (s) { return srsIsDue('d:' + s[2]); });
            var fresh = SENTENCES.filter(function (s) { return !data['d:' + s[2]]; });
            return due.concat(shuffle(fresh).slice(0, 10));
        }
        var pool = level === 'all' ? SENTENCES : SENTENCES.filter(function (s) { return s[0] === level; });
        return shuffle(pool.slice()).slice(0, 15);
    }

    function startDictation(level) {
        dictQueue = dictSource(level);
        dictIdx = 0;
        document.getElementById('dict-levels').classList.add('hidden');
        document.getElementById('dict-game').classList.remove('hidden');
        if (dictQueue.length === 0) {
            document.getElementById('dict-feedback').textContent = tr('אין כרגע משפטים לחזרה.');
            return;
        }
        renderDictation();
    }

    function renderDictation() {
        dictTries = 0;
        var input = document.getElementById('dict-input');
        input.value = '';
        input.disabled = false;
        document.getElementById('dict-feedback').textContent = tr('לחצו על "השמע" כדי לשמוע את המשפט.');
        document.getElementById('dict-correct').textContent = '';
        document.getElementById('dict-check').classList.remove('hidden');
        document.getElementById('dict-next').classList.add('hidden');
        document.getElementById('dict-count').textContent = tr('משפט ' + (dictIdx + 1) + ' מתוך ' + dictQueue.length);
        input.focus();
    }

    function playDictation(slow) {
        if (dictQueue.length) speak(dictQueue[dictIdx][2], slow ? 0.6 : 0.9);
    }

    function checkDictation() {
        var s = dictQueue[dictIdx];
        var said = normalizeEn(document.getElementById('dict-input').value);
        if (!said) return;
        if (said === normalizeEn(s[2])) {
            document.getElementById('dict-feedback').textContent = tr('נכון!');
            return finishDictation(s, true);
        }
        dictTries++;
        if (dictTries >= 2) {
            document.getElementById('dict-feedback').textContent = tr('המשפט הנכון:');
            return finishDictation(s, false);
        }
        document.getElementById('dict-feedback').textContent = tr('לא מדויק. השמיעו שוב ונסו שוב.');
    }

    function finishDictation(s, ok) {
        document.getElementById('dict-correct').textContent = s[2];
        document.getElementById('dict-input').disabled = true;
        document.getElementById('dict-check').classList.add('hidden');
        document.getElementById('dict-next').classList.remove('hidden');
        srsRecord('d:' + s[2], ok);
        recordDaily();
    }

    function initDictation() {
        var btns = document.querySelectorAll('.dict-level-btn');
        for (var i = 0; i < btns.length; i++) {
            btns[i].addEventListener('click', function () {
                var v = this.dataset.dlevel;
                startDictation(v === 'all' || v === 'srs' ? v : parseInt(v, 10));
            });
        }
        document.getElementById('dict-play').addEventListener('click', function () { playDictation(false); });
        document.getElementById('dict-slow').addEventListener('click', function () { playDictation(true); });
        document.getElementById('dict-check').addEventListener('click', checkDictation);
        document.getElementById('dict-input').addEventListener('keydown', function (e) {
            if (e.key === 'Enter' && !document.getElementById('dict-check').classList.contains('hidden')) {
                e.preventDefault();
                checkDictation();
            }
        });
        document.getElementById('dict-next').addEventListener('click', function () {
            dictIdx++;
            if (dictIdx >= dictQueue.length) return openDictation();
            renderDictation();
        });
        document.getElementById('dict-back').addEventListener('click', openDictation);
    }

    // ---- Placement test: 40 questions from the bank (placement-bank.js), levels from below B1 to C2 ----
    // Composition: 10 vocabulary, 10 grammar, 10 sentence completion (each 5 medium + 5 hard),
    // and 10 reading questions (5 on one medium passage, 5 on one hard passage)
    var PLACEMENT_KEY = 'wq_placement';
    var PLACEMENT_COUNT = { B: 5, C: 5 };
    var PLACEMENT_READING_BANDS = ['B', 'C'];
    var PLACEMENT_SECTION_NAME = { vocab: 'אוצר מילים', grammar: 'דקדוק', completion: 'השלמת משפטים', reading: 'קריאה' };
    var PLACEMENT_LEVEL_TEXT = {
        below: 'הרמה נמוכה מ-B1, ולכן צריך להשתפר. כדאי להתחיל מתרגול הבסיס: אוצר מילים יומיומי, זמנים ומשפטים פשוטים. אחרי כמה שבועות אפשר לעשות מבחן חדש.',
        B1: 'מבינים נושאים מוכרים מהעבודה והלימודים, ומתמודדים עם רוב המצבים בנסיעה ובשפה.',
        B2: 'מבינים טקסטים מורכבים ונושאים מופשטים, ומדברים בשטף סביר.',
        C1: 'מבינים טקסטים ארוכים ומורכבים, ומשתמשים בשפה גמישה ומדויקת.',
        C2: 'שליטה כמעט מלאה. מבינים כמעט כל טקסט, ומבטאים ניואנסים עדינים.'
    };
    var PLACEMENT_APP_LEVEL = { below: 'A1-A2', B1: 'B1-B2', B2: 'B1-B2', C1: 'C1-C2', C2: 'C1-C2' };
    var PLACEMENT_NEXT_STEP = {
        vocab: 'כדאי לחזור על אוצר המילים: תרגול לפי רמות.',
        grammar: 'כדאי לתרגל דקדוק: זמנים, תנאים ומבנים. ראו במסך הדקדוק.',
        completion: 'כדאי לתרגל השלמת משפטים: מילות קישור וצירופים קבועים. ראו במסך בניית משפטים.',
        reading: 'כדאי לקרוא קטעים קצרים ולעבור על המילים החדשות. ראו במסך הקריאה.'
    };
    var placementItems = [];
    var placementIdx = 0;
    var placementScore = { B: [0, 0], C: [0, 0] };
    var placementSection = { vocab: [0, 0], grammar: [0, 0], completion: [0, 0], reading: [0, 0] };

    function pickN(arr, n) {
        return shuffle(arr.slice()).slice(0, n);
    }

    // Keys of the items in the last draw. The next draw skips them when the pool allows it.
    var placementPrev = [];
    var placementDraw = [];

    function placementKey(x) { return x.en || x.q || x.title; }

    function pickFresh(arr, n) {
        var fresh = arr.filter(function (x) { return placementPrev.indexOf(placementKey(x)) < 0; });
        var picked = pickN(fresh.length >= n ? fresh : arr, n);
        picked.forEach(function (x) { placementDraw.push(placementKey(x)); });
        return picked;
    }

    // Multiple choice: shuffle the options, and find the new place of the right answer
    function placementMC(band, type, label, src) {
        var opts = src.options.slice();
        var correct = opts[src.answer];
        shuffle(opts);
        return { band: band, type: type, q: src.q, options: opts, answer: opts.indexOf(correct), label: label };
    }

    function buildPlacement() {
        var items = [];
        var bank = PLACEMENT_BANK;
        var levelOf = { B: 2, C: 3 };
        placementDraw = [];
        ['B', 'C'].forEach(function (b) {
            // Vocabulary: the Hebrew options are random words from the same level
            pickFresh(bank.vocab.filter(function (v) { return v.band === b; }), PLACEMENT_COUNT[b]).forEach(function (v) {
                var pool = WORDS.filter(function (w) { return w[2] === levelOf[b] && w[1] !== v.he; });
                var opts = [];
                shuffle(pool).forEach(function (w) { if (opts.length < 3 && opts.indexOf(w[1]) < 0) opts.push(w[1]); });
                opts.push(v.he);
                shuffle(opts);
                items.push({ band: b, type: 'vocab', q: v.en, options: opts, answer: opts.indexOf(v.he), label: tr('אוצר מילים: מה הפירוש?') });
            });
            pickFresh(bank.grammar.filter(function (g) { return g.band === b; }), PLACEMENT_COUNT[b]).forEach(function (g) {
                items.push(placementMC(b, 'grammar', tr('דקדוק: בחרו את המילה הנכונה'), g));
            });
            pickFresh(bank.completion.filter(function (c) { return c.band === b; }), PLACEMENT_COUNT[b]).forEach(function (c) {
                items.push(placementMC(b, 'completion', tr('השלמת משפטים: בחרו את המילה הנכונה'), c));
            });
        });
        // Reading: one medium passage and one hard passage, all 5 questions of each
        PLACEMENT_READING_BANDS.forEach(function (b) {
            var p = pickFresh(bank.reading.filter(function (r) { return r.band === b; }), 1)[0];
            p.questions.forEach(function (qq) {
                var it = placementMC(b, 'reading', tr('קריאה: ' + p.title), qq);
                it.passage = p.text;
                items.push(it);
            });
        });
        placementPrev = placementDraw;
        // Keep the order: vocabulary, grammar, sentence completion, reading
        var order = { vocab: 0, grammar: 1, completion: 2, reading: 3 };
        items.sort(function (x, y) { return order[x.type] - order[y.type]; });
        return items;
    }

    function openPlacement() {
        showScreen('placement');
        placementItems = buildPlacement();
        var saved = null;
        try { saved = JSON.parse(localStorage.getItem(PLACEMENT_KEY)); } catch (e) { saved = null; }
        document.getElementById('pl-last').textContent = saved ? tr('תוצאה אחרונה: ' + saved.level + ' (' + saved.date + ')') : '';
        document.getElementById('pl-intro').classList.remove('hidden');
        document.getElementById('pl-game').classList.add('hidden');
        document.getElementById('pl-result').classList.add('hidden');
    }

    function startPlacement() {
        placementIdx = 0;
        placementScore = { B: [0, 0], C: [0, 0] };
        placementSection = { vocab: [0, 0], grammar: [0, 0], completion: [0, 0], reading: [0, 0] };
        document.getElementById('pl-intro').classList.add('hidden');
        document.getElementById('pl-result').classList.add('hidden');
        document.getElementById('pl-game').classList.remove('hidden');
        renderPlacement();
    }

    function renderPlacement() {
        var it = placementItems[placementIdx];
        document.getElementById('pl-progress').textContent = tr('שאלה ' + (placementIdx + 1) + ' מתוך ' + placementItems.length);
        document.getElementById('pl-section').textContent = it.label;
        var pass = document.getElementById('pl-passage');
        pass.textContent = it.passage || '';
        pass.classList.toggle('hidden', !it.passage);
        var q = document.getElementById('pl-question');
        q.textContent = it.q;
        q.dir = 'ltr';
        document.getElementById('pl-feedback').textContent = '';
        document.getElementById('pl-next').classList.add('hidden');
        var box = document.getElementById('pl-options');
        box.innerHTML = '';
        box.classList.remove('hidden');
        it.options.forEach(function (opt, oi) {
            var b = document.createElement('button');
            b.className = 'secondary-btn reading-opt';
            b.dir = it.type === 'vocab' ? 'rtl' : 'ltr';
            b.textContent = opt;
            b.addEventListener('click', function () { answerPlacement(oi); });
            box.appendChild(b);
        });
    }

    function recordPlacement(it, ok) {
        placementScore[it.band][1]++;
        placementSection[it.type][1]++;
        if (ok) {
            placementScore[it.band][0]++;
            placementSection[it.type][0]++;
        }
    }

    function answerPlacement(oi) {
        var it = placementItems[placementIdx];
        if (!document.getElementById('pl-next').classList.contains('hidden')) return;
        var ok = oi === it.answer;
        recordPlacement(it, ok);
        var btns = document.querySelectorAll('#pl-options .reading-opt');
        btns.forEach(function (b, i) {
            b.disabled = true;
            if (i === it.answer) b.classList.add('correct');
            else if (i === oi) b.classList.add('wrong');
        });
        document.getElementById('pl-feedback').textContent = ok ? tr('נכון!') : tr('לא נכון.');
        document.getElementById('pl-next').classList.remove('hidden');
        document.getElementById('pl-next').textContent = placementIdx + 1 >= placementItems.length ? tr('לתוצאה') : tr('הבא');
    }

    function placementPct(s) {
        return s[1] ? s[0] / s[1] : 0;
    }

    // Medium items (B) decide whether the user is below B1. Hard items (C) decide B2 and above.
    function placementLevel() {
        var b = placementPct(placementScore.B), c = placementPct(placementScore.C);
        if (b < 0.4) return 'below';
        if (b < 0.7) return 'B1';
        if (c < 0.5) return 'B2';
        if (c < 0.85) return 'C1';
        return 'C2';
    }

    // The section with the lowest score is the first place to practice
    function placementWeakest() {
        var weakest = null;
        Object.keys(placementSection).forEach(function (k) {
            if (weakest === null || placementPct(placementSection[k]) < placementPct(placementSection[weakest])) weakest = k;
        });
        return weakest;
    }

    function finishPlacement() {
        var level = placementLevel();
        try { localStorage.setItem(PLACEMENT_KEY, JSON.stringify({ level: level, date: todayKey() })); } catch (e) { /* ignored */ }
        var sec = placementSection;
        var total = placementScore.B[0] + placementScore.C[0];
        var all = placementScore.B[1] + placementScore.C[1];
        document.getElementById('pl-game').classList.add('hidden');
        document.getElementById('pl-result').classList.remove('hidden');
        document.getElementById('pl-level').textContent = tr(level === 'below' ? 'רמה נמוכה: צריך להשתפר' : 'הרמה שלך: ' + level);
        document.getElementById('pl-desc').textContent = tr(PLACEMENT_LEVEL_TEXT[level]);
        document.getElementById('pl-scores').textContent = tr('סך הכל: ' + total + ' מתוך ' + all + '. ' +
            Object.keys(PLACEMENT_SECTION_NAME).map(function (k) {
                return PLACEMENT_SECTION_NAME[k] + ' ' + sec[k][0] + '/' + sec[k][1];
            }).join(', '));
        var steps = document.getElementById('pl-steps');
        steps.innerHTML = '';
        [
            'מומלץ להתחיל בתרגול ברמות ' + PLACEMENT_APP_LEVEL[level] + '.',
            PLACEMENT_NEXT_STEP[placementWeakest()],
            'כדאי לתרגל כ-15 דקות ביום ב"תרגול חכם".'
        ].forEach(function (text) {
            var li = document.createElement('li');
            li.textContent = tr(text);
            steps.appendChild(li);
        });
    }

    function initPlacement() {
        document.getElementById('pl-start').addEventListener('click', startPlacement);
        document.getElementById('pl-draw').addEventListener('click', function () {
            placementItems = buildPlacement();
            document.getElementById('pl-draw-note').textContent = tr('הוגרלו 40 שאלות חדשות מתוך 350.');
        });
        document.getElementById('pl-next').addEventListener('click', function () {
            placementIdx++;
            if (placementIdx >= placementItems.length) return finishPlacement();
            renderPlacement();
        });
        document.getElementById('pl-again').addEventListener('click', openPlacement);
        document.getElementById('pl-back').addEventListener('click', function () { showScreen('menu'); });
        document.getElementById('pl-back-result').addEventListener('click', function () { showScreen('menu'); });
    }

    function initTools() {
        var btns = document.querySelectorAll('.tool-btn');
        for (var i = 0; i < btns.length; i++) {
            btns[i].addEventListener('click', function () { openTool(this.dataset.tool); });
        }
        initWrite();
        initCards();
        initGrammar();
        initDictation();
        initPlacement();
        initDaily();
        initSync();
    }

    // ---- Business English track: 20 stages in order, each one opens after the previous one is done ----
    var CAREER_KEY = 'wq_career';
    var careerStage = null;

    function loadCareerDone() {
        try { return JSON.parse(localStorage.getItem(CAREER_KEY)) || []; } catch (e) { return []; }
    }

    function markCareerDone(i) {
        var done = loadCareerDone();
        if (done.indexOf(i) < 0) done.push(i);
        // Storage can be blocked (private mode): progress then lasts only until the page closes
        try { localStorage.setItem(CAREER_KEY, JSON.stringify(done)); } catch (e) { /* ignored */ }
    }

    function openCareerMap() {
        careerStage = null;
        showScreen('career');
        var done = loadCareerDone().filter(function (i) { return i < CAREER_STAGES.length; });
        var box = document.getElementById('career-map');
        box.innerHTML = '';

        // Overall progress bar at the top of the map
        var pct = Math.round(done.length / CAREER_STAGES.length * 100);
        var summary = document.createElement('div');
        summary.className = 'career-progress';
        var label = document.createElement('p');
        label.textContent = tr('התקדמות כללית: ' + done.length + ' מתוך ' + CAREER_STAGES.length + ' שלבים (' + pct + '%)');
        var bar = document.createElement('div');
        bar.className = 'career-bar';
        var fill = document.createElement('div');
        fill.className = 'career-bar-fill';
        fill.style.width = pct + '%';
        bar.appendChild(fill);
        summary.appendChild(label);
        summary.appendChild(bar);
        box.appendChild(summary);

        // Per-domain counts: done stages / all stages of that domain
        var domainDone = {};
        var domainSize = {};
        CAREER_STAGES.forEach(function (st, i) {
            domainSize[st.domain] = (domainSize[st.domain] || 0) + 1;
            if (done.indexOf(i) >= 0) domainDone[st.domain] = (domainDone[st.domain] || 0) + 1;
        });

        var lastDomain = '';
        CAREER_STAGES.forEach(function (st, i) {
            if (st.domain !== lastDomain) {
                lastDomain = st.domain;
                var h = document.createElement('h3');
                h.className = 'career-domain';
                h.textContent = st.domain + ' · ' + (domainDone[st.domain] || 0) + '/' + domainSize[st.domain];
                box.appendChild(h);
            }
            var unlocked = i === 0 || done.indexOf(i - 1) >= 0;
            var btn = document.createElement('button');
            btn.className = 'secondary-btn career-stage';
            btn.disabled = !unlocked;
            btn.textContent = st.title + tr(done.indexOf(i) >= 0 ? ' · הושלם' : unlocked ? '' : ' · נעול');
            btn.addEventListener('click', function () { startCareerStage(i); });
            box.appendChild(btn);
        });
    }

    function startCareerStage(i) {
        careerStage = i;
        var stage = CAREER_STAGES[i];
        // Entry: [level, Hebrew, English, teaching note]
        var own = stage.sentences.map(function (p, j) { return [0, p[0], p[1], CAREER_EXPLAIN[i][j]]; });
        // Two sentences from earlier stages of the same domain come back, so older words are not forgotten
        var earlier = [];
        CAREER_STAGES.forEach(function (st, k) {
            if (k < i && st.domain === stage.domain) {
                earlier = earlier.concat(st.sentences.map(function (p, j) { return [0, p[0], p[1], CAREER_EXPLAIN[k][j]]; }));
            }
        });
        sentenceQueue = shuffle(own.concat(shuffle(earlier).slice(0, 2)));
        sentenceIdx = 0;
        sentenceMissed = [];
        showScreen('sentence');
        document.getElementById('sentence-levels').classList.add('hidden');
        document.getElementById('sentence-game').classList.remove('hidden');
        var note = document.getElementById('career-note');
        note.textContent = CAREER_NOTES[i].scene + ' ' + CAREER_NOTES[i].tip + tr(' טעות נפוצה: ') + CAREER_MISTAKES[i];
        note.classList.remove('hidden');
        showCareerDialogue(i);
        renderSentence();
    }

    // Sample conversation for the stage, shown in a collapsible block under the note
    function showCareerDialogue(i) {
        var box = document.getElementById('career-dialogue');
        var body = document.getElementById('career-dialogue-body');
        body.innerHTML = '';
        CAREER_DIALOGUES[i].forEach(function (line) {
            var p = document.createElement('p');
            var en = document.createElement('span');
            en.textContent = line[0] + ': ' + line[1];
            var he = document.createElement('span');
            he.className = 'career-dialogue-he';
            he.textContent = line[2];
            p.appendChild(en);
            p.appendChild(he);
            body.appendChild(p);
        });
        box.classList.remove('hidden');
    }

    // The stage ends only when every sentence was answered right; missed ones are asked again first
    function finishCareerRound() {
        if (sentenceMissed.length) {
            sentenceQueue = sentenceMissed;
            sentenceMissed = [];
            sentenceIdx = 0;
            return renderSentence();
        }
        markCareerDone(careerStage);
        openCareerMap();
    }

    function initSentences() {
        var screen = document.getElementById('sentence-screen');
        screen.addEventListener('pointerdown', function (e) {
            var tile = e.target.closest('.tile');
            if (!tile) return;
            drag = { tile: tile, x: e.clientX, y: e.clientY, moved: false };
            tile.setPointerCapture(e.pointerId);
            tile.classList.add('dragging');
        });
        screen.addEventListener('pointermove', function (e) {
            if (!drag) return;
            var dx = e.clientX - drag.x, dy = e.clientY - drag.y;
            if (Math.abs(dx) + Math.abs(dy) > 6) drag.moved = true;
            drag.tile.style.transform = 'translate(' + dx + 'px, ' + dy + 'px)';
        });
        function endDrag(e) {
            if (!drag) return;
            var tile = drag.tile;
            tile.classList.remove('dragging');
            tile.style.transform = '';
            if (drag.moved) dropTile(tile, e.clientX, e.clientY);
            else document.getElementById(tile.parentNode.id === 'sentence-bank' ? 'sentence-answer' : 'sentence-bank').appendChild(tile);
            drag = null;
        }
        screen.addEventListener('pointerup', endDrag);
        screen.addEventListener('pointercancel', endDrag);
        document.getElementById('sentence-check').addEventListener('click', checkSentence);
        document.getElementById('sentence-reveal').addEventListener('click', function () {
            if (careerStage !== null) return hintSentence();
            revealSentence();
        });
        document.getElementById('sentence-choices').addEventListener('click', function (e) {
            var btn = e.target.closest('.choice-btn');
            if (!btn || btn.disabled) return;
            if (btn.textContent.toLowerCase() === sentenceBlank.word.toLowerCase()) {
                document.getElementById('sentence-feedback').textContent = tr('נכון!');
                document.getElementById('sentence-blank').textContent = sentenceQueue[sentenceIdx][2];
                finishSentence();
            } else {
                markMissed();
                wrongTries++;
                if (careerStage !== null && wrongTries >= 2) return revealSentence();
                btn.disabled = true;
                document.getElementById('sentence-feedback').textContent = tr('לא נכון, נסה שוב');
            }
        });
        document.getElementById('sentence-next').addEventListener('click', nextSentence);
        document.getElementById('sentence-end').addEventListener('click', function () {
            if (careerStage !== null) return openCareerMap();
            showScreen('menu');
        });
        // Exercise type only changes the setting; a level button starts the round
        var typeBtns = document.querySelectorAll('.type-btn');
        for (var k = 0; k < typeBtns.length; k++) {
            typeBtns[k].addEventListener('click', function () {
                sentenceType = this.dataset.type;
                for (var m = 0; m < typeBtns.length; m++) {
                    typeBtns[m].classList.toggle('primary-btn', typeBtns[m] === this);
                    typeBtns[m].classList.toggle('secondary-btn', typeBtns[m] !== this);
                }
            });
        }
        var levelBtns = document.querySelectorAll('.level-btn');
        for (var j = 0; j < levelBtns.length; j++) {
            levelBtns[j].addEventListener('click', function () {
                var lvl = this.dataset.level;
                startSentences(lvl === 'all' || lvl === 'srs' ? lvl : parseInt(lvl, 10));
            });
        }
    }

    function init() {
        loadState();
        initTheme();
        initFullscreen();
        document.body.dataset.screen = state.currentScreen;

        var navBtns = document.querySelectorAll('.nav-btn');
        for (var i = 0; i < navBtns.length; i++) {
            navBtns[i].addEventListener('click', function () {
                showScreen(this.dataset.screen);
            });
        }

        var levelCards = document.querySelectorAll('.level-card');
        for (var i = 0; i < levelCards.length; i++) {
            levelCards[i].addEventListener('click', function () {
                var lvl = this.dataset.level;
                if (lvl === 'sentences') return openSentenceMenu();
                if (lvl === 'career') return openCareerMap();
                if (lvl === 'categories') return openCategories();
                if (lvl === 'reading') return openReading();
                if (lvl === 'timed') return startTimed();
                startQuiz(lvl === 'fav' || lvl === 'test' || lvl === 'random10' ? lvl : parseInt(lvl, 10));
            });
        }

        var answerBtns = document.querySelectorAll('.answer-btn');
        for (var i = 0; i < answerBtns.length; i++) {
            answerBtns[i].addEventListener('click', function () {
                handleAnswer(this.dataset.answer);
            });
        }

        document.getElementById('next-btn').addEventListener('click', nextQuestion);

        var speakBtn = document.getElementById('speak-btn');
        if (!('speechSynthesis' in window)) speakBtn.classList.add('hidden');
        speakBtn.addEventListener('click', function () {
            if (state.currentWord) speak(state.currentWord.e);
        });

        document.getElementById('add-fav-btn').addEventListener('click', function () {
            if (!state.currentWord) return;
            var eng = state.currentWord.e;
            if (state.favorites.indexOf(eng) === -1) {
                state.favorites.push(eng);
                saveFavorites();
            }
            nextQuestion();
        });

        document.getElementById('end-game-btn').addEventListener('click', function () {
            stopTimed();
            if (state.sessionTotal > 0) {
                var pct = Math.round((state.sessionCorrect / state.sessionTotal) * 100);
                if (state.score > state.stats.bestScore) state.stats.bestScore = state.score;
                if (pct > state.stats.bestSessionPct) state.stats.bestSessionPct = pct;
                saveStats();
            }
            showScreen('menu');
        });

        document.getElementById('play-again-btn').addEventListener('click', function () {
            if (timedMode) return startTimed();
            startQuiz(state.level);
        });

        document.getElementById('review-mistakes-btn').addEventListener('click', function () {
            if (state.mistakes.length === 0) return;
            timedMode = false;
            state.sessionWords = shuffle(state.mistakes.slice());
            state.currentIndex = 0;
            state.sessionCorrect = 0;
            state.sessionTotal = 0;
            state.score = 0;
            state.mistakes = [];
                showScreen('quiz');
            showQuestion();
        });

        document.getElementById('back-to-menu-btn').addEventListener('click', function () {
            showScreen('menu');
        });

        document.getElementById('categories-back').addEventListener('click', function () { showScreen('menu'); });
        document.getElementById('vocab-back').addEventListener('click', showHomeTiles);

        var homeTiles = document.querySelectorAll('.home-tile');
        for (var ti = 0; ti < homeTiles.length; ti++) {
            homeTiles[ti].addEventListener('click', function () { openHomeTile(this.dataset.tile); });
        }

        document.getElementById('fav-search').addEventListener('input', renderFavorites);

        document.getElementById('favorites-list').addEventListener('click', function (e) {
            var speakBtn = e.target.closest('.fav-speak-btn');
            if (speakBtn) return speak(speakBtn.dataset.word);
            var btn = e.target.closest('.fav-remove-btn');
            if (!btn) return;
            var word = btn.dataset.word;
            toggleFavorite(word);
            renderFavorites();
        });

        document.getElementById('practice-favs-btn').addEventListener('click', function () {
            startQuiz('fav');
        });

        document.getElementById('fav-play-btn').addEventListener('click', function () {
            if (!this.disabled) startQuiz('fav');
        });

        document.getElementById('smart-play-btn').addEventListener('click', function () {
            startQuiz('smart');
        });

        document.getElementById('export-favs-btn').addEventListener('click', exportFavorites);

        document.getElementById('reset-stats-btn').addEventListener('click', function () {
            if (!confirm(tr('האם אתה בטוח שברצונך לאפס את כל הסטטיסטיקות?'))) return;
            state.stats = {
                totalAnswered: 0,
                totalCorrect: 0,
                bestStreak: 0,
                currentStreak: 0,
                bestScore: 0,
                bestSessionPct: 0,
                wordHistory: {},
                levelStats: { 1: { answered: 0, correct: 0 }, 2: { answered: 0, correct: 0 }, 3: { answered: 0, correct: 0 } }
            };
            saveStats();
            renderStats();
        });

        document.addEventListener('keydown', function (e) {
            if (state.currentScreen !== 'quiz') return;
            if (e.key === 'Enter' || e.key === ' ') {
                if (state.answered) {
                    e.preventDefault();
                    nextQuestion();
                }
            }
            if ((e.key === 's' || e.key === 'S' || e.key === 'ד') && state.currentWord) {
                speak(state.currentWord.e);
            }
            if (e.key >= '1' && e.key <= '4' && !state.answered) {
                var idx = parseInt(e.key, 10) - 1;
                var btn = document.querySelectorAll('.answer-btn')[idx];
                if (btn) handleAnswer(btn.dataset.answer);
            }
        });

        document.getElementById('write-hint-btn').addEventListener('click', showWriteHint);

        // Voices load late in some browsers; reading them once here makes them ready for the first speak()
        if ('speechSynthesis' in window) window.speechSynthesis.getVoices();
        initSentences();
        initReading();
        initTools();
        document.getElementById('sentence-speak').addEventListener('click', function () { speak(sentenceQueue[sentenceIdx][2]); });
        document.getElementById('example-speak').addEventListener('click', function () { speak(document.getElementById('feedback-example').textContent); });
        document.getElementById('reading-speak').addEventListener('click', function () { speak(currentReadingText); });
        updateMenuUI();
    }

    if (document.readyState === 'loading') {
        document.addEventListener('DOMContentLoaded', init);
    } else {
        init();
    }
})();
