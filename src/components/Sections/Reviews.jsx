import React from 'react';
import { motion } from 'framer-motion';
import { Star, Quote, CheckCircle2 } from 'lucide-react';

const reviews = [
  { 
    id: 1, 
    name: "Marcel Bollengier", 
    date: "13 Décembre 2022",
    text: "J'ai fait appel à ESEND pour un problème de rongeur dans un appartement. Le contact fut très facile, le devis précis et l'intervention rapide et efficace. Monsieur est à l'écoute, très serviable et professionnel.", 
    rating: 5,
    avatarColor: "bg-blue-500"
  },
  { 
    id: 2, 
    name: "Christophe Fardoux", 
    date: "18 Novembre 2022",
    text: "Nous avons fait appel à la société Esend pour un problème de rongeurs dans nos combles. Nous sommes très satisfaits du travail et des explications. La personne qui est intervenu est très sérieuse.", 
    rating: 5,
    avatarColor: "bg-purple-600"
  },
  { 
    id: 3, 
    name: "Lulu V", 
    date: "15 Novembre 2022",
    text: "Personne extrêmement gentil et compétent.. il prend son temps de nous expliquer.. je recommande fortement", 
    rating: 5,
    avatarColor: "bg-green-600"
  },
  { 
    id: 4, 
    name: "Evelyne Delayen", 
    date: "25 Octobre 2022",
    text: "Bon professionnalisme et très belle efficacité. Nous n'avons plus vu aucun rat dans les jours qui ont suivi le 1er passage. Les animaux domestiques et oiseaux du jardin ont bien été protégés.", 
    rating: 5,
    avatarColor: "bg-emerald-600"
  },
  { 
    id: 5, 
    name: "Myriam Bilquez", 
    date: "24 Octobre 2022",
    text: "Une personne très professionnel et sympathique. Il intervient rapidement avec un prix correcte. N'hésitez pas à le contacter. (Les autres entreprises, j'attends encore leur réponse.)", 
    rating: 5,
    avatarColor: "bg-cyan-600"
  },
  { 
    id: 6, 
    name: "laurent loeuillet", 
    date: "18 Septembre 2022",
    text: "Prestation de qualité concernant 1 nid de guêpes. Traitement en 2 temps car difficile d'accès. Personne très sympathique et professionnelle. Je recommande.", 
    rating: 5,
    avatarColor: "bg-orange-800"
  },
  { 
    id: 7, 
    name: "Fanny Trupin", 
    date: "7 Septembre 2022",
    text: "Personne sérieuse et professionnelle. Ce Monsieur s'est déplacé plusieurs fois et rapidement pour exterminer un nid de guêpe. Merci pour vos services.", 
    rating: 5,
    avatarColor: "bg-blue-600"
  },
  { 
    id: 8, 
    name: "Fabrice Daenekint", 
    date: "7 Septembre 2022",
    text: "Trous dans le jardin devant la maison. Intervention rapide et efficace.", 
    rating: 5,
    avatarColor: "bg-green-700"
  },
  { 
    id: 9, 
    name: "Thomas Patenotre", 
    date: "25 Août 2022",
    text: "Superbe prestation et très grande réactivité (Evacuation d'un essaim d'abeille) : Personnel très sympathique : très grand merci", 
    rating: 5,
    avatarColor: "bg-indigo-600"
  }
];

const ReviewCard = ({ review, index }) => (
  <motion.div
    initial={{ opacity: 0, y: 30 }}
    whileInView={{ opacity: 1, y: 0 }}
    whileHover={{ y: -12, transition: { duration: 0.3 } }}
    viewport={{ once: true }}
    transition={{ delay: index * 0.1 }}
    className="relative group h-full"
  >
    <div className="h-full bg-[var(--bg-card)] backdrop-blur-xl border border-[var(--border-subtle)] p-8 lg:p-10 rounded-[3rem] shadow-xl hover:shadow-2xl transition-all duration-500 overflow-hidden">
      {/* Decorative Quote */}
      <Quote 
        className="absolute top-8 right-10 w-12 h-12 text-[var(--accent-red)]/10 -rotate-6 group-hover:rotate-0 transition-transform duration-700" 
        strokeWidth={1.2} 
      />
      
      {/* Google Trust Header */}
      <div className="flex items-center gap-4 mb-8">
        <div className="relative">
          <div className={`w-14 h-14 ${review.avatarColor} rounded-full flex items-center justify-center text-white font-black text-xl shadow-inner border-2 border-white/10 shrink-0`}>
            {review.name[0]}
          </div>
          {/* Google Badge */}
          <div className="absolute -bottom-1 -right-1 bg-white p-1 rounded-full shadow-md border border-zinc-100 flex items-center justify-center">
            <svg viewBox="0 0 24 24" className="w-3 h-3">
              <path d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z" fill="#4285F4"/>
              <path d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" fill="#34A853"/>
              <path d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l3.66-2.84z" fill="#FBBC05"/>
              <path d="M12 5.38c1.62 0 3.06.56 4.21 1.66l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z" fill="#EA4335"/>
            </svg>
          </div>
        </div>
        <div>
          <div className="font-black text-base lg:text-lg text-[var(--text-main)] tracking-tight leading-none mb-1">{review.name}</div>
          <div className="flex items-center gap-2">
            <span className="text-[10px] font-bold text-[var(--text-dimmed)] uppercase tracking-widest">{review.date}</span>
            <div className="w-1 h-1 bg-[var(--border-subtle)] rounded-full" />
            <div className="flex items-center gap-0.5 text-amber-400">
              <CheckCircle2 className="w-3 h-3 text-blue-500 fill-current bg-white rounded-full p-[1px]" />
              <span className="text-[9px] font-black uppercase text-blue-500">Avis Vérifié</span>
            </div>
          </div>
        </div>
      </div>

      {/* Stars */}
      <div className="flex gap-1 mb-6">
        {[...Array(5)].map((_, i) => (
          <motion.div
            key={i}
            initial={{ scale: 0 }}
            whileInView={{ scale: 1 }}
            transition={{ delay: index * 0.1 + i * 0.05 }}
            viewport={{ once: true }}
          >
            <Star className="w-5 h-5 fill-amber-400 text-amber-400" />
          </motion.div>
        ))}
      </div>

      {/* Text */}
      <p className="text-zinc-500 dark:text-zinc-400 font-medium leading-relaxed italic relative z-10">
        "{review.text}"
      </p>

      {/* Hover Glow Decoration */}
      <div className="absolute -bottom-10 -right-10 w-32 h-32 bg-[var(--accent-red)]/5 rounded-full blur-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-700" />
    </div>
  </motion.div>
);

const Reviews = () => {
  return (
    <section id="avis" className="py-32 bg-[var(--bg-primary)] overflow-hidden relative">
      <div className="max-w-7xl mx-auto px-6 relative z-10">
        {/* Header Section */}
        <div className="flex flex-col md:flex-row justify-between items-end mb-24 gap-12">
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            className="flex-1"
          >
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-[var(--accent-red)]/10 text-[var(--accent-red)] text-xs font-black uppercase tracking-[0.2em] mb-8 border border-[var(--accent-red)]/20 shadow-sm">
              <div className="w-1.5 h-1.5 rounded-full bg-[var(--accent-red)] animate-pulse" />
              Témoignages Clients
            </div>
            <h2 className="text-5xl lg:text-7xl font-black tracking-tighter uppercase leading-[0.85] mb-8 text-[var(--text-main)]">
              Paroles de <br/>
              <span className="text-[var(--accent-red)] italic">Confiance</span>
            </h2>
            <p className="text-[var(--text-dimmed)] font-medium max-w-xl text-lg leading-relaxed">
              L'excellence opérationnelle de ESEND confirmée par plus de 150 avis positifs sur Google. Votre sécurité est notre plus belle réussite.
            </p>
          </motion.div>

          {/* Global Rating Box */}
          <motion.div 
            initial={{ opacity: 0, scale: 0.9, rotate: 2 }}
            whileInView={{ opacity: 1, scale: 1, rotate: 0 }}
            viewport={{ once: true }}
            className="bg-[var(--bg-card)] border border-[var(--border-subtle)] p-10 rounded-[3rem] text-center backdrop-blur-3xl shadow-2xl relative"
          >
            <div className="absolute -top-4 -left-4 bg-[var(--accent-red)] text-white p-3 rounded-2xl shadow-lg -rotate-12">
              <svg viewBox="0 0 24 24" className="w-6 h-6 fill-current">
                <path d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"/>
                <path d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"/>
                <path d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l3.66-2.84z"/>
                <path d="M12 5.38c1.62 0 3.06.56 4.21 1.66l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"/>
              </svg>
            </div>
            <div className="text-6xl font-black text-[var(--text-main)] mb-2 tracking-tighter italic">4.9/5</div>
            <div className="flex gap-1 justify-center text-amber-400 mb-4">
              {[...Array(5)].map((_, i) => <Star key={i} className="w-5 h-5 fill-current" />)}
            </div>
            <div className="text-[10px] font-black uppercase tracking-[0.3em] text-[var(--text-dimmed)]">Note Globale Google</div>
          </motion.div>
        </div>

        {/* Reviews Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {reviews.map((review, index) => (
            <ReviewCard key={review.id} review={review} index={index} />
          ))}
        </div>

        {/* Bottom CTA for Trust */}
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="mt-20 text-center"
        >
          <a 
            href="https://www.google.com/search?q=esend+avis" 
            target="_blank" 
            rel="noopener noreferrer"
            className="inline-flex items-center gap-3 px-8 py-4 bg-[var(--bg-secondary)] border border-[var(--border-subtle)] text-[var(--text-main)] rounded-2xl font-bold hover:bg-[var(--accent-red)] hover:text-white transition-all hover:scale-105 active:scale-95 group shadow-lg"
          >
            Voir tous les avis sur Google
            <span className="w-6 h-6 bg-white rounded-full flex items-center justify-center group-hover:bg-white group-hover:scale-110 transition-all">
               <svg viewBox="0 0 24 24" className="w-3 h-3">
                  <path d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z" fill="#4285F4"/>
                  <path d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" fill="#34A853"/>
                  <path d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l3.66-2.84z" fill="#FBBC05"/>
                  <path d="M12 5.38c1.62 0 3.06.56 4.21 1.66l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z" fill="#EA4335"/>
                </svg>
            </span>
          </a>
        </motion.div>
      </div>

      {/* Background Decorations */}
      <div className="absolute top-0 right-0 w-[600px] h-[600px] bg-[var(--accent-red)]/5 rounded-full blur-[120px] -z-0 opacity-50" />
      <div className="absolute bottom-0 left-0 w-[400px] h-[400px] bg-blue-500/5 rounded-full blur-[100px] -z-0 opacity-30" />
    </section>
  );
};

export default Reviews;
