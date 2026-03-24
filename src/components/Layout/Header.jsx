import React, { useState, useEffect } from 'react';
import { Phone, ArrowRight } from 'lucide-react';
import { motion } from 'framer-motion';

const Header = () => {
  const [isScrolled, setIsScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const menuItems = [
    { name: 'Expertise', href: '#expertise' },
    { name: 'Services', href: '#nuisibles' },
    { name: 'Encyclopédie', href: '#encyclopedie' },
  ];

  const scrollToSection = (e, href) => {
    e.preventDefault();
    const target = document.querySelector(href);
    if (target) {
      const headerOffset = 80;
      const elementPosition = target.getBoundingClientRect().top;
      const offsetPosition = elementPosition + window.pageYOffset - headerOffset;

      window.scrollTo({
        top: offsetPosition,
        behavior: 'smooth'
      });
    }
  };

  return (
    <header className={`fixed top-0 w-full z-50 transition-all duration-300 ${isScrolled ? 'bg-slate-950/90 backdrop-blur-xl border-b border-white/5 py-3' : 'bg-transparent py-6'}`}>
      <div className="max-w-7xl mx-auto px-6 flex justify-between items-center">
        <div className="flex items-center gap-3">
          <a href="#accueil" onClick={(e) => scrollToSection(e, '#accueil')} className="flex items-center gap-3 group">
            <div className="w-12 h-12 rounded-xl overflow-hidden border border-white/10 shadow-2xl group-hover:scale-105 transition-transform bg-white flex items-center justify-center p-1">
              <img src="./logo-esend.jpg" alt="Logo ESEND" className="w-full h-full object-contain" />
            </div>
            <div className="flex flex-col">
              <span className="text-2xl font-black tracking-tighter text-white leading-none">ESEND</span>
              <span className="text-[8px] font-bold uppercase tracking-[0.1em] text-red-600 leading-none mt-1">Passer de nuisibles à paisible</span>
            </div>
          </a>
        </div>
        
        <nav className="hidden lg:flex gap-10 items-center">
          {menuItems.map((item) => (
            <a 
              key={item.name} 
              href={item.href} 
              onClick={(e) => scrollToSection(e, item.href)}
              className="text-[11px] font-bold uppercase tracking-widest text-white/70 hover:text-white transition-colors"
            >
              {item.name}
            </a>
          ))}
          
          <motion.a
            href="#devis"
            onClick={(e) => scrollToSection(e, '#devis')}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            className="relative group overflow-hidden bg-red-600 text-white px-6 py-2.5 rounded-full text-[11px] font-black uppercase tracking-widest flex items-center gap-2 shadow-[0_0_20px_rgba(220,38,38,0.3)] hover:shadow-red-600/50 transition-all"
          >
            <span className="relative z-10">Obtenir mon devis</span>
            <ArrowRight className="w-3 h-3 relative z-10 group-hover:translate-x-1 transition-transform" />
            <motion.div 
              className="absolute inset-0 bg-white/20"
              animate={{ x: ['-100%', '100%'] }}
              transition={{ repeat: Infinity, duration: 1.5, ease: "linear", repeatDelay: 3 }}
            />
          </motion.a>
        </nav>

        <div className="flex items-center gap-4">
          <a 
            href="tel:0651239841" 
            className="bg-white/5 border border-white/10 text-white px-5 py-2.5 rounded-full text-[11px] font-bold uppercase tracking-widest hover:bg-white/10 transition-all flex items-center gap-2"
          >
            <Phone className="w-3 h-3 text-red-600" />
            <span>06 51 23 98 41</span>
          </a>
        </div>
      </div>
    </header>
  );
};

export default Header;
