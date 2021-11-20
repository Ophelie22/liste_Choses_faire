/**
 * Manage the categories
 */
let categoryManager = {
    /**
     * Load all categories from the API
     */
    loadCategories: function() {
        console.log('load categories');

// On prépare la configuration de la requête HTTP
        let config = {
            method: 'GET',
            mode: 'cors',
            cache: 'no-cache'
      };
        // On déclenche la requête HTTP (via le moteur sous-jacent Ajax)
    fetch('https://benoclock.github.io/S07-todolist/categories.json', config)
            // Ensuite, lorsqu'on reçoit la réponse au format JSON
        .then(function(response) {
                // console.log(response); // réponse entière (headers + contenu)
                // On convertit cette réponse en un objet JS et on le retourne
        return response.json();
        })
        // Ce résultat au format JS est récupéré en argument ici-même
        .then(function(data) {
        // On dispose désormais d'un tableau JS exploitable dans la variable data
        
          console.log(data); // contenu de la réponse sous forme d'objet JS

          categoryManager.addOptionsToSelect(data);
            }
        ); 
    },
    /**
     * Add options to a select item
     */
    //(categieArray je met le nom que je veux, j'ai besoin d'un tableau par rapport a data)
    addOptionsToSelect: function(categoriesArray) {
        // https://developer.mozilla.org/fr/docs/Web/JavaScript/Reference/Instructions/for...of
        for (const currentCategory of categoriesArray) {
            // console.log(currentCategory);

            // create an option
            let optionElement = document.createElement('option');
            optionElement.textContent = currentCategory.name;
            optionElement.value = currentCategory.id;

            // add option to the select
            document.getElementById('header-select-category').appendChild(optionElement);
        }
    },
} 