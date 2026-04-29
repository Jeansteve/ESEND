import React, { useState, useEffect } from 'react';
import { useParams, useNavigate, Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { ArrowLeft, Calendar, Clock, BookOpen, ArrowRight } from 'lucide-react';
import { dataService } from '../lib/DataService';
import { api } from '../lib/api';

/**
 * Nettoie le contenu HTML généré par l'IA avant affichage public.
 */
const sanitizeContent = (html = '') => {
  if (!html) return '';
  return html.replace(/\[ILLUSTRATION\s*:.*?\]/gi, '').trim();
};

const ArticleSkeleton = () => (
  <div className="min-h-screen bg-white light pt-28 pb-24 animate-pulse">
    <div className="w-full h-[55vh] min-h-[380px] skeleton mb-16" />
    <div className="max-w-4xl mx-auto px-6 space-y-8">
      <div className="h-4 w-32 skeleton rounded-full" />
      <div className="h-16 w-full skeleton rounded-2xl" />
      <div className="flex gap-6">
        <div className="h-4 w-24 skeleton rounded-full" />
        <div className="h-4 w-24 skeleton rounded-full" />
      </div>
      <div className="h-40 w-full skeleton rounded-2xl mt-12" />
      <div className="space-y-4 pt-12">
        <div className="h-4 w-full skeleton rounded-full" />
        <div className="h-4 w-full skeleton rounded-full" />
        <div className="h-4 w-3/4 skeleton rounded-full" />
      </div>
    </div>
  </div>
);

const ArticlePage = () => {
  const { slug } = useParams();
  const navigate = useNavigate();
  const [article, setArticle] = useState(null);
  const [related, setRelated] = useState([]);
  const [loading, setLoading] = useState(true);
  const [notFound, setNotFound] = useState(false);
  const [siteSettings, setSiteSettings] = useState({});

  useEffect(() => {
    api.getSettings().then(s => setSiteSettings(s || {})).catch(() => {});
  }, []);

  useEffect(() => {
    window.scrollTo({ top: 0, behavior: 'instant' });
    setLoading(true);
    setNotFound(false);

    const loadArticleData = async () => {
      try {
        // Chargement via le cache du DataService
        const fullArticle = await dataService.getArticleById(slug);
        
        if (fullArticle && fullArticle.id) {
          setArticle(fullArticle);
          
          // Articles liés (on peut utiliser le cache ici aussi)
          const allArticles = await dataService.getArticles();
          const published = (allArticles || []).filter(a => a.is_published == 1 || a.is_published === true);
          const others = published
            .filter(a => String(a.id) !== String(fullArticle.id) && a.service_id === fullArticle.service_id)
            .slice(0, 3);
          
          setRelated(others.length > 0 ? others : published.filter(a => String(a.id) !== String(fullArticle.id)).slice(0, 3));
        } else {
          setNotFound(true);
        }
      } catch (err) {
        console.error('Erreur chargement article:', err);
        setNotFound(true);
      } finally {
        setLoading(false);
      }
    };

    loadArticleData();
  }, [slug]);

  // ── SEO dynamique : title, meta description, Schema JSON-LD ──────────────
  useEffect(() => {
    if (!article) return;

    const prevTitle = document.title;
    document.title = article.meta_title || `${article.title} | ESEND Nuisibles`;

    let metaDesc = document.querySelector('meta[name="description"]');
    if (!metaDesc) {
      metaDesc = document.createElement('meta');
      metaDesc.name = 'description';
      document.head.appendChild(metaDesc);
    }
    const prevDesc = metaDesc.getAttribute('content');
    metaDesc.setAttribute('content', article.meta_description || article.excerpt || '');

    const schemaId = 'esend-article-schema';
    let existing = document.getElementById(schemaId);
    if (existing) existing.remove();
    const script = document.createElement('script');
    script.id = schemaId;
    script.type = 'application/ld+json';
    script.text = JSON.stringify({
      '@context': 'https://schema.org',
      '@type': 'Article',
      headline: article.title,
      description: article.excerpt || '',
      image: article.image || '',
      datePublished: article.date || '',
      publisher: {
        '@type': 'LocalBusiness',
        name: 'ESEND Nuisibles',
        url: 'https://esendnuisibles.fr'
      }
    });
    document.head.appendChild(script);

    return () => {
      document.title = prevTitle;
      if (metaDesc) metaDesc.setAttribute('content', prevDesc || '');
      const s = document.getElementById(schemaId);
      if (s) s.remove();
    };
  }, [article]);

  if (loading) return <ArticleSkeleton />;

  if (notFound || !article) {
    return (
      <div className="min-h-screen flex flex-col items-center justify-center text-center bg-white light px-6">
        <BookOpen className="w-16 h-16 text-red-600 mb-6 opacity-50" />
        <h1 className="text-4xl font-black text-[var(--text-main)] mb-4">Article introuvable</h1>
        <p className="text-[var(--text-dimmed)] mb-8">Cet article n'existe pas ou a été retiré.</p>
        <Link to="/journal" className="inline-flex items-center gap-2 px-6 py-3 bg-red-600 text-white font-bold rounded-full hover:bg-red-700 transition-colors">
          <ArrowLeft className="w-4 h-4" /> Retour au Journal
        </Link>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-white light pt-28 pb-24 transition-colors duration-1000">

      {/* ─── Hero Banner ──────────────────────────────────────────── */}
      <div className="relative w-full h-[55vh] min-h-[380px] max-h-[600px] overflow-hidden mb-16">
        <img
          src={article.image || 'https://images.unsplash.com/photo-1557804506-669a67965ba0?q=80&w=2000'}
          alt={article.title}
          className="w-full h-full object-cover scale-105"
          style={{ filter: 'brightness(0.4)' }}
        />
        <div className="absolute inset-0 bg-gradient-to-t from-white via-black/20 to-transparent" />

        {/* Metadata sur la photo */}
        <div className="absolute bottom-0 left-0 right-0 max-w-4xl mx-auto px-6 pb-10 text-left">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="flex items-center gap-2 text-red-500 font-black uppercase tracking-[0.2em] text-[10px] mb-4"
          >
            <BookOpen className="w-4 h-4" />
            <span>Le Journal de l'Expert</span>
            <span className="opacity-40">/</span>
            <span>{article.category || 'Expertise'}</span>
          </motion.div>

          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="text-3xl md:text-5xl font-black uppercase leading-tight text-white tracking-tight mb-6"
          >
            {article.title}
          </motion.h1>

          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.2 }}
            className="flex items-center gap-6 text-xs font-bold text-slate-300 uppercase tracking-widest"
          >
            {article.date && (
              <span className="flex items-center gap-2">
                <Calendar className="w-3.5 h-3.5 text-red-500" />
                {article.date}
              </span>
            )}
            {article.readTime && (
              <span className="flex items-center gap-2">
                <Clock className="w-3.5 h-3.5 text-red-500" />
                {article.readTime}
              </span>
            )}
          </motion.div>
        </div>
      </div>

      {/* ─── Corps de l'article ───────────────────────────────────── */}
      <div className="max-w-4xl mx-auto px-6">

        {/* Bouton retour */}
        <motion.div
          initial={{ opacity: 0, x: -10 }}
          animate={{ opacity: 1, x: 0 }}
          className="mb-10 text-left"
        >
          <button
            onClick={() => navigate('/journal')}
            className="inline-flex items-center gap-2 text-[var(--text-dimmed)] hover:text-red-500 transition-colors font-bold text-sm uppercase tracking-widest"
          >
            <ArrowLeft className="w-4 h-4" /> Retour au Journal
          </button>
        </motion.div>

        {/* Extrait / Résumé */}
        {article.excerpt && (
          <motion.p
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="text-xl md:text-2xl text-[var(--text-dimmed)] leading-relaxed font-medium mb-12 pb-12 border-b border-[var(--border-subtle)]"
          >
            {article.excerpt}
          </motion.p>
        )}

        {/* Contenu HTML complet */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          className="article-reader-content"
          dangerouslySetInnerHTML={{ __html: sanitizeContent(article.content_html) || '<p>Contenu indisponible.</p>' }}
        />

        {/* ─── CTA de conversion ───────────────────────────────────── */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3 }}
          className="mt-16 rounded-2xl overflow-hidden border border-red-600/20 bg-gradient-to-br from-red-950/40 to-[var(--bg-secondary)] p-10 text-center"
        >
          <p className="text-[10px] font-black uppercase tracking-[0.3em] text-red-500 mb-4">Besoin d'une intervention ?</p>
          <h2 className="text-2xl md:text-3xl font-black uppercase text-[var(--text-main)] mb-4 tracking-tight leading-tight">
            Protégez votre propriété dès maintenant
          </h2>
          <p className="text-[var(--text-dimmed)] max-w-lg mx-auto mb-8 text-sm leading-relaxed">
            Nos experts certifiés Certibiocide interviennent à Menton, Monaco, Nice et toute la Côte d'Azur. Diagnostic gratuit, résultat garanti.
          </p>
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
            <a
              href="/#/#contact"
              className="inline-flex items-center gap-2 px-8 py-4 bg-red-600 text-white font-black uppercase tracking-widest text-[11px] rounded-full hover:bg-red-700 active:scale-95 transition-all shadow-lg shadow-red-600/30"
            >
              Demander un devis gratuit
            </a>
            {siteSettings.company_phone && (
              <a
                href={`tel:${siteSettings.company_phone.replace(/\s/g, '')}`}
                className="inline-flex items-center gap-2 px-8 py-4 border border-[var(--border-strong)] text-[var(--text-main)] font-black uppercase tracking-widest text-[11px] rounded-full hover:border-red-600/50 hover:text-red-500 transition-all"
              >
                📞 {siteSettings.company_phone}
              </a>
            )}
          </div>
        </motion.div>
      </div>

      {/* ─── Articles Similaires ─────────────────────────────────── */}
      {related.length > 0 && (
        <div className="max-w-7xl mx-auto px-6 mt-24">
          <div className="border-t border-[var(--border-subtle)] pt-16">
            <p className="text-[10px] font-black uppercase tracking-[0.2em] text-red-600 mb-3">
              À lire aussi
            </p>
            <h2 className="text-3xl font-black uppercase text-[var(--text-main)] mb-10 tracking-tight">
              Articles liés
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {related.map((rel, i) => (
                <motion.article
                  key={rel.id}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: i * 0.1 }}
                  onClick={() => {
                    window.scrollTo({ top: 0, behavior: 'instant' });
                    navigate(`/journal/${rel.id}`);
                  }}
                  className="group cursor-pointer flex flex-col bg-[var(--bg-secondary)] border border-[var(--border-subtle)] rounded-2xl overflow-hidden hover:border-red-600/40 transition-all duration-300"
                >
                  <div className="relative h-44 overflow-hidden">
                    <img
                      src={rel.image || 'https://images.unsplash.com/photo-1557804506-669a67965ba0?q=80&w=800'}
                      alt={rel.title}
                      className="w-full h-full object-cover grayscale group-hover:grayscale-0 scale-105 group-hover:scale-110 transition-all duration-500"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
                    <span className="absolute top-3 left-3 bg-red-600 text-white text-[9px] font-black uppercase px-2.5 py-1 rounded-full tracking-widest">
                      {rel.category}
                    </span>
                  </div>
                  <div className="p-5 flex flex-col flex-grow">
                    <h3 className="font-black text-base leading-snug text-[var(--text-main)] group-hover:text-red-500 transition-colors mb-3 line-clamp-3">
                      {rel.title}
                    </h3>
                    <div className="mt-auto flex items-center gap-2 text-red-500 font-black text-xs uppercase tracking-widest">
                      <span>Lire</span>
                      <ArrowRight className="w-3 h-3 group-hover:translate-x-0.5 transition-transform" />
                    </div>
                  </div>
                </motion.article>
              ))}
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

/** Utilitaire : transforme un titre en slug URL-safe */
export function slugify(text = '') {
  return text
    .toLowerCase()
    .normalize('NFD')
    .replace(/[\u0300-\u036f]/g, '')
    .replace(/[^a-z0-9\s-]/g, '')
    .trim()
    .replace(/\s+/g, '-')
    .replace(/-+/g, '-');
}

export default ArticlePage;
