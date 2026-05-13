import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Link, useLocation } from 'react-router-dom';
import { X, Home, Bug, ShieldCheck, Zap, Camera, BookOpen, FileText, Phone } from 'lucide-react';

const menuItems = [
  { name: 'Accueil', path: '/', icon: <Home className="w-5 h-5" /> },
  { name: 'Nuisibles', path: '/services/nuisibles', icon: <Bug className="w-5 h-5" /> },
  { name: 'Désinfection', path: '/services/desinfection', icon: <ShieldCheck className="w-5 h-5" /> },
  { name: 'Nettoyage', path: '/services/nettoyage', icon: <Zap className="w-5 h-5" /> },
  { name: 'Réalisations', path: '/realisations', icon: <Camera className="w-5 h-5" /> },
  { name: 'Le Journal', path: '/journal', icon: <BookOpen className="w-5 h-5" /> },
  { name: 'Mentions Légales', path: '/mentions-legales', icon: <FileText className="w-5 h-5" /> },
];

const MobileMenu = ({ isOpen, onClose }) => {
  const location = useLocation();

  return (
    <AnimatePresence>
      {isOpen && (
        <>
          {/* Backdrop avec flou intense */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
            className="fixed inset-0 bg-slate-950/80 backdrop-blur-xl z-[9998]"
          />

          {/* Menu Panel */}
          <motion.div
            initial={{ x: '100%' }}
            animate={{ x: 0 }}
            exit={{ x: '100%' }}
            transition={{ type: 'spring', damping: 25, stiffness: 200 }}
            className="fixed top-0 right-0 bottom-0 w-[85%] max-w-sm bg-white z-[9999] shadow-[-20px_0_60px_rgba(0,0,0,0.5)] flex flex-col"
          >
            {/* Header du Menu */}
            <div className="p-6 flex items-center justify-between border-b border-slate-100">
              <div className="flex items-center gap-3">
                <img src="/images/logo-esend.webp" alt="ESEND" className="w-10 h-10 object-contain rounded-lg" />
                <span className="font-black italic text-xl tracking-tighter text-slate-900 uppercase">ESEND</span>
              </div>
              <button 
                onClick={onClose}
                className="p-2 bg-slate-100 rounded-full text-slate-600 active:scale-90 transition-transform"
              >
                <X className="w-6 h-6" />
              </button>
            </div>

            {/* Liens de Navigation */}
            <nav className="flex-1 overflow-y-auto py-8 px-6 space-y-2">
              {menuItems.map((item) => (
                <Link
                  key={item.path}
                  to={item.path}
                  onClick={onClose}
                  className={`flex items-center gap-4 p-4 rounded-2xl font-bold transition-all active:scale-[0.98] ${
                    location.pathname === item.path 
                    ? 'bg-red-600 text-white shadow-lg shadow-red-600/20' 
                    : 'text-slate-600 hover:bg-slate-50'
                  }`}
                >
                  <div className={`${location.pathname === item.path ? 'text-white' : 'text-red-600'}`}>
                    {item.icon}
                  </div>
                  <span className="text-base uppercase tracking-tight">{item.name}</span>
                </Link>
              ))}
            </nav>

            {/* Footer du Menu (CTA Urgence) */}
            <div className="p-6 bg-slate-50 border-t border-slate-100">
              <a 
                href="tel:0651239841"
                className="w-full bg-slate-900 text-white p-4 rounded-2xl flex items-center justify-center gap-3 font-black uppercase tracking-widest shadow-xl active:scale-[0.97] transition-all"
              >
                <Phone className="w-5 h-5 text-red-600" />
                Appel d'urgence
              </a>
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
};

export default MobileMenu;
