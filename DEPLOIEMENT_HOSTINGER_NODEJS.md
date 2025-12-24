# 🚀 Déploiement Complet sur Hostinger - Application Web Node.js

## 🎯 Objectif

Redéployer **bedeew.com** sur Hostinger en utilisant la nouvelle fonctionnalité **"Application web Node.js"** qui permet de déployer directement depuis GitHub.

---

## 📋 Informations Hostinger

D'après vos captures d'écran :
- **IP** : 45.84.205.115
- **Port SSH** : 65002
- **Utilisateur** : u638236953
- **Domaine** : bedeew.com (déjà configuré)

---

## 🗑️ ÉTAPE 1 : Supprimer l'Ancien Déploiement

### Via SSH (Recommandé)

1. **Connectez-vous en SSH** :
```bash
ssh -p 65002 u638236953@45.84.205.115
```

2. **Listez les fichiers actuels** :
```bash
cd ~/public_html
ls -la
```

3. **Sauvegardez l'ancien déploiement** (au cas où) :
```bash
cd ~
mkdir backup_ancien_site
cp -r public_html/* backup_ancien_site/
```

4. **Supprimez tout dans public_html** :
```bash
cd ~/public_html
rm -rf *
rm -rf .*
# Attention : cela supprime TOUT
```

### Via File Manager Hostinger

1. Connectez-vous à **hPanel Hostinger**
2. Allez dans **"Fichiers"** → **"Gestionnaire de fichiers"**
3. Naviguez vers `public_html`
4. Sélectionnez tous les fichiers
5. Cliquez sur **"Supprimer"**

---

## 📦 ÉTAPE 2 : Préparer le Projet pour Hostinger

### 2.1 : Créer un fichier de configuration pour le Backend

Créez `server/ecosystem.config.js` pour PM2 (gestionnaire de processus Node.js) :

```javascript
module.exports = {
  apps: [{
    name: 'bedeew-api',
    script: './src/server.js',
    instances: 1,
    autorestart: true,
    watch: false,
    max_memory_restart: '1G',
    env: {
      NODE_ENV: 'production',
      PORT: 5000
    }
  }]
}
```

### 2.2 : Vérifier package.json du serveur

Assurez-vous que `server/package.json` contient :

```json
{
  "scripts": {
    "start": "node src/server.js",
    "dev": "nodemon src/server.js"
  },
  "type": "module"
}
```

### 2.3 : Créer un fichier .htaccess pour le frontend

Créez `client/.htaccess` pour gérer le routing React :

```apache
<IfModule mod_rewrite.c>
  RewriteEngine On
  RewriteBase /
  RewriteRule ^index\.html$ - [L]
  RewriteCond %{REQUEST_FILENAME} !-f
  RewriteCond %{REQUEST_FILENAME} !-d
  RewriteRule . /index.html [L]
</IfModule>
```

### 2.4 : Commit et Push sur GitHub

```bash
git add .
git commit -m "Prepare for Hostinger Node.js deployment"
git push origin main
```

---

## 🔧 ÉTAPE 3 : Déployer le Backend (API Node.js)

### 3.1 : Créer une Application Node.js sur Hostinger

1. **Connectez-vous à hPanel Hostinger**
2. Allez dans **"Avancé"** → **"Application web Node.js"**
3. Cliquez sur **"Créer une application"**

### 3.2 : Configuration de l'Application

- **Nom de l'application** : `bedeew-api`
- **Version Node.js** : 18.x ou 20.x (la plus récente)
- **Mode de déploiement** : **"Déployer depuis GitHub"**
- **Repository** : `eldieng/Plateforme-Bedeew`
- **Branche** : `main`
- **Répertoire racine** : `server`
- **Fichier de démarrage** : `src/server.js`
- **Port** : `5000` (ou celui assigné par Hostinger)
- **Domaine** : `api.bedeew.com` (sous-domaine pour l'API)

### 3.3 : Configurer les Variables d'Environnement

Dans la section **"Variables d'environnement"** de l'application :

```env
NODE_ENV=production
PORT=5000
MONGODB_URI=mongodb+srv://votre_user:votre_pass@cluster.mongodb.net/bedeew_digital?retryWrites=true&w=majority
JWT_SECRET=votre_secret_production_tres_long_64_caracteres
JWT_EXPIRE=7d
EMAIL_HOST=smtp.gmail.com
EMAIL_PORT=587
EMAIL_USER=votre_email@gmail.com
EMAIL_PASSWORD=votre_mot_de_passe_application
EMAIL_FROM=noreply@bedeew.com
CLIENT_URL=https://bedeew.com
CLOUDINARY_CLOUD_NAME=votre_cloud_name
CLOUDINARY_API_KEY=votre_api_key
CLOUDINARY_API_SECRET=votre_api_secret
```

### 3.4 : Déployer

1. Cliquez sur **"Déployer"**
2. Hostinger va :
   - Cloner votre repo GitHub
   - Installer les dépendances (`npm install`)
   - Démarrer l'application avec PM2
3. Attendez la fin du déploiement (5-10 minutes)

### 3.5 : Vérifier que l'API fonctionne

```bash
curl https://api.bedeew.com/health
curl https://api.bedeew.com/api/services
```

---

## 🎨 ÉTAPE 4 : Déployer le Frontend

### Option A : Via Application Node.js (si Hostinger le permet)

1. Créez une **deuxième application Node.js**
2. Configuration :
   - **Nom** : `bedeew-frontend`
   - **Repository** : `eldieng/Plateforme-Bedeew`
   - **Branche** : `main`
   - **Répertoire racine** : `client`
   - **Build command** : `npm run build`
   - **Domaine** : `bedeew.com`

### Option B : Via Build Static (Recommandé pour React)

#### 4.1 : Builder le frontend localement

```bash
cd client

# Créer un fichier .env.production
echo "VITE_API_URL=https://api.bedeew.com/api" > .env.production
echo "VITE_SITE_URL=https://bedeew.com" >> .env.production

# Builder
npm run build
```

Cela crée un dossier `client/dist` avec les fichiers statiques.

#### 4.2 : Uploader via SSH

```bash
# Depuis votre machine locale
cd client/dist

# Uploader vers Hostinger
scp -P 65002 -r * u638236953@45.84.205.115:~/public_html/
```

#### 4.3 : Ou via File Manager

1. Allez dans **"Gestionnaire de fichiers"**
2. Naviguez vers `public_html`
3. Uploadez tout le contenu de `client/dist`

#### 4.4 : Créer .htaccess pour React Router

Via SSH :
```bash
ssh -p 65002 u638236953@45.84.205.115
cd ~/public_html
nano .htaccess
```

Collez :
```apache
<IfModule mod_rewrite.c>
  RewriteEngine On
  RewriteBase /
  RewriteRule ^index\.html$ - [L]
  RewriteCond %{REQUEST_FILENAME} !-f
  RewriteCond %{REQUEST_FILENAME} !-d
  RewriteRule . /index.html [L]
</IfModule>

# Compression Gzip
<IfModule mod_deflate.c>
  AddOutputFilterByType DEFLATE text/html text/plain text/xml text/css text/javascript application/javascript
</IfModule>

# Cache
<IfModule mod_expires.c>
  ExpiresActive On
  ExpiresByType image/jpg "access plus 1 year"
  ExpiresByType image/jpeg "access plus 1 year"
  ExpiresByType image/gif "access plus 1 year"
  ExpiresByType image/png "access plus 1 year"
  ExpiresByType text/css "access plus 1 month"
  ExpiresByType application/javascript "access plus 1 month"
</IfModule>
```

---

## 🌐 ÉTAPE 5 : Configuration du Domaine

### 5.1 : Sous-domaine pour l'API (api.bedeew.com)

1. Dans **hPanel** → **"Domaines"**
2. Cliquez sur **"Gérer"** à côté de bedeew.com
3. Allez dans **"DNS / Serveurs de noms"**
4. Ajoutez un enregistrement **CNAME** :
   - **Type** : A
   - **Nom** : api
   - **Pointe vers** : IP de votre application Node.js (fournie par Hostinger)
   - **TTL** : 14400

### 5.2 : Domaine principal (bedeew.com)

Normalement déjà configuré, mais vérifiez :
- **Type** : A
- **Nom** : @ (ou vide)
- **Pointe vers** : 45.84.205.115
- **TTL** : 14400

### 5.3 : Activer HTTPS/SSL

1. Dans **hPanel** → **"Sécurité"** → **"SSL/TLS"**
2. Activez **"SSL gratuit"** pour :
   - bedeew.com
   - www.bedeew.com
   - api.bedeew.com
3. Attendez 5-10 minutes pour l'activation

---

## 🔄 ÉTAPE 6 : Automatiser les Déploiements (Optionnel)

### Via GitHub Actions

Créez `.github/workflows/deploy-hostinger.yml` :

```yaml
name: Deploy to Hostinger

on:
  push:
    branches: [main]

jobs:
  deploy-backend:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v2
      - name: Deploy Backend
        run: |
          # Hostinger redéploie automatiquement depuis GitHub
          echo "Backend will auto-deploy"

  deploy-frontend:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v2
      
      - name: Setup Node.js
        uses: actions/setup-node@v2
        with:
          node-version: '18'
      
      - name: Build Frontend
        run: |
          cd client
          npm install
          echo "VITE_API_URL=https://api.bedeew.com/api" > .env.production
          npm run build
      
      - name: Deploy to Hostinger via SSH
        uses: appleboy/scp-action@master
        with:
          host: 45.84.205.115
          username: u638236953
          key: ${{ secrets.SSH_PRIVATE_KEY }}
          port: 65002
          source: "client/dist/*"
          target: "~/public_html"
          strip_components: 2
```

---

## ✅ ÉTAPE 7 : Tests Finaux

### 7.1 : Tester l'API

```bash
# Health check
curl https://api.bedeew.com/health

# Services
curl https://api.bedeew.com/api/services

# Portfolio
curl https://api.bedeew.com/api/portfolio

# Blog
curl https://api.bedeew.com/api/blog
```

### 7.2 : Tester le Frontend

Ouvrez dans le navigateur :
- https://bedeew.com/
- https://bedeew.com/services
- https://bedeew.com/portfolio
- https://bedeew.com/blog
- https://bedeew.com/contact

### 7.3 : Vérifier les Logs

Via SSH :
```bash
ssh -p 65002 u638236953@45.84.205.115

# Logs de l'application Node.js
pm2 logs bedeew-api

# Logs Apache (frontend)
tail -f ~/logs/access_log
tail -f ~/logs/error_log
```

---

## 🐛 Dépannage

### Erreur : "Application failed to start"

**Solution** :
```bash
ssh -p 65002 u638236953@45.84.205.115
pm2 logs bedeew-api
# Vérifier les erreurs
```

### Erreur : "Cannot connect to MongoDB"

**Solution** :
1. Vérifiez que `MONGODB_URI` est correcte
2. Vérifiez que l'IP Hostinger est autorisée dans MongoDB Atlas
3. Ajoutez `0.0.0.0/0` dans Network Access

### Erreur : "CORS Error"

**Solution** :
1. Vérifiez que `CLIENT_URL=https://bedeew.com` dans les variables backend
2. Redémarrez l'application :
```bash
pm2 restart bedeew-api
```

### Frontend ne charge pas

**Solution** :
1. Vérifiez que `.htaccess` existe dans `public_html`
2. Vérifiez les permissions :
```bash
chmod 644 ~/public_html/.htaccess
chmod 755 ~/public_html
```

### "Erreur lors du chargement des données"

**Causes possibles** :
1. API non accessible → Vérifier `https://api.bedeew.com/health`
2. CORS bloqué → Vérifier `CLIENT_URL`
3. MongoDB déconnecté → Vérifier les logs
4. Variables d'environnement manquantes → Vérifier la config

---

## 📊 Commandes Utiles

### Gérer l'Application Node.js

```bash
# Se connecter en SSH
ssh -p 65002 u638236953@45.84.205.115

# Voir les applications PM2
pm2 list

# Logs en temps réel
pm2 logs bedeew-api

# Redémarrer
pm2 restart bedeew-api

# Arrêter
pm2 stop bedeew-api

# Supprimer
pm2 delete bedeew-api
```

### Vérifier l'Espace Disque

```bash
df -h
du -sh ~/public_html
```

### Vérifier les Processus

```bash
ps aux | grep node
netstat -tulpn | grep 5000
```

---

## 💰 Avantages Hostinger

- ✅ Tout sur un seul hébergement
- ✅ Domaine déjà configuré
- ✅ SSL gratuit inclus
- ✅ Déploiement depuis GitHub
- ✅ PM2 pour gérer Node.js
- ✅ SSH complet
- ✅ Moins cher qu'avoir plusieurs services

---

## ✅ Checklist Finale

### Préparation :
- [ ] Ancien déploiement supprimé
- [ ] Code pushé sur GitHub
- [ ] Variables d'environnement préparées

### Backend :
- [ ] Application Node.js créée sur Hostinger
- [ ] Déployée depuis GitHub
- [ ] Variables d'environnement configurées
- [ ] API accessible sur api.bedeew.com
- [ ] Tests API réussis

### Frontend :
- [ ] Build créé localement
- [ ] Uploadé dans public_html
- [ ] .htaccess configuré
- [ ] Site accessible sur bedeew.com
- [ ] Données s'affichent

### Domaine :
- [ ] api.bedeew.com configuré
- [ ] bedeew.com configuré
- [ ] SSL actif sur les deux
- [ ] HTTPS fonctionne

### Tests :
- [ ] API répond correctement
- [ ] Frontend charge
- [ ] Pas d'erreurs CORS
- [ ] Formulaire de contact fonctionne
- [ ] Connexion admin fonctionne

---

**Votre site sera en ligne sur https://bedeew.com/ hébergé entièrement sur Hostinger !** 🎉

**Temps estimé : 1-2 heures**
