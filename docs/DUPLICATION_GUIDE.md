# 🏗️ Guide de Duplication Industrielle — Système ESEND v2.6.1

Ce guide est la "bible" pour cloner cette solution (Hub Services + Studio IA + Dashboard Admin) pour un nouveau client. Objectif : **Mise en service complète en moins de 60 minutes.**

---

## 🛠️ 1. Infrastructure & Pré-requis
- **Hébergement** : Hostinger (Recommandé) ou tout serveur Apache/PHP 8.1+.
- **Domaine** : HTTPS obligatoire (SSL Hostinger gratuit).
- **IA** : Une clé **Google Gemini API** (gratuite ou payante) pour le Studio de Rédaction.
- **Dépôt** : Un nouveau repo GitHub privé.

---

## 🚀 2. Workflow de Déploiement (Zéro Config Manuelle)

### Étape 1 : Secrets GitHub (Le Cœur du Système)
Renseignez ces variables dans **Settings > Secrets > Actions** pour automatiser le build et le déploiement :

| Secret | Utilité |
| :--- | :--- |
| `FTP_PROD_SERVER` / `FTP_TEST_SERVER` | IP du serveur Hostinger (ex: `45.87.81.71`). |
| `FTP_PROD_USERNAME` / `FTP_TEST_USERNAME` | Identifiant FTP Hostinger. |
| `FTP_PROD_PASSWORD` / `FTP_TEST_PASSWORD` | Mot de passe FTP. |
| `DB_PROD_HOST` / `DB_TEST_HOST` | Hôte MySQL (généralement `localhost`). |
| `DB_PROD_NAME` / `DB_TEST_NAME` | Nom de la base de données MySQL. |
| `DB_PROD_USER` / `DB_TEST_USER` | Utilisateur de la base de données. |
| `DB_PROD_PASS` / `DB_TEST_PASS` | Mot de passe de la base de données. |
| `SMTP_USER` | Email complet pour l'envoi (ex: `contact@client.fr`). |
| `SMTP_PASSWORD` | Mot de passe du compte email Hostinger. |
| `VITE_GA_MEASUREMENT_ID` | Code Google Analytics (ex: `G-XXXXXX`). |

### Étape 2 : Initialisation Data
1. **Base de Données** : Exécuter `database/schema_prod.sql`.
2. **Migrations SEO/Stats** : Appliquer systématiquement les fichiers `upgrade_*.sql` pour avoir les dernières fonctions de tracking.
3. **Compte Admin** : Login par défaut `admin@esend.fr` / `ESENDAdmin2026!`. *À changer immédiatement.*

---

## 🧠 3. Configuration du Studio IA (Gemini)
Le système est pré-câblé pour l'expertise métier (Nuisibles/Nettoyage).
1. Une fois dans l'Admin, allez dans l'onglet **Paramètres**.
2. Collez la clé **Gemini API**.
3. Le **Radar à Sujets** et l'**Assistant Rédaction** s'activent instantanément.

---

## 📱 4. Standards UI & UX (Failsafe)
Lors de la personnalisation visuelle, respectez ces règles pour ne pas casser le système :
- **Header Mobile (V26)** : La permutation entre le numéro de téléphone et le bouton Devis est gérée par le scroll et la route. Ne pas modifier la logique de `Header.jsx` sans tester le responsive.
- **Centrage Mobile (v2.6.1)** : Toutes les sections de services (Titres, Badges, Illustrations) doivent respecter l'alignement `text-center md:text-left` pour garantir un rendu premium sur smartphone.
- **Bouton Liquide (Gooey v2.6.11)** : Le CTA du Hero utilise une architecture 100% SVG. **Ne jamais** le reconvertir en éléments HTML (`div`/`span`) animés en CSS, car le moteur WebKit d'iOS (Safari) ne supporte pas le mélange des contextes d'empilement avec les filtres liquides.
- **Glassmorphism** : Pour Hostinger, utilisez toujours les classes `.glass-panel` pour assurer la compatibilité Safari/iOS.
- **Performance** : Toutes les nouvelles images doivent être en **WebP**.
- **Validation Build** : Toujours lancer `npm run build` localement avant toute MEP pour valider l'intégrité de l'arborescence React et éviter les "White Screens" en production.

---

## 📧 5. Livraison Client & Mail
C'est l'étape finale pour une expérience premium :
1. **Guide Mail** : Utilisez le fichier `docs/GUIDE_CONFIGURATION_MAIL.md`.
2. **PDF Personnalisé** : Exportez ce guide en PDF avec le logo du nouveau client.
3. **SMTP** : Testez un envoi de formulaire pour vérifier que le `Reply-To` fonctionne (le client doit pouvoir répondre directement aux prospects).

---

## 🧪 6. Tests & Mode Mock
Pour développer en local sans base de données :
- Le système détecte l'absence d'API et bascule en **Mock Mode (v2.4)**.
- Les articles et leads sont alors stockés dans le `localStorage` de votre navigateur.

---

## 🛡️ 7. Sécurité Critique
- **.htaccess** : Vérifiez qu'il est bien présent à la racine pour forcer le HTTPS et dans `public/uploads` pour interdire l'exécution de scripts PHP malveillants.
- **Logs** : Les erreurs d'envoi mail sont logguées dans `api/logs/` (dossier protégé).

---
**Mainteneur :** Pôle IA ESEND — *Dernière MAJ : 14 Mai 2026*

### 🏷️ 6. Gestion des Versions & Tags
Une fois le site déployé pour le nouveau client :
1. **Initialiser le Tag** : Créez un tag `v1.0.0` sur son propre dépôt pour marquer l'état initial.
2. **Suivi des Mises à jour** : Lorsque vous importez des nouveautés depuis le Blueprint ESEND Maître, incrémentez la version (ex: `v1.1.0`) pour savoir quelles fonctionnalités ont été livrées.
