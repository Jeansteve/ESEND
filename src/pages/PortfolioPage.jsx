import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Camera, ShieldCheck, MapPin, Calendar, Target, Activity, ArrowLeft, Filter, Info } from 'lucide-react';
import { Link } from 'react-router-dom';
import { api } from '../lib/api';
import ProjectDetailModal from '../components/UI/ProjectDetailModal';

const categories = ['Tous', 'Nuisibles', 'Désinfection', 'Nettoyage'];

const PortfolioPage = () => {
  const [interventions, setInterventions] = React.useState([]);
  const [activeCategory, setActiveCategory] = useState('Tous');
  const [selectedItem, setSelectedItem] = useState(null);

  useEffect(() => {
    window.scrollTo(0, 0);
    api.getProjects().then(data => {
      setInterventions(data || []);
    });
  }, []);

  const filtered = activeCategory === 'Tous' 
    ? interventions 
    : interventions.filter(i => i.category === activeCategory);
  return (
    <div className="min-h-screen bg-slate-950 text-white pb-32 text-left">
      <section className="pt-40 pb-20 px-6 bg-gradient-to-b from-slate-900 to-slate-950 border-b border-white/5">
        <div className="max-w-7xl mx-auto">
          <Link to="/" className="inline-flex items-center gap-2 text-slate-400 hover:text-red-600 mb-12 text-sm font-black uppercase tracking-widest"><ArrowLeft className="w-4 h-4" /> Accueil</Link>
          <div className="max-w-3xl">
            <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="text-red-600 font-black uppercase tracking-[0.2em] text-[10px] mb-4">OPÉRATIONS TERRAIN</motion.div>
            <h1 className="text-6xl font-black uppercase mb-8">Nos <span className="text-red-600 italic">Réalisations</span></h1>
            <p className="text-xl text-slate-400 italic">Découvrez nos interventions documentées par le Duo.</p>
          </div>
        </div>
      </section>
      <section className="sticky top-20 z-40 bg-slate-950/80 backdrop-blur-xl border-b border-white/5 py-6 px-6">
        <div className="max-w-7xl mx-auto flex flex-wrap justify-center gap-4">
          {categories.map(c => (
            <button key={c} onClick={() => setActiveCategory(c)} className={`px-6 py-2 rounded-full text-[10px] font-black uppercase tracking-widest border transition-all ${activeCategory === c ? 'bg-red-600 border-red-600 text-white' : 'border-white/10 text-slate-400 hover:border-white/30'}`}>{c}</button>
          ))}
        </div>
      </section>
      <section className="py-20 px-6">
        <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          <AnimatePresence mode='popLayout'>
            {filtered.map(item => (
              <motion.div layout key={item.id} initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} onClick={() => setSelectedItem(item)} className="group relative overflow-hidden rounded-[2.5rem] border border-white/5 cursor-pointer bg-slate-900 aspect-square">
                <img src={item.img} alt={item.title} className="w-full h-full object-cover grayscale group-hover:grayscale-0 group-hover:scale-110 transition-all duration-700" />
                <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-transparent opacity-60" />
                <div className="absolute bottom-10 left-10 right-10">
                  <span className="px-2 py-1 rounded bg-red-600 text-[9px] font-black uppercase text-white mb-3 inline-block">{item.tag}</span>
                  <h3 className="text-2xl font-black uppercase text-white group-hover:text-red-600 transition-colors">{item.title}</h3>
                </div>
              </motion.div>
            ))}
          </AnimatePresence>
        </div>
      </section>
      <AnimatePresence>
        {selectedItem && (
          <ProjectDetailModal 
            project={selectedItem} 
            onClose={() => setSelectedItem(null)} 
          />
        )}
      </AnimatePresence>
    </div>
  );
};

export default PortfolioPage;
