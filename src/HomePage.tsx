import { useRef, useState } from 'react';
import { motion, useScroll, useTransform, AnimatePresence } from 'motion/react';
import { ArrowRight, CheckCircle2, Menu, X } from 'lucide-react';
import { LanguageSwitcher } from './LanguageSwitcher';
import { getPageHref, getSectionHref } from './routing';
import { type Language, siteContent } from './siteContent';

export type HomePageProps = {
  language: Language;
  setLanguage: (language: Language) => void;
};

type SiteCopy = (typeof siteContent)[Language];
type PackageId = SiteCopy['packages']['items'][number]['id'];

const navLinkClass =
  'text-[10px] xl:text-[12px] uppercase tracking-[1px] font-semibold text-white group-hover:text-[#1a1a1a]/80 hover:!opacity-70 transition-colors whitespace-nowrap';

type NavigationProps = HomePageProps;

export function Navigation({ language, setLanguage }: NavigationProps) {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const t = siteContent[language];
  const homeHref = getPageHref('home');
  const impressumHref = getPageHref('impressum');
  const datenschutzHref = getPageHref('datenschutz');

  const setLanguageAndClose = (nextLanguage: Language) => {
    setLanguage(nextLanguage);
    setIsMobileMenuOpen(false);
  };

  const closeMenu = () => {
    setIsMobileMenuOpen(false);
  };

  const sectionLinks = [
    { href: getSectionHref('portfolio'), label: t.nav.portfolio },
    { href: getSectionHref('learn'), label: t.nav.learn },
    { href: getSectionHref('difference'), label: t.nav.difference },
    { href: getSectionHref('packages'), label: t.nav.packages },
    { href: getSectionHref('contact'), label: t.nav.contact },
  ];

  return (
    <nav className="group fixed top-0 inset-x-0 z-50 flex items-center justify-center h-[80px] bg-[#0B1221] hover:bg-white transition-colors duration-300 border-b border-transparent hover:border-[#eee]">
      <div className="w-full px-6 md:px-10 xl:px-14 flex items-center justify-between gap-4 h-full relative">
        <div className="absolute inset-0 pointer-events-none flex items-center justify-center lg:static lg:flex-shrink-0 lg:justify-start lg:inset-auto lg:h-auto">
          <a
            href={homeHref}
            onClick={closeMenu}
            className="pointer-events-auto flex-shrink-0 font-serif text-[18px] md:text-[22px] font-bold tracking-[-0.5px] uppercase group-hover:text-[#1a1a1a] transition-colors whitespace-nowrap relative z-[60] text-[#DCC99E]"
          >
            Schob Digital
          </a>
        </div>

        <div className="hidden lg:flex flex-1 justify-center gap-3 xl:gap-7 items-center px-4">
          {sectionLinks.map((link) => (
            <a key={link.href} href={link.href} onClick={closeMenu} className={navLinkClass}>
              {link.label}
            </a>
          ))}
          <LanguageSwitcher language={language} setLanguage={setLanguageAndClose} />
        </div>

        <div className="hidden lg:flex flex-shrink-0 gap-3 xl:gap-6 items-center justify-end">
          <a href={impressumHref} onClick={closeMenu} className={navLinkClass}>
            {t.nav.imprint}
          </a>
          <a href={datenschutzHref} onClick={closeMenu} className={navLinkClass}>
            {t.nav.privacy}
          </a>
        </div>

        <div className="w-full flex justify-end lg:hidden">
          <button
            type="button"
            aria-label="Menu"
            aria-expanded={isMobileMenuOpen}
            className="relative z-[70] group-hover:text-[#1a1a1a] transition-colors"
            style={{ color: isMobileMenuOpen ? '#fff' : 'inherit' }}
            onClick={() => setIsMobileMenuOpen((isOpen) => !isOpen)}
          >
            {isMobileMenuOpen ? <X className="w-7 h-7" /> : <Menu className="w-7 h-7 text-white group-hover:text-[#1a1a1a]" />}
          </button>
        </div>
      </div>

      <AnimatePresence>
        {isMobileMenuOpen && (
          <>
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.3 }}
              className="fixed inset-0 bg-black/20 z-[50] lg:hidden"
              onClick={() => setIsMobileMenuOpen(false)}
            />
            <motion.div
              initial={{ x: '100%' }}
              animate={{ x: 0 }}
              exit={{ x: '100%' }}
              transition={{ duration: 0.4, ease: [0.16, 1, 0.3, 1] }}
              className="fixed top-0 right-0 h-screen w-[78%] sm:w-[50%] bg-[#0B1221]/90 backdrop-blur-xl shadow-xl flex flex-col pt-[100px] px-6 z-[60] lg:hidden"
            >
              <div className="pb-5 border-b border-white/10">
                <LanguageSwitcher language={language} setLanguage={setLanguageAndClose} />
              </div>
              {sectionLinks.map((link) => (
                <a
                  key={link.href}
                  href={link.href}
                  onClick={closeMenu}
                  className="py-4 text-[14px] uppercase tracking-[2px] font-bold text-white hover:text-[#DCC99E] transition-colors border-b border-white/10"
                >
                  {link.label}
                </a>
              ))}
              <a
                href={impressumHref}
                onClick={closeMenu}
                className="py-4 text-[14px] uppercase tracking-[2px] font-bold text-white hover:text-white transition-colors border-b border-white/10"
              >
                {t.nav.imprint}
              </a>
              <a
                href={datenschutzHref}
                onClick={closeMenu}
                className="py-4 text-[14px] uppercase tracking-[2px] font-bold text-white hover:text-white transition-colors"
              >
                {t.nav.privacy}
              </a>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </nav>
  );
}

function LearnSection({ copy }: { copy: SiteCopy['learn'] }) {
  return (
    <section className="bg-[#f9f9f9] py-24 md:py-32 border-t border-[#eee]" id="learn">
      <div className="w-full px-6 md:px-14">
        <div className="max-w-4xl mb-16">
          <div className="text-[16px] md:text-[20px] uppercase tracking-[3px] font-bold mb-6 text-[#DCC99E]">
            {copy.eyebrow}
          </div>
          <h2 className="font-serif text-[40px] md:text-[60px] font-bold leading-[1.1] mb-8 text-[#1a1a1a]">
            {copy.title}
          </h2>
          <p className="text-[#1a1a1a] leading-[1.7] text-[18px] md:text-[24px]">{copy.intro}</p>
        </div>

        <div className="grid md:grid-cols-3 gap-6 md:gap-8">
          {copy.items.map((item, idx) => (
            <div key={item.title} className="bg-white border border-[#eee] p-8 md:p-10 flex flex-col">
              <div className="font-serif text-[28px] text-[#DCC99E] mb-4">0{idx + 1}</div>
              <h3 className="font-serif text-[26px] leading-[1.3] font-bold mb-4 min-h-[68px] text-[#1a1a1a]">{item.title}</h3>
              <p className="text-[17px] leading-[1.6] text-[#555]">{item.desc}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

function AiRealitySection({ copy }: { copy: SiteCopy['aiReality'] }) {
  return (
    <section className="bg-[#0B1221] py-24 md:py-32 border-t border-white/5 relative overflow-hidden">
      <div className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 w-[80%] max-w-[900px] h-[70%] rounded-full bg-[#00D4FF] opacity-10 blur-[120px] pointer-events-none z-0" />
      <div className="w-full px-6 md:px-14 relative z-10">
        <div className="max-w-4xl mb-16">
          <div className="text-[16px] md:text-[20px] uppercase tracking-[3px] font-bold mb-6 text-[#DCC99E]">
            {copy.eyebrow}
          </div>
          <h2 className="font-serif text-[40px] md:text-[60px] font-bold leading-[1.1] mb-8 text-white">
            {copy.title}
          </h2>
          <p className="text-white leading-[1.7] text-[18px] md:text-[24px]">{copy.intro}</p>
        </div>

        <div className="grid md:grid-cols-2 gap-6 md:gap-10 max-w-5xl">
          <div className="bg-white/5 border border-white/10 p-8 md:p-10">
            <h3 className="font-serif text-[24px] font-bold mb-6 text-white">{copy.can.title}</h3>
            <ul className="space-y-4">
              {copy.can.items.map((item) => (
                <li key={item} className="flex gap-3 text-[17px] text-white items-start min-h-[52px]">
                  <CheckCircle2 className="w-[20px] h-[20px] text-[#DCC99E] flex-shrink-0 mt-[3px]" />
                  <span className="leading-[1.5]">{item}</span>
                </li>
              ))}
            </ul>
          </div>
          <div className="bg-white/5 border border-white/10 p-8 md:p-10">
            <h3 className="font-serif text-[24px] font-bold mb-6 text-white">{copy.cannot.title}</h3>
            <ul className="space-y-4">
              {copy.cannot.items.map((item) => (
                <li key={item} className="flex gap-3 text-[17px] text-white items-start min-h-[52px]">
                  <X className="w-[20px] h-[20px] text-white flex-shrink-0 mt-[3px]" />
                  <span className="leading-[1.5]">{item}</span>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>
    </section>
  );
}

function DifferenceSection({ copy }: { copy: SiteCopy['difference'] }) {
  const containerRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ['start center', 'end center'],
  });

  const lineHeight = useTransform(scrollYProgress, [0, 1], ['0%', '100%']);

  return (
    <section className="bg-white py-24 md:py-32 border-t border-[#eee]" id="difference">
      <div className="w-full px-6 md:px-14 flex flex-col gap-20 md:gap-32">
        <div className="max-w-4xl text-left">
          <div className="text-[16px] md:text-[20px] uppercase tracking-[3px] font-bold mb-6 text-[#DCC99E]">
            {copy.eyebrow}
          </div>
          <h2 className="font-serif text-[40px] md:text-[60px] font-bold leading-[1.1] mb-8 text-[#1a1a1a]">
            {copy.titleLine1} <br />
            {copy.titleLine2}
          </h2>
          <p className="text-[#1a1a1a] leading-[1.7] text-[18px] md:text-[24px]">{copy.intro}</p>
        </div>

        <div className="w-full relative" ref={containerRef}>
          <div className="absolute top-0 bottom-0 left-[23px] md:left-[59px] w-[2px] bg-[#eee]" />
          <motion.div
            className="absolute top-0 left-[23px] md:left-[59px] w-[2px] md:w-[4px] md:-ml-[1px] bg-[#DCC99E] origin-top z-[1]"
            style={{ height: lineHeight }}
          />

          <div className="flex flex-col gap-16 md:gap-28 relative z-10 pb-10">
            {copy.items.map((diff, idx) => (
              <div key={diff.title} className="flex gap-8 md:gap-16 items-start">
                <div className="flex-shrink-0 w-12 h-12 md:w-[120px] md:h-[120px] rounded-full border border-[#eee] bg-white flex items-center justify-center font-serif text-[24px] md:text-[40px] relative z-10">
                  <motion.div
                    className="absolute inset-x-0 inset-y-0 rounded-full border-2 md:border-[3px] border-[#DCC99E]"
                    initial={{ opacity: 0 }}
                    whileInView={{ opacity: 1 }}
                    viewport={{ margin: '-50% 0px -50% 0px' }}
                    transition={{ duration: 0.2 }}
                  />
                  {idx + 1}
                </div>
                <div className="pt-1 md:pt-6 w-full">
                  <h3 className="font-serif text-[26px] md:text-[42px] font-bold mb-4 md:mb-6 text-[#1a1a1a]">
                    {diff.title}
                  </h3>
                  <p className="text-[#1a1a1a] leading-[1.7] text-[17px] md:text-[22px] max-w-4xl">{diff.desc}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

function TestimonialsSection({ copy }: { copy: SiteCopy['testimonials'] }) {
  return (
    <section className="bg-[#f9f9f9] py-24 md:py-32 border-t border-[#eee]" id="testimonials">
      <div className="w-full px-6 md:px-14">
        <div className="mb-12 text-[16px] md:text-[20px] uppercase tracking-[3px] font-bold text-[#DCC99E]">
          {copy.eyebrow}
        </div>
        <h2 className="font-serif text-[40px] md:text-[60px] font-bold leading-[1.1] mb-16 text-[#1a1a1a] max-w-4xl">
          {copy.title}
        </h2>

        <div className="grid md:grid-cols-2 gap-6 md:gap-10 max-w-6xl">
          {copy.items.map((item) => (
            <figure key={item.author} className="bg-white border border-[#eee] p-8 md:p-12 flex flex-col">
              <div className="font-serif text-[60px] leading-none text-[#DCC99E] mb-4">“</div>
              <blockquote className="text-[19px] md:text-[22px] leading-[1.6] text-[#1a1a1a] mb-8 flex-1">
                {item.quote}
              </blockquote>
              <figcaption className="text-[16px] uppercase tracking-[1px] font-bold text-[#666]">
                {item.author}
              </figcaption>
            </figure>
          ))}
        </div>
      </div>
    </section>
  );
}

export function HomePage({ language }: HomePageProps) {
  const t = siteContent[language];
  const [selectedService, setSelectedService] = useState<PackageId | 'custom' | ''>('');
  const [formStatus, setFormStatus] = useState<'idle' | 'success'>('idle');
  const contactHref = getSectionHref('contact');
  const datenschutzHref = getPageHref('datenschutz');

  const selectedPackage = t.packages.items.find((pkg) => pkg.id === selectedService);
  const formatPackageLabel = (title: string, price: string) => `${title} ${price}€`;
  const selectedServiceLabel =
    selectedService === 'custom'
      ? t.contact.customService
      : selectedPackage
        ? formatPackageLabel(selectedPackage.title, selectedPackage.price)
        : '';

  return (
    <div>
      <section className="relative min-h-screen pt-[100px] pb-0 md:py-0 flex flex-col md:flex-row items-start md:items-center overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-r from-[#0B1221] via-[#0B1221]/80 to-transparent z-0" />
        <div className="absolute left-1/2 -translate-x-1/2 md:left-auto md:translate-x-0 md:-right-[5%] bottom-[5%] md:bottom-[8%] w-[85%] md:w-[50%] h-[72%] md:h-[75%] rounded-full bg-[#00D4FF] opacity-20 blur-[100px] md:blur-[140px] pointer-events-none z-[5]" />

        <div className="relative z-20 w-full px-6 md:px-14 flex flex-col justify-start md:justify-center order-1 md:order-none mt-2 md:mt-0 flex-grow md:flex-grow-0">
          <div className="w-full md:mt-[-5%] pt-4 md:pt-0">
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, ease: 'easeOut' }}
              className="md:w-[70%] lg:w-[60%]"
            >
              <p className="text-[30px] sm:text-[40px] md:text-[53px] lg:text-[68px] font-bold text-white mb-5 md:mb-8 leading-none tracking-tight">
                {t.hero.intro}
              </p>
              <h1 className="text-white text-[30px] sm:text-[40px] md:text-[53px] lg:text-[68px] font-bold leading-[1.1] tracking-tight m-0 mb-8 md:mb-12 drop-shadow-lg relative z-20">
                {t.hero.headlineStart} <span className="text-[#DCC99E]">{t.hero.highlighted}</span> {t.hero.headlineEnd}
              </h1>
              <p className="text-[#DCC99E] text-[17px] md:text-[19px] mb-10 md:mb-16 font-light">{t.hero.subline}</p>
              <div className="flex flex-wrap items-center gap-4">
                <a
                  href={contactHref}
                  className="px-8 py-4 bg-white text-[#111] uppercase text-[15px] font-bold tracking-[1px] rounded-none hover:bg-[#f0f0f0] transition-colors flex items-center justify-center gap-2 w-full sm:w-auto"
                >
                  {t.hero.cta} <ArrowRight className="w-5 h-5" />
                </a>
              </div>
            </motion.div>
          </div>
        </div>

        <div className="relative z-10 w-full mt-auto md:mt-0 pt-12 md:pt-0 flex justify-center items-end order-2 md:order-none md:absolute md:inset-y-0 md:right-0 md:w-[50%] md:justify-end border-b-0">
          <img
            src="https://raw.githubusercontent.com/VasilyGenAI/Website_me/main/Photos/first_image.png"
            alt={t.hero.imageAlt}
            className="w-[90%] sm:w-[70%] md:w-auto h-auto md:h-[84%] object-contain object-bottom md:object-right-bottom relative z-10 scale-[1.05] md:scale-[1.1] transform origin-bottom"
          />
        </div>
      </section>

      <section className="flex flex-col bg-[#0B1221] pt-24 overflow-hidden relative" id="portfolio">
        <div className="absolute inset-0 z-0 flex justify-end items-end pointer-events-none">
          <div className="absolute inset-0 bg-gradient-to-r from-[#0B1221] via-[#0B1221]/80 to-[#0B1221] z-0" />
          <div className="absolute left-1/2 -translate-x-1/2 md:left-auto md:translate-x-0 md:-right-[5%] bottom-[5%] md:bottom-[8%] w-[85%] md:w-[50%] h-[72%] md:h-[75%] rounded-full bg-[#00D4FF] opacity-10 blur-[100px] md:blur-[140px] pointer-events-none z-[5]" />
        </div>
        <div className="relative z-10 w-full px-6 md:px-14 mb-12">
          <div className="flex justify-between items-center text-[16px] md:text-[20px] uppercase tracking-[3px] font-bold text-[#DCC99E] mb-6">
            <span>{t.portfolio.eyebrow}</span>
          </div>
          <p className="text-white leading-[1.7] text-[18px] md:text-[22px] max-w-3xl">{t.portfolio.intro}</p>
        </div>

        <div className="relative z-10 w-full grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3">
          {t.portfolio.items.map((item) => (
            <a
              key={item.title}
              href={item.link}
              target="_blank"
              rel="noopener noreferrer"
              className="group relative aspect-square md:aspect-[4/5] overflow-hidden block"
            >
              <div className="absolute inset-0 bg-black/20 group-hover:bg-transparent transition-colors duration-500 z-10" />
              <div className="absolute inset-x-0 bottom-0 h-1/2 bg-gradient-to-t from-[#0B1221]/90 via-[#0B1221]/50 to-transparent z-10" />
              <img
                src={item.image}
                alt={item.title}
                className={`w-full h-full transition-transform duration-700 group-hover:scale-105 relative z-0 ${
                  'contain' in item && item.contain ? 'object-contain bg-[#0B1221] p-10' : 'object-cover'
                }`}
              />
              <div className="absolute bottom-0 inset-x-0 p-8 z-20 flex flex-col items-center text-center">
                <h3 className="font-bold text-[24px] md:text-[28px] text-white mb-2 transform transition-transform duration-500 group-hover:-translate-y-2">
                  {item.title}
                </h3>
                <p className="text-[15px] md:text-[18px] text-white transform transition-transform duration-500 group-hover:-translate-y-2 delay-75">
                  {item.desc}
                </p>
              </div>
            </a>
          ))}
        </div>
      </section>

      <LearnSection copy={t.learn} />

      <AiRealitySection copy={t.aiReality} />

      <DifferenceSection copy={t.difference} />

      <TestimonialsSection copy={t.testimonials} />

      <section className="bg-white border-t border-[#eee] py-24" id="packages">
        <div className="w-full px-6 md:px-14">
          <div className="mb-12 flex justify-between items-center text-[16px] md:text-[20px] uppercase tracking-[3px] font-bold text-[#DCC99E]">
            <span>{t.packages.eyebrow}</span>
          </div>

          <div className="grid md:grid-cols-3 bg-white border-y border-[#eee]">
            {t.packages.items.map((pkg) => (
              <div
                key={pkg.id}
                className={`relative p-8 md:p-10 flex flex-col border-b border-[#eee] md:border-b-0 md:border-r last:border-0 ${
                  pkg.highlight ? 'bg-[#f9f9f9]' : 'bg-white'
                }`}
              >
                {pkg.highlight && (
                  <div className="absolute top-4 right-4 bg-[#1a1a1a] text-white text-[9px] font-bold px-2 py-1 uppercase tracking-[1px]">
                    {t.packages.badge}
                  </div>
                )}

                <div className="flex-1 relative z-10">
                  <div className="text-[15px] opacity-40 mb-2 uppercase tracking-[1px] font-bold">{pkg.name}</div>
                  <h3 className="font-serif text-[28px] font-bold mb-1">{pkg.title}</h3>
                  <div className="text-[18px] font-semibold text-[#1a1a1a] mb-6 min-h-[40px] leading-[1.4]">{pkg.subtitle}</div>
                  <div className="mb-6 flex items-baseline gap-2 border-b border-[#eee] pb-4">
                    {'oldPrice' in pkg && pkg.oldPrice && (
                      <span className="text-[22px] font-bold text-[#b0b0b0] line-through">{pkg.oldPrice} €</span>
                    )}
                    <span className="text-[35px] font-bold">{pkg.price} €</span>
                    <span className="text-[15px] uppercase tracking-[1px] opacity-60">{t.packages.plusVat}</span>
                  </div>
                  <p className="text-[18px] leading-[1.5] text-[#666] mb-8 min-h-[50px]">{pkg.intro}</p>
                  <ul className="space-y-4 mb-8">
                    {pkg.features.map((feature) => (
                      <li key={feature} className="flex gap-3 text-[18px] text-[#444] items-start">
                        <CheckCircle2 className="w-[18px] h-[18px] text-[#1a1a1a] flex-shrink-0 mt-[4px]" />
                        <span className="leading-[1.5]">{feature}</span>
                      </li>
                    ))}
                  </ul>
                  {'note' in pkg && pkg.note && (
                    <p className="text-[15px] leading-[1.5] text-[#1a1a1a] bg-[#f4ecd8] border border-[#DCC99E] px-4 py-3 mb-8">
                      {pkg.note}
                    </p>
                  )}
                </div>
                <a
                  href={contactHref}
                  onClick={() => setSelectedService(pkg.id)}
                  className={`w-full py-3 mt-auto text-center font-bold text-[16px] uppercase tracking-[1px] transition-colors border ${
                    pkg.highlight
                      ? 'bg-[#1a1a1a] text-white border-[#1a1a1a] hover:bg-[#333]'
                      : 'bg-transparent text-[#1a1a1a] border-[#1a1a1a] hover:bg-[#f0f0f0]'
                  }`}
                >
                  {t.packages.request}
                </a>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section id="contact" className="bg-[#0B1221] py-24 relative overflow-hidden border-t border-white/5">
        <div className="absolute inset-0 bg-gradient-to-r from-[#0B1221] via-[#0B1221]/80 to-[#0B1221] z-0" />
        <div className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 w-[80%] max-w-[800px] h-[80%] rounded-full bg-[#00D4FF] opacity-10 blur-[100px] md:blur-[140px] pointer-events-none z-[0]" />

        <div className="w-full px-6 md:px-14 relative z-10">
          <div className="flex justify-between items-center text-[16px] md:text-[20px] uppercase tracking-[3px] font-bold mb-12 text-[#DCC99E]">
            <span>{t.contact.eyebrow}</span>
          </div>

          <div className="max-w-3xl mx-auto w-full">
            <div className="bg-[#0B1221] p-8 md:p-12 border border-white/10 shadow-[0_0_40px_rgba(0,0,0,0.3)]">
              <h2 className="font-serif text-[32px] md:text-[40px] font-bold mb-8 text-center text-white">{t.contact.title}</h2>

              {formStatus === 'success' ? (
                <div className="text-center py-10">
                  <CheckCircle2 className="w-16 h-16 mx-auto mb-4 text-[#DCC99E]" />
                  <h3 className="font-serif text-[24px] font-bold mb-2 text-white">{t.contact.successTitle}</h3>
                  <p className="text-white">{t.contact.successText}</p>
                  <button
                    type="button"
                    onClick={() => setFormStatus('idle')}
                    className="mt-8 px-6 py-3 bg-white text-[#0B1221] text-[16px] font-bold uppercase tracking-[1px] hover:bg-[#f0f0f0] transition-colors"
                  >
                    {t.contact.newRequest}
                  </button>
                </div>
              ) : (
                <form
                  action="https://schob-digital.app.n8n.cloud/webhook-test/faa2c5f1-4675-4f96-b696-d64af86d8c40"
                  method="POST"
                  onSubmit={async (e) => {
                    e.preventDefault();
                    const formData = new FormData(e.currentTarget);
                    try {
                      await fetch(e.currentTarget.action, {
                        method: 'POST',
                        body: formData,
                        headers: { Accept: 'application/json' },
                      });
                      setFormStatus('success');
                    } catch (error) {
                      console.error(error);
                    }
                  }}
                  className="flex flex-col gap-6"
                >
                  <input type="hidden" name="_webhook" value="https://schob-digital.app.n8n.cloud/webhook/faa2c5f1-4675-4f96-b696-d64af86d8c40" />
                  <input type="hidden" name="_subject" value={t.contact.subject} />
                  <input type="hidden" name="_captcha" value="false" />
                  <input type="hidden" name="_template" value="table" />
                  <input type="hidden" name="Sprache" value={language} />
                  <input type="hidden" name="Service-Paket" value={selectedServiceLabel} />
                  <input type="text" name="_honey" className="hidden" tabIndex={-1} autoComplete="off" />

                  <div className="grid md:grid-cols-2 gap-6">
                    <div className="flex flex-col gap-2">
                      <label htmlFor="contact-name" className="text-[16px] uppercase tracking-[1px] font-bold text-white">
                        {t.contact.name}
                      </label>
                      <input id="contact-name" name="Name" type="text" required className="w-full p-4 border border-[#eee] bg-[#f9f9f9] text-[#1a1a1a] focus:outline-none focus:border-[#1a1a1a] transition-colors text-[16px]" />
                    </div>
                    <div className="flex flex-col gap-2">
                      <label htmlFor="contact-email" className="text-[16px] uppercase tracking-[1px] font-bold text-white">
                        {t.contact.email}
                      </label>
                      <input id="contact-email" name="Email" type="email" required className="w-full p-4 border border-[#eee] bg-[#f9f9f9] text-[#1a1a1a] focus:outline-none focus:border-[#1a1a1a] transition-colors text-[16px]" />
                    </div>
                  </div>

                  <div className="flex flex-col gap-2">
                    <label htmlFor="contact-company" className="text-[16px] uppercase tracking-[1px] font-bold text-white">
                      {t.contact.company}
                    </label>
                    <input id="contact-company" name="Unternehmen" type="text" className="w-full p-4 border border-[#eee] bg-[#f9f9f9] text-[#1a1a1a] focus:outline-none focus:border-[#1a1a1a] transition-colors text-[16px]" />
                  </div>

                  <div className="flex flex-col gap-2">
                    <label htmlFor="contact-service" className="text-[16px] uppercase tracking-[1px] font-bold text-white">
                      {t.contact.service}
                    </label>
                    <div className="relative">
                      <select
                        id="contact-service"
                        name="service_selection"
                        required
                        value={selectedService}
                        onChange={(e) => setSelectedService(e.target.value as PackageId | 'custom' | '')}
                        className="w-full p-4 border border-[#eee] bg-[#f9f9f9] text-[#1a1a1a] appearance-none focus:outline-none focus:border-[#1a1a1a] transition-colors text-[16px]"
                      >
                        <option value="" disabled>
                          {t.contact.servicePlaceholder}
                        </option>
                        {t.packages.items.map((pkg) => (
                          <option key={pkg.id} value={pkg.id}>
                            {formatPackageLabel(pkg.title, pkg.price)}
                          </option>
                        ))}
                        <option value="custom">{t.contact.customService}</option>
                      </select>
                      <div className="absolute right-4 top-1/2 -translate-y-1/2 pointer-events-none text-[#1a1a1a]/40">▼</div>
                    </div>
                  </div>

                  <div className="flex flex-col gap-2">
                    <label htmlFor="contact-message" className="text-[16px] uppercase tracking-[1px] font-bold text-white">
                      {t.contact.message}
                    </label>
                    <textarea id="contact-message" name="Nachricht" rows={5} required className="w-full p-4 border border-[#eee] bg-[#f9f9f9] text-[#1a1a1a] focus:outline-none focus:border-[#1a1a1a] transition-colors resize-none text-[16px]" />
                  </div>

                  <label className="flex items-start gap-3 mt-4 cursor-pointer group">
                    <input id="contact-consent" name="privacy" type="checkbox" required className="mt-1 w-5 h-5 accent-[#1a1a1a]" />
                    <span className="text-[16px] text-white leading-[1.6]">
                      {t.contact.consentStart}{' '}
                      <a href={datenschutzHref} className="underline hover:text-white transition-colors">
                        {t.contact.consentLink}
                      </a>
                      {t.contact.consentEnd}
                    </span>
                  </label>

                  <button type="submit" className="w-full py-4 bg-[#1a1a1a] text-white text-[16px] font-bold uppercase tracking-[1px] hover:bg-[#333] transition-colors mt-4">
                    {t.contact.submit}
                  </button>
                </form>
              )}
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}

export function Footer({ language }: { language: Language }) {
  const t = siteContent[language];

  return (
    <footer className="py-8 bg-[#0B1221] border-t border-white/5 text-center flex flex-col items-center gap-4">
      <p className="text-white text-[15px] uppercase tracking-[1px]">
        © {new Date().getFullYear()} Schob Digital. {t.footer.rights}
      </p>
      <button data-open-cookie-settings className="text-white hover:text-white transition-colors text-[13px] underline">
        {t.footer.cookieSettings}
      </button>
    </footer>
  );
}
