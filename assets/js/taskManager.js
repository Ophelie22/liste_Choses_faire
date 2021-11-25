/**
 * Manage tasks
 */
let taskManager = {
    /**
     * Add a task to the DOM, using a template
     * @param name Name of the task to add
     * @param categoryId Id of the category of the task to add
     * TODO gérer le pourcentage de complétion, la classe task--complete, l'archivage
     */
    addTask: function(name, categoryId) {
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

        // ----- add the clone to the DOM, before the form
        // https://developer.mozilla.org/en-US/docs/Web/API/Node/insertBefore
        let parentNode = document.querySelector('.tasks');
        let brother = parentNode.querySelector('.task--add');
        parentNode.insertBefore(newTask, brother);

        // bind events for the new task
        app.bindEventsForTask(taskElement);
    }
} 