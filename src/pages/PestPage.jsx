import React, { useState, useEffect } from 'react';
import { useSearchParams, Link } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  AlertTriangle, Shield, BookOpen, ChevronDown, CheckCircle, XCircle, Search, 
  Calculator, Bug, Rat, ShieldCheck, Asterisk, Snail, ArrowRight, Clock, 
  Calendar, MapPin, Target, Info, Lightbulb, Phone 
} from 'lucide-react';
import { useSettings } from '../context/SettingsContext';
import { pests } from '../data/pests';
import { interventions } from '../data/interventions';
import { dataService } from '../lib/DataService';
import SEO from '../components/UI/SEO';

const PestPage = () => {
  const { settings } = useSettings();
  const [searchParams] = useSearchParams();
  const type = searchParams.get('type') || 'punaises-de-lit';
  const pest = pests[type] || pests['punaises-de-lit'];

  // Données réelles depuis l'API
  const [relatedArticles, setRelatedArticles] = useState([]);
  const [realInterventions, setRealInterventions] = useState([]);
  const [isLoadingInterventions, setIsLoadingInterventions] = useState(true);

  useEffect(() => {
    window.scrollTo(0, 0);
    
    // Charger les articles réels et filtrer par type de nuisible
    dataService.getArticles().then(allArticles => {
      // Mapping des types vers les IDs de l'admin
      const typeToId = {
        'rats-rongeurs': '1',
        'guepes-frelons': '2',
        'punaises-de-lit': '3',
        'cafards-blattes': '4',
        'fourmis': '5'
      };
      const targetId = typeToId[type];

      const filtered = (allArticles || []).filter(a => {
        const nTag = String(a.nuisible_tag || '');
        const pType = String(a.pestType || '');
        const title = (a.title || '').toLowerCase();
        
        const matchesId = nTag === targetId || pType === type;
        const matchesText = title.includes(type.replace('-', ' '));
        
        return (matchesId || matchesText) && (a.is_published == 1 || a.is_published === true);
      }).slice(0, 3);
      
      // Si on a des articles réels, on les utilise
      setRelatedArticles(filtered);
    }).catch(() => {
      setRelatedArticles([]);
    });

    // Charger les interventions réelles
    setIsLoadingInterventions(true);
    dataService.getProjects().then(allProjects => {
      // Filtrer par catégorie et s'assurer qu'elles sont publiées
      const filtered = (allProjects || []).filter(p => {
        const isPublished = p.is_published == 1 || p.is_published === true;
        const matchesCategory = p.category === 'nuisibles' || p.category === type;
        // On peut aussi chercher le type de nuisible dans les tags ou le titre
        const matchesType = (p.title + ' ' + (p.tag || '')).toLowerCase().includes(type.replace('-', ' '));
        return isPublished && (matchesCategory || matchesType);
      }).slice(0, 2);
      
      setRealInterventions(filtered);
      setIsLoadingInterventions(false);
    }).catch(err => {
      console.error("[PestPage] Error fetching interventions:", err);
      setRealInterventions([]);
      setIsLoadingInterventions(false);
    });
  }, [type]);

  // Hub Dynamique state
  const pestKeys = Object.keys(pests);

  // Widget Calculateur de Gravité state
  const [step, setStep] = useState(0);
  const [score, setScore] = useState(0);

  const defaultDiagnosticQuestions = [
    { q: "Avez-vous observé des traces physiques ?", options: ["Oui, traces visibles", "Non, aucun signe"] },
    { q: "Entendez-vous des bruits anormaux ?", options: ["Oui, régulièrement", "Non, calme"] },
    { q: "Y a-t-il des personnes vulnérables (enfants/personnes âgées) ?", options: ["Oui", "Non"] }
  ];

  const diagnosticQuestions = pest.diagnostic || defaultDiagnosticQuestions;

  const handleDiagnostic = (option) => {
    if (option.startsWith("Oui")) setScore(s => s + 1);
    if (step < diagnosticQuestions.length - 1) setStep(s => s + 1);
    else setStep(3); // Result step
  };

  // Données structurées SEO (JSON-LD)
  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "Service",
    "serviceType": pest.title,
    "provider": {
      "@type": "LocalBusiness",
      "name": "ESEND Menton",
      "telephone": settings.company_phone || "+33600000000",
      "address": {
        "@type": "PostalAddress",
        "addressLocality": settings.company_city || "Menton",
        "postalCode": "06500",
        "addressCountry": "FR"
      }
    },
    "description": pest.description,
    "areaServed": "Menton, Roquebrune-Cap-Martin, Beausoleil, Sospel"
  };

  const iconMap = {
    'punaises-de-lit': <Snail className="w-5 h-5 md:w-6 md:h-6" />,
    'rats': <Rat className="w-5 h-5 md:w-6 md:h-6" />,
    'cafards': <Bug className="w-5 h-5 md:w-6 md:h-6" />,
    'frelons': <ShieldCheck className="w-5 h-5 md:w-6 md:h-6" />,
    'fourmis': <Bug className="w-5 h-5 md:w-6 md:h-6" />,
    'puces': <Bug className="w-5 h-5 md:w-6 md:h-6" />
  };

  return (
    <div className="min-h-screen bg-[#020617] text-white pt-24 md:pt-32 pb-0 relative overflow-clip">
      {/* Lueurs d'ambiance dynamiques */}
      <div className="absolute top-0 left-1/4 w-[500px] h-[500px] bg-red-600/5 blur-[120px] rounded-full pointer-events-none" />
      <div className="absolute bottom-1/3 right-1/4 w-[600px] h-[600px] bg-blue-600/5 blur-[150px] rounded-full pointer-events-none" />
      
      <SEO 
        title={`${pest.title} (06)`}
        description={pest.description}
        schema={jsonLd}
      />
      
      <div className="max-w-7xl mx-auto px-4 lg:px-6 flex flex-col md:flex-row gap-8 lg:gap-10 relative">
        
        <div className="w-full md:w-56 lg:w-64 shrink-0 z-20 relative">
          <div className="md:sticky md:top-32 md:w-56 lg:w-64 relative flex md:flex-col w-full bg-slate-900/40 backdrop-blur-2xl border border-white/10 p-2.5 rounded-[2rem] overflow-x-auto md:overflow-visible no-scrollbar shadow-[0_30px_60px_rgba(0,0,0,0.4)]">
            <div className="flex md:flex-col w-full min-w-max md:min-w-0 gap-1 md:gap-2">
              {pestKeys.map(key => {
                const isActive = type === key;
                return (
                  <Link 
                    key={key} 
                    to={`/services/nuisibles?type=${key}`} 
                    className={`relative md:h-16 flex-1 md:flex-none flex flex-col md:flex-row items-center justify-center md:justify-start px-4 md:px-5 py-3 md:py-0 transition-all duration-300 rounded-2xl ${isActive ? 'text-white' : 'text-slate-400 hover:text-white hover:bg-white/5'}`}
                  >
                    {isActive && (
                      <motion.div 
                        layoutId="activeTab"
                        className="absolute inset-0 bg-red-600 rounded-2xl shadow-[0_0_20px_rgba(220,38,38,0.4)] md:shadow-none"
                        initial={false}
                        transition={{ type: "spring", stiffness: 400, damping: 30 }}
                      />
                    )}
                    <div className="relative z-10 flex flex-col md:flex-row items-center w-full gap-1 md:gap-4">
                      <div className="flex shrink-0 items-center justify-center">
                        {iconMap[key]}
                      </div>
                      <span className="text-[9px] sm:text-[10px] md:text-sm font-black uppercase tracking-widest text-center md:text-left mt-1 md:mt-0 pt-0.5">
                        {pests[key].title.split(' ')[0]}
                      </span>
                    </div>
                  </Link>
                );
              })}
            </div>
          </div>
        </div>

        {/* Contenu de droite */}
        <div className="flex-1 min-w-0">

        {/* Header Immersif */}
        <div className="mb-12">
          <motion.div 
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-red-600 font-black uppercase tracking-[0.4em] text-[10px] mb-4 flex items-center gap-2"
          >
            <div className="w-8 h-px bg-red-600" /> FICHE TECHNIQUE EXPERT
          </motion.div>
          
          <motion.h1 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-5xl md:text-8xl font-black tracking-tighter uppercase mb-6 leading-none text-white drop-shadow-2xl"
          >
            {pest.title}
          </motion.h1>
          
          <motion.p 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.1 }}
            className="text-lg md:text-2xl text-slate-200 font-bold uppercase tracking-widest border-l-8 border-red-600 pl-8 py-3 bg-white/5 rounded-r-2xl inline-block pr-10"
          >
            {pest.description}
          </motion.p>
        </div>

        {/* Bloc Encyclopédie Unique : Style Magazine */}
        <motion.div 
           initial={{ opacity: 0, y: 20 }} 
           animate={{ opacity: 1, y: 0 }}
           transition={{ delay: 0.2 }}
           className="bg-[#0f172a]/60 backdrop-blur-xl border border-white/10 p-8 md:p-14 rounded-[3rem] shadow-2xl relative overflow-hidden group mb-12"
        >
          <div className="absolute top-0 right-0 w-96 h-96 bg-red-600/5 blur-[150px] -z-10" />
          
          <h3 className="text-sm font-black uppercase tracking-[0.4em] text-red-500/80 mb-10 flex items-center gap-3">
             <div className="w-2 h-2 bg-red-600 rounded-full animate-pulse" /> FICHE BIOLOGIQUE DÉTAILLÉE
          </h3>
          
          <div className="relative text-slate-300 leading-snug font-medium text-lg md:text-2xl opacity-90 text-left">
            {/* Image Sticker Flottante (Compacité Optimisée) */}
            <motion.div
              animate={{ y: [0, -10, 0] }}
              transition={{ repeat: Infinity, duration: 6, ease: "easeInOut" }}
              className="float-left ml-4 lg:ml-6 mr-8 lg:mr-10 mb-6 w-full md:w-[280px] lg:w-[320px] relative z-10"
            >
              <img 
                src={pest.image} 
                alt={pest.title} 
                className="w-full h-auto object-contain drop-shadow-[0_40px_60px_rgba(0,0,0,0.6)]" 
              />
            </motion.div>

            {/* Texte parfaitement aligné à gauche */}
            <div className="whitespace-pre-line text-left">
              {pest.presentation}
            </div>

            {/* Note de l'Expert : Info Cruciale fusionnée (Ambre pour rassurer) */}
            <motion.div 
               initial={{ opacity: 0, y: 10 }}
               animate={{ opacity: 1, y: 0 }}
               transition={{ delay: 0.4 }}
               className="mt-12 bg-amber-500/5 border border-amber-500/20 p-6 rounded-3xl flex items-center gap-6 shadow-xl"
            >
              <div className="bg-amber-500/20 p-3 rounded-xl shrink-0">
                 <Lightbulb className="w-8 h-8 text-amber-500" />
              </div>
              <div>
                <p className="text-[10px] font-black text-amber-500 uppercase tracking-[0.4em] mb-1">Note de l'Expert</p>
                <p className="text-lg md:text-xl text-white font-black leading-tight italic uppercase tracking-tighter">
                   "{pest.expertFact}"
                </p>
              </div>
            </motion.div>

            {/* Clearfix for float */}
            <div className="clear-both" />
          </div>

          <div className="mt-10 pt-6 border-t border-white/5 text-[9px] font-bold text-slate-500 uppercase tracking-[0.5em] flex items-center">
             <span className="flex items-center gap-2">RECONNAISSANCE & COMPORTEMENT ANIMAL</span>
          </div>
        </motion.div>

        {/* Widget Calculateur de Gravité */}
        <div className="bg-white/[0.03] backdrop-blur-xl border border-white/5 p-8 sm:p-12 rounded-[3rem] mb-20 shadow-[0_30px_70px_rgba(0,0,0,0.6)]">
          <h3 className="text-2xl font-black uppercase mb-8 flex items-center gap-3"><Calculator className="text-red-600" /> Évaluez la gravité</h3>
          
          <div className="relative h-1.5 bg-slate-800 rounded-full mb-10 overflow-hidden">
            <motion.div 
               className="absolute top-0 left-0 h-full bg-gradient-to-r from-green-500 via-orange-500 to-red-600"
               initial={{ width: "0%" }}
               animate={{ width: `${(step / 3) * 100}%` }}
               transition={{ duration: 0.5, ease: "easeOut" }}
            />
          </div>

          <AnimatePresence mode="wait">
            {step < 3 ? (
              <motion.div 
                key={step} 
                initial={{ opacity: 0, x: 20 }} 
                animate={{ opacity: 1, x: 0 }} 
                exit={{ opacity: 0, x: -20 }}
                transition={{ duration: 0.3 }}
              >
                <p className="text-xl sm:text-2xl font-bold mb-8 text-slate-200">{diagnosticQuestions[step].q}</p>
                <div className="flex flex-col sm:flex-row gap-4">
                  {diagnosticQuestions[step].options.map(opt => (
                    <button 
                       key={opt} 
                       onClick={() => handleDiagnostic(opt)} 
                       className="flex-1 bg-white/5 hover:bg-red-600 border border-white/10 hover:border-red-500 px-6 py-5 rounded-2xl font-bold transition-all text-left sm:text-center group shadow-lg"
                    >
                      <span className="group-hover:translate-x-1 inline-block transition-transform">{opt}</span>
                    </button>
                  ))}
                </div>
              </motion.div>
            ) : (
              <motion.div 
                key="result"
                initial={{ opacity: 0, scale: 0.95 }} 
                animate={{ opacity: 1, scale: 1 }}
                className="text-center py-6"
              >
                <div className="text-7xl font-black mb-4 tracking-tighter italic">
                   <span className={score >= 2 ? "text-red-500" : score === 1 ? "text-orange-500" : "text-green-500"}>
                     {score}
                   </span><span className="text-slate-700 text-5xl">/3</span>
                </div>
                {score >= 2 ? (
                  <p className="text-red-400 font-bold text-xl mb-10">Risque Élevé ! Une intervention rapide est recommandée.</p>
                ) : score === 1 ? (
                  <p className="text-orange-400 font-bold text-xl mb-10">Risque Modéré. À surveiller de près.</p>
                ) : (
                  <p className="text-green-400 font-bold text-xl mb-10">Risque Faible. Restez vigilant.</p>
                )}
                <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
                  <Link to={`/?devis=${pests[type].title.split(' ')[0]}#devis`} className="flex-1 w-full bg-red-600 hover:bg-red-500 text-white font-black py-4 px-10 rounded-full uppercase tracking-widest transition-all shadow-[0_0_30px_rgba(220,38,38,0.4)] hover:shadow-[0_0_50px_rgba(220,38,38,0.6)] hover:scale-105 active:scale-95 border border-red-500/50 text-center">
                    {score > 0 ? "Demander un devis gratuit" : "Devis pour une inspection"}
                  </Link>
                  <a href={`tel:${settings.company_phone.replace(/\s/g, '')}`} className="flex-1 w-full bg-white/5 hover:bg-white/10 text-white font-black py-4 px-10 rounded-full uppercase tracking-widest transition-all border border-white/10 flex items-center justify-center gap-3">
                    <Phone className="w-5 h-5 text-red-500" />
                    {settings.company_phone}
                  </a>
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </div>

        {/* Action Immédiate */}
        <motion.div 
           initial={{ opacity: 0, y: 20 }}
           whileInView={{ opacity: 1, y: 0 }}
           viewport={{ once: true, margin: "-100px" }}
           className="bg-red-600/10 border border-red-600/50 p-8 rounded-[2rem] mb-16 flex gap-6 items-start shadow-[0_0_40px_rgba(220,38,38,0.15)] relative overflow-hidden"
        >
          <div className="absolute top-0 right-0 w-48 h-48 bg-red-600/20 blur-[50px] mix-blend-screen rounded-full pointer-events-none" />
          <motion.div
            animate={{ scale: [1, 1.15, 1] }}
            transition={{ repeat: Infinity, duration: 1.5, ease: "easeInOut" }}
            className="shrink-0 relative z-10"
          >
             <AlertTriangle className="w-12 h-12 text-red-500 drop-shadow-[0_0_15px_rgba(239,68,68,0.8)]" />
          </motion.div>
          
          <div className="relative z-10">
            <h3 className="text-xl md:text-2xl font-black uppercase text-red-500 mb-3 tracking-wider">Protocole d'Urgence Immédiate</h3>
            <p className="text-lg md:text-xl text-slate-200 leading-relaxed font-medium">{pest.actionImmediate}</p>
          </div>
        </motion.div>

        {/* Mythes vs Réalité */}
        {pest.mythesVsRealite && (
            <div className="mb-16">
                <motion.h2 
                   initial={{ opacity: 0, x: -20 }}
                   whileInView={{ opacity: 1, x: 0 }}
                   viewport={{ once: true }}
                   className="text-3xl lg:text-4xl font-black uppercase tracking-tighter mb-8 flex items-center gap-4"
                >
                    <Shield className="text-red-600 w-8 h-8 lg:w-10 lg:h-10" /> Mythes vs Réalité
                </motion.h2>
                <div className="flex flex-col gap-5 relative">
                    {/* Glow discret pour la section Mythes */}
                    <div className="absolute -left-20 top-0 w-64 h-64 bg-red-600/5 blur-[100px] pointer-events-none" />
                    
                    {pests[type].mythesVsRealite.map((item, idx) => (
                        <motion.div 
                           key={idx} 
                           initial={{ opacity: 0, x: -20 }}
                           whileInView={{ opacity: 1, x: 0 }}
                           whileHover={{ 
                             x: 10, 
                             backgroundColor: "rgba(255,255,255,0.04)",
                             borderColor: "rgba(220,38,38,0.4)"
                           }}
                           viewport={{ once: true }}
                           transition={{ delay: idx * 0.1, duration: 0.4 }}
                           className="bg-white/[0.02] border border-white/10 p-6 md:p-8 rounded-[2rem] flex flex-col md:flex-row gap-8 items-center transition-all shadow-xl cursor-default"
                        >
                            <div className="w-full md:w-1/3 shrink-0">
                                <div className="flex items-center gap-2 mb-2 text-red-500/80 font-black uppercase text-[10px] tracking-[0.2em]"><XCircle className="w-4 h-4" /> Mythe</div>
                                <p className="text-slate-400 text-sm italic italic leading-snug">{item.mythe}</p>
                            </div>
                            
                            <div className="hidden md:block w-px h-12 bg-white/5" />
                            
                            <div className="w-full md:flex-1">
                                <div className="flex items-center gap-2 mb-2 text-green-500 font-black uppercase text-[10px] tracking-[0.2em]"><CheckCircle className="w-4 h-4" /> Réalité</div>
                                <p className="text-white font-bold text-base md:text-lg leading-tight">{item.realite}</p>
                            </div>
                        </motion.div>
                    ))}
                </div>
            </div>
        )}


        </div>
      </div>

      {/* SECTION BLANCHE (MAGAZINE STYLE) */}
      <div className="bg-white text-slate-900 pt-32 pb-20 mt-0 relative">
        <div className="max-w-7xl mx-auto px-4 lg:px-6 relative">
          {/* Expertise Terrain */}
          {realInterventions.length > 0 && (
            <div className="mb-24">
              <motion.h2 
                 initial={{ opacity: 0, x: -20 }}
                 whileInView={{ opacity: 1, x: 0 }}
                 viewport={{ once: true }}
                 className="text-4xl lg:text-6xl font-black uppercase tracking-tighter mb-12 flex items-center gap-4 text-slate-900"
              >
                 <Target className="text-red-600 w-10 h-10 lg:w-14 lg:h-14" /> Nos Interventions Récentes
              </motion.h2>
              <div className="grid md:grid-cols-2 gap-8">
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
                        <span className="px-4 py-2 rounded-full bg-red-600 text-[10px] font-black uppercase text-white shadow-lg">
                          {item.tag || item.category}
                        </span>
                      </div>
                    </div>
                    
                    <div className="p-10 flex flex-col flex-grow">
                      <div className="flex items-center gap-4 mb-6 text-slate-400">
                        <div className="flex items-center gap-2">
                          <MapPin className="w-4 h-4 text-red-500" />
                          <span className="text-[10px] font-black uppercase tracking-widest">{item.location || 'Sud-Est'}</span>
                        </div>
                        <div className="w-1 h-1 bg-slate-300 rounded-full" />
                        <div className="flex items-center gap-2">
                          <Calendar className="w-4 h-4 text-red-500" />
                          <span className="text-[10px] font-black uppercase tracking-widest">{item.date || 'Récemment'}</span>
                        </div>
                      </div>
                      
                      <h3 className="text-3xl font-black uppercase tracking-tighter mb-4 leading-tight group-hover:text-red-600 transition-colors">
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
                          <span className="text-[9px] font-black uppercase tracking-widest text-slate-400">Mission Accomplie</span>
                        </div>
                        <Link to="/realisations" className="w-12 h-12 rounded-full bg-slate-900 flex items-center justify-center text-white hover:bg-red-600 transition-all hover:scale-110 shadow-lg">
                          <ArrowRight className="w-5 h-5" />
                        </Link>
                      </div>
                    </div>
                  </motion.div>
                ))}
              </div>
            </div>
          )}

          {/* Le Journal de l'Expert */}
          {relatedArticles.length > 0 && (
            <div className="mb-24">
              <motion.h2 
                 initial={{ opacity: 0, x: -20 }}
                 whileInView={{ opacity: 1, x: 0 }}
                 viewport={{ once: true }}
                 className="text-4xl lg:text-6xl font-black uppercase tracking-tighter mb-12 flex items-center gap-4 text-slate-900"
              >
                 <BookOpen className="text-red-600 w-10 h-10 lg:w-14 lg:h-14" /> Le Journal de l'Expert
              </motion.h2>
              <div className="grid lg:grid-cols-3 gap-8">
                {relatedArticles.map((article, index) => (
                  <motion.article 
                    key={article.id}
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: index * 0.1 }}
                    className="group bg-white border border-slate-200 rounded-[2.5rem] overflow-hidden hover:border-red-600/30 transition-all flex flex-col cursor-pointer shadow-lg hover:shadow-2xl"
                  >
                    <Link to={`/journal/${article.slug || article.id}`} className="flex flex-col h-full">
                      <div className="h-56 relative overflow-hidden">
                        <img src={article.image} alt={article.title} className="w-full h-full object-cover group-hover:scale-105 transition-all duration-500" />
                        <div className="absolute inset-0 bg-black/5 group-hover:bg-transparent transition-colors" />
                      </div>
                      <div className="p-8 flex flex-col flex-grow">
                        <div className="flex items-center gap-3 text-[10px] font-bold text-slate-400 uppercase tracking-widest mb-4">
                          <Calendar className="w-3.5 h-3.5" /> {article.date}
                        </div>
                        <h3 className="text-xl font-black leading-tight mb-4 text-slate-900 group-hover:text-red-600 transition-colors uppercase italic">{article.title}</h3>
                        <p className="text-slate-600 text-sm leading-relaxed mb-6 flex-grow line-clamp-3">{article.excerpt}</p>
                        <div className="text-red-600 text-xs font-black uppercase tracking-widest flex items-center gap-2 group/btn">
                          Lire la suite <ArrowRight className="w-4 h-4 group-hover/btn:translate-x-1 transition-transform" />
                        </div>
                      </div>
                    </Link>
                  </motion.article>
                ))}
              </div>
            </div>
          )}

          {/* FAQ Expertise */}
          <div className="mb-24">
            <motion.h2 
               initial={{ opacity: 0, x: -20 }}
               whileInView={{ opacity: 1, x: 0 }}
               viewport={{ once: true }}
               className="text-4xl lg:text-6xl font-black uppercase tracking-tighter mb-12 flex items-center gap-4 text-slate-900"
            >
               <Info className="text-red-600 w-10 h-10 lg:w-14 lg:h-14" /> FAQ Expertise
            </motion.h2>
            <div className="space-y-5">
              {pest.faq.map((item, index) => (
                <motion.details 
                  key={index} 
                  initial={{ opacity: 0, y: 10 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  className="group bg-slate-50 border border-slate-200 p-8 rounded-[2rem] hover:border-red-500/30 transition-all cursor-pointer shadow-sm hover:shadow-md"
                >
                  <summary className="font-black text-xl flex justify-between items-center list-none outline-none text-slate-900">
                    {item.q}
                    <div className="bg-white p-2.5 rounded-full border border-slate-200 group-open:bg-red-50 group-open:text-red-600 transition-colors shrink-0 ml-4">
                       <ChevronDown className="w-6 h-6 group-open:rotate-180 transition-transform duration-300" />
                    </div>
                  </summary>
                  <p className="mt-8 text-slate-600 leading-relaxed text-lg border-t border-slate-200 pt-6 font-medium">
                    {item.a}
                  </p>
                </motion.details>
              ))}
            </div>
          </div>

          <div className="text-center bg-slate-900 text-white p-12 md:p-20 rounded-[4rem] shadow-3xl relative overflow-hidden">
              <div className="absolute top-0 right-0 w-96 h-96 bg-red-600/10 blur-[100px] -z-10" />
              <h4 className="text-4xl md:text-6xl font-black uppercase mb-10 tracking-tighter leading-none">Prêt à sécuriser<br/>votre foyer ?</h4>
              <div className="flex flex-col sm:flex-row items-center justify-center gap-8">
                <Link to={`/?devis=${pests[type].title.split(' ')[0]}#devis`} className="w-full sm:w-auto bg-red-600 hover:bg-red-700 text-white font-black py-6 px-14 rounded-full uppercase tracking-[0.2em] transition-all hover:scale-105 active:scale-95 shadow-[0_20px_40px_rgba(220,38,38,0.3)] text-lg">
                  Demander mon devis offert
                </Link>
                <a href={`tel:${settings.company_phone.replace(/\s/g, '')}`} className="w-full sm:w-auto bg-white/5 hover:bg-white/10 text-white font-black py-6 px-14 rounded-full uppercase tracking-[0.2em] transition-all border border-white/10 flex items-center justify-center gap-4 text-lg">
                  <Phone className="w-6 h-6 text-red-500" />
                  {settings.company_phone}
                </a>
              </div>
              <p className="mt-10 text-slate-500 text-xs font-bold uppercase tracking-[0.3em] flex items-center justify-center gap-3">
                <ShieldCheck className="w-5 h-5" /> Devis offert sans engagement sous 15 minutes
              </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PestPage;
