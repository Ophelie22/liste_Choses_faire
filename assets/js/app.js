let app = {
    /**
     * Initialisation
     */
    init: function() {
        console.log("init");

    }
};
// si on exécutait tout de suite init, on risquerait que le DOM ne soit pas encore
// chargé => donc on exécute init au moment de l'événement qui indique que le
// contenu du DOM est chargé
document.addEventListener('DOMContentLoaded', app.init);