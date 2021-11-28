/**
 * les handlers : traitement des événements
 */
let handler = {
    /**
     * Prise en compte d'un clic sur le titre d'une tâche
     * @param event Evénement reçu
     */
    handleClickOnTaskTitle: function(event) {
        // traitement
        // console.log('handleClickOnTaskTitle', event.currentTarget);
        let element = event.currentTarget;
        // récupérer le parent le plus proche qui a la classe task
        // https://developer.mozilla.org/en-US/docs/Web/API/Element/closest
        let taskToModify = element.closest('.task');
        // ajouter la classe "task--edit"
        taskToModify.classList.add('task--edit');
    },
    /**
     * Traite un événement lié à un input en mettant à jour le titre de la tâche
     * @param {*} event 
     */
    handleTaskTitle: function(event) {
        // console.log('handleTaskTitle');
        // on récupère le nouveau titre
        let inputElement = event.currentTarget;
        let newTitle = inputElement.value;
        // on met à jour le titre (p)
        // on cible le p : frère aîné de l'input qui a déclenché l'événement
        let titleElement = inputElement.previousElementSibling;
        titleElement.textContent = newTitle;
        // on enlève le mode d'édition sur la tâche
        let taskToModify = inputElement.closest('.task');
        // supprimer la classe "task--edit"
        taskToModify.classList.remove('task--edit');
    },
    handleTaskTitleEnterKey: function(event) {
        // console.log(event.key);
        // si la touche est Entrée
        if (event.key === 'Enter') {
            // console.log('Touche entrée appuyée !')
            handler.handleTaskTitle(event);
        }
    },
    /**
     * Handle a click on the button to make the task complete
     * @param {*} event 
     */
    handleCompleteButtonClick: function(event) {
        // find the task
        let button = event.currentTarget;
        let taskToModify = button.closest('.task');
          // get the id because we need it to make a call to the API
        let idTask = taskToModify.dataset.id;

        // On stocke les données à transférer
        let data = {
            completion: 100
        };

        // On prépare les entêtes HTTP (headers) de le requête
        // afin de spécifier que les données sont en JSON
        let myHeaders = new Headers();
        myHeaders.append("Content-Type", "application/json");

        // On consomme l'API pour ajouter en DB
        let fetchOptions = {
            method: 'PATCH',
            mode: 'cors',
            cache: 'no-cache',
            // On ajoute les headers dans les options
            headers: myHeaders,
            // On ajoute les données, encodée en JSON, dans le corps de la requête
            body: JSON.stringify(data)
        };

        // Exécuter la requête HTTP via XHR
        fetch('http://localhost:8080/tasks/' + idTask, fetchOptions)
        .then(
            function(response) {
                // console.log(response);
                // Si HTTP status code à 201 => OK
                if (response.status == 200) {
                    // on modifie l'affichage seulement si l'action a réussi
                    // remove class task--todo and add class task--complete
                    taskToModify.classList.remove('task--todo');
                    taskToModify.classList.add('task--complete');

                    // progress bar to 100%
                    let progressBar = taskToModify.querySelector('.progress-bar__level');
                    progressBar.style.width = '100%';
                }
                else {
                    alert('La modification de la tâche a échoué');
                }
            }
        )
    },

    /*
    Objectif : charger les tâches depuis l'API
    - mutualiser le code d'ajout d'une tâche avec le formulaire
    - en profiter pour réparer le formulaire (select avec value)
    => il me faut une fonction getNameOfCategory(categoryId)
    => il faut que je stocke les catégories quand j'ai la réponse de l'API
    - faire appel à l'API et traiter la réponse
    */
    /**
     * Handle submit event on the form to add a task
     * @param {*} event 
     */
    handleAddTaskFormSubmit: function(event) {
        event.preventDefault();
        // get information from the form
        let name = event.currentTarget.querySelector('input.task__name-edit').value;
        let category = event.currentTarget.querySelector('.task__category select').value;
        /*
        si je veux isoler un morceau de code dans une fonction pour l'utiliser à
        plusieurs endroits :
        1- repérer où commence et où finit le morceau de code
        2- trouver un nom pour ce morceau de code (quelle action il fait) => nom
        de la fonction
        3- repérer les différences => en déduire les paramètres de la fonction
        4- utiliser la fonction, vérifier qu'il n'y a pas de bug
        */
        taskManager.addTask(name, category);
        // clear the form
        event.currentTarget.querySelector('input.task__name-edit').value = '';
        event.currentTarget.querySelector('.task__category select').value = 'Choisir une catégorie';
    }
};