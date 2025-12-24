# 🚨 Diagnostic Problème Production - https://bedeew.com/

## 🔍 Problème Identifié

Le site en production **https://bedeew.com/** rencontre un problème de connexion à la base de données MongoDB.

---

## 📊 Causes Possibles

### 1. 🔴 IP Non Autorisée dans MongoDB Atlas

**Symptôme** : Erreur "IP not whitelisted" ou timeout de connexion

**Solution** :
1. Connectez-vous à [MongoDB Atlas](https://cloud.mongodb.com/)
2. Allez dans **Network Access**
3. Vérifiez que l'IP de votre serveur de production est autorisée

**Pour Render/Railway** :
- Ajoutez `0.0.0.0/0` (toutes les IPs) car les IPs peuvent changer
- Ou utilisez les IPs statiques de votre hébergeur

**Pour VPS/Hostinger** :
- Ajoutez l'IP fixe de votre serveur

### 2. 🔴 Identifiants MongoDB Incorrects

**Symptôme** : "Authentication failed" ou "Invalid credentials"

**Solution** :
1. Vérifiez la variable `MONGODB_URI` dans votre hébergeur
2. Format correct :
```
mongodb+srv://username:password@cluster.mongodb.net/bedeew_digital?retryWrites=true&w=majority
```

**Attention aux caractères spéciaux** :
- `@` → `%40`
- `#` → `%23`
- `$` → `%24`
- `%` → `%25`

### 3. 🔴 Cluster MongoDB Suspendu/Inactif

**Symptôme** : "Connection timeout" ou "Cluster not found"

**Solution** :
1. Connectez-vous à MongoDB Atlas
2. Vérifiez que votre cluster est **actif** (pas en pause)
3. Les clusters gratuits se mettent en pause après inactivité
4. Cliquez sur "Resume" si nécessaire

### 4. 🔴 Variables d'Environnement Non Configurées

**Symptôme** : Erreur "MONGODB_URI is not defined"

**Solution selon votre hébergeur** :

#### Si hébergé sur **Render** :
1. Allez dans votre service → **Environment**
2. Ajoutez/vérifiez :
```
MONGODB_URI=mongodb+srv://...
NODE_ENV=production
JWT_SECRET=...
```

#### Si hébergé sur **Railway** :
1. Allez dans votre projet → **Variables**
2. Ajoutez les variables nécessaires

#### Si hébergé sur **Vercel** (backend) :
1. Settings → Environment Variables
2. Ajoutez pour Production

#### Si hébergé sur **VPS/Hostinger** :
1. Créez le fichier `/var/www/bedeew/server/.env`
2. Ajoutez vos variables
3. Redémarrez le service : `pm2 restart bedeew-api`

### 5. 🔴 Limite de Connexions MongoDB Atteinte

**Symptôme** : "Too many connections" ou "Connection pool exhausted"

**Solution** :
1. MongoDB Atlas Free Tier : Max 500 connexions
2. Vérifiez dans Atlas → Metrics → Connections
3. Si limite atteinte, passez à un plan payant ou optimisez les connexions

### 6. 🔴 Base de Données Supprimée ou Renommée

**Symptôme** : "Database not found"

**Solution** :
1. Vérifiez dans MongoDB Atlas que la base `bedeew_digital` existe
2. Vérifiez le nom dans votre `MONGODB_URI`
3. Si supprimée, restaurez depuis un backup ou re-seed

---

## 🔧 Actions Immédiates à Faire

### Étape 1 : Vérifier MongoDB Atlas

```
✅ Cluster actif (pas en pause)
✅ IP du serveur autorisée dans Network Access
✅ Utilisateur existe dans Database Access
✅ Utilisateur a les permissions "Read and write to any database"
✅ Base de données "bedeew_digital" existe
```

### Étape 2 : Vérifier les Variables d'Environnement

Connectez-vous à votre hébergeur et vérifiez que ces variables existent :

```env
MONGODB_URI=mongodb+srv://username:password@cluster.mongodb.net/bedeew_digital
NODE_ENV=production
JWT_SECRET=votre_secret_production
PORT=5000
CLIENT_URL=https://bedeew.com
```

### Étape 3 : Tester la Connexion MongoDB

Depuis votre machine locale, testez la connexion avec la même URI de production :

```bash
cd server
node -e "
import('mongoose').then(async (mongoose) => {
  try {
    const uri = 'VOTRE_MONGODB_URI_PRODUCTION';
    await mongoose.default.connect(uri);
    console.log('✅ Connexion réussie !');
    const db = mongoose.default.connection.db;
    const collections = await db.listCollections().toArray();
    console.log('Collections:', collections.map(c => c.name));
    process.exit(0);
  } catch (err) {
    console.error('❌ Erreur:', err.message);
    process.exit(1);
  }
});
"
```

### Étape 4 : Vérifier les Logs de Production

#### Render :
```bash
# Dans le dashboard Render
Logs → Voir les erreurs MongoDB
```

#### Railway :
```bash
# Dans le dashboard Railway
Deployments → View Logs
```

#### VPS/Hostinger :
```bash
# SSH dans le serveur
pm2 logs bedeew-api
# ou
journalctl -u bedeew-api -n 100
```

---

## 🛠️ Solutions par Type d'Erreur

### Erreur : "MongoNetworkError: connection timed out"

**Cause** : IP non autorisée ou cluster inactif

**Solution** :
1. MongoDB Atlas → Network Access → Add IP Address → `0.0.0.0/0`
2. Vérifier que le cluster est actif

### Erreur : "MongoServerError: Authentication failed"

**Cause** : Mauvais identifiants

**Solution** :
1. Réinitialiser le mot de passe dans MongoDB Atlas → Database Access
2. Mettre à jour `MONGODB_URI` avec le nouveau mot de passe
3. Redéployer l'application

### Erreur : "MongooseServerSelectionError"

**Cause** : Impossible de se connecter au cluster

**Solution** :
1. Vérifier que l'URI est correcte
2. Vérifier que le cluster existe et est actif
3. Tester avec MongoDB Compass

### Erreur : "Database does not exist"

**Cause** : Base de données supprimée ou mauvais nom

**Solution** :
1. Vérifier le nom dans l'URI : `/bedeew_digital`
2. Créer la base si nécessaire
3. Re-seed les données : `npm run seed`

---

## 🔄 Procédure de Redéploiement

Si vous avez modifié les variables d'environnement :

### Render :
1. Modifier les variables dans Environment
2. Cliquer sur "Manual Deploy" → "Deploy latest commit"

### Railway :
1. Modifier les variables
2. Le redéploiement est automatique

### VPS/Hostinger :
```bash
# SSH dans le serveur
cd /var/www/bedeew/server
nano .env  # Modifier les variables
pm2 restart bedeew-api
pm2 logs bedeew-api  # Vérifier les logs
```

---

## 📞 Checklist de Diagnostic

Cochez au fur et à mesure :

### MongoDB Atlas
- [ ] Cluster actif (pas en pause)
- [ ] IP `0.0.0.0/0` autorisée dans Network Access
- [ ] Utilisateur existe avec bon mot de passe
- [ ] Utilisateur a permissions "Read and write"
- [ ] Base `bedeew_digital` existe
- [ ] Collections visibles (services, portfolio, blog, users)

### Hébergeur (Render/Railway/VPS)
- [ ] Variable `MONGODB_URI` configurée
- [ ] Variable `NODE_ENV=production` configurée
- [ ] Variable `JWT_SECRET` configurée
- [ ] Application déployée et running
- [ ] Logs accessibles

### Tests
- [ ] Connexion MongoDB testée depuis local
- [ ] API accessible : https://votre-api.com/health
- [ ] Frontend charge : https://bedeew.com/
- [ ] Pas d'erreurs CORS
- [ ] Données s'affichent correctement

---

## 🆘 Si Rien ne Fonctionne

### Option 1 : Créer un Nouveau Cluster MongoDB

1. Créez un nouveau cluster gratuit sur MongoDB Atlas
2. Créez un nouvel utilisateur
3. Autorisez `0.0.0.0/0`
4. Obtenez la nouvelle URI
5. Mettez à jour `MONGODB_URI` sur votre hébergeur
6. Importez vos données ou re-seed

### Option 2 : Migrer vers un Autre Hébergeur

Si votre hébergeur actuel pose problème :

**Backend recommandés** :
- Render.com (gratuit, facile)
- Railway.app (gratuit, moderne)
- Fly.io (gratuit, performant)

**Frontend recommandés** :
- Vercel (gratuit, rapide)
- Netlify (gratuit, simple)

---

## 📊 Informations Nécessaires pour Vous Aider

Pour que je puisse vous aider davantage, dites-moi :

1. **Où est hébergé le backend** ? (Render, Railway, VPS, Hostinger, autre)
2. **Où est hébergé le frontend** ? (Vercel, Netlify, Hostinger, autre)
3. **Quel est le message d'erreur exact** ? (dans les logs ou sur le site)
4. **Avez-vous accès à MongoDB Atlas** ? (pouvez-vous vous connecter)
5. **Le site fonctionnait avant** ? (quand s'est arrêté le fonctionnement)

---

## 🎯 Actions Prioritaires MAINTENANT

### 1️⃣ Vérifier MongoDB Atlas (5 min)
- Connectez-vous à https://cloud.mongodb.com/
- Vérifiez que le cluster est actif
- Ajoutez `0.0.0.0/0` dans Network Access

### 2️⃣ Vérifier les Variables d'Environnement (5 min)
- Connectez-vous à votre hébergeur
- Vérifiez que `MONGODB_URI` est configurée
- Vérifiez qu'elle est correcte (pas d'espaces, bon format)

### 3️⃣ Redéployer (2 min)
- Cliquez sur "Redeploy" ou "Restart"
- Attendez que le déploiement se termine
- Vérifiez les logs

### 4️⃣ Tester (1 min)
- Ouvrez https://bedeew.com/
- Vérifiez si les données s'affichent

---

**Dites-moi où vous êtes hébergé et quel est le message d'erreur exact, je vous guiderai étape par étape !** 🚀
