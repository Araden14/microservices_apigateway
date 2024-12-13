<h1>API Gateway - Projet microservices</h1>
<h2>Introduction</h2>
<p>Ce repo fait partie intégrante d'une série de répos dont le but est de mettre en place
une architecture à base de microservices pour une entreprise de gestion hôtelière
Il correspond à l'API gateway conçu pour 4 autres microservices : <ul>
  <li><a target="_blank" href="https://github.com/Araden14/microservices_djangopay">Microservice de paiement</a></li>
  <li><a target="_blank" href="https://github.com/Othhmane/Projet-microservice">Microservice de gestion des clients</a></li>
  <li><a target="_blank" href="https://github.com/Araden14/microservices_djangopay">Microservice de gestion des chambres</a></li>
  <li><a target="_blank" href="https://github.com/loulounav78/Reservation-micro-service">Microservice de gestion des réservations</a></li>
</ul></p>
<h2>Installation</h2>
<p>Ce projet se déploie avec docker, le docker compose principal se trouve dans ce repo et permet d'obtenir les images à partir du Dockerfile de chaque microservice.
Après installation de toutes les dépendances le docker compose lancera les 4 microservices et le serveur api gateway. Chaque microservice a sa propre base de données
et ses endpoints API. Ils communiquent par API avec l'API Gateway. Voici ci-desosus la structure nécessaire pour le bon fonctionnement du lancement et la commande pour
lancer le projet.</p>

```
└── hotel_service/
    ├── Reservation-micro-service
    ├── Projet-microservice
    ├── microservices_djangopay
    ├── microservices_apigateway
    └── microserviceChambre
```
Pour lancer le projet :
```
cd microservices_apigateway
```
```
docker compose up --build
```

