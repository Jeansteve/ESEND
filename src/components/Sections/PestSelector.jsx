import React from 'react';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { AlertTriangle, Sparkles, Activity, ArrowRight, ShieldCheck, Target, Lightbulb } from 'lucide-react';

const pests = [
  {
    id: 'rongeur',
    name: 'Traitement des Nuisibles',
    species: 'Rats, Souris & Insectes',
    image: './frelon-t5.png',
    isFloating: true,
    icon: <AlertTriangle className="w-5 h-5 text-red-600" />,
    expertise: "Expertise radicale en dératisation et désinsectisation à Menton.",
    info: "Diagnostic des points d'entrée et protocoles d'éradication certifiés.",
    benefice: "Protection durable de votre habitat et de votre santé."
  },
  {
    id: 'desinfection',
    name: 'Désinfection',
    species: 'Protocoles Sanitaires',
    image: './desinfection-t.png',
    isFloating: true,
    icon: <Activity className="w-5 h-5 text-red-600" />,
    expertise: "Assainissement virucide et bactéricide de haut niveau.",
    info: "Intervention après infestation ou pour sécurisation de locaux.",
    benefice: "Un environnement purifié conforme aux normes de santé."
  },
  {
    id: 'nettoyage',
    name: 'Nettoyage & Vitres',
    species: 'Entretien de Prestige',
    image: './nettoyage-t.png',
    isFloating: true,
    icon: <Sparkles className="w-5 h-5 text-red-600" />,
    expertise: "Propreté méticuleuse pour appartements et vitrages complexes.",
    info: "Matériel de pointe et finitions haute précision sans trace.",
    benefice: "Mise en valeur de votre patrimoine et confort visuel total."
  }
];

const cardVariants = {
  initial: {
    y: 0,
    scale: 1,
    borderColor: "rgba(255, 255, 255, 0.05)",
    backgroundColor: "rgba(15, 23, 42, 0.4)",
  },
  hover: {
    y: -10,
    scale: 1.05,
    borderColor: "rgba(220, 38, 38, 0.5)",
    backgroundColor: "rgba(15, 23, 42, 0.8)",
    boxShadow: "0px 20px 50px rgba(0, 0, 0, 0.5)",
    transition: {
      type: "spring",
      stiffness: 400,
      damping: 25
    }
  }
};

const PestSelector = () => {
  return (
    <section id="services" className="relative min-h-screen flex items-center justify-center bg-[#020617] text-white py-16 lg:py-0 overflow-hidden text-left">
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
          <h2 className="text-4xl lg:text-6xl font-black tracking-tighter uppercase mb-4 leading-none text-left">
            Services <span className="text-red-600 italic">ESEND</span>
          </h2>
          <p className="text-slate-400 font-medium text-base lg:text-lg italic border-l border-red-600 pl-4 text-left">
            "L'expertise terrain au service de votre sérénité."
          </p>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-8 items-stretch">
          {pests.map((pest, index) => (
            <motion.div
              key={pest.id}
              variants={cardVariants}
              initial="initial"
              whileHover="hover"
              className="group relative flex flex-col border rounded-[2rem] p-6 lg:p-8 transition-all duration-500 overflow-hidden bg-slate-900/40 text-left"
            >
              {pest.isFloating ? (
                <div className="relative h-56 w-full mb-6 flex items-center justify-center">
                   <div className="absolute top-0 right-0 bg-black/50 backdrop-blur-md p-2 rounded-full border border-white/10 z-0">
                     {pest.icon}
                   </div>
                   <motion.img 
                      animate={{ y: [0, -12, 0] }}
                      transition={{ repeat: Infinity, duration: 4, ease: 'easeInOut' }}
                      src={pest.image} 
                      className="w-full h-full object-contain filter drop-shadow-[0_20px_30px_rgba(0,0,0,0.8)] z-10 lg:grayscale lg:brightness-75 lg:opacity-90 group-hover:grayscale-0 group-hover:brightness-100 group-hover:opacity-100 transition-all duration-700"
                      alt={pest.name}
                   />
                </div>
              ) : (
                <div className="relative aspect-[16/9] rounded-2xl overflow-hidden mb-6 border border-white/5">
                  <img src={pest.image} alt={pest.name} className="w-full h-full object-cover grayscale brightness-75 group-hover:grayscale-0 group-hover:brightness-100 transition-all duration-700" />
                  <div className="absolute inset-0 bg-gradient-to-t from-slate-950/80 via-transparent to-transparent" />
                  <div className="absolute top-3 right-3 bg-black/50 backdrop-blur-md p-2 rounded-full border border-white/10">
                    {pest.icon}
                  </div>
                </div>
              )}
              <div className="mb-6">
                <span className="text-[9px] font-black uppercase tracking-widest text-red-600 block mb-1">{pest.species}</span>
                <h3 className="text-xl lg:text-2xl font-black uppercase tracking-tighter group-hover:text-red-600 transition-colors">{pest.name}</h3>
              </div>
              <div className="flex-grow space-y-4 mb-8">
                <div className="flex gap-3">
                  <Target className="w-4 h-4 text-red-600 shrink-0 mt-0.5 opacity-60 group-hover:opacity-100" />
                  <p className="text-[11px] text-slate-400 leading-snug">{pest.expertise}</p>
                </div>
                <div className="flex gap-3">
                  <Lightbulb className="w-4 h-4 text-red-600 shrink-0 mt-0.5 opacity-60 group-hover:opacity-100" />
                  <p className="text-[11px] text-slate-400 leading-snug">{pest.info}</p>
                </div>
                <div className="flex gap-3">
                  <ShieldCheck className="w-4 h-4 text-red-600 shrink-0 mt-0.5 opacity-60 group-hover:opacity-100" />
                  <p className="text-[11px] text-slate-300 leading-snug font-bold italic">{pest.benefice}</p>
                </div>
              </div>
              <Link to={`/services/${pest.id}`} className="block">
                <motion.div 
                  whileHover={{ x: 5 }}
                  className="w-full bg-white text-black py-4 rounded-xl font-black text-[9px] uppercase tracking-widest transition-all flex items-center justify-center gap-2 group-hover:bg-red-600 group-hover:text-white"
                >
                  Découvrir l'expertise <ArrowRight className="w-3 h-3" />
                </motion.div>
              </Link>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default PestSelector;
