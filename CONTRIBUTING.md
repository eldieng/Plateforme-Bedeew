# 🤝 Guide de Contribution - Bedeew Digital Platform

Merci de votre intérêt pour contribuer à Bedeew Digital ! Ce guide vous aidera à démarrer.

## 📋 Table des Matières

- [Code de Conduite](#code-de-conduite)
- [Comment Contribuer](#comment-contribuer)
- [Standards de Code](#standards-de-code)
- [Processus de Pull Request](#processus-de-pull-request)
- [Structure du Projet](#structure-du-projet)

## 🤝 Code de Conduite

### Nos Engagements

- Respecter tous les contributeurs
- Accepter les critiques constructives
- Se concentrer sur ce qui est meilleur pour la communauté
- Faire preuve d'empathie envers les autres

## 💡 Comment Contribuer

### Signaler un Bug

1. Vérifier que le bug n'a pas déjà été signalé
2. Créer une issue avec :
   - Description claire du bug
   - Étapes pour reproduire
   - Comportement attendu vs actuel
   - Screenshots si applicable
   - Environnement (OS, Node version, etc.)

### Proposer une Fonctionnalité

1. Créer une issue avec le tag `enhancement`
2. Décrire clairement la fonctionnalité
3. Expliquer pourquoi elle serait utile
4. Proposer une implémentation si possible

### Soumettre du Code

1. **Fork** le projet
2. **Créer une branche** : `git checkout -b feature/ma-fonctionnalite`
3. **Commiter** : `git commit -m 'feat: ajout de ma fonctionnalité'`
4. **Push** : `git push origin feature/ma-fonctionnalite`
5. **Ouvrir une Pull Request**

## 📝 Standards de Code

### Convention de Nommage

#### Variables et Fonctions
```javascript
// ✅ Bon
const userName = 'John';
const getUserData = () => {};

// ❌ Mauvais
const user_name = 'John';
const GetUserData = () => {};
```

#### Composants React
```javascript
// ✅ Bon
const UserProfile = () => {};

// ❌ Mauvais
const userProfile = () => {};
```

#### Fichiers
```
// ✅ Bon
UserProfile.jsx
userService.js
authController.js

// ❌ Mauvais
user-profile.jsx
UserService.js
```

### Style de Code

#### JavaScript/React

```javascript
// ✅ Bon
const fetchUsers = async () => {
  try {
    const response = await api.get('/users');
    return response.data;
  } catch (error) {
    console.error('Error fetching users:', error);
    throw error;
  }
};

// ❌ Mauvais
const fetchUsers = async () => {
  const response = await api.get('/users')
  return response.data
}
```

#### Imports

```javascript
// ✅ Bon - Ordre des imports
import React from 'react';
import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';
import { Button } from '@/components/ui/button';
import { useAuth } from '@/context/AuthContext';
import './styles.css';

// ❌ Mauvais - Désorganisé
import './styles.css';
import axios from 'axios';
import React from 'react';
```

### Commits

Utiliser la convention [Conventional Commits](https://www.conventionalcommits.org/) :

```
feat: ajout de la fonctionnalité X
fix: correction du bug Y
docs: mise à jour de la documentation
style: formatage du code
refactor: refactorisation de Z
test: ajout de tests
chore: mise à jour des dépendances
```

Exemples :
```bash
git commit -m "feat: ajout du système de notifications"
git commit -m "fix: correction de l'erreur de connexion"
git commit -m "docs: mise à jour du README"
```

## 🔄 Processus de Pull Request

### Checklist

Avant de soumettre une PR, vérifier que :

- [ ] Le code compile sans erreurs
- [ ] Les tests passent (si applicable)
- [ ] Le code suit les standards du projet
- [ ] La documentation est à jour
- [ ] Les commits suivent la convention
- [ ] La PR a une description claire

### Template de PR

```markdown
## Description
Brève description des changements

## Type de changement
- [ ] Bug fix
- [ ] Nouvelle fonctionnalité
- [ ] Breaking change
- [ ] Documentation

## Tests
- [ ] Tests ajoutés/mis à jour
- [ ] Tous les tests passent

## Screenshots (si applicable)
Ajouter des screenshots

## Checklist
- [ ] Code testé localement
- [ ] Documentation mise à jour
- [ ] Pas de conflits avec main
```

## 📁 Structure du Projet

```
Plateforme_Bedeew/
├── client/                 # Frontend React
│   ├── src/
│   │   ├── components/    # Composants réutilisables
│   │   ├── pages/         # Pages de l'application
│   │   ├── context/       # Context API
│   │   ├── utils/         # Fonctions utilitaires
│   │   └── App.jsx        # Composant principal
│   └── package.json
│
├── server/                # Backend Node.js
│   ├── src/
│   │   ├── controllers/  # Logique métier
│   │   ├── models/       # Modèles MongoDB
│   │   ├── routes/       # Routes API
│   │   ├── middleware/   # Middlewares
│   │   ├── utils/        # Utilitaires
│   │   └── server.js     # Point d'entrée
│   └── package.json
│
└── docs/                 # Documentation
```

## 🧪 Tests

### Backend

```bash
cd server
npm test
```

### Frontend

```bash
cd client
npm test
```

## 📚 Ressources

- [React Documentation](https://react.dev/)
- [Express Documentation](https://expressjs.com/)
- [MongoDB Documentation](https://docs.mongodb.com/)
- [TailwindCSS Documentation](https://tailwindcss.com/)

## 🆘 Besoin d'Aide ?

- Ouvrir une issue avec le tag `question`
- Contacter l'équipe de développement
- Consulter la documentation existante

## 🎉 Remerciements

Merci à tous les contributeurs qui aident à améliorer Bedeew Digital !

---

**Happy Coding! 🚀**
