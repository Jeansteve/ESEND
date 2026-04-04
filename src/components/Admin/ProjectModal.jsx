// src/components/Admin/ProjectModal.jsx
/**
 * @file ProjectModal.jsx — Éditeur de Réalisation v2
 * @specialist frontend-dev-guidelines
 * Features: dates créé/modifié, is_published, suppression, catégories enrichies
 */
import React, { useState } from 'react';
import { X, Save, Image as ImageIcon, MapPin, Loader2, Trash2, Globe, EyeOff, Calendar, Clock, CheckCircle2, Tag } from 'lucide-react';
import { api } from '../../lib/api';

const PROJECT_CATEGORIES = [
  { id: 'nuisibles', label: 'Nuisibles', emoji: '🐀' },
  { id: 'desinfection', label: 'Désinfection', emoji: '🧪' },
  { id: 'nettoyage', label: 'Nettoyage & Vitres', emoji: '🪟' },
];

const NUISIBLE_TAGS = [
  'Rats & Souris', 'Cafards & Blattes', 'Punaises de Lit',
  'Frelons & Guêpes', 'Fourmis', 'Rongeurs', 'Autre Nuisible'
];

const formatDate = (str) => {
  if (!str) return null;
  try {
    return new Date(str).toLocaleDateString('fr-FR', { day: '2-digit', month: 'long', year: 'numeric' });
  } catch { return str; }
};

const ProjectModal = ({ project, onClose, onSave, onDelete }) => {
  const isNew = !project?.id;

  const [formData, setFormData] = useState(project || {
    title: '',
    location: 'Menton',
    category: 'nuisibles',
    tag: 'Rats & Souris',
    img: 'https://images.unsplash.com/photo-1590650516195-0f306ae04313?q=80&w=2070',
    description: '',
    method: '',
    result: 'Succès',
    is_published: true,
    date: new Date().toLocaleDateString('fr-FR', { month: 'long', year: 'numeric' })
  });

  const [isSaving, setIsSaving] = useState(false);
  const [isDeleting, setIsDeleting] = useState(false);

  const update = (field, val) => setFormData(prev => ({ ...prev, [field]: val }));

  const handleSubmit = async () => {
    setIsSaving(true);
    try {
      let res;
      if (project?.id) {
        res = await api.updateProject(project.id, formData);
      } else {
        res = await api.createProject(formData);
      }
      if (res?.success) {
        onSave({ ...formData, id: res.id || project?.id });
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

  return (
    <div className="fixed inset-0 z-[100] flex items-center justify-center p-6 bg-[var(--bg-overlay)] backdrop-blur-xl animate-in fade-in duration-300">
      <div className="glass-card w-full max-w-4xl max-h-[92vh] overflow-hidden flex flex-col p-0 border-[var(--border-subtle)] shadow-2xl">

        {/* Header */}
        <div className="p-6 border-b border-[var(--border-subtle)] flex justify-between items-start bg-[var(--bg-secondary)]">
          <div>
            <h3 className="text-xl font-black uppercase tracking-tighter">
              {isNew ? 'Nouvelle' : 'Éditer'} <span className="text-red-600 italic">Réalisation</span>
            </h3>
            {/* Dates */}
            <div className="flex items-center gap-3 mt-1 flex-wrap">
              {project?.created_at && (
                <span className="flex items-center gap-1 text-[9px] font-bold text-[var(--text-dimmed)] uppercase tracking-widest">
                  <Calendar className="w-2.5 h-2.5" /> Créé {formatDate(project.created_at)}
                </span>
              )}
              {project?.updated_at && project.updated_at !== project.created_at && (
                <span className="flex items-center gap-1 text-[9px] font-bold text-amber-500/70 uppercase tracking-widest">
                  <Clock className="w-2.5 h-2.5" /> Modifié {formatDate(project.updated_at)}
                </span>
              )}
            </div>
          </div>
          <button onClick={onClose} className="p-2 hover:bg-[var(--bg-input)] rounded-full text-[var(--text-dimmed)] hover:text-red-600 transition-all">
            <X className="w-6 h-6" />
          </button>
        </div>

        {/* Content */}
        <div className="flex-grow overflow-y-auto p-8 bg-[var(--bg-primary)]">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">

            {/* Left */}
            <div className="space-y-6">
              <div>
                <label className="block text-[10px] font-black uppercase text-[var(--text-dimmed)] mb-2 tracking-widest">Titre de l'intervention *</label>
                <input
                  type="text"
                  value={formData.title}
                  onChange={e => update('title', e.target.value)}
                  className="w-full bg-[var(--bg-input)] border border-[var(--border-subtle)] rounded-xl px-4 py-3 text-sm focus:border-red-600/50 outline-none transition-all placeholder:text-[var(--text-dimmed)]"
                  placeholder="Ex: Éradication Rongeurs — Villa Menton"
                  required
                />
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-[10px] font-black uppercase text-[var(--text-dimmed)] mb-2 tracking-widest">Localisation</label>
                  <div className="relative">
                    <MapPin className="absolute left-3 top-1/2 -translate-y-1/2 w-3.5 h-3.5 text-red-600" />
                    <input
                      type="text"
                      value={formData.location}
                      onChange={e => update('location', e.target.value)}
                      className="w-full bg-[var(--bg-input)] border border-[var(--border-subtle)] rounded-xl pl-9 pr-4 py-3 text-sm focus:border-red-600/50 outline-none transition-all"
                      placeholder="Menton, Monaco..."
                    />
                  </div>
                </div>
                <div>
                  <label className="block text-[10px] font-black uppercase text-[var(--text-dimmed)] mb-2 tracking-widest">Date</label>
                  <input
                    type="text"
                    value={formData.date}
                    onChange={e => update('date', e.target.value)}
                    className="w-full bg-[var(--bg-input)] border border-[var(--border-subtle)] rounded-xl px-4 py-3 text-sm focus:border-red-600/50 outline-none transition-all"
                  />
                </div>
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-[10px] font-black uppercase text-[var(--text-dimmed)] mb-2 tracking-widest">Catégorie</label>
                  <select
                    value={formData.category}
                    onChange={e => update('category', e.target.value)}
                    className="w-full bg-[var(--bg-input)] border border-[var(--border-subtle)] rounded-xl px-4 py-3 text-sm focus:border-red-600/50 outline-none transition-all"
                  >
                    {PROJECT_CATEGORIES.map(c => (
                      <option key={c.id} value={c.id}>{c.emoji} {c.label}</option>
                    ))}
                  </select>
                </div>
                <div>
                  <label className="block text-[10px] font-black uppercase text-[var(--text-dimmed)] mb-2 tracking-widest">Nuisible/Tag</label>
                  <select
                    value={formData.tag}
                    onChange={e => update('tag', e.target.value)}
                    className="w-full bg-[var(--bg-input)] border border-[var(--border-subtle)] rounded-xl px-4 py-3 text-sm focus:border-red-600/50 outline-none transition-all"
                  >
                    {NUISIBLE_TAGS.map(t => <option key={t}>{t}</option>)}
                  </select>
                </div>
              </div>

              <div>
                <label className="block text-[10px] font-black uppercase text-[var(--text-dimmed)] mb-2 tracking-widest">Description détaillée</label>
                <textarea
                  value={formData.description}
                  onChange={e => update('description', e.target.value)}
                  rows={3}
                  className="w-full bg-[var(--bg-input)] border border-[var(--border-subtle)] rounded-xl px-4 py-3 text-sm focus:border-red-600/50 outline-none transition-all resize-none placeholder:text-[var(--text-dimmed)]"
                  placeholder="Détails de l'infestation ou du besoin client..."
                />
              </div>

              <div>
                <label className="block text-[10px] font-black uppercase text-[var(--text-dimmed)] mb-2 tracking-widest">Méthode employée</label>
                <input
                  type="text"
                  value={formData.method}
                  onChange={e => update('method', e.target.value)}
                  className="w-full bg-[var(--bg-input)] border border-[var(--border-subtle)] rounded-xl px-4 py-3 text-sm focus:border-red-600/50 outline-none transition-all placeholder:text-[var(--text-dimmed)]"
                  placeholder="Ex: Traitement Thermique & Vapeur"
                />
              </div>

              <div>
                <label className="block text-[10px] font-black uppercase text-[var(--text-dimmed)] mb-2 tracking-widest">Résultat / Validation</label>
                <div className="relative">
                  <CheckCircle2 className="absolute left-3 top-1/2 -translate-y-1/2 w-3.5 h-3.5 text-emerald-500" />
                  <input
                    type="text"
                    value={formData.result}
                    onChange={e => update('result', e.target.value)}
                    className="w-full bg-[var(--bg-input)] border border-[var(--border-subtle)] rounded-xl pl-9 pr-4 py-3 text-sm focus:border-red-600/50 outline-none transition-all"
                  />
                </div>
              </div>
            </div>

            {/* Right: Image + Statut */}
            <div className="space-y-6">
              <div>
                <label className="block text-[10px] font-black uppercase text-[var(--text-dimmed)] mb-2 tracking-widest">Image (URL)</label>
                <div className="relative">
                  <ImageIcon className="absolute left-3 top-1/2 -translate-y-1/2 w-3.5 h-3.5 text-[var(--text-dimmed)]" />
                  <input
                    type="text"
                    value={formData.img}
                    onChange={e => update('img', e.target.value)}
                    className="w-full bg-[var(--bg-input)] border border-[var(--border-subtle)] rounded-xl pl-9 pr-4 py-3 text-sm focus:border-red-600/50 outline-none transition-all"
                  />
                </div>
              </div>
              <div className="aspect-video bg-[var(--bg-secondary)] rounded-2xl overflow-hidden border border-[var(--border-subtle)] relative group">
                <img src={formData.img} className="w-full h-full object-cover grayscale opacity-50 group-hover:opacity-100 group-hover:grayscale-0 transition-all duration-500" alt="Preview" />
                <div className="absolute inset-0 flex items-center justify-center">
                  <p className="text-[10px] font-black uppercase tracking-widest text-white ring-1 ring-white/20 px-3 py-1.5 rounded-lg bg-black/50">Aperçu Réalisation</p>
                </div>
              </div>

              {/* Publication */}
              <div className="glass-card bg-[var(--bg-secondary)] border-[var(--border-subtle)]">
                <h4 className="text-[10px] font-black uppercase tracking-widest mb-4 border-b border-[var(--border-subtle)] pb-3">Diffusion</h4>
                <div className="flex gap-3">
                  <button
                    type="button"
                    onClick={() => update('is_published', false)}
                    className={`flex-1 flex items-center justify-center gap-2 px-4 py-3 rounded-xl text-[10px] font-black uppercase tracking-widest transition-all border ${
                      !formData.is_published
                        ? 'bg-amber-500/20 text-amber-400 border-amber-500/40'
                        : 'bg-[var(--bg-input)] text-[var(--text-dimmed)] border-[var(--border-subtle)] hover:border-amber-500/30'
                    }`}
                  >
                    <EyeOff className="w-3.5 h-3.5" /> Masquée
                  </button>
                  <button
                    type="button"
                    onClick={() => update('is_published', true)}
                    className={`flex-1 flex items-center justify-center gap-2 px-4 py-3 rounded-xl text-[10px] font-black uppercase tracking-widest transition-all border ${
                      formData.is_published
                        ? 'bg-emerald-500/20 text-emerald-400 border-emerald-500/40'
                        : 'bg-[var(--bg-input)] text-[var(--text-dimmed)] border-[var(--border-subtle)] hover:border-emerald-500/30'
                    }`}
                  >
                    <Globe className="w-3.5 h-3.5" /> Visible
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Footer */}
        <div className="p-6 border-t border-[var(--border-subtle)] flex justify-between items-center bg-[var(--bg-secondary)]">
          <div>
            {!isNew && (
              <button
                onClick={handleDelete}
                disabled={isDeleting}
                className="flex items-center gap-2 px-4 py-3 rounded-xl text-[10px] font-black uppercase tracking-widest text-red-500/60 hover:text-red-500 hover:bg-red-600/10 border border-red-600/10 hover:border-red-600/30 transition-all disabled:opacity-50"
              >
                {isDeleting ? <Loader2 className="w-3.5 h-3.5 animate-spin" /> : <Trash2 className="w-3.5 h-3.5" />}
                Supprimer
              </button>
            )}
          </div>
          <div className="flex gap-3">
            <button
              type="button"
              onClick={onClose}
              className="px-5 py-3 rounded-xl border border-[var(--border-subtle)] text-[10px] font-black uppercase tracking-widest text-[var(--text-dimmed)] hover:text-red-600 hover:bg-[var(--bg-input)] transition-all"
            >
              Annuler
            </button>
            <button
              onClick={handleSubmit}
              disabled={isSaving}
              className="flex items-center gap-3 bg-red-600 text-white px-8 py-3 rounded-xl font-black uppercase tracking-widest text-[10px] hover:bg-red-700 transition-all shadow-xl shadow-red-600/20 disabled:opacity-50"
            >
              {isSaving ? <Loader2 className="w-4 h-4 animate-spin" /> : <Save className="w-4 h-4" />}
              {isNew ? 'Créer la Réalisation' : 'Enregistrer'}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProjectModal;
