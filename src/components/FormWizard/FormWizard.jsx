import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Bug, Rat, Home, Building2, MapPin, User, MessageSquare, Phone, Mail, Check, Star, Zap, Trash2, ShieldCheck, SprayCan, Asterisk, Bird, Snail } from 'lucide-react';

const FormWizard = () => {
  const [currentStepIndex, setCurrentStepIndex] = useState(0);
  const [formData, setFormData] = useState({ problem: '', pestType: '', otherPest: '', clientType: '', zipCode: '', city: '', name: '', email: '', phone: '' });
  const [errors, setErrors] = useState({});
  const [isSubmitted, setIsSubmitted] = useState(false);

  const validate = () => {
    const newErrors = {};
    if (!formData.name) newErrors.name = 'Le nom est requis';
    if (!formData.email || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) newErrors.email = 'Email invalide';
    if (!formData.phone) newErrors.phone = 'Le numéro est requis';
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const getSteps = () => {
    const s = [
      { id: 'welcome', title: 'Bienvenue', icon: <Home className="w-5 h-5" /> },
      { id: 'service', title: 'Service', icon: <MessageSquare className="w-5 h-5" /> },
    ];
    if (formData.problem === 'Nuisibles') {
      s.push({ id: 'pest', title: 'Nuisible', icon: <Bug className="w-5 h-5" /> });
    }
    s.push(
      { id: 'client', title: 'Client', icon: <Building2 className="w-5 h-5" /> },
      { id: 'zone', title: 'Zone', icon: <MapPin className="w-5 h-5" /> },
      { id: 'contact', title: 'Contact', icon: <User className="w-5 h-5" /> }
    );
    return s;
  };

  const currentSteps = getSteps();
  const stepIndex = Math.min(currentStepIndex, currentSteps.length - 1);
  const currentStepData = currentSteps[stepIndex];

  const nextStep = () => {
    setErrors({});
    if (stepIndex < currentSteps.length - 1) {
      setCurrentStepIndex(prev => Math.min(prev + 1, currentSteps.length - 1));
    }
  };
  const prevStep = () => {
    setCurrentStepIndex(prev => Math.max(prev - 1, 0));
  };
  const updateData = (field, value) => {
    setFormData(prev => ({ ...prev, [field]: value }));
    if (errors[field]) setErrors(prev => ({ ...prev, [field]: null }));
  };

  const handlePestSelect = (pest) => {
    updateData('pestType', pest);
    if (pest !== 'Autre') nextStep();
  };

  const handleZipChange = (val) => {
    const cityMap = { '06500': 'Menton', '59430': 'Saint-Pol-sur-Mer' };
    setFormData(prev => ({ ...prev, zipCode: val, city: cityMap[val] || '' }));
  };
  const handleProblemSelect = (problem) => {
    setFormData(prev => ({ ...prev, problem }));
    setCurrentStepIndex(1); nextStep();
  };

  const ErrorMsg = ({ error }) => error ? (
    <motion.p initial={{ opacity: 0, y: -10 }} animate={{ opacity: 1, y: 0 }} className="text-[#A72422] text-xs font-bold pt-1">{error}</motion.p>
  ) : null;

  return (
    <section id="devis" className="py-32 px-6 bg-zinc-50">
      <div className="max-w-4xl mx-auto">
        <div className="text-center mb-16">
          <h2 className="text-4xl lg:text-5xl font-black uppercase tracking-tighter mb-4 text-black">
            Demander une <span className="text-[#A72422]">Intervention</span>
          </h2>
        </div>
        <div className="bg-white rounded-[3rem] shadow-[0_40px_80px_-20px_rgba(0,0,0,0.08)] border border-zinc-100 overflow-hidden">
          <div className="flex border-b border-zinc-50 overflow-x-auto">
            {currentSteps.map((step, idx) => (
              <div key={step.id} className={'min-w-[100px] flex-1 py-4 flex items-center justify-center gap-2 border-b-2 transition-all duration-500 ' + (stepIndex >= idx ? 'border-[#A72422] text-[#A72422]' : 'border-transparent text-zinc-300')}>
                <div className={'hidden sm:block'}>{step.icon}</div>
                <span className="text-[10px] font-black uppercase tracking-widest hidden md:block">{step.title}</span>
              </div>
            ))}
          </div>
          <div className="p-10 lg:p-16 min-h-[400px] relative">
            {currentStepIndex > 0 && !isSubmitted && (
              <button 
                onClick={prevStep}
                className="absolute top-6 left-6 text-zinc-400 hover:text-black flex items-center gap-2 font-bold text-xs uppercase tracking-widest transition-colors z-10"
              >
                ← Retour
              </button>
            )}
            {!isSubmitted ? (
              <AnimatePresence mode="popLayout">
                <motion.div key={currentStepData.id} initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: -20 }} className="space-y-6">
                  {currentStepData.id === 'welcome' && (
                    <div className="text-center"><Star className="w-16 h-16 text-[#A72422] mx-auto mb-6" />
                    <h3 className="text-2xl font-black italic mb-8">Bienvenue chez ESEND</h3>
                    <button onClick={nextStep} className="w-full bg-black text-white p-6 rounded-2xl font-black uppercase hover:bg-[#A72422] transition-all">Démarrer</button></div>
                  )}
                  {currentStepData.id === 'service' && (
                    <div><h3 className="text-xl font-black text-center flex items-center justify-center gap-2 mb-8"><SprayCan /> Quel service ?</h3>
                    <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                      {[{n:'Nuisibles', i:<Bug/>}, {n:'Désinfection', i:<ShieldCheck/>}, {n:'Nettoyage', i:<Zap/>}].map(s => (
                        <motion.button key={s.n} whileHover={{ scale: 1.05 }} onClick={() => handleProblemSelect(s.n)} className="flex flex-col items-center gap-4 p-6 border-2 border-zinc-200 rounded-2xl font-bold hover:border-[#A72422] transition-all">{s.i}{s.n}</motion.button>
                      ))}
                    </div></div>
                  )}
                  {currentStepData.id === 'pest' && (
                    <div><h3 className="text-xl font-black text-center flex items-center justify-center gap-2 mb-8"><Bug /> Quel nuisible ?</h3>
                    <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
                      {[{n:'Cafard', i:<Bug/>}, {n:'Fourmis', i:<Asterisk/>}, {n:'Abeille', i:<Star/>}, {n:'Souris', i:<Rat/>}, {n:'Frelons', i:<ShieldCheck/>}, {n:'Punaise de lit', i:<Snail/>}, {n:'Autre', i:<MessageSquare/>}].map(s => (
                        <motion.button key={s.n} onClick={() => handlePestSelect(s.n)} className={'flex flex-col items-center gap-3 p-4 border-2 rounded-2xl font-bold ' + (formData.pestType === s.n ? 'border-[#A72422] bg-red-50 text-[#A72422]' : 'border-zinc-200')}>{s.i}<span className="text-xs text-center">{s.n}</span></motion.button>
                      ))}
                    </div>
                    {formData.pestType === 'Autre' && (
                      <div className="pt-4 space-y-4">
                        <input type="text" placeholder="Précisez le nuisible" value={formData.otherPest} onChange={(e) => updateData('otherPest', e.target.value)} className="w-full p-4 border-2 border-[#A72422] rounded-xl focus:outline-none" />
                        <button onClick={nextStep} disabled={!formData.otherPest} className="w-full bg-[#A72422] text-white p-4 rounded-xl font-black uppercase disabled:opacity-50">Continuer</button>
                      </div>
                    )}</div>
                  )}
                  {currentStepData.id === 'client' && (
                    <div><h3 className="text-xl font-black text-center flex items-center justify-center gap-2 mb-8"><Building2 /> Type de client</h3>
                    <div className="grid grid-cols-2 gap-4">
                      {['Particulier', 'Entreprise'].map(option => (
                        <motion.button key={option} whileHover={{ scale: 1.05 }} onClick={() => { updateData('clientType', option); nextStep(); }} className="p-6 border-2 border-zinc-200 rounded-2xl font-bold hover:border-[#A72422] transition-all">{option}</motion.button>
                      ))}
                    </div></div>
                  )}
                  {currentStepData.id === 'zone' && (
                    <div className="space-y-4"><h3 className="text-xl font-black text-center flex items-center justify-center gap-2 mb-8"><MapPin /> Secteur</h3>
                    <input type="text" placeholder="Code Postal (ex: 59430)" value={formData.zipCode} onChange={(e) => handleZipChange(e.target.value)} className="w-full p-6 bg-zinc-50 rounded-2xl border-2" />
                    <input type="text" placeholder="Ville" value={formData.city} readOnly className="w-full p-6 bg-zinc-100 rounded-2xl font-bold" />
                    <button onClick={nextStep} className="w-full mt-2 bg-black text-white p-6 rounded-2xl font-black uppercase">Continuer</button></div>
                  )}
                  {currentStepData.id === 'contact' && (
                    <div className="space-y-4"><h3 className="text-xl font-black text-center flex items-center justify-center gap-2 mb-8"><User /> Vos coordonnées</h3>
                    <ErrorMsg error={errors.name} />
                    <input type="text" placeholder="Nom" className="w-full p-4 border-2 rounded-lg" onChange={(e) => updateData('name', e.target.value)} />
                    <ErrorMsg error={errors.email} />
                    <input type="email" placeholder="Email" className="w-full p-4 border-2 rounded-lg" onChange={(e) => updateData('email', e.target.value)} />
                    <ErrorMsg error={errors.phone} />
                    <input type="tel" placeholder="Téléphone" className="w-full p-4 border-2 rounded-lg" onChange={(e) => updateData('phone', e.target.value)} />
                    <button onClick={() => validate() && setIsSubmitted(true)} className="w-full mt-4 bg-[#A72422] text-white p-6 rounded-2xl font-black uppercase">Envoyer</button></div>
                  )}
                </motion.div>
              </AnimatePresence>
            ) : (
              <motion.div className="text-center py-10 space-y-4">
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
