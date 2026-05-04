# Documentation Technique ESEND — Guide du Développeur

Cette documentation est destinée aux développeurs amenés à maintenir ou faire évoluer la plateforme ESEND. Elle détaille les choix technologiques, l'architecture et les flux de données.

---

## 🏗️ 1. Architecture Globale

ESEND est une application **Hybrid SPA** (Single Page Application) :
- **Frontend** : React.js (Vite) avec routage par Hash (`HashRouter`) pour une compatibilité maximale sur Hostinger.
- **Backend** : API REST légère en PHP 8.x.
- **Base de Données** : MySQL (Relationnelle).
- **Hébergement** : Hostinger (Serveur Mutualisé Linux).

Les routes principales sont définies dans `App.jsx` :
- `<Route path="/journal/:slug" element={<ArticlePage />} />`
- `<Route path="/mentions-legales" element={<LegalNotices />} />`
- `<Route path="/politique-confidentialite" element={<PrivacyPolicy />} />`
- `<Route path="*" element={<Navigate to="/" replace />} />`

---

## 🎨 2. Frontend & Design System

### Stack Technique
- **Styles** : Tailwind CSS + CSS Variables natives.
- **Animations** : Framer Motion (Transitions de pages et micro-interactions).
- **Icônes** : Lucide React.
- **Polices** : Outfit (Titres) et Inter (Corps) via Google Fonts.

### Gestion du Thème (Deterministic Locking)
Le système de thème est géré par le hook `src/hooks/useTheme.js`. Il impose un thème fixe selon l'URL :
- **Public (`/`)** : Force la classe `.dark` (Thème "Frozen Night").
- **Admin (`/#/admin/*`)** : Force la classe `.light` (Thème "Morning Mist"). Comprend une **sidebar rétractable** (persistance localStorage).
### 📱 Optimisation Mobile (Critical Fixes)
L'interface admin a été spécifiquement corrigée pour les appareils mobiles :
- **Scrolling** : Le défilement vertical est garanti par `height: auto` et `overflow-y: auto` sur `.admin-container` (media query < 1024px).
- **Largeur** : Suppression des contraintes de largeur fixes (forçage à `100% !important`) pour éviter le décalage horizontal typique des conteneurs Flexbox compressés.
- **Sidebars** : Isolation totale (`display: none`) de la sidebar desktop sur mobile pour libérer 100% de l'espace au contenu principal.
*Note : Le changement manuel par l'utilisateur est désactivé pour préserver l'identité visuelle de chaque section.*

---

## 📂 3. Backend & API

L'API est située dans `/public/api/`. Chaque fichier PHP gère une ressource spécifique.

### Points d'entrée principaux :
1. **`devis.php`** : Traitement du formulaire principal.
    - Génère un `Tracking ID` type `ES-2404-001`.
    - Gère l'upload structuré des images.
    - Enregistre en BDD et envoie un e-mail via PHPMailer.
2. **`leads.php`** : Gestion des leads pour l'admin (GET/POST).
3. **`articles_v3.php`** : CRUD pour le blog "Journal de l'Expert".
    - **Optimisation de Liste** : Pour accélérer le chargement initial, les requêtes de liste (sans `id`) excluent désormais le champ lourd `content`.
    - **Lecture Unique** : Le contenu HTML n'est renvoyé que lorsqu'un article spécifique est demandé via `?id=...`.
4. **`projects.php`** : CRUD pour les "Réalisations Terrain".
5. **`settings.php`** : Système de configuration dynamique (Key-Value).
    - Supporte l'ajout de nouveaux champs (ex: SIRET, Téléphone) sans modification de schéma.
    - Utilise `ON DUPLICATE KEY UPDATE` pour une persistance robuste.
    - **Usage Légal** : Sert de source unique de vérité pour l'adresse, le SIRET et les coordonnées affichées sur les pages légales.

---

## 📸 4. Gestion Intelligente des Médias

Les images de leads sont stockées physiquement sur le serveur dans `/public/uploads/leads/`.

### Organisation des dossiers :
Pour faciliter le marketing et l'archivage, les dossiers sont créés dynamiquement :
`uploads/leads/[service-slug]/[nuisible-slug]/[filename]`

**Fonctions Clés (`devis.php`) :**
- `sanitizeFolderName()` : Nettoie les noms de services/nuisibles (minuscules, sans accents, espaces -> tirets).
- Stockage BDD : On enregistre le **chemin relatif complet** (ex: `nuisibles/cafards/ES-2404-001_img_1.jpg`) pour une compatibilité future avec n'importe quel CDN.

---

## 📊 5. Schéma de Données (MySQL)

### Table `esend_leads`
- `tracking_id` : ID unique métier.
- `service` : Libellé du métier sélectionné.
- `nuisible` : Type de nuisible (si applicable).
- `images` : Texte (Stocke un tableau JSON des chemins d'images).
- `status` : `nouveau` | `contacté` | `terminé` | `annulé`.

---

## 🔐 6. Sécurité & Conformité

- **Protection Uploads** : Un fichier `.htaccess` dans `/uploads/` interdit l'exécution de scripts (`php`, `cgi`, etc.).
- **Validation** : Regex stricte pour les numéros de téléphone et emails côté client et serveur.
- **Authentification Admin** : Système de session simplifié via `localStorage` (simulation) + protection des endpoints API (à renforcer en production avec JWT ou Sessions PHP).
- **Conformité RGPD (Nouveau)** : 
    - **Consentement Libre** : Case à cocher obligatoire dans le `FormWizard`.
    - **Transparence** : Accès direct à la politique de confidentialité depuis le formulaire.
    - **Droit à l'Oubli** : L'email de contact est dynamiquement injecté pour faciliter les demandes de suppression/modification.

---

## 🚀 7. Déploiement (CI/CD)

Le projet utilise **GitHub Actions**.
- **Config** : `.github/workflows/deploy.yml`.
- **Méthode** : FTP Sync vers Hostinger.
- **Action requise** : À chaque push sur `main`, les fichiers sont synchronisés automatiquement dans `public_html`.

---

## ⚡ 8. Optimisations de Performance

Le projet intègre des mécanismes avancés pour garantir un chargement instantané :

### Frontend : Découplage du Rendu (`ArticlePage.jsx`)
Pour éviter que l'utilisateur n'attende le chargement de tous les articles liés avant de lire son article, le rendu a été découplé :
1. **Priorité Haute** : Chargement de l'article principal via son ID. Dès réception, l'état `loading` est passé à `false`.
2. **Priorité Basse** : Chargement des articles liés en arrière-plan via une promesse non-bloquante.

### DataService : Système de Prefetching Intelligent
Le fichier `src/lib/DataService.js` gère un cache en RAM (Singleton) :
- **Pré-chargement** : Au survol d'une carte d'article (`onMouseEnter`), le système télécharge silencieusement les détails de l'article.
- **Normalisation des Identifiants** : Tous les identifiants sont convertis en `String` pour garantir que le cache fonctionne quelle que soit la provenance de l'ID (Integer depuis la DB vs String depuis l'URL).

### Backend : Stratégie de Payload Minimum
L'API `articles_v3.php` suit une stratégie de "Lazy Data Transfer" :
- `GET /api/articles_v3.php` -> Retourne uniquement les métadonnées (titre, image, résumé, etc.). Poids réduit de ~95%.
- `GET /api/articles_v3.php?id=...` -> Retourne l'article complet avec le HTML riche.

---

## 📈 9. Optimisation SEO & Conversion
ESEND intègre des mécanismes d'automatisation SEO avancés sur ses pages dynamiques :
- **Prompt Hardening v2** : Les articles générés par IA sont bridés pour garantir une posture d'expert consultant, l'absence de fausses statistiques, une valeur pédagogique forte et l'insertion de liens de maillage interne vers les services.
- **Illustration Logic** : L'IA suggère des prompts visuels complexes et leurs emplacements via un champ `illustrations` structuré (JSON).

---

## 💡 10. Notes pour les évolutions futures
- **Migration Cloud** : La structure `images` en JSON est prête pour accueillir des URLs Cloudinary/S3.
- **Auto-Réponse** : Envisager l'intégration d'un webhook pour notifier les clients après un dépôt de devis.
