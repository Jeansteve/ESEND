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
    - Système de sauvegarde dynamique "Key-Value" en base de données.

## ✅ V8 : IA Consulting & Illustration Studio (Live)
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

## ✅ V9 : Stabilisation du Build de Production (Mai 2024)
**Fichier :** `src/components/FormWizard/FormWizard.jsx`

- **Résolution des erreurs de nesting JSX** : Correction de l'erreur `esbuild` empêchant le déploiement.
- **Audit de structure DOM** :
    - Fermeture des balises `<p>` orphelines dans la section Urgence.
    - Correction de l'imbrication des `<div>` dans la section Détails (Message vs Photos).
- **Pipeline CI/CD rétabli** : Le déploiement automatique sur GitHub Actions est à nouveau fonctionnel après stabilisation de l'arborescence React.
- **Optimisation de la syntaxe** : Nettoyage des balises redondantes et amélioration de la lisibilité des blocs `{... && (...)}`.

## ✅ V10 : Performance & Expérience Utilisateur (Live — Mai 2024)
**Fichiers :** `articles_v3.php`, `ArticlePage.jsx`, `DataService.js`

- **Optimisation Drastique de l'API** : 
    - Les requêtes de liste d'articles ne transfèrent plus le champ `content`. 
    - Réduction du poids des réponses JSON de plusieurs Mo à quelques Ko.
- **Rendu Instantané (Découplage)** :
    - La page de l'article affiche désormais le contenu principal dès réception, sans attendre le calcul/chargement des articles liés.
- **Réparation du Système de Cache** :
    - Correction d'un bug de type (`String` vs `Number`) qui invalidait le cache.
    - Le système de "Prefetch" (pré-chargement au survol) est désormais 100% fonctionnel, rendant le clic sur un article quasi-instantané.

## ✅ V11 : Conformité Légale & RGPD Dynamique (Live — Mai 2024)
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

## ✅ V12 : Business Intelligence & Analytics Premium (Live)
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

## ✅ V13 : CRM Filtering & Search UX (Live)
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
- **Épuration du Portfolio** :
    - Refonte du composant `EmptyState` pour le portfolio vide.
    - Suppression du bouton CTA sur cet état pour éviter de surcharger l'interface et préserver l'aspect "vitrine archives".
- **Finalisation SEO & Branding** :
    - Amélioration de la compatibilité du Favicon via l'ajout de `shortcut icon`.
- **Gouvernance de Déploiement** :
    - Verrouillage du workflow CI/CD : passage obligatoire par la branche `test` avant tout merge sur `main`.

## 🚀 Prochaines Étapes
1. **Double Authentification (2FA)** : Planifier l'ajout de TOTP pour l'accès admin.
2. **Auto-réponse Client** : Développer le système d'accusé de réception par e-mail pour les clients.
3. **Optimisation Performance Images** : Passage au format WebP natif pour tous les assets de la page d'accueil.


