// src/lib/DataService.js
import { api } from './api';

/**
 * DataService - Singleton de gestion de données avec cache
 * Permet d'éviter les appels API redondants et d'accélérer la navigation.
 */
class DataService {
    constructor() {
        this.cache = {
            articles: null, // Liste complète des articles
            articleDetails: new Map(), // Détails d'articles par ID (avec content_html)
            projects: null,
            leads: null
        };
        this.pendingRequests = new Map(); // Pour éviter les requêtes en double simultanées
    }

    /**
     * Gère les requêtes avec cache et dédoublonnage
     */
    async fetchCached(key, fetchFn, options = { force: false }) {
        // 1. Si on a déjà les données et qu'on ne force pas, on renvoie le cache
        if (this.cache[key] && !options.force) {
            return this.cache[key];
        }

        // 2. Si une requête identique est déjà en cours, on s'y attache
        if (this.pendingRequests.has(key)) {
            return this.pendingRequests.get(key);
        }

        // 3. Sinon, on lance la requête
        const promise = fetchFn().then(data => {
            this.cache[key] = data;
            this.pendingRequests.delete(key);
            return data;
        }).catch(err => {
            this.pendingRequests.delete(key);
            throw err;
        });

        this.pendingRequests.set(key, promise);
        return promise;
    }

    /**
     * Récupère la liste des articles (uniquement DB)
     */
    async getArticles(options = {}) {
        return this.fetchCached('articles', async () => {
            try {
                const dbArticles = await api.getArticles();
                return (dbArticles || []).map(a => ({ ...a, _source: 'db' }));
            } catch (err) {
                console.error("[DataService] Erreur API lors du chargement des articles");
                return [];
            }
        }, options);
    }

    /**
     * Récupère un article complet par son ID/Slug (uniquement DB)
     */
    async getArticleById(id, options = {}) {
        const strId = String(id);
        const cacheKey = `article_${strId}`;
        
        // 1. Check cache
        if (this.cache.articleDetails.has(strId) && !options.force) {
            return this.cache.articleDetails.get(strId);
        }

        if (this.pendingRequests.has(cacheKey)) {
            return this.pendingRequests.get(cacheKey);
        }

        // 2. Try API
        const promise = api.getArticle(strId).then(data => {
            if (data && data.id) {
                this.cache.articleDetails.set(strId, data);
                this.pendingRequests.delete(cacheKey);
                return data;
            }
            throw new Error("Not found in API");
        }).catch(err => {
            this.pendingRequests.delete(cacheKey);
            throw err;
        });

        this.pendingRequests.set(cacheKey, promise);
        return promise;
    }

    /**
     * Pré-chargement d'un article (sans await pour ne pas bloquer)
     */
    prefetchArticle(id) {
        const strId = String(id);
        if (!this.cache.articleDetails.has(strId) && !this.pendingRequests.has(`article_${strId}`)) {
            console.log(`[DataService] Prefetching article: ${strId}`);
            this.getArticleById(strId).catch(() => {});
        }
    }

    /**
     * Récupère la liste des interventions (projets)
     */
    async getProjects(options = {}) {
        return this.fetchCached('projects', () => api.getProjects(), options);
    }

    /**
     * Invalide tout ou partie du cache
     */
    invalidateCache(key = null) {
        if (key) {
            if (key === 'articleDetails') this.cache.articleDetails.clear();
            else this.cache[key] = null;
        } else {
            this.cache = {
                articles: null,
                articleDetails: new Map(),
                projects: null,
                leads: null
            };
        }
    }
}

export const dataService = new DataService();
