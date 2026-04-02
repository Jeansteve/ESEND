# Guide d'Installation Backend - Hostinger ESEND
**Spécialiste : chef-de-projet-ia / developpeur-back-end-ops**

Ce guide détaille les étapes pour activer la base de données réelle sur votre hébergement Hostinger.

## 1. Préparation de la Base de Données
1. Connectez-vous à votre **hPanel Hostinger**.
2. Allez dans **Bases de données MySQL**.
3. Créez une nouvelle base de données (ex: `uXXXXX_esend_db`) et un utilisateur.
4. Notez précieusement les informations :
   - Hôte (souvent `localhost`)
   - Nom de la base
   - Utilisateur
   - Mot de passe

## 2. Importation du Schéma
1. Ouvrez **phpMyAdmin** pour la base de données créée.
2. Cliquez sur l'onglet **Importer**.
3. Sélectionnez le fichier `database/schema.sql` situé à la racine du projet.
4. Exécutez l'importation.

## 3. Configuration de l'API
1. Ouvrez le fichier `public/api/config.php`.
2. Remplacez les constantes `DB_NAME`, `DB_USER`, et `DB_PASS` par vos informations réelles.
3. Enregistrez et déployez sur le serveur.

## 4. Activation du Mode Réel
1. Dans le fichier `src/lib/api.js`, changez la ligne suivante :
   ```javascript
   const USE_MOCK = false; // Remplacez true par false
   ```
2. Re-buildez le projet (`npm run build`) et déployez les fichiers du dossier `dist/` sur Hostinger.

## 5. Droits d'accès (Upload)
Assurez-vous que le dossier `public/uploads/` (ou `uploads/` à la racine web après déploiement) dispose des droits d'écriture (**chmod 755** ou **777**) pour permettre l'enregistrement des photos de chantiers.

---
*Note: Pour toute assistance technique sur la configuration PDO, contactez votre agent Back-End Ops.*
