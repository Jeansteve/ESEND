# 📖 Master Cahier des Charges : Plateforme ESEND V5
> **Version :** 5.0 (Mai 2026) — *Industrial Blueprint v2.6.15*  
> **Statut :** Document de Référence de l'Ecosystème  
> **Acteurs :** Steve (Owner), Antigravity (IA Architect)  
> **Tech Doc :** [TECHNICAL_DOCUMENTATION.md](TECHNICAL_DOCUMENTATION.md)

---

## 📑 Sommaire
1. [Vision & Positionnement](#1-vision--positionnement)
2. [Identité Visuelle & UX](#2-identité-visuelle--ux)
3. [Architecture Multi-Hubs](#3-architecture-multi-hubs)
4. [Tunnel de Conversion (FormWizard)](#4-tunnel-de-conversion-formwizard)
5. [Ecosystème Backend & API](#5-ecosystème-backend--api)
6. [Administration & Mini-CRM](#6-administration--mini-crm)
7. [SEO & Performance Élite](#7-seo--performance-élite)

---

## 1. Vision & Positionnement
ESEND est une plateforme multiservices d'expertise dans le traitement des nuisibles, la désinfection et le nettoyage de précision. Contrairement aux sites vitrines classiques, ESEND se positionne comme un **Assistant Digital Expert** alliant efficacité technique et esthétique premium (type Luxe/Pro).

### Objectifs Clés :
- **Conversion Haute Performance** : Transformer chaque visiteur en lead qualifié.
- **Transparence Expertise** : Éduquer le client via le "Journal de l'Expert".
- **Automatisation Administrative** : Réduire le temps de gestion des dossiers via le Mini-CRM.

---

## 2. Identité Visuelle & UX
L'interface utilise les codes du **Design UI Moderne** (Glassmorphism, animations fluides).

- **Code Couleur Maître** : Rouge ESEND (`#dc2626`) sur fonds sombres/propres.
- **Typographie** : Sans-serif grasse, majuscules pour les titres (impact maximal).
- **Composant `Reveal`** : Utilisation systématique de Framer Motion pour des entrées progressives.
- **Scores Dynamiques** : Utilisation du composant `AnimatedNumber` synchronisé au scroll.
- **Adaptive Header (V26)** : Intelligence de conversion qui remplace le téléphone par le bouton "DEVIS OFFERT" dès le scroll sur mobile pour maximiser le tunnel de conversion.
- **Gooey Button** : Utilisation d'animations fluides SVG pour les CTAs principaux.

---

## 3. Architecture Multi-Hubs
Le site est structuré en trois piliers verticaux :

### A. Hub Nuisibles (Pest Hub)
- **Cible** : Rats, Souris, Cafards, Punaises de lit, Puces, Guêpes, Fourmis.
- **Principe éthique** : Signalement clair que les Abeilles ne sont pas traitées (renvoi vers apiculteurs).
- **Structure des fiches** : Description, Risques, Traitement, FAQ spécifique et CTA dynamique.

### B. Hub Désinfection
- **Design** : Accents Cyan (`emerald/cyan`).
- **Focus** : Protocoles virucides, bio-sécurité, milieux sensibles.

### C. Hub Nettoyage de Précision
- **Design** : Accents Indigo (`indigo`).
- **Focus** : Vitrerie à l'eau pure, nettoyage haute performance, effet **Liquid Glass (WebGL)**.

---

## 4. Tunnel de Conversion (FormWizard)
Le formulaire de devis est le cœur battant du site. Il est conçu pour être **autonome**.

### Étapes du Tunnel :
1. **Besoin** : Sélection du service et du nuisible concerné.
2. **Détails** : "Placeholder" dynamique adapté au nuisible.
3. **Multimédia** : Dépôt de 3 photos maximum, compressées en temps réel (WebP).
4. **Localisation** : Code Postal et Ville avec validation.
5. **Contact** : Validation stricte du téléphone (FR) et type de client (Particulier/Pro).

---

## 5. Ecosystème Backend & API
### Technologie
- **Langage** : PHP 8+ (Hostinger).
- **Emailing** : SMTP Hostinger Authentifié (SSL Port 465) pour une délivrabilité maximale.
- **Base de Données** : MySQL (PDO).

### Logique de Suivi & Stockage (Solution Hybride Pro)
Chaque formulaire génère un **Tracking ID** unique : `ES-AAMM-NNN`. Les médias associés suivent une stratégie de classement intelligent :
- **Organisation Physique** : Stockage local structuré par métier sur le serveur.
- **Référencement BDD** : La base de données stocke le chemin relatif complet.
- **Sanitisation** : Les noms de dossiers sont automatiquement nettoyés.

---

## 6. Administration & Mini-CRM
L'administration permet un pilotage total sans connaissances techniques.

### modules Clés :
- **Journal Expert** : Studio de création avec IA (Gemini) pour rédiger des articles optimisés.
- **Réalisations** : Gestionnaire de projets terrain (avant/après).
- **LeadManager (CRM)** : Gestion des statuts et automatisation des rappels.
- **Analytics BI** : Visualisation des tendances (Macro/Micro) via Recharts.

---

## 7. SEO & Performance Élite
- **Vite Code Splitting** : Division du code en chunks (`vendor-three`, `vendor-charts`) pour un chargement initial ultra-rapide.
- **Image Compression** : Automatisation du format **WebP** à 80% sur tout le site.
- **Metadata Dynamique** : Tags SEO injectés via `SEO.jsx`.
- **Lighthouse Performance** : Objectif de score > 95 sur tous les indicateurs.

---

## 8. Sécurité & Protection des Données
La plateforme ESEND applique des protocoles de sécurité de niveau industriel :
- **Hachage des Mots de Passe** : Utilisation exclusive d'**Argon2id**.
- **Protection API** : Middleware de session PHP (`auth_check.php`) sur chaque route sensible.
- **Conformité RGPD** : Verrouillage par consentement explicite et politique de transparence.

---

## 9. Standardisation & Déploiement Industriel
Le projet est conçu comme un **BluePrint** reproductible.
- **CI/CD** : Automatisation via GitHub Actions (PROD/TEST).
- **Duplication** : Guide de duplication complet (`DUPLICATION_GUIDE.md`) permettant un setup client en < 1 heure.

---

## 10. Business Intelligence & IA Strategy
Le Dashboard ESEND intègre un moteur de **Market Intelligence**.

### Composants Clés :
- **Market Strategy Advisor** : Analyseur de tendances en temps réel (via Apify) focalisé sur le bassin de Menton et de la Riviera (06).
- **Aide à la Décision IA** : Utilisation de modèles de langage (Gemini) pour transformer les pics de recherche Google Trends en recommandations concrètes.

---

> **Note de l'IA Architect :** Ce document est le garant de la cohérence de l'écosystème ESEND. Toute modification structurelle doit y être consignée.
ect :** Ce document est le garant de la cohérence de l'écosystème ESEND. Toute modification structurelle doit y être consignée.
