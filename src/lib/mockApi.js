// src/lib/mockApi.js
/**
 * @file mockApi.js — Persistance locale pour ESEND Admin
 * @description Simule une base de données MySQL dans le LocalStorage.
 */
import { articles as initialArticles } from '../data/articles';
import { interventions as initialProjects } from '../data/interventions';

const STORAGE_KEYS = {
    ARTICLES: 'esend_articles_v1',
    PROJECTS: 'esend_projects_v1',
    TOPICS: 'esend_ai_topics_v1',
    SETTINGS: 'esend_settings_v1'
};

// --- Helper Functions ---
const load = (key, initial) => {
    try {
        const data = localStorage.getItem(key);
        if (!data) {
            localStorage.setItem(key, JSON.stringify(initial));
            return initial;
        }
        const parsed = JSON.parse(data);
        // On fusionne pour s'assurer que les nouvelles clés (comme company_*) apparaissent même si l'user a déjà des data
        return { ...initial, ...parsed };
    } catch { return initial; }
};

const save = (key, data) => {
    try {
        localStorage.setItem(key, JSON.stringify(data));
        return true;
    } catch { return false; }
};

// --- API Implementation ---
export const mockApi = {
    
    // --- Articles (Blog) ---
    getArticles: async () => {
        return load(STORAGE_KEYS.ARTICLES, initialArticles);
    },

    getArticle: async (id) => {
        // Charge un article complet par son ID depuis le localStorage
        const articles = load(STORAGE_KEYS.ARTICLES, initialArticles);
        return articles.find(a => String(a.id) === String(id)) || null;
    },
    
    createArticle: async (articleData) => {
        const articles = await mockApi.getArticles();
        const newArticle = {
            ...articleData,
            id: `art-${Date.now()}`,
            date: new Date().toLocaleDateString('fr-FR', { day: '2-digit', month: 'short', year: 'numeric' }),
            createdAt: new Date().toISOString()
        };
        articles.unshift(newArticle);
        save(STORAGE_KEYS.ARTICLES, articles);
        return { success: true, article: newArticle };
    },

    updateArticle: async (id, data) => {
        const articles = await mockApi.getArticles();
        const index = articles.findIndex(a => a.id === id);
        if (index === -1) return { success: false, message: "Article non trouvé" };
        
        articles[index] = { ...articles[index], ...data, updatedAt: new Date().toISOString() };
        save(STORAGE_KEYS.ARTICLES, articles);
        return { success: true, article: articles[index] };
    },

    deleteArticle: async (id) => {
        const articles = await mockApi.getArticles();
        const filtered = articles.filter(a => a.id !== id);
        save(STORAGE_KEYS.ARTICLES, filtered);
        return { success: true };
    },

    // --- Projects (Réalisations) ---
    getProjects: async () => {
        return load(STORAGE_KEYS.PROJECTS, initialProjects);
    },

    createProject: async (projectData) => {
        const projects = await mockApi.getProjects();
        const newProject = {
            ...projectData,
            id: Date.now(), // ID numérique pour compatibilité bento
            createdAt: new Date().toISOString()
        };
        projects.unshift(newProject);
        save(STORAGE_KEYS.PROJECTS, projects);
        return { success: true, project: newProject };
    },

    updateProject: async (id, data) => {
        const projects = await mockApi.getProjects();
        const index = projects.findIndex(p => p.id === id);
        if (index === -1) return { success: false, message: "Projet non trouvé" };
        
        projects[index] = { ...projects[index], ...data, updatedAt: new Date().toISOString() };
        save(STORAGE_KEYS.PROJECTS, projects);
        return { success: true, project: projects[index] };
    },

    deleteProject: async (id) => {
        const projects = await mockApi.getProjects();
        const filtered = projects.filter(p => p.id !== id);
        save(STORAGE_KEYS.PROJECTS, filtered);
        return { success: true };
    },

    // --- AI Topics ---
    getAiTopics: async () => {
        return load(STORAGE_KEYS.TOPICS, []);
    },

    saveAiTopics: async (topics) => {
        const existing = await mockApi.getAiTopics();
        // Eviter les doublons par titre
        const newTopics = topics.filter(t => !existing.some(e => e.title === t.title));
        const merged = [...newTopics.map(t => ({ ...t, id: `topic-${Math.random()}`, status: 'pending' })), ...existing];
        save(STORAGE_KEYS.TOPICS, merged);
        return { success: true };
    },

    discardAiTopic: async (id) => {
        const topics = await mockApi.getAiTopics();
        const filtered = topics.filter(t => t.id !== id);
        save(STORAGE_KEYS.TOPICS, filtered);
        return { success: true };
    },

    // --- Settings ---
    getSettings: async () => {
        return load(STORAGE_KEYS.SETTINGS, {
            // ── 1. Coordination & Contact ──
            contact_email: 'contact@esendnuisibles.fr',
            company_phone: '',              // à renseigner par l'admin
            company_address: 'Menton, Alpes-Maritimes (06)',
            // ── 2. Visibilité & Analytics ──
            google_reviews_id: '',
            ga_id: '',
            // ── 3. Moteur IA ──
            gemini_api_key: '',
            gemini_enabled: true,
            apify_token: '',
            // ── 4. Profil & ADN ESEND ──
            company_name: 'ESEND Nuisibles',
            company_siret: '',
            company_manager: '',
            company_founded: '',
            company_certifications: 'Certibiocide',
            company_zones: "Menton, Monaco, Roquebrune-Cap-Martin, Cap-d'Ail, Beausoleil, Nice, Côte d'Azur (06)",
            company_strengths: "Intervention discrète et rapide, expertise en milieu haut de gamme (villas, copropriétés de prestige, hôtellerie), protocoles certifiés Certibiocide, solutions écologiques et respectueuses de l'environnement",
            company_bio: "ESEND est une société spécialisée en hygiène et lutte anti-nuisibles implantée sur la Côte d'Azur. Nous intervenons principalement à Menton, Monaco, Roquebrune et dans le département des Alpes-Maritimes (06). Notre équipe certifiée Certibiocide utilise des produits professionnels biocides et des méthodes de lutte raisonnée pour éradiquer durablement les nuisibles (rongeurs, insectes rampants et volants, punaises de lit, frelons asiatiques). Nous accompagnons une clientèle de particuliers, de syndics, de restaurateurs et de professionnels de l'hôtellerie avec discrétion et efficacité.",
            // ── Securité ──
            admin_password: 'admin',
        });
    },

    updateSettings: async (settings) => {
        save(STORAGE_KEYS.SETTINGS, settings);
        return { success: true };
    },

    // --- Security ---
    changePassword: async (current, next) => {
        const settings = load(STORAGE_KEYS.SETTINGS, { admin_password: 'admin' });
        if (current !== settings.admin_password) {
            return { success: false, message: "L'ancien mot de passe est incorrect" };
        }
        settings.admin_password = next;
        save(STORAGE_KEYS.SETTINGS, settings);
        return { success: true };
    }
};
