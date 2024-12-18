function addEvents() {
  document.getElementById('addBtn').addEventListener('click', addButtonEvent);
  document
    .getElementById('delAllBtn')
    .addEventListener('click', deleteAllButtonEvent);
  document
    .getElementById('allBtn')
    .addEventListener('click', showAllButtonEvent);
  document
    .getElementById('pendingBtn')
    .addEventListener('click', showPendingButtonEvent);
  document
    .getElementById('completedBtn')
    .addEventListener('click', showCompletedButtonEvent);

  document
    .getElementById('editBtn')
    .addEventListener('click', applyEditHandler);

  showTodos();
}

let todos = JSON.parse(localStorage.getItem('todos')) || [];

function saveToLocalStorage() {
  localStorage.setItem('todos', JSON.stringify(todos));
}

function addButtonEvent() {
  const todoName = document.getElementById('todoNameInput');
  const todoDate = document.getElementById('todoDateInput');
  const todo = {
    id: generateId(),
    completed: false,
    taskName: todoName.value,
    taskDate: todoDate.value,
  };

  if (todoName.value) {
    todos.push(todo);
    saveToLocalStorage();
    console.log(todos);
    showAlert('Task added successfully!', 'success');
    showTodos();
  } else {
    showAlert('Please provide a task name!', 'error');
  }

  todoName.value = '';
  todoDate.value = '';
}

const todosBody = document.querySelector('tbody');
function showTodos(data) {
  let todosList = data || todos;
  todosBody.innerHTML = '';

  if (!todosList.length) {
    todosBody.innerHTML = '<tr><td colspan="4">No task found!</td></tr>';
    return;
  }

  todosList.forEach((todo) => {
    todosBody.innerHTML += `
      <tr>
        <td>${todo.taskName}</td>
        <td>${todo.taskDate || 'No Date'}</td>
        <td>${todo.completed ? 'Completed' : 'Pending'}</td>
        <td>
        <button class="yellow-btn" onclick="editHandler('${
          todo.id
        }')">Edit</button>
          <button class="green-btn" onclick="toggleHandler('${todo.id}');">
            ${todo.completed ? 'Undo' : 'Do'}
          </button>
          
          <button class="red-btn" onclick="deleteHandler('${
            todo.id
          }');">Delete</button>
          </td>
      </tr>
    `;
  });
}

function deleteHandler(todoId) {
  const newTodos = todos.filter((todo) => todo.id !== todoId);
  todos = newTodos;
  saveToLocalStorage();
  showTodos();
  showAlert('Task deleted successfully!', 'success');
}

function deleteAllButtonEvent() {
  if (!todos.length) {
    showAlert('There is no task to delete!', 'error');
    return;
  }
  todos = [];
  saveToLocalStorage();
  showTodos();
  showAlert('All Tasks cleared successfully!', 'success');
}

function toggleHandler(todoId) {
  const todo = todos.find((todo) => todo.id === todoId);
  todo.completed = !todo.completed;
  saveToLocalStorage();
  showTodos();
  showAlert('Task Was Updated!', 'success');
}

function editHandler(todoId) {
  const todo = todos.find((todo) => todo.id === todoId);
  document.getElementById('todoNameInput').value = todo.taskName;
  document.getElementById('todoDateInput').value = todo.taskDate;
  document.getElementById('addBtn').style.display = 'none';
  document.getElementById('editBtn').style.display = 'inline-block';
  document.getElementById('editBtn').dataset.id = todoId;
}

function applyEditHandler(event) {
  const id = event.target.dataset.id;
  const todo = todos.find((todo) => todo.id === id);
  const todoName = document.getElementById('todoNameInput');
  const todoDate = document.getElementById('todoDateInput');
  todo.taskName = todoName.value;
  todo.taskDate = todoDate.value;
  document.getElementById('addBtn').style.display = 'inline-block';
  document.getElementById('editBtn').style.display = 'none';
  todoName.value = '';
  todoDate.value = '';
  saveToLocalStorage();
  showTodos();
  showAlert('Task edited successfully!', 'success');
}

function showAllButtonEvent() {
  showTodos(todos);
}

function showPendingButtonEvent() {
  const filtered = todos.filter((todo) => !todo.completed);
  showTodos(filtered);
}

function showCompletedButtonEvent() {
  const filtered = todos.filter((todo) => todo.completed);
  showTodos(filtered);
}

function showAlert(message, type) {
  const alertDiv = document.getElementById('alertMessage');
  alertDiv.innerHTML = '';
  const alert = document.createElement('p');
  alert.innerText = message;
  alert.classList.add('alert');
  alert.classList.add(`alert-${type}`);
  alertDiv.append(alert);

  setTimeout(() => {
    alert.style.display = 'none';
  }, 3_000);
}

function generateId() {
  return Math.round(
    Math.random() * Math.random() * Math.pow(10, 15)
  ).toString();
}

window.addEventListener('load', addEvents);
