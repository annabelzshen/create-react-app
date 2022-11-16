var apikey = 'dc1baa-c1b341-0b12f2-8ccf95-d69f97';

var list = new XMLHttpRequest();
list.onreadystatechange = function () {
  if (this.readyState == 4 && this.status == 200) {
    var responseTexts = this.responseText;
    var todos = JSON.parse(responseTexts);
    for (var index = 0; index < todos.length; index++) {
      console.log(todos[index]);
      render(todos[index]);
    }
  } else if (this.readyState == 4) {
    console.log(responseTexts);
  }
};

list.open('GET', 'https://cse204.work/todos', true);
list.setRequestHeader('x-api-key', apikey);
list.send();

document.getElementById('form').addEventListener('submit', function (event) {
  event.preventDefault();

  var data = {
    text: latestToDo.value,
  };
  var create = new XMLHttpRequest();

  create.onreadystatechange = function () {
    if (this.readyState == 4 && this.status == 200) {
      var responseTexts = this.responseText;
      render(JSON.parse(responseTexts));
    } else if (this.readyState == 4) {
      console.log(responseTexts);
    }
  };
  create.open('POST', 'https://cse204.work/todos', true);
  create.setRequestHeader('Content-type', 'application/json');
  create.setRequestHeader('x-api-key', apikey);
  create.send(JSON.stringify(data));
});

function render(incoming) {
  var todo = document.createElement('article');
  todo.setAttribute('id', incoming.id);
  todo.classList.add('todo');
  if (incoming.completed == true) {
    todo.classList.add('completed');
  }

  var completeButton = document.createElement('button');
  completeButton.classList.add('check');
  todo.appendChild(completeButton);

  var todotext = document.createElement('p');
  todotext.innerText = incoming.text;
  todo.appendChild(todotext);

  var deleteButton = document.createElement('button');
  deleteButton.classList.add('delete');
  deleteButton.innerText = 'DELETE';
  todo.appendChild(deleteButton);

  document.getElementById('todos').appendChild(todo);

  var uncheckButton = document.createElement('button');
  uncheckButton.classList.add('uncheck');
  todo.appendChild(uncheckButton);

  completeButton.addEventListener('click', completeTodo);
  deleteButton.addEventListener('click', deleteTodo);
  uncheckButton.addEventListener('click', editTodo);

  document.getElementById('latestToDo').value = '';
}

function completeTodo(event) {
  var todoIdentification = event.target.parentNode.id;
  var data = {
    completed: true,
  };

  var complete = new XMLHttpRequest();
  complete.onreadystatechange = function () {
    if (this.readyState == 4 && this.status == 200) {
      event.target.parentNode.classList.add('completed');
      var responseTexts = this.responseText;
      console.log(responseTexts);
    } else if (this.readyState == 4) {
      console.log(responseTexts);
    }
  };
  complete.open('PUT', 'https://cse204.work/todos/' + todoIdentification, true);
  complete.setRequestHeader('Content-type', 'application/json');
  complete.setRequestHeader('x-api-key', apikey);
  complete.send(JSON.stringify(data));
}

function deleteTodo(event) {
  var todoIdentification = event.target.parentNode.id;
  var deleteRequest = new XMLHttpRequest();
  deleteRequest.onreadystatechange = function () {
    if (this.readyState == 4 && this.status == 200) {
      //event.target.parentNode.remove();
      var responseTexts = this.responseText;
      var temp = document.getElementById('todos');
      temp.removeChild(event.target.parentNode);
    } else if (this.readyState == 4) {
      console.log(responseTexts);
    }
  };
  deleteRequest.open(
    'DELETE',
    'https://cse204.work/todos/' + todoIdentification,
    true
  );
  deleteRequest.setRequestHeader('Content-type', 'application/json');
  deleteRequest.setRequestHeader('x-api-key', apikey);
  deleteRequest.send();
}

function editTodo(event) {
  var todoIdentification = event.target.parentNode.id;
  var data = {
    completed: false,
  };
  var uncheck = new XMLHttpRequest();
  uncheck.onreadystatechange = function () {
    if (this.readyState == 4 && this.status == 200) {
      event.target.parentNode.classList.add('uncheck');
      var responseTexts = this.responseText;
      console.log(responseTexts);
    } else if (this.readyState == 4) {
      console.log(responseTexts);
    }
  };
  uncheck.open('PUT', 'https://cse204.work/todos/' + todoIdentification, true);
  uncheck.setRequestHeader('Content-type', 'application/json');
  uncheck.setRequestHeader('x-api-key', apikey);
  uncheck.send(JSON.stringify(data));
}
