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
    <section id="accueil" className="relative h-screen min-h-[700px] flex items-center justify-center overflow-hidden bg-slate-950 text-white">
      {/* Background with darker overlay */}
      <div className="absolute inset-0 z-0">
        <div className="absolute inset-0 bg-slate-950" />
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_50%,rgba(17,24,39,1),rgba(2,6,23,1))]" />
        <div className="absolute inset-0 opacity-20 bg-[url('https://www.transparenttextures.com/patterns/carbon-fibre.png')]" />
      </div>

      <div className="max-w-7xl mx-auto px-6 w-full flex flex-col lg:flex-row items-center gap-12 lg:gap-16 relative z-10 pt-24 lg:pt-32">
        
        {/* Left Content */}
        <motion.div 
          initial={{ opacity: 0, x: -50 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.8, ease: "easeOut" }}
          className="lg:w-1/2 flex flex-col justify-center"
        >
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="inline-flex items-center gap-2 px-3 py-1 rounded-full border border-red-500/20 bg-red-500/5 mb-8 w-fit"
          >
            <span className="flex h-2 w-2 rounded-full bg-red-600 animate-pulse" />
            <span className="text-[10px] font-black uppercase tracking-widest text-red-500">
              Disponible 24/7 à Menton & Environs
            </span>
          </motion.div>

          <h1 className="text-4xl md:text-5xl lg:text-7xl font-black tracking-tighter leading-[1.05] uppercase mb-8">
            VOTRE EXPERT <br/>
            <span className="text-red-600 drop-shadow-[0_0_20px_rgba(220,38,38,0.4)]">HYGIÈNE & NUISIBLES</span> <br/>
            À MENTON
          </h1>
          
          <p className="text-base lg:text-xl text-slate-400 font-medium mb-12 max-w-lg leading-relaxed">
            Éradication, nettoyage et débarrassage. Un duo d'experts locaux pour un environnement sain, certifié et sécurisé.
          </p>
          
          <div className="flex flex-col sm:flex-row gap-8 items-center">
            <motion.a 
              href="#devis"
              onClick={scrollToDevis}
              whileHover={{ scale: 1.05, boxShadow: "0 0 30px rgba(220,38,38,0.4)" }}
              whileTap={{ scale: 0.95 }}
              className="w-full sm:w-auto bg-red-600 text-white px-10 py-5 rounded-2xl font-black uppercase tracking-widest transition-all text-center cursor-pointer shadow-xl shadow-red-900/20"
            >
              Demander un devis gratuit
            </motion.a>
            
            <div className="flex items-center gap-4">
              <div className="text-4xl font-black tracking-tighter">4.9/5</div>
              <div className="h-10 w-px bg-slate-800"></div>
              <div className="text-[10px] font-bold uppercase tracking-widest text-slate-500">
                Expertise <br/>Certifiée
              </div>
            </div>
          </div>
        </motion.div>

        {/* Right Visual - Duo Réaliste */}
        <motion.div 
          initial={{ opacity: 0, scale: 0.9, rotateY: 15 }}
          animate={{ opacity: 1, scale: 1, rotateY: 0 }}
          transition={{ duration: 1.2, ease: "easeOut", delay: 0.2 }}
          className="lg:w-1/2 relative perspective-1000 hidden lg:block"
        >
          <div className="relative z-10 p-2 rounded-[3.5rem] bg-gradient-to-br from-slate-800/30 to-slate-900/30 border border-white/5 backdrop-blur-xl shadow-2xl">
            <div className="rounded-[3rem] w-full aspect-[4/5] overflow-hidden relative border border-white/5">
              <img 
                src="https://images.unsplash.com/photo-1581578731548-c64695ce6958?q=80&w=2070&auto=format&fit=crop" 
                className="w-full h-full object-cover grayscale brightness-75 hover:grayscale-0 hover:brightness-100 transition-all duration-700" 
                alt="Duo Experts ESEND"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-slate-950/80 via-transparent to-transparent" />
              
              {/* Tactical HUD Overlays */}
              <div className="absolute top-8 left-8 p-3 border-l-2 border-t-2 border-red-600/50">
                <span className="text-[10px] font-black uppercase tracking-tighter text-white opacity-80">ID: ES-DUO-01</span>
              </div>
              <div className="absolute bottom-8 right-8 p-3 border-r-2 border-b-2 border-red-600/50 text-right">
                <span className="text-[10px] font-black uppercase tracking-tighter text-white opacity-80">LOC: MENTON_S01</span>
              </div>
            </div>
            
            {/* Floating Intelligence Card */}
            <motion.div 
              animate={{ y: [0, -12, 0] }}
              transition={{ duration: 5, repeat: Infinity, ease: "easeInOut" }}
              className="absolute -top-4 -right-4 bg-slate-900/95 backdrop-blur-xl p-6 rounded-3xl shadow-[0_20px_50px_rgba(0,0,0,0.5)] z-20 border border-red-600/20 flex items-center gap-4"
            >
              <div className="w-12 h-12 bg-red-600 rounded-full flex items-center justify-center text-white shadow-lg shadow-red-900/40">
                <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round"><path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"/></svg>
              </div>
              <div>
                <div className="font-black text-sm uppercase tracking-tighter text-white">PROTECTION TOTALE</div>
                <div className="text-[10px] font-bold text-slate-500 uppercase tracking-widest">GARANTIE RÉSULTAT</div>
              </div>
            </motion.div>
          </div>
          
          {/* Decorative Back Shape */}
          <div className="absolute -inset-10 bg-red-600/10 rounded-[5rem] -z-10 rotate-3 blur-3xl opacity-50" />
        </motion.div>

      </div>
      
      {/* Scroll Indicator */}
      <motion.div 
        animate={{ y: [0, 10, 0], opacity: [0.3, 1, 0.3] }}
        transition={{ duration: 2, repeat: Infinity }}
        className="absolute bottom-10 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2 opacity-50 z-10"
      >
        <span className="text-[8px] font-bold uppercase tracking-[0.2em]">Scroll</span>
        <div className="w-px h-12 bg-gradient-to-b from-red-600 to-transparent"></div>
      </motion.div>
    </section>
  );
};

export default Hero;
