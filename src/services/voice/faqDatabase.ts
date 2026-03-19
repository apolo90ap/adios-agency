export interface FaqEntry {
  keywords: string[];
  answer: string;
}

export interface FaqSet {
  entries: FaqEntry[];
  fallback: string;
  greeting: string;
  stillThere: string;
}

export const faqDatabase: Record<string, FaqSet> = {
  en: {
    greeting:
      "Hey there! I'm Aria, your AI assistant from Adios Agency. You can test me out right now — ask me anything about our services, or just have a chat. What's on your mind?",
    stillThere:
      "Still with me? No rush — ask me anything, I'm here.",
    fallback:
      "That's a great question! I'm still learning, but our team can give you a full answer. Drop us a message on Telegram or email — we'd love to chat.",
    entries: [
      {
        keywords: ["hi", "hello", "hey", "what's up", "sup", "howdy", "how are you", "how r u", "you good"],
        answer:
          "Hey! Doing great, thanks for asking! So — what can I help you with today? You can ask about our AI services, how it all works, or honestly just have a conversation.",
      },
      {
        keywords: ["who are you", "what are you", "are you real", "are you ai", "are you a bot", "test", "testing"],
        answer:
          "Ha, good question! I'm Aria — an AI assistant built by Adios Agency. I'm here so you can test what an AI voice agent feels like. Go ahead, ask me something!",
      },
      {
        keywords: [
          "what do you do", "services", "service", "offer", "help",
          "what can you", "provide", "capabilities", "about", "tell me",
        ],
        answer:
          "We build AI that works for your business 24/7. That includes AI voice agents that handle phone calls, WhatsApp and Instagram bots that reply to your clients, Telegram bots, booking automation, and Facebook responders. Basically — if it's repetitive, we automate it.",
      },
      {
        keywords: [
          "cost", "price", "how much", "pricing", "expensive", "cheap",
          "money", "budget", "pay", "free", "subscription",
        ],
        answer:
          "Here's the deal — the first month is completely free. We build your custom AI solution in about 2 weeks, you test it for a full month at zero cost. If you love it, we move to a simple monthly subscription. No pressure.",
      },
      {
        keywords: [
          "how long", "how fast", "when ready", "timeline", "time", "weeks", "days",
          "duration", "build", "deploy", "implement",
        ],
        answer:
          "We typically build and integrate your solution in 2 weeks. After that you get a full free month to test it in real conditions. Quick, right?",
      },
      {
        keywords: [
          "24", "around the clock", "always on", "night", "weekend",
          "non-stop", "nonstop", "all day",
        ],
        answer:
          "Yep — your AI works 24/7. No sick days, no weekends off, no lunch breaks. It's always on.",
      },
      {
        keywords: [
          "replace", "employee", "fire", "job", "worker", "staff", "human",
          "people",
        ],
        answer:
          "Nope! The idea isn't to replace your team — it's to take the boring stuff off their plate so they can focus on what actually matters. Think of the AI as an extra team member that handles the routine.",
      },
      {
        keywords: [
          "whatsapp", "instagram", "facebook", "telegram", "messenger",
          "chat", "bot", "message",
        ],
        answer:
          "Yes! We build bots for WhatsApp, Instagram, Facebook, and Telegram. They can answer questions, qualify leads, take bookings, and even close sales — automatically.",
      },
      {
        keywords: [
          "voice", "call", "phone", "calls", "calling",
        ],
        answer:
          "Our AI Voice agents handle inbound and outbound calls just like a real person. They greet callers, answer questions, take bookings, and escalate to a human if needed. Great for businesses getting hundreds of calls.",
      },
      {
        keywords: [
          "booking", "appointment", "schedule", "calendar", "reserve",
        ],
        answer:
          "We automate bookings completely — clients can schedule appointments 24/7 through voice, chat, or your website, and it all syncs to your calendar automatically.",
      },
      {
        keywords: [
          "small business", "startup", "small company", "individual",
          "solo", "freelance", "suitable", "big company", "enterprise",
        ],
        answer:
          "We work with businesses of all sizes — from solo entrepreneurs to large enterprises. The solution is always custom-built for your specific situation.",
      },
      {
        keywords: [
          "language", "languages", "multilingual", "translate", "spanish",
          "russian", "hebrew", "arabic", "french",
        ],
        answer:
          "Our AI speaks most world languages — English, Spanish, Russian, French, Hebrew, Arabic, and more. So your clients can talk to it in their language.",
      },
      {
        keywords: ["thanks", "thank you", "thank", "great", "awesome", "cool", "nice", "wow"],
        answer:
          "Of course! Happy to help. Anything else you'd like to know — or just feel free to keep chatting!",
      },
      {
        keywords: ["bye", "goodbye", "see you", "later", "ciao", "adios"],
        answer:
          "Adios! It was great talking with you. If you want to get started, reach out on Telegram or shoot us an email — we'd love to work together.",
      },
    ],
  },
  ru: {
    greeting:
      "Привет! Я Ария — AI-ассистент агентства Adios. Можете меня протестировать прямо сейчас — спросите что угодно о наших услугах или просто поговорите. О чём думаете?",
    stillThere:
      "Вы ещё здесь? Не торопитесь — спрашивайте, я слушаю.",
    fallback:
      "Отличный вопрос! Наша команда даст вам полный ответ. Напишите нам в Telegram или на email — мы с радостью пообщаемся.",
    entries: [
      {
        keywords: ["привет", "здравствуйте", "хай", "как дела", "как ты", "ты кто"],
        answer:
          "Привет! Всё отлично, спасибо! Чем могу помочь? Спрашивайте про наши AI-услуги или просто пообщаемся.",
      },
      {
        keywords: ["кто ты", "что ты", "ты бот", "ты AI", "тест", "тестирую"],
        answer:
          "Я Ария — AI-ассистент, созданный Adios Agency. Здесь, чтобы вы могли почувствовать, как работает голосовой AI-агент. Давайте, задайте вопрос!",
      },
      {
        keywords: [
          "что вы делаете", "услуги", "сервис", "помощь", "предлагаете",
          "расскажи", "возможности", "чем занимаетесь",
        ],
        answer:
          "Мы строим AI, который работает на ваш бизнес 24/7: голосовые агенты для звонков, боты для WhatsApp, Instagram, Telegram, Facebook, автоматизация записи. Если задача повторяется — мы её автоматизируем.",
      },
      {
        keywords: [
          "стоимость", "цена", "сколько стоит", "дорого", "бюджет",
          "бесплатно", "подписка", "платить",
        ],
        answer:
          "Первый месяц — полностью бесплатно. Мы строим вашу систему за 2 недели, вы тестируете целый месяц без оплаты. Если понравится — переходим на ежемесячную подписку. Без давления.",
      },
      {
        keywords: [
          "сколько времени", "срок", "быстро", "две недели", "когда",
          "скорость", "запуск",
        ],
        answer:
          "Строим и интегрируем за 2 недели. Потом целый месяц бесплатного тестирования. Быстро, правда?",
      },
      {
        keywords: ["24", "круглосуточно", "всегда", "ночь", "выходные", "без перерыва"],
        answer:
          "Да — ваш AI работает 24/7. Без больничных, без выходных, без обедов. Всегда на связи.",
      },
      {
        keywords: ["заменяете", "сотрудник", "уволить", "персонал", "люди"],
        answer:
          "Нет! Идея — не заменить команду, а снять с неё скучные задачи. AI берёт рутину, а люди делают то, что важно.",
      },
      {
        keywords: ["whatsapp", "instagram", "facebook", "telegram", "мессенджер", "бот", "чат"],
        answer:
          "Да! Делаем ботов для WhatsApp, Instagram, Facebook и Telegram. Отвечают на вопросы, принимают заявки, квалифицируют лидов — автоматически.",
      },
      {
        keywords: ["голос", "звонок", "телефон", "звонки"],
        answer:
          "Голосовые агенты обрабатывают входящие и исходящие звонки как живой человек. Отвечают, записывают, эскалируют при необходимости. Отлично для бизнесов с сотнями звонков.",
      },
      {
        keywords: ["запись", "приём", "расписание", "календарь"],
        answer:
          "Полная автоматизация записи — клиенты записываются 24/7 через голос, чат или сайт, всё синхронизируется с вашим календарём.",
      },
      {
        keywords: ["спасибо", "благодарю", "отлично", "круто", "классно", "здорово"],
        answer:
          "Пожалуйста! Рад помочь. Есть ещё вопросы — спрашивайте!",
      },
      {
        keywords: ["пока", "до свидания", "всё", "хватит"],
        answer:
          "Adios! Было приятно пообщаться. Если хотите начать — пишите в Telegram или на email. С удовольствием поработаем вместе.",
      },
    ],
  },
  he: {
    greeting:
      "היי! אני אריה — עוזרת AI של סוכנות Adios. תוכלו לבדוק אותי עכשיו — שאלו על השירותים שלנו או פשוט שוחחו איתי. מה על הלב?",
    stillThere: "עדיין כאן? אין לחץ — שאלו, אני מקשיבה.",
    fallback:
      "שאלה מצוינת! הצוות שלנו יוכל לתת לכם תשובה מלאה. כתבו לנו בטלגרם או במייל — נשמח לדבר.",
    entries: [
      {
        keywords: ["שלום", "היי", "הי", "מה שלומך", "מי אתה", "מי את"],
        answer:
          "היי! הכל בסדר, תודה! מה אפשר לעזור? שאלו על שירותי ה-AI שלנו או פשוט נשוחח.",
      },
      {
        keywords: ["מה אתם עושים", "שירותים", "שירות", "עזרה", "יכולות", "ספרו לי"],
        answer:
          "אנחנו בונים AI שעובד לעסק שלכם 24/7 — סוכני קוליים לשיחות, בוטים לוואטסאפ ואינסטגרם וטלגרם ופייסבוק, ואוטומציה לתורים. אם זה חוזר על עצמו — אנחנו מייעלים את זה.",
      },
      {
        keywords: ["עלות", "מחיר", "כמה עולה", "חינם", "מנוי", "לשלם"],
        answer:
          "החודש הראשון — בחינם לגמרי. אנחנו בונים תוך שבועיים, אתם בודקים חודש ללא עלות. אם אהבתם — עוברים למנוי חודשי. בלי לחץ.",
      },
      {
        keywords: ["כמה זמן", "שבועיים", "מהר", "מתי"],
        answer:
          "בונים ומשלבים תוך שבועיים, ואז חודש שלם לבדיקה חינמית. מהיר, לא?",
      },
      {
        keywords: ["24", "סביב השעון", "תמיד", "לילה", "סוף שבוע"],
        answer:
          "כן — ה-AI שלכם עובד 24/7. ללא מחלה, ללא שבת, תמיד זמין.",
      },
      {
        keywords: ["תודה", "מעולה", "כייף", "נפלא", "סבבה"],
        answer: "בשמחה! יש עוד שאלות? אני כאן.",
      },
      {
        keywords: ["להתראות", "ביי", "שלום"],
        answer: "Adios! היה נחמד לדבר. רוצים להתחיל — כתבו לנו בטלגרם או במייל.",
      },
    ],
  },
  fr: {
    greeting:
      "Salut ! Je suis Aria, votre assistante IA de l'agence Adios. Testez-moi maintenant — posez-moi des questions sur nos services ou bavardons simplement. Qu'est-ce qui vous passe par la tête ?",
    stillThere: "Toujours là ? Pas de pression — posez vos questions, je suis là.",
    fallback:
      "Excellente question ! Notre équipe pourra vous répondre en détail. Écrivez-nous sur Telegram ou par email — nous serions ravis d'échanger.",
    entries: [
      {
        keywords: ["bonjour", "salut", "coucou", "comment ça va", "qui es-tu"],
        answer:
          "Salut ! Tout va bien, merci ! Je peux vous aider avec quoi ? Posez des questions sur nos services ou discutons !",
      },
      {
        keywords: ["que faites-vous", "services", "aide", "capacités", "parlez-moi"],
        answer:
          "Nous construisons des IA qui travaillent pour votre entreprise 24h/24 — agents vocaux, bots WhatsApp, Instagram, Telegram, Facebook, automatisation des réservations. Si c'est répétitif, on l'automatise.",
      },
      {
        keywords: ["coût", "prix", "combien", "gratuit", "abonnement", "payer"],
        answer:
          "Le premier mois est entièrement gratuit. Nous construisons votre solution en 2 semaines, vous la testez un mois sans payer. Si vous aimez — on passe à un abonnement mensuel. Sans pression.",
      },
      {
        keywords: ["combien de temps", "deux semaines", "rapide", "quand"],
        answer:
          "On construit et intègre en 2 semaines, puis un mois de test gratuit. Rapide, non ?",
      },
      {
        keywords: ["24", "toujours", "nuit", "week-end"],
        answer: "Oui — votre IA travaille 24h/24, 7j/7. Toujours disponible.",
      },
      {
        keywords: ["merci", "super", "génial", "cool", "bravo"],
        answer: "Avec plaisir ! D'autres questions ? Je suis là.",
      },
      {
        keywords: ["au revoir", "bye", "ciao", "à bientôt"],
        answer: "Adios ! Ravi d'avoir discuté. Pour commencer — écrivez sur Telegram ou par email.",
      },
    ],
  },
  ar: {
    greeting:
      "مرحباً! أنا آريا — مساعدة الذكاء الاصطناعي من وكالة Adios. يمكنك تجربتي الآن — اسألني عن خدماتنا أو فقط تحدث معي. ما الذي يدور في ذهنك؟",
    stillThere: "هل ما زلت هنا؟ لا تتردد في السؤال، أنا هنا.",
    fallback:
      "سؤال رائع! فريقنا سيعطيك إجابة كاملة. راسلنا على تيليجرام أو البريد الإلكتروني — يسعدنا التحدث.",
    entries: [
      {
        keywords: ["مرحبا", "أهلاً", "سلام", "كيف حالك", "من أنت"],
        answer:
          "مرحباً! بخير شكراً! كيف أساعدك؟ اسأل عن خدمات الذكاء الاصطناعي لدينا أو فقط تحدث معي.",
      },
      {
        keywords: ["ماذا تفعلون", "خدمات", "مساعدة", "قدرات", "أخبرني"],
        answer:
          "نبني ذكاءً اصطناعياً يعمل لعملك 24/7 — وكلاء صوتيون للمكالمات، بوتات واتساب وإنستغرام وتيليجرام وفيسبوك، وأتمتة الحجوزات. إذا كان متكرراً — نؤتمته.",
      },
      {
        keywords: ["تكلفة", "سعر", "كم", "مجاني", "اشتراك", "دفع"],
        answer:
          "الشهر الأول مجاني تماماً. نبني حلك في أسبوعين، تجربه شهراً بدون دفع. إذا أعجبك — ننتقل إلى اشتراك شهري. بدون ضغط.",
      },
      {
        keywords: ["كم يستغرق", "أسبوعان", "سريع", "متى"],
        answer: "نبني ونُدمج في أسبوعين، ثم شهر تجريبي مجاني. سريع، أليس كذلك؟",
      },
      {
        keywords: ["24", "دائماً", "ليل", "عطلة"],
        answer: "نعم — ذكاؤك الاصطناعي يعمل 24/7. دائماً متاح.",
      },
      {
        keywords: ["شكرا", "شكراً", "رائع", "ممتاز"],
        answer: "بكل سرور! هل لديك أسئلة أخرى؟ أنا هنا.",
      },
      {
        keywords: ["مع السلامة", "باي", "وداعاً"],
        answer: "Adios! كان حديثاً رائعاً. للبدء — راسلنا على تيليجرام أو البريد الإلكتروني.",
      },
    ],
  },
  es: {
    greeting:
      "¡Hola! Soy Aria, tu asistente de IA de Adios Agency. Puedes probarme ahora mismo — pregúntame sobre nuestros servicios o simplemente charlemos. ¿Qué tienes en mente?",
    stillThere: "¿Sigues ahí? Sin prisa — pregunta lo que quieras, estoy aquí.",
    fallback:
      "¡Buena pregunta! Nuestro equipo puede darte una respuesta completa. Escríbenos por Telegram o email — nos encantaría hablar.",
    entries: [
      {
        keywords: ["hola", "buenos días", "buenas", "qué tal", "cómo estás", "quién eres"],
        answer:
          "¡Hola! Muy bien, ¡gracias! ¿En qué puedo ayudarte? Pregunta sobre nuestros servicios de IA o simplemente conversemos.",
      },
      {
        keywords: ["qué hacen", "servicios", "ayuda", "capacidades", "cuéntame", "qué ofrecen"],
        answer:
          "Construimos IA que trabaja para tu negocio 24/7 — agentes de voz para llamadas, bots de WhatsApp, Instagram, Telegram y Facebook, automatización de citas. Si es repetitivo, lo automatizamos.",
      },
      {
        keywords: ["costo", "precio", "cuánto", "gratis", "suscripción", "pagar", "cobran"],
        answer:
          "El primer mes es completamente gratis. Construimos tu solución en 2 semanas, la pruebas un mes sin costo. Si te gusta — pasamos a una suscripción mensual. Sin presión.",
      },
      {
        keywords: ["cuánto tiempo", "dos semanas", "rápido", "cuándo"],
        answer:
          "Construimos e integramos en 2 semanas, luego un mes de prueba gratuito. Rápido, ¿verdad?",
      },
      {
        keywords: ["24", "siempre", "noche", "fin de semana", "todo el día"],
        answer: "Sí — tu IA trabaja 24/7. Sin descansos, sin fines de semana. Siempre disponible.",
      },
      {
        keywords: ["whatsapp", "instagram", "facebook", "telegram", "bot", "chat", "mensaje"],
        answer:
          "¡Sí! Hacemos bots para WhatsApp, Instagram, Facebook y Telegram. Responden preguntas, califican leads, toman reservas — automáticamente.",
      },
      {
        keywords: ["voz", "llamada", "teléfono", "llamadas"],
        answer:
          "Nuestros agentes de voz manejan llamadas como una persona real. Responden, agendan, escalan si es necesario. Ideal para negocios con cientos de llamadas diarias.",
      },
      {
        keywords: ["cita", "reserva", "agenda", "calendario"],
        answer:
          "Automatizamos las reservas completamente — los clientes pueden agendar 24/7 por voz, chat o web, y se sincroniza con tu calendario.",
      },
      {
        keywords: ["gracias", "genial", "increíble", "excelente", "bien"],
        answer: "¡De nada! ¿Tienes más preguntas? Aquí estoy.",
      },
      {
        keywords: ["adiós", "hasta luego", "bye", "chao"],
        answer:
          "¡Adios! Fue un placer hablar contigo. Si quieres comenzar — escríbenos por Telegram o email. ¡Nos encantaría trabajar juntos!",
      },
    ],
  },
};
