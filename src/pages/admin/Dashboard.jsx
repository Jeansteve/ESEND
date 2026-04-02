// src/pages/admin/Dashboard.jsx
import React, { useState, useEffect } from 'react';
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
  TrendingUp,
  Users,
  Eye,
  FileText,
  Mail,
  Globe,
  Key
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
    setLoading(false);
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
          <div className="text-2xl font-black italic tracking-tighter">Gemini v1.5</div>
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
    <div className="admin-container flex min-h-screen bg-[var(--bg-primary)] text-[var(--text-main)] transition-colors duration-400">
      {/* Sidebar */}
      <aside className="admin-sidebar sticky top-0 h-screen overflow-hidden flex-shrink-0 bg-[var(--bg-secondary)] border-r border-[var(--border-subtle)]">
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
                  className="admin-search bg-[var(--bg-secondary)] border-[var(--border-subtle)] text-[var(--text-main)]"
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
            
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
              <div className="glass-card">
                <div className="flex justify-between items-center mb-8">
                  <h3 className="text-xl font-black uppercase tracking-tighter">Émissions Récentes</h3>
                  <TrendingUp className="w-5 h-5 text-red-600" />
                </div>
                <div className="space-y-6">
                  {articles.slice(0, 4).map((art, i) => (
                    <div 
                      key={i} 
                      onClick={() => setEditingArticle(art)}
                      className="flex justify-between items-center group cursor-pointer border-b border-white/5 pb-4 last:border-0 last:pb-0"
                    >
                      <div className="flex items-center gap-4">
                        <div className="w-12 h-12 rounded-xl bg-zinc-800 flex items-center justify-center overflow-hidden border border-white/5">
                           <img src={art.image} className="w-full h-full object-cover grayscale opacity-50 group-hover:opacity-100 group-hover:grayscale-0 transition-all" />
                        </div>
                        <div>
                          <div className="text-xs font-black uppercase tracking-tight group-hover:text-red-600 transition-colors line-clamp-1">{art.title}</div>
                          <div className="text-[var(--text-dimmed)] text-[10px] font-bold uppercase tracking-widest mt-0.5">{art.date} — {art.category}</div>
                        </div>
                      </div>
                      <ChevronRight className="w-4 h-4 text-zinc-600 group-hover:text-red-600 transition-all transform group-hover:translate-x-1" />
                    </div>
                  ))}
                </div>
              </div>

              <div className="glass-card bg-gradient-to-br from-red-600/10 to-blue-600/10 border-red-600/20 flex flex-col justify-between ai-pulse">
                <div>
                  <div className="flex items-center gap-3 text-red-600 font-black uppercase tracking-widest text-[9px] mb-6">
                    <Sparkles className="w-4 h-4" /> Moteur IA Actif — Gemini Pro
                  </div>
                  <h3 className="text-4xl font-black uppercase tracking-tighter mb-4 leading-none">
                    Studio de <span className="text-red-600 italic">Création</span>
                  </h3>
                  <p className="text-[var(--text-dimmed)] text-sm leading-relaxed mb-10 font-medium">
                    Optimisez votre SEO local sur Menton et Monaco en générant des articles d'expertise en un clic.
                  </p>
                </div>
                <button 
                  onClick={() => { setActiveTab('blog'); setShowStudio(true); }}
                  className="w-full bg-white text-black py-4 rounded-xl font-black uppercase tracking-widest text-[10px] hover:bg-red-600 hover:text-white transition-all shadow-2xl active:scale-95"
                >
                  Lancer le Studio de Rédaction
                </button>
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
          <div className="max-w-4xl mx-auto space-y-8 pb-32">
             <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                {/* 1. Coordination & Contact */}
                <div className="glass-card border-red-600/20 bg-red-600/5 p-8">
                   <div className="flex items-center gap-4 text-red-600 mb-8">
                      <div className="p-3 bg-red-600/10 rounded-xl"><Mail className="w-5 h-5" /></div>
                      <h3 className="text-xl font-black uppercase tracking-tighter">Coordination</h3>
                   </div>
                   
                   <div className="space-y-6">
                      <div>
                         <label className="block text-[9px] font-black uppercase text-zinc-500 mb-2 tracking-widest text-left">E-mail de réception des devis</label>
                         <input 
                            type="email" 
                            className="w-full bg-black/40 border border-white/5 rounded-xl px-4 py-3 text-sm focus:border-red-600/50 outline-none transition-all"
                            defaultValue={settings.contact_email}
                            onBlur={async (e) => {
                               const sets = await api.getSettings();
                               await api.updateSettings({ ...sets, contact_email: e.target.value });
                               alert("Email de contact mis à jour");
                            }}
                         />
                      </div>
                   </div>
                </div>

                {/* 2. Visibilité & Marketing */}
                <div className="glass-card border-blue-600/20 bg-blue-600/5 p-8">
                   <div className="flex items-center gap-4 text-blue-600 mb-8">
                      <div className="p-3 bg-blue-600/10 rounded-xl"><Globe className="w-5 h-5" /></div>
                      <h3 className="text-xl font-black uppercase tracking-tighter">Visibilité Web</h3>
                   </div>
                   
                   <div className="space-y-6">
                      <div>
                         <label className="block text-[9px] font-black uppercase text-zinc-500 mb-2 tracking-widest text-left">⭐ ID Avis Google (Automatiques)</label>
                         <input 
                            type="text" 
                            className="w-full bg-black/40 border border-white/5 rounded-xl px-4 py-3 text-sm focus:border-blue-600/50 outline-none transition-all"
                            placeholder="Place ID Google"
                            defaultValue={settings.google_reviews_id}
                            onBlur={async (e) => {
                               const sets = await api.getSettings();
                               await api.updateSettings({ ...sets, google_reviews_id: e.target.value });
                            }}
                         />
                      </div>
                      <div>
                         <label className="block text-[9px] font-black uppercase text-zinc-500 mb-2 tracking-widest text-left">Google Analytics (Measurement ID)</label>
                         <input 
                            type="text" 
                            className="w-full bg-black/40 border border-white/5 rounded-xl px-4 py-3 text-sm focus:border-blue-600/50 outline-none transition-all"
                            placeholder="G-XXXXXXXXXX"
                            defaultValue={settings.ga_id}
                            onBlur={async (e) => {
                               const sets = await api.getSettings();
                               await api.updateSettings({ ...sets, ga_id: e.target.value });
                            }}
                         />
                      </div>
                   </div>
                </div>

                {/* 3. Moteur IA Intelligence */}
                <div className="glass-card border-indigo-600/20 bg-indigo-600/5 p-8">
                   <div className="flex items-center gap-4 text-indigo-600 mb-8">
                      <div className="p-3 bg-indigo-600/10 rounded-xl"><Sparkles className="w-5 h-5" /></div>
                      <h3 className="text-xl font-black uppercase tracking-tighter">Intelligence Artificielle</h3>
                   </div>
                   
                   <div className="space-y-6">
                      <div>
                         <label className="block text-[9px] font-black uppercase text-zinc-500 mb-2 tracking-widest text-left">Google AI Studio (Gemini Pro)</label>
                         <input 
                            type="password" 
                            className="w-full bg-black/40 border border-white/5 rounded-xl px-4 py-3 text-sm font-mono focus:border-indigo-600/50 outline-none transition-all"
                            placeholder="••••••••••••••••"
                            defaultValue={settings.gemini_api_key}
                            onBlur={async (e) => {
                               const sets = await api.getSettings();
                               await api.updateSettings({ ...sets, gemini_api_key: e.target.value });
                            }}
                         />
                      </div>
                   </div>
                </div>

                {/* 4. Sécurité Compte */}
                <div className="glass-card border-zinc-600/20 bg-zinc-600/5 p-8">
                   <div className="flex items-center gap-4 text-zinc-400 mb-8">
                      <div className="p-3 bg-zinc-600/10 rounded-xl"><Key className="w-5 h-5" /></div>
                      <h3 className="text-xl font-black uppercase tracking-tighter">Accès Admin</h3>
                   </div>
                   
                   <form className="space-y-4" onSubmit={async (e) => {
                      e.preventDefault();
                      const formData = new FormData(e.target);
                      const current = formData.get('current');
                      const next = formData.get('next');
                      const confirm = formData.get('confirm');

                      const sets = await api.getSettings();
                      if (current !== sets.admin_password) return alert("Ancien mot de passe incorrect");
                      if (next !== confirm) return alert("Les nouveaux mots de passe ne correspondent pas");
                      
                      await api.updateSettings({ ...sets, admin_password: next });
                      alert("Mot de passe mis à jour !");
                      e.target.reset();
                   }}>
                      <input 
                        name="current"
                        type="password" 
                        placeholder="Ancien mot de passe"
                        className="w-full bg-black/40 border border-white/5 rounded-xl px-4 py-3 text-xs outline-none focus:border-white/20 transition-all"
                      />
                      <input 
                        name="next"
                        type="password" 
                        placeholder="Nouveau mot de passe"
                        className="w-full bg-black/40 border border-white/5 rounded-xl px-4 py-3 text-xs outline-none focus:border-white/20 transition-all"
                      />
                      <input 
                        name="confirm"
                        type="password" 
                        placeholder="Confirmer le nouveau"
                        className="w-full bg-black/40 border border-white/5 rounded-xl px-4 py-3 text-xs outline-none focus:border-white/20 transition-all"
                      />
                      <button className="w-full bg-white text-black py-3 rounded-xl font-black uppercase text-[9px] tracking-widest hover:bg-red-600 hover:text-white transition-all">
                         Changer le mot de passe
                      </button>
                   </form>
                </div>
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
