# 🏗️ Guide de Duplication Industrielle — Système ESEND v2.0

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
| `FTP_SERVER` / `FTP_USER` / `FTP_PASS` | Connexion au serveur Hostinger. |
| `DB_HOST` / `DB_NAME` / `DB_USER` / `DB_PASS` | Accès à la base MySQL (utilisé par `config.template.php`). |
| `SMTP_USER` / `SMTP_PASSWORD` | Identifiants du compte `contact@client.fr` pour les envois du site. |
| `VITE_GA_MEASUREMENT_ID` | Code Google Analytics (injecté au build). |

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
- **Glassmorphism** : Pour Hostinger, utilisez toujours les classes `.glass-panel` pour assurer la compatibilité Safari/iOS.
- **Performance** : Toutes les nouvelles images doivent être en **WebP**.

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
**Mainteneur :** Pôle IA ESEND — *Dernière MAJ : 13 Mai 2026*
