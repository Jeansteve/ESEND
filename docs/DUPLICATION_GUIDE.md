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

### Étape 2 : Configuration GitHub Secrets
Dans les paramètres du dépôt GitHub, ajouter les secrets suivants pour chaque environnement :
- `FTP_PROD_SERVER`, `FTP_PROD_USERNAME`, `FTP_PROD_PASSWORD`
- `FTP_TEST_SERVER`, `FTP_TEST_USERNAME`, `FTP_TEST_PASSWORD`

### Étape 3 : Initialisation de la Base de Données
1. Créer une nouvelle base MySQL sur Hostinger (ex: `u123_client_prod`).
2. Importer le fichier `database/schema_prod.sql`.
3. L'utilisateur admin par défaut est `admin@esend.fr` / `admin`.

### Étape 4 : Configuration Manuelle de l'API
Sur le serveur (via FTP ou File Manager Hostinger), éditer le fichier `public/api/config.php` (qui est exclu de Git) :
```php
$host = 'localhost';
$db   = 'u123_client_prod';
$user = 'u123_client_user';
$pass = 'votre_mot_de_passe';
```

## 🎨 3. Personnalisation Client
1. **Logo** : Remplacer `public/images/logo-esend.jpg`.
2. **SEO** : Mettre à jour les balises dans `index.html` (Title, Description).
3. **Paramètres** : Se connecter à l'admin et renseigner les infos dans l'onglet **Paramètres** (SIRET, Téléphone, Adresse, Clé Gemini).

## 🧩 4. Points d'Attention UI (Failsafe)
- **Sticky Menus** : Ne jamais utiliser `overflow-x: hidden` sur `html/body`. Toujours utiliser `overflow-x: clip` pour préserver le comportement collant des menus.
- **Header Clearance** : Vérifier que le `pt-24` ou `pt-32` des pages de contenu est suffisant pour passer sous le header du nouveau client.

## 🛡️ 4. Maintenance & Sécurité
- Supprimer tout fichier de migration après usage.
- S'assurer que le fichier `.htaccess` est bien présent dans `public/uploads/` pour interdire l'exécution de scripts.

---
**Note :** Ce process garantit que chaque instance client est isolée, sécurisée et performante.
