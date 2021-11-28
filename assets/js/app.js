// it's important to be sure that the file is loaded ; so a debug is a good option
//console.log("app.js loaded");
// app module declaration
let app = {
  init: function() {
    // debug ; init called app.initializeCreateTaskForm();
    console.log('%cCall : ' + 'Init called', 'color: #0bf');
    //category module initialization
    category.init();
    //loading category list
    let fetchObject = category.load();
    /*
      fetchObject = fetch(endpoint, options) // first step call the api
        .then(category.handleResponse) // decoding the data
        .then(category.displaySelectBoxes)
    */
    // when the "the "then call queue" will be executed ; we will call task.init  and task.loadTasks
    fetchObject.then(function() {
      // loading tasks from the api
      task.init();

      task.load();

      //exemple with another then
      /*
        return task.load().then(function(tasks) {
          console.log(tasks);
        });
      */





    }).then(app.initializeCreateTaskForm);
  },

  initializeCreateTaskForm: function() {
    // targeting the create form
    let form = document.querySelector('.task--add form');
    // console.log(form);
    let newTaskInput = form.querySelector('.task__name-edit');
    newTaskInput.addEventListener('keyup', eventHandler.handlekeyUpOnNewTaskTitle)
    // set the new task input value; with value which is stored in the localStorage
    // DOC https://developer.mozilla.org/en-US/docs/Web/API/Window/localStorage
    if(localStorage.getItem('title')) {
      newTaskInput.value = localStorage.getItem('title');
    }
    
    form.addEventListener('submit', eventHandler.handleCreateTaskFormSubmit);
  },
};
// waiting for page load completed ; then all app.init
// DOC https://developer.mozilla.org/en-US/docs/Web/API/Window/DOMContentLoaded_event
document.addEventListener('DOMContentLoaded', app.init);