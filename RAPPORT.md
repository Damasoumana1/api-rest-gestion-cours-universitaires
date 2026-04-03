# Rapport de TP : Conception et utilisation d'un service REST

**Université :** Université Joseph Ki Zerbo  
**Niveau :** M1 Informatique / Services Web – Mars 2026  
**Enseignant :** Dr SOMDA

---

## 1 Partie 1 : Modélisation REST

### 1.1 Identification des ressources
La ressource principale exposée par notre API est la ressource **Cours**. Ses attributs sont : `id`, `titre`, `enseignant`, `volumeHoraire`, et `actif`.

### 1.2 Définition des URI REST
Les URI se basent sur le chemin de base `/api/cours` pour manipuler la collection, et `/api/cours/{id}` pour manipuler un élément spécifique. 

### 1.3 Modélisation REST

| Action | Méthode HTTP | URI REST | Code de retour attendu |
| :--- | :--- | :--- | :--- |
| Lister les cours | `GET` | `/api/cours` | `200 OK` |
| Lire un cours | `GET` | `/api/cours/{id}` | `200 OK` / `404 Not Found` |
| Créer un cours | `POST` | `/api/cours` | `201 Created` / `400 Bad Request` |
| Modifier un cours | `PUT` | `/api/cours/{id}` | `200 OK` / `404 Not Found`|
| Modifier partiellement | `PATCH` | `/api/cours/{id}` | `200 OK` / `404 Not Found` |
| Supprimer un cours | `DELETE`| `/api/cours/{id}` | `204 No Content` / `404 Not Found`|

### 1.4 Justification des choix REST
- **Utilisation de noms et pluriel :** L'URI `/api/cours` représente une collection (noms) plutôt que des actions (comme `/creer-cours`), respectant la norme REST.
- **Utilisation sémantique des verbes :** Chaque verbe correspond à une action précise (`GET` pour la lecture sécurisée sans effet de bord, `POST` pour la création, `PUT` pour l'écrasement, `PATCH` pour la mise à jour partielle, `DELETE` pour la suppression).

---

## 2 Partie 2 : Implémentation et tests de l'API

### 2.1 Création d'un cours (POST)
**Requête :**
```http
POST /api/cours
Content-Type: application/json

{ 
  "titre": "Architecture Logicielle", 
  "enseignant": "Dr. Somda", 
  "volumeHoraire": 24, 
  "actif": true 
}
```
✔ **Résultat :** Le cours est créé et l'API renvoie le code `201 Created` avec l'objet contenant le nouvel `id`.

### 2.2 Consultation de tous les cours (GET)
**Requête :**
```http
GET /api/cours
```
✔ **Résultat :** Code statut `200 OK` retournant la liste JSON de tous les enseignements créés.

### 2.3 Consultation d'un cours spécifique (GET by ID)
**Requête :**
```http
GET /api/cours/1
```
✔ **Résultat :** Code statut `200 OK` avec un objet JSON unique contenant les détails du cours n°1.

### 2.4 Suppression d'un cours (DELETE)
**Requête :**
```http
DELETE /api/cours/1
```
✔ **Résultat :** L'API supprime le cours correspondant à l'ID `1` en base de données. Le code statut retourné est `204 No Content`, signalant que l'élément a bien été supprimé et sans retourner de corps de message.

---

## 3 Partie 3 : Comparaison PUT vs PATCH

### 3.1 Test de PUT (remplacement complet)
La méthode PUT écrase complètement l'entité existante. Tous les champs obligatoires doivent être inclus dans la requête.
**Requête :**
```http
PUT /api/cours/1
Content-Type: application/json

{ 
  "id": 1, 
  "titre": "Services Web Avancés", 
  "enseignant": "Dr. Somda", 
  "volumeHoraire": 36, 
  "actif": true 
}
```

### 3.2 Test de PATCH (modification partielle)
La méthode PATCH applique uniquement de petites modifications. Dans notre API, ou selon la norme JSON Patch (RFC 6902), seuls les champs ciblés sont mis à jour :
**Requête via JSON Patch :**
```http
PATCH /api/cours/1
Content-Type: application/json-patch+json

[ 
  { "op": "replace", "path": "/volumeHoraire", "value": 40 }, 
  { "op": "replace", "path": "/actif", "value": false } 
]
```

### 3.3 Tableau comparatif PUT vs PATCH

| Caractéristique | `PUT` | `PATCH` |
| :--- | :--- | :--- |
| **Opération** | Remplacement intégral | Modification partielle |
| **Payload (Corps)**| L'objet complet | Seulement les champs à modifier |
| **Idempotence** | Idempotent (écraser avec la même chose = même résultat) | Non idempotent par défaut |
| **Bande passante** | Consomme plus (renvoie toutes les données) | Plus léger (envoie juste les différences) |

---

## 4 Partie 4 : Gestion des erreurs et codes HTTP

### 4.1 Tableau des codes HTTP implémentés
| Situation | Code HTTP implémenté |
| :--- | :--- |
| Action réussie (lecture, mise à jour) | `200 OK` |
| Création réussie | `201 Created` |
| Suppression réussie | `204 No Content` |
| JSON invalide ou Données incorrectes | `400 Bad Request` |
| Ressource inexistante | `404 Not Found` |
| Erreur serveur imprévue | `500 Internal Server Error` |

### 4.2 Test : Ressource inexistante (404)
Si l'on essaie de lire un cours inexistant (`GET /api/cours/999`), l'API retourne un `404 Not Found` sous un format JSON standardisé :
```json
{ 
  "error": "Cours non trouvé", 
  "timestamp": "2026-02-20T10:30:00" 
}
```

### 4.3 Test : JSON invalide (400)
Si la syntaxe JSON envoyée au serveur est incorrecte, le serveur ne peut l'interpréter correctement, l'API renvoie de suite un `400 Bad Request`. Ce mécanisme est géré de façon globale via les middlewares Express.

---

## 5 Partie 5 : Fonctionnalités bonus

### 5.1 Validation métier (volumeHoraire > 0)
Pour éviter l'insertion de données incohérentes, l'API vérifie systématiquement que l'attribut `volumeHoraire` est strictement supérieur à 0. Cette validation est implémentée dans les couches Services/Middlewares de notre architecture.
*Exemple de refus :* Si l'utilisateur envoie `volumeHoraire: 0`, l'API répond `400 Bad Request`.

### 5.2 Pagination
*Note : Bien que non requis au niveau de base, un système de pagination peut être implémenté via des Query Parameters (`?page=1&limit=10`) pour permettre de filtrer et lister les résultats d'une grande base de données.*

---

## Annexes

### Technologies Utilisées
Ce projet a été développé en respectant les standards de l'industrie, avec la stack suivante :
- **Node.js & Express.js** : Pour la construction rapide et robuste du serveur REST.
- **PostgreSQL** : Système de gestion de base de données relationnelle puissant pour assurer l'intégrité de nos cours.
- **Swagger / OpenAPI** : Définition, conception et test graphique interactif de l'API REST.

### Dépôt Git
Le code source complet de cette API, l'historique des commits démontrant l'évolution du projet, ainsi que son architecture, sont disponibles et hébergés de manière publique sur GitHub à l'adresse suivante :  
🔗 **[https://github.com/Damasoumana1/api-rest-gestion-cours-universitaires](https://github.com/Damasoumana1/api-rest-gestion-cours-universitaires)**

### Récapitulatif des tests effectués
Les tests ont validé le bon acheminement des requêtes REST au format JSON, le bon comportement des traitements en base de données via PostgreSQL, et la gestion des exceptions standards grâce au gestionnaire d'erreur global.

### Commandes curl équivalentes
Voici un exemple de test rapide avec cURL depuis le terminal :
```bash
curl -X POST http://localhost:3000/api/cours \
  -H "Content-Type: application/json" \
  -d '{"titre":"Algorithmique","enseignant":"Dr. Somda","volumeHoraire":30,"actif":true}'
```

### Accès à la documentation Swagger UI
Pour une interactivité complète et visuelle, une interface Swagger documentant toutes ces routes (`GET`, `POST`, `PUT`, `PATCH`, `DELETE`) est accessible en lançant l'API sur le port 3000 :
👉 **[http://localhost:3000/api-docs](http://localhost:3000/api-docs)**
L'interface permet de tester en direct toutes les fonctionnalités décrites au sein de ce rapport.
