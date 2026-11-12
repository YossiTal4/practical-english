// More grammar topics, added after the first ten in grammar.js (same structure).
const GRAMMAR_MORE = [
  {
    title: 'Past Continuous (עבר מתמשך)',
    explain: 'משתמשים בו לפעולה שנמשכה בזמן מסוים בעבר, או לפעולה שנמשכה כשפעולה אחרת קטעה אותה. בונים עם was/were + ing. הפעולה הקצרה, שקטעה, באה בעבר פשוט.',
    pattern: 'was/were + פועל + ing    |    While + past continuous, past simple',
    tip: 'אומרים "I was watching TV when the phone rang" ולא "I watched TV when the phone was ringing". הפעולה הארוכה בעבר מתמשך, והפעולה שקטעה בעבר פשוט.',
    examples: [
      ['At 8 o\'clock last night, I was cooking dinner.', 'בשמונה בערב אתמול בישלתי ארוחת ערב.'],
      ['They were playing soccer when it started to rain.', 'הם שיחקו כדורגל כשהתחיל לרדת גשם.'],
      ['While she was studying, her brother was watching a film.', 'בזמן שהיא למדה, אחיה צפה בסרט.'],
      ['What were you doing at midnight?', 'מה עשית בחצות?'],
      ['We were not sleeping when you called.', 'לא ישנו כשהתקשרת.']
    ],
    exercises: [
      { q: 'I ____ a book when the lights went out.', options: ['read', 'was reading', 'reads', 'have read'], answer: 1 },
      { q: 'While we ____ dinner, the phone rang.', options: ['ate', 'were eating', 'eat', 'have eaten'], answer: 1 },
      { q: 'She ____ to the radio when I came in.', options: ['listened', 'was listening', 'listens', 'is listening'], answer: 1 },
      { q: 'What ____ you ____ at 9 p.m. yesterday?', options: ['did / do', 'were / doing', 'were / do', 'are / doing'], answer: 1 },
      { q: 'They ____ not ____ when the teacher entered.', options: ['were / talking', 'did / talk', 'are / talking', 'were / talk'], answer: 0 },
      { q: 'He ____ his bike when he fell off.', options: ['was riding', 'rode', 'rides', 'is riding'], answer: 0 },
      { q: 'It ____ heavily all afternoon.', options: ['rained', 'was raining', 'rains', 'has rained'], answer: 1 },
      { q: 'While the children ____, their parents cleaned the kitchen.', options: ['played', 'were playing', 'play', 'are playing'], answer: 1 },
      { q: 'I ____ a shower when the doorbell rang.', options: ['took', 'was taking', 'take', 'have taken'], answer: 1 },
      { q: 'We ____ to the museum when we saw our friend.', options: ['walked', 'were walking', 'walk', 'are walking'], answer: 1 },
      { q: 'Tom ____ his homework at seven, so he could not come out.', options: ['did', 'was doing', 'does', 'has done'], answer: 1 }
    ]
  },
  {
    title: 'Present Perfect Continuous (הווה מושלם מתמשך)',
    explain: 'משתמשים בו לפעולה שהתחילה בעבר ונמשכת עד עכשיו, או שהסתיימה זה עתה והשפיעה על ההווה ("I\'m tired, I have been running"). בונים עם have/has been + ing. עם for ו-since מציינים משך.',
    pattern: 'have/has been + פועל + ing    |    for (תקופה) / since (נקודת זמן)',
    tip: 'לפעולה שנמשכת עכשיו משתמשים ב-been + ing ("I have been waiting"). לפעולה שהסתיימה ומספרים כמה דברים קרו בה, משתמשים בהווה מושלם רגיל ("I have written three emails").',
    examples: [
      ['I have been studying English for two years.', 'אני לומד אנגלית כבר שנתיים.'],
      ['It has been raining since this morning.', 'ממש מהבוקר יורד גשם.'],
      ['She has been working here since 2019.', 'היא עובדת כאן מאז 2019.'],
      ['How long have you been waiting?', 'כמה זמן אתה מחכה?'],
      ['My feet hurt because I have been walking all day.', 'הרגליים כואבות לי כי הלכתי כל היום.']
    ],
    exercises: [
      { q: 'I ____ for you for an hour.', options: ['have been waiting', 'waited', 'am waiting', 'have waited'], answer: 0 },
      { q: 'She ____ English since she was a child.', options: ['studies', 'has been studying', 'studied', 'is studying'], answer: 1 },
      { q: 'How long ____ you ____ here?', options: ['did / work', 'have / been working', 'are / working', 'were / work'], answer: 1 },
      { q: 'They ____ building the house since March.', options: ['have been', 'are', 'were', 'did'], answer: 0 },
      { q: 'It ____ all week, so the roads are wet.', options: ['rains', 'rained', 'has been raining', 'is raining'], answer: 2 },
      { q: 'We ____ on this project for three months.', options: ['work', 'have been working', 'worked', 'are working'], answer: 1 },
      { q: 'He is out of breath because he ____ up the stairs.', options: ['has been running', 'ran', 'runs', 'was running'], answer: 0 },
      { q: 'My brother ____ video games since lunch.', options: ['plays', 'played', 'has been playing', 'is playing'], answer: 2 },
      { q: 'I ____ a lot of emails today, so my hands are tired.', options: ['have been typing', 'typed', 'type', 'am typing'], answer: 0 },
      { q: 'You ____ too much coffee lately. You should slow down.', options: ['drink', 'have been drinking', 'drank', 'are drinking'], answer: 1 },
      { q: 'The children ____ in the pool since two o\'clock.', options: ['swim', 'swam', 'have been swimming', 'are swimming'], answer: 2 }
    ]
  },
  {
    title: 'Past Perfect (עבר מושלם)',
    explain: 'משתמשים בו לפעולה שקרתה לפני פעולה אחרת בעבר. זה "העבר של העבר". בונים עם had + V3. בדרך כלל יש לפחות שתי פעולות בעבר, ומשתמשים בעבר מושלם בראשונה.',
    pattern: 'had + V3    |    שלילה: had not (hadn\'t) + V3    |    Had + נושא + V3?',
    tip: 'לא כותבים Past Perfect כשיש רק פעולה אחת בעבר. "I had seen him yesterday" נשמע לא נכון. כשיש שתי פעולות, משתמשים בעבר מושלם רק לראשונה: "When I arrived, the film had started".',
    examples: [
      ['When I arrived, the film had already started.', 'כשהגעתי, הסרט כבר התחיל.'],
      ['She had lived in Paris before she moved to Rome.', 'היא גרה בפריז לפני שעברה לרומא.'],
      ['We hadn\'t eaten anything, so we were very hungry.', 'לא אכלנו כלום, ולכן היינו רעבים מאוד.'],
      ['Had you ever met him before the party?', 'האם פגשת אותו פעם לפני המסיבה?'],
      ['The shop had closed by the time we got there.', 'החנות כבר נסגרה עד שהגענו.']
    ],
    exercises: [
      { q: 'When I got to the station, the train ____ already left.', options: ['has', 'had', 'was', 'did'], answer: 1 },
      { q: 'She didn\'t recognize him because he ____ his beard.', options: ['shaved', 'had shaved', 'has shaved', 'shaves'], answer: 1 },
      { q: 'By the time the police arrived, the thief ____.', options: ['escaped', 'had escaped', 'has escaped', 'escapes'], answer: 1 },
      { q: '____ you ____ that film before?', options: ['Did / see', 'Had / seen', 'Have / seen', 'Were / see'], answer: 1 },
      { q: 'We ____ lunch before the guests arrived.', options: ['had finished', 'finished', 'have finished', 'finish'], answer: 0 },
      { q: 'The students ____ the book before the exam, so they passed.', options: ['read', 'have read', 'had read', 'reads'], answer: 2 },
      { q: 'He ____ never ____ abroad until he moved to Canada.', options: ['had / been', 'has / been', 'did / go', 'was / been'], answer: 0 },
      { q: 'I felt better after I ____ some medicine.', options: ['took', 'had taken', 'have taken', 'take'], answer: 1 },
      { q: 'When she called, I ____ asleep.', options: ['fell', 'had fallen', 'have fallen', 'was falling'], answer: 1 },
      { q: 'The meeting ____ by the time I joined.', options: ['ended', 'had ended', 'has ended', 'ends'], answer: 1 },
      { q: 'They ____ the house before the price went up.', options: ['bought', 'had bought', 'have bought', 'buy'], answer: 1 }
    ]
  },
  {
    title: 'Comparatives and Superlatives (תארים בהשוואה)',
    explain: 'בהשוואה בין שניים משתמשים בתואר + er או more + תואר + than (bigger than, more interesting than). בהשוואה בין שלושה ומעלה משתמשים ב-the + תואר + est או the most + תואר (the biggest, the most interesting). תארים באורך של הברה אחת מקבלים er/est, ותארים ארוכים מקבלים more/most.',
    pattern: 'short: bigger / the biggest    |    long: more interesting / the most interesting    |    irregular: good - better - the best',
    tip: 'לא כותבים "more bigger" ולא "the most biggest". והשוואה מתבצעת עם than, לא with: "She is taller than me", לא "taller as me".',
    examples: [
      ['My house is bigger than yours.', 'הבית שלי גדול משלך.'],
      ['This book is more interesting than that one.', 'הספר הזה מעניין יותר מההוא.'],
      ['Everest is the highest mountain in the world.', 'האוורסט הוא ההר הגבוה ביותר בעולם.'],
      ['It is the most expensive restaurant in town.', 'זו המסעדה היקרה ביותר בעיר.'],
      ['My English is getting better every week.', 'האנגלית שלי משתפרת כל שבוע.']
    ],
    exercises: [
      { q: 'This test is ____ than the last one.', options: ['easy', 'easier', 'easiest', 'more easy'], answer: 1 },
      { q: 'She is the ____ student in the class.', options: ['tall', 'taller', 'tallest', 'most tall'], answer: 2 },
      { q: 'Tel Aviv is ____ than Jerusalem.', options: ['more expensive', 'expensiver', 'most expensive', 'expensive'], answer: 0 },
      { q: 'He drives ____ than his brother.', options: ['carefuller', 'more carefully', 'carefully', 'most carefully'], answer: 1 },
      { q: 'This is ____ day of my life!', options: ['good', 'better', 'the best', 'the most good'], answer: 2 },
      { q: 'The new phone is ____ the old one.', options: ['as fast', 'faster than', 'fastest than', 'more fast than'], answer: 1 },
      { q: 'Which is ____ city in Israel?', options: ['big', 'bigger', 'the biggest', 'the most big'], answer: 2 },
      { q: 'My sister is ____ me.', options: ['older than', 'elder than', 'oldest than', 'more old as'], answer: 0 },
      { q: 'It was ____ movie I have ever seen.', options: ['the worst', 'worse', 'the worse', 'more bad'], answer: 0 },
      { q: 'Your handwriting is ____ than mine.', options: ['neater', 'more neat', 'neatest', 'the neater'], answer: 0 },
      { q: 'Winter is ____ season of the year for me.', options: ['cold', 'colder', 'the coldest', 'most cold'], answer: 2 }
    ]
  },
  {
    title: 'Countable and uncountable nouns; much, many, a lot of (שמות ספיר ובלתי ספיר)',
    explain: 'שמות ספיר הם דברים שאפשר לספור (a book, two books). שמות בלתי ספירים הם דברים שאי אפשר לספור (water, money, advice). עם ספיר משתמשים ב-many (בשאלות ובשלילות) או ב-a lot of/lots of (בחיוביים). עם בלתי ספיר משתמשים ב-much. some ו-any משמשים לשניהם.',
    pattern: 'many + ספיר רבים    |    much + בלתי ספיר    |    a lot of / lots of + שניהם    |    some (חיובי) / any (שאלה ושלילה)',
    tip: 'אומרים "much information" ולא "many informations". "Information", "advice", "furniture", "luggage" ו-"news" הם בלתי ספירים, גם אם נראים כמו רבים.',
    examples: [
      ['How many brothers do you have?', 'כמה אחים יש לך?'],
      ['There isn\'t much time left.', 'נשאר לא הרבה זמן.'],
      ['We bought a lot of vegetables at the market.', 'קנינו הרבה ירקות בשוק.'],
      ['Can I have some water, please?', 'אפשר לקבל קצת מים, בבקשה?'],
      ['She gave me some good advice.', 'היא נתנה לי עצה טובה.']
    ],
    exercises: [
      { q: 'How ____ eggs do we need for the cake?', options: ['much', 'many', 'a lot', 'some'], answer: 1 },
      { q: 'I don\'t have ____ money today.', options: ['many', 'much', 'a few', 'any books'], answer: 1 },
      { q: 'There are ____ people at the party.', options: ['much', 'a little', 'a lot of', 'advice'], answer: 2 },
      { q: 'Can I ask you ____ questions?', options: ['much', 'a little', 'many', 'a information'], answer: 2 },
      { q: 'She gave me ____ useful information.', options: ['a', 'an', 'many', 'some'], answer: 3 },
      { q: 'Do you have ____ sugar?', options: ['some', 'any', 'many', 'a'], answer: 1 },
      { q: 'We need ____ furniture for the new apartment.', options: ['many', 'a few', 'some', 'a'], answer: 2 },
      { q: 'He ate ____ apples yesterday.', options: ['much', 'many', 'a lot', 'a little of'], answer: 1 },
      { q: 'There is ____ traffic on the roads this morning.', options: ['many', 'much', 'a few', 'lots'], answer: 1 },
      { q: 'I need ____ advice about my career.', options: ['many', 'a few', 'some', 'an advice'], answer: 2 },
      { q: 'Do you have ____ friends in this city?', options: ['much', 'any', 'a', 'some information'], answer: 1 }
    ]
  },
  {
    title: 'Used to and would (הרגלים בעבר)',
    explain: 'used to + פועל מתאר הרגל או מצב שהיו בעבר ואינם עוד. would + פועל משמש גם לתיאור הרגל בעבר, אבל רק להרגלים ולא למצבים ("I used to have a dog" נכון, "I would have a dog" לא). בשלילה ובשאלה: didn\'t use to / did you use to.',
    pattern: 'used to + פועל בסיסי    |    would + פועל בסיסי (הרגל בלבד)    |    didn\'t use to + פועל בסיסי',
    tip: 'בשאלה ובשלילה אומרים "Did you use to...?" ו-"I didn\'t use to...". לא אומרים "Did you used to". ו-"used to" מתאר משהו שכבר לא קורה, לכן אל תשתמשו בו לדבר על ההווה.',
    examples: [
      ['When I was a child, I used to play in the park every day.', 'כשהייתי ילד, שיחקתי בפארק כל יום.'],
      ['We used to live near the sea, but now we live in the city.', 'גרנו ליד הים, אבל עכשיו אנחנו גרים בעיר.'],
      ['My grandfather would tell us stories every evening.', 'סבא שלי היה מספר לנו סיפורים כל ערב.'],
      ['Did you use to like spicy food?', 'האם אהבת פעם אוכל חריף?'],
      ['I didn\'t use to exercise, but now I go to the gym.', 'לא הייתי מתאמן, אבל עכשיו אני הולך לחדר כושר.']
    ],
    exercises: [
      { q: 'I ____ smoke, but I stopped two years ago.', options: ['use to', 'used to', 'am used to', 'would used'], answer: 1 },
      { q: 'Did you ____ go swimming when you were young?', options: ['use to', 'used to', 'using to', 'usd to'], answer: 0 },
      { q: 'She ____ have long hair, but now it is short.', options: ['used to', 'uses to', 'is used to', 'use to'], answer: 0 },
      { q: 'We ____ visit our grandparents every Sunday.', options: ['used to', 'are used to', 'use to', 'using to'], answer: 0 },
      { q: 'I ____ live in Jerusalem, but I moved to Haifa.', options: ['didn\'t use to', 'don\'t used to', 'wasn\'t use', 'hadn\'t used'], answer: 0 },
      { q: 'Every summer, we ____ camp by the lake.', options: ['would', 'would be', 'are', 'have been'], answer: 0 },
      { q: 'There ____ a big tree in front of our house.', options: ['used to be', 'would be', 'was used', 'use to be'], answer: 0 },
      { q: '____ you ____ to the same school as your sister?', options: ['Did / use to go', 'Did / used to go', 'Were / use to go', 'Do / used to'], answer: 0 },
      { q: 'My father ____ read the newspaper at breakfast.', options: ['used to', 'uses to', 'is used to', 'would is'], answer: 0 },
      { q: 'I ____ like the taste of coffee, but now I love it.', options: ['didn\'t use to', 'don\'t use to', 'wasn\'t used', 'am not used'], answer: 0 },
      { q: 'Our neighbors ____ a big dog, but it died last year.', options: ['used to have', 'use to have', 'are used to have', 'would be have'], answer: 0 }
    ]
  },
  {
    title: 'Third Conditional (תנאי מסוג 3)',
    explain: 'משתמשים בו לתנאי שלא התקיים בעבר, ולתוצאה שהייתה שונה. בחלק של "if" משתמשים בעבר מושלם (had + V3), ובתוצאה would have + V3. מדובר על חרטה, על "מה היה קורה אילו".',
    pattern: 'If + had + V3, would have + V3',
    tip: 'לא אומרים "If I would have known, I would have come". אומרים: "If I had known, I would have come". השתמשו ב-would have רק בתוצאה, לא בחלק של ה-if.',
    examples: [
      ['If I had studied harder, I would have passed the test.', 'אילו למדתי יותר קשה, הייתי עובר את המבחן.'],
      ['If she had called me, I would have helped her.', 'אילו התקשרה אליי, הייתי עוזר לה.'],
      ['We would have missed the flight if we hadn\'t left early.', 'היינו מפספסים את הטיסה אילו לא היינו יוצאים מוקדם.'],
      ['What would you have done if you had seen the accident?', 'מה היית עושה אילו היית רואה את התאונה?'],
      ['He wouldn\'t have been late if he had set his alarm.', 'הוא לא היה מאחר אילו היה מכוון את השעון המעורר.']
    ],
    exercises: [
      { q: 'If I ____ earlier, I would have caught the bus.', options: ['left', 'had left', 'would leave', 'have left'], answer: 1 },
      { q: 'If they had asked me, I ____ them.', options: ['would help', 'would have helped', 'had helped', 'helped'], answer: 1 },
      { q: 'We ____ the match if we had bought tickets.', options: ['would see', 'would have seen', 'saw', 'had seen'], answer: 1 },
      { q: 'If she had known about the party, she ____ come.', options: ['would', 'will', 'would have', 'had'], answer: 2 },
      { q: 'If he ____ more carefully, he wouldn\'t have broken the glass.', options: ['drives', 'had driven', 'would drive', 'drove'], answer: 1 },
      { q: 'I ____ the job if I had prepared better.', options: ['would get', 'would have got', 'got', 'had got'], answer: 1 },
      { q: 'If you ____ my message, you would have known the plan.', options: ['read', 'would read', 'had read', 'have read'], answer: 2 },
      { q: 'She would have been happier if she ____ that job.', options: ['took', 'had taken', 'would take', 'takes'], answer: 1 },
      { q: 'If it ____ raining, we would have gone for a walk.', options: ['stopped', 'had stopped', 'would stop', 'has stopped'], answer: 1 },
      { q: 'If they had invested in the company, they ____ rich now.', options: ['would be', 'would have been', 'had been', 'are'], answer: 1 },
      { q: 'The team ____ the game if their captain had not been injured.', options: ['would win', 'would have won', 'won', 'had won'], answer: 1 }
    ]
  },
  {
    title: 'Gerunds and Infinitives (ing או to)',
    explain: 'אחרי כמה פעלים בא הפועל בצורת ing (enjoy, finish, avoid, suggest, mind). אחרי כמה פעלים אחרים בא to + פועל (want, decide, plan, hope, agree). יש פעלים שמקבלים שניהם בלי הבדל גדול (like, love, start). ו-to משמש גם לציון מטרה: "I went to the shop to buy milk".',
    pattern: 'enjoy / avoid / finish / suggest + ing    |    want / decide / plan / hope + to + פועל',
    tip: 'אחרי מילות יחס בא תמיד ing: "I\'m good at swimming", לא "good at to swim". ואחרי "suggest" בא ing: "She suggested going out", לא "suggested to go".',
    examples: [
      ['I enjoy reading books in the evening.', 'אני נהנה לקרוא ספרים בערב.'],
      ['We decided to move to a new city.', 'החלטנו לעבור לעיר חדשה.'],
      ['He avoids eating sweets after dinner.', 'הוא נמנע מלאכול ממתקים אחרי ארוחת הערב.'],
      ['I\'m looking forward to meeting you.', 'אני מצפה לפגוש אותך.'],
      ['She stopped to buy some bread on her way home.', 'היא עצרה לקנות לחם בדרך הביתה.']
    ],
    exercises: [
      { q: 'I enjoy ____ music in the car.', options: ['to listen', 'listening', 'listen', 'listened'], answer: 1 },
      { q: 'We decided ____ a new car.', options: ['buying', 'to buy', 'buy', 'bought'], answer: 1 },
      { q: 'She finished ____ her homework before dinner.', options: ['to do', 'doing', 'do', 'did'], answer: 1 },
      { q: 'They hope ____ you again soon.', options: ['seeing', 'to see', 'see', 'saw'], answer: 1 },
      { q: 'He avoids ____ late at night.', options: ['driving', 'to drive', 'drive', 'drove'], answer: 0 },
      { q: 'I\'m good at ____ languages.', options: ['learn', 'to learn', 'learning', 'learned'], answer: 2 },
      { q: 'Can you suggest ____ a restaurant for dinner?', options: ['to choose', 'choosing', 'choose', 'chose'], answer: 1 },
      { q: 'I want ____ a doctor tomorrow.', options: ['see', 'seeing', 'to see', 'saw'], answer: 2 },
      { q: 'Would you mind ____ the window?', options: ['to open', 'open', 'opening', 'opened'], answer: 2 },
      { q: 'We plan ____ to Italy next summer.', options: ['traveling', 'to travel', 'travel', 'traveled'], answer: 1 },
      { q: 'She agreed ____ the bill.', options: ['share', 'sharing', 'to share', 'shared'], answer: 2 }
    ]
  },
  {
    title: 'Passive Voice (סביל)',
    explain: 'משתמשים בו כשהפעולה חשובה יותר מהאדם שביצע אותה, או כשלא ידוע מי ביצע אותה. בונים עם to be בזמן המתאים + V3. מי שביצע את הפעולה מופיע עם by, אם צריך.',
    pattern: 'am/is/are + V3 (הווה)    |    was/were + V3 (עבר)    |    will be + V3 (עתיד)    |    has been + V3 (הווה מושלם)',
    tip: 'בסביל משתמשים תמיד ב-V3, לא בעבר: "The letter was written" ולא "The letter was wrote". ו-by משמש לציון מי ביצע את הפעולה: "The book was written by Shakespeare".',
    examples: [
      ['English is spoken in many countries.', 'אנגלית מדוברת בהרבה מדינות.'],
      ['The house was built in 1920.', 'הבית נבנה ב-1920.'],
      ['The new bridge will be opened next year.', 'הגשר החדש ייפתח בשנה הבאה.'],
      ['Many trees have been cut down in the forest.', 'הרבה עצים נכרתו ביער.'],
      ['The package was delivered by mistake to our house.', 'החבילה נמסרה לביתנו בטעות.']
    ],
    exercises: [
      { q: 'This letter ____ in 2010.', options: ['wrote', 'was written', 'written', 'is write'], answer: 1 },
      { q: 'Cars ____ in this factory.', options: ['make', 'are made', 'made', 'is making'], answer: 1 },
      { q: 'The window ____ by the wind last night.', options: ['broke', 'was broken', 'is broken', 'broken'], answer: 1 },
      { q: 'The results ____ next week.', options: ['will announce', 'will be announced', 'are announced', 'announced'], answer: 1 },
      { q: 'The printer ____ repaired yet.', options: ['hasn\'t been', 'wasn\'t', 'isn\'t', 'didn\'t be'], answer: 0 },
      { q: 'Coffee ____ in Brazil.', options: ['grows', 'is grown', 'grown', 'was grow'], answer: 1 },
      { q: 'The thief ____ by the police yesterday.', options: ['arrested', 'was arrested', 'is arrest', 'arrest'], answer: 1 },
      { q: 'Many books ____ by this author.', options: ['wrote', 'were written', 'written', 'are write'], answer: 1 },
      { q: 'The room ____ every morning.', options: ['is cleaned', 'cleans', 'cleaned', 'is clean'], answer: 0 },
      { q: 'The students ____ by the principal.', options: ['were congratulated', 'congratulated', 'congratulate', 'are congratulate'], answer: 0 },
      { q: 'The keys ____ on the table.', options: ['left', 'were left', 'leave', 'are leave'], answer: 1 }
    ]
  },
  {
    title: 'Relative Clauses (משפטי זיקה)',
    explain: 'משפטי זיקה מתארים אדם או דבר בתוך המשפט. who לאנשים, which לדברים, that לשניהם, where למקומות, whose לשייכות ("the man whose car...").',
    pattern: 'person: who / that    |    thing: which / that    |    place: where    |    possession: whose',
    tip: 'לא חוזרים על השם: "The man who lives next door is a doctor", לא "The man who he lives next door". ו-which לא משמש לאנשים: "The woman who called", לא "the woman which called".',
    examples: [
      ['The woman who lives next door is a nurse.', 'האישה שגרה ליד היא אחות.'],
      ['This is the book which I told you about.', 'זה הספר שסיפרתי לך עליו.'],
      ['This is the café where we first met.', 'זה בית הקפה שבו נפגשנו לראשונה.'],
      ['I know a girl whose father is a famous pilot.', 'אני מכיר ילדה שאביה טייס מפורסם.'],
      ['The phone that I bought yesterday is already broken.', 'הטלפון שקניתי אתמול כבר שבור.']
    ],
    exercises: [
      { q: 'The man ____ called you is my boss.', options: ['which', 'who', 'where', 'whose'], answer: 1 },
      { q: 'The shop ____ I bought this jacket is closed now.', options: ['who', 'which', 'where', 'whose'], answer: 2 },
      { q: 'This is the car ____ I want to buy.', options: ['who', 'where', 'whose', 'which'], answer: 3 },
      { q: 'She is the teacher ____ helped me with my essay.', options: ['which', 'whose', 'who', 'where'], answer: 2 },
      { q: 'I know a man ____ dog is famous on the internet.', options: ['who', 'which', 'where', 'whose'], answer: 3 },
      { q: 'The city ____ I was born is very beautiful.', options: ['who', 'where', 'whose', 'which'], answer: 1 },
      { q: 'The film ____ we watched last night was very long.', options: ['who', 'whose', 'which', 'where'], answer: 2 },
      { q: 'Students ____ arrive late will not be allowed in.', options: ['which', 'where', 'who', 'whose'], answer: 2 },
      { q: 'That is the hotel ____ we stayed in last summer.', options: ['who', 'where', 'whose', 'which'], answer: 1 },
      { q: 'The girl ____ bag was stolen is crying.', options: ['who', 'which', 'where', 'whose'], answer: 3 },
      { q: 'The book ____ is on the table belongs to me.', options: ['who', 'whose', 'which', 'where'], answer: 2 }
    ]
  },
  {
    title: 'Reported Speech (דיבור עקיף)',
    explain: 'כשמספרים מה מישהו אמר, מזיזים את הזמן אחורה: הווה נהיה עבר, עבר נהיה עבר מושלם, will נהיה would. מזיזים גם מילים כמו now (then), today (that day), tomorrow (the next day). לשאלות: הסדר הופך לסדר של משפט רגיל.',
    pattern: 'He said, "I am tired" ← He said (that) he was tired    |    She asked, "Where do you live?" ← She asked where I lived',
    tip: 'בשאלה עקיפה לא הופכים את הסדר: "She asked where I lived", לא "where did I live". ולא שמים סימן שאלה.',
    examples: [
      ['She said, "I am busy today." → She said (that) she was busy that day.', 'היא אמרה, "אני עסוקה היום." → היא אמרה שהיא עסוקה באותו יום.'],
      ['He said, "I will call you tomorrow." → He said he would call me the next day.', 'הוא אמר, "אתקשר אליך מחר." → הוא אמר שיתקשר אליי למחרת.'],
      ['They asked, "Where is the station?" → They asked where the station was.', 'הם שאלו, "איפה התחנה?" → הם שאלו איפה התחנה.'],
      ['My mom told me, "Don\'t forget your keys." → My mom told me not to forget my keys.', 'אמא שלי אמרה לי, "אל תשכח את המפתחות." → אמא שלי אמרה לי לא לשכוח את המפתחות.'],
      ['He said he had lost his wallet.', 'הוא אמר שאיבד את הארנק שלו.']
    ],
    exercises: [
      { q: 'She said she ____ tired.', options: ['is', 'was', 'be', 'were being'], answer: 1 },
      { q: 'He told me he ____ the report the day before.', options: ['finished', 'had finished', 'has finished', 'would finish'], answer: 1 },
      { q: '"I will come later," she said. → She said she ____ later.', options: ['will come', 'would come', 'comes', 'came'], answer: 1 },
      { q: 'They asked me where I ____.', options: ['live', 'did live', 'lived', 'do live'], answer: 2 },
      { q: '"Sit down, please." → The teacher told us ____.', options: ['sit down', 'to sit down', 'sitting down', 'that sit down'], answer: 1 },
      { q: 'He asked, "Have you seen my car?" → He asked me ____ my car.', options: ['if I had seen', 'have I seen', 'if have I seen', 'that I saw'], answer: 0 },
      { q: '"I am reading now." → He said he ____ then.', options: ['reads', 'was reading', 'is reading', 'had read'], answer: 1 },
      { q: '"We can help you." → They said they ____ me.', options: ['can help', 'could help', 'helped', 'will help'], answer: 1 },
      { q: '"Don\'t touch that!" → She told the boy ____ that.', options: ['not touch', 'to not touch', 'not to touch', 'don\'t to touch'], answer: 2 },
      { q: 'She asked ____ the meeting was.', options: ['what time', 'what time was', 'did it', 'when is'], answer: 0 },
      { q: '"I visited Rome yesterday." → He said he ____ Rome the day before.', options: ['visited', 'had visited', 'has visited', 'visits'], answer: 1 }
    ]
  },
  {
    title: 'Phrasal Verbs (פעלים עם מילת תיאור)',
    explain: 'פועל + מילת יחס (או תואר הפועל) משנה את המשמעות. צריך ללמוד כל צירוף כיחידה: "give up" = לוותר, "look after" = לטפל. יש צירופים שניתנים להפרדה ("turn the light off") וצירופים שאי אפשר להפריד ("look after my dog", לא "look my dog after").',
    pattern: 'פועל + particle: give up, look after, turn on, pick up, find out',
    tip: 'כששם העצם הוא הכינוי (it, them), חובה להפריד: "turn it on", לא "turn on it". אומרים "put them on", לא "put on them".',
    examples: [
      ['I can\'t figure out this exercise. Can you help me?', 'אני לא מצליח להבין את התרגיל הזה. אפשר לעזור לי?'],
      ['Please turn off the lights when you leave.', 'נא לכבות את האורות כשאתה יוצא.'],
      ['She looks after her younger brother every afternoon.', 'היא מטפלת באחיה הצעיר כל אחר צהריים.'],
      ['We have to give up smoking.', 'אנחנו צריכים להפסיק לעשן.'],
      ['I picked up some bread on my way home.', 'קניתי לחם בדרך הביתה.']
    ],
    exercises: [
      { q: 'Please ____ your coat before you sit down.', options: ['take off', 'take on', 'take in', 'take out'], answer: 0 },
      { q: 'I ____ my grandmother every Sunday.', options: ['look for', 'look after', 'look into', 'look up to'], answer: 1 },
      { q: 'We need to ____ the meeting to next week.', options: ['put off', 'put on', 'put up', 'put in'], answer: 0 },
      { q: 'Can you ____ the TV? It is too loud.', options: ['turn it down', 'turn down it', 'turn it up it', 'turn up down'], answer: 0 },
      { q: 'I ____ an old friend at the supermarket yesterday.', options: ['ran into', 'ran out', 'ran over', 'ran off'], answer: 0 },
      { q: 'The plane ____ at 7 a.m. on time.', options: ['took off', 'took on', 'took in', 'took out'], answer: 0 },
      { q: 'We ran ____ of milk, so we need to go to the shop.', options: ['out', 'up', 'off', 'in'], answer: 0 },
      { q: 'Could you ____ the sales report by Friday?', options: ['hand in', 'hand over', 'hand out', 'hand on'], answer: 0 },
      { q: 'I am trying to ____ my old habits.', options: ['get over', 'get rid of', 'get up', 'get along'], answer: 1 },
      { q: 'She ____ a lot of money on clothes last month.', options: ['spent', 'gave', 'paid off', 'took off'], answer: 0 },
      { q: 'Please ____ the form and send it back to us.', options: ['fill in', 'fill up', 'fill out of', 'fill on'], answer: 0 }
    ]
  },
  {
    title: 'Wish and If only (משאלות על ההווה והעבר)',
    explain: 'משתמשים ב-wish או if only כשרוצים שמשהו יהיה אחרת ממה שהוא. על ההווה (מצב שאינו נכון עכשיו) משתמשים בעבר פשוט: I wish I had... ו-I wish I were... על העבר (מצב שלא היה כך) משתמשים בעבר מושלם: I wish I had studied.',
    pattern: 'I wish + עבר פשוט (הווה לא אמיתי)    |    I wish + had + V3 (עבר לא אמיתי)    |    I wish + would (תלונה על מישהו אחר)',
    tip: 'אחרי wish לא באה הווה לגבי מצב נוכחי. לא אומרים "I wish I am taller", אומרים "I wish I were taller". ו-would אחרי wish משמש לתלונה על מישהו אחר: "I wish you would listen", לא לתיאור של עצמי.',
    examples: [
      ['I wish I had more free time.', 'הלוואי שהיה לי יותר זמן פנוי.'],
      ['She wishes she lived closer to the sea.', 'היא מאחלת לעצמה לגור קרוב יותר לים.'],
      ['I wish I had studied harder for the exam.', 'הלוואי שהייתי לומד יותר קשה למבחן.'],
      ['If only we had left earlier!', 'הלוואי שהיינו יוצאים מוקדם יותר!'],
      ['I wish you would stop making so much noise.', 'הלוואי שתפסיק לעשות כל כך הרבה רעש.']
    ],
    exercises: [
      { q: 'I wish I ____ able to speak French.', options: ['am', 'was', 'were', 'will be'], answer: 2 },
      { q: 'She wishes she ____ a bigger apartment.', options: ['has', 'had', 'will have', 'would have'], answer: 1 },
      { q: 'I wish I ____ the answer to that question.', options: ['know', 'knew', 'will know', 'have known'], answer: 1 },
      { q: 'I wish I ____ my keys yesterday.', options: ['didn\'t lose', 'hadn\'t lost', 'don\'t lose', 'wouldn\'t lose'], answer: 1 },
      { q: 'If only we ____ more money last year!', options: ['have', 'had', 'would have', 'will have'], answer: 1 },
      { q: 'He wishes he ____ the job interview.', options: ['won', 'had won', 'would win', 'wins'], answer: 1 },
      { q: 'I wish the weather ____ better this weekend.', options: ['is', 'was', 'would be', 'will be'], answer: 2 },
      { q: 'My neighbors are so loud. I wish they ____ quieter.', options: ['are', 'were', 'will be', 'have been'], answer: 1 },
      { q: 'I wish you ____ smoking. It is bad for your health.', options: ['stop', 'would stop', 'stopped', 'will stop'], answer: 1 },
      { q: 'I wish I ____ how to swim when I was a child.', options: ['learned', 'had learned', 'would learn', 'learn'], answer: 1 },
      { q: 'If only I ____ taller, I could play basketball.', options: ['am', 'was', 'were', 'would be'], answer: 2 }
    ]
  },
  {
    title: 'Question Tags (שאלות זנב)',
    explain: 'שאלת זנב היא מילה קצרה בסוף משפט, שמבקשת אישור או מחפשת הסכמה. אם המשפט חיובי, שאלת הזנב שלילית, ולהפך. הפועל בשאלת הזנב הוא עזר של המשפט (am/is/are, do/does/did, have, will, can), והנושא הוא כינוי.',
    pattern: 'חיובי + שלילי?: You are tired, aren\'t you?    |    שלילי + חיובי?: She doesn\'t like it, does she?',
    tip: 'אחרי "I am" שאלת הזנב היא "aren\'t I" (לא "amn\'t I"). ואחרי פעלים בלי עזר משתמשים ב-do/does/did: "You like pizza, don\'t you?" ולא "isn\'t you?".',
    examples: [
      ['It\'s a beautiful day, isn\'t it?', 'יום יפהפה, לא?'],
      ['You haven\'t met my sister, have you?', 'לא פגשת את אחותי, נכון?'],
      ['She can speak German, can\'t she?', 'היא יודעת לדבר גרמנית, לא?'],
      ['Let\'s go to the cinema, shall we?', 'בואו נלך לקולנוע, נכון?'],
      ['Nobody called me, did they?', 'אף אחד לא התקשר אליי, נכון?']
    ],
    exercises: [
      { q: 'You are coming to the party, ____?', options: ['aren\'t you', 'don\'t you', 'are you', 'isn\'t you'], answer: 0 },
      { q: 'She works in a bank, ____?', options: ['doesn\'t she', 'isn\'t she', 'does she', 'won\'t she'], answer: 0 },
      { q: 'They went home early, ____?', options: ['didn\'t they', 'did they', 'don\'t they', 'went they'], answer: 0 },
      { q: 'He won\'t be late, ____?', options: ['won\'t he', 'will he', 'isn\'t he', 'doesn\'t he'], answer: 1 },
      { q: 'I am right, ____?', options: ['am not I', 'aren\'t I', 'isn\'t I', 'don\'t I'], answer: 1 },
      { q: 'Let\'s take a break, ____?', options: ['shall we', 'will we', 'do we', 'don\'t we'], answer: 0 },
      { q: 'You have finished the report, ____?', options: ['haven\'t you', 'don\'t you', 'have you', 'aren\'t you'], answer: 0 },
      { q: 'Nobody noticed the mistake, ____?', options: ['didn\'t they', 'did they', 'do they', 'don\'t they'], answer: 1 },
      { q: 'You can swim, ____?', options: ['don\'t you', 'can\'t you', 'aren\'t you', 'won\'t you'], answer: 1 },
      { q: 'This isn\'t your bag, ____?', options: ['isn\'t it', 'is it', 'doesn\'t it', 'does it'], answer: 1 },
      { q: 'Your brother likes soccer, ____?', options: ['doesn\'t he', 'isn\'t he', 'does he', 'likes he'], answer: 0 }
    ]
  }
];
