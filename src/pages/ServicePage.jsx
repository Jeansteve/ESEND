import React, { useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Shield, Zap, AlertTriangle, ArrowLeft, Phone, ArrowRight, Crosshair, Target, CheckCircle2 } from 'lucide-react';
import SEO from '../components/UI/SEO';

const serviceData = {
  'deratisation': {
    title: 'Dératisation Tactique',
    subtitle: 'Éradication & Protection Longue Durée',
    tier: 'RANK_S',
    code: 'LE SABOTEUR',
    image: 'https://images.unsplash.com/photo-1452723312111-3a7d0db0e024?q=80&w=1000&auto=format&fit=crop',
    description: "Infiltration extrême. Les rongeurs ne sont pas seulement une nuisance, ils sont une menace directe pour votre infrastructure et votre santé. Notre protocole SCAN-ESEND identifie les points d'entrée invisibles pour une élimination totale.",
    features: [
      { title: 'Diagnostic SCAN', desc: "Détection thermique des nids et passages." },
      { title: 'Barriérage Actif', desc: "Scellement des points d'accès avec matériaux anti-intrusion." },
      { title: 'Monitoring digital', desc: "Suivi en temps réel de l'activité sur site." }
    ],
    stats: [
      { label: 'Efficacité', value: '100%' },
      { label: 'Rapidité', value: '< 24h' },
      { label: 'Garantie', value: '6 MOIS' }
    ]
  },
  'desinsectisation': {
    title: 'Désinsectisation Pro',
    subtitle: 'Punaises de lit & Insectes Rampants',
    tier: 'RANK_SS',
    code: "L'INVISIBLE",
    image: 'https://images.unsplash.com/photo-1581091226825-a6a2a5aee158?q=80&w=1000&auto=format&fit=crop',
    description: "Experts en camouflage, les punaises de lit et cafards nécessitent une approche scientifique. Nous utilisons des traitements à impact foudroyant respectueux de votre environnement immédiat.",
    features: [
      { title: 'Traitement Choc', desc: "Éradication immédiate des adultes et larves." },
      { title: 'Action Rémanente', desc: "Protection continue pendant 8 semaines." },
      { title: 'Audit Post-Op', desc: "Vérification complète après 15 jours." }
    ],
    stats: [
      { label: 'Taux Succès', value: '99.8%' },
      { label: 'Impact', value: 'BIO-PRO' },
      { label: 'Discrétion', value: 'TOTALE' }
    ]
  }
};

const ServicePage = () => {
  const { id } = useParams();
  const service = serviceData[id] || serviceData['deratisation'];

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  const serviceSchema = {
    "@context": "https://schema.org",
    "@type": "Service",
    "name": service.title,
    "description": service.description,
    "provider": {
      "@type": "LocalBusiness",
      "name": "ESEND Nuisibles"
    },
    "areaServed": "Alpes-Maritimes",
    "hasOfferCatalog": {
      "@type": "OfferCatalog",
      "name": service.subtitle,
      "itemListElement": service.features.map(f => ({
        "@type": "Offer",
        "itemOffered": {
          "@type": "Service",
          "name": f.title
        }
      }))
    }
  };

  return (
    <div className="min-h-screen bg-[#020617] text-white selection:bg-red-600/30">
      <SEO 
        title={`${service.title} - ${service.subtitle}`} 
        description={service.description.substring(0, 160)}
        schema={serviceSchema}
      />
      <div className="fixed inset-0 bg-[linear-gradient(rgba(255,255,255,0.02)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.02)_1px,transparent_1px)] bg-[size:40px_40px] pointer-events-none" />
      <div className="fixed inset-0 bg-[radial-gradient(circle_at_50%_0%,rgba(30,27,75,0.4),transparent)] pointer-events-none" />

      <nav className="fixed top-0 w-full z-50 bg-slate-950/80 backdrop-blur-xl border-b border-white/5 py-4">
        <div className="max-w-7xl mx-auto px-6 flex justify-between items-center">
          <Link to="/" className="flex items-center gap-2 group">
            <ArrowLeft className="w-4 h-4 text-red-600 group-hover:-translate-x-1 transition-transform" />
            <span className="text-[10px] font-black uppercase tracking-widest text-white/60 group-hover:text-white transition-colors">Retour</span>
          </Link>
          <div className="flex flex-col items-end">
            <span className="text-xs font-black tracking-tighter text-white">ESEND</span>
            <span className="text-[7px] font-bold text-red-600 uppercase tracking-widest">Protocol Service</span>
          </div>
        </div>
      </nav>

      <main className="pt-24 pb-20 relative z-10">
        <div className="max-w-7xl mx-auto px-6">
          <div className="flex flex-wrap items-center gap-4 mb-8">
            <div className="bg-red-600/10 border border-red-600/20 px-3 py-1 rounded-full flex items-center gap-2">
              <Crosshair className="w-3 h-3 text-red-600" />
              <span className="text-[9px] font-black text-red-600 uppercase tracking-widest">{service.tier}</span>
            </div>
            <div className="bg-white/5 border border-white/10 px-3 py-1 rounded-full">
              <span className="text-[9px] font-black text-white/40 uppercase tracking-widest">ID: {id ? id.toUpperCase() : "UNKNOWN"}</span>
            </div>
            <div className="h-px flex-grow bg-white/5" />
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-20 items-start">
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6 }}
            >
              <span className="text-red-600 font-black uppercase tracking-[0.4em] text-[10px] mb-4 block">{service.code}</span>
              <h1 className="text-4xl md:text-6xl font-black tracking-tighter uppercase mb-4 leading-none">{service.title}</h1>
              <p className="text-xl text-slate-400 font-bold uppercase tracking-widest mb-8">{service.subtitle}</p>
              <p className="text-slate-300 text-lg leading-relaxed mb-10 border-l-2 border-red-600 pl-6 py-2 bg-red-600/5">
                {service.description}
              </p>
              <div className="grid grid-cols-3 gap-4 mb-12">
                {service.stats.map((stat) => (
                  <div key={stat.label} className="bg-white/[0.02] border border-white/5 p-4 rounded-2xl flex flex-col">
                    <span className="text-[9px] font-bold text-slate-500 uppercase tracking-widest mb-2">{stat.label}</span>
                    <span className="text-2xl font-black text-white">{stat.value}</span>
                  </div>
                ))}
              </div>
            </motion.div>
          </div>
        </div>
      </main>
    </div>
  );
};

export default ServicePage;

const serviceDataExtra = {
  'nettoyage': {
    title: 'Nettoyage & Vitres',
    subtitle: 'Finition Premium pour Professionnels',
    tier: 'RANK_PRO',
    code: "L'ÉCLAT",
    image: 'https://images.unsplash.com/photo-1584622650111-993a426fbf0a?q=80&w=2070&auto=format&fit=crop',
    description: "L'image de votre établissement passe par la netteté de vos vitrages et la propreté de vos sols. Notre équipe intervient avec une précision chirurgicale pour un résultat sans trace.",
    features: [
      { title: 'Vitrages complexes', desc: "Accès difficile et hauteurs sécurisées." },
      { title: 'Désinfection Sols', desc: "Normes hospitalières pour vos locaux." },
      { title: 'Planning Flexible', desc: "Intervention hors horaires d'ouverture." }
    ],
    stats: [
      { label: 'Finition', value: 'PREMIUM' },
      { label: 'Équipe', value: 'CERTIFIÉE' },
      { label: 'Éco-Label', value: 'A+' }
    ]
  },
  'debarrassage': {
    title: 'Débarrassage Expert',
    subtitle: 'Évacuation & Valorisation des Déchets',
    tier: 'RANK_EXT',
    code: 'LE VIDE',
    image: 'https://images.unsplash.com/photo-1595246140625-573b715d11dc?q=80&w=2070&auto=format&fit=crop',
    description: "Gagnez de l'espace immédiatement. Nous gérons l'intégralité du processus de débarrassage, du tri sélectif à la mise en déchetterie professionnelle.",
    features: [
      { title: 'Volume Illimité', desc: "De la cave au hangar industriel." },
      { title: 'Tri Éco-Sélectif', desc: "Valorisation maximale des matériaux." },
      { title: 'Nettoyage Fin', desc: "Coup de balai systématique après passage." }
    ],
    stats: [
      { label: 'Réactivité', value: '48H MAX' },
      { label: 'Recyclage', value: '85%' },
      { label: 'Assurance', value: 'RC PRO' }
    ]
  }
};
