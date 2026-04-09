// src/components/Admin/ProjectModal.jsx
/**
 * @file ProjectModal.jsx — Éditeur de Réalisation v3 (Génération Magazine)
 * @description Éditeur premium avec WYSIWYG, Galerie d'images, SEO Studio et Assistant IA.
 * @specialist frontend-dev-guidelines
 */
import React, { useState, useMemo, useRef, useEffect } from 'react';
import ReactQuill from 'react-quill';
import 'react-quill/dist/quill.snow.css';
import { 
  X, Save, Image as ImageIcon, MapPin, Loader2, Trash2, Globe, 
  EyeOff, Eye, Calendar, Clock, CheckCircle2, Tag, FileText, Layout, 
  Search, Columns, Sparkles, Wand2, Plus, Minus, Info, Maximize2,
  ChevronDown, ExternalLink, Camera, Edit3
} from 'lucide-react';
import imageCompression from 'browser-image-compression';
import { api } from '../../lib/api';
import { AIService } from '../../lib/AIService';

const PROJECT_CATEGORIES = [
  { id: 'nuisibles', label: 'Nuisibles', emoji: '🐀' },
  { id: 'desinfection', label: 'Désinfection', emoji: '🧪' },
  { id: 'nettoyage', label: 'Nettoyage & Vitres', emoji: '🪟' },
];

const NUISIBLE_TAGS = [
  'Rats & Souris', 'Cafards & Blattes', 'Punaises de Lit',
  'Frelons & Guêpes', 'Fourmis', 'Rongeurs', 'Autre Nuisible'
];

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

const ProjectModal = ({ project, onClose, onSave, onDelete }) => {
  const isNew = !project?.id;
  
  // --- States ---
  const [activeTab, setActiveTab] = useState('summary'); // 'summary', 'editor', 'seo'
  const [viewMode, setViewMode] = useState('split'); // 'editor', 'split', 'preview'
  const [isSaving, setIsSaving] = useState(false);
  const [isDeleting, setIsDeleting] = useState(false);
  const [isFormatting, setIsFormatting] = useState(false);
  const [isUploading, setIsUploading] = useState(false);
  const fileInputRef = useRef(null);
  
  // Gallery strings management
  const [galleryItems, setGalleryItems] = useState(() => {
    if (!project?.gallery) return [''];
    try {
      const parsed = JSON.parse(project.gallery);
      return Array.isArray(parsed) && parsed.length > 0 ? parsed : [''];
    } catch { return ['']; }
  });

  const [formData, setFormData] = useState({
    id: project?.id || null,
    title: project?.title || '',
    location: project?.location || 'Menton',
    category: project?.category || 'nuisibles',
    tag: project?.tag || 'Rats & Souris',
    img: project?.img || 'https://images.unsplash.com/photo-1590650516195-0f306ae04313?q=80&w=2070',
    description: project?.description || '',
    method: project?.method || '',
    result: project?.result || 'Succès',
    is_published: project ? (parseInt(project.is_published, 10) === 1) : true,
    content_html: project?.content_html || '',
    slug: project?.slug || generateSlug(project?.title || ''),
    meta_title: project?.meta_title || '',
    meta_description: project?.meta_description || '',
    service_id: project?.service_id || 1,
    date: project?.date || new Date().toLocaleDateString('fr-FR', { month: 'long', year: 'numeric' })
  });

  const update = (field, val) => {
    setFormData(prev => {
      const updates = { [field]: val };
      // Auto-slug if it matches name or is empty
      if (field === 'title' && (!prev.slug || prev.slug === generateSlug(prev.title))) {
        updates.slug = generateSlug(val);
      }
      return { ...prev, ...updates };
    });
  };

  // --- Handlers ---
  const handleSave = async (publishStatus = null) => {
    setIsSaving(true);
    try {
      const is_published = publishStatus !== null ? publishStatus : (formData.is_published ? 1 : 0);
      const payload = {
        ...formData,
        gallery: JSON.stringify(galleryItems.filter(i => i.trim() !== '')),
        is_published
      };

      let res;
      if (project?.id || formData.id) {
        res = await api.updateProject(formData.id || project.id, payload);
      } else {
        res = await api.createProject(payload);
      }

      if (res?.success) {
        onSave({ ...payload, id: res.id || project?.id });
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
    if (!project?.id) return;
    if (!window.confirm(`Supprimer définitivement "${project.title}" ? Cette action est irréversible.`)) return;
    setIsDeleting(true);
    try {
      await api.deleteProject(project.id);
      onDelete?.(project.id);
      onClose();
    } catch (err) {
      alert('Erreur : ' + err.message);
    } finally {
      setIsDeleting(false);
    }
  };

  const handleMagicFormat = async () => {
    if (!formData.title && !formData.description) {
      alert("Saisissez au moins un titre et une description courte pour aider l'IA.");
      return;
    }
    setIsFormatting(true);
    try {
      const refined = await AIService.draftArticle(`Réalisation ESEND : ${formData.title}. Description : ${formData.description}. Méthode : ${formData.method}. Résultat : ${formData.result}`);
      update('content_html', refined.content_html);
      if (!formData.meta_title) update('meta_title', refined.meta_title);
      if (!formData.meta_description) update('meta_description', refined.meta_description);
    } catch (err) {
      alert("IA indisponible : " + err.message);
    } finally {
      setIsFormatting(false);
    }
  };

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

      const res = await api.uploadImage(finalFile);
      if (res?.success) {
        update('img', res.url);
      } else {
        throw new Error(res?.error || 'Erreur d\'upload');
      }
    } catch (err) {
      alert('Upload indisponible : ' + err.message);
    } finally {
      setIsUploading(false);
    }
  };

  const handleGalleryChange = (index, val) => {
    const newG = [...galleryItems];
    newG[index] = val;
    setGalleryItems(newG);
  };

  const addGalleryField = () => setGalleryItems([...galleryItems, '']);
  const removeGalleryField = (index) => {
    if (galleryItems.length <= 1) {
      setGalleryItems(['']);
    } else {
      setGalleryItems(galleryItems.filter((_, i) => i !== index));
    }
  };

  // --- UI Components ---
  const quillModules = useMemo(() => ({
    toolbar: [
      [{ 'header': [2, 3, false] }],
      ['bold', 'italic', 'underline', 'blockquote'],
      [{ 'list': 'ordered' }, { 'list': 'bullet' }],
      ['link', 'image'],
      ['clean']
    ],
  }), []);

  const PreviewMagazine = () => (
    <div className="bg-white text-slate-900 min-h-full p-8 md:p-12 selection:bg-red-200">
      <article className="max-w-2xl mx-auto">
        <div className="flex items-center gap-2 text-[10px] font-bold text-slate-400 mb-6 uppercase tracking-widest">
          <span>ESEND</span><span>/</span><span>Réalisations</span><span>/</span>
          <span className="text-red-600 font-black">{PROJECT_CATEGORIES.find(c => c.id === formData.category)?.label || 'Intervention'}</span>
        </div>
        
        <h1 className="text-3xl md:text-5xl font-black tracking-tighter leading-tight mb-8">
          {formData.title || 'Titre de la réalisation'}
        </h1>

        {/* Fiche Technique Grid */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 p-6 bg-slate-50 rounded-2xl border border-slate-100 mb-10 text-[10px] font-bold uppercase tracking-widest text-slate-500">
           <div>
              <div className="text-slate-300 mb-1">Localisation</div>
              <div className="text-slate-900 flex items-center gap-1"><MapPin className="w-3 h-3 text-red-600" /> {formData.location}</div>
           </div>
           <div>
              <div className="text-slate-300 mb-1">Période</div>
              <div className="text-slate-900">{formData.date}</div>
           </div>
           <div>
              <div className="text-slate-300 mb-1">Nuisible</div>
              <div className="text-slate-900">{formData.tag}</div>
           </div>
           <div>
              <div className="text-slate-300 mb-1">Résultat</div>
              <div className="text-emerald-600 italic">Terminé ✓</div>
           </div>
        </div>

        {formData.img && (
          <div className="aspect-video rounded-3xl overflow-hidden mb-12 shadow-2xl shadow-slate-200">
            <img src={formData.img} alt={formData.title} className="w-full h-full object-cover" />
          </div>
        )}

        {/* Technical Summary */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-12 py-8 border-y border-slate-100">
          <div>
            <h4 className="text-[10px] font-black uppercase tracking-widest text-red-600 mb-3">Méthode employée</h4>
            <p className="text-sm text-slate-600 font-medium leading-relaxed italic border-l-2 border-red-600 pl-4">
              {formData.method || 'Non spécifié'}
            </p>
          </div>
          <div>
            <h4 className="text-[10px] font-black uppercase tracking-widest text-red-600 mb-3">Bilan d'intervention</h4>
            <p className="text-sm text-slate-600 font-medium leading-relaxed italic border-l-2 border-red-600 pl-4">
              {formData.result || 'Opération réussie'}
            </p>
          </div>
        </div>

        {/* Rich Content Story */}
        <div 
          className="article-preview-content max-w-none"
          dangerouslySetInnerHTML={{ __html: formData.content_html || `<p className="text-slate-400 italic">Racontez ici l'histoire de cette intervention...</p>` }} 
        />

        {/* Gallery Preview */}
        {galleryItems.filter(i => i.trim() !== '').length > 0 && (
          <div className="mt-16 grid grid-cols-2 gap-4">
              {galleryItems.filter(i => i.trim() !== '').map((url, i) => (
                <div key={i} className="aspect-square rounded-2xl overflow-hidden border border-slate-100">
                  <img src={url} className="w-full h-full object-cover" alt={`Gallery ${i}`} />
                </div>
              ))}
          </div>
        )}

        <div className="mt-20 pt-8 border-t border-slate-100 flex items-center justify-between text-[10px] font-bold text-slate-400 uppercase tracking-widest">
          <span>ESEND · Excellence Nuisibles Riviera</span>
          <span>PROJET ID #{formData.id || 'NEW'}</span>
        </div>
      </article>
    </div>
  );

  return (
    <div className="fixed inset-0 z-[100] flex items-center justify-center bg-[var(--bg-overlay)] backdrop-blur-3xl animate-in fade-in duration-300 p-2 md:p-4">
      <div className="glass-card w-full max-w-7xl h-[98vh] overflow-hidden flex flex-col p-0 border-[var(--border-subtle)] shadow-3xl bg-[var(--bg-primary)]">
        
        {/* --- Header --- */}
        <div className="px-6 py-4 border-b border-[var(--border-subtle)] flex flex-col md:flex-row justify-between items-start md:items-center gap-4 bg-[var(--bg-secondary)] shrink-0">
          <div className="flex items-center gap-5 min-w-0">
            <div>
              <h3 className="text-base font-black uppercase tracking-tighter flex items-center gap-2">
                <span className="text-red-600 italic">Réalisation</span>
                <span className="opacity-20">/</span>
                <span className="truncate max-w-[200px]">{formData.title || 'Nouvelle intervention'}</span>
              </h3>
              <div className="flex items-center gap-4 mt-1">
                 {project?.created_at && (
                    <span className="text-[9px] font-bold text-[var(--text-dimmed)] uppercase tracking-widest flex items-center gap-1">
                      <Calendar className="w-2.5 h-2.5" /> {formatDate(project.created_at)}
                    </span>
                 )}
                 <div className={`text-[8px] font-black uppercase tracking-widest px-2 py-0.5 rounded-full border ${formData.is_published ? 'bg-emerald-500/10 text-emerald-400 border-emerald-500/30' : 'bg-amber-500/10 text-amber-400 border-amber-500/30'}`}>
                    {formData.is_published ? 'Publié' : 'Brouillon'}
                 </div>
              </div>
            </div>

            {/* TAB NAVIGATION */}
            <nav className="flex gap-1 bg-[var(--bg-input)] p-1 rounded-2xl border border-[var(--border-subtle)]">
               {[
                 { id: 'summary', label: 'Résumé Tech', icon: FileText },
                 { id: 'editor', label: 'L\'Histoire', icon: Layout },
                 { id: 'seo', label: 'SEO Studio', icon: Search }
               ].map(t => (
                 <button
                    key={t.id}
                    onClick={() => setActiveTab(t.id)}
                    className={`flex items-center gap-2 px-4 py-2 rounded-xl text-[9px] font-black uppercase tracking-widest transition-all ${activeTab === t.id ? 'bg-[var(--text-main)] text-[var(--bg-primary)]' : 'text-[var(--text-dimmed)] hover:text-[var(--text-main)]'}`}
                 >
                   <t.icon className="w-3.5 h-3.5" /> {t.label}
                 </button>
               ))}
            </nav>
          </div>

          <div className="flex items-center gap-3">
             {activeTab === 'editor' && (
                <div className="flex bg-[var(--bg-input)] p-1 rounded-xl border border-[var(--border-subtle)] mr-2">
                   {[
                     { id: 'editor', icon: FileText },
                     { id: 'split', icon: Columns },
                     { id: 'preview', icon: Eye }
                   ].map(v => (
                     <button
                        key={v.id}
                        onClick={() => setViewMode(v.id)}
                        className={`p-2 rounded-lg transition-all ${viewMode === v.id ? 'bg-[var(--text-dimmed)] text-[var(--bg-primary)]' : 'text-[var(--text-dimmed)]'}`}
                     >
                       <v.icon className="w-3.5 h-3.5" />
                     </button>
                   ))}
                </div>
             )}
             <button onClick={onClose} className="p-2.5 hover:bg-[var(--bg-input)] rounded-full text-[var(--text-dimmed)] hover:text-red-600 transition-all border border-transparent hover:border-[var(--border-subtle)]">
                <X className="w-6 h-6" />
             </button>
          </div>
        </div>

        {/* --- Content Area --- */}
        <div className="flex-grow overflow-hidden flex">
          
          {/* TAB 1: SUMMARY / TECH */}
          {activeTab === 'summary' && (
            <div className="w-full flex overflow-y-auto">
              <div className="max-w-4xl mx-auto w-full p-8 grid grid-cols-1 md:grid-cols-2 gap-10">
                 {/* Left Col */}
                 <div className="space-y-8">
                    <section>
                       <label className="block text-[10px] font-black uppercase text-[var(--text-dimmed)] mb-3 tracking-[0.2em]">Informations Générales</label>
                       <div className="space-y-4">
                          <input
                            type="text"
                            value={formData.title}
                            onChange={e => update('title', e.target.value)}
                            className="admin-input-premium text-lg"
                            placeholder="Titre de l'intervention..."
                          />
                          <div className="grid grid-cols-2 gap-4">
                             <div className="relative group">
                                <MapPin className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-red-600 group-focus-within:animate-bounce" />
                                <input type="text" value={formData.location} onChange={e => update('location', e.target.value)} className="admin-input-premium pl-12" placeholder="Ex: Monaco" />
                             </div>
                             <div className="relative group">
                                <Calendar className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-[var(--text-dimmed)]" />
                                <input type="text" value={formData.date} onChange={e => update('date', e.target.value)} className="admin-input-premium pl-12" placeholder="Ex: Avril 2026" />
                             </div>
                          </div>
                       </div>
                    </section>

                    <section>
                       <label className="block text-[10px] font-black uppercase text-[var(--text-dimmed)] mb-3 tracking-[0.2em]">Fiche Technique</label>
                       <div className="space-y-4">
                          <textarea
                            value={formData.method}
                            onChange={e => update('method', e.target.value)}
                            className="admin-input-premium min-h-[100px] text-sm"
                            placeholder="Méthode employée (ex: Traitement par le froid...)"
                          />
                          <input
                            type="text"
                            value={formData.result}
                            onChange={e => update('result', e.target.value)}
                            className="admin-input-premium border-emerald-500/20 text-emerald-500"
                            placeholder="Résultat final..."
                          />
                       </div>
                    </section>

                    <section className="grid grid-cols-2 gap-4">
                       <div>
                          <label className="block text-[10px] font-black uppercase text-[var(--text-dimmed)] mb-3 tracking-[0.2em]">Catégorie Pôle</label>
                          <select value={formData.category} onChange={e => update('category', e.target.value)} className="admin-input-premium">
                             {PROJECT_CATEGORIES.map(c => <option key={c.id} value={c.id}>{c.emoji} {c.label}</option>)}
                          </select>
                       </div>
                       <div>
                          <label className="block text-[10px] font-black uppercase text-[var(--text-dimmed)] mb-3 tracking-[0.2em]">Nuisible / Tag</label>
                          <select value={formData.tag} onChange={e => update('tag', e.target.value)} className="admin-input-premium">
                             {NUISIBLE_TAGS.map(t => <option key={t} value={t}>{t}</option>)}
                          </select>
                       </div>
                    </section>
                 </div>

                 {/* Right Col */}
                 <div className="space-y-8">
                    <section>
                       <label className="block text-[10px] font-black uppercase text-[var(--text-dimmed)] mb-3 tracking-[0.2em]">Image de Couverture</label>
                       <div 
                         onClick={() => fileInputRef.current?.click()}
                         className="relative group aspect-video rounded-3xl overflow-hidden border border-[var(--border-subtle)] bg-[var(--bg-secondary)] shadow-inner cursor-pointer"
                       >
                         {isUploading ? (
                           <div className="h-full flex flex-col items-center justify-center gap-4 text-red-600">
                              <Loader2 className="w-10 h-10 animate-spin" />
                              <span className="text-[10px] font-black uppercase tracking-widest text-red-600">Téléversement...</span>
                           </div>
                         ) : formData.img ? (
                           <>
                             <img src={formData.img} alt="Cover" className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110" />
                             <div className="absolute inset-0 bg-black/60 opacity-0 group-hover:opacity-100 transition-all duration-300 flex items-center justify-center gap-3">
                                <div className="p-3 bg-white/20 backdrop-blur-md rounded-2xl text-white shadow-xl flex items-center gap-2 hover:bg-white/30 transition-all">
                                   <Edit3 className="w-5 h-5" />
                                   <span className="text-[10px] font-black uppercase tracking-widest text-white">Changer la couverture</span>
                                </div>
                                <button onClick={(e) => { e.stopPropagation(); update('img', ''); }} className="p-3 bg-red-600 rounded-2xl text-white shadow-xl hover:rotate-6 transition-all">
                                   <Trash2 className="w-5 h-5" />
                                </button>
                             </div>
                           </>
                         ) : (
                           <div className="h-full flex flex-col items-center justify-center gap-4 text-[var(--text-dimmed)]">
                              <Camera className="w-10 h-10 opacity-20" />
                              <span className="text-[10px] font-bold uppercase tracking-[0.3em] opacity-40">Cliquer pour uploader</span>
                           </div>
                         )}
                       </div>
                       <input
                         ref={fileInputRef}
                         type="file"
                         hidden
                         accept="image/*"
                         onChange={e => handleImageUpload(e.target.files[0])}
                       />
                    </section>
                    
                    <section className="bg-[var(--bg-input)] p-6 rounded-3xl border border-[var(--border-subtle)] space-y-4">
                       <div className="flex items-center gap-3 font-black text-[10px] uppercase tracking-widest text-emerald-500">
                          <Globe className="w-4 h-4" /> Statut Visibilité
                       </div>
                       <div className="flex gap-2">
                          <button onClick={() => update('is_published', false)} className={`flex-1 py-3 rounded-xl text-[9px] font-black uppercase tracking-widest transition-all border ${!formData.is_published ? 'bg-amber-500 text-black border-amber-500' : 'bg-transparent border-[var(--border-subtle)] text-[var(--text-dimmed)]'}`}>Masquée</button>
                          <button onClick={() => update('is_published', true)} className={`flex-1 py-3 rounded-xl text-[9px] font-black uppercase tracking-widest transition-all border ${formData.is_published ? 'bg-emerald-600 text-white border-emerald-600 shadow-lg shadow-emerald-500/20' : 'bg-transparent border-[var(--border-subtle)] text-[var(--text-dimmed)]'}`}>Publiée Live</button>
                       </div>
                    </section>
                 </div>
              </div>
            </div>
          )}

          {/* TAB 2: EDITOR / STORY */}
          {activeTab === 'editor' && (
            <div className={`w-full h-full flex overflow-hidden`}>
              {/* Left Column: Editor */}
              {(viewMode === 'editor' || viewMode === 'split') && (
                <div className={`${viewMode === 'split' ? 'w-1/2' : 'w-full'} flex flex-col h-full bg-[var(--bg-secondary)] border-r border-[var(--border-subtle)] overflow-y-auto`}>
                   <div className="p-8 space-y-10">
                      
                      {/* AI Formatting */}
                      <div className="flex items-center justify-between">
                         <div>
                            <h4 className="text-[11px] font-black uppercase tracking-widest text-[var(--text-main)]">Récit de l'intervention</h4>
                            <p className="text-[9px] text-[var(--text-dimmed)] mt-1 uppercase font-bold tracking-widest">Détails, témoignages, anecdotes...</p>
                         </div>
                         <button 
                           onClick={handleMagicFormat} 
                           disabled={isFormatting}
                           className="flex items-center gap-2 bg-gradient-to-r from-red-600 to-indigo-600 text-white px-5 py-3 rounded-2xl font-black uppercase tracking-widest text-[9px] hover:scale-105 active:scale-95 transition-all disabled:opacity-50 shadow-xl shadow-red-600/20"
                         >
                            {isFormatting ? <Loader2 className="w-4 h-4 animate-spin" /> : <Wand2 className="w-4 h-4" />}
                            IA Magic Format ✨
                         </button>
                      </div>

                      <div className="rounded-3xl border border-[var(--border-subtle)] bg-white overflow-hidden shadow-2xl">
                         <ReactQuill
                           theme="snow"
                           value={formData.content_html}
                           onChange={v => update('content_html', v)}
                           modules={quillModules}
                           style={{ minHeight: '400px', color: '#1e293b', background: 'white' }}
                         />
                      </div>

                      {/* --- Gallery Manager --- */}
                      <section className="pt-8 border-t border-[var(--border-subtle)]">
                         <div className="flex items-center justify-between mb-6">
                            <h4 className="text-[11px] font-black uppercase tracking-widest flex items-center gap-3">
                               <ImageIcon className="w-4 h-4 text-red-600" /> Galerie Photos du Chantier
                            </h4>
                            <span className="text-[9px] font-bold text-[var(--text-dimmed)] uppercase tracking-widest">{galleryItems.filter(v => v !== '').length} Photos</span>
                         </div>
                         <div className="space-y-3">
                            {galleryItems.map((url, index) => (
                              <div key={index} className="flex gap-2">
                                 <input
                                   type="text"
                                   value={url}
                                   onChange={e => handleGalleryChange(index, e.target.value)}
                                   className="admin-input-premium text-[10px] h-11"
                                   placeholder="URL image..."
                                 />
                                 <button onClick={() => removeGalleryField(index)} className="p-3 bg-red-600/10 text-red-500 rounded-xl border border-red-600/20 hover:bg-red-600 hover:text-white transition-all"><Minus className="w-4 h-4" /></button>
                              </div>
                            ))}
                            <button 
                              onClick={addGalleryField}
                              className="w-full py-4 rounded-2xl border-2 border-dashed border-[var(--border-subtle)] hover:border-red-600/40 text-[9px] font-black uppercase tracking-widest text-[var(--text-dimmed)] hover:text-red-500 transition-all flex items-center justify-center gap-3"
                            >
                               <Plus className="w-4 h-4" /> Ajouter une photo à la galerie
                            </button>
                         </div>
                      </section>
                   </div>
                </div>
              )}

              {/* Right Column: Preview */}
              {(viewMode === 'preview' || viewMode === 'split') && (
                <div className={`${viewMode === 'split' ? 'w-1/2' : 'w-full'} h-full overflow-y-auto bg-slate-100`}>
                   <PreviewMagazine />
                </div>
              )}
            </div>
          )}

          {/* TAB 3: SEO */}
          {activeTab === 'seo' && (
            <div className="w-full overflow-y-auto p-12 bg-[var(--bg-secondary)]">
              <div className="max-w-2xl mx-auto space-y-10">
                 <h4 className="text-[12px] font-black uppercase tracking-[0.3em] flex items-center gap-4">
                    <Search className="w-5 h-5 text-red-600" /> Studio SEO Experts
                    <span className="h-px flex-1 bg-[var(--border-subtle)]"></span>
                 </h4>

                 {/* Google Preview */}
                 <div className="bg-white rounded-3xl p-8 border border-slate-200 shadow-2xl">
                    <div className="text-[11px] text-slate-500 mb-1">esendnuisibles.fr › realisation › {formData.slug}</div>
                    <div className="text-blue-700 font-bold text-xl mb-1 line-clamp-1">
                      {formData.meta_title || formData.title || 'Meta Title manquant'}
                    </div>
                    <div className="text-slate-600 text-sm leading-relaxed line-clamp-2">
                       {formData.meta_description || formData.description || 'Meta description manquante...'}
                    </div>
                 </div>

                 <div className="space-y-6">
                    <div>
                        <div className="flex justify-between mb-2">
                           <label className="text-[10px] font-black uppercase tracking-widest text-[var(--text-dimmed)]">Meta Title (Google)</label>
                           <span className={`text-[9px] font-black ${(formData.meta_title || '').length > 60 ? 'text-red-500' : 'text-emerald-500'}`}>{(formData.meta_title || '').length}/60</span>
                        </div>
                        <input type="text" value={formData.meta_title} onChange={e => update('meta_title', e.target.value)} className="admin-input-premium" placeholder="Titre optimisé pour le référencement..." />
                    </div>

                    <div>
                        <div className="flex justify-between mb-2">
                           <label className="text-[10px] font-black uppercase tracking-widest text-[var(--text-dimmed)]">Meta Description</label>
                           <span className={`text-[9px] font-black ${(formData.meta_description || '').length > 160 ? 'text-red-500' : 'text-emerald-500'}`}>{(formData.meta_description || '').length}/160</span>
                        </div>
                        <textarea value={formData.meta_description} onChange={e => update('meta_description', e.target.value)} className="admin-input-premium min-h-[120px]" placeholder="Résumé accrocheur pour les résultats Google..." />
                    </div>

                    <div>
                        <label className="text-[10px] font-black uppercase tracking-widest text-[var(--text-dimmed)] block mb-2">URL Slug</label>
                        <div className="flex items-center gap-3 admin-input-premium">
                           <span className="text-[var(--text-dimmed)] opacity-40">esend.fr/</span>
                           <input type="text" value={formData.slug} onChange={e => update('slug', e.target.value)} className="bg-transparent border-none outline-none font-mono text-xs flex-1" />
                           <ExternalLink className="w-3.5 h-3.5 opacity-20" />
                        </div>
                    </div>
                 </div>

                 <div className="p-6 bg-red-600/5 rounded-3xl border border-red-600/10 flex gap-4 items-start">
                    <Info className="w-5 h-5 text-red-600 mt-0.5" />
                    <p className="text-[10px] text-[var(--text-dimmed)] leading-relaxed font-bold uppercase tracking-widest opacity-80">
                      <strong>SEO Riviera :</strong> Pensez à inclure le nom de la ville (Menton, Monaco, Nice) dans votre Meta Title pour favoriser le référencement local. L'assistant IA sait le faire automatiquement.
                    </p>
                 </div>
              </div>
            </div>
          )}
        </div>

        {/* --- Footer --- */}
        <div className="px-8 py-5 border-t border-[var(--border-subtle)] flex justify-between items-center bg-[var(--bg-secondary)] shrink-0">
           <div>
              {!isNew && (
                <button 
                  onClick={handleDelete}  
                  disabled={isDeleting}
                  className="flex items-center gap-2 group text-[10px] font-black uppercase tracking-widest text-red-600/50 hover:text-red-600 transition-all"
                >
                  {isDeleting ? <Loader2 className="w-4 h-4 animate-spin" /> : <Trash2 className="w-4 h-4 group-hover:-rotate-12 transition-all" />}
                  Détruire définitivement
                </button>
              )}
           </div>
           
           <div className="flex items-center gap-4">
              <button onClick={onClose} className="px-6 py-3 rounded-2xl text-[10px] font-black uppercase tracking-widest text-[var(--text-dimmed)] hover:text-[var(--text-main)] transition-all">Annuler</button>
              <button 
                onClick={() => handleSave(0)} 
                disabled={isSaving}
                className="flex items-center gap-2 px-6 py-3 rounded-2xl border border-amber-500/40 text-amber-400 bg-amber-500/5 hover:bg-amber-500/10 text-[10px] font-black uppercase tracking-widest transition-all"
              >
                {isSaving ? <Loader2 className="w-4 h-4 animate-spin" /> : <EyeOff className="w-3.5 h-3.5" />}
                Draft
              </button>
              <button 
                onClick={() => handleSave(1)} 
                disabled={isSaving}
                className="flex items-center gap-3 bg-red-600 text-white px-10 py-4 rounded-2xl font-black uppercase tracking-widest text-[11px] hover:bg-red-700 hover:scale-105 active:scale-95 transition-all shadow-2xl shadow-red-600/40"
              >
                {isSaving ? <Loader2 className="w-4 h-4 animate-spin" /> : <Globe className="w-4 h-4" />}
                Mettre à jour & Publier
              </button>
           </div>
        </div>
      </div>

      <style jsx>{`
        .admin-input-premium {
          width: 100%;
          background: var(--bg-input);
          border: 1px solid var(--border-subtle);
          border-radius: 1.25rem;
          padding: 0.875rem 1.25rem;
          font-weight: 600;
          outline: none;
          transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
          color: var(--text-main);
        }
        .admin-input-premium:focus {
          border-color: rgba(220, 38, 38, 0.4);
          background: var(--bg-primary);
          box-shadow: 0 10px 30px -10px rgba(0,0,0,0.1);
        }
        .article-preview-content h2 { font-size: 1.5rem; font-weight: 900; margin-top: 2rem; margin-bottom: 1rem; }
        .article-preview-content p { line-height: 1.7; margin-bottom: 1.25rem; }
      `}</style>
    </div>
  );
};

export default ProjectModal;
