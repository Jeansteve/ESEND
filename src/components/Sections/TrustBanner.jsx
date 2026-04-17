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
      staggerChildren: 0.15,
      delayChildren: 0.2
    }
  }
};

const itemVariants = {
  hidden: { opacity: 0, y: 30, scale: 0.9 },
  visible: { 
    opacity: 1, 
    y: 0, 
    scale: 1,
    transition: {
      type: "spring",
      stiffness: 100,
      damping: 12
    }
  }
};

const TrustBanner = () => {
  return (
    <section className="bg-[#A72422] py-20 px-6 relative overflow-hidden transition-colors duration-500">
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
              className="flex flex-col items-center text-center text-white group"
            >
              <div className="relative mb-6">
                <motion.div 
                  animate={{ y: [-3, 3, -3] }}
                  transition={{ 
                    duration: 4, 
                    repeat: Infinity, 
                    ease: "easeInOut",
                    delay: index * 0.5 
                  }}
                  whileHover={{ scale: 1.1, rotate: 5 }}
                  className="p-4 bg-white/10 rounded-2xl border border-white/20 backdrop-blur-sm group-hover:bg-white group-hover:text-[#A72422] transition-all duration-300 relative overflow-hidden"
                >
                  {/* Sweep Effect */}
                  <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/40 to-transparent -translate-x-[200%] skew-x-[-45deg] animate-sweep pointer-events-none" />
                  
                  {item.icon}
                </motion.div>
                
                {/* Subtle outer glow */}
                <div className="absolute inset-0 bg-white/5 blur-2xl rounded-full -z-10 group-hover:bg-white/20 transition-colors" />
              </div>

              <h3 className="text-xl font-black uppercase tracking-tighter mb-2">
                {item.label}
              </h3>
              <p className="text-white/70 text-xs font-bold uppercase tracking-widest">
                {item.description}
              </p>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
};

export default TrustBanner;
