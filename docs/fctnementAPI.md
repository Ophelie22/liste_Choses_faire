let app = {
    /* base URL for the API */
    baseURL: 'https://swapi.dev/api',

    init: function() {
        console.log('init');
        app.loadPeople10();
        app.loadVehicles();
    },
    //ici let app = {
    /* base URL for the API */
   // baseURL: https:'benoclock.github.io/S07-todolist',

    //init: function() {
       // console.log('init');
      //  app. loadCategories();

   // }
}
    /**
     * Get information for the character with id 10
     */
    loadPeople10: function() {
        let fetchOptions = {
            // La méthode HTTP (GET, POST, etc.)
            method: 'GET',
            // On utilisera souvent Cross Origin Resource Sharing qui apporte
            // une sécurité pour les requêtes HTTP effectuée avec XHR entre 2
            // domaines différents.
            mode: 'cors',
            // Veut-on que la réponse puisse être mise en cache par le navigateur ?
            // Non durant le développement, oui en production.
            cache: 'no-cache'
        };
  
  
        /*
        * Arguments de fetch() :
        * 1. l'URL à laquelle on veut accéder
        * 2. les options de cette requête HTTP
        */
        fetch(app.baseURL + '/people/10/', fetchOptions)
        .then(
            // Cette fonction de callback est définie directement "à la volée" => fonction anonyme.
            // Elle recevra en argument la réponse brute provenant du serveur.
            function(response) {
                // On sait que la réponse est au format JSON (JavaScript Object Notation),
                // donc on transforme la réponse : conversion texte => objet JS
                //on va convertir cette methode au fichier json en Objet du coup je pourrais acceder au valeurs
                 //car j'aurais accesau proprietes
                return response.json();
            }
        )
        .then(
            // Celle-ci étant chaînée à la précédente, elle recevra en argument la réponse
            // précédemment convertie en objet JS.
            function(jsonResponse) {
                // Désormais, on a accès aux données facilement et on peut travailler avec :
                // console.log(jsonResponse);
            
                // TODO, utiliser ces données pour modifier la page, afficher les données, etc.

                console.log('Nom du personnage : ', jsonResponse.name);
            }
        );
    },

    /**
     * Get information for the vehicles
     */
    loadVehicles: function() {
        let fetchOptions = {
            // La méthode HTTP (GET, POST, etc.)
            method: 'GET',
            // On utilisera souvent Cross Origin Resource Sharing qui apporte
            // une sécurité pour les requêtes HTTP effectuée avec XHR entre 2
            // domaines différents.
            mode: 'cors',
            // Veut-on que la réponse puisse être mise en cache par le navigateur ?
            // Non durant le développement, oui en production.
            cache: 'no-cache'
        };
  
  
        /*
        * Arguments de fetch() :
        * 1. l'URL à laquelle on veut accéder
        * 2. les options de cette requête HTTP
        */
        fetch(app.baseURL + '/vehicles/', fetchOptions)
        .then(
            // Cette fonction de callback est définie directement "à la volée" => fonction anonyme.
            // Elle recevra en argument la réponse brute provenant du serveur.
            function(response) {
                // On sait que la réponse est au format JSON (JavaScript Object Notation),
                // donc on transforme la réponse : conversion texte => objet JS
                return response.json();
            }
        )
        .then(
            // Celle-ci étant chaînée à la précédente, elle recevra en argument la réponse
            // précédemment convertie en objet JS.
            function(jsonResponse) {
                // Désormais, on a accès aux données facilement et on peut travailler avec :
                console.log(jsonResponse);
            
                // TODO, utiliser ces données pour modifier la page, afficher les données, etc.

                // la réponse est un objet
                // cet objet a une propriété results
                // results est un tableau (ici on a 10 éléments dedans)
                // chaque élément du tableau c'est un objet
                
                // console.log(jsonResponse.results); // tableau avec les résultats


                //ON peut le marquer comme cela:
                //let arrayVehicles = jsonResponse.results;
               // console.log('array: ', arrayVehicles);

                // parcours du tableau
                //for (let i = 0; i < arrayVehicles.length; i++) {
                   //:let vehicle = arrayVehicles[i];
                    //console.log(vehicle);

                    //console.log('name: ', vehicle.name);
                

                // parcours du tableau
                for (let i = 0; i < jsonResponse.results.length; i++) {
                    let vehicle = jsonResponse.results[i];
                    // console.log(vehicle);

                    console.log(vehicle.name);

                    // on pourrait par exemple aller ajouter une div dans le DOM
                    // pour chaque véhicule
                    let newDiv = document.createElement('div');
                    newDiv.textContent = vehicle.name;
                    document.getElementById('content').appendChild(newDiv);
                }
            }
        );
    };

document.addEventListener('DOMContentLoaded', app.init)