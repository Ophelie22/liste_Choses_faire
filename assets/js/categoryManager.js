/**
 * Manage the categories
 */
let categoryManager = {
    categories: [],
    /**
     * Load all categories from the API
     */
    loadCategories: function() {
        //console.log('load categories');

        // On prépare la configuration de la requête HTTP
        let config = {
            method: 'GET',
            mode: 'cors',
            cache: 'no-cache'
        };
    
        // On déclenche la requête HTTP (via le moteur sous-jacent Ajax)
        fetch('//http://localhost:8080/categories', config)
            // Ensuite, lorsqu'on reçoit la réponse au format JSON
            .then(function(response) {
                // console.log(response); // réponse entière (headers + contenu)
                // On convertit cette réponse en un objet JS et on le retourne
                return response.json();
            })
            // Ce résultat au format JS est récupéré en argument ici-même
            .then(function(data) {
                // On dispose désormais d'un tableau JS exploitable dans la variable data
                // console.log(data); // contenu de la réponse sous forme d'objet JS

                let headerSelect = document.getElementById('header-select-category');
                categoryManager.addOptionsToSelect(data, headerSelect);

                let formAddSelect = document.getElementById('form-add-select-category');
                categoryManager.addOptionsToSelect(data, formAddSelect);

                // we store the categories to use them later
                for (category of data) {
                    categoryManager.categories[category.id] = category;
                }
                // console.log(categoryManager.categories);

                // chargement des tâches : on lance le chargement des tâches
                // seulement après avoir reçu la réponse pour les catégories : 
                // rien ne garantit qu'on va recevoir les réponses dans l'ordre
                // où on a envoyé les requêtes
                taskManager.loadTasks();
            }
        );
    },

    /**
     * Add options to a select item
     * @param categoriesArray Categories to add as options
     * @param selectElement Select element into which add the options
     */
    addOptionsToSelect: function(categoriesArray, selectElement) {
        // https://developer.mozilla.org/fr/docs/Web/JavaScript/Reference/Instructions/for...of
        for (const currentCategory of categoriesArray) {
            // console.log(currentCategory);

            // create an option
            let optionElement = document.createElement('option');
            optionElement.textContent = currentCategory.name;
            optionElement.value = currentCategory.id;
            
            // add option to the select
            selectElement.appendChild(optionElement);
        }
    },

    /**
     * Get the name of a category from its id
     * @param categoryId 
     */
    getCategoryName(categoryId) {
        // get the element with index categoryId
        let category = categoryManager.categories[categoryId];
        return category.name;
    }
}