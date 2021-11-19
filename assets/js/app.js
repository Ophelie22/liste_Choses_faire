let app = {
    /**
     * Initialisation
     */
    init: function() {
        console.log("init");
 // mise en place des écouteurs d'événements
        // écouter le clic sur les titres des tâches

        // 1 - repérer tous les titres de tâches (sauf celle du formulaire et
        // celles qui sont archivées, avec le maximum de precision ds le selecteur CSS)
        let titleElements = document.querySelectorAll(".tasks .task:not(.task--archive):not(.task--add) .task__name-display");

        // 2 - On va placer notre écouteur d'evenements sur chacun donc on va faire une boucle
        for (let i = 0; i < titleElements.length; i++) {
            let element = titleElements[i];
            // J'ajoute l'ecouteur de click sur le titre
            element.addEventListener('click', handler.handleClickOnTaskTitle);
        }
        // 3- On va mettre en place notre function handler (fichiers handler.js)

    },
};

// si on exécutait tout de suite init, on risquerait que le DOM ne soit pas encore
// chargé => donc on exécute init au moment de l'événement qui indique que le
// contenu du DOM est chargé
document.addEventListener('DOMContentLoaded', app.init);