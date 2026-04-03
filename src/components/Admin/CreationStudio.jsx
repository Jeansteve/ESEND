// src/components/Admin/CreationStudio.jsx
import React, { useState, useEffect } from 'react';
import { 
  Sparkles, 
  Search, 
  RotateCw, 
  ChevronRight, 
  Zap, 
  CheckCircle2, 
  Clock,
  ArrowLeft,
  Loader2,
  AlertCircle,
  TrendingUp,
  Newspaper
} from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { AIService } from '../../lib/AIService';
import { api } from '../../lib/api';

const CreationStudio = ({ onClose, onSuccess }) => {
  const [topics, setTopics] = useState([]);
  const [loadingRadar, setLoadingRadar] = useState(false);
  const [generatingArticle, setGeneratingArticle] = useState(null); // id of topic
  const [error, setError] = useState('');
  const [quota, setQuota] = useState({ topicsLeft: 0, articlesLeft: 0 });

  useEffect(() => {
    loadRadar();
    updateQuota();
  }, []);

  const updateQuota = () => {
    setQuota(AIService.getQuota());
  };

  const loadRadar = async () => {
    setLoadingRadar(true);
    setError('');
    try {
      // Simulation ou Appel réel Gemini
      const results = await AIService.searchLatestNews();
      setTopics(results);
    } catch (err) {
      setError(err.message);
    } finally {
      setLoadingRadar(false);
    }
  };

  const handleGenerate = async (topic) => {
    if (quota.articlesLeft <= 0) {
      alert("Quota d'articles épuisé pour aujourd'hui.");
      return;
    }

    setGeneratingArticle(topic.title);
    setError('');
    
    try {
      const article = await AIService.draftArticle(topic.title);
      // Sauvegarde automatique en brouillon via mockApi
      const res = await api.createArticle({
        ...article,
        image: 'https://images.unsplash.com/photo-1584622650111-993a426fbf0a?q=80&w=2070', // Placeholder image
        status: 'draft'
      });
      
      if (res.success) {
        onSuccess(res.article);
      }
    } catch (err) {
      setError(`Erreur de génération : ${err.message}`);
    } finally {
      setGeneratingArticle(null);
      updateQuota();
    }
  };

  return (
    <div className="flex flex-col h-full">
      {/* Header Studio */}
      <motion.div 
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        className="flex items-center justify-between mb-10"
      >
        <div className="flex items-center gap-6">
          <motion.button 
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={onClose}
            className="p-3 rounded-2xl bg-[var(--bg-secondary)] text-[var(--text-dimmed)] hover:text-red-600 hover:shadow-[0_0_20px_rgba(220,38,38,0.2)] transition-all border border-[var(--border-subtle)]"
          >
            <ArrowLeft className="w-5 h-5" />
          </motion.button>
          <div>
            <div className="flex items-center gap-3">
              <h3 className="text-3xl font-black uppercase tracking-tighter">Studio de Création <span className="text-red-600 italic">IA</span></h3>
              <div className="px-3 py-1 bg-red-600/10 border border-red-600/20 rounded-full text-[9px] font-black uppercase tracking-widest text-red-600">Premium</div>
            </div>
            <p className="text-[var(--text-dimmed)] text-[10px] font-bold uppercase tracking-widest mt-1 opacity-60">Motorisé par Gemini 1.5 Flash High-Speed</p>
          </div>
        </div>

        <div className="flex items-center gap-6 glass-card py-3 px-6 bg-white/5 border-white/5 rounded-2xl">
           <div className="flex flex-col items-end">
              <span className="text-[9px] font-black uppercase tracking-widest text-[var(--text-dimmed)] opacity-50 mb-1">Quota Journalier</span>
              <div className="flex items-center gap-2">
                <div className="h-1.5 w-24 bg-white/5 rounded-full overflow-hidden">
                  <motion.div 
                    initial={{ width: 0 }}
                    animate={{ width: `${(quota.articlesUsed / quota.articlesMax) * 100}%` }}
                    className="h-full bg-red-600 shadow-[0_0_10px_#dc2626]"
                  />
                </div>
                <span className={`text-[11px] font-black tabular-nums ${quota.articlesLeft === 0 ? 'text-red-500' : 'text-green-500'}`}>
                  {quota.articlesLeft}/{quota.articlesMax}
                </span>
              </div>
           </div>
        </div>
      </motion.div>

      {/* Main Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-10 flex-grow overflow-hidden">
        
        {/* Radar à Sujets */}
        <motion.div 
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          className="lg:col-span-2 glass-card border-[var(--border-subtle)] bg-[var(--bg-secondary)] flex flex-col overflow-hidden shadow-2xl relative"
        >
          {/* Subtle background glow */}
          <div className="absolute top-0 right-0 w-64 h-64 bg-red-600/5 blur-[120px] pointer-events-none" />

          <div className="sticky top-0 z-10 p-8 border-b border-[var(--border-subtle)] bg-[var(--bg-secondary)]/80 backdrop-blur-md flex justify-between items-center">
            <h4 className="flex items-center gap-3 text-xs font-black uppercase tracking-widest text-[var(--text-main)]">
              <TrendingUp className="w-4 h-4 text-red-600" /> Radar à Opportunités SEO
            </h4>
            <motion.button 
              whileHover={{ rotate: 180 }}
              transition={{ duration: 0.5 }}
              onClick={loadRadar}
              disabled={loadingRadar}
              className="p-2.5 rounded-xl bg-[var(--bg-input)] text-[var(--text-dimmed)] hover:text-red-600 transition-all border border-[var(--border-subtle)] disabled:opacity-50 shadow-inner"
            >
              <RotateCw className={`w-4 h-4 ${loadingRadar ? 'animate-spin' : ''}`} />
            </motion.button>
          </div>

          <div className="p-8 flex-grow overflow-y-auto pr-2 custom-scrollbar">
            {error && (
              <motion.div 
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                className="p-5 bg-red-600/5 border border-red-600/20 rounded-2xl mb-8 flex items-start gap-4 text-red-500 text-[11px] font-bold italic leading-relaxed"
              >
                 <AlertCircle className="w-5 h-5 shrink-0 mt-0.5" /> 
                 <div>
                    <span className="block uppercase not-italic font-black text-[10px] tracking-widest mb-1">Incident Moteur IA</span>
                    {error}
                 </div>
              </motion.div>
            )}

            <div className="grid gap-6">
              {loadingRadar ? (
                Array(3).fill(0).map((_, i) => (
                  <div key={i} className="h-40 bg-[var(--bg-input)] rounded-3xl animate-pulse border border-[var(--border-subtle)]/50" />
                ))
              ) : (
                <AnimatePresence mode="popLayout">
                  {topics.map((topic, i) => (
                    <motion.div 
                      key={i} 
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: i * 0.1 }}
                      whileHover={{ y: -5, borderColor: 'rgba(220, 38, 38, 0.4)' }}
                      className={`group relative overflow-hidden glass-card bg-[var(--bg-input)] border-[var(--border-subtle)] p-6 cursor-pointer transition-all ${generatingArticle === topic.title ? 'opacity-50 grayscale pointer-events-none' : ''}`}
                      onClick={() => !generatingArticle && handleGenerate(topic)}
                    >
                      {/* Interactive glow */}
                      <div className="absolute inset-0 bg-red-600/0 group-hover:bg-red-600/[0.02] transition-colors pointer-events-none" />
                      
                      <div className="flex justify-between items-start mb-4 relative z-10">
                        <div className="flex gap-2">
                           <span className="px-2.5 py-1 bg-red-600/10 border border-red-600/20 text-red-600 text-[9px] font-black uppercase rounded-lg">
                             Service #{topic.service_id}
                           </span>
                        </div>
                        <span className="flex items-center gap-1.5 text-green-500 text-[10px] font-black uppercase bg-green-500/10 px-2 py-1 rounded-lg">
                           <Zap className="w-3.5 h-3.5 fill-current" /> Tendance {topic.trend}/5
                        </span>
                      </div>
                      
                      <h5 className="text-base font-black uppercase tracking-tight group-hover:text-red-600 transition-colors mb-3 leading-tight relative z-10">{topic.title}</h5>
                      <p className="text-[var(--text-dimmed)] text-[12px] leading-relaxed line-clamp-2 font-medium relative z-10 opacity-80">{topic.description}</p>
                      
                      <div className="mt-8 flex justify-between items-center relative z-10">
                        <div className="flex -space-x-2">
                            <div className="w-6 h-6 rounded-full border-2 border-[var(--bg-secondary)] bg-zinc-800 flex items-center justify-center"><Newspaper className="w-3 h-3 text-white/50" /></div>
                            <div className="w-6 h-6 rounded-full border-2 border-[var(--bg-secondary)] bg-zinc-700" />
                        </div>
                        <motion.div 
                          whileHover={{ x: 5 }}
                          className="flex items-center gap-2 text-red-600 text-[10px] font-black uppercase tracking-widest"
                        >
                          Rédiger avec IA <ChevronRight className="w-4 h-4 translate-y-[0.5px]" />
                        </motion.div>
                      </div>
                    </motion.div>
                  ))}
                </AnimatePresence>
              )}
            </div>
          </div>
        </motion.div>

        {/* Status / Preview */}
        <motion.div 
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          className="glass-card flex flex-col justify-center items-center text-center p-12 bg-white/5 border-[var(--border-subtle)] shadow-inner relative overflow-hidden"
        >
           {/* Animated Background Gradients */}
           <div className="absolute inset-0 flex items-center justify-center opacity-30 pointer-events-none">
              <motion.div 
                animate={{ 
                  scale: [1, 1.2, 1],
                  rotate: [0, 90, 0],
                  opacity: [0.1, 0.3, 0.1]
                }}
                transition={{ duration: 10, repeat: Infinity }}
                className="w-[300px] h-[300px] bg-red-600/10 blur-[100px] rounded-full" 
              />
           </div>

           {generatingArticle ? (
             <div className="relative z-10">
               <div className="relative w-32 h-32 mb-10 mx-auto">
                  <div className="absolute inset-0 border-4 border-red-600/10 rounded-full" />
                  <motion.div 
                    animate={{ rotate: 360 }}
                    transition={{ duration: 2, repeat: Infinity, ease: "linear" }}
                    className="absolute inset-0 border-4 border-t-red-600 rounded-full" 
                  />
                  <div className="absolute inset-1 border border-white/5 rounded-full" />
                  <Sparkles className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-12 h-12 text-red-600" />
               </div>
               
               <motion.h4 
                animate={{ opacity: [0.5, 1, 0.5] }}
                transition={{ duration: 2, repeat: Infinity }}
                className="text-2xl font-black uppercase tracking-tighter mb-4 text-[var(--text-main)]"
               >
                 Rédaction en cours...
               </motion.h4>
               <p className="text-[var(--text-dimmed)] text-[11px] italic max-w-xs uppercase font-bold tracking-widest leading-relaxed opacity-60">
                  Gemini Flash-1.5 analyse : <br />
                  <span className="text-[var(--text-main)] not-italic mt-3 block font-black text-xs text-red-600">"{generatingArticle}"</span>
               </p>
               
               <div className="mt-14 space-y-4 w-full max-w-[200px] mx-auto text-left">
                  {[
                    { label: "Analyse sémantique", done: true },
                    { label: "Structuration HTML5", done: true },
                    { label: "Injection SEO Riviera", done: false },
                  ].map((step, k) => (
                    <motion.div 
                      key={k}
                      initial={{ opacity: 0, x: -10 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: k * 0.3 }}
                      className="flex items-center gap-4"
                    >
                      {step.done ? (
                        <div className="p-1 bg-green-500/10 rounded-full"><CheckCircle2 className="w-3.5 h-3.5 text-green-500" /></div>
                      ) : (
                        <div className="p-1 bg-white/5 rounded-full"><Loader2 className="w-3.5 h-3.5 text-red-600 animate-spin" /></div>
                      )}
                      <span className={`text-[10px] font-black uppercase tracking-widest ${step.done ? 'text-green-500' : 'text-[var(--text-dimmed)]'}`}>{step.label}</span>
                    </motion.div>
                  ))}
               </div>
             </div>
           ) : (
             <div className="relative z-10">
               <motion.div 
                 whileHover={{ scale: 1.1, rotate: 10 }}
                 className="w-24 h-24 bg-[var(--bg-input)] rounded-[2.5rem] flex items-center justify-center mb-8 border border-[var(--border-subtle)] shadow-2xl mx-auto"
               >
                  <Sparkles className="w-10 h-10 text-[var(--text-dimmed)] opacity-30" />
               </motion.div>
               <h4 className="text-2xl font-black uppercase tracking-tighter mb-4">Moteur <span className="text-red-600">Prêt</span></h4>
               <p className="text-[var(--text-dimmed)] text-[10px] font-bold uppercase tracking-widest leading-relaxed max-w-[180px] opacity-60">
                 Sélectionnez une opportunité SEO dans le radar pour lancer la rédaction automatisée.
               </p>
             </div>
           )}
        </motion.div>

      </div>
    </div>

  );
};

export default CreationStudio;
