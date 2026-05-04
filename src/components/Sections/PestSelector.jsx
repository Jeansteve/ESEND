import React from 'react';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { AlertTriangle, Sparkles, Activity, ArrowRight, ShieldCheck, Target, Lightbulb } from 'lucide-react';

const pests = [
  {
    id: 'rongeur',
    name: 'Traitement des Nuisibles',
    species: 'Rats, Souris, Punaises & Insectes',
    image: '/images/frelon-t5.png',
    isFloating: true,
    icon: <AlertTriangle className="w-5 h-5 text-red-600" />,
    shadowColor: 'rgba(220, 38, 38, 0.6)', // Rouge
    expertise: "Éradication certifiée de Cafards, Guêpes, Frelons, Punaises de lit, Puces, Rats, Souris & Fourmis à Menton.",
    info: "Diagnostic des points d'entrée et protocoles d'éradication certifiés.",
    benefice: "Protection durable de votre habitat et de votre santé.",
    cta: "Dossiers & Traitements"
  },
  {
    id: 'desinfection',
    name: 'Désinfection',
    species: 'Protocoles Sanitaires',
    image: '/images/desinfection-t.png',
    isFloating: true,
    icon: <Activity className="w-5 h-5 text-red-600" />,
    shadowColor: 'rgba(2, 132, 199, 0.6)', // Bleu Profond
    expertise: "Assainissement virucide et bactéricide de haut niveau.",
    info: "Intervention après infestation ou pour sécurisation de locaux.",
    benefice: "Un environnement purifié conforme aux normes de santé.",
    cta: "Protocoles de Sécurité"
  },
  {
    id: 'nettoyage',
    name: 'Nettoyage & Vitres',
    species: 'Entretien de Prestige',
    image: '/images/nettoyage-t.png',
    isFloating: true,
    icon: <Sparkles className="w-5 h-5 text-red-600" />,
    shadowColor: 'rgba(13, 148, 136, 0.6)', // Cyan
    expertise: "Propreté méticuleuse pour appartements et vitrages complexes.",
    info: "Matériel de pointe et finitions haute précision sans trace.",
    benefice: "Mise en valeur de votre patrimoine et confort visuel total.",
    cta: "Prestations de Prestige"
  }
];

const cardVariants = {
  initial: {
    y: 0,
    scale: 1,
    borderColor: "var(--border-subtle)",
    backgroundColor: "var(--bg-card)",
  },
  hover: {
    y: -10,
    scale: 1.02,
    borderColor: "var(--accent-red)",
    backgroundColor: "var(--bg-secondary)",
    boxShadow: "0px 20px 50px rgba(0, 0, 0, 0.3)",
    transition: {
      type: "spring",
      stiffness: 400,
      damping: 25
    }
  }
};

const PestSelector = () => {
  return (
    <section id="services" className="relative min-h-screen flex items-center justify-center bg-[var(--bg-primary)] text-[var(--text-main)] py-16 lg:py-0 overflow-hidden text-left transition-colors duration-400">
      <div className="max-w-[1440px] mx-auto w-full px-6 relative z-10 flex flex-col">
        <div className="max-w-3xl mb-10 lg:mb-16 pt-20 lg:pt-0">
          <motion.div 
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            className="inline-flex items-center gap-3 text-red-600 font-black uppercase tracking-[0.3em] text-[9px] mb-3"
          >
            <span className="w-6 h-px bg-red-600"></span> Nos Dossiers Tactiques
          </motion.div>
          <h2 className="text-4xl lg:text-6xl font-black tracking-tighter uppercase mb-4 leading-none text-left text-[var(--text-main)]">
            Services <span className="text-red-600 italic">ESEND</span>
          </h2>
          <p className="text-[var(--text-dimmed)] font-medium text-base lg:text-lg italic border-l border-red-600 pl-4 text-left">
            "L'expertise terrain au service de votre sérénité."
          </p>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-8 items-stretch">
          {pests.map((pest, index) => (
            <motion.div
              key={pest.id}
              variants={cardVariants}
              initial={{ ...cardVariants.initial, opacity: 0, y: 40 }}
              whileInView={{ ...cardVariants.initial, opacity: 1, y: 0 }}
              whileHover="hover"
              viewport={{ once: true, margin: "-80px" }}
              transition={{ delay: index * 0.12, duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
              className="group relative flex flex-col border rounded-[2rem] p-6 lg:p-8 transition-all duration-500 overflow-hidden text-left"
            >
                   {/* Full-width link overlay for better UX */}
              <Link to={pest.id === "rongeur" ? "/services/nuisibles" : `/services/${pest.id}`} className="absolute inset-0 z-30" />

              {pest.isFloating ? (
                <div className="relative h-56 w-full mb-6 flex items-center justify-center">
                   <div className="absolute top-0 right-0 bg-[var(--bg-secondary)]/50 backdrop-blur-md p-2 rounded-full border border-[var(--border-subtle)] z-0 shadow-lg">
                     {pest.icon}
                   </div>
                    <motion.img 
                      variants={{
                        initial: { 
                          y: 0, 
                          filter: 'grayscale(100%) brightness(100%) drop-shadow(0 0 0 rgba(0,0,0,0))', 
                          opacity: 0.5 
                        },
                        hover: { 
                          y: [0, -12, 0],
                          filter: `grayscale(0%) brightness(100%) drop-shadow(0 20px 40px ${pest.shadowColor})`,
                          opacity: 1,
                          transition: { 
                            y: { repeat: Infinity, duration: 3, ease: 'easeInOut' },
                            filter: { duration: 0.4 },
                            opacity: { duration: 0.4 }
                          }
                        }
                      }}
                      src={pest.image} 
                      className="w-full h-full object-contain z-10"
                      style={{ transition: 'transform 0.7s ease' }}
                      alt={pest.name}
                   />
                </div>
              ) : (
                <div className="relative aspect-[16/9] rounded-2xl overflow-hidden mb-6 border border-white/5">
                  <img src={pest.image} alt={pest.name} className="w-full h-full object-cover grayscale brightness-75 group-hover:grayscale-0 group-hover:brightness-100 transition-all duration-700" loading="lazy" decoding="async" />

                  <div className="absolute inset-0 bg-gradient-to-t from-slate-950/80 via-transparent to-transparent" />
                  <div className="absolute top-3 right-3 bg-black/50 backdrop-blur-md p-2 rounded-full border border-white/10">
                    {pest.icon}
                  </div>
                </div>
              )}
              <div className="mb-6">
                <span className="text-[9px] font-black uppercase tracking-widest text-red-600 block mb-1">{pest.species}</span>
                <h3 className="text-xl lg:text-2xl font-black uppercase tracking-tighter group-hover:text-red-600 transition-colors text-[var(--text-main)]">{pest.name}</h3>
              </div>
              <div className="flex-grow space-y-5 mb-8">
                <motion.div 
                  whileHover={{ x: 5, scale: 1.02 }}
                  className="flex gap-3 cursor-default group/item transition-all"
                >
                  <Target className="w-4 h-4 text-red-600 shrink-0 mt-0.5 opacity-60 group-hover/item:opacity-100 group-hover/item:scale-110 transition-all" />
                  <p className="text-[11px] text-[var(--text-dimmed)] leading-snug group-hover/item:text-[var(--text-main)] transition-colors">{pest.expertise}</p>
                </motion.div>

                <motion.div 
                  whileHover={{ x: 5, scale: 1.02 }}
                  className="flex gap-3 cursor-default group/item transition-all"
                >
                  <Lightbulb className="w-4 h-4 text-red-600 shrink-0 mt-0.5 opacity-60 group-hover/item:opacity-100 group-hover/item:scale-110 transition-all" />
                  <p className="text-[11px] text-[var(--text-dimmed)] leading-snug group-hover/item:text-[var(--text-main)] transition-colors">{pest.info}</p>
                </motion.div>

                <motion.div 
                  whileHover={{ x: 5, scale: 1.02 }}
                  className="flex gap-3 cursor-default group/item transition-all"
                >
                  <ShieldCheck className="w-4 h-4 text-red-600 shrink-0 mt-0.5 opacity-60 group-hover/item:opacity-100 group-hover/item:scale-110 transition-all" />
                  <p className="text-[11px] text-[var(--text-main)] leading-snug font-bold italic">{pest.benefice}</p>
                </motion.div>
              </div>
              
              <div className="relative z-40">
                <motion.div 
                   whileHover={{ scale: 1.05, backgroundColor: "#dc2626", color: "#fff" }}
                   className="w-full bg-[var(--text-main)] text-[var(--bg-primary)] py-4 rounded-xl font-black text-[10px] uppercase tracking-widest transition-all flex items-center justify-center gap-3 shadow-xl border border-white/10 group-hover:shadow-[0_0_20px_rgba(220,38,38,0.3)]"
                >
                  {pest.cta} 
                  <motion.div
                    animate={{ x: [0, 5, 0] }}
                    transition={{ repeat: Infinity, duration: 1.5, ease: "easeInOut" }}
                  >
                    <ArrowRight className="w-3.5 h-3.5" />
                  </motion.div>
                </motion.div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default PestSelector;
