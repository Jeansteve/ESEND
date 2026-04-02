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

const BlogManager = ({ onOpenStudio, onEditArticle }) => {
  const [articles, setArticles] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState('');

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

  const filteredArticles = articles.filter(a => 
    a.title.toLowerCase().includes(searchTerm.toLowerCase()) || 
    a.category.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="space-y-8 animate-in fade-in duration-700">
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-6">
        <div>
          <h3 className="text-2xl font-black uppercase tracking-tighter">Le Journal de l'Expert</h3>
          <p className="text-zinc-500 text-[10px] font-bold uppercase tracking-widest mt-1">
            Gérez vos contenus SEO et l'intelligence artificielle
          </p>
        </div>
        
        <div className="flex gap-3 w-full md:w-auto">
          <div className="relative flex-grow md:flex-grow-0">
             <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-3.5 h-3.5 text-zinc-600" />
             <input 
               type="text" 
               placeholder="Chercher..."
               value={searchTerm}
               onChange={(e) => setSearchTerm(e.target.value)}
               className="bg-black/30 border border-white/5 rounded-xl py-3 pl-10 pr-4 text-xs text-white focus:outline-none focus:border-red-600/50 w-full md:w-64"
             />
          </div>
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
            className="glass-card group relative overflow-hidden flex flex-col h-full"
          >
            <div className="relative aspect-video rounded-xl overflow-hidden mb-6 border border-white/5">
              <img src={article.image} alt={article.title} className="w-full h-full object-cover grayscale transition-all duration-700 group-hover:grayscale-0 group-hover:scale-110" />
              <div className="absolute inset-0 bg-gradient-to-t from-slate-950/80 via-transparent to-transparent" />
              <div className="absolute top-3 left-3 bg-red-600 text-white text-[9px] font-black px-2 py-1 rounded-md uppercase tracking-wider">
                {article.category}
              </div>
            </div>

            <h4 className="text-sm font-black uppercase tracking-tight mb-3 group-hover:text-red-600 transition-colors line-clamp-2">
              {article.title}
            </h4>
            
            <p className="text-zinc-500 text-[11px] leading-relaxed mb-6 line-clamp-3">
              {article.excerpt}
            </p>

            <div className="mt-auto pt-6 border-t border-white/5 flex items-center justify-between">
              <div className="flex items-center gap-4">
                 <div className="flex items-center gap-1.5 text-zinc-600 text-[9px] font-black uppercase tracking-widest">
                   <Calendar className="w-3 h-3" /> {article.date}
                 </div>
              </div>
              
              <div className="flex items-center gap-2">
                <button 
                  onClick={() => onEditArticle(article)}
                  className="p-2.5 rounded-lg bg-white/5 text-zinc-400 hover:text-white hover:bg-white/10 transition-all border border-white/5"
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
        <div className="py-20 text-center glass-card border-dashed">
          <p className="text-zinc-600 font-black uppercase tracking-[0.2em] text-[10px]">Aucun dossier trouvé</p>
        </div>
      )}
    </div>
  );
};

export default BlogManager;
