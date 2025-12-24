# 🚀 Déploiement Complet de https://bedeew.com/ à Partir de Zéro

## 📋 Vue d'Ensemble

Ce guide vous permettra de déployer complètement votre site **bedeew.com** avec :
- **Frontend** : Site web React (Vercel ou Netlify)
- **Backend** : API Node.js (Render ou Railway)
- **Base de données** : MongoDB Atlas (déjà configuré)
- **Domaine** : bedeew.com

---

## 🎯 Architecture Recommandée

```
bedeew.com (Frontend)
    ↓
api.bedeew.com (Backend API)
    ↓
MongoDB Atlas (Base de données)
```

---

## 📦 Prérequis

- [ ] Compte GitHub avec le code source
- [ ] Compte MongoDB Atlas (déjà fait ✅)
- [ ] Domaine bedeew.com avec accès aux DNS
- [ ] Compte Vercel (pour frontend) OU Netlify
- [ ] Compte Render (pour backend) OU Railway

---

## 🔧 PARTIE 1 : Déploiement du Backend (API)

### Option A : Déploiement sur Render.com (Recommandé)

#### Étape 1.1 : Créer un Compte Render

1. Allez sur https://render.com/
2. Inscrivez-vous avec GitHub
3. Autorisez l'accès à votre repo GitHub

#### Étape 1.2 : Créer un Web Service

1. Cliquez sur **"New +"** → **"Web Service"**
2. Connectez votre repo GitHub : `eldieng/Plateforme-Bedeew`
3. Configurez :
   - **Name** : `bedeew-api`
   - **Region** : Frankfurt (plus proche de l'Afrique)
   - **Branch** : `main`
   - **Root Directory** : `server`
   - **Runtime** : Node
   - **Build Command** : `npm install`
   - **Start Command** : `npm start`
   - **Instance Type** : Free (ou Starter $7/mois pour production)

#### Étape 1.3 : Configurer les Variables d'Environnement

Dans l'onglet **"Environment"**, ajoutez :

```env
NODE_ENV=production
PORT=5000
MONGODB_URI=mongodb+srv://votre_user:votre_pass@cluster0.xxxxx.mongodb.net/bedeew_digital?retryWrites=true&w=majority
JWT_SECRET=votre_secret_production_tres_long_et_securise_minimum_64_caracteres
JWT_EXPIRE=7d
EMAIL_HOST=smtp.gmail.com
EMAIL_PORT=587
EMAIL_USER=votre_email@gmail.com
EMAIL_PASSWORD=votre_mot_de_passe_application_gmail
EMAIL_FROM=noreply@bedeew.com
CLIENT_URL=https://bedeew.com
CLOUDINARY_CLOUD_NAME=votre_cloud_name
CLOUDINARY_API_KEY=votre_api_key
CLOUDINARY_API_SECRET=votre_api_secret
```

**IMPORTANT** : 
- Générez un nouveau JWT_SECRET fort : `openssl rand -hex 64`
- Utilisez un mot de passe d'application Gmail (pas votre mot de passe principal)

#### Étape 1.4 : Déployer

1. Cliquez sur **"Create Web Service"**
2. Attendez la fin du build (5-10 minutes)
3. Votre API sera disponible sur : `https://bedeew-api.onrender.com`

#### Étape 1.5 : Tester l'API

```bash
curl https://bedeew-api.onrender.com/health
curl https://bedeew-api.onrender.com/api/services
```

Vous devriez recevoir des réponses JSON.

---

### Option B : Déploiement sur Railway.app (Alternative)

#### Étape 1.1 : Créer un Compte Railway

1. Allez sur https://railway.app/
2. Inscrivez-vous avec GitHub

#### Étape 1.2 : Créer un Nouveau Projet

1. Cliquez sur **"New Project"**
2. Sélectionnez **"Deploy from GitHub repo"**
3. Choisissez `eldieng/Plateforme-Bedeew`
4. Railway détecte automatiquement Node.js

#### Étape 1.3 : Configurer

1. Allez dans **"Variables"**
2. Ajoutez les mêmes variables que pour Render (voir ci-dessus)
3. Dans **"Settings"** :
   - **Root Directory** : `server`
   - **Start Command** : `npm start`

#### Étape 1.4 : Déployer

Le déploiement est automatique. Votre API sera sur : `https://votre-projet.up.railway.app`

---

## 🎨 PARTIE 2 : Déploiement du Frontend

### Option A : Déploiement sur Vercel (Recommandé)

#### Étape 2.1 : Créer un Compte Vercel

1. Allez sur https://vercel.com/
2. Inscrivez-vous avec GitHub
3. Autorisez l'accès à votre repo

#### Étape 2.2 : Importer le Projet

1. Cliquez sur **"Add New..."** → **"Project"**
2. Importez `eldieng/Plateforme-Bedeew`
3. Configurez :
   - **Framework Preset** : Vite
   - **Root Directory** : `client`
   - **Build Command** : `npm run build`
   - **Output Directory** : `dist`

#### Étape 2.3 : Configurer les Variables d'Environnement

Dans **"Environment Variables"**, ajoutez :

```env
VITE_API_URL=https://bedeew-api.onrender.com/api
VITE_WHATSAPP_NUMBER=+221XXXXXXXXX
VITE_SITE_NAME=Bedeew Digital
VITE_SITE_URL=https://bedeew.com
```

**Remplacez** `https://bedeew-api.onrender.com` par l'URL de votre backend.

#### Étape 2.4 : Déployer

1. Cliquez sur **"Deploy"**
2. Attendez la fin du build (2-5 minutes)
3. Votre site sera sur : `https://votre-projet.vercel.app`

#### Étape 2.5 : Tester

Ouvrez `https://votre-projet.vercel.app` et vérifiez que :
- ✅ Le site charge
- ✅ Les services s'affichent
- ✅ Les projets portfolio s'affichent
- ✅ Pas d'erreurs CORS

---

### Option B : Déploiement sur Netlify (Alternative)

#### Étape 2.1 : Créer un Compte Netlify

1. Allez sur https://netlify.com/
2. Inscrivez-vous avec GitHub

#### Étape 2.2 : Importer le Projet

1. Cliquez sur **"Add new site"** → **"Import an existing project"**
2. Connectez GitHub et sélectionnez votre repo
3. Configurez :
   - **Base directory** : `client`
   - **Build command** : `npm run build`
   - **Publish directory** : `client/dist`

#### Étape 2.3 : Variables d'Environnement

Dans **"Site settings"** → **"Environment variables"**, ajoutez les mêmes que Vercel.

#### Étape 2.4 : Déployer

Le déploiement démarre automatiquement.

---

## 🌐 PARTIE 3 : Configuration du Domaine bedeew.com

### Étape 3.1 : Configurer le Frontend (bedeew.com)

#### Sur Vercel :

1. Allez dans votre projet → **"Settings"** → **"Domains"**
2. Cliquez sur **"Add"**
3. Entrez : `bedeew.com`
4. Vercel vous donnera des enregistrements DNS à configurer

#### Configuration DNS (chez votre registrar) :

Ajoutez ces enregistrements DNS :

```
Type: A
Name: @
Value: 76.76.21.21

Type: CNAME
Name: www
Value: cname.vercel-dns.com
```

**OU** si Vercel vous donne d'autres valeurs, utilisez celles-ci.

#### Sur Netlify :

1. **"Domain settings"** → **"Add custom domain"**
2. Entrez `bedeew.com`
3. Configurez les DNS selon les instructions Netlify

---

### Étape 3.2 : Configurer le Backend (api.bedeew.com)

#### Sur Render :

1. Allez dans votre service → **"Settings"** → **"Custom Domains"**
2. Cliquez sur **"Add Custom Domain"**
3. Entrez : `api.bedeew.com`
4. Render vous donnera une valeur CNAME

#### Configuration DNS :

Ajoutez cet enregistrement :

```
Type: CNAME
Name: api
Value: bedeew-api.onrender.com (ou la valeur donnée par Render)
```

#### Sur Railway :

1. **"Settings"** → **"Networking"** → **"Custom Domain"**
2. Entrez `api.bedeew.com`
3. Configurez le CNAME selon les instructions

---

### Étape 3.3 : Attendre la Propagation DNS

- La propagation DNS peut prendre **5 minutes à 48 heures**
- Vérifiez avec : https://dnschecker.org/

---

## 🔐 PARTIE 4 : Sécurité et Configuration Finale

### Étape 4.1 : Activer HTTPS

- **Vercel/Netlify** : HTTPS automatique (Let's Encrypt)
- **Render/Railway** : HTTPS automatique

Vérifiez que `https://bedeew.com` et `https://api.bedeew.com` fonctionnent.

### Étape 4.2 : Mettre à Jour les Variables d'Environnement

#### Backend (Render/Railway) :

Mettez à jour `CLIENT_URL` :
```env
CLIENT_URL=https://bedeew.com
```

#### Frontend (Vercel/Netlify) :

Mettez à jour `VITE_API_URL` :
```env
VITE_API_URL=https://api.bedeew.com/api
VITE_SITE_URL=https://bedeew.com
```

### Étape 4.3 : Redéployer

- **Backend** : Cliquez sur "Manual Deploy" ou poussez un commit
- **Frontend** : Cliquez sur "Redeploy" ou poussez un commit

### Étape 4.4 : Vérifier MongoDB Atlas

1. Allez dans **"Network Access"**
2. Vérifiez que `0.0.0.0/0` est autorisé (pour Render/Railway)
3. Ou ajoutez les IPs spécifiques de votre hébergeur

---

## ✅ PARTIE 5 : Tests Finaux

### Checklist de Vérification :

- [ ] `https://bedeew.com` charge correctement
- [ ] `https://api.bedeew.com/health` retourne `{"success": true}`
- [ ] Les services s'affichent sur la page d'accueil
- [ ] Les projets portfolio s'affichent
- [ ] Les articles de blog s'affichent
- [ ] Le formulaire de contact fonctionne
- [ ] La connexion admin fonctionne (admin@bedeew.digital)
- [ ] Pas d'erreurs CORS dans la console
- [ ] Pas d'erreurs 500 dans les logs backend
- [ ] HTTPS actif sur les deux domaines
- [ ] Certificat SSL valide

### Tests à Effectuer :

```bash
# Test API
curl https://api.bedeew.com/health
curl https://api.bedeew.com/api/services
curl https://api.bedeew.com/api/portfolio
curl https://api.bedeew.com/api/blog

# Test Frontend
# Ouvrez dans le navigateur
https://bedeew.com/
https://bedeew.com/services
https://bedeew.com/portfolio
https://bedeew.com/blog
https://bedeew.com/contact
```

---

## 🔄 PARTIE 6 : Déploiement Automatique (CI/CD)

### Configuration Git Auto-Deploy

Une fois configuré, chaque `git push` déclenchera automatiquement :
- ✅ Rebuild du frontend sur Vercel/Netlify
- ✅ Rebuild du backend sur Render/Railway

### Pour Activer :

1. **Vercel/Netlify** : Déjà activé par défaut
2. **Render** : Activé par défaut sur la branche `main`
3. **Railway** : Activé par défaut

### Workflow :

```bash
# Faire des modifications
git add .
git commit -m "Update: amélioration du design"
git push origin main

# Attendre 5-10 minutes
# Le site sera automatiquement mis à jour !
```

---

## 📊 PARTIE 7 : Monitoring et Logs

### Backend (Render) :

1. Dashboard → Votre service → **"Logs"**
2. Voir les erreurs en temps réel
3. Configurer des alertes email

### Frontend (Vercel) :

1. Dashboard → Votre projet → **"Deployments"**
2. Voir les logs de build
3. Analytics intégré

### MongoDB Atlas :

1. Dashboard → **"Metrics"**
2. Surveiller les connexions
3. Configurer des alertes

---

## 💰 Coûts Estimés

### Option Gratuite (Starter) :

- **Vercel** : Gratuit (100GB bandwidth/mois)
- **Render** : Gratuit (750h/mois, se met en veille après inactivité)
- **MongoDB Atlas** : Gratuit (512MB)
- **Domaine** : ~$10-15/an
- **Total** : ~$10-15/an

### Option Production (Recommandé) :

- **Vercel Pro** : $20/mois (meilleure performance)
- **Render Starter** : $7/mois (pas de mise en veille)
- **MongoDB Atlas** : $9/mois (2GB + backups)
- **Domaine** : ~$10-15/an
- **Total** : ~$36/mois + domaine

---

## 🆘 Dépannage

### Erreur : "Application failed to respond"

**Cause** : Backend ne démarre pas

**Solution** :
1. Vérifiez les logs Render/Railway
2. Vérifiez que `MONGODB_URI` est correcte
3. Vérifiez que toutes les variables d'environnement sont configurées

### Erreur : "CORS Error"

**Cause** : Backend ne permet pas les requêtes depuis le frontend

**Solution** :
1. Vérifiez que `CLIENT_URL=https://bedeew.com` dans le backend
2. Redéployez le backend

### Erreur : "Failed to fetch"

**Cause** : Frontend ne peut pas joindre le backend

**Solution** :
1. Vérifiez que `VITE_API_URL=https://api.bedeew.com/api`
2. Testez `https://api.bedeew.com/health` dans le navigateur
3. Redéployez le frontend

### Site ne charge pas

**Cause** : DNS pas encore propagé ou mal configuré

**Solution** :
1. Vérifiez les enregistrements DNS avec https://dnschecker.org/
2. Attendez jusqu'à 48h pour la propagation
3. Videz le cache DNS : `ipconfig /flushdns` (Windows) ou `sudo dscacheutil -flushcache` (Mac)

---

## 📞 Support

### Documentation Officielle :

- **Vercel** : https://vercel.com/docs
- **Render** : https://render.com/docs
- **Railway** : https://docs.railway.app/
- **MongoDB Atlas** : https://docs.atlas.mongodb.com/

### Communautés :

- Discord Vercel : https://vercel.com/discord
- Discord Render : https://render.com/discord
- Forum MongoDB : https://www.mongodb.com/community/forums/

---

## ✅ Checklist Finale de Déploiement

### Avant de Commencer :
- [ ] Code source sur GitHub
- [ ] MongoDB Atlas configuré et accessible
- [ ] Domaine bedeew.com disponible
- [ ] Comptes créés (Vercel + Render)

### Backend :
- [ ] Service créé sur Render/Railway
- [ ] Variables d'environnement configurées
- [ ] Déploiement réussi
- [ ] API accessible via URL temporaire
- [ ] Tests API réussis

### Frontend :
- [ ] Projet créé sur Vercel/Netlify
- [ ] Variables d'environnement configurées
- [ ] Build réussi
- [ ] Site accessible via URL temporaire
- [ ] Données s'affichent correctement

### Domaine :
- [ ] DNS configuré pour bedeew.com
- [ ] DNS configuré pour api.bedeew.com
- [ ] HTTPS actif
- [ ] Certificats SSL valides
- [ ] Propagation DNS terminée

### Tests Finaux :
- [ ] Site charge sur https://bedeew.com
- [ ] API répond sur https://api.bedeew.com
- [ ] Pas d'erreurs CORS
- [ ] Toutes les pages fonctionnent
- [ ] Formulaires fonctionnent
- [ ] Connexion admin fonctionne

### Production :
- [ ] Mot de passe admin changé
- [ ] Compte de test supprimé
- [ ] Monitoring configuré
- [ ] Backups MongoDB activés
- [ ] Auto-deploy configuré

---

**Votre site sera en ligne sur https://bedeew.com/ ! 🎉**

**Temps estimé total : 2-3 heures**
