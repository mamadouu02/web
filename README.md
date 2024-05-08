---
title: Projet React 
author:  
- Ahmed Boudahmane, Mamadou Thiongane
--- 

## Cahier des charges

### Cas d'usage

A modifier/compléter 

```plantuml
@startuml
left to right direction
actor "Visitor" as v
actor "Registered User" as u
actor "Member" as m
actor "Group owner" as o
actor "Admin" as a
actor "Group manager" as g
u <-- g
u <-- m
g <-- o
g <-- a
rectangle Application {
  usecase "Register" as R
  usecase "Connect" as C
  usecase "Disconnect" as D
  usecase "View users" as VU
  usecase "View own groups" as VOG
  usecase "View my groups" as VMG
  usecase "View all groups" as VAG
  usecase "View messages" as VM
  usecase "Create group" as CG
  usecase "Add member" as AM
  usecase "Delete member" as DM
  usecase "Leave group" as LG
  usecase "Delete group" as DG
  usecase "Change role" as CR
  usecase "Post message" as PM
}
v --> R
u --> C
u --> D
u --> VU
o --> VOG
u --> VMG
a --> VAG
u --> VM
u --> CG
g --> AM
g --> DM
u --> LG
g --> DG
a --> CR
u --> PM
@enduml
```

### Maquettes

#### Forumulaire de connexion

![Maquette du formulaire de connexion](/img/maquette-login.png "Maquette du formulaire de connexion")

#### Gestion des groupes

![Maquette de la gestion des groupes](/img/maquette-groups.png "Maquette de la gestion des groupes")

#### Gestion des messages

```plantuml
@startsalt
<style>
header {
  TextAlignement right
  BackGroundColor gray
  FontColor white
}
</style>
header {- Alice@aol.fr | [Se déconnecter] }
{
{^Mes groupes
**Ceux dont je suis membre**
* Ensimag
* Grenoble INP
* <b>Club gaming
----
**Ceux que j'administre**
* Club Gaming
* Running
"<i>nom du nouveau groupe" 
 [Créer]
}|
{^"Discussion sur le groupe <b>Club Gaming"
{SI
  [Salut , ca va? ] | Charlie
  [Super, et toi?] | Asimov
  [On se fait un truc] | Asimov
  [Une idée? ] | Charlie
  . | [Hello, oui]
  ----|----
}
{+ "Une partie de LOL après?" | [Envoyer ] }
}
}
@endsalt
```

### Captures d'écran

#### Forumulaire de connexion

![Formulaire de connexion](/img/login.png "Formulaire de connexion")

#### Gestion des groupes

![Gestion des groupes](/img/groups.png "Gestion des groupes")

#### Gestion des messages

![Gestion des messages](/img/messages.png "Gestion des messages")

### API mise en place

Lien vers la documentation swagger : https://web-application.osc-fr1.scalingo.io/doc/

## Architecture du code

### FrontEnd

```sh
frontend/src
|-- App.css
|-- App.jsx
|-- AppContext.js
|-- assets
|   `-- logo.svg
|-- components
|   |-- Button.jsx
|   |-- ErrorMessage.jsx
|   |-- GroupManager.jsx
|   |-- GroupMessages.jsx
|   |-- Groups.jsx
|   |-- InputField.jsx
|   |-- ListGroups.jsx
|   |-- ListMembers.jsx
|   |-- ListMessages.jsx
|   |-- LoginForm.jsx
|   |-- MemberManager.jsx
|   `-- RegisterForm.jsx
|-- index.css
|-- main.jsx
`-- views
    |-- Accueil.jsx
    `-- LoginView.jsx
```

### Backend

#### Schéma de votre base de donnée

```plantuml
class User{
  name
  email
  passhash
  isAdmin : boolean
}

class Message{
  content
}

class Group{
  name
}

User "1" -- "n" Message : posts
Group "1" -- "n" Message : contains

User "n" -- "n"  Group : is member 
User "1" -- "n"  Group : create and own
```

#### Architecture de votre code

```sh
backend/src
|-- __tests__
|   `-- api.test.js
|-- app.js
|-- controllers
|   |-- groups.js
|   |-- messages.js
|   `-- user.js
|-- frontend
|   `-- index.html
|-- models
|   |-- database.js
|   |-- groups.js
|   |-- messages.js
|   `-- users.js
|-- routes
|   |-- groups.js
|   |-- messages.js
|   |-- router.js
|   `-- user.js
|-- server.js
`-- util
    |-- CodeError.js
    |-- logger.js
    |-- swagger.js
    `-- updatedb.js
```

#### Obtention d'un token d'accès

```js
fetch("http://localhost:3000/login", {
  "method": "POST",
  "headers": {
    "content-type": "application/json"
  },
  "body": {
    "email": "John.Doe@acme.com",
    "password": "1m02P@SsF0rt!"
  }
})
.then(response => {
  console.log(response);
})
.catch(err => {
  console.error(err);
});
```

### Gestion des rôles et droits

Expliquer ici les différents rôles mis en place, et comment ils sont gérés dans votre code.

- Coté backend

- Coté frontend

## Test

### Backend

Décrivez les tests faits au niveau du backend, leur couverture.

### Frontend

Décrivez les tests faits au niveau du backend, leur couverture.

## Intégration + déploiement (/3)

Décrivez ici les éléments mis en place au niveau de l'intégration continue 

## Installation

```sh
cd frontend; npm install; npm run dev #frontend
commande # pour lancer les tests frontend
cd backend; npm install; npm run start #backend
commande # pour lancer les tests backend ?
firefox https://xxx.scalingo.ioscalingo/docs # pour accéder à la doc scalingo si déployé en ligne
```
