# liste_Choses_faire# TodoList - saison 7

On veut mettre en place un petit site de gestion de nos tâches.

## Description

Le nom du projet est _TodoList_.

C'est un petit site permettant de gérer ses tâches, quel que soit leur sujet.

Il ne contient qu'_une seule et unique page_ permettant de réaliser toutes les actions nécessaires.  
Cette page va lister toutes les tâches déjà saisies, ainsi que leurs catégories respectives. Seules les tâches actives (non archivées) sont affichées par défaut.

Pour chaque tâche, on pourra :

- modifier son nom
- la marquer comme "complète" (== terminée)
- la marquer comme "incomplète" (== en cours de réalisation)
- l'archiver
- la supprimer (si et seulement si elle est déjà archivée)

Un formulaire en bas de la liste permettra d'ajouter facilement une nouvelle tâche en renseignant son nom, et la catégorie liée.

En haut du site, on pourra filtrer la liste des tâches de la façon suivante :

- toutes / complétées / non complétées
- catégorie

Ces 2 filtres doivent se cumuler et permettre ainsi de lister, par exemple, toutes les tâches complétées d'une catégorie, ou bien les tâches archivées toutes catégories confondues.

On pourra aussi accéder spécifiquement aux tâches archivées grâce à un lien en haut de page.

### :warning: Précisions techniques

- chaque action sur le site se fera **sans jamais recharger la page**
- le site devra s'adapter à tous les écrans, grâce à la technique **_Responsive Design_**

## Fichiers techniques

- [User stories](docs/user_stories.md)
- [Product backlog](docs/product_backlog.md)
- [Wireframe](docs/wireframe.png)

## Organisation

L'organisation est horizontale. Des rôles sont définis.  
Quel que soit son rôle, « on » ne donne d'ordre à personne.  
Chacun assume son rôle et s'occupe de sa partie, de ses responsabilités.  
Chacun communique et se coordonne avec les autres.

### Rôle : _Product Owner_

Fiche récap : https://github.com/O-clock-Alumni/fiches-recap/blob/master/gestion-projet/methode-scrum.md#product-owner

Mickaël assurera le rôle de product owner

Le _Product Owner_ est l'unique rédacteur du _Product Backlog_.  
Le _Product Owner_ peut aider les développeurs à clarifier certaines fonctionnalités, répondre aux questions sur le projet.  
Il est dépositaire de la vision.

### Rôle : _Scrum Master_

Fiche récap : https://github.com/O-clock-Alumni/fiches-recap/blob/master/gestion-projet/methode-scrum.md#scrum-master

Le prof de chaque cockpit tiendra le rôle de _Scrum Master_ :pray:

Le _Scrum Master_ est une aide, un support aux autres membres de l'équipe.  
Il s'assure que tout le monde suive bien la méthodologie _Scrum_.  
Il anime notamment les réunions _Daily Scrum_ et la constitution du _Sprint Backlog_.

### Rôle : _Developer_

Fiche récap : https://github.com/O-clock-Alumni/fiches-recap/blob/master/gestion-projet/methode-scrum.md#%C3%A9quipe

Le prof de chaque cockpit _et_ les étudiants ont le rôle de _Developer_ :muscle:

Lors du _Sprint Planning_, les développeurs sont les seuls à décider quels éléments du _Product Backlog_ sont à intégrer au _Sprint Backlog_. Pour cela, ils prennent en compte l'importance de chaque élément pour essayer de les réaliser en priorité.  
Lors du _Sprint Planning_, les développeurs peuvent utiliser le _Planning Poker_ ([fiche récap](https://github.com/O-clock-Alumni/fiches-recap/blob/master/gestion-projet/methode-scrum.md#planning-poker)) pour déterminer l'effort (la difficulté, la complexité) pour chaque élément du _Product Backlog_ (il n'est pas nécessaire de passer sur toutes les user stories).

### Sprints

Chaque _Sprint_ va durer une "saison", soit 8 jours.

À la fin de chaque _Sprint_ sera livré un _Incrément_ du projet, contenant les fonctionnalités mises en place (issues du _Sprint Backlog_).

> Dans le cadre de la formation O'clock, on va réaliser un, et un seul, _Sprint_. Mais c'est déjà l'occasion d'implémenter pas mal de choses !

### Daily Scrum

À chaque début de journée, les _Developers_ organisent un _Daily Scrum_ "lite" (léger) afin de savoir :

- ce que chacun a fait la veille
- ce que chacun compte faire aujourd'hui
- si quelque chose nous bloque, quoi exactement

## Versions du projet

Le logiciel de versionning pour ce projet sera _Git_.

Chaque fonctionnalité sera codée dans une branche séparée.  
Lorsque la fonctionnalité est terminée, une _Pull Request_, avec 3 à 4 reviewers parmi les _Developers_, sera créée afin de garantir la qualité du code. Une fois validée, la _Pull Request_ pourra être fusionnée dans la branche `master`.

## Documentation

La documentation technique devra être rédigée **en anglais**.

Objectif
on veut pouvoir archiver une tâche
on veut pouvoir voir toutes les archives
on veut pouvoir supprimer une tâche
Etapes
#1 Archiver une tâche
dans le code côté frontend
si ce n'est pas déjà fait
écouter l'event "click" sur le bouton rouge
y affecter une méthode du module app
dans cette méthode "handler"
récupérer l'élément "bouton rouge" sur lequel le click vient d'avoir lieu
récupérer l'id de la tâche (voir pour tâche complétée)
lancer une requête HTTP sur le bon Endpoint
fournir toutes les données demandées
selon le HTTP Status Code de la réponse
afficher un message de succès + ajuster l'affichage de la tâche dans la page
ou afficher un message d'erreur
#2 Voir toutes les archives 1/2
Il est grand temps de gérer l'affichage des tâches archivées !
En base, les tâches archivées ont un status égal à 0 ; les tâches activées un status égal à 1.

si ce n'est pas déjà le cas, modifier la requête de création d'une tâche pour envoyer un statut correct (une tâche créée via le front doit être automatiquement activée) — retoucher l'API si nécessaire
pour l'affichage des tâches activées vs archivées, on n'a pas besoin de toucher l'API
dans le code côté frontend, chaque tâche archivée est bien ajoutée dans le DOM au chargement de la page
mais il faut les afficher un peu différement des autres (classe .todo--archive réalisant un display: none)
donc quand on récupère les tâches initiales, il faut parcourir toutes les tâches
pour chaque tâche
si elle est archivée
alors on la masque
sinon
alors on l'affiche
au clic sur le lien Voir les archives, inverser cette logique d'affichage
#3 Voir toutes les archives 2/2
Une fois toutes les archives affichées, comment revenir à l'affichage initiale (tâches actives uniquement) ?

déclarer une propriété "displayArchives" dans app et l'initialiser à false
suite au click sur "Voir les archives"
changer le texte dans ce lien en "Voir les tâches actives"
modifier la propriété "displayArchives"
à true si elle était à false
à false si elle était à true
en gros, on inverse la valeur booléenne !
modifier le code du handler de l'étape 2, pour
qu'il affiche les archives si app.displayArchives est true
qu'il affiche les tâches actives si app.displayArchives est false
#4 Endpoint /tasks/[id] en DELETE
mettre en place la route et la méthode de Controller
attention à configurer la bonne méthode HTTP 😉
on n'a pas besoin d'une View car on ne génère pas du code HTML
dans la méthode,
récupérer la tâche demandée (son id est fourni en argument de la méthode de Controller)
si elle existe
appeler la bonne méthode de l'objet Task pour la supprimer de la BDD
si la suppression a fonctionné
alors retourner un code de réponse HTTP 204 "(No Content)"
https://restfulapi.net/http-methods/#put
sans body (pas de JSON ni d'HTML)
sinon
alors retourner un code de réponse HTTP 500 "Internal Server Error"
https://restfulapi.net/http-status-codes/
sans body (pas de JSON ni d'HTML)
sinon
alors retourner un code de réponse HTTP 404 "Not Found"
https://restfulapi.net/http-status-codes/
sans body (pas de JSON ni d'HTML)
tester les différents cas de figure avec Insomnia
#5 Supprimer une tâche
bon, là, faut-il encore décrire les étapes ?
il y a un "bouton rouge" (différent de celui pour archiver)
au click sur ce bouton…
ben hop, requête HTTP sur le Endpoint de l'étape précédente
et selon la réponse, on affiche un message de succès ou d'erreur + mise-à-jour de la page 👍
