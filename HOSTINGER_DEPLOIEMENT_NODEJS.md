# 🚀 Déploiement sur Hostinger - Application Node.js via GitHub

## 📋 Informations de Connexion Hostinger

```
IP: 45.84.205.115
Port SSH: 65002
Utilisateur: u638236953
Domaine: bedeew.com
```

---

## 🗑️ ÉTAPE 1 : Supprimer l'Ancien Déploiement

### Option A : Via le Gestionnaire de Fichiers Hostinger

1. Connectez-vous à **hPanel** (dashboard Hostinger)
2. Allez dans **Gestionnaire de fichiers**
3. Naviguez vers `public_html`
4. **Sélectionnez tous les fichiers** et supprimez-les
5. Supprimez aussi les dossiers du backend si présents

### Option B : Via SSH

```bash
# Connexion SSH
ssh -p 65002 u638236953@45.84.205.115

# Supprimer le contenu de public_html
cd ~/public_html
rm -rf *
rm -rf .*  # Fichiers cachés

# Vérifier que c'est vide
ls -la
```

---

## 🔧 ÉTAPE 2 : Créer une Application Node.js sur Hostinger

### 2.1 Accéder à la Fonctionnalité

1. Connectez-vous à **hPanel** Hostinger
2. Allez dans **Sites web** → **bedeew.com**
3. Cherchez **"Application web Node.js"** dans le menu
4. Cliquez dessus

### 2.2 Configurer l'Application Backend (API)

1. Cliquez sur **"Créer une application"** ou **"Déployer depuis GitHub"**

2. **Connecter GitHub** :
   - Autorisez Hostinger à accéder à votre compte GitHub
   - Sélectionnez le repo : `eldieng/Plateforme-Bedeew`

3. **Configuration** :
   ```
   Nom de l'application : bedeew-api
   Branche : main
   Répertoire racine : server
   Version Node.js : 18.x ou 20.x (la plus récente)
   Commande de build : npm install
   Commande de démarrage : npm start
   Port : 5000
   ```

4. **Variables d'environnement** (TRÈS IMPORTANT) :
   ```env
   NODE_ENV=production
   PORT=5000
   MONGODB_URI=mongodb+srv://votre_user:votre_pass@cluster0.xxxxx.mongodb.net/bedeew_digital?retryWrites=true&w=majority
   JWT_SECRET=votre_secret_production_tres_long_minimum_64_caracteres
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

5. Cliquez sur **"Déployer"**

### 2.3 Configurer le Domaine API

Si Hostinger permet de configurer un sous-domaine pour l'API :
- Créez `api.bedeew.com` pointant vers l'application Node.js
- Sinon, l'API sera accessible via un chemin comme `bedeew.com/api`

---

## 🎨 ÉTAPE 3 : Déployer le Frontend

### Option A : Build Local + Upload

1. **Build le frontend localement** :
   ```bash
   cd client
   
   # Créer le fichier .env pour la production
   echo "VITE_API_URL=https://bedeew.com/api" > .env.production
   echo "VITE_SITE_URL=https://bedeew.com" >> .env.production
   
   # Build
   npm run build
   ```

2. **Upload le dossier `dist`** vers `public_html` :
   - Via le Gestionnaire de fichiers Hostinger
   - Ou via SFTP (FileZilla)
   - Ou via SSH :
   ```bash
   scp -P 65002 -r dist/* u638236953@45.84.205.115:~/public_html/
   ```

### Option B : Déploiement Automatique via GitHub

Si Hostinger supporte le déploiement du frontend via GitHub :

1. Créez une **deuxième application** pour le frontend
2. Configuration :
   ```
   Répertoire racine : client
   Commande de build : npm run build
   Répertoire de sortie : dist
   ```

---

## ⚙️ ÉTAPE 4 : Configuration du Serveur

### 4.1 Fichier .htaccess pour le Frontend (SPA React)

Créez un fichier `.htaccess` dans `public_html` :

```apache
<IfModule mod_rewrite.c>
  RewriteEngine On
  RewriteBase /
  
  # Ne pas réécrire les fichiers et dossiers existants
  RewriteCond %{REQUEST_FILENAME} !-f
  RewriteCond %{REQUEST_FILENAME} !-d
  
  # Rediriger vers index.html pour le routing React
  RewriteRule ^ index.html [L]
</IfModule>

# Compression Gzip
<IfModule mod_deflate.c>
  AddOutputFilterByType DEFLATE text/html text/plain text/xml text/css application/javascript application/json
</IfModule>

# Cache des assets
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
</IfModule>
```

### 4.2 Proxy pour l'API (si nécessaire)

Si l'API Node.js tourne sur un port interne, ajoutez au `.htaccess` :

```apache
# Proxy vers l'API Node.js
RewriteRule ^api/(.*)$ http://localhost:5000/api/$1 [P,L]
```

---

## 🔍 ÉTAPE 5 : Vérification

### 5.1 Tester l'API

```bash
curl https://bedeew.com/api/health
curl https://bedeew.com/api/services
```

Ou dans le navigateur :
- https://bedeew.com/api/health
- https://bedeew.com/api/services

### 5.2 Tester le Frontend

Ouvrez https://bedeew.com/ et vérifiez :
- [ ] La page d'accueil charge
- [ ] Les services s'affichent
- [ ] Les projets portfolio s'affichent
- [ ] Les articles de blog s'affichent
- [ ] Le formulaire de contact fonctionne
- [ ] La connexion admin fonctionne

---

## 🐛 Dépannage

### Erreur : "Erreur lors du chargement des données"

**Causes possibles** :

1. **API ne répond pas** :
   - Vérifiez que l'application Node.js est démarrée
   - Vérifiez les logs dans hPanel

2. **CORS bloqué** :
   - Vérifiez que `CLIENT_URL=https://bedeew.com` dans les variables d'environnement

3. **MongoDB non accessible** :
   - Vérifiez que l'IP de Hostinger est autorisée dans MongoDB Atlas
   - Ajoutez `0.0.0.0/0` dans Network Access

4. **Variables d'environnement manquantes** :
   - Vérifiez que toutes les variables sont configurées

### Erreur : "Cannot GET /services"

Le routing React ne fonctionne pas. Vérifiez le fichier `.htaccess`.

### Erreur : "502 Bad Gateway"

L'application Node.js a crashé. Vérifiez :
- Les logs de l'application
- La version de Node.js
- Les dépendances (`npm install`)

---

## 📊 Structure Finale

```
Hostinger (bedeew.com)
├── Application Node.js (API)
│   ├── Repo: eldieng/Plateforme-Bedeew
│   ├── Root: server/
│   ├── Port: 5000
│   └── URL: bedeew.com/api ou api.bedeew.com
│
└── public_html/ (Frontend)
    ├── index.html
    ├── assets/
    ├── .htaccess
    └── ... (build React)
```

---

## 🔄 Déploiement Automatique

Une fois configuré, chaque `git push` sur la branche `main` déclenchera :
- Rebuild automatique de l'API
- (Optionnel) Rebuild du frontend si configuré

---

## ✅ Checklist Finale

### Suppression :
- [ ] Ancien contenu de public_html supprimé
- [ ] Ancienne configuration supprimée

### Backend :
- [ ] Application Node.js créée
- [ ] GitHub connecté
- [ ] Variables d'environnement configurées
- [ ] Déploiement réussi
- [ ] API accessible

### Frontend :
- [ ] Build effectué
- [ ] Fichiers uploadés dans public_html
- [ ] .htaccess configuré
- [ ] Site accessible

### MongoDB :
- [ ] IP Hostinger autorisée (ou 0.0.0.0/0)
- [ ] Connexion testée

### Tests :
- [ ] https://bedeew.com/ charge
- [ ] Données s'affichent
- [ ] Pas d'erreurs console
- [ ] Formulaires fonctionnent

---

**Votre site sera de nouveau en ligne sur https://bedeew.com/ ! 🎉**
