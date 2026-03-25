import React from 'react';
import { motion } from 'framer-motion';
import { Heart, ShieldCheck, MapPin } from 'lucide-react';

const DuoExpertise = () => {
  return (
    <section id="expertise" className="py-24 px-6 bg-slate-950 text-white overflow-hidden">
      <div className="max-w-7xl mx-auto">
        <div className="grid lg:grid-cols-2 gap-16 items-center">
          
          {/* Visual Side */}
          <motion.div 
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            className="relative"
          >
            <div className="relative z-10 rounded-[3rem] overflow-hidden border border-white/10 shadow-2xl aspect-[4/5] lg:aspect-square">
              <img 
                src="https://images.unsplash.com/photo-1590650046871-92c887180603?q=80&w=2070&auto=format&fit=crop" 
                alt="Mari et Femme Experts ESEND" 
                className="w-full h-full object-cover grayscale hover:grayscale-0 transition-all duration-700"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-transparent to-transparent" />
              
              <div className="absolute bottom-8 left-8 right-8 p-6 bg-slate-900/80 backdrop-blur-xl rounded-2xl border border-red-600/20">
                <div className="flex items-center gap-3 mb-2">
                  <Heart className="w-4 h-4 text-red-600 fill-red-600" />
                  <span className="text-xs font-black uppercase tracking-widest text-white">Entreprise Familiale</span>
                </div>
                <p className="text-sm text-slate-300 italic">
                  "À Menton, nous intervenons en duo pour vous offrir la rigueur d'un expert et la proximité d'une famille."
                </p>
              </div>
            </div>
            
            {/* Background Accents */}
            <div className="absolute -top-10 -left-10 w-40 h-40 bg-red-600/10 rounded-full blur-3xl" />
            <div className="absolute -bottom-10 -right-10 w-60 h-60 bg-blue-600/10 rounded-full blur-3xl" />
          </motion.div>

          {/* Content Side */}
          <motion.div 
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            className="space-y-8"
          >
            <div className="inline-flex items-center gap-2 text-red-600 font-black uppercase tracking-[0.2em] text-[10px]">
              <span className="w-8 h-px bg-red-600"></span> NOTRE HISTOIRE
            </div>
            
            <h2 className="text-4xl md:text-6xl font-black uppercase tracking-tighter leading-none">
              L'Expertise <span className="text-red-600 italic">Duo</span> <br />
              Mari & Femme
            </h2>
            
            <p className="text-lg text-slate-400 leading-relaxed">
              Basés à Menton, nous avons fondé ESEND avec une mission simple : apporter une réponse professionnelle, 
              éthique et ultra-réactive aux problèmes de nuisibles et d'hygiène. 
            </p>

            <div className="grid sm:grid-cols-2 gap-6">
              {[
                { icon: <ShieldCheck className="w-6 h-6 text-red-600" />, title: "Certifiés État", desc: "Agréments Certibiocide complets." },
                { icon: <MapPin className="w-6 h-6 text-red-600" />, title: "Proximité Menton", desc: "Intervention sous 2h sur le secteur." },
              ].map((item, i) => (
                <div key={i} className="p-6 rounded-2xl bg-slate-900/50 border border-white/5 hover:border-red-600/20 transition-colors">
                  <div className="mb-4">{item.icon}</div>
                  <h3 className="font-black uppercase tracking-tight text-white mb-2">{item.title}</h3>
                  <p className="text-sm text-slate-400">{item.desc}</p>
                </div>
              ))}
            </div>

            <button className="bg-white text-black px-8 py-4 rounded-xl font-black uppercase tracking-widest text-xs hover:bg-red-600 hover:text-white transition-all">
              Découvrir nos valeurs
            </button>
          </motion.div>

        </div>
      </div>
    </section>
  );
};

export default DuoExpertise;
