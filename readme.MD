# backend

Pour lancer le server: nodemon server

# Routes

##### Route POST pour créer un compte

http://localhost:3000/api/auth/signup

body --> raw:

{
"email": "xxxxxxxxx",
"password": "xxxxxxxxxx
}

##### Route POST pour se connecter

http://localhost:3000/api/auth/login

body --> raw:

{
"email": "xxxxxxxxx",
"password": "xxxxxxxxxx
}

##### Route POST création sauces

http://localhost:3000/api/sauces/

Params --> KEY:userId VALUE:\_id de l user (sans l anti-slash)
Authorization --> BearerToken Token: xxxxxxxx
body --> forma-data -->
key: sauces
value: {
"userId":"xxxxxxxxx",
"name":"xxxxxxxxxx",
"manufacturer": "xxxxxxxxxxxxxxxxx",
"description": "xxxxxxxxxxxxxxxx",
"mainPepper": "xxxxxxxxxxxxxxxxxxxx",
"heat": xxx,
"imageUrl":"",
"\_\_v": 0
}

key: image
file et sélectionner l'image

##### Route GET voir tout les sauces

http://localhost:3000/api/sauces/

Authorization --> bearerToken Token:xxxxxxx
body--> raw:
{
"userId": "xxxxxxxxxxxxxx"
}

##### Route GET voir une sauce

http://localhost:3000/api/sauces/:id

Authorization --> bearerToken Token:xxxxxxx
Params --> KEY:userId VALUE:\_id de l'user
Body --> none

#### Route PUT pour update une sauce

http://localhost:3000/api/sauces/:id

Params --> KEY:userId VALUE:\_id de l'user
Authorization --> BearerToken Token: xxxxx
Body-->form-data -->
KEY: sauces
VALUE:
{
"userId":"xxxxxxxxx",
"name":"xxxxxxxxxx",
"manufacturer": "xxxxxxxxxxxxxxxxx",
"description": "xxxxxxxxxxxxxxxx",
"mainPepper": "xxxxxxxxxxxxxxxxxxxx",
"heat": xxx,
"imageUrl":"",
"\_\_v": 0
}
KEY: image
file et sélectionner l'image

##### Route DELETE suppression de sauce

http://localhost:3000/api/sauces/:id

Params --> KEY:userId VALUE:\_id de l'user
