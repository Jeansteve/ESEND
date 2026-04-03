// src/pages/admin/Dashboard.jsx
import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import ThemeToggle from '../../components/UI/ThemeToggle';
import { 
  BarChart3, 
  BookOpen, 
  Briefcase, 
  Settings, 
  LogOut, 
  Plus, 
  Search, 
  Sparkles, 
  ChevronRight,
  ArrowRight,
  TrendingUp,
  Users,
  User,
  Eye,
  FileText,
  Mail,
  Globe,
  Key,
  Layout,
  Zap,
  CheckCircle2,
  MapPin,
  Save
} from 'lucide-react';
import { api } from '../../lib/api';
import BlogManager from '../../components/Admin/BlogManager';
import CreationStudio from '../../components/Admin/CreationStudio';
import ProjectModal from '../../components/Admin/ProjectModal';
import ArticleModal from '../../components/Admin/ArticleModal';
import './AdminPanel.css';

const Dashboard = () => {
  const [activeTab, setActiveTab] = useState('dashboard');
  const [articles, setArticles] = useState([]);
  const [projects, setProjects] = useState([]);
  const [settings, setSettings] = useState({});
  const [localSettings, setLocalSettings] = useState({});
  const [saveStatus, setSaveStatus] = useState({ id: null, type: '' }); // { id: 'coordination', type: 'success' }
  const [searchQuery, setSearchQuery] = useState('');
  const [loading, setLoading] = useState(true);
  
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
    const [arts, projs, sets] = await Promise.all([
      api.getArticles(),
      api.getProjects(),
      api.getSettings()
    ]);
    setArticles(arts);
    setProjects(projs);
    setSettings(sets);
    setLocalSettings(sets);
    setLoading(false);
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

  const renderStats = () => (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-12">
      <div className="glass-card flex flex-col gap-4">
        <div className="flex justify-between items-start">
          <div className="p-3 bg-red-600/10 rounded-xl border border-red-600/20">
            <Eye className="w-5 h-5 text-red-600" />
          </div>
          <span className="text-[10px] font-black text-green-500 bg-green-500/10 px-2 py-1 rounded-lg">+12%</span>
        </div>
        <div>
          <div className="text-2xl font-black italic tracking-tighter">1,284</div>
          <div className="text-[var(--text-dimmed)] text-[10px] font-bold uppercase tracking-widest mt-1">Vues Articles</div>
        </div>
      </div>

      <div className="glass-card flex flex-col gap-4">
        <div className="flex justify-between items-start">
          <div className="p-3 bg-blue-600/10 rounded-xl border border-blue-600/20">
            <Briefcase className="w-5 h-5 text-blue-600" />
          </div>
          <span className="text-[10px] font-black text-zinc-500 bg-white/5 px-2 py-1 rounded-lg">Stale</span>
        </div>
        <div>
          <div className="text-2xl font-black italic tracking-tighter">{projects.length}</div>
          <div className="text-[var(--text-dimmed)] text-[10px] font-bold uppercase tracking-widest mt-1">Interventions</div>
        </div>
      </div>

      <div className="glass-card flex flex-col gap-4">
        <div className="flex justify-between items-start">
          <div className="p-3 bg-indigo-600/10 rounded-xl border border-indigo-600/20">
            <FileText className="w-5 h-5 text-indigo-600" />
          </div>
          <span className="text-[10px] font-black text-green-500 bg-green-500/10 px-2 py-1 rounded-lg">+3</span>
        </div>
        <div>
          <div className="text-2xl font-black italic tracking-tighter">{articles.length}</div>
          <div className="text-[var(--text-dimmed)] text-[10px] font-bold uppercase tracking-widest mt-1">Dossiers Expert</div>
        </div>
      </div>

      <div className="glass-card flex flex-col gap-4">
        <div className="flex justify-between items-start">
          <div className="p-3 bg-amber-600/10 rounded-xl border border-amber-600/20">
            <Sparkles className="w-5 h-5 text-amber-600" />
          </div>
          <span className="text-[10px] font-black text-amber-600 bg-amber-600/10 px-2 py-1 rounded-lg">AI Ready</span>
        </div>
        <div>
          <div className="text-2xl font-black italic tracking-tighter">Gemini v3</div>
          <div className="text-[var(--text-dimmed)] text-[10px] font-bold uppercase tracking-widest mt-1">Moteur de Rédaction</div>
        </div>
      </div>
    </div>
  );

  if (loading) return (
    <div className="min-h-screen bg-[var(--bg-primary)] flex items-center justify-center transition-colors duration-400">
       <div className="w-12 h-12 border-2 border-red-600 border-t-transparent rounded-full animate-spin" />
    </div>
  );

  return (
    <div className="admin-container bg-[var(--bg-primary)]">
      {/* Sidebar */}
      <aside className="admin-sidebar bg-[var(--bg-secondary)] border-r border-[var(--border-subtle)]">
        <div className="sidebar-logo text-[var(--text-main)]">
          ESEND <span className="text-red-600 font-black">ADMIN</span>
        </div>

        <nav className="flex-grow space-y-2">
          <div 
            onClick={() => setActiveTab('dashboard')}
            className={`nav-item ${activeTab === 'dashboard' ? 'active' : ''}`}
          >
            <BarChart3 className="w-4 h-4" /> Dashboard
          </div>
          <div 
            onClick={() => setActiveTab('blog')}
            className={`nav-item ${activeTab === 'blog' ? 'active' : ''}`}
          >
            <BookOpen className="w-4 h-4" /> Journal Expert
          </div>
          <div 
            onClick={() => setActiveTab('portfolio')}
            className={`nav-item ${activeTab === 'portfolio' ? 'active' : ''}`}
          >
            <Briefcase className="w-4 h-4" /> Réalisations
          </div>
          <div 
            onClick={() => setActiveTab('settings')}
            className={`nav-item ${activeTab === 'settings' ? 'active' : ''}`}
          >
            <Settings className="w-4 h-4" /> Paramètres
          </div>
        </nav>

        <div 
          onClick={handleLogout}
          className="nav-item text-zinc-500 hover:text-red-600 mt-auto border-t border-[var(--border-subtle)] pt-4"
        >
          <LogOut className="w-4 h-4" /> Quitter
        </div>
      </aside>

      {/* Main Content */}
      <main className="admin-main bg-[var(--bg-primary)]">
        {/* Header */}
        <header className="flex justify-between items-center mb-16">
          <div>
            <h2 className="text-4xl font-black tracking-tighter uppercase mb-2 text-[var(--text-main)]">
              Statut <span className="text-red-600 italic">Opérationnel</span>
            </h2>
            <p className="text-[var(--text-dimmed)] font-medium text-xs italic tracking-widest uppercase border-l border-red-600 pl-4">
              {activeTab === 'dashboard' && "Vue d'ensemble du site ESEND"}
              {activeTab === 'blog' && "Gestion des dossiers tactiques et expertise"}
              {activeTab === 'portfolio' && "Mise en avant de vos interventions terrain"}
              {activeTab === 'settings' && "Configuration des services et IA"}
            </p>
          </div>

          <div className="flex items-center gap-6">
            <ThemeToggle />
            
            {activeTab !== 'settings' && (
              <div className="relative group">
                <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-[var(--text-dimmed)] group-focus-within:text-red-600 transition-colors" />
                <input 
                  type="text" 
                  placeholder="Rechercher..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="admin-search bg-[var(--bg-input)] border-[var(--border-subtle)] text-[var(--text-main)] placeholder:text-[var(--text-dimmed)]"
                />
              </div>
            )}
            
            <button 
              onClick={() => {
                if (activeTab === 'blog') setShowStudio(true);
                else { setEditingProject(null); setShowProjectModal(true); }
              }}
              className="flex items-center gap-3 bg-red-600 text-white px-6 py-4 rounded-xl font-black uppercase tracking-widest text-[10px] hover:bg-red-700 transition-all shadow-xl shadow-red-600/10 active:scale-95"
            >
              <Plus className="w-4 h-4" /> {activeTab === 'blog' ? 'Nouveau Dossier' : 'Nouvelle Réalisation'}
            </button>
          </div>
        </header>

        {/* Content Area */}
        {activeTab === 'dashboard' && (
          <>
            {renderStats()}
            
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 mt-12">
              <div className="glass-card bg-[var(--bg-secondary)] border-[var(--border-subtle)]">
                <div className="flex justify-between items-center mb-8">
                  <h3 className="text-xl font-black uppercase tracking-tighter">Émissions Récentes</h3>
                  <TrendingUp className="w-5 h-5 text-red-600" />
                </div>
                <div className="space-y-6">
                  {articles.slice(0, 4).map((art, i) => (
                    <div 
                      key={i} 
                      onClick={() => setEditingArticle(art)}
                      className="flex justify-between items-center group cursor-pointer border-b border-[var(--border-subtle)] pb-4 last:border-0 last:pb-0"
                    >
                      <div className="flex items-center gap-4">
                        <div className="w-12 h-12 rounded-xl bg-[var(--bg-input)] flex items-center justify-center overflow-hidden border border-[var(--border-subtle)]">
                           <img src={art.image} className="w-full h-full object-cover grayscale opacity-50 group-hover:opacity-100 group-hover:grayscale-0 transition-all" />
                        </div>
                        <div>
                          <p className="text-[10px] text-[var(--text-dimmed)] uppercase font-black tracking-widest group-hover:text-amber-500 transition-colors">{art.category}</p>
                          <h5 className="text-[11px] font-bold text-[var(--text-main)] transition-colors">{art.title}</h5>
                        </div>
                      </div>
                      <div className="flex items-center gap-4 text-[10px] font-black uppercase tracking-widest text-[var(--text-dimmed)]">
                        {art.date}
                        <ArrowRight className="w-3.5 h-3.5 opacity-0 group-hover:opacity-100 group-hover:translate-x-1 transition-all" />
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              <div className="glass-card bg-[var(--bg-secondary)] border-[var(--border-subtle)] p-8">
                <h4 className="flex items-center gap-3 text-sm font-black uppercase tracking-widest text-[var(--text-main)] mb-8">
                  <CheckCircle2 className="w-4 h-4 text-green-500" /> Quick Actions
                </h4>
                <div className="grid grid-cols-1 gap-4">
                  {[
                    { label: 'Nouveau Dossier', icon: Plus, color: 'bg-red-600' },
                    { label: 'Maillage Interne', icon: Search, color: 'bg-indigo-600' },
                    { label: 'Rapport Sécurité', icon: Layout, color: 'bg-blue-600' },
                    { label: 'Radar Punaise IA', icon: Zap, color: 'bg-amber-600' }
                  ].map((act, i) => (
                    <button key={i} className="flex items-center gap-4 p-4 rounded-xl bg-[var(--bg-input)] border border-[var(--border-subtle)] hover:scale-[1.02] active:scale-95 transition-all text-left">
                       <div className={`p-2.5 rounded-lg ${act.color} text-white`}>
                          <act.icon className="w-4 h-4" />
                       </div>
                       <span className="text-[11px] font-black uppercase tracking-widest text-[var(--text-main)]">{act.label}</span>
                    </button>
                  ))}
                </div>
              </div>
            </div>
          </>
        )}

        {activeTab === 'blog' && (
          <BlogManager 
            onOpenStudio={() => setShowStudio(true)} 
            onEditArticle={(art) => setEditingArticle(art)}
            searchQuery={searchQuery}
          />
        )}

        {activeTab === 'portfolio' && (
          <div className="space-y-8">
             <div className="flex justify-between items-center bg-[var(--bg-card)] p-6 rounded-2xl border border-[var(--border-subtle)]">
                <div>
                   <h3 className="text-xl font-black uppercase tracking-tighter">Gestion des réalisations</h3>
                   <p className="text-[var(--text-dimmed)] text-[10px] font-bold uppercase tracking-widest">Archives des interventions sur la Riviera</p>
                </div>
             </div>

             <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
                {projects.filter(p => {
                    if (!searchQuery) return true;
                    const query = searchQuery.toLowerCase();
                    return p.title.toLowerCase().includes(query) || 
                           p.location.toLowerCase().includes(query) || 
                           p.tag?.toLowerCase().includes(query);
                }).map((proj) => (
                  <div key={proj.id} className="glass-card group flex flex-col">
                     <div className="aspect-video rounded-xl overflow-hidden mb-6 relative">
                        <img src={proj.img} className="w-full h-full object-cover grayscale group-hover:grayscale-0 transition-all border border-white/5" />
                        <div className="absolute top-3 left-3 bg-black/60 backdrop-blur-md px-2 py-1 rounded text-[9px] font-black uppercase tracking-widest border border-white/10 group-hover:bg-red-600 group-hover:border-red-600 transition-colors">
                           {proj.tag}
                        </div>
                     </div>
                     <h4 className="text-sm font-black uppercase tracking-tight mb-2 group-hover:text-red-600 transition-colors">{proj.title}</h4>
                     <p className="text-[var(--text-dimmed)] text-[10px] font-bold uppercase tracking-widest mb-6">{proj.location}</p>
                     
                     <div className="mt-auto flex justify-end gap-2 border-t border-white/5 pt-4">
                        <button 
                          onClick={() => { setEditingProject(proj); setShowProjectModal(true); }}
                          className="p-2 text-zinc-500 hover:text-white bg-white/5 rounded-lg border border-white/5 transition-all"
                        >
                           <Search className="w-3.5 h-3.5" />
                        </button>
                     </div>
                  </div>
                ))}
              </div>
           </div>
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
                    <div className="max-w-md space-y-3">
                      <label className="block text-[10px] font-black uppercase text-[var(--text-dimmed)] tracking-widest text-left opacity-70">Clé d'API Google AI Studio</label>
                      <input 
                         type="password" 
                         className="w-full bg-[var(--bg-input)] border border-[var(--border-subtle)] rounded-2xl px-5 py-4 text-sm font-mono focus:border-indigo-600/50 outline-none transition-all text-[var(--text-main)] shadow-inner"
                         placeholder="••••••••••••••••"
                         value={localSettings.gemini_api_key || ''}
                         onChange={(e) => setLocalSettings({ ...localSettings, gemini_api_key: e.target.value })}
                      />
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
            <div className="fixed bottom-8 left-[300px] right-24 z-50 flex justify-center pointer-events-none">
              <motion.div 
                initial={{ y: 100 }}
                animate={{ y: 0 }}
                className="pointer-events-auto"
              >
                <button 
                   onClick={handleUpdateSettings}
                   className="flex items-center gap-4 bg-red-600 text-white px-12 py-5 rounded-full font-black uppercase tracking-widest text-[11px] hover:bg-red-700 transition-all shadow-[0_20px_50px_rgba(220,38,38,0.3)] hover:shadow-[0_25px_60px_rgba(220,38,38,0.4)] active:scale-95 disabled:opacity-50 disabled:cursor-not-allowed border border-white/10"
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

      </main>

      {/* --- OVERLAYS & MODALS --- */}
      {showStudio && (
        <div className="fixed inset-0 z-[150] bg-slate-950/80 backdrop-blur-3xl flex items-center justify-center p-12 animate-in fade-in duration-500">
           <div className="w-full max-w-7xl h-full">
              <CreationStudio 
                onClose={() => setShowStudio(false)} 
                onSuccess={(newArt) => {
                  setArticles([newArt, ...articles]);
                  setEditingArticle(newArt);
                  setShowStudio(false);
                }}
              />
           </div>
        </div>
      )}

      {editingArticle && (
        <ArticleModal 
          article={editingArticle}
          onClose={() => setEditingArticle(null)}
          onSave={async (res) => {
            await loadData();
            setEditingArticle(null);
          }}
        />
      )}

      {showProjectModal && (
        <ProjectModal 
          project={editingProject}
          onClose={() => setShowProjectModal(false)}
          onSave={async (res) => {
            await loadData();
            setShowProjectModal(false);
          }}
        />
      )}
    </div>
  );
};

export default Dashboard;
