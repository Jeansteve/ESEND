import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ChevronRight, ChevronLeft, Send, CheckCircle2, Home, Building2, MapPin, User, MessageSquare, Sparkles, Trash2, Bug } from 'lucide-react';

const steps = [
  { id: 1, title: 'Bienvenue', icon: <Home className="w-5 h-5" /> },
  { id: 2, title: 'Service', icon: <MessageSquare className="w-5 h-5" /> },
  { id: 3, title: 'Client', icon: <Building2 className="w-5 h-5" /> },
  { id: 4, title: 'Zone', icon: <MapPin className="w-5 h-5" /> },
  { id: 5, title: 'Contact', icon: <User className="w-5 h-5" /> },
];

const FormWizard = () => {
  const [currentStep, setCurrentStep] = useState(1);
  const [formData, setFormData] = useState({
    problem: '',
    subProblem: '',
    surface: '',
    clientType: '',
    zipCode: '',
    name: '',
    email: '',
    phone: '',
    message: ''
  });
  const [isSubmitted, setIsSubmitted] = useState(false);

  const nextStep = () => setCurrentStep(prev => Math.min(prev + 1, steps.length));
  const prevStep = () => setCurrentStep(prev => Math.max(prev - 1, 1));

  const handleSubmit = (e) => {
    e.preventDefault();
    setIsSubmitted(true);
  };

  const updateData = (field, value) => {
    setFormData(prev => ({ ...prev, [field]: value }));
  };

  return (
    <section id="devis" className="py-32 px-6 bg-zinc-50">
      <div className="max-w-4xl mx-auto">
        <div className="text-center mb-16">
          <h2 className="text-4xl lg:text-5xl font-black uppercase tracking-tighter mb-4 text-black">
            Demander une <span className="text-esend-red">Intervention</span>
          </h2>
          <p className="text-zinc-500 font-medium italic">Service de proximité à Menton : Diagnostic et devis gratuits.</p>
        </div>

        <div className="bg-white rounded-[3rem] shadow-[0_40px_80px_-20px_rgba(0,0,0,0.08)] border border-zinc-100 overflow-hidden">
          <div className="flex border-b border-zinc-50">
            {steps.map((step) => (
              <div 
                key={step.id}
                className={'flex-1 py-4 flex items-center justify-center gap-2 border-b-2 transition-all duration-500 ' + (currentStep >= step.id ? 'border-esend-red text-esend-red' : 'border-transparent text-zinc-300')}
              >
                <div className={'hidden sm:block'}>{step.icon}</div>
                <span className="text-[10px] font-black uppercase tracking-widest hidden md:block">{step.title}</span>
              </div>
            ))}
          </div>

          <div className="p-10 lg:p-16">
            {!isSubmitted ? (
              <form onSubmit={handleSubmit}>
                <AnimatePresence mode="wait">
                  {currentStep === 1 && (
                    <motion.div key="step1" initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: -20 }} className="space-y-8">
                      <div className="text-center">
                        <h3 className="text-2xl font-black uppercase tracking-tight mb-4 text-black italic">Votre Duo Expert à Menton</h3>
                        <p className="text-zinc-500 max-w-md mx-auto leading-relaxed">Auto-entrepreneurs réactifs, nous intervenons en couple pour une efficacité et une confiance totale. Nuisibles, nettoyage ou débarrassage : nous sommes là pour vous.</p>
                      </div>
                      <button type="button" onClick={nextStep} className="w-full bg-black text-white py-6 rounded-2xl font-black uppercase tracking-[0.2em] text-xs hover:bg-esend-red transition-all flex items-center justify-center gap-3">
                        Lancer le diagnostic <ChevronRight className="w-4 h-4" />
                      </button>
                    </motion.div>
                  )}

                  {currentStep === 2 && (
                    <motion.div key="step2" initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: -20 }} className="space-y-6">
                      <h3 className="text-xl font-black uppercase tracking-tight mb-6">De quel service avez-vous besoin ?</h3>
                      <select onChange={(e) => updateData('problem', e.target.value)} className="w-full p-4 border border-zinc-200 rounded-lg font-bold">
                        <option value="">Choisir un service</option>
                        <option value="Nuisibles">Nuisibles (Rats, Cafards)</option>
                        <option value="Nettoyage">Nettoyage / Vitres</option>
                      </select>
                      {formData.problem === 'Nuisibles' && (
                        <select onChange={(e) => updateData('subProblem', e.target.value)} className="w-full p-4 border border-zinc-200 rounded-lg font-bold">
                            <option value="">Quel type de nuisibles ?</option>
                            <option value="rats">Rats / Souris</option>
                            <option value="cafards">Cafards / Blattes</option>
                        </select>
                      )}
                      {formData.problem === 'Nettoyage' && (
                        <input type="number" placeholder="Surface en m²" onChange={(e) => updateData('surface', e.target.value)} className="w-full p-4 border border-zinc-200 rounded-lg font-bold" />
                      )}
                      <button type="button" onClick={nextStep} className="w-full bg-black text-white p-4 rounded-lg font-black uppercase text-xs">Suivant</button>
                    </motion.div>
                  )}

                  {currentStep === 4 && (
                    <motion.div key="step4" initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: -20 }} className="space-y-6">
                      <h3 className="text-xl font-black uppercase tracking-tight mb-6 text-black italic">Votre Secteur</h3>
                      <input type="text" placeholder="Ville (ex: Menton)" onChange={(e) => updateData('zipCode', e.target.value)} className="w-full p-6 bg-zinc-50 rounded-2xl border border-zinc-100" />
                      {formData.zipCode.toLowerCase() === 'menton' && (
                        <button type="button" className="w-full bg-red-600 text-white p-4 rounded-lg font-black uppercase animate-pulse">Priorité Immédiate</button>
                      )}
                      <button type="button" onClick={nextStep} className="w-full bg-black text-white p-4 rounded-lg font-black uppercase text-xs">Suivant</button>
                    </motion.div>
                  )}
                </AnimatePresence>
              </form>
            ) : (
              <div className="text-center py-10">Succès !</div>
            )}
          </div>
        </div>
      </div>
    </section>
  );
};

export default FormWizard;
