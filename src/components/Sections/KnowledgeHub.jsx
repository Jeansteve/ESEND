import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ArrowRight, Clock, Calendar, X } from 'lucide-react';
import { api } from '../../lib/api';

const KnowledgeHub = () => {
  const [articles, setArticles] = React.useState([]);
  const [selectedArticle, setSelectedArticle] = useState(null);

  React.useEffect(() => {
    api.getArticles().then(data => {
      const publishedArticles = (data || []).filter(article =>
        article.is_published == 1 || article.is_published === true
      );
      setArticles(publishedArticles);
    });
  }, []);

  return (
    <section id="encyclopedie" className="py-32 px-6 bg-white text-slate-900 relative transition-colors duration-500">
      <div className="max-w-7xl mx-auto">
        {/* ... Header remains same ... */}
        <div className="flex flex-col md:flex-row justify-between items-end mb-20 gap-8">
          <div className="max-w-2xl text-left">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="inline-flex items-center gap-2 text-red-600 font-black uppercase tracking-[0.2em] text-[10px] mb-4"
            >
              <span className="w-8 h-px bg-red-600"></span> CENTRE DE CONNAISSANCES
            </motion.div>
            <h2 className="text-5xl lg:text-7xl font-black tracking-tighter uppercase mb-6 leading-none">
              Nos Derniers <br />
              <span className="text-red-600 italic">Articles</span>
            </h2>
          </div>
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            className="flex-shrink-0"
          >
            <button className="px-8 py-4 bg-slate-900 text-white font-black uppercase tracking-wider text-[10px] rounded-full hover:bg-red-600 transition-all flex items-center gap-3 group shadow-lg border border-white/5">
              Explorer le Journal expert
              <ArrowRight className="w-4 h-4 group-hover:translate-x-1.5 transition-transform duration-300" />
            </button>
          </motion.div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {articles.slice(0, 3).map((article, index) => (
            <motion.article
              key={article.id || index}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.1 }}
              onClick={() => setSelectedArticle(article)}
              className="group cursor-pointer flex flex-col h-full bg-white border border-black/5 rounded-3xl overflow-hidden shadow-xl hover:border-red-600/50 hover:shadow-2xl transition-all duration-500"
            >
              <div className="relative h-64 overflow-hidden">
                <img
                  src={article.image || 'https://images.unsplash.com/photo-1557804506-669a67965ba0?q=80&w=2000'}
                  alt={article.title}
                  className="w-full h-full object-cover grayscale group-hover:grayscale-0 scale-105 group-hover:scale-110 transition-all duration-700"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent text-left" />
                <span className="absolute top-4 left-4 bg-red-600 text-white text-[10px] font-black uppercase px-3 py-1.5 rounded-full tracking-widest text-left">
                  {article.category}
                </span>
              </div>

              <div className="p-8 flex flex-col flex-grow text-left">
                <div className="flex items-center gap-4 text-xs font-bold text-slate-400 uppercase tracking-widest mb-4">
                  <span className="flex items-center gap-1.5"><Calendar className="w-3.5 h-3.5" /> {article.date}</span>
                  <span className="flex items-center gap-1.5"><Clock className="w-3.5 h-3.5" /> {article.readTime}</span>
                </div>

                <h3 className="text-2xl font-black leading-tight mb-4 group-hover:text-red-500 transition-colors">
                  {article.title}
                </h3>

                <p className="text-slate-400 leading-relaxed mb-6 font-medium flex-grow text-sm">
                  {article.excerpt}
                </p>

                <div className="mt-auto flex items-center gap-2 text-red-600 font-bold uppercase tracking-widest text-xs">
                  Lire l'article
                  <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                </div>
              </div>
            </motion.article>
          ))}
        </div>
      </div>

      {/* Article Detail Modal (Simple Full Screen Magazine) */}
      <AnimatePresence>
        {selectedArticle && (
          <motion.div
            initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
            className="fixed inset-0 z-[110] flex items-center justify-center p-4"
          >
            <div className="absolute inset-0 bg-slate-950/95 backdrop-blur-3xl" onClick={() => setSelectedArticle(null)} />
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }} animate={{ opacity: 1, scale: 1 }} exit={{ opacity: 0, scale: 0.9 }}
              className="relative w-full max-w-4xl max-h-[90vh] bg-white rounded-3xl border border-black/5 overflow-hidden flex flex-col shadow-2xl text-slate-900 selection:bg-red-100"
            >
              <button
                onClick={() => setSelectedArticle(null)}
                className="absolute top-6 right-6 z-50 p-2 rounded-full bg-white/80 backdrop-blur-md text-slate-900 hover:bg-red-600 hover:text-white border border-black/10 shadow-lg transition-all"
              >
                <X className="w-6 h-6" />
              </button>
              <div className="flex-1 overflow-y-auto custom-scrollbar p-10 md:p-16 text-left">
                <div className="mb-6 text-[10px] font-black uppercase tracking-widest text-red-600">
                  Journal / {selectedArticle.category}
                </div>
                <h2 className="text-4xl md:text-5xl font-black uppercase mb-10 leading-tight text-slate-950">{selectedArticle.title}</h2>
                <div className="aspect-video rounded-2xl overflow-hidden mb-12">
                  <img src={selectedArticle.image || 'https://images.unsplash.com/photo-1587582423116-ec07293f0395?w=1000'} className="w-full h-full object-cover" alt="Article" />
                </div>
                <div
                  className="article-preview-content prose prose-red max-w-none prose-headings:text-slate-950 prose-p:text-slate-700 prose-strong:text-slate-950"
                  dangerouslySetInnerHTML={{ __html: selectedArticle.content_html || selectedArticle.excerpt }}
                />
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  );
};

export default KnowledgeHub;

