// src/lib/AIService.js
/**
 * @file AIService.js — Moteur de Rédaction IA ESEND
 * @description Génération d'articles SEO spécialisés en hygiène et lutte anti-nuisibles.
 * Adapté pour Menton, Monaco et la Riviera française.
 */
import { api } from './api';

const IS_DEV = import.meta.env.DEV;
const DIRECT_ENDPOINT = "https://generativelanguage.googleapis.com/v1beta/models/gemini-1.5-flash-latest:generateContent";

// --- Quota Tracker (localStorage) ---
const QUOTA_KEY = 'esend_ai_quota';
const QUOTA_LIMITS = { topics: 10, articles: 5 }; // limites journalières

const QuotaTracker = {
    _today() { return new Date().toISOString().slice(0, 10); },
    get() {
        const raw = localStorage.getItem(QUOTA_KEY);
        const data = raw ? JSON.parse(raw) : null;
        if (!data || data.date !== this._today()) {
            const fresh = { date: this._today(), topics: 0, articles: 0 };
            localStorage.setItem(QUOTA_KEY, JSON.stringify(fresh));
            return fresh;
        }
        return data;
    },
    increment(type) {
        const q = this.get();
        q[type] = (q[type] || 0) + 1;
        localStorage.setItem(QUOTA_KEY, JSON.stringify(q));
    }
};

export const AIService = {

    getQuota() {
        const q = QuotaTracker.get();
        return {
            topicsUsed: q.topics || 0,
            articlesUsed: q.articles || 0,
            topicsMax: QUOTA_LIMITS.topics,
            articlesMax: QUOTA_LIMITS.articles,
            topicsLeft: Math.max(0, QUOTA_LIMITS.topics - (q.topics || 0)),
            articlesLeft: Math.max(0, QUOTA_LIMITS.articles - (q.articles || 0)),
        };
    },

    async hasApiKey() {
        const settings = await api.getSettings();
        return !!settings.gemini_api_key;
    },

    async _getApiKey() {
        const settings = await api.getSettings();
        return settings.gemini_api_key || '';
    },

    /**
     * Construit le bloc de contexte ESEND à injecter dans les prompts.
     * Ne contient QUE les infos que l'admin a explicitement renseignées.
     */
    async _getCompanyContext() {
        const s = await api.getSettings();
        const lines = [];
        if (s.company_name)           lines.push(`- Nom officiel : ${s.company_name}`);
        if (s.company_manager)        lines.push(`- Gérant / Fondateur : ${s.company_manager}`);
        if (s.company_founded)        lines.push(`- Créée en : ${s.company_founded}`);
        if (s.company_certifications) lines.push(`- Certifications : ${s.company_certifications}`);
        if (s.company_zones)          lines.push(`- Zone d'intervention : ${s.company_zones}`);
        if (s.company_strengths)      lines.push(`- Points forts : ${s.company_strengths}`);
        if (s.company_bio)            lines.push(`- À propos : ${s.company_bio}`);

        if (lines.length === 0) return '';

        return `\n\n📌 CONTEXTE ESEND (utilise ces infos UNIQUEMENT si pertinent et de façon naturelle — ne jamais inventer ni supposer d'autres infos sur ESEND) :\n${lines.join('\n')}\n⚠️ NE mentionne JAMAIS d'informations sur ESEND qui ne figurent PAS dans ce bloc.`;
    },

    async hasFalKey() {
        const settings = await api.getSettings();
        return !!settings.fal_api_key;
    },

    getBestServiceId(title, fallbackId = 1) {
        const t = (title || '').toLowerCase();
        if (t.includes('rat') || t.includes('souris') || t.includes('rongeur')) return 1;
        if (t.includes('frelon') || t.includes('guêpe')) return 2;
        if (t.includes('punaise')) return 3;
        if (t.includes('cafard') || t.includes('blatte')) return 4;
        if (t.includes('fourmi')) return 5;
        if (t.includes('désinfection') || t.includes('virus')) return 6;
        if (t.includes('nettoyage') || t.includes('vitre')) return 7;
        return fallbackId;
    },

    /**
     * Appel direct au LLM (Uniquement via API Key en Mock Mode pour le moment)
     */
    async _callLLM(body) {
        const key = await this._getApiKey();
        if (!key) throw new Error("Clé API Gemini manquante dans les Paramètres.");

        // Cascade de modèles Gemini (Avril 2026 - Modèles Publics)
        const endpointsToTry = [
            'https://generativelanguage.googleapis.com/v1beta/models/gemini-2.5-flash:generateContent',
            'https://generativelanguage.googleapis.com/v1beta/models/gemini-2.5-flash-lite:generateContent',
            'https://generativelanguage.googleapis.com/v1beta/models/gemini-2.5-pro:generateContent'
        ];

        let lastError = null;

        for (const endpoint of endpointsToTry) {
            try {
                const isLegacy = endpoint.includes('/v1/models/');
                let requestBody = { ...body };
                if (isLegacy && requestBody.generationConfig) {
                    // Les modèles v1 ne supportent pas toujours le mode JSON forcé via mimeType
                    const newConfig = { ...requestBody.generationConfig };
                    delete newConfig.responseMimeType;
                    delete newConfig.responseSchema;
                    requestBody.generationConfig = newConfig;
                }

                const response = await fetch(`${endpoint}?key=${key}`, {
                    method: 'POST',
                    headers: { 'Content-Type': 'application/json' },
                    body: JSON.stringify(requestBody)
                });

                if (!response.ok) {
                    const err = await response.json();
                    lastError = err.error?.message || `Erreur API Google (${response.status})`;
                    console.warn(`Model failed: ${endpoint}`, lastError);
                    continue; // Essayons le modèle suivant
                }
                return response;
            } catch (error) {
                lastError = error.message;
                console.warn(`Fetch error for ${endpoint}`, error);
            }
        }

        throw new Error(`Incident Moteur IA: ${lastError || 'Tous les modèles configurés ont échoué.'}`);
    },

    /**
     * Recherche de sujets d'articles d'actualité pour la Riviera
     */
    /**
     * Recherche de sujets d'articles d'actualité pour la Riviera (Alias pour generateArticleTopics)
     */
    async searchLatestNews(targetServiceId = null) {
        return this.generateArticleTopics([], targetServiceId);
    },

    /**
     * Génère des sujets d'articles basés sur l'actualité et le contexte
     */
    async generateArticleTopics(existingTitles = [], targetServiceId = null) {
        const fullDate = new Date().toLocaleDateString('fr-FR', { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' });

        const systemInstruction = "Expert en hygiène et lutte anti-nuisibles (ESEND) opérant sur la Riviera française (Menton, Monaco, Nice).";

        let servicesContext = "";
        if (targetServiceId) {
            const serviceMap = {
                1: "Rats, Souris, Rongeurs (Interventions urbaines, assainissement)",
                2: "Frelons & Guêpes (Saisonnalité, nids en hauteur)",
                3: "Punaises de lit (Protocoles hôteliers, retours de voyages)",
                4: "Cafards & Blattes (Cuisines, copropriétés)",
                5: "Fourmis (Invasions estivales jardins)",
                6: "Désinfection (Protocoles bio-sécurité, virus)",
                7: "Nettoyage de prestige & Vitres (Eau pure, entretien de villas)"
            };
            servicesContext = `- ID ${targetServiceId} : ${serviceMap[targetServiceId] || "Ciblé sur ce nuisible spécifique"}`;
        } else {
            servicesContext = `- ID 1: Rats, Souris\n- ID 2: Frelons & Guêpes\n- ID 3: Punaises de lit\n- ID 4: Cafards\n- ID 5: Fourmis\n- ID 6: Désinfection\n- ID 7: Nettoyage de prestige`;
        }

        const prompt = `Propose 3 sujets d'articles d'actualité captivants pour notre 'Journal de l'Expert'.

CONTEXTE:
- Date actuelle: ${fullDate}
- Zone cible: Menton, Monaco, Roquebrune, Nice (Côte d'Azur)

SERVICES CIBLÉS:
${servicesContext}`;

        const schema = {
            type: "ARRAY",
            items: {
                type: "OBJECT",
                properties: {
                    title: { type: "STRING" },
                    description: { type: "STRING" },
                    trend: { type: "INTEGER" },
                    service_id: { type: "INTEGER" }
                },
                required: ["title", "description", "trend", "service_id"]
            }
        };

        const response = await this._callLLM({
            systemInstruction: { parts: [{ text: systemInstruction }] },
            contents: [{ parts: [{ text: prompt }] }],
            generationConfig: {
                temperature: 0.7,
                responseMimeType: "application/json",
                responseSchema: schema
            },
            safetySettings: [
                { category: "HARM_CATEGORY_HARASSMENT", threshold: "BLOCK_NONE" },
                { category: "HARM_CATEGORY_HATE_SPEECH", threshold: "BLOCK_NONE" },
                { category: "HARM_CATEGORY_SEXUALLY_EXPLICIT", threshold: "BLOCK_NONE" },
                { category: "HARM_CATEGORY_DANGEROUS_CONTENT", threshold: "BLOCK_NONE" }
            ]
        });
        const data = await response.json();

        // Sécurité : Vérifier si l'IA a été bloquée
        const firstCandidate = data.candidates?.[0];
        if (!firstCandidate) {
            throw new Error("L'IA n'a retourné aucun candidat (réponse vide).");
        }

        if (firstCandidate.finishReason && firstCandidate.finishReason !== 'STOP') {
            console.error("Gemini FinishReason:", firstCandidate.finishReason, data);
            if (firstCandidate.finishReason === 'SAFETY') {
                throw new Error("Génération bloquée par le filtre de sécurité (SAFETY).");
            }
        }

        const text = firstCandidate.content?.parts?.[0]?.text;
        if (!text) {
            throw new Error("L'IA n'a retourné aucun texte valide.");
        }

        let clean = text.replace(/```json|```/g, '').trim();
        // Éliminer les caractères de contrôle littéraux
        clean = clean.replace(/[\n\r\t]/g, ' ');

        const parsedData = JSON.parse(clean);
        QuotaTracker.increment('topics');
        return parsedData;
    },

    /**
     * Rédaction d'un article complet
     */
    async draftArticle(title) {
        const fullDate = new Date().toLocaleDateString('fr-FR', { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' });
        const companyContext = await this._getCompanyContext();

        const systemInstruction = `Tu es un rédacteur web SEO senior et expert technique en hygiène et lutte anti-nuisibles sur la Riviera française.`;

        const prompt = `Rédige un article d'expertise COMPLET et RÉEL sur le sujet suivant : "${title}".

${companyContext ? companyContext + '\n\n' : ''}⚠️ RÈGLE ABSOLUE : N'invente AUCUNE information sur l'entreprise ESEND au-delà du contexte fourni. Si aucun contexte n'est donné, utilise des termes génériques ("notre équipe locale", "nos experts").

### STRUCTURE REQUISE (Format HTML)
1. **Introduction** : Analyse du problème et contexte spécifique à la Riviera.
2. **Les Causes** : Facteurs favorisant ce nuisible localement.
3. **Chiffre Clé** : Une statistique marquante encapsulée dans un <blockquote>.
4. **Notre Solution** : Détail du protocole d'intervention technique.
5. **Les Résultats** : Garanties et impact environnemental.
6. **Prévention** : Liste <ul><li> de conseils d'expert.

### ILLUSTRATIONS
- Insère exactement deux balises au format : [ILLUSTRATION : Description précise de la photo en anglais pour IA] à des endroits pertinents.

### CONTRAINTES
- Uniquement des balises HTML structurelles (<h2>, <h3>, <ul>, <blockquote>, <p>, <strong>).
- Longueur experte et détaillée.
- Ton : Professionnel, rassurant et très technique.`;

        const schema = {
            type: "OBJECT",
            properties: {
                title: { type: "STRING" },
                category: { type: "STRING" },
                excerpt: { type: "STRING" },
                content_html: { type: "STRING" },
                meta_title: { type: "STRING" },
                meta_description: { type: "STRING" },
                image_prompt: { type: "STRING" },
                service_id: { type: "INTEGER" }
            },
            required: ["title", "category", "excerpt", "content_html", "meta_title", "meta_description", "service_id"]
        };

        const response = await this._callLLM({
            systemInstruction: { parts: [{ text: systemInstruction }] },
            contents: [{ parts: [{ text: prompt }] }],
            generationConfig: {
                temperature: 0.7,
                maxOutputTokens: 8192,
                responseMimeType: "application/json",
                responseSchema: schema
            },
            safetySettings: [
                { category: "HARM_CATEGORY_HARASSMENT", threshold: "BLOCK_NONE" },
                { category: "HARM_CATEGORY_HATE_SPEECH", threshold: "BLOCK_NONE" },
                { category: "HARM_CATEGORY_SEXUALLY_EXPLICIT", threshold: "BLOCK_NONE" },
                { category: "HARM_CATEGORY_DANGEROUS_CONTENT", threshold: "BLOCK_NONE" }
            ]
        });
        const data = await response.json();

        if (data.candidates?.[0]?.finishReason && data.candidates[0].finishReason !== 'STOP') {
            console.error("Gemini FinishReason:", data.candidates[0].finishReason, data);
            if (data.candidates[0].finishReason === 'SAFETY') {
                throw new Error("Génération bloquée par le filtre de sécurité (SAFETY).");
            }
        }

        const text = data.candidates?.[0]?.content?.parts?.[0]?.text;
        if (!text) {
            throw new Error("L'IA n'a retourné aucun texte valide (ou a été bloquée).");
        }

        // STRATÉGIE : Parser de façon robuste sans casser le HTML
        // 1. Supprimer uniquement les delimiteurs markdown si présents
        let clean = text.replace(/^```json\s*/i, '').replace(/\s*```$/i, '').trim();

        let parsedArticle;
        try {
            // Tentative directe (idéal si responseSchema retourne du JSON propre)
            parsedArticle = JSON.parse(clean);
        } catch (firstErr) {
            // Fallback: extraire uniquement le JSON entre { et } (dernier recours)
            const jsonMatch = clean.match(/\{[\s\S]*\}/);
            if (!jsonMatch) throw new Error("Impossible d'extraire le JSON de la réponse IA.");
            try {
                parsedArticle = JSON.parse(jsonMatch[0]);
            } catch (secondErr) {
                // Dernier recours : nettoyer les caractères problématiques SAUF dans content_html
                // On remplace uniquement les caractères de contrôle hors d'une string JSON
                const sanitized = clean.replace(/[\x00-\x08\x0B\x0C\x0E-\x1F\x7F]/g, '');
                parsedArticle = JSON.parse(sanitized);
            }
        }

        QuotaTracker.increment('articles');
        return parsedArticle;
    },

    /**
     * Génération d'un prompt visuel pour Fal.ai
     */
    async generateVisualPrompt(title, serviceId, content = '') {
        const systemInstruction = "Expert in AI prompt engineering for professional photographic generation.";
        const prompt = `Task: Create a professional photographic prompt for an AI image generator (Stable Diffusion/Flux style).
Subject: ${title}
Context: High-end Pest Control service in the French Riviera (ESEND).
Service ID: ${serviceId}
Content Summary: ${content.substring(0, 500)}

Requirements:
- Cinematic lighting, professional photography style.
- Clean, reassuring, expert atmosphere.
- Avoid scary/disgusting close-ups of insects unless it's for technical identification.
- Preferred: Modern tools, technician in professional ESEND uniform, or clean Riviera architecture being protected.
- Language: English (for the AI generator).
- Response: A single paragraph, detailed, describing the scene, textures, and lighting. NO PREAMBLE.`;

        const response = await this._callLLM({
            systemInstruction: { parts: [{ text: systemInstruction }] },
            contents: [{ parts: [{ text: prompt }] }],
            generationConfig: { temperature: 0.7, maxOutputTokens: 500 }
        });
        const data = await response.json();
        return data.candidates?.[0]?.content?.parts?.[0]?.text || "A professional pest control technician inspecting a luxury villa in Menton, cinematic lighting, 8k resolution.";
    }
};

