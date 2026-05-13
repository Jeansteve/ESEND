# 📧 Guide de Configuration : Messagerie Professionnelle ESEND

Ce guide vous accompagne pas à pas pour configurer et utiliser votre nouvelle adresse e-mail professionnelle. Une communication via une adresse officielle (@esendnuisibles.fr) est un gage de confiance et de sérieux pour vos clients.

---

## 🌐 1. Accès Immédiat (Webmail)
Si vous ne souhaitez pas configurer de logiciel, vous pouvez accéder à vos messages depuis n'importe quel navigateur.

1. Allez sur : **[https://mail.hostinger.com](https://mail.hostinger.com)**
2. Identifiant : `contact@esendnuisibles.fr`
3. Mot de passe : *(Le mot de passe fourni lors de la création)*

---

## 📱 2. Configuration sur Smartphone (iPhone / Android)
Pour recevoir vos demandes de devis en temps réel directement dans votre poche.

### Paramètres Universels :
*   **Type de compte** : IMAP
*   **Serveur Entrant** : `imap.hostinger.com` (Port 993, SSL/TLS)
*   **Serveur Sortant** : `smtp.hostinger.com` (Port 465, SSL/TLS)

### Sur iPhone (iOS) :
1. Allez dans **Réglages** > **Mail** > **Comptes** > **Ajouter un compte**.
2. Choisissez **Autre** > **Ajouter un compte Mail**.
3. Renseignez votre nom et l'adresse ESEND.
4. Entrez les serveurs `imap.hostinger.com` et `smtp.hostinger.com` avec vos identifiants complets.

---

## 💻 3. Configuration sur Ordinateur (Mac & Windows)

### Apple Mail (Mac) :
1. Ouvrez **Mail** > **Réglages** > **Comptes** > **+**.
2. Sélectionnez **Autre compte Mail...**
3. Renseignez votre adresse et mot de passe. Le logiciel détectera automatiquement la majorité des réglages. Assurez-vous que le serveur sortant est bien `smtp.hostinger.com`.

### Microsoft Outlook :
1. **Fichier** > **Ajouter un compte**.
2. Entrez l'adresse mail, cochez "Configuration manuelle".
3. Choisissez **IMAP** et entrez les serveurs et ports cités plus haut.

---

## 🚀 4. Cas Spécial : Utiliser ESEND depuis votre Gmail personnel
Vous pouvez continuer à utiliser votre application Gmail habituelle tout en répondant au nom d'ESEND.

1. Connectez-vous à votre **Gmail** sur ordinateur.
2. ⚙️ **Paramètres** > **Voir tous les paramètres** > **Comptes et importation**.
3. À la ligne **"Envoyer des e-mails en tant que"**, cliquez sur **Ajouter une autre adresse e-mail**.
4. Saisissez votre nom d'entreprise et l'adresse ESEND.
5. Paramètres SMTP :
    *   Serveur : `smtp.hostinger.com`
    *   Port : `587` (TLS)
    *   Utilisateur : `contact@esendnuisibles.fr`
6. Validez avec le code reçu sur votre boîte ESEND.

**Résultat** : Lors de chaque envoi, un menu déroulant "De" vous permettra de choisir entre votre Gmail et ESEND.

---

## 🛠 5. Récapitulatif Technique (Pour Expert)

| Paramètre | Valeur |
| :--- | :--- |
| **Protocole Entrant** | IMAP (Recommandé) |
| **Serveur Entrant** | `imap.hostinger.com` |
| **Port Entrant** | 993 (SSL/TLS) |
| **Protocole Sortant** | SMTP |
| **Serveur Sortant** | `smtp.hostinger.com` |
| **Port Sortant** | 465 (SSL) ou 587 (TLS) |
| **Authentification** | Requise (Identifiant = Email complet) |

---

## 💡 Astuce de Pro : Le "Reply-To"
Votre site internet est configuré pour que, lorsque vous recevez une notification de devis, il vous suffise de cliquer sur **"Répondre"**. Votre logiciel adressera automatiquement votre message au client, tout en utilisant votre identité professionnelle ESEND.

---
*Document réalisé par l'Assistance Technique ESEND — Mai 2026*
