# 🔧 Résolution Problème Base de Données

## Problème Identifié

Vous avez développé le site https://bedeew.com/ et rencontrez des problèmes de connexion à la base de données.

## Solutions Appliquées

### 1. ✅ Port 5000 Libéré
- Processus bloquant le port 5000 terminé (PID 23800)
- Le backend peut maintenant démarrer correctement

### 2. ✅ Options MongoDB Dépréciées Retirées
- `useNewUrlParser` et `useUnifiedTopology` supprimées
- Ces options ne sont plus nécessaires depuis MongoDB Driver 4.0.0

## Configuration Requise

### Fichier `.env` à Créer

Puisque les fichiers `.env` ont été retirés de Git pour la sécurité, vous devez recréer votre configuration :

```bash
cd server
cp .env.example .env
```

### Variables à Configurer dans `server/.env`

```env
# Server
NODE_ENV=development
PORT=5000
API_URL=http://localhost:5000

# MongoDB - IMPORTANT: Utilisez vos vraies valeurs
MONGODB_URI=mongodb+srv://username:password@cluster.mongodb.net/bedeew_digital?retryWrites=true&w=majority

# JWT
JWT_SECRET=votre_secret_jwt_tres_long_et_securise

# Email
EMAIL_HOST=smtp.gmail.com
EMAIL_PORT=587
EMAIL_USER=votre_email@gmail.com
EMAIL_PASSWORD=votre_mot_de_passe_application
EMAIL_FROM=noreply@bedeew.digital

# Cloudinary
CLOUDINARY_CLOUD_NAME=votre_cloud_name
CLOUDINARY_API_KEY=votre_api_key
CLOUDINARY_API_SECRET=votre_api_secret

# Frontend
CLIENT_URL=http://localhost:5173
```

## 🔍 Diagnostic de Votre Base de Données

### Si vous aviez déjà une base de données pour bedeew.com

Vous avez probablement une base MongoDB Atlas existante. Voici comment récupérer vos identifiants :

#### 1. Connexion à MongoDB Atlas

1. Allez sur https://cloud.mongodb.com/
2. Connectez-vous avec votre compte
3. Sélectionnez votre cluster

#### 2. Récupérer la Chaîne de Connexion

1. Cliquez sur **"Connect"** sur votre cluster
2. Choisissez **"Connect your application"**
3. Copiez la chaîne de connexion
4. Remplacez `<password>` par votre mot de passe réel
5. Remplacez `<dbname>` par `bedeew_digital` (ou le nom de votre BDD)

**Format attendu :**
```
mongodb+srv://username:password@cluster0.xxxxx.mongodb.net/bedeew_digital?retryWrites=true&w=majority
```

#### 3. Vérifier l'Accès IP

MongoDB Atlas nécessite que votre IP soit autorisée :

1. Dans Atlas, allez dans **"Network Access"**
2. Ajoutez votre IP actuelle ou `0.0.0.0/0` (tous les IPs - dev uniquement)

#### 4. Vérifier l'Utilisateur de Base de Données

1. Dans Atlas, allez dans **"Database Access"**
2. Vérifiez que votre utilisateur existe
3. Vérifiez qu'il a les permissions **"Read and write to any database"**

## 🚀 Démarrage de l'Application

### 1. Configurer les Variables d'Environnement

```bash
# Server
cd server
nano .env  # ou notepad .env sur Windows
# Coller vos vraies valeurs MongoDB, JWT, etc.

# Client
cd ../client
nano .env
# Vérifier que VITE_API_URL=http://localhost:5000/api
```

### 2. Démarrer l'Application

```bash
# Depuis la racine du projet
npm run dev
```

Ou séparément :

```bash
# Terminal 1 - Backend
cd server
npm run dev

# Terminal 2 - Frontend
cd client
npm run dev
```

## 🔍 Tester la Connexion MongoDB

Créez un script de test :

```bash
cd server
node -e "
import('mongoose').then(async (mongoose) => {
  try {
    await mongoose.default.connect('VOTRE_MONGODB_URI');
    console.log('✅ Connexion réussie !');
    process.exit(0);
  } catch (err) {
    console.error('❌ Erreur:', err.message);
    process.exit(1);
  }
});
"
```

## 📊 Vérifier les Données Existantes

Si vous aviez déjà des données sur bedeew.com :

### Option 1 : Utiliser la même base de données

Utilisez la même chaîne de connexion MongoDB que votre site en production.

### Option 2 : Migrer les données

Si vous voulez une nouvelle base pour le développement :

1. Exportez les données de production :
```bash
mongodump --uri="mongodb+srv://user:pass@cluster.mongodb.net/bedeew_digital"
```

2. Importez dans la nouvelle base :
```bash
mongorestore --uri="mongodb+srv://user:pass@newcluster.mongodb.net/bedeew_digital" dump/
```

### Option 3 : Seed avec de nouvelles données

Si vous voulez repartir de zéro :

```bash
cd server
npm run seed
```

## ⚠️ Erreurs Courantes

### Erreur : "Authentication failed"
- Vérifiez votre mot de passe MongoDB
- Assurez-vous qu'il n'y a pas de caractères spéciaux non encodés
- Encodez les caractères spéciaux : `@` → `%40`, `#` → `%23`, etc.

### Erreur : "IP not whitelisted"
- Ajoutez votre IP dans MongoDB Atlas → Network Access
- Ou ajoutez `0.0.0.0/0` pour autoriser toutes les IPs (dev uniquement)

### Erreur : "Database user not found"
- Créez un utilisateur dans MongoDB Atlas → Database Access
- Donnez-lui les permissions "Read and write to any database"

### Erreur : "Connection timeout"
- Vérifiez votre connexion internet
- Vérifiez que le cluster MongoDB est actif
- Vérifiez les règles de firewall

## 🔐 Sécurité

**IMPORTANT** : Ne commitez JAMAIS le fichier `.env` dans Git !

Le fichier `.gitignore` est déjà configuré pour l'ignorer, mais vérifiez :

```bash
git status
# Le fichier .env ne doit PAS apparaître
```

## 📞 Support

Si le problème persiste, vérifiez :

1. ✅ Le fichier `server/.env` existe et contient les bonnes valeurs
2. ✅ La chaîne MongoDB_URI est correcte
3. ✅ Votre IP est autorisée dans MongoDB Atlas
4. ✅ L'utilisateur MongoDB existe et a les bonnes permissions
5. ✅ Le port 5000 est libre
6. ✅ Node.js est à jour (v18+)

## 🎯 Checklist Rapide

- [ ] Fichier `server/.env` créé avec vos vraies valeurs
- [ ] MongoDB_URI correcte (testée)
- [ ] IP autorisée dans MongoDB Atlas
- [ ] Port 5000 libre
- [ ] `npm install` exécuté dans server/ et client/
- [ ] `npm run dev` démarre sans erreur

---

**Une fois configuré, votre application devrait démarrer correctement !** 🚀
