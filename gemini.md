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

## 📌 Rappels Techniques pour Gemini
- **CSS** : Utiliser impérativement `!important` et les préfixes `-webkit` pour le glassmorphism en production.
- **FormWizard** : Toujours vérifier l'équilibre des balises dans les rendus conditionnels complexes.
- **SEO** : Maillage interne via les URLs des pages expertes au lieu de protocoles techniques.
- **Images** : Les assets réels (rat.png, punaise.png) sont prioritaires pour les illustrations du wizard.

---
*Documentation mise à jour le 02 Mai 2026 par Antigravity.*
