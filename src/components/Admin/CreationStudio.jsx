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
  AlertCircle
} from 'lucide-react';
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
    <div className="flex flex-col h-full animate-in slide-in-from-right duration-500">
      <div className="flex items-center justify-between mb-8">
        <div className="flex items-center gap-4">
          <button 
            onClick={onClose}
            className="p-2 rounded-lg bg-white/5 text-zinc-400 hover:text-white hover:bg-white/10"
          >
            <ArrowLeft className="w-4 h-4" />
          </button>
          <div>
            <h3 className="text-xl font-black uppercase tracking-tighter">Studio de Création <span className="text-red-600 italic">IA</span></h3>
            <p className="text-zinc-500 text-[10px] font-bold uppercase tracking-widest mt-0.5">Moteur Gemini v1.5 Pro</p>
          </div>
        </div>

        <div className="flex gap-4">
           <div className="flex flex-col items-end">
              <span className="text-[9px] font-black uppercase tracking-widest text-zinc-500">Quota Articles</span>
              <span className={`text-xs font-black ${quota.articlesLeft === 0 ? 'text-red-500' : 'text-green-500'}`}>
                {quota.articlesLeft} / 5
              </span>
           </div>
        </div>
      </div>

      {/* Main Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 flex-grow">
        
        {/* Radar à Sujets */}
        <div className="lg:col-span-2 glass-card border-red-600/20 bg-gradient-to-br from-red-600/5 to-transparent flex flex-col">
          <div className="flex justify-between items-center mb-8">
            <h4 className="flex items-center gap-3 text-sm font-black uppercase tracking-widest text-white">
              <Sparkles className="w-4 h-4 text-red-600" /> Radar à Opportunités SEO
            </h4>
            <button 
              onClick={loadRadar}
              disabled={loadingRadar}
              className="p-2 rounded-lg bg-white/5 text-zinc-400 hover:text-white transition-all hover:bg-white/10 disabled:opacity-50"
            >
              <RotateCw className={`w-4 h-4 ${loadingRadar ? 'animate-spin' : ''}`} />
            </button>
          </div>

          {error && (
            <div className="p-4 bg-red-600/10 border border-red-600/20 rounded-xl mb-6 flex items-center gap-3 text-red-500 text-xs font-bold italic">
               <AlertCircle className="w-4 h-4 shrink-0" /> {error}
            </div>
          )}

          <div className="space-y-4 flex-grow overflow-y-auto pr-2">
            {loadingRadar ? (
              Array(3).fill(0).map((_, i) => (
                <div key={i} className="h-32 bg-white/5 rounded-2xl animate-pulse" />
              ))
            ) : (
              topics.map((topic, i) => (
                <div 
                  key={i} 
                  className={`group glass-card border-white/5 hover:border-red-600/30 p-5 cursor-pointer transition-all ${generatingArticle === topic.title ? 'opacity-50' : ''}`}
                  onClick={() => !generatingArticle && handleGenerate(topic)}
                >
                  <div className="flex justify-between items-start mb-3">
                    <span className="px-2 py-1 bg-red-600 text-white text-[9px] font-black uppercase rounded-md">
                       Service ID: {topic.service_id}
                    </span>
                    <span className="flex items-center gap-1.5 text-green-500 text-[10px] font-black uppercase">
                       <Zap className="w-3 h-3" /> Tendance {topic.trend}/5
                    </span>
                  </div>
                  <h5 className="text-sm font-black uppercase tracking-tight group-hover:text-red-600 transition-colors mb-2">{topic.title}</h5>
                  <p className="text-zinc-500 text-[11px] leading-relaxed line-clamp-2">{topic.description}</p>
                  
                  <div className="mt-5 flex justify-end">
                    <div className="flex items-center gap-2 text-red-600 text-[10px] font-black uppercase tracking-widest opacity-0 group-hover:opacity-100 transition-all transform group-hover:translate-x-0 translate-x-2">
                      Rédiger l'article <ChevronRight className="w-4 h-4" />
                    </div>
                  </div>
                </div>
              ))
            )}
          </div>
        </div>

        {/* Status / Preview */}
        <div className="glass-card flex flex-col justify-center items-center text-center p-8 bg-black/40">
           {generatingArticle ? (
             <>
               <div className="relative w-24 h-24 mb-8">
                  <div className="absolute inset-0 border-4 border-red-600/10 rounded-full" />
                  <div className="absolute inset-0 border-4 border-t-red-600 rounded-full animate-spin" />
                  <Sparkles className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-10 h-10 text-red-600 animate-pulse" />
               </div>
               <h4 className="text-xl font-black uppercase tracking-tighter mb-4 animate-pulse">Rédaction en cours...</h4>
               <p className="text-zinc-500 text-xs italic max-w-xs uppercase font-medium leading-relaxed">
                  Gemini analyse le sujet : <br />
                  <span className="text-white not-italic mt-2 block">"{generatingArticle}"</span>
               </p>
               <div className="mt-12 space-y-3 w-full">
                  <div className="flex items-center gap-3 text-[10px] font-black text-green-500 uppercase">
                    <CheckCircle2 className="w-4 h-4" /> Analyse sémantique
                  </div>
                  <div className="flex items-center gap-3 text-[10px] font-black text-green-500 uppercase">
                    <CheckCircle2 className="w-4 h-4" /> Structuration HTML
                  </div>
                  <div className="flex items-center gap-3 text-[10px] font-black text-zinc-600 uppercase">
                    <Loader2 className="w-4 h-4 animate-spin" /> Optimisation SEO Riviera
                  </div>
               </div>
             </>
           ) : (
             <>
               <div className="w-16 h-16 bg-white/5 rounded-2xl flex items-center justify-center mb-6">
                  <Sparkles className="w-8 h-8 text-zinc-700" />
               </div>
               <h4 className="text-lg font-black uppercase tracking-tighter mb-4">Prêt à Générer ?</h4>
               <p className="text-zinc-500 text-[11px] uppercase tracking-widest leading-relaxed">
                  Sélectionnez un sujet dans le radar ou saisissez votre propre titre dans l'éditeur.
               </p>
             </>
           )}
        </div>

      </div>
    </div>
  );
};

export default CreationStudio;
