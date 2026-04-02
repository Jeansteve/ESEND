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
    <div className="fixed inset-0 z-[100] flex items-center justify-center p-6 bg-[var(--bg-overlay)] backdrop-blur-2xl animate-in fade-in duration-300">
      <div className="glass-card w-full max-w-6xl h-[90vh] overflow-hidden flex flex-col p-0 border-[var(--border-subtle)] shadow-3xl">
        
        {/* Header Tabs */}
        <div className="p-6 border-b border-[var(--border-subtle)] flex flex-col md:flex-row justify-between items-center gap-6 bg-[var(--bg-secondary)]">
          <div className="flex items-center gap-6">
            <div>
              <h3 className="text-xl font-black uppercase tracking-tighter">
                Dossier <span className="text-red-600 italic">Expert</span>
              </h3>
              <p className="text-[var(--text-dimmed)] text-[9px] font-black uppercase tracking-[0.2em] mt-1">Management de contenu IA</p>
            </div>
            
            <nav className="flex gap-1 bg-[var(--bg-input)] p-1 rounded-xl border border-[var(--border-subtle)]">
              {[
                { id: 'edit', label: 'Édition', icon: Type },
                { id: 'preview', label: 'Aperçu', icon: Eye },
                { id: 'seo', label: 'SEO', icon: Search },
              ].map(t => (
                <button
                  key={t.id}
                  onClick={() => setActiveTab(t.id)}
                  className={`flex items-center gap-2 px-4 py-2 rounded-lg text-[10px] font-black uppercase tracking-widest transition-all ${activeTab === t.id ? 'bg-[var(--text-main)] text-[var(--bg-primary)]' : 'text-[var(--text-dimmed)] hover:text-[var(--text-main)]'}`}
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
             <button onClick={onClose} className="p-2 hover:bg-[var(--bg-input)] rounded-full text-[var(--text-dimmed)] hover:text-red-600 transition-all border border-transparent hover:border-[var(--border-subtle)]">
                <X className="w-6 h-6" />
             </button>
          </div>
        </div>

        {/* Content Area */}
        <div className="flex-grow overflow-hidden flex flex-col bg-[var(--bg-primary)]">
          
          {activeTab === 'edit' && (
            <div className="flex-grow overflow-y-auto p-10 space-y-8">
              <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                <div className="md:col-span-2 space-y-8">
                  <div>
                    <label className="block text-[10px] font-black uppercase text-[var(--text-dimmed)] mb-2 tracking-widest">Titre de l'article</label>
                    <input 
                      type="text" 
                      value={formData.title}
                      onChange={(e) => setFormData({...formData, title: e.target.value})}
                      className="w-full bg-[var(--bg-input)] border border-[var(--border-subtle)] rounded-xl px-5 py-4 text-xl font-black tracking-tight focus:border-red-600/50 outline-none transition-all placeholder:text-[var(--text-dimmed)]"
                      placeholder="Saisissez un titre percutant..."
                    />
                  </div>
                  
                  <div>
                    <label className="block text-[10px] font-black uppercase text-[var(--text-dimmed)] mb-2 tracking-widest">Résumé (Excerpt)</label>
                    <textarea 
                      value={formData.excerpt}
                      onChange={(e) => setFormData({...formData, excerpt: e.target.value})}
                      rows={3}
                      className="w-full bg-[var(--bg-input)] border border-[var(--border-subtle)] rounded-xl px-4 py-3 text-sm focus:border-red-600/50 outline-none transition-all resize-none text-[var(--text-main)] font-medium placeholder:text-[var(--text-dimmed)]"
                      placeholder="Une brève introduction pour le listing..."
                    />
                  </div>

                  <div>
                    <div className="flex justify-between items-center mb-2">
                       <label className="block text-[10px] font-black uppercase text-[var(--text-dimmed)] tracking-widest">Contenu HTML</label>
                       <span className="text-[9px] font-bold text-red-600 uppercase bg-red-600/10 px-2 py-0.5 rounded">Mode Code Actif</span>
                    </div>
                    <textarea 
                      value={formData.content_html}
                      onChange={(e) => setFormData({...formData, content_html: e.target.value})}
                      className="w-full h-[400px] bg-[var(--bg-secondary)] border border-[var(--border-subtle)] rounded-2xl px-6 py-6 text-sm font-mono focus:border-red-600/50 outline-none transition-all resize-none leading-relaxed text-[var(--text-main)]"
                      placeholder="<h2>Votre contenu ici...</h2>"
                    />
                  </div>
                </div>

                <div className="space-y-8">
                  <div className="glass-card bg-[var(--bg-secondary)] border-[var(--border-subtle)]">
                    <h4 className="text-[10px] font-black uppercase tracking-widest mb-6 border-b border-[var(--border-subtle)] pb-4">Configuration</h4>
                    <div className="space-y-6">
                      <div>
                        <label className="block text-[9px] font-black uppercase text-[var(--text-dimmed)] mb-2 tracking-widest">Catégorie</label>
                        <select 
                          value={formData.category}
                          onChange={(e) => setFormData({...formData, category: e.target.value})}
                          className="w-full bg-[var(--bg-input)] border border-[var(--border-subtle)] rounded-xl px-4 py-3 text-xs font-bold uppercase tracking-widest"
                        >
                          <option>Expertise</option>
                          <option>Protocole</option>
                          <option>Alimentation</option>
                          <option>Saisonnalité</option>
                          <option>Prévention</option>
                        </select>
                      </div>
                      <div>
                        <label className="block text-[9px] font-black uppercase text-[var(--text-dimmed)] mb-2 tracking-widest">Service Pôle</label>
                        <select 
                          value={formData.service_id}
                          onChange={(e) => setFormData({...formData, service_id: parseInt(e.target.value)})}
                          className="w-full bg-[var(--bg-input)] border border-[var(--border-subtle)] rounded-xl px-4 py-3 text-xs font-bold uppercase tracking-widest"
                        >
                          <option value={1}>1 - Nuisibles</option>
                          <option value={2}>2 - Désinfection</option>
                          <option value={3}>3 - Nettoyage</option>
                        </select>
                      </div>
                      <div>
                        <label className="block text-[9px] font-black uppercase text-[var(--text-dimmed)] mb-2 tracking-widest">Image de Couverture</label>
                        <input 
                           type="text"
                           value={formData.image}
                           onChange={(e) => setFormData({...formData, image: e.target.value})}
                           className="w-full bg-[var(--bg-input)] border border-[var(--border-subtle)] rounded-xl px-4 py-3 text-[10px] font-medium mb-3"
                        />
                        <div className="aspect-video rounded-xl overflow-hidden border border-[var(--border-subtle)] grayscale">
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
              <div className="max-w-2xl w-full glass-card border-[var(--border-subtle)] bg-[var(--bg-secondary)]">
                 <div className="flex items-center gap-3 text-[var(--text-main)] mb-8 font-black uppercase tracking-widest text-[10px]">
                    <Search className="w-4 h-4" /> Optimisation Moteurs de Recherche
                 </div>
                 <div className="space-y-6">
                    <div>
                      <label className="block text-[10px] font-black uppercase text-[var(--text-dimmed)] mb-2 tracking-widest">Meta Title (Google)</label>
                      <input 
                        type="text" 
                        value={formData.meta_title}
                        onChange={(e) => setFormData({...formData, meta_title: e.target.value})}
                        className="w-full bg-[var(--bg-input)] border border-[var(--border-subtle)] rounded-xl px-4 py-3 text-sm focus:border-red-600/50 outline-none transition-all"
                        placeholder="Titre apparaissant dans les résultats Google"
                      />
                    </div>
                    <div>
                      <label className="block text-[10px] font-black uppercase text-[var(--text-dimmed)] mb-2 tracking-widest">Meta Description</label>
                      <textarea 
                        value={formData.meta_description}
                        onChange={(e) => setFormData({...formData, meta_description: e.target.value})}
                        rows={4}
                        className="w-full bg-[var(--bg-input)] border border-[var(--border-subtle)] rounded-xl px-4 py-3 text-sm focus:border-red-600/50 outline-none transition-all resize-none text-[var(--text-main)]"
                        placeholder="Description optimisée pour le clic..."
                      />
                    </div>
                    <div className="bg-[var(--bg-input)] p-5 rounded-2xl border border-[var(--border-subtle)] flex gap-4 items-start">
                       <Info className="w-5 h-5 text-[var(--text-dimmed)] shrink-0" />
                       <div className="text-[11px] text-[var(--text-dimmed)] leading-relaxed font-medium">
                          <strong>Conseil Riviera :</strong> Incluez les mots-clés "Menton" ou "Monaco" dans votre méta-description pour favoriser le référencement local. L'IA a déjà pré-rempli ces champs si vous avez utilisé "IA Magie".
                       </div>
                    </div>
                 </div>
              </div>
            </div>
          )}

        </div>

        {/* Action Footer */}
        <div className="p-8 border-t border-[var(--border-subtle)] flex justify-between items-center bg-[var(--bg-secondary)]">
          <div className="flex items-center gap-2 text-[var(--text-dimmed)] text-[10px] font-black uppercase tracking-widest">
             Status : <span className="text-amber-500">{formData.status === 'draft' ? 'Brouillon' : 'Publié'}</span>
          </div>
          
          <div className="flex gap-4">
            <button 
              type="button"
              onClick={onClose}
              className="px-6 py-4 rounded-xl border border-[var(--border-subtle)] text-[10px] font-black uppercase tracking-widest text-[var(--text-dimmed)] hover:text-red-600 hover:bg-[var(--bg-input)] transition-all"
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
