import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { ArrowRight, Clock, Calendar, BookOpen } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { dataService } from '../lib/DataService';
import EmptyState from '../components/UI/EmptyState';
import SEO from '../components/UI/SEO';

const SkeletonCard = () => (
  <div className="flex flex-col h-full bg-[var(--bg-secondary)] border border-[var(--border-subtle)] rounded-3xl overflow-hidden shadow-xl animate-pulse">
    <div className="relative h-64 skeleton" />
    <div className="p-8 flex flex-col flex-grow space-y-4">
      <div className="flex gap-4">
        <div className="h-3 w-20 skeleton rounded-full" />
        <div className="h-3 w-16 skeleton rounded-full" />
      </div>
      <div className="h-8 w-full skeleton rounded-xl" />
      <div className="h-8 w-2/3 skeleton rounded-xl" />
      <div className="space-y-2 mt-4">
        <div className="h-3 w-full skeleton rounded-full" />
        <div className="h-3 w-full skeleton rounded-full" />
        <div className="h-3 w-4/5 skeleton rounded-full" />
      </div>
      <div className="mt-auto h-4 w-24 skeleton rounded-full" />
    </div>
  </div>
);

const BlogPage = () => {
  const [articles, setArticles] = useState([]);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    window.scrollTo(0, 0);
    setLoading(true);
    dataService.getArticles().then(data => {
      const publishedArticles = (data || []).filter(article =>
        article.is_published == 1 || article.is_published === true
      );
      setArticles(publishedArticles);
      setLoading(false);
    }).catch(() => setLoading(false));
  }, []);

  const handleArticleClick = (article) => {
    navigate(`/journal/${article.slug || article.id}`);
  };

  const handleMouseEnter = (article) => {
    dataService.prefetchArticle(article.id);
  };

  return (
    <div className="min-h-screen bg-[var(--bg-primary)] pt-32 pb-20 px-6 transition-colors duration-500">
      <SEO 
        title="Conseils & Expertise Nuisibles | Le Journal ESEND"
        description="Retrouvez les conseils de nos experts sur l'éradication des nuisibles, la désinfection et le nettoyage professionnel à Menton et Nice."
        schema={{
          "@context": "https://schema.org",
          "@type": "BreadcrumbList",
          "itemListElement": [
            {
              "@type": "ListItem",
              "position": 1,
              "name": "Accueil",
              "item": "https://esendnuisibles.fr/"
            },
            {
              "@type": "ListItem",
              "position": 2,
              "name": "Journal de l'Expert",
              "item": "https://esendnuisibles.fr/journal"
            }
          ]
        }}
      />
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

        {/* Grille d'articles ou Skeletons */}
        {loading ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {[1, 2, 3, 4, 5, 6].map(i => <SkeletonCard key={i} />)}
          </div>
        ) : articles.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {articles.map((article, index) => (
              <motion.article
                key={article.id || index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: (index % 3) * 0.1 }}
                onClick={() => handleArticleClick(article)}
                onMouseEnter={() => handleMouseEnter(article)}
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
          <EmptyState 
            title="Le Journal est en cours d'édition"
            message="Nos experts rédigent actuellement de nouveaux dossiers pour vous tenir informés des meilleures pratiques d'hygiène et de sécurité."
            icon={BookOpen}
            actionLabel="S'inscrire à la veille"
            actionLink="/#contact"
          />
        )}
      </div>
    </div>
  );
};

export default BlogPage;
