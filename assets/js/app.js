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
    }
};

// si on exécutait tout de suite init, on risquerait que le DOM ne soit pas encore
// chargé => donc on exécute init au moment de l'événement qui indique que le
// contenu du DOM est chargé
document.addEventListener('DOMContentLoaded', app.init);