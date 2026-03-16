import React from 'react';
import { motion } from 'framer-motion';
import { ShieldCheck, Target, Zap } from 'lucide-react';

const About = () => {
  return (
    <section id="expertise" className="py-32 px-6 bg-white overflow-hidden">
      <div className="max-w-7xl mx-auto flex flex-col lg:flex-row items-center gap-20">
        
        {/* Left Visual */}
        <div className="lg:w-1/2 relative">
          <motion.div 
            initial={{ opacity: 0, rotate: -5 }}
            whileInView={{ opacity: 1, rotate: 2 }}
            viewport={{ once: true }}
            className="bg-zinc-100 rounded-[4rem] p-4"
          >
            <div className="aspect-square bg-zinc-900 rounded-[3.5rem] overflow-hidden relative group">
              <img 
                src="https://images.unsplash.com/photo-1590650153855-d9e808231d41?q=80&w=2070&auto=format&fit=crop" 
                className="w-full h-full object-cover grayscale opacity-80 group-hover:grayscale-0 group-hover:opacity-100 transition-all duration-1000"
                alt="Expert en action"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-esend-zinc-950/60 to-transparent" />
            </div>
          </motion.div>

          {/* Experience Badge */}
          <motion.div 
            initial={{ x: 50, opacity: 0 }}
            whileInView={{ x: 0, opacity: 1 }}
            transition={{ delay: 0.3 }}
            viewport={{ once: true }}
            className="absolute top-1/2 -right-8 bg-white p-8 rounded-3xl shadow-[0_32px_64px_-12px_rgba(0,0,0,0.14)] border border-zinc-50"
          >
            <div className="text-esend-red font-black text-5xl tracking-tighter mb-1">10+</div>
            <div className="text-[10px] font-black uppercase tracking-widest text-zinc-400">Années de Maîtrise</div>
          </motion.div>
        </div>

        {/* Right Content */}
        <div className="lg:w-1/2">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
          >
            <div className="inline-flex items-center gap-2 text-esend-red font-black uppercase tracking-[0.2em] text-[10px] mb-6">
              <span className="w-8 h-px bg-esend-red"></span> L'Engagement ESEND
            </div>
            
            <h2 className="text-5xl lg:text-6xl font-black tracking-tighter uppercase mb-8 leading-[0.95] text-black">
              La Maîtrise <br/>du <span className="text-esend-red italic">Terrain</span>
            </h2>
            
            <p className="text-xl text-zinc-500 font-medium leading-relaxed mb-12 max-w-xl">
              Chaque intervention est une mission critique. J'interviens personnellement avec des protocoles de haute précision pour garantir un environnement sain et sécurisé. Mon approche combine technologie biocide et rigueur opérationnelle.
            </p>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-12">
              <div className="space-y-4">
                <div className="w-12 h-12 bg-zinc-50 rounded-2xl flex items-center justify-center text-black border border-zinc-100">
                  <ShieldCheck className="w-6 h-6" />
                </div>
                <h4 className="font-black text-sm uppercase tracking-tighter">Protection Totale</h4>
                <p className="text-xs text-zinc-400 font-medium leading-relaxed">
                  Garantie de résultat sur 100% de nos interventions avec suivi post-traitement.
                </p>
              </div>

              <div className="space-y-4">
                <div className="w-12 h-12 bg-zinc-50 rounded-2xl flex items-center justify-center text-black border border-zinc-100">
                  <Target className="w-6 h-6" />
                </div>
                <h4 className="font-black text-sm uppercase tracking-tighter">Bio-Technologie</h4>
                <p className="text-xs text-zinc-400 font-medium leading-relaxed">
                  Utilisation exclusive de produits certifiés éco-responsables et sécurisés pour les foyers.
                </p>
              </div>
            </div>
          </motion.div>
        </div>

      </div>
    </section>
  );
};

export default About;
