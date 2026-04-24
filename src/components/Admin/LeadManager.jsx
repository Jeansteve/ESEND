import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Mail, Phone, Calendar, RefreshCw, Archive, CheckCircle, Trash2, ShieldCheck, Bug, Zap } from 'lucide-react';
import { api } from '../../lib/api';

const LeadManager = () => {
  const [leads, setLeads] = useState([]);
  const [loading, setLoading] = useState(true);
  const [filter, setFilter] = useState('inbox'); // 'inbox', 'archived'
  const [selectedImage, setSelectedImage] = useState(null);

  useEffect(() => {
    loadLeads();
  }, []);

  const loadLeads = async () => {
    setLoading(true);
    try {
      const response = await fetch('/api/leads.php');
      const data = await response.json();
      if (data.success) {
        setLeads(data.data || []);
      }
    } catch (e) {
      console.error('Erreur chargement leads', e);
    }
    setLoading(false);
  };

  const updateStatus = async (id, newStatus) => {
    console.log("[LeadManager] Updating status for ID:", id, "to:", newStatus);
    // Optimistic update : On utilise prevLeads pour garantir qu'on travaille sur le dernier état
    setLeads(prevLeads => prevLeads.map(l => l.id == id ? { ...l, status: newStatus } : l));
    
    try {
      const response = await fetch('/api/leads.php', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ id, status: newStatus })
      });
      const data = await response.json();
      console.log("[LeadManager] Status update result:", data);
    } catch (e) {
      console.error('[LeadManager] Erreur MAJ lead', e);
      loadLeads();
    }
  };

  const handleActionClick = async (lead, type) => {
    console.log("[LeadManager] Action click:", type, "on lead:", lead.tracking_id, "current status:", lead.status);
    // Changement de statut automatique
    if (lead.status === 'nouveau') {
      console.log("[LeadManager] Status is 'nouveau', triggering updateStatus...");
      await updateStatus(lead.id, 'contacté');
    }

    // Déclenchement de l'action native (tel ou mail)
    // On ajoute un léger délai pour s'assurer que le changement d'état React a été initié
    setTimeout(() => {
      if (type === 'phone') {
        window.location.href = `tel:${lead.client_phone}`;
      } else if (type === 'email') {
        window.location.href = `mailto:${lead.client_email}?subject=ESEND : Demande d'intervention ${lead.tracking_id}`;
      }
    }, 50);
  };

  const filteredLeads = leads.filter(l => {
    if (filter === 'inbox') return l.status === 'nouveau' || l.status === 'contacté';
    return l.status === 'terminé' || l.status === 'annulé';
  });

  const getServiceIcon = (service) => {
    if (service === 'Nuisibles') return <Bug className="w-4 h-4 text-orange-600" />;
    if (service === 'Désinfection') return <ShieldCheck className="w-4 h-4 text-green-600" />;
    if (service === 'Nettoyage') return <Zap className="w-4 h-4 text-purple-600" />;
    return <Bug className="w-4 h-4 text-slate-400" />;
  };

  const formatDate = (dateString) => {
    const d = new Date(dateString);
    return d.toLocaleDateString('fr-FR', { day: '2-digit', month: 'short', year: 'numeric', hour: '2-digit', minute: '2-digit' });
  };

  return (
    <div className="space-y-6 animate-in fade-in duration-700">
      <div className="flex justify-between items-center bg-[var(--bg-secondary)] p-4 rounded-2xl border border-[var(--border-subtle)]">
        <div>
          <h3 className="text-xl font-black uppercase tracking-tighter">Gestion des Demandes</h3>
          <p className="text-[var(--text-dimmed)] text-[10px] font-bold uppercase tracking-widest mt-1">
            CRM Simplifié • Zéro Saisie
          </p>
        </div>
        <div className="flex gap-2">
          <button 
            onClick={loadLeads}
            className="p-2 bg-[var(--bg-input)] rounded-lg border border-[var(--border-subtle)] hover:border-red-600/50 hover:text-red-500 transition-colors"
          >
            <RefreshCw className={`w-4 h-4 ${loading ? 'animate-spin text-red-500' : ''}`} />
          </button>
        </div>
      </div>

      <div className="flex gap-2 p-1 bg-[var(--bg-secondary)] rounded-xl border border-[var(--border-subtle)] w-fit">
        <button
          onClick={() => setFilter('inbox')}
          className={`px-6 py-2 rounded-lg text-xs font-black uppercase tracking-widest transition-all ${
            filter === 'inbox' ? 'bg-[var(--text-main)] text-[var(--bg-primary)]' : 'text-[var(--text-dimmed)] hover:text-[var(--text-main)] hover:bg-[var(--bg-input)]'
          }`}
        >
          À Traiter ({leads.filter(l => l.status === 'nouveau' || l.status === 'contacté').length})
        </button>
        <button
          onClick={() => setFilter('archived')}
          className={`px-6 py-2 rounded-lg text-xs font-black uppercase tracking-widest transition-all flex border border-transparent items-center gap-2 ${
            filter === 'archived' ? 'bg-emerald-500/10 text-emerald-500 border-emerald-500/20' : 'text-[var(--text-dimmed)] hover:text-emerald-500 hover:bg-emerald-500/5'
          }`}
        >
          <Archive className="w-3.5 h-3.5" /> Archives
        </button>
      </div>

      {loading && leads.length === 0 ? (
        <div className="py-20 flex justify-center"><div className="w-10 h-10 border-2 border-red-600 border-t-transparent rounded-full animate-spin"></div></div>
      ) : (
        <div className="space-y-4">
          {filteredLeads.length === 0 ? (
            <div className="text-center py-20 text-[var(--text-dimmed)] border-2 border-dashed border-[var(--border-subtle)] rounded-2xl">
              <CheckCircle className="w-12 h-12 mx-auto mb-4 opacity-50" />
              <p className="font-bold text-lg">Inbox Zero !</p>
              <p className="text-sm">Toutes les demandes ont été traitées.</p>
            </div>
          ) : (
            filteredLeads.map(lead => {
              const images = lead.images ? JSON.parse(lead.images) : [];
              return (
              <motion.div 
                key={lead.id} 
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                className={`flex flex-col md:flex-row gap-4 bg-[var(--bg-secondary)] p-5 rounded-2xl border transition-all ${lead.status === 'nouveau' ? 'border-red-500/30 bg-red-500/5' : 'border-[var(--border-subtle)] hover:border-slate-400'}`}
              >
                {/* Info Principale */}
                <div className="flex-1 space-y-2">
                  <div className="flex items-center gap-2">
                    <span className="text-[10px] bg-[var(--bg-input)] px-2 py-1 rounded font-bold text-[var(--text-dimmed)]">{lead.tracking_id}</span>
                    {lead.status === 'nouveau' && <span className="bg-red-500 text-white text-[9px] font-black uppercase px-2 py-0.5 rounded-full flex items-center gap-1"><span className="w-1.5 h-1.5 bg-white rounded-full animate-pulse"></span> Nouveau</span>}
                    {lead.status === 'contacté' && <span className="bg-amber-500/10 text-amber-500 border border-amber-500/30 text-[9px] font-black uppercase px-2 py-0.5 rounded-full">En cours</span>}
                  </div>
                  
                  <h4 className="text-lg font-black">{lead.client_name} <span className="text-sm font-normal text-[var(--text-dimmed)]">({lead.client_type})</span></h4>
                  
                  <div className="flex flex-wrap items-center gap-x-4 gap-y-2 text-sm text-[var(--text-dimmed)]">
                    <span className="flex items-center gap-1">{getServiceIcon(lead.service)} <strong className="text-[var(--text-main)]">{lead.nuisible || lead.service}</strong></span>
                    <span>📍 {lead.zip_code} {lead.city}</span>
                    <span className="flex items-center gap-1 text-[10px] uppercase font-bold"><Calendar className="w-3 h-3" /> {formatDate(lead.created_at)}</span>
                  </div>
                  
                  {lead.problem_details && lead.problem_details !== 'Aucune précision' && (
                     <div className="bg-[var(--bg-primary)] p-3 rounded-xl border border-[var(--border-subtle)] text-sm italic mt-2 text-[var(--text-dimmed)]">
                       "{lead.problem_details}"
                     </div>
                  )}

                  {/* Galerie Photos */}
                  {images.length > 0 && (
                    <div className="flex gap-2 mt-4">
                      {images.map((img, idx) => (
                        <div 
                          key={idx} 
                          onClick={() => setSelectedImage(`/uploads/leads/${img}`)}
                          className="w-16 h-16 rounded-lg overflow-hidden border border-[var(--border-subtle)] cursor-pointer group relative"
                        >
                          <img src={`/uploads/leads/${img}`} className="w-full h-full object-cover transition-transform group-hover:scale-110" alt={`Client photo ${idx + 1}`} />
                          <div className="absolute inset-0 bg-black/20 group-hover:bg-transparent transition-colors"></div>
                        </div>
                      ))}
                    </div>
                  )}
                </div>

                {/* Actions (Automatisation des statuts) */}
                <div className="flex md:flex-col gap-2 justify-end md:w-48 shrink-0">
                  {filter === 'inbox' ? (
                    <>
                      <button 
                        onClick={() => handleActionClick(lead, 'phone')}
                        className="flex-1 flex justify-center items-center gap-2 bg-blue-600/10 hover:bg-blue-600/20 border border-blue-600/20 text-blue-500 p-3 rounded-xl transition-all font-bold text-sm"
                      >
                        <Phone className="w-4 h-4" /> Appeler
                      </button>
                      <button 
                        onClick={() => handleActionClick(lead, 'email')}
                        className="flex-1 flex justify-center items-center gap-2 bg-[var(--bg-input)] hover:border-[var(--text-main)]/30 border border-[var(--border-subtle)] text-[var(--text-main)] p-3 rounded-xl transition-all font-bold text-sm"
                      >
                        <Mail className="w-4 h-4" /> E-mail
                      </button>
                      <button 
                         onClick={() => updateStatus(lead.id, 'terminé')}
                         className="flex-1 flex justify-center items-center gap-2 bg-emerald-500/10 hover:bg-emerald-500/20 border border-emerald-500/20 text-emerald-500 p-3 rounded-xl transition-all font-bold text-sm mt-auto"
                      >
                         <CheckCircle className="w-4 h-4" /> Classer Terminé
                      </button>
                    </>
                  ) : (
                    <>
                      <button 
                         onClick={() => updateStatus(lead.id, 'contacté')}
                         className="flex-1 flex justify-center items-center gap-2 bg-[var(--bg-input)] hover:border-[var(--text-main)]/30 border border-[var(--border-subtle)] text-[var(--text-main)] p-3 rounded-xl transition-all font-bold text-sm"
                      >
                         <RefreshCw className="w-4 h-4" /> Ré-ouvrir
                      </button>
                      <button 
                         onClick={() => updateStatus(lead.id, 'annulé')}
                         className="flex flex-center justify-center items-center p-3 text-red-500 hover:bg-red-500/10 border border-transparent rounded-xl transition-colors"
                         title="Marquer comme Annulé"
                      >
                         <Trash2 className="w-4 h-4" />
                      </button>
                    </>
                  )}
                </div>
              </motion.div>
            )})
          )}
        </div>
      )}

      {/* Lightbox Modal */}
      {selectedImage && (
        <div 
          className="fixed inset-0 z-[9999] bg-black/90 flex items-center justify-center p-4 cursor-zoom-out"
          onClick={() => setSelectedImage(null)}
        >
          <img src={selectedImage} className="max-w-full max-h-full rounded-xl shadow-2xl" alt="Agrandissement" />
          <button 
            className="absolute top-4 right-4 p-2 bg-white/10 hover:bg-white/20 rounded-full text-white"
            onClick={() => setSelectedImage(null)}
          >
            <Trash2 className="w-6 h-6 rotate-45" /> {/* Symbole X détourné */}
          </button>
        </div>
      )}
    </div>
  );
};

export default LeadManager;
