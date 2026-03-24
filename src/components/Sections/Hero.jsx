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

  return (
    <section id="accueil" className="relative min-h-screen flex flex-col justify-center overflow-hidden bg-[#020617] text-white pt-24 lg:pt-0">
      {/* Background Layer */}
      <div className="absolute inset-0 z-0">
        <div className="absolute inset-0 bg-[#020617]" />
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_-20%,#1e1b4b,transparent)] opacity-40" />
      </div>

      <div className="max-w-[1440px] mx-auto px-6 w-full flex flex-col lg:flex-row items-center justify-between relative z-10">
        
        {/* Left Content - Text Only on Mobile */}
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, ease: "easeOut" }}
          className="lg:w-[45%] flex flex-col justify-center text-center lg:text-left mb-6 lg:mb-0"
        >
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full border border-red-500/20 bg-red-500/5 mb-6 w-fit mx-auto lg:mx-0">
            <span className="flex h-1.5 w-1.5 rounded-full bg-red-600 animate-pulse" />
            <span className="text-[10px] font-bold uppercase tracking-widest text-red-500">
              Experts certifiés Menton
            </span>
          </div>

          <h1 className="text-4xl md:text-5xl lg:text-6xl xl:text-7xl font-black tracking-tighter leading-[1] uppercase mb-6">
            VOTRE EXPERT <br/>
            <span className="text-red-600 drop-shadow-[0_0_30px_rgba(220,38,38,0.6)]">HYGIÈNE & NUISIBLES</span>
          </h1>
          
          <p className="text-sm md:text-lg text-slate-400 font-medium mb-10 max-w-md mx-auto lg:mx-0 leading-relaxed">
            Dératisation, nettoyage pro et débarrassage. Le duo de choc pour un intérieur sain et sécurisé.
          </p>
          
          {/* Desktop Only CTA Block */}
          <div className="hidden lg:flex flex-row gap-8 items-center justify-start mb-10">
            <motion.a 
              href="#devis"
              onClick={scrollToDevis}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="bg-red-600 text-white px-10 py-4.5 rounded-2xl font-black uppercase tracking-widest transition-all text-xs shadow-[0_15px_40px_rgba(220,38,38,0.4)] flex items-center gap-3 group"
            >
              <span>Obtenir mon devis</span>
              <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
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

        {/* Right Visual - Image with specialized Mobile CTA underneath */}
        <motion.div 
          initial={{ opacity: 0, scale: 0.95, x: 20 }}
          animate={{ opacity: 1, scale: 1, x: 0 }}
          transition={{ duration: 1, ease: "easeOut", delay: 0.3 }}
          className="lg:w-[55%] relative flex flex-col items-center lg:items-end w-full mt-auto lg:mt-0"
        >
          <div className="relative w-full max-w-[550px] lg:max-w-[750px] flex items-end justify-center">
            <img 
              src="./duo-experts-esend.png" 
              className="w-full h-auto object-contain z-10" 
              alt="Duo Experts ESEND"
            />
            
            {/* Floating Intelligence Card - Desktop ONLY or Mobile Adjusted */}
            <motion.div 
              animate={{ y: [0, -10, 0] }}
              transition={{ duration: 5, repeat: Infinity, ease: "easeInOut" }}
              className="absolute bottom-[20%] -right-4 lg:-left-12 bg-slate-900/90 backdrop-blur-xl p-4 lg:p-6 rounded-3xl shadow-[0_20px_50px_rgba(0,0,0,0.8)] z-20 border border-white/5 flex items-center gap-4 lg:gap-5 scale-75 lg:scale-100 hidden lg:flex"
            >
              <div className="w-10 h-10 lg:w-14 lg:h-14 bg-red-600 rounded-full flex items-center justify-center text-white shadow-[0_0_20px_rgba(220,38,38,0.4)]">
                <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"/></svg>
              </div>
              <div className="flex flex-col text-left">
                <span className="font-black text-xs lg:text-base uppercase tracking-tighter text-white leading-none">PROTECTION TOTALE</span>
                <span className="text-[8px] lg:text-[10px] font-bold text-red-500 uppercase tracking-widest mt-1">GARANTIE RÉSULTAT</span>
              </div>
            </motion.div>
          </div>

          {/* MOBILE ONLY CTA BLOCK - Underneath the image as requested */}
          <div className="lg:hidden w-full flex flex-col items-center gap-8 mt-12 mb-16">
            <motion.a 
              href="#devis"
              onClick={scrollToDevis}
              whileTap={{ scale: 0.95 }}
              className="w-full bg-gradient-to-r from-red-600 to-red-700 text-white px-8 py-5 rounded-2xl font-black uppercase tracking-[0.1em] text-sm shadow-[0_10px_30px_rgba(220,38,38,0.4)] border border-red-500/20 flex justify-between items-center"
            >
              <span>Obtenir mon devis</span>
              <ArrowRight className="w-5 h-5" />
            </motion.a>

            <div className="flex items-center gap-6 bg-white/5 backdrop-blur-md px-6 py-3 rounded-2xl border border-white/10">
              <div className="flex flex-col items-center">
                <span className="text-2xl font-black tracking-tighter text-white leading-none">4.9/5</span>
                <div className="flex gap-1 mt-1">
                  {[...Array(5)].map((_, i) => (
                    <Star key={i} className="w-2.5 h-2.5 fill-red-600 text-red-600" />
                  ))}
                </div>
              </div>
              <div className="w-px h-8 bg-white/10"></div>
              <span className="text-[9px] font-bold uppercase tracking-widest text-slate-400 text-center leading-tight">
                Note <br/>Satisfaction
              </span>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default Hero;
