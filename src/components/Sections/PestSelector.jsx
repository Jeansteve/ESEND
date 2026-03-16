import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Shield, Zap, AlertTriangle, Ghost } from 'lucide-react';

const pests = [
  {
    id: 'rongeur',
    name: 'Rongeurs',
    code: 'Le Saboteur',
    species: 'Rattus Norvegicus',
    tier: 'S',
    image: 'https://images.unsplash.com/photo-1452723312111-3a7d0db0e024?q=80&w=1000&auto=format&fit=crop',
    icon: <AlertTriangle className="w-5 h-5" />,
    stats: [
      { label: 'Dégâts Matériels', value: 95 },
      { label: 'Risque Sanitaire', value: 85 },
      { label: 'Prolifération', value: 90 },
    ],
    desc: "Capacité d'infiltration extrême. Détruit câbles et isolations. Porteur de maladies vectorielles."
  },
  {
    id: 'punaise',
    name: 'Punaises de lit',
    code: "L'Invisible",
    species: 'Cimex Lectularius',
    tier: 'SS',
    image: 'https://images.unsplash.com/photo-1581091226825-a6a2a5aee158?q=80&w=1000&auto=format&fit=crop',
    icon: <Ghost className="w-5 h-5" />,
    stats: [
      { label: 'Dégâts Psychologiques', value: 100 },
      { label: 'Résistance', value: 95 },
      { label: 'Difficulté', value: 98 },
    ],
    desc: "Expert en camouflage. Résistant aux insecticides classiques. Nécessite un choc thermique."
  },
  {
    id: 'frelon',
    name: 'Frelons / Guêpes',
    code: 'Le Prédateur',
    species: 'Vespa Velutina',
    tier: 'A',
    image: 'https://images.unsplash.com/photo-1621252179027-94459d278660?q=80&w=1000&auto=format&fit=crop',
    icon: <Zap className="w-5 h-5" />,
    stats: [
      { label: 'Dangerosité Directe', value: 90 },
      { label: 'Agressivité', value: 85 },
      { label: 'Impact Écosystème', value: 95 },
    ],
    desc: "Menace aérienne. Attaque en essaim. Danger vital pour les personnes allergiques."
  },
  {
    id: 'hygiene',
    name: 'Désinfection',
    code: 'Le Fantôme',
    species: 'Micro-Pathogènes',
    tier: 'SSS',
    image: 'https://images.unsplash.com/photo-1584622650111-993a426fbf0a?q=80&w=1000&auto=format&fit=crop',
    icon: <Shield className="w-5 h-5" />,
    stats: [
      { label: 'Contagiosité', value: 98 },
      { label: 'Étendue Discrète', value: 100 },
      { label: 'Persistance', value: 80 },
    ],
    desc: "Menace microscopique. Colonise les surfaces et l'air. Nécessite une stérilisation moléculaire."
  }
];

const PestSelector = () => {
  const [activeId, setActiveId] = useState(pests[0].id);

  return (
    <section className="py-32 px-6 bg-esend-zinc-950 text-white rounded-[3rem] lg:rounded-[5rem] mx-4 my-20 overflow-hidden border border-white/5">
      <div className="max-w-7xl mx-auto">
        <div className="flex flex-col md:flex-row justify-between items-end mb-20 gap-8">
          <div className="max-w-2xl">
            <motion.div 
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              className="inline-flex items-center gap-2 text-esend-red font-black uppercase tracking-[0.2em] text-[10px] mb-4"
            >
              <span className="w-8 h-px bg-esend-red"></span> Dossiers Tactiques 2026
            </motion.div>
            <h2 className="text-5xl lg:text-7xl font-black tracking-tighter uppercase mb-6 leading-none">
              Archives des <span className="text-esend-red text-stroke-white">Menaces</span>
            </h2>
            <p className="text-zinc-400 font-medium text-lg">
              Identifiez votre adversaire pour activer le protocole d'éradication adapté.
            </p>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {pests.map((pest) => (
            <motion.div
              key={pest.id}
              onClick={() => setActiveId(pest.id)}
              className={`relative cursor-pointer rounded-[2.5rem] p-6 transition-all duration-500 border ${
                activeId === pest.id 
                ? 'bg-zinc-900 border-esend-red shadow-[0_0_50px_-12px_rgba(167,36,34,0.3)] scale-105 z-10' 
                : 'bg-zinc-900/50 border-white/5 grayscale hover:grayscale-0 hover:border-white/20'
              }`}
            >
              {/* Portrait */}
              <div className="relative aspect-[4/5] rounded-3xl overflow-hidden mb-6">
                <img src={pest.image} alt={pest.name} className="w-full h-full object-cover" />
                <div className="absolute inset-0 bg-gradient-to-t from-black via-black/20 to-transparent" />
                <div className="absolute bottom-4 left-4 font-black text-xl uppercase italic tracking-tighter">
                  {pest.code}
                </div>
                <div className="absolute top-4 right-4 bg-black/50 backdrop-blur-md p-2 rounded-full border border-white/10">
                  {pest.icon}
                </div>
              </div>

              {/* Header Info */}
              <div className="flex justify-between items-center mb-4">
                <span className="text-[10px] font-black uppercase tracking-widest text-esend-red">
                  {pest.species}
                </span>
                <span className="bg-zinc-800 text-zinc-500 px-2 py-1 rounded text-[10px] font-black uppercase">
                  Tier {pest.tier}
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
                          <div className="flex justify-between text-[9px] font-black uppercase mb-1.5 text-zinc-400">
                            <span>{stat.label}</span>
                            <span className="text-white">{stat.value}%</span>
                          </div>
                          <div className="h-1 bg-white/5 rounded-full overflow-hidden">
                            <motion.div 
                              initial={{ width: 0 }}
                              animate={{ width: `${stat.value}%` }}
                              transition={{ duration: 1, delay: 0.2 }}
                              className="h-full bg-esend-red"
                            />
                          </div>
                        </div>
                      ))}
                    </div>
                    <p className="text-xs text-zinc-400 leading-relaxed mb-6 font-medium italic">
                      {pest.desc}
                    </p>
                    <button className="w-full bg-white text-black py-4 rounded-2xl font-black text-[10px] uppercase tracking-widest hover:bg-esend-red hover:text-white transition-all shadow-xl active:scale-95">
                      Déployer le protocole
                    </button>
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
