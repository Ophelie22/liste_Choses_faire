console.log('%cValue : ' + "eventHanler.js loaded", 'color: #0bf');

let eventHandler = {
  
  // this method is called when a click appens on the title element of a task
  handleClickOnTaskTitle: function(event) {
    console.log('click on title');

    // titleElement is the DOM element which had thrown the event
    let titleElement = event.currentTarget;
    eventHandler.makeTaskTitleEditable(titleElement);
  },

  handleClickOnTaskEditButton: function(event) {
    console.log('click on edit button');
    let editButton = event.currentTarget;     
    eventHandler.makeTaskTitleEditable(editButton);
  },
  
  makeTaskTitleEditable: function(currentTarget) {

    // let select the closest DOM parent node which has the CSS class ".task"
    let taskElement = currentTarget.closest('.task');
    //console.log(taskElement);

    // now we have to add the "task--edit" class to the task element
    //DOC https://developer.mozilla.org/en-US/docs/Web/API/Element/classList
    taskElement.classList.add('task--edit');

    // give the focus to the title edit input
    let inputTaskTitle = taskElement.querySelector(".task__name-edit");
    console.log(inputTaskTitle);
    inputTaskTitle.focus();
  },

  //=========================================================

  handleBlurOnTitleInput: function(event) {
    // the input which has thrown the event
    let input = event.currentTarget;
    eventHandler.updateTaskTitle(input);
  },

  handleKeyupOnTitleInput: function(event) {
    let input = event.currentTarget;
    console.log('%cCall : handleKeyupOnTitleInput'  , 'color: #0bf');
    console.log(event);

    
    // console.log(event.key);
    // if the released key is "Enter" ; then title update validation
    if(event.key === 'Enter') {
      eventHandler.updateTaskTitle(input);
    }
  },

  handlekeyUpOnNewTaskTitle: function(event) {
    //retrieve the input
    let input = event.currentTarget;
    //save the title each time we press a key
    // DOC https://developer.mozilla.org/en-US/docs/Web/API/Window/localStorage
    localStorage.setItem('title', input.value);
    
  },

  updateTaskTitle: function(input) {
    // let's retrive the new title
    let newTitle = input.value;

    let taskElement = input.closest('.task');
    // retrieve task id
    let taskId = taskElement.dataset.id;

    // save the the title with an api call
    apiClient.updateTaskTitle(taskId, newTitle);

    //console.log(taskElement);
    taskElement.classList.remove('task--edit');

    let titleElement = taskElement.querySelector('.task__name-display');
    titleElement.textContent = newTitle;
  },

  handleClickOnFinishTaskButton: function(event) {
    let button = event.currentTarget;
    //console.log(button);

    // targeting "Task" parent DOM element
    let taskElement = button.closest('.task');
    //console.log(taskElement);
    let taskId = taskElement.dataset.id;
    apiClient.setTaskComplete(taskId);

    // adding css class for "complete task status"
    taskElement.classList.add('task--complete');

    // dont forget to remove the "task--todo" class (the task is complete)
    taskElement.classList.remove('task--todo');

    // handling task progression bar ; set it to 100%
    let progressBar = taskElement.querySelector('.progress-bar__level');
    console.log(progressBar);
    progressBar.style.width = '100%';
  },

  handleCreateTaskFormSubmit: function(event) {
    console.log('%c' + 'handleCreateTaskFormSubmit', 'color: #0bf; font-size: 1rem; background-color:#fff');
    // avoiding the default behaviour
    event.preventDefault();

    // retrieve the creation form element
    let form = event.currentTarget;

    // targeting the input which contains the new task name
    let input = form.querySelector('.task__name-edit');
    //console.log(input);

    let categorySelect = form.querySelector('.task__category select');
    //console.log(categorySelect);

    let newTaskTitle = input.value;
    
    // let newTaskCategory = categorySelect.value;

    // retrieve category name by category id
    let categoryId = categorySelect.value;
    let categoryObject = category.getCategoryById(categoryId);
    console.log(categoryObject);
    let newTaskCategory = categoryObject.name;

    // send data to the api
    let fetch = apiClient.saveNewTask(newTaskTitle, categoryId);
    
    // add new function to call stack (on rajoute un wagon)
    fetch.then(function(taskData) {
      console.log('%c' + 'Dans evenHandler.js', 'color: #b0f; font-size: 1rem; background-color:#fff');
      console.log(taskData);

      // Insert the new task in DOM when the api return data
      // calling the method which handle the creation element of a new task
      let domTaskElement = task.createNewTaskElement(newTaskTitle, newTaskCategory);

      // add the data-id into the new task element ; this attribute is required for task update
      //domTaskElement.dataset.id = taskData.id;
      //same as
      task.decorateTask(domTaskElement, taskData);
    });



  }
}
