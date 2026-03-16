import React from 'react';
import { motion } from 'framer-motion';

const Hero = () => {
  return (
    <section id="accueil" className="relative min-h-screen flex items-center pt-20 overflow-hidden bg-white">
      <div className="max-w-7xl mx-auto px-6 w-full flex flex-col lg:flex-row items-center gap-16">
        
        {/* Left Content */}
        <motion.div 
          initial={{ opacity: 0, x: -50 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.8, ease: "easeOut" }}
          className="lg:w-1/2"
        >
          <div className="inline-flex items-center gap-2 bg-black text-white px-3 py-1.5 rounded-full text-[9px] font-black uppercase tracking-widest mb-8">
            <span className="relative flex h-2 w-2">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-esend-red opacity-75"></span>
              <span className="relative inline-flex rounded-full h-2 w-2 bg-esend-red"></span>
            </span>
            Live : Technicien disponible
          </div>
          
          <h1 className="text-7xl lg:text-9xl font-black tracking-tighter leading-[0.85] uppercase mb-8 text-black">
            Sécurité <br/><span className="text-esend-red">Absolue</span>
          </h1>
          
          <p className="text-xl text-zinc-500 font-medium mb-12 max-w-lg leading-relaxed">
            Dératisation et désinsectisation de haute précision. <br/>Nous protégeons votre environnement avec une rigueur militaire.
          </p>
          
          <div className="flex flex-col sm:flex-row gap-8 items-center">
            <button className="bg-esend-red text-white px-12 py-6 rounded-2xl font-black uppercase tracking-widest shadow-2xl shadow-red-200 hover:scale-105 active:scale-95 transition-all">
              Lancer le diagnostic
            </button>
            
            <div className="flex items-center gap-4">
              <div className="text-4xl font-black tracking-tighter text-black">4.9/5</div>
              <div className="h-10 w-px bg-zinc-200"></div>
              <div className="text-[10px] font-bold uppercase tracking-widest text-zinc-400">
                Expertise <br/>Reconnue
              </div>
            </div>
          </div>
        </motion.div>

        {/* Right Visual */}
        <motion.div 
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 1, ease: "easeOut", delay: 0.2 }}
          className="lg:w-1/2 relative"
        >
          <div className="bg-white p-4 rounded-[4rem] shadow-[0_50px_100px_-20px_rgba(0,0,0,0.15)] relative z-10 border border-zinc-100 overflow-hidden">
            <img 
              src="https://images.unsplash.com/photo-1584622650111-993a426fbf0a?q=80&w=2070&auto=format&fit=crop" 
              className="rounded-[3.5rem] w-full aspect-[4/5] object-cover" 
              alt="Expert ESEND"
            />
            
            {/* Floating Intelligence Card */}
            <motion.div 
              animate={{ y: [0, -10, 0] }}
              transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
              className="absolute -top-6 -right-6 bg-white p-5 rounded-2xl shadow-2xl z-20 border border-zinc-50 flex items-center gap-4"
            >
              <div className="w-12 h-12 bg-green-500 rounded-full flex items-center justify-center text-white shadow-lg shadow-green-200">
                <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="3" stroke-linecap="round" stroke-linejoin="round"><polyline points="20 6 9 17 4 12"></polyline></svg>
              </div>
              <div>
                <div className="font-black text-sm uppercase tracking-tighter text-black">Certifié Biocide</div>
                <div className="text-[10px] font-bold text-zinc-400 uppercase tracking-widest">Agrément d'État</div>
              </div>
            </motion.div>
          </div>
          
          {/* Decorative Back Shape */}
          <div className="absolute -inset-6 bg-zinc-50 rounded-[5rem] -z-10 rotate-3 border border-zinc-100"></div>
        </motion.div>

      </div>
    </section>
  );
};

export default Hero;
