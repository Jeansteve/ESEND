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

  const services = [
    { id: 'deratisation', label: 'Dératisation / Nuisibles', icon: <Bug className="w-5 h-5" /> },
    { id: 'nettoyage', label: 'Nettoyage / Vitres', icon: <Sparkles className="w-5 h-5" /> },
    { id: 'urgence', label: 'Urgence Menton & Environs', icon: <MapPin className="w-5 h-5 text-esend-red" /> },
  ];

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
          {/* Progress Bar */}
          <div className="flex border-b border-zinc-50">
            {steps.map((step) => (
              <div 
                key={step.id}
                className={`flex-1 py-4 flex items-center justify-center gap-2 border-b-2 transition-all duration-500 ${
                  currentStep >= step.id ? 'border-esend-red text-esend-red' : 'border-transparent text-zinc-300'
                }`}
              >
                <div className={`hidden sm:block`}>{step.icon}</div>
                <span className="text-[10px] font-black uppercase tracking-widest hidden md:block">{step.title}</span>
              </div>
            ))}
          </div>

          <div className="p-10 lg:p-16">
            {!isSubmitted ? (
              <form onSubmit={handleSubmit}>
                <AnimatePresence mode="wait">
                  {currentStep === 1 && (
                    <motion.div 
                      key="step1"
                      initial={{ opacity: 0, x: 20 }}
                      animate={{ opacity: 1, x: 0 }}
                      exit={{ opacity: 0, x: -20 }}
                      className="space-y-8"
                    >
                      <div className="text-center">
                        <h3 className="text-2xl font-black uppercase tracking-tight mb-4 text-black italic">Votre Duo Expert à Menton</h3>
                        <p className="text-zinc-500 max-w-md mx-auto leading-relaxed">
                          Auto-entrepreneurs réactifs, nous intervenons en couple pour une efficacité et une confiance totale. Nuisibles, nettoyage ou débarrassage : nous sommes là pour vous.
                        </p>
                      </div>
                      <button 
                        type="button"
                        onClick={nextStep}
                        className="w-full bg-black text-white py-6 rounded-2xl font-black uppercase tracking-[0.2em] text-xs hover:bg-esend-red transition-all flex items-center justify-center gap-3"
                      >
                        Lancer le diagnostic <ChevronRight className="w-4 h-4" />
                      </button>
                    </motion.div>
                  )}

                  {currentStep === 2 && (
                    <motion.div 
                      key="step2"
                      initial={{ opacity: 0, x: 20 }}
                      animate={{ opacity: 1, x: 0 }}
                      exit={{ opacity: 0, x: -20 }}
                      className="space-y-6"
                    >
                      <h3 className="text-xl font-black uppercase tracking-tight mb-6">De quel service avez-vous besoin ?</h3>
                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                        {services.map(option => (
                          <button
                            key={option.id}
                            type="button"
                            onClick={() => { updateData('problem', option.label); nextStep(); }}
                            className={`p-6 rounded-2xl border-2 text-left font-bold transition-all flex items-center gap-4 ${
                              formData.problem === option.label ? 'border-esend-red bg-red-50/50 text-esend-red' : 'border-zinc-100 hover:border-zinc-300 text-zinc-600'
                            }`}
                          >
                            <div className={`p-3 rounded-lg ${formData.problem === option.label ? 'bg-esend-red text-white' : 'bg-zinc-50'}`}>
                                {option.icon}
                            </div>
                            {option.label}
                          </button>
                        ))}
                      </div>
                    </motion.div>
                  )}

                  {/* Steps 3, 4, 5 (Simplified for Menton context) */}
                  {currentStep === 3 && (
                    <motion.div 
                      key="step3"
                      initial={{ opacity: 0, x: 20 }}
                      animate={{ opacity: 1, x: 0 }}
                      exit={{ opacity: 0, x: -20 }}
                      className="space-y-6"
                    >
                      <h3 className="text-xl font-black uppercase tracking-tight mb-6 text-black">Vous êtes :</h3>
                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                        {[
                          { id: 'particulier', label: 'Un Particulier', icon: <Home className="w-6 h-6" /> },
                          { id: 'professionnel', label: 'Un Professionnel', icon: <Building2 className="w-6 h-6" /> }
                        ].map(type => (
                          <button
                            key={type.id}
                            type="button"
                            onClick={() => { updateData('clientType', type.id); nextStep(); }}
                            className={`p-10 rounded-3xl border-2 flex flex-col items-center gap-4 font-black uppercase tracking-widest text-xs transition-all ${
                              formData.clientType === type.id ? 'border-esend-red bg-red-50/50 text-esend-red' : 'border-zinc-100 hover:border-zinc-300 text-zinc-400'
                            }`}
                          >
                            <div className="p-4 bg-zinc-50 rounded-2xl">{type.icon}</div>
                            {type.label}
                          </button>
                        ))}
                      </div>
                    </motion.div>
                  )}

                  {currentStep === 4 && (
                    <motion.div 
                      key="step4"
                      initial={{ opacity: 0, x: 20 }}
                      animate={{ opacity: 1, x: 0 }}
                      exit={{ opacity: 0, x: -20 }}
                      className="space-y-6"
                    >
                      <h3 className="text-xl font-black uppercase tracking-tight mb-6 text-black italic">Secteur Menton & Riviera</h3>
                      <p className="text-zinc-500 text-sm mb-4">Nous intervenons rapidement à Menton, Roquebrune, et alentours.</p>
                      <input 
                        type="text"
                        placeholder="Ville ou Code Postal"
                        value={formData.zipCode}
                        onChange={(e) => updateData('zipCode', e.target.value)}
                        className="w-full p-6 bg-zinc-50 rounded-2xl border border-zinc-100 focus:border-esend-red outline-none font-bold text-lg"
                        autoFocus
                      />
                      <button 
                        type="button"
                        disabled={!formData.zipCode}
                        onClick={nextStep}
                        className="w-full bg-black text-white py-6 rounded-2xl font-black uppercase tracking-[0.2em] text-xs hover:bg-esend-red transition-all disabled:opacity-50"
                      >
                        Suivant
                      </button>
                    </motion.div>
                  )}

                  {currentStep === 5 && (
                    <motion.div 
                      key="step5"
                      initial={{ opacity: 0, x: 20 }}
                      animate={{ opacity: 1, x: 0 }}
                      exit={{ opacity: 0, x: -20 }}
                      className="space-y-6"
                    >
                      <h3 className="text-xl font-black uppercase tracking-tight mb-6 text-black">Finalisons votre demande</h3>
                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                        <input 
                          type="text"
                          placeholder="Nom"
                          value={formData.name}
                          onChange={(e) => updateData('name', e.target.value)}
                          className="p-5 bg-zinc-50 rounded-xl border border-zinc-100 focus:border-esend-red outline-none font-bold"
                        />
                        <input 
                          type="tel"
                          placeholder="Téléphone"
                          value={formData.phone}
                          onChange={(e) => updateData('phone', e.target.value)}
                          className="p-5 bg-zinc-50 rounded-xl border border-zinc-100 focus:border-esend-red outline-none font-bold"
                        />
                      </div>
                      <textarea 
                        placeholder="Détails du service demandé..."
                        value={formData.message}
                        onChange={(e) => updateData('message', e.target.value)}
                        className="w-full p-5 bg-zinc-50 rounded-xl border border-zinc-100 focus:border-esend-red outline-none font-bold min-h-[120px]"
                      />
                      <button 
                        type="submit"
                        className="w-full bg-esend-red text-white py-6 rounded-2xl font-black uppercase tracking-[0.2em] text-xs shadow-xl shadow-red-200 hover:scale-[1.02] transition-all flex items-center justify-center gap-3"
                      >
                        Envoyer ma demande <Send className="w-4 h-4" />
                      </button>
                    </motion.div>
                  )}
                </AnimatePresence>

                {currentStep > 1 && (
                  <button 
                    type="button"
                    onClick={prevStep}
                    className="mt-8 text-[10px] font-black uppercase tracking-[0.3em] text-zinc-400 hover:text-black flex items-center gap-2 transition-colors"
                  >
                    <ChevronLeft className="w-3 h-3" /> Retour
                  </button>
                )}
              </form>
            ) : (
              <motion.div 
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                className="text-center py-10"
              >
                <div className="w-24 h-24 bg-green-500 text-white rounded-full flex items-center justify-center mx-auto mb-8 shadow-2xl shadow-green-200">
                  <CheckCircle2 className="w-12 h-12" />
                </div>
                <h3 className="text-3xl font-black uppercase tracking-tight mb-4 text-black italic">Message Reçu !</h3>
                <p className="text-zinc-500 max-w-sm mx-auto leading-relaxed mb-8 font-medium">
                  Merci {formData.name}. Nous analysons votre demande de {formData.problem}. <br/><strong>Nous vous rappellerons très rapidement.</strong>
                </p>
              </motion.div>
            )}
          </div>
        </div>
      </div>
    </section>
  );
};

export default FormWizard;
