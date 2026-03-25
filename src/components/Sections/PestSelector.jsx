import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Shield, Zap, AlertTriangle, Ghost, Sparkles, Trash2, Crosshair, ArrowRight, Activity } from 'lucide-react';

const pests = [
  {
    id: 'rongeur',
    name: 'Traitement des Nuisibles',
    species: 'Rats, Souris & Insectes',
    image: 'https://images.unsplash.com/photo-1452723312111-3a7d0db0e024?q=80&w=1000&auto=format&fit=crop',
    icon: <AlertTriangle className="w-5 h-5 text-red-600" />,
    desc: `**Expertise :** Spécialiste de la dératisation et désinsectisation à Menton, ESEND déploie des solutions radicales contre les rongeurs et insectes. Nous identifions la source pour une protection définitive.

**Infos Utiles :** Les bruits dans les cloisons ou traces de déjections sont des alertes critiques. Les nuisibles dégradent vos câbles et isolations, et présentent des risques sanitaires pour vos locaux.

**Bénéfice :** Retrouvez un environnement sain et sécurisé. Nos protocoles d'éradication sont certifiés, discrets et garantissent la protection durable de votre patrimoine sur la Riviera.`
  },
  {
    id: 'desinfection',
    name: 'Désinfection',
    species: 'Hygiène & Protocoles Virucides',
    image: 'https://images.unsplash.com/photo-1584622650111-993a426fbf0a?q=80&w=2070&auto=format&fit=crop',
    icon: <Activity className="w-5 h-5 text-red-600" />,
    desc: `**Expertise :** Nous maîtrisons les protocoles de désinfection microbiologique les plus stricts à Menton. Nos interventions ciblent l'assainissement total de vos bureaux, commerces ou habitations.

**Infos Utiles :** La désinfection est cruciale après une infestation ou pour prévenir les risques viraux. Nos produits respectent les normes de santé publique (EN 14476) pour une sécurité optimale.

**Bénéfice :** Garantissez la sécurité sanitaire de vos collaborateurs et clients. Profitez d'un espace purifié et d'une sérénité totale grâce à notre expertise technique certifiée.`
  },
  {
    id: 'nettoyage',
    name: 'Nettoyage & Vitres',
    species: 'Entretien de Prestige',
    image: 'https://images.unsplash.com/photo-1581091226825-a6a2a5aee158?q=80&w=1000&auto=format&fit=crop',
    icon: <Sparkles className="w-5 h-5 text-red-600" />,
    desc: `**Expertise :** ESEND assure un nettoyage professionnel méticuleux pour appartements, villas et vitrages à Menton. Nous utilisons du matériel de pointe pour un résultat irréprochable.

**Infos Utiles :** Un entretien régulier valorise vos surfaces et prolonge leur éclat. Nous sommes experts dans le nettoyage de vitres difficiles d'accès et le soin des matériaux nobles avec précision.

**Bénéfice :** Valorisez votre patrimoine avec un intérieur lumineux et une transparence parfaite. Gagnez du temps et profitez d'un confort visuel supérieur grâce à notre souci du détail.`
  }
];

const PestSelector = () => {
  const [activeId, setActiveId] = useState(pests[0].id);

  return (
    <section id="services" className="relative min-h-screen lg:h-screen flex items-center justify-center bg-[#020617] text-white py-12 lg:py-0 overflow-hidden">
      <div className="max-w-[1440px] mx-auto px-6 w-full relative z-10 flex flex-col">
        
        {/* Section Header */}
        <div className="max-w-2xl mb-8 lg:mb-12 text-left pt-20 lg:pt-0">
          <motion.div 
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            className="inline-flex items-center gap-3 text-red-600 font-black uppercase tracking-[0.3em] text-[10px] mb-3"
          >
            <span className="w-8 h-px bg-red-600"></span> Nos Dossiers Tactiques
          </motion.div>
          <h2 className="text-3xl md:text-5xl lg:text-6xl font-black tracking-tighter uppercase mb-2 leading-none">
            Services <span className="text-red-600 drop-shadow-[0_0_20px_rgba(220,38,38,0.4)]">ESEND</span>
          </h2>
          <p className="text-slate-400 font-medium text-sm lg:text-base italic max-w-xl">
            "L'expertise terrain au service de votre sérénité."
          </p>
        </div>

        {/* Tactical Cards Grid - 3 Columns */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-8">
          {pests.map((pest, index) => (
            <motion.div
              key={pest.id}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.1 }}
              onClick={() => setActiveId(pest.id)}
              whileHover={{ y: -8 }}
              className={`group relative cursor-pointer rounded-[2rem] p-6 lg:p-8 transition-all duration-500 border flex flex-col ${
                activeId === pest.id 
                ? 'bg-slate-900 border-red-600 shadow-[0_20px_50px_-20px_rgba(220,38,38,0.4)] z-10' 
                : 'bg-white/[0.02] border-white/5 grayscale hover:grayscale-0 hover:border-white/10'
              }`}
            >
              {/* Image HUD style */}
              <div className="relative aspect-[16/10] rounded-2xl overflow-hidden mb-6 border border-white/5">
                <img 
                  src={pest.image} 
                  alt={pest.name} 
                  className={`w-full h-full object-cover transition-all duration-700 group-hover:scale-110 ${activeId !== pest.id ? 'brightness-50' : 'brightness-90'}`} 
                />
                <div className="absolute inset-0 bg-gradient-to-t from-slate-950/80 via-transparent to-transparent" />
                <div className="absolute top-4 right-4 bg-black/50 backdrop-blur-md p-3 rounded-full border border-white/10">
                  {pest.icon}
                </div>
              </div>

              {/* Content */}
              <div className="flex flex-col flex-grow">
                <span className="text-[10px] font-black uppercase tracking-widest text-red-600 block mb-2">
                  {pest.species}
                </span>
                <h3 className="text-xl lg:text-2xl font-black uppercase tracking-tighter mb-6 group-hover:text-red-600 transition-colors">{pest.name}</h3>

                <AnimatePresence>
                  {activeId === pest.id && (
                    <motion.div
                      initial={{ height: 0, opacity: 0 }}
                      animate={{ height: 'auto', opacity: 1 }}
                      exit={{ height: 0, opacity: 0 }}
                      className="overflow-hidden"
                    >
                      <div className="text-[11px] lg:text-xs text-slate-400 leading-relaxed mb-8 font-medium whitespace-pre-wrap space-y-4 border-t border-white/5 pt-6">
                        {pest.desc.split('\n\n').map((para, i) => (
                          <p key={i}>{para}</p>
                        ))}
                      </div>
                      <motion.button 
                        whileHover={{ scale: 1.02 }}
                        whileTap={{ scale: 0.98 }}
                        className="w-full bg-white text-black py-4 rounded-xl font-black text-[10px] uppercase tracking-widest transition-all flex items-center justify-center gap-2 hover:bg-red-600 hover:text-white"
                      >
                        Demander une intervention <ArrowRight className="w-3 h-3" />
                      </motion.button>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            </motion.div>
          ))}
        </div>
      </div>

      {/* Decorative Elements */}
      <div className="absolute top-0 left-1/4 w-px h-full bg-gradient-to-b from-transparent via-red-600/5 to-transparent z-0 opacity-20" />
    </section>
  );
};

export default PestSelector;
