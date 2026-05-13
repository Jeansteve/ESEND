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

### Architecture des Données & Contexte
- **SettingsContext** : Fournisseur global (`src/context/SettingsContext.jsx`) qui centralise les coordonnées de l'entreprise (téléphone, email, SIRET). Il assure la cohérence des informations sur l'ensemble du site (Header, Footer, FormWizard, Pages Légales) sans duplication de code.
- **Interactivité Liquide** : Utilisation d'un calque WebGL (`LiquidGlass`) pour un effet visuel premium sans impacter les performances.
- **Ancrage Robuste** : Gestion centralisée du défilement vers les ancres dans `Home.jsx` avec support des changements de hash dynamiques et des transitions inter-pages.

### Optimisation des Performances
- **Rendu Différé (Désactivé sur Home)** : Le composant `DeferredSection` (`content-visibility: auto`) a été retiré des sections de la page d'accueil pour garantir la stabilité des ancres. Son utilisation sur des sections intermédiaires provoquait des décalages de mise en page (Cumulative Layout Shift) empêchant un atterrissage précis sur le formulaire de devis.
- **Ancrage Natif** : Utilisation de `scrollIntoView` et `scroll-margin-top` pour une navigation fluide et précise vers `#devis-title`.

### Animations Premium (Framer Motion)
Le projet utilise des micro-interactions avancées pour renforcer l'aspect expert :
- **AnimatedNumber** : Composant UI réutilisable (`src/components/UI/AnimatedNumber.jsx`) qui gère un compteur progressif (0.0 → 4.9) avec un effet "Pop" final (Zoom Spring).
    - **Déclenchement Hybride** : Supporte l'animation immédiate via la prop `triggerOnMount={true}` (utilisé pour le Hero) ou le déclenchement au scroll via `IntersectionObserver` (utilisé pour les Reviews).
    - **Performance** : Utilise `useMotionValue` et `useTransform` de Framer Motion pour éviter les re-rendus React inutiles pendant l'incrémentation.
- **Stabilité Layout** : Utilisation de `whitespace-nowrap` et `flex items-baseline` pour garantir l'alignement du score sur une seule ligne sur tous les supports (Mobile/Tablette/Desktop).

### 🌊 2.2 Expérience Immersive : Liquid Glass (WebGL/Three.js)
Le Hub Nettoyage intègre une simulation de fluide interactive (`src/components/UI/LiquidGlass.jsx`) :
- **Technologie** : Basé sur Three.js et un shader personnalisé de métaballes (Metaballs).
- **Rendu Cristal** : Utilise des calculs de réfraction, de réflexion de Fresnel et de spécularité pour simuler des bulles d'eau cristallines.
- **Interaction Globale** : Contrairement aux implémentations classiques, les écouteurs d'événements (`pointerdown`, `pointermove`) sont attachés à `window`. Le calque possède `pointer-events-none` pour ne pas bloquer le site, mais l'interaction est relayée au shader pour générer de l'eau dynamiquement.
- **Optimisation Ressources** :
    - **Lazy Loading** : Isolé dans le chunk `vendor-three` via `vite.config.js`.
    - **Auto-Pause** : Utilisation d'un `IntersectionObserver` pour arrêter la boucle `requestAnimationFrame` dès que le composant n'est plus visible.
    - **Physique Contenue** : Limitation de la taille maximale des bulles (`0.08`) et de la vélocité pour préserver la lisibilité du texte.

### Navigation & Routage (`HashRouter`)
Le projet utilise `HashRouter` pour éviter les erreurs 404 sur Hostinger. 
- **Anchor Scrolling** : Un correctif global a été appliqué dans `App.jsx` pour intercepter les clics vers les ancres (ex: `#contact`) et forcer un scroll fluide même lors de navigations inter-pages.
- **CTA Sync** : Les boutons "Devis Gratuit" redirigent intelligemment vers la section contact, que l'utilisateur soit sur la Home ou une page profonde.

### Gestion du Thème (Deterministic Locking)
Le système de thème est géré par le hook `src/hooks/useTheme.js`. Il impose un thème fixe selon l'URL :
- **Public (`/`)** : Force la classe `.dark` (Thème "Frozen Night").
- **Admin (`/#/admin/*`)** : Force la classe `.light` (Thème "Morning Mist"). Comprend une **sidebar rétractable** (persistance localStorage).
### 📱 Architecture Mobile "App-Like" (Mai 2026)
Le site a été optimisé pour offrir une expérience proche d'une application native :
- **Fluid Typography** : Utilisation de `clamp(min, preferred, max)` sur les balises `h1`, `h2`, `h3` pour une mise à l'échelle automatique sans media queries complexes.
- **Scroll-Snap Slider** : Implémentation de conteneurs `flex` avec `scroll-snap-type: x mandatory` sur mobile pour les sections denses (ex: Témoignages). Cela permet une navigation horizontale naturelle au doigt.
- **Mobile Safe Zones** : Utilisation de `100dvh` (Dynamic Viewport Height) pour le Hero, garantissant que le contenu est toujours centré, même avec l'apparition/disparition des barres d'outils des navigateurs mobiles (iOS Safari / Android Chrome).
- **Tap Targets** : Normalisation des boutons à une hauteur minimale de `44px` (Apple/Google Standards) pour une précision tactile optimale.
- **Horizontal Breathing Room** : Standardisation du padding latéral à `px-8` (32px) sur mobile pour éviter les effets "bord-à-bord". Le padding évolue dynamiquement (`md:px-12`, `lg:px-6`) pour s'adapter à la largeur du viewport tout en restant aligné avec le conteneur `max-w-7xl`.
- **Overflow Prevention** : Utilisation de `overflow-x: hidden` sur `html` et `body` combiné à `width: 100%` pour neutraliser les rebonds horizontaux.

### 📱 2.2 Standards d'Expérience Hybride & Mobile (Mai 2026)

Le projet applique une logique différenciée selon le support pour maximiser la conversion :

- **Stepper Dynamique (FormWizard)** : 
    - **Mobile** : Les libellés textuels des étapes sont masqués au profit d'un affichage exclusivement iconographique (`min-w-[50px]`). Cela permet de maintenir la barre de progression sur une seule ligne sans créer de scroll horizontal.
    - **Tablette/PC** : Les libellés réapparaissent (`md:block`) pour une clarté textuelle maximale.
- **Logique d'UX Hybride (Avis & Témoignages)** :
    - **Mobile/Tablette** : Affichage d'office de **100% des avis** dans un carrousel horizontal (`flex overflow-x-auto`). Le bouton "Voir plus" est supprimé pour favoriser une exploration fluide par swipe.
    - **Desktop** : Affichage initial limité à 6 avis (grille 2x3) avec bouton "Chargement Progressif" (Load More) pour préserver la compacité verticale et la performance perçue.
- **Visibilité des Liens RGPD** : Standardisation de l'utilisation du blanc pur (`text-white`) pour les liens sur fonds glassmorphism complexes (ex: FormWizard), garantissant un contraste conforme aux normes d'accessibilité.

### 🧩 Gouvernance CSS & Comportements Sticky
Pour garantir le bon fonctionnement des menus "sticky" (comme le sélecteur de nuisibles) :
- **Règle Racine** : Ne JAMAIS utiliser `overflow-x: hidden !important` sur les éléments parents (`html`, `body`, `#root`). Cela désactive le calcul du défilement pour `position: sticky`.
- **Alternative Safe** : Utiliser **`overflow-x: clip !important`**. Cette valeur offre la même protection contre les débordements horizontaux mais ne crée pas de nouveau contexte de défilement, préservant ainsi la fonctionnalité sticky.
- **Offsets** : Les éléments sticky doivent avoir un `top` défini (ex: `top-32`) pour se caler proprement sous le Header.

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
    - Supporte l'ajout de nouveaux champs (ex: SIRET, Téléphone) sans modification de schéma.
    - Utilise `ON DUPLICATE KEY UPDATE` pour une persistance robuste.
    - **Usage Légal & UI** : Sert de source unique de vérité. Les données sont consommées par le `SettingsContext` côté React pour dynamiser l'intégralité de l'interface (CTAs, Footer, Pages Légales).
6. **`change_password.php`** : Mise à jour sécurisée du mot de passe admin.
    - Hachage automatique en **Argon2id**.
    - Validation de l'ancien mot de passe (hybride hash/clair).
7. **`mass_migrate.php`** : Script utilitaire de migration groupée.
    - Transforme tous les mots de passe en clair en hashs Argon2id en une seule passe.
    - *Note : Doit être supprimé après usage.*

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
- **Conformité RGPD** : 
    - **Consentement Libre** : Case à cocher obligatoire dans le `FormWizard`.
    - **Transparence** : Accès direct à la politique de confidentialité depuis le formulaire.
    - **Droit à l'Oubli** : L'email de contact est dynamiquement injecté pour faciliter les demandes de suppression/modification.

### 🛡️ 6.1 Audit de Sécurité & Blindage (Mai 2026)
Suite à un audit approfondi, le système a été renforcé contre les vecteurs d'attaque modernes :
- **Authentification Session (Backend)** : Migration d'une auth purement frontend vers une validation par session PHP (`session_start()`). Le middleware `auth_check.php` valide chaque requête sensible côté serveur.
- **Protection des APIs** :
    - `leads.php` : Accès strictement réservé aux admins connectés.
    - `articles_v3.php` : Les méthodes `POST`, `PUT`, `DELETE` sont verrouillées. Les brouillons (`is_published=0`) sont invisibles pour le public.
    - `upload.php` & `settings.php` : Désormais protégés par `checkAuth()`.
- **Nettoyage XSS (Cross-Site Scripting)** : Implémentation d'un utilitaire central `src/utils/security.js` (`sanitizeHTML`) qui filtre les balises dangereuses (`<script>`, `<iframe>`) dans les articles et les réalisations avant affichage via `dangerouslySetInnerHTML`.
- **Anti Brute-Force** : Introduction d'un délai d'attente (throttle) sur `login.php` en cas d'échec pour neutraliser les attaques par dictionnaire.
- **Désinfection Profonde des Images (PHP GD)** : Les pièces jointes des devis sont intégralement re-générées par le serveur à partir des données de pixels. Cela élimine radicalement tout code malveillant caché dans les métadonnées (stéganographie) ou les structures de fichiers hybrides (polyglottes).
- **Envoi SMTP Authentifié** : Migration de la fonction `mail()` vers un serveur SMTP Hostinger (`smtp.hostinger.com`) avec authentification SSL (Port 465) pour garantir la délivrabilité des devis et éviter le spam.
- **Routage SPA (Base Path)** : Configuration de la `base: '/'` dans Vite pour assurer le chargement correct des assets sur les routes profondes (ex: `/admin/login`) avec `BrowserRouter`.
- **Durcissement .htaccess** : 
    - `Options -Indexes` pour empêcher l'exploration des répertoires.
    - Désactivation totale du moteur PHP dans le dossier `/uploads/` (`php_flag engine off`) pour neutraliser toute exécution accidentelle.
    - En-têtes `X-Frame-Options: SAMEORIGIN` et `X-XSS-Protection`.
- **Information Leak Prevention** : Suppression des messages d'erreur SQL bruts (`$e->getMessage()`) dans les réponses API de production.

### 🎨 6.2 Accessibilité & UX (Mai 2026)
- **Contraste RGPD** : Amélioration de la visibilité du texte de consentement dans le `FormWizard`. Passage de `zinc-400` à `slate-200` (contraste élevé sur fond sombre) et augmentation de la taille à `11px`.
- **Feedback Visuel** : Intégration de `drop-shadow-sm` sur les textes légers pour garantir la lisibilité sur les arrière-plans complexes (images de Menton).


---

## 🚀 7. Déploiement (CI/CD Multi-Environnements)

Le projet utilise **GitHub Actions** pour un déploiement automatisé et sécurisé.

### Architecture des Workflows :
1. **Production (`main`)** :
    - Fichier : `.github/workflows/deploy-prod.yml`
    - Cible : `esendnuisibles.fr`
    - Secrets requis : `FTP_PROD_SERVER`, `FTP_PROD_USERNAME`, `FTP_PROD_PASSWORD`.
2. **Hors-Production (`test`)** :
    - Fichier : `.github/workflows/deploy-test.yml`
    - Cible : `site-test.esendnuisibles.fr`
    - Secrets requis : `FTP_TEST_SERVER`, `FTP_TEST_USERNAME`, `FTP_TEST_PASSWORD`.

### Processus :
- À chaque push sur la branche correspondante, les fichiers sont compilés (`npm run build`) et synchronisés par FTP sur Hostinger.
- **Configuration Automatisée** : Le fichier `api/config.php` est désormais généré dynamiquement lors du déploiement à partir des GitHub Secrets et du fichier **`api/config.template.php`**. 
- **Moteur d'Injection (`envsubst`)** : Pour garantir que les caractères spéciaux des mots de passe ($, \, ') ne soient pas corrompus, le workflow utilise la commande Linux `envsubst` pour injecter les variables d'environnement de manière sécurisée.

#### Secrets requis sur GitHub :

| Secret | Catégorie | Description |
| :--- | :--- | :--- |
| `FTP_PROD_SERVER` | FTP | IP Serveur Production (ex: `45.87.81.71`) |
| `FTP_PROD_USERNAME` | FTP | User FTP (ex: `u387599421.esendnuisibles.fr`) |
| `FTP_PROD_PASSWORD` | FTP | Mot de passe FTP |
| `DB_PROD_HOST` | Database | Host MySQL (ex: `localhost`) |
| `DB_PROD_NAME` | Database | Nom de la base (ex: `u387599421_esend`) |
| `DB_PROD_USER` | Database | Utilisateur SQL (ex: `u387599421_admin`) |
| `DB_PROD_PASS` | Database | Mot de passe SQL |
| `VITE_GA_MEASUREMENT_ID` | Marketing | ID Google Analytics (G-XXXXX) |
| `FTP_TEST_*` | Test | Identiques aux PROD pour le serveur de test |
| `DB_TEST_*` | Test | Identiques aux PROD pour la base de test |
| `SMTP_USER` | Email | Adresse email d'envoi (ex: `contact@esendnuisibles.fr`) |
| `SMTP_PASSWORD` | Email | Mot de passe du compte email Hostinger |

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

## 📈 9. Optimisation SEO & Maintenance

ESEND intègre des mécanismes d'automatisation SEO avancés sur ses pages dynamiques :
- **Prompt Hardening v2** : Les articles générés par IA sont bridés pour garantir une posture d'expert consultant, l'absence de fausses statistiques, une valeur pédagogique forte et l'insertion de liens de maillage interne vers les services.
- **Illustration Logic** : L'IA suggère des prompts visuels complexes et leurs emplacements via un champ `illustrations` structuré (JSON).
- **Gestion des Canoniques** : Le composant `SEO.jsx` gère dynamiquement les URLs canoniques pour éviter le "Duplicate Content".

### 🛠️ Maintenance de l'Indexation
Lors de l'ajout de nouvelles pages ou d'une refonte SEO, il est impératif de suivre ces étapes pour garantir une prise en compte rapide par Google :
1. **Validation du Sitemap** : S'assurer que les nouvelles URLs sont présentes dans `public/sitemap.xml`.
2. **Soumission Manuelle** : Accéder à la [Google Search Console](https://search.google.com/search-console) et soumettre l'URL complète du sitemap (`https://esendnuisibles.fr/sitemap.xml`) dans l'onglet **Sitemaps**.
3. **Inspection d'URL** : Utiliser l'outil d'inspection pour tester une URL spécifique et demander une indexation prioritaire.

---

## 📊 10. Stack Analytics & Business Intelligence (Admin)
Le tableau de bord admin dispose d'un module d'analyse poussé (`AnalyticsTab.jsx`) :
- **Moteur Graphique** : Utilisation de **Recharts**, une librairie basée sur D3.js spécifiquement conçue pour React. Elle garantit un rendu SVG fluide et `ResponsiveContainer` assure la compatibilité mobile.
- **Logique de Rendu Dynamique** : Le rendu des courbes (`Area`) s'adapte conditionnellement à l'état `viewMode` pour permettre l'effet "Drill-Down" sans recharger la page.
- **Granularité Temporelle** : Le composant gère un état `timeRange` (`day`, `week`, `month`, `year`). L'algorithme de génération de données (Mock) réagit à ce changement en ajustant le nombre de points (ex: 14 pour les jours, 12 pour les mois, 5 pour les années) et en pondérant les volumes.
- **Micro-Interactions** : `Framer Motion` gère l'apparition et la disparition fluide des boutons de contrôle (ex: bouton de retour "Zoom Global").

---

## 📋 11. Gestion des Flux & Filtrage (CRM / Portfolio)
Les listes de données (Leads et Réalisations) utilisent un pattern de filtrage en cascade :
- **Niveau 1 : Status/Scope** : État binaire (À traiter vs Archives dans le CRM, Visible vs Masqué dans le Portfolio).
- **Niveau 2 : Pôle Métier** : Filtrage par catégorie via l'état `serviceFilter` (CRM) ou `activeCategory` (Portfolio).
- **Niveau 3 : Recherche Full-Text** : Filtrage par mots-clés sur un agrégat de champs textuels.

**Optimisation UX (Auto-Reset)** : 
Un `useEffect` surveille la prop `searchQuery`. Si celle-ci n'est pas vide, l'état du pôle métier est automatiquement réinitialisé à sa valeur par défaut ("Tous" / "all"). Cela évite le bug d'expérience utilisateur où une recherche ne donne aucun résultat car un filtre de catégorie restrictif est resté actif à l'insu de l'utilisateur.

---


---

## ⚡ 13. Optimisation de la Performance & Formats d'Images

Pour garantir un score Lighthouse optimal et une fluidité maximale sur mobile, ESEND impose l'utilisation exclusive du format **WebP** pour tous les assets visuels.

### 13.1 Conversion Automatisée (Backend & Scripts)
- **Migration Initiale** : Les assets statiques d'origine (PNG/JPG) ont été migrés vers le format WebP via un script Node utilisant la librairie `sharp` (qualité 80%).
- **Gain de Performance** : Cette transition a permis de réduire le poids des images critiques de plus de **90%** (ex: Hero Image de 2.5MB à 150KB).

### 13.2 Automatisation Admin (Client-Side)
L'interface d'administration (`ArticleModal` et `ProjectModal`) intègre désormais un workflow d'optimisation transparent pour l'utilisateur :
1. **Compression Locale** : Utilisation de `browser-image-compression` dès la sélection du fichier.
2. **Forçage WebP** : Toute image (indépendamment du format source) est convertie en `image/webp` côté client.
3. **Normalisation des Extensions** : Le nom du fichier est automatiquement renommé en `.webp` avant l'upload.

### 13.3 Règle de Développement
Il est **strictement interdit** d'importer de nouveaux assets en format JPG ou PNG dans le répertoire `public/images/`. Tout nouvel asset doit être converti au format WebP avant intégration pour maintenir l'intégrité de la performance du site.
