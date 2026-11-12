/*
 * Interface language: Hebrew (default) or English.
 * Only the interface text is translated. Word meanings, lesson content and
 * career stories stay in Hebrew as they are written.
 *
 * The choice is saved in localStorage ('wq_lang') and applied when the page loads,
 * so the language toggle simply reloads the page.
 *
 * tr(he) returns the English text when English is on, otherwise the Hebrew text.
 * Static HTML is translated once, here, by translateDom().
 */
(function () {
    'use strict';

    // Exact Hebrew text -> English. Matching ignores the spaces around the text.
    var EN = {
        // Header, home and navigation
        'אוצר מילים': 'Vocabulary',
        'אוצר מילים באנגלית': 'English Vocabulary',
        'מצב בהיר': 'Light mode',
        'מצב כהה': 'Dark mode',
        'מסך מלא': 'Full screen',
        'סטטיסטיקה': 'Statistics',
        'סטטיסטיקות': 'Statistics',
        'שאלות נענו': 'Questions answered',
        'שאלות שנענו': 'Questions answered',
        'אחוז הצלחה': 'Success rate',
        'מילים נלמדו': 'Words learned',
        'מילים שנלמדו': 'Words learned',
        'שיאים': 'Records',
        'רצף שיא': 'Best streak',
        'שיא ניקוד': 'Best score',
        'שיא סבב': 'Best round',
        'שנה יעד': 'Change goal',
        'תזכורת ביום': 'Daily reminder',
        'ראשי': 'Home',
        'מועדפים': 'Favorites',
        'הכל': 'All',
        'A1-A2 · קל': 'A1-A2 · Easy',
        'B1-B2 · בינוני': 'B1-B2 · Medium',
        'C1-C2 · קשה': 'C1-C2 · Hard',
        'סלנג אמריקאי': 'American slang',
        'אנגלית עסקית': 'Business English',
        'קטעי קריאה': 'Reading passages',
        'הרכבת משפטים': 'Sentence building',
        'נגד הזמן': 'Against the clock',
        'בחן את רמתך': 'Test your level',
        'מבחן רמה מלא': 'Full level test',
        'חזרה מרווחת': 'Spaced review',
        'כתיבה פעילה': 'Active writing',
        'כרטיסיות': 'Flashcards',
        'הכתבה': 'Dictation',
        'דקדוק': 'Grammar',
        'תרגול חכם': 'Smart practice',
        'תרגול מועדפים': 'Practice favorites',
        '10 מילים רנדומליות': 'Random 10 words',
        '10 מילים אקראיות מכל הרמות': '10 random words from all levels',
        '30 מילים מכל הרמות, עם ציון בסוף': '30 words from all levels, with a score at the end',
        '60 שניות, מדליות על 10, 15 ו-20 תשובות נכונות': '60 seconds, medals at 10, 15 and 20 correct answers',
        '75 קטעים בכל רמה, לחיצה על מילה מציגה פירוש': '75 passages per level, tap a word to see its meaning',
        'משפטים מכל הרמות, גוררים את המילים למקום': 'Sentences from all levels, drag the words into place',
        '10 תחומים, 70 שלבים ברמה בינונית': '10 domains, 70 stages at medium level',
        '690 ביטויים': '690 phrases',
        'מילים בזמן הנכון לזיכרון': 'Words at the right time for memory',
        'כותבים את המילה באנגלית': 'Write the word in English',
        'הופכים ונזכרים': 'Flip the card and remember',
        'שומעים משפט וכותבים מה שנשמע': 'Listen to a sentence and write what you hear',
        'אוצר מילים, דקדוק וקריאה, ותוצאה A1 עד C2': 'Vocabulary, grammar and reading, with a result from A1 to C2',
        'הסבר, דוגמאות ותרגילים': 'Explanations, examples and exercises',
        'מילים חדשות + מילים שטעית בהן': 'New words + words you got wrong',
        'היום: 0 מתוך 20 תשובות': 'Today: 0 of 20 answers',
        'סיים משחק': 'End game',
        'חזרה לרמות': 'Back to levels',
        'חזרה לרשימה': 'Back to list',
        'חזרה לנושאים': 'Back to topics',
        'חזרה לראשי': 'Back to home',

        // Quiz and shared buttons
        'שאלה 1': 'Question 1',
        'השמע': 'Play',
        'השמע (S)': 'Play (S)',
        'השמע את המילה': 'Play the word',
        'השמע משפט': 'Play sentence',
        'השמע קטע': 'Play passage',
        'השמע לאט': 'Play slowly',
        'בדוק': 'Check',
        'רמז': 'Hint',
        'הבא': 'Next',
        'הבא ←': 'Next →',
        'הצג תשובה': 'Show answer',
        'לא ידעתי': "Didn't know",
        'ידעתי': 'Knew it',
        'לתוצאה': 'See result',
        'מבחן חוזר': 'Retake test',
        'התחל מבחן': 'Start test',
        'שניות': 'Seconds',
        'ניקוד': 'Score',
        'נכונות': 'Correct',
        'שגויות': 'Wrong',
        'רצף': 'Streak',
        'הוסף למועדפים': 'Add to favorites',
        '☆ הוסף למועדפים': '☆ Add to favorites',
        'במועדפים': 'In favorites',
        'הסר': 'Remove',
        'נכון!': 'Correct!',
        'לא נכון, נסה שוב': 'Not quite, try again',
        'לא נכון.': 'Not correct.',
        'לא מדויק, נסה שוב': 'Not exact, try again',
        'לא מדויק. השמיעו שוב ונסו שוב.': 'Not exact. Listen again and try again.',
        'המשפט הנכון:': 'The correct sentence:',
        'לחצו על "השמע" כדי לשמוע את המשפט.': 'Press "Play" to hear the sentence.',
        'כתבו את המילה באנגלית': 'Type the word in English',
        'כתבו את המשפט כפי ששמעתם': 'Type the sentence as you heard it',
        'התשובה שלך': 'Your answer',
        'התשובה שלכם': 'Your answer',
        'מילים לבחירה': 'Words to choose from',
        'סוג תרגיל': 'Exercise type',
        'בחר רמה': 'Choose a level',
        'מגוון תרגילים': 'Mixed exercises',
        'סידור מילים': 'Word order',
        'השלמת חסר': 'Fill in the blank',
        'מעורבב': 'Mixed',
        'לחזרה היום': 'For review today',
        'דיאלוג לדוגמה': 'Sample dialogue',
        'סיום סבב!': 'Round complete!',
        'שחק שוב': 'Play again',
        'חזור על הטעויות': 'Review mistakes',
        'תפריט ראשי': 'Main menu',
        'המילים שטעיתם': 'Words you got wrong',
        'אין כרגע מילים לחזרה. נסו שוב מאוחר יותר.': 'No words to review right now. Try again later.',
        'אין כרגע משפטים לחזרה.': 'No sentences to review right now.',
        'אין כרטיסיות לתרגול עכשיו.': 'No flashcards to practise right now.',
        'לא נמצא ברשימה': 'Not in the list',
        'אוצר מילים: מה הפירוש?': 'Vocabulary: what does it mean?',
        'דקדוק: בחרו את המילה הנכונה': 'Grammar: choose the correct word',
        'הרכבת משפטים: סדרו את המילים באנגלית': 'Sentence building: put the words in order',
        'טעות נפוצה:': 'Common mistake:',

        // Level test
        'המבחן כולל 40 שאלות: 10 של אוצר מילים, 10 של דקדוק, 10 של השלמת משפטים ו-10 של קריאה על שני קטעים (בינוני וקשה). הוא לוקח כ-20 דקות ומסיים בקביעת הרמה שלכם, מ-B1 ועד C2, עם הנחיות להמשך.': 'The test has 40 questions: 10 vocabulary, 10 grammar, 10 sentence completion and 10 reading questions on two passages (medium and hard). It takes about 20 minutes and ends with your level, from B1 to C2, with next steps.',
        'מאגר של 350 שאלות. כל מבחן מוגרל מחדש.': 'A pool of 350 questions. Every test is drawn again.',
        'הגרל מבחן חדש': 'Draw a new test',
        'הוגרלו 40 שאלות חדשות מתוך 350.': 'A new set of 40 questions was drawn from 350.',
        'רמה נמוכה: צריך להשתפר': 'Low level: you need to improve',
        'הרמה נמוכה מ-B1, ולכן צריך להשתפר. כדאי להתחיל מתרגול הבסיס: אוצר מילים יומיומי, זמנים ומשפטים פשוטים. אחרי כמה שבועות אפשר לעשות מבחן חדש.': 'Your level is below B1, so you need to improve. Start with basic practice: everyday vocabulary, tenses and simple sentences. After a few weeks you can take a new test.',
        'מבינים נושאים מוכרים מהעבודה והלימודים, ומתמודדים עם רוב המצבים בנסיעה ובשפה.': 'You understand familiar topics from work and study, and handle most situations while travelling.',
        'מבינים טקסטים מורכבים ונושאים מופשטים, ומדברים בשטף סביר.': 'You understand complex texts and abstract topics, and speak with reasonable fluency.',
        'מבינים טקסטים ארוכים ומורכבים, ומשתמשים בשפה גמישה ומדויקת.': 'You understand long and complex texts, and use the language flexibly and accurately.',
        'שליטה כמעט מלאה. מבינים כמעט כל טקסט, ומבטאים ניואנסים עדינים.': 'Almost full command. You understand almost any text, and express subtle nuances.',
        'הנחיות להמשך': 'Next steps',
        'השלמת משפטים': 'Sentence completion',
        'השלמת משפטים: בחרו את המילה הנכונה': 'Sentence completion: choose the correct word',
        'קריאה': 'Reading',
        'כדאי לחזור על אוצר המילים: תרגול לפי רמות.': 'Review vocabulary: practise by level.',        'כדאי לתרגל דקדוק: זמנים, תנאים ומבנים. ראו במסך הדקדוק.': 'Practise grammar: tenses, conditionals and structures. See the Grammar screen.',
        'כדאי לתרגל השלמת משפטים: מילות קישור וצירופים קבועים. ראו במסך בניית משפטים.': 'Practise sentence completion: linking words and fixed phrases. See the Sentence building screen.',
        'כדאי לקרוא קטעים קצרים ולעבור על המילים החדשות. ראו במסך הקריאה.': 'Read short passages and review the new words. See the Reading screen.',
        'כדאי לתרגל כ-15 דקות ביום ב"תרגול חכם".': 'Practise about 15 minutes a day in "Smart practice".',
        'לא הגעתם ליעד הראשון': 'You did not reach the first goal',
        'מדליית ארד': 'Bronze medal',
        'מדליית כסף': 'Silver medal',
        'מדליית זהב': 'Gold medal',
        'כל היעדים הושגו!': 'All goals reached!',
        'מצוין, הרמה שלכם בתרגיל הזה גבוהה': 'Excellent, your level in this exercise is high',
        'טוב מאוד, אתם שולטים ברוב המילים': 'Very good, you know most of the words',
        'סביר, כדאי לחזור על המילים הקשות': 'Fair, it is worth reviewing the hard words',
        'צריך עוד תרגול במילים האלה': 'These words need more practice',
        'כל הכבוד! הגעתם ליעד של היום': "Well done! You reached today's goal",
        'הדפדפן הזה לא תומך בתזכורות.': 'This browser does not support reminders.',
        'כדי לקבל תזכורות צריך לאשר התראות בדפדפן.': 'To get reminders, allow notifications in the browser.',
        'התזכורת תופיע רק כשהאתר פתוח בדפדפן.': 'The reminder appears only while the site is open in the browser.',
        'האם אתה בטוח שברצונך לאפס את כל הסטטיסטיקות?': 'Are you sure you want to reset all statistics?',
        'הקובץ לא תקין.': 'The file is not valid.',

        // Statistics and sync
        'תשובות בשבוע האחרון': 'Answers this week',
        'לפי רמת קושי': 'By difficulty level',
        'העברת התקדמות בין מכשירים': 'Move progress between devices',
        'ייצוא יוצר קובץ עם כל ההתקדמות. בייבוא במכשיר השני בוחרים את הקובץ הזה.': 'Export creates a file with all your progress. On the other device, choose this file when importing.',
        'ייצוא קובץ התקדמות': 'Export progress file',
        'ייבוא קובץ התקדמות': 'Import progress file',
        'אפס סטטיסטיקות': 'Reset statistics',
        'ייצוא': 'Export',
        'חפש מילה...': 'Search word...',
        'מילים מועדפות': 'Favorite words',
        'עדיין לא הוספת מילים מועדפות.': 'You have not added any favorite words yet.',
        'במהלך המשחק, לחץ על הכוכב כדי לשמור מילים.': 'During a game, tap the star to save words.',

        // Reading translation box
        'סגור': 'Close',

        // Level names on the home progress card
        "מתחיל א'": 'Beginner A',
        "מתחיל ב'": 'Beginner B',
        'בינוני א\'': 'Intermediate A',
        'בינוני ב\'': 'Intermediate B',
        "מתקדם א'": 'Advanced A',
        "מתקדם ב'": 'Advanced B',

        // Home screen groups
        'תרגול לפי רמה': 'Practice by level',
        'משחקים ובחנים': 'Games and tests',
        'תרגול אוצר מילים': 'Vocabulary practice',
        'רמות, קטגוריות, מועדפים וכלים': 'Levels, categories, favorites and tools',
        'כלי תרגול': 'Practice tools',

        // Practice by category
        'לפי קטגוריות': 'By category',
        'שמונה עשרה קטגוריות, מאות מילים': 'Eighteen categories, hundreds of words',
        'מיילים ופגישות': 'Emails and meetings',
        'שירות לקוחות': 'Customer service',
        'כסף ובנקאות': 'Money and banking',
        'אוכל ומסעדות': 'Food and restaurants',
        'בית ומשפחה': 'Home and family',
        'תחבורה ונהיגה': 'Transport and driving',
        'ספורט וכושר': 'Sports and fitness',
        'רגשות ואופי': 'Feelings and personality',
        'לימודים': 'Study',
        'טבע וסביבה': 'Nature and environment',
        'בחר קטגוריה': 'Choose a category',
        'תחביבים': 'Hobbies',
        'קניות': 'Shopping',
        'מזג אוויר': 'Weather',
        'טיולים': 'Travel',
        'עבודה': 'Work',
        'בידור': 'Entertainment',
        'בריאות': 'Health',
        'טכנולוגיה': 'Technology',
        'בינוני': 'Medium',
        'קשה': 'Hard',

        // Career path
        '· הושלם': '· completed',
        '· נעול': '· locked'
    };

    // Dynamic strings: the whole text is matched, and the numbers and parts are kept.
    // The replacement gets the match, so it can translate its own parts with tr().
    var PATTERNS = [
        [/^([\d,]+) מילים$/, function (m) { return m[1] + ' words'; }],
        [/^([\d,]+) ביטויים$/, function (m) { return m[1] + ' phrases'; }],
        [/^(\d+) \/ (\d+) נלמדו$/, function (m) { return m[1] + ' / ' + m[2] + ' learned'; }],
        [/^(\d+) נלמדו$/, function (m) { return m[1] + ' learned'; }],
        [/^(\d+) \/ (\d+) מילים נלמדו$/, function (m) { return m[1] + ' / ' + m[2] + ' words learned'; }],
        [/^רמה נוכחית: (.+)$/, function (m) { return 'Current level: ' + tr(m[1]); }],
        [/^(.+): (\d+) מתוך (\d+)$/, function (m) { return tr(m[1]) + ': ' + m[2] + ' out of ' + m[3]; }],
        [/^שאלה (\d+) מתוך (\d+)$/, function (m) { return 'Question ' + m[1] + ' of ' + m[2]; }],
        [/^שאלה (\d+)$/, function (m) { return 'Question ' + m[1]; }],
        [/^משפט (\d+) מתוך (\d+)$/, function (m) { return 'Sentence ' + m[1] + ' of ' + m[2]; }],
        [/^כרטיס (\d+) מתוך (\d+) · לחצו על הכרטיס כדי לראות את התרגום$/, function (m) { return 'Card ' + m[1] + ' of ' + m[2] + ' · Tap the card to see the translation'; }],
        [/^היום: (\d+) מתוך (\d+) תשובות$/, function (m) { return 'Today: ' + m[1] + ' of ' + m[2] + ' answers'; }],
        [/^ענית נכון על (\d+) מתוך (\d+)\.$/, function (m) { return 'You answered ' + m[1] + ' of ' + m[2] + ' correctly.'; }],
        [/^(\d+) תשובות נכונות ב-(\d+) שניות$/, function (m) { return m[1] + ' correct answers in ' + m[2] + ' seconds'; }],
        [/^(\d+) מתוך (\d+) תשובות נכונות$/, function (m) { return m[1] + ' of ' + m[2] + ' correct answers'; }],
        [/^ניקוד: (\d+)$/, function (m) { return 'Score: ' + m[1]; }],
        [/^רצף נוכחי: (\d+)$/, function (m) { return 'Current streak: ' + m[1]; }],
        [/^שיא נגד הזמן: (\d+)$/, function (m) { return 'Best against the clock: ' + m[1]; }],
        [/^התשובה הנכונה: (.+)$/, function (m) { return 'The correct answer: ' + m[1]; }],
        [/^רמז: (.+)$/, function (m) { return 'Hint: ' + m[1]; }],
        [/^הערה: (.+)$/, function (m) { return 'Note: ' + m[1]; }],
        [/^שימו לב: (.+)$/, function (m) { return 'Note: ' + m[1]; }],
        [/^קריאה: (.+)$/, function (m) { return 'Reading: ' + m[1]; }],
        [/^תוצאה אחרונה: (.+) \((.+)\)$/, function (m) { return 'Last result: ' + m[1] + ' (' + m[2] + ')'; }],
        [/^הרמה שלך: (.+)$/, function (m) { return 'Your level: ' + m[1]; }],
        [/^מומלץ להתחיל בתרגול ברמות (.+)\.$/, function (m) { return 'We recommend starting practice at levels ' + m[1] + '.'; }],
        [/^סך הכל: (\d+) מתוך (\d+)\. (.+)$/, function (m) {
            // Each part is "section score", e.g. "אוצר מילים 7/10": translate the name and keep the score
            var parts = m[3].split(', ').map(function (p) { var i = p.lastIndexOf(' '); return tr(p.slice(0, i)) + p.slice(i); });
            return 'Total: ' + m[1] + ' of ' + m[2] + '. ' + parts.join(', ');
        }],
        [/^התקדמות כללית: (\d+) מתוך (\d+) שלבים \((\d+)%\)$/, function (m) { return 'Overall progress: ' + m[1] + ' of ' + m[2] + ' stages (' + m[3] + '%)'; }],
        [/^עדיין לא הגעת ליעד של היום \((\d+) מתוך (\d+)\)$/, function (m) { return "You have not reached today's goal yet (" + m[1] + ' of ' + m[2] + ')'; }]
    ];

    var english = false;
    try { english = localStorage.getItem('wq_lang') === 'en'; } catch (e) { /* storage blocked: Hebrew */ }

    // Returns the English text when English is on, otherwise the Hebrew text unchanged.
    function tr(he) {
        if (!english) return he;
        var core = he.trim();
        var lead = he.match(/^\s*/)[0];
        var trail = he.match(/\s*$/)[0];
        if (Object.prototype.hasOwnProperty.call(EN, core)) return lead + EN[core] + trail;
        for (var i = 0; i < PATTERNS.length; i++) {
            var m = core.match(PATTERNS[i][0]);
            if (m) return lead + PATTERNS[i][1](m) + trail;
        }
        return he;
    }

    // Translates the text and the title, aria-label and placeholder attributes of the static HTML.
    function translateDom() {
        var walker = document.createTreeWalker(document.documentElement, NodeFilter.SHOW_TEXT);
        var nodes = [];
        while (walker.nextNode()) nodes.push(walker.currentNode);
        nodes.forEach(function (node) {
            var tag = node.parentNode && node.parentNode.tagName;
            if (tag === 'SCRIPT' || tag === 'STYLE') return;
            node.nodeValue = tr(node.nodeValue);
        });
        document.querySelectorAll('[title],[aria-label],[placeholder]').forEach(function (el) {
            ['title', 'aria-label', 'placeholder'].forEach(function (name) {
                if (el.hasAttribute(name)) el.setAttribute(name, tr(el.getAttribute(name)));
            });
        });
    }

    document.documentElement.lang = english ? 'en' : 'he';
    document.documentElement.dir = english ? 'ltr' : 'rtl';
    if (english) translateDom();

    // The toggle saves the other language and reloads, so every screen is drawn again in it.
    var langBtn = document.getElementById('lang-btn');
    if (langBtn) {
        langBtn.textContent = english ? 'עברית' : 'English';
        langBtn.addEventListener('click', function () {
            try { localStorage.setItem('wq_lang', english ? 'he' : 'en'); } catch (e) { return; }
            location.reload();
        });
    }

    window.tr = tr;
})();
