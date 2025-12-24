# ⚡ Déploiement Rapide - bedeew.com

## 🎯 Résumé en 5 Étapes

### 1️⃣ Backend sur Render (15 min)
```
1. Render.com → New Web Service
2. Connecter GitHub repo
3. Root Directory: server
4. Ajouter variables d'environnement
5. Deploy
```

### 2️⃣ Frontend sur Vercel (10 min)
```
1. Vercel.com → New Project
2. Importer GitHub repo
3. Root Directory: client
4. Ajouter VITE_API_URL
5. Deploy
```

### 3️⃣ Configurer DNS (5 min)
```
bedeew.com → Vercel (A record)
api.bedeew.com → Render (CNAME)
```

### 4️⃣ Mettre à Jour les URLs (5 min)
```
Backend: CLIENT_URL=https://bedeew.com
Frontend: VITE_API_URL=https://api.bedeew.com/api
```

### 5️⃣ Tester (5 min)
```
✅ https://bedeew.com
✅ https://api.bedeew.com/health
✅ Données s'affichent
```

---

## 📋 Variables d'Environnement

### Backend (Render)
```env
NODE_ENV=production
MONGODB_URI=mongodb+srv://user:pass@cluster.mongodb.net/bedeew_digital
JWT_SECRET=votre_secret_64_caracteres
CLIENT_URL=https://bedeew.com
EMAIL_USER=votre_email@gmail.com
EMAIL_PASSWORD=mot_de_passe_app
CLOUDINARY_CLOUD_NAME=votre_cloud
CLOUDINARY_API_KEY=votre_key
CLOUDINARY_API_SECRET=votre_secret
```

### Frontend (Vercel)
```env
VITE_API_URL=https://api.bedeew.com/api
VITE_SITE_URL=https://bedeew.com
```

---

## 🚀 Commandes Utiles

### Tester l'API
```bash
curl https://api.bedeew.com/health
curl https://api.bedeew.com/api/services
```

### Vérifier DNS
```bash
nslookup bedeew.com
nslookup api.bedeew.com
```

---

## ⚠️ Problèmes Courants

| Problème | Solution |
|----------|----------|
| CORS Error | Vérifier `CLIENT_URL` dans backend |
| 500 Error | Vérifier `MONGODB_URI` |
| DNS ne résout pas | Attendre 24-48h |
| Build échoue | Vérifier les logs |

---

**Temps total : ~40 minutes** ⏱️

Voir `DEPLOIEMENT_COMPLET_BEDEEW_COM.md` pour le guide détaillé.
