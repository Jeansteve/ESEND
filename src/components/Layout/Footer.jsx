import React from 'react';

const Footer = () => {
  return (
    <footer className="bg-esend-zinc-950 text-white pt-24 pb-12 px-6">
      <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-3 gap-16 mb-20">
        <div>
          <div className="flex items-center gap-3 mb-8">
            <div className="w-10 h-10 rounded-lg overflow-hidden border border-white/10">
              <img src="/logo-esend.jpg" alt="Logo ESEND" className="w-full h-full object-cover grayscale" />
            </div>
            <div className="text-3xl font-black tracking-tighter italic">ESEND</div>
          </div>
          <p className="text-zinc-500 leading-relaxed max-w-xs font-medium">
            Leader de l'hygiène 3D et de la décontamination dans les Hauts-de-France. Intervention d'urgence 24h/24 et 7j/7.
          </p>
        </div>
        
        <div>
          <h4 className="font-black uppercase tracking-widest text-[10px] mb-8 text-esend-red">Interventions</h4>
          <ul className="space-y-4 text-xs font-black uppercase tracking-widest text-zinc-400">
            <li><a href="#" className="hover:text-white transition-colors">Lille & Métropole</a></li>
            <li><a href="#" className="hover:text-white transition-colors">Arras & Environs</a></li>
            <li><a href="#" className="hover:text-white transition-colors">Lens & Bassin Minier</a></li>
            <li><a href="#" className="hover:text-white transition-colors">Douai & Hainaut</a></li>
          </ul>
        </div>

        <div>
          <h4 className="font-black uppercase tracking-widest text-[10px] mb-8 text-esend-red">Contact Direct</h4>
          <div className="space-y-6">
            <div>
              <div className="text-2xl font-black tracking-tight italic">06 00 00 00 00</div>
              <div className="text-zinc-500 text-[10px] font-bold uppercase tracking-widest mt-1">Ligne Urgence 24/7</div>
            </div>
            <div className="text-zinc-400 text-sm font-medium">contact@esendnuisibles.fr</div>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto border-t border-white/5 pt-12 flex flex-col md:flex-row justify-between items-center gap-6 text-[9px] font-black uppercase tracking-[0.2em] text-zinc-600">
        <div>© 2026 ESEND NUISIBLES — TOUS DROITS RÉSERVÉS</div>
        <div className="flex gap-10">
          <a href="#" className="hover:text-zinc-400 transition-colors">Mentions Légales</a>
          <a href="#" className="hover:text-zinc-400 transition-colors">RGPD</a>
          <a href="#" className="hover:text-esend-red transition-colors">Design par Wandaboy 🕵️‍♂️</a>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
