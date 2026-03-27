import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Home, Building2, MapPin, User, MessageSquare, Phone, Mail, Check, Star, Zap, Trash2, ShieldCheck, SprayCan } from 'lucide-react';

const steps = [
  { id: 1, title: 'Bienvenue', icon: <Home className="w-5 h-5" /> },
  { id: 2, title: 'Service', icon: <MessageSquare className="w-5 h-5" /> },
  { id: 3, title: 'Client', icon: <Building2 className="w-5 h-5" /> },
  { id: 4, title: 'Zone', icon: <MapPin className="w-5 h-5" /> },
  { id: 5, title: 'Contact', icon: <User className="w-5 h-5" /> },
];

const FormWizard = () => {
  const [currentStep, setCurrentStep] = useState(1);
  const [formData, setFormData] = useState({ problem: '', clientType: '', zipCode: '', city: '', name: '', email: '', phone: '' });
  const [isSubmitted, setIsSubmitted] = useState(false);

  const nextStep = () => setCurrentStep(prev => Math.min(prev + 1, steps.length));
  const prevStep = () => setCurrentStep(prev => Math.max(prev - 1, 1));
  
  const handleZipChange = (val) => {
    const cityMap = { '06500': 'Menton', '59430': 'Saint-Pol-sur-Mer' };
    setFormData(prev => ({ ...prev, zipCode: val, city: cityMap[val] || '' }));
  };

  const updateData = (field, value) => setFormData(prev => ({ ...prev, [field]: value }));

  const BackButton = () => (
    <button onClick={prevStep} className="text-zinc-400 hover:text-[#A72422] text-sm font-medium transition-colors mt-6 block w-full text-center underline underline-offset-4">
      Retour à l'étape précédente
    </button>
  );

  return (
    <section id="devis" className="py-32 px-6 bg-zinc-50">
      <div className="max-w-4xl mx-auto">
        <div className="text-center mb-16">
          <h2 className="text-4xl lg:text-5xl font-black uppercase tracking-tighter mb-4 text-black">
            Demander une <span className="text-[#A72422]">Intervention</span>
          </h2>
        </div>
        <div className="bg-white rounded-[3rem] shadow-[0_40px_80px_-20px_rgba(0,0,0,0.08)] border border-zinc-100 overflow-hidden">
          <div className="flex border-b border-zinc-50">
            {steps.map((step) => (
              <div key={step.id} className={'flex-1 py-4 flex items-center justify-center gap-2 border-b-2 transition-all duration-500 ' + (currentStep >= step.id ? 'border-[#A72422] text-[#A72422]' : 'border-transparent text-zinc-300')}>
                <div className={'hidden sm:block'}>{step.icon}</div>
                <span className="text-[10px] font-black uppercase tracking-widest hidden md:block">{step.title}</span>
              </div>
            ))}
          </div>
          <div className="p-10 lg:p-16 min-h-[400px]">
            {!isSubmitted ? (
              <AnimatePresence mode="wait">
                {currentStep === 1 && (
                  <motion.div key="s1" initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: -20 }} className="space-y-6 text-center">
                    <Star className="w-16 h-16 text-[#A72422] mx-auto" />
                    <h3 className="text-2xl font-black italic">Bienvenue chez ESEND</h3>
                    <button onClick={nextStep} className="w-full bg-black text-white p-6 rounded-2xl font-black uppercase hover:bg-[#A72422] transition-all">Démarrer</button>
                  </motion.div>
                )}
                {currentStep === 2 && (
                  <motion.div key="s2" initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: -20 }} className="space-y-6">
                    <h3 className="text-xl font-black text-center flex items-center justify-center gap-2"><SprayCan /> Quel service ?</h3>
                    <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                      {[{n:'Nuisibles', i:<Bug/>}, {n:'Désinfection', i:<ShieldCheck/>}, {n:'Nettoyage', i:<Zap/>}].map(s => (
                        <motion.button key={s.n} whileHover={{ scale: 1.05 }} onClick={() => { updateData('problem', s.n); nextStep(); }} className="flex flex-col items-center gap-4 p-6 border-2 border-zinc-200 rounded-2xl font-bold hover:border-[#A72422] transition-all">{s.i}{s.n}</motion.button>
                      ))}
                    </div>
                    <BackButton />
                  </motion.div>
                )}
                {currentStep === 3 && (
                  <motion.div key="s3" initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: -20 }} className="space-y-6">
                    <h3 className="text-xl font-black text-center flex items-center justify-center gap-2"><Building2 /> Type de client</h3>
                    <div className="grid grid-cols-2 gap-4">
                      {['Particulier', 'Entreprise'].map(option => (
                        <motion.button key={option} whileHover={{ scale: 1.05 }} onClick={() => { updateData('clientType', option); nextStep(); }} className="p-6 border-2 border-zinc-200 rounded-2xl font-bold hover:border-[#A72422] transition-all">{option}</motion.button>
                      ))}
                    </div>
                    <BackButton />
                  </motion.div>
                )}
                {currentStep === 4 && (
                  <motion.div key="s4" initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: -20 }} className="space-y-6">
                    <h3 className="text-xl font-black text-center flex items-center justify-center gap-2"><MapPin /> Secteur</h3>
                    <input type="text" placeholder="Code Postal (ex: 59430)" value={formData.zipCode} onChange={(e) => handleZipChange(e.target.value)} className="w-full p-6 bg-zinc-50 rounded-2xl border-2" />
                    <input type="text" placeholder="Ville" value={formData.city} readOnly className="w-full p-6 bg-zinc-100 rounded-2xl font-bold" />
                    <button onClick={nextStep} className="w-full bg-black text-white p-6 rounded-2xl font-black uppercase">Continuer</button>
                    <BackButton />
                  </motion.div>
                )}
                {currentStep === 5 && (
                  <motion.div key="s5" initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: -20 }} className="space-y-4">
                    <h3 className="text-xl font-black text-center flex items-center justify-center gap-2"><User /> Contact</h3>
                    <input type="text" placeholder="Nom" className="w-full p-4 border-2 rounded-lg" onChange={(e) => updateData('name', e.target.value)} />
                    <input type="email" placeholder="Email" className="w-full p-4 border-2 rounded-lg" onChange={(e) => updateData('email', e.target.value)} />
                    <input type="tel" placeholder="Téléphone" className="w-full p-4 border-2 rounded-lg" onChange={(e) => updateData('phone', e.target.value)} />
                    <button onClick={() => setIsSubmitted(true)} className="w-full bg-[#A72422] text-white p-6 rounded-2xl font-black uppercase">Envoyer</button>
                    <BackButton />
                  </motion.div>
                )}
              </AnimatePresence>
            ) : (
              <motion.div initial={{ scale: 0.8 }} animate={{ scale: 1 }} className="text-center py-10 space-y-4">
                <div className="w-20 h-20 bg-green-100 text-green-600 rounded-full flex items-center justify-center mx-auto text-4xl">✓</div>
                <h3 className="text-2xl font-black">Demande envoyée !</h3>
              </motion.div>
            )}
          </div>
        </div>
      </div>
    </section>
  );
};
export default FormWizard;
