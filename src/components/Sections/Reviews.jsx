import React from 'react';
import { motion } from 'framer-motion';
import { Star } from 'lucide-react';

const reviews = [
  { id: 1, name: "Jean-Marc D.", city: "Lille", text: "Une réactivité impressionnante pour un nid de frelons. Le technicien est arrivé en moins de 2 heures. Travail propre et sécurisé.", rating: 5 },
  { id: 2, name: "Sophie L.", city: "Arras", text: "Enfin débarrassés des punaises de lit après plusieurs échecs avec d'autres entreprises. L'expertise d'ESEND a fait la différence.", rating: 5 },
  { id: 3, name: "Thomas P.", city: "Lens", text: "Professionnel, pédagogue et très efficace. Les solutions utilisées sont sans danger pour mes chiens, ce qui était ma priorité.", rating: 5 },
  { id: 4, name: "Marc A.", city: "Douai", text: "Intervention sur des rongeurs dans un entrepôt. Analyse très fine des points d'entrée. Problème réglé durablement.", rating: 5 },
];

const Reviews = () => {
  return (
    <section className="py-32 bg-esend-zinc-950 text-white overflow-hidden relative">
      <div className="max-w-7xl mx-auto px-6 relative z-10">
        <div className="flex flex-col md:flex-row justify-between items-end mb-24 gap-8">
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
          >
            <h2 className="text-5xl lg:text-6xl font-black tracking-tighter uppercase leading-[0.95] mb-6">
              Paroles de <br/><span className="text-esend-red">Confiance</span>
            </h2>
            <p className="text-zinc-500 font-medium max-w-md text-lg">
              L'excellence opérationnelle confirmée par nos clients dans toute la région Hauts-de-France.
            </p>
          </motion.div>

          <motion.div 
            initial={{ opacity: 0, scale: 0.9 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            className="bg-white/5 border border-white/10 p-10 rounded-[2.5rem] text-center backdrop-blur-xl"
          >
            <div className="text-6xl font-black text-white mb-2 tracking-tighter italic">4.9/5</div>
            <div className="flex gap-1 justify-center text-esend-red mb-4">
              {[...Array(5)].map((_, i) => <Star key={i} className="w-5 h-5 fill-current" />)}
            </div>
            <div className="text-[10px] font-black uppercase tracking-[0.2em] text-zinc-500">Note Globale Google</div>
          </motion.div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {reviews.slice(0, 3).map((review, index) => (
            <motion.div
              key={review.id}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1 }}
              viewport={{ once: true }}
              className="bg-zinc-900/50 p-10 rounded-[3rem] border border-white/5 hover:bg-zinc-900 transition-all group"
            >
              <p className="text-lg font-medium italic text-zinc-300 mb-10 leading-relaxed">
                "{review.text}"
              </p>
              <div className="flex items-center gap-4">
                <div className="w-12 h-12 bg-esend-red rounded-full flex items-center justify-center font-black text-xs text-white">
                  {review.name.split(' ').map(n => n[0]).join('')}
                </div>
                <div>
                  <div className="font-black text-sm uppercase tracking-tighter">{review.name}</div>
                  <div className="text-[10px] font-bold text-esend-red uppercase tracking-widest">{review.city}</div>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>

      {/* Abstract Decoration */}
      <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-esend-red/10 rounded-full blur-[120px] -z-0" />
    </section>
  );
};

export default Reviews;
