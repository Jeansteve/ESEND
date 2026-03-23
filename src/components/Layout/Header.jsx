import React, { useState, useEffect } from 'react';
import { Phone } from 'lucide-react';

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
    { name: 'Nuisibles', href: '#nuisibles' },
    { name: 'Encyclopédie', href: '#encyclopedie' },
    { name: 'Devis', href: '#devis' },
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
    <header className={`fixed top-0 w-full z-50 transition-all duration-300 ${isScrolled ? 'bg-white/90 backdrop-blur-lg shadow-sm py-3' : 'bg-transparent py-5'}`}>
      <div className="max-w-7xl mx-auto px-6 flex justify-between items-center">
        <div className="flex items-center gap-3">
          <a href="#accueil" onClick={(e) => scrollToSection(e, '#accueil')} className="flex items-center gap-2 group">
            <div className="w-12 h-12 rounded-xl overflow-hidden border border-zinc-100 shadow-sm group-hover:scale-105 transition-transform bg-white flex items-center justify-center p-1">
              <img src="./logo-esend.jpg" alt="Logo ESEND" className="w-full h-full object-contain" />
            </div>
            <span className={`text-2xl font-black tracking-tighter transition-colors ${isScrolled ? 'text-black' : 'text-white'}`}>ESEND</span>
          </a>
        </div>
        
        <nav className="hidden md:flex gap-8">
          {menuItems.map((item) => (
            <a 
              key={item.name} 
              href={item.href} 
              onClick={(e) => scrollToSection(e, item.href)}
              className={`text-[11px] font-black uppercase tracking-widest transition-colors ${isScrolled ? 'text-zinc-500 hover:text-esend-red' : 'text-white/70 hover:text-white'}`}
            >
              {item.name}
            </a>
          ))}
        </nav>

        <a 
          href="tel:0600000000" 
          className="bg-esend-red text-white px-6 py-2.5 rounded-xl text-[10px] font-black uppercase tracking-widest hover:bg-black transition-all shadow-lg hover:shadow-red-900/20 flex items-center gap-2"
        >
          <Phone className="w-3 h-3" /> 06 00 00 00 00
        </a>
      </div>
    </header>
  );
};

export default Header;
