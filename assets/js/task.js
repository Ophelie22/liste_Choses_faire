console.log('%c' + 'task.js loaded', 'color: #b0f; font-size: 1rem; background-color:#fff');

let task = {

  tasks: null,

  init: function() {

  },

  load: function() {
    let fetch = apiClient.loadTasks();
    fetch.then(task.displayTasks);
    return fetch;
    // return apiClient.loadTasks().then(task.displayTasks);
  },

  // this method will register the event handlers on a task DOM element
  makeInteractive: function(task) {
    console.log("method makeInteractive called");

    // targeting the task title DOM element
    let titleElement = task.querySelector(".task__name");
    //console.log(titleElement);
    titleElement.addEventListener('click', eventHandler.handleClickOnTaskTitle);

    // targeting yellow edit button
    let editButton = task.querySelector(".task__button--modify");
    //console.log(editButton);
    editButton.addEventListener('click',  eventHandler.handleClickOnTaskEditButton);

    // targeting title edition input
    let titleEditionInput = task.querySelector('.task__name-edit');
    titleEditionInput.addEventListener('blur', eventHandler.handleBlurOnTitleInput);
    titleEditionInput.addEventListener('keyup', eventHandler.handleKeyupOnTitleInput);

    //targeting finish task button
    let finishTaskButton = task.querySelector('.task__button--validate');
    console.log(finishTaskButton);
    finishTaskButton.addEventListener('click', eventHandler.handleClickOnFinishTaskButton);

  },

  displayTasks: function(tasksFromAPI) {
    console.log('%c' + 'task.displayTasks', 'color: #0bf; font-size: 1rem; background-color:#fff');
    console.log(tasksFromAPI);
    // storing tasks loaded from api in the task.tasks property

    task.tasks = tasksFromAPI;

    for(let taskObject of task.tasks) {

      let newTask = task.createNewTaskElement(
        taskObject.title,
        taskObject.category.name
      );
      
      // add right completion level to the task element, and select the right status
      task.decorateTask(newTask, taskObject);
    }
  },

  decorateTask: function(taskElement, taskObject) {

    taskElement.dataset.id = taskObject.id;

    // task completion handling
    let progressBar = taskElement.querySelector('.progress-bar__level');
    progressBar.style.width = taskObject.completion + '%';

    // task status handling
    // status == 2 : task completed
    console.log(taskObject.status);

    if(taskObject.status == 2) {
      console.log(taskObject);
      // removing todo css class
      taskElement.classList.replace('task--todo', 'task--complete');
    }



  },

  createNewTaskElement: function(title, category) {
    // targeting the template for new task creation
    let template = document.querySelector('#new-task');
    //console.log(template);

    // create a new copy of the template which will be used for creation of the new task element
    let newTaskTemplate = template.content.cloneNode(true);
    // console.log(newTaskTemplate);

    // targeting thnewTaskElemente div which will be used for task element creation
    let newTaskElement = newTaskTemplate.querySelector('.task');
    
    console.log(newTaskElement);

    // updating the new task element with the correct values
    let titleInput = newTaskElement.querySelector('.task__name-edit');
    let titleElement = newTaskElement.querySelector('.task__name-display');
    let categoryElement = newTaskElement.querySelector('.task__category p');

    newTaskElement.dataset.category = category;
    //newTaskElement.dataset.toto = 'truc';


    titleInput.value = title;
    titleElement.textContent = title;    
    categoryElement.textContent = category;

    // inject the new at the beginning of the task list
    document.querySelector('.tasks').prepend(newTaskElement);  
    
    // making the new task interactive
    task.makeInteractive(newTaskElement);

    return newTaskElement;

  }
};