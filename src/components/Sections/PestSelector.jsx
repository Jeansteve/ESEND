import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Link } from 'react-router-dom';
import { Bug, Rat, Droplets, Sparkles, ArrowRight } from 'lucide-react';

const services = [
  {
    id: 'nuisibles',
    name: 'Nuisibles',
    desc: 'Rats, Punaises & Insectes',
    icon: Bug,
    color: '#dc2626',
    bg: 'from-red-900/40 to-black',
  },
  {
    id: 'desinfection',
    name: 'Désinfection',
    desc: 'Protocoles Sanitaires',
    icon: Droplets,
    color: '#0891b2',
    bg: 'from-cyan-900/40 to-black',
  },
  {
    id: 'nettoyage',
    name: 'Nettoyage',
    desc: 'Entretien de Prestige',
    icon: Sparkles,
    color: '#ca8a04',
    bg: 'from-yellow-900/40 to-black',
  }
];

const PestSelector = () => {
  const [hovered, setHovered] = useState(null);

  return (
    <section className="min-h-screen bg-[#020617] flex items-center justify-center p-6">
      <div className="grid grid-cols-1 md:grid-cols-3 gap-8 w-full max-w-6xl">
        {services.map((s) => {
          const Icon = s.icon;
          return (
            <Link to={`/services/${s.id}`} key={s.id}>
              <motion.div
                className={`relative group h-80 rounded-3xl p-8 flex flex-col justify-end border border-white/10 overflow-hidden cursor-pointer bg-gradient-to-br ${s.bg}`}
                whileHover={{ y: -10, borderColor: s.color }}
                onHoverStart={() => setHovered(s.id)}
                onHoverEnd={() => setHovered(null)}
              >
                <div className="absolute inset-0 opacity-0 group-hover:opacity-20 transition-opacity duration-500" style={{ backgroundColor: s.color }} />
                
                <motion.div 
                  className="mb-4"
                  animate={{ scale: hovered === s.id ? 1.2 : 1 }}
                  transition={{ type: "spring", stiffness: 300 }}
                >
                  <Icon size={48} style={{ color: s.color }} />
                </motion.div>
                
                <h3 className="text-3xl font-black uppercase text-white mb-1">{s.name}</h3>
                <p className="text-slate-400 font-medium">{s.desc}</p>
                
                <motion.div 
                  className="mt-6 flex items-center text-white font-black text-xs uppercase tracking-widest gap-2"
                  initial={{ opacity: 0, x: -10 }}
                  animate={{ opacity: hovered === s.id ? 1 : 0, x: hovered === s.id ? 0 : -10 }}
                >
                  Explorer <ArrowRight size={14} />
                </motion.div>
              </motion.div>
            </Link>
          );
        })}
      </div>
    </section>
  );
};

export default PestSelector;
