# 🔧 Résolution des problèmes SMTP (ETIMEDOUT)

## ❌ Erreur: ETIMEDOUT

Cette erreur signifie que le serveur ne peut pas se connecter au serveur SMTP. C'est très courant sur les hébergeurs cloud.

---

## 🎯 Solutions rapides

### Solution 1 : Essayer différents ports SMTP

Modifiez votre `.env` et testez ces configurations :

#### Option A : Port 587 (STARTTLS)
```env
EMAIL_PORT=587
EMAIL_SECURE=false
EMAIL_HOST=smtp.gmail.com
```

#### Option B : Port 465 (SSL)
```env
EMAIL_PORT=465
EMAIL_SECURE=true
EMAIL_HOST=smtp.gmail.com
```

#### Option C : Port 2525 (Alternatif)
```env
EMAIL_PORT=2525
EMAIL_SECURE=false
EMAIL_HOST=smtp.gmail.com
```

---

### Solution 2 : Utiliser un service SMTP alternatif

Si Gmail est bloqué, essayez ces services :

#### A) **Mailgun SMTP** (Recommandé pour production)
```env
EMAIL_HOST=smtp.mailgun.org
EMAIL_PORT=587
EMAIL_SECURE=false
EMAIL_USER=postmaster@votre-domaine.mailgun.org
EMAIL_PASSWORD=votre-clé-api-mailgun
```
👉 Inscription : [https://www.mailgun.com/](https://www.mailgun.com/)

#### B) **SendGrid SMTP** (Fiable)
```env
EMAIL_HOST=smtp.sendgrid.net
EMAIL_PORT=587
EMAIL_SECURE=false
EMAIL_USER=apikey
EMAIL_PASSWORD=votre-clé-api-sendgrid
```
👉 Inscription : [https://sendgrid.com/](https://sendgrid.com/)

#### C) **Brevo (ex-Sendinblue)**
```env
EMAIL_HOST=smtp-relay.brevo.com
EMAIL_PORT=587
EMAIL_SECURE=false
EMAIL_USER=votre-email-brevo
EMAIL_PASSWORD=votre-clé-smtp-brevo
```
👉 Inscription : [https://www.brevo.com/](https://www.brevo.com/)

---

### Solution 3 : Vérifier que vous êtes sur Render.com/Heroku

⚠️ **Render.com, Heroku et certains hébergeurs bloquent les ports SMTP sortants (25, 465, 587)** pour éviter le spam.

#### Options :

**A) Utiliser un Add-on SMTP**
- Render.com : Utiliser un service externe via HTTP API
- Heroku : Installer un add-on comme SendGrid, Mailgun

**B) Utiliser un serveur VPS (DigitalOcean, Linode, AWS EC2)**
- Les VPS ne bloquent généralement pas SMTP

---

### Solution 4 : Tester votre connexion SMTP en local

Créez un fichier `test-smtp.js` dans le dossier `server/` :

```javascript
require('dotenv').config();
const nodemailer = require('nodemailer');

const transporter = nodemailer.createTransport({
  host: process.env.EMAIL_HOST || 'smtp.gmail.com',
  port: Number(process.env.EMAIL_PORT) || 587,
  secure: process.env.EMAIL_SECURE === 'true',
  auth: {
    user: process.env.EMAIL_USER,
    pass: process.env.EMAIL_PASSWORD
  }
});

console.log('Testing SMTP connection...');
console.log(`Host: ${process.env.EMAIL_HOST}`);
console.log(`Port: ${process.env.EMAIL_PORT}`);
console.log(`User: ${process.env.EMAIL_USER}`);

transporter.verify()
  .then(() => {
    console.log('✅ SUCCESS! SMTP is working');
    process.exit(0);
  })
  .catch((error) => {
    console.error('❌ FAILED:', error.message);
    console.error('Code:', error.code);
    process.exit(1);
  });
```

Exécutez :
```bash
node test-smtp.js
```

---

## 🔍 Diagnostic par code d'erreur

### ETIMEDOUT
- **Cause** : Port bloqué par firewall/hébergeur
- **Solution** : Essayer port 2525 ou utiliser un service HTTP

### EAUTH / Invalid login
- **Cause** : Mauvais mot de passe ou authentification
- **Solution** : Vérifier EMAIL_USER et EMAIL_PASSWORD

### ECONNREFUSED
- **Cause** : Serveur SMTP n'existe pas à cette adresse
- **Solution** : Vérifier EMAIL_HOST

---

## 🚀 Recommandations par environnement

### Développement local (Windows/Mac/Linux)
✅ Gmail avec mot de passe d'application fonctionne bien

```env
EMAIL_HOST=smtp.gmail.com
EMAIL_PORT=587
EMAIL_SECURE=false
```

### Production (Render.com / Heroku)
❌ SMTP souvent bloqué
✅ Utilisez Mailgun, SendGrid ou Brevo via SMTP ou HTTP API

### VPS (DigitalOcean, AWS EC2, Linode)
✅ SMTP fonctionne généralement
✅ Gmail, Mailgun, SendGrid tous compatibles

---

## 💡 Si rien ne fonctionne : Alternative HTTP API

Si SMTP est vraiment bloqué, vous pouvez utiliser les API HTTP de ces services :

### Mailgun HTTP API
```bash
npm install mailgun.js
```

### SendGrid HTTP API
```bash
npm install @sendgrid/mail
```

### Resend HTTP API
```bash
npm install resend
```

Voulez-vous que je vous aide à configurer l'une de ces solutions ?

---

## 📞 Besoin d'aide ?

1. Vérifiez sur quel hébergeur vous êtes
2. Testez avec `test-smtp.js`
3. Essayez les ports alternatifs
4. Si tout échoue, utilisez un service HTTP (Mailgun/SendGrid)

