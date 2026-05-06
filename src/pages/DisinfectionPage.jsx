import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { disinfectionData as data } from '../data/disinfection';
import { articles as staticArticles } from '../data/articles';
import { dataService } from '../lib/DataService';
import { 
  ShieldCheck, 
  Wind, 
  Droplets, 
  FlaskConical, 
  CheckCircle, 
  XCircle, 
  ArrowRight, 
  BookOpen, 
  ChevronDown, 
  Calendar,
  AlertCircle,
  Stethoscope,
  Activity,
  Microscope,
  Phone
} from 'lucide-react';

const DisinfectionPage = () => {
  const [relatedArticles, setRelatedArticles] = useState([]);

  useEffect(() => {
    window.scrollTo(0, 0);

    // Charger les articles réels et filtrer par catégorie hygiène/désinfection
    dataService.getArticles().then(allArticles => {
      const filtered = (allArticles || []).filter(a => {
        const t = (a.title + ' ' + a.excerpt + ' ' + (a.category_id || '')).toLowerCase();
        return t.includes('désinfection') || t.includes('hygiène') || a.category_id === 'hygiene';
      }).slice(0, 3);
      
      if (filtered.length > 0) {
        setRelatedArticles(filtered);
      } else {
        setRelatedArticles(staticArticles.filter(a => a.category_id === 'hygiene' || a.title.toLowerCase().includes('désinfection')).slice(0, 3));
      }
    }).catch(() => {
      setRelatedArticles(staticArticles.filter(a => a.category_id === 'hygiene' || a.title.toLowerCase().includes('désinfection')).slice(0, 3));
    });
  }, []);

  return (
    <div className="min-h-screen bg-[#020617] text-white pt-24 md:pt-32 pb-20 selection:bg-cyan-500/30">
      <div className="max-w-7xl mx-auto px-4 lg:px-6">
        
        {/* Header Immersif */}
        <div className="mb-16">
          <motion.div 
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-cyan-500 font-black uppercase tracking-[0.4em] text-[10px] mb-4 flex items-center gap-2"
          >
            <div className="w-8 h-px bg-cyan-500" /> {data.code}
          </motion.div>
          
          <motion.h1 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-5xl md:text-8xl font-black tracking-tighter uppercase mb-6 leading-none italic"
          >
            {data.title.split('&')[0]} <br/> 
            <span className="text-cyan-500">& {data.title.split('&')[1]}</span>
          </motion.h1>
          
          <motion.p 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.1 }}
            className="text-lg md:text-xl text-slate-300 font-bold uppercase tracking-widest border-l-4 border-cyan-500 pl-6 py-2 bg-cyan-500/5 max-w-4xl"
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
          <img src={data.heroImage} alt="Désinfection Professionnelle" className="w-full h-full object-cover opacity-60 grayscale hover:grayscale-0 transition-all duration-1000" />
          <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-slate-950/20 to-transparent" />
          
          <div className="absolute bottom-10 left-10 right-10 flex flex-wrap items-end justify-between gap-6">
            <div className="flex items-center gap-6">
              <div className="bg-cyan-500 text-white font-black px-6 py-3 rounded-2xl text-xl shadow-xl shadow-cyan-500/20">
                {data.rank}
              </div>
              <div>
                <p className="text-[10px] font-black text-cyan-500 uppercase tracking-widest mb-1">Standard de Qualité</p>
                <p className="text-2xl font-black text-white uppercase tracking-tighter">Bio-Sécurité Certifiée</p>
              </div>
            </div>
            
            <div className="hidden md:flex gap-4">
               {[
                 { icon: Microscope, label: "Lab Tested" },
                 { icon: Stethoscope, label: "Hospital Grade" },
                 { icon: Activity, label: "Real-time efficacy" }
               ].map((badge, i) => (
                 <div key={i} className="bg-white/5 backdrop-blur-md border border-white/10 px-4 py-2 rounded-xl flex items-center gap-3">
                   <badge.icon className="w-4 h-4 text-cyan-400" />
                   <span className="text-[9px] font-bold uppercase tracking-widest">{badge.label}</span>
                 </div>
               ))}
            </div>
          </div>
        </motion.div>

        {/* Protocoles d'Intervention */}
        <div className="mb-20">
          <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-12">
            <div>
               <h2 className="text-3xl md:text-5xl font-black uppercase tracking-tighter mb-4 italic">Nos Protocoles <span className="text-cyan-500">Tactiques</span></h2>
               <p className="text-slate-400 font-medium max-w-2xl">Chaque espace demande une approche spécifique. Nous adaptons la finesse de notre nébulisation et la rémanence de nos produits à votre environnement.</p>
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
                className="group bg-slate-900/40 backdrop-blur-xl border border-white/5 p-8 rounded-[2.5rem] hover:border-cyan-500/30 transition-all shadow-xl relative overflow-hidden"
              >
                <div className="absolute -top-10 -right-10 w-32 h-32 bg-cyan-500/5 blur-[50px] group-hover:bg-cyan-500/10 transition-all" />
                <div className="bg-cyan-500/10 w-14 h-14 rounded-2xl flex items-center justify-center mb-8 border border-cyan-500/20 group-hover:bg-cyan-500 group-hover:text-white transition-all">
                  <protocol.icon className="w-7 h-7" />
                </div>
                <h3 className="text-2xl font-black uppercase mb-4 tracking-tighter">{protocol.title}</h3>
                <p className="text-slate-400 text-sm leading-relaxed mb-8 flex-grow">{protocol.desc}</p>
                <div className="space-y-3">
                  {protocol.features.map((feat, j) => (
                    <div key={j} className="flex items-center gap-3">
                       <div className="w-1.5 h-1.5 bg-cyan-500 rounded-full" />
                       <span className="text-[10px] font-black uppercase tracking-widest text-slate-300">{feat}</span>
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
                <flaskonical className="text-cyan-500 w-8 h-8 lg:w-10 lg:h-10" /> Mythes vs Réalité
            </motion.h2>
            <div className="flex flex-col gap-4">
                {data.mythes.map((item, idx) => (
                    <motion.div 
                        key={idx} 
                        initial={{ opacity: 0, x: -20 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        whileHover={{ 
                            x: 10, 
                            backgroundColor: "rgba(255,255,255,0.03)",
                            borderColor: "rgba(6,182,212,0.3)"
                        }}
                        viewport={{ once: true }}
                        transition={{ delay: idx * 0.1, duration: 0.4 }}
                        className="bg-white/[0.01] border border-white/5 p-5 rounded-2xl flex flex-col md:flex-row gap-6 items-center transition-all shadow-lg cursor-default"
                    >
                        <div className="w-full md:w-1/3 shrink-0">
                            <div className="flex items-center gap-2 mb-2 text-red-500/80 font-black uppercase text-[10px] tracking-[0.2em]"><XCircle className="w-4 h-4" /> Mythe</div>
                            <p className="text-slate-400 text-sm italic leading-snug">{item.m}</p>
                        </div>
                        
                        <div className="hidden md:block w-px h-12 bg-white/5" />
                        
                        <div className="w-full md:flex-1">
                            <div className="flex items-center gap-2 mb-2 text-cyan-500 font-black uppercase text-[10px] tracking-[0.2em]"><CheckCircle className="w-4 h-4" /> Réalité</div>
                            <p className="text-white font-bold text-base md:text-lg leading-tight">{item.r}</p>
                        </div>
                    </motion.div>
                ))}
            </div>
        </div>

        {/* Le Journal de l'Expert */}
        {relatedArticles.length > 0 && (
          <div className="mb-20">
            <motion.h2 
               initial={{ opacity: 0, x: -20 }}
               whileInView={{ opacity: 1, x: 0 }}
               viewport={{ once: true }}
               className="text-3xl lg:text-4xl font-black uppercase tracking-tighter mb-10 flex items-center gap-4"
            >
               <BookOpen className="text-cyan-500 w-8 h-8 lg:w-10 lg:h-10" /> Le Journal de l'Expert
            </motion.h2>
            <div className="grid lg:grid-cols-3 gap-6">
              {relatedArticles.map((article, index) => (
                <motion.article 
                  key={article.id}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: index * 0.1 }}
                  className="group bg-white/[0.02] border border-white/5 rounded-3xl overflow-hidden hover:border-cyan-500/30 transition-all flex flex-col cursor-pointer"
                >
                  <Link to={`/journal/${article.id}`} className="flex flex-col h-full">
                    <div className="h-48 relative overflow-hidden">
                      <img src={article.image} alt={article.title} className="w-full h-full object-cover grayscale opacity-40 group-hover:grayscale-0 group-hover:opacity-100 transition-all duration-500" />
                    </div>
                    <div className="p-6 flex flex-col flex-grow">
                      <div className="flex items-center gap-3 text-[9px] font-bold text-slate-500 uppercase tracking-widest mb-3">
                        <Calendar className="w-3 h-3" /> {article.date}
                      </div>
                      <h3 className="text-lg font-bold leading-tight mb-3 group-hover:text-cyan-500 transition-colors uppercase italic">{article.title}</h3>
                      <p className="text-slate-400 text-xs leading-relaxed mb-4 flex-grow line-clamp-2">{article.excerpt}</p>
                      <div className="text-cyan-500 text-[10px] font-black uppercase tracking-widest flex items-center gap-2 group/btn">
                        Lire la suite <ArrowRight className="w-3 h-3 group-hover/btn:translate-x-1 transition-transform" />
                      </div>
                    </div>
                  </Link>
                </motion.article>
              ))}
            </div>
          </div>
        )}

        {/* FAQ Expertise */}
        <div className="mb-20">
          <motion.h2 
             initial={{ opacity: 0, x: -20 }}
             whileInView={{ opacity: 1, x: 0 }}
             viewport={{ once: true }}
             className="text-3xl lg:text-4xl font-black uppercase tracking-tighter mb-8 flex items-center gap-4"
          >
             <flaskconical className="text-cyan-500 w-8 h-8 lg:w-10 lg:h-10" /> FAQ Expertise Bio-Sécurité
          </motion.h2>
          <div className="space-y-4">
            {data.faq.map((item, index) => (
              <motion.details 
                key={index} 
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 }}
                className="group bg-white/[0.02] border border-white/5 p-6 rounded-[1.5rem] hover:border-cyan-500/30 transition-all cursor-pointer"
              >
                <summary className="font-bold text-xl flex justify-between items-center list-none outline-none">
                  {item.q}
                  <div className="bg-white/5 p-2 rounded-full group-open:bg-cyan-600/20 group-open:text-cyan-500 transition-colors shrink-0 ml-4">
                     <ChevronDown className="w-5 h-5 group-open:rotate-180 transition-transform duration-300" />
                  </div>
                </summary>
                <p className="mt-6 text-slate-400 leading-relaxed text-lg border-t border-white/5 pt-4">
                  {item.a}
                </p>
              </motion.details>
            ))}
          </div>
        </div>

        {/* CTA Final */}
        <div className="text-center bg-slate-900/60 border border-cyan-600/20 p-12 rounded-[3rem] shadow-2xl relative overflow-hidden">
            <div className="absolute top-0 right-0 w-64 h-64 bg-cyan-600/5 blur-[80px] -z-10" />
            <h4 className="text-2xl font-black uppercase mb-6 tracking-tighter flex items-center justify-center gap-3">
              <ShieldCheck className="text-cyan-500" /> Sécurisez votre environnement dès aujourd'hui
            </h4>
            <div className="flex flex-col sm:flex-row items-center justify-center gap-6">
              <Link to={{ pathname: "/", hash: "#devis" }} className="w-full sm:w-auto bg-cyan-600 hover:bg-cyan-500 text-white font-black py-5 px-12 rounded-full uppercase tracking-[0.2em] transition-all hover:scale-105 active:scale-95 shadow-[0_20px_40px_rgba(6,182,212,0.3)]">
                Demander une désinfection experte
              </Link>
              <a href="tel:0651239841" className="w-full sm:w-auto bg-white/5 hover:bg-white/10 text-white font-black py-5 px-12 rounded-full uppercase tracking-[0.2em] transition-all border border-white/10 flex items-center justify-center gap-3">
                <Phone className="w-5 h-5 text-cyan-500" />
                Appeler : 06 51 23 98 41
              </a>
            </div>
            <p className="mt-6 text-slate-500 text-[10px] font-bold uppercase tracking-widest flex items-center justify-center gap-2">
              <CheckCircle className="w-4 h-4" /> Intervention sous 24h • Normes Hospitalières
            </p>
        </div>

      </div>
    </div>
  );
};

export default DisinfectionPage;
