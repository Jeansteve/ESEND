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
    <section id="accueil" className="relative min-h-screen lg:h-screen flex items-center justify-center overflow-hidden bg-slate-950 text-white pt-16 lg:pt-0">
      {/* Background Layer */}
      <div className="absolute inset-0 z-0">
        <div className="absolute inset-0 bg-slate-950" />
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_50%,rgba(17,24,39,1),rgba(2,6,23,1))]" />
        <div className="absolute inset-0 opacity-10 bg-[url('https://www.transparenttextures.com/patterns/carbon-fibre.png')]" />
      </div>

      <div className="max-w-[1440px] mx-auto px-6 w-full flex flex-col lg:flex-row items-center justify-between relative z-10">
        
        {/* Left Content - Precise Control over layout space */}
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, ease: "easeOut" }}
          className="lg:w-[40%] flex flex-col justify-center text-center lg:text-left pt-12 lg:pt-0"
        >
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 0.2 }}
            className="inline-flex items-center gap-2 px-3 py-1 rounded-full border border-red-500/20 bg-red-500/5 mb-6 w-fit mx-auto lg:mx-0"
          >
            <span className="flex h-1.5 w-1.5 rounded-full bg-red-600 animate-pulse" />
            <span className="text-[10px] font-bold uppercase tracking-widest text-red-500">
              Experts certifiés Menton
            </span>
          </motion.div>

          <h1 className="text-4xl md:text-6xl lg:text-7xl xl:text-[5rem] font-black tracking-tighter leading-[0.95] uppercase mb-6">
            VOTRE EXPERT <br/>
            <span className="text-red-600 drop-shadow-[0_0_30px_rgba(220,38,38,0.6)]">HYGIÈNE & NUISIBLES</span>
          </h1>
          
          <p className="text-sm md:text-lg text-slate-300 font-medium mb-10 max-w-md mx-auto lg:mx-0 leading-relaxed">
            Dératisation, nettoyage pro et débarrassage. Le duo de choc pour un intérieur sain et sécurisé.
          </p>
          
          <div className="flex flex-col sm:flex-row gap-6 items-center justify-center lg:justify-start">
            <motion.a 
              href="#devis"
              onClick={scrollToDevis}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="w-full sm:w-auto bg-red-600 text-white px-10 py-5 rounded-2xl font-black uppercase tracking-widest transition-all text-xs shadow-[0_15px_40px_rgba(220,38,38,0.4)]"
            >
              Obtenir mon devis
            </motion.a>
            
            <div className="flex items-center gap-4">
              <div className="text-3xl font-black tracking-tighter text-white">4.9<span className="text-lg text-slate-500">/5</span></div>
              <div className="h-8 w-px bg-slate-800"></div>
              <div className="text-[10px] font-bold uppercase tracking-widest text-slate-400 text-left">
                Note <br/>Satisfaction
              </div>
            </div>
          </div>
        </motion.div>

        {/* Right Visual - Massive Impact Image with no wasted space */}
        <motion.div 
          initial={{ opacity: 0, x: 50 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 1.2, ease: "easeOut", delay: 0.3 }}
          className="lg:w-[60%] relative flex justify-center lg:justify-end w-full mt-12 lg:mt-0"
        >
          {/* Main Visual Container - Removing extra borders to maximize image size */}
          <div className="relative w-full max-w-[850px] 2xl:max-w-[950px]">
            <div className="relative w-full flex justify-center items-end">
              <motion.img 
                src="./duo-experts-esend.png" 
                className="w-[110%] lg:w-full max-w-none lg:max-w-full h-auto object-contain drop-shadow-[0_20px_50px_rgba(0,0,0,0.8)] lg:drop-shadow-[0_35px_60px_rgba(0,0,0,0.8)]" 
                alt="Duo Experts ESEND : Homme Dératisation et Femme Nettoyage"
                initial={{ scale: 1.1, y: 40 }}
                animate={{ scale: 1, y: 0 }}
                transition={{ duration: 1.5, ease: "easeOut" }}
              />
              
              {/* Floating Intelligence Card - Mobile Optimized (smaller and bottom-right) */}
              <motion.div 
                animate={{ y: [0, -10, 0] }}
                transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
                className="absolute bottom-4 right-0 lg:bottom-12 lg:-left-16 lg:right-auto bg-slate-900/95 backdrop-blur-3xl p-4 lg:p-6 rounded-2xl lg:rounded-3xl shadow-[0_30px_70px_rgba(0,0,0,0.9)] z-20 border border-white/10 flex items-center gap-4 lg:gap-5"
              >
                <div className="w-10 h-10 lg:w-14 lg:h-14 bg-red-600 rounded-full flex items-center justify-center text-white shadow-[0_0_30px_rgba(220,38,38,0.5)]">
                  <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"/></svg>
                </div>
                <div>
                  <div className="font-black text-[10px] lg:text-base uppercase tracking-tighter text-white leading-tight">PROTECTION TOTALE</div>
                  <div className="text-[8px] lg:text-xs font-bold text-red-500 uppercase tracking-widest leading-tight">GARANTIE RÉSULTAT</div>
                </div>
              </motion.div>
            </div>
          </div>
          
          {/* Enhanced Glow Effect */}
          <div className="absolute inset-0 bg-red-600/10 rounded-full -z-10 blur-[150px] opacity-30 transform scale-150" />
        </motion.div>

      </div>
    </section>
  );
};

export default Hero;
