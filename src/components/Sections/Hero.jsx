import React from 'react';
import { motion } from 'framer-motion';
import { ArrowRight, Star } from 'lucide-react';

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

  const ctaPulseVariants = {
    initial: { scale: 1, boxShadow: "0 0 0px rgba(220, 38, 38, 0)" },
    animate: {
      scale: [1, 1.03, 1],
      boxShadow: [
        "0 0 0px rgba(220, 38, 38, 0.4)",
        "0 0 25px rgba(220, 38, 38, 0.7)",
        "0 0 0px rgba(220, 38, 38, 0.4)"
      ],
      transition: {
        duration: 2,
        repeat: Infinity,
        ease: "easeInOut"
      }
    }
  };

  return (
    <section id="accueil" className="relative min-h-[100dvh] lg:h-screen flex flex-col justify-center overflow-hidden bg-[#020617] text-white pt-12 lg:pt-0">
      <div className="absolute inset-0 z-0">
        <div className="absolute inset-0 bg-[#020617]" />
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_-20%,#1e1b4b,transparent)] opacity-40" />
      </div>

      <div className="max-w-[1440px] mx-auto px-6 w-full flex flex-grow flex-col lg:flex-row items-center justify-between relative z-10">
        
        {/* Left Content */}
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, ease: "easeOut" }}
          className="lg:w-[45%] flex flex-col justify-center text-center lg:text-left mb-0 lg:mb-0 pt-4 lg:pt-0"
        >
          <h1 className="text-3xl md:text-5xl lg:text-6xl xl:text-7xl font-black tracking-tighter leading-[1] uppercase mb-2 lg:mb-6">
            VOTRE EXPERT <br/>
            <span className="text-red-600 drop-shadow-[0_0_25px_rgba(220,38,38,0.4)]">HYGIÈNE & NUISIBLES</span>
          </h1>
          
          <p className="text-[11px] md:text-lg text-slate-400 font-medium mb-4 lg:mb-10 max-w-md mx-auto lg:mx-0 leading-relaxed">
            Dératisation, nettoyage pro et débarrassage. Le duo de choc pour un intérieur sain et sécurisé.
          </p>
          
          {/* Desktop CTA Block */}
          <div className="hidden lg:flex flex-row gap-8 items-center justify-start mb-10">
            <motion.a 
              href="#devis"
              onClick={scrollToDevis}
              variants={ctaPulseVariants}
              initial="initial"
              animate="animate"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.98 }}
              className="bg-red-600 text-white px-8 py-3.5 rounded-2xl font-black uppercase tracking-[0.15em] text-[11px] flex items-center gap-4 group cursor-pointer border border-red-500/20"
            >
              <span>Obtenir mon devis</span>
              <ArrowRight className="w-5 h-5 group-hover:translate-x-1.5 transition-transform duration-300" />
            </motion.a>
            
            <div className="flex items-center gap-4">
              <div className="text-3xl font-black tracking-tighter text-white">4.9<span className="text-lg text-slate-500">/5</span></div>
              <div className="h-8 w-px bg-slate-800"></div>
              <div className="text-[10px] font-bold uppercase tracking-widest text-slate-400 text-left">
                Note <br/>Satisfaction
              </div>
            </div>
          </div>

          {/* MOBILE ONLY CTA BLOCK - POSITIONED VERY TIGHT UNDER TEXT */}
          <div className="lg:hidden w-full flex flex-col items-center gap-4 mt-0 mb-6 relative z-30">
            <motion.a 
              href="#devis"
              onClick={scrollToDevis}
              variants={ctaPulseVariants}
              initial="initial"
              animate="animate"
              whileTap={{ scale: 0.95 }}
              className="w-full bg-red-600 text-white px-6 py-3.5 rounded-full font-black uppercase tracking-[0.12em] text-[10px] shadow-2xl border border-red-500/20 flex justify-between items-center cursor-pointer"
            >
              <span>Obtenir mon devis</span>
              <ArrowRight className="w-4 h-4" />
            </motion.a>

            <div className="flex items-center gap-5 bg-white/5 backdrop-blur-md px-5 py-2 rounded-xl border border-white/10">
              <div className="flex flex-col items-center">
                <span className="text-lg font-black tracking-tighter text-white leading-none">4.9/5</span>
                <div className="flex gap-1 mt-0.5">
                  {[...Array(5)].map((_, i) => (
                    <Star key={i} className="w-2 h-2 fill-red-600 text-red-600" />
                  ))}
                </div>
              </div>
              <div className="w-px h-5 bg-white/10"></div>
              <span className="text-[7px] font-bold uppercase tracking-widest text-slate-400 text-center leading-tight">
                Note <br/>Satisfaction
              </span>
            </div>
          </div>
        </motion.div>

        {/* Right Visual - Duo Image */}
        <motion.div 
          initial={{ opacity: 0, scale: 0.95, x: 20 }}
          animate={{ opacity: 1, scale: 1, x: 0 }}
          transition={{ duration: 1, ease: "easeOut", delay: 0.3 }}
          className="lg:w-[50%] relative flex flex-col items-center lg:items-end w-full mt-[-20px] lg:mt-0 lg:h-full justify-center lg:justify-end"
        >
          <div className="relative w-full max-w-[400px] lg:max-w-[600px] xl:max-w-[650px] flex items-end justify-center">
            <div className="relative w-full overflow-visible">
              <img 
                src="./duo-experts-esend.png?v=1774355595" 
                className="w-full h-auto object-contain z-10" 
                alt="Duo Experts ESEND"
              />
              <div className="absolute bottom-0 left-0 w-full h-[30%] bg-gradient-to-t from-[#020617] via-[#020617]/80 to-transparent z-20 pointer-events-none" />
            </div>
          </div>
        </motion.div>
      </div>

      {/* Scroll Indicator */}
      <motion.div 
        animate={{ y: [0, 6, 0], opacity: [0.3, 0.6, 0.3] }}
        transition={{ duration: 2, repeat: Infinity }}
        className="absolute bottom-4 left-1/2 -translate-x-1/2 hidden md:flex flex-col items-center gap-1 z-30"
      >
        <span className="text-[6px] font-bold uppercase tracking-[0.3em] text-white/30">Scroll</span>
        <div className="w-px h-8 bg-gradient-to-b from-red-600/50 to-transparent"></div>
      </motion.div>
    </section>
  );
};

export default Hero;
