import React from 'react';
import { motion } from 'framer-motion';

const SectionSeparator = ({ text }) => {
  return (
    <div className="w-full flex items-center justify-center gap-6 py-20 bg-[var(--bg-primary)] transition-colors duration-400">
      {/* Ligne gauche */}
      <motion.div 
        initial={{ width: 0, opacity: 0 }}
        whileInView={{ width: "80px", opacity: 0.4 }}
        viewport={{ once: true }}
        className="h-px bg-red-600 hidden sm:block"
      />
      
      {/* Bulle centrale */}
      <motion.div
        initial={{ opacity: 0, scale: 0.8 }}
        whileInView={{ opacity: 1, scale: 1 }}
        viewport={{ once: true }}
        className="inline-flex items-center gap-2 px-6 py-3 rounded-full bg-[var(--accent-red)]/10 text-[var(--accent-red)] text-[10px] font-black uppercase tracking-[0.3em] border border-[var(--accent-red)]/20 shadow-sm backdrop-blur-sm"
      >
        <div className="w-1.5 h-1.5 rounded-full bg-[var(--accent-red)] animate-pulse shadow-[0_0_8px_rgba(220,38,38,0.5)]" />
        {text}
      </motion.div>

      {/* Ligne droite */}
      <motion.div 
        initial={{ width: 0, opacity: 0 }}
        whileInView={{ width: "80px", opacity: 0.4 }}
        viewport={{ once: true }}
        className="h-px bg-red-600 hidden sm:block"
      />
    </div>
  );
};

export default SectionSeparator;
