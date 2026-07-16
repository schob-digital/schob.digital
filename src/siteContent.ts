import { getStaticAssetPath } from './routing';

export type Language = 'de' | 'en' | 'uk';

export const languageOptions: Array<{ code: Language; label: string; name: string }> = [
  { code: 'de', label: 'DE', name: 'Deutsch' },
  { code: 'en', label: 'EN', name: 'English' },
  { code: 'uk', label: 'UA', name: 'Українська' },
];

const portfolioLinks = {
  wedding: {
    image: 'https://raw.githubusercontent.com/schob-digital/Hochzeitsservicede/main/src/Foto/boat.png',
    link: 'https://schob-digital.github.io/Hochzeitsservicede/',
  },
  dj: {
    image: getStaticAssetPath('portfolio-assets/dj_feuerwerk.PNG'),
    link: 'https://vasilygenai.github.io/DJ_Vasily/',
  },
  misjudged: {
    image: 'https://raw.githubusercontent.com/VasilyGenAI/Website_me/main/Photos/Screen2.png',
    link: 'https://vasilygenai.github.io/misjudged.app/index.html',
  },
  schob: {
    image: 'https://raw.githubusercontent.com/VasilyGenAI/Website_me/main/Photos/first_image.png',
    link: 'https://vasilygenai.github.io/Website_me/',
    contain: true,
  },
  meetli: {
    image: getStaticAssetPath('portfolio-assets/image_for_meetli.png'),
    link: 'https://www.meetli.ch/',
  },
};

export const siteContent = {
  de: {
    metaTitle: 'Schob Digital | KI selbst nutzen lernen',
    nav: {
      portfolio: 'Referenzen',
      learn: 'Lernbereiche',
      difference: 'Warum ich',
      packages: 'Preise',
      contact: 'Kontakt',
      imprint: 'Impressum',
      privacy: 'Datenschutz',
    },
    hero: {
      intro: 'Hey, ich bin Vasily.',
      headlineStart: 'Ich bringe dir bei, wie du',
      highlighted: 'KI',
      headlineEnd: 'wirklich für dein Business nutzt, von der eigenen Website bis zur Datenanalyse.',
      subline: 'Die Entwicklung läuft weiter, mit oder ohne dich. Ich zeige dir, wie du dranbleibst: verständlich, praxisnah, aus Berlin.',
      cta: 'Unverbindlich anfragen',
      imageAlt: 'Vasily Schob von Schob Digital',
    },
    portfolio: {
      eyebrow: 'Referenzen',
      intro: 'Ein paar Beispiele, wie unterschiedlich das Ergebnis aussehen kann: von der Hochzeitsseite bis zur App. Genau solche Seiten baust du mit meiner Unterstützung selbst.',
      items: [
        {
          ...portfolioLinks.wedding,
          title: 'Hochzeitsservice',
          desc: 'Elegantes Design für einen Hochzeitsservice.',
        },
        {
          ...portfolioLinks.dj,
          title: 'DJ Vasily',
          desc: 'Professioneller Auftritt für DJ & Event-Equipment.',
        },
        {
          ...portfolioLinks.misjudged,
          title: 'Misjudged Web',
          desc: 'Kompakte App-Website mit sauberem Datenschutz.',
        },
        {
          ...portfolioLinks.schob,
          title: 'Diese Website',
          desc: 'Fokus auf Marketing und Struktur.',
        },
        {
          ...portfolioLinks.meetli,
          title: 'Meetli',
          desc: 'Uni-Projekt mit klarer Nutzerführung.',
        },
      ],
    },
    learn: {
      eyebrow: 'Lernbereiche',
      title: 'Was du bei mir lernst',
      intro: 'Kein Programmierstudium, kein Agentur-Budget nötig. Ich zeige dir, wie du KI-Werkzeuge so einsetzt, dass am Ende ein fertiges Ergebnis steht, passend zu deiner Branche und dem, was du wirklich brauchst.',
      items: [
        {
          title: 'Website bauen mit KI',
          desc: 'Du lernst, mit KI-Werkzeugen in kurzer Zeit deine eigene Landingpage zu bauen, von Text bis Design. Am Ende weißt du, wie du der KI die richtigen Anweisungen gibst und selbst zum fertigen Ergebnis kommst.',
        },
        {
          title: 'Prozesse automatisieren',
          desc: 'Viele Abläufe in deinem Business lassen sich automatisieren, ohne teure Software. Ich zeige dir zum Beispiel, wie du dein eigenes CRM in Excel aufbaust oder wiederkehrende Aufgaben mit KI abkürzt.',
        },
        {
          title: 'Datenanalyse mit KI',
          desc: 'Du musst kein Data Scientist sein, um deine Zahlen zu verstehen. Ich zeige dir, wie du mit KI-Werkzeugen deine Daten selbst auswertest und daraus echte Entscheidungen triffst. Bunte Tabellen allein bringen dich nicht weiter.',
        },
      ],
    },
    aiReality: {
      eyebrow: 'Ehrlich gesagt',
      title: 'Was KI kann und was noch nicht',
      intro: 'KI liefert dir in kurzer Zeit einen soliden ersten Entwurf, egal ob Text, Code oder Datenauswertung. Was sie nicht ersetzt: dein Verständnis dafür, was für dein Geschäft wirklich zählt, und die Fähigkeit, das Ergebnis kritisch zu prüfen, bevor du es nutzt. Genau diese Lücke schließen wir gemeinsam, damit die KI für dich arbeitet und du ihr nicht blind vertraust.',
      can: {
        title: 'Was die KI übernimmt',
        items: [
          'Erste Entwürfe für Text, Code und Design',
          'Schnelle Auswertung großer Datenmengen',
          'Wiederkehrende Aufgaben abkürzen',
        ],
      },
      cannot: {
        title: 'Was bei dir bleibt',
        items: [
          'Verstehen, was für dein Geschäft wirklich zählt',
          'Das Ergebnis kritisch prüfen, bevor du es nutzt',
          'Die richtigen Entscheidungen treffen',
        ],
      },
    },
    difference: {
      eyebrow: 'Warum mit mir',
      titleLine1: 'Kein Fachchinesisch,',
      titleLine2: 'sondern echtes Verstehen.',
      intro: 'Ich fange bei null an, für Menschen, die mit KI noch gar nichts am Hut haben. Und zwar nicht nur in der Theorie, sondern so, dass es am Ende auf deinem Rechner wirklich funktioniert. Der Fortschritt wartet nicht: Wer jetzt den Anschluss verpasst, läuft der Konkurrenz hinterher. Wer dranbleibt, hat auf dem Arbeitsmarkt und im eigenen Business die Nase vorn.',
      items: [
        {
          title: 'Wir starten bei null',
          desc: 'Meine Begleitung ist für Menschen gemacht, die noch keine Ahnung haben. Ich erkläre die Grundlagen verständlich, und wir sorgen gemeinsam dafür, dass alles auf deinem Rechner tatsächlich läuft, nicht nur in der Theorie.',
        },
        {
          title: 'Die richtigen Werkzeuge',
          desc: 'Ich sage dir ehrlich, welche Tools sich lohnen, welche du kostenlos nutzen kannst und wo du besser nicht sparst. Ich habe die gängigen KI-Werkzeuge selbst im Einsatz und weiß, was sich rechnet.',
        },
        {
          title: 'Datenschutz von Anfang an',
          desc: 'Was darfst du mit KI machen, und was auf keinen Fall? Dieses Thema ignorieren fast alle in der Branche, bei mir steht es im Mittelpunkt. So tappst du nicht in Fallen, die später teuer werden.',
        },
        {
          title: 'Aus echter Praxis',
          desc: 'Ich arbeite seit über fünf Jahren mit KI, habe ein Studium in dem Feld abgeschlossen und berate heute als AI Consultant acht Unternehmen. Diese Erfahrung gebe ich eins zu eins weiter, aus Deutschland für den europäischen Markt.',
        },
        {
          title: 'Auf dich zugeschnitten',
          desc: 'Ich erkläre die Grundlagen nicht allgemein, sondern passend zu deiner Branche und den Aufgaben, die du wirklich erledigen willst. So lernst du genau das, was dir etwas bringt.',
        },
      ],
    },
    testimonials: {
      eyebrow: 'Kundenstimmen',
      title: 'Was Teilnehmer sagen',
      items: [
        {
          quote: 'Ich hab nicht geglaubt, dass das an einem Tag geht. Ich hab gelernt, meine Landingpage selbst zu programmieren und zu designen, und am Ende des Tages war sie schon online, andere haben sie sogar schon gefunden. Richtig gutes Gefühl, das selbst hinbekommen zu haben.',
          author: 'Maxim, Landingpage-Projekt',
        },
        {
          quote: 'Ich hab gelernt, wie ich die Leads von meiner Website automatisch weiterverarbeite, ohne das jedes Mal manuell zu machen. Für die Texte hab ich einmal aufgeschrieben, wie ich klingen will. Seitdem trifft die KI meinen Ton einfach, ohne dass es nach KI klingt.',
          author: 'Alina, Automatisierung & Texte',
        },
      ],
    },
    packages: {
      eyebrow: 'Preise',
      badge: 'Empfehlung',
      request: 'Anfragen',
      plusVat: 'zzgl. MwSt.',
      insteadOf: 'statt',
      items: [
        {
          id: 'setup',
          name: 'Angebot 1',
          title: 'Code-Hilfe & Einrichtung',
          subtitle: 'Der richtige Start',
          price: '100',
          intro: 'Für alle, die selbst loslegen und einmal richtig eingerichtet sein wollen.',
          highlight: false,
          features: [
            'Unterstützung bei deinem Code, wenn du nicht weiterkommst.',
            'Ich erkläre dir, wie du alles von Grund auf einrichtest.',
            'Du weißt danach, welche Werkzeuge du brauchst und wie sie zusammenspielen.',
          ],
        },
        {
          id: 'guided',
          name: 'Angebot 2',
          title: 'Begleiteter Aufbau',
          subtitle: 'Gemeinsam bis online',
          price: '200',
          intro: 'Wir sitzen über längere Zeit gemeinsam dran, bis dein Entwurf steht und wirklich live ist.',
          highlight: true,
          features: [
            'Alles aus „Code-Hilfe & Einrichtung".',
            'Wir bauen gemeinsam, bis der erste Entwurf steht.',
            'Am Ende ist deine Seite deployed, online und für alle erreichbar.',
          ],
        },
        {
          id: 'privacy',
          name: 'Angebot 3',
          title: 'Datenschutz',
          subtitle: 'Rechtlich sauber',
          price: '50',
          oldPrice: '70',
          note: '50 € statt 70 € für alle Teilnehmenden von Karynas Marketingkurs.',
          intro: 'Deine Datenschutzerklärung, sauber geschrieben: das Thema, das fast alle übersehen.',
          highlight: false,
          features: [
            'Individuell geschriebene Datenschutzerklärung für deine Seite.',
            'Abgestimmt auf die Werkzeuge, die du wirklich nutzt.',
            'So bist du von Anfang an auf der sicheren Seite.',
          ],
        },
      ],
    },
    contact: {
      eyebrow: 'Anfrage senden',
      title: 'Lass uns starten.',
      successTitle: 'Danke für deine Nachricht!',
      successText: 'Ich melde mich so schnell wie möglich bei dir.',
      newRequest: 'Neue Anfrage',
      subject: 'Neue Anfrage über Schob Digital',
      name: 'Name',
      email: 'E-Mail',
      company: 'Unternehmen (optional)',
      service: 'Wobei möchtest du Unterstützung?',
      servicePlaceholder: 'Bitte auswählen',
      customService: 'Etwas anderes',
      message: 'Erzähl mir kurz, was du erreichen möchtest.',
      consentStart: 'Ich stimme zu, dass meine Angaben zur Bearbeitung meiner Anfrage verarbeitet werden. Weitere Informationen stehen in der',
      consentLink: 'Datenschutzerklärung',
      consentEnd: '.',
      submit: 'Anfrage senden',
    },
    footer: {
      rights: 'Alle Rechte vorbehalten.',
      cookieSettings: 'Cookie-Einstellungen',
    },
  },
  en: {
    metaTitle: 'Schob Digital | Learn to use AI yourself',
    nav: {
      portfolio: 'Work',
      learn: 'Topics',
      difference: 'Why me',
      packages: 'Prices',
      contact: 'Contact',
      imprint: 'Legal Notice',
      privacy: 'Privacy',
    },
    hero: {
      intro: "Hey, I'm Vasily.",
      headlineStart: 'I teach you how to make',
      highlighted: 'AI',
      headlineEnd: 'work for your business – from your own website to data analysis.',
      subline: 'From the basics to a finished result – clear, hands-on, based in Berlin.',
      cta: 'Get in touch',
      imageAlt: 'Vasily Schob from Schob Digital',
    },
    portfolio: {
      eyebrow: 'Selected work',
      intro: 'A few examples of how different the result can look – from a wedding site to an app. These are exactly the kind of sites you build yourself, with my support.',
      items: [
        {
          ...portfolioLinks.wedding,
          title: 'Wedding Service',
          desc: 'Elegant design for a wedding service.',
        },
        {
          ...portfolioLinks.dj,
          title: 'DJ Vasily',
          desc: 'A professional presence for DJ and event equipment.',
        },
        {
          ...portfolioLinks.misjudged,
          title: 'Misjudged Web',
          desc: 'Compact app website with clean data protection.',
        },
        {
          ...portfolioLinks.schob,
          title: 'This Website',
          desc: 'Focused on marketing and structure.',
        },
        {
          ...portfolioLinks.meetli,
          title: 'Meetli',
          desc: 'University project with clear user guidance.',
        },
      ],
    },
    learn: {
      eyebrow: 'Topics',
      title: 'What you learn with me',
      intro: 'No computer science degree, no agency budget. I show you how to use AI tools so that you end up with a finished result – tailored to your industry and what you actually need.',
      items: [
        {
          title: 'Build a website with AI',
          desc: 'You learn how to build your own landing page with AI tools in no time – from copy to design. In the end you know how to give the AI the right instructions to reach a finished result yourself.',
        },
        {
          title: 'Automate your processes',
          desc: 'Many parts of your business can be automated without expensive software. I show you, for example, how to build your own CRM in Excel or shorten recurring tasks with AI.',
        },
        {
          title: 'Understand data with AI',
          desc: 'You do not need to be a data scientist to understand your numbers. I show you how to analyze your data yourself with AI tools and turn it into real decisions – not just colorful tables.',
        },
      ],
    },
    aiReality: {
      eyebrow: 'Honestly',
      title: "What AI can do – and what it (still) can't",
      intro: 'AI gives you a solid first draft in no time, whether it is text, code, or data analysis. What it does not replace: your understanding of what really matters for your business, and the ability to review the result critically before you use it. That is exactly the gap we close together – so AI works for you instead of you trusting it blindly.',
      can: {
        title: 'What AI handles',
        items: [
          'First drafts for text, code, and design',
          'Fast analysis of large amounts of data',
          'Shortening repetitive tasks',
        ],
      },
      cannot: {
        title: 'What stays with you',
        items: [
          'Understanding what really matters for your business',
          'Reviewing the result critically before you use it',
          'Making the right decisions',
        ],
      },
    },
    difference: {
      eyebrow: 'Why me',
      titleLine1: 'No jargon,',
      titleLine2: 'real understanding.',
      intro: 'I start from zero – for people who have had nothing to do with AI yet. And not just in theory, but so that it actually works on your computer in the end.',
      items: [
        {
          title: 'We start from zero',
          desc: 'My guidance is made for people who have no idea yet. I explain the basics clearly, and we make sure together that everything really runs on your computer – not just grey theory.',
        },
        {
          title: 'The right tools',
          desc: 'I tell you honestly which tools are worth it, which ones you can use for free, and where you should not cut corners. I use the common AI tools myself and know what pays off.',
        },
        {
          title: 'Data protection from the start',
          desc: 'What are you allowed to do with AI, and what should you never do? Almost everyone in the field ignores this topic – with me it is front and center. So you avoid traps that get expensive later.',
        },
        {
          title: 'From real experience',
          desc: 'I have worked with AI for over five years, completed a degree in the field, and today advise eight companies as an AI consultant. You get first-hand experience – from Germany, for all of Europe.',
        },
        {
          title: 'Tailored to you',
          desc: 'I do not explain the basics in general terms, but tailored to your industry and the tasks you actually want to get done. So you learn exactly what helps you.',
        },
      ],
    },
    testimonials: {
      eyebrow: 'Testimonials',
      title: 'What participants say',
      items: [
        {
          quote: 'I did not think it could be done in a day. I learned to build and design my landing page myself, and by the end of the day it was already online – people had even found it. Great feeling to have pulled that off myself.',
          author: 'Maxim, landing page project',
        },
        {
          quote: 'I learned how to process the leads from my website automatically instead of doing it by hand every time. For the copy, I wrote down once how I want to sound – since then the AI just hits my tone, without it sounding like AI.',
          author: 'Alina, automation & copy',
        },
      ],
    },
    packages: {
      eyebrow: 'Prices',
      badge: 'Recommended',
      request: 'Request',
      plusVat: 'plus VAT',
      insteadOf: 'instead of',
      items: [
        {
          id: 'setup',
          name: 'Offer 1',
          title: 'Code help & setup',
          subtitle: 'The right start',
          price: '100',
          intro: 'For everyone who wants to get going themselves and be set up properly once.',
          highlight: false,
          features: [
            'Support with your code when you get stuck.',
            'I explain how to set everything up from scratch.',
            'Afterwards you know which tools you need and how they work together.',
          ],
        },
        {
          id: 'guided',
          name: 'Offer 2',
          title: 'Guided build',
          subtitle: "Together until it's live",
          price: '200',
          intro: 'We work on it together over a longer period – until your draft is ready and truly live.',
          highlight: true,
          features: [
            'Everything from "Code help & setup".',
            'We build together until the first draft stands.',
            'In the end your site is deployed – online and reachable for everyone.',
          ],
        },
        {
          id: 'privacy',
          name: 'Offer 3',
          title: 'Data protection',
          subtitle: 'Legally clean',
          price: '50',
          oldPrice: '70',
          note: "50 € instead of 70 € for all participants of Karyna's marketing course.",
          intro: 'Your privacy policy, written properly – the topic almost everyone overlooks.',
          highlight: false,
          features: [
            'An individually written privacy policy for your site.',
            'Matched to the tools you actually use.',
            'So you are on the safe side from the start.',
          ],
        },
      ],
    },
    contact: {
      eyebrow: 'Send a request',
      title: "Let's get started.",
      successTitle: 'Thanks for your message!',
      successText: 'I will get back to you as soon as possible.',
      newRequest: 'New request',
      subject: 'New request via Schob Digital',
      name: 'Name',
      email: 'Email',
      company: 'Company (optional)',
      service: 'What do you need support with?',
      servicePlaceholder: 'Please choose',
      customService: 'Something else',
      message: 'Tell me briefly what you want to achieve.',
      consentStart: 'I agree that my information may be processed to handle my request. More information is available in the',
      consentLink: 'privacy policy',
      consentEnd: '.',
      submit: 'Send request',
    },
    footer: {
      rights: 'All rights reserved.',
      cookieSettings: 'Cookie settings',
    },
  },
  uk: {
    metaTitle: 'Schob Digital | Навчися сам користуватися ШІ',
    nav: {
      portfolio: 'Портфоліо',
      learn: 'Напрями',
      difference: 'Чому я',
      packages: 'Ціни',
      contact: 'Контакт',
      imprint: 'Вихідні дані',
      privacy: 'Приватність',
    },
    hero: {
      intro: 'Привіт, я Василь.',
      headlineStart: 'Я навчу тебе, як змусити',
      highlighted: 'ШІ',
      headlineEnd: 'працювати на твій бізнес – від власного сайту до аналізу даних.',
      subline: 'Від основ до готового результату – зрозуміло, на практиці, з Берліна.',
      cta: 'Написати мені',
      imageAlt: 'Василь Шоб зі Schob Digital',
    },
    portfolio: {
      eyebrow: 'Портфоліо',
      intro: 'Кілька прикладів, наскільки різним може бути результат – від весільного сайту до застосунку. Саме такі сайти ти створюєш сам, за моєї підтримки.',
      items: [
        {
          ...portfolioLinks.wedding,
          title: 'Весільний сервіс',
          desc: 'Елегантний дизайн для весільного сервісу.',
        },
        {
          ...portfolioLinks.dj,
          title: 'DJ Vasily',
          desc: 'Професійна присутність для DJ та event-обладнання.',
        },
        {
          ...portfolioLinks.misjudged,
          title: 'Misjudged Web',
          desc: 'Компактний сайт застосунку з чистим захистом даних.',
        },
        {
          ...portfolioLinks.schob,
          title: 'Цей сайт',
          desc: 'Фокус на маркетингу та структурі.',
        },
        {
          ...portfolioLinks.meetli,
          title: 'Meetli',
          desc: 'Університетський проєкт зі зрозумілим шляхом користувача.',
        },
      ],
    },
    learn: {
      eyebrow: 'Напрями',
      title: 'Чого ти навчишся зі мною',
      intro: 'Без диплома програміста й без бюджету агенції. Я покажу, як користуватися інструментами ШІ так, щоб у результаті вийшов готовий продукт – під твою галузь і те, що тобі справді потрібно.',
      items: [
        {
          title: 'Створити сайт за допомогою ШІ',
          desc: 'Ти навчишся швидко створювати власну landing page за допомогою інструментів ШІ – від тексту до дизайну. Наприкінці ти знатимеш, як давати ШІ правильні вказівки, щоб самому дійти до готового результату.',
        },
        {
          title: 'Автоматизувати процеси',
          desc: 'Багато процесів у бізнесі можна автоматизувати без дорогого софту. Наприклад, я покажу, як побудувати власну CRM в Excel або скоротити рутинні завдання за допомогою ШІ.',
        },
        {
          title: 'Аналіз даних із ШІ',
          desc: 'Не треба бути data scientist, щоб розуміти свої цифри. Я покажу, як самому аналізувати дані за допомогою ШІ й ухвалювати справжні рішення – а не просто робити барвисті таблиці.',
        },
      ],
    },
    aiReality: {
      eyebrow: 'Чесно кажучи',
      title: 'Що ШІ вміє – і чого (поки) ні',
      intro: 'ШІ швидко дає тобі солідний перший чернетковий варіант – чи то текст, код, чи аналіз даних. Чого він не замінює: твого розуміння, що справді важливо для бізнесу, і вміння критично перевірити результат, перш ніж ним користуватися. Саме цю прогалину ми закриваємо разом – щоб ШІ працював на тебе, а не ти сліпо йому довіряв.',
      can: {
        title: 'Що бере на себе ШІ',
        items: [
          'Перші чернетки для тексту, коду й дизайну',
          'Швидкий аналіз великих обсягів даних',
          'Скорочення рутинних завдань',
        ],
      },
      cannot: {
        title: 'Що залишається за тобою',
        items: [
          'Розуміння, що справді важливо для твого бізнесу',
          'Критична перевірка результату перед використанням',
          'Ухвалення правильних рішень',
        ],
      },
    },
    difference: {
      eyebrow: 'Чому я',
      titleLine1: 'Без складних термінів,',
      titleLine2: 'а справжнє розуміння.',
      intro: 'Я починаю з нуля – для людей, які ще зовсім не мали справи з ШІ. І не лише в теорії, а так, щоб наприкінці все справді працювало на твоєму комп’ютері.',
      items: [
        {
          title: 'Починаємо з нуля',
          desc: 'Мій супровід створений для людей, які поки не мають жодного уявлення. Я зрозуміло пояснюю основи, і ми разом дбаємо, щоб усе справді працювало на твоєму комп’ютері – не лише суха теорія.',
        },
        {
          title: 'Правильні інструменти',
          desc: 'Я чесно кажу, які інструменти варті грошей, які можна використовувати безкоштовно і де не варто економити. Я сам користуюся поширеними інструментами ШІ й знаю, що окупається.',
        },
        {
          title: 'Захист даних із самого початку',
          desc: 'Що можна робити з ШІ, а чого не можна ніколи? Цю тему ігнорують майже всі в галузі – у мене вона в центрі. Так ти не потрапиш у пастки, які потім дорого коштують.',
        },
        {
          title: 'З реального досвіду',
          desc: 'Я працюю з ШІ понад п’ять років, здобув освіту в цій сфері й сьогодні консультую вісім компаній як AI-консультант. Ти отримуєш досвід із перших рук – з Німеччини, для всієї Європи.',
        },
        {
          title: 'Під тебе особисто',
          desc: 'Я пояснюю основи не загально, а під твою галузь і завдання, які ти справді хочеш виконувати. Тож ти вчиш саме те, що дає користь.',
        },
      ],
    },
    testimonials: {
      eyebrow: 'Відгуки',
      title: 'Що кажуть учасники',
      items: [
        {
          quote: 'Я не вірив, що це можливо за один день. Я навчився сам програмувати й дизайнити свою landing page, і наприкінці дня вона вже була онлайн – люди навіть уже її знайшли. Класне відчуття – зробити це самому.',
          author: 'Максим, проєкт landing page',
        },
        {
          quote: 'Я навчився автоматично опрацьовувати ліди зі свого сайту, замість робити це щоразу вручну. Для текстів я один раз записав, як хочу звучати – відтоді ШІ просто влучає в мій тон, і це не звучить як ШІ.',
          author: 'Аліна, автоматизація й тексти',
        },
      ],
    },
    packages: {
      eyebrow: 'Ціни',
      badge: 'Рекомендація',
      request: 'Запит',
      plusVat: '+ ПДВ',
      insteadOf: 'замість',
      items: [
        {
          id: 'setup',
          name: 'Пропозиція 1',
          title: 'Допомога з кодом і налаштування',
          subtitle: 'Правильний старт',
          price: '100',
          intro: 'Для всіх, хто хоче почати сам і один раз усе правильно налаштувати.',
          highlight: false,
          features: [
            'Підтримка з твоїм кодом, коли ти застряг.',
            'Я поясню, як усе налаштувати з нуля.',
            'Після цього ти знаєш, які інструменти потрібні й як вони працюють разом.',
          ],
        },
        {
          id: 'guided',
          name: 'Пропозиція 2',
          title: 'Супроводжуваний запуск',
          subtitle: 'Разом до публікації',
          price: '200',
          intro: 'Ми працюємо разом протягом довшого часу – доки твій чернетковий варіант не готовий і справді онлайн.',
          highlight: true,
          features: [
            'Усе з «Допомоги з кодом і налаштування».',
            'Ми будуємо разом, доки не з’явиться перший робочий варіант.',
            'Наприкінці твій сайт deployed – онлайн і доступний для всіх.',
          ],
        },
        {
          id: 'privacy',
          name: 'Пропозиція 3',
          title: 'Захист даних',
          subtitle: 'Юридично чисто',
          price: '50',
          oldPrice: '70',
          note: '50 € замість 70 € для всіх учасників маркетингового курсу Карини.',
          intro: 'Твоя політика конфіденційності, написана як слід – тема, яку майже всі оминають.',
          highlight: false,
          features: [
            'Індивідуально написана політика конфіденційності для твого сайту.',
            'Узгоджена з інструментами, якими ти справді користуєшся.',
            'Так ти в безпеці із самого початку.',
          ],
        },
      ],
    },
    contact: {
      eyebrow: 'Надіслати запит',
      title: 'Почнімо.',
      successTitle: 'Дякую за повідомлення!',
      successText: 'Я відповім якнайшвидше.',
      newRequest: 'Новий запит',
      subject: 'Новий запит через Schob Digital',
      name: 'Ім’я',
      email: 'Email',
      company: 'Компанія (необов’язково)',
      service: 'З чим тобі потрібна допомога?',
      servicePlaceholder: 'Оберіть варіант',
      customService: 'Щось інше',
      message: 'Розкажи коротко, чого хочеш досягти.',
      consentStart: 'Я погоджуюся, що мої дані можуть оброблятися для відповіді на мій запит. Більше інформації міститься в',
      consentLink: 'політиці конфіденційності',
      consentEnd: '.',
      submit: 'Надіслати запит',
    },
    footer: {
      rights: 'Усі права захищено.',
      cookieSettings: 'Налаштування cookie',
    },
  },
} as const;
