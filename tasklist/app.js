const taskForm = document.querySelector('#task-form');
const taskList = document.querySelector('.collection');
const clearTasks = document.querySelector('.clear-tasks');
const filter = document.querySelector('#filter');
const taskInput = document.querySelector('#task');
const errorMessage = document.querySelector('#error-msg');

loadEventlisteners();

function loadEventlisteners() {
    taskForm.addEventListener('submit', addTask);
    taskList.addEventListener('click', removeTask);
    clearTasks.addEventListener('click', removeAllTasks);
    filter.addEventListener('keyup', filterTasks)
    document.addEventListener('DOMContentLoaded', readTasksFromLocalStorage);
}

function addTask(event) {
    if (taskInput.value === '') {
        errorMessage.textContent = 'Please fill in task !'
    } else {
        addTaskToTasks(taskInput.value);
        errorMessage.textContent = '';
        taskInput.value = '';
    }
    event.preventDefault();
}

function addTaskToTasks(task) {
    const taskItem = createTaskItem(task);
    taskList.appendChild(taskItem);
    addTaskToLocalStorage(task)
}

function createTaskItem(task) {
    const taskItem = document.createElement('li');
    taskItem.className = 'collection-item';
    taskItem.appendChild(createTextNode(task));
    taskItem.appendChild(createDeleteLink());
    return taskItem;
}

function addTaskToLocalStorage(task) {
    let tasks = getTasksFromLocalStorage();
    tasks.push(task);
    saveTasksToLocalStorage(tasks);

}

function saveTasksToLocalStorage(tasks) {
    localStorage.setItem('tasks', JSON.stringify(tasks));
}

function createTextNode(text) {
    return document.createTextNode(text);
}

function createDeleteLink() {
    const link = document.createElement('a');
    link.className = 'delete-item secondary-content';
    link.innerHTML = '<i class="fa fa-remove"></i>';
    return link;
}

function removeTask(event) {
    const href = event.target.parentElement;
    const listItem = href.parentElement;
    const task = listItem.textContent;
    if (href.classList.contains('delete-item')) {
        listItem.remove();
    }
    removeTaskFromLocalStorage(task);
}

function removeTaskFromLocalStorage(taskToRemove) {
    let tasks = getTasksFromLocalStorage();
    tasks.forEach(
        function (task, index) {
            if (task === taskToRemove) {
                tasks.splice(index, 1);
            }
        }
    );
    saveTasksToLocalStorage(tasks);
}

function removeAllTasks(event) {
    while (taskList.firstChild) {
        taskList.removeChild(taskList.firstChild);
    }
    removeAllTasksFromLocalStorage();
}

function removeAllTasksFromLocalStorage() {
    localStorage.setItem('tasks', JSON.stringify([]));
}

function filterTasks(event) {
    const filter = event.target.value.toLowerCase();
    document.querySelectorAll('.collection-item').forEach(
        function (task) {
            const text = task.firstChild.textContent.toLowerCase();
            if (text.toLowerCase().indexOf(filter) === -1) {
                task.style.display = 'none';
            } else {
                task.style.display = 'block';
            }
        }
    )
}

function readTasksFromLocalStorage() {
    let tasks = getTasksFromLocalStorage();
    tasks.forEach(
        function(task) {
            addTaskToTasks(task);
        }
    )
}

function getTasksFromLocalStorage() {
    let tasks = JSON.parse(localStorage.getItem('tasks'));
    if (tasks === null) {
        tasks = [];
    }
    return tasks;
}