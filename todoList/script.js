const todoInput = document.getElementById('todo-input');
const addButton = document.getElementById('add-button');
const todoList = document.getElementById('todo-list');

function onClickDelete() {
  this.parentNode.remove();
}

function createTodoListItem(inputText) {
  const li = document.createElement('li');
  const h2 = document.createElement('h2');
  h2.textContent = inputText;
  const deleteButton = document.createElement('button');
  deleteButton.textContent = 'X';
  deleteButton.classList.add('delete-button');
  deleteButton.addEventListener('click', onClickDelete);
  li.append(h2);
  li.append(deleteButton);

  return li;
}

function onTypeTodo() {
  addButton.disabled = todoInput.value.length === 0;
}

function onClickAdd() {
  const listItem = createTodoListItem(todoInput.value);
  todoList.append(listItem);
  todoInput.value = '';
  addButton.disabled = true;
}

function init() {
  todoInput.addEventListener('input', onTypeTodo);
  addButton.addEventListener('click', onClickAdd);
}

init();
