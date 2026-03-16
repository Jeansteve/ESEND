import React, { useState, useEffect } from 'react';

const Header = () => {
  const [isScrolled, setIsScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <header className={`fixed top-0 w-full z-50 transition-all duration-300 ${isScrolled ? 'bg-white/80 backdrop-blur-lg shadow-sm py-4' : 'bg-transparent py-6'}`}>
      <div className="max-w-7xl mx-auto px-6 flex justify-between items-center">
        <div className="flex items-center gap-2">
          <span className="text-2xl font-black tracking-tighter text-black">ESEND</span>
        </div>
        
        <nav className="hidden md:flex gap-8">
          {['Expertise', 'Nuisibles', 'Encyclopédie', 'Contact'].map((item) => (
            <a key={item} href="#" className="text-[11px] font-black uppercase tracking-widest text-zinc-500 hover:text-esend-red transition-colors">
              {item}
            </a>
          ))}
        </nav>

        <button className="bg-black text-white px-6 py-2.5 rounded-xl text-[10px] font-black uppercase tracking-widest hover:bg-esend-red transition-all shadow-lg hover:shadow-red-900/20">
          Espace Client
        </button>
      </div>
    </header>
  );
};

export default Header;
