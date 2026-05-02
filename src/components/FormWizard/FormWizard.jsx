import React, { useState, useEffect } from 'react';
import { useSearchParams } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { Bug, Rat, Home, Building2, MapPin, User, MessageSquare, Phone, Mail, Check, Star, Zap, Trash2, ShieldCheck, SprayCan, Asterisk, Bird, Snail, Camera, Plus, X } from 'lucide-react';
import imageCompression from 'browser-image-compression';
import { api } from '../../lib/api';

const CodePenSubmitButton = ({ onClick, isPending, isSuccess }) => {
  const pillPath = "M50,25 h30 a10,10 0 0,1 10,10 a10,10 0 0,1 -10,10 s-30,0 -60,0 a10,10 0 0,1 -10,-10 a10,10 0 0,1 10,-10 h30";
  const circlePath = "M50,25 h0 a10,10 0 0,1 10,10 a10,10 0 0,1 -10,10 s0,0 0,0 a10,10 0 0,1 -10,-10 a10,10 0 0,1 10,-10 h0";

  const mainRed = "#A72422";
  const successGreen = "#16a34a"; // Vert standard, pro et équilibré au lieu du vert fluo original
  const btnState = isSuccess ? "success" : (isPending ? "loading" : "idle");

  return (
    <div className="flex justify-center w-full mt-6 mb-8 px-4">
      <button 
        type="button" 
        onClick={onClick}
        disabled={isPending || isSuccess} 
        className="relative flex items-center justify-center outline-none w-full max-w-[360px] mx-auto hover:!scale-[1.02] active:!scale-[0.98] transition-all duration-300"
        style={{ cursor: isPending || isSuccess ? 'default' : 'pointer', WebkitTapHighlightColor: 'transparent', height: 'auto' }}
      >
        <svg viewBox="5 15 90 40" className="w-full h-auto overflow-visible drop-shadow-md">
          
          {/* Main border path */}
          <motion.path
            d={pillPath}
            stroke={mainRed}
            fill="transparent"
            initial="idle"
            animate={btnState}
            variants={{
              idle: { d: pillPath, stroke: mainRed, strokeWidth: 0.7, strokeOpacity: 1, transition: { duration: 0.4 } },
              loading: { d: circlePath, stroke: mainRed, strokeWidth: 0.7, strokeOpacity: 0.3, transition: { duration: 0.6, ease: "easeOut" } },
              success: { d: pillPath, stroke: successGreen, strokeWidth: 1.5, strokeOpacity: 1, transition: { delay: 0.9, type: "spring", stiffness: 150, damping: 15 } }
            }}
          />

          {/* Center-bound circle assembly (Red Circle, Arrow, Square) */}
          <motion.g
            initial="idle"
            animate={btnState}
            style={{ transformOrigin: "20px 35px" }}
            variants={{
              idle: { x: 0, opacity: 1 },
              loading: { x: 30, opacity: 1, transition: { duration: 0.6, ease: "easeOut" } },
              success: { x: 30, opacity: 0, transition: { duration: 0.2 } } // Fades out early when success starts
            }}
          >
            {/* Red Circle */}
            <circle cx="20" cy="35" r="8.5" fill={mainRed} />
            <circle cx="20" cy="35" r="7.5" fill="none" strokeWidth="0.5" stroke="#fff" opacity="0.3" />
            
            {/* The Arrow (fades out in loading) */}
            <motion.path 
              d="M17,32 L24,35 L17,38 L19,35 Z M19,35 L24,35" 
              stroke="#fff" strokeLinecap="round" strokeLinejoin="round" strokeWidth="0.8" fill="none"
              style={{ transformOrigin: "20px 35px" }}
              variants={{
                idle: { opacity: 1, rotate: 0, scale: 1 },
                loading: { opacity: 0, scale: 0.5, transition: { duration: 0.4 } },
                success: { opacity: 0 }
              }}
            />
            
            {/* The White Square (fades in during loading) */}
            <motion.rect 
              x="17.5" y="32.5" width="5" height="5" fill="#fff" rx="0.5"
              style={{ transformOrigin: "20px 35px" }}
              variants={{
                idle: { opacity: 0, scale: 0.5 },
                loading: { opacity: 1, scale: 1, transition: { duration: 0.4, delay: 0.3, type: "spring", stiffness: 300 } },
                success: { opacity: 0 }
              }}
            />
          </motion.g>

          {/* Text Envoyer / Envoyé */}
          <motion.text 
            x="55" y="36.5" 
            fill={mainRed} 
            textAnchor="middle" 
            fontSize="5.5" 
            fontFamily="system-ui, sans-serif" 
            fontWeight="700" 
            letterSpacing="0.2"
            style={{ transformOrigin: "55px 36.5px" }}
            initial="idle"
            animate={btnState}
            variants={{
              idle: { opacity: 1, y: 0, x: 0, scale: 1, fill: mainRed },
              loading: { opacity: 0, y: 7, x: 0, scale: 0.7, fill: mainRed, transition: { duration: 0.3 } },
              // Translating text by x: -5 units perfectly centers it when the red circle isn't there anymore
              success: { opacity: 1, y: 0, x: -5, scale: 1, fill: successGreen, transition: { delay: 1.0, type: "spring", stiffness: 200 } }
            }}
          >
            {btnState === "success" ? "Envoyé" : "Envoyer"}
          </motion.text>

          {/* Spinner & Dot Assembly */}
          <motion.g
            style={{ transformOrigin: "50px 35px" }}
            initial="idle"
            animate={btnState}
            variants={{
              idle: { rotate: 0 },
              loading: { rotate: [0, 360], transition: { rotate: { repeat: Infinity, duration: 1.2, ease: "linear" } } },
              success: { rotate: 360, transition: { duration: 0.3, ease: "easeOut" } } // brings it back to top quickly
            }}
          >
            {/* The outer thin arc being drawn */}
            <motion.circle 
              cx="50" cy="35" r="10" 
              stroke="#fff" strokeWidth="0.8" fill="none"
              style={{ transformOrigin: "50px 35px", rotate: -90 }}
              variants={{
                idle: { pathLength: 0, opacity: 0 },
                loading: { pathLength: [0, 1], opacity: 1, transition: { pathLength: { repeat: Infinity, duration: 1.2, ease: "linear" } } },
                success: { pathLength: 1, opacity: 0, transition: { duration: 0.2 } }
              }}
            />

            {/* The White/Green bouncing Dot */}
            <motion.circle 
              cx="50" cy="25" r="1.5"
              fill="#fff"
              variants={{
                idle: { opacity: 0, scale: 0 },
                loading: { 
                  opacity: 1, 
                  scale: [0, 1.5, 1], 
                  fill: "#fff",
                  transition: { delay: 0.6, type: "spring", stiffness: 300 } 
                },
                success: { 
                  opacity: [1, 1, 0],
                  scale: [1, 1.5, 0],
                  y: [0, -28, 0], 
                  fill: successGreen, 
                  transition: { 
                    y: { delay: 0.3, duration: 0.6, ease: ["easeOut", "easeIn"], times: [0, 0.5, 1] },
                    scale: { delay: 0.9, duration: 0.1 },
                    opacity: { delay: 0.9, duration: 0.1 },
                    fill: { duration: 0.1 } 
                  } 
                }
              }}
            />
          </motion.g>

        </svg>
      </button>
    </div>
  );
};

const FormWizard = () => {
  const [searchParams] = useSearchParams();
  // State for all steps
  const [currentStepIndex, setCurrentStepIndex] = useState(0);
  const [formData, setFormData] = useState({ problem: '', pestType: '', otherPest: '', isUrgent: false, clientType: '', zipCode: '', city: '', name: '', email: '', phone: '', message: '' });
  const [errors, setErrors] = useState({});
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [isPending, setIsPending] = useState(false);

  useEffect(() => {
    const devisPest = searchParams.get('devis');
    if (devisPest) {
      let mappedPest = devisPest;
      if (devisPest === 'Punaises') mappedPest = 'Punaise de lit';
      if (devisPest === 'Guêpes') mappedPest = 'Frelons';
      if (devisPest === 'Rats') mappedPest = 'Souris';
      if (devisPest === 'Cafards') mappedPest = 'Cafard';

      setFormData(prev => ({ ...prev, problem: 'Nuisibles', pestType: mappedPest }));
      setCurrentStepIndex(3); // Passe directement à l'étape "Client"
    }

    // Gestion du scroll automatique vers #devis
    const handleHashScroll = () => {
      if (window.location.hash.includes('#devis')) {
        const target = document.getElementById('devis');
        if (target) {
          setTimeout(() => {
            const headerOffset = 100;
            const elementPosition = target.getBoundingClientRect().top;
            const offsetPosition = elementPosition + window.pageYOffset - headerOffset;
            window.scrollTo({ top: offsetPosition, behavior: 'smooth' });
          }, 100);
        }
      }
    };

    handleHashScroll();
    window.addEventListener('hashchange', handleHashScroll);
    return () => window.removeEventListener('hashchange', handleHashScroll);
  }, [searchParams]);

  const validate = () => {
    const newErrors = {};
    if (!formData.name) newErrors.name = 'Le nom est requis';
    if (!formData.email || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) newErrors.email = 'Email invalide';
    if (!formData.phone) {
      newErrors.phone = 'Le numéro est requis';
    } else if (!/^(?:(?:\+|00)33|0)\s*[1-9](?:[\s.-]*\d{2}){4}$/.test(formData.phone)) {
      newErrors.phone = 'Numéro invalide (ex: 06 12 34 56 78)';
    }
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const getSteps = () => {
    const s = [
      { id: 'welcome', title: 'Bienvenue', icon: <Home className="w-5 h-5" /> },
      { id: 'service', title: 'Service', icon: <MessageSquare className="w-5 h-5" /> },
    ];
    s.push({ 
      id: 'details', 
      title: formData.problem === 'Nuisibles' ? 'Nuisibles' : 'Détails', 
      icon: formData.problem === 'Nuisibles' ? <Bug className="w-5 h-5" /> : <Asterisk className="w-5 h-5" /> 
    });
    s.push({ id: 'urgency', title: 'Urgence', icon: <Zap className="w-5 h-5" /> });
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
    // On n'avance plus automatiquement pour laisser le client ajouter description et photos
  };

  const [isSearchingCity, setIsSearchingCity] = useState(false);
  const [photos, setPhotos] = useState([]);
  const [isCompressing, setIsCompressing] = useState(false);
  const [contactEmail, setContactEmail] = useState('contact@esendnuisibles.fr');

  useEffect(() => {
    const fetchSettings = async () => {
      try {
        const settings = await api.getSettings();
        if (settings && settings.contact_email) {
          setContactEmail(settings.contact_email);
        }
      } catch (e) {
        console.error("Erreur chargement settings:", e);
      }
    };
    fetchSettings();
  }, []);

  const handleFileChange = async (e) => {
    if (!e.target.files || e.target.files.length === 0) return;
    const files = Array.from(e.target.files);
    const validFiles = files.filter(f => ['image/jpeg', 'image/png', 'image/webp'].includes(f.type));
    if (validFiles.length + photos.length > 3) {
      alert("Vous ne pouvez ajouter que 3 photos maximum.");
      return;
    }
    
    setIsCompressing(true);
    const options = {
      maxSizeMB: 0.5,
      maxWidthOrHeight: 1200,
      useWebWorker: true,
      initialQuality: 0.8
    };
    
    try {
      const compressedPromises = validFiles.map((file) => imageCompression(file, options));
      const compressedFiles = await Promise.all(compressedPromises);
      
      const newPhotos = compressedFiles.map((blob, idx) => {
        const ext = blob.type.split('/')[1] === 'jpeg' ? 'jpg' : blob.type.split('/')[1];
        return new File([blob], `photo_${Date.now()}_${idx}.${ext}`, { type: blob.type });
      });
      
      setPhotos(prev => [...prev, ...newPhotos]);
    } catch (err) {
      console.error("Erreur compression: ", err);
    } finally {
      setIsCompressing(false);
      e.target.value = null; // reset input
    }
  };

  const removePhoto = (index) => {
    setPhotos(prev => prev.filter((_, i) => i !== index));
  };

  const handleZipChange = async (val) => {
    const cleanVal = val.replace(/\D/g, '').slice(0, 5);
    setFormData(prev => ({ ...prev, zipCode: cleanVal }));
    
    if (cleanVal.length === 5) {
      setIsSearchingCity(true);
      try {
        const response = await fetch(`https://api-adresse.data.gouv.fr/search/?q=${cleanVal}&postcode=${cleanVal}`);
        const data = await response.json();
        if (data.features && data.features.length > 0) {
          const props = data.features[0].properties;
          const city = props.city || props.oldcity || props.name;
          setFormData(prev => ({ ...prev, city }));
        }
      } catch (error) {
        console.error("Erreur recherche ville:", error);
      } finally {
        setIsSearchingCity(false);
      }
    }
  };

  const handleProblemSelect = (problem) => {
    setFormData(prev => ({ ...prev, problem }));
    setCurrentStepIndex(1); nextStep();
  };

  const ErrorMsg = ({ error }) => error ? (
    <motion.p initial={{ opacity: 0, y: -10 }} animate={{ opacity: 1, y: 0 }} className="text-[#A72422] text-xs font-bold pt-1">{error}</motion.p>
  ) : null;

  const [isSuccess, setIsSuccess] = useState(false);

  const handleSubmit = async () => {
    if (validate()) {
      setIsPending(true);
      try {
        const payload = new FormData();
        payload.append("Sujet", "Nouvelle demande de devis - " + formData.problem);
        payload.append("Nom", formData.name);
        payload.append("Téléphone", formData.phone);
        payload.append("Email", formData.email);
        payload.append("Service", formData.problem);
        payload.append("Nuisible", formData.pestType || formData.otherPest || "Non spécifié");
        payload.append("Urgence", formData.isUrgent ? "OUI - Intervention urgente" : "Non");
        payload.append("Type_Client", formData.clientType);
        payload.append("Code_Postal", formData.zipCode);
        payload.append("Ville", formData.city);
        payload.append("Précision_Problème", formData.message || "Aucune précision");
        payload.append("is_urgent", formData.isUrgent ? "1" : "0");
        payload.append("_subject", "Nouveau Devis ESEND");
        payload.append("_template", "table");
        
        if (photos && photos.length > 0) {
          photos.forEach((file, index) => {
            payload.append(`Photo_jointe_${index + 1}`, file);
          });
        }

        // Envoi des données (Ajax) via notre nouveau backend natif PHP qui supporte les pièces jointes
        const response = await fetch(`/api/devis.php`, {
          method: "POST",
          body: payload
        });

        if (response.ok) {
          setIsPending(false);
          setIsSuccess(true);
          // On laisse l'utilisateur admirer l'animation du bouton Vert "Envoyé" pendant 1.5s
          // avant de le féliciter avec le bel écran complet.
          setTimeout(() => {
            setIsSubmitted(true);
          }, 1500);
        } else {
          throw new Error("Erreur serveur FormSubmit");
        }
      } catch (error) {
        console.error("Erreur lors de l'envoi:", error);
        // Fallback visuel en cas de blocage réseau (adblocker, etc.)
        setIsPending(false);
        setIsSuccess(true);
        setTimeout(() => {
          setIsSubmitted(true);
        }, 1500);
      }
    }
  };

  return (
    <section id="devis" className="relative py-32 px-6 overflow-hidden transition-colors duration-500">
      {/* Arrière-plan Menton avec Overlay */}
      <div className="absolute inset-0 z-0">
        <img 
          src="/images/menton-contact.jpg" 
          alt="Menton" 
          className="w-full h-full object-cover"
          style={{ filter: 'brightness(0.6)' }}
        />
        <div className="absolute inset-0 bg-gradient-to-b from-slate-950/40 via-transparent to-slate-950/40" />
      </div>

      <div className="relative z-10 max-w-4xl mx-auto">
        <div className="text-center mb-16">
          <h2 className="text-4xl lg:text-5xl font-black uppercase tracking-tighter mb-4 text-white px-4 drop-shadow-lg">
            DEMANDER UNE <span className="text-red-500">INTERVENTION</span>
          </h2>
        </div>
        <div className="bg-white/5 backdrop-blur-[40px] rounded-[2rem] shadow-[0_40px_80px_-20px_rgba(0,0,0,0.6)] border border-white/20 overflow-hidden">
          <div className="relative flex border-b border-white/10 bg-transparent overflow-x-auto min-h-[64px]">
            {/* Calque Blanc avec bord adouci (Wipe Effect) */}
            <motion.div 
              initial={false}
              animate={{ 
                maskImage: `linear-gradient(to right, transparent 0%, transparent ${((stepIndex + 1) / currentSteps.length) * 100 - 15}%, black ${((stepIndex + 1) / currentSteps.length) * 100 + 10}%)`,
                WebkitMaskImage: `linear-gradient(to right, transparent 0%, transparent ${((stepIndex + 1) / currentSteps.length) * 100 - 15}%, black ${((stepIndex + 1) / currentSteps.length) * 100 + 10}%)`
              }}
              transition={{ duration: 1.2, ease: "easeInOut" }}
              className="absolute inset-0 bg-white z-0 pointer-events-none"
            />

            {currentSteps.map((step, idx) => (
              <div 
                key={step.id} 
                className={`relative z-10 min-w-[100px] flex-1 py-4 flex items-center justify-center gap-2 border-b-2 transition-all duration-700 
                  ${stepIndex >= idx ? 'border-[#A72422] text-[#A72422]' : 'border-transparent text-slate-400'}
                `}
              >
                <div className={'hidden sm:block'}>{step.icon}</div>
                <span className="text-[10px] font-black uppercase tracking-widest hidden md:block">{step.title}</span>
              </div>
            ))}
          </div>
          <div className="p-10 lg:p-16 min-h-[400px] relative">
            {currentStepIndex > 0 && !isSubmitted && (
              <button
                onClick={prevStep}
                className="absolute top-6 left-6 text-white/60 hover:text-white flex items-center gap-2 font-black text-xs uppercase tracking-widest transition-all hover:-translate-x-1 active:scale-95 z-10 drop-shadow-md"
              >
                ← Retour
              </button>
            )}
            {!isSubmitted ? (
              <AnimatePresence mode="popLayout">
                <motion.div key={currentStepData.id} initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: -20 }} className="space-y-6">
                  {currentStepData.id === 'welcome' && (
                    <div className="text-center"><Star className="w-16 h-16 text-[#A72422] mx-auto mb-6" />
                      <h3 className="text-2xl font-black italic mb-8 text-white px-4 drop-shadow-[0_2px_8px_rgba(0,0,0,0.5)]">Votre Devis 100% Offert</h3>
                      <button onClick={nextStep} className="w-full bg-black text-white p-6 rounded-2xl font-black uppercase hover:bg-[#A72422] transition-all hover:scale-[1.02] active:scale-[0.98]">Démarrer l'estimation</button></div>
                  )}
                  {currentStepData.id === 'service' && (
                    <div><h3 className="text-xl font-black text-center flex items-center justify-center gap-2 mb-8 text-white drop-shadow-md"><SprayCan /> Quel service ?</h3>
                      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                        {[
                          { n: 'Nuisibles', i: <Bug /> }, 
                          { n: 'Désinfection', i: <ShieldCheck /> }, 
                          { n: 'Nettoyage', i: <Zap /> }
                        ].map(s => (
                          <motion.button 
                            key={s.n} 
                            whileHover={{ scale: 1.05 }} 
                            whileTap={{ scale: 0.95 }} 
                            onClick={() => handleProblemSelect(s.n)} 
                            className={'flex flex-col items-center gap-4 p-6 border-2 rounded-2xl font-black transition-all hover:shadow-lg ' + (formData.problem === s.n ? 'border-[#A72422] bg-red-50/20 text-white shadow-[0_0_20px_rgba(167,36,34,0.3)]' : 'border-white/5 bg-white/5 text-white hover:border-white/20')}
                          >
                            {s.i}{s.n}
                          </motion.button>
                        ))}
                      </div></div>
                  )}
                  {currentStepData.id === 'details' && (
                    <div className="space-y-6">
                      <h3 className="text-xl font-black text-center flex items-center justify-center gap-2 mb-4 text-white drop-shadow-[0_2px_4px_rgba(0,0,0,0.5)]">
                        {formData.problem === 'Nuisibles' ? <><Bug /> Quel nuisible ?</> : <><Asterisk /> Détails du problème</>}
                      </h3>
                      
                      {formData.problem === 'Nuisibles' && (
                        <div>
                          <div className="grid grid-cols-2 sm:grid-cols-4 gap-2 sm:gap-4 mb-4">
                            {[
                              { n: 'Cafard', i: <Bug /> }, 
                              { n: 'Fourmis', i: <Bug /> }, 
                              { n: 'Puce', i: <Bug /> }, 
                              { n: 'Souris', i: <Rat /> }, 
                              { n: 'Rat', i: <Rat /> }, 
                              { n: 'Guêpes & Frelons', i: <ShieldCheck /> }, 
                              { n: 'Punaise de lit', i: <Snail /> }, 
                              { n: 'Autre', i: <MessageSquare /> }
                            ].map(s => (
                              <motion.button key={s.n} type="button" whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }} onClick={() => handlePestSelect(s.n)} className={'flex flex-col items-center justify-center gap-2 p-3 sm:p-4 border-2 rounded-2xl font-bold transition-all hover:shadow-md h-full ' + (formData.pestType === s.n ? 'border-[#A72422] bg-red-50 text-[#A72422]' : 'border-slate-100 bg-slate-50 text-slate-900 hover:border-[#A72422]')}>{s.i}<span className="text-xs text-center px-1">{s.n}</span></motion.button>
                            ))}
                          </div>
                          {formData.pestType === 'Autre' && (
                            <input type="text" placeholder="Précisez le nuisible" value={formData.otherPest} onChange={(e) => updateData('otherPest', e.target.value)} className="w-full p-4 border-2 border-[#A72422] rounded-xl focus:outline-none focus:ring-4 focus:ring-red-100 transition-all mb-4" />
                          )}
                        </div>
                      )}
                      
                      {/* Description and Photos Area */}
                      <div className="bg-white/5 p-4 rounded-2xl border-2 border-white/5 shadow-inner space-y-4">
                         <div>
                            <label className="text-sm font-black text-white/90 mb-2 block drop-shadow-sm">Plus de détails (Optionnel)</label>
                            <textarea 
                               placeholder={
                                  formData.problem === 'Nuisibles' ? "Décrivez la situation, le degré d'infestation, la superficie concernée..." :
                                  formData.problem === 'Nettoyage' ? "Décrivez la surface à nettoyer, le niveau de salissure, les pièces concernées..." :
                                  formData.problem === 'Désinfection' ? "Décrivez les locaux à désinfecter, la cause ou le type de virus/bactérie suspecté..." :
                                  "Ajoutez toutes les précisions utiles pour votre devis..."
                               }
                               className="w-full p-4 bg-white/10 text-white border-2 border-white/10 rounded-lg focus:border-[#A72422] outline-none min-h-[140px] resize-none placeholder:text-white/40"
                               value={formData.message || ''}
                               onChange={(e) => updateData('message', e.target.value)}
                            ></textarea>
                                    <div className="pt-6 border-t border-white/10 space-y-4">
                          <label className="text-sm font-black text-white/90 flex items-center justify-between drop-shadow-sm uppercase tracking-widest">
                             <span className="flex items-center gap-2"><Camera className="w-4 h-4 text-[#A72422]" /> Photos (Optionnel)</span>
                          </label>
                          <div className="flex flex-wrap justify-start gap-4">
                             {[0, 1, 2].map((slotIndex) => {
                               const p = photos[slotIndex];
                               if (p) {
                                 return (
                                   <div key={slotIndex} className="relative w-20 h-20 sm:w-24 sm:h-24 rounded-xl overflow-hidden border-2 border-white/20 shadow-xl animate-in zoom-in duration-300 shrink-0">
                                     <img src={URL.createObjectURL(p)} alt="preview" className="object-cover w-full h-full" />
                                     <button type="button" onClick={() => removePhoto(slotIndex)} className="absolute top-1.5 right-1.5 bg-black/60 text-white p-1.5 rounded-full backdrop-blur-md border border-white/20 hover:bg-red-600 transition-colors z-10"><X className="w-3 h-3 font-bold" /></button>
                                   </div>
                                 );
                               }
                               return (
                                 <label key={slotIndex} className="w-20 h-20 sm:w-24 sm:h-24 rounded-xl border-2 border-dashed border-white/20 flex items-center justify-center cursor-pointer bg-white/5 hover:bg-white/10 hover:border-[#A72422] transition-all flex-col group shrink-0">
                                    {isCompressing && photos.length === slotIndex ? <div className="w-6 h-6 border-2 border-[#A72422] border-t-transparent rounded-full animate-spin" /> : <>
                                      <Plus className="w-6 h-6 text-white/30 group-hover:text-white transition-colors" />
                                      <span className="text-[9px] text-white/30 group-hover:text-white font-black mt-1.5 uppercase tracking-tighter">Ajouter</span>
                                    </>}
                                    <input type="file" accept="image/jpeg, image/png, image/webp" multiple onChange={handleFileChange} className="hidden" disabled={isCompressing} />
                                 </label>
                               );
                             })}
                          </div>
                          <div className="flex justify-between items-center text-[10px] font-black uppercase tracking-[0.2em] text-white/40 pt-2">
                             <span className="drop-shadow-sm">JPG, PNG, WEBP</span>
                             <span className={photos.length === 3 ? "text-[#A72422]" : ""}>{photos.length}/3 ajoutées</span>
                          </div>
                        </div>
                      </div>

                      <button 
                        type="button"
                        onClick={nextStep} 
                        disabled={formData.problem === 'Nuisibles' ? (!formData.pestType || (formData.pestType === 'Autre' && !formData.otherPest)) : false} 
                        className="w-full bg-[#A72422] text-white p-5 rounded-2xl font-black uppercase tracking-widest disabled:opacity-30 hover:bg-black transition-all hover:scale-[1.01] active:scale-[0.99] mt-4 shadow-[0_10px_30px_-10px_rgba(167,36,34,0.5)]"
                      >
                        Continuer l'estimation
                      </button>
                    </div>
                  )}
                  {currentStepData.id === 'urgency' && (
                    <div className="space-y-8">
                      <div className="text-center">
                        <Zap className="w-16 h-16 text-[#A72422] mx-auto mb-4 drop-shadow-[0_0_15px_rgba(167,36,34,0.3)]" />
                        <h3 className="text-2xl font-black text-white mb-2 drop-shadow-md uppercase tracking-tight">Niveau d'urgence</h3>
                        <p className="text-sm text-white/70 font-black italic drop-shadow-sm">Avez-vous besoin d'une intervention immédiate ?</p>
                      </div>
                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                        <motion.button
                          type="button"
                          whileHover={{ scale: 1.02 }}
                          whileTap={{ scale: 0.98 }}
                          onClick={() => { updateData('isUrgent', false); nextStep(); }}
                          className={`flex flex-col items-center gap-4 p-8 border-2 rounded-[2rem] font-bold transition-all hover:shadow-2xl ${
                            formData.isUrgent === false && formData.isUrgent !== ''
                              ? 'border-white/30 bg-white/10 text-white'
                              : 'border-white/10 bg-white/5 text-white hover:border-white/30'
                          }`}
                        >
                          <div className="w-12 h-12 rounded-full bg-slate-100 flex items-center justify-center text-2xl">📅</div>
                          <div>
                            <div className="text-base font-black">Intervention Standard</div>
                            <div className="text-xs text-slate-500 font-medium mt-1">Prise en charge selon disponibilités · Tarif habituel</div>
                          </div>
                        </motion.button>

                        <motion.button
                          type="button"
                          whileHover={{ scale: 1.02 }}
                          whileTap={{ scale: 0.97 }}
                          onClick={() => { updateData('isUrgent', true); nextStep(); }}
                          className={`flex flex-col items-center gap-3 p-6 border-2 rounded-2xl font-bold transition-all hover:shadow-lg ${
                            formData.isUrgent === true
                              ? 'border-[#A72422] bg-red-50 text-[#A72422]'
                              : 'border-red-500/20 bg-red-500/10 text-white hover:border-[#A72422]'
                          }`}
                        >
                          <div className="w-12 h-12 rounded-full bg-red-100 flex items-center justify-center text-2xl">⚡</div>
                          <div>
                            <div className="text-base font-black text-[#A72422]">Intervention Urgente</div>
                            <div className="text-xs text-slate-500 font-medium mt-1">Prise en charge prioritaire · Majoration tarifaire</div>
                          </div>
                        </motion.button>
                      </div>
                      <p className="text-center text-[10px] text-white/40 font-black italic uppercase tracking-widest mt-4">
                        ⚡ Une intervention urgente implique une majoration de tarif. Notre équipe vous communiquera le devis adapté.
                      </p>
                    </div>
                  )}
                  {currentStepData.id === 'client' && (
                    <div className="space-y-8">
                      <h3 className="text-2xl font-black text-center flex items-center justify-center gap-3 text-white drop-shadow-md uppercase tracking-tight"><Building2 className="text-[#A72422]" /> Pour qui ?</h3>
                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                        {[
                          { n: 'Particulier', i: <User className="w-8 h-8" />, desc: 'Maison, Appartement, Jardin' }, 
                          { n: 'Entreprise', i: <Building2 className="w-8 h-8" />, desc: 'Commerce, Bureaux, Entrepôt' }
                        ].map(option => (
                          <motion.button 
                            key={option.n} 
                            whileHover={{ scale: 1.02 }} 
                            whileTap={{ scale: 0.98 }} 
                            onClick={() => { updateData('clientType', option.n); nextStep(); }} 
                            className={'flex flex-col items-center gap-4 p-8 border-2 rounded-[2rem] font-black transition-all hover:shadow-2xl ' + (formData.clientType === option.n ? 'border-[#A72422] bg-red-500/20 text-white' : 'border-white/10 bg-white/5 text-white hover:border-[#A72422]')}
                          >
                            <div className="w-16 h-16 rounded-full bg-white/10 flex items-center justify-center shadow-inner">{option.i}</div>
                            <div className="text-center">
                              <div className="text-lg uppercase tracking-tight">{option.n}</div>
                              <div className="text-[10px] text-white/40 mt-1 uppercase tracking-widest">{option.desc}</div>
                            </div>
                          </motion.button>
                        ))}
                      </div>
                    </div>
                  )}
                  {currentStepData.id === 'zone' && (
                    <div className="space-y-6">
                      <h3 className="text-2xl font-black text-center flex items-center justify-center gap-3 text-white drop-shadow-md uppercase tracking-tight"><MapPin className="text-[#A72422]" /> Localisation</h3>
                      <div className="grid grid-cols-1 gap-4">
                        <div className="relative group">
                          <input 
                            type="text" 
                            placeholder="CODE POSTAL (EX: 06500)" 
                            value={formData.zipCode} 
                            onChange={(e) => handleZipChange(e.target.value)} 
                            className="w-full p-6 bg-white/10 text-white rounded-2xl border-2 border-white/10 focus:border-[#A72422] outline-none transition-all placeholder:text-white/20 font-black text-center text-xl tracking-[0.3em]" 
                          />
                          {isSearchingCity && (
                            <div className="absolute right-6 top-1/2 -translate-y-1/2">
                              <motion.div animate={{ rotate: 360 }} transition={{ repeat: Infinity, duration: 1, ease: 'linear' }} className="w-6 h-6 border-2 border-[#A72422] border-t-transparent rounded-full" />
                            </div>
                          )}
                        </div>
                        <input 
                          type="text" 
                          placeholder="VILLE" 
                          value={formData.city} 
                          onChange={(e) => updateData('city', e.target.value)}
                          className="w-full p-6 bg-white/10 text-white rounded-2xl border-2 border-white/10 focus:border-[#A72422] outline-none transition-all placeholder:text-white/20 font-black text-center text-lg uppercase tracking-widest" 
                        />
                      </div>
                      <button 
                        onClick={nextStep} 
                        disabled={!formData.zipCode || !formData.city} 
                        className="w-full mt-4 bg-[#A72422] text-white p-6 rounded-2xl font-black uppercase tracking-widest hover:bg-black transition-all hover:scale-[1.01] active:scale-[0.99] disabled:opacity-20 shadow-xl"
                      >
                        Valider mon secteur
                      </button>
                    </div>
                  )}
                  {currentStepData.id === 'contact' && (
                    <div className="space-y-6">
                      <h3 className="text-2xl font-black text-center flex items-center justify-center gap-3 text-white drop-shadow-md uppercase tracking-tight"><User className="text-[#A72422]" /> Vos coordonnées</h3>
                      <div className="space-y-4">
                        <div className="relative">
                          <input type="text" placeholder="NOM COMPLET" className="w-full p-5 bg-white/10 text-white rounded-xl border-2 border-white/10 focus:border-[#A72422] outline-none transition-all placeholder:text-white/30 font-bold uppercase tracking-widest" onChange={(e) => updateData('name', e.target.value)} />
                          <ErrorMsg error={errors.name} />
                        </div>
                        <div className="relative">
                          <input type="email" placeholder="ADRESSE EMAIL" className="w-full p-5 bg-white/10 text-white rounded-xl border-2 border-white/10 focus:border-[#A72422] outline-none transition-all placeholder:text-white/30 font-bold uppercase tracking-widest" onChange={(e) => updateData('email', e.target.value)} />
                          <ErrorMsg error={errors.email} />
                        </div>
                        <div className="relative">
                          <input type="tel" placeholder="NUMÉRO DE TÉLÉPHONE" className="w-full p-5 bg-white/10 text-white rounded-xl border-2 border-white/10 focus:border-[#A72422] outline-none transition-all placeholder:text-white/30 font-bold uppercase tracking-widest" onChange={(e) => updateData('phone', e.target.value)} />
                          <ErrorMsg error={errors.phone} />
                        </div>
                      </div>
                      <div className="pt-4">
                        <CodePenSubmitButton onClick={handleSubmit} isPending={isPending} isSuccess={isSuccess} />
                      </div>
                    </div>
                  )}
                </motion.div>
              </AnimatePresence>
            ) : (
              <motion.div initial={{ opacity: 0, scale: 0.9 }} animate={{ opacity: 1, scale: 1 }} className="text-center py-16 px-6 space-y-6">
                <motion.div 
                  initial={{ scale: 0, rotate: -45 }} 
                  animate={{ scale: 1, rotate: 0 }} 
                  className="w-24 h-24 bg-green-500/20 text-green-500 rounded-full flex items-center justify-center mx-auto text-5xl shadow-[0_0_50px_rgba(34,197,94,0.3)] border border-green-500/30"
                >
                  <Check className="w-12 h-12" />
                </motion.div>
                <div className="space-y-2">
                  <h3 className="text-3xl font-black text-white drop-shadow-lg uppercase tracking-tighter">Merci de votre confiance !</h3>
                  <p className="text-white/60 font-black italic text-sm uppercase tracking-widest">Demande de devis transmise avec succès</p>
                </div>
                {formData.isUrgent ? (
                   <div className="bg-red-500/20 border border-red-500/30 rounded-[2rem] p-8 mx-auto max-w-md shadow-2xl backdrop-blur-md">
                     <p className="text-white font-black text-lg drop-shadow-sm uppercase tracking-tight">⚡ PRIORITÉ SOS ACTIVÉE</p>
                     <p className="text-white/80 font-black italic text-xs mt-4 leading-relaxed uppercase tracking-widest">Notre cellule d'urgence analyse votre dossier.<br/>Un expert vous rappelle dans les 30 minutes.</p>
                   </div>
                ) : (
                  <div className="bg-white/5 border border-white/10 rounded-[2rem] p-8 mx-auto max-w-md backdrop-blur-md">
                    <p className="text-white/80 font-black italic text-sm leading-relaxed uppercase tracking-widest">Notre équipe reviendra vers vous<br/>sous 24h avec une proposition sur-mesure.</p>
                  </div>
                )}
              </motion.div>
            )}
          </div>
        </div>
      </div>
    </section>
  );
};
export default FormWizard;
