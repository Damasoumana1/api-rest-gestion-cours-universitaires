# 🎓 API REST - Gestion des Cours Universitaires

Une API RESTful complète construite avec **Node.js, Express et PostgreSQL**, adoptant une solide architecture N-Tiers. Cette API permet d'effectuer les opérations CRUD complètes sur des entités "Cours" (Consulter, Créer, Modifier, Supprimer) et intègre des règles métier strictes.

## 🚀 Fonctionnalités
- Opérations CRUD complètes sur les cours.
- Support pour des mises à jour partielles (PATCH) et complètes (PUT).
- Validation métier (ex. `volumeHoraire` doit être > 0).
- Gestion globale et standardisée des erreurs (404 Not Found, 400 Bad Request, etc.).
- Intégration de Swagger/OpenAPI pour rendre la documentation de l'API interactive.
- Base de données locale PostgreSQL.

## 🛠️ Technologies Utilisées
- **Backend :** Node.js, Express.js
- **Base de Données :** PostgreSQL (via le paquet `pg`)
- **Documentation API :** Swagger UI (`swagger-ui-express`, `yamljs`)
- **Développement :** Nodemon, Dotenv, Cors

## 📂 Structure du Projet
Le projet suit une architecture 3-tiers stricte (Controller ➔ Service ➔ Repository) :

```text
cours-api/
├── src/
│   ├── config/          # Configurations (Base de données, Swagger)
│   ├── controllers/     # Logique de gestion des requêtes HTTP
│   ├── services/        # Logique métier et validation
│   ├── repositories/    # Requêtes directes vers la base de données SQL
│   ├── models/          # Entités métier
│   ├── routes/          # Définition des endpoints REST
│   ├── middlewares/     # Interception (Gestion d'erreurs, etc.)
│   ├── utils/           # Fonctions utilitaires (Formatage de réponses, etc.)
│   ├── app.js           # Configuration initiale d'Express
│   └── server.js        # Point d'entrée de l'application
├── docs/                
│   └── openapi.yaml     # Fichier de documentation technique Swagger
├── database/            
│   └── schema.sql       # Script SQL d'initialisation de la base de données
├── .env                 # Variables d'environnement
└── package.json         # Dépendances Node.js
```

## ⚙️ Prérequis
Avant de commencer, assurez-vous d'avoir installé sur votre machine :
- [Node.js](https://nodejs.org/) (version 14.x ou supérieure)
- [PostgreSQL](https://www.postgresql.org/) (et optionnellement PgAdmin)

## 💻 Installation & Lancement

1. **Ouvrir le projet** : Ouvrez un terminal dans le dossier du projet `cours-api`.
2. **Installer les dépendances** :
   ```bash
   npm install
   ```
3. **Configuration de la Base de Données** :
   - Assurez-vous que votre serveur local PostgreSQL est démarré.
   - Dans PgAdmin ou psql, créez une base de données nommée `cours_db`.
   - Exécutez le script SQL fourni dans `database/schema.sql` pour créer la table `cours`.
   - Les variables d'environnement ont déjà été définies dans le fichier `.env` à la racine (mot de passe local : `onion123`).
4. **Démarrer le Serveur** :
   - Mode développement (redémarrage automatique via Nodemon) : 
     ```bash
     npm run dev
     ```
   - Mode production :
     ```bash
     npm start
     ```
   Le serveur sera lancé sur `http://localhost:3000`.

## 📖 Documentation de l'API (Swagger)

Une fois le serveur démarré, la documentation interactive Swagger est accessible de cette manière :
👉 **[http://localhost:3000/api-docs](http://localhost:3000/api-docs)**

Vous pouvez, depuis cette page très bien mise en page, tester graphiquement et directement tous les endpoints (GET, POST, PUT, PATCH, DELETE) !

## 🏗️ Détails de l'Architecture (MVC / N-Tiers)
* **Controller** : Reçoit la requête HTTP, délègue le travail au Service, et renvoie une réponse JSON formatée avec le bon code HTTP.
* **Service** : C'est le cœur du système. Il effectue la validation métier (ex: vérifier l'existence d'un cours avant sa modification, ou valider le format des données `volumeHoraire`). 
* **Repository** : Représente la couche d'accès aux données. Il exécute les requêtes standards `SELECT`, `INSERT`, `UPDATE`, `DELETE` en interagissant avec le pilote PostgreSQL, garantissant ainsi l'isolation de la base de données.
