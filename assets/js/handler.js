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
         console.log('handleClickOnTaskTitle', event.currentTarget);
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
      //console.log('handleTaskTitle');

     // on récupère le nouveau titre
      let inputElement = event.currentTarget;
      let newTitle = inputElement.value;

      // on met à jour le titre ( notre balise p)
        // on cible le p : frère aîné de l'input qui a déclenché l'événement
        let titleElement = inputElement.previousElementSibling;
        titleElement.textContent = newTitle;
        // on enlève le mode d'édition sur la tâche
        let taskToModify = inputElement.closest('.task');
          // supprimer la classe "task--edit"
        taskToModify.classList.remove('task--edit');
    },
    handleTaskTitleEnterKey: function(event) {
     //console.log(event.key);
      // si la touche est Entrée
      if (event.key === 'Enter') {
             //console.log('Touche entrée appuyée !')
            handler.handleTaskTitle(event);
      }
    },

    /**
     * Handle a click on the button to make the task complete
     * @param {*} event 
     */
    handleCompleteButtonClick: function(event) {
        //console.log('button clicked!');
        let button = event.currentTarget;
        let taskToModify = button.closest('.task');

        // remove class task--todo and add class task--complete
        taskToModify.classList.remove('task--todo');
        taskToModify.classList.add('task--complete');

        // progress bar to 100%
        let progressBar = taskToModify.querySelector('.progress-bar__level');
        progressBar.style.width = '100%';
    }
}; 

