import React from 'react';
import { motion } from 'framer-motion';

const Hero = () => {
  const scrollToDevis = (e) => {
    e.preventDefault();
    const target = document.querySelector('#devis');
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
    <section id="accueil" className="relative min-h-screen flex items-center justify-center overflow-hidden bg-slate-950 text-white py-20 lg:py-0">
      {/* Background with darker overlay */}
      <div className="absolute inset-0 z-0">
        <div className="absolute inset-0 bg-slate-950" />
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_50%,rgba(17,24,39,1),rgba(2,6,23,1))]" />
        <div className="absolute inset-0 opacity-10 bg-[url('https://www.transparenttextures.com/patterns/carbon-fibre.png')]" />
      </div>

      <div className="max-w-7xl mx-auto px-6 w-full flex flex-col lg:flex-row items-center gap-8 lg:gap-12 relative z-10 pt-20 lg:pt-12">
        
        {/* Left Content */}
        <motion.div 
          initial={{ opacity: 0, x: -30 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.8, ease: "easeOut" }}
          className="lg:w-3/5 flex flex-col justify-center text-center lg:text-left"
        >
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="inline-flex items-center gap-2 px-3 py-1 rounded-full border border-red-500/20 bg-red-500/5 mb-6 w-fit mx-auto lg:mx-0"
          >
            <span className="flex h-1.5 w-1.5 rounded-full bg-red-600 animate-pulse" />
            <span className="text-[9px] font-bold uppercase tracking-widest text-red-500">
              Disponible 24/7 à Menton
            </span>
          </motion.div>

          <h1 className="text-3xl md:text-5xl lg:text-6xl font-black tracking-tighter leading-[1.1] uppercase mb-6">
            VOTRE EXPERT <br/>
            <span className="text-red-600 drop-shadow-[0_0_15px_rgba(220,38,38,0.4)]">HYGIÈNE & NUISIBLES</span> <br/>
            À MENTON
          </h1>
          
          <p className="text-sm md:text-base lg:text-lg text-slate-400 font-medium mb-10 max-w-lg mx-auto lg:mx-0 leading-relaxed">
            Éradication, nettoyage et débarrassage. Un duo d'experts locaux pour un environnement sain, certifié et sécurisé.
          </p>
          
          <div className="flex flex-col sm:flex-row gap-6 items-center justify-center lg:justify-start">
            <motion.a 
              href="#devis"
              onClick={scrollToDevis}
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              className="w-full sm:w-auto bg-red-600 text-white px-8 py-4 rounded-xl font-black uppercase tracking-widest transition-all text-[11px] shadow-lg shadow-red-900/20"
            >
              Demander un devis gratuit
            </motion.a>
            
            <div className="flex items-center gap-4">
              <div className="text-2xl font-black tracking-tighter">4.9/5</div>
              <div className="h-8 w-px bg-slate-800"></div>
              <div className="text-[9px] font-bold uppercase tracking-widest text-slate-500">
                Expertise <br/>Certifiée
              </div>
            </div>
          </div>
        </motion.div>

        {/* Right Visual - Duo Réaliste (Reduced size) */}
        <motion.div 
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 1, ease: "easeOut", delay: 0.3 }}
          className="lg:w-2/5 relative hidden lg:flex justify-end"
        >
          <div className="relative z-10 p-1.5 rounded-[2.5rem] bg-gradient-to-br from-slate-800/30 to-slate-900/30 border border-white/5 backdrop-blur-xl shadow-2xl max-w-[380px]">
            <div className="rounded-[2.2rem] w-full aspect-[4/5] overflow-hidden relative border border-white/5">
              <img 
                src="https://images.unsplash.com/photo-1581578731548-c64695ce6958?q=80&w=2070&auto=format&fit=crop" 
                className="w-full h-full object-cover grayscale brightness-90 hover:grayscale-0 transition-all duration-700" 
                alt="Duo Experts ESEND"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-slate-950/60 via-transparent to-transparent" />
              
              {/* Tactical HUD Overlays - Scaled Down */}
              <div className="absolute top-6 left-6 p-2 border-l-2 border-t-2 border-red-600/40">
                <span className="text-[9px] font-black uppercase tracking-tighter text-white opacity-60">ID: ES-DUO-01</span>
              </div>
            </div>
            
            {/* Floating Intelligence Card - Scaled Down and Repositioned */}
            <motion.div 
              animate={{ y: [0, -8, 0] }}
              transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
              className="absolute -bottom-4 -left-8 bg-slate-900/95 backdrop-blur-xl p-4 rounded-2xl shadow-2xl z-20 border border-white/5 flex items-center gap-3"
            >
              <div className="w-10 h-10 bg-red-600 rounded-full flex items-center justify-center text-white">
                <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round"><path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"/></svg>
              </div>
              <div>
                <div className="font-black text-[10px] uppercase tracking-tighter text-white">PROTECTION TOTALE</div>
                <div className="text-[8px] font-bold text-slate-500 uppercase tracking-widest">GARANTIE RÉSULTAT</div>
              </div>
            </motion.div>
          </div>
          
          {/* Decorative Back Shape */}
          <div className="absolute -inset-4 bg-red-600/5 rounded-[4rem] -z-10 rotate-3 blur-3xl opacity-30" />
        </motion.div>

      </div>
      
      {/* Scroll Indicator */}
      <motion.div 
        animate={{ y: [0, 8, 0], opacity: [0.2, 0.6, 0.2] }}
        transition={{ duration: 2, repeat: Infinity }}
        className="absolute bottom-8 left-1/2 -translate-x-1/2 hidden md:flex flex-col items-center gap-2 z-10"
      >
        <span className="text-[7px] font-bold uppercase tracking-[0.2em] opacity-50">Scroll</span>
        <div className="w-px h-8 bg-gradient-to-b from-red-600 to-transparent"></div>
      </motion.div>
    </section>
  );
};

export default Hero;
