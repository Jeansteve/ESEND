import React from 'react';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { AlertTriangle, Sparkles, Activity, ArrowRight, ShieldCheck, Target, Lightbulb } from 'lucide-react';

const pests = [
  {
    id: 'rongeur',
    name: 'Traitement des Nuisibles',
    species: 'Rats, Souris & Insectes',
    image: './frelon.jpg',
    icon: <AlertTriangle className="w-5 h-5 text-red-600" />,
    expertise: "Expertise radicale en dératisation et désinsectisation à Menton.",
    info: "Diagnostic des points d'entrée et protocoles d'éradication certifiés.",
    benefice: "Protection durable de votre habitat et de votre santé."
  },
  {
    id: 'desinfection',
    name: 'Désinfection',
    species: 'Protocoles Sanitaires',
    image: 'https://images.unsplash.com/photo-1584622650111-993a426fbf0a?q=80&w=2070&auto=format&fit=crop',
    icon: <Activity className="w-5 h-5 text-red-600" />,
    expertise: "Assainissement virucide et bactéricide de haut niveau.",
    info: "Intervention après infestation ou pour sécurisation de locaux.",
    benefice: "Un environnement purifié conforme aux normes de santé."
  },
  {
    id: 'nettoyage',
    name: 'Nettoyage & Vitres',
    species: 'Entretien de Prestige',
    image: 'https://images.unsplash.com/photo-1581091226825-a6a2a5aee158?q=80&w=1000&auto=format&fit=crop',
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
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-8 items-stretch pt-4">
          {pests.map((pest, index) => (
            <motion.div
              key={pest.id}
              variants={cardVariants}
              initial="initial"
              whileHover="hover"
              className="group relative flex flex-col border rounded-[2rem] p-6 lg:p-8 transition-all duration-500 overflow-hidden bg-slate-950 text-left min-h-[480px]"
            >
              {/* Image en Vrai Fond */}
              <div className="absolute inset-0 z-0">
                <img src={pest.image} alt={pest.name} className="w-full h-full object-cover grayscale brightness-50 group-hover:grayscale-0 group-hover:brightness-90 transition-all duration-700" />
                <div className="absolute inset-0 bg-gradient-to-t from-[#020617] via-[#020617]/90 to-[#020617]/10" />
                <div className="absolute inset-0 bg-red-900/5 opacity-0 group-hover:opacity-100 transition-opacity duration-700 mix-blend-color-burn" />
              </div>

              {/* Contenu de la Carte (Superposé au fond) */}
              <div className="relative z-10 flex flex-col h-full">
                {/* Icône en haut à droite */}
                <div className="self-end bg-black/60 backdrop-blur-md p-3 rounded-full border border-white/10 mb-auto shadow-2xl">
                  {pest.icon}
                </div>

                <div className="mt-auto pt-16">
                  <div className="mb-6">
                    <span className="text-[9px] font-black uppercase tracking-widest text-[#A72422] block mb-2">{pest.species}</span>
                    <h3 className="text-2xl lg:text-3xl font-black uppercase tracking-tighter text-white group-hover:text-red-500 transition-colors drop-shadow-md">{pest.name}</h3>
                  </div>
                <div className="flex gap-3">
                  <Target className="w-4 h-4 text-red-600 shrink-0 mt-0.5 opacity-60 group-hover:opacity-100" />
                  <p className="text-[11px] text-slate-400 leading-snug">{pest.expertise}</p>
                </div>
                <div className="flex gap-3">
                  <Lightbulb className="w-4 h-4 text-red-600 shrink-0 mt-0.5 opacity-60 group-hover:opacity-100" />
                  <p className="text-[11px] text-slate-400 leading-snug">{pest.info}</p>
                </div>
                <div className="flex gap-3">
                  <ShieldCheck className="w-4 h-4 text-red-600 shrink-0 mt-0.5 opacity-60 group-hover:opacity-100 transition-opacity" />
                  <p className="text-[11px] text-slate-200 leading-snug font-bold italic drop-shadow-sm">{pest.benefice}</p>
                </div>
              </div>
              <Link to={`/services/${pest.id}`} className="block relative z-10">
                <motion.div 
                  whileHover={{ x: 5 }}
                  className="w-full bg-white/10 backdrop-blur-md border border-white/20 text-white py-4 rounded-xl font-black text-[9px] uppercase tracking-widest transition-all flex items-center justify-center gap-2 group-hover:bg-red-600 group-hover:border-red-500 shadow-xl"
                >
                  Découvrir l'expertise <ArrowRight className="w-3 h-3" />
                </motion.div>
              </Link>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default PestSelector;
