// src/components/Admin/ProjectModal.jsx
import React, { useState } from 'react';
import { X, Save, Image as ImageIcon, MapPin, Tag, Calendar, CheckCircle2 } from 'lucide-react';
import { api } from '../../lib/api';

const ProjectModal = ({ project, onClose, onSave }) => {
  const [formData, setFormData] = useState(project || {
    title: '',
    location: 'Menton',
    category: 'nuisibles',
    tag: 'Rats',
    img: 'https://images.unsplash.com/photo-1590650516195-0f306ae04313?q=80&w=2070',
    description: '',
    method: '',
    result: 'Succès',
    date: new Date().toLocaleDateString('fr-FR', { month: 'long', year: 'numeric' })
  });

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (project?.id) {
      const res = await api.updateProject(project.id, formData);
      if (res.success) onSave(res.project);
    } else {
      const res = await api.createProject(formData);
      if (res.success) onSave(res.project);
    }
  };

  return (
    <div className="fixed inset-0 z-[100] flex items-center justify-center p-6 bg-[var(--bg-overlay)] backdrop-blur-xl animate-in fade-in duration-300">
      <div className="glass-card w-full max-w-4xl max-h-[90vh] overflow-hidden flex flex-col p-0 border-[var(--border-subtle)] shadow-2xl">
        {/* Header */}
        <div className="p-8 border-b border-[var(--border-subtle)] flex justify-between items-center bg-[var(--bg-secondary)]">
          <div>
            <h3 className="text-2xl font-black uppercase tracking-tighter">
              {project ? 'Éditer' : 'Nouvelle'} <span className="text-red-600 italic">Réalisation</span>
            </h3>
            <p className="text-[var(--text-dimmed)] text-[10px] font-bold uppercase tracking-widest mt-1">Archive de terrain ESEND</p>
          </div>
          <button onClick={onClose} className="p-2 hover:bg-black/5 rounded-full text-[var(--text-dimmed)] hover:text-red-600 transition-all">
            <X className="w-6 h-6" />
          </button>
        </div>

        {/* Content */}
        <form onSubmit={handleSubmit} className="flex-grow overflow-y-auto p-8 bg-[var(--bg-primary)]">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-10">
            {/* Left: General Info */}
            <div className="space-y-6">
              <div>
                <label className="block text-[10px] font-black uppercase text-[var(--text-dimmed)] mb-2 tracking-widest">Titre de l'intervention</label>
                <input 
                  type="text" 
                  value={formData.title}
                  onChange={(e) => setFormData({...formData, title: e.target.value})}
                  className="w-full bg-[var(--bg-input)] border border-[var(--border-subtle)] rounded-xl px-4 py-3 text-sm focus:border-red-600/50 outline-none transition-all placeholder:text-[var(--text-dimmed)]"
                  placeholder="Ex: Éradication Rongeurs - Villa Menton"
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
                      onChange={(e) => setFormData({...formData, location: e.target.value})}
                      className="w-full bg-[var(--bg-input)] border border-[var(--border-subtle)] rounded-xl pl-9 pr-4 py-3 text-sm focus:border-red-600/50 outline-none transition-all placeholder:text-[var(--text-dimmed)]"
                      placeholder="Menton, Monaco..."
                    />
                  </div>
                </div>
                <div>
                  <label className="block text-[10px] font-black uppercase text-[var(--text-dimmed)] mb-2 tracking-widest">Catégorie</label>
                  <select 
                    value={formData.category}
                    onChange={(e) => setFormData({...formData, category: e.target.value})}
                    className="w-full bg-[var(--bg-input)] border border-[var(--border-subtle)] rounded-xl px-4 py-3 text-sm focus:border-red-600/50 outline-none transition-all"
                  >
                    <option value="nuisibles">Nuisibles</option>
                    <option value="desinfection">Désinfection</option>
                    <option value="nettoyage">Nettoyage & Vitres</option>
                  </select>
                </div>
              </div>

              <div>
                <label className="block text-[10px] font-black uppercase text-[var(--text-dimmed)] mb-2 tracking-widest">Description détaillée</label>
                <textarea 
                  value={formData.description}
                  onChange={(e) => setFormData({...formData, description: e.target.value})}
                  rows={4}
                  className="w-full bg-[var(--bg-input)] border border-[var(--border-subtle)] rounded-xl px-4 py-3 text-sm focus:border-red-600/50 outline-none transition-all resize-none placeholder:text-[var(--text-dimmed)]"
                  placeholder="Détails de l'infestation ou du besoin client..."
                />
              </div>
            </div>

            {/* Right: Technical Info & Image */}
            <div className="space-y-6">
              <div>
                <label className="block text-[10px] font-black uppercase text-[var(--text-dimmed)] mb-2 tracking-widest">Méthode employée</label>
                <input 
                  type="text" 
                  value={formData.method}
                  onChange={(e) => setFormData({...formData, method: e.target.value})}
                  className="w-full bg-[var(--bg-input)] border border-[var(--border-subtle)] rounded-xl px-4 py-3 text-sm focus:border-red-600/50 outline-none transition-all placeholder:text-[var(--text-dimmed)]"
                  placeholder="Ex: Traitement Thermique & Vapeur"
                />
              </div>

              <div>
                <label className="block text-[10px] font-black uppercase text-[var(--text-dimmed)] mb-2 tracking-widest">Résultat / Validation</label>
                <input 
                  type="text" 
                  value={formData.result}
                  onChange={(e) => setFormData({...formData, result: e.target.value})}
                  className="w-full bg-[var(--bg-input)] border border-[var(--border-subtle)] rounded-xl px-4 py-3 text-sm focus:border-red-600/50 outline-none transition-all"
                />
              </div>

              <div>
                <label className="block text-[10px] font-black uppercase text-[var(--text-dimmed)] mb-2 tracking-widest">Image (URL)</label>
                <div className="relative">
                   <ImageIcon className="absolute left-3 top-1/2 -translate-y-1/2 w-3.5 h-3.5 text-[var(--text-dimmed)]" />
                   <input 
                     type="text" 
                     value={formData.img}
                     onChange={(e) => setFormData({...formData, img: e.target.value})}
                     className="w-full bg-[var(--bg-input)] border border-[var(--border-subtle)] rounded-xl pl-9 pr-4 py-3 text-sm focus:border-red-600/50 outline-none transition-all"
                   />
                </div>
              </div>

              <div className="aspect-video bg-[var(--bg-secondary)] rounded-2xl overflow-hidden border border-[var(--border-subtle)] relative group">
                 <img src={formData.img} className="w-full h-full object-cover grayscale opacity-50 group-hover:opacity-100 group-hover:grayscale-0 transition-all duration-500" />
                 <div className="absolute inset-0 flex items-center justify-center p-4">
                    <p className="text-[10px] font-black uppercase tracking-widest text-white ring-1 ring-white/20 px-3 py-1 rounded bg-black/40">Aperçu Réalisation</p>
                 </div>
              </div>
            </div>
          </div>
        </form>

        {/* Footer Actions */}
        <div className="p-8 border-t border-[var(--border-subtle)] flex justify-end gap-4 bg-[var(--bg-secondary)]">
          <button 
            type="button"
            onClick={onClose}
            className="px-6 py-4 rounded-xl border border-[var(--border-subtle)] text-[10px] font-black uppercase tracking-widest text-[var(--text-dimmed)] hover:text-red-600 hover:bg-black/5 transition-all"
          >
            Annuler
          </button>
          <button 
            onClick={handleSubmit}
            className="flex items-center gap-3 bg-red-600 text-white px-8 py-4 rounded-xl font-black uppercase tracking-widest text-[10px] hover:bg-red-700 transition-all shadow-xl shadow-red-600/10"
          >
            <Save className="w-4 h-4" /> Enregistrer le Dossier
          </button>
        </div>
      </div>
    </div>
  );
};

export default ProjectModal;
