import React from 'react';
import { motion } from 'framer-motion';
import { ArrowRight, Search, Inbox } from 'lucide-react';
import { Link } from 'react-router-dom';

/**
 * @component EmptyState
 * @description État vide premium avec illustration 3D et CTA.
 * Utilisé pour les réalisations et le journal quand aucune donnée n'est disponible.
 */
const EmptyState = ({ 
  title = "Aucun élément trouvé", 
  message = "Nous préparons actuellement de nouveaux contenus pour vous.",
  image = "/images/empty-projects.png",
  actionLabel = "Demander un devis",
  actionLink = "/#devis-title",
  icon: Icon = Inbox,
  variant = "dark" // "dark" pour fond sombre (Portfolio/Blog), "light" pour fond clair (KnowledgeHub)
}) => {
  const isDark = variant === "dark";
  
  return (
    <motion.div 
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className={`w-full py-20 px-6 flex flex-col items-center text-center ${isDark ? 'text-white' : 'text-slate-900'}`}
    >
      <div className="relative w-full max-w-lg mb-12 group">
        {/* Background Glow */}
        <div className={`absolute inset-0 blur-[100px] rounded-full group-hover:opacity-100 opacity-70 transition-all duration-700 ${isDark ? 'bg-red-600/10' : 'bg-red-600/5'}`} />
        
        {/* Main Illustration */}
        <div className="relative relative-3d">
          <motion.img 
            src={image} 
            alt={title}
            initial={{ scale: 0.9, rotateY: -10 }}
            animate={{ 
              scale: 1, 
              rotateY: 0,
              y: [0, -15, 0]
            }}
            transition={{ 
              duration: 5, 
              repeat: Infinity, 
              ease: "easeInOut" 
            }}
            className={`w-full h-auto drop-shadow-[0_35px_35px_rgba(0,0,0,0.5)] transition-all duration-1000 ${isDark ? 'grayscale opacity-80 group-hover:grayscale-0 group-hover:opacity-100' : 'grayscale-[0.5] opacity-90 group-hover:grayscale-0 group-hover:opacity-100'}`}
          />
        </div>
        
        {/* Floating Icon */}
        <motion.div 
          animate={{ y: [0, 10, 0] }}
          transition={{ duration: 3, repeat: Infinity }}
          className={`absolute -bottom-6 -right-6 p-5 rounded-3xl shadow-2xl backdrop-blur-xl border ${isDark ? 'bg-slate-900 border-white/10 shadow-black' : 'bg-white border-slate-100 shadow-slate-200'}`}
        >
          <Icon className="w-8 h-8 text-red-600" />
        </motion.div>
      </div>

      <div className="max-w-md space-y-6">
        <h3 className="text-3xl md:text-4xl font-black uppercase tracking-tighter italic">
          {title}
        </h3>
        <p className={`${isDark ? 'text-slate-400' : 'text-slate-500'} font-medium leading-relaxed`}>
          {message}
        </p>
        
        <div className="pt-8">
          {actionLink.startsWith('http') || actionLink.includes('#') ? (
            <a 
              href={actionLink}
              className="inline-flex items-center gap-3 px-10 py-5 bg-red-600 text-white font-black uppercase tracking-widest text-xs rounded-full hover:bg-red-500 hover:scale-105 active:scale-95 transition-all shadow-[0_20px_40px_rgba(220,38,38,0.3)] group/btn"
            >
              {actionLabel}
              <ArrowRight className="w-4 h-4 group-hover/btn:translate-x-1 transition-transform" />
            </a>
          ) : (
            <Link 
              to={actionLink}
              className="inline-flex items-center gap-3 px-10 py-5 bg-red-600 text-white font-black uppercase tracking-widest text-xs rounded-full hover:bg-red-500 hover:scale-105 active:scale-95 transition-all shadow-[0_20px_40px_rgba(220,38,38,0.3)] group/btn"
            >
              {actionLabel}
              <ArrowRight className="w-4 h-4 group-hover/btn:translate-x-1 transition-transform" />
            </Link>
          )}
        </div>
      </div>
    </motion.div>
  );
};

export default EmptyState;
