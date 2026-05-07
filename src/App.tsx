import { useEffect, useState } from 'react';
import { DatenschutzDE } from './DatenschutzDE';
import { DatenschutzEN } from './DatenschutzEN';
import { DatenschutzUK } from './DatenschutzUK';
import { Footer, HomePage, Navigation } from './HomePage';
import { ImpressumDE } from './ImpressumDE';
import { ImpressumEN } from './ImpressumEN';
import { ImpressumUK } from './ImpressumUK';
import { getPageFromPathname } from './routing';
import { applyPageSeo } from './seo';
import { type Language } from './siteContent';

const LANGUAGE_STORAGE_KEY = 'schob_language';

function isLanguage(value: string | null): value is Language {
  return value === 'de' || value === 'en' || value === 'uk';
}

function getSavedLanguage(): string | null {
  try {
    return window.localStorage.getItem(LANGUAGE_STORAGE_KEY);
  } catch {
    return null;
  }
}

function getPreferredLanguage(): Language {
  if (typeof window === 'undefined') {
    return 'de';
  }

  const savedLanguage = getSavedLanguage();
  if (isLanguage(savedLanguage)) {
    return savedLanguage;
  }

  const browserLanguage = window.navigator.language.slice(0, 2);
  return isLanguage(browserLanguage) ? browserLanguage : 'de';
}

function getCurrentPathname() {
  if (typeof window === 'undefined') {
    return '/';
  }

  return window.location.pathname;
}

type AppProps = {
  initialPathname?: string;
};

export default function App({ initialPathname }: AppProps) {
  const currentPage = getPageFromPathname(initialPathname ?? getCurrentPathname());
  const [language, setLanguage] = useState<Language>('de');

  useEffect(() => {
    const preferredLanguage = getPreferredLanguage();
    setLanguage((currentLanguage) => (currentLanguage === preferredLanguage ? currentLanguage : preferredLanguage));
  }, []);

  useEffect(() => {
    const scrollToHash = () => {
      const hash = window.location.hash.replace(/^#/, '');
      if (!hash) {
        return;
      }

      window.requestAnimationFrame(() => {
        document.getElementById(hash)?.scrollIntoView({ block: 'start' });
      });
    };

    scrollToHash();
    window.addEventListener('hashchange', scrollToHash);
    return () => window.removeEventListener('hashchange', scrollToHash);
  }, [currentPage]);

  useEffect(() => {
    applyPageSeo(currentPage, language);
    try {
      window.localStorage.setItem(LANGUAGE_STORAGE_KEY, language);
    } catch {
      // Language still switches even if browser storage is unavailable.
    }
    window.dispatchEvent(new CustomEvent('schob-language-change', { detail: { language } }));
  }, [currentPage, language]);

  const legalPages = {
    impressum: {
      de: <ImpressumDE />,
      en: <ImpressumEN />,
      uk: <ImpressumUK />,
    },
    datenschutz: {
      de: <DatenschutzDE />,
      en: <DatenschutzEN />,
      uk: <DatenschutzUK />,
    },
  };

  return (
    <div className="min-h-screen bg-[#f9f9f9] text-[#1a1a1a] font-sans">
      <Navigation language={language} setLanguage={setLanguage} />
      <main className="pt-[80px] bg-[#0B1221] min-h-screen">
        {currentPage === 'home' ? (
          <HomePage language={language} setLanguage={setLanguage} />
        ) : (
          legalPages[currentPage][language]
        )}
      </main>
      <Footer language={language} />
    </div>
  );
}
