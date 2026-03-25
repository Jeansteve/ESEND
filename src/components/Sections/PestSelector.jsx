import React from 'react';
import { motion } from 'framer-motion';
import { AlertTriangle, Sparkles, Activity, ArrowRight, ShieldCheck, Target, Lightbulb } from 'lucide-react';

const pests = [
  {
    id: 'rongeur',
    name: 'Traitement des Nuisibles',
    species: 'Rats, Souris & Insectes',
    image: 'https://images.unsplash.com/photo-1452723312111-3a7d0db0e024?q=80&w=1000&auto=format&fit=crop',
    icon: <AlertTriangle className="w-5 h-5 text-red-600" />,
    expertise: "Spécialiste de la dératisation et désinsectisation à Menton, ESEND déploie des solutions radicales contre les rongeurs et insectes. Nous identifions la source pour une protection définitive.",
    info: "Les bruits dans les cloisons ou traces de déjections sont des alertes critiques. Les nuisibles dégradent vos câbles et isolations, et présentent des risques sanitaires pour vos locaux.",
    benefice: "Retrouvez un environnement sain et sécurisé. Nos protocoles d'éradication sont certifiés, discrets et garantissent la protection durable de votre patrimoine sur la Riviera."
  },
  {
    id: 'desinfection',
    name: 'Désinfection',
    species: 'Hygiène & Protocoles Virucides',
    image: 'https://images.unsplash.com/photo-1584622650111-993a426fbf0a?q=80&w=2070&auto=format&fit=crop',
    icon: <Activity className="w-5 h-5 text-red-600" />,
    expertise: "Nous maîtrisons les protocoles de désinfection microbiologique les plus stricts à Menton. Nos interventions ciblent l'assainissement total de vos bureaux, commerces ou habitations.",
    info: "La désinfection est cruciale après une infestation ou pour prévenir les risques viraux. Nos produits respectent les normes de santé publique (EN 14476) pour une sécurité optimale.",
    benefice: "Garantissez la sécurité sanitaire de vos collaborateurs et clients. Profitez d'un espace purifié et d'une sérénité totale grâce à notre expertise technique certifiée."
  },
  {
    id: 'nettoyage',
    name: 'Nettoyage & Vitres',
    species: 'Entretien de Prestige',
    image: 'https://images.unsplash.com/photo-1581091226825-a6a2a5aee158?q=80&w=1000&auto=format&fit=crop',
    icon: <Sparkles className="w-5 h-5 text-red-600" />,
    expertise: "ESEND assure un nettoyage professionnel méticuleux pour appartements, villas et vitrages à Menton. Nous utilisons du matériel de pointe pour un résultat irréprochable.",
    info: "Un entretien régulier valorise vos surfaces et prolonge leur éclat. Nous sommes experts dans le nettoyage de vitres difficiles d'accès et le soin des matériaux nobles avec précision.",
    benefice: "Valorisez votre patrimoine avec un intérieur lumineux et une transparence parfaite. Gagnez du temps et profitez d'un confort visuel supérieur grâce à notre souci du détail."
  }
];

const cardVariants = {
  initial: {
    y: 0,
    scale: 1,
    borderColor: "rgba(255, 255, 255, 0.05)",
    backgroundColor: "rgba(15, 23, 42, 0.4)",
  },
  hover: {
    y: -12,
    scale: 1.02,
    borderColor: "rgba(220, 38, 38, 0.4)",
    backgroundColor: "rgba(15, 23, 42, 0.6)",
    transition: {
      type: "spring",
      stiffness: 400,
      damping: 25
    }
  }
};

const PestSelector = () => {
  return (
    <section id="services" className="relative bg-[#020617] text-white py-32 px-6 overflow-hidden">
      <div className="max-w-[1440px] mx-auto w-full relative z-10">
        
        {/* Header Section */}
        <div className="max-w-3xl mb-16 lg:mb-24">
          <motion.div 
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            className="inline-flex items-center gap-3 text-red-600 font-black uppercase tracking-[0.3em] text-[10px] mb-4"
          >
            <span className="w-8 h-px bg-red-600"></span> Nos Dossiers Tactiques
          </motion.div>
          <h2 className="text-5xl lg:text-7xl font-black tracking-tighter uppercase mb-6 leading-none">
            Services <span className="text-red-600">ESEND</span>
          </h2>
          <p className="text-slate-400 font-medium text-lg lg:text-xl italic border-l-2 border-red-600 pl-6">
            "L'expertise terrain au service de votre sérénité."
          </p>
        </div>

        {/* Services Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 lg:gap-10">
          {pests.map((pest, index) => (
            <motion.div
              key={pest.id}
              variants={cardVariants}
              initial="initial"
              whileHover="hover"
              className="group relative flex flex-col border rounded-[2.5rem] p-8 lg:p-10 transition-all duration-500 shadow-2xl overflow-hidden"
            >
              {/* Animated Glow behind card */}
              <div className="absolute -inset-1 bg-gradient-to-r from-red-600/0 via-red-600/5 to-red-600/0 opacity-0 group-hover:opacity-100 blur-2xl transition-opacity duration-500" />

              {/* Image HUD */}
              <div className="relative aspect-[16/10] rounded-3xl overflow-hidden mb-10 border border-white/5 z-10">
                <img src={pest.image} alt={pest.name} className="w-full h-full object-cover grayscale brightness-75 group-hover:grayscale-0 group-hover:brightness-100 transition-all duration-700" />
                <div className="absolute inset-0 bg-gradient-to-t from-slate-950/80 via-transparent to-transparent" />
                <div className="absolute top-4 right-4 bg-black/50 backdrop-blur-md p-3 rounded-full border border-white/10">
                  {pest.icon}
                </div>
              </div>

              {/* Title Section */}
              <div className="mb-10 z-10">
                <span className="text-[10px] font-black uppercase tracking-[0.2em] text-red-600 block mb-3">{pest.species}</span>
                <h3 className="text-2xl lg:text-3xl font-black uppercase tracking-tighter group-hover:text-red-600 transition-colors">{pest.name}</h3>
              </div>

              {/* Detailed Content */}
              <div className="flex-grow space-y-8 z-10">
                <div className="flex gap-4">
                  <Target className="w-5 h-5 text-red-600 shrink-0 mt-1 opacity-60 group-hover:opacity-100 transition-opacity" />
                  <div>
                    <h4 className="text-[10px] font-black uppercase tracking-widest text-white mb-1">Expertise</h4>
                    <p className="text-xs text-slate-400 leading-relaxed">{pest.expertise}</p>
                  </div>
                </div>

                <div className="flex gap-4">
                  <Lightbulb className="w-5 h-5 text-red-600 shrink-0 mt-1 opacity-60 group-hover:opacity-100 transition-opacity" />
                  <div>
                    <h4 className="text-[10px] font-black uppercase tracking-widest text-white mb-1">Infos Utiles</h4>
                    <p className="text-xs text-slate-400 leading-relaxed">{pest.info}</p>
                  </div>
                </div>

                <div className="flex gap-4">
                  <ShieldCheck className="w-5 h-5 text-red-600 shrink-0 mt-1 opacity-60 group-hover:opacity-100 transition-opacity" />
                  <div>
                    <h4 className="text-[10px] font-black uppercase tracking-widest text-white mb-1">Bénéfice</h4>
                    <p className="text-xs text-slate-400 leading-relaxed font-semibold italic">{pest.benefice}</p>
                  </div>
                </div>
              </div>

              {/* Action Button */}
              <motion.button 
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="mt-12 w-full bg-white text-black py-5 rounded-2xl font-black text-[10px] uppercase tracking-widest transition-all flex items-center justify-center gap-3 group-hover:bg-red-600 group-hover:text-white z-10"
              >
                Demander une intervention <ArrowRight className="w-4 h-4" />
              </motion.button>
            </motion.div>
          ))}
        </div>
      </div>

      {/* Background Decorative Line */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-px h-full bg-gradient-to-b from-transparent via-red-600/10 to-transparent z-0" />
    </section>
  );
};

export default PestSelector;
