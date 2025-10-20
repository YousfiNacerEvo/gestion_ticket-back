# Configuration Nodemailer

Le serveur utilise maintenant **Nodemailer** pour l'envoi d'emails via SMTP.

## 📧 Variables d'environnement requises

Ajoutez ces variables dans votre fichier `.env` :

```env
EMAIL_USER=votre-email@gmail.com
EMAIL_PASSWORD=votre-mot-de-passe-application
EMAIL_HOST=smtp.gmail.com
EMAIL_PORT=587
EMAIL_SECURE=false
EMAIL_FROM=support@asbumenos.net
```

## 🔧 Configuration par fournisseur

### Gmail
1. Activez l'authentification à 2 facteurs sur votre compte Google
2. Générez un **Mot de passe d'application** :
   - Allez sur [https://myaccount.google.com/apppasswords](https://myaccount.google.com/apppasswords)
   - Sélectionnez "Mail" et "Autre appareil"
   - Copiez le mot de passe généré (16 caractères)
3. Utilisez ce mot de passe dans `EMAIL_PASSWORD`

```env
EMAIL_USER=votre-email@gmail.com
EMAIL_PASSWORD=xxxx-xxxx-xxxx-xxxx
EMAIL_HOST=smtp.gmail.com
EMAIL_PORT=587
EMAIL_SECURE=false
```

### Outlook / Hotmail
```env
EMAIL_USER=votre-email@outlook.com
EMAIL_PASSWORD=votre-mot-de-passe
EMAIL_HOST=smtp-mail.outlook.com
EMAIL_PORT=587
EMAIL_SECURE=false
```

### Yahoo
```env
EMAIL_USER=votre-email@yahoo.com
EMAIL_PASSWORD=votre-mot-de-passe-application
EMAIL_HOST=smtp.mail.yahoo.com
EMAIL_PORT=587
EMAIL_SECURE=false
```

### SMTP personnalisé
```env
EMAIL_USER=votre-email@votredomaine.com
EMAIL_PASSWORD=votre-mot-de-passe
EMAIL_HOST=smtp.votredomaine.com
EMAIL_PORT=587
EMAIL_SECURE=false
```

## 🚀 Ports SMTP

- **Port 587** : Recommandé (STARTTLS) - `EMAIL_SECURE=false`
- **Port 465** : SSL/TLS - `EMAIL_SECURE=true`
- **Port 25** : Non sécurisé (déconseillé)

## ✅ Vérification

Au démarrage du serveur, vous devriez voir :
```
✅ Nodemailer SMTP server ready to send emails
📧 Using: smtp.gmail.com:587
```

Si erreur :
```
❌ SMTP connection failed: Invalid login
Please check your EMAIL_USER, EMAIL_PASSWORD, and EMAIL_HOST settings
```

## 📦 Packages supprimés

- ❌ `@sendgrid/mail` (supprimé)
- ❌ `resend` (supprimé)
- ✅ `nodemailer` (actif)

## 🔒 Sécurité

⚠️ **N'oubliez pas** :
- Ne jamais commiter le fichier `.env`
- Utiliser des mots de passe d'application (pas votre mot de passe principal)
- Vérifier que `.env` est dans `.gitignore`

