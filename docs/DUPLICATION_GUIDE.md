# Guide de Duplication Industrielle — Solution ESEND

Ce guide détaille la procédure pour dupliquer cette solution (Hubs Services + Blog IA + Dashboard Admin) pour un nouveau client en moins d'une heure.

---

## 🏗️ 1. Pré-requis
- Accès à un hébergement **Hostinger** (ou équivalent avec PHP/MySQL).
- Un dépôt **GitHub** pour le nouveau projet.
- La clé API **Google Gemini** (pour le rédacteur IA).

## 🚀 2. Procédure de Déploiement

### Étape 1 : Initialisation du Dépôt
1. Cloner le projet "Blueprint".
2. Nettoyer les ressources spécifiques (logos, textes dans `index.html`).
3. Créer deux branches : `main` (Production) et `test` (Recette).

### Étape 2 : Configuration GitHub Secrets (INDISPENSABLE)
Pour chaque environnement (Production et Test), vous devez renseigner les secrets suivants dans GitHub (**Settings > Secrets and variables > Actions**) :

#### 🌐 Accès FTP (Déploiement)
- `FTP_PROD_SERVER` / `FTP_TEST_SERVER` : IP du serveur (ex: `45.87.81.71`).
- `FTP_PROD_USERNAME` / `FTP_TEST_USERNAME` : Identifiant FTP Hostinger.
- `FTP_PROD_PASSWORD` / `FTP_TEST_PASSWORD` : Mot de passe FTP.

#### 🗄️ Base de Données (Auto-Configuration)
- `DB_PROD_HOST` / `DB_TEST_HOST` : Généralement `localhost`.
- `DB_PROD_NAME` / `DB_TEST_NAME` : Nom de la base MySQL.
- `DB_PROD_USER` / `DB_TEST_USER` : Utilisateur MySQL.
- `DB_PROD_PASS` / `DB_TEST_PASS` : Mot de passe MySQL.

#### 📊 Analytics & Marketing (Build)
- `VITE_GA_MEASUREMENT_ID` : ID Google Analytics (ex: `G-XXXXXX`).

#### 📧 Envoi d'Emails (SMTP Hostinger)
- `SMTP_USER` : L'adresse email complète (ex: `contact@client.fr`).
- `SMTP_PASSWORD` : Le mot de passe du compte email Hostinger.

### Étape 3 : Initialisation de la Base de Données & Sécurité
1.  Créer une nouvelle base MySQL sur Hostinger (ex : `u123_client_prod`).
2.  Importer le fichier `database/schema_prod.sql`. Ce schéma inclut les tables pour les Leads, Articles, Projets et Settings.
3.  **Vérification Sécurité** : Assurez-vous que PHP sur le serveur autorise les sessions (`session_start()`) pour le fonctionnement du middleware `auth_check.php`.
4.  L'utilisateur admin par défaut est `admin@esend.fr` / `ESENDAdmin2026!`. **À changer impérativement après la première connexion.**

### Étape 4 : Validation du Déploiement
Plus aucune configuration manuelle n'est requise sur le serveur. À chaque `git push`, GitHub Actions va :
1. Compiler le frontend.
2. Générer automatiquement le fichier `api/config.php` à partir de vos secrets et du modèle `api/config.template.php` (via `envsubst`).
3. Envoyer le tout sur Hostinger.

## 🎨 3. Personnalisation Client
1. **Logo** : Remplacer `public/images/logo-esend.jpg`.
2. **SEO** : Mettre à jour les balises dans `index.html` (Title, Description).
3. **Paramètres** : Se connecter à l'admin et renseigner les infos dans l'onglet **Paramètres** (SIRET, Téléphone, Adresse, Clé Gemini).

## 🧩 4. Points d'Attention UI (Failsafe)
- **Sticky Menus** : Ne jamais utiliser `overflow-x: hidden` sur `html/body`. Toujours utiliser `overflow-x: clip` pour préserver le comportement collant des menus.
- **Header Clearance** : Vérifier que le `pt-24` ou `pt-32` des pages de contenu est suffisant pour passer sous le header du nouveau client.

## 🛡️ 5. Maintenance & Sécurité
- S'assurer que le fichier `.htaccess` est bien présent dans `public/uploads/` pour interdire l'exécution de scripts.
- Le fichier `config.php` est géré automatiquement : ne jamais le modifier manuellement sur le serveur car il serait écrasé au prochain push.

---
**Note :** Ce process garantit que chaque instance client est isolée, sécurisée et performante.
