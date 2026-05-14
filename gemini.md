# Projet ESEND — Documentation de Suivi Gemini

## 🎯 Objectif Principal
Transformer le site **ESEND** en une plateforme d'expertise multiservices (Nuisibles, Désinfection, Nettoyage) avec une interface utilisateur premium ("Frozen Night"), un système de devis intelligent (FormWizard) et un outil de Business Intelligence assisté par IA (Market Advisor & Studio de Création).

## 📜 Historique des Demandes & Étapes Clés
1. **Refonte UI/UX** : Passage au design "Frozen Night" avec glassmorphism et animations Framer Motion.
2. **FormWizard 2.0** : Intégration du système de devis avec sélection de nuisibles, téléchargement de photos (compression client-side) et validation stricte.
3. **Admin Dashboard** : Création d'un espace de gestion des leads (Mini-CRM) et d'un gestionnaire d'articles de blog.
4. **Hubs d'Expertise** : Standardisation des pages services en hubs encyclopédiques.
5. **Business Intelligence** : Intégration de Google Trends et de Gemini pour le radar à sujets et l'aide à la rédaction.

## 🛠 Dernières Corrections (Mai 2024) - Stabilisation Build
Les interventions récentes ont porté sur la résolution de bugs critiques bloquant le déploiement en production :

### 1. Correction du Nesting JSX (Balise P Orpheline)
- **Fichier** : `src/components/FormWizard/FormWizard.jsx`
- **Correction** : Fermeture d'une balise `<p>` mal fermée dans l'étape `urgency`.
- **Impact** : Résolution de l'erreur `Unexpected closing "motion.div" tag does not match opening "p" tag`.

### 2. Correction Structurelle DOM (Balise Div Orpheline)
- **Fichier** : `src/components/FormWizard/FormWizard.jsx`
- **Correction** : Ajout d'une fermeture `</div>` après le textarea de l'étape `details`.
- **Impact** : Résolution de l'erreur `Unexpected closing "motion.div" tag does not match opening "div" tag`. Stabilisation du pipeline GitHub Actions.

### 3. Optimisation de la Lisibilité & Portfolio
- **Portfolio** : Implémentation d'un `EmptyState` premium pour les archives vides. Suppression du bouton CTA sur cet état pour un rendu minimaliste.
- **Wizard** : Ajout d'un système de navigation rapide ("Suivant →") et d'une reprise intelligente ("Reprendre l'estimation") pour améliorer l'UX lors des retours en arrière.
- **Journal/KnowledgeHub** : Masquage automatique des boutons d'exploration si aucun article n'est présent pour éviter les redirections vides.
- **Sticky Permanent** : Résolution du conflit `overflow-x` par l'usage de `clip` au lieu de `hidden` sur les conteneurs racines (`html`, `body`, `#root`), permettant au sélecteur de nuisibles de rester fixe tout au long du défilement.
- **Contraste** : Utilisation de blanc opacifié (`text-white/70`) et de titres blancs avec ombres portées puissantes (`drop-shadow-xl`) sur les fonds glassmorphism.

## ⚖️ 6. Mise en Conformité Légale & RGPD (Mai 2026)
L'application est désormais alignée sur les obligations légales françaises (RGPD/LCEN) :
- **Pages Légales Dynamiques** : Création de `/mentions-legales` et `/politique-confidentialite`. Ces pages consomment les données de `api.getSettings()`, permettant à l'admin de modifier son SIRET ou son adresse sans toucher au code.
- **Validation RGPD** : Ajout d'un consentement obligatoire dans le `FormWizard`. Le lead n'est pas créé tant que la politique de confidentialité n'est pas acceptée.
- **Footer Juridique** : Affichage permanent du SIRET dynamique et liens légaux avec mécanisme de "Scroll to Top" forcé pour éviter les confusions de navigation.

## 📌 Rappels Techniques pour Gemini
[...]
- **Images** : Les assets réels (rat.png, punaise.png) sont prioritaires pour les illustrations du wizard.
- **Conformité** : Toujours utiliser `Link` avec un `onClick` de scroll pour les pages légales situées en bas de page.
- **Analytics** : Pour la visualisation de données, toujours privilégier `Recharts` avec des `<linearGradient>` pour un aspect moderne.
- **BI Temporelle** : Toujours offrir plusieurs niveaux de granularité (ex: Jour, Semaine, Mois, Année) pour éviter des tableaux de bord figés.
- **UX Search** : Toute interface de liste (CRM, Portfolio) doit réinitialiser ses filtres de catégorie au profit de la recherche dès que l'utilisateur saisit une requête dans la barre globale.

- **Déploiement Sécurisé (Workflow Impératif)** : 
    - **ÉTAPE 1** : Pousser les modifications sur la branche `test`.
    - **ÉTAPE 2** : Valider les changements sur `site-test.esendnuisibles.fr`.
    - **ÉTAPE 3** : Pousser sur `main` UNIQUEMENT après validation explicite du client.
    - **ÉTAPE 4 (Release)** : Incrémenter la version dans `package.json` (SemVer) et créer un Tag Git correspondant pour chaque livraison de fonctionnalité ou polissage majeur.
    - *Règle d'or : Toute modification poussée sur main doit faire l'objet d'une montée de version et d'un tag unique.*

## 🚀 7. SEO Sémantique & Blindage Sécurité (Mai 2026)
L'optimisation pour les moteurs de recherche et la sécurité ont été portées à un niveau professionnel :
- **JSON-LD Dynamique** : Implémentation massive de schémas `Schema.org`.
    - `FAQPage` : Injecté sur toutes les pages de services (`PestPage`, `DisinfectionPage`, `CleaningPage`) pour un affichage enrichi dans Google.
    - `BreadcrumbList` : Déploiement systématique sur l'ensemble du site pour clarifier la hiérarchie et améliorer le "Link Juice".
    - `Article` : Optimisation du schéma pour le Journal de l'Expert.
    - `LocalBusiness` : Centralisation sur la page d'accueil avec géolocalisation précise.
- **Accessibilité & Image SEO** : Audit complet des balises `alt`. Optimisation des descriptions pour les images du Hero et de la section À Propos.
- **Blindage .htaccess** : 
    - Configuration d'une **Content Security Policy (CSP)** robuste pour prévenir les injections.
    - Activation du **HSTS** (Strict-Transport-Security) avec `preload`.
    - Blocage strict de l'accès aux fichiers sensibles (`.env`, `.git`, `composer.*`).
    - Headers de protection contre le XSS, le reniflage de MIME (`nosniff`) et les attaques de clickjacking.

## 🖼 8. Automatisation WebP & Performance (Mai 2026)
Migration vers un standard de performance "Ultra-Fast" :
- **Conversion Statique** : Toutes les images de `public/images` ont été migrées vers le format `.webp` avec suppression automatique des originaux JPG/PNG.
- **Script CLI** : Ajout de `npm run optimize-images` pour automatiser la conversion des futurs assets.
- **Admin Automation** : Les modules `ArticleModal` et `ProjectModal` convertissent désormais systématiquement les images côté client en WebP avant l'upload.
- **FormWizard** : Les photos transmises par les clients via le formulaire de devis sont également converties en WebP, réduisant la consommation de bande passante et d'espace serveur.

## ⚡ 9. Sprint Performance : LCP & FCP Boost (Mai 2026)
Optimisation ciblée pour atteindre les scores "Verts" sur Lighthouse :
- **LCP Optimization** : Préchargement (preload) de l'image de fond du Hero avec `fetchpriority="high"` et `loading="eager"`.
- **FCP Optimization** : Vérification du `font-display: swap` sur les polices Google et ajout de preconnects.
- **Critical Path** : Priorisation des ressources critiques dans le `index.html` pour un affichage quasi instantané.

## 🚀 10. Performance Élite & UI Premium (Mai 2026)
L'objectif était d'atteindre des performances d'affichage de niveau "Elite" (LCP ~158ms) tout en intégrant une expérience visuelle haut de gamme.

### 1. Architecture "SSR-Lite" & Performance (Score LCP ~158ms, CLS 0)
- **Placeholder Statique** : Mise en place d'un placeholder HTML statique dans `index.html` (hors du root React) pour une peinture instantanée dès le chargement, éliminant le délai d'hydratation.
- **Deferred Rendering** : Implémentation du composant utilitaire `DeferredSection` utilisant `content-visibility: auto`. Toutes les sections "below-the-fold" (FAQ, Mythes, Interventions) sont désormais différées pour libérer le thread principal.
- **Cache Agressif (.htaccess)** : Extension de la mise en cache (ExpiresByType) à **1 an** pour les fichiers CSS et JS (basé sur le versionnage Vite/Content-Hashing).

### 2. Expérience Visuelle Premium (Gooey Button)
- **Gooey Button Effect** : Ajout d'un bouton CTA "liquide" (Gooey) sur la section Hero, basé sur un filtre SVG (`feGaussianBlur` + `feColorMatrix`).
- **Densité Organique** : Implémentation de 30 bulles indépendantes avec des trajectoires et vitesses aléatoires pour recréer un effet de "flammes ondulées" (Fountain Effect) même sur des boutons larges.
- **Optimisation Rendu** : Suppression des bordures et ombres portées interférant avec le filtre SVG pour garantir un rendu cristallin sans artefacts.

### 3. Expérience Visuelle Premium (Liquid Glass)
- **Liquid Glass - Nettoyage** : Intégration d'un moteur Three.js sur la page de service Nettoyage pour simuler des bulles d'eau cristallines en temps réel.
- **Effet Atmosphérique Subtil** : L'animation a été refondue pour agir comme un calque transparent global (`fixed inset-0`) au lieu d'un bloc localisé, offrant une immersion totale sans gêner la lecture.
- **Interaction Tactile Avancée** : Réimplémentation de la génération de bulles au clic/drag sur l'intégralité de l'écran via des écouteurs d'événements globaux (`window`).
- **Plafonnement des Performances & Design** : Limitation de la taille maximale des bulles (`0.08`) et réduction de leur vitesse pour un rendu zen et professionnel.
- **Arbitrage Foggy Glass (Option 1)** : Test d'un filtre de flou d'arrière-plan (`backdrop-filter`) pour simuler une vitre embuée, écarté au profit de la lisibilité totale du texte.
- **Architecture de Chunking** : Isolation de Three.js dans le chunk `vendor-three` (492KB) pour garantir que le moteur n'est téléchargé que lors de la navigation vers la page concernée.
- **Gestion Énergétique** : Utilisation d'un `IntersectionObserver` pour couper le moteur de rendu dès que le composant sort du viewport, préservant ainsi les ressources système.

---

## 🚀 11. Standardisation v2.6.1 & Blueprint Industriel (Mai 2026)
Finalisation du polissage UI/UX et stabilisation du pipeline de déploiement pour un passage en production immédiat.

### 1. Polissage Mobile Master (Universal Centering)
- **Harmonisation Services** : Alignement central systématique des titres, badges et descriptions sur mobile (`text-center md:text-left`) pour un rendu premium.
- **Fiche Biologique** : Centrage de l'image sticker et des textes descriptifs. Refonte de la "Note de l'Expert" (layout responsif et typographie affinée).
- **CTA de Fin de Page** : Miniaturisation des boutons et forçage de la typographie expert sur une seule ligne pour éviter les cassures visuelles.

### 2. Stabilisation & Résilience du Build
- **Correction des Collisions** : Résolution des erreurs de nommage de composants (`FlaskConical`) et des corruptions de balisage React.
- **Validation CI/CD** : Rétablissement du pipeline GitHub Actions après sécurisation de l'arborescence DOM.
- **Governance v2.6.0** : Implémentation du Semantic Versioning et des Git Tags pour une traçabilité industrielle des releases.

---

## 🚀 12. Correctif Critique Safari/iOS — Gooey Button (v2.6.11 — Mai 2026)
Résolution définitive du bug d'affichage sur iPhone où l'effet liquide ("gooey") plantait et affichait des bulles indépendantes à cause d'une incompatibilité du moteur WebKit avec les filtres SVG appliqués au DOM HTML.

### 1. Architecture 100% SVG (Zéro DOM HTML)
- **Migration Radicale** : Remplacement des `span` HTML par un composant générant des `<circle>` et un `<rect>` natifs SVG. Le filtre n'est plus appliqué au bouton HTML mais vit entièrement dans un écosystème vectoriel isolé.
- **Contournement Bug Safari** : En déplaçant la bave dans un composant d'arrière-plan pur SVG (z-index: 0) et le texte HTML par-dessus (z-index: 10), Safari gère parfaitement l'effet.

### 2. "Le Clone Parfait" — Physique des Fluides & Performance
- **Standardisation de la Fusion** : Ajustement du flou à `stdDeviation="5"` pour recréer l'aspect effilé et tranchant des flammes, évitant l'effet "gros bloc".
- **Suppression du Parasite Vectoriel** : Retrait volontaire de la balise `<feComposite operator="atop">` (qui recollait les ronds vectoriels nets par-dessus le fluide) pour obtenir une bave liquide pure de bout en bout.
- **Évaporation Organique** : Mise en place d'une réduction progressive d'échelle en fin de course (`scale` de 1 vers 0 sur l'axe Y) pour imiter la tension de surface d'une goutte qui s'évapore, supprimant les disparitions brutales (clipping) en sommet de flamme.
- **Rayon Affiné** : Diminution de la taille des gouttes (r=9) pour affiner la pointe des flammes.

---
## 🚀 13. Optimisation SEO & Correction de Positionnement (v2.6.15 — Mai 2026)
Nettoyage et fiabilisation des métadonnées pour aligner la présence Google avec la réalité métier d'ESEND.

### 1. Fiabilisation des Promesses
- **Suppression du délai fixe** : Retrait de la mention "Devis offert sous 2h" (jugée trop contraignante) au profit de **"Devis gratuit et rapide"**.
- **Correction Multiservices** : Réintégration systématique du pôle **Nettoyage** dans toutes les descriptions SEO et données structurées.
- **Véracité des données** : Suppression de la mention erronée "7j/7".

### 2. Recentrage Géographique (Hyper-Local)
- **Focus Menton/Monaco** : Suppression de Nice, Antibes et Cannes des balises meta et du schéma `LocalBusiness`.
- **Nouvelle Sémantique** : Utilisation de la locution **"Menton et ses environs (Monaco)"** pour maximiser la pertinence sur le secteur géographique prioritaire.
- **Synchronisation JSON-LD** : Mise à jour de la propriété `areaServed` pour limiter le périmètre officiel aux zones de Menton, Monaco et Roquebrune-Cap-Martin.

---
*Documentation mise à jour le 15 Mai 2026 par Antigravity.*
