import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { cleaningData as data } from '../data/cleaning';
import { dataService } from '../lib/DataService';
import { 
  ShieldCheck, 
  CheckCircle, 
  XCircle, 
  ArrowRight, 
  BookOpen, 
  ChevronDown, 
  Calendar,
  Sparkles,
  Layers,
  Search,
  Droplets,
  Phone
} from 'lucide-react';
import { useSettings } from '../context/SettingsContext';

const CleaningPage = () => {
  const { settings } = useSettings();
  const [relatedArticles, setRelatedArticles] = useState([]);
  const [realInterventions, setRealInterventions] = useState([]);

  useEffect(() => {
    window.scrollTo(0, 0);

    // Charger les articles réels et filtrer par catégorie nettoyage
    dataService.getArticles().then(allArticles => {
      const filtered = (allArticles || []).filter(a => {
        // Logique de filtrage multi-critères ultra-robuste (ID 7 = Nettoyage dans SERVICES, ID 3 = Nettoyage dans Pôle Service)
        const sId = String(a.service_id || '');
        const nTag = String(a.nuisible_tag || '');
        const catId = String(a.category_id || '');
        const title = (a.title || '').toLowerCase();
        const excerpt = (a.excerpt || '').toLowerCase();
        
        const matchesId = sId === '3' || sId === '7' || nTag === '7' || catId === 'nettoyage';
        const matchesText = title.includes('nettoyage') || excerpt.includes('nettoyage');
        
        return (matchesId || matchesText) && (a.is_published == 1 || a.is_published === true);
      }).slice(0, 3);
      
      setRelatedArticles(filtered);
    }).catch(() => {
      setRelatedArticles([]);
    });

    // Charger les interventions réelles
    dataService.getProjects().then(allProjects => {
      const filtered = (allProjects || []).filter(p => {
        const isPublished = p.is_published == 1 || p.is_published === true;
        const matchesCategory = p.category === 'nettoyage' || (p.title + ' ' + (p.tag || '')).toLowerCase().includes('nettoyage');
        return isPublished && matchesCategory;
      }).slice(0, 2);
      setRealInterventions(filtered);
    }).catch(() => setRealInterventions([]));
  }, []);

  return (
    <div className="min-h-screen bg-[#020617] text-white pt-24 md:pt-32 pb-20 selection:bg-indigo-500/30">
      <div className="max-w-7xl mx-auto px-4 lg:px-6">
        
        {/* Header Immersif */}
        <div className="mb-16">
          <motion.div 
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-indigo-400 font-black uppercase tracking-[0.4em] text-[10px] mb-4 flex items-center gap-2"
          >
            <div className="w-8 h-px bg-indigo-500" /> {data.code}
          </motion.div>
          
          <motion.h1 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-5xl md:text-8xl font-black tracking-tighter uppercase mb-6 leading-none italic"
          >
            {data.title.split('&')[0]} <br/> 
            <span className="text-indigo-500">& {data.title.split('&')[1]}</span>
          </motion.h1>
          
          <motion.p 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.1 }}
            className="text-lg md:text-xl text-slate-300 font-bold uppercase tracking-widest border-l-4 border-indigo-500 pl-6 py-2 bg-indigo-500/5 max-w-4xl"
          >
            {data.intro}
          </motion.p>
        </div>

        {/* Hero Illustration Block */}
        <motion.div 
           initial={{ opacity: 0, scale: 0.98 }} 
           animate={{ opacity: 1, scale: 1 }}
           className="relative h-[400px] md:h-[600px] rounded-[3rem] overflow-hidden mb-20 shadow-2xl border border-white/5"
        >
          <img src={data.heroImage} alt="Nettoyage et Vitrerie Haute Précision" className="w-full h-full object-cover opacity-60 grayscale hover:grayscale-0 transition-all duration-1000" />
          <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-slate-950/20 to-transparent" />
          
          <div className="absolute bottom-10 left-10 right-10 flex flex-wrap items-end justify-between gap-6">
            <div className="flex items-center gap-6">
              <div className="bg-indigo-600 text-white font-black px-6 py-3 rounded-2xl text-xl shadow-xl shadow-indigo-600/30">
                {data.rank}
              </div>
              <div>
                <p className="text-[10px] font-black text-indigo-400 uppercase tracking-widest mb-1">Standard de Qualité</p>
                <p className="text-2xl font-black text-white uppercase tracking-tighter">Finition Crystal Clear</p>
              </div>
            </div>
            
            <div className="hidden md:flex gap-4">
               {[
                 { icon: Sparkles, label: "Zero Trace" },
                 { icon: Droplets, label: "Pure Water Tech" },
                 { icon: Search, label: "QC Inspection" }
               ].map((badge, i) => (
                 <div key={i} className="bg-white/5 backdrop-blur-md border border-white/10 px-4 py-2 rounded-xl flex items-center gap-3">
                   <badge.icon className="w-4 h-4 text-indigo-400" />
                   <span className="text-[9px] font-bold uppercase tracking-widest">{badge.label}</span>
                 </div>
               ))}
            </div>
          </div>
        </motion.div>

        {/* Protocoles de Précision */}
        <div className="mb-20">
          <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-12">
            <div>
               <h2 className="text-3xl md:text-5xl font-black uppercase tracking-tighter mb-4 italic">Nos Protocoles <span className="text-indigo-500">Précision</span></h2>
               <p className="text-slate-400 font-medium max-w-2xl">Parce que chaque surface est unique, nous appliquons des méthodes spécifiques protégeant l'intégrité de vos matériaux tout en garantissant une propreté absolue.</p>
            </div>
            <div className="h-px flex-grow bg-white/5 hidden md:block mx-8 mb-6" />
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            {data.protocols.map((protocol, i) => (
              <motion.div 
                key={protocol.id}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.1 }}
                className="group bg-slate-900/40 backdrop-blur-xl border border-white/5 p-8 rounded-[2.5rem] hover:border-indigo-500/30 transition-all shadow-xl relative overflow-hidden"
              >
                <div className="absolute -top-10 -right-10 w-32 h-32 bg-indigo-500/5 blur-[50px] group-hover:bg-indigo-500/10 transition-all" />
                <div className="bg-indigo-500/10 w-14 h-14 rounded-2xl flex items-center justify-center mb-8 border border-indigo-500/20 group-hover:bg-indigo-500 group-hover:text-white transition-all">
                  <protocol.icon className="w-7 h-7" />
                </div>
                <h3 className="text-2xl font-black uppercase mb-4 tracking-tighter">{protocol.title}</h3>
                <p className="text-slate-400 text-sm leading-relaxed mb-8 flex-grow">{protocol.desc}</p>
                <div className="space-y-3">
                  {protocol.features.map((feat, j) => (
                    <div key={j} className="flex items-center gap-3">
                       <div className="w-1.5 h-1.5 bg-indigo-500 rounded-full" />
                       <span className="text-[10px] font-black uppercase tracking-widest text-slate-200">{feat}</span>
                    </div>
                  ))}
                </div>
              </motion.div>
            ))}
          </div>
        </div>

        {/* Mythes vs Réalité */}
        <div className="mb-20">
            <motion.h2 
                initial={{ opacity: 0, x: -20 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                className="text-3xl lg:text-4xl font-black uppercase tracking-tighter mb-8 flex items-center gap-4"
            >
                <Layers className="text-indigo-500 w-8 h-8 lg:w-10 lg:h-10" /> Mythes vs Réalité
            </motion.h2>
            <div className="flex flex-col gap-4">
                {data.mythes.map((item, idx) => (
                    <motion.div 
                        key={idx} 
                        initial={{ opacity: 0, x: -20 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        whileHover={{ 
                            x: 10, 
                            backgroundColor: "rgba(99, 102, 241, 0.03)",
                            borderColor: "rgba(99, 102, 241, 0.3)"
                        }}
                        viewport={{ once: true }}
                        transition={{ delay: idx * 0.1, duration: 0.4 }}
                        className="bg-white/[0.01] border border-white/5 p-5 rounded-2xl flex flex-col md:flex-row gap-6 items-center transition-all shadow-lg cursor-default"
                    >
                        <div className="w-full md:w-1/3 shrink-0">
                            <div className="flex items-center gap-2 mb-2 text-rose-500 font-black uppercase text-[10px] tracking-[0.2em]"><XCircle className="w-4 h-4" /> Mythe</div>
                            <p className="text-slate-400 text-sm italic leading-snug">{item.m}</p>
                        </div>
                        
                        <div className="hidden md:block w-px h-12 bg-white/5" />
                        
                        <div className="w-full md:flex-1">
                            <div className="flex items-center gap-2 mb-2 text-indigo-400 font-black uppercase text-[10px] tracking-[0.2em]"><CheckCircle className="w-4 h-4" /> Réalité</div>
                            <p className="text-white font-bold text-base md:text-lg leading-tight">{item.r}</p>
                        </div>
                    </motion.div>
                ))}
            </div>
        </div>

      </div>

      {/* SECTION BLANCHE (MAGAZINE STYLE) */}
      {realInterventions.length > 0 && (
        <div className="bg-white text-slate-900 pt-32 pb-20 mt-20 relative">
          <div className="max-w-7xl mx-auto px-4 lg:px-6 relative">
            <motion.h2 
               initial={{ opacity: 0, x: -20 }}
               whileInView={{ opacity: 1, x: 0 }}
               viewport={{ once: true }}
               className="text-3xl lg:text-5xl font-black uppercase tracking-tighter mb-12 flex items-center gap-4"
            >
               <Target className="text-indigo-600 w-10 h-10 lg:w-14 lg:h-14" /> Nos Interventions Récentes
            </motion.h2>
            
            <div className="grid md:grid-cols-2 gap-8 mb-24">
              {realInterventions.map((item, index) => (
                <motion.div 
                  key={item.id}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: index * 0.1 }}
                  className="group bg-slate-50 rounded-[2.5rem] overflow-hidden border border-slate-200 shadow-xl shadow-slate-200/50 flex flex-col h-full"
                >
                  <div className="h-64 relative overflow-hidden bg-slate-200">
                    <img 
                      src={item.img || item.image} 
                      alt={item.title} 
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700" 
                    />
                    <div className="absolute top-6 left-6">
                      <span className="px-4 py-2 rounded-full bg-indigo-600 text-[10px] font-black uppercase text-white shadow-lg">
                        {item.tag || item.category}
                      </span>
                    </div>
                  </div>
                  
                  <div className="p-10 flex flex-col flex-grow">
                    <div className="flex items-center gap-4 mb-6 text-slate-400">
                      <div className="flex items-center gap-2">
                        <MapPin className="w-4 h-4 text-indigo-500" />
                        <span className="text-[10px] font-black uppercase tracking-widest">{item.location || 'Sud-Est'}</span>
                      </div>
                      <div className="w-1 h-1 bg-slate-300 rounded-full" />
                      <div className="flex items-center gap-2">
                        <Calendar className="w-4 h-4 text-indigo-500" />
                        <span className="text-[10px] font-black uppercase tracking-widest">{item.date || 'Récemment'}</span>
                      </div>
                    </div>
                    
                    <h3 className="text-3xl font-black uppercase tracking-tighter mb-4 leading-tight group-hover:text-indigo-600 transition-colors">
                      {item.title}
                    </h3>
                    
                    <p className="text-slate-600 font-medium leading-relaxed mb-8 flex-grow">
                      {item.description || item.excerpt}
                    </p>
                    
                    <div className="flex items-center justify-between pt-6 border-t border-slate-100">
                      <div className="flex items-center gap-3">
                        <div className="w-8 h-8 rounded-full bg-slate-100 flex items-center justify-center">
                          <Target className="w-4 h-4 text-slate-400" />
                        </div>
                        <span className="text-[9px] font-black uppercase tracking-widest text-slate-400">Finition Crystal</span>
                      </div>
                      <Link to="/realisations" className="w-12 h-12 rounded-full bg-slate-900 flex items-center justify-center text-white hover:bg-indigo-600 transition-all hover:scale-110 shadow-lg">
                        <ArrowRight className="w-5 h-5" />
                      </Link>
                    </div>
                  </div>
                </motion.div>
              ))}
            </div>

            {/* Le Journal de l'Expert (dans la zone blanche) */}
            {relatedArticles.length > 0 && (
              <div className="mb-24">
                <motion.h2 
                   initial={{ opacity: 0, x: -20 }}
                   whileInView={{ opacity: 1, x: 0 }}
                   viewport={{ once: true }}
                   className="text-3xl lg:text-4xl font-black uppercase tracking-tighter mb-10 flex items-center gap-4"
                >
                   <BookOpen className="text-indigo-600 w-8 h-8 lg:w-10 lg:h-10" /> Le Journal de l'Expert
                </motion.h2>
                <div className="grid lg:grid-cols-3 gap-6">
                  {relatedArticles.map((article, index) => (
                    <motion.article 
                      key={article.id}
                      initial={{ opacity: 0, y: 20 }}
                      whileInView={{ opacity: 1, y: 0 }}
                      viewport={{ once: true }}
                      transition={{ delay: index * 0.1 }}
                      className="group bg-slate-50 border border-slate-200 rounded-3xl overflow-hidden hover:border-indigo-500/30 transition-all flex flex-col cursor-pointer shadow-sm hover:shadow-xl"
                    >
                      <Link to={`/journal/${article.slug || article.id}`} className="flex flex-col h-full">
                        <div className="h-48 relative overflow-hidden">
                          <img src={article.image} alt={article.title} className="w-full h-full object-cover grayscale opacity-80 group-hover:grayscale-0 group-hover:opacity-100 transition-all duration-500" />
                        </div>
                        <div className="p-6 flex flex-col flex-grow">
                          <div className="flex items-center gap-3 text-[9px] font-bold text-slate-400 uppercase tracking-widest mb-3">
                            <Calendar className="w-3 h-3" /> {article.date}
                          </div>
                          <h3 className="text-lg font-bold leading-tight mb-3 group-hover:text-indigo-600 transition-colors uppercase italic">{article.title}</h3>
                          <p className="text-slate-500 text-xs leading-relaxed mb-4 flex-grow line-clamp-2">{article.excerpt}</p>
                          <div className="text-indigo-600 text-[10px] font-black uppercase tracking-widest flex items-center gap-2 group/btn">
                            Lire la suite <ArrowRight className="w-3 h-3 group-hover/btn:translate-x-1 transition-transform" />
                          </div>
                        </div>
                      </Link>
                    </motion.article>
                  ))}
                </div>
              </div>
            )}

            {/* FAQ Expertise (dans la zone blanche) */}
            <div className="mb-24">
              <motion.h2 
                 initial={{ opacity: 0, x: -20 }}
                 whileInView={{ opacity: 1, x: 0 }}
                 viewport={{ once: true }}
                 className="text-3xl lg:text-4xl font-black uppercase tracking-tighter mb-8 flex items-center gap-4"
              >
                 <ShieldCheck className="text-indigo-600 w-8 h-8 lg:w-10 lg:h-10" /> FAQ Expertise Technique
              </motion.h2>
              <div className="space-y-4">
                {data.faq.map((item, index) => (
                  <motion.details 
                    key={index} 
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: index * 0.1 }}
                    className="group bg-slate-50 border border-slate-200 p-6 rounded-[1.5rem] hover:border-indigo-500/30 transition-all cursor-pointer shadow-sm"
                  >
                    <summary className="font-bold text-xl flex justify-between items-center list-none outline-none text-slate-900">
                      {item.q}
                      <div className="bg-slate-200/50 p-2 rounded-full group-open:bg-indigo-600 group-open:text-white transition-all shrink-0 ml-4">
                         <ChevronDown className="w-5 h-5 group-open:rotate-180 transition-transform duration-300" />
                      </div>
                    </summary>
                    <p className="mt-6 text-slate-600 leading-relaxed text-lg border-t border-slate-200 pt-4">
                      {item.a}
                    </p>
                  </motion.details>
                ))}
              </div>
            </div>

            {/* CTA Final */}
            <div className="text-center bg-slate-900 border border-indigo-600/20 p-12 rounded-[3rem] shadow-2xl relative overflow-hidden text-white">
                <div className="absolute top-0 right-0 w-64 h-64 bg-indigo-600/5 blur-[80px] -z-10" />
                <h4 className="text-2xl font-black uppercase mb-6 tracking-tighter flex items-center justify-center gap-3">
                  <Sparkles className="text-indigo-500" /> Redonnez de l'éclat à votre patrimoine
                </h4>
                <div className="flex flex-col sm:flex-row items-center justify-center gap-6">
                  <Link to={{ pathname: "/", hash: "#devis" }} className="w-full sm:w-auto bg-indigo-600 hover:bg-indigo-500 text-white font-black py-5 px-12 rounded-full uppercase tracking-[0.2em] transition-all hover:scale-105 active:scale-95 shadow-[0_20px_40px_rgba(79, 70, 229, 0.3)]">
                    Demander un nettoyage expert
                  </Link>
                  <a href={`tel:${settings.company_phone.replace(/\s/g, '')}`} className="w-full sm:w-auto bg-white/5 hover:bg-white/10 text-white font-black py-5 px-12 rounded-full uppercase tracking-[0.2em] transition-all border border-white/10 flex items-center justify-center gap-3">
                    <Phone className="w-5 h-5 text-indigo-500" />
                    {settings.company_phone}
                  </a>
                </div>
                <p className="mt-6 text-slate-500 text-[10px] font-bold uppercase tracking-widest flex items-center justify-center gap-2">
                  <CheckCircle className="w-4 h-4" /> Intervention Riviera • Finition Crystal Clear
                </p>
            </div>
          </div>
        </div>
      )}

      </div>
  );
};

export default CleaningPage;
