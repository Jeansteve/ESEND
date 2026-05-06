import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Camera, CheckCircle2, ChevronRight, Briefcase } from 'lucide-react';
import { api } from '../../lib/api';
import { Link } from 'react-router-dom';
import ProjectDetailModal from '../UI/ProjectDetailModal';
import EmptyState from '../UI/EmptyState';

const PortfolioBento = () => {
  const [interventions, setInterventions] = React.useState([]);
  const [selectedItem, setSelectedItem] = useState(null);

  React.useEffect(() => {
    api.getProjects().then(data => {
      // Trier par ID décroissant (plus récents d'abord) et limiter à 6
      const recentData = (data || [])
        .sort((a, b) => (b.id || 0) - (a.id || 0))
        .slice(0, 6);

      const sizedData = recentData.map((item, index) => ({
        ...item,
        size: item.size || (index % 3 === 0 ? 'col-span-2 row-span-2' : 'col-span-1 row-span-1')
      }));
      setInterventions(sizedData);
    });
  }, []);

  return (
    <section id="portfolio" className="py-32 px-6 bg-white text-slate-900 transition-colors duration-500">
      <div className="max-w-7xl mx-auto">
        <div className="flex flex-col md:flex-row justify-between items-end mb-20 gap-8">
          <div className="max-w-2xl text-left">
            <motion.div 
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="inline-flex items-center gap-2 text-red-600 font-black uppercase tracking-[0.2em] text-[10px] mb-4"
            >
              <span className="w-8 h-px bg-red-600"></span> ARCHIVES TERRAIN
            </motion.div>
            <h2 className="text-5xl lg:text-7xl font-black tracking-tighter uppercase mb-6 leading-none">
              Nos <span className="text-red-600 italic">Réalisations</span>
            </h2>
          </div>
          <Link to="/realisations" className="flex items-center gap-3 text-sm font-black uppercase tracking-widest text-slate-400 hover:text-white transition-colors group">
            Voir toutes les réalisations <ChevronRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
          </Link>
        </div>

        {/* Bento Grid */}
        {interventions.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-4 gap-6 auto-rows-[250px]">
            {interventions.map((item, index) => (
              <motion.div
                key={item.id || index}
                initial={{ opacity: 0, scale: 0.92, y: 30 }}
                whileInView={{ opacity: 1, scale: 1, y: 0 }}
                viewport={{ once: true, margin: "-50px" }}
                transition={{ delay: index * 0.08, duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
                onClick={() => setSelectedItem(item)}
                className={`group relative overflow-hidden rounded-[2.5rem] border border-black/5 cursor-pointer shadow-xl hover:shadow-2xl transition-all duration-500 ${item.size}`}
              >
                <img 
                  src={item.img || 'https://images.unsplash.com/photo-1600585154340-be6161a56a0c?q=80&w=2070'} 
                  alt={item.title} 
                  className="w-full h-full object-cover grayscale transition-all duration-700 group-hover:grayscale-0 group-hover:scale-110"
                  loading="lazy"
                  decoding="async"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-slate-950/20 to-transparent opacity-60 group-hover:opacity-90 transition-opacity" />
                
                <div className="absolute top-6 right-6 p-2 rounded-full bg-slate-950/80 backdrop-blur-md border border-red-600/30">
                  <Camera className="w-4 h-4 text-red-600" />
                </div>
                
                <div className="absolute bottom-8 left-8 right-8 text-left">
                  <span className="inline-block px-2 py-1 rounded-md bg-red-600 text-[9px] font-black uppercase tracking-widest text-white mb-3">
                     {item.tag}
                  </span>
                  <h3 className="text-xl font-black uppercase tracking-tighter leading-tight text-white mb-2 group-hover:text-red-600 transition-colors">
                    {item.title}
                  </h3>
                  <div className="flex items-center gap-2 text-slate-400 text-xs font-medium italic">
                     <CheckCircle2 className="w-3 h-3 text-red-600" /> {item.location}
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        ) : (
          <EmptyState 
            variant="light"
            icon={Briefcase}
            title="Archives en cours de numérisation"
            message="Nos dernières interventions sur le terrain sont en cours d'intégration par nos experts."
            actionLabel={null}
          />
        )}
      </div>

      <AnimatePresence>
        {selectedItem && (
          <ProjectDetailModal 
            project={selectedItem} 
            onClose={() => setSelectedItem(null)} 
          />
        )}
      </AnimatePresence>
    </section>
  );
};

export default PortfolioBento;
