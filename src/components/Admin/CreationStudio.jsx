/**
 * @file CreationStudio.jsx — Studio de création d'articles assisté par IA
 * @description Interface "Single Page" (pas de modale) permettant de
 * générer des articles de blog via l'intelligence artificielle (Gemini/OpenRouter).
 *
 * PARCOURS UTILISATEUR :
 * 1. "Magie Totale" (Auto) : L'IA génère un sujet + rédige l'article automatiquement.
 * 2. "Assistant Prompt" (Manuel) : Tunnel interactif en 3 étapes
 *    (Veille → Sélection du sujet → Rédaction).
 * 3. "Rédaction Libre" : Ouverture directe de l'éditeur vide.
 *
 * COMPOSANTS INTERNES :
 * - `QuotaGauge` : Jauge visuelle du quota IA journalier.
 * - `ChoiceScreen` : Écran d'onboarding (choix du parcours).
 * - `ManualPromptScreen` : Affiche les prompts pour copier-coller.
 * - `TopicChoiceScreen` : Sélection de sujets générés par l'IA (Radar à Sujets).
 * - `GeneratingScreen` : Écran de chargement pendant la génération IA.
 *
 * PERSISTANCE :
 * - Les sujets générés sont sauvegardés via `api.saveAiTopics()`
 *   pour éviter de perdre les idées entre les sessions.
 * - Nettoyage automatique des sujets "fantômes" (IDs manquants).
 *
 * @see AIService.js pour les appels Gemini/OpenRouter
 * @see ArticleModal.jsx pour l'éditeur d'article (ouvert après génération)
 * @see BlogAdmin.css pour le styling partagé
 */
import React, { useState, useEffect, useMemo, useCallback } from 'react';
import {
    Plus, Edit3, Wand2, Terminal, MousePointer2,
    X, ArrowLeft, Loader2, Sparkles, Copy,
    FileJson, Send, Flame, Newspaper, ShieldAlert,
    CheckCircle, AlertCircle, Clock, ChevronRight,
    ArrowRight, Check, Bug, ShieldCheck, Microscope,
    Zap, BarChart2
} from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { AIService } from '../../lib/AIService';
import { api } from '../../lib/api';
import ArticleEditor from './ArticleModal';
import './BlogAdmin.css';

// Local mock service to substitute TNERI's backend AiTopics logic using localStorage (as ESEND originally did)
const mockBlogService = {
  getAiTopics: async () => JSON.parse(localStorage.getItem('esend_ai_radar_topics') || '[]'),
  saveAiTopics: async (topics) => {
    const existing = JSON.parse(localStorage.getItem('esend_ai_radar_topics') || '[]');
    const merged = [...existing, ...topics];
    localStorage.setItem('esend_ai_radar_topics', JSON.stringify(merged));
    return true;
  },
  discardAiTopic: async (id) => {
    const existing = JSON.parse(localStorage.getItem('esend_ai_radar_topics') || '[]');
    localStorage.setItem('esend_ai_radar_topics', JSON.stringify(existing.filter(t => t.id !== id)));
    return true;
  }
};

// --- Composant Jauge de Quota IA ---
const QuotaGauge = ({ quota, compact = false }) => {
    if (!quota) return null;
    const topicPct = Math.min(100, (quota.topicsUsed / quota.topicsMax) * 100);
    const articlePct = Math.min(100, (quota.articlesUsed / quota.articlesMax) * 100);
    const getColor = (pct) => pct >= 90 ? '#ef4444' : pct >= 60 ? '#f59e0b' : '#22c55e';

    if (compact) {
        return (
            <div className="quota-gauge-compact">
                <Zap size={12} />
                <span>Recherches : {quota.topicsUsed}/{quota.topicsMax}</span>
                <div className="quota-bar-mini"><div style={{ width: `${topicPct}%`, background: getColor(topicPct) }} /></div>
                <span>Rédactions : {quota.articlesUsed}/{quota.articlesMax}</span>
                <div className="quota-bar-mini"><div style={{ width: `${articlePct}%`, background: getColor(articlePct) }} /></div>
            </div>
        );
    }

    return (
        <div className="quota-gauge-full">
            <div className="quota-gauge-header">
                <BarChart2 size={14} />
                <span>Consommation IA du jour (réinitialisation à minuit)</span>
            </div>
            <div className="quota-gauge-rows">
                <div className="quota-row">
                    <span className="quota-label">📋 Recherches</span>
                    <div className="quota-track"><div className="quota-fill" style={{ width: `${topicPct}%`, background: getColor(topicPct) }} /></div>
                    <span className="quota-count" style={{ color: getColor(topicPct) }}>{quota.topicsUsed} / {quota.topicsMax}</span>
                </div>
                <div className="quota-row">
                    <span className="quota-label">✍️ Rédactions</span>
                    <div className="quota-track"><div className="quota-fill" style={{ width: `${articlePct}%`, background: getColor(articlePct) }} /></div>
                    <span className="quota-count" style={{ color: getColor(articlePct) }}>{quota.articlesUsed} / {quota.articlesMax}</span>
                </div>
            </div>
            {(quota.topicsLeft === 0 || quota.articlesLeft === 0) && (
                <div className="quota-warning">⚠️ Quota atteint — se réinitialise demain à minuit.</div>
            )}
        </div>
    );
};

// --- MOCK DATA FOR FAST TESTING ---
const MOCK_TOPICS_JSON = `[
  { "title": "Certibiocide 2026 : Nouvelles obligations de désinfection", "description": "L'impact juridique et sanitaire des nouvelles normes biocides dans le Riviera.", "trend": 5, "service_id": 6 },
  { "title": "Rattus Norvegicus : Pic d'activité à Menton", "description": "Pourquoi les rongeurs envahissent les zones portuaires en ce moment.", "trend": 4, "service_id": 1 }
]`;

const MOCK_ARTICLE_JSON = `{
  "title": "Nouvelle réglementation Certibiocide 2026 : Ce qui change pour les pros",
  "category": "Réglementation",
  "excerpt": "Le cadre légal se durcit. Analyse de l'impact pour les techniciens du Riviera.",
  "content_html": "<h2>1. Le Contexte Réglementaire</h2><p>Depuis le 1er Janvier...</p><blockquote>\\"La sécurité avant tout.\\"</blockquote><h2>2. L'Analyse ESEND</h2><p>Nous avons anticipé ces changements...</p><h2>3. Notre Protocole Conforme</h2><p>Désormais, nous utilisons...</p>",
  "cover_prompt": "Ultra-realistic photography of a pest control technician...",
  "illustrations": [
    {
      "section_name": "1. Le Contexte Réglementaire",
      "alt": "Dossier légal avec le tampon Certibiocide",
      "prompt": "Ultra-realistic photography of an official legal document stamped with 'Certibiocide 2026', dramatic lighting, shot on Canon EOS R5 --ar 16:9 --v 6.0"
    }
  ]
}`;

const CreationStudio = ({ onClose, services = [], onSave, articles = [], initialStep = 'CHOICE', autoStartConfig = null }) => {
    const [step, setStep] = useState(initialStep);
    const [manualSubStep, setManualSubStep] = useState(1);
    const [foundNews, setNews] = useState([]);
    const [aiError, setAiError] = useState(null);
    const [hasApiKey, setHasApiKey] = useState(false);
    const [draftData, setDraftData] = useState(null);
    const [quota, setQuota] = useState(null);
    const [loadingFromDb, setLoadingFromDb] = useState(false);

    // Initialiser avec les MOCK DATA ou LOCAL STORAGE
    const [manualPaste1, setManualPaste1] = useState(() => localStorage.getItem('esend_studio_paste1') || MOCK_TOPICS_JSON);
    const [manualPaste3, setManualPaste3] = useState(() => localStorage.getItem('esend_studio_paste3') || MOCK_ARTICLE_JSON);

    // Sauvegarder dans le localStorage à chaque changement
    useEffect(() => {
        localStorage.setItem('esend_studio_paste1', manualPaste1);
    }, [manualPaste1]);

    useEffect(() => {
        localStorage.setItem('esend_studio_paste3', manualPaste3);
    }, [manualPaste3]);

    const [manualTopics, setManualTopics] = useState(() => {
        try { return JSON.parse(localStorage.getItem('esend_studio_paste1') || MOCK_TOPICS_JSON); }
        catch (e) { return []; }
    });
    const [selectedTopic, setSelectedTopic] = useState(JSON.parse(MOCK_TOPICS_JSON)[0]);

    const [copiedId, setCopiedId] = useState(null);

    const refreshQuota = useCallback(() => setQuota(AIService.getQuota()), []);

    useEffect(() => {
        const checkKey = async () => {
            const hasKey = await AIService.hasApiKey();
            setHasApiKey(hasKey);
        };
        checkKey();
        refreshQuota();
    }, []);

    // Charger les sujets sauvegardés depuis la DB quand on entre dans TOPIC_CHOICE
    const [topicsLoaded, setTopicsLoaded] = useState(false);
    useEffect(() => {
        if (step !== 'TOPIC_CHOICE' || topicsLoaded) return;
        const loadSaved = async () => {
            setLoadingFromDb(true);
            try {
                const savedTopics = await (api.getAiTopics || mockBlogService.getAiTopics)();
                if (savedTopics && savedTopics.length > 0) {
                    // We extract titles from existing articles (both drafted and published)
                    const publishedTitles = new Set(articles.map(a => a.title.toLowerCase()));

                    setNews(prev => {
                        const existingTitles = new Set(prev.map(t => t.title.toLowerCase()));
                        const fresh = savedTopics.filter(t =>
                            !existingTitles.has(t.title.toLowerCase()) &&
                            !publishedTitles.has(t.title.toLowerCase())
                        );
                        return fresh.length > 0 ? [...prev, ...fresh] : prev;
                    });
                }
            } catch (e) {
                console.warn('[Studio] Could not load saved topics:', e);
            } finally {
                setLoadingFromDb(false);
                setTopicsLoaded(true);
            }
        };
        loadSaved();
    }, [step, topicsLoaded]);

    // Validation Logic
    const isStep1Valid = useMemo(() => {
        try {
            const clean = manualPaste1.replace(/```json/g, '').replace(/```/g, '').trim();
            if (!clean) return false;
            const parsed = JSON.parse(clean);
            return Array.isArray(parsed) && parsed.length > 0;
        } catch (e) { return false; }
    }, [manualPaste1]);

    const isStep3Valid = useMemo(() => {
        try {
            const clean = manualPaste3.replace(/```json/g, '').replace(/```/g, '').trim();
            if (!clean) return false;
            const parsed = JSON.parse(clean);
            return !!(parsed.title && parsed.content_html);
        } catch (e) { return false; }
    }, [manualPaste3]);

    const wordCount = useMemo(() => {
        const text = manualPaste3.replace(/<[^>]*>/g, '');
        return text.trim().split(/\s+/).filter(word => word.length > 0).length;
    }, [manualPaste3]);

    const handleCopy = (text, id) => {
        navigator.clipboard.writeText(text);
        setCopiedId(id);
        setTimeout(() => setCopiedId(null), 2000);
    };

    const handleFinalImport = () => {
        try {
            const clean = manualPaste3.replace(/```json/g, '').replace(/```/g, '').trim();
            const data = JSON.parse(clean);

            const fullDraft = {
                ...data,
                // On tente de deviner le meilleur service si c'est de l'import manuel
                service_id: AIService.getBestServiceId(data.title, selectedTopic?.service_id || 1),
                is_published: 0
            };

            // On s'assure que draftData est mis à jour avant de changer de vue
            setDraftData(fullDraft);

            // Délai de sécurité pour laisser React traiter l'état
            setTimeout(() => {
                setStep('EDITOR');
            }, 50);
        } catch (e) {
            alert("JSON invalide");
        }
    };

    // Sub-Screens
    const ChoiceScreen = () => (
        <div className="studio-onboarding">
            <div className="studio-hero">
                <h1 className="studio-title">Studio de Rédaction</h1>
                <p className="studio-subtitle">Choisissez votre méthode de création experte.</p>
            </div>
            <div className="studio-cards">
                <div className={`studio-card premium ${!hasApiKey ? 'locked' : ''}`} onClick={() => hasApiKey && setStep('TOPIC_CHOICE')}>
                    <div className="recom-badge">Recommandé</div>
                    <div className="card-icon-main"><Wand2 size={48} /></div>
                    <h3>Magie Totale</h3>
                    <p>L'IA cherche les actus locales et rédige tout pour vous.</p>
                    <button className="studio-cta-btn">Commencer <ArrowRight size={16} /></button>
                    {!hasApiKey && <div className="card-error-overlay"><AlertCircle size={20} /><span>Clé manquante</span></div>}
                </div>
                <div className="studio-card" onClick={() => setStep('MANUAL_PROMPT')}>
                    <div className="card-icon-main"><Terminal size={48} /></div>
                    <h3>Assistant Prompt</h3>
                    <p>Utilisez nos prompts sur votre propre IA et importez le résultat.</p>
                    <button className="studio-cta-btn">Commencer <ArrowRight size={16} /></button>
                </div>
                <div className="studio-card" onClick={() => { setDraftData(null); setStep('EDITOR'); }}>
                    <div className="card-icon-main"><MousePointer2 size={48} /></div>
                    <h3>Rédaction Libre</h3>
                    <p>Démarrez de zéro avec notre structure experte de référence.</p>
                    <button className="studio-cta-btn">Commencer <ArrowRight size={16} /></button>
                </div>
            </div>
            {hasApiKey && quota && <QuotaGauge quota={quota} />}
            <button className="studio-close-btn" onClick={onClose}><X size={24} /> Fermer</button>
        </div>
    );

    const ManualPromptScreen = () => {
        const prompts = AIService.getPrompts(selectedTopic?.title);
        return (
            <div className="studio-manual-flow">
                <button className="back-btn" onClick={() => setStep('CHOICE')}><ArrowLeft size={20} /> Retour aux choix</button>
                <div className="studio-hero" style={{ textAlign: 'left', marginBottom: '20px' }}>
                    <h2 className="studio-title" style={{ fontSize: '2.5rem' }}>Assistant Manuel</h2>
                    <p className="studio-subtitle">Test rapide activé : Données pré-remplies.</p>
                </div>

                <div className="manual-stepper-nav">
                    <div className={`step ${manualSubStep === 1 ? 'active' : 'completed'}`} onClick={() => setManualSubStep(1)}>
                        <span className="step-number-nav">01</span><span>Veille</span>
                    </div>
                    <span>→</span>
                    <div className={`step ${manualSubStep === 2 ? 'active' : manualSubStep > 2 ? 'completed' : ''}`} onClick={() => setManualSubStep(2)}>
                        <span className="step-number-nav">02</span><span>Sélection</span>
                    </div>
                    <span>→</span>
                    <div className={`step ${manualSubStep === 3 ? 'active' : ''}`} onClick={() => setManualSubStep(3)}>
                        <span className="step-number-nav">03</span><span>Rédaction</span>
                    </div>
                </div>

                <div className="manual-stepper">
                    {manualSubStep === 1 && (
                        <div className="manual-step-section">
                            <div className="flex items-center gap-6 mb-8"><div className="step-badge">01</div><h3 className="manual-step-title">Veille & Sujets</h3></div>
                            <div className="prompt-box-modern"><code>{prompts.findNews}</code><button className={`copy-button ${copiedId === 'p1' ? 'copied' : ''}`} onClick={() => handleCopy(prompts.findNews, 'p1')}>{copiedId === 'p1' ? '✓ Copié !' : 'Copier'}</button></div>
                            <textarea className={`json-paste-area-compact valid`} value={manualPaste1} onChange={(e) => setManualPaste1(e.target.value)} />
                            <button className="btn-continue" onClick={() => setManualSubStep(2)}>Continuer à l'étape 02 →</button>
                        </div>
                    )}

                    {manualSubStep === 2 && (
                        <div className="manual-step-section">
                            <div className="flex items-center gap-6 mb-8"><div className="step-badge">02</div><h3 className="manual-step-title">Sélection</h3></div>
                            <div className="manual-topic-grid">
                                {manualTopics.map((topic, i) => (
                                    <div key={i} className={`manual-topic-item ${selectedTopic?.title === topic.title ? 'selected' : ''}`} onClick={() => setSelectedTopic(topic)}>
                                        <div className="flex justify-between items-start mb-4"><div style={{ color: '#8B1538' }}><Bug size={24} /></div>{selectedTopic?.title === topic.title && <CheckCircle size={24} className="text-[#8B1538]" />}</div>
                                        <strong className="block text-lg mb-2">{topic.title}</strong>
                                        <p className="text-sm text-slate-500">{topic.description}</p>
                                    </div>
                                ))}
                            </div>
                            <button className="btn-continue" onClick={() => setManualSubStep(3)}>Continuer à l'étape 03 →</button>
                        </div>
                    )}

                    {manualSubStep === 3 && (
                        <div className="manual-step-section">
                            <div className="flex items-center gap-6 mb-8"><div className="step-badge">03</div><h3 className="manual-step-title">Rédaction</h3></div>
                            <div className="prompt-box-modern"><code>{prompts.articleGeneration}</code><button className={`copy-button ${copiedId === 'p3' ? 'copied' : ''}`} onClick={() => handleCopy(prompts.articleGeneration, 'p3')}>{copiedId === 'p3' ? '✓ Copié !' : 'Copier'}</button></div>
                            <textarea className={`json-paste-area-compact valid`} style={{ minHeight: '300px' }} value={manualPaste3} onChange={(e) => setManualPaste3(e.target.value)} />
                            <button className="btn-continue" onClick={handleFinalImport}>Ouvrir dans l'éditeur expert ESEND →</button>
                        </div>
                    )}
                </div>
            </div>
        );
    };
    // --- MAGIE TOTALE SCREENS ---
    // SearchingScreen removed: click on Magie Totale goes directly to TOPIC_CHOICE with empty list

    const TopicChoiceScreen = ({ services = [] }) => {
        const [loadingMore, setLoadingMore] = useState(false);
        const [targetServiceId, setTargetServiceId] = useState(autoStartConfig?.targetServiceId || '');

        useEffect(() => {
            // Force select box value from config
            if (autoStartConfig?.targetServiceId) {
                setTargetServiceId(String(autoStartConfig.targetServiceId));
            }
            
            // Only auto-start once the DB load is complete and if no news are found
            if (autoStartConfig?.autoStart && !loadingFromDb && foundNews.length === 0 && !loadingMore) {
                handleLoadMore();
            }
        }, [autoStartConfig, loadingFromDb]);

        const handleTopicSelect = (topic) => {
            setSelectedTopic(topic);
            setStep('GENERATING');
        };

        const handleLoadMore = async () => {
            setLoadingMore(true);
            try {
                // Compile titles from both the currently suggested topics AND the global website articles
                const existingTitles = [
                    ...foundNews.map(n => n.title),
                    ...articles.map(a => a.title)
                ];

                // Always request 3 new topics and APPEND to existing list, excluding all existing titles
                // Pass targetServiceId if one is selected, otherwise null
                const newTopics = await AIService.generateArticleTopics(
                    existingTitles,
                    targetServiceId ? parseInt(targetServiceId, 10) : null
                );
                if (newTopics && newTopics.length > 0) {
                    try {
                        // 1. Sauvegarder les nouveaux sujets en BDD pour générer leurs IDs
                        await (api.saveAiTopics || mockBlogService.saveAiTopics)(newTopics);

                        // 2. Recharger imméditament depuis la BDD pour récupérer les vrais 'id'
                        // Cela est vital pour que le bouton "Générer l'article" puisse ensuite disacrter le sujet via son ID.
                        const savedTopics = await (api.getAiTopics || mockBlogService.getAiTopics)();
                        const publishedTitles = new Set(articles.map(a => a.title.toLowerCase()));

                        const validTopics = savedTopics.filter(t => !publishedTitles.has(t.title.toLowerCase()));
                        setNews(validTopics);

                        refreshQuota();
                    } catch (e) {
                        console.warn('[TopicChoice] Could not save or fetch topics to DB:', e);
                        // Fallback UI (qui n'aura pas d'ID, mais évite de bloquer l'écran)
                        setNews(prev => [...prev, ...newTopics]);
                        refreshQuota();
                    }
                }
            } catch (e) {
                alert("Erreur lors de la génération : " + e.message);
                refreshQuota();
            } finally {
                setLoadingMore(false);
            }
        };

        const handleDiscard = async (topicToDiscard, e) => {
            e.stopPropagation();
            // Retrait immédiat de la liste (optimistic UI)
            setNews(prev => prev.filter(t => t.title !== topicToDiscard.title));
            // Persist en DB
            if (topicToDiscard.id) {
                try {
                    await (api.discardAiTopic || mockBlogService.discardAiTopic)(topicToDiscard.id);
                } catch (e) {
                    console.warn('[TopicChoice] Could not discard topic:', e);
                }
            }
        };

        const isEmpty = foundNews.length === 0;

        return (
            <div className="studio-manual-flow">
                <button className="back-btn" onClick={() => setStep('CHOICE')}><ArrowLeft size={20} /> Retour aux choix</button>
                <div className="flex justify-between items-center mb-8">
                    <div className="studio-hero" style={{ textAlign: 'left', marginBottom: '0' }}>
                        <h2 className="studio-title" style={{ fontSize: '2.5rem' }}>Sujets Recommandés (IA)</h2>
                        <p className="studio-subtitle">
                            {isEmpty
                                ? "Cliquez sur le bouton pour que l'IA propose des sujets d'actualité."
                                : "Choisissez un sujet ou générez 3 nouvelles idées."}
                        </p>
                    </div>
                    <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'flex-end', gap: '8px' }}>
                        {quota && <QuotaGauge quota={quota} compact />}

                        <div style={{ display: 'flex', gap: '10px', alignItems: 'center' }}>
                            <select
                                value={targetServiceId}
                                onChange={(e) => setTargetServiceId(e.target.value)}
                                style={{
                                    padding: '0.6rem 1rem',
                                    borderRadius: '8px',
                                    border: '1px solid #e2e8f0',
                                    backgroundColor: '#f8fafc',
                                    color: '#334155',
                                    fontSize: '0.875rem',
                                    fontWeight: '500',
                                    outline: 'none',
                                    cursor: 'pointer'
                                }}
                            >
                                <option value="">Tous les nuisibles (Surprenez-moi)</option>
                                {services?.map(s => (
                                    <option key={s.id} value={s.id}>{s.name}</option>
                                ))}
                            </select>

                            <button
                                className="btn-continue"
                                style={{ padding: '0.75rem 1.5rem', width: 'auto', display: 'flex', alignItems: 'center', gap: '8px', margin: 0 }}
                                onClick={handleLoadMore}
                                disabled={loadingMore || (quota && quota.topicsLeft === 0)}
                                title={quota && quota.topicsLeft === 0 ? 'Quota journalier atteint' : isEmpty ? 'Lancer la recherche IA' : 'Générer 3 nouvelles idées'}
                            >
                                {loadingMore ? <Loader2 size={18} className="animate-spin" /> : <Sparkles size={18} />}
                                {loadingMore ? "Recherche..." : isEmpty ? "🚀 Lancer la recherche IA" : "+ 3 nouvelles idées"}
                            </button>
                        </div>
                    </div>
                </div>

                {loadingFromDb ? (
                    <div style={{ textAlign: 'center', padding: '3rem', color: '#94a3b8' }}>
                        <Loader2 size={32} className="animate-spin" style={{ display: 'inline-block', marginBottom: '1rem', color: '#8B1538' }} />
                        <p style={{ fontSize: '0.875rem', fontStyle: 'italic' }}>Chargement des propositions enregistrées...</p>
                    </div>
                ) : isEmpty ? (
                    <div className="studio-empty-topics">
                        <Sparkles size={48} style={{ color: '#8B1538', opacity: 0.3, marginBottom: '1rem' }} />
                        <p style={{ color: '#94a3b8', fontStyle: 'italic' }}>
                            Aucun sujet enregistré. Cliquez sur "Lancer la recherche IA" pour que Gemini analyse les tendances locales et vous propose des idées d'articles.
                        </p>
                    </div>
                ) : (
                    <div className="radar-grid" style={{ position: 'relative', marginTop: '1rem' }}>
                        {(() => {
                            const maxTrend = Math.max(...foundNews.map(n => n.trend || 0));
                            const topIndex = foundNews.findIndex(n => (n.trend || 0) === maxTrend);
                            return foundNews.map((topic, i) => {
                                const isTop = i === topIndex;
                                return (
                                    <div key={topic.id || i} className={`topic-card ${isTop ? 'featured' : ''}`} style={{ position: 'relative' }}>
                                        {/* Bouton Discarter */}
                                        <button
                                            title="Écarter ce sujet"
                                            onClick={(e) => handleDiscard(topic, e)}
                                            style={{
                                                position: 'absolute', top: '8px', right: '8px',
                                                background: 'rgba(239,68,68,0.1)', border: 'none',
                                                borderRadius: '50%', width: '24px', height: '24px',
                                                display: 'flex', alignItems: 'center', justifyContent: 'center',
                                                cursor: 'pointer', color: '#ef4444', zIndex: 2,
                                                transition: 'background 0.2s'
                                            }}
                                            onMouseOver={e => e.currentTarget.style.background = 'rgba(239,68,68,0.25)'}
                                            onMouseOut={e => e.currentTarget.style.background = 'rgba(239,68,68,0.1)'}
                                        >
                                            <X size={13} />
                                        </button>
                                        {isTop && (
                                            <div className="featured-topic-badge">
                                                <Flame size={14} /> Top Tendance
                                            </div>
                                        )}
                                        <div className="topic-info">
                                            <h4>{topic.title}</h4>
                                            <p>{topic.description}</p>
                                        </div>
                                        <button className="topic-action" onClick={() => handleTopicSelect(topic)}>
                                            <Wand2 size={14} /> Générer l'article
                                        </button>
                                    </div>
                                );
                            });
                        })()}
                    </div>
                )}
            </div>
        );
    };

    const GeneratingScreen = () => {
        useEffect(() => {
            const generate = async () => {
                setAiError(null);
                try {
                    const article = await AIService.draftArticle(selectedTopic.title);
                    const bestServiceId = AIService.getBestServiceId(article.title, selectedTopic?.service_id || 1, (article.excerpt || '') + ' ' + (article.content_html || ''));

                    // Image de couverture : laissée vide, l'utilisateur la génère à la demande dans l'éditeur
                    // Prompt pré-généré instantanément par l'IA lors de la rédaction finale de l'article (ou un fallback local)
                    const coverPrompt = article.cover_prompt || await AIService.generateVisualPrompt(article.title, bestServiceId, article.excerpt);
                    const fullDraft = {
                        ...article,
                        service_id: bestServiceId,
                        cover_image: '',
                        cover_prompt: coverPrompt,
                        is_published: 0
                    };

                    // L'article reste en mémoire — la SEULE sauvegarde se fait
                    // quand l'utilisateur clique "Brouillon" ou "Publier" dans l'éditeur.
                    // (Suppression de l'auto-save POST qui créait un doublon fantôme)
                    let draftToEdit = fullDraft;

                    setDraftData(draftToEdit);
                    refreshQuota();
                    if (selectedTopic?.id) {
                        try {
                            await (api.discardAiTopic || mockBlogService.discardAiTopic)(selectedTopic.id);
                            setNews(prev => prev.filter(t => t.title !== selectedTopic.title));
                        } catch { /* non bloquant */ }
                    }
                    setStep('EDITOR');
                } catch (e) {
                    setAiError(e.message);
                    refreshQuota();
                    setStep('TOPIC_CHOICE');
                    alert("Erreur de rédaction : " + e.message);
                }
            };
            if (selectedTopic) generate();
            else setStep('CHOICE');
        }, []);

        return (
            <div className="studio-onboarding">
                <div className="text-center" style={{ textAlign: 'center' }}>
                    <Loader2 size={64} className="animate-spin mx-auto mb-6" style={{ color: '#8B1538' }} />
                    <h2 className="studio-title" style={{ fontSize: '2rem' }}>Rédaction experte...</h2>
                    <p className="studio-subtitle">L'IA ESEND rédige le contenu pour : {selectedTopic?.title}</p>
                </div>
            </div>
        );
    };

    return (
        <div className="creation-studio-integrated">
            <AnimatePresence mode="wait">
                {step === 'CHOICE' && <ChoiceScreen key="choice" />}
                {step === 'TOPIC_CHOICE' && <TopicChoiceScreen key="topic_choice" services={services} />}
                {step === 'GENERATING' && <GeneratingScreen key="generating" />}
                {step === 'MANUAL_PROMPT' && <ManualPromptScreen key="manual" />}
                {step === 'EDITOR' && (
                    <div className="full-editor-container">
                        <ArticleEditor key={draftData?.title || 'new'} article={draftData} onClose={onClose} onSave={onSave} services={services} integratedMode={true} />
                    </div>
                )}
            </AnimatePresence>
        </div>
    );
};

export default CreationStudio;
