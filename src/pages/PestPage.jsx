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
    'punaises-de-lit': <Snail className="w-5 h-5 mb-1" />,
    'rats': <Rat className="w-5 h-5 mb-1" />,
    'cafards': <Bug className="w-5 h-5 mb-1" />,
    'frelons': <ShieldCheck className="w-5 h-5 mb-1" />,
    'fourmis': <Asterisk className="w-5 h-5 mb-1" />
  };

  return (
    <div className="min-h-screen bg-[#020617] text-white pt-24 pb-20 overflow-x-hidden">
      <div className="max-w-4xl mx-auto px-6">
        
        {/* Sélecteur Premium Interactif */}
        <div className="relative flex w-full mb-16 bg-slate-900/50 backdrop-blur-xl border border-white/5 p-2 rounded-3xl overflow-x-auto no-scrollbar shadow-[0_20px_40px_rgba(0,0,0,0.5)]">
          <div className="flex w-full min-w-max">
            {pestKeys.map(key => {
              const isActive = type === key;
              return (
                <Link 
                  key={key} 
                  to={`/services/nuisibles?type=${key}`} 
                  className={`relative flex-1 flex flex-col items-center justify-center p-3 sm:p-4 rounded-2xl transition-all duration-300 ${isActive ? 'text-white' : 'text-slate-400 hover:text-white hover:bg-white/5'}`}
                >
                  {isActive && (
                    <motion.div 
                      layoutId="activeTab"
                      className="absolute inset-0 bg-red-600 rounded-2xl shadow-[0_0_20px_rgba(220,38,38,0.4)]"
                      initial={false}
                      transition={{ type: "spring", stiffness: 400, damping: 30 }}
                    />
                  )}
                  <div className="relative z-10 flex flex-col items-center">
                    {iconMap[key]}
                    <span className="text-[9px] sm:text-[10px] font-black uppercase tracking-widest text-center mt-1">
                      {pests[key].title.split(' ')[0]} {/* Affiche le premier mot pour que ça tienne bien */}
                    </span>
                  </div>
                </Link>
              );
            })}
          </div>
        </div>

        {/* Header Immersif */}
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="mb-12">
          <h1 className="text-5xl md:text-7xl font-black tracking-tighter uppercase mb-6">{pest.title}</h1>
          <img src={pest.image} alt={pest.title} className="w-full h-80 object-cover rounded-2xl shadow-2xl shadow-red-900/20 mb-8" />
          <p className="text-2xl text-slate-400 font-bold uppercase tracking-widest">{pest.description}</p>
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
        <div className="bg-red-600/10 border border-red-600/50 p-8 rounded-3xl mb-12 flex gap-6 items-start">
          <AlertTriangle className="w-12 h-12 text-red-500 shrink-0" />
          <div>
            <h3 className="text-xl font-black uppercase text-red-500 mb-2">Protocole d'Urgence Immédiate</h3>
            <p className="text-lg text-slate-200">{pest.actionImmediate}</p>
          </div>
        </div>

        {/* Mythes vs Réalité */}
        {pest.mythesVsRealite && (
            <div className="mb-12">
                <h2 className="text-3xl font-black uppercase tracking-tighter mb-8 flex items-center gap-3">
                    <Shield className="text-red-600" /> Mythes vs Réalité
                </h2>
                <div className="grid md:grid-cols-2 gap-6">
                    {pest.mythesVsRealite.map((item, idx) => (
                        <div key={idx} className="bg-white/[0.03] p-6 rounded-2xl border border-white/5">
                            <div className="flex items-center gap-2 mb-2 text-red-500 font-bold uppercase text-xs"><XCircle className="w-4 h-4" /> Mythe</div>
                            <p className="text-slate-400 mb-4">{item.mythe}</p>
                            <div className="flex items-center gap-2 mb-2 text-green-500 font-bold uppercase text-xs"><CheckCircle className="w-4 h-4" /> Réalité</div>
                            <p className="text-white font-bold">{item.realite}</p>
                        </div>
                    ))}
                </div>
            </div>
        )}

        {/* FAQ Expertise */}
        <div className="mb-12">
          <h2 className="text-3xl font-black uppercase tracking-tighter mb-8 flex items-center gap-3"><BookOpen className="text-red-600" /> FAQ Expertise</h2>
          <div className="space-y-4">
            {pest.faq.map((item, index) => (
              <details key={index} className="group bg-white/[0.03] border border-white/5 p-6 rounded-2xl">
                <summary className="font-black text-lg flex justify-between items-center cursor-pointer list-none">
                  {item.q}<ChevronDown className="w-5 h-5 group-open:rotate-180 transition-transform" />
                </summary>
                <p className="mt-4 text-slate-400 leading-relaxed">{item.a}</p>
              </details>
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
  );
};

export default PestPage;
