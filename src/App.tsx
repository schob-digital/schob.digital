import { useState, useEffect, useRef } from 'react';
import { motion, useScroll, useTransform, AnimatePresence } from 'motion/react';
import { ArrowRight, CheckCircle2, Menu, X } from 'lucide-react';
import './index.css';
import { ImpressumContent } from './ImpressumJSX';
import { DatenschutzContent } from './DatenschutzJSX';

function DifferenceSection() {
  const containerRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start center", "end center"]
  });

  const lineHeight = useTransform(scrollYProgress, [0, 1], ["0%", "100%"]);

  return (
    <section className="bg-white py-24 md:py-32 border-t border-[#eee]" id="difference">
      <div className="w-full px-6 md:px-14 flex flex-col gap-20 md:gap-32">
        <div className="max-w-4xl text-left">
          <div className="text-[16px] md:text-[20px] uppercase tracking-[3px] font-bold mb-6 text-[#DCC99E]">
            Unterschied zu der Konkurrenz
          </div>
          <h2 className="font-serif text-[40px] md:text-[60px] font-bold leading-[1.1] mb-8 text-[#1a1a1a]">
            Ihr Erfolg, <br/>ohne Friktion.
          </h2>
          <p className="text-[#1a1a1a] leading-[1.7] text-[18px] md:text-[24px]">
            Sie haben Besseres zu tun, als auf eine Website zu warten. Entdecken Sie den Unterschied.
          </p>
        </div>

        <div className="w-full relative" ref={containerRef}>
          {/* Background line */}
          <div className="absolute top-0 bottom-0 left-[23px] md:left-[59px] w-[2px] bg-[#eee]" />
          
          {/* Animated line */}
          <motion.div 
            className="absolute top-0 left-[23px] md:left-[59px] w-[2px] md:w-[4px] md:-ml-[1px] bg-[#DCC99E] origin-top z-[1]"
            style={{ height: lineHeight }}
          />

          <div className="flex flex-col gap-16 md:gap-28 relative z-10 pb-10">
            {differences.map((diff, idx) => (
              <div key={idx} className="flex gap-8 md:gap-16 items-start">
                <div className="flex-shrink-0 w-12 h-12 md:w-[120px] md:h-[120px] rounded-full border border-[#eee] bg-white flex items-center justify-center font-serif text-[24px] md:text-[40px] relative z-10">
                  <motion.div
                     className="absolute inset-x-0 inset-y-0 rounded-full border-2 md:border-[3px] border-[#DCC99E]"
                     initial={{ opacity: 0 }}
                     whileInView={{ opacity: 1 }}
                     viewport={{ margin: "-50% 0px -50% 0px" }}
                     transition={{ duration: 0.2 }}
                  />
                  {idx + 1}
                </div>
                <div className="pt-1 md:pt-6 w-full">
                  <h3 className="font-serif text-[26px] md:text-[42px] font-bold mb-4 md:mb-6 text-[#1a1a1a]">
                    {diff.title}
                  </h3>
                  <p className="text-[#1a1a1a] leading-[1.7] text-[17px] md:text-[22px] max-w-4xl">
                    {diff.desc}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

export default function App() {
  const [currentPage, setCurrentPage] = useState('home');
  const [selectedService, setSelectedService] = useState('');
  const [selectedSupport, setSelectedSupport] = useState('Kein');
  const [formStatus, setFormStatus] = useState<'idle' | 'success'>('idle');
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleHashChange = () => {
      const hash = window.location.hash.replace('#', '');
      if (['impressum', 'datenschutz'].includes(hash)) {
        setCurrentPage(hash);
        window.scrollTo(0, 0);
      } else {
        setCurrentPage('home');
      }
    };

    window.addEventListener('hashchange', handleHashChange);
    handleHashChange(); // Run on initial load
    return () => window.removeEventListener('hashchange', handleHashChange);
  }, []);

  useEffect(() => {
    // Dynamically load the Calendly script
    const script = document.createElement('script');
    script.src = 'https://assets.calendly.com/assets/external/widget.js';
    script.async = true;
    document.body.appendChild(script);

    return () => {
      if (document.body.contains(script)) {
        document.body.removeChild(script);
      }
    };
  }, []);

  return (
    <div className="min-h-screen bg-[#f9f9f9] text-[#1a1a1a] font-sans">
      {/* Navigation */}
      <nav className="group fixed top-0 inset-x-0 z-50 flex items-center justify-center h-[80px] bg-[#0B1221] hover:bg-white transition-colors duration-300 border-b border-transparent hover:border-[#eee]">
        <div className="w-full px-6 md:px-10 xl:px-14 flex items-center justify-between gap-4 h-full relative">
          
          {/* Logo - Centered absolutely on mobile, normal flow on desktop */}
          <div className="absolute inset-0 pointer-events-none flex items-center justify-center lg:static lg:flex-shrink-0 lg:justify-start lg:inset-auto lg:h-auto">
            <a href="#home" onClick={() => setCurrentPage('home')} className="pointer-events-auto flex-shrink-0 font-serif text-[18px] md:text-[22px] font-bold tracking-[-0.5px] uppercase group-hover:text-[#1a1a1a] transition-colors whitespace-nowrap relative z-[60] text-[#DCC99E]">
              Schob Digital
            </a>
          </div>
          
          {/* Desktop Central Nav */}
          <div className="hidden lg:flex flex-1 justify-center gap-4 xl:gap-8 items-center px-4">
            <a href="#portfolio" onClick={() => setCurrentPage('home')} className="text-[11px] xl:text-[12px] uppercase tracking-[1px] font-semibold text-white/80 group-hover:text-[#1a1a1a]/80 hover:!opacity-70 transition-colors whitespace-nowrap">
              Referenzen
            </a>
            <a href="#difference" onClick={() => setCurrentPage('home')} className="text-[11px] xl:text-[12px] uppercase tracking-[1px] font-semibold text-white/80 group-hover:text-[#1a1a1a]/80 hover:!opacity-70 transition-colors whitespace-nowrap">
              Unterschied
            </a>
            <a href="#calendly" onClick={() => setCurrentPage('home')} className="text-[11px] xl:text-[12px] uppercase tracking-[1px] font-semibold text-white/80 group-hover:text-[#1a1a1a]/80 hover:!opacity-70 transition-colors whitespace-nowrap">
              Erstgespräch
            </a>
            <a href="#packages" onClick={() => setCurrentPage('home')} className="text-[11px] xl:text-[12px] uppercase tracking-[1px] font-semibold text-white/80 group-hover:text-[#1a1a1a]/80 hover:!opacity-70 transition-colors whitespace-nowrap">
              Leistungen
            </a>
            <a href="#contact" onClick={() => setCurrentPage('home')} className="text-[11px] xl:text-[12px] uppercase tracking-[1px] font-semibold text-white/80 group-hover:text-[#1a1a1a]/80 hover:!opacity-70 transition-colors whitespace-nowrap">
              Kontakt
            </a>
          </div>

          {/* Desktop Right Nav (Impressum & Datenschutz) */}
          <div className="hidden lg:flex flex-shrink-0 gap-4 xl:gap-6 items-center justify-end">
            <a href="#impressum" className="text-[11px] xl:text-[12px] uppercase tracking-[1px] font-semibold text-white/80 group-hover:text-[#1a1a1a]/80 hover:!opacity-70 transition-colors whitespace-nowrap">
              Impressum
            </a>
            <a href="#datenschutz" className="text-[11px] xl:text-[12px] uppercase tracking-[1px] font-semibold text-white/80 group-hover:text-[#1a1a1a]/80 hover:!opacity-70 transition-colors whitespace-nowrap">
              Datenschutz
            </a>
          </div>

          {/* Mobile Menu Toggle (Right aligned) */}
          <div className="w-full flex justify-end lg:hidden">
            <button 
              className="relative z-[70] group-hover:text-[#1a1a1a] transition-colors" 
              style={{ color: isMobileMenuOpen ? '#fff' : 'inherit' }}
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            >
              {isMobileMenuOpen ? <X className="w-7 h-7" /> : <Menu className="w-7 h-7 text-white group-hover:text-[#1a1a1a]" />}
            </button>
          </div>
        </div>

        {/* Mobile Nav Drawer */}
        <AnimatePresence>
          {isMobileMenuOpen && (
            <>
              {/* Dark Backdrop */}
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.3 }}
                className="fixed inset-0 bg-black/20 z-[50] lg:hidden"
                onClick={() => setIsMobileMenuOpen(false)}
              />
              {/* Drawer panel */}
              <motion.div 
                initial={{ x: "100%" }}
                animate={{ x: 0 }}
                exit={{ x: "100%" }}
                transition={{ duration: 0.4, ease: [0.16, 1, 0.3, 1] }}
                className="fixed top-0 right-0 h-screen w-[60%] sm:w-[50%] bg-[#0B1221]/80 backdrop-blur-xl shadow-xl flex flex-col pt-[100px] px-6 z-[60] lg:hidden"
              >
                <a href="#portfolio" onClick={() => setIsMobileMenuOpen(false)} className="py-4 text-[14px] uppercase tracking-[2px] font-bold text-white hover:text-[#DCC99E] transition-colors border-b border-white/10">
                  Referenzen
                </a>
                <a href="#difference" onClick={() => setIsMobileMenuOpen(false)} className="py-4 text-[14px] uppercase tracking-[2px] font-bold text-white hover:text-[#DCC99E] transition-colors border-b border-white/10">
                  Unterschied
                </a>
                <a href="#calendly" onClick={() => setIsMobileMenuOpen(false)} className="py-4 text-[14px] uppercase tracking-[2px] font-bold text-white hover:text-[#DCC99E] transition-colors border-b border-white/10">
                  Erstgespräch
                </a>
                <a href="#packages" onClick={() => setIsMobileMenuOpen(false)} className="py-4 text-[14px] uppercase tracking-[2px] font-bold text-white hover:text-[#DCC99E] transition-colors border-b border-white/10">
                  Leistungen
                </a>
                <a href="#contact" onClick={() => setIsMobileMenuOpen(false)} className="py-4 text-[14px] uppercase tracking-[2px] font-bold text-white hover:text-[#DCC99E] transition-colors border-b border-white/10">
                  Kontakt
                </a>
                <a href="#impressum" onClick={() => setIsMobileMenuOpen(false)} className="py-4 text-[14px] uppercase tracking-[2px] font-bold text-white/70 hover:text-white transition-colors border-b border-white/10">
                  Impressum
                </a>
                <a href="#datenschutz" onClick={() => setIsMobileMenuOpen(false)} className="py-4 text-[14px] uppercase tracking-[2px] font-bold text-white/70 hover:text-white transition-colors">
                  Datenschutz
                </a>
              </motion.div>
            </>
          )}
        </AnimatePresence>
      </nav>

      <div className="pt-[80px] bg-[#0B1221] min-h-screen">
        {currentPage === 'impressum' && <ImpressumContent />}
        {currentPage === 'datenschutz' && <DatenschutzContent />}
        
        <div style={{ display: currentPage === 'home' ? 'block' : 'none' }}>
          {/* Hero Section */}
          <section className="relative min-h-screen pt-[100px] pb-0 md:py-0 flex flex-col md:flex-row items-start md:items-center overflow-hidden">
            {/* Background elements */}
            <div className="absolute inset-0 bg-gradient-to-r from-[#0B1221] via-[#0B1221]/80 to-transparent z-0" />
            <div className="absolute left-1/2 -translate-x-1/2 md:left-auto md:translate-x-0 md:-right-[5%] bottom-[5%] md:bottom-[8%] w-[85%] md:w-[50%] h-[72%] md:h-[75%] rounded-full bg-[#00D4FF] opacity-20 blur-[100px] md:blur-[140px] pointer-events-none z-[5]" />
            
            {/* Text Content */}
            <div className="relative z-20 w-full px-6 md:px-14 flex flex-col justify-start md:justify-center order-1 md:order-none mt-2 md:mt-0 flex-grow md:flex-grow-0">
              <div className="w-full md:mt-[-5%] pt-4 md:pt-0">
                <motion.div 
                  initial={{ opacity: 0, y: 30 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.8, ease: "easeOut" }}
                  className="md:w-[70%] lg:w-[60%]"
                >
                  <p className="text-[30px] sm:text-[40px] md:text-[53px] lg:text-[68px] font-bold text-white mb-5 md:mb-8 leading-none tracking-tight">Hey, ich bin Vasily.</p>
                  <h1 className="text-white text-[30px] sm:text-[40px] md:text-[53px] lg:text-[68px] font-bold leading-[1.1] tracking-tight m-0 mb-8 md:mb-12 drop-shadow-lg relative z-20">
                    Ich baue dir in nur einem Tag eine <span className="text-[#DCC99E]">Website</span>,<br className="hidden md:block" /> die Besucher in Kunden verwandelt.
                  </h1>
                  <p className="text-[#DCC99E] text-[17px] md:text-[19px] mb-10 md:mb-16 font-light">Kostenfreie Erstberatung online</p>
                  <div className="flex flex-wrap items-center gap-4">
                    <a href="#calendly" onClick={() => setCurrentPage('home')} className="px-8 py-4 bg-white text-[#111] uppercase text-[15px] font-bold tracking-[1px] rounded-none hover:bg-[#f0f0f0] transition-colors flex items-center justify-center gap-2 w-full sm:w-auto">
                      Gespräch buchen <ArrowRight className="w-5 h-5" />
                    </a>
                  </div>
                </motion.div>
              </div>
            </div>

            {/* Image Content */}
            <div className="relative z-10 w-full mt-auto md:mt-0 pt-12 md:pt-0 flex justify-center items-end order-2 md:order-none md:absolute md:inset-y-0 md:right-0 md:w-[50%] md:justify-end border-b-0">
              <img 
                src="https://raw.githubusercontent.com/VasilyGenAI/Website_me/main/Photos/first_image.png" 
                alt="Hero Background" 
                className="w-[90%] sm:w-[70%] md:w-auto h-auto md:h-[84%] object-contain object-bottom md:object-right-bottom relative z-10 scale-[1.05] md:scale-[1.1] transform origin-bottom"
              />
            </div>
          </section>

      {/* Portfolio Grid Section */}
      <section className="flex flex-col bg-[#0B1221] pt-24 overflow-hidden relative" id="portfolio">
        <div className="absolute inset-0 z-0 flex justify-end items-end pointer-events-none">
          <div className="absolute inset-0 bg-gradient-to-r from-[#0B1221] via-[#0B1221]/80 to-[#0B1221] z-0" />
          <div className="absolute left-1/2 -translate-x-1/2 md:left-auto md:translate-x-0 md:-right-[5%] bottom-[5%] md:bottom-[8%] w-[85%] md:w-[50%] h-[72%] md:h-[75%] rounded-full bg-[#00D4FF] opacity-10 blur-[100px] md:blur-[140px] pointer-events-none z-[5]" />
        </div>
        <div className="relative z-10 w-full px-6 md:px-14 mb-12">
          <div className="flex justify-between items-center text-[16px] md:text-[20px] uppercase tracking-[3px] font-bold text-[#DCC99E]">
            <span>Referenzen</span>
          </div>
        </div>
          
        <div className="relative z-10 w-full grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3">
          {portfolioItems.map((item, idx) => (
            <a 
              key={idx}
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
                className={`w-full h-full transition-transform duration-700 group-hover:scale-105 relative z-0 ${item.title === 'Diese Website' ? 'object-contain bg-[#0B1221] p-10' : 'object-cover'}`}
              />
              <div className="absolute bottom-0 inset-x-0 p-8 z-20 flex flex-col items-center text-center">
                <h3 className="font-bold text-[24px] md:text-[28px] text-white mb-2 transform transition-transform duration-500 group-hover:-translate-y-2">{item.title}</h3>
                <p className="text-[15px] md:text-[18px] text-white/80 transform transition-transform duration-500 group-hover:-translate-y-2 delay-75">{item.desc}</p>
              </div>
            </a>
          ))}
        </div>
      </section>
      
      <DifferenceSection />

      {/* Calendly Section */}
      <section className="bg-[#f9f9f9] py-24 border-t border-[#eee]" id="calendly">
        <div className="max-w-7xl mx-auto w-full px-6 md:px-14">
          <div className="mb-12 flex justify-between items-center text-[16px] md:text-[20px] uppercase tracking-[3px] font-bold text-[#DCC99E]">
            <span>Erstgespräch</span>
          </div>
          <div className="text-center mb-16">
            <h2 className="font-serif text-[40px] md:text-[60px] font-bold leading-[1.1] mb-8 text-[#1a1a1a]">Lass uns sprechen.</h2>
            <p className="text-[#1a1a1a] leading-[1.7] text-[18px] md:text-[24px] max-w-4xl mx-auto">
              Wir können unverbindlich über die Website 30 Minuten sprechen und schauen, ob eine Zusammenarbeit passt. Such dir einfach einen Termin aus.
            </p>
          </div>
          
          <div className="calendly-inline-widget" data-url="https://calendly.com/schobvasily-digital/30min" style={{ minWidth: '320px', height: '700px' }}></div>
        </div>
      </section>

      {/* Pricing / Packages */}
      <section className="bg-white border-t border-[#eee] py-24" id="packages">
        <div className="w-full px-6 md:px-14">
          <div className="mb-12 flex justify-between items-center text-[16px] md:text-[20px] uppercase tracking-[3px] font-bold text-[#DCC99E]">
            <span>Leistungen</span>
          </div>

          <div className="grid md:grid-cols-3 bg-white border-y border-[#eee] mb-16">
            {packages.map((pkg, i) => (
              <div key={i} className={`relative p-8 md:p-10 flex flex-col border-b border-[#eee] md:border-b-0 md:border-r last:border-0 ${pkg.highlight ? 'bg-[#f9f9f9]' : 'bg-white'}`}>
                {pkg.highlight && (
                  <div className="absolute top-4 right-4 bg-[#1a1a1a] text-white text-[9px] font-bold px-2 py-1 uppercase tracking-[1px]">
                    Unser Bestseller
                  </div>
                )}
                
                <div className="flex-1 relative z-10">
                  
                  <div className="text-[15px] opacity-40 mb-2 uppercase tracking-[1px] font-bold">{pkg.name}</div>
                  <h3 className="font-serif text-[28px] font-bold mb-1">{pkg.title}</h3>
                  <div className="text-[18px] font-semibold text-[#1a1a1a] mb-6 min-h-[40px] leading-[1.4]">{pkg.subtitle}</div>
                  <div className="mb-6 flex items-baseline gap-2 border-b border-[#eee] pb-4">
                    <span className="text-[35px] font-bold">{pkg.price} €</span>
                    <span className="text-[15px] uppercase tracking-[1px] opacity-60">zzgl. MwSt.</span>
                  </div>
                  <p className="text-[18px] leading-[1.5] text-[#666] mb-8 min-h-[50px]">
                    {pkg.intro}
                  </p>
                  <ul className="space-y-4 mb-8">
                    {pkg.features.map((feature, idx) => (
                      <li key={idx} className="flex gap-3 text-[18px] text-[#444] items-start">
                        <CheckCircle2 className="w-[18px] h-[18px] text-[#1a1a1a] flex-shrink-0 mt-[4px]" />
                        <span className="leading-[1.5]">{feature}</span>
                      </li>
                    ))}
                  </ul>
                </div>
                <a 
                  href="#contact"
                  onClick={() => setSelectedService(pkg.title)}
                  className={`w-full py-3 mt-auto text-center font-bold text-[16px] uppercase tracking-[1px] transition-colors border ${pkg.highlight ? 'bg-[#1a1a1a] text-white border-[#1a1a1a] hover:bg-[#333]' : 'bg-transparent text-[#1a1a1a] border-[#1a1a1a] hover:bg-[#f0f0f0]'}`}
                >
                  Anfragen
                </a>
              </div>
            ))}
          </div>

          <div className="mb-10 flex flex-col items-center text-center">
            <h3 className="font-serif text-[32px] font-bold mb-3">Optionale Add-ons: Monatliche Betreuung</h3>
            <p className="text-[19px] uppercase tracking-[1px] opacity-60 mb-1 font-bold">Jederzeit kündbar</p>
            <p className="text-[21px] text-[#666]">Lass uns die Technik übernehmen, damit du dich aufs Geschäft konzentrieren kannst.</p>
          </div>

          <div className="grid md:grid-cols-2 gap-6 md:gap-10 max-w-4xl mx-auto">
            <div className="bg-white border border-[#eee] p-8 md:p-10 flex flex-col items-center text-center">
              <h4 className="font-serif text-[28px] font-bold mb-3">Basic Support</h4>
              <div className="mb-4 flex items-baseline gap-2">
                <span className="text-[35px] font-bold">20 €</span>
                <span className="text-[15px] uppercase tracking-[1px] opacity-60">/ Monat</span>
              </div>
              <p className="text-[19px] text-[#222] font-semibold mb-4">Deine Website bleibt lebendig und aktuell.</p>
              <p className="text-[18px] text-[#666] leading-[1.6] mb-8">
                Beinhaltet 1 Anpassung oder Feature-Anfrage pro Monat<br /> (z.B. Texte aktualisieren, Bilder tauschen, kleine Layout-Korrekturen).
              </p>
              <a 
                href="#contact"
                onClick={() => setSelectedSupport("Basic Support (20 €/Monat)")}
                className="w-full py-3 mt-auto text-center font-bold text-[16px] uppercase tracking-[1px] transition-colors border bg-transparent text-[#1a1a1a] border-[#1a1a1a] hover:bg-[#f0f0f0]"
              >
                Anfragen
              </a>
            </div>
            <div className="bg-[#f9f9f9] border border-[#eee] p-8 md:p-10 flex flex-col items-center text-center relative">
              <h4 className="font-serif text-[28px] font-bold mb-3">Premium Support</h4>
              <div className="mb-4 flex items-baseline gap-2">
                <span className="text-[35px] font-bold">50 €</span>
                <span className="text-[15px] uppercase tracking-[1px] opacity-60">/ Monat</span>
              </div>
              <p className="text-[19px] text-[#222] font-semibold mb-4">Dein technischer Partner für kontinuierliches Wachstum.</p>
              <p className="text-[18px] text-[#666] leading-[1.6] mb-8">
                Umfassende Betreuung für dein skalierendes Business. Beinhaltet auch komplexe Änderungen und die Entwicklung komplett neuer Unterseiten, wenn dein Angebot wächst.
              </p>
              <a 
                href="#contact"
                onClick={() => setSelectedSupport("Premium Support (50 €/Monat)")}
                className="w-full py-3 mt-auto text-center font-bold text-[16px] uppercase tracking-[1px] transition-colors border bg-transparent text-[#1a1a1a] border-[#1a1a1a] hover:bg-[#f0f0f0]"
              >
                Anfragen
              </a>
            </div>
          </div>
        </div>
      </section>

      {/* Contact Form Section */}
      <section id="contact" className="bg-[#0B1221] py-24 relative overflow-hidden border-t border-white/5">
        <div className="absolute inset-0 bg-gradient-to-r from-[#0B1221] via-[#0B1221]/80 to-[#0B1221] z-0" />
        <div className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 w-[80%] max-w-[800px] h-[80%] rounded-full bg-[#00D4FF] opacity-10 blur-[100px] md:blur-[140px] pointer-events-none z-[0]" />
        
        <div className="w-full px-6 md:px-14 relative z-10">
          <div className="flex justify-between items-center text-[16px] md:text-[20px] uppercase tracking-[3px] font-bold mb-12 text-[#DCC99E]">
            <span>Projekt anfragen</span>
          </div>
          
          <div className="max-w-3xl mx-auto w-full">
            <div className="bg-[#0B1221] p-8 md:p-12 border border-white/10 shadow-[0_0_40px_rgba(0,0,0,0.3)]">
            <h2 className="font-serif text-[32px] md:text-[40px] font-bold mb-8 text-center text-white">Lass uns starten.</h2>
            
            {formStatus === 'success' ? (
              <div className="text-center py-10">
                <CheckCircle2 className="w-16 h-16 mx-auto mb-4 text-[#DCC99E]" />
                <h3 className="font-serif text-[24px] font-bold mb-2 text-white">Danke für deine Anfrage!</h3>
                <p className="text-white/60">Ich melde mich so schnell wie möglich bei dir.</p>
                <button 
                  onClick={() => setFormStatus('idle')}
                  className="mt-8 px-6 py-3 bg-white text-[#0B1221] text-[16px] font-bold uppercase tracking-[1px] hover:bg-[#f0f0f0] transition-colors"
                >
                  Neue Anfrage
                </button>
              </div>
            ) : (
            <form 
              action="https://formsubmit.co/schobvasily.digital@gmail.com" 
              method="POST"
              onSubmit={async (e) => {
                e.preventDefault();
                const formData = new FormData(e.currentTarget);
                try {
                  await fetch(e.currentTarget.action, {
                    method: 'POST',
                    body: formData,
                    headers: { 'Accept': 'application/json' }
                  });
                  setFormStatus('success');
                } catch (error) {
                  console.error(error);
                }
              }}
              className="flex flex-col gap-6"
            >
              <input type="hidden" name="_subject" value="Neue Website-Anfrage über Schob Digital" />
              <input type="hidden" name="_captcha" value="false" />
              <input type="hidden" name="_template" value="table" />
              <input type="text" name="_honey" className="hidden" tabIndex={-1} autoComplete="off" />
              
              <div className="grid md:grid-cols-2 gap-6">
                <div className="flex flex-col gap-2">
                  <label htmlFor="contact-name" className="text-[16px] uppercase tracking-[1px] font-bold text-[#1a1a1a]/60">Name</label>
                  <input id="contact-name" name="name" type="text" required className="w-full p-4 border border-[#eee] bg-[#f9f9f9] text-[#1a1a1a] focus:outline-none focus:border-[#1a1a1a] transition-colors text-[16px]" />
                </div>
                <div className="flex flex-col gap-2">
                  <label htmlFor="contact-email" className="text-[16px] uppercase tracking-[1px] font-bold text-[#1a1a1a]/60">E-Mail</label>
                  <input id="contact-email" name="email" type="email" required className="w-full p-4 border border-[#eee] bg-[#f9f9f9] text-[#1a1a1a] focus:outline-none focus:border-[#1a1a1a] transition-colors text-[16px]" />
                </div>
              </div>

              <div className="flex flex-col gap-2">
                <label htmlFor="contact-company" className="text-[16px] uppercase tracking-[1px] font-bold text-[#1a1a1a]/60">Unternehmen</label>
                <input id="contact-company" name="company" type="text" className="w-full p-4 border border-[#eee] bg-[#f9f9f9] text-[#1a1a1a] focus:outline-none focus:border-[#1a1a1a] transition-colors text-[16px]" />
              </div>

              <div className="flex flex-col gap-2">
                <label htmlFor="contact-service" className="text-[16px] uppercase tracking-[1px] font-bold text-[#1a1a1a]/60">Service-Paket</label>
                <div className="relative">
                  <select 
                    id="contact-service" 
                    name="service" 
                    required 
                    value={selectedService}
                    onChange={(e) => setSelectedService(e.target.value)}
                    className="w-full p-4 border border-[#eee] bg-[#f9f9f9] text-[#1a1a1a] appearance-none focus:outline-none focus:border-[#1a1a1a] transition-colors text-[16px]"
                  >
                    <option value="" disabled>Bitte auswählen</option>
                    {packages.map(pkg => (
                      <option key={pkg.title} value={pkg.title}>{pkg.title}</option>
                    ))}
                    <option value="Individuell">Individuell</option>
                  </select>
                  <div className="absolute right-4 top-1/2 -translate-y-1/2 pointer-events-none text-[#1a1a1a]/40">
                    ▼
                  </div>
                </div>
              </div>

              <div className="flex flex-col gap-2">
                <label htmlFor="contact-support" className="text-[16px] uppercase tracking-[1px] font-bold text-[#1a1a1a]/60">Optionales Support Add-on</label>
                <div className="relative">
                  <select 
                    id="contact-support" 
                    name="support" 
                    value={selectedSupport}
                    onChange={(e) => setSelectedSupport(e.target.value)}
                    className="w-full p-4 border border-[#eee] bg-[#f9f9f9] text-[#1a1a1a] appearance-none focus:outline-none focus:border-[#1a1a1a] transition-colors text-[16px]"
                  >
                    <option value="Kein">Kein Support Add-on</option>
                    <option value="Basic Support (20 €/Monat)">Basic Support (20 €/Monat)</option>
                    <option value="Premium Support (50 €/Monat)">Premium Support (50 €/Monat)</option>
                  </select>
                  <div className="absolute right-4 top-1/2 -translate-y-1/2 pointer-events-none text-[#1a1a1a]/40">
                    ▼
                  </div>
                </div>
              </div>

              <div className="flex flex-col gap-2">
                <label htmlFor="contact-message" className="text-[16px] uppercase tracking-[1px] font-bold text-[#1a1a1a]/60">Welche Art von Website brauchst du gerade konkret?</label>
                <textarea id="contact-message" name="message" rows={5} required className="w-full p-4 border border-[#eee] bg-[#f9f9f9] text-[#1a1a1a] focus:outline-none focus:border-[#1a1a1a] transition-colors resize-none text-[16px]"></textarea>
              </div>

              <label className="flex items-start gap-3 mt-4 cursor-pointer group">
                <input id="contact-consent" name="privacy" type="checkbox" required className="mt-1 w-5 h-5 accent-[#1a1a1a]" />
                <span className="text-[16px] text-[#666] leading-[1.6]">
                  Ich stimme zu, dass meine Angaben zur Bearbeitung meiner Anfrage verarbeitet werden. Weitere Informationen stehen in der <a href="#datenschutz" onClick={() => setCurrentPage('datenschutz')} className="underline hover:text-[#1a1a1a] transition-colors">Datenschutzerklärung</a>.
                </span>
              </label>

              <button type="submit" className="w-full py-4 bg-[#1a1a1a] text-white text-[16px] font-bold uppercase tracking-[1px] hover:bg-[#333] transition-colors mt-4">
                Projekt anfragen
              </button>
            </form>
            )}
          </div>
        </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="py-8 bg-[#0B1221] border-t border-white/5 text-center">
        <p className="text-white/40 text-[15px] uppercase tracking-[1px]">© {new Date().getFullYear()} Schob Digital. Alle Rechte vorbehalten.</p>
      </footer>
        </div>
      </div>
    </div>
  );
}

const portfolioItems = [
  {
    title: "Hochzeitsservice",
    desc: "Elegantes Design für Hochzeitsfotografie und mehr.",
    image: "https://raw.githubusercontent.com/schob-digital/Hochzeitsservicede/main/src/Foto/boat.png",
    link: "https://schob-digital.github.io/Hochzeitsservicede/"
  },
  {
    title: "DJ Vasily",
    desc: "Professioneller Auftritt für DJ & Event-Equipment.",
    image: "https://images.unsplash.com/photo-1516873240891-4bf014598ab4?auto=format&fit=crop&q=80&w=1920",
    link: "https://vasilygenai.github.io/DJ_Vasily/"
  },
  {
    title: "Misjudged Web",
    desc: "Kompakte Website zur App. Fokus auf sauberen Datenschutz.",
    image: "https://raw.githubusercontent.com/VasilyGenAI/Website_me/main/Photos/Screen2.png",
    link: "https://vasilygenai.github.io/misjudged.app/index.html"
  },
  {
    title: "Diese Website",
    desc: "Fokus auf Marketing, Struktur und Designqualität.",
    image: "https://raw.githubusercontent.com/VasilyGenAI/Website_me/main/Photos/first_image.png",
    link: "https://vasilygenai.github.io/Website_me/"
  },
  {
    title: "Meetli",
    desc: "Universitäts-Projekt mit Fokus auf saubere Nutzerführung.",
    image: "https://image.thum.io/get/width/1200/https://www.meetli.ch/",
    link: "https://www.meetli.ch/"
  }
];

const differences = [
  {
    title: "Schnelligkeit",
    desc: "Sie bekommen Ihre Website nicht erst in zwei Wochen, sondern innerhalb eines Tages. Durch eine clevere Kombination aus standardisierten Prozessen und Ihren persönlichen Design-Präferenzen entsteht die Website enorm schnell."
  },
  {
    title: "Vertrauen",
    desc: "Sie haben die Möglichkeit auf ein persönliches 1:1-Gespräch vor Ort in Berlin (da ich persönliche Kommunikation sehr schätze) oder auf einen flexiblen Online-Termin. So können wir uns besser kennenlernen und schauen, ob eine Zusammenarbeit passt. Alles völlig unverbindlich."
  },
  {
    title: "Konzern-Qualität zum Start-up-Preis",
    desc: "Ich bringe die Professionalität und Datensicherheit aus meiner Zeit bei Accenture und der ETH Zürich mit – aber zu Preisen, die sich auch kleine Unternehmen leisten können."
  },
  {
    title: "Unternehmerisches Denken",
    desc: "Ich bin selbst Unternehmer und nicht nur IT-Consultant. Ich kenne Themen wie Kostenminimierung, Effizienz und Eigenverantwortung aus erster Hand. Bei mir gibt es kein „Dafür bin ich nicht zuständig, das macht mein Kollege“ – ich bin Ihr direkter Ansprechpartner."
  },
  {
    title: "Kostentransparenz",
    desc: "Ein fester Preis. Keine versteckten Gebühren, keine bösen Überraschungen am Ende des Monats."
  }
];

const packages = [
  {
    name: "Paket 1",
    title: "Starter",
    subtitle: "Der Conversion-Boost",
    price: "299",
    intro: "Perfekt für den schnellen und effektiven Markteintritt.",
    highlight: false,
    features: [
      "Hochkonvertierende One-Page-Landingpage: Ein messerscharfes Design, das deine Besucher gezielt durch dein Angebot führt und direkt zu Kunden macht.",
      "Responsives Design: Sieht auf Smartphone, Tablet und Desktop perfekt aus.",
      "Rasante Ladezeiten: Keine abgesprungenen Kunden durch langsames Laden."
    ]
  },
  {
    name: "Paket 2",
    title: "Professional",
    subtitle: "Sicher & Sorglos",
    price: "499",
    intro: "Unser Bestseller. Dein professioneller Auftritt ohne rechtliche Kopfschmerzen.",
    highlight: true,
    features: [
      "Alles aus dem Starter-Paket (One-Page-Landingpage).",
      "Rechtssicherheit inklusive: Einbindung von Impressum und Datenschutzerklärung nach aktuellen Vorgaben.",
      "Fokus auf dein Business: Du kümmerst dich um deine Kunden, wir um das rechtliche Fundament deiner Website."
    ]
  },
  {
    name: "Paket 3",
    title: "Premium",
    subtitle: "Datenbasiertes Wachstum",
    price: "799",
    intro: "Für Unternehmer, die nichts dem Zufall überlassen wollen.",
    highlight: false,
    features: [
      "Alles aus dem Professional-Paket (Landingpage + Rechtstexte).",
      "Profi-Web-Analytics: Vollständige Einrichtung von Tracking-Tools.",
      "Besucher verstehen: Miss genau, woher deine Kunden kommen, was sie klicken und wie du deinen Umsatz weiter maximieren kannst."
    ]
  }
];
