# 🔄 Recréer la Base de Données à Partir de Zéro

## 🎯 Objectif

Supprimer complètement l'ancienne base de données corrompue et créer une nouvelle base propre avec toutes les données.

---

## 📋 Étapes à Suivre

### Étape 1 : Supprimer l'Ancienne Base de Données (MongoDB Atlas)

#### Option A : Supprimer via MongoDB Atlas (Recommandé)

1. **Connectez-vous à MongoDB Atlas** : https://cloud.mongodb.com/
2. **Sélectionnez votre cluster** : Cluster0
3. **Cliquez sur "Browse Collections"**
4. **Supprimez la base de données** :
   - Trouvez la base `bedeew_digital` (ou le nom de votre base)
   - Cliquez sur l'icône poubelle à côté du nom
   - Confirmez la suppression

#### Option B : Supprimer via MongoDB Compass

1. Téléchargez MongoDB Compass : https://www.mongodb.com/products/compass
2. Connectez-vous avec votre URI MongoDB
3. Sélectionnez la base `bedeew_digital`
4. Cliquez sur "Drop Database"
5. Confirmez

#### Option C : Supprimer via Script (Depuis votre machine)

```bash
cd server
node -e "
import('mongoose').then(async (mongoose) => {
  try {
    const uri = process.env.MONGODB_URI || 'VOTRE_URI_MONGODB';
    await mongoose.default.connect(uri);
    console.log('✅ Connecté à MongoDB');
    
    // Supprimer la base de données
    await mongoose.default.connection.dropDatabase();
    console.log('✅ Base de données supprimée avec succès !');
    
    process.exit(0);
  } catch (err) {
    console.error('❌ Erreur:', err.message);
    process.exit(1);
  }
});
"
```

---

### Étape 2 : Vérifier que le fichier `.env` est configuré

```bash
cd server
```

Vérifiez que le fichier `.env` existe et contient :

```env
MONGODB_URI=mongodb+srv://username:password@cluster0.xxxxx.mongodb.net/bedeew_digital?retryWrites=true&w=majority
NODE_ENV=development
PORT=5000
JWT_SECRET=votre_secret_jwt_tres_securise
```

**Si le fichier n'existe pas** :
```bash
copy .env.example .env
# Puis éditez .env avec vos vraies valeurs
```

---

### Étape 3 : Exécuter le Script de Seed

```bash
# Depuis le dossier server
cd server
npm run seed
```

**Ou directement** :
```bash
node src/seeds/seedData.js
```

---

## ✅ Ce qui Sera Créé

Le script va créer automatiquement :

### 👥 Utilisateurs (2)
- **Admin** : admin@bedeew.digital / Admin123!
- **User** : john@example.com / User123!

### 🛠️ Services (6)
1. Développement Web & Mobile
2. Design Graphique & UI/UX
3. Marketing Digital & SEO
4. Community Management
5. Production Audiovisuelle
6. Intégration CMS

### 🎨 Portfolio (6 projets)
1. Site E-commerce Fashion Store
2. Application Mobile de Livraison
3. Identité Visuelle - Tech Startup
4. Campagne SEO - Agence Immobilière
5. Gestion Réseaux Sociaux - Restaurant
6. Vidéo Promotionnelle - ONG

### 📝 Blog (6 articles)
1. Les Tendances du Design Web en 2025
2. SEO Local : Boostez Votre Visibilité au Sénégal
3. React vs Vue : Quel Framework Choisir ?
4. Marketing Digital : Stratégies Gagnantes 2025
5. Créer une Identité Visuelle Forte
6. Sécurité Web : Protégez Votre Site

---

## 🔍 Vérifier que Tout Fonctionne

### 1. Vérifier dans MongoDB Atlas

1. Allez sur https://cloud.mongodb.com/
2. Cliquez sur "Browse Collections"
3. Vous devriez voir :
   - `users` (2 documents)
   - `services` (6 documents)
   - `portfolios` (6 documents)
   - `blogs` (6 documents)

### 2. Tester l'API Localement

```bash
# Terminal 1 - Démarrer le backend
cd server
npm run dev

# Terminal 2 - Tester les endpoints
curl http://localhost:5000/health
curl http://localhost:5000/api/services
curl http://localhost:5000/api/portfolio
curl http://localhost:5000/api/blog
```

### 3. Tester le Frontend

```bash
# Terminal 3 - Démarrer le frontend
cd client
npm run dev
```

Ouvrez http://localhost:5173 et vérifiez que :
- ✅ Les services s'affichent sur la page d'accueil
- ✅ Les projets portfolio s'affichent
- ✅ Les articles de blog s'affichent
- ✅ Vous pouvez vous connecter avec admin@bedeew.digital / Admin123!

---

## 🚀 Déployer en Production

Une fois que tout fonctionne localement, déployez sur votre site en production :

### Option 1 : Seed Directement en Production

Si votre backend est sur **Render/Railway** :

1. Ajoutez un script dans `package.json` :
```json
{
  "scripts": {
    "seed:prod": "NODE_ENV=production node src/seeds/seedData.js"
  }
}
```

2. Exécutez via le dashboard de votre hébergeur ou en SSH

### Option 2 : Seed depuis votre Machine vers Production

```bash
# Utilisez l'URI de production
cd server
MONGODB_URI="mongodb+srv://prod-user:prod-pass@cluster.mongodb.net/bedeew_digital" node src/seeds/seedData.js
```

### Option 3 : Via MongoDB Compass

1. Exportez les données depuis votre base locale :
   - Ouvrez MongoDB Compass
   - Connectez-vous à votre base locale
   - Exportez chaque collection en JSON

2. Importez dans la base de production :
   - Connectez-vous à votre base de production
   - Importez les fichiers JSON

---

## ⚠️ Problèmes Courants

### Erreur : "MONGODB_URI is not defined"

**Solution** :
```bash
cd server
# Vérifiez que .env existe
ls -la .env
# Si non, créez-le
copy .env.example .env
# Éditez avec vos vraies valeurs
```

### Erreur : "Authentication failed"

**Solution** :
1. Vérifiez votre mot de passe MongoDB
2. Encodez les caractères spéciaux dans l'URI
3. Vérifiez que l'utilisateur existe dans MongoDB Atlas → Database Access

### Erreur : "Connection timeout"

**Solution** :
1. Vérifiez votre connexion internet
2. Ajoutez `0.0.0.0/0` dans MongoDB Atlas → Network Access
3. Vérifiez que le cluster est actif (pas en pause)

### Erreur : "Duplicate key error"

**Solution** :
```bash
# Supprimez complètement la base et recommencez
# Via MongoDB Atlas ou avec le script de l'Étape 1
```

---

## 🔐 Sécurité

### Après le Seed en Production

1. **Changez le mot de passe admin** :
   - Connectez-vous avec admin@bedeew.digital / Admin123!
   - Allez dans Profil → Changer le mot de passe
   - Utilisez un mot de passe fort

2. **Supprimez le compte de test** :
   - Connectez-vous en admin
   - Allez dans Gestion des utilisateurs
   - Supprimez john@example.com

3. **Vérifiez les variables d'environnement** :
   - JWT_SECRET doit être unique et fort
   - NODE_ENV=production
   - Pas de .env committé dans Git

---

## 📊 Commandes Utiles

### Vérifier les données

```bash
cd server
node -e "
import('mongoose').then(async (mongoose) => {
  await mongoose.default.connect(process.env.MONGODB_URI);
  const db = mongoose.default.connection.db;
  
  const users = await db.collection('users').countDocuments();
  const services = await db.collection('services').countDocuments();
  const portfolios = await db.collection('portfolios').countDocuments();
  const blogs = await db.collection('blogs').countDocuments();
  
  console.log('📊 Statistiques :');
  console.log('Users:', users);
  console.log('Services:', services);
  console.log('Portfolios:', portfolios);
  console.log('Blogs:', blogs);
  
  process.exit(0);
});
"
```

### Re-seed sans supprimer

Si vous voulez juste ajouter des données sans tout supprimer, commentez ces lignes dans `seedData.js` :

```javascript
// await User.deleteMany({});
// await Service.deleteMany({});
// await Portfolio.deleteMany({});
// await Blog.deleteMany({});
```

---

## ✅ Checklist Finale

- [ ] Ancienne base de données supprimée
- [ ] Fichier `.env` configuré avec la bonne URI
- [ ] Script de seed exécuté avec succès
- [ ] 2 utilisateurs créés
- [ ] 6 services créés
- [ ] 6 portfolios créés
- [ ] 6 articles de blog créés
- [ ] Backend démarre sans erreur
- [ ] Frontend affiche les données
- [ ] Connexion admin fonctionne
- [ ] Mot de passe admin changé (en production)

---

## 🆘 Besoin d'Aide ?

Si vous rencontrez des problèmes :

1. Vérifiez les logs du script de seed
2. Vérifiez que MongoDB Atlas est accessible
3. Testez la connexion avec MongoDB Compass
4. Vérifiez les variables d'environnement

**La base de données sera complètement neuve et fonctionnelle !** 🎉
