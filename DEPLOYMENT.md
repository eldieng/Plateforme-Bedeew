# 🚀 Guide de Déploiement - Bedeew Digital Platform

## 📋 Options de Déploiement

### Option 1 : Hébergement Séparé (Recommandé)

- **Frontend** : Vercel, Netlify, ou Hostinger
- **Backend** : Render, Railway, ou VPS
- **Base de données** : MongoDB Atlas

### Option 2 : VPS Complet

- DigitalOcean, Linode, ou Hostinger VPS
- Tout sur un seul serveur

## 🌐 Déploiement Frontend (Vercel)

### 1. Préparer le build

```bash
cd client
npm run build
```

### 2. Déployer sur Vercel

```bash
# Installer Vercel CLI
npm install -g vercel

# Se connecter
vercel login

# Déployer
vercel --prod
```

### 3. Variables d'environnement Vercel

Dans le dashboard Vercel, ajouter :

```
VITE_API_URL=https://votre-api.render.com/api
VITE_WHATSAPP_NUMBER=+221XXXXXXXXX
VITE_SITE_NAME=Bedeew Digital
```

## 🔧 Déploiement Backend (Render)

### 1. Créer un compte sur Render.com

### 2. Créer un nouveau Web Service

- **Build Command** : `cd server && npm install`
- **Start Command** : `cd server && npm start`
- **Environment** : Node

### 3. Variables d'environnement Render

```
NODE_ENV=production
PORT=5000
MONGODB_URI=mongodb+srv://user:pass@cluster.mongodb.net/bedeew
JWT_SECRET=votre_secret_production_tres_securise
JWT_EXPIRE=7d
EMAIL_HOST=smtp.gmail.com
EMAIL_PORT=587
EMAIL_USER=votre_email@gmail.com
EMAIL_PASSWORD=votre_mot_de_passe_app
EMAIL_FROM=noreply@bedeew.digital
CLIENT_URL=https://votre-site.vercel.app
CLOUDINARY_CLOUD_NAME=your_cloud_name
CLOUDINARY_API_KEY=your_api_key
CLOUDINARY_API_SECRET=your_api_secret
```

## 🗄️ MongoDB Atlas

### 1. Créer un cluster gratuit

1. Aller sur [MongoDB Atlas](https://www.mongodb.com/cloud/atlas)
2. Créer un compte et un cluster gratuit
3. Créer un utilisateur de base de données
4. Whitelist l'IP `0.0.0.0/0` (toutes les IPs)

### 2. Obtenir l'URI de connexion

```
mongodb+srv://username:password@cluster0.xxxxx.mongodb.net/bedeew_digital?retryWrites=true&w=majority
```

## 🔒 Sécurité en Production

### 1. Variables d'environnement

- ✅ Utiliser des secrets forts et uniques
- ✅ Ne jamais commiter les fichiers `.env`
- ✅ Utiliser des services de gestion de secrets

### 2. HTTPS

- ✅ Activer HTTPS (automatique sur Vercel/Render)
- ✅ Rediriger HTTP vers HTTPS

### 3. CORS

Configurer CORS pour autoriser uniquement votre domaine :

```javascript
app.use(cors({
  origin: process.env.CLIENT_URL,
  credentials: true
}));
```

### 4. Rate Limiting

Déjà configuré dans le projet, ajuster si nécessaire.

## 📊 Monitoring

### Backend (Render)

- Logs disponibles dans le dashboard
- Métriques de performance
- Alertes automatiques

### Frontend (Vercel)

- Analytics intégré
- Logs de déploiement
- Monitoring des erreurs

### Base de données (MongoDB Atlas)

- Monitoring des performances
- Alertes de stockage
- Backups automatiques

## 🔄 CI/CD

### GitHub Actions (optionnel)

Créer `.github/workflows/deploy.yml` :

```yaml
name: Deploy

on:
  push:
    branches: [main]

jobs:
  deploy-frontend:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v2
      - name: Deploy to Vercel
        run: |
          cd client
          npm install
          npm run build
          vercel --prod --token=${{ secrets.VERCEL_TOKEN }}

  deploy-backend:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v2
      - name: Deploy to Render
        # Render se déploie automatiquement via Git
```

## 🌍 Domaine Personnalisé

### Vercel

1. Aller dans Settings > Domains
2. Ajouter votre domaine : `bedeew.digital`
3. Configurer les DNS selon les instructions

### Render

1. Aller dans Settings > Custom Domains
2. Ajouter : `api.bedeew.digital`
3. Configurer les DNS

## 📝 Checklist de Déploiement

### Avant le déploiement

- [ ] Tests passent localement
- [ ] Variables d'environnement configurées
- [ ] MongoDB Atlas configuré
- [ ] Secrets JWT générés
- [ ] Email configuré et testé
- [ ] Build frontend réussi

### Après le déploiement

- [ ] Tester toutes les routes API
- [ ] Tester le formulaire de contact
- [ ] Vérifier l'authentification
- [ ] Tester sur mobile
- [ ] Vérifier les performances (Lighthouse)
- [ ] Configurer les backups MongoDB
- [ ] Configurer le monitoring

## 🐛 Dépannage Production

### Erreur 500 Backend

```bash
# Vérifier les logs Render
render logs

# Vérifier la connexion MongoDB
# Tester l'URI dans MongoDB Compass
```

### Build Frontend échoue

```bash
# Vérifier les dépendances
npm ci

# Build local
npm run build

# Vérifier les variables d'environnement
```

### CORS Errors

Vérifier que `CLIENT_URL` dans le backend correspond exactement à l'URL du frontend.

## 📈 Optimisations

### Frontend

- ✅ Lazy loading des images
- ✅ Code splitting (Vite)
- ✅ Compression Gzip
- ✅ CDN (automatique avec Vercel)

### Backend

- ✅ Compression des réponses
- ✅ Cache des requêtes fréquentes
- ✅ Index MongoDB optimisés
- ✅ Rate limiting

## 💰 Coûts Estimés

### Gratuit (Starter)

- Vercel : Gratuit (100GB bandwidth)
- Render : Gratuit (750h/mois)
- MongoDB Atlas : Gratuit (512MB)

### Production (Payant)

- Vercel Pro : $20/mois
- Render Standard : $7/mois
- MongoDB Atlas : $9/mois (2GB)
- **Total** : ~$36/mois

## 📞 Support

Pour toute question sur le déploiement :
- Documentation Vercel : https://vercel.com/docs
- Documentation Render : https://render.com/docs
- Documentation MongoDB Atlas : https://docs.atlas.mongodb.com

---

**Bon déploiement ! 🚀**
