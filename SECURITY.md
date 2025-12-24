# 🔒 Guide de Sécurité - Plateforme Bedeew

## ⚠️ IMPORTANT - Configuration Initiale

### 1. Variables d'Environnement

**CRITIQUE**: Ne JAMAIS commiter les fichiers `.env` dans Git !

#### Configuration Server (`server/.env`)

```bash
# Copier le fichier exemple
cd server
cp .env.example .env

# Éditer avec vos vraies valeurs
nano .env
```

**Variables à configurer obligatoirement:**

```env
# JWT Secret - Générer une clé forte
JWT_SECRET=votre_cle_secrete_tres_longue_et_aleatoire_minimum_32_caracteres

# MongoDB - Vos identifiants Atlas
MONGODB_URI=mongodb+srv://username:password@cluster.xxxxx.mongodb.net/bedeew_digital

# Email - Configuration SMTP
EMAIL_USER=votre_email@gmail.com
EMAIL_PASSWORD=votre_mot_de_passe_application_gmail

# Cloudinary - Vos clés API
CLOUDINARY_CLOUD_NAME=votre_cloud_name
CLOUDINARY_API_KEY=votre_api_key
CLOUDINARY_API_SECRET=votre_api_secret
```

#### Configuration Client (`client/.env`)

```bash
cd client
cp .env.example .env
nano .env
```

```env
VITE_API_URL=http://localhost:5000/api
VITE_WHATSAPP_NUMBER=+221XXXXXXXXX
```

### 2. Générer un JWT Secret Sécurisé

```bash
# Node.js
node -e "console.log(require('crypto').randomBytes(64).toString('hex'))"

# OpenSSL
openssl rand -hex 64

# Python
python -c "import secrets; print(secrets.token_hex(64))"
```

---

## 🛡️ Mesures de Sécurité Implémentées

### ✅ Authentification & Autorisation

- **JWT (JSON Web Tokens)** pour l'authentification
- **Bcrypt** pour le hashing des mots de passe (10 rounds)
- **Middleware de protection** sur les routes sensibles
- **Système de rôles**: user, admin, recruiter, candidate
- **Expiration des tokens**: 7 jours par défaut

### ✅ Validation des Données

**Nouveau système de validation complet avec express-validator:**

- ✅ Validation de tous les inputs utilisateur
- ✅ Sanitization des données (XSS prevention)
- ✅ Validation des formats (email, URL, phone)
- ✅ Validation des types MongoDB ObjectId
- ✅ Validation des slugs
- ✅ Limites de longueur sur tous les champs
- ✅ Validation des catégories et enums

**Routes protégées:**
- Services: création, modification, suppression
- Portfolio: création, modification, suppression
- Blog: création, modification, suppression
- Contact: validation stricte des formulaires
- Auth: validation register/login

### ✅ Rate Limiting

```javascript
// Limites par défaut
- API générale: 100 requêtes / 15 minutes
- Auth (login/register): 5 requêtes / 15 minutes
- Contact: 3 requêtes / 15 minutes
```

### ✅ Protection Headers HTTP

**Helmet.js activé** avec protection contre:
- XSS (Cross-Site Scripting)
- Clickjacking
- MIME type sniffing
- DNS prefetch control

### ✅ CORS

Configuration CORS stricte:
```javascript
origin: process.env.CLIENT_URL
credentials: true
```

### ✅ Sanitization

- Normalisation des emails
- Trim des espaces
- Échappement des caractères spéciaux
- Validation des caractères autorisés

---

## 🚨 Checklist de Sécurité Avant Production

### Configuration

- [ ] Fichiers `.env` NON présents dans Git
- [ ] JWT_SECRET unique et fort (64+ caractères)
- [ ] NODE_ENV=production
- [ ] HTTPS activé (certificat SSL)
- [ ] Variables d'environnement configurées sur le serveur

### Base de Données

- [ ] MongoDB Atlas avec IP whitelist
- [ ] Utilisateur MongoDB avec permissions minimales
- [ ] Backup automatique activé
- [ ] Connexion chiffrée (SSL)

### API

- [ ] Rate limiting activé
- [ ] Validation sur tous les endpoints
- [ ] CORS configuré correctement
- [ ] Helmet activé
- [ ] Logs d'erreur sécurisés (pas de données sensibles)

### Authentification

- [ ] Mots de passe hashés (bcrypt)
- [ ] Tokens JWT avec expiration
- [ ] Refresh token strategy (optionnel)
- [ ] Protection contre brute force (rate limiting)

### Upload de Fichiers

- [ ] Validation des types de fichiers
- [ ] Limite de taille (10MB max)
- [ ] Scan antivirus (recommandé)
- [ ] Stockage sécurisé (Cloudinary)

---

## 🔐 Bonnes Pratiques

### Mots de Passe

**Exigences minimales:**
- Minimum 6 caractères (recommandé: 12+)
- Au moins 1 majuscule
- Au moins 1 minuscule
- Au moins 1 chiffre
- Caractères spéciaux recommandés

### Gestion des Secrets

**À NE JAMAIS faire:**
- ❌ Commiter les fichiers `.env`
- ❌ Hardcoder des secrets dans le code
- ❌ Partager les secrets par email/chat
- ❌ Utiliser des secrets faibles ou par défaut
- ❌ Réutiliser les mêmes secrets entre environnements

**À faire:**
- ✅ Utiliser des variables d'environnement
- ✅ Générer des secrets forts et aléatoires
- ✅ Utiliser un gestionnaire de secrets (Vault, AWS Secrets Manager)
- ✅ Rotation régulière des secrets
- ✅ Secrets différents par environnement (dev/staging/prod)

### Logs & Monitoring

**À logger:**
- ✅ Tentatives de connexion échouées
- ✅ Accès aux ressources sensibles
- ✅ Erreurs serveur
- ✅ Modifications de données importantes

**À NE PAS logger:**
- ❌ Mots de passe
- ❌ Tokens JWT complets
- ❌ Données personnelles sensibles
- ❌ Clés API

---

## 🚀 Déploiement Sécurisé

### Variables d'Environnement en Production

**Render / Railway:**
```bash
# Dans le dashboard, ajouter les variables
JWT_SECRET=...
MONGODB_URI=...
EMAIL_USER=...
# etc.
```

**Vercel (Frontend):**
```bash
# Dans Settings > Environment Variables
VITE_API_URL=https://votre-api.com/api
```

### HTTPS

**Obligatoire en production !**

- Render/Railway: HTTPS automatique
- VPS: Utiliser Let's Encrypt (Certbot)
- Cloudflare: Protection DDoS + SSL

### Firewall & Réseau

- Fermer tous les ports sauf 80 (HTTP) et 443 (HTTPS)
- MongoDB: Whitelist IP uniquement
- Utiliser un VPN pour l'accès admin

---

## 🐛 Gestion des Incidents

### En cas de fuite de secrets

1. **Révoquer immédiatement** tous les secrets compromis
2. **Générer de nouveaux secrets**
3. **Mettre à jour** toutes les instances
4. **Auditer** les logs pour détecter les accès non autorisés
5. **Notifier** les utilisateurs si nécessaire (RGPD)

### Contacts d'urgence

- **Développeur principal**: [email]
- **Administrateur système**: [email]
- **MongoDB Atlas Support**: support@mongodb.com

---

## 📚 Ressources

### Documentation

- [OWASP Top 10](https://owasp.org/www-project-top-ten/)
- [Express Security Best Practices](https://expressjs.com/en/advanced/best-practice-security.html)
- [MongoDB Security Checklist](https://docs.mongodb.com/manual/administration/security-checklist/)

### Outils de Sécurité

- **npm audit**: Vérifier les vulnérabilités
- **Snyk**: Scan de sécurité continu
- **OWASP ZAP**: Test de pénétration
- **SSL Labs**: Test SSL/TLS

### Commandes Utiles

```bash
# Audit des dépendances
npm audit
npm audit fix

# Vérifier les packages obsolètes
npm outdated

# Mettre à jour les packages de sécurité
npm update
```

---

## 📋 Validation des Endpoints

### Exemples de Validation

**Service (POST /api/services)**
```json
{
  "title": "3-100 caractères, requis",
  "shortDescription": "max 200 caractères, requis",
  "fullDescription": "min 50 caractères, requis",
  "category": "enum: development|design|marketing|seo|content|consulting",
  "pricing": {
    "startingPrice": "number, optionnel",
    "pricingType": "enum: fixed|hourly|project|monthly|custom"
  }
}
```

**Contact (POST /api/contact)**
```json
{
  "name": "2-100 caractères, lettres uniquement",
  "email": "format email valide, requis",
  "phone": "format téléphone, optionnel",
  "subject": "5-200 caractères, requis",
  "message": "10-2000 caractères, requis"
}
```

**Register (POST /api/auth/register)**
```json
{
  "firstName": "2-50 caractères, lettres uniquement",
  "lastName": "2-50 caractères, lettres uniquement",
  "email": "format email valide",
  "password": "min 6 caractères, 1 maj, 1 min, 1 chiffre"
}
```

---

## ✅ Résumé des Corrections Appliquées

### 1. Sécurisation des Secrets ✅
- Fichiers `.env` retirés de Git
- `.env.example` nettoyé (pas d'identifiants réels)
- `.gitignore` amélioré

### 2. Validation Complète ✅
- Nouveau fichier `validators.js` avec 400+ lignes
- Validation sur TOUS les endpoints
- Sanitization automatique des inputs
- Messages d'erreur clairs

### 3. Nettoyage du Code ✅
- Fichiers dupliqués supprimés (_OLD, _NEW)
- Structure propre et maintenable

### 4. Documentation ✅
- Guide de sécurité complet
- Checklist avant production
- Bonnes pratiques documentées

---

**🔒 La sécurité est un processus continu, pas une destination !**

*Dernière mise à jour: 24 décembre 2025*
