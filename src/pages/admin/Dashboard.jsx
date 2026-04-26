// src/pages/admin/Dashboard.jsx
import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useNavigate } from 'react-router-dom';


import {
  BarChart3,
  BookOpen,
  Briefcase,
  Settings,
  LogOut,
  Plus,
  Search,
  Sparkles,
  ArrowRight,
  ChevronLeft,
  ChevronRight,
  TrendingUp,
  Eye,
  FileText,
  Mail,
  Globe,
  Key,
  Layout,
  Zap,
  CheckCircle2,
  MapPin,
  Save,
  Edit3,
  Trash2,
  Calendar,
  Inbox,
  Menu,
  Bug,
  ShieldCheck,
  Clock,
  Building2
} from 'lucide-react';
import { api } from '../../lib/api';
import BlogManager from '../../components/Admin/BlogManager';
import CreationStudio from '../../components/Admin/CreationStudio';
import ProjectModal from '../../components/Admin/ProjectModal';
import ArticleModal from '../../components/Admin/ArticleModal';
import LeadManager from '../../components/Admin/LeadManager';
import './AdminPanel.css';

// ─── Constants ─────────────────────────────────────────────────────────────
const SERVICES = [
  { id: 1, name: 'Rats & Rongeurs', icon: '🐀' },
  { id: 2, name: 'Guêpes & Frelons', icon: '🐝' },
  { id: 3, name: 'Punaises de Lit', icon: '🪲' },
  { id: 4, name: 'Cafards & Blattes', icon: '🪳' },
  { id: 5, name: 'Fourmis', icon: '🐜' },
  { id: 6, name: 'Désinfection', icon: '🧼' },
  { id: 7, name: 'Nettoyage & Vitres', icon: '🪟' }
];

// ─── Portfolio Tab Component ───────────────────────────────────────────────
const PROJECT_CATS = [
  { id: 'all', label: 'Tous' },
  { id: 'nuisibles', label: '🐀 Nuisibles' },
  { id: 'desinfection', label: '🧪 Désinfection' },
  { id: 'nettoyage', label: '🪟 Nettoyage' },
];

const PortfolioTab = ({ projects, searchQuery, onEdit, onDelete, onNew }) => {
  const [activeCategory, setActiveCategory] = React.useState('all');
  const [deletingId, setDeletingId] = React.useState(null);

  const handleDelete = async (proj) => {
    if (!window.confirm(`Supprimer "${proj.title}" ? Action irréversible.`)) return;
    setDeletingId(proj.id);
    try {
      const { api } = await import('../../lib/api');
      await api.deleteProject(proj.id);
      onDelete(proj.id);
    } catch (e) { alert(e.message); }
    finally { setDeletingId(null); }
  };

  const filtered = projects.filter(p => {
    const matchCat = activeCategory === 'all' || p.category === activeCategory;
    if (!searchQuery) return matchCat;
    const q = searchQuery.toLowerCase();
    return matchCat && (p.title?.toLowerCase().includes(q) || p.location?.toLowerCase().includes(q) || p.tag?.toLowerCase().includes(q));
  });

  const formatD = (s) => { try { return new Date(s).toLocaleDateString('fr-FR', { day: '2-digit', month: 'short', year: 'numeric' }); } catch { return s || '—'; } };

  return (
    <div className="space-y-8 animate-in fade-in duration-700">
      <div>
        <h3 className="text-2xl font-black uppercase tracking-tighter">Réalisations Terrain</h3>
        <p className="text-[var(--text-dimmed)] text-[10px] font-bold uppercase tracking-widest mt-1">
          {projects.length} intervention{projects.length !== 1 ? 's' : ''} archivée{projects.length !== 1 ? 's' : ''}
        </p>
      </div>

      {/* Filtres */}
      <div className="flex flex-wrap gap-2">
        {PROJECT_CATS.map(cat => (
          <button
            key={cat.id}
            onClick={() => setActiveCategory(cat.id)}
            className={`px-4 py-2 rounded-full text-[10px] font-black uppercase tracking-widest transition-all border ${activeCategory === cat.id
                ? 'bg-[var(--text-main)] text-[var(--bg-primary)] border-transparent'
                : 'bg-[var(--bg-secondary)] text-[var(--text-dimmed)] border-[var(--border-subtle)] hover:border-[var(--text-main)]/30'
              }`}
          >
            {cat.label} <span className="opacity-60">({projects.filter(p => cat.id === 'all' || p.category === cat.id).length})</span>
          </button>
        ))}
      </div>

      {/* Grille */}
      <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
        {filtered.map((proj) => {
          const isVisible = proj.is_published === 1 || proj.is_published === true;
          const isDeleting = deletingId === proj.id;
          return (
            <div key={proj.id} className={`glass-card group flex flex-col transition-all hover:-translate-y-1 hover:shadow-2xl ${isDeleting ? 'opacity-40 pointer-events-none' : ''}`}>
              <div className="aspect-video rounded-xl overflow-hidden mb-4 relative border border-[var(--border-subtle)]">
                <img src={proj.img} className="w-full h-full object-cover grayscale group-hover:grayscale-0 transition-all duration-700 group-hover:scale-105" alt={proj.title} />
                <div className="absolute inset-0 bg-gradient-to-t from-[var(--bg-primary)]/60 to-transparent" />
                <div className="absolute top-3 left-3 bg-black/60 backdrop-blur-md px-2 py-1 rounded text-[9px] font-black uppercase tracking-widest border border-white/10 group-hover:bg-red-600 group-hover:border-red-600 transition-colors">
                  {proj.tag}
                </div>
                <div className={`absolute top-3 right-3 flex items-center gap-1.5 text-[9px] font-black uppercase tracking-widest px-2 py-1 rounded-lg border ${isVisible ? 'bg-emerald-500/20 text-emerald-400 border-emerald-500/30' : 'bg-amber-500/20 text-amber-400 border-amber-500/30'
                  }`}>
                  {isVisible ? <Globe className="w-2.5 h-2.5" /> : <Eye className="w-2.5 h-2.5" />}
                  {isVisible ? 'Visible' : 'Masquée'}
                </div>
              </div>
              <h4 className="text-sm font-black uppercase tracking-tight mb-1 group-hover:text-red-600 transition-colors line-clamp-1">{proj.title}</h4>
              <div className="flex items-center gap-3 mb-3 text-[9px] font-bold text-[var(--text-dimmed)] uppercase tracking-widest">
                <MapPin className="w-3 h-3 text-red-600" /> {proj.location}
                {proj.created_at && <><span>·</span><Calendar className="w-3 h-3" />{formatD(proj.created_at)}</>}
              </div>
              {proj.method && <p className="text-[11px] text-[var(--text-dimmed)] line-clamp-1 mb-4">🔧 {proj.method}</p>}
              <div className="mt-auto flex justify-between items-center border-t border-[var(--border-subtle)] pt-3">
                <span className="text-[9px] font-black text-emerald-500 flex items-center gap-1"><CheckCircle2 className="w-3 h-3" />{proj.result || 'Succès'}</span>
                <div className="flex gap-2">
                  <button onClick={() => onEdit(proj)} className="p-2 text-[var(--text-dimmed)] hover:text-white bg-[var(--bg-input)] rounded-lg border border-[var(--border-subtle)] transition-all" title="Éditer">
                    <Edit3 className="w-3.5 h-3.5" />
                  </button>
                  <button onClick={() => handleDelete(proj)} className="p-2 text-red-500/40 hover:text-red-500 bg-red-600/5 rounded-lg border border-red-600/10 hover:border-red-600/30 transition-all" title="Supprimer">
                    <Trash2 className="w-3.5 h-3.5" />
                  </button>
                </div>
              </div>
            </div>
          );
        })}
      </div>
      {filtered.length === 0 && (
        <div className="py-20 text-center glass-card border-dashed border-[var(--border-subtle)]">
          <p className="text-[var(--text-dimmed)] font-black uppercase tracking-[0.2em] text-[10px]">Aucune réalisation trouvée</p>
          <button onClick={onNew} className="mt-6 flex items-center gap-2 mx-auto bg-gradient-to-r from-blue-600 to-indigo-600 text-white px-5 py-3 rounded-xl font-black uppercase tracking-widest text-[10px] hover:scale-105 transition-all">
            <Plus className="w-3.5 h-3.5" /> Ajouter la première
          </button>
        </div>
      )}
    </div>
  );
};

// ─── Dashboard Component ────────────────────────────────────────────────────
const Dashboard = () => {
  const [isSidebarCollapsed, setIsSidebarCollapsed] = useState(() => {
    return localStorage.getItem('esend_sidebar_collapsed') === 'true';
  });
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [activeTab, setActiveTab] = useState('dashboard');
  const [articles, setArticles] = useState([]);
  const [projects, setProjects] = useState([]);
  const [leads, setLeads] = useState([]);
  const [settings, setSettings] = useState({});
  const [localSettings, setLocalSettings] = useState({});
  const [saveStatus, setSaveStatus] = useState({ id: null, type: '' }); // { id: 'coordination', type: 'success' }
  const [searchQuery, setSearchQuery] = useState('');
  const [loading, setLoading] = useState(true);
  const [trendsData, setTrendsData] = useState(null);
  const [isLoadingTrends, setIsLoadingTrends] = useState(true);

  // Modals state
  const [showStudio, setShowStudio] = useState(false);
  const [editingArticle, setEditingArticle] = useState(null);
  const [editingProject, setEditingProject] = useState(null);
  const [showProjectModal, setShowProjectModal] = useState(false);

  const navigate = useNavigate();

  useEffect(() => {
    // Vérification auth (Simulation)
    const isAuth = localStorage.getItem('esend_is_auth');
    if (isAuth !== 'true') {
      navigate('/admin/login');
      return;
    }
    loadData();
  }, [navigate]);

  const loadData = async () => {
    setLoading(true);
    setIsLoadingTrends(true);
    const [arts, projs, sets, leadsData, trendsRes] = await Promise.all([
      api.getArticles(),
      api.getProjects(),
      api.getSettings(),
      api.getLeads(),
      api.getMarketTrends().catch(() => null)
    ]);
    setArticles(arts);
    setProjects(projs);
    setSettings(sets);
    setLocalSettings(sets);
    setLeads(leadsData || []);
    if (trendsRes && trendsRes.data) {
      setTrendsData(trendsRes.data);
    }
    setLoading(false);
    setIsLoadingTrends(false);
  };

  const handleUpdateSettings = async () => {
    try {
      setLoading(true);
      const res = await api.updateSettings(localSettings);
      if (res.success || res) {
        setSettings(localSettings);
        setSaveStatus({ id: 'global', type: 'success' });
        setTimeout(() => setSaveStatus({ id: null, type: '' }), 3000);
      }
    } catch (error) {
      console.error("Error updating settings:", error);
      alert("Erreur lors de la sauvegarde globale");
    } finally {
      setLoading(false);
    }
  };

  const handleLogout = () => {
    localStorage.removeItem('esend_is_auth');
    navigate('/admin/login');
  };

  const renderStats = () => {
    const newLeads = leads.filter(l => l.status === 'nouveau').length;

    return (
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-12">
        <div className="glass-card flex flex-col gap-4">
          <div className="flex justify-between items-start">
            <div className="p-3 bg-red-600/10 rounded-xl border border-red-600/20">
              <Inbox className="w-5 h-5 text-red-600" />
            </div>
            <span className={`text-[10px] font-black ${newLeads > 0 ? 'text-red-500 bg-red-500/10' : 'text-zinc-500 bg-white/5'} px-2 py-1 rounded-lg`}>
              {newLeads > 0 ? 'Urgent' : 'À jour'}
            </span>
          </div>
          <div>
            <div className="text-2xl font-black italic tracking-tighter">{newLeads}</div>
            <div className="text-[var(--text-dimmed)] text-[10px] font-bold uppercase tracking-widest mt-1">Nouveaux Leads</div>
          </div>
        </div>

        <div className="glass-card flex flex-col gap-4">
          <div className="flex justify-between items-start">
            <div className="p-3 bg-blue-600/10 rounded-xl border border-blue-600/20">
              <Briefcase className="w-5 h-5 text-blue-600" />
            </div>
            <span className="text-[10px] font-black text-green-500 bg-green-500/10 px-2 py-1 rounded-lg">Actif</span>
          </div>
          <div>
            <div className="text-2xl font-black italic tracking-tighter">{projects.length}</div>
            <div className="text-[var(--text-dimmed)] text-[10px] font-bold uppercase tracking-widest mt-1">Interventions</div>
          </div>
        </div>

        <div className="glass-card flex flex-col gap-4">
          <div className="flex justify-between items-start">
            <div className="p-3 bg-green-600/10 rounded-xl border border-green-600/20">
              <TrendingUp className="w-5 h-5 text-green-600" />
            </div>
            <span className="text-[10px] font-black text-green-500 bg-green-500/10 px-2 py-1 rounded-lg">+4.2%</span>
          </div>
          <div>
            <div className="text-2xl font-black italic tracking-tighter">12.8%</div>
            <div className="text-[var(--text-dimmed)] text-[10px] font-bold uppercase tracking-widest mt-1">Taux de Conv.</div>
          </div>
        </div>

        <div className="glass-card flex flex-col gap-4">
          <div className="flex justify-between items-start">
            <div className="p-3 bg-amber-600/10 rounded-xl border border-amber-600/20">
              <Sparkles className="w-5 h-5 text-amber-600" />
            </div>
            <span className="text-[10px] font-black text-amber-600 bg-amber-600/10 px-2 py-1 rounded-lg">Performance</span>
          </div>
          <div>
            <div className="text-2xl font-black italic tracking-tighter">1h 45m</div>
            <div className="text-[var(--text-dimmed)] text-[10px] font-bold uppercase tracking-widest mt-1">Rép. Moyenne</div>
          </div>
        </div>
      </div>
    );
  };

  if (loading) return (
    <div className="min-h-screen bg-[var(--bg-primary)] flex items-center justify-center transition-colors duration-400">
      <div className="w-12 h-12 border-2 border-red-600 border-t-transparent rounded-full animate-spin" />
    </div>
  );

  return (
    <div className={`admin-container ${isSidebarCollapsed ? 'sidebar-collapsed' : ''} bg-[var(--bg-primary)]`}>
      {/* Mobile Backdrop */}
      {isMobileMenuOpen && (
        <div
          className="fixed inset-0 bg-black/60 backdrop-blur-sm z-[90] lg:hidden"
          onClick={() => setIsMobileMenuOpen(false)}
        />
      )}

      {/* Sidebar */}
      <aside className={`admin-sidebar ${isSidebarCollapsed ? 'collapsed' : ''} ${isMobileMenuOpen ? 'mobile-open' : ''} bg-[var(--bg-secondary)] border-r border-[var(--border-subtle)] transition-all duration-300 relative`}>
        {/* Toggle Button */}
        <button
          onClick={() => {
            const newState = !isSidebarCollapsed;
            setIsSidebarCollapsed(newState);
            localStorage.setItem('esend_sidebar_collapsed', newState);
          }}
          className="absolute -right-3 top-20 w-6 h-6 bg-red-600 text-white rounded-full flex items-center justify-center shadow-lg hover:scale-110 active:scale-95 transition-all z-20 border-2 border-[var(--bg-primary)]"
          title={isSidebarCollapsed ? "Déplier le menu" : "Replier le menu"}
        >
          {isSidebarCollapsed ? <ChevronRight className="w-3 h-3" /> : <ChevronLeft className="w-3 h-3" />}
        </button>

        <div className={`sidebar-logo text-[var(--text-main)] overflow-hidden flex ${isSidebarCollapsed ? 'lg:justify-center mb-6 pt-2' : 'flex-col gap-4 mb-10'}`}>
          <div className="flex items-center gap-3">
            <div className="w-9 h-9 rounded-xl bg-white flex items-center justify-center p-1 shadow-2xl border border-[var(--border-subtle)] group-hover:scale-105 transition-transform shrink-0 overflow-hidden">
              <img src="./logo-esend.jpg" alt="Logo ESEND" className="w-full h-full object-contain" />
            </div>
            <div className={`flex flex-col leading-none ${isSidebarCollapsed ? 'lg:hidden' : ''}`}>
              <span className="text-xl font-black italic tracking-tighter text-[var(--text-main)]">ESEND</span>
              <span className="text-[10px] font-bold text-red-600 tracking-[0.25em] uppercase mt-1">Admin</span>
            </div>
          </div>
        </div>

        <nav className="flex-grow space-y-2">
          {[
            { id: 'dashboard', icon: BarChart3, label: 'Dashboard' },
            { id: 'blog', icon: BookOpen, label: 'Journal Expert' },
            { id: 'portfolio', icon: Briefcase, label: 'Réalisations' },
            { id: 'leads', icon: Inbox, label: 'Demandes' },
            { id: 'settings', icon: Settings, label: 'Paramètres' },
          ].map(item => (
            <div
              key={item.id}
              onClick={() => { setActiveTab(item.id); setIsMobileMenuOpen(false); setShowStudio(false); }}
              className={`nav-item ${activeTab === item.id ? 'active' : ''} ${isSidebarCollapsed ? 'lg:justify-center lg:p-3 lg:px-0' : ''}`}
              title={isSidebarCollapsed ? item.label : ''}
            >
              <item.icon className="w-4 h-4 shrink-0" />
              <span className={`${isSidebarCollapsed ? 'lg:hidden' : ''} whitespace-nowrap`}>{item.label}</span>
            </div>
          ))}
        </nav>

        <div
          onClick={handleLogout}
          className={`nav-item text-zinc-500 hover:text-red-600 mt-auto border-t border-[var(--border-subtle)] pt-4 ${isSidebarCollapsed ? 'lg:justify-center lg:p-3 lg:px-0' : ''}`}
          title={isSidebarCollapsed ? "Quitter" : ""}
        >
          <LogOut className="w-4 h-4 shrink-0" />
          <span className={`${isSidebarCollapsed ? 'lg:hidden' : ''}`}>Quitter</span>
        </div>
      </aside>

      {/* Main Content */}
      <main className="admin-main bg-[var(--bg-primary)]">
        {showStudio ? (
          <div className="h-[calc(100vh-64px)] w-full overflow-y-auto pb-20">
            <CreationStudio
              initialStep={showStudio === 'magique' || showStudio?.mode === 'magique' ? 'TOPIC_CHOICE' : 'CHOICE'}
              autoStartConfig={typeof showStudio === 'object' ? showStudio : null}
              onClose={() => setShowStudio(false)}
              onSave={(newArt) => {
                // Mise à jour de la liste
                setArticles(prev => {
                  const exists = prev.find(a => a.id === newArt.id);
                  if (exists) return prev.map(a => a.id === newArt.id ? newArt : a);
                  return [newArt, ...prev];
                });
                setEditingArticle(newArt);
                setShowStudio(false);
              }}
              articles={articles}
              services={SERVICES}
            />
          </div>
        ) : (
          <>
            {/* Header */}
            <header className="flex flex-col lg:flex-row lg:justify-between items-start lg:items-center gap-6 mb-8 lg:mb-16">
              <div className="flex items-center gap-4 w-full lg:w-auto">
                <button
                  className="lg:hidden p-3 bg-[var(--bg-secondary)] border border-[var(--border-subtle)] rounded-xl text-[var(--text-main)] shadow-lg active:scale-95 hover:border-red-600/50 transition-all shrink-0"
                  onClick={() => setIsMobileMenuOpen(true)}
                >
                  <Menu className="w-5 h-5" />
                </button>
                <div>
                  <h2 className="text-2xl sm:text-4xl font-black tracking-tighter uppercase mb-1 sm:mb-2 text-[var(--text-main)]">
                    Statut <span className="text-red-600 italic">Opérationnel</span>
                  </h2>
                  <p className="hidden sm:block text-[var(--text-dimmed)] font-medium text-[10px] sm:text-xs italic tracking-widest uppercase border-l border-red-600 pl-3 sm:pl-4">
                    {activeTab === 'dashboard' && "Vue d'ensemble du site ESEND"}
                    {activeTab === 'blog' && "Gestion des dossiers tactiques et expertise"}
                    {activeTab === 'portfolio' && "Mise en avant de vos interventions terrain"}
                    {activeTab === 'leads' && "CRM simplifié — Suivi des demandes de devis"}
                    {activeTab === 'settings' && "Configuration des services et IA"}
                  </p>
                </div>
              </div>

              <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-4 sm:gap-6 w-full lg:w-auto">

                {activeTab !== 'settings' && (
                  <div className="relative group w-full sm:w-auto">
                    <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-[var(--text-dimmed)] group-focus-within:text-red-600 transition-colors" />
                    <input
                      type="text"
                      placeholder="Rechercher..."
                      value={searchQuery}
                      onChange={(e) => setSearchQuery(e.target.value)}
                      className="admin-search w-full bg-[var(--bg-input)] border-[var(--border-subtle)] text-[var(--text-main)] placeholder:text-[var(--text-dimmed)]"
                    />
                  </div>
                )}

                {activeTab === 'blog' && (
                  <button
                    onClick={() => setShowStudio(true)}
                    className="flex items-center justify-center gap-3 bg-red-600 text-white px-6 py-4 rounded-xl font-black uppercase tracking-widest text-[10px] hover:bg-red-700 transition-all shadow-xl shadow-red-600/10 active:scale-95 whitespace-nowrap"
                  >
                    <Plus className="w-4 h-4" /> Nouvel Article
                  </button>
                )}

                {activeTab === 'portfolio' && (
                  <button
                    onClick={() => { setEditingProject(null); setShowProjectModal(true); }}
                    className="flex items-center justify-center gap-3 bg-red-600 text-white px-6 py-4 rounded-xl font-black uppercase tracking-widest text-[10px] hover:bg-red-700 transition-all shadow-xl shadow-red-600/10 active:scale-95 whitespace-nowrap"
                  >
                    <Plus className="w-4 h-4" /> Nouvelle Réa
                  </button>
                )}
              </div>
            </header>

            {/* Content Area */}
            {activeTab === 'dashboard' && (
              <>
                {renderStats()}

                <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 mt-12">
                  <div className="glass-card bg-[var(--bg-secondary)] border-[var(--border-subtle)]">
                    <div className="flex justify-between items-center mb-8">
                      <h3 className="text-xl font-black uppercase tracking-tighter">Flux des Demandes</h3>
                      <div className="flex items-center gap-2">
                        <span className="w-2 h-2 rounded-full bg-green-500 animate-pulse" />
                        <span className="text-[10px] font-black text-[var(--text-dimmed)] uppercase tracking-widest">Live</span>
                      </div>
                    </div>
                    <div className="space-y-6">
                      {leads
                        .sort((a, b) => {
                          const aUrgent = a.is_urgent == 1 || a.is_urgent === true;
                          const bUrgent = b.is_urgent == 1 || b.is_urgent === true;
                          if (aUrgent && !bUrgent) return -1;
                          if (!aUrgent && bUrgent) return 1;
                          const aNew = a.status === 'nouveau';
                          const bNew = b.status === 'nouveau';
                          if (aNew && !bNew) return -1;
                          if (!aNew && bNew) return 1;
                          if (aNew && bNew) return new Date(a.created_at) - new Date(b.created_at);
                          return new Date(b.created_at) - new Date(a.created_at);
                        })
                        .slice(0, 5).map((lead, i) => {
                          const isUrgent = lead.is_urgent == 1 || lead.is_urgent === true;
                          const isNew = lead.status === 'nouveau';

                          return (
                            <motion.div
                              key={lead.id || i}
                              initial={{ opacity: 0, x: -20 }}
                              animate={{ opacity: 1, x: 0 }}
                              transition={{ delay: i * 0.1 }}
                              onClick={() => setActiveTab('leads')}
                              className={`relative flex justify-between items-center p-4 rounded-2xl cursor-pointer transition-all duration-300 group mb-3 last:mb-0 ${isUrgent ? 'bg-red-500/5 border border-red-500/20 hover:bg-red-500/10' :
                                  isNew ? 'bg-white border border-slate-100 hover:border-slate-300 shadow-sm' :
                                    'bg-slate-50/50 border border-transparent hover:bg-slate-50'
                                }`}
                            >
                              {isUrgent && (
                                <div className="absolute -left-1 top-1/2 -translate-y-1/2 w-1 h-12 bg-red-600 rounded-full shadow-[0_0_10px_rgba(220,38,38,0.5)]" />
                              )}

                              <div className="flex items-center gap-4">
                                <div className={`w-14 h-14 rounded-2xl flex items-center justify-center transition-all duration-500 ${isUrgent ? 'bg-red-600 text-white shadow-lg shadow-red-600/30 rotate-3 group-hover:rotate-0' :
                                    isNew ? 'bg-slate-900 text-white' :
                                      'bg-slate-100 text-slate-400'
                                  }`}>
                                  {lead.service === 'Nuisibles' ? <Bug className="w-6 h-6" /> :
                                    lead.service === 'Nettoyage' ? <Zap className="w-6 h-6" /> :
                                      <ShieldCheck className="w-6 h-6" />}
                                </div>

                                <div className="space-y-1">
                                  <div className="flex items-center gap-3">
                                    <span className={`text-[10px] font-black uppercase tracking-widest ${isUrgent ? 'text-red-600' : 'text-slate-500'}`}>
                                      {lead.service} {lead.nuisible && `• ${lead.nuisible}`}
                                    </span>
                                    {isUrgent && (
                                      <motion.span
                                        animate={{ opacity: [1, 0.5, 1] }}
                                        transition={{ repeat: Infinity, duration: 2 }}
                                        className="bg-red-600 text-white text-[9px] font-black px-3 py-1 rounded-full shadow-[0_0_12px_rgba(220,38,38,0.4)] flex items-center gap-1.5 whitespace-nowrap"
                                      >
                                        <Zap className="w-3 h-3 fill-current" /> URGENT
                                      </motion.span>
                                    )}
                                  </div>
                                  <h5 className={`text-base font-black tracking-tight flex items-center gap-2 ${isUrgent ? 'text-red-900' : 'text-slate-900'}`}>
                                    {lead.client_name}
                                    {isNew && !isUrgent && <span className="w-2 h-2 rounded-full bg-red-600 animate-ping" />}
                                  </h5>
                                </div>
                              </div>

                              <div className="flex flex-col items-end gap-1 min-w-[100px]">
                                <div className={`text-[10px] font-black px-2 py-0.5 rounded ${isUrgent ? 'bg-red-600 text-white' : 'bg-slate-100 text-slate-500'}`}>
                                  {isUrgent ? 'PRIORITAIRE' : isNew ? 'NOUVEAU' : 'ARCHIVÉ'}
                                </div>
                                <div className="flex flex-col items-end text-[10px] font-bold text-slate-400">
                                  <span className="flex items-center gap-1">
                                    <Clock className="w-3 h-3" />
                                    {new Date(lead.created_at).toLocaleTimeString('fr-FR', { hour: '2-digit', minute: '2-digit' })}
                                  </span>
                                  <span>{new Date(lead.created_at).toLocaleDateString('fr-FR')}</span>
                                </div>
                              </div>
                            </motion.div>
                          );
                        })}
                    </div>
                  </div>

                  <div className="glass-card bg-[var(--bg-secondary)] border-[var(--border-subtle)] p-8">
                    <div className="flex justify-between items-center mb-8">
                      <h3 className="text-xl font-black uppercase tracking-tighter">Répartition Activité</h3>
                      <TrendingUp className="w-5 h-5 text-indigo-600" />
                    </div>

                    {/* Ultra-Modern Linear Distribution (SaaS Style) */}
                    <div className="space-y-8">

                      {/* Stacked Progress Bar */}
                      <div className="relative h-3 w-full rounded-full overflow-hidden flex bg-slate-100 shadow-inner">
                        <div className="h-full bg-gradient-to-r from-red-500 to-red-600 w-[57%] transition-all duration-1000 relative group">
                          <div className="absolute inset-0 bg-white/20 opacity-0 group-hover:opacity-100 transition-opacity" />
                        </div>
                        <div className="h-full bg-gradient-to-r from-indigo-500 to-indigo-600 w-[31%] transition-all duration-1000 border-l border-white/30 relative group">
                          <div className="absolute inset-0 bg-white/20 opacity-0 group-hover:opacity-100 transition-opacity" />
                        </div>
                        <div className="h-full bg-gradient-to-r from-emerald-500 to-emerald-600 w-[12%] transition-all duration-1000 border-l border-white/30 relative group">
                          <div className="absolute inset-0 bg-white/20 opacity-0 group-hover:opacity-100 transition-opacity" />
                        </div>
                      </div>

                      {/* Bento Cards Grid */}
                      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                        {[
                          { label: 'Nuisibles', count: '57%', color: 'text-red-600', dot: 'bg-red-500', trend: '+12%', icon: Bug },
                          { label: 'Nettoyage', count: '31%', color: 'text-indigo-600', dot: 'bg-indigo-500', trend: '-2%', icon: Sparkles },
                          { label: 'Désinfection', count: '12%', color: 'text-emerald-600', dot: 'bg-emerald-500', trend: '+5%', icon: ShieldCheck }
                        ].map((item, i) => (
                          <div key={i} className="bg-white p-5 rounded-2xl border border-slate-100 hover:border-slate-200 hover:shadow-xl hover:-translate-y-1 transition-all duration-300 flex flex-col justify-between min-h-[120px]">
                            <div className="flex justify-between items-start mb-4">
                              <div className="flex items-center gap-2">
                                <div className={`w-2.5 h-2.5 rounded-full ${item.dot} shadow-sm`} />
                                <span className="text-[10px] font-black text-slate-500 uppercase tracking-widest">{item.label}</span>
                              </div>
                              <item.icon className={`w-4 h-4 ${item.color} opacity-50`} />
                            </div>

                            <div className="flex items-end justify-between mt-auto">
                              <div className={`text-3xl font-black ${item.color} leading-none tracking-tighter`}>{item.count}</div>
                              <div className={`text-[9px] font-bold ${item.trend.startsWith('+') ? 'text-emerald-600 bg-emerald-50' : 'text-slate-500 bg-slate-50'} px-2 py-1 rounded-md border ${item.trend.startsWith('+') ? 'border-emerald-100' : 'border-slate-100'}`}>
                                {item.trend}
                              </div>
                            </div>
                          </div>
                        ))}
                      </div>

                    </div>
                  </div>
                </div>

                {/* Strategic Advice Center (The Predictive Layer) */}
                <div className="mt-12 glass-card bg-gradient-to-br from-indigo-900/10 to-amber-900/10 border-indigo-600/20 p-8">
                  <div className="flex items-center gap-4 mb-6">
                    <div className="p-3 bg-amber-600 text-white rounded-2xl shadow-lg shadow-amber-600/20">
                      <Sparkles className="w-6 h-6" />
                    </div>
                    <div>
                      <h3 className="text-xl font-black uppercase tracking-tighter">Market Strategy Advisor <span className="text-amber-600">IA</span></h3>
                      <p className="text-[var(--text-dimmed)] text-[10px] font-bold uppercase tracking-widest mt-1">Analyse Hyper-Locale (Menton & 06) basée sur Google Trends & BDD</p>
                    </div>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    {isLoadingTrends ? (
                      <>
                        <div className="bg-white/50 p-5 rounded-2xl border border-slate-100 animate-pulse h-40">
                          <div className="w-1/2 h-4 bg-slate-200 rounded mb-4"></div>
                          <div className="w-full h-8 bg-slate-200 rounded mb-4"></div>
                          <div className="w-1/3 h-6 bg-slate-200 rounded"></div>
                        </div>
                        <div className="bg-white/50 p-5 rounded-2xl border border-slate-100 animate-pulse h-40">
                          <div className="w-1/2 h-4 bg-slate-200 rounded mb-4"></div>
                          <div className="w-full h-8 bg-slate-200 rounded mb-4"></div>
                          <div className="w-1/3 h-6 bg-slate-200 rounded"></div>
                        </div>
                      </>
                    ) : (
                      trendsData?.slice(0, 2).map((trend, index) => (
                        <div key={index} className={`bg-white/50 p-5 rounded-2xl border border-slate-100 hover:border-${trend.color}-200 transition-all group`}>
                          <div className="flex items-center gap-2 mb-3">
                            {index === 0 ? <TrendingUp className={`w-5 h-5 ${trend.color === 'amber' ? 'text-amber-600' : trend.color === 'slate' ? 'text-slate-600' : 'text-indigo-600'}`} /> : <Sparkles className={`w-5 h-5 ${trend.color === 'amber' ? 'text-amber-600' : trend.color === 'slate' ? 'text-slate-600' : 'text-indigo-600'}`} />}
                            <h4 className="font-black text-slate-900 uppercase tracking-tighter text-sm">
                              {index === 0 ? "Opportunité Marché" : "Conseil IA"}
                            </h4>
                          </div>
                          <p className="text-slate-600 text-sm leading-relaxed mb-4">
                            Évolution <strong className={`${trend.color === 'amber' ? 'text-amber-600' : trend.color === 'slate' ? 'text-slate-600' : 'text-indigo-600'}`}>{trend.isRising ? 'en hausse' : 'stable'}</strong> ({trend.trendChange}) pour <strong className="text-slate-900">"{trend.label}"</strong>.
                            {trend.isRising && " C'est le moment d'activer vos communications !"}
                          </p>
                          <a
                            href={trend.url}
                            target="_blank"
                            rel="noopener noreferrer"
                            className={`inline-flex items-center gap-2 px-3 py-1.5 ${index === 0 ? trend.color === 'amber' ? 'bg-amber-600' : trend.color === 'slate' ? 'bg-slate-600' : 'bg-indigo-600' : 'bg-slate-900'} text-white text-[10px] font-black rounded-lg hover:scale-105 transition-all shadow-md`}
                          >
                            Voir sur Google Trends <ArrowRight className="w-3 h-3" />
                          </a>
                        </div>
                      ))
                    )}
                  </div>

                  <div className="mt-6 p-6 bg-[var(--bg-primary)] border border-red-600/20 rounded-2xl flex flex-col justify-between">
                    <p className="text-[10px] font-black uppercase tracking-widest text-[var(--text-dimmed)] mb-4">Action suggérée</p>
                    <button onClick={() => {
                      let targetServiceId = '';
                      if (trendsData && trendsData.length > 0) {
                          const label = trendsData[0].label.toLowerCase();
                          if (label.includes('punaise')) targetServiceId = '3';
                          else if (label.includes('frelon') || label.includes('guêpe')) targetServiceId = '2';
                          else if (label.includes('rat') || label.includes('souris') || label.includes('rongeur')) targetServiceId = '1';
                          else if (label.includes('cafard') || label.includes('blatte')) targetServiceId = '4';
                          else if (label.includes('fourmi')) targetServiceId = '5';
                      }
                      setShowStudio({ mode: 'magique', autoStart: true, targetServiceId });
                    }} className="w-full py-3 bg-red-600 text-white rounded-xl text-[10px] font-black uppercase tracking-widest hover:scale-105 active:scale-95 transition-all">
                      Lancer le Radar IA Automatisé
                    </button>
                  </div>
                </div>
              </>
            )}

            {activeTab === 'blog' && (
              <BlogManager
                onOpenStudio={(mode) => setShowStudio(mode || true)}
                onEditArticle={(art) => setEditingArticle(art)}
                onNewArticle={(defaults) => { setEditingArticle(defaults || {}); }}
                searchQuery={searchQuery}
              />
            )}

            {activeTab === 'portfolio' && (
              <PortfolioTab
                projects={projects}
                searchQuery={searchQuery}
                onEdit={(proj) => { setEditingProject(proj); setShowProjectModal(true); }}
                onDelete={(id) => setProjects(prev => prev.filter(p => p.id !== id))}
                onNew={() => { setEditingProject(null); setShowProjectModal(true); }}
              />
            )}

            {activeTab === 'leads' && (
              <LeadManager />
            )}

            {activeTab === 'settings' && (
              <div className="max-w-4xl mx-auto pb-40">
                <div className="flex justify-between items-center mb-10 p-6 glass-card bg-white/5 border-white/5">
                  <div>
                    <h3 className="text-2xl font-black uppercase tracking-tighter">Configuration Système</h3>
                    <p className="text-[var(--text-dimmed)] text-[11px] font-bold uppercase tracking-widest mt-1 italic">Gestion centralisée des paramètres ESEND</p>
                  </div>
                  <AnimatePresence>
                    {saveStatus.id === 'global' && (
                      <motion.div
                        initial={{ opacity: 0, scale: 0.9, x: 20 }}
                        animate={{ opacity: 1, scale: 1, x: 0 }}
                        exit={{ opacity: 0, scale: 0.9, x: 20 }}
                        className="flex items-center gap-3 px-5 py-2 bg-green-500/10 border border-green-500/20 rounded-full"
                      >
                        <CheckCircle2 className="w-4 h-4 text-green-500" />
                        <span className="text-[10px] font-black text-green-500 uppercase tracking-widest">Réglages enregistrés</span>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </div>

                <div className="space-y-12">
                  {/* SECTIONS WRAPPED WITH MOTION */}
                  {[
                    {
                      id: 'coordination',
                      icon: Mail,
                      title: '1. Coordination & Contact',
                      color: 'text-red-600',
                      bg: 'bg-red-600/10',
                      content: (
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                          <div className="space-y-3">
                            <label className="block text-[10px] font-black uppercase text-[var(--text-dimmed)] tracking-widest text-left opacity-70">E-mail de réception des devis</label>
                            <input
                              type="email"
                              className="w-full bg-[var(--bg-input)] border border-[var(--border-subtle)] rounded-2xl px-5 py-4 text-sm focus:border-red-600/50 outline-none transition-all text-[var(--text-main)] shadow-inner"
                              value={localSettings.contact_email || ''}
                              onChange={(e) => setLocalSettings({ ...localSettings, contact_email: e.target.value })}
                              placeholder="contact@esendnuisibles.fr"
                            />
                          </div>
                          <div className="space-y-3">
                            <label className="block text-[10px] font-black uppercase text-[var(--text-dimmed)] tracking-widest text-left opacity-70">📞 Numéro de téléphone</label>
                            <input
                              type="tel"
                              className="w-full bg-[var(--bg-input)] border border-[var(--border-subtle)] rounded-2xl px-5 py-4 text-sm focus:border-red-600/50 outline-none transition-all text-[var(--text-main)] shadow-inner"
                              value={localSettings.company_phone || ''}
                              onChange={(e) => setLocalSettings({ ...localSettings, company_phone: e.target.value })}
                              placeholder="Ex: +33 6 XX XX XX XX"
                            />
                          </div>
                          <div className="space-y-3 md:col-span-2">
                            <label className="block text-[10px] font-black uppercase text-[var(--text-dimmed)] tracking-widest text-left opacity-70">📍 Adresse / Siège social</label>
                            <input
                              type="text"
                              className="w-full bg-[var(--bg-input)] border border-[var(--border-subtle)] rounded-2xl px-5 py-4 text-sm focus:border-red-600/50 outline-none transition-all text-[var(--text-main)] shadow-inner"
                              value={localSettings.company_address || ''}
                              onChange={(e) => setLocalSettings({ ...localSettings, company_address: e.target.value })}
                              placeholder="Ex: 12 Avenue de la Riviera, 06500 Menton"
                            />
                          </div>
                        </div>
                      )
                    },
                    {
                      id: 'visibility',
                      icon: Globe,
                      title: '2. Visibilité & Analytics',
                      color: 'text-blue-600',
                      bg: 'bg-blue-600/10',
                      content: (
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                          <div className="space-y-3">
                            <label className="block text-[10px] font-black uppercase text-[var(--text-dimmed)] tracking-widest text-left opacity-70">⭐ ID Avis Google (Automatiques)</label>
                            <input
                              type="text"
                              className="w-full bg-[var(--bg-input)] border border-[var(--border-subtle)] rounded-2xl px-5 py-4 text-sm focus:border-blue-600/50 outline-none transition-all text-[var(--text-main)] shadow-inner"
                              placeholder="Ex: ChIJ..."
                              value={localSettings.google_reviews_id || ''}
                              onChange={(e) => setLocalSettings({ ...localSettings, google_reviews_id: e.target.value })}
                            />
                          </div>
                          <div className="space-y-3">
                            <label className="block text-[10px] font-black uppercase text-[var(--text-dimmed)] tracking-widest text-left opacity-70">Google Analytics (Measurement ID)</label>
                            <input
                              type="text"
                              className="w-full bg-[var(--bg-input)] border border-[var(--border-subtle)] rounded-2xl px-5 py-4 text-sm focus:border-blue-600/50 outline-none transition-all text-[var(--text-main)] shadow-inner"
                              placeholder="G-XXXXXXXXXX"
                              value={localSettings.ga_id || ''}
                              onChange={(e) => setLocalSettings({ ...localSettings, ga_id: e.target.value })}
                            />
                          </div>
                        </div>
                      )
                    },
                    {
                      id: 'ai',
                      icon: Sparkles,
                      title: '3. Moteur IA (Gemini Pro)',
                      color: 'text-indigo-600',
                      bg: 'bg-indigo-600/10',
                      content: (
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                          <div className="space-y-3">
                            <label className="block text-[10px] font-black uppercase text-[var(--text-dimmed)] tracking-widest text-left opacity-70">Clé d'API Google AI Studio</label>
                            <input
                              type="password"
                              className="w-full bg-[var(--bg-input)] border border-[var(--border-subtle)] rounded-2xl px-5 py-4 text-sm font-mono focus:border-indigo-600/50 outline-none transition-all text-[var(--text-main)] shadow-inner"
                              placeholder="••••••••••••••••"
                              value={localSettings.gemini_api_key || ''}
                              onChange={(e) => setLocalSettings({ ...localSettings, gemini_api_key: e.target.value })}
                            />
                          </div>
                          <div className="space-y-3">
                            <label className="block text-[10px] font-black uppercase text-[var(--text-dimmed)] tracking-widest text-left opacity-70">Token API Apify (Live Trends)</label>
                            <input
                              type="password"
                              className="w-full bg-[var(--bg-input)] border border-[var(--border-subtle)] rounded-2xl px-5 py-4 text-sm font-mono focus:border-indigo-600/50 outline-none transition-all text-[var(--text-main)] shadow-inner"
                              placeholder="apify_api_..."
                              value={localSettings.apify_token || ''}
                              onChange={(e) => setLocalSettings({ ...localSettings, apify_token: e.target.value })}
                            />
                          </div>
                        </div>
                      )
                    },
                    {
                      id: 'company_profile',
                      icon: Building2,
                      title: '4. Profil & ADN ESEND',
                      color: 'text-emerald-600',
                      bg: 'bg-emerald-600/10',
                      content: (
                        <div className="space-y-6">
                          <div className="flex items-center gap-2 px-4 py-3 bg-emerald-500/5 border border-emerald-500/20 rounded-2xl text-[10px] font-black text-emerald-500 uppercase tracking-widest">
                            <Sparkles className="w-3.5 h-3.5" />
                            Ces infos sont utilisées par l'IA lors de la rédaction — jamais inventées, toujours factuelles.
                          </div>
                          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                            <div className="space-y-2">
                              <label className="block text-[10px] font-black uppercase text-[var(--text-dimmed)] tracking-widest opacity-70">Nom officiel</label>
                              <input type="text" className="w-full bg-[var(--bg-input)] border border-[var(--border-subtle)] rounded-2xl px-5 py-4 text-sm focus:border-emerald-600/50 outline-none transition-all text-[var(--text-main)] shadow-inner" placeholder="Ex: ESEND Nuisibles" value={localSettings.company_name || ''} onChange={(e) => setLocalSettings({ ...localSettings, company_name: e.target.value })} />
                            </div>
                            <div className="space-y-2">
                              <label className="block text-[10px] font-black uppercase text-[var(--text-dimmed)] tracking-widest opacity-70">Gérant / Fondateur</label>
                              <input type="text" className="w-full bg-[var(--bg-input)] border border-[var(--border-subtle)] rounded-2xl px-5 py-4 text-sm focus:border-emerald-600/50 outline-none transition-all text-[var(--text-main)] shadow-inner" placeholder="Ex: Jean Dupont" value={localSettings.company_manager || ''} onChange={(e) => setLocalSettings({ ...localSettings, company_manager: e.target.value })} />
                            </div>
                            <div className="space-y-2">
                              <label className="block text-[10px] font-black uppercase text-[var(--text-dimmed)] tracking-widest opacity-70">Année de création</label>
                              <input type="text" className="w-full bg-[var(--bg-input)] border border-[var(--border-subtle)] rounded-2xl px-5 py-4 text-sm focus:border-emerald-600/50 outline-none transition-all text-[var(--text-main)] shadow-inner" placeholder="Ex: 2018" value={localSettings.company_founded || ''} onChange={(e) => setLocalSettings({ ...localSettings, company_founded: e.target.value })} />
                            </div>
                            <div className="space-y-2">
                              <label className="block text-[10px] font-black uppercase text-[var(--text-dimmed)] tracking-widest opacity-70">Certifications</label>
                              <input type="text" className="w-full bg-[var(--bg-input)] border border-[var(--border-subtle)] rounded-2xl px-5 py-4 text-sm focus:border-emerald-600/50 outline-none transition-all text-[var(--text-main)] shadow-inner" placeholder="Ex: Certibiocide, QUALIBAT" value={localSettings.company_certifications || ''} onChange={(e) => setLocalSettings({ ...localSettings, company_certifications: e.target.value })} />
                            </div>
                            <div className="space-y-2 md:col-span-2">
                              <label className="block text-[10px] font-black uppercase text-[var(--text-dimmed)] tracking-widest opacity-70">Zones d'intervention</label>
                              <input type="text" className="w-full bg-[var(--bg-input)] border border-[var(--border-subtle)] rounded-2xl px-5 py-4 text-sm focus:border-emerald-600/50 outline-none transition-all text-[var(--text-main)] shadow-inner" placeholder="Ex: Menton, Monaco, Roquebrune, Nice, Côte d'Azur" value={localSettings.company_zones || ''} onChange={(e) => setLocalSettings({ ...localSettings, company_zones: e.target.value })} />
                            </div>
                            <div className="space-y-2 md:col-span-2">
                              <label className="block text-[10px] font-black uppercase text-[var(--text-dimmed)] tracking-widest opacity-70">Points forts (différenciateurs)</label>
                              <input type="text" className="w-full bg-[var(--bg-input)] border border-[var(--border-subtle)] rounded-2xl px-5 py-4 text-sm focus:border-emerald-600/50 outline-none transition-all text-[var(--text-main)] shadow-inner" placeholder="Ex: Intervention 24h, discrétion, méthodes biologiques" value={localSettings.company_strengths || ''} onChange={(e) => setLocalSettings({ ...localSettings, company_strengths: e.target.value })} />
                            </div>
                            <div className="space-y-2 md:col-span-2">
                              <label className="block text-[10px] font-black uppercase text-[var(--text-dimmed)] tracking-widest opacity-70">Bio / Pitch éditorial (ce que l'IA peut mentionner)</label>
                              <textarea rows={5} className="w-full bg-[var(--bg-input)] border border-[var(--border-subtle)] rounded-2xl px-5 py-4 text-sm focus:border-emerald-600/50 outline-none transition-all text-[var(--text-main)] shadow-inner resize-none" placeholder="Décrivez librement ESEND : histoire, valeurs, approche, clients types, anecdotes... L'IA s'en servira de façon naturelle et appropriée." value={localSettings.company_bio || ''} onChange={(e) => setLocalSettings({ ...localSettings, company_bio: e.target.value })} />
                            </div>
                          </div>
                        </div>
                      )
                    }
                  ].map((section, idx) => (
                    <motion.div
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: idx * 0.1 }}
                      key={section.id}
                      className="glass-card bg-[var(--bg-secondary)] border-[var(--border-subtle)] p-8 hover:border-[var(--border-strong)] transition-all"
                    >
                      <div className={`flex items-center gap-4 ${section.color} font-black uppercase text-[12px] mb-8 tracking-wider`}>
                        <div className={`p-2.5 ${section.bg} rounded-xl shadow-lg`}><section.icon className="w-5 h-5" /></div>
                        {section.title}
                      </div>
                      <div className="pl-0 md:pl-14">
                        {section.content}
                      </div>
                    </motion.div>
                  ))}

                  {/* SECURITY SECTION */}
                  <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.3 }}
                    className="glass-card bg-zinc-600/5 border-zinc-600/10 p-10 group hover:border-zinc-500/30 transition-all duration-500"
                  >
                    <div className="flex items-center gap-4 text-zinc-500 font-black uppercase text-[12px] mb-10 tracking-wider">
                      <div className="p-2.5 bg-zinc-600/10 rounded-xl group-hover:scale-110 transition-transform"><Key className="w-5 h-5" /></div>
                      Sécurité : Accès Admin
                    </div>

                    <form onSubmit={async (e) => {
                      e.preventDefault();
                      const res = await api.changePassword(e.target.current.value, e.target.next.value);
                      if (res.success) {
                        setSaveStatus({ id: 'admin', type: 'success' });
                        setTimeout(() => setSaveStatus({ id: null, type: '' }), 3000);
                        e.target.reset();
                      } else {
                        alert(res.message);
                      }
                    }} className="space-y-8 pl-0 md:pl-14">
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        <div className="space-y-2">
                          <label className="block text-[10px] font-bold uppercase text-[var(--text-dimmed)] tracking-widest pl-2">Ancien mot de passe</label>
                          <input
                            name="current"
                            type="password"
                            className="w-full bg-[var(--bg-input)] border border-[var(--border-subtle)] rounded-xl px-5 py-4 text-sm outline-none focus:border-red-600/50 transition-all text-[var(--text-main)]"
                          />
                        </div>
                        <div className="hidden md:block" />
                        <div className="space-y-2">
                          <label className="block text-[10px] font-bold uppercase text-[var(--text-dimmed)] tracking-widest pl-2">Nouveau mot de passe</label>
                          <input
                            name="next"
                            type="password"
                            className="w-full bg-[var(--bg-input)] border border-[var(--border-subtle)] rounded-xl px-5 py-4 text-sm outline-none focus:border-red-600/50 transition-all text-[var(--text-main)]"
                          />
                        </div>
                        <div className="space-y-2">
                          <label className="block text-[10px] font-bold uppercase text-[var(--text-dimmed)] tracking-widest pl-2">Confirmer le nouveau</label>
                          <input
                            name="confirm"
                            type="password"
                            className="w-full bg-[var(--bg-input)] border border-[var(--border-subtle)] rounded-xl px-5 py-4 text-sm outline-none focus:border-red-600/50 transition-all text-[var(--text-main)]"
                          />
                        </div>
                      </div>
                      <div className="flex items-center gap-6">
                        <button className="flex items-center justify-center gap-3 px-8 py-4 bg-white text-black rounded-2xl font-black uppercase text-[10px] tracking-widest hover:bg-zinc-200 transition-all active:scale-95 shadow-xl">
                          <Key className="w-4 h-4" /> Mettre à jour l'accès
                        </button>
                        {saveStatus.id === 'admin' && (
                          <p className="text-[10px] font-black text-green-500 uppercase tracking-widest animate-pulse">Succès !</p>
                        )}
                      </div>
                    </form>
                  </motion.div>
                </div>

                {/* STICKY GLOBAL SAVE BAR */}
                <div className={`fixed bottom-8 left-0 right-0 z-50 flex justify-center pointer-events-none transition-all duration-300 max-lg:px-4 max-lg:pl-0 ${isSidebarCollapsed ? 'lg:pl-[80px]' : 'lg:pl-[280px]'}`}>
                  <motion.div
                    initial={{ y: 100 }}
                    animate={{ y: 0 }}
                    className="pointer-events-auto w-full sm:w-auto"
                  >
                    <button
                      onClick={handleUpdateSettings}
                      className="flex items-center justify-center gap-4 bg-red-600 text-white px-8 sm:px-12 py-5 w-full sm:w-auto rounded-xl sm:rounded-full font-black uppercase tracking-widest text-[10px] sm:text-[11px] hover:bg-red-700 transition-all shadow-[0_20px_50px_rgba(220,38,38,0.3)] hover:shadow-[0_25px_60px_rgba(220,38,38,0.4)] active:scale-95 disabled:opacity-50 disabled:cursor-not-allowed border border-white/10"
                      disabled={loading}
                    >
                      {loading ? (
                        <div className="w-5 h-5 border-3 border-white/30 border-t-white rounded-full animate-spin" />
                      ) : (
                        <Save className="w-5 h-5" />
                      )}
                      {loading ? "Traitement..." : "Sauvegarder tout les réglages"}
                    </button>
                  </motion.div>
                </div>
              </div>
            )}
          </>
        )}
      </main>

      {editingArticle && (
        <ArticleModal
          article={editingArticle?.id ? editingArticle : null}
          onClose={() => setEditingArticle(null)}
          onSave={(savedArticle) => {
            // Mise à jour optimiste — évite un rechargement complet
            if (savedArticle?.id) {
              setArticles(prev => {
                const idx = prev.findIndex(a => a.id === savedArticle.id);
                if (idx >= 0) {
                  const next = [...prev];
                  next[idx] = { ...prev[idx], ...savedArticle };
                  return next;
                }
                return [savedArticle, ...prev];
              });
            } else {
              loadData(); // Nouvel article : rechargement nécessaire pour récupérer l'ID
            }
            setEditingArticle(null);
          }}
          onDelete={(id) => {
            setArticles(prev => prev.filter(a => a.id !== id));
            setEditingArticle(null);
          }}
          services={SERVICES}
        />
      )}

      {showProjectModal && (
        <ProjectModal
          project={editingProject}
          onClose={() => setShowProjectModal(false)}
          onSave={async () => {
            await loadData();
            setShowProjectModal(false);
          }}
          onDelete={(id) => {
            setProjects(prev => prev.filter(p => p.id !== id));
            setShowProjectModal(false);
          }}
        />
      )}
    </div>
  );
};

export default Dashboard;
