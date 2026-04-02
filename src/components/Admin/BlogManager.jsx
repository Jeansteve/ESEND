// src/components/Admin/BlogManager.jsx
import React, { useState, useEffect } from 'react';
import { 
  Plus, 
  Trash2, 
  Edit3, 
  Eye, 
  Sparkles, 
  Search,
  Filter,
  Calendar,
  Tag
} from 'lucide-react';
import { api } from '../../lib/api';

const BlogManager = ({ onOpenStudio, onEditArticle, searchQuery }) => {
  const [articles, setArticles] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    loadArticles();
  }, []);

  const loadArticles = async () => {
    setLoading(true);
    const data = await api.getArticles();
    setArticles(data);
    setLoading(false);
  };

  const handleDelete = async (id) => {
    if (window.confirm("Voulez-vous vraiment supprimer ce dossier d'expertise ?")) {
      await api.deleteArticle(id);
      loadArticles();
    }
  };

  const filteredArticles = articles.filter(a => {
    if (!searchQuery) return true;
    const query = searchQuery.toLowerCase();
    return a.title.toLowerCase().includes(query) || 
           a.category.toLowerCase().includes(query) ||
           a.excerpt?.toLowerCase().includes(query);
  });

  return (
    <div className="space-y-8 animate-in fade-in duration-700">
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-6">
        <div>
          <h3 className="text-2xl font-black uppercase tracking-tighter">Le Journal de l'Expert</h3>
          <p className="text-[var(--text-dimmed)] text-[10px] font-bold uppercase tracking-widest mt-1">
            Gérez vos contenus SEO et l'intelligence artificielle
          </p>
        </div>
        
        <div className="flex gap-3 w-full md:w-auto">
          <button 
            onClick={onOpenStudio}
            className="flex items-center gap-2 bg-gradient-to-r from-red-600 to-blue-600 text-white px-5 py-3 rounded-xl font-black uppercase tracking-widest text-[10px] hover:scale-105 transition-all shadow-lg active:scale-95"
          >
            <Sparkles className="w-3.5 h-3.5" /> Studio IA
          </button>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
        {filteredArticles.map((article) => (
          <div 
            key={article.id} 
            className="glass-card group relative overflow-hidden flex flex-col h-full bg-[var(--bg-secondary)] border-[var(--border-subtle)]"
          >
            <div className="relative aspect-video rounded-xl overflow-hidden mb-6 border border-[var(--border-subtle)]">
              <img src={article.image} alt={article.title} className="w-full h-full object-cover grayscale transition-all duration-700 group-hover:grayscale-0 group-hover:scale-110" />
              <div className="absolute inset-0 bg-gradient-to-t from-[var(--bg-primary)]/80 via-transparent to-transparent" />
              <div className="absolute top-3 left-3 bg-red-600 text-white text-[9px] font-black px-2 py-1 rounded-md uppercase tracking-wider">
                {article.category}
              </div>
            </div>

            <h4 className="text-sm font-black uppercase tracking-tight mb-3 group-hover:text-red-600 transition-colors line-clamp-2">
              {article.title}
            </h4>
            
            <p className="text-[var(--text-dimmed)] text-[11px] leading-relaxed mb-6 line-clamp-3">
              {article.excerpt}
            </p>

            <div className="mt-auto pt-6 border-t border-[var(--border-subtle)] flex items-center justify-between">
              <div className="flex items-center gap-4">
                 <div className="flex items-center gap-1.5 text-[var(--text-dimmed)] text-[9px] font-black uppercase tracking-widest">
                    <Calendar className="w-3 h-3" /> {article.date}
                 </div>
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
                  onClick={() => handleDelete(article.id)}
                  className="p-2.5 rounded-lg bg-red-600/5 text-red-500/50 hover:text-red-500 hover:bg-red-600/10 transition-all border border-red-600/10"
                  title="Supprimer"
                >
                  <Trash2 className="w-3.5 h-3.5" />
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>

      {filteredArticles.length === 0 && !loading && (
        <div className="py-20 text-center glass-card border-dashed border-[var(--border-subtle)]">
          <p className="text-[var(--text-dimmed)] font-black uppercase tracking-[0.2em] text-[10px]">Aucun dossier trouvé</p>
        </div>
      )}
    </div>
  );
};

export default BlogManager;
