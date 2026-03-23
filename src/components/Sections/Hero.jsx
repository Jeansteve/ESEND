import React from 'react';
import { motion } from 'framer-motion';

const Hero = () => {
  return (
    <section id="accueil" className="relative min-h-screen flex items-center pt-20 overflow-hidden bg-black text-white">
      {/* Background with darker overlay */}
      <div className="absolute inset-0 z-0">
        <img 
          src="https://images.unsplash.com/photo-1584622650111-993a426fbf0a?q=80&w=2070&auto=format&fit=crop" 
          className="w-full h-full object-cover opacity-40 grayscale" 
          alt="Background Tactical"
        />
        <div className="absolute inset-0 bg-gradient-to-r from-black via-black/80 to-transparent" />
      </div>

      <div className="max-w-7xl mx-auto px-6 w-full flex flex-col lg:flex-row items-center gap-16 relative z-10">
        
        {/* Left Content */}
        <motion.div 
          initial={{ opacity: 0, x: -50 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, ease: "easeOut" }}
          className="lg:w-1/2"
        >
          <h1 className="text-7xl lg:text-9xl font-black tracking-tighter leading-[0.85] uppercase mb-8">
            Sécurité <br/><span className="text-esend-red">Absolue</span>
          </h1>
          
          <p className="text-xl text-zinc-400 font-medium mb-12 max-w-lg leading-relaxed">
            Dératisation et désinsectisation de haute précision. <br/>Nous protégeons votre environnement avec une rigueur militaire.
          </p>
          
          <div className="flex flex-col sm:flex-row gap-8 items-center">
            <button className="bg-esend-red text-white px-12 py-6 rounded-2xl font-black uppercase tracking-widest shadow-2xl shadow-red-900/40 hover:scale-105 active:scale-95 transition-all">
              Lancer le diagnostic
            </button>
            
            <div className="flex items-center gap-4">
              <div className="text-4xl font-black tracking-tighter">4.9/5</div>
              <div className="h-10 w-px bg-white/10"></div>
              <div className="text-[10px] font-bold uppercase tracking-widest text-zinc-500">
                Expertise <br/>Reconnue
              </div>
            </div>
          </div>
        </motion.div>

        {/* Right Visual */}
        <motion.div 
          initial={{ opacity: 0, scale: 0.9 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 1, ease: "easeOut", delay: 0.2 }}
          className="lg:w-1/2 relative"
        >
          <div className="bg-zinc-900 p-4 rounded-[4rem] shadow-2xl relative z-10 border border-white/5 overflow-hidden">
            <div className="rounded-[3.5rem] w-full aspect-[4/5] overflow-hidden relative border border-white/10">
              <img 
                src="https://images.unsplash.com/photo-1558444479-c86e1055639d?q=80&w=2070&auto=format&fit=crop" 
                className="w-full h-full object-cover" 
                alt="Expert ESEND Taskforce"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/80 to-transparent" />
            </div>
            
            {/* Floating Intelligence Card */}
            <motion.div 
              animate={{ y: [0, -10, 0] }}
              transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
              className="absolute -top-6 -right-6 bg-zinc-900 p-5 rounded-2xl shadow-2xl z-20 border border-white/10 flex items-center gap-4"
            >
              <div className="w-12 h-12 bg-esend-red rounded-full flex items-center justify-center text-white shadow-lg shadow-red-900/20">
                <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round"><polyline points="20 6 9 17 4 12"></polyline></svg>
              </div>
              <div>
                <div className="font-black text-sm uppercase tracking-tighter text-white">Certifié Biocide</div>
                <div className="text-[10px] font-bold text-zinc-500 uppercase tracking-widest">Agrément d'État</div>
              </div>
            </motion.div>
          </div>
          
          {/* Decorative Back Shape */}
          <div className="absolute -inset-6 bg-esend-red/10 rounded-[5rem] -z-10 rotate-3 border border-esend-red/20 blur-xl"></div>
        </motion.div>

      </div>
    </section>
  );
};

export default Hero;
