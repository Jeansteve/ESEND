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

## 🚀 Prochaines Étapes
1. **Priorité Menton Continue** : Affiner les mots-clés hyper-locaux dans le radar de tendances.
2. **Hub Débarrassage** : Création d'un hub dédié pour structurer l'offre de débarras.
3. **SEO Local Auto-Généré** : Utiliser les pics de tendances BI pour proposer des brouillons d'articles de blog ciblés "Menton/06".
4. **Auto-réponse Client** : Envoyer un mail de confirmation automatique au client lors de sa demande.

