import { type Language, languageOptions } from './siteContent';

interface LanguageSwitcherProps {
  language: Language;
  setLanguage: (lang: Language) => void;
}

export function LanguageSwitcher({ language, setLanguage }: LanguageSwitcherProps) {
  return (
    <div className="flex gap-1 items-center bg-[#1a1a1a]/40 backdrop-blur-md rounded-full p-1 border border-white/10 z-[100] group-hover:border-[#1a1a1a]/10">
      {languageOptions.map(({ code, label, name }) => (
        <button
          key={code}
          type="button"
          onClick={() => setLanguage(code)}
          aria-label={name}
          aria-pressed={language === code}
          title={name}
          className={`px-3 py-1 rounded-full text-[12px] font-bold uppercase tracking-[1px] transition-colors ${
            language === code
              ? 'bg-white text-[#1a1a1a] group-hover:bg-[#1a1a1a] group-hover:text-white'
              : 'text-white/70 hover:text-white group-hover:text-[#1a1a1a]/60 group-hover:hover:text-[#1a1a1a]'
          }`}
        >
          {label}
        </button>
      ))}
    </div>
  );
}
