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
    // --- Authentification ---
    login: async (email, password) => {
        const res = await fetch(`${API_BASE}/login.php`, {
            method: 'POST',
            body: JSON.stringify({ email, password })
        });
        return res.json();
    },

    // --- Articles ---
    getArticles: async () => {
      const res = await fetch(`${API_BASE}/articles_v3.php`);
      return res.json();
    },
    getArticle: async (id) => {
      // Charge un article complet (avec content_html) par son ID
      const res = await fetch(`${API_BASE}/articles_v3.php?id=${encodeURIComponent(id)}`);
      return res.json();
    },
    createArticle: async (data) => {
      const res = await fetch(`${API_BASE}/articles_v3.php`, {
        method: 'POST',
        body: JSON.stringify(data)
      });
      return res.json();
    },
    updateArticle: async (id, data) => { // id est l'UUID ici
      const res = await fetch(`${API_BASE}/articles_v3.php`, {
        method: 'PUT',
        body: JSON.stringify({ ...data, uuid: id })
      });
      return res.json();
    },
    deleteArticle: async (id) => {
      const res = await fetch(`${API_BASE}/articles_v3.php?uuid=${id}`, {
        method: 'DELETE'
      });
      return res.json();
    },

    // --- Projects ---
    getProjects: async () => {
      const res = await fetch(`${API_BASE}/projects_v3.php`);
      return res.json();
    },
    createProject: async (data) => {
      const res = await fetch(`${API_BASE}/projects_v3.php`, {
        method: 'POST',
        body: JSON.stringify(data)
      });
      return res.json();
    },
    updateProject: async (id, data) => {
      const res = await fetch(`${API_BASE}/projects_v3.php`, {
        method: 'PUT',
        body: JSON.stringify({ ...data, id })
      });
      return res.json();
    },
    deleteProject: async (id) => {
      const res = await fetch(`${API_BASE}/projects_v3.php?id=${id}`, {
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

    // --- Leads ---
    getLeads: async () => {
        const res = await fetch(`${API_BASE}/leads.php`);
        const data = await res.json();
        return data.success ? data.data : [];
    },

    // --- Market Trends (Apify) ---
    getMarketTrends: async () => {
        const res = await fetch(`${API_BASE}/market_trends.php`);
        return res.json();
    },

    // --- Assets (Upload) ---
    uploadImage: async (file) => {
        // Optimisation client-side : Compression et redimensionnement (max 1200px)
        let processedFile = file;
        if (file.type.startsWith('image/')) {
            try {
                processedFile = await compressImage(file, { maxWidth: 1200, quality: 0.8 });
                // Re-créer un objet File pour garder le nom d'origine et forcer .webp
                const fileName = file.name.replace(/\.[^/.]+$/, "") + ".webp";
                processedFile = new File([processedFile], fileName, { type: 'image/webp' });
            } catch (err) {
                console.error("[API] Erreur compression image:", err);
            }
        }

        const formData = new FormData();
        formData.append('file', processedFile);
        const res = await fetch(`${API_BASE}/upload.php`, {
            method: 'POST',
            body: formData
        });
        return res.json();
    },

    // --- AI Radar (Topics) - Persistance locale (LocalStorage) ---
    getAiTopics: async () => {
        try {
            const data = localStorage.getItem('esend_ai_topics_v1');
            return data ? JSON.parse(data) : [];
        } catch { return []; }
    },
    saveAiTopics: async (topics) => {
        try {
            const data = localStorage.getItem('esend_ai_topics_v1');
            const existing = data ? JSON.parse(data) : [];
            const newTopics = topics.filter(t => !existing.some(e => e.title === t.title));
            const merged = [...newTopics.map(t => ({ ...t, id: `topic-${Math.random()}`, status: 'pending' })), ...existing];
            localStorage.setItem('esend_ai_topics_v1', JSON.stringify(merged));
            return { success: true };
        } catch { return { success: false }; }
    },
    discardAiTopic: async (id) => {
        try {
            const data = localStorage.getItem('esend_ai_topics_v1');
            if (!data) return { success: true };
            const topics = JSON.parse(data);
            const filtered = topics.filter(t => t.id !== id);
            localStorage.setItem('esend_ai_topics_v1', JSON.stringify(filtered));
            return { success: true };
        } catch { return { success: false }; }
    },
    
    // --- Security ---
    changePassword: async (current, next) => {
        const res = await fetch(`${API_BASE}/change_password.php`, {
            method: 'POST',
            body: JSON.stringify({ current, next })
        });
        return res.json();
    }
};

export const api = USE_MOCK ? mockApi : realApi;

/**
 * Compresse une image via Canvas API avant l'upload
 * @param {File} file 
 * @param {Object} options 
 */
async function compressImage(file, { maxWidth = 1200, quality = 0.8 } = {}) {
    return new Promise((resolve, reject) => {
        const reader = new FileReader();
        reader.readAsDataURL(file);
        reader.onload = (e) => {
            const img = new Image();
            img.src = e.target.result;
            img.onload = () => {
                const canvas = document.createElement('canvas');
                let width = img.width;
                let height = img.height;

                if (width > maxWidth) {
                    height = Math.round((maxWidth / width) * height);
                    width = maxWidth;
                }

                canvas.width = width;
                canvas.height = height;
                const ctx = canvas.getContext('2d');
                ctx.drawImage(img, 0, 0, width, height);
                canvas.toBlob((blob) => resolve(blob), 'image/webp', quality);
            };
            img.onerror = reject;
        };
        reader.onerror = reject;
    });
}
