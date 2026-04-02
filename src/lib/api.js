// src/lib/api.js
/**
 * @file api.js — Client API principal pour ESEND
 * @description Architecture switchable entre Mock (LocalStorage) et Real (Backend PHP).
 */
import { mockApi } from './mockApi';

// Par défaut, on utilise le mode MOCK en développement
const USE_MOCK = true; // Toujours à true pour le moment, en attendant le backend réel

const realApi = {
    // Placeholder pour la phase 2 (Migration Hostinger)
    getArticles: async () => { return []; },
    getProjects: async () => { return []; },
    createArticle: async () => { return { success: false }; },
    updateArticle: async () => { return { success: false }; },
    deleteArticle: async () => { return { success: false }; },
    createProject: async () => { return { success: false }; },
    updateProject: async () => { return { success: false }; },
    deleteProject: async () => { return { success: false }; },
    getSettings: async () => { return { gemini_api_key: '' }; },
    updateSettings: async () => { return { success: false }; },
};

export const api = USE_MOCK ? mockApi : realApi;
