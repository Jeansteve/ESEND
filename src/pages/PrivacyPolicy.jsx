import React, { useState, useEffect } from 'react';
import { api } from '../lib/api';
import { ShieldCheck, Database, Lock, Eye, Mail } from 'lucide-react';
import { motion } from 'framer-motion';

const PrivacyPolicy = () => {
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
  const email = settings?.contact_email || 'contact@esendnuisibles.fr';

  return (
    <div className="bg-[var(--bg-primary)] min-h-screen pt-32 pb-20 px-6 font-sans">
      <div className="max-w-4xl mx-auto">
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center mb-16"
        >
          <div className="inline-flex items-center justify-center p-4 bg-red-600/10 rounded-2xl mb-6 border border-red-600/20">
            <ShieldCheck className="w-8 h-8 text-red-600" />
          </div>
          <h1 className="text-4xl lg:text-5xl font-black uppercase tracking-tighter text-white mb-4">Politique de <span className="text-red-600">Confidentialité</span></h1>
          <p className="text-zinc-400 font-medium text-lg uppercase tracking-widest max-w-2xl mx-auto">
            Protection et gestion de vos données (RGPD)
          </p>
        </motion.div>

        <div className="space-y-8">
          {/* Collecte */}
          <motion.section 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="glass-card bg-white/5 border border-white/10 p-8 rounded-3xl"
          >
            <h2 className="text-2xl font-black uppercase tracking-tighter text-white mb-6 flex items-center gap-3">
              <Database className="text-red-600 w-6 h-6" /> 1. Données Collectées
            </h2>
            <p className="text-zinc-300 leading-relaxed mb-4">
              Dans le cadre de l'utilisation de notre site, notamment via le formulaire de demande d'intervention, {companyName} est amené à collecter les données personnelles suivantes :
            </p>
            <ul className="list-disc pl-6 space-y-2 text-zinc-300 leading-relaxed marker:text-red-600">
              <li>Nom et prénom</li>
              <li>Numéro de téléphone</li>
              <li>Adresse e-mail</li>
              <li>Code postal / Ville de l'intervention</li>
              <li>Photos facultatives du problème (nuisibles, dégâts)</li>
            </ul>
          </motion.section>

          {/* Finalité */}
          <motion.section 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="glass-card bg-white/5 border border-white/10 p-8 rounded-3xl"
          >
            <h2 className="text-2xl font-black uppercase tracking-tighter text-white mb-6 flex items-center gap-3">
              <Eye className="text-red-600 w-6 h-6" /> 2. Finalité du traitement
            </h2>
            <p className="text-zinc-300 leading-relaxed mb-4">
              Ces données sont collectées dans le but exclusif de :
            </p>
            <ul className="list-disc pl-6 space-y-2 text-zinc-300 leading-relaxed marker:text-red-600">
              <li>Répondre à votre demande d'intervention ou de devis.</li>
              <li>Vous contacter pour planifier une intervention.</li>
              <li>Assurer le suivi de la prestation commerciale.</li>
            </ul>
            <p className="text-zinc-300 leading-relaxed mt-4">
              <strong>Base légale :</strong> Le traitement est fondé sur l'exécution de mesures précontractuelles ou d'un contrat.
            </p>
          </motion.section>

          {/* Conservation et Sécurité */}
          <motion.section 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3 }}
            className="glass-card bg-white/5 border border-white/10 p-8 rounded-3xl"
          >
            <h2 className="text-2xl font-black uppercase tracking-tighter text-white mb-6 flex items-center gap-3">
              <Lock className="text-red-600 w-6 h-6" /> 3. Sécurité et Conservation
            </h2>
            <p className="text-zinc-300 leading-relaxed mb-4">
              {companyName} s'engage à assurer la sécurité de vos données. Celles-ci ne sont <strong>jamais vendues, louées ou cédées à des tiers</strong>. Seuls les membres de notre équipe ont accès à ces informations.
            </p>
            <p className="text-zinc-300 leading-relaxed">
              <strong>Durée de conservation :</strong> Vos données sont conservées pendant la durée de notre relation commerciale, puis pour une durée maximale de 3 ans à compter du dernier contact, conformément aux recommandations de la CNIL.
            </p>
          </motion.section>

          {/* Droits */}
          <motion.section 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4 }}
            className="glass-card bg-white/5 border border-white/10 p-8 rounded-3xl"
          >
            <h2 className="text-2xl font-black uppercase tracking-tighter text-white mb-6 flex items-center gap-3">
              <Mail className="text-red-600 w-6 h-6" /> 4. Vos Droits
            </h2>
            <p className="text-zinc-300 leading-relaxed mb-4">
              Conformément à la réglementation (RGPD), vous disposez d'un droit d'accès, de rectification, de suppression et de portabilité de vos données personnelles.
            </p>
            <p className="text-zinc-300 leading-relaxed">
              Pour exercer ces droits, vous pouvez nous contacter directement par e-mail à l'adresse suivante :
            </p>
            <div className="mt-4 inline-flex items-center gap-3 px-6 py-3 bg-red-600/10 border border-red-600/20 rounded-xl text-red-500 font-bold hover:bg-red-600 hover:text-white transition-colors cursor-pointer" onClick={() => window.location.href = `mailto:${email}`}>
              <Mail className="w-5 h-5" />
              {email}
            </div>
            <p className="text-zinc-500 text-sm mt-4">
              Vous avez également le droit d'introduire une réclamation auprès de la CNIL (www.cnil.fr).
            </p>
          </motion.section>
        </div>
      </div>
    </div>
  );
};

export default PrivacyPolicy;
