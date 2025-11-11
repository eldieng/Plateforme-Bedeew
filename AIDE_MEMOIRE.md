# 📝 Aide-Mémoire - Bedeew Digital Platform

## ⚡ Commandes Essentielles

```bash
# Installation complète
npm run install:all

# Peupler la base de données
cd server && npm run seed

# Démarrer l'application (frontend + backend)
npm run dev

# Démarrer uniquement le backend
cd server && npm run dev

# Démarrer uniquement le frontend
cd client && npm run dev
```

---

## 🔐 Comptes de Test

### Admin
```
Email: admin@bedeew.digital
Mot de passe: Admin123!
```

### User
```
Email: john@example.com
Mot de passe: User123!
```

---

## 🌐 URLs

| Service | URL |
|---------|-----|
| Frontend | http://localhost:5173 |
| Backend API | http://localhost:5000/api |
| Health Check | http://localhost:5000/health |

---

## 📊 Base de Données

### Connexion MongoDB Atlas
```
mongodb+srv://elelhadjidieng_db_user:Aladji@04@cluster0.vjfnmxo.mongodb.net/bedeew_digital
```

### Collections
- `users` - 2 documents
- `services` - 6 documents
- `portfolios` - 6 documents
- `contacts` - vide au départ

---

## 🛠️ API Endpoints

### Authentification
```bash
# Inscription
POST /api/auth/register

# Connexion
POST /api/auth/login

# Profil
GET /api/auth/me
```

### Services
```bash
# Liste
GET /api/services

# Détail
GET /api/services/:slug

# Créer (admin)
POST /api/services

# Modifier (admin)
PUT /api/services/:id

# Supprimer (admin)
DELETE /api/services/:id
```

### Portfolio
```bash
# Liste
GET /api/portfolio

# Détail
GET /api/portfolio/:slug

# Créer (admin)
POST /api/portfolio

# Modifier (admin)
PUT /api/portfolio/:id

# Supprimer (admin)
DELETE /api/portfolio/:id
```

### Contact
```bash
# Envoyer
POST /api/contact

# Liste (admin)
GET /api/contact

# Détail (admin)
GET /api/contact/:id
```

---

## 📁 Structure des Fichiers

```
Plateforme_Bedeew/
├── client/                    # Frontend React
│   ├── src/
│   │   ├── components/       # Composants réutilisables
│   │   │   ├── auth/        # ProtectedRoute
│   │   │   └── layout/      # Navbar, Footer, Layout
│   │   ├── pages/           # Pages de l'application
│   │   │   ├── auth/        # Login, Register
│   │   │   ├── dashboard/   # Dashboard
│   │   │   ├── Home.jsx
│   │   │   ├── About.jsx
│   │   │   ├── Services.jsx
│   │   │   ├── Portfolio.jsx
│   │   │   └── Contact.jsx
│   │   ├── context/         # AuthContext
│   │   ├── App.jsx
│   │   └── main.jsx
│   ├── public/
│   ├── .env.example
│   └── package.json
│
├── server/                   # Backend Node.js
│   ├── src/
│   │   ├── controllers/     # Logique métier
│   │   │   ├── authController.js
│   │   │   ├── contactController.js
│   │   │   ├── portfolioController.js
│   │   │   └── serviceController.js
│   │   ├── models/          # Modèles MongoDB
│   │   │   ├── User.js
│   │   │   ├── Contact.js
│   │   │   ├── Service.js
│   │   │   ├── Portfolio.js
│   │   │   ├── Course.js (Phase 2)
│   │   │   ├── Job.js (Phase 2)
│   │   │   └── Application.js (Phase 2)
│   │   ├── routes/          # Routes API
│   │   │   ├── index.js
│   │   │   ├── authRoutes.js
│   │   │   ├── contactRoutes.js
│   │   │   ├── portfolioRoutes.js
│   │   │   └── serviceRoutes.js
│   │   ├── middleware/      # Middlewares
│   │   │   ├── auth.js
│   │   │   ├── errorHandler.js
│   │   │   └── rateLimiter.js
│   │   ├── seeds/           # Données initiales
│   │   │   └── seedData.js
│   │   ├── utils/           # Utilitaires
│   │   │   └── email.js
│   │   ├── config/          # Configuration
│   │   │   └── database.js
│   │   └── server.js        # Point d'entrée
│   ├── .env.example
│   └── package.json
│
└── Documentation/
    ├── README.md
    ├── COMMENCER_ICI.md ⭐
    ├── DEMARRAGE_IMMEDIAT.md
    ├── QUICK_START.md
    ├── INSTALLATION.md
    ├── DATABASE_SETUP.md
    ├── API_DOCUMENTATION.md
    ├── DEPLOYMENT.md
    ├── PHASE2_ROADMAP.md
    ├── CONTRIBUTING.md
    ├── RESUME_MODIFICATIONS.md
    ├── CHANGEMENTS_BASE_DE_DONNEES.md
    ├── AVANT_APRES.md
    └── AIDE_MEMOIRE.md (ce fichier)
```

---

## 🎨 Personnalisation Rapide

### Modifier les Services
```bash
# Éditer le fichier
nano server/src/seeds/seedData.js

# Modifier le tableau 'services'

# Réinitialiser la base
cd server && npm run seed
```

### Modifier les Projets Portfolio
```bash
# Même fichier
nano server/src/seeds/seedData.js

# Modifier le tableau 'portfolios'

# Réinitialiser la base
cd server && npm run seed
```

### Changer les Couleurs
```bash
# Éditer le fichier Tailwind
nano client/tailwind.config.js

# Modifier les couleurs primary et secondary
```

---

## 🔧 Dépannage Rapide

### Port déjà utilisé
```bash
# Windows
netstat -ano | findstr :5000
taskkill /PID <PID> /F

# Linux/Mac
lsof -i :5000
kill -9 <PID>

# Ou changer le port dans .env
PORT=5001
```

### Erreur MongoDB
```bash
# Vérifier la connexion
curl http://localhost:5000/health

# Réinitialiser la base
cd server && npm run seed
```

### Frontend ne charge pas
```bash
# Vérifier que le backend est démarré
curl http://localhost:5000/api/services

# Redémarrer le frontend
cd client && npm run dev
```

### Erreur npm install
```bash
# Nettoyer le cache
npm cache clean --force
rm -rf node_modules package-lock.json
npm install
```

---

## 📚 Documentation par Besoin

| Besoin | Fichier |
|--------|---------|
| **Démarrer rapidement** | [COMMENCER_ICI.md](./COMMENCER_ICI.md) |
| **Voir les changements** | [RESUME_MODIFICATIONS.md](./RESUME_MODIFICATIONS.md) |
| **Comprendre la base de données** | [DATABASE_SETUP.md](./DATABASE_SETUP.md) |
| **Utiliser l'API** | [API_DOCUMENTATION.md](./API_DOCUMENTATION.md) |
| **Déployer** | [DEPLOYMENT.md](./DEPLOYMENT.md) |
| **Phase 2** | [PHASE2_ROADMAP.md](./PHASE2_ROADMAP.md) |
| **Contribuer** | [CONTRIBUTING.md](./CONTRIBUTING.md) |

---

## 🎯 Checklist Rapide

### Installation
- [ ] `npm run install:all`
- [ ] `cd server && cp .env.example .env`
- [ ] `cd client && cp .env.example .env`
- [ ] `cd server && npm run seed`
- [ ] `npm run dev`

### Vérification
- [ ] http://localhost:5173 accessible
- [ ] 6 services visibles
- [ ] 6 projets portfolio visibles
- [ ] Connexion fonctionne
- [ ] Dashboard accessible

### Personnalisation
- [ ] Modifier les services dans seed
- [ ] Modifier les projets dans seed
- [ ] Ajouter vos images
- [ ] Configurer l'email

---

## 💡 Astuces

### Développement
- Hot reload activé (Vite + Nodemon)
- Consultez les logs dans le terminal
- Utilisez React DevTools

### Base de Données
- MongoDB Compass pour visualiser
- Réinitialisez avec `npm run seed`
- Backups automatiques sur Atlas

### Production
- Changez tous les mots de passe
- Configurez les variables d'environnement
- Suivez [DEPLOYMENT.md](./DEPLOYMENT.md)

---

## 🚀 Commandes de Production

```bash
# Build frontend
cd client && npm run build

# Démarrer backend en production
cd server && npm start

# Variables d'environnement production
NODE_ENV=production
```

---

## 📞 Support

### Erreur ?
1. Vérifier les logs du terminal
2. Consulter [DATABASE_SETUP.md](./DATABASE_SETUP.md)
3. Réinitialiser : `npm run seed`

### Question ?
- Consulter la documentation
- Vérifier [API_DOCUMENTATION.md](./API_DOCUMENTATION.md)
- Lire [CONTRIBUTING.md](./CONTRIBUTING.md)

---

## ⭐ Raccourcis Utiles

```bash
# Tout réinitialiser
cd server && npm run seed && cd .. && npm run dev

# Vérifier l'API
curl http://localhost:5000/api/services

# Se connecter (obtenir un token)
curl -X POST http://localhost:5000/api/auth/login \
  -H "Content-Type: application/json" \
  -d '{"email":"admin@bedeew.digital","password":"Admin123!"}'

# Créer un service (avec token)
curl -X POST http://localhost:5000/api/services \
  -H "Content-Type: application/json" \
  -H "Authorization: Bearer YOUR_TOKEN" \
  -d '{"title":"Test","shortDescription":"Test","fullDescription":"Test","category":"development","published":true}'
```

---

**Gardez ce fichier à portée de main ! 📌**
