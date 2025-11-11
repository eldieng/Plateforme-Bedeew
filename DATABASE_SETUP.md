# 🗄️ Configuration de la Base de Données MongoDB Atlas

## ✅ Connexion Configurée

Votre base de données MongoDB Atlas est déjà configurée :

```
mongodb+srv://elelhadjidieng_db_user:Aladji@04@cluster0.vjfnmxo.mongodb.net/bedeew_digital
```

## 🚀 Peupler la Base de Données

### Étape 1 : Configurer l'environnement

```bash
cd server
cp .env.example .env
```

Le fichier `.env` contient déjà votre URI MongoDB Atlas.

### Étape 2 : Installer les dépendances

```bash
npm install
```

### Étape 3 : Exécuter le script de seed

```bash
npm run seed
```

Ce script va :
- ✅ Se connecter à votre base MongoDB Atlas
- ✅ Supprimer les données existantes (si présentes)
- ✅ Créer 2 utilisateurs (admin + user)
- ✅ Créer 6 services professionnels
- ✅ Créer 6 projets portfolio

### Résultat attendu :

```
✅ Connecté à MongoDB Atlas
🗑️  Suppression des données existantes...
✅ Données existantes supprimées
👥 Création des utilisateurs...
✅ 2 utilisateurs créés
🛠️  Création des services...
✅ 6 services créés
🎨 Création des portfolios...
✅ 6 portfolios créés

🎉 Base de données peuplée avec succès !

📊 Résumé :
   - 2 utilisateurs
   - 6 services
   - 6 projets portfolio

🔐 Compte Admin :
   Email: admin@bedeew.digital
   Mot de passe: Admin123!

🔐 Compte Utilisateur :
   Email: john@example.com
   Mot de passe: User123!
```

## 📊 Données Créées

### 👥 Utilisateurs

1. **Administrateur**
   - Email: `admin@bedeew.digital`
   - Mot de passe: `Admin123!`
   - Rôle: `admin`

2. **Utilisateur Test**
   - Email: `john@example.com`
   - Mot de passe: `User123!`
   - Rôle: `user`

### 🛠️ Services (6 services)

1. **Développement Web & Mobile**
   - Catégorie: development
   - Prix: 500,000 FCFA
   - 4 fonctionnalités détaillées

2. **Design Graphique & UI/UX**
   - Catégorie: design
   - Prix: 200,000 FCFA
   - 4 fonctionnalités détaillées

3. **Marketing Digital & SEO**
   - Catégorie: marketing
   - Prix: 300,000 FCFA/mois
   - 4 fonctionnalités détaillées

4. **Community Management**
   - Catégorie: marketing
   - Prix: 150,000 FCFA/mois
   - 4 fonctionnalités détaillées

5. **Production Audiovisuelle**
   - Catégorie: content
   - Prix: 400,000 FCFA
   - 4 fonctionnalités détaillées

6. **Intégration CMS**
   - Catégorie: development
   - Prix: 350,000 FCFA
   - 4 fonctionnalités détaillées

### 🎨 Portfolio (6 projets)

1. **Site E-commerce Fashion Store** (Featured)
   - Catégorie: web
   - Technologies: React, Node.js, MongoDB, TailwindCSS, Stripe

2. **Application Mobile de Livraison** (Featured)
   - Catégorie: mobile
   - Technologies: React Native, Firebase, Google Maps API

3. **Identité Visuelle - Tech Startup**
   - Catégorie: design
   - Technologies: Adobe Illustrator, Photoshop, Figma

4. **Campagne SEO - Agence Immobilière** (Featured)
   - Catégorie: seo
   - Technologies: Google Analytics, SEMrush, WordPress

5. **Gestion Réseaux Sociaux - Restaurant**
   - Catégorie: social-media
   - Technologies: Canva, Buffer, Facebook Ads

6. **Vidéo Promotionnelle - ONG**
   - Catégorie: video
   - Technologies: Adobe Premiere Pro, After Effects

## 🔄 Réinitialiser les Données

Pour réinitialiser complètement la base de données :

```bash
cd server
npm run seed
```

Cela supprimera toutes les données existantes et recréera les données initiales.

## 🔍 Vérifier les Données

### Via MongoDB Compass

1. Télécharger [MongoDB Compass](https://www.mongodb.com/try/download/compass)
2. Se connecter avec l'URI :
   ```
   mongodb+srv://elelhadjidieng_db_user:Aladji@04@cluster0.vjfnmxo.mongodb.net/
   ```
3. Sélectionner la base `bedeew_digital`
4. Explorer les collections : `users`, `services`, `portfolios`

### Via l'API

```bash
# Vérifier les services
curl http://localhost:5000/api/services

# Vérifier les portfolios
curl http://localhost:5000/api/portfolio

# Se connecter
curl -X POST http://localhost:5000/api/auth/login \
  -H "Content-Type: application/json" \
  -d '{"email":"admin@bedeew.digital","password":"Admin123!"}'
```

## 📝 Ajouter de Nouvelles Données

### Via l'API (après connexion)

```bash
# Obtenir le token
TOKEN="votre_token_jwt"

# Ajouter un service
curl -X POST http://localhost:5000/api/services \
  -H "Content-Type: application/json" \
  -H "Authorization: Bearer $TOKEN" \
  -d '{
    "title": "Nouveau Service",
    "shortDescription": "Description courte",
    "fullDescription": "Description complète",
    "icon": "code",
    "category": "development",
    "published": true
  }'

# Ajouter un projet portfolio
curl -X POST http://localhost:5000/api/portfolio \
  -H "Content-Type: application/json" \
  -H "Authorization: Bearer $TOKEN" \
  -d '{
    "title": "Nouveau Projet",
    "description": "Description du projet",
    "category": "web",
    "published": true
  }'
```

### Via l'interface Admin (à venir en Phase 2)

L'interface d'administration permettra de gérer facilement :
- Services
- Portfolio
- Utilisateurs
- Messages de contact
- Cours (Phase 2)
- Offres d'emploi (Phase 2)

## 🔒 Sécurité

### Mots de Passe

Tous les mots de passe sont hashés avec bcrypt (10 rounds de salt).

### Recommandations

1. ✅ Changer les mots de passe par défaut en production
2. ✅ Utiliser des mots de passe forts (min 12 caractères)
3. ✅ Ne jamais commiter les fichiers `.env`
4. ✅ Utiliser des variables d'environnement en production

## 🆘 Problèmes Courants

### Erreur de connexion MongoDB

```
MongoServerError: bad auth
```

**Solution** : Vérifier que le mot de passe est correctement encodé dans l'URI (`%40` pour `@`)

### Base de données vide après seed

**Solution** : Vérifier que le nom de la base est correct dans l'URI (`bedeew_digital`)

### Timeout de connexion

**Solution** : 
1. Vérifier votre connexion internet
2. Vérifier que votre IP est autorisée dans MongoDB Atlas (0.0.0.0/0 pour autoriser toutes les IPs)

## 📚 Ressources

- [MongoDB Atlas Documentation](https://docs.atlas.mongodb.com/)
- [Mongoose Documentation](https://mongoosejs.com/docs/)
- [MongoDB Compass](https://www.mongodb.com/products/compass)

---

**Votre base de données est maintenant prête à l'emploi ! 🎉**
