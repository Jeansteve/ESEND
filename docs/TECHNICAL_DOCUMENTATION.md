# Documentation Technique ESEND — Guide du Développeur

Cette documentation est destinée aux développeurs amenés à maintenir ou faire évoluer la plateforme ESEND. Elle détaille les choix technologiques, l'architecture et les flux de données.

---

## 🏗️ 1. Architecture Globale

ESEND est une application **Hybrid SPA** (Single Page Application) :
- **Frontend** : React.js (Vite) avec routage par Hash (`HashRouter`) pour une compatibilité maximale sur Hostinger.
- **Backend** : API REST légère en PHP 8.x.
- **Base de Données** : MySQL (Relationnelle).
- **Hébergement** : Hostinger (Serveur Mutualisé Linux).

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
3. **`articles.php`** : CRUD pour le blog "Journal de l'Expert".
4. **`projects.php`** : CRUD pour les "Réalisations Terrain".

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

## 🔐 6. Sécurité

- **Protection Uploads** : Un fichier `.htaccess` dans `/uploads/` interdit l'exécution de scripts (`php`, `cgi`, etc.).
- **Validation** : Regex stricte pour les numéros de téléphone et emails côté client et serveur.
- **Authentification Admin** : Système de session simplifié via `localStorage` (simulation) + protection des endpoints API (à renforcer en production avec JWT ou Sessions PHP).

---

## 🚀 7. Déploiement (CI/CD)

Le projet utilise **GitHub Actions**.
- **Config** : `.github/workflows/deploy.yml`.
- **Méthode** : FTP Sync vers Hostinger.
- **Action requise** : À chaque push sur `main`, les fichiers sont synchronisés automatiquement dans `public_html`.

---

### 📂 3. Backend & API
[...]
5. **`settings.php`** : Système de configuration dynamique (Key-Value).
    - Supporte l'ajout de nouveaux champs (ex: SIRET, Téléphone) sans modification de schéma.
    - Utilise `ON DUPLICATE KEY UPDATE` pour une persistance robuste.

---

## 📈 9. Optimisation SEO & Conversion
ESEND intègre des mécanismes d'automatisation SEO avancés sur ses pages dynamiques :
- **Meta-tags Dynamiques** : Chaque article génère ses propres balises `title` et `description`.
- **Structured Data** : Injection de Schema `Article` JSON-LD pour les Rich Snippets.
- **CTA Contextuels** : Blocs de conversion en fin d'article avec tracking et numéros dynamiques.
- **Prompt Hardening** : Les articles générés par IA sont bridés pour garantir une longueur de 1200+ mots, l'absence de fausses statistiques et une accroche percutante.

---

## 💡 10. Notes pour les évolutions futures
- **Migration Cloud** : La structure `images` en JSON est prête pour accueillir des URLs Cloudinary/S3.
- **Auto-Réponse** : Envisager l'intégration d'un webhook pour notifier les clients après un dépôt de devis.
