// Grammar topics for the grammar screen. Each topic has:
//   title, explain (Hebrew), pattern, tip (a common mistake Hebrew speakers make),
//   examples: [English, Hebrew] pairs (at least 4), exercises: { q (sentence with ____), options (4), answer (index) } (at least 10).
const GRAMMAR_TOPICS = [
  {
    title: 'Present Simple (הווה פשוט)',
    explain: 'משתמשים בו להרגלים, עובדות ודברים שקורים שוב ושוב ("כל יום", "בדרך כלל", "אף פעם"). בשאלות ובשלילות משתמשים ב-do/does, ואחרי does הפועל נשאר בצורה הבסיסית.',
    pattern: 'I/you/we/they + פועל    |    he/she/it + פועל + s    |    does not (doesn\'t) + פועל',
    tip: 'בגוף שלישי יחיד (he, she, it) חובה s על הפועל: "She works", לא "She work". ואחרי "doesn\'t" אין s: "He doesn\'t like", לא "doesn\'t likes".',
    examples: [
      ['I drink coffee every morning.', 'אני שותה קפה כל בוקר.'],
      ['She works in a hospital.', 'היא עובדת בבית חולים.'],
      ['The shop opens at nine.', 'החנות נפתחת בתשע.'],
      ['Does your brother play the guitar?', 'האם אחיך מנגן בגיטרה?'],
      ['They don\'t watch TV on weekdays.', 'הם לא צופים בטלוויזיה בימי חול.']
    ],
    exercises: [
      { q: 'My brother ____ to school by bus.', options: ['go', 'goes', 'going', 'gone'], answer: 1 },
      { q: 'We ____ English on Mondays.', options: ['studies', 'study', 'studying', 'studied'], answer: 1 },
      { q: 'The train ____ at eight every day.', options: ['leave', 'leaves', 'left', 'leaving'], answer: 1 },
      { q: 'She ____ coffee in the morning.', options: ['doesn\'t drink', 'don\'t drink', 'isn\'t drink', 'not drinks'], answer: 0 },
      { q: '____ your sister live near the park?', options: ['Do', 'Does', 'Is', 'Has'], answer: 1 },
      { q: 'They ____ at seven o\'clock.', options: ['wakes up', 'wake up', 'woke up', 'waking up'], answer: 1 },
      { q: 'He ____ his homework after dinner.', options: ['do', 'does', 'doing', 'is do'], answer: 1 },
      { q: 'I ____ like spicy food.', options: ['doesn\'t', 'isn\'t', 'don\'t', 'aren\'t'], answer: 2 },
      { q: 'The shop ____ on Sundays.', options: ['closes', 'close', 'closing', 'is close'], answer: 0 },
      { q: 'We ____ to the gym every Saturday.', options: ['goes', 'going', 'go', 'are go'], answer: 2 },
      { q: 'My mother ____ very well.', options: ['cook', 'cooks', 'is cook', 'cooking'], answer: 1 }
    ]
  },
  {
    title: 'Present Continuous (הווה מתמשך)',
    explain: 'משתמשים בו לפעולה שקורית עכשיו, ברגע הדיבור, או לתקופה נוכחית ("השבוע", "בימים אלה"). בונים עם am/is/are + פועל בצורת ing. גם לתוכנית קרובה בעתיד משתמשים בו.',
    pattern: 'am/is/are + פועל + ing    |    לשלילה: am/is/are not + ing',
    tip: 'לא כל פועל מקבל ing במשמעות הזו. פעלים של חושים ודעה (like, know, want, understand) בדרך כלל לא נאמרים בהווה מתמשך: "I know", לא "I am knowing".',
    examples: [
      ['I am reading a book right now.', 'אני קורא ספר עכשיו.'],
      ['They are building a new road.', 'הם בונים כביש חדש.'],
      ['She is studying for her exam this week.', 'היא לומדת למבחן השבוע.'],
      ['Are you coming to the party tonight?', 'אתה בא למסיבה הערב?'],
      ['We are not waiting for the bus; we are walking.', 'אנחנו לא מחכים לאוטובוס; אנחנו הולכים ברגל.']
    ],
    exercises: [
      { q: 'Listen! The baby ____.', options: ['cries', 'is crying', 'cry', 'cried'], answer: 1 },
      { q: 'What ____ you ____ at the moment?', options: ['do / do', 'are / doing', 'is / doing', 'did / do'], answer: 1 },
      { q: 'We ____ dinner now.', options: ['cook', 'are cooking', 'cooked', 'cooks'], answer: 1 },
      { q: 'She ____ to her friend right now.', options: ['talks', 'is talking', 'talking', 'talked'], answer: 1 },
      { q: 'They ____ not ____ the film. They are bored.', options: ['are / watching', 'are / watch', 'do / watching', 'is / watching'], answer: 0 },
      { q: 'Look! It ____ outside.', options: ['snows', 'is snowing', 'snowing', 'snowed'], answer: 1 },
      { q: '____ he ____ a new job this month?', options: ['Does / looking for', 'Is / looking for', 'Is / look for', 'Does / look'], answer: 1 },
      { q: 'My father ____ in the garden at the moment.', options: ['works', 'is working', 'work', 'worked'], answer: 1 },
      { q: 'I ____ a new language this year.', options: ['am learning', 'learn', 'learned', 'learning'], answer: 0 },
      { q: 'You ____ very fast. Please slow down.', options: ['drives', 'are driving', 'drive', 'drove'], answer: 1 },
      { q: 'The kids ____ with the ball in the park.', options: ['play', 'are playing', 'plays', 'played'], answer: 1 }
    ]
  },
  {
    title: 'Past Simple (עבר פשוט)',
    explain: 'משתמשים בו לפעולה שהסתיימה בזמן מסוים בעבר ("אתמול", "בשנה שעברה", "ב-2010"). לפעלים רגילים מוסיפים ed. לפעלים לא רגילים יש צורה מיוחדת שצריך לשנן (go - went, see - saw, have - had). בשאלות ובשלילות משתמשים ב-did, והפועל נשאר בצורה הבסיסית.',
    pattern: 'פועל + ed (רגיל)    |    did not (didn\'t) + פועל בסיסי    |    Did + נושא + פועל בסיסי?',
    tip: 'אחרי "did" או "didn\'t" הפועל תמיד בצורה הבסיסית: "Did you go?" ו-"I didn\'t go", לא "did you went". וגם לא מוסיפים ed לפועל אחרי did.',
    examples: [
      ['We visited our grandparents last week.', 'ביקרנו את הסבים שלנו בשבוע שעבר.'],
      ['I saw a great film yesterday.', 'ראיתי סרט מצוין אתמול.'],
      ['She did not answer the phone.', 'היא לא ענתה לטלפון.'],
      ['Did you finish the report on time?', 'סיימת את הדוח בזמן?'],
      ['They moved to Haifa in 2015.', 'הם עברו לחיפה ב-2015.']
    ],
    exercises: [
      { q: 'Yesterday I ____ to the market.', options: ['go', 'goes', 'went', 'going'], answer: 2 },
      { q: 'They ____ the window last night.', options: ['close', 'closed', 'closing', 'closes'], answer: 1 },
      { q: 'She ____ not ____ the test.', options: ['did / passed', 'does / pass', 'was / passed', 'did / pass'], answer: 3 },
      { q: '____ you ____ the email yesterday?', options: ['Did / see', 'Did / saw', 'Do / saw', 'Were / see'], answer: 0 },
      { q: 'We ____ a great time at the party.', options: ['have', 'had', 'has', 'having'], answer: 1 },
      { q: 'He ____ his keys at the office last week.', options: ['lost', 'loses', 'losed', 'lose'], answer: 0 },
      { q: 'I ____ the news on the radio this morning.', options: ['hear', 'hears', 'heard', 'hearing'], answer: 2 },
      { q: 'The meeting ____ at ten, but it started at eleven.', options: ['was supposed to start', 'supposed to start', 'is supposed to start', 'did supposed'], answer: 0 },
      { q: 'We ____ to London when I was a child.', options: ['travel', 'traveled', 'travels', 'traveling is'], answer: 1 },
      { q: 'She ____ her homework before dinner.', options: ['finish', 'finishes', 'finished', 'finishing'], answer: 2 },
      { q: 'My grandfather ____ in this house for forty years.', options: ['lived', 'live', 'lives', 'living'], answer: 0 }
    ]
  },
  {
    title: 'Present Perfect (הווה מושלם)',
    explain: 'משתמשים בו כשהפעולה משפיעה על ההווה, או כשהזמן לא חשוב ("קרה בעבר, והתוצאה עכשיו"). בונים עם have/has + V3 (הצורה השלישית). המילים just, already, yet, ever, never, for ו-since עוזרות לזהות אותו. שימו לב: כשיש זמן מוגדר בעבר ("yesterday", "in 2015") משתמשים בעבר פשוט, לא בהווה מושלם.',
    pattern: 'have/has + V3    |    לשלילה: have/has not (haven\'t/hasn\'t) + V3    |    Have/Has + נושא + V3?',
    tip: 'לא אומרים "I have seen him yesterday". עם "yesterday" משתמשים בעבר פשוט: "I saw him yesterday". הווה מושלם מתאים רק כשאין זמן מוגדר בעבר.',
    examples: [
      ['I have lived here for ten years.', 'אני גר כאן עשר שנים.'],
      ['Have you ever been to Paris?', 'האם היית פעם בפריז?'],
      ['She has just finished her homework.', 'היא בדיוק סיימה את שיעורי הבית.'],
      ['We haven\'t received the payment yet.', 'עוד לא קיבלנו את התשלום.'],
      ['He has worked at the bank since 2018.', 'הוא עובד בבנק מאז 2018.']
    ],
    exercises: [
      { q: 'I ____ never ____ sushi.', options: ['have / eat', 'have / eaten', 'did / eat', 'am / eating'], answer: 1 },
      { q: 'He ____ in London since 2015.', options: ['lives', 'lived', 'has lived', 'is living'], answer: 2 },
      { q: 'We ____ our tickets yet.', options: ['didn\'t buy', 'haven\'t bought', 'don\'t buy', 'aren\'t buying'], answer: 1 },
      { q: 'She ____ already ____ the report.', options: ['has / sent', 'did / send', 'has / send', 'have / sent'], answer: 0 },
      { q: '____ you ____ the new museum?', options: ['Did / see', 'Have / seen', 'Have / see', 'Did / seen'], answer: 1 },
      { q: 'I ____ a cold since Monday.', options: ['have had', 'had', 'has had', 'am having'], answer: 0 },
      { q: 'They ____ the house last year.', options: ['have bought', 'bought', 'buy', 'have buy'], answer: 1 },
      { q: 'My sister ____ three books this month.', options: ['read', 'has read', 'reads', 'did read'], answer: 1 },
      { q: 'We ____ each other for five years.', options: ['know', 'knew', 'have known', 'have know'], answer: 2 },
      { q: 'I ____ my keys. Can you help me look for them?', options: ['lost', 'have lost', 'lose', 'am losing'], answer: 1 },
      { q: 'Your package ____ yet. We are still waiting.', options: ['didn\'t arrive', 'hasn\'t arrived', 'doesn\'t arrive', 'isn\'t arriving'], answer: 1 }
    ]
  },
  {
    title: 'Future: will ו-going to (עתיד)',
    explain: 'will משמש להחלטה שמתקבלת ברגע הדיבור, להבטחות, להצעות ולתחזיות כלליות ("I think", "probably"). going to משמש לתוכנית שכבר הוחלטה לפני הרגע הזה, או לתחזית שיש לה סימנים עכשיו (עננים שחורים = "It is going to rain").',
    pattern: 'will + פועל בסיסי    |    am/is/are going to + פועל בסיסי',
    tip: 'אחרי will ו-going to הפועל תמיד בצורה הבסיסית, בלי to ובלי s: "It will rain", לא "It will rains". ו-"going to" נשמע "gonna" בדיבור, אבל בכתב כותבים going to.',
    examples: [
      ['I will call you tomorrow.', 'אתקשר אליך מחר.'],
      ['We are going to visit Rome in May.', 'אנחנו מתכננים לבקר ברומא במאי.'],
      ['Look at those clouds. It is going to rain.', 'תסתכל על העננים. הולך לרדת גשם.'],
      ['I think she will like the gift.', 'אני חושב שהיא תאהב את המתנה.'],
      ['Will you help me with these boxes, please?', 'תעזור לי עם הקופסאות האלה, בבקשה?']
    ],
    exercises: [
      { q: 'Oh, the phone is ringing. I ____ answer it.', options: ['am going to', 'will', 'going', 'am'], answer: 1 },
      { q: 'We ____ buy a new car next month. We have already decided.', options: ['will', 'are going to', 'went', 'are'], answer: 1 },
      { q: 'I think it ____ snow tonight.', options: ['will', 'is', 'went', 'has'], answer: 0 },
      { q: 'Look at the sky! It ____ storm.', options: ['will', 'is going to', 'went', 'has'], answer: 1 },
      { q: 'They ____ not ____ the meeting. They are too busy.', options: ['will / attend', 'will / attends', 'are / attend', 'will / to attend'], answer: 0 },
      { q: '____ you ____ me with my homework?', options: ['Will / help', 'Are / going help', 'Do / help', 'Will / helps'], answer: 0 },
      { q: 'She ____ start her new job on Monday. It is already in her calendar.', options: ['will', 'is going to', 'went', 'has'], answer: 1 },
      { q: 'I ____ be late. I promise I will be on time.', options: ['not', 'won\'t', 'am not', 'going'], answer: 1 },
      { q: 'We ____ dinner at home tonight. Let\'s order a pizza!', options: ['will have', 'are going to have', 'have', 'had'], answer: 0 },
      { q: 'Maybe I ____ visit my grandparents this weekend.', options: ['will', 'am going', 'went', 'visit'], answer: 0 },
      { q: 'The baby ____ walk soon. Look at her legs!', options: ['will', 'is going to', 'walked', 'walks'], answer: 1 }
    ]
  },
  {
    title: 'First Conditional (תנאי מסוג 1)',
    explain: 'משתמשים בו לתנאי אפשרי וסביר בעתיד ("אם X יקרה, Y יקרה"). בחלק של "if" משתמשים בהווה, גם כשמדובר בעתיד, ובתוצאה משתמשים ב-will (או may, might, can, must).',
    pattern: 'If + הווה, will + פועל בסיסי    |    או: will + פועל בסיסי + if + הווה',
    tip: 'אחרי "if" אין will. לא אומרים "If it will rain, we will stay home". אומרים: "If it rains, we will stay home".',
    examples: [
      ['If it rains, we will stay at home.', 'אם ירד גשם, נישאר בבית.'],
      ['If you study hard, you will pass the exam.', 'אם תלמד קשה, תעבור את המבחן.'],
      ['She will be happy if you come.', 'היא תשמח אם תבוא.'],
      ['If the bus is late, I will take a taxi.', 'אם האוטובוס יאחר, אקח מונית.'],
      ['You can borrow my car if you need it.', 'אתה יכול לשאול את הרכב שלי אם אתה צריך.']
    ],
    exercises: [
      { q: 'If I ____ late, I will call you.', options: ['will be', 'am', 'was', 'would be'], answer: 1 },
      { q: 'If they ____ the bus, they will walk.', options: ['miss', 'will miss', 'missed', 'would miss'], answer: 0 },
      { q: 'We will be late if the traffic ____ bad.', options: ['will be', 'is', 'was', 'would be'], answer: 1 },
      { q: 'If you ____ hungry, there is some bread in the kitchen.', options: ['will be', 'are', 'were', 'would be'], answer: 1 },
      { q: 'I will help you if you ____ me.', options: ['will ask', 'ask', 'asked', 'would ask'], answer: 1 },
      { q: 'If she ____ the exam, her parents will be proud.', options: ['passes', 'will pass', 'passed', 'would pass'], answer: 0 },
      { q: 'We will go to the beach if it ____ sunny tomorrow.', options: ['is', 'will be', 'was', 'would be'], answer: 0 },
      { q: 'If he ____ his phone, he can call us from the office.', options: ['finds', 'will find', 'found', 'would find'], answer: 0 },
      { q: 'You ____ get a good job if you work hard.', options: ['will', 'would', 'did', 'have'], answer: 0 },
      { q: 'If it ____ cold tonight, wear a warm coat.', options: ['gets', 'will get', 'got', 'would get'], answer: 0 },
      { q: 'If the shop ____ open, we can buy milk.', options: ['is', 'will be', 'was', 'would be'], answer: 0 }
    ]
  },
  {
    title: 'Second Conditional (תנאי מסוג 2)',
    explain: 'משתמשים בו לתנאי לא אמיתי, לא סביר, או חלום בהווה או בעתיד. בחלק של "if" משתמשים בעבר פשוט, ובתוצאה משתמשים ב-would. עם I ו-he/she/it נכון להשתמש ב-were (If I were you) במיוחד בתנאי לא אמיתי.',
    pattern: 'If + עבר פשוט, would + פועל בסיסי',
    tip: 'הזמן בחלק של "if" הוא עבר, אבל המשמעות היא הווה או עתיד. לא אומרים "If I would have time, I would go". אומרים: "If I had time, I would go".',
    examples: [
      ['If I had more time, I would learn Spanish.', 'אם היה לי יותר זמן, הייתי לומד ספרדית.'],
      ['If I were you, I would take the job.', 'אם הייתי במקומך, הייתי לוקח את העבודה.'],
      ['She would travel more if she had money.', 'היא הייתה נוסעת יותר אם היה לה כסף.'],
      ['What would you do if you won the lottery?', 'מה היית עושה אם היית זוכה בלוטו?'],
      ['If he lived closer, he would come more often.', 'אם הוא היה גר קרוב יותר, הוא היה בא יותר.']
    ],
    exercises: [
      { q: 'If I ____ rich, I would buy a house.', options: ['am', 'was', 'will be', 'have been'], answer: 1 },
      { q: 'If he ____ harder, he would pass.', options: ['studies', 'studied', 'will study', 'has studied'], answer: 1 },
      { q: 'What would you do if you ____ a million dollars?', options: ['have', 'had', 'will have', 'has'], answer: 1 },
      { q: 'If I ____ you, I would apologize.', options: ['am', 'was', 'were', 'will be'], answer: 2 },
      { q: 'We ____ travel more if we had more free time.', options: ['will', 'would', 'did', 'have'], answer: 1 },
      { q: 'If they ____ a car, they could drive to the sea.', options: ['have', 'had', 'will have', 'would have'], answer: 1 },
      { q: 'She ____ happier if she changed her job.', options: ['is', 'will be', 'would be', 'was'], answer: 2 },
      { q: 'If it ____ warmer, we would swim in the lake.', options: ['is', 'was', 'were', 'will be'], answer: 1 },
      { q: 'I would call him if I ____ his number.', options: ['know', 'knew', 'will know', 'have known'], answer: 1 },
      { q: 'If you ____ a bigger kitchen, you could cook more.', options: ['have', 'had', 'will have', 'would have'], answer: 1 },
      { q: 'They would be surprised if we ____ on time.', options: ['arrive', 'arrived', 'will arrive', 'would arrive'], answer: 1 }
    ]
  },
  {
    title: 'Modal verbs: can, must, should (פעלי עזר מודאליים)',
    explain: 'פעלי עזר מודאליים מוסיפים משמעות לפעולה: can = יכולת או אפשרות, must = הכרח או חובה, should = המלצה או עצה, may/might = אפשרות. אחריהם בא פועל בצורה הבסיסית, בלי to ובלי s. לשלילה: cannot (can\'t), mustn\'t (איסור), shouldn\'t (לא כדאי).',
    pattern: 'can / must / should / may / might + פועל בסיסי',
    tip: 'אומרים "She can swim", לא "She cans swim" ולא "She can to swim". והמודאלי לא משתנה לפי הגוף: "He must go", לא "He musts go".',
    examples: [
      ['You can use my pen.', 'אתה יכול להשתמש בעט שלי.'],
      ['You must wear a seat belt in the car.', 'אתה חייב לחגור חגורת בטיחות ברכב.'],
      ['You should drink more water.', 'כדאי שתשתה יותר מים.'],
      ['It might rain later, so take an umbrella.', 'אולי ירד גשם אחר כך, אז קח מטרייה.'],
      ['You mustn\'t smoke in the building.', 'אסור לעשן בבניין.']
    ],
    exercises: [
      { q: 'She ____ speak three languages.', options: ['can', 'must to', 'cans', 'is can'], answer: 0 },
      { q: 'You ____ be quiet in the library.', options: ['should', 'shoulds', 'to should', 'musting'], answer: 0 },
      { q: 'We ____ pay the bill before we leave.', options: ['must', 'musts', 'can to', 'are must'], answer: 0 },
      { q: 'He ____ swim very well when he was young.', options: ['can', 'cans', 'can to', 'is can'], answer: 0 },
      { q: 'You ____ see a doctor. Your cough is getting worse.', options: ['should', 'shoulds', 'should to', 'are should'], answer: 0 },
      { q: 'Students ____ bring their ID cards to the exam.', options: ['must', 'musts', 'must to', 'are must'], answer: 0 },
      { q: 'I ____ not help you today. I am very busy.', options: ['can', 'cans', 'can to', 'am can'], answer: 0 },
      { q: 'You ____ park here. It is a private area.', options: ['mustn\'t', 'don\'t must', 'shouldn\'t to', 'can to'], answer: 0 },
      { q: 'It ____ be cold tonight. Bring a jacket just in case.', options: ['might', 'mights', 'might to', 'is might'], answer: 0 },
      { q: 'We ____ leave early because the traffic is heavy.', options: ['should', 'shoulds', 'should to', 'are should'], answer: 0 },
      { q: 'Children ____ not stay up too late on school nights.', options: ['should', 'shoulds', 'should to', 'are should'], answer: 0 }
    ]
  },
  {
    title: 'Articles: a, an, the (מאמרים)',
    explain: 'a משמש לפני שם עצם יחיד שלא מסוים, כשמזכירים אותו בפעם הראשונה. an משמש באותו תפקיד לפני צליל של תנועה. the משמש לדבר מסוים ש-שניהם מכירים, לדבר יחיד בעולם (the sun), או כשכבר הזכרנו אותו. לדברים כלליים ברבים או בלא ספיר לא משתמשים במאמר בכלל.',
    pattern: 'a + עיצור (a book)    |    an + תנועה (an apple)    |    the + מסוים (the book on the table)    |    Ø + כללי (I like music)',
    tip: 'הבחירה בין a ל-an נקבעת לפי הצליל, לא לפי האות: "a university" (יו בתחילה), "an hour" (h שקטה). ו-"the" לא מופיע לפני שם כללי כמו "Life is short", רק לפני דבר ידוע.',
    examples: [
      ['I bought a new bag and an umbrella.', 'קניתי תיק חדש ומטרייה.'],
      ['The sun rises in the east.', 'השמש זורחת במזרח.'],
      ['Can you pass me the salt, please?', 'אפשר להעביר לי את המלח, בבקשה?'],
      ['I love music. Music makes me happy.', 'אני אוהב מוזיקה. מוזיקה משמחת אותי.'],
      ['She is a teacher. The teacher at her school is very kind.', 'היא מורה. המורה בבית הספר שלה מאוד נחמדה.']
    ],
    exercises: [
      { q: 'She is ____ engineer.', options: ['a', 'an', 'the', '-'], answer: 1 },
      { q: '____ moon is bright tonight.', options: ['A', 'An', 'The', '-'], answer: 2 },
      { q: 'I need ____ umbrella.', options: ['a', 'an', 'the', 'these'], answer: 0 },
      { q: '____ honest people are rare.', options: ['A', 'An', 'The', '-'], answer: 3 },
      { q: 'He ate ____ apple for breakfast.', options: ['a', 'an', 'the', '-'], answer: 1 },
      { q: 'We stayed at ____ hotel near the station.', options: ['a', 'an', 'the', '-'], answer: 0 },
      { q: '____ dog in the garden belongs to our neighbor.', options: ['A', 'An', 'The', 'Some'], answer: 2 },
      { q: 'She plays ____ piano very well.', options: ['a', 'an', 'the', '-'], answer: 2 },
      { q: 'I would like ____ hour of your time.', options: ['a', 'an', 'the', 'one'], answer: 1 },
      { q: 'Water is essential for life. ____ water is important.', options: ['A', 'An', 'The', '-'], answer: 3 },
      { q: 'He is ____ university student in Tel Aviv.', options: ['a', 'an', 'the', '-'], answer: 0 }
    ]
  },
  {
    title: 'Prepositions of time: in, on, at (מילות יחס של זמן)',
    explain: 'in משמש לחודשים, לעונות, לשנים, לחלקי היום (in the morning) ולתקופות ארוכות. on משמש לימי השבוע, לתאריכים ולימים מסוימים (on Monday, on 5 May, on Christmas Day). at משמש לשעה מסוימת ולביטויים קבועים כמו at night, at noon.',
    pattern: 'in + חודש / שנה / חלק יום / עונה    |    on + יום / תאריך    |    at + שעה / at night / at noon',
    tip: 'אומרים "on Monday morning" (יום + חלק יום מקבלים on), אבל "in the morning" בלי יום. ו-"at night" לא "in the night" — הביטוי הנכון הוא at night.',
    examples: [
      ['We have a meeting in April.', 'יש לנו פגישה באפריל.'],
      ['The shop is closed on Sundays.', 'החנות סגורה בימי ראשון.'],
      ['The film starts at seven thirty.', 'הסרט מתחיל בשבע וחצי.'],
      ['I was born in the summer of 1990.', 'נולדתי בקיץ של 1990.'],
      ['We often meet on Friday evenings.', 'אנחנו נפגשים לעיתים קרובות בערבי שישי.'],
      ['She works at night and sleeps in the morning.', 'היא עובדת בלילה וישנה בבוקר.']
    ],
    exercises: [
      { q: 'I was born ____ 1990.', options: ['at', 'on', 'in', 'to'], answer: 2 },
      { q: 'See you ____ Friday.', options: ['in', 'on', 'at', 'for'], answer: 1 },
      { q: 'The class starts ____ nine o\'clock.', options: ['in', 'on', 'at', 'for'], answer: 2 },
      { q: 'We went to the beach ____ the summer.', options: ['in', 'on', 'at', 'for'], answer: 0 },
      { q: 'The bank is closed ____ Saturday.', options: ['in', 'on', 'at', 'for'], answer: 1 },
      { q: 'I usually feel tired ____ night.', options: ['in', 'on', 'at', 'for'], answer: 2 },
      { q: 'My birthday is ____ March.', options: ['in', 'on', 'at', 'for'], answer: 0 },
      { q: 'We have a test ____ Monday morning.', options: ['in', 'on', 'at', 'for'], answer: 1 },
      { q: 'The train leaves ____ 6:30 every day.', options: ['in', 'on', 'at', 'for'], answer: 2 },
      { q: 'She was in Paris ____ the weekend.', options: ['in', 'on', 'at', 'for'], answer: 1 },
      { q: 'Please call me ____ the afternoon.', options: ['in', 'on', 'at', 'for'], answer: 0 }
    ]
  }
];
