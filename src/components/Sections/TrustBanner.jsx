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

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.12,
      delayChildren: 0.1
    }
  }
};

const itemVariants = {
  hidden: { opacity: 0, y: 40, scale: 0.95, filter: 'blur(10px)' },
  visible: { 
    opacity: 1, 
    y: 0, 
    scale: 1,
    filter: 'blur(0px)',
    transition: {
      duration: 0.8,
      ease: [0.16, 1, 0.3, 1] // Custom ease-out
    }
  }
};

const TrustBanner = () => {
  return (
    <section className="bg-[#A72422] py-24 px-6 relative overflow-hidden transition-colors duration-500">
      {/* Decorative center glow */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[400px] bg-white/5 blur-[120px] rounded-full pointer-events-none" />

      <div className="max-w-7xl mx-auto relative z-10">
        <motion.div 
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-100px" }}
          className="grid grid-cols-2 lg:grid-cols-4 gap-12 lg:gap-8"
        >
          {trustItems.map((item, index) => (
            <motion.div
              key={index}
              variants={itemVariants}
              className="group flex flex-col items-center text-center text-white"
              style={{ perspective: "1000px" }}
            >
              <motion.div 
                whileHover={{ 
                  rotateX: -15, 
                  rotateY: 15, 
                  scale: 1.1,
                  z: 50
                }}
                transition={{ 
                  type: "spring", 
                  stiffness: 300, 
                  damping: 20 
                }}
                className="relative mb-8"
              >
                {/* Magnetic Core Container */}
                <div className="p-5 bg-white/10 rounded-2xl border border-white/20 backdrop-blur-md shadow-2xl relative overflow-hidden group-hover:bg-white group-hover:text-[#A72422] transition-colors duration-500">
                  {/* Shimmer / Gloss Sweep - Sequenced */}
                  <div 
                    className="absolute inset-0 bg-gradient-to-tr from-transparent via-white/30 to-transparent -translate-x-[250%] skew-x-[-45deg] animate-sweep pointer-events-none" 
                    style={{ animationDelay: `${index * 0.8}s` }}
                  />
                  
                  {/* Internal Glow on Hover */}
                  <div className="absolute inset-0 bg-gradient-to-br from-white/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />
                  
                  <div className="relative z-10 drop-shadow-lg">
                    {item.icon}
                  </div>
                </div>

                {/* Reflection effect */}
                <div className="absolute inset-0 bg-white/20 blur-xl opacity-0 group-hover:opacity-40 transition-opacity rounded-full -z-10" />
              </motion.div>

              <div className="overflow-hidden">
                <motion.h3 
                  initial={{ y: "100%" }}
                  whileInView={{ y: 0 }}
                  transition={{ delay: (index * 0.1) + 0.5, duration: 0.6 }}
                  className="text-xl font-black uppercase tracking-tight mb-2"
                >
                  {item.label}
                </motion.h3>
              </div>
              
              <div className="overflow-hidden">
                <motion.p 
                  initial={{ y: "100%" }}
                  whileInView={{ y: 0 }}
                  transition={{ delay: (index * 0.1) + 0.6, duration: 0.6 }}
                  className="text-white/60 text-xs font-bold uppercase tracking-[0.2em]"
                >
                  {item.description}
                </motion.p>
              </div>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
};

export default TrustBanner;
