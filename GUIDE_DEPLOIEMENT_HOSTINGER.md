# 🚀 Guide Rapide - Déploiement Hostinger

## 📋 Étapes à Suivre

### 1️⃣ Supprimer l'Ancien Déploiement (5 min)

**Via SSH** :
```bash
ssh -p 65002 u638236953@45.84.205.115
cd ~/public_html
rm -rf *
```

**Ou via File Manager Hostinger** :
- Gestionnaire de fichiers → public_html → Tout supprimer

---

### 2️⃣ Déployer le Backend (15 min)

1. **hPanel Hostinger** → **"Application web Node.js"** → **"Créer"**

2. **Configuration** :
   - Nom : `bedeew-api`
   - Node.js : 18.x ou 20.x
   - Source : **GitHub** → `eldieng/Plateforme-Bedeew`
   - Branche : `main`
   - Répertoire : `server`
   - Fichier : `src/server.js`
   - Port : `5000`
   - Domaine : `api.bedeew.com`

3. **Variables d'environnement** :
```env
NODE_ENV=production
PORT=5000
MONGODB_URI=mongodb+srv://user:pass@cluster.mongodb.net/bedeew_digital
JWT_SECRET=votre_secret_64_caracteres
CLIENT_URL=https://bedeew.com
EMAIL_USER=votre_email@gmail.com
EMAIL_PASSWORD=mot_de_passe_app
CLOUDINARY_CLOUD_NAME=votre_cloud
CLOUDINARY_API_KEY=votre_key
CLOUDINARY_API_SECRET=votre_secret
```

4. **Déployer** → Attendre 5-10 min

5. **Tester** :
```bash
curl https://api.bedeew.com/health
```

---

### 3️⃣ Déployer le Frontend (10 min)

**Option A : Build local + Upload**

```bash
# Sur votre machine
cd client
npm run build

# Upload via SSH
scp -P 65002 -r dist/* u638236953@45.84.205.115:~/public_html/
```

**Option B : Via File Manager**
- Builder localement : `npm run build`
- Uploader le contenu de `client/dist` dans `public_html`

**Créer .htaccess** :
```bash
ssh -p 65002 u638236953@45.84.205.115
cd ~/public_html
# Copier le contenu de client/.htaccess
```

---

### 4️⃣ Configurer DNS (5 min)

**hPanel** → **Domaines** → **bedeew.com** → **DNS**

Ajouter :
```
Type: A
Nom: api
Valeur: [IP de l'app Node.js fournie par Hostinger]
```

---

### 5️⃣ Activer SSL (2 min)

**hPanel** → **Sécurité** → **SSL/TLS**
- Activer pour `bedeew.com`
- Activer pour `api.bedeew.com`

---

### 6️⃣ Tester (5 min)

```bash
# API
curl https://api.bedeew.com/health
curl https://api.bedeew.com/api/services

# Frontend
# Ouvrir dans le navigateur
https://bedeew.com
```

---

## ✅ Checklist

- [ ] Ancien site supprimé
- [ ] Backend déployé depuis GitHub
- [ ] Variables d'environnement configurées
- [ ] API accessible
- [ ] Frontend buildé et uploadé
- [ ] .htaccess créé
- [ ] DNS configuré
- [ ] SSL activé
- [ ] Site fonctionne

---

## 🆘 Problèmes ?

**"Erreur lors du chargement des données"** :
1. Vérifier que l'API répond : `curl https://api.bedeew.com/health`
2. Vérifier `CLIENT_URL=https://bedeew.com` dans le backend
3. Vérifier `VITE_API_URL=https://api.bedeew.com/api` dans le build frontend

**Logs Backend** :
```bash
ssh -p 65002 u638236953@45.84.205.115
pm2 logs bedeew-api
```

---

**Temps total : ~40 minutes** ⏱️

Voir `DEPLOIEMENT_HOSTINGER_NODEJS.md` pour le guide complet détaillé.
