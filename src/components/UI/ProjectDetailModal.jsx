import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, ShieldCheck, MapPin, Calendar, Target, ArrowLeft } from 'lucide-react';

/**
 * @component ProjectDetailModal
 * @description Modale d'affichage magazine premium pour les réalisations.
 * Partagé entre la page Portfolio et le Bento de la Home.
 */
const ProjectDetailModal = ({ project, onClose }) => {
  if (!project) return null;

  return (
    <motion.div 
      initial={{ opacity: 0 }} 
      animate={{ opacity: 1 }} 
      exit={{ opacity: 0 }} 
      className="fixed inset-0 z-[110] flex items-center justify-center p-2 md:p-4"
    >
      <div 
        className="absolute inset-0 bg-slate-950/95 backdrop-blur-3xl" 
        onClick={onClose} 
      />
      
      <motion.div 
        initial={{ opacity: 0, scale: 0.9, y: 30 }} 
        animate={{ opacity: 1, scale: 1, y: 0 }} 
        exit={{ opacity: 0, scale: 0.9, y: 30 }} 
        className="relative w-full max-w-6xl max-h-[95vh] bg-white rounded-[2rem] md:rounded-[3rem] border border-black/5 overflow-hidden shadow-3xl flex flex-col selection:bg-red-100"
      >
        <button 
          onClick={onClose} 
          className="absolute top-4 right-4 md:top-6 md:right-6 z-50 p-2 md:p-3 rounded-full bg-white/80 backdrop-blur-md text-slate-900 hover:bg-red-600 hover:text-white hover:scale-110 transition-all border border-black/10 shadow-lg"
        >
          <X className="w-5 h-5 md:w-6 md:h-6" />
        </button>

        <div className="flex-1 overflow-y-auto custom-scrollbar text-left">
          {/* Header / Hero */}
          <div className="relative aspect-[21/9] min-h-[300px] w-full overflow-hidden">
             <img src={project.img} className="w-full h-full object-cover" alt={project.title} />
             <div className="absolute inset-0 bg-gradient-to-t from-white via-transparent to-transparent" />
             <div className="absolute bottom-6 left-6 md:bottom-10 md:left-16 right-6 md:right-16">
                <div className="flex flex-wrap items-center gap-3 mb-4">
                  <span className="px-3 py-1 md:px-4 md:py-1 rounded-full bg-red-600 text-[9px] md:text-[10px] font-black uppercase tracking-widest text-white shadow-lg shadow-red-600/20">{project.tag}</span>
                  <span className="flex items-center gap-1.5 text-slate-500 text-[9px] md:text-[10px] font-bold uppercase tracking-widest"><MapPin className="w-3 h-3 text-red-500" /> {project.location}</span>
                </div>
                <h3 className="text-2xl md:text-5xl lg:text-6xl font-black uppercase text-slate-950 leading-tight">{project.title}</h3>
             </div>
          </div>

          <div className="px-6 md:px-16 py-8 md:py-12 grid grid-cols-1 lg:grid-cols-12 gap-8 md:gap-12">
             {/* Main Content */}
             <div className="lg:col-span-8 space-y-8 md:space-y-12">
                {project.description && (
                   <div className="border-l-4 border-red-600 pl-6 md:pl-8">
                      <p className="text-xl md:text-2xl text-slate-800 font-semibold italic leading-relaxed">
                         "{project.description}"
                      </p>
                   </div>
                )}

                {/* Detail Story (Rich Text) */}
                <div className="article-preview-content prose prose-red max-w-none 
                                prose-headings:text-slate-950 prose-p:text-slate-700
                                prose-strong:text-slate-950 prose-blockquote:border-red-600">
                  {project.content_html ? (
                     <div dangerouslySetInnerHTML={{ __html: project.content_html }} />
                  ) : (
                     <p className="text-slate-400 italic">Détails de l'intervention en cours de rédaction...</p>
                  )}
                </div>

                {/* Gallery */}
                {(() => {
                   try {
                     const gallery = project.gallery ? JSON.parse(project.gallery) : [];
                     if (Array.isArray(gallery) && gallery.length > 0) {
                       return (
                         <div className="pt-12 border-t border-black/5">
                            <h4 className="text-[10px] font-black uppercase tracking-[0.3em] text-red-600 mb-8 flex items-center gap-4">
                               GALERIE PHOTOS <span className="h-px flex-1 bg-black/5"></span>
                            </h4>
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                               {gallery.map((url, i) => (
                                  <div key={i} className="aspect-square rounded-2xl md:rounded-3xl overflow-hidden border border-black/5 hover:border-red-600 shadow-sm transition-all group">
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
                <div className="p-6 md:p-8 rounded-[1.5rem] md:rounded-[2rem] bg-slate-50 border border-black/5 space-y-8 sticky top-8 shadow-sm">
                   <div>
                      <div className="flex items-center gap-3 mb-4">
                         <Target className="w-5 h-5 text-red-600" />
                         <span className="text-[10px] font-black uppercase tracking-widest text-slate-900">Méthode employée</span>
                      </div>
                      <p className="text-sm text-slate-600 font-medium leading-relaxed pl-8">
                         {project.method || 'Analyse technique approfondie.'}
                      </p>
                   </div>

                   <div>
                      <div className="flex items-center gap-3 mb-4">
                         <ShieldCheck className="w-5 h-5 text-emerald-600" />
                         <span className="text-[10px] font-black uppercase tracking-widest text-slate-900">Résultat & Bilan</span>
                      </div>
                      <p className="text-sm text-slate-600 font-medium leading-relaxed pl-8">
                         {project.result || 'Succès de l\'opération.'}
                      </p>
                   </div>

                   <div className="pt-8 border-t border-black/5">
                      <div className="flex items-center gap-3 mb-4">
                         <Calendar className="w-5 h-5 text-slate-400" />
                         <span className="text-[10px] font-black uppercase tracking-widest text-slate-900">Date intervention</span>
                      </div>
                      <p className="text-sm text-slate-600 font-medium pl-8">
                         {project.date || 'Récemment enregistré'}
                      </p>
                   </div>
                </div>
             </div>
          </div>

          {/* Footer Modal */}
          <div className="px-6 md:px-16 py-8 md:py-12 border-t border-black/5 flex flex-col md:flex-row items-center justify-between gap-6 text-[10px] font-black uppercase tracking-[0.2em] text-slate-400">
             <div className="flex items-center gap-2">
                <div className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
                INTERVENTION CERTIFIÉE ESEND
             </div>
             <button onClick={onClose} className="flex items-center gap-2 text-slate-900 hover:text-red-600 transition-colors">
                <ArrowLeft className="w-4 h-4" /> Fermer la vue
             </button>
          </div>
        </div>
      </motion.div>
    </motion.div>
  );
};

export default ProjectDetailModal;
