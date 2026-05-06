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
    - *Règle d'or : Interdiction formelle de pousser sur main sans passage par la branche test.*

---
*Documentation mise à jour le 06 Mai 2026 par Antigravity.*
