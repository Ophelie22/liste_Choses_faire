let app = {
    /**
     * Initialisation
     */
    init: function() {
        console.log("init");

        // mise en place des écouteurs d'événements
        app.bindEvents();

        // chargement des catégories
        categoryManager.loadCategories();

        // découverte LocalStorage : stocker des informations dans le navigateur
        // https://developer.mozilla.org/en-US/docs/Web/API/Window/localStorage

        // placer une information dans le localStorage (tableau associatif, pour
        // chaque site)
        // localStorage.setItem(clé, valeur)
        localStorage.setItem('filter', 1);

        // consulter une information du localStorage
        // localStorage.getItem(clé)
        console.log('valeur de filter dans localStorage : ', localStorage.getItem('filter'));
    },

    /**
     * Bind event listeners
     */
    bindEvents: function() {
        // loop on tasks
        let tasks = document.querySelectorAll(".tasks .task:not(.task--archive):not(.task--add)");

        for (let i = 0; i < tasks.length; i++) {
            let task = tasks[i];

            app.bindEventsForTask(task);
        }

        // listen for submit event on form to add a task
        let formAddTask = document.querySelector('.task--add form');
        formAddTask.addEventListener('submit', handler.handleAddTaskFormSubmit);
    },

    /**
     * Bind events for a task
     */
    bindEventsForTask: function(task) {
        // event listener for a click on the title
        let title = task.querySelector('.task__name-display');
        title.addEventListener('click', handler.handleClickOnTaskTitle);

        // event listener for blur and keydown on the input
        let input = task.querySelector('.task__name-edit');
        input.addEventListener('blur', handler.handleTaskTitle);
        input.addEventListener('keydown', handler.handleTaskTitleEnterKey);

        // event listener for a click on the validate button
        let validateButton = task.querySelector('.task__button--validate');
        validateButton.addEventListener('click', handler.handleCompleteButtonClick);

        // event listener for a click on the reset button
        let resetButton = task.querySelector('.task__button--incomplete');
        resetButton.addEventListener('click', handler.handleResetButtonClick);
    }
};

// si on exécutait tout de suite init, on risquerait que le DOM ne soit pas encore
// chargé => donc on exécute init au moment de l'événement qui indique que le
// contenu du DOM est chargé
document.addEventListener('DOMContentLoaded', app.init);