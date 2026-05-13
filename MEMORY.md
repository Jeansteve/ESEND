# ESEND — MÉMOIRE DE GOUVERNANCE & DÉCISIONS CRITIQUES

### 🚨 RÈGLE D'OR N°1 (DÉPLOIEMENT)
**INTERDICTION STRICTE** de pousser toute modification (code ou documentation) sur la branche **`main` (Production)** sans un ordre explicite de l'utilisateur. 
- Même en cas d'urgence technique ou de correction de faille.
- Toute MEP (Mise En Production) doit être précédée d'une demande d'autorisation claire.
- Le flux obligatoire est : **Développement Local > Poussée sur `test` > Validation Utilisateur > Ordre de MEP > Poussée sur `main`**.

### 💡 RÈGLE D'OR N°2 (EXPÉRIENCE UTILISATEUR)
**SE METTRE SYSTÉMATIQUEMENT À LA PLACE DE L'UTILISATEUR**.
- Anticiper les questions d'un lecteur lambda (ex: ne jamais afficher un chiffre seul sans son unité : "1 min" au lieu de "1").
- Un développement de qualité est un développement qui n'oblige pas l'utilisateur à deviner le sens d'une information.
- Toujours vérifier la clarté et l'utilité réelle de chaque élément d'interface avant de valider.

### 🛡️ PROTOCOLE ANTI-RÉGRESSION UNIVERSEL (ESEND-QA V2)
*À appliquer avant toute validation de changement (Code, CSS, API ou Config).*

#### 1. PHASE D'ANALYSE (AVANT)
- **Périmètre** : Identifier si la modification touche un composant partagé (Header, Footer, Layout).
- **Impact Sticky** : Vérifier si des parents d'éléments fixes sont modifiés (Ne jamais mettre `overflow: hidden` sur ces derniers, utiliser `clip`).

#### 2. PHASE DE DÉVELOPPEMENT (PENDANT)
- **Changements Atomiques** : Une seule tâche à la fois pour faciliter le debug.
- **Cohérence Variables** : Utiliser les variables CSS globales (`--bg-primary`, etc.) pour éviter les "tâches" de couleurs incohérentes.
- **Isolation** : Vérifier que les nouveaux styles n'écrasent pas des règles globales par accident.

#### 3. PHASE DE VALIDATION (APRÈS)
- **Build Local** : `npm run build` obligatoire pour intercepter les erreurs de syntaxe JSX/JS.
- **Responsive 3-Points** : Contrôle systématique sur Mobile, Tablette et PC.
- **Audit de Nettoyage** : Suppression des `console.log`, logs SMTP ou erreurs PHP détaillées.
- **Transition de Thème** : Vérifier la lisibilité du Header/FAB sur les passages Sombres <-> Claires.

#### 4. FLUX DE MISE EN PRODUCTION (MEP)
- **Branche Test** : Poussée obligatoire sur `test` pour validation visuelle par l'utilisateur.
- **Autorisation** : AUCUN push sur `main` sans feu vert explicite (Règle d'Or N°1).

---

### [PSA-2026-03-24-B] : Collision Header & Pitfall justify-center
- **Le Problème :** Titre Hero caché par le Header fixe sur mobile malgré l'ajout de paddings.
- **Cause Racine :** L'utilisation de `justify-center` sur un conteneur flex `h-screen` dense (Titre + Image + CTA). Le navigateur pousse les éléments du haut vers le haut pour centrer le bloc global, causant une collision inévitable avec le Header.
- **La Solution :** Architecture "Top-Down" :
  1. Passer en `justify-start` sur mobile.
  2. Fixer un padding de sécurité (`pt-20`) égal à la hauteur du Header.
  3. Utiliser `flex-grow` sur l'élément central (Image) pour absorber les variations de hauteur d'écran.
- **Règle d'Or (UI Mobile) :** Pour les vues "Above-the-fold" denses avec Header fixe, NE JAMAIS utiliser le centrage automatique (`justify-center`). Privilégier un ancrage par le haut avec compensation de padding.

### [PSA-2026-04-01-A] : Découplage Backdrop-Filter (Nested Blurs)
- **Le Problème :** Le menu déroulant devenait opaque ou perdait son flou lors du défilement.
- **Cause Racine :** Les navigateurs WebKit/Blink peinent à gérer un `backdrop-filter` imbriqué dans un autre parent possédant déjà un flou (le Header fixe après scroll).
- **La Solution :** Découpler le Header :
  1. Utiliser un conteneur `header` sans couleur ni flou.
  2. Ajouter une `div` absolue `inset-0` pour le fond flou du Header (géré par l'opacité au scroll).
  3. Le dropdown, dès lors, n'est plus "héritier" d'un filtre imbriqué, ce qui résout le bug visuel.

### [PSA-2026-04-01-B] : Architecture Hubs Expertise (Standardisation)
- **Concept :** Transformation des pages services en "Encyclopédies Tactiques" autonomes.
- **Structure Standard :** Hero > Protocoles (Bento) > Mythes vs Réalité > Journal de l'Expert > FAQ > CTA Devis.
- **Lien avec FormWizard :** Le bouton devis doit pointer vers `/#devis` avec un hash listener pour garantir l'ouverture immédiate du wizard, même en navigation inter-page.

### [PSA-2026-04-17-A] : Synchronisation Globale & Exclusion Éthique
- **Règle métier :** La liste des nuisibles traités par ESEND est strictement limitée à : Cafard, Guêpes/Frelons, Punaises de lit, Puces, Rats, Souris et Fourmis.
- **Exclusion :** Les **Abeilles** ne sont PAS traitées (protection des pollinisateurs). L'option doit être absente de tout sélecteur ou formulaire.
- **Impact Contenu :** Toute modification de la liste des nuisibles doit être répercutée sur `FormWizard.jsx`, `PestSelector.jsx`, `src/data/pests.js` et les témoignages clients.

### [PSA-2026-04-17-B] : Persistance du Fond Blanc Wizard (Anti-Dark Mode)
- **Le Problème :** Sur un site hybride (clair/sombre), le formulaire "Demander une Intervention" perdait sa lisibilité quand le fond restait blanc mais que les labels devenaient blancs (Classes `dark:`).
- **La Solution :** Forcer le fond blanc pur (`bg-white`) et les textes sombres (`text-slate-900`) en supprimant les classes conditionnelles `dark:`. Le formulaire devient une zone "sanctuarisée" hors-thème pour garantir la conversion.

### [PSA-2026-04-17-C] : Animations Premium Staggered (TrustBanner)
- **Concept :** Pour un rendu haut de gamme, les effets visuels ne doivent pas se déclencher en simultané.
- **Implémentation :** Utilisation d'un `staggered delay` sur les animations de sweep (balayage lumineux). Par exemple, un `animationDelay: (index * 0.4)s` crée une vague de reflets perçue comme un mouvement fluide traversant la page.
- **Micro-interactions :** Le tilt 3D magnétique au survol renforce l'aspect "tangible" et premium des cartes de réassurance.

### [PSA-2026-04-19-A] : Standardisation 'Devis Offert' & Réassurance
- **Wording de Conversion :** Le terme "Obtenir mon devis offert" remplace définitivement "Obtenir mon devis". Le mot "Offert" valorise mieux la gratuité que "Gratuit" dans l'univers premium d'ESEND.
- **Trust Signal :** Ajout systématique du sous-titre "Estimation offerte sans engagement" sous les CTA principaux (Hero, FormWizard). Cela lève le frein psychologique de l'engagement financier immédiat.

### [PSA-2026-04-19-B] : Pattern d'Animation 'Liquid Pulse' (Innovation)
- **Concept :** Pour différencier le bouton de rappel de l'arrière-plan, utilisation d'une aura lumineuse liquide.
- **Technique :** Combinaison de `scale` modéré (1.03) et d'un `boxShadow` en expansion (ex: `0 0 30px 10px rgba(220, 38, 38, 0.2)`).
- **Règle de Clarté :** Pas d'icônes complexes (comme le prix barré) au-dessus du bouton pour éviter de charger l'interface. La réassurance doit rester textuelle et l'animation purement atmosphérique.

### 2. Normes de Conversion & UI
*   **CTA principal** : Utiliser impérativement "Devis Offert" ou "MON DEVIS OFFERT" pour maximiser le taux de clics.
*   **Liquid Pulse** : Animation Framer Motion obligatoire sur les boutons de conversion (aura lumineuse organique).
*   **Bicolore** : Hygiène en Bleu (`sky-400`), Nuisibles en Rouge (`red-600`).
*   **Separateurs de Section** : Utiliser le composant `<SectionSeparator text="..." />` pour les transitions entre blocs majeurs. Bulle centrée, lignes rouges fines de 80px, animation de balayage.

### [PSA-2026-04-20-A] : Animation SVG Séquentielle Complexe (Framer Motion)
- **Le Contexte :** Remplacement d'une séquence complexe d'animation de formulaire (originellement en GSAP lourd) par une implémentation pure `framer-motion` via `<svg>`.
- **Mécanique Morphing :**
  1. Le `<path>` du bouton (`d`) rétrécit avec un timing fluide.
  2. Les éléments intérieurs utilisent explicitement `transformOrigin: "Px Px"` pour éviter des translations erratiques dues au `scale`.
  3. Chaque variante (`idle`, `loading`, `success`) gère ses propres temps d'exécution (`delay`, `duration`) via clé de variante pour permettre un morphing asynchrone parfait sans recourir à JS Timeline.
- **Centrage Dynamique :** Si le texte perd un élément asymétrique à côté de lui, son `x` est modifié dynamiquement lors du changement de state pour préserver le centrage parfait. L'attribut `successGreen` a été fixé à `#16a34a` (Tailwind Green-600) pour un rendu professionnel sans être agressif visuellement.
- **Maintien d'État UI & Finalisation Spectaculaire :** Après l'envoi back-end (FormSubmit), l'état `isSuccess` est maintenu pendant 1.5 seconde. Cela donne à l'utilisateur le frisson visuel de voir le bouton se transformer, valider, rougir (ou verdir), et s'épanouir. Ensuite SEULEMENT, `isSubmitted` passe à `true` et le formulaire cède sa place au bel écran "Demande Envoyée" ! Un vrai parcours sans friction.

### [PSA-2026-04-26-A] : Stabilisation du Radar IA (Local Storage & Race Condition)
- **Le Problème 1 (Sujets invisibles) :** Le générateur IA fonctionnait, mais les sujets disparaissaient car `api.js` tentait de les sauvegarder sur `topics.php` (inexistant sur le serveur Hostinger), provoquant une erreur 404 bloquante.
- **La Solution 1 :** Remplacement de la persistance serveur par du `localStorage` (`esend_ai_topics_v1`) pour les idées générées. Plus d'erreur réseau, affichage instantané.
- **Le Problème 2 (Auto-Start cassé) :** Le clic depuis le Market Advisor ouvrait le Studio, mais la sélection se remettait à zéro sans lancer la recherche.
- **Cause Racine :** Un "Race Condition". Le `useEffect` de l'auto-start s'exécutait *pendant* que le Studio chargeait la base locale. Dès que le chargement se terminait, React détruisait et recréait le composant `TopicChoiceScreen` (perte d'état).
- **La Solution 2 :** 
  1. Forcer la valeur du `<select>` en `String` pour assurer le matching React.
  2. Ajouter `!loadingFromDb` dans les conditions du `useEffect` pour s'assurer que le composant est stable et la DB locale chargée *avant* de lancer la génération IA.
### [PSA-2026-05-02-A] : Correction du Nesting JSX (Balise P Orpheline)
- **Le Problème :** Échec du build de production (`esbuild`) avec l'erreur `Unexpected closing "motion.div" tag does not match opening "p" tag`.
- **Cause Racine :** Une balise `<p>` dans l'étape `urgency` n'était pas fermée correctement, ce qui corrompait la pile d'analyse syntaxique du compilateur lors du traitement des blocs conditionnels React.
- **La Solution :** Fermeture explicite de la balise `<p>` et réalignement des blocs de conditions `{... && (...)}`.
- **Règle d'Or (Codebase) :** Toujours vérifier l'équilibre des balises HTML au sein des rendus conditionnels complexes, car une erreur au milieu du fichier peut être signalée par le compilateur à la toute fin, rendant le debug complexe.

### [PSA-2026-05-02-B] : Réalignement Structurel du Wizard (Balise Div Orpheline)
- **Le Problème :** Deuxième erreur de build consécutive : `Unexpected closing "motion.div" tag does not match opening "div" tag`.
- **Cause Racine :** Une balise `<div>` restait ouverte après le `textarea` de l'étape `details`, empiétant sur la section `photos` et décalant la pile de fermeture des composants parents.
- **La Solution :** Ajout de la fermeture `</div>` manquante et ré-indexation visuelle des niveaux d'imbrication pour garantir un équilibre parfait du DOM.
- **Impact :** Stabilisation totale du pipeline CI/CD sur GitHub Actions. Le build de production est désormais fluide et sans erreurs structurelles.

### [PSA-2026-05-03-A] : Norme 'Glass-Contrast' (Lisibilité sur Glassmorphism)
- **Le Problème :** Textes gris (`slate-500`) ou rouges sombres (`#A72422`) illisibles sur fond flou (effet "washed out").
- **Cause Racine :** Le flou gaussien et la saturation variable de l'arrière-plan absorbent les couleurs sombres peu contrastées.
- **La Solution :** 
  1. Remplacer `slate-500` par `text-white/70` ou `text-white/80` (le blanc "brille" à travers le flou).
  2. Forcer les titres en blanc pur avec `drop-shadow-xl`.
  3. Pour les états actifs "Urgents", abandonner le fond clair opaque pour un fond de couleur vive translucide (`bg-red-600/30`) avec texte blanc.
- **Règle d'Or (UI Premium) :** Sur un fond Glassmorphism, la lisibilité se gagne par l'opacité du blanc et la force des ombres portées, jamais par des couleurs sombres.
### [PSA-2026-05-04-A] : Conformité Légale & RGPD Dynamique
- **Le Concept :** Centralisation totale des informations juridiques (SIRET, Adresse, Gérant) dans le système de paramètres pour garantir une mise en conformité "zéro-code" pour l'administrateur.
- **Implémentation Technique :** 
  1. Création de `LegalNotices.jsx` et `PrivacyPolicy.jsx` utilisant exclusivement `api.getSettings()`.
  2. Injection du SIRET dynamique dans le `Footer.jsx` avec liens de navigation explicites.
  3. Intégration d'un verrou de consentement obligatoire (`checkbox`) dans le `FormWizard.jsx`.
- **Règle d'Or (Conformité) :** Toute collecte de données personnelles (Formulaire) DOIT être précédée d'une case à cocher explicite non-précochée, liée à une politique de confidentialité accessible en un clic. L'adresse physique doit être paramétrable pour refléter la réalité juridique de l'entreprise sans intervention technique.

### [PSA-2026-05-04-B] : Pattern d'Analyse Temporelle (Recharts & Framer)
- **Le Concept :** Pour représenter des volumes d'activité (Analytics) complexes sans surcharger l'UI, combiner le "Drill-Down" (Zoom conditionnel) et des filtres de granularité temporelle.
- **Implémentation Technique :**
  1. **Mock Dynamique** : Utiliser un `useMemo` couplé à un état `timeRange` (`day`, `week`, `month`, `year`) pour ajuster à la volée le nombre de points générés sur l'axe X.
  2. **Recharts SVG** : Emballer `AreaChart` dans un `ResponsiveContainer` (100% de largeur) pour garantir la fluidité mobile. Utiliser les balises `<defs>` et `<linearGradient>` pour l'effet premium de courbes lumineuses descendantes.
  3. **État Conditionnel** : Rendre différentes balises `<Area>` en fonction d'un état `viewMode` (Macro vs Micro).
- **Règle d'Or (BI) :** Ne jamais figer une vue analytique sur une seule granularité. Un tableau de bord premium doit permettre à l'utilisateur de "zoomer" visuellement et "zoomer" chronologiquement de façon autonome et instantanée.

### [PSA-2026-05-04-C] : Pattern de Recherche Sans Friction (UX Search Reset)
- **Le Concept :** Dans une interface complexe disposant de filtres de catégories ET d'une barre de recherche, la recherche doit toujours être prioritaire et inclusive.
- **Le Problème :** Un utilisateur filtre sur "Désinfection", puis cherche un client "Jean" qui est en réalité dans "Nuisibles". La recherche renvoie 0 résultat, causant de la frustration.
- **La Solution :** Connecter la barre de recherche à un reset automatique des filtres de catégorie.
- **Implémentation :** 
  ```javascript
  useEffect(() => {
    if (searchQuery.trim() !== "") setCategoryFilter('all');
  }, [searchQuery]);
  ```
- **Règle d'Or (UX Admin) :** La recherche est une intention globale. Toute saisie dans le champ de recherche doit "libérer" les filtres de catégories pour scanner l'intégralité de la base de données.



### [PSA-2026-05-06-A] : Standardisation Industrielle pour Duplication Client
- **Le Concept :** Transformer le projet ESEND en un "BluePrint" (modèle) capable d'être déployé pour n'importe quel nouveau client en moins d'une heure.
- **Architecture de Déploiement :**
  1. **Multi-Environnements** : Utilisation systématique de branches `main` (Prod) et `test` (Recette) avec des workflows GitHub Actions distincts.
  2. **Isolation de Configuration** : Le fichier `api/config.php` doit TOUJOURS être exclu de Git pour permettre des réglages DB locaux sans collision.
  3. **Schéma Unifié** : Utilisation d'un `schema_prod.sql` exhaustif regroupant toutes les versions (V1 à V5) pour une initialisation instantanée.
- **Règle d'Or (Gouvernance) :** La rapidité ne doit jamais primer sur la stabilité. Un build cassé en production est plus coûteux qu'un déploiement différé de 5 minutes. **Le build local (`npm run build`) est désormais OBLIGATOIRE avant tout commit.**

### [PSA-2026-05-08-B] : Blindage de Sécurité API & Session
- **Le Problème :** APIs administratives (`leads.php`, `articles_v3.php`) accessibles sans authentification côté serveur.
- **Cause Racine :** Authentification purement frontend (localStorage) sans vérification de session PHP.
- **La Solution :**
  1. Implémentation de `auth_check.php` (Middleware session).
  2. Protection systématique des méthodes `POST`, `PUT`, `DELETE` et des données sensibles (`leads`).
  3. Durcissement du `.htaccess` (Options -Indexes, en-têtes de sécurité et `php_flag engine off` dans `/uploads/`).
  4. Désinfection profonde des images via re-génération PHP GD pour neutraliser la stéganographie.
- **Règle d'Or (Sécurité) :** NE JAMAIS faire confiance au client (Navigateur). Chaque appel à une donnée sensible DOIT être validé par le serveur via une session active.


### 🧩 BLUEPRINT FONCTIONNEL (État Réel du Projet)
*Ceci est la source de vérité pour éviter toute erreur de connaissance.*

- **IA & Marketing Advisor (LIVE)** :
  - `src/components/Admin/MarketAdvisor.jsx` : Analyse des tendances Google Trends (Apify).
  - `src/components/Admin/CreationStudio.jsx` : Studio de rédaction IA (Gemini) avec Parcours Manuel (01-02-03) et Magie Totale.
  - `AIService.js` : Moteur de génération HTML, SEO et suggestions d'illustrations.
  - `localStorage` : Persistance des sujets (`esend_ai_topics_v1`).
- **Dashboard & BI (LIVE)** :
  - `AnalyticsTab.jsx` : Graphiques Recharts avec Drill-Down (Macro/Micro).
  - `LeadManager.jsx` : Système CRM avec filtres de pôle (Nuisibles, Désinfection, Nettoyage) et recherche globale.
- **Sécurité (LIVE)** :
  - Argon2id pour les mots de passe.
  - `config.php` généré par GitHub Secrets (Zéro identifiant en clair).
  - `BrowserRouter` avec `.htaccess` pour les URLs propres (SEO).
- **SEO & SEO Local (LIVE)** :
  - Composant `SEO.jsx` dynamique sur toutes les pages.
  - Schémas JSON-LD LocalBusiness et Service.

### [PSA-2026-05-06-B] : Harmonisation des Animations de Score (Composant Global)
- **Le Concept :** Utiliser un composant unique `AnimatedNumber` pour garantir une expérience visuelle identique entre le Hero (score statique au chargement) et les sections de contenu (score animé au scroll).
- **Architecture Technique :**
  - **Déclenchement Hybride :** Utilisation de la prop `triggerOnMount` pour le Hero et de `IntersectionObserver` pour les autres sections.
  - **Stabilité Mobile :** Encapsulation dans un conteneur `flex items-baseline whitespace-nowrap` pour éviter tout décalage du suffixe "/5".
  - **Moteur :** Basé sur `framer-motion` avec un effet `spring` (ressort) pour un rendu premium.
- **Règle d'Or (UI) :** Un score de satisfaction (ex: 4.9/5) ne doit jamais être un simple texte statique ; l'animation renforce la perception de "preuve sociale" dynamique.

### [PSA-2026-05-08-A] : Gouvernance CI/CD & Sécurisation du Pipeline
- **Le Problème :** Échec du build de production dû à une erreur de syntaxe (balise non fermée) et violation du workflow de test.
- **Cause Racine :** Absence de vérification locale (build) et push direct sur la branche `main` sans validation préalable sur `test`.
- **Le Protocole Obligatoire (Checklist de Commit) :**
  1. **Build Local :** Exécuter impérativement `npm run build` localement. Si le build échoue, le commit est INTERDIT.
  2. **Workflow Linéaire :** Toute modification doit d'abord être poussée sur la branche `test`.
  3. **Validation Recette :** Vérifier le rendu sur l'environnement de test.
  4. **Mise en Production :** Le merge sur `main` ne se fait QU'APRÈS succès des étapes 1, 2 et 3.
- **Règle d'Or (Gouvernance) :** La rapidité ne doit jamais primer sur la stabilité. Un build cassé en production est plus coûteux qu'un déploiement différé de 5 minutes.

### [PSA-2026-05-13-A] : Accélération Indexation (Soumission Manuelle Sitemap)
- **Le Contexte :** Après une correction technique majeure (ex: suppression de canoniques erronées), attendre le passage naturel de Googlebot peut prendre des semaines.
- **La Solution :** Ne pas se fier uniquement à la déclaration dans `robots.txt`.
- **Le Protocole :**
  1. Accéder à la **Google Search Console**.
  2. Onglet **Indexation > Sitemaps**.
  3. Soumettre manuellement l'URL : `https://esendnuisibles.fr/sitemap.xml`.

### [PSA-2026-05-13-B] : Automatisation WebP & Performance
- **Optimisation Images** : Migration de l'intégralité des assets de `public/images` vers le format WebP via un script automatisé (`sharp`).
- **Résultats critiques** : 
    - `menton-contact.jpg` (9.8MB) -> `menton-contact.webp` (3.5MB).
    - `hero-menton-v2.png` (2.5MB) -> `hero-menton-v2.webp` (0.15MB) - Gain de 93%.
- **Admin Automation** : L'interface d'administration (`ArticleModal` et `ProjectModal`) est désormais configurée pour convertir automatiquement toute image téléversée en WebP (client-side) avant l'envoi au serveur. Cela garantit une performance constante sans effort pour l'utilisateur.
- **Correctif Critique** : Résolution d'une `ReferenceError: useSettings is not defined` sur la page d'accueil causée par un import manquant lors de la refonte du schéma SEO.
- **Nettoyage** : Suppression des anciens fichiers PNG/JPG pour alléger le dépôt Git.
- **Règle d'Or (Performance & Stabilité)** : 
    1. Ne jamais utiliser de format JPG/PNG pour les assets statiques lourds. Toujours privilégier le WebP (qualité 80%).
    2. **BUILD LOCAL OBLIGATOIRE** (`npm run build`) avant tout push pour intercepter les erreurs de compilation et de runtime (JSX/Context).

### [PSA-2026-05-13-C] : Code Splitting & Optimisation Bundle (Lighthouse Green)
- **Le Problème** : Bundle JS monolithique de **1,367 KB** (393 KB gzip) contenant l'intégralité du code (Admin Dashboard, Recharts, react-quill, etc.) chargé pour un simple visiteur. Résultat : FCP Mobile = 4.2s, LCP = 5.1s.
- **La Solution** :
  1. **React.lazy() + Suspense** : Toutes les pages sauf `Home` sont désormais lazy-loaded. Les pages Admin (Dashboard 65KB, Login 5KB) ne sont chargées qu'en cas de navigation vers `/admin/*`.
  2. **Vite ManualChunks** : Séparation explicite des dépendances en chunks indépendants : `vendor-react` (179KB), `vendor-motion` (128KB), `vendor-icons` (38KB), `vendor-charts` (345KB, admin only), `vendor-editor` (238KB, admin only).
  3. **Font Loading Non-Bloquant** : Migration de `<link rel="stylesheet">` vers `<link rel="preload" as="style">` avec fallback `<noscript>`. Réduction des poids demandés (suppression des graisses 400/500 inutilisées dans Outfit).
  4. **Image LCP** : Ajout de `width="1920" height="1080" decoding="async"` sur l'image Hero pour éliminer le Layout Shift (CLS).
  5. **Console.log Cleanup** : Suppression de tous les `console.log` de debug des composants publics (`AnimatedNumber`, `useTheme`).
- **Résultats du Build** :
    - Bundle initial (Page d'accueil) : **1,367 KB → 157 KB** (gain de **-88%**)
    - CSS initial : **162 KB → 110 KB** (gain de **-32%**)
    - Admin CSS isolé dans son propre chunk (52 KB, non chargé sur le site public)
- **Règle d'Or (Performance)** :
    1. **INTERDICTION** d'importer statiquement un composant Admin dans `App.jsx`. Toujours utiliser `React.lazy()`.
    2. Toute nouvelle page doit être ajoutée en `lazy()` dans `App.jsx`, sauf si elle fait partie de la landing page critique.
    3. Toute nouvelle dépendance lourde (>50KB) doit être ajoutée dans `manualChunks` de `vite.config.js`.

### [PSA-2026-05-13-D] : Performance Élite (SSR-Lite & Deferred Rendering)
- **Objectif** : Atteindre un LCP < 200ms sur mobile pour garantir un score Lighthouse Elite.
- **Stratégie "SSR-Lite"** : 
  1. Injection d'un **Placeholder HTML statique** dans `index.html` (hors du root React). Ce bloc simule visuellement le Hero section pendant que le JavaScript (157KB) se télécharge.
  2. **Hydratation Silencieuse** : Une fois React prêt, une transition CSS douce (`opacity: 0` -> `1`) bascule l'utilisateur sur l'application réelle sans aucun scintillement (FOUC).
- **Technique "Deferred Rendering"** :
  1. Utilisation du composant `<DeferredSection />` couplé à `content-visibility: auto`.
  2. Les sections gourmandes en CPU (FAQ, Mythes, Interventions) situées sous la ligne de flottaison (below-the-fold) ne sont rendues par le navigateur que lorsqu'elles approchent du viewport. Cela réduit le temps de blocage du thread principal de **~180ms**.
- **Mise en Cache Agressive** : Configuration du `.htaccess` pour une expiration à **1 an** sur tous les assets versionnés (JS/CSS), maximisant la vitesse lors des visites récurrentes.

### [PSA-2026-05-13-E] : UI Premium - Gooey Button (Fountain Effect)
- **L'Innovation** : Remplacement du CTA Hero classique par un bouton à effet "liquide" organique.
- **Physique de l'Animation** :
  1. **Densité** : Utilisation de **30 bulles** (au lieu de 10) pour garantir une couverture totale sur les boutons larges.
  2. **Gooey Filter** : Filtre SVG `feGaussianBlur` (stdDeviation: 5) + `feColorMatrix` appliqué directement sur le bouton.
  3. **Trajectoire Fountain** : Keyframes optimisées (`0% -> 95% -> 100%`) où les bulles s'effacent à l'apogée avant de reset invisiblement. Cela évite l'effet de "redescente" et crée un flux ascendant continu.
- **Règle d'Intégrité UI** : Ne JAMAIS appliquer de `box-shadow` ou de `border` sur un élément utilisant le filtre Gooey, car le filtre déformerait les ombres et créerait des artefacts visuels grisâtres ("Dirty Glow").


### [PSA-2026-05-13-F] : 3D Immersive (Liquid Glass) & Gestion des Ressources
- **Concept** : Utilisation d'un shader de réfraction (métaballes) pour symboliser la pureté de l'eau sur la page Nettoyage.
- **Optimisation Bundle** : 
  - `three.js` est isolé dans le chunk `vendor-three` (492KB) via `manualChunks`.
  - Ce chunk n'est téléchargé que lors de l'accès à `CleaningPage` grâce au lazy loading de React Router.
- **Optimisation Runtime** : 
  - Utilisation d'un **IntersectionObserver** dans `LiquidGlass.jsx` pour mettre l'animation en pause (`cancelAnimationFrame`) dès que le composant n'est plus visible.
  - Réduction de la densité de métaballes sur mobile (MAX_DROPLETS = 15 au lieu de 30) pour préserver les performances GPU.
- **Règle d'Intégrité** : Le contenu textuel réfracté doit être dessiné sur un canvas interne (`drawBackground`) pour garantir que la réfraction s'adapte dynamiquement à la taille de l'écran et aux changements de props.

### [PSA-2026-05-13-G] : Arbitrage Liquid Glass & Lisibilité (Vitre Embuée)
- **Le Problème** : Tentative d'implémentation d'un effet "Vitre Embuée" (Option 1) via un flou de fond (`backdrop-filter: blur`).
- **Résultat de l'Audit** : Bien que visuellement thématique, le flou rendait les textes critiques du site illisibles et dégradait l'expérience utilisateur globale.
- **Décision Critique** : Suppression définitive du flou de fond. Conservation de la couche Liquid Glass en mode **"Crystal Clear"** (100% transparent).
- **Standard d'Interaction** : Toute animation de premier plan (`z-index` élevé) doit rester subtile. L'ajout du clic global (`window listener`) permet l'interactivité sans sacrifier la clarté du contenu.

### [PSA-2026-05-13-H] : Navigation par Ancres & Content-Visibility
- **Le Problème** : Les calculs manuels de scroll (`getBoundingClientRect`) échouaient lors du ciblage des sections proches des `DeferredSections`. Les décalages de mise en page causés par `content-visibility: auto` faussaient la position finale.
- **Solution Technique** : Passage au défilement natif via `target.scrollIntoView({ behavior: 'smooth', block: 'start' })`.
- **Compensation Header** : Utilisation de la propriété CSS `scroll-margin-top: 120px` sur les cibles d'ancrage. Le navigateur gère désormais nativement le "déverrouillage" du contenu différé et l'offset du header fixe, garantissant un atterrissage précis sur le titre "DEMANDER UNE INTERVENTION".

### [PSA-2026-05-13-I] : Refonte Layout Admin (Priorité Gauche & Alignement Actions)
- **Le Concept** : Optimiser l'efficacité visuelle de l'interface d'administration en ancrant les informations de statut à gauche et les actions (Recherche, Création) à droite.
- **Défis Techniques & Solutions** :
  1. **Conflit de Breakpoints** : L'utilisation de `xl:flex-row` maintenait l'affichage centré sur les écrans standards (13-15 pouces). Passage à `lg:!flex-row` (1024px) avec forçage de priorité via `!` (important) pour garantir le basculement.
  2. **Ancrage Strict** : Utilisation de `items-start` et `text-left` pour empêcher le centrage automatique en mode colonne (mobile).
  3. **Stabilité au Focus** : La barre de recherche augmentait sa largeur au focus (`300px -> 350px`), provoquant un chevauchement avec le bouton "Nouvel Article". Suppression de cette animation de largeur au profit d'un effet d'ombre (`box-shadow`) subtil.
  4. **Incompressibilité** : Ajout de `shrink-0` sur les boutons d'action pour prévenir toute déformation ou superposition par les éléments voisins.
- **Règle d'Or (Admin UI)** : L'interface d'administration doit être "prévisible". Les éléments de navigation et d'action doivent avoir des positions fixes et des dimensions stables pour favoriser la mémoire musculaire de l'utilisateur.
