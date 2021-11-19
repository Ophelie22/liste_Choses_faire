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
        //let element = event.currentTarget;

        // récupérer le parent le plus proche qui a la classe task
        // https://developer.mozilla.org/en-US/docs/Web/API/Element/closest
        //let taskToModify = element.closest('.task');

        // ajouter la classe "task--edit"
        //taskToModify.classList.add('task--edit');
    },
};
