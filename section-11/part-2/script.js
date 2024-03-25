(function () {
  const apiUrl = 'https://jsonplaceholder.typicode.com/todos/';
  const limitUrlParam = '?_limit=10';

  const getTodos = () => {
    fetch(apiUrl + limitUrlParam)
      .then((res) => res.json())
      .then((data) => {
        attachTodosToDom(data);
      });
  };

  const attachTodosToDom = (todos) => {
    const todosList = document.querySelector('.task-list');
    todos.forEach((todo) => {
      todosList.appendChild(createTodo(todo));
    });
  };

  const createTodo = (todo) => {
    const li = document.createElement('li');
    const closeBtn = createTodoButton();

    li.setAttribute('data-id', todo.id);
    li.textContent = todo.title;
    if (todo.completed) {
      li.classList.add('done');
      li.style.backgroundColor = 'lightgray';
    }
    li.appendChild(closeBtn);
    return li;
  };

  const createTodoButton = () => {
    const button = document.createElement('button');
    button.innerText = 'X';
    button.style.marginLeft = '10px';
    return button;
  };

  const createNewTodoRequest = (e) => {
    e.preventDefault();

    const inputValue = e.target.firstElementChild.value;

    if (inputValue) {
      const newTodo = {
        title: inputValue,
        completed: false,
      };
      fetch(apiUrl, {
        method: 'POST',
        body: JSON.stringify(newTodo),
        headers: {
          'Content-Type': 'application/json',
          token: 'abc124',
        },
      })
        .then((res) => {
          if (res.ok) {
            console.log('New todo added ok');
            return res.json();
          }
        })
        .then((data) => {
          const arr = [];
          arr.push(data);
          attachTodosToDom(arr);
        });
    }

    e.target.firstElementChild.innerText = '';
  };

  const clickHandler = (e) => {
    if (e.target.tagName === 'LI') {
      setStyles(e.target);
      updateTodoState(e.target.dataset.id, e.target.classList.contains('done'));
    } else if (e.target.tagName === 'BUTTON') {
      deleteTodo(e.target);
    }
  };

  const setStyles = (target) => {
    if (target.classList.contains('done')) {
      target.style.backgroundColor = 'transparent';
      target.classList.remove('done');
    } else {
      target.style.backgroundColor = 'lightgray';
      target.classList.add('done');
    }
  };

  const updateTodoState = (id, completed) => {
    fetch(`${apiUrl}/${id}`, {
      method: 'PUT',
      body: JSON.stringify({ completed }),
      headers: {
        'Content-Type': 'application/json',
      },
    });
  };

  const deleteTodo = (target) => {
    const id = target.dataset.id;

    fetch(`${apiUrl}/${id}`, {
      method: 'DELETE',
    }).then((res) => {
      if (res.ok) {
        target.parentElement.remove();
      }
    });
  };

  const init = () => {
    const mainForm = document.querySelector('#main-form');
    const todosList = document.querySelector('.task-list');

    document.addEventListener('DOMContentLoaded', getTodos);
    mainForm.addEventListener('submit', createNewTodoRequest);
    todosList.addEventListener('click', clickHandler);
  };

  init();
})();
