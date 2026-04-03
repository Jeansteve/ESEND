// src/lib/AIService.js
/**
 * @file AIService.js — Moteur de Rédaction IA ESEND
 * @description Génération d'articles SEO spécialisés en hygiène et lutte anti-nuisibles.
 * Adapté pour Menton, Monaco et la Riviera française.
 */
import { api } from './api';

const IS_DEV = import.meta.env.DEV;
const DIRECT_ENDPOINT = "https://generativelanguage.googleapis.com/v1/models/gemini-1.5-flash:generateContent";

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
     * Appel direct au LLM (Uniquement via API Key en Mock Mode pour le moment)
     */
    async _callLLM(body) {
        const key = await this._getApiKey();
        if (!key) throw new Error("Clé API Gemini manquante dans les Paramètres.");

        const response = await fetch(`${DIRECT_ENDPOINT}?key=${key}`, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(body)
        });

        if (!response.ok) {
            const err = await response.json();
            throw new Error(err.error?.message || `Erreur API Google (${response.status})`);
        }
        return response;
    },

    /**
     * Recherche de sujets d'articles d'actualité pour la Riviera
     */
    async searchLatestNews(targetServiceId = null) {
        const fullDate = new Date().toLocaleDateString('fr-FR', { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' });
        
        const serviceConstraint = targetServiceId 
            ? `\nFOCUS : Uniquement des sujets liés au service_id ${targetServiceId}.`
            : '';

        const prompt = `Expert en hygiène et nuisibles (ESEND, Riviera). Propose 3 sujets d'articles d'actualité pour le Journal de l'Expert.
CONTEXTE : Nous sommes le ${fullDate}. 
ZONE : Menton, Monaco, Roquebrune, Nice (Côte d'Azur).

SUJETS RECHERCHÉS :
- ID 1 : Rats, Souris, Rongeurs (Interventions urbaines, assainissement).
- ID 2 : Frelons & Guêpes (Saisonnalité, nids en hauteur).
- ID 3 : Punaises de lit (Protocoles hôteliers, retours de voyages).
- ID 4 : Cafards & Blattes (Cuisines, copropriétés).
- ID 5 : Fourmis (Invasions estivales jardins).
- ID 6 : Désinfection (Protocoles bio-sécurité, virus).
- ID 7 : Nettoyage de prestige & Vitres (Eau pure, entretien de villas).

${serviceConstraint}

Réponse en JSON uniquement (tableau de 3 objets) :
[{"title":"Titre impactant","description":"Résumé en 2 phrases","trend":5,"service_id":X}]`;

        const response = await this._callLLM({ contents: [{ parts: [{ text: prompt }] }] });
        const data = await response.json();
        const text = data.candidates[0].content.parts[0].text;
        const clean = text.replace(/```json|```/g, '').trim();
        
        QuotaTracker.increment('topics');
        return JSON.parse(clean);
    },

    /**
     * Rédaction d'un article complet
     */
    async draftArticle(title) {
        const fullDate = new Date().toLocaleDateString('fr-FR', { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' });
        
        const prompt = `Tu es un expert certifié (ESEND, Menton), rédacteur SEO senior.
Rédige un article d'expertise de haute qualité sur : "${title}".
ZONE : Riviera française (Menton, Monaco, Alpes-Maritimes).
TON : Professionnel, technique, rassurant, premium.

RÈGLES :
- Minimum 800 mots.
- Structure HTML (<h2>, <h3>, <p>, <ul>, <li>, <blockquote>).
- Zéro source inventée (hallucinations interdites). Cite des normes réelles (Certibiocide, ANSES) ou des observations de terrain.
- Incorpore subtilement "Menton", "Riviera" et "Monaco" dans le texte.

FORMAT RÉPONSE (JSON uniquement) :
{
  "title": "Titre définitif",
  "category": "Expertise",
  "excerpt": "Introduction accrocheuse",
  "content_html": "Le contenu structuré en HTML",
  "meta_title": "SEO Title < 60 car",
  "meta_description": "SEO Desc < 160 car avec Menton/Monaco",
  "service_id": X
}`;

        const response = await this._callLLM({ 
            contents: [{ parts: [{ text: prompt }] }],
            generationConfig: { temperature: 0.7, maxOutputTokens: 2048 }
        });
        const data = await response.json();
        const text = data.candidates[0].content.parts[0].text;
        const clean = text.replace(/```json|```/g, '').trim();
        
        QuotaTracker.increment('articles');
        return JSON.parse(clean);
    }
};
