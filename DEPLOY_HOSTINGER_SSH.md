# 🚀 Déploiement Hostinger via SSH - Instructions Étape par Étape

## 📋 Informations de Connexion

```
IP: 45.84.205.115
Port: 65002
Utilisateur: u638236953
Commande SSH: ssh -p 65002 u638236953@45.84.205.115
```

---

## ✅ Préparation Locale (FAIT)

- [x] Frontend buildé dans `client/dist/`
- [x] Fichier `.htaccess` créé
- [x] Variables de production configurées

---

## 🔧 ÉTAPE 1 : Connexion SSH à Hostinger

Ouvrez un terminal (PowerShell ou CMD) et exécutez :

```bash
ssh -p 65002 u638236953@45.84.205.115
```

Entrez votre mot de passe SSH quand demandé.

---

## 🗑️ ÉTAPE 2 : Supprimer l'Ancien Contenu

Une fois connecté en SSH, exécutez :

```bash
# Aller dans le dossier public_html
cd ~/public_html

# Voir ce qu'il y a
ls -la

# Supprimer TOUT le contenu (attention !)
rm -rf *
rm -rf .[!.]*

# Vérifier que c'est vide
ls -la
```

---

## 📤 ÉTAPE 3 : Upload des Fichiers

### Option A : Via SFTP (FileZilla) - RECOMMANDÉ

1. **Téléchargez FileZilla** : https://filezilla-project.org/

2. **Configurez la connexion** :
   - Hôte : `sftp://45.84.205.115`
   - Port : `65002`
   - Utilisateur : `u638236953`
   - Mot de passe : votre mot de passe SSH

3. **Uploadez les fichiers** :
   - **Frontend** : Uploadez le contenu de `client/dist/` vers `public_html/`
   - **Backend** : Uploadez le dossier `server/` vers `~/server/` (hors de public_html)

### Option B : Via SCP (Ligne de commande)

Depuis votre machine locale (PowerShell) :

```powershell
# Upload du frontend
scp -P 65002 -r D:\Plateforme_Bedeew\client\dist\* u638236953@45.84.205.115:~/public_html/

# Upload du backend
scp -P 65002 -r D:\Plateforme_Bedeew\server u638236953@45.84.205.115:~/
```

---

## ⚙️ ÉTAPE 4 : Configurer le Backend sur Hostinger

### 4.1 Connexion SSH

```bash
ssh -p 65002 u638236953@45.84.205.115
```

### 4.2 Installer les Dépendances

```bash
cd ~/server
npm install --production
```

### 4.3 Créer le Fichier .env

```bash
nano ~/server/.env
```

Collez ce contenu (remplacez par vos vraies valeurs) :

```env
NODE_ENV=production
PORT=5000
MONGODB_URI=mongodb+srv://votre_user:votre_pass@cluster0.xxxxx.mongodb.net/bedeew_digital?retryWrites=true&w=majority
JWT_SECRET=votre_secret_jwt_tres_long_minimum_64_caracteres_aleatoires
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

Sauvegardez : `Ctrl+O`, `Enter`, `Ctrl+X`

### 4.4 Tester le Backend

```bash
cd ~/server
node src/server.js
```

Si ça fonctionne, vous verrez :
```
✅ MongoDB Connected: cluster0.xxxxx.mongodb.net
🚀 Server running on port 5000
```

Arrêtez avec `Ctrl+C`.

### 4.5 Installer PM2 (Process Manager)

```bash
npm install -g pm2
```

### 4.6 Démarrer le Backend avec PM2

```bash
cd ~/server
pm2 start src/server.js --name bedeew-api
pm2 save
pm2 startup
```

### 4.7 Vérifier que ça Tourne

```bash
pm2 status
pm2 logs bedeew-api
```

---

## 🔗 ÉTAPE 5 : Configurer le Proxy Apache

Pour que `bedeew.com/api` redirige vers le backend Node.js sur le port 5000.

### 5.1 Modifier le .htaccess

```bash
nano ~/public_html/.htaccess
```

Remplacez le contenu par :

```apache
<IfModule mod_rewrite.c>
  RewriteEngine On
  RewriteBase /

  # Proxy vers l'API Node.js
  RewriteCond %{REQUEST_URI} ^/api
  RewriteRule ^api/(.*)$ http://127.0.0.1:5000/api/$1 [P,L]

  # Frontend React - SPA routing
  RewriteCond %{REQUEST_FILENAME} !-f
  RewriteCond %{REQUEST_FILENAME} !-d
  RewriteRule ^ index.html [L]
</IfModule>

<IfModule mod_deflate.c>
  AddOutputFilterByType DEFLATE text/html text/plain text/xml text/css application/javascript application/json
</IfModule>

<IfModule mod_headers.c>
  Header set X-Content-Type-Options "nosniff"
  Header set X-Frame-Options "SAMEORIGIN"
  Header set X-XSS-Protection "1; mode=block"
</IfModule>
```

Sauvegardez : `Ctrl+O`, `Enter`, `Ctrl+X`

---

## ✅ ÉTAPE 6 : Vérification Finale

### 6.1 Tester l'API

Dans le navigateur ou avec curl :

```bash
curl https://bedeew.com/api/health
curl https://bedeew.com/api/services
```

### 6.2 Tester le Frontend

Ouvrez https://bedeew.com/ et vérifiez :
- [ ] La page d'accueil charge
- [ ] Les services s'affichent
- [ ] Les projets portfolio s'affichent
- [ ] Les articles de blog s'affichent
- [ ] Le formulaire de contact fonctionne

---

## 🐛 Dépannage

### Le backend ne démarre pas

```bash
pm2 logs bedeew-api --lines 50
```

Vérifiez :
- Le fichier `.env` existe et est correct
- MongoDB URI est valide
- L'IP de Hostinger est autorisée dans MongoDB Atlas

### Erreur 503 ou 502

Le proxy ne fonctionne pas. Vérifiez :
- PM2 tourne : `pm2 status`
- Le port 5000 est utilisé : `netstat -tlnp | grep 5000`

### Erreur CORS

Vérifiez que `CLIENT_URL=https://bedeew.com` dans le `.env` du backend.

### Les données ne s'affichent pas

1. Vérifiez les logs : `pm2 logs bedeew-api`
2. Testez l'API directement : `curl http://127.0.0.1:5000/api/services`
3. Vérifiez MongoDB Atlas → Network Access

---

## 📊 Commandes PM2 Utiles

```bash
pm2 status          # Voir le statut
pm2 logs            # Voir les logs
pm2 restart all     # Redémarrer
pm2 stop all        # Arrêter
pm2 delete all      # Supprimer
pm2 monit           # Monitoring en temps réel
```

---

## 🔄 Pour les Mises à Jour Futures

1. **Build le frontend localement** :
   ```bash
   cd client
   npm run build
   ```

2. **Upload via SFTP** :
   - Contenu de `client/dist/` → `public_html/`

3. **Pour le backend** :
   ```bash
   # SSH
   ssh -p 65002 u638236953@45.84.205.115
   
   # Mettre à jour
   cd ~/server
   # Upload les nouveaux fichiers
   npm install
   pm2 restart bedeew-api
   ```

---

## ✅ Checklist Finale

- [ ] Ancien contenu supprimé
- [ ] Frontend uploadé dans public_html
- [ ] Backend uploadé dans ~/server
- [ ] .env configuré avec les vraies valeurs
- [ ] npm install exécuté
- [ ] PM2 démarré
- [ ] .htaccess configuré avec proxy
- [ ] https://bedeew.com/ fonctionne
- [ ] https://bedeew.com/api/health répond
- [ ] Données s'affichent correctement

---

**Votre site sera en ligne sur https://bedeew.com/ ! 🎉**
