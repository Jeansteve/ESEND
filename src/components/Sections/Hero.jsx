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
    <section id="accueil" className="relative h-[100dvh] lg:h-screen flex flex-col justify-start lg:justify-center overflow-hidden bg-slate-950 text-white pt-32 lg:pt-0 transition-colors duration-400">
      <div className="absolute inset-0 z-0">
        {/* Main Hero Background - Powered by V3.3.10 Asset Management */}
        <img 
          src="./hero-menton-v2.jpg" 
          alt="ESEND Context" 
          className="w-full h-full object-cover opacity-60 lg:opacity-80"
        />
        <div className="absolute inset-0 bg-gradient-to-r from-slate-950 via-slate-950/40 to-transparent z-1" />
        <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-transparent to-slate-950/20 z-1" />
      </div>

      <div className="max-w-7xl mx-auto px-6 lg:px-12 w-full flex-grow flex flex-col lg:flex-row items-center justify-between relative z-10 py-6 lg:py-0">
        
        {/* Left Content - Adaptive Scaling */}
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, ease: "easeOut" }}
          className="lg:w-[45%] flex flex-col justify-center text-center lg:text-left"
        >
          <h1 className="text-[clamp(1.75rem,4.5vh,4rem)] lg:text-6xl xl:text-7xl font-black tracking-tighter leading-[1.1] uppercase mb-[clamp(0.5rem,1.5vh,1rem)] text-[var(--text-main)]">
            VOTRE EXPERT <br/>
            <span className="text-red-600 drop-shadow-[0_0_25px_rgba(220,38,38,0.4)]">HYGIÈNE & NUISIBLES</span>
          </h1>
          
          <p className="text-[clamp(0.7rem,1.6vh,1rem)] lg:text-lg text-[var(--text-dimmed)] font-medium mb-0 lg:mb-10 max-w-md mx-auto lg:mx-0 leading-relaxed">
            Traitement des Nuisibles, Désinfection et Nettoyage & Vitres. Notre duo d'experts intervient sur Menton et la Riviera pour un intérieur sain et rutilant.
          </p>
          
          {/* Desktop CTA Block */}
          <div className="hidden lg:flex flex-row gap-8 items-center justify-start mb-10 mt-10">
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
              <div className="text-3xl font-black tracking-tighter text-[var(--text-main)]">4.9<span className="text-lg text-[var(--text-dimmed)]">/5</span></div>
              <div className="h-8 w-px bg-[var(--border-subtle)]"></div>
              <div className="text-[10px] font-bold uppercase tracking-widest text-[var(--text-dimmed)] text-left">
                Note <br/>Satisfaction
              </div>
            </div>
          </div>
        </motion.div>

        {/* Right Visual - Smart Scale Duo & Mobile CTA */}
        <motion.div 
          initial={{ opacity: 0, scale: 0.95, x: 20 }}
          animate={{ opacity: 1, scale: 1, x: 0 }}
          transition={{ duration: 1, ease: "easeOut", delay: 0.3 }}
          className="lg:w-[50%] relative flex flex-col items-center lg:items-start w-full flex-grow lg:flex-none justify-center"
        >
          {/* Visual Space Reserved for Background Duo */}
          <div className="relative w-full max-w-[min(380px,75vw)] lg:max-w-[650px] flex items-end justify-center flex-grow lg:flex-none max-h-[40vh] lg:max-h-none my-4 lg:my-0 h-[400px]">
             {/* Spacing empty to show background photo clearly */}
          </div>

          {/* MOBILE ONLY CTA BLOCK */}
          <div className="lg:hidden w-full flex flex-col items-center gap-[clamp(0.5rem,1.5vh,1rem)] mt-auto mb-4 relative z-30">
            <motion.a 
              href="#devis"
              onClick={scrollToDevis}
              variants={ctaPulseVariants}
              initial="initial"
              animate="animate"
              whileTap={{ scale: 0.95 }}
              className="w-full bg-red-600 text-white px-6 py-4 rounded-full font-black uppercase tracking-[0.12em] text-[10px] shadow-2xl border border-red-500/20 flex justify-between items-center cursor-pointer"
            >
              <span>Obtenir mon devis</span>
              <ArrowRight className="w-4 h-4" />
            </motion.a>

            <div className="flex items-center gap-4 bg-white/5 backdrop-blur-md px-4 py-2 rounded-xl border border-white/10">
              <div className="flex flex-col items-center">
                <span className="text-[clamp(1rem,2.5vh,1.25rem)] font-black tracking-tighter text-white leading-none">4.9/5</span>
                <div className="flex gap-0.5 mt-0.5">
                  {[...Array(5)].map((_, i) => (
                    <Star key={i} className="w-2 h-2 fill-red-600 text-red-600" />
                  ))}
                </div>
              </div>
              <div className="w-px h-4 bg-white/10"></div>
              <span className="text-[7px] font-bold uppercase tracking-widest text-slate-400 text-center leading-tight">
                Note <br/>Satisfaction
              </span>
            </div>
          </div>
        </motion.div>
      </div>

      <div className="absolute bottom-0 left-0 w-full h-32 bg-gradient-to-t from-[var(--bg-primary)] to-transparent z-25 pointer-events-none" />
    </section>
  );
};

export default Hero;
