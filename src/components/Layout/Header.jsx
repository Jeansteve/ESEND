import React, { useState, useEffect } from 'react';
import { Phone, ArrowRight, Menu, X, ChevronDown } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { useSettings } from '../../context/SettingsContext';
import MobileMenu from './MobileMenu';




const Header = () => {
    const { settings } = useSettings();
    // ... existant
  const [isScrolled, setIsScrolled] = useState(false);
  const [showCTA, setShowCTA] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [hoveredItem, setHoveredItem] = useState(null);
  const [mobileSubMenuOpen, setMobileSubMenuOpen] = useState(null);
  const location = useLocation();
  const navigate = useNavigate();

  useEffect(() => {
    const handleScroll = () => {
      const scrollPos = window.scrollY;
      setIsScrolled(scrollPos > 20);
      setShowCTA(scrollPos > 400);
    };
    
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const menuItems = [
    { 
      name: 'Services', 
      href: '#services', 
      type: 'anchor',
      subItems: [
        { name: 'Dératisation & Nuisibles', href: '/services/nuisibles', desc: 'Éradication radicale & durable' },
        { name: 'Désinfection Bio-Sécurité', href: '/services/desinfection', desc: 'Protocoles virucides certifiés' },
        { name: 'Nettoyage & Vitrerie', href: '/services/nettoyage', desc: 'Finition crystal de prestige' },
      ]
    },
    { name: 'Nos réalisations', href: '/realisations', type: 'link' },
    { name: 'Le Journal', href: '/journal', type: 'link' },
    { name: 'A propos', href: '#valeurs', type: 'anchor' },
  ];

  const handleNavClick = (e, item) => {
    if (item.subItems && !e.target.closest('.sub-link')) {
        // Pour les items avec sous-menu sur mobile, on toggle l'accordéon
        if (window.innerWidth < 1024) {
            e.preventDefault();
            setMobileSubMenuOpen(mobileSubMenuOpen === item.name ? null : item.name);
            return;
        }
    }

    setIsMobileMenuOpen(false);
    setMobileSubMenuOpen(null);
    
    if (item.type === 'anchor') {
      const targetId = item.href.replace('#', '');
      if (location.pathname === '/') {
        e.preventDefault();
        const target = document.getElementById(targetId);
        if (target) {
          target.scrollIntoView({ behavior: 'smooth', block: 'start' });
        }
      } else {
        // En dehors de l'accueil, on navigue vers l'accueil + hash
        e.preventDefault();
        navigate(`/#${targetId}`);
      }
    }
  };

  const isArticlePage = location.pathname.startsWith('/journal/');

  return (
    <header className={`fixed top-0 w-full z-50 transition-all duration-300 ${isScrolled || isMobileMenuOpen ? 'py-2' : 'py-4'}`}>
      <div className={`absolute inset-0 transition-opacity duration-300 ${isScrolled || isMobileMenuOpen || isArticlePage ? 'opacity-100 bg-[#020617]/90 backdrop-blur-lg border-b border-white/5' : 'opacity-0'}`} style={{ zIndex: 0 }} />
      <div className="relative z-10 max-w-7xl mx-auto px-6 flex justify-between items-center w-full">
        {/* Logo Section */}
        <div className="flex items-center gap-3">
          <Link to="/" onClick={() => { setIsMobileMenuOpen(false); window.scrollTo({ top: 0, behavior: 'smooth' }); }} className="flex items-center gap-2.5 group font-sans">
            <div className="w-9 h-9 sm:w-10 sm:h-10 rounded-lg overflow-hidden border border-[var(--border-subtle)] shadow-2xl group-hover:scale-105 transition-transform bg-white flex items-center justify-center p-1 shrink-0">
              <img src="/images/logo-esend.webp" alt="Logo ESEND" className="w-full h-full object-contain" width="40" height="40" />
            </div>
            <div className="flex flex-col">
              <span className="text-lg sm:text-xl font-black tracking-tighter text-[var(--text-main)] leading-none text-left">ESEND</span>
              <span className="text-[6px] sm:text-[7px] font-bold uppercase tracking-[0.1em] text-red-600 leading-none mt-1 text-left line-clamp-1">Passer de nuisibles à paisible</span>
            </div>
          </Link>
        </div>
        
        {/* Desktop Nav */}
        <nav className="hidden lg:flex gap-8 items-center">
          {menuItems.map((item) => (
            <div 
                key={item.name} 
                className="relative py-4"
                onMouseEnter={() => setHoveredItem(item.name)}
                onMouseLeave={() => setHoveredItem(null)}
            >
                <div className="flex items-center gap-1.5 cursor-pointer group drop-shadow-sm">
                    {item.type === 'link' ? (
                        <Link to={item.href} onClick={(e) => handleNavClick(e, item)} className="text-[12px] font-black uppercase tracking-[0.15em] text-white/80 group-hover:text-white transition-all duration-300">{item.name}</Link>
                    ) : (
                        <a href={item.href} onClick={(e) => handleNavClick(e, item)} className="text-[12px] font-black uppercase tracking-[0.15em] text-white/80 group-hover:text-white transition-all duration-300">{item.name}</a>
                    )}
                    {item.subItems && <ChevronDown className={`w-3.5 h-3.5 text-white/60 group-hover:text-red-500 transition-all ${hoveredItem === item.name ? 'rotate-180' : ''}`} />}
                </div>

                {/* Submenu Desktop */}
                <div 
                    className={`absolute top-full left-0 w-72 pt-3 transition-all duration-200 origin-top ${
                        item.subItems && hoveredItem === item.name 
                            ? 'opacity-100 translate-y-0 scale-100 pointer-events-auto visible' 
                            : 'opacity-0 translate-y-2 scale-95 pointer-events-none invisible'
                    }`}
                >
                    {item.subItems && (
                        <>
                            {/* Pointeur Visuel */}
                            <div className="absolute top-[8px] left-10 w-4 h-4 bg-[var(--bg-secondary)] border-l border-t border-[var(--border-subtle)] rotate-45 z-0" />
                            
                            <div className="relative z-10 bg-[var(--bg-secondary)] border border-[var(--border-subtle)] rounded-2xl p-2.5 shadow-2xl overflow-hidden">
                                {item.subItems.map((sub) => (
                                    <Link 
                                        key={sub.name} 
                                        to={sub.href} 
                                        onClick={(e) => handleNavClick(e, { ...sub, type: 'link' })}
                                        className="sub-link flex flex-col p-3.5 rounded-xl hover:bg-[var(--text-main)]/5 transition-all group/sub"
                                    >
                                        <div className="flex items-center justify-between mb-0.5">
                                            <span className="text-xs font-black uppercase tracking-widest text-[var(--text-main)] group-hover/sub:text-red-500 transition-colors">{sub.name}</span>
                                            <ArrowRight className="w-3 h-3 text-red-600 opacity-0 -translate-x-2 group-hover/sub:opacity-100 group-hover/sub:translate-x-0 transition-all" />
                                        </div>
                                        <span className="text-[10px] font-bold text-[var(--text-dimmed)] group-hover/sub:opacity-100 transition-colors line-clamp-1">{sub.desc}</span>
                                    </Link>
                                ))}
                            </div>
                        </>
                    )}
                </div>
            </div>
          ))}
          
        </nav>

        {/* Header Right Side */}
        <div className="flex items-center gap-2 sm:gap-3">
          <AnimatePresence>
            {(location.pathname !== '/' || showCTA) && (
              <motion.div
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: 20 }}
                className="hidden sm:block"
              >
                <Link
                  to="/#devis-title"
                  onClick={(e) => handleNavClick(e, { type: 'anchor', href: '#devis-title' })}
                  className="relative group overflow-hidden bg-red-600 text-white px-5 py-2.5 rounded-full text-[10px] font-black uppercase tracking-widest flex items-center gap-2 shadow-[0_0_15px_rgba(220,38,38,0.2)] hover:shadow-red-600/40 transition-all font-sans"
                >
                  <span>Devis Offert</span>
                  <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-1 transition-transform" />
                </Link>
              </motion.div>
            )}
          </AnimatePresence>

          <a href={`tel:${settings.company_phone.replace(/\s/g, '')}`} className="flex bg-[var(--bg-secondary)] border border-[var(--border-subtle)] text-[var(--text-main)] px-4 py-2 rounded-full text-[10px] font-bold uppercase tracking-widest hover:bg-red-600 hover:text-white transition-all items-center gap-2 font-sans shadow-lg group">
            <Phone className="w-3.5 h-3.5 text-red-600 group-hover:text-white transition-colors" />
            <span className="inline">{settings.company_phone}</span>
          </a>
          
          <button className="lg:hidden text-[var(--text-main)] p-1.5 hover:bg-white/5 rounded-lg transition-colors" onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)} aria-label="Toggle menu">
            {isMobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>
        </div>
      </div>

      {/* Mobile Menu Overlay (New Premium Version) */}
      <MobileMenu isOpen={isMobileMenuOpen} onClose={() => setIsMobileMenuOpen(false)} />
    </header>
  );
};

export default Header;
