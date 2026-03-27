import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ChevronRight, ChevronLeft, Send, CheckCircle2, Home, Building2, MapPin, User, MessageSquare, Sparkles, Bug, Trash2 } from 'lucide-react';

const steps = [
  { id: 1, title: 'Bienvenue', icon: <Home className="w-5 h-5" /> },
  { id: 2, title: 'Service', icon: <MessageSquare className="w-5 h-5" /> },
  { id: 3, title: 'Client', icon: <Building2 className="w-5 h-5" /> },
  { id: 4, title: 'Zone', icon: <MapPin className="w-5 h-5" /> },
  { id: 5, title: 'Contact', icon: <User className="w-5 h-5" /> },
];

const FormWizard = () => {
  const [currentStep, setCurrentStep] = useState(1);
  const [formData, setFormData] = useState({ problem: '', subProblem: '', surface: '', clientType: '', zipCode: '', name: '', email: '', phone: '', message: '' });
  const [isSubmitted, setIsSubmitted] = useState(false);

  const nextStep = () => setCurrentStep(prev => Math.min(prev + 1, steps.length));
  const prevStep = () => setCurrentStep(prev => Math.max(prev - 1, 1));
  const handleSubmit = (e) => { e.preventDefault(); setIsSubmitted(true); };
  const updateData = (field, value) => setFormData(prev => ({ ...prev, [field]: value }));

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
                className={'flex-1 py-4 flex items-center justify-center gap-2 border-b-2 transition-all duration-500 ' + (currentStep >= step.id ? 'border-red-600 text-red-600' : 'border-transparent text-zinc-300')}
              >
                <div className={'hidden sm:block'}>{step.icon}</div>
                <span className="text-[10px] font-black uppercase tracking-widest hidden md:block">{step.title}</span>
              </div>
            ))}
          </div>
          
          <div className="p-10 lg:p-16 min-h-[400px]">
            {!isSubmitted ? (
              <form onSubmit={handleSubmit}>
                <AnimatePresence mode="wait">
                  {currentStep === 1 && (
                    <motion.div key="s1" className="text-center space-y-6">
                      <h3 className="text-2xl font-black italic">Bienvenue chez ESEND</h3>
                      <button type="button" onClick={nextStep} className="w-full bg-black text-white p-6 rounded-2xl">Démarrer</button>
                    </motion.div>
                  )}
                  {/* Additional steps would be restored here */}
                </AnimatePresence>
              </form>
            ) : <div className="text-center">Succès !</div>}
          </div>
        </div>
      </div>
    </section>
  );
};
export default FormWizard;
