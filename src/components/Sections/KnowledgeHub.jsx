import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { BookOpen, Activity, ShieldAlert, CheckCircle, ChevronRight, Info } from 'lucide-react';

const encyclopedia = [
  {
    id: 'rats',
    name: 'Rat Noir & Surmulot',
    cycle: 'Maturation en 2-3 mois. Jusqu'à 5 portées/an.',
    risks: 'Leptospirose, Salmonellose, Dommages électriques.',
    prevention: 'Bouchage des accès, gestion des déchets, étanchéité des gaines.',
    icon: <ShieldAlert className="w-5 h-5 text-red-600" />,
    image: 'https://images.unsplash.com/photo-1452723312111-3a7d0db0e024?q=80&w=1000&auto=format&fit=crop'
  },
  {
    id: 'punaises',
    name: 'Punaise de Lit',
    cycle: 'Œuf -> Adulte en 5 semaines. Survit 1 an sans repas.',
    risks: 'Dermatites, Anémie, Détresse psychologique importante.',
    prevention: 'Inspection des bagages, lavage à 60°C, housses anti-punaises.',
    icon: <Activity className="w-5 h-5 text-red-600" />,
    image: 'https://images.unsplash.com/photo-1581091226825-a6a2a5aee158?q=80&w=1000&auto=format&fit=crop'
  },
  {
    id: 'cafards',
    name: 'Blatte Germanique',
    cycle: 'Cycle rapide (100 jours). Forte résistance thermique.',
    risks: 'Allergies, Asthme, Contamination des denrées.',
    prevention: 'Nettoyage des graisses, suppression de l'humidité.',
    icon: <Info className="w-5 h-5 text-red-600" />,
    image: 'https://images.unsplash.com/photo-1628191139360-4083564d03fd?q=80&w=1000&auto=format&fit=crop'
  }
];

const KnowledgeHub = () => {
  const [activeTab, setActiveTab] = useState(encyclopedia[0].id);

  return (
    <section id="encyclopedie" className="py-32 px-6 bg-slate-950 text-white">
      <div className="max-w-7xl mx-auto">
        <div className="flex flex-col md:flex-row justify-between items-end mb-20 gap-8">
          <div className="max-w-2xl">
            <motion.div 
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="inline-flex items-center gap-2 text-red-600 font-black uppercase tracking-[0.2em] text-[10px] mb-4"
            >
              <span className="w-8 h-px bg-red-600"></span> CENTRE DE CONNAISSANCES
            </motion.div>
            <h2 className="text-5xl lg:text-7xl font-black tracking-tighter uppercase mb-6 leading-none">
              Encyclopédie <br />
              <span className="text-red-600 italic">Des Nuisibles</span>
            </h2>
          </div>
        </div>

        <div className="grid lg:grid-cols-12 gap-12">
          {/* Navigation Sidebar */}
          <div className="lg:col-span-4 space-y-4">
            {encyclopedia.map((item) => (
              <button
                key={item.id}
                onClick={() => setActiveTab(item.id)}
                className={`w-full text-left p-6 rounded-2xl border transition-all duration-300 flex items-center justify-between group ${
                  activeTab === item.id 
                  ? 'bg-slate-900 border-red-600 shadow-xl' 
                  : 'bg-slate-900/40 border-white/5 hover:border-white/20'
                }`}
              >
                <div className="flex items-center gap-4">
                  <div className={`p-3 rounded-xl ${activeTab === item.id ? 'bg-red-600 text-white' : 'bg-slate-800 text-slate-400'}`}>
                    {item.icon}
                  </div>
                  <span className="font-black uppercase tracking-tight text-sm">{item.name}</span>
                </div>
                <ChevronRight className={`w-4 h-4 transition-transform ${activeTab === item.id ? 'translate-x-1 text-red-600' : 'text-slate-600'}`} />
              </button>
            ))}
          </div>

          {/* Content Area */}
          <div className="lg:col-span-8">
            <AnimatePresence mode="wait">
              {encyclopedia.map((item) => item.id === activeTab && (
                <motion.div
                  key={item.id}
                  initial={{ opacity: 0, x: 20 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: -20 }}
                  transition={{ duration: 0.4 }}
                  className="bg-slate-900/60 rounded-[3rem] p-8 lg:p-12 border border-white/5 backdrop-blur-xl"
                >
                  <div className="grid md:grid-cols-2 gap-12 items-start">
                    <div className="space-y-8">
                      <div>
                        <h3 className="text-red-600 font-black uppercase tracking-widest text-[10px] mb-3 flex items-center gap-2">
                          <BookOpen className="w-4 h-4" /> Cycle de Vie
                        </h3>
                        <p className="text-slate-300 font-medium leading-relaxed">{item.cycle}</p>
                      </div>
                      
                      <div>
                        <h3 className="text-red-600 font-black uppercase tracking-widest text-[10px] mb-3 flex items-center gap-2">
                          <ShieldAlert className="w-4 h-4" /> Risques Sanitaires
                        </h3>
                        <p className="text-slate-300 font-medium leading-relaxed">{item.risks}</p>
                      </div>

                      <div className="p-6 bg-slate-950/80 rounded-2xl border border-red-600/20">
                        <h3 className="text-white font-black uppercase tracking-widest text-[10px] mb-4 flex items-center gap-2">
                          <CheckCircle className="w-4 h-4 text-green-500" /> Guide de Prévention
                        </h3>
                        <p className="text-slate-400 text-sm leading-relaxed italic">
                          "{item.prevention}"
                        </p>
                      </div>
                    </div>

                    <div className="relative aspect-square rounded-3xl overflow-hidden border border-white/10 group">
                      <img src={item.image} alt={item.name} className="w-full h-full object-cover grayscale group-hover:grayscale-0 transition-all duration-700 group-hover:scale-110" />
                      <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-transparent to-transparent" />
                    </div>
                  </div>
                </motion.div>
              ))}
            </AnimatePresence>
          </div>
        </div>
      </div>
    </section>
  );
};

export default KnowledgeHub;
