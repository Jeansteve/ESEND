// src/components/Admin/ArticleModal.jsx
import React, { useState, useEffect } from 'react';
import { X, Save, Sparkles, Layout, Type, Search, Eye, ArrowRight, Loader2, Info } from 'lucide-react';
import { api } from '../../lib/api';
import { AIService } from '../../lib/AIService';

const ArticleModal = ({ article, onClose, onSave }) => {
  const [formData, setFormData] = useState(article || {
    title: '',
    category: 'Expertise',
    excerpt: '',
    content_html: '',
    image: 'https://images.unsplash.com/photo-1584622650111-993a426fbf0a?q=80&w=2070',
    meta_title: '',
    meta_description: '',
    service_id: 1,
    status: 'draft'
  });

  const [activeTab, setActiveTab] = useState('edit'); // edit | preview | seo
  const [isGenerating, setIsGenerating] = useState(false);

  const handleAiRefine = async () => {
    if (!formData.title) return alert("Veuillez saisir au moins un titre.");
    setIsGenerating(true);
    try {
      const refined = await AIService.draftArticle(formData.title);
      setFormData({ ...formData, ...refined });
    } catch (err) {
      alert(err.message);
    } finally {
      setIsGenerating(false);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (article?.id) {
      const res = await api.updateArticle(article.id, formData);
      if (res.success) onSave(res.article);
    } else {
      const res = await api.createArticle(formData);
      if (res.success) onSave(res.article);
    }
  };

  return (
    <div className="fixed inset-0 z-[100] flex items-center justify-center p-6 bg-slate-950/90 backdrop-blur-2xl animate-in fade-in duration-300">
      <div className="glass-card w-full max-w-6xl h-[90vh] overflow-hidden flex flex-col p-0 border-white/10 shadow-3xl">
        
        {/* Header Tabs */}
        <div className="p-6 border-b border-white/5 flex flex-col md:flex-row justify-between items-center gap-6 bg-slate-900/50">
          <div className="flex items-center gap-6">
            <div>
              <h3 className="text-xl font-black uppercase tracking-tighter">
                Dossier <span className="text-red-600 italic">Expert</span>
              </h3>
              <p className="text-zinc-500 text-[9px] font-black uppercase tracking-[0.2em] mt-1">Management de contenu IA</p>
            </div>
            
            <nav className="flex gap-1 bg-black/20 p-1 rounded-xl border border-white/5">
              {[
                { id: 'edit', label: 'Édition', icon: Type },
                { id: 'preview', label: 'Aperçu', icon: Eye },
                { id: 'seo', label: 'SEO', icon: Search },
              ].map(t => (
                <button
                  key={t.id}
                  onClick={() => setActiveTab(t.id)}
                  className={`flex items-center gap-2 px-4 py-2 rounded-lg text-[10px] font-black uppercase tracking-widest transition-all ${activeTab === t.id ? 'bg-white text-black' : 'text-zinc-500 hover:text-white'}`}
                >
                  <t.icon className="w-3.5 h-3.5" /> {t.label}
                </button>
              ))}
            </nav>
          </div>

          <div className="flex items-center gap-3">
             <button 
               onClick={handleAiRefine}
               disabled={isGenerating}
               className="flex items-center gap-2 bg-gradient-to-r from-red-600 to-indigo-600 text-white px-5 py-3 rounded-xl font-black uppercase tracking-widest text-[9px] hover:scale-105 transition-all disabled:opacity-50"
             >
               {isGenerating ? <Loader2 className="w-3.5 h-3.5 animate-spin" /> : <Sparkles className="w-3.5 h-3.5" />} 
               IA Magie
             </button>
             <button onClick={onClose} className="p-2 hover:bg-white/5 rounded-full text-zinc-500 hover:text-white transition-all">
                <X className="w-6 h-6" />
             </button>
          </div>
        </div>

        {/* Content Area */}
        <div className="flex-grow overflow-hidden flex flex-col bg-black/20">
          
          {activeTab === 'edit' && (
            <div className="flex-grow overflow-y-auto p-10 space-y-8">
              <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                <div className="md:col-span-2 space-y-8">
                  <div>
                    <label className="block text-[10px] font-black uppercase text-zinc-500 mb-2 tracking-widest">Titre de l'article</label>
                    <input 
                      type="text" 
                      value={formData.title}
                      onChange={(e) => setFormData({...formData, title: e.target.value})}
                      className="w-full bg-slate-950/50 border border-white/5 rounded-xl px-5 py-4 text-xl font-black tracking-tight focus:border-red-600/50 outline-none transition-all placeholder:text-zinc-800"
                      placeholder="Saisissez un titre percutant..."
                    />
                  </div>
                  
                  <div>
                    <label className="block text-[10px] font-black uppercase text-zinc-500 mb-2 tracking-widest">Résumé (Excerpt)</label>
                    <textarea 
                      value={formData.excerpt}
                      onChange={(e) => setFormData({...formData, excerpt: e.target.value})}
                      rows={3}
                      className="w-full bg-slate-950/50 border border-white/5 rounded-xl px-4 py-3 text-sm focus:border-red-600/50 outline-none transition-all resize-none text-zinc-400 font-medium"
                      placeholder="Une brève introduction pour le listing..."
                    />
                  </div>

                  <div>
                    <div className="flex justify-between items-center mb-2">
                       <label className="block text-[10px] font-black uppercase text-zinc-500 tracking-widest">Contenu HTML</label>
                       <span className="text-[9px] font-bold text-red-600 uppercase bg-red-600/10 px-2 py-0.5 rounded">Mode Code Actif</span>
                    </div>
                    <textarea 
                      value={formData.content_html}
                      onChange={(e) => setFormData({...formData, content_html: e.target.value})}
                      className="w-full h-[400px] bg-slate-950/80 border border-white/5 rounded-2xl px-6 py-6 text-sm font-mono focus:border-red-600/50 outline-none transition-all resize-none leading-relaxed text-zinc-300"
                      placeholder="<h2>Votre contenu ici...</h2>"
                    />
                  </div>
                </div>

                <div className="space-y-8">
                  <div className="glass-card bg-black/40 border-white/5">
                    <h4 className="text-[10px] font-black uppercase tracking-widest mb-6 border-b border-white/5 pb-4">Configuration</h4>
                    <div className="space-y-6">
                      <div>
                        <label className="block text-[9px] font-black uppercase text-zinc-600 mb-2 tracking-widest">Catégorie</label>
                        <select 
                          value={formData.category}
                          onChange={(e) => setFormData({...formData, category: e.target.value})}
                          className="w-full bg-black/50 border border-white/5 rounded-xl px-4 py-3 text-xs font-bold uppercase tracking-widest"
                        >
                          <option>Expertise</option>
                          <option>Protocole</option>
                          <option>Alimentation</option>
                          <option>Saisonnalité</option>
                          <option>Prévention</option>
                        </select>
                      </div>
                      <div>
                        <label className="block text-[9px] font-black uppercase text-zinc-600 mb-2 tracking-widest">Service Pôle</label>
                        <select 
                          value={formData.service_id}
                          onChange={(e) => setFormData({...formData, service_id: parseInt(e.target.value)})}
                          className="w-full bg-black/50 border border-white/5 rounded-xl px-4 py-3 text-xs font-bold uppercase tracking-widest"
                        >
                          <option value={1}>1 - Nuisibles</option>
                          <option value={2}>2 - Désinfection</option>
                          <option value={3}>3 - Nettoyage</option>
                        </select>
                      </div>
                      <div>
                        <label className="block text-[9px] font-black uppercase text-zinc-600 mb-2 tracking-widest">Image de Couverture</label>
                        <input 
                           type="text"
                           value={formData.image}
                           onChange={(e) => setFormData({...formData, image: e.target.value})}
                           className="w-full bg-black/50 border border-white/5 rounded-xl px-4 py-3 text-[10px] font-medium mb-3"
                        />
                        <div className="aspect-video rounded-xl overflow-hidden border border-white/5 grayscale">
                          <img src={formData.image} className="w-full h-full object-cover" />
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          )}

          {activeTab === 'preview' && (
            <div className="flex-grow overflow-y-auto bg-white text-slate-900 p-16 selection:bg-red-200">
               <article className="max-w-3xl mx-auto">
                 <div className="uppercase text-red-600 font-black tracking-[0.3em] text-[10px] mb-6">{formData.category}</div>
                 <h1 className="text-5xl font-black tracking-tighter leading-none mb-12">{formData.title}</h1>
                 <div className="text-xl font-medium text-slate-500 leading-relaxed mb-16 italic border-l-4 border-red-600 pl-8">
                   {formData.excerpt}
                 </div>
                 <div 
                   className="prose prose-slate prose-lg max-w-none 
                    prose-h2:text-3xl prose-h2:font-black prose-h2:tracking-tighter prose-h2:mt-16 prose-h2:mb-8
                    prose-p:leading-relaxed prose-p:mb-8 prose-p:text-slate-700
                    prose-ul:my-8 prose-li:mb-4
                    prose-blockquote:border-red-600 prose-blockquote:bg-red-50 prose-blockquote:py-2 prose-blockquote:px-8 prose-blockquote:rounded-r-xl"
                   dangerouslySetInnerHTML={{ __html: formData.content_html }} 
                 />
               </article>
            </div>
          )}

          {activeTab === 'seo' && (
            <div className="flex-grow p-10 flex items-center justify-center">
              <div className="max-w-2xl w-full glass-card border-blue-600/20 bg-blue-600/5">
                 <div className="flex items-center gap-3 text-blue-500 mb-8 font-black uppercase tracking-widest text-[10px]">
                    <Search className="w-4 h-4" /> Optimisation Moteurs de Recherche
                 </div>
                 <div className="space-y-6">
                    <div>
                      <label className="block text-[10px] font-black uppercase text-zinc-500 mb-2 tracking-widest">Meta Title (Google)</label>
                      <input 
                        type="text" 
                        value={formData.meta_title}
                        onChange={(e) => setFormData({...formData, meta_title: e.target.value})}
                        className="w-full bg-slate-950/50 border border-white/5 rounded-xl px-4 py-3 text-sm focus:border-blue-500/50 outline-none transition-all"
                        placeholder="Titre apparaissant dans les résultats Google"
                      />
                    </div>
                    <div>
                      <label className="block text-[10px] font-black uppercase text-zinc-500 mb-2 tracking-widest">Meta Description</label>
                      <textarea 
                        value={formData.meta_description}
                        onChange={(e) => setFormData({...formData, meta_description: e.target.value})}
                        rows={4}
                        className="w-full bg-slate-950/50 border border-white/5 rounded-xl px-4 py-3 text-sm focus:border-blue-500/50 outline-none transition-all resize-none text-zinc-400"
                        placeholder="Description optimisée pour le clic..."
                      />
                    </div>
                    <div className="bg-blue-600/10 p-5 rounded-2xl border border-blue-600/20 flex gap-4 items-start">
                       <Info className="w-5 h-5 text-blue-500 shrink-0" />
                       <div className="text-[11px] text-blue-400/80 leading-relaxed font-medium">
                          <strong>Conseil Riviera :</strong> Incluez les mots-clés "Menton" ou "Monaco" dans votre méta-description pour favoriser le référencement local. L'IA a déjà pré-rempli ces champs si vous avez utilisé "IA Magie".
                       </div>
                    </div>
                 </div>
              </div>
            </div>
          )}

        </div>

        {/* Action Footer */}
        <div className="p-8 border-t border-white/5 flex justify-between items-center bg-slate-950">
          <div className="flex items-center gap-2 text-zinc-600 text-[10px] font-black uppercase tracking-widest">
             Status : <span className="text-amber-500">{formData.status === 'draft' ? 'Brouillon' : 'Publié'}</span>
          </div>
          
          <div className="flex gap-4">
            <button 
              type="button"
              onClick={onClose}
              className="px-6 py-4 rounded-xl border border-white/5 text-[10px] font-black uppercase tracking-widest text-zinc-500 hover:text-white hover:bg-white/5 transition-all"
            >
              Fermer
            </button>
            <button 
              onClick={handleSubmit}
              className="flex items-center gap-3 bg-white text-black px-10 py-4 rounded-xl font-black uppercase tracking-widest text-[10px] hover:bg-red-600 hover:text-white transition-all shadow-xl active:scale-95"
            >
              <Save className="w-4 h-4" /> Publier le Dossier
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ArticleModal;
