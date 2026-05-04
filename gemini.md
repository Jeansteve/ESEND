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

### 3. Optimisation de la Lisibilité (Norme Glass-Contrast)
- **Problème** : Textes gris et rouges sombres illisibles sur le fond Menton flouté.
- **Correction** : Uniformisation du Wizard. Utilisation systématique de blanc opacifié (`text-white/70`) et de titres blancs avec ombres portées puissantes (`drop-shadow-xl`). Refonte de la carte "Urgente" pour un contraste maximal.
- **Impact** : Expérience utilisateur plus fluide, réduction de la fatigue visuelle et amélioration du taux de conversion sur mobile.

## ⚖️ 6. Mise en Conformité Légale & RGPD (Mai 2026)
L'application est désormais alignée sur les obligations légales françaises (RGPD/LCEN) :
- **Pages Légales Dynamiques** : Création de `/mentions-legales` et `/politique-confidentialite`. Ces pages consomment les données de `api.getSettings()`, permettant à l'admin de modifier son SIRET ou son adresse sans toucher au code.
- **Validation RGPD** : Ajout d'un consentement obligatoire dans le `FormWizard`. Le lead n'est pas créé tant que la politique de confidentialité n'est pas acceptée.
- **Footer Juridique** : Affichage permanent du SIRET dynamique et liens légaux avec mécanisme de "Scroll to Top" forcé pour éviter les confusions de navigation.

## 📌 Rappels Techniques pour Gemini
[...]
- **Images** : Les assets réels (rat.png, punaise.png) sont prioritaires pour les illustrations du wizard.
- **Conformité** : Toujours utiliser `Link` avec un `onClick` de scroll pour les pages légales situées en bas de page.

---
*Documentation mise à jour le 04 Mai 2026 par Antigravity.*
