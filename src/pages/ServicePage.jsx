import React, { useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { ArrowLeft, Phone, FileText, Target, Lightbulb, ShieldCheck } from 'lucide-react';

const serviceData = {
  rongeur: {
    title: "Traitement des Nuisibles",
    subtitle: "Dératisation & Désinsectisation de Haute Précision",
    hero: "https://images.unsplash.com/photo-1452723312111-3a7d0db0e024?q=80&w=2070&auto=format&fit=crop",
    expertise: "L'unité ESEND déploie un protocole d'éradication totale contre les rats, souris, blattes et punaises de lit. Notre approche ne se limite pas au traitement : nous scellons votre habitat.",
    points: [
      { t: "Audit de Vulnérabilité", d: "Identification chirurgicale des points d'entrée (fissures, gaines, sous-sols)." },
      { t: "Traitement Certifié", d: "Utilisation de produits de gamme professionnelle (Certibiocide) sécurisés pour les humains." },
      { t: "Blindage Sanitaire", d: "Mise en place de barrières physiques et mécaniques pour empêcher le retour des nuisibles." }
    ],
    stats: { efficacite: "100%", rapidite: "24/48h", garantie: "6 mois" }
  },
  desinfection: {
    title: "Désinfection",
    subtitle: "Assainissement & Protocoles Virucides Menton",
    hero: "https://images.unsplash.com/photo-1584622650111-993a426fbf0a?q=80&w=2070&auto=format&fit=crop",
    expertise: "Neutralisation des agents pathogènes (virus, bactéries, champignons). Indispensable pour les commerces, bureaux et fin d'infestations massives sur la Riviera.",
    points: [
      { t: "Nébulisation Fine", d: "Diffusion d'une brume désinfectante atteignant les zones les plus inaccessibles." },
      { t: "Norme EN 14476", d: "Produits virucides certifiés conformes aux exigences de santé publique." },
      { t: "Rapport d'Intervention", d: "Délivrance d'un certificat d'assainissement pour vos registres de sécurité." }
    ],
    stats: { efficacite: "99.9%", rapidite: "Immédiate", garantie: "Certifiée" }
  },
  nettoyage: {
    title: "Nettoyage & Vitres",
    subtitle: "Entretien de Prestige pour Particuliers et Pros",
    hero: "https://images.unsplash.com/photo-1581091226825-a6a2a5aee158?q=80&w=2070&auto=format&fit=crop",
    expertise: "La finition ESEND pour vos espaces de vie. Spécialistes du nettoyage de vitres difficiles d'accès et de l'entretien méticuleux d'appartements à Menton.",
    points: [
      { t: "Vitrages Complexes", d: "Nettoyage de vérandas, baies vitrées et fenêtres en hauteur avec matériel pro." },
      { t: "Soin des Matériaux", d: "Traitement adapté pour le marbre, parquet et surfaces délicates de standing." },
      { t: "Éclat Durable", d: "Utilisation de produits hydrophobes pour limiter l'adhérence de la poussière et du sel marin." }
    ],
    stats: { efficacite: "Premium", rapidite: "Sur RDV", garantie: "Sans trace" }
  }
};

const ServicePage = () => {
  const { serviceId } = useParams();
  const data = serviceData[serviceId];
  useEffect(() => { window.scrollTo(0, 0); }, []);
  if (!data) return <div className="min-h-screen bg-black text-white flex items-center justify-center">Dossier non trouvé.</div>;
  return (
    <div className="bg-black text-white min-h-screen pt-32 pb-24 selection:bg-red-600">
      <div className="max-w-7xl mx-auto px-6">
        <Link to="/" className="inline-flex items-center gap-2 text-zinc-500 hover:text-red-600 transition-colors mb-12 group font-black uppercase text-[10px] tracking-widest">
          <ArrowLeft className="w-4 h-4 group-hover:-translate-x-1 transition-transform" /> Retour aux dossiers
        </Link>
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-start mb-32">
          <motion.div initial={{ opacity: 0, x: -30 }} animate={{ opacity: 1, x: 0 }}>
            <span className="text-red-600 font-black uppercase tracking-[0.4em] text-[10px] block mb-4">Dossier Tactique #{serviceId.toUpperCase()}</span>
            <h1 className="text-5xl lg:text-7xl font-black tracking-tighter uppercase mb-8 leading-[0.9]">{data.title}</h1>
            <p className="text-xl text-zinc-400 font-medium mb-10 leading-relaxed italic border-l-2 border-red-600 pl-6">{data.subtitle}</p>
            <p className="text-lg text-zinc-500 leading-relaxed mb-12">{data.expertise}</p>
            <div className="flex flex-wrap gap-6">
              <a href="tel:0651239841" className="bg-red-600 text-white px-10 py-5 rounded-2xl font-black uppercase tracking-widest hover:bg-white hover:text-black transition-all flex items-center gap-3"><Phone className="w-4 h-4" /> Urgence Directe</a>
              <button className="border border-white/10 bg-white/5 hover:bg-white/10 text-white px-10 py-5 rounded-2xl font-black uppercase tracking-widest transition-all flex items-center gap-3"><FileText className="w-4 h-4" /> Devis Express</button>
            </div>
          </motion.div>
          <motion.div initial={{ opacity: 0, scale: 0.95 }} animate={{ opacity: 1, scale: 1 }} className="relative">
            <div className="aspect-[4/3] rounded-[3rem] overflow-hidden border border-white/10 shadow-2xl relative z-10">
              <img src={data.hero} className="w-full h-full object-cover" alt={data.title} />
              <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
            </div>
            <div className="absolute -inset-4 bg-red-600/10 blur-3xl -z-0 rounded-full" />
          </motion.div>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-32">
          {Object.entries(data.stats).map(([key, val], i) => (
            <div key={key} className="bg-zinc-900/50 border border-white/5 p-8 rounded-[2rem] text-center group hover:border-red-600/30 transition-colors">
              <div className="text-zinc-500 text-[10px] font-black uppercase tracking-widest mb-2">{key}</div>
              <div className="text-4xl font-black tracking-tighter text-white group-hover:text-red-600 transition-colors">{val}</div>
            </div>
          ))}
        </div>
        <div className="max-w-4xl mx-auto">
          <h2 className="text-3xl font-black uppercase tracking-tighter mb-12 flex items-center gap-4"><span className="w-12 h-px bg-red-600"></span> Méthodologie d'intervention</h2>
          <div className="space-y-6">
            {data.points.map((p, i) => (
              <motion.div key={i} whileHover={{ x: 10 }} className="bg-zinc-900/30 border border-white/5 p-8 rounded-3xl flex gap-6 items-start group">
                <div className="w-12 h-12 rounded-2xl bg-black border border-white/10 flex items-center justify-center text-red-600 font-black shrink-0 group-hover:border-red-600/50 transition-colors">0{i+1}</div>
                <div><h3 className="text-xl font-black uppercase tracking-tighter mb-2">{p.t}</h3><p className="text-zinc-400 leading-relaxed">{p.d}</p></div>
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default ServicePage;
