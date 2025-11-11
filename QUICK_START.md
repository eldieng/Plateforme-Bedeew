# ⚡ Quick Start - Bedeew Digital Platform

## 🎯 Démarrage en 5 minutes

### 1️⃣ Prérequis

Installez Node.js 18+ (MongoDB est déjà sur Atlas ✅)

### 2️⃣ Installation

```bash
# Cloner et entrer dans le projet
cd Plateforme_Bedeew

# Installer toutes les dépendances
npm run install:all
```

### 3️⃣ Configuration

```bash
# Backend
cd server
cp .env.example .env
# L'URI MongoDB Atlas est déjà configuré !

# Frontend
cd ../client
cp .env.example .env
```

### 4️⃣ Peupler la Base de Données

```bash
cd server
npm run seed
```

Cela va créer :
- ✅ 2 utilisateurs (admin + user)
- ✅ 6 services professionnels
- ✅ 6 projets portfolio

### 5️⃣ Lancer l'application

```bash
# Depuis la racine du projet
cd ..
npm run dev
```

### 6️⃣ Accéder

- **Frontend** : http://localhost:5173
- **Backend** : http://localhost:5000/api

## 🎨 Créer du contenu

### Ajouter un service

```bash
curl -X POST http://localhost:5000/api/services \
  -H "Content-Type: application/json" \
  -H "Authorization: Bearer YOUR_TOKEN" \
  -d '{
    "title": "Développement Web",
    "shortDescription": "Sites web professionnels",
    "fullDescription": "Nous créons des sites web...",
    "icon": "code",
    "category": "development",
    "published": true
  }'
```

### Ajouter un projet portfolio

```bash
curl -X POST http://localhost:5000/api/portfolio \
  -H "Content-Type: application/json" \
  -H "Authorization: Bearer YOUR_TOKEN" \
  -d '{
    "title": "Site E-commerce",
    "description": "Boutique en ligne moderne",
    "category": "web",
    "published": true
  }'
```

## 📚 Documentation Complète

- [Installation Détaillée](./INSTALLATION.md)
- [Guide de Déploiement](./DEPLOYMENT.md)
- [Roadmap Phase 2](./PHASE2_ROADMAP.md)
- [README Principal](./README.md)

## 🆘 Problèmes ?

Consultez [INSTALLATION.md](./INSTALLATION.md) section "Résolution des problèmes"

---

**Bon développement ! 🚀**
