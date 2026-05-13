import React from 'react';
import { motion } from 'framer-motion';
import { ShieldCheck, Target, Heart, Users } from 'lucide-react';

const About = () => {
  return (
    <section id="valeurs" className="py-8 md:py-32 px-8 md:px-12 lg:px-6 bg-[var(--bg-primary)] overflow-hidden transition-colors duration-400">
      <div className="max-w-7xl mx-auto flex flex-col lg:flex-row items-center gap-12 lg:gap-20">
        
        {/* Left Visual */}
        <div className="lg:w-1/2 relative">
          <motion.div 
            initial={{ opacity: 0, rotate: -5 }}
            whileInView={{ opacity: 1, rotate: 2 }}
            viewport={{ once: true }}
            className="bg-[var(--bg-secondary)] rounded-[4rem] p-4 border border-[var(--border-subtle)]"
          >
            <div className="aspect-square bg-slate-900 rounded-[3.5rem] overflow-hidden relative group">
                <img 
                src="/images/duo-experts-esend.webp" 
                className="w-full h-full object-cover transition-all duration-1000"
                alt="L'équipe ESEND : Experts en dératisation et désinfection à Menton"
                loading="lazy"
                decoding="async"
                width="600"
                height="600"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-slate-950/60 to-transparent" />
            </div>
          </motion.div>

          {/* Family/Duo Badge */}
          <motion.div 
            initial={{ x: 50, opacity: 0 }}
            whileInView={{ x: 0, opacity: 1 }}
            transition={{ delay: 0.3 }}
            viewport={{ once: true }}
            className="absolute top-1/2 -right-8 bg-[var(--bg-secondary)] p-8 rounded-3xl shadow-xl border border-[var(--border-subtle)]"
          >
            <div className="text-red-600 font-black text-5xl tracking-tighter mb-1 flex items-center gap-2">
                2 <Users className="w-8 h-8" />
            </div>
            <div className="text-[10px] font-black uppercase tracking-widest text-[var(--text-dimmed)]">Expertise Familiale</div>
          </motion.div>
        </div>

        {/* Right Content */}
        <div className="lg:w-1/2">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-80px" }}
            transition={{ duration: 0.7, ease: "easeOut" }}
          >
            <div className="inline-flex items-center gap-2 text-esend-red font-black uppercase tracking-[0.2em] text-[10px] mb-6">
              <span className="w-8 h-px bg-esend-red"></span> Expertise & Proximité
            </div>
            
            <h2 className="text-[clamp(2.5rem,8vw,3.75rem)] font-black tracking-tighter uppercase mb-8 leading-[0.95] text-[var(--text-main)]">
              Un Duo de Professionnels à <span className="text-red-600 italic">votre Service</span>
            </h2>
            
            <p className="text-xl text-[var(--text-dimmed)] font-medium leading-relaxed mb-12 max-w-xl">
              Entreprise locale et familiale, nous mettons notre savoir-faire au service de votre sérénité. De l'éradication des nuisibles au nettoyage de vitres haute finition, nous intervenons avec réactivité et discrétion à Menton et sur toute la Riviera.
            </p>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-12">
              <div className="space-y-4">
                <div className="w-12 h-12 bg-[var(--bg-secondary)] rounded-2xl flex items-center justify-center text-[var(--text-main)] border border-[var(--border-subtle)]">
                  <ShieldCheck className="w-6 h-6" />
                </div>
                <h3 className="font-black text-sm uppercase tracking-tighter text-[var(--text-main)]">Qualité & Discrétion</h3>
                <p className="text-xs text-[var(--text-dimmed)] font-medium leading-relaxed">
                  Chaque intervention est traitée avec la plus grande rigueur, garantissant un résultat irréprochable en toute confidentialité.
                </p>
              </div>

              <div className="space-y-4">
                <div className="w-12 h-12 bg-[var(--bg-secondary)] rounded-2xl flex items-center justify-center text-[var(--text-main)] border border-[var(--border-subtle)]">
                  <Heart className="w-6 h-6" />
                </div>
                <h3 className="font-black text-sm uppercase tracking-tighter text-[var(--text-main)]">Confiance & Réactivité</h3>
                <p className="text-xs text-[var(--text-dimmed)] font-medium leading-relaxed">
                  Interlocuteurs uniques, nous vous assurons une écoute directe et une réponse rapide adaptée à vos besoins réels.
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
