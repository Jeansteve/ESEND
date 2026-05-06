# Guide de Configuration CI/CD & Database - ESEND
**Spécialiste : developpeur-back-end-ops**

Ce document centralise les informations nécessaires pour configurer le pipeline de déploiement et la base de données pour ESEND.

---

## 🛡️ 1. Secrets GitHub (Actions)
Allez dans **Settings > Secrets and variables > Actions** et ajoutez les secrets suivants. Sans eux, le déploiement échouera ou le site ne pourra pas se connecter à la base.

### 🌐 Accès FTP
| Secret | Valeur |
| :--- | :--- |
| `FTP_PROD_SERVER` | `45.87.81.71` (IP Hostinger) |
| `FTP_PROD_USERNAME` | Identifiant FTP principal |
| `FTP_PROD_PASSWORD` | Mot de passe FTP |

### 🗄️ Base de Données (Production)
| Secret | Valeur |
| :--- | :--- |
| `DB_PROD_HOST` | `localhost` |
| `DB_PROD_NAME` | `u387599421_esend` |
| `DB_PROD_USER` | `u387599421_admin` |
| `DB_PROD_PASS` | (Le mot de passe de la base) |

### 🧪 Environnement de Test
Créez les mêmes secrets préfixés par `DB_TEST_*` et `FTP_TEST_*` pour le serveur de recette.

---

## 🚀 2. Automatisation du fichier config.php
Le fichier `public/api/config.php` est généré dynamiquement lors du déploiement. 

**Structure générée :**
```php
define('DB_HOST', '${{ secrets.DB_PROD_HOST }}');
define('DB_NAME', '${{ secrets.DB_PROD_NAME }}');
define('DB_USER', '${{ secrets.DB_PROD_USER }}');
define('DB_PASS', '${{ secrets.DB_PROD_PASS }}');
```
Cela signifie que vous n'avez **plus jamais** besoin de modifier ce fichier manuellement sur le serveur. Toute modification manuelle sera écrasée au prochain déploiement.

---

## 📊 3. Schéma & Initialisation
1. Le schéma de base est situé dans `database/schema_prod.sql`.
2. Pour initialiser un nouveau client :
   - Importez le SQL.
   - L'utilisateur par défaut est `admin@esend.fr` / `admin`.
   - Modifiez immédiatement le mot de passe dans l'onglet **Paramètres** de l'admin.

---
*Documentation mise à jour en Mai 2026 pour la version 17.3 (Auto-Config).*
