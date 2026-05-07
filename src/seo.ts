import type { Language } from './siteContent';
import { getCanonicalUrl, type Page } from './routing';

type SeoEntry = {
  description: string;
  title: string;
};

const seoContent: Record<Language, Record<Page, SeoEntry>> = {
  de: {
    home: {
      title: 'Schob Digital | Websites in einem Tag',
      description:
        'Schob Digital erstellt moderne Websites fuer Unternehmen mit Fokus auf Webdesign, Entwicklung, Conversion und einen schnellen Go-live.',
    },
    impressum: {
      title: 'Impressum | Schob Digital',
      description: 'Impressum und Anbieterkennzeichnung von Schob Digital.',
    },
    datenschutz: {
      title: 'Datenschutz | Schob Digital',
      description: 'Datenschutzhinweise und Informationen zur Datenverarbeitung bei Schob Digital.',
    },
  },
  en: {
    home: {
      title: 'Schob Digital | Websites in one day',
      description:
        'Schob Digital builds modern business websites with a focus on web design, development, conversion and a fast go-live.',
    },
    impressum: {
      title: 'Legal Notice | Schob Digital',
      description: 'Legal notice and provider information for Schob Digital.',
    },
    datenschutz: {
      title: 'Privacy Policy | Schob Digital',
      description: 'Privacy policy and data-processing information for Schob Digital.',
    },
  },
  uk: {
    home: {
      title: 'Schob Digital | Сайти за один день',
      description:
        'Schob Digital створює сучасні бізнес-сайти з фокусом на дизайн, розробку, конверсію та швидкий запуск.',
    },
    impressum: {
      title: 'Правова інформація | Schob Digital',
      description: 'Правова інформація та відомості про постачальника послуг Schob Digital.',
    },
    datenschutz: {
      title: 'Політика конфіденційності | Schob Digital',
      description: 'Політика конфіденційності та інформація про обробку даних у Schob Digital.',
    },
  },
};

type PageSeo = SeoEntry & {
  canonicalUrl: string;
};

function upsertMetaTag(selector: string, attributes: Record<string, string>) {
  let element = document.head.querySelector<HTMLMetaElement>(selector);
  if (!element) {
    element = document.createElement('meta');
    document.head.appendChild(element);
  }

  Object.entries(attributes).forEach(([name, value]) => {
    element.setAttribute(name, value);
  });
}

function upsertLinkTag(selector: string, attributes: Record<string, string>) {
  let element = document.head.querySelector<HTMLLinkElement>(selector);
  if (!element) {
    element = document.createElement('link');
    document.head.appendChild(element);
  }

  Object.entries(attributes).forEach(([name, value]) => {
    element.setAttribute(name, value);
  });
}

export function getPageSeo(page: Page, language: Language): PageSeo {
  const content = seoContent[language][page];

  return {
    ...content,
    canonicalUrl: getCanonicalUrl(page),
  };
}

export function applyPageSeo(page: Page, language: Language) {
  if (typeof document === 'undefined') {
    return;
  }

  const seo = getPageSeo(page, language);

  document.documentElement.lang = language;
  document.title = seo.title;

  upsertMetaTag('meta[name="description"]', {
    name: 'description',
    content: seo.description,
  });
  upsertMetaTag('meta[property="og:type"]', {
    property: 'og:type',
    content: 'website',
  });
  upsertMetaTag('meta[property="og:title"]', {
    property: 'og:title',
    content: seo.title,
  });
  upsertMetaTag('meta[property="og:description"]', {
    property: 'og:description',
    content: seo.description,
  });
  upsertMetaTag('meta[property="og:url"]', {
    property: 'og:url',
    content: seo.canonicalUrl,
  });
  upsertMetaTag('meta[name="twitter:card"]', {
    name: 'twitter:card',
    content: 'summary',
  });
  upsertMetaTag('meta[name="twitter:title"]', {
    name: 'twitter:title',
    content: seo.title,
  });
  upsertMetaTag('meta[name="twitter:description"]', {
    name: 'twitter:description',
    content: seo.description,
  });
  upsertLinkTag('link[rel="canonical"]', {
    rel: 'canonical',
    href: seo.canonicalUrl,
  });
}
