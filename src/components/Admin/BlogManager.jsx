// src/components/Admin/BlogManager.jsx
/**
 * @file BlogManager.jsx — Gestionnaire du Journal Expert v2
 * @specialist frontend-dev-guidelines, frontend-ui-dark-ts
 * Features: catégorisation dynamique, filtres pills, badges Publié/Brouillon,
 *           dates créé/modifié, lien "Voir sur le site", sélecteur 3 modes de rédaction
 */
import React, { useState, useEffect } from 'react';
import {
  Plus, Trash2, Edit3, Eye, Sparkles, ExternalLink,
  Calendar, Globe, EyeOff, Clock
} from 'lucide-react';
import { api } from '../../lib/api';
import ModeSelector from './ModeSelector';

// Catégories ESEND — nuisible_tag
const CATEGORIES = [
  { id: 'all',         label: 'Tous' },
  { id: 'actualites',  label: 'Actualités' },
  { id: 'cafards',     label: 'Cafards & Blattes' },
  { id: 'desinfection',label: 'Désinfection' },
  { id: 'fourmis',     label: 'Fourmis' },
  { id: 'frelons',     label: 'Frelons & Guêpes' },
  { id: 'nettoyage',   label: 'Nettoyage' },
  { id: 'punaises',    label: 'Punaises de Lit' },
  { id: 'rats',        label: 'Rats & Souris' },
];

const formatDate = (str) => {
  if (!str) return '—';
  try {
    return new Date(str).toLocaleDateString('fr-FR', { day: '2-digit', month: 'short', year: 'numeric' });
  } catch { return str; }
};

const BlogManager = ({ onOpenStudio, onEditArticle, onNewArticle, searchQuery }) => {
  const [articles, setArticles] = useState([]);
  const [loading, setLoading] = useState(true);
  const [activeCategory, setActiveCategory] = useState('all');
  const [showModeSelector, setShowModeSelector] = useState(false);
  const [deletingId, setDeletingId] = useState(null);
  const [publishingId, setPublishingId] = useState(null);

  useEffect(() => { loadArticles(); }, []);

  const loadArticles = async () => {
    setLoading(true);
    try {
      const data = await api.getArticles();
      setArticles(Array.isArray(data) ? data : []);
    } catch (e) {
      console.error('[BlogManager] fetch error', e);
      setArticles([]);
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = async (article) => {
    if (!window.confirm(`Supprimer définitivement "${article.title}" ? Cette action est irréversible.`)) return;
    setDeletingId(article.id);
    try {
      await api.deleteArticle(article.uuid || article.id);
      setArticles(prev => prev.filter(a => a.id !== article.id));
    } catch (e) {
      alert('Erreur lors de la suppression : ' + e.message);
    } finally {
      setDeletingId(null);
    }
  };

  const handleTogglePublish = async (article) => {
    const newStatus = !article.is_published;
    setPublishingId(article.id);
    try {
      await api.updateArticle(article.uuid || article.id, {
        ...article,
        is_published: newStatus
      });
      // Local update
      setArticles(prev => prev.map(a => 
        a.id === article.id ? { ...a, is_published: newStatus } : a
      ));
    } catch (e) {
      alert('Erreur lors du changement de statut : ' + e.message);
    } finally {
      setPublishingId(null);
    }
  };

  const handleModeSelect = (modeId, template) => {
    setShowModeSelector(false);
    if (modeId === 'ia') {
      onOpenStudio();
    } else if (modeId === 'prompt') {
      // Ouvre le Studio en mode Prompt Guidé
      onOpenStudio('prompt');
    } else if (modeId === 'libre') {
      onNewArticle({ content_html: template, status: 'draft', is_published: false });
    }
  };

  // Filtrage
  const filtered = articles.filter(a => {
    const matchCat = activeCategory === 'all' || a.nuisible_tag === activeCategory;
    if (!searchQuery) return matchCat;
    const q = searchQuery.toLowerCase();
    return matchCat && (
      (a.title || '').toLowerCase().includes(q) ||
      (a.category || '').toLowerCase().includes(q) ||
      (a.excerpt || '').toLowerCase().includes(q)
    );
  });

  // Compteurs par catégorie
  const countFor = (catId) =>
    catId === 'all'
      ? articles.length
      : articles.filter(a => a.nuisible_tag === catId).length;

  return (
    <div className="space-y-8 animate-in fade-in duration-700">

      {/* ─── Header ─── */}
      <div>
        <h3 className="text-2xl font-black uppercase tracking-tighter">Le Journal de l'Expert</h3>
        <p className="text-[var(--text-dimmed)] text-[10px] font-bold uppercase tracking-widest mt-1">
          {articles.length} article{articles.length !== 1 ? 's' : ''} · {articles.filter(a => a.is_published).length} publié{articles.filter(a => a.is_published).length !== 1 ? 's' : ''}
        </p>
      </div>

      {/* ─── Filtres Catégories ─── */}
      <div className="flex flex-wrap gap-2">
        {CATEGORIES.map(cat => {
          const count = countFor(cat.id);
          return (
            <button
              key={cat.id}
              onClick={() => setActiveCategory(cat.id)}
              className={`flex items-center gap-2 px-4 py-2 rounded-full text-[10px] font-black uppercase tracking-widest transition-all border ${
                activeCategory === cat.id
                  ? 'bg-[var(--text-main)] text-[var(--bg-primary)] border-transparent shadow-lg'
                  : 'bg-[var(--bg-secondary)] text-[var(--text-dimmed)] border-[var(--border-subtle)] hover:border-[var(--text-main)]/30 hover:text-[var(--text-main)]'
              }`}
            >
              {cat.label}
              <span className={`px-1.5 py-0.5 rounded text-[9px] font-black ${
                activeCategory === cat.id ? 'bg-white/20' : 'bg-[var(--bg-input)]'
              }`}>
                {count}
              </span>
            </button>
          );
        })}
      </div>

      {/* ─── Grille ─── */}
      {loading ? (
        <div className="py-20 text-center">
          <div className="inline-block w-8 h-8 border-2 border-red-600 border-t-transparent rounded-full animate-spin" />
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
          {filtered.map((article) => {
            const isPublished = article.is_published === 1 || article.is_published === true || article.status === 'published';
            const isDeleting = deletingId === article.id;
            const publicUrl = `#/expert/${article.uuid || article.id}`;

            return (
              <div
                key={article.id}
                className={`glass-card group relative overflow-hidden flex flex-col bg-[var(--bg-secondary)] transition-all duration-300 hover:shadow-2xl hover:-translate-y-1 ${
                  isPublished 
                    ? 'border-[var(--border-subtle)]' 
                    : 'border-amber-500/20 border-dashed bg-amber-500/5'
                } ${isDeleting ? 'opacity-50 pointer-events-none' : ''}`}
              >
                <div className="relative aspect-video rounded-xl overflow-hidden mb-4 border border-[var(--border-subtle)] bg-[var(--bg-input)]">
                  {article.image || article.cover_image ? (
                    <img
                      src={article.image || article.cover_image}
                      alt={article.title}
                      className="w-full h-full object-cover grayscale transition-all duration-700 group-hover:grayscale-0 group-hover:scale-110"
                    />
                  ) : (
                    <div className="w-full h-full flex flex-col items-center justify-center text-[var(--text-dimmed)] opacity-40 group-hover:opacity-100 transition-all">
                       <Camera className="w-8 h-8 mb-2" />
                       <span className="text-[9px] font-black uppercase tracking-widest">Image manquante</span>
                    </div>
                  )}
                  <div className="absolute inset-0 bg-gradient-to-t from-[var(--bg-primary)]/80 via-transparent to-transparent" />

                  {/* Badge Catégorie nuisible */}
                  {article.nuisible_tag && article.nuisible_tag !== 'actualites' && (
                    <div className="absolute top-3 left-3 bg-red-600 text-white text-[9px] font-black px-2 py-1 rounded-md uppercase tracking-wider">
                      {CATEGORIES.find(c => c.id === article.nuisible_tag)?.label || article.nuisible_tag}
                    </div>
                  )}

                  {/* Badge Publié / Brouillon — V3 ULTRA VISIBLE */}
                  <div className={`absolute top-0 right-0 px-4 py-2 rounded-bl-2xl font-black uppercase tracking-[0.2em] text-[10px] shadow-2xl skew-x-[-2deg] origin-top-right transition-all duration-500 z-10 ${
                    isPublished
                      ? 'bg-emerald-500 text-white border-b border-l border-emerald-400/50'
                      : 'bg-amber-500 text-black border-b border-l border-amber-400/50 scale-110 translate-x-1 translate-y-1'
                  }`}>
                    <div className="flex items-center gap-2">
                       {isPublished ? <Globe className="w-3 h-3" /> : <EyeOff className="w-3 h-3" />}
                       {isPublished ? 'PUBLIÉ' : 'BROUILLON'}
                    </div>
                  </div>
                </div>

                {/* Content */}
                <h4 className="text-sm font-black uppercase tracking-tight mb-2 group-hover:text-red-600 transition-colors line-clamp-2">
                  {article.title}
                </h4>

                <p className="text-[var(--text-dimmed)] text-[11px] leading-relaxed mb-4 line-clamp-2 flex-grow">
                  {article.excerpt}
                </p>

                {/* Dates */}
                <div className="flex items-center gap-4 mb-4 text-[9px] font-bold text-[var(--text-dimmed)] uppercase tracking-widest">
                  <div className="flex items-center gap-1.5">
                    <Calendar className="w-3 h-3" />
                    {formatDate(article.created_at || article.date)}
                  </div>
                  {article.updated_at && article.updated_at !== article.created_at && (
                    <div className="flex items-center gap-1.5 text-amber-500/70">
                      <Clock className="w-3 h-3" />
                      Modifié {formatDate(article.updated_at)}
                    </div>
                  )}
                </div>

                {/* Actions */}
                <div className="pt-4 border-t border-[var(--border-subtle)] flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <a
                      href={publicUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="p-2.5 rounded-lg bg-[var(--bg-input)] text-[var(--text-dimmed)] hover:text-blue-400 hover:bg-blue-600/10 transition-all border border-[var(--border-subtle)]"
                      title="Voir sur le site"
                    >
                      <ExternalLink className="w-3.5 h-3.5" />
                    </a>

                    <button
                      onClick={() => handleTogglePublish(article)}
                      disabled={publishingId === article.id}
                      className={`p-2.5 rounded-lg transition-all border flex items-center gap-2 min-w-[42px] justify-center ${
                        isPublished
                          ? 'bg-amber-500/5 text-amber-500/50 hover:text-amber-500 hover:bg-amber-500/10 border-amber-500/10 hover:border-amber-500/30'
                          : 'bg-emerald-500/10 text-emerald-500 hover:bg-emerald-500 hover:text-white border-emerald-500/50 hover:shadow-[0_0_15px_rgba(16,185,129,0.4)]'
                      }`}
                      title={isPublished ? "Repasser en brouillon" : "Publier immédiatement"}
                    >
                      {publishingId === article.id ? (
                        <div className="w-3.5 h-3.5 border-2 border-current border-t-transparent rounded-full animate-spin" />
                      ) : isPublished ? (
                        <EyeOff className="w-3.5 h-3.5" />
                      ) : (
                        <>
                          <Globe className="w-3.5 h-3.5" />
                          <span className="text-[9px] font-black uppercase tracking-widest hidden sm:inline">Publier</span>
                        </>
                      )}
                    </button>
                  </div>

                  <div className="flex items-center gap-2">
                    <button
                      onClick={() => onEditArticle(article)}
                      className="p-2.5 rounded-lg bg-[var(--bg-input)] text-[var(--text-dimmed)] hover:text-red-600 hover:bg-[var(--bg-primary)] transition-all border border-[var(--border-subtle)]"
                      title="Éditer"
                    >
                      <Edit3 className="w-3.5 h-3.5" />
                    </button>
                    <button
                      onClick={() => handleDelete(article)}
                      className="p-2.5 rounded-lg bg-red-600/5 text-red-500/50 hover:text-red-500 hover:bg-red-600/10 transition-all border border-red-600/10 hover:border-red-600/30"
                      title="Supprimer"
                      disabled={isDeleting}
                    >
                      <Trash2 className="w-3.5 h-3.5" />
                    </button>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      )}

      {!loading && filtered.length === 0 && (
        <div className="py-20 text-center glass-card border-dashed border-[var(--border-subtle)]">
          <p className="text-[var(--text-dimmed)] font-black uppercase tracking-[0.2em] text-[10px]">
            {activeCategory !== 'all' ? `Aucun article dans "${CATEGORIES.find(c => c.id === activeCategory)?.label}"` : 'Aucun dossier trouvé'}
          </p>
          <button
            onClick={() => setShowModeSelector(true)}
            className="mt-6 flex items-center gap-2 mx-auto bg-gradient-to-r from-red-600 to-indigo-600 text-white px-5 py-3 rounded-xl font-black uppercase tracking-widest text-[10px] hover:scale-105 transition-all"
          >
            <Sparkles className="w-3.5 h-3.5" /> Créer le premier article
          </button>
        </div>
      )}

      {/* Mode Selector Modal */}
      {showModeSelector && (
        <ModeSelector
          onSelectMode={handleModeSelect}
          onClose={() => setShowModeSelector(false)}
        />
      )}
    </div>
  );
};

export { CATEGORIES };
export default BlogManager;
