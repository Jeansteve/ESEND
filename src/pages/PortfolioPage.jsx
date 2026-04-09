import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Camera, X, ShieldCheck, MapPin, Calendar, Target, Activity, ArrowLeft, Filter, Info } from 'lucide-react';
import { Link } from 'react-router-dom';
import { api } from '../lib/api';

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
          <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} className="fixed inset-0 z-[110] flex items-center justify-center p-4">
            <div className="absolute inset-0 bg-slate-950/95 backdrop-blur-3xl" onClick={() => setSelectedItem(null)} />
            
            <motion.div 
              initial={{ opacity: 0, scale: 0.9, y: 30 }} 
              animate={{ opacity: 1, scale: 1, y: 0 }} 
              exit={{ opacity: 0, scale: 0.9, y: 30 }} 
              className="relative w-full max-w-6xl max-h-[90vh] bg-slate-900 rounded-[3rem] border border-white/10 overflow-hidden shadow-3xl flex flex-col"
            >
              <button 
                onClick={() => setSelectedItem(null)} 
                className="absolute top-6 right-6 z-50 p-3 rounded-full bg-black/40 text-white hover:bg-red-600 hover:scale-110 transition-all border border-white/10"
              >
                <X className="w-6 h-6" />
              </button>

              <div className="flex-1 overflow-y-auto custom-scrollbar">
                {/* Header / Hero */}
                <div className="relative aspect-[21/9] w-full overflow-hidden">
                   <img src={selectedItem.img} className="w-full h-full object-cover" alt={selectedItem.title} />
                   <div className="absolute inset-0 bg-gradient-to-t from-slate-900 via-slate-900/40 to-transparent" />
                   <div className="absolute bottom-10 left-10 md:left-16 right-10 md:right-16">
                      <div className="flex items-center gap-3 mb-4">
                        <span className="px-4 py-1 rounded-full bg-red-600 text-[10px] font-black uppercase tracking-widest text-white">{selectedItem.tag}</span>
                        <span className="flex items-center gap-1.5 text-slate-300 text-[10px] font-bold uppercase tracking-widest"><MapPin className="w-3 h-3 text-red-500" /> {selectedItem.location}</span>
                      </div>
                      <h3 className="text-4xl md:text-6xl font-black uppercase text-white leading-tight">{selectedItem.title}</h3>
                   </div>
                </div>

                <div className="px-10 md:px-16 py-12 grid grid-cols-1 lg:grid-cols-12 gap-12">
                   {/* Main Content */}
                   <div className="lg:col-span-8 space-y-12">
                      {selectedItem.description && (
                         <div className="border-l-4 border-red-600 pl-8">
                            <p className="text-2xl text-slate-300 font-medium italic leading-relaxed">
                               "{selectedItem.description}"
                            </p>
                         </div>
                      )}

                      {/* Detail Story (Rich Text) */}
                      {selectedItem.content_html ? (
                         <div 
                           className="article-preview-content prose prose-invert prose-red max-w-none 
                                    prose-headings:text-white prose-p:text-slate-300
                                    prose-strong:text-white prose-blockquote:border-red-600"
                           dangerouslySetInnerHTML={{ __html: selectedItem.content_html }}
                         />
                      ) : (
                         <p className="text-slate-500 italic">Détails de l'intervention en cours de rédaction...</p>
                      )}

                      {/* Gallery */}
                      {(() => {
                        try {
                          const gallery = selectedItem.gallery ? JSON.parse(selectedItem.gallery) : [];
                          if (Array.isArray(gallery) && gallery.length > 0) {
                            return (
                              <div className="pt-12 border-t border-white/5">
                                 <h4 className="text-[10px] font-black uppercase tracking-[0.3em] text-red-600 mb-8 flex items-center gap-4">
                                    GALERIE PHOTOS <span className="h-px flex-1 bg-white/5"></span>
                                 </h4>
                                 <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                    {gallery.map((url, i) => (
                                       <div key={i} className="aspect-square rounded-3xl overflow-hidden border border-white/5 hover:border-red-600/30 transition-all group">
                                          <img src={url} className="w-full h-full object-cover group-hover:scale-110 transition-all duration-700" alt={`Intervention ${i}`} />
                                       </div>
                                    ))}
                                 </div>
                              </div>
                            );
                          }
                        } catch (e) { return null; }
                      })()}
                   </div>

                   {/* Sidebar / Specs */}
                   <div className="lg:col-span-4 space-y-8">
                      <div className="p-8 rounded-[2rem] bg-slate-800/50 border border-white/10 space-y-8 sticky top-8">
                         <div>
                            <div className="flex items-center gap-3 mb-4">
                               <Target className="w-5 h-5 text-red-600" />
                               <span className="text-[10px] font-black uppercase tracking-widest text-white">Méthode employée</span>
                            </div>
                            <p className="text-sm text-slate-400 font-medium leading-relaxed pl-8">
                               {selectedItem.method || 'Analyse technique approfondie.'}
                            </p>
                         </div>

                         <div>
                            <div className="flex items-center gap-3 mb-4">
                               <ShieldCheck className="w-5 h-5 text-emerald-500" />
                               <span className="text-[10px] font-black uppercase tracking-widest text-white">Résultat & Bilan</span>
                            </div>
                            <p className="text-sm text-slate-400 font-medium leading-relaxed pl-8">
                               {selectedItem.result || 'Succès de l\'opération.'}
                            </p>
                         </div>

                         <div className="pt-8 border-t border-white/5">
                            <div className="flex items-center gap-3 mb-4">
                               <Calendar className="w-5 h-5 text-slate-500" />
                               <span className="text-[10px] font-black uppercase tracking-widest text-white">Date intervention</span>
                            </div>
                            <p className="text-sm text-slate-400 font-medium pl-8">
                               {selectedItem.date || 'Récemment enregistré'}
                            </p>
                         </div>
                      </div>
                   </div>
                </div>

                {/* Footer Modal */}
                <div className="px-16 py-12 border-t border-white/5 flex flex-col md:flex-row items-center justify-between gap-6 text-[10px] font-black uppercase tracking-[0.2em] text-slate-500">
                   <div className="flex items-center gap-2">
                      <div className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
                      INTERVENTION CERTIFIÉE ESEND
                   </div>
                   <button onClick={() => setSelectedItem(null)} className="flex items-center gap-2 text-white hover:text-red-600 transition-colors">
                      <ArrowLeft className="w-4 h-4" /> Retour au portfolio
                   </button>
                </div>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default PortfolioPage;
