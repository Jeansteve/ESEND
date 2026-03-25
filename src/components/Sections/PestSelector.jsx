import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Crosshair, ArrowRight } from 'lucide-react';
import { Link } from 'react-router-dom';

const pests = [
  {
    id: 'deratisation',
    name: 'Dératisation',
    code: 'Le Saboteur',
    species: 'Rats & Souris',
    tier: 'S',
    image: 'https://images.unsplash.com/photo-1452723312111-3a7d0db0e024?q=80&w=1000&auto=format&fit=crop',
    stats: [
      { label: 'Dégâts Matériels', value: 95 },
      { label: 'Risque Sanitaire', value: 85 },
      { label: 'Prolifération', value: 90 },
    ],
    desc: "Infiltration extrême. Détruit câbles et isolations. Porteur de maladies vectorielles."
  },
  {
    id: 'desinsectisation',
    name: 'Désinsectisation',
    code: "L'Invisible",
    species: 'Punaises & Cafards',
    tier: 'SS',
    image: 'https://images.unsplash.com/photo-1581091226825-a6a2a5aee158?q=80&w=1000&auto=format&fit=crop',
    stats: [
      { label: 'Résistance', value: 95 },
      { label: 'Nuisance Totale', value: 100 },
      { label: 'Difficulté', value: 98 },
    ],
    desc: "Experts en camouflage. Résistants aux traitements. Nécessitent une action rigoureuse."
  },
  {
    id: 'nettoyage',
    name: 'Nettoyage & Vitres',
    code: 'L\'Éclat',
    species: 'Locaux & Vitrages',
    tier: 'PRO',
    image: 'https://images.unsplash.com/photo-1584622650111-993a426fbf0a?q=80&w=2070&auto=format&fit=crop',
    stats: [
      { label: 'Transparence', value: 100 },
      { label: 'Hygiène', value: 98 },
      { label: 'Finition', value: 95 },
    ],
    desc: "Nettoyage spécialisé à Menton. Un résultat étincelant pour votre confort quotidien."
  },
  {
    id: 'debarrassage',
    name: 'Débarrassage',
    code: 'Le Vide',
    species: 'Encombrants & Gravats',
    tier: 'EXT',
    image: 'https://images.unsplash.com/photo-1595246140625-573b715d11dc?q=80&w=2070&auto=format&fit=crop',
    stats: [
      { label: 'Volume Traité', value: 100 },
      { label: 'Rapidité', value: 95 },
      { label: 'Tri Sélectif', value: 90 },
    ],
    desc: "Libérez votre espace. Nous gérons l'évacuation de vos encombrants avec soin."
  }
];

const PestSelector = () => {
  const [activeId, setActiveId] = useState(null);

  const cardVariants = {
    initial: { opacity: 0, y: 20 },
    whileInView: { opacity: 1, y: 0 },
    hover: { 
      y: -12,
      scale: 1.08,
      borderColor: 'rgba(220, 38, 38, 0.6)',
      boxShadow: '0 15px 50px -10px rgba(220, 38, 38, 0.4)',
      transition: { 
        type: 'spring', 
        stiffness: 400, 
        damping: 25 
      }
    }
  };

  return (
    <section id="nuisibles" className="relative h-[100dvh] lg:h-screen flex items-center justify-center bg-[#020617] text-white overflow-hidden py-4">
      <div className="max-w-[1440px] mx-auto px-6 w-full h-full flex flex-col justify-center">
        
        {/* Section Header - Compressed for 100vh */}
        <div className="mb-4 lg:mb-8 text-left">
          <motion.div 
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            className="inline-flex items-center gap-2 text-red-600 font-black uppercase tracking-[0.2em] text-[8px] mb-1"
          >
            <span className="w-6 h-px bg-red-600"></span> Nos Dossiers Tactiques
          </motion.div>
          <h2 className="text-2xl md:text-4xl lg:text-5xl font-black tracking-tighter uppercase mb-0 leading-none">
            Services <span className="text-red-600 drop-shadow-[0_0_20px_rgba(220,38,38,0.4)]">ESEND</span>
          </h2>
        </div>

        {/* Tactical Cards Grid - Reduced Gap for Fullscreen */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-3 lg:gap-4 xl:gap-5">
          {pests.map((pest, index) => (
            <motion.div
              key={pest.id}
              variants={cardVariants}
              initial="initial"
              whileInView="whileInView"
              whileHover="hover"
              viewport={{ once: true }}
              transition={{ delay: index * 0.05 }}
              onMouseEnter={() => setActiveId(pest.id)}
              onMouseLeave={() => setActiveId(null)}
              onClick={() => setActiveId(pest.id === activeId ? null : pest.id)}
              className={`group relative cursor-pointer rounded-[1.25rem] lg:rounded-[1.5rem] p-3 lg:p-4 transition-all duration-300 border h-auto flex flex-col ${
                activeId === pest.id 
                ? 'bg-slate-900/95 border-red-600/50 z-20 shadow-2xl' 
                : 'bg-white/[0.02] border-white/5'
              }`}
            >
              {/* Subtle Red Glow behind card on hover */}
              <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none rounded-[1.25rem]">
                <div className="absolute inset-[-1px] bg-red-600/5 blur-lg rounded-full" />
              </div>

              {/* Tactical HUD Header */}
              <div className="flex justify-between items-center mb-2 lg:mb-3 opacity-30 group-hover:opacity-100 transition-opacity relative z-10">
                <span className="text-[7px] lg:text-[8px] font-black uppercase tracking-widest text-white flex items-center gap-1.5">
                   <Crosshair className="w-2.5 h-2.5 text-red-600" /> FILE: {pest.id.slice(0,3).toUpperCase()}
                </span>
                <span className="text-[7px] lg:text-[8px] font-black text-red-600">RANK_{pest.tier}</span>
              </div>

              {/* Portrait */}
              <div className="relative aspect-[16/10] lg:aspect-[4/5] rounded-lg lg:rounded-xl overflow-hidden mb-3 border border-white/5 relative z-10">
                <img 
                  src={pest.image} 
                  alt={pest.name} 
                  className={`w-full h-full object-cover transition-all duration-700 group-hover:scale-105 ${activeId !== pest.id ? 'grayscale brightness-50' : 'brightness-90'}`} 
                />
                <div className="absolute inset-0 bg-gradient-to-t from-slate-950/90 via-transparent to-transparent" />
                <div className="absolute bottom-2 left-3 font-black text-sm lg:text-base uppercase italic tracking-tighter text-white">
                  {pest.code}
                </div>
              </div>

              {/* Content Container */}
              <div className="flex flex-col flex-grow relative z-10">
                <h3 className="text-base lg:text-lg font-black uppercase tracking-tighter mb-0.5 group-hover:text-red-600 transition-colors">{pest.name}</h3>
                <p className="text-[8px] lg:text-[9px] font-bold uppercase tracking-widest text-slate-500 mb-2">{pest.species}</p>

                {/* Expandable Details */}
                <AnimatePresence>
                  {activeId === pest.id && (
                    <motion.div
                      initial={{ height: 0, opacity: 0 }}
                      animate={{ height: 'auto', opacity: 1 }}
                      exit={{ height: 0, opacity: 0 }}
                      transition={{ duration: 0.25, ease: "easeInOut" }}
                      className="overflow-hidden border-t border-white/5 pt-3"
                    >
                      <div className="space-y-2 mb-3">
                        {pest.stats.map((stat) => (
                          <div key={stat.label}>
                            <div className="flex justify-between text-[7px] font-bold uppercase mb-0.5 text-slate-400">
                              <span>{stat.label}</span>
                              <span className="text-white font-black">{stat.value}%</span>
                            </div>
                            <div className="h-0.5 bg-white/5 rounded-full overflow-hidden">
                              <motion.div 
                                initial={{ width: 0 }}
                                animate={{ width: `${stat.value}%` }}
                                transition={{ duration: 0.8 }}
                                className="h-full bg-red-600"
                              />
                            </div>
                          </div>
                        ))}
                      </div>
                      
                      <Link 
                        to={`/services/${pest.id}`}
                        className="w-full bg-red-600 text-white py-2 rounded-lg font-black text-[8px] uppercase tracking-widest transition-all flex items-center justify-center gap-1.5 hover:bg-red-700 active:scale-95"
                      >
                        Découvrir l'expertise <ArrowRight className="w-2.5 h-2.5" />
                      </Link>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default PestSelector;
