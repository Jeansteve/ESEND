import React, { useState, useEffect } from 'react';
import { Phone, ArrowRight, Menu, X } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { Link, useLocation } from 'react-router-dom';

const Header = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [showCTA, setShowCTA] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const location = useLocation();

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
    { name: 'Expertise', href: '/#expertise', type: 'anchor' },
    { name: 'Services', href: '/#services', type: 'anchor' },
    { name: 'Nos réalisations', href: '/realisations', type: 'link' },
    { name: 'Encyclopédie', href: '/#encyclopedie', type: 'anchor' },
  ];

  const handleNavClick = (e, item) => {
    setIsMobileMenuOpen(false);
    
    if (item.type === 'anchor') {
      const targetId = item.href.split('#')[1];
      if (location.pathname === '/') {
        e.preventDefault();
        const target = document.getElementById(targetId);
        if (target) {
          const headerOffset = 80;
          const elementPosition = target.getBoundingClientRect().top;
          const offsetPosition = elementPosition + window.pageYOffset - headerOffset;
          window.scrollTo({ top: offsetPosition, behavior: 'smooth' });
        }
      }
    }
  };

  return (
    <header className={`fixed top-0 w-full z-50 transition-all duration-300 ${isScrolled || isMobileMenuOpen ? 'bg-slate-950/95 backdrop-blur-xl border-b border-white/5 py-2' : 'bg-transparent py-4'}`}>
      <div className="max-w-7xl mx-auto px-6 flex justify-between items-center">
        {/* Logo Section */}
        <div className="flex items-center gap-3">
          <Link to="/" onClick={() => { setIsMobileMenuOpen(false); window.scrollTo({ top: 0, behavior: 'smooth' }); }} className="flex items-center gap-2.5 group">
            <div className="w-9 h-9 sm:w-10 sm:h-10 rounded-lg overflow-hidden border border-white/10 shadow-2xl group-hover:scale-105 transition-transform bg-white flex items-center justify-center p-1 shrink-0">
              <img src="./logo-esend.jpg" alt="Logo ESEND" className="w-full h-full object-contain" />
            </div>
            <div className="flex flex-col">
              <span className="text-lg sm:text-xl font-black tracking-tighter text-white leading-none text-left">ESEND</span>
              <span className="text-[6px] sm:text-[7px] font-bold uppercase tracking-[0.1em] text-red-600 leading-none mt-1 text-left line-clamp-1">Passer de nuisibles à paisible</span>
            </div>
          </Link>
        </div>
        
        {/* Desktop Nav */}
        <nav className="hidden lg:flex gap-8 items-center">
          {menuItems.map((item) => (
            item.type === 'link' ? (
              <Link key={item.name} to={item.href} onClick={(e) => handleNavClick(e, item)} className="text-[10px] font-bold uppercase tracking-widest text-white/60 hover:text-white transition-colors">{item.name}</Link>
            ) : (
              <a key={item.name} href={item.href} onClick={(e) => handleNavClick(e, item)} className="text-[10px] font-bold uppercase tracking-widest text-white/60 hover:text-white transition-colors">{item.name}</a>
            )
          ))}
          
          <AnimatePresence>
            {showCTA && (
              <motion.a
                href="/#devis"
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: 20 }}
                onClick={(e) => handleNavClick(e, { type: 'anchor', href: '/#devis' })}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="relative group overflow-hidden bg-red-600 text-white px-5 py-2 rounded-full text-[10px] font-black uppercase tracking-widest flex items-center gap-2 shadow-[0_0_15px_rgba(220,38,38,0.2)] hover:shadow-red-600/40 transition-all cursor-pointer"
              >
                <span className="relative z-10">Devis</span>
                <ArrowRight className="w-3 h-3 relative z-10 group-hover:translate-x-1 transition-transform" />
              </motion.a>
            )}
          </AnimatePresence>
        </nav>

        {/* Header Right Side */}
        <div className="flex items-center gap-2 sm:gap-3">
          <a href="tel:0651239841" className="flex bg-white/5 border border-white/10 text-white px-3 sm:px-4 py-2 rounded-full text-[9px] sm:text-[10px] font-bold uppercase tracking-widest hover:bg-white/10 transition-all items-center gap-2">
            <Phone className="w-3 h-3 text-red-600" />
            <span className="inline">06 51 23 98 41</span>
          </a>
          
          <button className="lg:hidden text-white p-1.5 hover:bg-white/5 rounded-lg transition-colors" onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)} aria-label="Toggle menu">
            {isMobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>
        </div>
      </div>

      {/* Mobile Menu Overlay */}
      <AnimatePresence>
        {isMobileMenuOpen && (
          <motion.div 
            initial={{ opacity: 0, height: 0 }} 
            animate={{ opacity: 1, height: 'auto' }} 
            exit={{ opacity: 0, height: 0 }} 
            className="lg:hidden bg-slate-950/98 backdrop-blur-2xl border-b border-white/5 overflow-hidden text-left"
          >
            <div className="px-6 py-8 flex flex-col gap-6">
              {menuItems.map((item) => (
                item.type === 'link' ? (
                  <Link key={item.name} to={item.href} onClick={(e) => handleNavClick(e, item)} className="text-xs font-black uppercase tracking-[0.2em] text-white/60 hover:text-red-600 transition-colors border-l-2 border-transparent hover:border-red-600 pl-4 py-1">{item.name}</Link>
                ) : (
                  <a key={item.name} href={item.href} onClick={(e) => handleNavClick(e, item)} className="text-xs font-black uppercase tracking-[0.2em] text-white/60 hover:text-red-600 transition-colors border-l-2 border-transparent hover:border-red-600 pl-4 py-1">{item.name}</a>
                )
              ))}
              <div className="h-px bg-white/5" />
              <div className="flex flex-col gap-4">
                <a href="tel:0651239841" className="flex items-center gap-4 text-white text-xs font-black uppercase tracking-widest bg-white/5 p-4 rounded-xl border border-white/10 hover:bg-white/10 transition-colors">
                  <div className="w-10 h-10 rounded-full bg-red-600/10 flex items-center justify-center border border-red-600/20"><Phone className="w-4 h-4 text-red-600" /></div>
                  <div className="flex flex-col">
                    <span className="text-[8px] text-white/40 mb-1">Assistance 24/7</span>
                    06 51 23 98 41
                  </div>
                </a>
                <a href="/#devis" onClick={(e) => handleNavClick(e, { type: 'anchor', href: '/#devis' })} className="w-full bg-red-600 text-white px-8 py-5 rounded-xl font-black uppercase tracking-widest text-[10px] flex justify-between items-center shadow-lg shadow-red-600/20 active:scale-[0.98] transition-all">
                  <span>Demander un devis</span>
                  <ArrowRight className="w-5 h-5" />
                </a>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
};

export default Header;
