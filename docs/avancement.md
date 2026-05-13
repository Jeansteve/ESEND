# État de l'Avancement du Projet ESEND — Avril 2026

Le projet a franchi une étape majeure dans sa transformation en plateforme d'expertise multiservices. Les Hubs ont été standardisés, l'interface utilisateur optimisée pour la conversion, et un système de gestion des demandes (Mini-CRM) a été intégré.

## ✅ Hubs d'Expertise Finalisés
Tous les Hubs suivent désormais l'architecture "Encyclopédique" :
- **Hub Nuisibles** : Structure complète et synchronisée (Rats, Souris, Cafards, Punaises, Puces, Guêpes, Fourmis). Exclusion éthique des Abeilles.
- **Hub Désinfection** : Design Cyan, focus bio-sécurité et protocoles virucides.
- **Hub Nettoyage & Vitrerie** : Design Indigo, focus pureté et précision (Eau pure).
- **Standardisation** : Sections "Mythes vs Réalité", Journal dynamique, FAQ Experte (10+ Q&R), CTA synchronisé.

## ✅ Formulaire de Devis (FormWizard) — Refonte Complète
**Fichier :** `src/components/FormWizard/FormWizard.jsx`

- **Étape "Détails" adaptative** : Le champ `Plus de détails` a un `placeholder` dynamique adapté au service sélectionné (Nuisibles / Désinfection / Nettoyage).
- **Téléchargement de photos** : 3 cases de dépôt d'images visibles (JPG, PNG, WEBP — max 0.5MB après compression automatique via `browser-image-compression`).
- **Validation stricte du téléphone** : Regex FR `^(?:(?:\+|00)33|0)\s*[1-9](?:[\s.-]*\d{2}){4}$`.
- **Texte de succès corrigé** : `text-slate-900` après soumission pour garantir la lisibilité.
- **Champ `Service` envoyé** : La nature du service est transmise au backend pour contextualisation.

## ✅ Backend Devis — `public/api/devis.php`
- **PHPMailer** avec `mail()` natif Hostinger (pas de SMTP).
- **Sujet dynamique par service** :
  - 🐛 Nuisibles : `🐛 [ES-2404-001] Punaise de lit - Devis de Jean (Paris)`
  - 🛡️ Désinfection : `🛡️ [ES-2404-002] Désinfection - Devis de L'Atelier (Lyon)`
  - ✨ Nettoyage : `✨ [ES-2404-003] Nettoyage - Devis de Mairie (Lille)`
- **Template HTML dynamique** : Couleurs, icônes et libellés du mail s'adaptent automatiquement au service.
- **Tracking ID** : Chaque demande reçoit un ID unique `ES-AAMM-NNN` injecté dans le sujet et le corps du mail.
- **Pièces jointes** : Les photos compressées envoyées par le client sont attachées au mail.

## ✅ Mini-CRM — Système de Suivi des Leads
### Base de Données
**Fichier SQL :** `database/add_leads_v4.sql` *(à exécuter dans phpMyAdmin Hostinger)*

Table `esend_leads` : archivage automatique de chaque demande avant l'envoi du mail.

| Colonne | Type | Description |
|---|---|---|
| `tracking_id` | VARCHAR(20) | ID unique type `ES-2404-001` |
| `service` | VARCHAR | Nuisibles / Désinfection / Nettoyage |
| `nuisible` | VARCHAR | Type de nuisible si applicable |
| `client_name`, `client_phone`, `client_email` | VARCHAR | Coordonnées du client |
| `status` | VARCHAR | `nouveau`, `contacté`, `terminé`, `annulé` |

### API
**Fichier :** `public/api/leads.php`
- `GET` : Retourne tous les leads triés par date décroissante.
- `POST (JSON)` : Met à jour le statut d'un lead `{ id, status }`.

### Interface Admin
**Fichier :** `src/components/Admin/LeadManager.jsx`
- Accessible via l'onglet **"Demandes"** dans la sidebar Admin.
- **Vue "À Traiter"** : Leads `nouveau` et `contacté`.
- **Vue "Archives"** : Leads `terminé` et `annulé`.
- **Automatisation Zéro-Saisie** : Cliquer sur le bouton "Appeler" ou "E-mail" passe automatiquement le lead en statut `contacté`.
- **Bouton "Classer Terminé"** : Archive le dossier en un clic.

### 🟢 V5 : Gestion des Images & Galerie (Dernière Evolution)
**Fichiers :** `devis.php`, `LeadManager.jsx`, `/uploads/leads/`

- **Stockage Hybride (Phase 1 Pro)** : Les images sont désormais sauvegardées de manière structurée par métier (`/uploads/leads/[service]/[nuisible]/`).
- **Lien BDD** : La table `esend_leads` stocke désormais le **chemin relatif complet**, facilitant une future migration cloud ou le tri manuel sur le serveur.
- **Normalisation** : Fonction de sanitisation automatique des noms de dossiers (minuscules, sans accents, espaces gérés).
- **Identité Visuelle** : Verrouillage déterministe des thèmes.
    - Site Public : Identité "Frozen Night" (Sombre) imposée.
    - Admin : Identité "Morning Mist" (Clair) imposée pour le confort de gestion.
    - Suppression des boutons `ThemeToggle` dans le Header public et l'espace Admin.
- **Réactivité Mobile Admin** : 
    - Résolution du blocage de défilement (`overflow: hidden`) sur mobile.
    - Correction de la largeur forcée (614px) en imposant `width: 100% !important`.
    - Sidebar totalement isolée du flux pour un affichage plein écran sur smartphone.

## ✅ Pilotage & Gouvernance IA
- **Nouvelles règles** : Le brainstorming requiert une validation explicite de l'admin avant tout développement.
- **Mémoire de Projet (`MEMORY.md`)** : Actualisée le 17 Avril 2026.

## 🚀 V6 : Business Intelligence & Market Strategy Advisor (Live)
**Fichiers :** `market_trends.php`, `Dashboard.jsx`, `api.js`

- **Intégration Apify Real-Time** : Connexion directe au scraper Google Trends pour extraire les intentions de recherche réelles sur le bassin azuréen.
- **Priorité Hyper-Locale (Menton First)** :
    - Algorithme de détection focalisé sur **Menton** et sa périphérie immédiate (06).
    - Calcul mathématique automatique des tendances (+42%, etc.) basé sur les données brutes extraites, sans simulation.
- **Market Strategy Advisor IA** : Module prédictif qui analyse les hausses de recherches (ex: Punaises de lit à Menton) pour suggérer des campagnes SEO ou des actions d'expertise immédiates.
- **Cache Intelligent V2** : Mise en place d'un système de cache performant (`market_trends_cache_v2.json`) pour garantir la fluidité du Dashboard tout en économisant les quotas d'API.
- **Automatisation du Radar IA (Nouveau)** : Connexion directe entre le Market Advisor et le Studio de Création. Un simple clic depuis l'alerte tendance pré-sélectionne le bon nuisible et lance automatiquement la génération de sujets Gemini.
- **Persistance Locale Sécurisée (Nouveau)** : Remplacement des appels réseau obsolètes (`topics.php`) par un stockage `localStorage` robuste, éliminant les erreurs 404 et garantissant un affichage instantané des sujets sauvegardés.

## ✅ V7 : Excellence Éditoriale & SEO (Live)
**Fichiers :** `ArticlePage.jsx`, `AIService.js`, `Dashboard.jsx`, `settings.php`

- **SEO Technique Automatisé** :
    - Génération dynamique des balises `<title>` et `<meta name="description">` sur chaque article.
    - Injection automatique du **Schema JSON-LD Article** pour améliorer le référencement Google.
    - URL structurelle propre et maillage interne renforcé.
- **Conversion (CTA)** :
    - Ajout d'un bloc de conversion "Expert" en fin d'article.
    - Bouton d'appel dynamique utilisant le numéro configuré dans l'admin.
- **Réglages Entreprise Centralisés** :
    - Ajout des champs **Téléphone**, **Adresse** et **SIRET** dans les paramètres.
    - Synchronisation automatique avec le `SettingsContext` pour un affichage cohérent sur tout le site (Footer, Header, Pages Légales).

## ✅ V8 : Expérience Mobile "App-Like" & Respiration (Mai 2026)
**Fichiers :** `About.jsx`, `Hero.jsx`, `Reviews.jsx`, `KnowledgeHub.jsx`, `PortfolioBento.jsx`, `TrustBanner.jsx`, `PestSelector.jsx`

- **Harmonisation du Padding Horizontal** :
    - Standardisation à **`px-8`** (32px) on mobile pour toutes les sections majeures, offrant 33% de respiration supplémentaire.
    - Transition fluide vers **`md:px-12`** (tablette) et retour à **`lg:px-6`** (desktop) où le conteneur `max-w-7xl` prend le relais.
    - Suppression totale de l'effet "bord-à-bord" qui nuisait à l'aspect premium.
- **Typographie Adaptative (Fluid Typography)** :
    - Implémentation de `text-[clamp(2.5rem,8vw,3.75rem)]` sur les titres de sections (ex: `About.jsx`).
    - Garantit que les titres massifs ne saturent pas l'espace sur les écrans ultra-compacts (iPhone SE) tout en conservant leur impact sur iPhone Pro/Plus.

### 🛡️ Sécurité & Stabilité CI/CD (10 Mai 2026)
- **Hardening Sécurité** : Audit offensif réalisé. Suppression des mots de passe en clair et des fichiers de debug (CRIT-01, CRIT-02).
- **CI/CD Robuste** : Passage à un système de génération de `config.php` via **`envsubst`** et `config.template.php`. Cette méthode protège les secrets contre les erreurs d'interprétation shell lors de l'injection.
- **SMTP Authentifié** : Résolution du bug d'envoi. Les identifiants sont désormais injectés via les secrets GitHub (`SMTP_USER`, `SMTP_PASSWORD`).
- **Middleware Auth** : Renforcement des sessions admin (HttpOnly, Secure, SameSite=Strict).
- **CORS & En-têtes** : Restriction des accès API aux domaines autorisés et activation de HSTS/CSP.

- **Optimisation du FormWizard (Mobile UX)** :
    - Centrage des entêtes de sections et des boutons CTAs.
    - Refonte du stepper sur mobile : affichage exclusif des icônes.
    - Correction de la lisibilité du lien RGPD : passage du texte en blanc.
- **Optimisation de la Section Avis (UX & Affordance)** :
    - Centrage parfait du score global Google sur mobile.
    - Correction de la largeur sur PC : le badge de score retrouve un format compact et premium (`max-w-[380px]`).
    - Implémentation d'une **Logique Hybride** :
        - **Mobile** : Affichage d'office des 9 avis dans le carrousel horizontal pour un swipe sans friction (suppression du bouton "Voir plus").
        - **PC** : Affichage initial limité à 6 avis (grille 2x3) avec bouton "Découvrir plus d'avis" pour préserver la compacité verticale.
    - **Pagination Dots** : Correction et maintien de la visibilité des indicateurs sur mobile, synchronisés sur l'intégralité des avis.
    - Ajustement du "Peek Effect" (`w-82vw`) pour suggérer naturellement le swipe.
    - Implémentation d'un listener de scroll pour synchroniser les indicateurs en temps réel.
- **Audit Transverse & Zéro Régression** :
    - Vérification systématique de l'alignement vertical du contenu sur mobile.
    - Conservation stricte des comportements desktop (`lg:`) pour préserver l'équilibre visuel sur grand écran.
    - Système de sauvegarde dynamique "Key-Value" en base de données.

## ✅ V9 : IA Consulting & Illustration Studio (Live)
**Fichiers :** `AIService.js`, `ArticleModal.jsx`, `CreationStudio.jsx`

- **IA Senior Consultant** : Refonte du prompt pour adopter une posture d'expert pédagogue.
    - Interdiction du verbiage marketing creux (*seamless*, *innovant*).
    - Priorité à l'enseignement et à la valeur ajoutée pour le lecteur.
- **Studio d'Illustration IA** :
    - L'IA suggère désormais 2 à 3 visuels par article avec des prompts Midjourney/Fal.ai optimisés.
    - Emplacements conseillés intégrés dans les suggestions pour faciliter la mise en page.
    - Nouvel onglet "Illustrations" dans le modal d'édition d'article.
- **Maillage Interne Contextuel** : 
    - L'IA utilise une liste blanche d'URLs de services pour renvoyer le lecteur vers les pages expertes au lieu de répéter les protocoles techniques.
- **Persistance Radar IA** : Unification des clés de stockage pour un affichage immédiat des sujets suggérés.

## ✅ V10 : Stabilisation du Build de Production (Mai 2024)
**Fichier :** `src/components/FormWizard/FormWizard.jsx`

- **Résolution des erreurs de nesting JSX** : Correction de l'erreur `esbuild` empêchant le déploiement.
- **Audit de structure DOM** :
    - Fermeture des balises `<p>` orphelines dans la section Urgence.
    - Correction de l'imbrication des `<div>` dans la section Détails (Message vs Photos).
- **Pipeline CI/CD rétabli** : Le déploiement automatique sur GitHub Actions est à nouveau fonctionnel après stabilisation de l'arborescence React.
- **Optimisation de la syntaxe** : Nettoyage des balises redondantes et amélioration de la lisibilité des blocs `{... && (...)}`.

## ✅ V11 : Performance & Expérience Utilisateur (Live — Mai 2024)
**Fichiers :** `articles_v3.php`, `ArticlePage.jsx`, `DataService.js`

- **Optimisation Drastique de l'API** : 
    - Les requêtes de liste d'articles ne transfèrent plus le champ `content`. 
    - Réduction du poids des réponses JSON de plusieurs Mo à quelques Ko.
- **Rendu Instantané (Découplage)** :
    - La page de l'article affiche désormais le contenu principal dès réception, sans attendre le calcul/chargement des articles liés.
- **Réparation du Système de Cache** :
    - Correction d'un bug de type (`String` vs `Number`) qui invalidait le cache.
    - Le système de "Prefetch" (pré-chargement au survol) est désormais 100% fonctionnel, rendant le clic sur un article quasi-instantané.

## ✅ V12 : Conformité Légale & RGPD Dynamique (Live — Mai 2024)
**Fichiers :** `LegalNotices.jsx`, `PrivacyPolicy.jsx`, `Footer.jsx`, `FormWizard.jsx`, `App.jsx`

- **Pages Juridiques Dynamiques** : 
    - Création des routes `/mentions-legales` et `/politique-confidentialite`.
    - Récupération des données (SIRET, Adresse, Gérant) via `api.getSettings()`.
- **Verrou de Consentement RGPD** :
    - Ajout d'une case à cocher obligatoire à la fin du `FormWizard`.
    - Blocage de la soumission si non cochée + message d'erreur explicite.
- **Footer Juridique** :
    - Intégration du SIRET dynamique dans le pied de page.
    - Ajout des liens légaux avec mécanisme de "Scroll to Top" forcé.
- **Design Harmonisé** : Utilisation du thème "Frozen Night" avec typographie lisible et icônes Lucide-React.

## ✅ V13 : Business Intelligence & Analytics Premium (Live)
**Fichiers :** `AnalyticsTab.jsx`, `Dashboard.jsx`, `package.json`

- **Visualisation Graphique Haute Performance** :
    - Intégration de `Recharts` pour des graphiques fluides et responsifs.
    - Graphique `AreaChart` temporel avec le thème "Frozen Night" (dégradés dynamiques Rouges, Indigos, Cyans).
- **Fonctionnalité "Drill-Down" (Zoom Métier)** :
    - Basculement instantané d'une vue "Macro" (Nuisibles vs Nettoyage) à une vue "Micro" (Rats, Souris, Punaises...) via des animations `Framer Motion`.
- **Filtres de Granularité Temporelle** :
    - Vue modifiable à la volée : Jour (14 jours), Semaine (12 semaines), Mois (12 mois), Année (5 ans).
    - Algorithme de Mock Data adaptatif (générateur de tendance pour l'effet Wow en l'absence de data volumineuse).
- **Indicateurs Clés de Performance (KPIs)** :
    - Cartes récapitulatives temporelles indiquant le volume total de la période sélectionnée et sa tendance (+XX%).

## ✅ V14 : CRM Filtering & Search UX (Live)
**Fichiers :** `LeadManager.jsx`, `Dashboard.jsx`, `PortfolioTab (Dashboard.jsx)`

- **Filtrage par Pôle Métier** : Intégration de boutons de filtrage rapide (Nuisibles, Nettoyage, Désinfection) avec identité visuelle synchronisée sur les Demandes et les Réalisations.
- **Recherche Globale Connectée** : La barre de recherche du Dashboard est désormais fonctionnelle dans les sections Demandes et Réalisations, permettant une recherche multi-critères (nom, ville, ID, détails).
- **UX Auto-Reset** : Implémentation d'un déclencheur intelligent qui bascule automatiquement les filtres de catégorie sur "Tous" dès qu'une recherche est entamée, garantissant que l'utilisateur trouve toujours ce qu'il cherche sans friction.
- **Logique Cascade** : Système de filtrage intelligent combinant l'état (Archives/Inbox), le pôle métier et la recherche textuelle.

## ✅ V14 : Sécurisation Critique & Hachage Argon2id (Mai 2024)
**Fichiers :** `login.php`, `change_password.php`, `mass_migrate.php`, `Dashboard.jsx`, `App.jsx`

- **Migration Mots de Passe (Règles de l'Art)** :
    - Abandon du stockage en clair au profit du hachage **Argon2id**.
    - **Lazy Migration** : Système intelligent qui hache le mot de passe lors de la connexion réussie de l'admin.
    - **Script de Migration Massive** : Création de `mass_migrate.php` pour sécuriser l'intégralité de la base de données en une seule action.
- **Sécurité Admin Renforcée** :
    - Correction du module de changement de mot de passe (Frontend + Backend).
    - Ajout d'une validation de confirmation côté client pour éviter les erreurs de saisie.
- **Expérience de Navigation (UX)** :
    - Correction du bug de navigation vers les ancres (`#contact`) depuis les pages profondes (ex: Journal).
    - Synchronisation des CTA "Devis Gratuit" pour un scroll fluide et précis.

## ✅ V15 : Préparation Production & Standardisation (Live — Mai 2024)
**Fichiers :** `index.html`, `schema_prod.sql`, `DUPLICATION_GUIDE.md`, `robots.txt`, `sitemap.xml`

- **Branding & SEO Final** :
    - Remplacement du favicon Vite par le logo ESEND.
    - Optimisation des balises OpenGraph et Twitter Cards pour un partage social professionnel.
    - Création des fichiers `robots.txt` et `sitemap.xml` pointant sur le domaine de production.
- **Infrastructure de Déploiement** :
    - Séparation des flux GitHub Actions : `deploy-prod.yml` (branche main) et `deploy-test.yml` (branche test).
    - Création d'un guide de duplication industrielle pour faciliter le déploiement de futurs clients.
- **Base de Données Unifiée** :
    - Création de `schema_prod.sql` regroupant l'intégralité des tables et colonnes (V1 à V5).

## ✅ V16 : Optimisation de l'Expérience Utilisateur & Navigation (Live — Mai 2026)
**Fichiers :** `FormWizard.jsx`, `PortfolioBento.jsx`, `EmptyState.jsx`, `index.html`

- **Navigation Rapide FormWizard** :
    - Implémentation du système "Fast-Forward" : un bouton **"Suivant →"** apparaît dynamiquement si l'utilisateur revient sur une étape déjà complétée.
    - Reprise intelligente : le message d'accueil s'adapte ("Reprenons votre estimation") pour encourager la conversion.
- **Épuration du Portfolio & Journal** :
    - Refonte du composant `EmptyState` pour le portfolio vide.
    - Suppression des boutons "Explorer le Journal" dans `KnowledgeHub.jsx` si aucun article n'est présent.
    - Suppression du bouton CTA sur l'état vide du portfolio pour préserver l'aspect "vitrine archives".
- **Navigation Services (PestPage)** :
    - Activation du **Sticky Permanent** pour le sélecteur de nuisibles.
    - Correction technique globale : passage de `overflow-x: hidden` à `clip` pour autoriser le positionnement collant sur toute la hauteur de la page.
    - Ajustement des conteneurs parents pour garantir que le menu reste à portée de main sans déborder sur le footer.
- **Finalisation SEO & Branding** :
    - Amélioration de la compatibilité du Favicon via l'ajout de `shortcut icon`.
- **Gouvernance de Déploiement** :
    - Verrouillage du workflow CI/CD : passage obligatoire par la branche `test` avant tout merge sur `main`.

## ✅ V17 : Centralisation & Expérience Premium (Mai 2026)
**Fichiers :** `SettingsContext.jsx`, `Hero.jsx`, `App.jsx`, `FormWizard.jsx`

- **Centralisation des Paramètres (SSOT)** :
    - Mise en place du `SettingsContext` pour éliminer les coordonnées codées en dur.
    - Synchronisation automatique du téléphone et de l'email sur l'ensemble du site.
- **Animations Premium "High-End"** :
    - Implémentation du **compteur animé (0.0 → 4.9)** pour le score de satisfaction.
    - Ajout d'un effet **"Pop & Zoom"** final pour valider la confiance client.
- **Corrections de Stabilité UI** :
    - Résolution des problèmes d'alignement du score de satisfaction sur mobile et desktop.
    - Correction du bug "White Screen" lié aux imports `framer-motion` manquants.
    - Optimisation du `FormWizard` pour utiliser les réglages dynamiques.

### ✅ V17.2 : Synchronisation Intelligente au Scroll (Mai 2026)
**Fichiers :** `AnimatedNumber.jsx`, `Hero.jsx`, `Reviews.jsx`

- **Logique Différenciée (V3.1)** : Le composant `AnimatedNumber` gère désormais deux modes de déclenchement :
    - **Immédiat (Hero)** : Le score s'anime dès le chargement pour un impact visuel direct.
    - **Animation Scroll-Sync** : Finalisation du composant `AnimatedNumber` avec support `IntersectionObserver`. Harmonisation réussie sur le Hero (immédiat) et les Reviews (au scroll).
- **Documentation Master** : Mise à jour du **Cahier des Charges**, de la **Documentation Technique** et du **MEMORY.md** (PSA-2026-05-06-B) pour refléter ces standards.
- **Mise En Production** : Déploiement V17.2 validé et poussé sur le serveur Hostinger.
- **Synchronisation Reveal** : L'animation du score démarre 0.3s après l'entrée en vue, se coordonnant parfaitement avec l'effet de révélation en fondu de la section.
- **Robustesse** : Introduction de la prop `triggerOnMount` pour un contrôle précis du comportement par instance.

### ✅ V17.3 : Sécurisation Totale de l'Infrastructure (Mai 2026)
**Fichiers :** `deploy.yml`, `config.php`, `setup_config.php`

- **Génération Dynamique de Configuration** : Création d'un script PHP d'auto-configuration pour générer `config.php` à partir des variables d'environnement.
- **Sécurisation Database** : Migration des identifiants sensibles vers les **GitHub Secrets**. Séparation stricte entre `DB_TEST` et `DB_PROD`.
- **Durcissement PHP** : Désactivation globale de l'affichage des erreurs (`display_errors = Off`) via la configuration générée pour éviter les fuites d'informations.
- **Documentation Secrets** : Mise à jour de la documentation technique incluant la liste des secrets requis pour la maintenance du pipeline.

## ✅ V18 : Blindage de Sécurité & Gouvernance (Audit v1 & v2 — Mai 2026)
**Fichiers :** `auth_check.php`, `login.php`, `upload.php`, `settings.php`, `security.js`, `.htaccess`

- **Audit de Sécurité Complet (v1 & v2)** :
    - **Authentification Backend-Native** : Migration vers un système de session PHP sécurisé. Chaque appel API sensible est désormais validé par le middleware `auth_check.php`.
    - **Isolation des Données Clients** : Verrouillage strict de l'accès aux leads et aux paramètres du site.
    - **Protection Anti-Sabotage** : Les méthodes d'écriture (`POST`, `PUT`, `DELETE`) sont réservées aux administrateurs authentifiés.
    - **Bouclier Anti-XSS (Refonte)** : Création d'un utilitaire de désinfection HTML centralisé (`sanitizeHTML`) appliqué aux articles et aux réalisations.
    - [x] **Désinfection Profonde des Images** : Re-génération via PHP GD pour détruire les payloads cachés.
    - [x] **Fiabilisation Emails** : Migration vers SMTP Hostinger authentifié (Port 465).
    - [x] **Correctif Routage** : Passage en `base: '/'` pour corriger la page blanche sur `/admin/login`.
    - [x] Optimisation Accessibilité : Amélioration du contraste du texte de consentement RGPD.
    - **Durcissement Infrastructure** :
        - Blocage du listage des répertoires (`Options -Indexes`).
        - Injection d'en-têtes de sécurité HTTP (Anti-Clickjacking/XSS).
        - Masquage total des erreurs SQL pour prévenir les fuites d'informations techniques.
    - **Mitigation Brute-Force** : Introduction d'un délai de sécurité sur l'API de connexion.
- **Réparation CI/CD** :
    - Correction des erreurs de syntaxe React bloquant le build.
    - Synchronisation des pipelines `test` et `prod`.
- **Gouvernance PSA-2026-05-08-B** : Mise à jour de la mémoire du projet concernant l'interdiction de faire confiance au client (navigateur) pour les données sensibles.

## ✅ V19 : Expérience Mobile "App-Like" (Live — Mai 2026)
**Fichiers :** `index.css`, `Hero.jsx`, `Reviews.jsx`, `PortfolioBento.jsx`, `PestSelector.jsx`, `FormWizard.jsx`

- **Typographie Fluide (`clamp`)** : Migration vers un système de tailles de texte dynamiques. Les titres s'adaptent désormais millimétriquement à la largeur de l'écran, éliminant les débordements sur les petits smartphones.
- **Hero Section "Splash-Effect"** : 
    - Centrage parfait du contenu sur mobile.
    - Optimisation de l'image de fond (opacité réduite à 40% sur mobile pour maximiser la lisibilité du texte).
    - Alignement vertical équilibré pour un aspect "écran de bienvenue" natif.
- **Slider Tactile (Témoignages)** :
    - Transformation de la grille de témoignages en **Slider Horizontal** avec `scroll-snap`.
    - Expérience native : défilement fluide au doigt avec arrêt précis sur chaque carte.
    - Suppression des barres de défilement inesthétiques (`no-scrollbar`).
- **Bento Grid Responsive** :
    - Correction de la logique d'étalement (`col-span-2`) qui ne s'active désormais qu'à partir du format tablette (`md:`).
    - Empilement vertical parfait sur mobile sans déformation des images.
- **Ergonomie Tactile (FormWizard)** :
    - Réduction des paddings internes (`p-6` au lieu de `p-10`) pour libérer de l'espace de saisie.
    - Normalisation des zones de contact (boutons Retour/Suivant repositionnés pour le pouce).
- **Zéro Débordement (`overflow-x`)** : Sécurisation globale du conteneur `#root` pour empêcher tout glissement horizontal parasite lors du défilement.
+
+## ✅ V20 : Expérience "Liquid Glass" Immersive (Mai 2026)
+**Fichiers :** `LiquidGlass.jsx`, `CleaningPage.jsx`, `vite.config.js`
+
+- **Refonte Atmosphérique** : Abandon du bloc interactif localisé au profit d'un calque transparent global (`fixed inset-0`) simulant des gouttelettes d'eau dérivant sur l'ensemble de la page de Nettoyage.
+- **Physique des Fluides Optimisée** :
+    - **Vitesse Zen** : Réduction drastique de la vélocité des bulles pour un effet apaisant.

## ✅ V20 : Expérience "Liquid Glass" Immersive (Mai 2026)
**Fichiers :** `LiquidGlass.jsx`, `CleaningPage.jsx`, `vite.config.js`

- **Refonte Atmosphérique** : Abandon du bloc interactif localisé au profit d'un calque transparent global (`fixed inset-0`) simulant des gouttelettes d'eau dérivant sur l'ensemble de la page de Nettoyage.
- **Physique des Fluides Optimisée** :
    - **Vitesse Zen** : Réduction drastique de la vélocité des bulles pour un effet apaisant.
    - **Plafonnement de Taille** : Limitation du rayon maximal des bulles à `0.08` pour éviter l'encombrement visuel.
    - **Interaction Globale** : Détection des clics sur toute la fenêtre (`window listeners`) pour générer de l'eau n'importe où, sans bloquer les interactions avec le site (`pointer-events-none`).
- **Performance WebGL** :
    - **Vendor Chunking** : Isolation de Three.js dans un bundle séparé pour ne pas alourdir le chargement initial du site.
    - **Économie de Batterie** : Suspension automatique du rendu GPU via `IntersectionObserver` lorsque l'utilisateur n'est pas sur la section concernée.
- **Design "Crystal Clear"** : Rendu des bulles avec effets de réfraction, Fresnel et spécularité prémultipliés pour une intégration parfaite sur les fonds sombres.

## ✅ V21 : Maîtrise Éditoriale & Persistance SEO (Mai 2026)
**Fichiers :** `articles_v3.php`, `Dashboard.jsx`, `BlogManager.jsx`, `upgrade_articles_seo.sql`

- **Persistance SEO Critique** : 
    - Intégration officielle des champs `meta_title` et `meta_description` dans la base de données.
    - Mise à jour de l'API pour garantir que les optimisations de référencement saisies par l'admin sont conservées durablement.
- **Synchronisation UI "Zero-Latency"** :
    - Refonte de la communication entre le Dashboard et le Gestionnaire de Blog.
    - Les modifications d'articles (changement d'image de couverture, titre, etc.) sont désormais répercutées **instantanément** sur la vignette de la liste sans rafraîchissement de la page.
- **Migration de Données** : Création d'un script de mise à jour sécurisé pour harmoniser les anciennes installations avec le nouveau standard SEO.

## ✅ V22 : Statistiques de Lecture & Correction Métadonnées (Mai 2026)
**Fichiers :** `articles_v3.php`, `BlogManager.jsx`, `ArticleModal.jsx`, `upgrade_articles_stats.sql`

- **Tracking des Vues** : Implémentation d'un compteur de lecture temps réel. Chaque ouverture d'article incrémente une colonne `views` en base de données (résilience incluse si la colonne manque).
- **Affichage des Stats Admin** : Intégration d'un badge "Vues" (icône Eye) sur les cartes d'articles dans l'espace admin.
- **Correction des Vignettes Public** :
    - Résolution du bug d'affichage de la date et du temps de lecture (aliasing auto).
    - Optimisation de la visibilité sur la page article : capsules rouges avec texte blanc contrasté.
- **Calcul Auto du temps de lecture** : Persistance du temps de lecture calculé dynamiquement par l'éditeur.
- **Règle d'Or UX** : Intégration de la philosophie "User-Centric" dans la gouvernance du projet.


## 🚀 Prochaines Étapes
1. **Validation Google Search Console** : Vérifier l'indexation des nouvelles URLs SEO-friendly.
2. **Double Authentification (2FA)** : Planifier l'ajout de TOTP pour l'accès admin.
3. **Auto-réponse Client** : Développer le système d'accusé de réception par e-mail pour les clients.

## ✅ V23 : Excellence Ergonomique de l'Admin (Mai 2026)
**Fichiers :** `Dashboard.jsx`, `AdminPanel.css`

- **Refonte de l'En-tête "Statut Opérationnel"** :
    - Alignement asymétrique professionnel : **Titre & Sous-titre à gauche**, **Actions à droite**.
    - Forçage de la priorité via `!` (Tailwind Important) pour éliminer les conflits de style lors du build.
    - Breakpoints optimisés (`lg:`) pour une expérience fluide sur tous les formats d'écrans (Tablettes & Laptops).
- **Stabilisation du Bloc d'Actions** :
    - Alignement horizontal strict (`flex-row`) de la recherche et du bouton de création.
    - Suppression de l'effet d'expansion au focus sur la barre de recherche pour éviter le chevauchement ("Overlapping Fix").
    - Protection des dimensions des boutons via `shrink-0`.
- **Typographie & Respiration** : Augmentation des marges (`mb-12`) et de la taille des titres pour une meilleure hiérarchie visuelle.
