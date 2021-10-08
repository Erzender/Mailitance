# [En développement] MAILITANCE

Mailitance est un système de carnet d'adresses paramétrable destiné aux groupes militants de la France Insoumise et de la campagne https://melenchon2022.fr/ , dont l'objectif est de favoriser la communication d'une information pertinente depuis ces mêmes groupes d'action vers les sympathisants dont les militants seraient amenés à recueillir le contact sur le terrain.

## Exigences
Le système conduit intrinsèquement à l'hébergement de données sensibles, son fonctionnement et son pilotage doivent donc répondre à 2 exigences :
- Le respect des données recensées et de leurs propriétaires, et notamment le respect strict du règlement général sur la protection des données (RGPD)
- La sécurité des données stockées (exigence par ailleurs contenue dans le RGPD)

## Déployer le système
### Prérequis
- [Node.js](https://nodejs.org/en/)
- [PostgreSQL](https://www.postgresql.org/)
- configuration des variables d'environnement (voir fichier [`.env.dist`](/.env.dist))

### Installation des dépendances
- `cd ./app ; npm install ; npm run build ; cd ..`
- `npm install`

### Démarrage du service
- `npm start`
- L'application est accessible sur http://localhost:8080/

### Travailler sur le front
- `cd ./app ; npm start`
- L'application recharge automatiquement sur http://localhost:8080/ (8081 si occupé)

## [Spécifications🔗](/doc/Specifications.md)

## Code source et license ouverte
Le code source du présent logiciel se trouve sous licence publique LPRAB v1. Il est donc ouvert à toute utilisation. Ce choix émane d'abord d'un souci de transparence et permet à chacun de vérifier que le logiciel répond à ses propres exigences. Cela permet en outre une réutilisation totale du code source *(bien que le code ne soit pas pensé pour, et répond en outre à une problématique très spécifique au mouvement militant de la France Insoumise)*.

---
[![Discord Insoumis](https://melenshack.fr/images/9JpPj3_S.png)](https://discord.com/invite/g7M2QjQ
)
**〞_N'attendez pas les consignes._ 〟**