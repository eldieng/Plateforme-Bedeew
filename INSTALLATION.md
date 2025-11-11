# 📦 Guide d'Installation - Bedeew Digital Platform

## 🔧 Prérequis

Avant de commencer, assurez-vous d'avoir installé :

- **Node.js** 18+ ([Télécharger](https://nodejs.org/))
- **MongoDB** 6+ ([Télécharger](https://www.mongodb.com/try/download/community))
- **Git** ([Télécharger](https://git-scm.com/))
- Un éditeur de code (VS Code recommandé)

## 🚀 Installation Rapide

### 1. Cloner le projet (si depuis Git)

```bash
git clone <votre-repo-url>
cd Plateforme_Bedeew
```

### 2. Installer les dépendances

```bash
# Installer toutes les dépendances (root, client, server)
npm run install:all

# OU installer séparément
cd server && npm install
cd ../client && npm install
```

### 3. Configuration de l'environnement

#### Backend (.env)

```bash
cd server
cp .env.example .env
```

Éditez `server/.env` avec vos valeurs :

```env
NODE_ENV=development
PORT=5000
MONGODB_URI=mongodb://localhost:27017/bedeew_digital
JWT_SECRET=votre_secret_jwt_tres_securise_changez_moi
JWT_EXPIRE=7d
EMAIL_HOST=smtp.gmail.com
EMAIL_PORT=587
EMAIL_USER=votre_email@gmail.com
EMAIL_PASSWORD=votre_mot_de_passe_application
EMAIL_FROM=noreply@bedeew.digital
CLIENT_URL=http://localhost:5173
```

#### Frontend (.env)

```bash
cd client
cp .env.example .env
```

Éditez `client/.env` :

```env
VITE_API_URL=http://localhost:5000/api
VITE_WHATSAPP_NUMBER=+221XXXXXXXXX
VITE_SITE_NAME=Bedeew Digital
```

### 4. Démarrer MongoDB

```bash
# Windows
mongod

# Linux/Mac
sudo systemctl start mongod
```

### 5. Lancer l'application

#### Option 1 : Tout démarrer en même temps (recommandé)

```bash
# Depuis la racine du projet
npm run dev
```

#### Option 2 : Démarrer séparément

```bash
# Terminal 1 - Backend
cd server
npm run dev

# Terminal 2 - Frontend
cd client
npm run dev
```

### 6. Accéder à l'application

- **Frontend** : http://localhost:5173
- **Backend API** : http://localhost:5000/api
- **Health Check** : http://localhost:5000/health

## 👤 Créer un compte administrateur

### Via MongoDB Compass ou Shell

```javascript
use bedeew_digital

db.users.insertOne({
  firstName: "Admin",
  lastName: "Bedeew",
  email: "admin@bedeew.digital",
  password: "$2a$10$...", // Hash bcrypt du mot de passe
  role: "admin",
  isActive: true,
  createdAt: new Date(),
  updatedAt: new Date()
})
```

### Via l'API (après démarrage)

```bash
curl -X POST http://localhost:5000/api/auth/register \
  -H "Content-Type: application/json" \
  -d '{
    "firstName": "Admin",
    "lastName": "Bedeew",
    "email": "admin@bedeew.digital",
    "password": "Admin123!",
    "role": "admin"
  }'
```

## 📧 Configuration Email (Gmail)

1. Activer l'authentification à 2 facteurs sur votre compte Gmail
2. Générer un mot de passe d'application :
   - Aller sur https://myaccount.google.com/security
   - Sélectionner "Mots de passe des applications"
   - Générer un nouveau mot de passe
   - Utiliser ce mot de passe dans `EMAIL_PASSWORD`

## 🗄️ Données de test (optionnel)

Créez des services et portfolios de test via l'API ou MongoDB :

```javascript
// Exemple de service
db.services.insertOne({
  title: "Développement Web",
  slug: "developpement-web",
  shortDescription: "Sites web professionnels et performants",
  fullDescription: "Nous créons des sites web sur mesure...",
  icon: "code",
  category: "development",
  published: true,
  order: 1,
  createdAt: new Date(),
  updatedAt: new Date()
})
```

## 🐛 Résolution des problèmes

### MongoDB ne démarre pas

```bash
# Vérifier le statut
mongod --version

# Créer le dossier de données
mkdir -p /data/db

# Démarrer avec le bon chemin
mongod --dbpath /data/db
```

### Port déjà utilisé

```bash
# Trouver le processus
netstat -ano | findstr :5000  # Windows
lsof -i :5000                  # Linux/Mac

# Tuer le processus
taskkill /PID <PID> /F         # Windows
kill -9 <PID>                  # Linux/Mac
```

### Erreur CORS

Vérifiez que `CLIENT_URL` dans `server/.env` correspond à l'URL du frontend.

### Erreur de connexion MongoDB

```bash
# Vérifier que MongoDB est démarré
mongo --eval "db.adminCommand('ping')"

# Vérifier l'URI dans .env
MONGODB_URI=mongodb://localhost:27017/bedeew_digital
```

## 📝 Scripts disponibles

### Root

- `npm run dev` - Démarrer frontend + backend
- `npm run install:all` - Installer toutes les dépendances

### Backend (server/)

- `npm run dev` - Mode développement (nodemon)
- `npm start` - Mode production
- `npm test` - Lancer les tests

### Frontend (client/)

- `npm run dev` - Mode développement (Vite)
- `npm run build` - Build production
- `npm run preview` - Prévisualiser le build

## 🌐 Déploiement

Voir [DEPLOYMENT.md](./DEPLOYMENT.md) pour les instructions de déploiement en production.

## 📞 Support

En cas de problème :
- Vérifiez les logs dans la console
- Consultez la documentation MongoDB
- Contactez l'équipe de développement

---

**Prochaine étape** : Consultez [README.md](./README.md) pour la documentation complète du projet.
