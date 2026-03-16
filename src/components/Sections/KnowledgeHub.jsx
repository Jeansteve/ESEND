import React from 'react';
import { motion } from 'framer-motion';

const articles = [
  {
    id: 1,
    title: "Nids de Guêpes : Anticiper le danger",
    excerpt: "Repérez les premiers signaux avant que le nid ne devienne une menace réelle pour votre foyer.",
    image: "https://images.unsplash.com/photo-1590644365607-1c5a519a7a37?q=80&w=2070&auto=format&fit=crop",
    tag: "Saison : Printemps"
  },
  {
    id: 2,
    title: "Rongeurs : Les points d'accès critiques",
    excerpt: "Les 5 failles structurelles que les rongeurs utilisent pour s'installer durablement.",
    image: "https://images.unsplash.com/photo-1576089172869-4f5f6f315620?q=80&w=2070&auto=format&fit=crop",
    tag: "Saison : Hiver"
  },
  {
    id: 3,
    title: "Punaises : Le Guide du Voyageur",
    excerpt: "Évitez de ramener des passagers clandestins dans vos bagages au retour de vos déplacements.",
    image: "https://images.unsplash.com/photo-1595246140625-573b715d11dc?q=80&w=2070&auto=format&fit=crop",
    tag: "Vigilance"
  }
];

const KnowledgeHub = () => {
  return (
    <section id="encyclopedie" className="py-32 px-6 bg-white">
      <div className="max-w-7xl mx-auto">
        <div className="flex flex-col md:flex-row justify-between items-end mb-20 gap-8">
          <div className="max-w-2xl">
            <h2 className="text-5xl lg:text-6xl font-black tracking-tighter uppercase mb-6 leading-none">Prévenir le <span className="text-esend-red">Risque</span></h2>
            <p className="text-zinc-500 font-medium text-lg">Nos guides d'experts pour identifier et anticiper les menaces sanitaires.</p>
          </div>
          <button className="bg-black text-white px-8 py-4 rounded-2xl font-black uppercase tracking-widest text-[10px] hover:bg-esend-red transition-all">L'Encyclopédie Complète</button>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-10">
          {articles.map((article, index) => (
            <motion.div 
              key={article.id}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1 }}
              viewport={{ once: true }}
              className="group cursor-pointer"
            >
              <div className="relative rounded-[3rem] overflow-hidden mb-8 aspect-[4/3] shadow-2xl transition-transform duration-700 group-hover:scale-[1.02]">
                <img src={article.image} alt={article.title} className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110" />
                <div className="absolute top-6 left-6 bg-white/90 backdrop-blur-md px-4 py-2 rounded-xl font-black text-[10px] uppercase tracking-widest text-esend-red shadow-xl">
                  {article.tag}
                </div>
              </div>
              <h3 className="text-2xl font-black tracking-tighter uppercase mb-4 group-hover:text-esend-red transition-colors duration-300">
                {article.title}
              </h3>
              <p className="text-zinc-500 text-sm font-medium leading-relaxed mb-6">
                {article.excerpt}
              </p>
              <div className="flex items-center gap-3 text-[10px] font-black uppercase tracking-widest text-black group-hover:gap-5 transition-all">
                Lire l'expertise <span className="text-esend-red">→</span>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default KnowledgeHub;
