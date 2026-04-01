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

  const diagnosticQuestions = [
    { q: "Avez-vous observé des traces physiques ?", options: ["Oui, traces visibles", "Non, aucun signe"] },
    { q: "Entendez-vous des bruits anormaux ?", options: ["Oui, régulièrement", "Non, calme"] },
    { q: "Y a-t-il des personnes vulnérables (enfants/personnes âgées) ?", options: ["Oui", "Non"] }
  ];

  const handleDiagnostic = (option) => {
    if (option === "Oui" || option === "Oui, traces visibles" || option === "Oui, régulièrement") setScore(s => s + 1);
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
        <div className="bg-slate-900 border border-slate-800 p-8 rounded-3xl mb-12">
          <h3 className="text-2xl font-black uppercase mb-6 flex items-center gap-3"><Calculator className="text-red-600" /> Évaluez la gravité</h3>
          {step < 3 ? (
            <div>
              <p className="mb-4">{diagnosticQuestions[step].q}</p>
              <div className="flex gap-4">
                {diagnosticQuestions[step].options.map(opt => (
                  <button key={opt} onClick={() => handleDiagnostic(opt)} className="bg-red-600 px-6 py-2 rounded-full font-bold">{opt}</button>
                ))}
              </div>
            </div>
          ) : (
            <div>
              <p className="text-xl">Score de risque : {score}/3</p>
              {score >= 2 && <p className="text-red-500 font-bold mt-2">Risque Élevé ! Contactez-nous immédiatement.</p>}
            </div>
          )}
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
            <button className="bg-red-600 hover:bg-red-700 text-white font-black py-4 px-10 rounded-full uppercase tracking-widest transition-all">Demander un Diagnostic Expert</button>
        </div>
      </div>
    </div>
  );
};

export default PestPage;
