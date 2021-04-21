# Spécifications/feuille de route

Fonctionnalités | statut
-----------------------------------|---------
~ | 
**Fonctionnalités vitales (requises)** | 
Un utilisateur possède un accès unique et sécurisé par mot de passe | ✅📐
Un utilisateur peut modifier son mot de passe | ✅📐
Un administrateur peut ajouter/altérer/supprimer un utilisateur | ⏳📐
Un administrateur peut créer/altérer/supprimer un groupe opératoire | ⏳📐
Un administrateur peut ajouter/retirer un utilisateur à un groupe opératoire en tant qu'opérateur | ⏳📐
Un opérateur peut ajouter un utilisateur | ✅
Un opérateur peut ajouter un utilisateur à son groupe opératoire en tant que militant | ✅📐
Un militant peut ajouter un contact à son groupe opératoire (unicité email => écraser si doublon en base) | ✅📐
Un opérateur peut supprimer un contact de la base (sélection par email) | ✅📐
Un opérateur peut accéder aux contacts de son groupe opératoire | 📚📐
~ | 
**Fonctionnalités essentielles (requises dans la mesure du possible)** | 
Un militant peut ajouter un contact tout en étant hors ligne (les contacts ainsi enregistrés sont réellement transférés à la prochaine connexion) | 📚
Un administrateur peut créer une arborescence entre les groupes opératoires (les contacts des groupes opératoires enfants sont affiliés au groupe opératoire parent) | 📚
Un opérateur peut sélectionner des contacts de son groupe opératoire selon un panel de paramètres (tranche d'âge, intérêts, est inscrit, besoins, niveau d'engagement politique ...) | 📚
Un opérateur peut copier une liste préformattée d'emails des contacts séléctionnés de son groupe opératoire | 📚
~ | 
**Fonctionnalités de confort (à faire en complément)** | 
Un opérateur peut éditer et envoyer un email à une sélection de contacts depuis une interface dédiée | 📚
Un mail envoyé par la plateforme inclut un lien de désinscription qui permet de supprimer le contact | 📚
~ | 
**Fonctionnalités du swag et de la majorité absolus au premier tour (seront probablement ignorées à ce stade)** | 
~ | 



### Légende
icône| signification
--|--
📚| à faire
⏳| en cours
✅ | implémenté
~ | 
📐 | intégration front attendue
✏️ | intégration front en cours
✨ | intégration front fonctionnelle