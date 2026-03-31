import React from 'react';
import { useSearchParams } from 'react-router-dom';
import { motion } from 'framer-motion';
import { pests } from '../data/pests';
import { AlertTriangle, Shield, BookOpen, ChevronDown, CheckCircle, XCircle } from 'lucide-react';

const PestPage = () => {
  const [searchParams] = useSearchParams();
  const type = searchParams.get('type') || 'punaises-de-lit';
  const pest = pests[type] || pests['punaises-de-lit'];

  return (
    <div className="min-h-screen bg-[#020617] text-white pt-20 pb-20">
      <div className="max-w-4xl mx-auto px-6">
        {/* Header Immersif */}
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="mb-12">
          <h1 className="text-5xl md:text-7xl font-black tracking-tighter uppercase mb-6">{pest.title}</h1>
          <img src={pest.image} alt={pest.title} className="w-full h-80 object-cover rounded-2xl shadow-2xl shadow-red-900/20 mb-8" />
          <p className="text-2xl text-slate-400 font-bold uppercase tracking-widest">{pest.description}</p>
        </motion.div>

        {/* Action Immédiate */}
        <motion.div initial={{ opacity: 0, scale: 0.95 }} animate={{ opacity: 1, scale: 1 }} className="bg-red-600/10 border border-red-600/50 p-8 rounded-3xl mb-12 flex gap-6 items-start">
          <AlertTriangle className="w-12 h-12 text-red-500 shrink-0" />
          <div>
            <h3 className="text-xl font-black uppercase text-red-500 mb-2">Protocole d'Urgence Immédiate</h3>
            <p className="text-lg text-slate-200">{pest.actionImmediate}</p>
          </div>
        </motion.div>

        {/* Mythes vs Réalité */}
        {pest.mythesVsRealite && (
            <div className="mb-12">
                <h2 className="text-3xl font-black uppercase tracking-tighter mb-8 flex items-center gap-3">
                    <Shield className="text-red-600" /> Mythes vs Réalité
                </h2>
                <div className="grid md:grid-cols-2 gap-6">
                    {pest.mythesVsRealite.map((item, idx) => (
                        <div key={idx} className="bg-white/[0.03] p-6 rounded-2xl border border-white/5">
                            <div className="flex items-center gap-2 mb-2 text-red-500 font-bold uppercase text-xs">
                                <XCircle className="w-4 h-4" /> Mythe
                            </div>
                            <p className="text-slate-400 mb-4">{item.mythe}</p>
                            <div className="flex items-center gap-2 mb-2 text-green-500 font-bold uppercase text-xs">
                                <CheckCircle className="w-4 h-4" /> Réalité
                            </div>
                            <p className="text-white font-bold">{item.realite}</p>
                        </div>
                    ))}
                </div>
            </div>
        )}

        {/* FAQ Expertise */}
        <div className="mb-12">
          <h2 className="text-3xl font-black uppercase tracking-tighter mb-8 flex items-center gap-3">
            <BookOpen className="text-red-600" /> FAQ Expertise
          </h2>
          <div className="space-y-4">
            {pest.faq.map((item, index) => (
              <details key={index} className="group bg-white/[0.03] border border-white/5 p-6 rounded-2xl">
                <summary className="font-black text-lg flex justify-between items-center cursor-pointer list-none">
                  {item.q}
                  <ChevronDown className="w-5 h-5 group-open:rotate-180 transition-transform" />
                </summary>
                <p className="mt-4 text-slate-400 leading-relaxed">{item.a}</p>
              </details>
            ))}
          </div>
        </div>

        {/* CTA */}
        <div className="text-center">
            <button className="bg-red-600 hover:bg-red-700 text-white font-black py-4 px-10 rounded-full uppercase tracking-widest transition-all">
                Demander un Diagnostic Expert
            </button>
        </div>
      </div>
    </div>
  );
};

export default PestPage;
