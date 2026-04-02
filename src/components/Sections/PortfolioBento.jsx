import React from 'react';
import { motion } from 'framer-motion';
import { Camera, CheckCircle2, ChevronRight } from 'lucide-react';

import { api } from '../../lib/api';

const PortfolioBento = () => {
  const [interventions, setInterventions] = React.useState([]);

  React.useEffect(() => {
    api.getProjects().then(data => {
      // On s'assure que chaque item a une taille bento, sinon on assigne une taille par défaut
      const sizedData = data.map((item, index) => ({
        ...item,
        size: item.size || (index % 3 === 0 ? 'col-span-2 row-span-2' : 'col-span-1 row-span-1')
      }));
      setInterventions(sizedData);
    });
  }, []);
  return (
    <section id="portfolio" className="py-32 px-6 bg-slate-950 text-white">
      <div className="max-w-7xl mx-auto">
        <div className="flex flex-col md:flex-row justify-between items-end mb-20 gap-8">
          <div className="max-w-2xl">
            <motion.div 
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="inline-flex items-center gap-2 text-red-600 font-black uppercase tracking-[0.2em] text-[10px] mb-4"
            >
              <span className="w-8 h-px bg-red-600"></span> ARCHIVES TERRAIN
            </motion.div>
            <h2 className="text-5xl lg:text-7xl font-black tracking-tighter uppercase mb-6 leading-none">
              Nos <span className="text-red-600 italic">Réalisations</span> <br />
              Réelles
            </h2>
          </div>
          <button className="flex items-center gap-3 text-sm font-black uppercase tracking-widest text-slate-400 hover:text-white transition-colors">
            Voir toutes les réalisations <ChevronRight className="w-4 h-4" />
          </button>
        </div>

        {/* Bento Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-4 gap-6 auto-rows-[250px]">
          {interventions.map((item, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, scale: 0.9 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.1 }}
              className={`group relative overflow-hidden rounded-[2.5rem] border border-white/5 ${item.size}`}
            >
              <img 
                src={item.img} 
                alt={item.title} 
                className="w-full h-full object-cover grayscale transition-all duration-700 group-hover:grayscale-0 group-hover:scale-110"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-slate-950/20 to-transparent opacity-60 group-hover:opacity-90 transition-opacity" />
              
              <div className="absolute top-6 right-6 p-2 rounded-full bg-slate-950/80 backdrop-blur-md border border-red-600/30">
                <Camera className="w-4 h-4 text-red-600" />
              </div>
              
              <div className="absolute bottom-8 left-8 right-8">
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
      </div>
    </section>
  );
};

export default PortfolioBento;
