import React from 'react';
import { motion } from 'framer-motion';
import { ArrowRight, Inbox, Phone } from 'lucide-react';
import { Link } from 'react-router-dom';

/**
 * @component EmptyState
 * @description État vide premium avec icône stylisée et effets de lueur.
 * Remplacement de l'illustration 3D par une approche plus minimaliste et intégrée.
 */
const EmptyState = ({ 
  title = "Aucun élément trouvé", 
  message = "Nous préparons actuellement de nouveaux contenus pour vous.",
  actionLabel = "Demander un devis",
  actionLink = "/#devis-title",
  icon: Icon = Inbox,
  variant = "dark"
}) => {
  const isDark = variant === "dark";
  
  return (
    <motion.div 
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className={`w-full py-24 px-6 flex flex-col items-center text-center ${isDark ? 'text-white' : 'text-slate-900'}`}
    >
      {/* Icon Container */}
      <div className="relative mb-12">
        {/* Animated Glow Rings */}
        <motion.div 
          animate={{ scale: [1, 1.2, 1], opacity: [0.3, 0.6, 0.3] }}
          transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
          className="absolute inset-0 bg-red-600/20 blur-[60px] rounded-full"
        />
        <motion.div 
          animate={{ scale: [1.2, 1, 1.2], opacity: [0.2, 0.4, 0.2] }}
          transition={{ duration: 4, repeat: Infinity, ease: "easeInOut", delay: 2 }}
          className="absolute inset-0 bg-red-500/10 blur-[80px] rounded-full"
        />

        {/* Main Icon Box */}
        <motion.div 
          whileHover={{ scale: 1.05, rotate: 5 }}
          className={`relative z-10 w-32 h-32 md:w-40 md:h-40 rounded-[2.5rem] flex items-center justify-center border backdrop-blur-3xl shadow-2xl transition-transform duration-500 ${
            isDark 
              ? 'bg-slate-900/50 border-white/10 shadow-black/50' 
              : 'bg-white/50 border-slate-200 shadow-slate-200/50'
          }`}
        >
          {/* Subtle Inner Bevel */}
          <div className={`absolute inset-1 rounded-[2.2rem] border-t border-l opacity-20 ${isDark ? 'border-white' : 'border-slate-400'}`} />
          
          <Icon className="w-16 h-16 md:w-20 md:h-20 text-red-600 drop-shadow-[0_10px_20px_rgba(220,38,38,0.4)]" strokeWidth={1.5} />
        </motion.div>

        {/* Floating Decorative Elements */}
        <motion.div 
          animate={{ y: [0, -10, 0], x: [0, 5, 0] }}
          transition={{ duration: 3, repeat: Infinity, ease: "easeInOut" }}
          className="absolute -top-4 -right-4 w-12 h-12 rounded-2xl bg-red-600/10 border border-red-600/20 backdrop-blur-lg flex items-center justify-center"
        >
          <div className="w-2 h-2 rounded-full bg-red-600 animate-pulse" />
        </motion.div>
      </div>

      {/* Content */}
      <div className="max-w-md space-y-6 relative z-20">
        <h3 className="text-4xl md:text-5xl font-black uppercase tracking-tighter italic leading-none">
          {title}
        </h3>
        <p className={`text-lg ${isDark ? 'text-slate-400' : 'text-slate-500'} font-medium leading-relaxed`}>
          {message}
        </p>
        
        {actionLabel && (
          <div className="pt-10 flex flex-col sm:flex-row items-center justify-center gap-4">
            {actionLink.startsWith('http') || actionLink.includes('#') ? (
              <a 
                href={actionLink}
                className="inline-flex items-center gap-4 px-10 py-5 bg-red-600 text-white font-black uppercase tracking-widest text-[10px] rounded-full hover:bg-red-500 hover:scale-105 active:scale-95 transition-all shadow-[0_20px_40px_rgba(220,38,38,0.3)] group/btn w-full sm:w-auto justify-center"
              >
                {actionLabel}
                <ArrowRight className="w-4 h-4 group-hover/btn:translate-x-1.5 transition-transform" />
              </a>
            ) : (
              <Link 
                to={actionLink}
                className="inline-flex items-center gap-4 px-10 py-5 bg-red-600 text-white font-black uppercase tracking-widest text-[10px] rounded-full hover:bg-red-500 hover:scale-105 active:scale-95 transition-all shadow-[0_20px_40px_rgba(220,38,38,0.3)] group/btn w-full sm:w-auto justify-center"
              >
                {actionLabel}
                <ArrowRight className="w-4 h-4 group-hover/btn:translate-x-1.5 transition-transform" />
              </Link>
            )}

            <a 
              href="tel:0651239841"
              className={`inline-flex items-center gap-4 px-10 py-5 ${isDark ? 'bg-white/10' : 'bg-slate-100'} ${isDark ? 'text-white' : 'text-slate-900'} font-black uppercase tracking-widest text-[10px] rounded-full hover:bg-red-600 hover:text-white hover:scale-105 active:scale-95 transition-all border border-white/10 w-full sm:w-auto justify-center`}
            >
              <Phone className="w-4 h-4" />
              Appeler Directement
            </a>
          </div>
        )}
      </div>
    </motion.div>
  );
};

export default EmptyState;
