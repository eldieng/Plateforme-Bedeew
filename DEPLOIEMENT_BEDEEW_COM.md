# 🚀 Déploiement Bedeew.com sur Hostinger

## 📋 Informations de Connexion

```
Domaine:      bedeew.com
IP:           45.84.205.115
Port SSH:     65002
Utilisateur:  u638236953
Status SSH:   ACTIVE ✅
Plan:         Business Web Hosting
```

---

## ⚡ Déploiement Rapide (2 heures)

### **ÉTAPE 1 : Connexion SSH** (2 min)

```bash
# Ouvrir PowerShell et se connecter
ssh -p 65002 u638236953@45.84.205.115
```

**Entrez votre mot de passe SSH** (ne s'affiche pas)

---

### **ÉTAPE 2 : Backup WordPress** (5 min)

```bash
# Une fois connecté en SSH
cd ~/public_html

# Créer un dossier de backup
mkdir wordpress_backup_$(date +%Y%m%d)

# Déplacer WordPress (garder .htaccess)
mv wp-* wordpress_backup_$(date +%Y%m%d)/ 2>/dev/null
mv index.php wordpress_backup_$(date +%Y%m%d)/ 2>/dev/null

# Vérifier
ls -la
```

---

### **ÉTAPE 3 : Vérifier Node.js** (3 min)

```bash
# Vérifier si Node.js est installé
node --version

# Si pas installé ou version < 18
# Installer Node.js 18 via nvm
curl -o- https://raw.githubusercontent.com/nvm-sh/nvm/v0.39.0/install.sh | bash
source ~/.bashrc
nvm install 18
nvm use 18
node --version
```

---

### **ÉTAPE 4 : Installer PM2** (2 min)

```bash
# Installer PM2 globalement
npm install -g pm2

# Vérifier
pm2 --version
```

---

### **ÉTAPE 5 : Préparer le Dossier** (2 min)

```bash
# Créer la structure
cd ~/public_html
mkdir bedeew_app
cd bedeew_app
```

---

### **ÉTAPE 6 : Uploader le Code** (10 min)

**Option A : Via Git (Recommandé)**

```bash
# Sur le serveur
cd ~/public_html/bedeew_app

# Cloner votre repo (si sur GitHub)
git clone https://github.com/votre-username/Plateforme_Bedeew.git .

# Ou initialiser Git
git init
```

**Option B : Via FileZilla (Plus Simple)**

1. **Télécharger FileZilla** : https://filezilla-project.org/
2. **Configurer la connexion** :
   ```
   Hôte:      sftp://45.84.205.115
   Port:      65002
   Utilisateur: u638236953
   Mot de passe: [votre mot de passe SSH]
   ```
3. **Se connecter**
4. **Uploader** :
   - Dossier local : `D:\Plateforme_Bedeew\server`
   - Dossier distant : `/public_html/bedeew_app/server`

---

### **ÉTAPE 7 : Configurer le Backend** (10 min)

```bash
# Aller dans le dossier server
cd ~/public_html/bedeew_app/server

# Installer les dépendances
npm install --production

# Créer le fichier .env
cat > .env << 'EOF'
NODE_ENV=production
PORT=5000
API_URL=https://bedeew.com
MONGODB_URI=mongodb+srv://elelhadjidieng_db_user:Aladji%4004@cluster0.vjfnmxo.mongodb.net/bedeew_digital?retryWrites=true&w=majority
JWT_SECRET=CHANGEZ_MOI_AVEC_UN_SECRET_SECURISE_64_CARACTERES_MINIMUM
JWT_EXPIRE=7d
CLIENT_URL=https://bedeew.com
EMAIL_HOST=smtp.gmail.com
EMAIL_PORT=587
EMAIL_USER=votre-email@gmail.com
EMAIL_PASSWORD=votre-mot-de-passe-app
EMAIL_FROM=noreply@bedeew.com
CLOUDINARY_CLOUD_NAME=votre_cloud_name
CLOUDINARY_API_KEY=votre_api_key
CLOUDINARY_API_SECRET=votre_api_secret
RATE_LIMIT_WINDOW_MS=900000
RATE_LIMIT_MAX_REQUESTS=100
WHATSAPP_NUMBER=+221XXXXXXXXX
EOF

# Éditer le .env pour ajouter vos vraies valeurs
nano .env
```

**Remplacez :**
- `JWT_SECRET` : Générez-en un nouveau (voir ci-dessous)
- `EMAIL_USER` : Votre email Gmail
- `EMAIL_PASSWORD` : Mot de passe d'application Gmail
- `CLOUDINARY_*` : Vos identifiants Cloudinary
- `WHATSAPP_NUMBER` : Votre numéro WhatsApp

**Sauvegarder** : `Ctrl+X`, puis `Y`, puis `Enter`

---

### **ÉTAPE 8 : Générer JWT_SECRET** (1 min)

**Sur votre machine locale** (PowerShell) :

```bash
node -e "console.log(require('crypto').randomBytes(64).toString('hex'))"
```

**Copiez le résultat** et mettez-le dans `.env` sur le serveur.

---

### **ÉTAPE 9 : Démarrer le Backend** (5 min)

```bash
# Démarrer avec PM2
cd ~/public_html/bedeew_app/server
pm2 start src/server.js --name bedeew-api

# Configurer le démarrage automatique
pm2 startup
# Copier et exécuter la commande affichée

pm2 save

# Vérifier
pm2 status
pm2 logs bedeew-api --lines 20
```

**Vous devriez voir** :
```
🚀 Server running in production mode on port 5000
📡 API available at http://localhost:5000/api
```

---

### **ÉTAPE 10 : Tester l'API** (2 min)

```bash
# Tester le health check
curl http://localhost:5000/health

# Devrait retourner:
# {"success":true,"message":"Bedeew Digital API is running"...}
```

---

### **ÉTAPE 11 : Build le Frontend** (5 min)

**Sur votre machine locale** (PowerShell) :

```bash
# Aller dans le dossier client
cd D:\Plateforme_Bedeew\client

# Créer .env.production
echo VITE_API_URL=https://bedeew.com/api > .env.production
echo VITE_WHATSAPP_NUMBER=+221XXXXXXXXX >> .env.production
echo VITE_SITE_NAME=Bedeew Digital >> .env.production
echo VITE_SITE_URL=https://bedeew.com >> .env.production

# Build
npm run build
```

**Résultat** : Dossier `dist/` créé avec tous les fichiers

---

### **ÉTAPE 12 : Uploader le Frontend** (10 min)

**Via FileZilla** :

1. **Connectez-vous** (comme à l'étape 6)
2. **Naviguez** vers `/public_html/`
3. **Uploadez** tout le contenu de `client/dist/` directement dans `/public_html/`
   - `index.html` doit être dans `/public_html/index.html`
   - `assets/` doit être dans `/public_html/assets/`

**Via SCP (Terminal)** :

```bash
# Sur votre machine locale
scp -P 65002 -r D:\Plateforme_Bedeew\client\dist\* u638236953@45.84.205.115:~/public_html/
```

---

### **ÉTAPE 13 : Configurer .htaccess** (5 min)

**Sur le serveur SSH** :

```bash
cd ~/public_html

# Créer/éditer .htaccess
cat > .htaccess << 'EOF'
# Activer le module de réécriture
RewriteEngine On

# Rediriger HTTP vers HTTPS
RewriteCond %{HTTPS} off
RewriteRule ^(.*)$ https://%{HTTP_HOST}%{REQUEST_URI} [L,R=301]

# Proxy pour l'API (backend)
RewriteCond %{REQUEST_URI} ^/api/(.*)$ [OR]
RewriteCond %{REQUEST_URI} ^/health$
RewriteRule ^(.*)$ http://localhost:5000/$1 [P,L]

# SPA Routing - Rediriger toutes les autres requêtes vers index.html
RewriteCond %{REQUEST_FILENAME} !-f
RewriteCond %{REQUEST_FILENAME} !-d
RewriteRule ^(.*)$ /index.html [L]

# Compression
<IfModule mod_deflate.c>
  AddOutputFilterByType DEFLATE text/html text/plain text/xml text/css text/javascript application/javascript application/json
</IfModule>

# Cache
<IfModule mod_expires.c>
  ExpiresActive On
  ExpiresByType image/jpg "access plus 1 year"
  ExpiresByType image/jpeg "access plus 1 year"
  ExpiresByType image/gif "access plus 1 year"
  ExpiresByType image/png "access plus 1 year"
  ExpiresByType image/svg+xml "access plus 1 year"
  ExpiresByType text/css "access plus 1 month"
  ExpiresByType application/javascript "access plus 1 month"
</IfModule>

# Sécurité
<IfModule mod_headers.c>
  Header set X-Content-Type-Options "nosniff"
  Header set X-Frame-Options "SAMEORIGIN"
  Header set X-XSS-Protection "1; mode=block"
  Header set Referrer-Policy "strict-origin-when-cross-origin"
</IfModule>
EOF
```

---

### **ÉTAPE 14 : Activer SSL** (10 min)

**Via Hostinger Panel** :

1. **Retourner sur Hostinger Panel**
2. Aller dans **"SSL"**
3. Sélectionner **bedeew.com**
4. Cliquer sur **"Install SSL"**
5. Choisir **"Let's Encrypt"** (gratuit)
6. Attendre 5-10 minutes

**Vérifier** :
```bash
curl https://bedeew.com/health
```

---

### **ÉTAPE 15 : Tests Finaux** (10 min)

**Ouvrir dans le navigateur** :

- [ ] https://bedeew.com → Page d'accueil
- [ ] https://bedeew.com/services → Services
- [ ] https://bedeew.com/portfolio → Portfolio
- [ ] https://bedeew.com/blog → Blog
- [ ] https://bedeew.com/contact → Contact
- [ ] https://bedeew.com/admin → Admin login

**Tester les formulaires** :
- [ ] Envoyer un message de contact
- [ ] Demander un devis
- [ ] Se connecter à l'admin

**Tester l'API** :
```bash
curl https://bedeew.com/health
curl https://bedeew.com/api/services
curl https://bedeew.com/api/portfolio
```

---

## ✅ Checklist Complète

### Avant de Commencer
- [x] SSH activé et testé
- [ ] Backup WordPress créé
- [ ] FileZilla installé (ou Git configuré)
- [ ] Identifiants notés

### Backend
- [ ] Code uploadé
- [ ] Dépendances installées
- [ ] .env configuré
- [ ] PM2 démarré
- [ ] API testée

### Frontend
- [ ] Build créé
- [ ] Fichiers uploadés
- [ ] .htaccess configuré
- [ ] Routes testées

### Sécurité
- [ ] SSL activé
- [ ] HTTPS fonctionne
- [ ] JWT_SECRET changé
- [ ] Secrets sécurisés

### Tests
- [ ] Toutes les pages fonctionnent
- [ ] Formulaires testés
- [ ] Admin accessible
- [ ] Performance OK

---

## 🔧 Commandes Utiles

### Gérer PM2
```bash
# Statut
pm2 status

# Logs en temps réel
pm2 logs bedeew-api

# Redémarrer
pm2 restart bedeew-api

# Arrêter
pm2 stop bedeew-api

# Monitoring
pm2 monit
```

### Logs
```bash
# Logs Apache
tail -f ~/logs/error_log

# Logs Node.js
pm2 logs bedeew-api --lines 50
```

### Mise à Jour
```bash
# Backend
cd ~/public_html/bedeew_app/server
git pull  # ou uploader les nouveaux fichiers
npm install
pm2 restart bedeew-api

# Frontend
# Build localement puis uploader via FileZilla
```

---

## 🆘 Dépannage

### Problème : "Cannot connect to SSH"
```bash
# Vérifier le port
ssh -p 65002 u638236953@45.84.205.115 -v
```

### Problème : "API not responding"
```bash
# Vérifier PM2
pm2 status
pm2 logs bedeew-api --lines 50

# Redémarrer
pm2 restart bedeew-api
```

### Problème : "404 on routes"
Vérifier que `.htaccess` est bien configuré

### Problème : "CORS Error"
Vérifier `CLIENT_URL` dans `.env`

---

## 📞 Support

**Hostinger Support** :
- Chat 24/7 disponible
- Email: support@hostinger.com

**En cas de blocage** :
1. Vérifier les logs : `pm2 logs bedeew-api`
2. Vérifier Apache : `tail -f ~/logs/error_log`
3. Redémarrer : `pm2 restart bedeew-api`

---

## 🎉 Félicitations !

Une fois terminé, **bedeew.com** affichera votre nouvelle application React/Node.js ! 🚀

**Temps Total : ~2 heures**

---

**Prêt à commencer ?** Suivez les étapes une par une ! 💪
