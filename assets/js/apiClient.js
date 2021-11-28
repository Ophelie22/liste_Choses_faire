let apiClient = {

  // dev api url
  // apiURL: "https://benoclock.github.io/S07-todolist",

  apiURL: "http://localhost:8080",

  init: function() {

  },

  updateTaskTitle: function(taskId, newTitle) {
    let options = apiClient.getOptions('PATCH',{
      title: newTitle
    });

    let endpoint = apiClient.apiURL + '/tasks/' + taskId;

    // send ajax query
    return fetch(endpoint, options)
      .then(apiClient.handleResponse)
      .then(function(data) {
        // we are just debugging de the decoded data
        console.log(data);
      });
  },

  saveNewTask: function(title, categoryId) {
    let options = apiClient.getOptions('POST', {
        "title": title,
        "categoryId": categoryId,
        "completion":0,
        "status": 1
    });

    let endpoint = apiClient.apiURL + '/tasks';
    // sending request
     return fetch(endpoint, options)
      .then(apiClient.handleResponse)
  },

  setTaskComplete: function(taskId) {
    // intitialize options with correct data for task update
    let options = apiClient.getOptions('PATCH', {
      completion: 100,
      status: 2
    });

    let endpoint = apiClient.apiURL + '/tasks/' + taskId;

    return fetch(endpoint, options)  // send data
      .then(apiClient.handleResponse) //decode data
      .then(function(data) {
        console.log(data) // debug data
      })
    ;
  },

  //=========================================================
  // Gestion du chargement des tâches
  //=========================================================
  loadTasks: function() {
    let options = {
      method: "GET",
      mode: "cors",
      cache: "no-cache"
    };

    let endpoint = apiClient.apiURL + '/tasks';

    return fetch(endpoint, options) // first step call the api
      .then(apiClient.handleResponse) // decoding the data

  },

  //=========================================================
  // Gestion du chargement des categories
  //=========================================================
  
  

  loadCategories: function() {
    console.log('%ccategory.loadCategories', 'color: #0bf; font-size: 1rem; background-color:#fff');

    // calling the api to retrieve the categories
    let options = {
      method: "GET",
      mode: "cors",
      cache: "no-cache"
    };

    let endpoint = apiClient.apiURL + '/categories';

    return fetch(endpoint, options) // first step call the api
      .then(apiClient.handleResponse) // decoding the data
    ;
  },


  //=========================================================
  // Méthodes utilitaires
  //=========================================================
  
  // when the fetch will be finished, the handleResponse method will be called with retrieved data argument (response variable)
  handleResponse: function(response) {
    // convert the json data into a javascript object
    return response.json();
  },

  getOptions: function(method, data) {
    return {
      method: method, // *GET, POST, PUT, DELETE, etc.
      mode: 'cors', // no-cors, *cors, same-origin
      cache: 'no-cache', // *default, no-cache, reload, force-cache, only-if-cached
      headers: {
        'Content-Type': 'application/json'
        // 'Content-Type': 'application/x-www-form-urlencoded',
      },
      body: JSON.stringify(data) // body data type must match "Content-Type" header
    };
  }

}