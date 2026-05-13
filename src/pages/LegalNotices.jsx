import React, { useState, useEffect } from 'react';
import { api } from '../lib/api';
import { Scale, Building2, MapPin, User, Mail, Globe, Phone } from 'lucide-react';
import { motion } from 'framer-motion';
import SEO from '../components/UI/SEO';

const LegalNotices = () => {
  const [settings, setSettings] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchSettings = async () => {
      try {
        const data = await api.getSettings();
        setSettings(data);
      } catch (error) {
        console.error("Erreur lors de la récupération des paramètres :", error);
      } finally {
        setLoading(false);
      }
    };
    fetchSettings();
    window.scrollTo(0, 0);
  }, []);

  if (loading) {
    return (
      <div className="min-h-[80vh] flex items-center justify-center bg-[var(--bg-primary)]">
        <div className="w-12 h-12 border-2 border-red-600 border-t-transparent rounded-full animate-spin" />
      </div>
    );
  }

  const companyName = settings?.company_name || 'E S E N D';
  const managerName = settings?.company_manager || 'Valdez EKEN';
  const address = settings?.company_address || '2 rue Gustave Delory, 59210 Coudekerque-Branche';
  const siret = settings?.company_siret || '900 556 838 00010';
  const phone = settings?.company_phone || '07 68 95 67 13';
  const email = settings?.contact_email || 'contact@esendnuisibles.fr';

  return (
    <div className="bg-[var(--bg-primary)] min-h-screen pt-32 pb-20 px-6 font-sans">
      <SEO 
        title="Mentions Légales" 
        description="Informations légales concernant l'entreprise ESEND."
        robots="noindex, nofollow"
        schema={{
          "@context": "https://schema.org",
          "@type": "BreadcrumbList",
          "itemListElement": [
            {
              "@type": "ListItem",
              "position": 1,
              "name": "Accueil",
              "item": "https://esendnuisibles.fr/"
            },
            {
              "@type": "ListItem",
              "position": 2,
              "name": "Mentions Légales",
              "item": "https://esendnuisibles.fr/mentions-legales"
            }
          ]
        }}
      />
      <div className="max-w-4xl mx-auto">
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center mb-16"
        >
          <div className="inline-flex items-center justify-center p-4 bg-red-600/10 rounded-2xl mb-6 border border-red-600/20">
            <Scale className="w-8 h-8 text-red-600" />
          </div>
          <h1 className="text-4xl lg:text-5xl font-black uppercase tracking-tighter text-white mb-4">Mentions <span className="text-red-600">Légales</span></h1>
          <p className="text-zinc-400 font-medium text-lg uppercase tracking-widest max-w-2xl mx-auto">
            Transparence et conformité juridique
          </p>
        </motion.div>

        <div className="space-y-8">
          {/* Éditeur */}
          <motion.section 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="glass-card bg-white/5 border border-white/10 p-8 rounded-3xl"
          >
            <h2 className="text-2xl font-black uppercase tracking-tighter text-white mb-6 flex items-center gap-3">
              <Building2 className="text-red-600 w-6 h-6" /> 1. Éditeur du site
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 text-zinc-300 leading-relaxed">
              <div>
                <p className="mb-2"><strong className="text-white">Dénomination :</strong> {companyName}</p>
                <p className="mb-2"><strong className="text-white">Forme juridique :</strong> Entreprise Individuelle</p>
                <p className="mb-2"><strong className="text-white">Directeur de publication :</strong> {managerName}</p>
                <p className="mb-2"><strong className="text-white">Numéro SIRET :</strong> {siret}</p>
              </div>
              <div className="space-y-4">
                <div className="flex items-start gap-3">
                  <MapPin className="w-5 h-5 text-zinc-500 shrink-0 mt-1" />
                  <p>{address}</p>
                </div>
                <div className="flex items-start gap-3">
                  <Mail className="w-5 h-5 text-zinc-500 shrink-0 mt-1" />
                  <a href={`mailto:${email}`} className="hover:text-red-500 transition-colors">{email}</a>
                </div>
                <div className="flex items-start gap-3">
                  <Phone className="w-5 h-5 text-zinc-500 shrink-0 mt-1" />
                  <a href={`tel:${phone.replace(/\s/g, '')}`} className="hover:text-red-500 transition-colors">{phone}</a>
                </div>
              </div>
            </div>
          </motion.section>

          {/* Hébergement */}
          <motion.section 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="glass-card bg-white/5 border border-white/10 p-8 rounded-3xl"
          >
            <h2 className="text-2xl font-black uppercase tracking-tighter text-white mb-6 flex items-center gap-3">
              <Globe className="text-red-600 w-6 h-6" /> 2. Hébergement
            </h2>
            <div className="text-zinc-300 leading-relaxed space-y-2">
              <p>Ce site est hébergé par la société <strong>Hostinger International Ltd.</strong></p>
              <p>Siège social : 61 Lordou Vironos Street, 6023 Larnaca, Chypre</p>
              <p>Site web : <a href="https://www.hostinger.fr" target="_blank" rel="noopener noreferrer" className="text-red-500 hover:text-red-400 underline decoration-red-500/30">www.hostinger.fr</a></p>
            </div>
          </motion.section>

          {/* Propriété intellectuelle */}
          <motion.section 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3 }}
            className="glass-card bg-white/5 border border-white/10 p-8 rounded-3xl"
          >
            <h2 className="text-2xl font-black uppercase tracking-tighter text-white mb-6 flex items-center gap-3">
              <User className="text-red-600 w-6 h-6" /> 3. Propriété Intellectuelle
            </h2>
            <p className="text-zinc-300 leading-relaxed mb-4">
              L'ensemble du contenu (textes, images, vidéos, structure, design) présenté sur ce site est la propriété exclusive de {companyName}, sauf mention contraire.
            </p>
            <p className="text-zinc-300 leading-relaxed">
              Toute reproduction, représentation, modification, publication, adaptation de tout ou partie des éléments du site, quel que soit le moyen ou le procédé utilisé, est interdite, sauf autorisation écrite préalable de l'éditeur.
            </p>
          </motion.section>
        </div>
      </div>
    </div>
  );
};

export default LegalNotices;
