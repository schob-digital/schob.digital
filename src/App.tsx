import { useEffect, useState } from 'react';
import './index.css';
import { DatenschutzDE } from './DatenschutzDE';
import { DatenschutzEN } from './DatenschutzEN';
import { DatenschutzUK } from './DatenschutzUK';
import { Footer, HomePage, Navigation } from './HomePage';
import { ImpressumDE } from './ImpressumDE';
import { ImpressumEN } from './ImpressumEN';
import { ImpressumUK } from './ImpressumUK';
import { type Language, siteContent } from './siteContent';

type Page = 'home' | 'impressum' | 'datenschutz';

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

function getInitialLanguage(): Language {
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

function getPageFromHash(): Page {
  if (typeof window === 'undefined') {
    return 'home';
  }

  const hash = window.location.hash.replace('#', '');
  if (hash === 'impressum' || hash === 'datenschutz') {
    return hash;
  }

  return 'home';
}

export default function App() {
  const [currentPage, setCurrentPage] = useState<Page>(() => getPageFromHash());
  const [language, setLanguage] = useState<Language>(() => getInitialLanguage());

  useEffect(() => {
    const handleHashChange = () => {
      const nextPage = getPageFromHash();
      const hash = window.location.hash.replace('#', '');

      setCurrentPage(nextPage);

      if (nextPage !== 'home') {
        window.scrollTo(0, 0);
        return;
      }

      if (!hash || hash === 'home') {
        window.scrollTo(0, 0);
        return;
      }

      window.requestAnimationFrame(() => {
        document.getElementById(hash)?.scrollIntoView({ block: 'start' });
      });
    };

    window.addEventListener('hashchange', handleHashChange);
    handleHashChange();
    return () => window.removeEventListener('hashchange', handleHashChange);
  }, []);

  useEffect(() => {
    document.documentElement.lang = language;
    document.title = siteContent[language].metaTitle;
    try {
      window.localStorage.setItem(LANGUAGE_STORAGE_KEY, language);
    } catch {
      // Language still switches even if browser storage is unavailable.
    }
    window.dispatchEvent(new CustomEvent('schob-language-change', { detail: { language } }));
  }, [language]);

  useEffect(() => {
    if (currentPage !== 'home') {
      return;
    }

    const hash = window.location.hash.replace('#', '');
    if (!hash || hash === 'home') {
      return;
    }

    window.requestAnimationFrame(() => {
      document.getElementById(hash)?.scrollIntoView({ block: 'start' });
    });
  }, [currentPage]);

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
      <Navigation language={language} setLanguage={setLanguage} setCurrentPage={setCurrentPage} />
      <main className="pt-[80px] bg-[#0B1221] min-h-screen">
        {currentPage === 'home' ? (
          <HomePage language={language} setLanguage={setLanguage} setCurrentPage={setCurrentPage} />
        ) : (
          legalPages[currentPage][language]
        )}
      </main>
      <Footer language={language} />
    </div>
  );
}
