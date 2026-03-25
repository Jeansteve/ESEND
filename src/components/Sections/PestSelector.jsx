import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Shield, Zap, AlertTriangle, Ghost, Sparkles, Trash2, Crosshair, ArrowRight } from 'lucide-react';

const pests = [
  {
    id: 'rongeur',
    name: 'Dératisation',
    code: 'Le Saboteur',
    species: 'Rats & Souris',
    tier: 'S',
    image: 'https://images.unsplash.com/photo-1452723312111-3a7d0db0e024?q=80&w=1000&auto=format&fit=crop',
    icon: <AlertTriangle className="w-5 h-5 text-red-600" />,
    stats: [
      { label: 'Dégâts Matériels', value: 95 },
      { label: 'Risque Sanitaire', value: 85 },
      { label: 'Prolifération', value: 90 },
    ],
    desc: "Infiltration extrême. Détruit câbles et isolations. Porteur de maladies vectorielles."
  },
  {
    id: 'punaise',
    name: 'Désinsectisation',
    code: "L'Invisible",
    species: 'Punaises & Cafards',
    tier: 'SS',
    image: 'https://images.unsplash.com/photo-1581091226825-a6a2a5aee158?q=80&w=1000&auto=format&fit=crop',
    icon: <Ghost className="w-5 h-5 text-red-600" />,
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
    icon: <Sparkles className="w-5 h-5 text-red-600" />,
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
    icon: <Trash2 className="w-5 h-5 text-red-600" />,
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
    initial: { opacity: 0, y: 30 },
    whileInView: { opacity: 1, y: 0 },
    hover: { 
      y: -10,
      borderColor: 'rgba(220, 38, 38, 0.5)',
      boxShadow: '0 10px 40px -10px rgba(220, 38, 38, 0.3)',
      transition: { 
        type: 'spring', 
        stiffness: 300, 
        damping: 20 
      }
    }
  };

  return (
    <section id="services" className="relative min-h-screen lg:h-screen flex items-center justify-center bg-[#020617] text-white py-12 lg:py-0 overflow-hidden">
      <div className="max-w-[1440px] mx-auto px-6 w-full relative z-10 flex flex-col">
        
        {/* Section Header */}
        <div className="max-w-2xl mb-8 lg:mb-12 text-left pt-20 lg:pt-0">
          <motion.div 
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            className="inline-flex items-center gap-3 text-red-600 font-black uppercase tracking-[0.3em] text-[10px] mb-3"
          >
            <span className="w-8 h-px bg-red-600"></span> Nos Dossiers Tactiques
          </motion.div>
          <h2 className="text-3xl md:text-5xl lg:text-6xl font-black tracking-tighter uppercase mb-2 leading-none">
            Services <span className="text-red-600 drop-shadow-[0_0_20px_rgba(220,38,38,0.4)]">ESEND</span>
          </h2>
          <p className="text-slate-400 font-medium text-sm lg:text-base italic max-w-xl">
            "L'expertise terrain au service de votre sérénité."
          </p>
        </div>

        {/* Tactical Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 lg:gap-5 xl:gap-6">
          {pests.map((pest, index) => (
            <motion.div
              key={pest.id}
              variants={cardVariants}
              initial="initial"
              whileInView="whileInView"
              whileHover="hover"
              viewport={{ once: true }}
              transition={{ delay: index * 0.1 }}
              onMouseEnter={() => setActiveId(pest.id)}
              onMouseLeave={() => setActiveId(null)}
              onClick={() => setActiveId(pest.id === activeId ? null : pest.id)}
              className={`group relative cursor-pointer rounded-[1.5rem] lg:rounded-[2rem] p-4 lg:p-5 transition-all duration-500 border h-full flex flex-col ${
                activeId === pest.id 
                ? 'bg-slate-900/90 border-red-600/50 shadow-[0_20px_50px_-20px_rgba(220,38,38,0.4)] z-10' 
                : 'bg-white/[0.02] border-white/5'
              }`}
            >
              {/* Subtle Red Glow behind card on hover */}
              <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none rounded-[1.5rem] lg:rounded-[2rem]">
                <div className="absolute inset-[-1px] bg-red-600/10 blur-xl rounded-full" />
              </div>

              {/* Tactical HUD Header */}
              <div className="flex justify-between items-center mb-4 lg:mb-5 opacity-40 group-hover:opacity-100 transition-opacity relative z-10">
                <span className="text-[8px] lg:text-[9px] font-black uppercase tracking-widest text-white flex items-center gap-2">
                   <Crosshair className="w-3 h-3 text-red-600" /> FILE: {pest.id.slice(0,3).toUpperCase()}
                </span>
                <span className="text-[8px] lg:text-[9px] font-black text-red-600">RANK_{pest.tier}</span>
              </div>

              {/* Portrait */}
              <div className="relative aspect-[16/10] lg:aspect-[4/5] rounded-xl lg:rounded-2xl overflow-hidden mb-4 border border-white/5 relative z-10">
                <img 
                  src={pest.image} 
                  alt={pest.name} 
                  className={`w-full h-full object-cover transition-all duration-700 group-hover:scale-110 ${activeId !== pest.id ? 'grayscale brightness-50' : 'brightness-90'}`} 
                />
                <div className="absolute inset-0 bg-gradient-to-t from-slate-950/80 via-transparent to-transparent" />
                <div className="absolute bottom-3 left-4 font-black text-lg lg:text-xl uppercase italic tracking-tighter text-white">
                  {pest.code}
                </div>
              </div>

              {/* Content Container */}
              <div className="flex flex-col flex-grow relative z-10">
                <h3 className="text-lg lg:text-xl font-black uppercase tracking-tighter mb-1 group-hover:text-red-600 transition-colors">{pest.name}</h3>
                <p className="text-[9px] lg:text-[10px] font-bold uppercase tracking-widest text-slate-500 mb-4">{pest.species}</p>

                {/* Expandable Details */}
                <AnimatePresence>
                  {activeId === pest.id && (
                    <motion.div
                      initial={{ height: 0, opacity: 0 }}
                      animate={{ height: 'auto', opacity: 1 }}
                      exit={{ height: 0, opacity: 0 }}
                      transition={{ duration: 0.3, ease: "easeInOut" }}
                      className="overflow-hidden border-t border-white/5 pt-4"
                    >
                      <div className="space-y-2.5 mb-5">
                        {pest.stats.map((stat) => (
                          <div key={stat.label}>
                            <div className="flex justify-between text-[8px] font-bold uppercase mb-1 text-slate-400">
                              <span>{stat.label}</span>
                              <span className="text-white font-black">{stat.value}%</span>
                            </div>
                            <div className="h-1 bg-white/5 rounded-full overflow-hidden">
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
                      
                      <motion.button 
                        whileHover={{ scale: 1.02 }}
                        whileTap={{ scale: 0.98 }}
                        className="w-full bg-red-600 text-white py-3 rounded-xl font-black text-[9px] uppercase tracking-widest transition-all flex items-center justify-center gap-2"
                      >
                        Action <ArrowRight className="w-3 h-3" />
                      </motion.button>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            </motion.div>
          ))}
        </div>
      </div>

      {/* Decorative Light Elements */}
      <div className="absolute top-0 left-1/4 w-px h-full bg-gradient-to-b from-transparent via-red-600/5 to-transparent z-0 opacity-20" />
      <div className="absolute top-0 right-1/4 w-px h-full bg-gradient-to-b from-transparent via-white/5 to-transparent z-0 opacity-20" />
    </section>
  );
};

export default PestSelector;
