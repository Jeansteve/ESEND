// src/lib/api.js
/**
 * @file api.js — Client API principal pour ESEND
 * @description Architecture switchable entre Mock (LocalStorage) et Real (Backend PHP).
 */
import { mockApi } from './mockApi';

// Par défaut, on utilise le mode MOCK en développement
const USE_MOCK = false; // Toujours à true pour le moment, en attendant le backend réel

const API_BASE = '/api';

const realApi = {
    // --- Articles ---
    getArticles: async () => {
        const res = await fetch(`${API_BASE}/articles.php`);
        return res.json();
    },
    createArticle: async (data) => {
        const res = await fetch(`${API_BASE}/articles.php`, {
            method: 'POST',
            body: JSON.stringify(data)
        });
        return res.json();
    },
    updateArticle: async (id, data) => { // id est l'UUID ici
        const res = await fetch(`${API_BASE}/articles.php`, {
            method: 'PUT',
            body: JSON.stringify({ ...data, uuid: id })
        });
        return res.json();
    },
    deleteArticle: async (id) => {
        const res = await fetch(`${API_BASE}/articles.php?uuid=${id}`, {
            method: 'DELETE'
        });
        return res.json();
    },

    // --- Projects ---
    getProjects: async () => {
        const res = await fetch(`${API_BASE}/projects.php`);
        return res.json();
    },
    createProject: async (data) => {
        const res = await fetch(`${API_BASE}/projects.php`, {
            method: 'POST',
            body: JSON.stringify(data)
        });
        return res.json();
    },
    updateProject: async (id, data) => {
        const res = await fetch(`${API_BASE}/projects.php`, {
            method: 'PUT',
            body: JSON.stringify({ ...data, id })
        });
        return res.json();
    },
    deleteProject: async (id) => {
        const res = await fetch(`${API_BASE}/projects.php?id=${id}`, {
            method: 'DELETE'
        });
        return res.json();
    },

    // --- Settings ---
    getSettings: async () => {
        const res = await fetch(`${API_BASE}/settings.php`);
        return res.json();
    },
    updateSettings: async (settings) => {
        const res = await fetch(`${API_BASE}/settings.php`, {
            method: 'POST',
            body: JSON.stringify(settings)
        });
        return res.json();
    },

    // --- Assets (Upload) ---
    uploadImage: async (file) => {
        const formData = new FormData();
        formData.append('file', file);
        const res = await fetch(`${API_BASE}/upload.php`, {
            method: 'POST',
            body: formData
        });
        return res.json();
    }
};

export const api = USE_MOCK ? mockApi : realApi;
