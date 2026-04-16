import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ArrowRight, Clock, Calendar, X, BookOpen } from 'lucide-react';
import { api } from '../lib/api';

const BlogPage = () => {
  const [articles, setArticles] = useState([]);
  const [selectedArticle, setSelectedArticle] = useState(null);

  useEffect(() => {
    // Force la page à remonter tout en haut lors de l'accès direct
    window.scrollTo(0, 0);

    // Récupération de tous les articles publiés
    api.getArticles().then(data => {
      const publishedArticles = (data || []).filter(article =>
        article.is_published == 1 || article.is_published === true
      );
      setArticles(publishedArticles);
    });
  }, []);

  return (
    <div className="min-h-screen bg-[var(--bg-primary)] pt-32 pb-20 px-6 transition-colors duration-500">
      <div className="max-w-7xl mx-auto">
        
        {/* Entête de la page */}
        <div className="text-center mb-20">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="inline-flex items-center gap-2 text-red-600 font-black uppercase tracking-[0.2em] text-[10px] mb-6"
          >
            <BookOpen className="w-4 h-4" /> LE JOURNAL DE L'EXPERT
          </motion.div>
          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="text-5xl md:text-7xl font-black tracking-tighter uppercase mb-6 leading-none text-[var(--text-main)]"
          >
            Actualités & <span className="text-red-600 italic">Expertise</span>
          </motion.h1>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="text-[var(--text-dimmed)] text-lg max-w-2xl mx-auto"
          >
            Découvrez nos derniers articles, conseils, et retours d'expérience sur l'éradication des nuisibles, la désinfection et l'entretien de vos locaux.
          </motion.p>
        </div>

        {/* Grille de tous les articles */}
        {articles.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {articles.map((article, index) => (
              <motion.article
                key={article.id || index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: (index % 3) * 0.1 }}
                onClick={() => setSelectedArticle(article)}
                className="group cursor-pointer flex flex-col h-full bg-[var(--bg-secondary)] border border-[var(--border-subtle)] rounded-3xl overflow-hidden shadow-xl hover:border-red-600/50 hover:shadow-2xl transition-all duration-500"
              >
                <div className="relative h-64 overflow-hidden bg-black/5">
                  <img
                    src={article.image || 'https://images.unsplash.com/photo-1557804506-669a67965ba0?q=80&w=2000'}
                    alt={article.title}
                    className="w-full h-full object-cover grayscale group-hover:grayscale-0 scale-105 group-hover:scale-110 transition-all duration-700"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent text-left" />
                  <span className="absolute top-4 left-4 bg-red-600 text-white text-[10px] font-black uppercase px-3 py-1.5 rounded-full tracking-widest text-left shadow-lg">
                    {article.category}
                  </span>
                </div>

                <div className="p-8 flex flex-col flex-grow text-left">
                  <div className="flex items-center gap-4 text-xs font-bold text-[var(--text-dimmed)] uppercase tracking-widest mb-4">
                    <span className="flex items-center gap-1.5"><Calendar className="w-3.5 h-3.5" /> {article.date}</span>
                    <span className="flex items-center gap-1.5"><Clock className="w-3.5 h-3.5" /> {article.readTime}</span>
                  </div>

                  <h3 className="text-2xl font-black leading-tight mb-4 group-hover:text-red-600 transition-colors text-[var(--text-main)]">
                    {article.title}
                  </h3>

                  <p className="text-[var(--text-dimmed)] leading-relaxed mb-8 font-medium flex-grow text-sm">
                    {article.excerpt}
                  </p>

                  <div className="mt-auto flex items-center gap-3 text-red-600 font-black uppercase tracking-widest text-xs group/btn">
                    <span>Lire l'article</span>
                    <div className="w-8 h-8 rounded-full bg-red-600/10 flex items-center justify-center group-hover/btn:bg-red-600 group-hover/btn:text-white transition-all">
                      <ArrowRight className="w-3.5 h-3.5 group-hover/btn:translate-x-0.5 transition-transform" />
                    </div>
                  </div>
                </div>
              </motion.article>
            ))}
          </div>
        ) : (
          <div className="py-32 text-center text-[var(--text-dimmed)]">
            <BookOpen className="w-16 h-16 mx-auto mb-6 opacity-20" />
            <p className="font-bold text-lg">Aucun article publié pour le moment.</p>
          </div>
        )}
      </div>

      {/* Article Detail Modal (Simple Full Screen Magazine) */}
      <AnimatePresence>
        {selectedArticle && (
          <motion.div
            initial={{ opacity: 0 }} 
            animate={{ opacity: 1 }} 
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-[110] flex items-center justify-center p-4 bg-slate-950/95 backdrop-blur-md"
          >
            <div className="absolute inset-0" onClick={() => setSelectedArticle(null)} />
            
            <motion.div
              initial={{ opacity: 0, y: 40, scale: 0.95 }} 
              animate={{ opacity: 1, y: 0, scale: 1 }} 
              exit={{ opacity: 0, y: 40, scale: 0.95 }}
              transition={{ type: "spring", damping: 25, stiffness: 300 }}
              className="relative w-full max-w-4xl max-h-[90vh] bg-white rounded-3xl border border-black/5 overflow-hidden flex flex-col shadow-2xl text-slate-900 selection:bg-red-100"
            >
              <button
                onClick={() => setSelectedArticle(null)}
                className="absolute top-6 right-6 z-50 p-3 rounded-full bg-slate-100 text-slate-900 hover:bg-red-600 hover:text-white transition-all"
                aria-label="Fermer l'article"
              >
                <X className="w-5 h-5" />
              </button>

              <div className="flex-1 overflow-y-auto custom-scrollbar p-8 md:p-16 text-left">
                <div className="mb-6 text-[10px] font-black uppercase tracking-widest text-red-600 flex items-center gap-2">
                  <span>LE JOURNAL</span> <span className="opacity-50">/</span> <span>{selectedArticle.category}</span>
                </div>
                
                <h2 className="text-4xl md:text-5xl font-black uppercase mb-8 leading-tight text-slate-950">
                  {selectedArticle.title}
                </h2>
                
                <div className="flex items-center gap-6 text-xs font-bold text-slate-500 uppercase tracking-widest mb-10 pb-10 border-b border-black/5">
                  <span className="flex items-center gap-2"><Calendar className="w-4 h-4 text-red-600" /> {selectedArticle.date}</span>
                  <span className="flex items-center gap-2"><Clock className="w-4 h-4 text-red-600" /> {selectedArticle.readTime}</span>
                </div>

                <div className="aspect-[21/9] rounded-2xl overflow-hidden mb-12 shadow-inner bg-black/5 relative">
                  <img 
                    src={selectedArticle.image || 'https://images.unsplash.com/photo-1587582423116-ec07293f0395?w=1000'} 
                    className="w-full h-full object-cover" 
                    alt={selectedArticle.title} 
                  />
                  {/* Petit gradient pour que l'image fasse pro */}
                  <div className="absolute inset-0 shadow-[inset_0_0_50px_rgba(0,0,0,0.1)]"></div>
                </div>

                <div
                  className="article-preview-content prose prose-lg prose-red max-w-none prose-headings:text-slate-950 prose-p:text-slate-700 prose-strong:text-slate-950 prose-img:rounded-xl"
                  dangerouslySetInnerHTML={{ __html: selectedArticle.content_html || selectedArticle.excerpt }}
                />
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default BlogPage;
