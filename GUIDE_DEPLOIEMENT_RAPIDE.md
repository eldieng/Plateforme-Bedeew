# 🚀 Guide de Déploiement Rapide

## ⚡ Déploiement Express (30 minutes)

### Option Recommandée: Vercel + Render

---

## 📦 1. Préparation (5 min)

### Vérifier que tout fonctionne localement
```bash
# Terminal 1 - Backend
cd server
npm run dev

# Terminal 2 - Frontend  
cd client
npm run dev
```

✅ Tout doit fonctionner sur `http://localhost:5173`

---

## 🔐 2. Sécuriser les Secrets (5 min)

### Générer un nouveau JWT_SECRET
```bash
node -e "console.log(require('crypto').randomBytes(64).toString('hex'))"
```

### Vérifier que .env n'est PAS commité
```bash
git status
# .env ne doit PAS apparaître dans les fichiers à commiter
```

---

## 🌐 3. Déployer le Backend sur Render (10 min)

### Étape 1: Créer un compte sur [Render.com](https://render.com)

### Étape 2: Nouveau Web Service
1. Cliquer sur "New +" → "Web Service"
2. Connecter votre repo GitHub
3. Sélectionner le repo `Plateforme_Bedeew`

### Étape 3: Configuration
```
Name: bedeew-api
Region: Frankfurt (ou le plus proche)
Branch: main
Root Directory: server
Runtime: Node
Build Command: npm install
Start Command: npm start
```

### Étape 4: Variables d'Environnement
Ajouter toutes ces variables:

```bash
NODE_ENV=production
PORT=5000
MONGODB_URI=mongodb+srv://elelhadjidieng_db_user:Aladji%4004@cluster0.vjfnmxo.mongodb.net/bedeew_digital?retryWrites=true&w=majority
JWT_SECRET=[VOTRE_NOUVEAU_SECRET_GENERE]
JWT_EXPIRE=7d
CLIENT_URL=https://bedeew.vercel.app
EMAIL_HOST=smtp.gmail.com
EMAIL_PORT=587
EMAIL_USER=[VOTRE_EMAIL]
EMAIL_PASSWORD=[MOT_DE_PASSE_APP]
EMAIL_FROM=noreply@bedeew.digital
CLOUDINARY_CLOUD_NAME=[VOTRE_CLOUD_NAME]
CLOUDINARY_API_KEY=[VOTRE_API_KEY]
CLOUDINARY_API_SECRET=[VOTRE_API_SECRET]
RATE_LIMIT_WINDOW_MS=900000
RATE_LIMIT_MAX_REQUESTS=100
```

### Étape 5: Déployer
1. Cliquer sur "Create Web Service"
2. Attendre 3-5 minutes
3. Noter l'URL: `https://bedeew-api.onrender.com`

### ✅ Tester
```bash
curl https://bedeew-api.onrender.com/health
```

---

## 🎨 4. Déployer le Frontend sur Vercel (10 min)

### Étape 1: Installer Vercel CLI
```bash
npm install -g vercel
```

### Étape 2: Se connecter
```bash
vercel login
```

### Étape 3: Configurer le projet
```bash
cd client
```

Créer `vercel.json`:
```json
{
  "buildCommand": "npm run build",
  "outputDirectory": "dist",
  "framework": "vite",
  "rewrites": [
    {
      "source": "/(.*)",
      "destination": "/index.html"
    }
  ]
}
```

### Étape 4: Déployer
```bash
vercel --prod
```

### Étape 5: Configurer les Variables d'Environnement
Sur le dashboard Vercel:
1. Aller dans Settings → Environment Variables
2. Ajouter:

```bash
VITE_API_URL=https://bedeew-api.onrender.com/api
VITE_WHATSAPP_NUMBER=+221XXXXXXXXX
VITE_SITE_NAME=Bedeew Digital
VITE_SITE_URL=https://bedeew.vercel.app
```

### Étape 6: Redéployer
```bash
vercel --prod
```

### ✅ Tester
Ouvrir `https://bedeew.vercel.app`

---

## 🔄 5. Mettre à Jour le CORS (2 min)

### Sur Render
1. Aller dans Environment
2. Modifier `CLIENT_URL`:
```bash
CLIENT_URL=https://bedeew.vercel.app
```
3. Redéployer

---

## 🎯 6. Tests Finaux (3 min)

### Tester toutes les pages
- [ ] Page d'accueil
- [ ] Services
- [ ] Portfolio (cliquer sur un projet)
- [ ] Blog
- [ ] Contact (envoyer un message)
- [ ] Admin (se connecter)

### Tester sur mobile
- [ ] Ouvrir sur smartphone
- [ ] Vérifier la navigation
- [ ] Tester un formulaire

---

## 🎉 C'est Déployé !

### URLs de Production
- **Frontend**: https://bedeew.vercel.app
- **Backend**: https://bedeew-api.onrender.com
- **API**: https://bedeew-api.onrender.com/api

---

## 🔧 Commandes Utiles

### Redéployer le Frontend
```bash
cd client
vercel --prod
```

### Voir les logs Backend
Sur Render Dashboard → Logs

### Rollback
Sur Vercel/Render → Deployments → Rollback

---

## 🆘 Problèmes Courants

### 1. "API not responding"
**Solution**: Vérifier que `VITE_API_URL` est correct dans Vercel

### 2. "CORS error"
**Solution**: Vérifier que `CLIENT_URL` est correct dans Render

### 3. "Database connection failed"
**Solution**: Vérifier que `MONGODB_URI` est correct

### 4. "Images not loading"
**Solution**: Vérifier Cloudinary credentials

---

## 📱 Domaine Personnalisé (Optionnel)

### Sur Vercel
1. Settings → Domains
2. Ajouter `bedeew.digital`
3. Configurer les DNS:
```
Type: A
Name: @
Value: 76.76.21.21

Type: CNAME
Name: www
Value: cname.vercel-dns.com
```

### Sur Render
1. Settings → Custom Domain
2. Ajouter `api.bedeew.digital`
3. Configurer les DNS:
```
Type: CNAME
Name: api
Value: bedeew-api.onrender.com
```

---

## 🎓 Prochaines Étapes

1. **Monitoring**
   - Configurer Uptime Robot
   - Ajouter Google Analytics

2. **SEO**
   - Soumettre à Google Search Console
   - Créer un sitemap

3. **Performance**
   - Tester avec Lighthouse
   - Optimiser les images

4. **Sécurité**
   - Activer 2FA sur tous les services
   - Configurer les backups

---

## 📞 Support

**En cas de problème:**
1. Vérifier les logs
2. Consulter `CHECKLIST_DEPLOIEMENT.md`
3. Vérifier les variables d'environnement
4. Redéployer

**Contacts:**
- Render Support: https://render.com/docs
- Vercel Support: https://vercel.com/support

---

**Temps Total**: ~30 minutes  
**Difficulté**: Facile  
**Coût**: Gratuit (plans free tier)

🎉 **Félicitations ! Votre site est en ligne !**
