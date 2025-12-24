# 🔄 Redémarrer le Backend sur le Serveur

## Problème
Le backend renvoie des erreurs 503 après l'enrichissement du contenu.

## Solution : Redémarrer PM2

### Méthode 1 : Via SSH (Recommandé)

Ouvrez **PuTTY** ou **PowerShell** et connectez-vous :

```bash
ssh u638236953@185.201.11.198
```

**Mot de passe :** `Aladji@04`

Puis exécutez :

```bash
# Redémarrer l'application
pm2 restart bedeew-api

# Vérifier le statut
pm2 status

# Voir les logs
pm2 logs bedeew-api --lines 50
```

---

### Méthode 2 : Via cPanel

1. Allez sur **https://cpanel.hostinger.com**
2. Connectez-vous
3. Cherchez **"Terminal"** ou **"SSH Access"**
4. Exécutez les mêmes commandes ci-dessus

---

### Méthode 3 : Redémarrage Complet

Si PM2 ne répond pas :

```bash
# Arrêter PM2
pm2 stop all

# Tuer tous les processus
pm2 kill

# Redémarrer
cd /home/u638236953/domains/bedeew.com/bedeew_app/server
pm2 start ecosystem.config.cjs

# Sauvegarder
pm2 save
```

---

## Vérification

Après le redémarrage, testez :

1. **API Health** : https://bedeew.com/api/health
   - Devrait retourner : `{"status":"ok"}`

2. **Services** : https://bedeew.com/api/services
   - Devrait retourner la liste des services

3. **Blog** : https://bedeew.com/api/blog
   - Devrait retourner les articles

---

## Si le Problème Persiste

Vérifiez les logs d'erreur :

```bash
pm2 logs bedeew-api --err --lines 100
```

Recherchez les erreurs liées à :
- MongoDB connection
- Environment variables
- Memory issues

---

## Commandes Utiles

```bash
# Statut de PM2
pm2 status

# Logs en temps réel
pm2 logs bedeew-api

# Redémarrer
pm2 restart bedeew-api

# Arrêter
pm2 stop bedeew-api

# Démarrer
pm2 start bedeew-api

# Informations détaillées
pm2 info bedeew-api

# Moniteur en temps réel
pm2 monit
```

---

**Après le redémarrage, le site devrait fonctionner normalement ! 🚀**
