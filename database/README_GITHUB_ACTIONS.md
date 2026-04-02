# Guide de Configuration CI/CD - ESEND
**Spécialiste : chef-de-projet-ia / developpeur-back-end-ops**

Pour que votre site soit mis à jour automatiquement sur Hostinger, vous devez ajouter les informations de connexion dans les **Secrets de votre dépôt GitHub**.

## 🛡️ Configuration des Secrets GitHub
1. Allez sur votre dépôt GitHub (ex: `Jeansteve/ESEND`).
2. Cliquez sur l'onglet **Settings** (Paramètres).
3. Dans le menu de gauche, allez dans **Secrets and variables** > **Actions**.
4. Cliquez sur le bouton **New repository secret** pour chaque valeur ci-dessous :

### 1. `FTP_SERVER`
- **Valeur** : `45.87.81.71`
- **Description** : L'adresse IP de votre serveur Hostinger.

### 2. `FTP_USERNAME`
- **Valeur** : `u387599421.site-test.esendnuisibles.fr`
- **Description** : Votre identifiant FTP.

### 3. `FTP_PASSWORD`
- **Valeur** : (Votre mot de passe FTP Hostinger)
- **Description** : Le mot de passe que vous avez défini dans le panel Hostinger pour cet utilisateur.

### 4. `VITE_GA_MEASUREMENT_ID` (Optionnel)
- **Valeur** : `G-XXXXXXXXXX`
- **Description** : Votre ID Google Analytics si vous souhaitez l'injecter au build.

---

## 🚀 Premier Déploiement
Une fois les secrets ajoutés :
1. Poussez vos modifications sur la branche `main` (`git push origin main`).
2. Allez dans l'onglet **Actions** de GitHub pour suivre la progression du build et du transfert.

> [!IMPORTANT]
> **Le fichier de configuration** : Le workflow est configuré pour **ne jamais écraser** votre fichier `public/api/config.php` sur le serveur s'il existe déjà. C'est une sécurité pour éviter de perdre vos réglages de base de données.
