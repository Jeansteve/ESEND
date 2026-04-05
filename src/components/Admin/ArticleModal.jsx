/**
 * @file ArticleModal.jsx — Éditeur d'article ESEND v3 (parité TNERI)
 * @description Éditeur complet avec WYSIWYG ReactQuill, Split-View,
 * upload image, compteur mots/temps, slug auto, toast confirmation.
 *
 * FONCTIONNALITÉS :
 * - ReactQuill WYSIWYG avec toolbar complète
 * - 4 modes : ÉDITEUR / SPLIT / APERÇU / SEO
 * - Upload image (drag-and-drop + compression webp)
 * - Compteur mots + temps de lecture sous le titre
 * - Slug auto-généré depuis le titre
 * - Toast de confirmation après sauvegarde
 * - Brouillon / Publier distincts
 * - Suppression avec confirmation
 */
import React, { useState, useEffect, useRef, useMemo } from 'react';
import ReactQuill from 'react-quill';
import 'react-quill/dist/quill.snow.css';
import imageCompression from 'browser-image-compression';
import {
  X, Save, Sparkles, Eye, Search, Loader2, Trash2, Globe,
  EyeOff, Calendar, Clock, Camera, Edit3, FileText, Columns,
  Maximize2, CheckCircle, RefreshCw, ChevronDown, Info
} from 'lucide-react';
import { api } from '../../lib/api';
import { AIService } from '../../lib/AIService';
import { CATEGORIES } from './BlogManager';

const NUISIBLE_TAGS = CATEGORIES.filter(c => c.id !== 'all');

const EXPERT_TEMPLATE = `
<h2>Introduction : Le défi des nuisibles sur la French Riviera</h2>
<p>La Côte d'Azur, avec son climat doux et son urbanisme dense, offre un terrain propice à la prolifération des nuisibles. À Menton, Monaco ou Roquebrune, les copropriétés et les villas de prestige font face à des défis sanitaires sans précédent. Ignorer les premiers signes d’une infestation, c'est s'exposer à des dommages structurels et des risques sanitaires majeurs.</p>

<h2>Les Causes : Pourquoi la région Riviera est-elle ciblée ?</h2>
<p>L’attractivité de notre région ne concerne pas que les touristes. Les flux constants de marchandises, l'humidité maritime et les structures anciennes des centres-villes créent des "autoroutes" pour les rongeurs et les insectes. De plus, le réchauffement climatique allonge les périodes d'activité des frelons et des moustiques tigres sur toute la côte.</p>

<blockquote>"En 2025, nous avons constaté une augmentation de 40% des interventions pour résistances génétiques aux traitements du commerce sur le secteur de Menton."</blockquote>

<h2>Notre Solution ESEND : L'Excellence Certifiée</h2>
<p>Face à ces menaces, ESEND déploie un protocole d'assainissement radical. Certifiés <strong>Certibiocide</strong>, nous n'utilisons que des molécules professionnelles ciblées agissant au cœur des nids. Notre approche combine détection technologique (caméras thermiques) et lutte raisonnée pour une éradication durable sans impact inutile sur votre environnement immédiat.</p>

<h2>Résultats Garantis & Sérénité Retrouvée</h2>
<p>Chaque intervention ESEND fait l'objet d'un rapport technique détaillé et d'une garantie de résultat. Que vous soyez un syndic à Nice ou un restaurateur à Monaco, notre discrétion et notre efficacité vous assurent un retour à la normale en moins de 48 heures. Votre protection est notre priorité absolue.</p>

<h2>Prévention : Les 3 Règles d'Or de l'Expert</h2>
<ul>
  <li>Étanchéité : Colmatez les accès techniques et les fissures dans les caves.</li>
  <li>Gestion des déchets : Utilisez des contenants hermétiques et évitez les zones stagnantes.</li>
  <li>Vigilance : Un contrôle annuel préventif divise par dix le coût d'une infestation déclarée.</li>
</ul>

<p>[IMAGE : Photo d'un technicien ESEND en intervention certifiée sur une toiture à Menton]</p>
`;

const generateSlug = (text) =>
  (text || '')
    .normalize('NFD')
    .replace(/[\u0300-\u036f]/g, '')
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/^-+|-+$/g, '');

const formatDate = (str) => {
  if (!str) return null;
  try {
    return new Date(str).toLocaleDateString('fr-FR', {
      day: '2-digit', month: 'long', year: 'numeric',
      hour: '2-digit', minute: '2-digit'
    });
  } catch { return str; }
};

// ─── Toast Component ─────────────────────────────────────────────────────────
const Toast = ({ show, message = 'Article enregistré ✓' }) => (
  <div
    className={`fixed bottom-8 left-1/2 -translate-x-1/2 z-[9999] flex items-center gap-3 bg-emerald-600 text-white px-6 py-4 rounded-2xl font-black uppercase tracking-widest text-[10px] shadow-2xl shadow-emerald-600/40 transition-all duration-500 ${show ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8 pointer-events-none'}`}
  >
    <CheckCircle className="w-4 h-4" /> {message}
  </div>
);

// ─── ArticleModal ─────────────────────────────────────────────────────────────
const ArticleModal = ({ article, onClose, onSave, onDelete }) => {
  const isNew = !article?.id;
  const fileInputRef = useRef(null);

  // ── State ──
  const [formData, setFormData] = useState({
    id: article?.id || null,
    title: article?.title || '',
    slug: article?.slug || generateSlug(article?.title || ''),
    category: article?.category || 'Expertise',
    nuisible_tag: article?.nuisible_tag || 'actualites',
    excerpt: article?.excerpt || '',
    content_html: article?.content_html || EXPERT_TEMPLATE,
    cover_image: article?.cover_image || article?.image || '', // Jamais de valeur par défaut — force la zone d'upload
    meta_title: article?.meta_title || '',
    meta_description: article?.meta_description || '',
    service_id: article?.service_id || 1,
    is_published: article?.is_published || 0,
    image_prompt: '', // Suggestion image de l'IA (non stocké en DB)
  });

  const [activeTab, setActiveTab] = useState('split');
  const [isUploading, setIsUploading] = useState(false);
  const [isGenerating, setIsGenerating] = useState(false);
  const [isSaving, setIsSaving] = useState(false);
  const [isDeleting, setIsDeleting] = useState(false);
  const [showToast, setShowToast] = useState(false);
  const [toastMsg, setToastMsg] = useState('');
  const [lastSaved, setLastSaved] = useState(null);

  const handleOpenPromptEditor = async () => {
    setShowPromptEditor(true);
    setLoadingPrompt(true);
    try {
      const prompt = await AIService.generateVisualPrompt(formData.title, formData.service_id || 1, formData.content_html || '');
      setVisualPrompt(prompt);
      update('image_prompt', prompt);
    } catch (e) {
      alert("Erreur génération prompt : " + e.message);
    } finally {
      setLoadingPrompt(false);
    }
  };

  // AI Visual Prompt States (TNERI Parity)
  const [visualPrompt, setVisualPrompt] = useState('');
  const [showPromptEditor, setShowPromptEditor] = useState(false);
  const [loadingPrompt, setLoadingPrompt] = useState(false);
  const [copied, setCopied] = useState(false);

  // ── Quill modules ──
  const quillModules = useMemo(() => ({
    toolbar: {
      container: [
        [{ 'header': [2, 3, false] }],
        ['bold', 'italic', 'underline', 'strike', 'blockquote'],
        [{ 'list': 'ordered' }, { 'list': 'bullet' }],
        ['link'],
        ['image', 'video'],
        ['clean']
      ],
    },
  }), []);

  // ── Metrics ──
  const metrics = useMemo(() => {
    const text = (formData.content_html || '')
      .replace(/<[^>]*>/g, ' ')
      .replace(/\s+/g, ' ')
      .trim();
    const words = text ? text.split(' ').filter(Boolean).length : 0;
    const time = Math.max(1, Math.ceil(words / 200));
    return { words, time };
  }, [formData.content_html]);

  // ── Slug auto-update ──
  const update = (field, val) => {
    setFormData(prev => {
      const updates = { [field]: val };
      if (field === 'title' && (!prev.slug || prev.slug === generateSlug(prev.title))) {
        updates.slug = generateSlug(val);
      }
      return { ...prev, ...updates };
    });
  };

  // ── Toast helper ──
  const toast = (msg = 'Article enregistré ✓') => {
    setToastMsg(msg);
    setShowToast(true);
    setTimeout(() => setShowToast(false), 3000);
  };

  // ── AI Refine ──
  const handleAiRefine = async () => {
    if (!formData.title) return alert('Veuillez saisir au moins un titre.');
    setIsGenerating(true);
    try {
      const refined = await AIService.draftArticle(formData.title);
      
      // Construire le nouvel état — ne pas écraser l'image si elle est déjà personnalisée
      const GENERIC_URLS = ['unsplash.com', 'picsum.photos', 'placeholder'];
      const currentImageIsGeneric = !formData.cover_image || 
        GENERIC_URLS.some(u => formData.cover_image.includes(u));
      
      setFormData(prev => ({
        ...prev,
        ...refined,
        // Conserver l'image si elle est personnalisée, sinon vider pour forcer l'upload
        cover_image: currentImageIsGeneric ? '' : prev.cover_image,
        // Slug auto depuis le nouveau titre
        slug: generateSlug(refined.title || prev.title),
      }));

      // Informer l'utilisateur du prompt image s'il est disponible
      if (refined.image_prompt && currentImageIsGeneric) {
        toast(`✨ Article généré ! Image suggérée : "${refined.image_prompt.slice(0, 60)}..."`);
      } else {
        toast('Article généré par l\'IA ✨');
      }
    } catch (err) {
      alert(err.message);
    } finally {
      setIsGenerating(false);
    }
  };

  // ── Save ──
  const handleSave = async (publishValue = null) => {
    setIsSaving(true);
    try {
      const is_published = publishValue !== null ? publishValue : formData.is_published;
      const payload = {
        ...formData,
        image: formData.cover_image, // backward compat with API
        is_published
      };

      let res;
      if (article?.id) {
        res = await api.updateArticle(article.uuid || article.id, payload);
      } else {
        res = await api.createArticle(payload);
      }

      if (res?.success) {
        setFormData(prev => ({ ...prev, is_published }));
        setLastSaved(new Date());
        toast(is_published ? 'Article publié ✓' : 'Brouillon enregistré ✓');
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

  // ── Delete ──
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

  // ── Image Upload ──
  const handleImageUpload = async (file) => {
    if (!file) return;
    setIsUploading(true);
    try {
      const options = {
        maxSizeMB: 2,
        maxWidthOrHeight: 1920,
        useWebWorker: true,
        fileType: 'image/webp',
      };
      const compressed = await imageCompression(file, options);
      const newName = file.name.replace(/\.[^/.]+$/, '') + '.webp';
      const finalFile = new File([compressed], newName, { type: 'image/webp' });

      const formPayload = new FormData();
      formPayload.append('image', finalFile);

      const BASE = import.meta.env.VITE_API_BASE || '/api';
      const res = await fetch(`${BASE}/upload-image.php`, {
        method: 'POST',
        body: formPayload,
      });
      const data = await res.json();
      if (data.success) {
        update('cover_image', data.url);
        toast('Image téléversée ✓');
      } else {
        throw new Error(data.error || 'Erreur upload');
      }
    } catch (err) {
      // Fallback : let user paste URL manually
      alert('Upload indisponible. Collez directement l\'URL de votre image ci-dessous.');
    } finally {
      setIsUploading(false);
    }
  };

  const isPublished = formData.is_published === true || formData.is_published === 1;

  // ── Preview Component ──
  const PreviewContent = () => (
    <div className="bg-white text-slate-900 min-h-full p-8 md:p-12 selection:bg-red-200">
      <article className="max-w-2xl mx-auto">
        <div className="flex items-center gap-2 text-[10px] font-bold text-slate-400 mb-6 uppercase tracking-widest">
          <span>ESEND</span><span>/</span><span>Journal Expert</span><span>/</span>
          <span className="text-red-600">{NUISIBLE_TAGS.find(c => c.id === formData.nuisible_tag)?.label || 'Article'}</span>
        </div>
        <div className="uppercase text-red-600 font-black tracking-[0.3em] text-[10px] mb-4">{formData.category}</div>
        <h1 className="text-3xl md:text-4xl font-black tracking-tighter leading-tight mb-6">
          {formData.title || 'Titre de l\'article'}
        </h1>
        {formData.cover_image && (
          <div className="aspect-video rounded-xl overflow-hidden mb-8 border border-slate-100">
            <img src={formData.cover_image} alt={formData.title} className="w-full h-full object-cover" />
          </div>
        )}
        {formData.excerpt && (
          <div className="mb-8 pb-8 border-b border-slate-100">
            <p className="text-lg font-medium text-slate-600 leading-relaxed">
              {formData.excerpt}
            </p>
          </div>
        )}
        <div
          className="article-preview-content"
          dangerouslySetInnerHTML={{ __html: formData.content_html || '<p>Le contenu apparaîtra ici...</p>' }}
        />
        <div className="mt-12 pt-6 border-t border-slate-200 flex items-center justify-between text-[10px] font-bold text-slate-400 uppercase tracking-widest">
          <span>ESEND · Experts Nuisibles Riviera</span>
          <span>{article?.created_at ? formatDate(article.created_at) : 'À publier'}</span>
        </div>
      </article>
    </div>
  );

  // ── Render ──
  return (
    <div className="fixed inset-0 z-[100] flex items-center justify-center bg-[var(--bg-overlay)] backdrop-blur-2xl animate-in fade-in duration-300 p-2 md:p-4">
      <div className="glass-card w-full max-w-7xl h-[96vh] overflow-hidden flex flex-col p-0 border-[var(--border-subtle)] shadow-3xl">

        {/* ─── Header ─── */}
        <div className="px-5 py-4 border-b border-[var(--border-subtle)] flex flex-col md:flex-row justify-between items-start md:items-center gap-3 bg-[var(--bg-secondary)] shrink-0">
          <div className="flex items-center gap-4 min-w-0">
            <div className="min-w-0">
              <h3 className="text-sm font-black uppercase tracking-tighter truncate max-w-[280px]">
                {isNew
                  ? 'Nouvel Article'
                  : <><span className="text-red-600 italic">Édition</span> · {formData.title || 'Sans titre'}</>}
              </h3>
              <div className="flex items-center gap-3 mt-1 flex-wrap">
                {article?.created_at && (
                  <span className="flex items-center gap-1 text-[9px] font-bold text-[var(--text-dimmed)] uppercase tracking-widest">
                    <Calendar className="w-2.5 h-2.5" /> Créé {formatDate(article.created_at)}
                  </span>
                )}
                {lastSaved && (
                  <span className="flex items-center gap-1 text-[9px] font-bold text-emerald-500 uppercase tracking-widest">
                    <CheckCircle className="w-2.5 h-2.5" /> Enregistré à {lastSaved.toLocaleTimeString('fr-FR', { hour: '2-digit', minute: '2-digit' })}
                  </span>
                )}
              </div>
            </div>

            {/* Tabs */}
            <nav className="flex gap-1 bg-[var(--bg-input)] p-1 rounded-xl border border-[var(--border-subtle)] shrink-0">
              {[
                { id: 'editor', label: 'Éditeur', icon: FileText },
                { id: 'split', label: 'Split', icon: Columns },
                { id: 'preview', label: 'Aperçu', icon: Eye },
                { id: 'seo', label: 'SEO', icon: Search },
              ].map(t => (
                <button
                  key={t.id}
                  onClick={() => setActiveTab(t.id)}
                  className={`flex items-center gap-1.5 px-3 py-2 rounded-lg text-[9px] font-black uppercase tracking-widest transition-all ${activeTab === t.id ? 'bg-[var(--text-main)] text-[var(--bg-primary)]' : 'text-[var(--text-dimmed)] hover:text-[var(--text-main)]'}`}
                >
                  <t.icon className="w-3 h-3" /> {t.label}
                </button>
              ))}
            </nav>
          </div>

          <div className="flex items-center gap-2 shrink-0">
            <div className={`hidden md:flex items-center gap-1.5 text-[9px] font-black uppercase tracking-widest px-3 py-2 rounded-lg border ${isPublished ? 'bg-emerald-500/10 text-emerald-400 border-emerald-500/30' : 'bg-amber-500/10 text-amber-400 border-amber-500/30'}`}>
              {isPublished ? <Globe className="w-3 h-3" /> : <EyeOff className="w-3 h-3" />}
              {isPublished ? 'Publié' : 'Brouillon'}
            </div>
            <button
              onClick={handleAiRefine}
              disabled={isGenerating}
              className="flex items-center gap-1.5 bg-gradient-to-r from-red-600 to-indigo-600 text-white px-4 py-2.5 rounded-xl font-black uppercase tracking-widest text-[9px] hover:scale-105 transition-all disabled:opacity-50 shadow-lg"
            >
              {isGenerating ? <Loader2 className="w-3.5 h-3.5 animate-spin" /> : <Sparkles className="w-3.5 h-3.5" />}
              IA Magie
            </button>
            <button onClick={onClose} className="p-2 hover:bg-[var(--bg-input)] rounded-full text-[var(--text-dimmed)] hover:text-red-600 transition-all border border-transparent hover:border-[var(--border-subtle)]">
              <X className="w-5 h-5" />
            </button>
          </div>
        </div>

        {/* ─── Content Area ─── */}
        <div className="flex-grow overflow-hidden flex">

          {/* EDITOR PANE — visible on editor/split modes */}
          {(activeTab === 'editor' || activeTab === 'split') && (
            <div className={`flex flex-col overflow-y-auto ${activeTab === 'split' ? 'w-1/2 border-r border-[var(--border-subtle)]' : 'w-full'}`}>
              <div className="p-6 space-y-6">

                {/* Titre + Métriques */}
                <div>
                  <label className="block text-[10px] font-black uppercase text-[var(--text-dimmed)] mb-2 tracking-widest">Titre de l'article *</label>
                  <input
                    type="text"
                    value={formData.title}
                    onChange={e => update('title', e.target.value)}
                    className="w-full bg-[var(--bg-input)] border border-[var(--border-subtle)] rounded-xl px-5 py-4 text-xl font-black tracking-tight focus:border-red-600/50 outline-none transition-all placeholder:text-[var(--text-dimmed)]"
                    placeholder="Saisissez un titre percutant..."
                  />
                  {/* Metrics bar */}
                  <div className="flex items-center gap-3 mt-2">
                    <div className="px-3 py-1.5 rounded-full bg-emerald-500/10 border border-emerald-500/20 text-emerald-500 text-[9px] font-black uppercase tracking-widest flex items-center gap-2">
                      <Clock className="w-3 h-3" /> {metrics.time} MIN
                    </div>
                    <div className="px-3 py-1.5 rounded-full bg-blue-500/10 border border-blue-500/20 text-blue-500 text-[9px] font-black uppercase tracking-widest flex items-center gap-2">
                      <FileText className="w-3 h-3" /> {metrics.words} MOTS
                    </div>
                    <div className={`px-3 py-1.5 rounded-full text-[9px] font-black uppercase tracking-widest transition-all ${metrics.words > 800 ? 'bg-emerald-600 text-white shadow-lg shadow-emerald-600/20' : metrics.words > 300 ? 'bg-amber-500/10 border border-amber-500/20 text-amber-500' : 'bg-red-500/10 border border-red-500/20 text-red-500'}`}>
                      {metrics.words > 800 ? '✓ Premium' : metrics.words > 300 ? 'Qualité Standard' : 'Brouillon Court'}
                    </div>
                  </div>
                  {/* Slug */}
                  <div className="mt-2 flex items-center gap-2 text-[9px] text-[var(--text-dimmed)] font-medium">
                    <span className="opacity-60">URL :</span>
                    <span>esendnuisibles.fr/journal/</span>
                    <input
                      type="text"
                      value={formData.slug}
                      onChange={e => update('slug', e.target.value)}
                      className="flex-1 bg-transparent border-b border-[var(--border-subtle)] outline-none text-[9px] font-mono text-[var(--text-main)] focus:border-red-600/50"
                    />
                  </div>
                </div>

                {/* Excerpt */}
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

                {/* Contenu WYSIWYG */}
                <div>
                  <label className="block text-[10px] font-black uppercase text-[var(--text-dimmed)] mb-2 tracking-widest">Contenu de l'article</label>
                  <div className="rounded-xl border border-[var(--border-subtle)] bg-white">
                    <ReactQuill
                      theme="snow"
                      value={formData.content_html}
                      onChange={v => update('content_html', v)}
                      modules={quillModules}
                      style={{ minHeight: '320px', color: '#1e293b', background: 'white' }}
                    />
                  </div>
                </div>

                {/* Configuration sidebar (dans la colonne gauche sur mobile, affichée sous le contenu) */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">

                  {/* Catégorie Nuisible */}
                  <div>
                    <label className="block text-[9px] font-black uppercase text-[var(--text-dimmed)] mb-2 tracking-widest">Catégorie Nuisible</label>
                    <div className="relative">
                      <select
                        value={formData.nuisible_tag}
                        onChange={e => update('nuisible_tag', e.target.value)}
                        className="w-full bg-[var(--bg-input)] border border-[var(--border-subtle)] rounded-xl px-4 py-3 text-xs font-bold appearance-none outline-none focus:border-red-600/50"
                      >
                        {NUISIBLE_TAGS.map(c => <option key={c.id} value={c.id}>{c.label}</option>)}
                      </select>
                      <ChevronDown className="absolute right-3 top-1/2 -translate-y-1/2 w-4 h-4 text-[var(--text-dimmed)] pointer-events-none" />
                    </div>
                  </div>

                  {/* Type d'article */}
                  <div>
                    <label className="block text-[9px] font-black uppercase text-[var(--text-dimmed)] mb-2 tracking-widest">Type d'article</label>
                    <div className="relative">
                      <select
                        value={formData.category}
                        onChange={e => update('category', e.target.value)}
                        className="w-full bg-[var(--bg-input)] border border-[var(--border-subtle)] rounded-xl px-4 py-3 text-xs font-bold appearance-none outline-none focus:border-red-600/50"
                      >
                        {['Expertise', 'Protocole', 'Saisonnalité', 'Prévention', 'Actualité'].map(c => (
                          <option key={c}>{c}</option>
                        ))}
                      </select>
                      <ChevronDown className="absolute right-3 top-1/2 -translate-y-1/2 w-4 h-4 text-[var(--text-dimmed)] pointer-events-none" />
                    </div>
                  </div>

                  {/* Pôle Service */}
                  <div>
                    <label className="block text-[9px] font-black uppercase text-[var(--text-dimmed)] mb-2 tracking-widest">Pôle Service</label>
                    <div className="relative">
                      <select
                        value={formData.service_id}
                        onChange={e => update('service_id', parseInt(e.target.value))}
                        className="w-full bg-[var(--bg-input)] border border-[var(--border-subtle)] rounded-xl px-4 py-3 text-xs font-bold appearance-none outline-none focus:border-red-600/50"
                      >
                        <option value={1}>1 — Nuisibles</option>
                        <option value={2}>2 — Désinfection</option>
                        <option value={3}>3 — Nettoyage</option>
                      </select>
                      <ChevronDown className="absolute right-3 top-1/2 -translate-y-1/2 w-4 h-4 text-[var(--text-dimmed)] pointer-events-none" />
                    </div>
                  </div>

                  {/* Image Upload */}
                  <div>
                    <label className="block text-[9px] font-black uppercase text-[var(--text-dimmed)] mb-2 tracking-widest">Image de Couverture</label>
                    {isUploading ? (
                      <div className="aspect-video rounded-xl border border-[var(--border-subtle)] flex items-center justify-center gap-2 text-[10px] font-bold text-[var(--text-dimmed)] bg-[var(--bg-input)]">
                        <Loader2 className="w-4 h-4 animate-spin" /> Compression...
                      </div>
                    ) : formData.cover_image ? (
                      <div className="relative group rounded-xl overflow-hidden border border-[var(--border-subtle)]">
                        <img src={formData.cover_image} alt="Cover" className="w-full aspect-video object-cover" />
                        <div className="absolute inset-0 bg-black/50 opacity-0 group-hover:opacity-100 transition-all flex items-center justify-center gap-3">
                          <button onClick={() => fileInputRef.current?.click()} className="p-2 bg-white/20 hover:bg-white/40 rounded-lg text-white transition-all backdrop-blur-md">
                            <Edit3 className="w-4 h-4" />
                          </button>
                          <button onClick={() => update('cover_image', '')} className="p-2 bg-red-600/80 hover:bg-red-600 rounded-lg text-white transition-all">
                            <Trash2 className="w-4 h-4" />
                          </button>
                        </div>
                      </div>
                    ) : (
                      <div
                        onClick={() => fileInputRef.current?.click()}
                        className="aspect-video rounded-xl border-2 border-dashed border-[var(--border-subtle)] hover:border-red-600/40 flex flex-col items-center justify-center gap-2 cursor-pointer transition-all hover:bg-[var(--bg-input)] text-[var(--text-dimmed)] px-4 text-center"
                      >
                        <Camera className="w-6 h-6" />
                        <span className="text-[9px] font-black uppercase tracking-widest">Cliquer pour uploader</span>
                        {formData.image_prompt && (
                          <span className="text-[8px] font-medium text-indigo-400 mt-1 leading-tight">
                            💡 IA suggère : {formData.image_prompt.slice(0, 80)}...
                          </span>
                        )}
                      </div>
                    )}
                    <input
                      ref={fileInputRef}
                      type="file"
                      hidden
                      accept="image/*"
                      onChange={e => handleImageUpload(e.target.files[0])}
                    />
                    {/* AI Visual Prompt UI (TNERI Parity) */}
                    <div className="mt-3">
                      {!showPromptEditor ? (
                        <button
                          onClick={handleOpenPromptEditor}
                          disabled={loadingPrompt}
                          className="w-full py-2.5 rounded-xl border border-indigo-500/30 bg-indigo-500/5 hover:bg-indigo-500/10 text-indigo-400 text-[9px] font-black uppercase tracking-widest flex items-center justify-center gap-2 transition-all"
                        >
                          {loadingPrompt ? <Loader2 className="w-3 h-3 animate-spin" /> : <Sparkles className="w-3 h-3" />}
                          {loadingPrompt ? 'Analyse...' : 'Générer prompt image (IA)'}
                        </button>
                      ) : (
                        <div className="p-3 bg-[var(--bg-input)] rounded-xl border border-indigo-500/30 animate-in slide-in-from-top-2 duration-300">
                          <div className="flex justify-between items-center mb-2">
                            <span className="text-[8px] font-black uppercase tracking-[0.2em] text-indigo-400">Prompt Visuel IA</span>
                            <button onClick={() => setShowPromptEditor(false)} className="text-[var(--text-dimmed)]"><X className="w-3 h-3" /></button>
                          </div>
                          <textarea
                            value={visualPrompt}
                            onChange={(e) => setVisualPrompt(e.target.value)}
                            className="w-full bg-[var(--bg-primary)] border border-[var(--border-subtle)] rounded-lg p-2 text-[10px] font-mono text-[var(--text-dimmed)] min-h-[100px] outline-none"
                            spellCheck="false"
                          />
                          <div className="flex gap-2 mt-2">
                            <button
                              onClick={() => {
                                navigator.clipboard.writeText(visualPrompt);
                                setCopied(true);
                                setTimeout(() => setCopied(false), 2000);
                              }}
                              className={`flex-1 py-1.5 rounded-lg text-[9px] font-black uppercase tracking-widest transition-all flex items-center justify-center gap-2 ${copied ? 'bg-emerald-500 text-white' : 'bg-indigo-600 text-white shadow-lg shadow-indigo-600/20'}`}
                            >
                              {copied ? <CheckCircle className="w-3 h-3" /> : <Save className="w-3 h-3" />}
                              {copied ? 'Copié !' : 'Copier'}
                            </button>
                            <button onClick={handleOpenPromptEditor} className="p-1.5 rounded-lg border border-[var(--border-subtle)] text-[var(--text-dimmed)] hover:text-indigo-400 transition-all"><RefreshCw className={`w-3 h-3 ${loadingPrompt ? 'animate-spin' : ''}`} /></button>
                          </div>
                        </div>
                      )}
                    </div>
                  </div>
                </div>

              </div>
            </div>
          )}

          {/* PREVIEW PANE */}
          {activeTab === 'split' && (
            <div className="w-1/2 overflow-y-auto">
              <PreviewContent />
            </div>
          )}

          {activeTab === 'preview' && (
            <div className="w-full overflow-y-auto relative">
              <div className="sticky top-0 z-10 bg-amber-500/10 border-b border-amber-500/30 px-5 py-2 flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <Eye className="w-3.5 h-3.5 text-amber-400" />
                  <span className="text-[10px] font-black uppercase tracking-widest text-amber-400">Aperçu Plein Écran — Rendu fidèle au site</span>
                </div>
                <button
                  onClick={() => setActiveTab('split')}
                  className="flex items-center gap-1.5 text-[9px] font-black uppercase tracking-widest text-amber-400 hover:text-amber-300 transition-all"
                >
                  <Maximize2 className="w-3 h-3" /> Quitter
                </button>
              </div>
              <PreviewContent />
            </div>
          )}

          {/* SEO TAB */}
          {activeTab === 'seo' && (
            <div className="w-full overflow-y-auto p-8">
              <div className="max-w-2xl mx-auto space-y-6">
                <div className="glass-card border-[var(--border-subtle)] bg-[var(--bg-secondary)]">
                  <div className="flex items-center gap-3 mb-6 font-black uppercase tracking-widest text-[10px] border-b border-[var(--border-subtle)] pb-4">
                    <Search className="w-4 h-4" /> Optimisation Moteurs de Recherche
                  </div>

                  {/* Google Preview */}
                  <div className="bg-white rounded-xl p-5 mb-6 border border-slate-200">
                    <div className="text-[11px] text-slate-500 mb-1">esendnuisibles.fr › journal-expert</div>
                    <div className="text-blue-700 font-bold text-base mb-1 line-clamp-1">
                      {formData.meta_title || formData.title || 'Meta Title manquant'}
                    </div>
                    <div className="text-slate-600 text-[12px] leading-relaxed line-clamp-2">
                      {formData.meta_description || formData.excerpt || 'Meta description manquante...'}
                    </div>
                  </div>

                  <div className="space-y-5">
                    <div>
                      <div className="flex justify-between mb-2">
                        <label className="block text-[10px] font-black uppercase text-[var(--text-dimmed)] tracking-widest">Meta Title — max 60 car.</label>
                        <span className={`text-[9px] font-black ${(formData.meta_title || '').length > 60 ? 'text-red-500' : 'text-emerald-500'}`}>
                          {(formData.meta_title || '').length}/60
                        </span>
                      </div>
                      <input
                        type="text"
                        value={formData.meta_title}
                        onChange={e => update('meta_title', e.target.value)}
                        className="w-full bg-[var(--bg-input)] border border-[var(--border-subtle)] rounded-xl px-4 py-3 text-sm focus:border-red-600/50 outline-none transition-all"
                        placeholder="Titre SEO — incluez Menton, Monaco ou Côte d'Azur"
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
                        placeholder="Description optimisée — incluez Menton/Monaco..."
                      />
                    </div>

                    <div className="bg-[var(--bg-input)] p-4 rounded-2xl border border-[var(--border-subtle)] flex gap-3 items-start">
                      <Info className="w-4 h-4 text-[var(--text-dimmed)] shrink-0 mt-0.5" />
                      <p className="text-[11px] text-[var(--text-dimmed)] leading-relaxed font-medium">
                        <strong>Conseil Riviera :</strong> Incluez "Menton", "Monaco" ou "Côte d'Azur" dans vos méta-données pour favoriser le référencement local. Le bouton <strong>IA Magie</strong> pré-remplit ces champs automatiquement.
                      </p>
                    </div>

                    {/* Slug édition depuis SEO */}
                    <div>
                      <label className="block text-[10px] font-black uppercase text-[var(--text-dimmed)] mb-2 tracking-widest">URL Canonique (Slug)</label>
                      <div className="flex items-center gap-2 bg-[var(--bg-input)] border border-[var(--border-subtle)] rounded-xl px-4 py-3">
                        <span className="text-[10px] text-[var(--text-dimmed)] shrink-0">esendnuisibles.fr/journal/</span>
                        <input
                          type="text"
                          value={formData.slug}
                          onChange={e => update('slug', e.target.value)}
                          className="flex-1 bg-transparent outline-none text-xs font-mono text-[var(--text-main)]"
                        />
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          )}
        </div>

        {/* ─── Footer Actions ─── */}
        <div className="px-6 py-4 border-t border-[var(--border-subtle)] flex justify-between items-center gap-4 bg-[var(--bg-secondary)] shrink-0">
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

          <div className="flex items-center gap-3">
            <button
              onClick={onClose}
              className="px-5 py-3 rounded-xl border border-[var(--border-subtle)] text-[10px] font-black uppercase tracking-widest text-[var(--text-dimmed)] hover:text-[var(--text-main)] hover:bg-[var(--bg-input)] transition-all"
            >
              Fermer
            </button>
            <button
              onClick={() => handleSave(0)}
              disabled={isSaving}
              className="flex items-center gap-2 px-5 py-3 rounded-xl border border-amber-500/40 text-amber-400 bg-amber-500/10 hover:bg-amber-500/20 text-[10px] font-black uppercase tracking-widest transition-all disabled:opacity-50"
            >
              {isSaving ? <Loader2 className="w-3.5 h-3.5 animate-spin" /> : <EyeOff className="w-3.5 h-3.5" />}
              Brouillon
            </button>
            <button
              onClick={() => handleSave(1)}
              disabled={isSaving}
              className="flex items-center gap-3 bg-gradient-to-r from-emerald-600 to-teal-600 text-white px-8 py-3 rounded-xl font-black uppercase tracking-widest text-[10px] hover:scale-105 transition-all shadow-xl shadow-emerald-600/20 active:scale-95 disabled:opacity-50"
            >
              {isSaving ? <Loader2 className="w-4 h-4 animate-spin" /> : <Globe className="w-4 h-4" />}
              Publier
            </button>
          </div>
        </div>
      </div>

      {/* Toast */}
      <Toast show={showToast} message={toastMsg} />
    </div>
  );
};

export default ArticleModal;
