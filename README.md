# 🌟 Bedeew Digital Platform

Plateforme digitale complète intégrant :
- 🎨 Agence de communication et marketing digital
- 📚 Espace de formations gratuites
- 💼 Module de recrutement

## 📋 Structure du Projet

```
Plateforme_Bedeew/
├── client/          # Frontend React + Vite + TailwindCSS
├── server/          # Backend Node.js + Express + MongoDB
└── docs/            # Documentation
```

## 🚀 Phases de Développement

### Phase 1 - Site Vitrine Professionnel (MVP)
✅ Pages publiques (Accueil, Services, Portfolio, Contact)
✅ Formulaire de devis
✅ Interface admin basique
✅ SEO optimisé

### Phase 2 - Formations & Recrutement
📚 Module e-learning avec certificats
💼 Plateforme de recrutement
👥 Gestion des utilisateurs avancée

## 🛠️ Technologies

### Frontend
- **Framework**: React 18 + Vite
- **Styling**: TailwindCSS + shadcn/ui
- **Icons**: Lucide React
- **Routing**: React Router v6
- **State Management**: React Context + Hooks
- **Forms**: React Hook Form + Zod
- **HTTP Client**: Axios

### Backend
- **Runtime**: Node.js 18+
- **Framework**: Express.js
- **Database**: MongoDB + Mongoose
- **Authentication**: JWT + bcrypt
- **Validation**: Express Validator
- **File Upload**: Multer
- **Email**: Nodemailer
- **Security**: Helmet, CORS, Rate Limiting

## 📦 Installation

### Prérequis
- Node.js 18+
- npm ou yarn

**Note** : MongoDB est déjà configuré sur Atlas, pas besoin d'installation locale !

### Installation Rapide

```bash
# 1. Installer toutes les dépendances
npm run install:all

# 2. Configurer l'environnement
cd server
cp .env.example .env
cd ../client
cp .env.example .env

# 3. Peupler la base de données
cd ../server
npm run seed

# 4. Démarrer l'application
cd ..
npm run dev
```

Voir [DATABASE_SETUP.md](./DATABASE_SETUP.md) pour plus de détails sur la base de données.

## 🌐 Déploiement

### Backend
- **Recommandé**: Render, Railway, ou VPS
- **Base de données**: MongoDB Atlas

### Frontend
- **Recommandé**: Vercel, Netlify, ou Hostinger

## 📝 Variables d'Environnement

Voir `.env.example` dans chaque dossier pour la configuration complète.

## 🔒 Sécurité

- HTTPS obligatoire en production
- Protection XSS/CSRF
- Rate limiting sur les API
- Validation des entrées
- Sanitization des données

## 📧 Contact

**Bedeew Digital**
- Email: contact@bedeew.digital
- Site: https://bedeew.digital

## 📄 Licence

Propriétaire - Tous droits réservés © 2024 Bedeew Digital
