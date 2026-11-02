// This is the localStorage key. Keeping it the same keeps previously saved tasks.
const storageKey = 'cse391-todo-list-tasks';

const taskForm = document.querySelector('#task-form');
const taskInput = document.querySelector('#task-input');
const taskList = document.querySelector('#task-list');

// Load saved tasks from the browser, or start with an empty list.
let tasks = JSON.parse(window.localStorage.getItem(storageKey) || '[]');

// Save the current task list as text in localStorage.
function saveTasks() {
  window.localStorage.setItem(storageKey, JSON.stringify(tasks));
}

// Clear and rebuild the visible list from the tasks array.
function showTasks() {
  taskList.replaceChildren();

  tasks.forEach((task, index) => {
    const listItem = document.createElement('li');
    if (task.completed) listItem.className = 'completed';

    const checkbox = document.createElement('input');
    checkbox.type = 'checkbox';
    checkbox.checked = task.completed;
    checkbox.setAttribute('aria-label', `Mark as complete: ${task.text}`);
    checkbox.addEventListener('change', () => {
      tasks[index].completed = checkbox.checked;
      saveTasks();
      showTasks();
    });

    const taskText = document.createElement('span');
    taskText.textContent = task.text;

    const deleteButton = document.createElement('button');
    deleteButton.type = 'button';
    deleteButton.className = 'delete-button';
    deleteButton.textContent = 'Delete';
    deleteButton.setAttribute('aria-label', `Delete: ${task.text}`);
    deleteButton.addEventListener('click', () => {
      tasks.splice(index, 1);
      saveTasks();
      showTasks();
    });

    listItem.append(checkbox, taskText, deleteButton);
    taskList.append(listItem);
  });
}

// Add a task when the form is submitted.
taskForm.addEventListener('submit', (event) => {
  event.preventDefault();
  const taskText = taskInput.value.trim();

  if (taskText === '') return;

  tasks.push({ text: taskText, completed: false });
  saveTasks();
  showTasks();
  taskInput.value = '';
  taskInput.focus();
});

// Show tasks that were saved during an earlier visit.
showTasks();
