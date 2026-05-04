import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { api } from '../../lib/api';

const Footer = () => {
  const [settings, setSettings] = useState({
    company_phone: '06 51 23 98 41',
    contact_email: 'contact@esendnuisibles.fr',
    company_siret: '900 556 838 00010'
  });

  useEffect(() => {
    const loadSettings = async () => {
      try {
        const data = await api.getSettings();
        if (data) {
          setSettings({
            company_phone: data.company_phone || '06 51 23 98 41',
            contact_email: data.contact_email || 'contact@esendnuisibles.fr',
            company_siret: data.company_siret || '900 556 838 00010'
          });
        }
      } catch (err) {
        console.error("Erreur chargement footer settings:", err);
      }
    };
    loadSettings();
  }, []);

  return (
    <footer className="bg-slate-950 text-slate-100 pt-24 pb-12 px-6 border-t border-white/5 transition-colors duration-400">
      <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-3 gap-16 mb-20 text-center md:text-left">
        <div>
          <div className="flex items-center justify-center md:justify-start gap-3 mb-8">
            <div className="w-12 h-12 rounded-lg overflow-hidden border border-white/10 bg-white flex items-center justify-center p-1">
              <img src="./logo-esend.jpg" alt="Logo ESEND" className="w-full h-full object-contain grayscale hover:grayscale-0 transition-all" />
            </div>
            <div className="flex flex-col">
              <div className="text-3xl font-black tracking-tighter italic leading-none">ESEND</div>
              <div className="text-[9px] font-bold uppercase tracking-wider text-esend-red mt-1">Passer de nuisibles à paisible</div>
            </div>
          </div>
          <p className="text-slate-400 leading-relaxed max-w-xs mx-auto md:mx-0 font-medium text-sm">
            Votre duo expert en hygiène, nettoyage et débarrassage. Intervention rapide à Menton et sur toute la Riviera.
          </p>
        </div>
        
        <div>
          <h4 className="font-black uppercase tracking-widest text-[10px] mb-8 text-esend-red">Services & Zones</h4>
          <ul className="space-y-4 text-xs font-black uppercase tracking-widest text-slate-400">
            <li><Link to="/services/nuisibles" className="hover:text-red-600 transition-colors">Dératisation & Nuisibles</Link></li>
            <li><Link to="/services/desinfection" className="hover:text-red-500 transition-colors">Désinfection Bio-Sécurité</Link></li>
            <li><Link to="/services/nettoyage" className="hover:text-red-500 transition-colors">Nettoyage & Vitrerie</Link></li>
            <li><Link to="/realisations" className="hover:text-red-500 transition-colors">Débarrassage & Archives</Link></li>
          </ul>
        </div>

        <div>
          <h4 className="font-black uppercase tracking-widest text-[10px] mb-8 text-esend-red">Contact Direct</h4>
          <div className="space-y-6">
            <div>
              <a href={`tel:${settings.company_phone.replace(/\s/g, '')}`} className="text-2xl font-black tracking-tight italic hover:text-esend-red transition-colors block">
                {settings.company_phone}
              </a>
              <div className="text-zinc-500 text-[10px] font-bold uppercase tracking-widest mt-1">Secteur Menton (06)</div>
            </div>
            <a href={`mailto:${settings.contact_email}`} className="text-zinc-400 text-sm font-medium hover:text-white transition-colors block">
              {settings.contact_email}
            </a>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto border-t border-white/5 pt-12 flex flex-col md:flex-row justify-between items-center gap-6 text-[9px] font-black uppercase tracking-[0.2em] text-slate-500">
        <div className="flex flex-col md:flex-row items-center gap-2">
          <span>© 2026 ESEND MENTON — TOUS DROITS RÉSERVÉS</span>
          <span className="hidden md:inline">|</span>
          <span>SIRET : {settings.company_siret}</span>
        </div>
        <div className="flex flex-col md:flex-row items-center gap-4 md:gap-10 mt-6 md:mt-0">
          <Link to="/mentions-legales" onClick={() => window.scrollTo(0,0)} className="hover:text-zinc-400 transition-colors cursor-pointer">Mentions Légales</Link>
          <Link to="/politique-confidentialite" onClick={() => window.scrollTo(0,0)} className="hover:text-zinc-400 transition-colors cursor-pointer">RGPD</Link>
          <span className="text-slate-500 select-none">Design par Wandaboy 🕵️‍♂️</span>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
