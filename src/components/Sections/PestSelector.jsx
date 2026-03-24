import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Shield, Zap, AlertTriangle, Ghost, Sparkles, Trash2, Crosshair } from 'lucide-react';

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
  const [activeId, setActiveId] = useState(pests[0].id);

  return (
    <section id="nuisibles" className="py-32 px-6 bg-slate-950 text-white rounded-[3rem] lg:rounded-[5rem] mx-4 my-20 overflow-hidden border border-white/5 relative">
      <div className="max-w-7xl mx-auto">
        <div className="flex flex-col md:flex-row justify-between items-end mb-20 gap-8">
          <div className="max-w-2xl">
            <motion.div 
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="inline-flex items-center gap-2 text-red-600 font-black uppercase tracking-[0.2em] text-[10px] mb-4"
            >
              <span className="w-8 h-px bg-red-600"></span> Nos Dossiers Tactiques
            </motion.div>
            <h2 className="text-5xl lg:text-7xl font-black tracking-tighter uppercase mb-6 leading-none">
              Services <span className="text-red-600">ESEND</span>
            </h2>
            <p className="text-slate-400 font-medium text-lg italic">
              "L'expertise terrain au service de votre sérénité."
            </p>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {pests.map((pest) => (
            <motion.div
              key={pest.id}
              onClick={() => setActiveId(pest.id)}
              whileHover={{ scale: 1.02 }}
              className={`group relative cursor-pointer rounded-[2.5rem] p-6 transition-all duration-500 border ${
                activeId === pest.id 
                ? 'bg-slate-900 border-red-600 shadow-[0_0_50px_-12px_rgba(220,38,38,0.3)] z-10' 
                : 'bg-slate-900/50 border-white/5 hover:border-white/20'
              }`}
            >
              {/* Tactical HUD Header */}
              <div className="flex justify-between items-center mb-6 opacity-40 group-hover:opacity-100 transition-opacity">
                <span className="text-[10px] font-black uppercase tracking-widest text-white flex items-center gap-2">
                   <Crosshair className="w-3 h-3 text-red-600" /> SCAN_SYS_{pest.id.toUpperCase()}
                </span>
                <span className="text-[10px] font-black uppercase tracking-widest text-red-600">T_0{pests.indexOf(pest)+1}</span>
              </div>

              {/* Portrait */}
              <div className="relative aspect-[4/5] rounded-3xl overflow-hidden mb-6 border border-white/5">
                <img src={pest.image} alt={pest.name} className={`w-full h-full object-cover transition-transform duration-700 group-hover:scale-110 ${activeId !== pest.id ? 'grayscale' : ''}`} />
                <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-transparent to-transparent" />
                <div className="absolute bottom-4 left-4 font-black text-xl uppercase italic tracking-tighter text-white">
                  {pest.code}
                </div>
                <div className="absolute top-4 right-4 bg-slate-950/80 backdrop-blur-md p-2 rounded-full border border-red-600/30">
                  {pest.icon}
                </div>
              </div>

              {/* Header Info */}
              <div className="flex justify-between items-center mb-4">
                <span className="text-[10px] font-black uppercase tracking-widest text-red-600">
                  {pest.species}
                </span>
                <span className="bg-slate-800 text-slate-500 px-2 py-1 rounded text-[10px] font-black uppercase">
                  {pest.tier}
                </span>
              </div>
              <h3 className="text-2xl font-black uppercase tracking-tighter mb-6">{pest.name}</h3>

              {/* Expandable Details */}
              <AnimatePresence>
                {activeId === pest.id && (
                  <motion.div
                    initial={{ height: 0, opacity: 0 }}
                    animate={{ height: 'auto', opacity: 1 }}
                    exit={{ height: 0, opacity: 0 }}
                    className="overflow-hidden"
                  >
                    <div className="space-y-4 mb-6">
                      {pest.stats.map((stat) => (
                        <div key={stat.label}>
                          <div className="flex justify-between text-[9px] font-black uppercase mb-1.5 text-slate-400">
                            <span>{stat.label}</span>
                            <span className="text-white">{stat.value}%</span>
                          </div>
                          <div className="h-1 bg-white/5 rounded-full overflow-hidden">
                            <motion.div 
                              initial={{ width: 0 }}
                              animate={{ width: `${stat.value}%` }}
                              transition={{ duration: 1, delay: 0.2 }}
                              className="h-full bg-red-600 shadow-[0_0_10px_rgba(220,38,38,0.5)]"
                            />
                          </div>
                        </div>
                      ))}
                    </div>
                    <p className="text-xs text-slate-400 leading-relaxed mb-6 font-medium italic">
                      {pest.desc}
                    </p>
                    <motion.button 
                      whileHover={{ scale: 1.05 }}
                      whileTap={{ scale: 0.95 }}
                      className="w-full bg-white text-black py-4 rounded-2xl font-black text-[10px] uppercase tracking-widest hover:bg-red-600 hover:text-white transition-all shadow-xl"
                    >
                      Déployer le protocole
                    </motion.button>
                  </motion.div>
                )}
              </AnimatePresence>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default PestSelector;
