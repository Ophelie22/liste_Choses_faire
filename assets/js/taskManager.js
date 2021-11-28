/**
 * Manage tasks
 */
let taskManager = {
    /**
     * Add a task to the DOM, using a template
     * @param name Name of the task to add
     * @param categoryId Id of the category of the task to add
     * @param status Status of the task
     * @param completion Percent of completion
     */
    addTask: function(name, categoryId, status = 1, completion = 0, taskId = null) {
        // get the template for a task
        let template = document.getElementById('template-task');
        // clone the content of the template
        let newTask = template.content.cloneNode(true);
        // ----- modify the clone with information from the form
        // https://developer.mozilla.org/en-US/docs/Web/API/HTMLOrForeignElement/dataset
        let taskElement = newTask.querySelector('.task');
        // data-category
        taskElement.dataset.category = categoryId;
        // name of the task
        taskElement.querySelector('.task__name-display').textContent = name;
        // value of the input
        taskElement.querySelector('.task__name-edit').value = name;
        // get the name of the category from the category id
        let categoryName = categoryManager.getCategoryName(categoryId);
        // display the category
        taskElement.querySelector('.task__category p').textContent = categoryName;
        // completion
        taskElement.querySelector('.progress-bar__level').style.width = completion + '%';
        // CSS class from status
        if (completion === 100) {
            taskElement.classList.remove('task--todo');
            taskElement.classList.add('task--complete');
        }
        if (status === 0) {
            // tâche archivée
            taskElement.classList.remove('task--todo');
            taskElement.classList.add('task--archive');
        }
        // dataset id
        taskElement.dataset.id = taskId;
        // ----- add the clone to the DOM, before the form
        // https://developer.mozilla.org/en-US/docs/Web/API/Node/insertBefore
        let parentNode = document.querySelector('.tasks');
        let brother = parentNode.querySelector('.task--add');
        parentNode.insertBefore(newTask, brother);
        // bind events for the new task
        app.bindEventsForTask(taskElement);
    },
    /**
     * Load all tasks from the API
     */
    loadTasks: function() {
        console.log('load tasks');
        // On prépare la configuration de la requête HTTP
        let config = {
            method: 'GET',
            mode: 'cors',
            cache: 'no-cache'
        };
    
        // On déclenche la requête HTTP (via le moteur sous-jacent Ajax)
        fetch('http://localhost:8080/tasks', config)
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
                for (task of data) {
                    taskManager.addTask(task.title, task.category.id, task.status, task.completion, task.id);
                }
            }
        );
    },
    /**
     * Change the completion of a task
     */
    changeTaskCompletion: function(idTask, newCompletion, taskInDOM) {
        // On stocke les données à transférer
        let data = {
            completion: newCompletion
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
                    if (newCompletion === 100) {
                        // remove class task--todo and add class task--complete
                        taskInDOM.classList.remove('task--todo');
                        taskInDOM.classList.add('task--complete');
                    } else if (newCompletion === 0) {
                        // add class task--todo and remove class task--complete
                        taskInDOM.classList.add('task--todo');
                        taskInDOM.classList.remove('task--complete');
                    }
                    // progress bar to 100%
                    let progressBar = taskInDOM.querySelector('.progress-bar__level');
                    progressBar.style.width = newCompletion + '%';
                }
                else {
                    alert('La modification de la tâche a échoué');
                }
            }
        )
    },
    /**
     * Create a task using the API
     */
    createTask: function(title, categoryId) {
        // On stocke les données à transférer
        let data = {
            title: title,
            categoryId: categoryId,
            completion: 0,
            status: 1
        };
        
        // On prépare les entêtes HTTP (headers) de le requête
        // afin de spécifier que les données sont en JSON
        let myHeaders = new Headers();
        myHeaders.append("Content-Type", "application/json");
        
        // On consomme l'API pour ajouter en DB
        let fetchOptions = {
            method: 'POST',
            mode: 'cors',
            cache: 'no-cache',
            // On ajoute les headers dans les options
            headers: myHeaders,
            // On ajoute les données, encodée en JSON, dans le corps de la requête
            body: JSON.stringify(data)
        };
        
        // Exécuter la requête HTTP via XHR
        fetch('http://localhost:8080/tasks/', fetchOptions)
        .then(
            function(response) {
                // ici on a reçu la réponse, mais le contenu n'est pas encore prêt

                // console.log(response);
                // Si HTTP status code à 201 => OK
                if (response.status == 201) {
                    
                    // on demande à lire le contenu de la réponse, ça prend un
                    // certain temps
                    response.json()
                        .then(function(data) {
                            // ici le contenu de la réponse est prêt
                            console.log('data : ', data);
                            // TODO ajouter la tâche dans le DOM
                        });
                }
                else {
                    alert('La création de la tâche a échoué');
                    //alert('La création de la tâche a échoué');
                    console.log("erreur");
                }
            }
        )
    }
}