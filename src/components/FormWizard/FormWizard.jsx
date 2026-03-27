import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ChevronLeft, Home, Building2, MapPin, User, MessageSquare } from 'lucide-react';

const steps = [
  { id: 1, title: 'Bienvenue', icon: <Home className="w-5 h-5" /> },
  { id: 2, title: 'Service', icon: <MessageSquare className="w-5 h-5" /> },
  { id: 3, title: 'Client', icon: <Building2 className="w-5 h-5" /> },
  { id: 4, title: 'Zone', icon: <MapPin className="w-5 h-5" /> },
  { id: 5, title: 'Contact', icon: <User className="w-5 h-5" /> },
];

const FormWizard = () => {
  const [currentStep, setCurrentStep] = useState(1);
  const [formData, setFormData] = useState({ problem: '', clientType: '', zipCode: '', name: '', email: '' });
  const [isSubmitted, setIsSubmitted] = useState(false);

  const nextStep = () => setCurrentStep(prev => Math.min(prev + 1, steps.length));
  const prevStep = () => setCurrentStep(prev => Math.max(prev - 1, 1));
  const updateData = (field, value) => setFormData(prev => ({ ...prev, [field]: value }));

  const NavButtons = () => (
    <div className="flex gap-4 mt-8">
      {currentStep > 1 && (
        <button onClick={prevStep} className="flex-1 p-4 border-2 border-zinc-200 rounded-2xl font-bold hover:bg-zinc-100 transition-all">Retour</button>
      )}
    </div>
  );

  return (
    <section id="devis" className="py-32 px-6 bg-zinc-50">
      <div className="max-w-4xl mx-auto">
        <div className="text-center mb-16">
          <h2 className="text-4xl lg:text-5xl font-black uppercase tracking-tighter mb-4 text-black">
            Demander une <span className="text-red-600">Intervention</span>
          </h2>
          <p className="text-zinc-500 font-medium italic">Service de proximité à Menton : Diagnostic et devis gratuits.</p>
        </div>

        <div className="bg-white rounded-[3rem] shadow-[0_40px_80px_-20px_rgba(0,0,0,0.08)] border border-zinc-100 overflow-hidden">
          <div className="flex border-b border-zinc-50">
            {steps.map((step) => (
              <div key={step.id} className={'flex-1 py-4 flex items-center justify-center gap-2 border-b-2 transition-all duration-500 ' + (currentStep >= step.id ? 'border-red-600 text-red-600' : 'border-transparent text-zinc-300')}>
                <div className={'hidden sm:block'}>{step.icon}</div>
                <span className="text-[10px] font-black uppercase tracking-widest hidden md:block">{step.title}</span>
              </div>
            ))}
          </div>

          <div className="p-10 lg:p-16 min-h-[400px]">
            {!isSubmitted ? (
              <AnimatePresence mode="wait">
                {currentStep === 1 && (
                  <motion.div key="s1" initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: -20 }} className="space-y-6">
                    <h3 className="text-2xl font-black italic text-center">Bienvenue chez ESEND</h3>
                    <button onClick={nextStep} className="w-full bg-black text-white p-6 rounded-2xl font-black uppercase hover:bg-red-600 transition-all">Démarrer</button>
                  </motion.div>
                )}
                {currentStep === 2 && (
                  <motion.div key="s2" initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: -20 }} className="space-y-6">
                    <h3 className="text-xl font-black uppercase tracking-tight text-center">Quel service ?</h3>
                    <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                      {['Nuisibles', 'Désinfection', 'Nettoyage'].map(option => (
                        <button key={option} onClick={() => { updateData('problem', option); nextStep(); }} className="p-6 border-2 border-zinc-200 rounded-2xl font-bold hover:border-red-600 transition-all">{option}</button>
                      ))}
                    </div>
                    <NavButtons />
                  </motion.div>
                )}
                {currentStep === 3 && (
                  <motion.div key="s3" initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: -20 }} className="space-y-6">
                    <h3 className="text-xl font-black uppercase tracking-tight text-center">Type de client</h3>
                    <div className="grid grid-cols-2 gap-4">
                      {['Particulier', 'Entreprise'].map(option => (
                        <button key={option} onClick={() => { updateData('clientType', option); nextStep(); }} className="p-6 border-2 border-zinc-200 rounded-2xl font-bold hover:border-red-600 transition-all">{option}</button>
                      ))}
                    </div>
                    <NavButtons />
                  </motion.div>
                )}
                {currentStep === 4 && (
                  <motion.div key="s4" initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: -20 }} className="space-y-6">
                    <h3 className="text-xl font-black uppercase tracking-tight text-center">Secteur</h3>
                    <input type="text" placeholder="Ville (ex: Menton)" onChange={(e) => updateData('zipCode', e.target.value)} className="w-full p-6 bg-zinc-50 rounded-2xl border-2 border-zinc-200" />
                    <div className="flex gap-4">
                      <button onClick={prevStep} className="flex-1 p-4 border-2 rounded-2xl font-bold">Retour</button>
                      <button onClick={nextStep} className="flex-1 bg-black text-white p-4 rounded-2xl font-black uppercase">Continuer</button>
                    </div>
                  </motion.div>
                )}
                {currentStep === 5 && (
                  <motion.div key="s5" initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: -20 }} className="space-y-4">
                    <h3 className="text-xl font-black uppercase tracking-tight text-center">Contact</h3>
                    <input type="text" placeholder="Nom" className="w-full p-4 border-2 rounded-lg" onChange={(e) => updateData('name', e.target.value)} />
                    <input type="email" placeholder="Email" className="w-full p-4 border-2 rounded-lg" onChange={(e) => updateData('email', e.target.value)} />
                    <div className="flex gap-4">
                      <button onClick={prevStep} className="flex-1 p-4 border-2 rounded-2xl font-bold">Retour</button>
                      <button onClick={() => setIsSubmitted(true)} className="flex-1 bg-red-600 text-white p-4 rounded-2xl font-black uppercase">Envoyer la demande</button>
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            ) : (
              <motion.div initial={{ scale: 0.8 }} animate={{ scale: 1 }} className="text-center py-10 space-y-4">
                <div className="w-20 h-20 bg-green-100 text-green-600 rounded-full flex items-center justify-center mx-auto text-4xl">✓</div>
                <h3 className="text-2xl font-black">Demande envoyée !</h3>
                <p className="text-zinc-500">Nous vous recontactons très vite.</p>
              </motion.div>
            )}
          </div>
        </div>
      </div>
    </section>
  );
};
export default FormWizard;
