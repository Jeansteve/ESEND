// src/components/Admin/ArticleModal.jsx
/**
 * @file ArticleModal.jsx — Éditeur d'article v2
 * @specialist frontend-dev-guidelines, frontend-ui-dark-ts
 * Features: nuisible_tag, dates créé/modifié, Brouillon vs Publier, Preview améliorée, Supprimer
 */
import React, { useState } from 'react';
import { X, Save, Sparkles, Type, Search, Eye, Loader2, Info, Trash2, Globe, EyeOff, Calendar, Clock } from 'lucide-react';
import { api } from '../../lib/api';
import { AIService } from '../../lib/AIService';
import { CATEGORIES } from './BlogManager';

const NUISIBLE_TAGS = CATEGORIES.filter(c => c.id !== 'all');

const formatDate = (str) => {
  if (!str) return null;
  try {
    return new Date(str).toLocaleDateString('fr-FR', { day: '2-digit', month: 'long', year: 'numeric', hour: '2-digit', minute: '2-digit' });
  } catch { return str; }
};

const ArticleModal = ({ article, onClose, onSave, onDelete }) => {
  const isNew = !article?.id;

  const [formData, setFormData] = useState(article || {
    title: '',
    category: 'Expertise',
    nuisible_tag: 'actualites',
    excerpt: '',
    content_html: '',
    image: 'https://images.unsplash.com/photo-1584622650111-993a426fbf0a?q=80&w=2070',
    meta_title: '',
    meta_description: '',
    service_id: 1,
    is_published: false,
    status: 'draft'
  });

  const [activeTab, setActiveTab] = useState('edit');
  const [isGenerating, setIsGenerating] = useState(false);
  const [isSaving, setIsSaving] = useState(false);
  const [isDeleting, setIsDeleting] = useState(false);

  const update = (field, val) => setFormData(prev => ({ ...prev, [field]: val }));

  const handleAiRefine = async () => {
    if (!formData.title) return alert('Veuillez saisir au moins un titre.');
    setIsGenerating(true);
    try {
      const refined = await AIService.draftArticle(formData.title);
      setFormData(prev => ({ ...prev, ...refined }));
    } catch (err) {
      alert(err.message);
    } finally {
      setIsGenerating(false);
    }
  };

  const handleSave = async (publish = null) => {
    setIsSaving(true);
    try {
      const payload = {
        ...formData,
        is_published: publish !== null ? publish : formData.is_published,
        status: (publish !== null ? publish : formData.is_published) ? 'published' : 'draft'
      };

      let res;
      if (article?.id) {
        res = await api.updateArticle(article.uuid || article.id, payload);
      } else {
        res = await api.createArticle(payload);
      }

      if (res?.success) {
        onSave({ ...payload, id: res.id || article?.id, uuid: res.uuid || article?.uuid });
      } else {
        throw new Error(res?.error || 'Erreur de sauvegarde');
      }
    } catch (err) {
      alert(err.message);
    } finally {
      setIsSaving(false);
    }
  };

  const handleDelete = async () => {
    if (!article?.id) return;
    if (!window.confirm(`Supprimer définitivement "${article.title}" ? Cette action est irréversible.`)) return;
    setIsDeleting(true);
    try {
      await api.deleteArticle(article.uuid || article.id);
      onDelete?.(article.id);
      onClose();
    } catch (err) {
      alert('Erreur : ' + err.message);
    } finally {
      setIsDeleting(false);
    }
  };

  const isPublished = formData.is_published === true || formData.is_published === 1 || formData.status === 'published';

  return (
    <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 bg-[var(--bg-overlay)] backdrop-blur-2xl animate-in fade-in duration-300">
      <div className="glass-card w-full max-w-6xl h-[92vh] overflow-hidden flex flex-col p-0 border-[var(--border-subtle)] shadow-3xl">

        {/* ─── Header ─── */}
        <div className="p-5 border-b border-[var(--border-subtle)] flex flex-col md:flex-row justify-between items-start md:items-center gap-4 bg-[var(--bg-secondary)]">
          <div className="flex items-start gap-4">
            <div className="min-w-0">
              <h3 className="text-lg font-black uppercase tracking-tighter truncate max-w-[300px]">
                {isNew ? 'Nouvel Article' : <><span className="text-red-600 italic">Édition</span> · {formData.title || 'Sans titre'}</>}
              </h3>
              {/* Dates */}
              <div className="flex items-center gap-3 mt-1 flex-wrap">
                {article?.created_at && (
                  <span className="flex items-center gap-1 text-[9px] font-bold text-[var(--text-dimmed)] uppercase tracking-widest">
                    <Calendar className="w-2.5 h-2.5" /> Créé {formatDate(article.created_at)}
                  </span>
                )}
                {article?.updated_at && article.updated_at !== article.created_at && (
                  <span className="flex items-center gap-1 text-[9px] font-bold text-amber-500/70 uppercase tracking-widest">
                    <Clock className="w-2.5 h-2.5" /> Modifié {formatDate(article.updated_at)}
                  </span>
                )}
              </div>
            </div>

            {/* Tabs */}
            <nav className="flex gap-1 bg-[var(--bg-input)] p-1 rounded-xl border border-[var(--border-subtle)] shrink-0">
              {[
                { id: 'edit', label: 'Édition', icon: Type },
                { id: 'preview', label: 'Aperçu', icon: Eye },
                { id: 'seo', label: 'SEO', icon: Search },
              ].map(t => (
                <button
                  key={t.id}
                  onClick={() => setActiveTab(t.id)}
                  className={`flex items-center gap-1.5 px-3 py-2 rounded-lg text-[10px] font-black uppercase tracking-widest transition-all ${activeTab === t.id ? 'bg-[var(--text-main)] text-[var(--bg-primary)]' : 'text-[var(--text-dimmed)] hover:text-[var(--text-main)]'}`}
                >
                  <t.icon className="w-3 h-3" /> {t.label}
                </button>
              ))}
            </nav>
          </div>

          <div className="flex items-center gap-2 shrink-0">
            {/* Statut */}
            <div className={`hidden md:flex items-center gap-1.5 text-[9px] font-black uppercase tracking-widest px-3 py-2 rounded-lg border ${
              isPublished ? 'bg-emerald-500/10 text-emerald-400 border-emerald-500/30' : 'bg-amber-500/10 text-amber-400 border-amber-500/30'
            }`}>
              {isPublished ? <Globe className="w-3 h-3" /> : <EyeOff className="w-3 h-3" />}
              {isPublished ? 'Publié' : 'Brouillon'}
            </div>
            <button
              onClick={handleAiRefine}
              disabled={isGenerating}
              className="flex items-center gap-2 bg-gradient-to-r from-red-600 to-indigo-600 text-white px-4 py-2.5 rounded-xl font-black uppercase tracking-widest text-[9px] hover:scale-105 transition-all disabled:opacity-50"
            >
              {isGenerating ? <Loader2 className="w-3.5 h-3.5 animate-spin" /> : <Sparkles className="w-3.5 h-3.5" />}
              IA Magie
            </button>
            <button onClick={onClose} className="p-2 hover:bg-[var(--bg-input)] rounded-full text-[var(--text-dimmed)] hover:text-red-600 transition-all border border-transparent hover:border-[var(--border-subtle)]">
              <X className="w-5 h-5" />
            </button>
          </div>
        </div>

        {/* ─── Content ─── */}
        <div className="flex-grow overflow-hidden flex flex-col bg-[var(--bg-primary)]">

          {/* TAB : Édition */}
          {activeTab === 'edit' && (
            <div className="flex-grow overflow-y-auto p-8 space-y-8">
              <div className="grid grid-cols-1 md:grid-cols-3 gap-8">

                {/* Left: Titre + Excerpt + Contenu */}
                <div className="md:col-span-2 space-y-6">
                  <div>
                    <label className="block text-[10px] font-black uppercase text-[var(--text-dimmed)] mb-2 tracking-widest">Titre de l'article *</label>
                    <input
                      type="text"
                      value={formData.title}
                      onChange={e => update('title', e.target.value)}
                      className="w-full bg-[var(--bg-input)] border border-[var(--border-subtle)] rounded-xl px-5 py-4 text-xl font-black tracking-tight focus:border-red-600/50 outline-none transition-all placeholder:text-[var(--text-dimmed)]"
                      placeholder="Saisissez un titre percutant..."
                    />
                  </div>

                  <div>
                    <label className="block text-[10px] font-black uppercase text-[var(--text-dimmed)] mb-2 tracking-widest">Résumé / Accroche *</label>
                    <textarea
                      value={formData.excerpt}
                      onChange={e => update('excerpt', e.target.value)}
                      rows={3}
                      className="w-full bg-[var(--bg-input)] border border-[var(--border-subtle)] rounded-xl px-4 py-3 text-sm focus:border-red-600/50 outline-none transition-all resize-none text-[var(--text-main)] font-medium placeholder:text-[var(--text-dimmed)]"
                      placeholder="Une introduction accrocheuse pour le listing et Google..."
                    />
                  </div>

                  <div>
                    <div className="flex justify-between items-center mb-2">
                      <label className="block text-[10px] font-black uppercase text-[var(--text-dimmed)] tracking-widest">Contenu HTML</label>
                      <span className="text-[9px] font-bold text-red-600 uppercase bg-red-600/10 px-2 py-0.5 rounded">Mode Code Actif</span>
                    </div>
                    <textarea
                      value={formData.content_html}
                      onChange={e => update('content_html', e.target.value)}
                      className="w-full h-[420px] bg-[var(--bg-secondary)] border border-[var(--border-subtle)] rounded-2xl px-6 py-6 text-sm font-mono focus:border-red-600/50 outline-none transition-all resize-none leading-relaxed text-[var(--text-main)]"
                      placeholder="<h2>Votre contenu ici...</h2>"
                    />
                  </div>
                </div>

                {/* Right: Config */}
                <div className="space-y-6">
                  <div className="glass-card bg-[var(--bg-secondary)] border-[var(--border-subtle)]">
                    <h4 className="text-[10px] font-black uppercase tracking-widest mb-5 border-b border-[var(--border-subtle)] pb-4">Configuration</h4>
                    <div className="space-y-5">

                      <div>
                        <label className="block text-[9px] font-black uppercase text-[var(--text-dimmed)] mb-2 tracking-widest">Catégorie Nuisible</label>
                        <select
                          value={formData.nuisible_tag}
                          onChange={e => update('nuisible_tag', e.target.value)}
                          className="w-full bg-[var(--bg-input)] border border-[var(--border-subtle)] rounded-xl px-4 py-3 text-xs font-bold"
                        >
                          {NUISIBLE_TAGS.map(c => (
                            <option key={c.id} value={c.id}>{c.label}</option>
                          ))}
                        </select>
                      </div>

                      <div>
                        <label className="block text-[9px] font-black uppercase text-[var(--text-dimmed)] mb-2 tracking-widest">Pôle Service</label>
                        <select
                          value={formData.service_id}
                          onChange={e => update('service_id', parseInt(e.target.value))}
                          className="w-full bg-[var(--bg-input)] border border-[var(--border-subtle)] rounded-xl px-4 py-3 text-xs font-bold"
                        >
                          <option value={1}>1 — Nuisibles</option>
                          <option value={2}>2 — Désinfection</option>
                          <option value={3}>3 — Nettoyage</option>
                        </select>
                      </div>

                      <div>
                        <label className="block text-[9px] font-black uppercase text-[var(--text-dimmed)] mb-2 tracking-widest">Type d'article</label>
                        <select
                          value={formData.category}
                          onChange={e => update('category', e.target.value)}
                          className="w-full bg-[var(--bg-input)] border border-[var(--border-subtle)] rounded-xl px-4 py-3 text-xs font-bold"
                        >
                          {['Expertise', 'Protocole', 'Saisonnalité', 'Prévention', 'Actualité'].map(c => (
                            <option key={c}>{c}</option>
                          ))}
                        </select>
                      </div>

                      <div>
                        <label className="block text-[9px] font-black uppercase text-[var(--text-dimmed)] mb-2 tracking-widest">Image de Couverture (URL)</label>
                        <input
                          type="text"
                          value={formData.image}
                          onChange={e => update('image', e.target.value)}
                          className="w-full bg-[var(--bg-input)] border border-[var(--border-subtle)] rounded-xl px-4 py-3 text-[10px] font-medium mb-3 outline-none focus:border-red-600/50 transition-all"
                          placeholder="https://..."
                        />
                        {formData.image && (
                          <div className="aspect-video rounded-xl overflow-hidden border border-[var(--border-subtle)] grayscale hover:grayscale-0 transition-all duration-500">
                            <img src={formData.image} className="w-full h-full object-cover" alt="Cover preview" />
                          </div>
                        )}
                      </div>

                    </div>
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* TAB : Aperçu (style production) */}
          {activeTab === 'preview' && (
            <div className="flex-grow overflow-y-auto">
              {/* Bandeau "Prévisualisation" */}
              <div className="bg-amber-500/10 border-b border-amber-500/30 px-6 py-2 flex items-center gap-2">
                <Eye className="w-3.5 h-3.5 text-amber-400" />
                <span className="text-[10px] font-black uppercase tracking-widest text-amber-400">Mode Prévisualisation — Rendu fidèle à la version en ligne</span>
              </div>

              <div className="bg-white text-slate-900 p-8 md:p-16 min-h-full selection:bg-red-200">
                <article className="max-w-3xl mx-auto">
                  {/* Breadcrumb simulation */}
                  <div className="flex items-center gap-2 text-[11px] font-bold text-slate-400 mb-8 uppercase tracking-widest">
                    <span>ESEND</span> <span>/</span> <span>Journal Expert</span> <span>/</span>
                    <span className="text-red-600">{NUISIBLE_TAGS.find(c => c.id === formData.nuisible_tag)?.label || 'Article'}</span>
                  </div>

                  <div className="uppercase text-red-600 font-black tracking-[0.3em] text-[10px] mb-4">{formData.category}</div>
                  <h1 className="text-4xl md:text-5xl font-black tracking-tighter leading-none mb-8">{formData.title || 'Titre de l\'article'}</h1>

                  {formData.image && (
                    <div className="aspect-video rounded-2xl overflow-hidden mb-10 border border-slate-100">
                      <img src={formData.image} alt={formData.title} className="w-full h-full object-cover" />
                    </div>
                  )}

                  <div className="text-lg font-medium text-slate-500 leading-relaxed mb-12 italic border-l-4 border-red-600 pl-6">
                    {formData.excerpt || 'Résumé de l\'article...'}
                  </div>

                  <div
                    className="prose prose-slate prose-lg max-w-none
                      prose-h2:text-3xl prose-h2:font-black prose-h2:tracking-tighter prose-h2:mt-14 prose-h2:mb-6
                      prose-h3:text-xl prose-h3:font-black prose-h3:tracking-tight prose-h3:mt-8 prose-h3:mb-4
                      prose-p:leading-relaxed prose-p:mb-6 prose-p:text-slate-700
                      prose-ul:my-6 prose-li:mb-3 prose-li:text-slate-700
                      prose-ol:my-6
                      prose-strong:text-slate-900 prose-strong:font-black
                      prose-blockquote:border-l-4 prose-blockquote:border-red-600 prose-blockquote:bg-red-50 prose-blockquote:py-4 prose-blockquote:px-8 prose-blockquote:rounded-r-2xl prose-blockquote:not-italic prose-blockquote:font-bold prose-blockquote:text-red-800"
                    dangerouslySetInnerHTML={{ __html: formData.content_html || '<p>Le contenu apparaîtra ici...</p>' }}
                  />

                  {/* Footer article simulation */}
                  <div className="mt-16 pt-8 border-t border-slate-200 flex items-center justify-between text-[11px] font-bold text-slate-400 uppercase tracking-widest">
                    <span>ESEND · Experts Nuisibles Riviera</span>
                    <span>{article?.created_at ? formatDate(article.created_at) : 'À publier'}</span>
                  </div>
                </article>
              </div>
            </div>
          )}

          {/* TAB : SEO */}
          {activeTab === 'seo' && (
            <div className="flex-grow p-8 overflow-y-auto">
              <div className="max-w-2xl mx-auto space-y-6">
                <div className="glass-card border-[var(--border-subtle)] bg-[var(--bg-secondary)]">
                  <div className="flex items-center gap-3 text-[var(--text-main)] mb-8 font-black uppercase tracking-widest text-[10px] border-b border-[var(--border-subtle)] pb-4">
                    <Search className="w-4 h-4" /> Optimisation Moteurs de Recherche
                  </div>

                  {/* Google Preview */}
                  <div className="bg-white rounded-xl p-5 mb-6 border border-slate-200">
                    <div className="text-[11px] text-slate-500 mb-1">esendnuisibles.fr › journal-expert</div>
                    <div className="text-blue-700 font-bold text-base mb-1 line-clamp-1">{formData.meta_title || formData.title || 'Meta Title manquant'}</div>
                    <div className="text-slate-600 text-[12px] leading-relaxed line-clamp-2">{formData.meta_description || formData.excerpt || 'Meta description manquante...'}</div>
                  </div>

                  <div className="space-y-5">
                    <div>
                      <div className="flex justify-between mb-2">
                        <label className="block text-[10px] font-black uppercase text-[var(--text-dimmed)] tracking-widest">Meta Title (Google) — max 60 car.</label>
                        <span className={`text-[9px] font-black ${(formData.meta_title || '').length > 60 ? 'text-red-500' : 'text-emerald-500'}`}>
                          {(formData.meta_title || '').length}/60
                        </span>
                      </div>
                      <input
                        type="text"
                        value={formData.meta_title}
                        onChange={e => update('meta_title', e.target.value)}
                        className="w-full bg-[var(--bg-input)] border border-[var(--border-subtle)] rounded-xl px-4 py-3 text-sm focus:border-red-600/50 outline-none transition-all"
                        placeholder="Titre SEO — incluez Menton ou Monaco"
                      />
                    </div>
                    <div>
                      <div className="flex justify-between mb-2">
                        <label className="block text-[10px] font-black uppercase text-[var(--text-dimmed)] tracking-widest">Meta Description — max 160 car.</label>
                        <span className={`text-[9px] font-black ${(formData.meta_description || '').length > 160 ? 'text-red-500' : 'text-emerald-500'}`}>
                          {(formData.meta_description || '').length}/160
                        </span>
                      </div>
                      <textarea
                        value={formData.meta_description}
                        onChange={e => update('meta_description', e.target.value)}
                        rows={4}
                        className="w-full bg-[var(--bg-input)] border border-[var(--border-subtle)] rounded-xl px-4 py-3 text-sm focus:border-red-600/50 outline-none transition-all resize-none text-[var(--text-main)]"
                        placeholder="Description optimisée pour le clic — incluez Menton/Monaco"
                      />
                    </div>

                    <div className="bg-[var(--bg-input)] p-4 rounded-2xl border border-[var(--border-subtle)] flex gap-3 items-start">
                      <Info className="w-4 h-4 text-[var(--text-dimmed)] shrink-0 mt-0.5" />
                      <p className="text-[11px] text-[var(--text-dimmed)] leading-relaxed font-medium">
                        <strong>Conseil Riviera :</strong> Incluez "Menton", "Monaco" ou "Côte d'Azur" dans votre méta-description pour favoriser le référencement local. Le bouton <strong>IA Magie</strong> pré-remplit automatiquement ces champs.
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          )}
        </div>

        {/* ─── Footer Actions ─── */}
        <div className="p-6 border-t border-[var(--border-subtle)] flex justify-between items-center gap-4 bg-[var(--bg-secondary)]">

          {/* Left: Supprimer (seulement pour articles existants) */}
          <div>
            {!isNew && (
              <button
                onClick={handleDelete}
                disabled={isDeleting}
                className="flex items-center gap-2 px-4 py-3 rounded-xl text-[10px] font-black uppercase tracking-widest text-red-500/60 hover:text-red-500 hover:bg-red-600/10 border border-red-600/10 hover:border-red-600/30 transition-all disabled:opacity-50"
              >
                {isDeleting ? <Loader2 className="w-3.5 h-3.5 animate-spin" /> : <Trash2 className="w-3.5 h-3.5" />}
                Supprimer l'article
              </button>
            )}
          </div>

          {/* Right: Brouillon + Publier */}
          <div className="flex gap-3">
            <button
              type="button"
              onClick={onClose}
              className="px-5 py-3 rounded-xl border border-[var(--border-subtle)] text-[10px] font-black uppercase tracking-widest text-[var(--text-dimmed)] hover:text-[var(--text-main)] hover:bg-[var(--bg-input)] transition-all"
            >
              Fermer
            </button>
            <button
              onClick={() => handleSave(false)}
              disabled={isSaving}
              className="flex items-center gap-2 px-5 py-3 rounded-xl border border-amber-500/40 text-amber-400 bg-amber-500/10 hover:bg-amber-500/20 text-[10px] font-black uppercase tracking-widest transition-all disabled:opacity-50"
            >
              {isSaving ? <Loader2 className="w-3.5 h-3.5 animate-spin" /> : <EyeOff className="w-3.5 h-3.5" />}
              Brouillon
            </button>
            <button
              onClick={() => handleSave(true)}
              disabled={isSaving}
              className="flex items-center gap-3 bg-gradient-to-r from-emerald-600 to-teal-600 text-white px-8 py-3 rounded-xl font-black uppercase tracking-widest text-[10px] hover:scale-105 transition-all shadow-xl shadow-emerald-600/20 active:scale-95 disabled:opacity-50"
            >
              {isSaving ? <Loader2 className="w-4 h-4 animate-spin" /> : <Globe className="w-4 h-4" />}
              Publier
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ArticleModal;
