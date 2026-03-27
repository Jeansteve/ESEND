import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ChevronRight, ChevronLeft, Home, Building2, MapPin, User, MessageSquare } from 'lucide-react';

const steps = [
  { id: 1, title: 'Bienvenue', icon: <Home className="w-5 h-5" /> },
  { id: 2, title: 'Service', icon: <MessageSquare className="w-5 h-5" /> },
  { id: 3, title: 'Client', icon: <Building2 className="w-5 h-5" /> },
  { id: 4, title: 'Zone', icon: <MapPin className="w-5 h-5" /> },
  { id: 5, title: 'Contact', icon: <User className="w-5 h-5" /> },
];

const FormWizard = () => {
  const [currentStep, setCurrentStep] = useState(1);
  const [formData, setFormData] = useState({ problem: '', clientType: '', zipCode: '', name: '', email: '', phone: '' });
  const [isSubmitted, setIsSubmitted] = useState(false);

  const nextStep = () => setCurrentStep(prev => Math.min(prev + 1, steps.length));
  const prevStep = () => setCurrentStep(prev => Math.max(prev - 1, 1));
  const updateData = (field, value) => setFormData(prev => ({ ...prev, [field]: value }));

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
            <AnimatePresence mode="wait">
              {currentStep === 1 && (
                <motion.div key="s1" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} className="text-center space-y-6">
                  <h3 className="text-2xl font-black italic">Bienvenue chez ESEND</h3>
                  <p className="text-zinc-500">Auto-entrepreneurs réactifs à Menton.</p>
                  <button onClick={nextStep} className="w-full bg-black text-white p-6 rounded-2xl font-black uppercase">Démarrer</button>
                </motion.div>
              )}
              {currentStep === 2 && (
                <motion.div key="s2" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} className="space-y-4">
                  <h3 className="text-xl font-black mb-4">Quel service ?</h3>
                  <select onChange={(e) => updateData('problem', e.target.value)} className="w-full p-4 border border-zinc-200 rounded-lg">
                    <option value="">Choisir</option>
                    <option value="Nuisibles">Nuisibles</option>
                    <option value="Nettoyage">Nettoyage</option>
                  </select>
                  <div className="flex gap-4">
                    <button onClick={prevStep} className="flex-1 p-4 border rounded-lg">Retour</button>
                    <button onClick={nextStep} className="flex-1 bg-black text-white p-4 rounded-lg">Suivant</button>
                  </div>
                </motion.div>
              )}
              {currentStep === 3 && (
                <motion.div key="s3" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} className="space-y-4">
                  <h3 className="text-xl font-black mb-4">Type de client</h3>
                  <select onChange={(e) => updateData('clientType', e.target.value)} className="w-full p-4 border border-zinc-200 rounded-lg">
                    <option value="">Choisir</option>
                    <option value="particulier">Particulier</option>
                    <option value="entreprise">Entreprise</option>
                  </select>
                  <div className="flex gap-4">
                    <button onClick={prevStep} className="flex-1 p-4 border rounded-lg">Retour</button>
                    <button onClick={nextStep} className="flex-1 bg-black text-white p-4 rounded-lg">Suivant</button>
                  </div>
                </motion.div>
              )}
              {currentStep === 4 && (
                <motion.div key="s4" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} className="space-y-4">
                  <h3 className="text-xl font-black mb-4">Ville</h3>
                  <input type="text" placeholder="Menton" onChange={(e) => updateData('zipCode', e.target.value)} className="w-full p-4 border border-zinc-200 rounded-lg" />
                  <div className="flex gap-4">
                    <button onClick={prevStep} className="flex-1 p-4 border rounded-lg">Retour</button>
                    <button onClick={nextStep} className="flex-1 bg-black text-white p-4 rounded-lg">Suivant</button>
                  </div>
                </motion.div>
              )}
              {currentStep === 5 && (
                <motion.div key="s5" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} className="space-y-4">
                  <h3 className="text-xl font-black mb-4">Contact</h3>
                  <input type="text" placeholder="Nom" onChange={(e) => updateData('name', e.target.value)} className="w-full p-4 border border-zinc-200 rounded-lg" />
                  <input type="email" placeholder="Email" onChange={(e) => updateData('email', e.target.value)} className="w-full p-4 border border-zinc-200 rounded-lg" />
                  <div className="flex gap-4">
                    <button onClick={prevStep} className="flex-1 p-4 border rounded-lg">Retour</button>
                    <button onClick={() => setIsSubmitted(true)} className="flex-1 bg-red-600 text-white p-4 rounded-lg font-black">Envoyer</button>
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        </div>
      </div>
    </section>
  );
};
export default FormWizard;
