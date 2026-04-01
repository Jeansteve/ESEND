import React, { useState } from 'react';
import { useSearchParams, Link } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { pests } from '../data/pests';
import { AlertTriangle, Shield, BookOpen, ChevronDown, CheckCircle, XCircle, Search, Calculator, Bug, Rat, ShieldCheck, Asterisk, Snail } from 'lucide-react';

const PestPage = () => {
  const [searchParams] = useSearchParams();
  const type = searchParams.get('type') || 'punaises-de-lit';
  const pest = pests[type] || pests['punaises-de-lit'];

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

  const iconMap = {
    'punaises-de-lit': <Snail className="w-5 h-5 md:w-6 md:h-6" />,
    'rats': <Rat className="w-5 h-5 md:w-6 md:h-6" />,
    'cafards': <Bug className="w-5 h-5 md:w-6 md:h-6" />,
    'frelons': <ShieldCheck className="w-5 h-5 md:w-6 md:h-6" />,
    'fourmis': <Asterisk className="w-5 h-5 md:w-6 md:h-6" />
  };

  return (
    <div className="min-h-screen bg-[#020617] text-white pt-24 md:pt-32 pb-20">
      <div className="max-w-7xl mx-auto px-4 lg:px-6 flex flex-col md:flex-row gap-8 lg:gap-12 relative items-start">
        
        {/* Sélecteur Premium Sidebar Fixe (PC/Tablette) */}
        <div className="w-full md:w-56 lg:w-72 shrink-0 z-20 relative">
          <div className="md:fixed md:top-32 md:w-56 lg:w-72 relative flex md:flex-col w-full bg-slate-900/50 backdrop-blur-xl border border-white/5 p-2 rounded-3xl overflow-x-auto md:overflow-visible no-scrollbar shadow-[0_20px_40px_rgba(0,0,0,0.5)]">
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
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="mb-16">
          <h1 className="text-4xl md:text-6xl lg:text-7xl font-black tracking-tighter uppercase mb-6">{pest.title}</h1>
          <div className="relative mb-8">
            <img src={pest.image} alt={pest.title} className="w-full h-64 md:h-80 lg:h-96 object-cover rounded-3xl shadow-[0_30px_60px_rgba(220,38,38,0.15)]" />
            
            {/* Badge Expert Flottant */}
            <motion.div 
               initial={{ scale: 0, rotate: -20 }}
               animate={{ scale: 1, rotate: 0 }}
               transition={{ type: "spring", stiffness: 300, damping: 20, delay: 0.4 }}
               className="absolute -bottom-4 md:-bottom-6 right-2 md:right-8 bg-slate-900/80 backdrop-blur-xl border-2 border-green-500 text-white p-3 md:p-5 rounded-2xl shadow-[0_10px_30px_rgba(34,197,94,0.3)] flex items-center gap-3 z-10"
            >
              <div className="bg-green-500/20 p-2 rounded-full hidden sm:block">
                 <ShieldCheck className="w-6 h-6 md:w-8 md:h-8 text-green-500" />
              </div>
              <div>
                <p className="text-[10px] md:text-xs font-bold text-slate-300 uppercase tracking-widest leading-tight">Garantie</p>
                <p className="text-sm md:text-lg font-black uppercase tracking-tighter leading-none text-green-400">Intervention Pro</p>
              </div>
            </motion.div>
          </div>
          <p className="text-xl md:text-2xl text-slate-400 font-bold uppercase tracking-widest pl-2 border-l-4 border-red-600">{pest.description}</p>
        </motion.div>

        {/* Widget Calculateur de Gravité */}
        <div className="bg-slate-900/40 backdrop-blur-xl border border-white/10 p-8 sm:p-12 rounded-[2.5rem] mb-16 shadow-[0_20px_60px_rgba(0,0,0,0.5)]">
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
                <Link to={`/?devis=${pests[type].title.split(' ')[0]}#devis`} className="inline-block bg-red-600 hover:bg-red-500 text-white font-black py-4 px-10 rounded-full uppercase tracking-widest transition-all shadow-[0_0_30px_rgba(220,38,38,0.4)] hover:shadow-[0_0_50px_rgba(220,38,38,0.6)] hover:scale-105 active:scale-95 border border-red-500/50">
                  {score > 0 ? "Demander un devis gratuit" : "Devis pour une inspection"}
                </Link>
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
                <div className="grid md:grid-cols-2 gap-8">
                    {pest.mythesVsRealite.map((item, idx) => (
                        <motion.div 
                           key={idx} 
                           initial={{ opacity: 0, y: 30 }}
                           whileInView={{ opacity: 1, y: 0 }}
                           viewport={{ once: true }}
                           transition={{ delay: idx * 0.15, duration: 0.5, type: "spring" }}
                           className="bg-white/[0.02] hover:bg-white/[0.04] p-8 rounded-3xl border border-white/5 transition-colors shadow-xl"
                        >
                            <div className="flex items-center gap-3 mb-4 text-red-500 font-black uppercase text-sm tracking-widest"><XCircle className="w-5 h-5" /> Mythe</div>
                            <p className="text-slate-400 mb-6 text-lg">{item.mythe}</p>
                            
                            <div className="w-12 h-1 bg-white/10 mb-6 rounded-full" />
                            
                            <div className="flex items-center gap-3 mb-4 text-green-500 font-black uppercase text-sm tracking-widest"><CheckCircle className="w-5 h-5" /> Réalité</div>
                            <p className="text-white font-bold text-lg leading-relaxed">{item.realite}</p>
                        </motion.div>
                    ))}
                </div>
            </div>
        )}

        {/* FAQ Expertise */}
        <div className="mb-16">
          <motion.h2 
             initial={{ opacity: 0, x: -20 }}
             whileInView={{ opacity: 1, x: 0 }}
             viewport={{ once: true }}
             className="text-3xl lg:text-4xl font-black uppercase tracking-tighter mb-8 flex items-center gap-4"
          >
             <BookOpen className="text-red-600 w-8 h-8 lg:w-10 lg:h-10" /> FAQ Expertise
          </motion.h2>
          <div className="space-y-4">
            {pest.faq.map((item, index) => (
              <motion.details 
                key={index} 
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 }}
                className="group bg-white/[0.02] border border-white/5 p-6 rounded-[1.5rem] hover:border-red-500/30 transition-all cursor-pointer"
              >
                <summary className="font-bold text-xl flex justify-between items-center list-none outline-none">
                  {item.q}
                  <div className="bg-white/5 p-2 rounded-full group-open:bg-red-600/20 group-open:text-red-500 transition-colors shrink-0 ml-4">
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

        <div className="text-center">
            <Link to={`/?devis=${pests[type].title.split(' ')[0]}#devis`} className="inline-block bg-red-600 hover:bg-red-700 text-white font-black py-5 px-12 rounded-full uppercase tracking-[0.2em] transition-all hover:scale-105 active:scale-95 shadow-[0_20px_40px_rgba(220,38,38,0.3)]">
              Demander un devis gratuit
            </Link>
        </div>
        </div>
      </div>
    </div>
  );
};

export default PestPage;
