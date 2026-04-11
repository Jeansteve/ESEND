import React from 'react';
import { motion } from 'framer-motion';
import { ShieldCheck, CheckCircle2, MapPin, FileText } from 'lucide-react';

const trustItems = [
  {
    icon: <ShieldCheck className="w-8 h-8" />,
    label: "Discrétion Garantie",
    description: "Intervention confidentielle"
  },
  {
    icon: <CheckCircle2 className="w-8 h-8" />,
    label: "Solutions Durables",
    description: "Protection longue durée"
  },
  {
    icon: <MapPin className="w-8 h-8" />,
    label: "Savoir-faire Local",
    description: "Expertise Côte d'Azur"
  },
  {
    icon: <FileText className="w-8 h-8" />,
    label: "Devis Gratuit",
    description: "Clarté & Transparence"
  }
];

const TrustBanner = () => {
  return (
    <section className="bg-[#A72422] py-20 px-6 relative overflow-hidden transition-colors duration-500">
      {/* Decorative Texture/Background Pattern */}
      <div className="absolute inset-0 opacity-10 pointer-events-none overflow-hidden">
        <svg className="h-full w-full" viewBox="0 0 100 100" preserveAspectRatio="none">
          <defs>
            <pattern id="grid" width="10" height="10" patternUnits="userSpaceOnUse">
              <path d="M 10 0 L 0 0 0 10" fill="none" stroke="white" strokeWidth="0.5" />
            </pattern>
          </defs>
          <rect width="100" height="100" fill="url(#grid)" />
        </svg>
      </div>

      <div className="max-w-7xl mx-auto relative z-10">
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-12 lg:gap-8">
          {trustItems.map((item, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.1 }}
              className="flex flex-col items-center text-center text-white group"
            >
              <motion.div 
                whileHover={{ scale: 1.1, rotate: 5 }}
                className="mb-6 p-4 bg-white/10 rounded-2xl border border-white/20 backdrop-blur-sm group-hover:bg-white group-hover:text-[#A72422] transition-all duration-300"
              >
                {item.icon}
              </motion.div>
              <h3 className="text-xl font-black uppercase tracking-tighter mb-2">
                {item.label}
              </h3>
              <p className="text-white/70 text-xs font-bold uppercase tracking-widest">
                {item.description}
              </p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default TrustBanner;
