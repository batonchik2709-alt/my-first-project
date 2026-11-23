const taskInput = document.getElementById('taskInput');
const taskList = document.getElementById('taskList');

function loadTasks() {
    const tasks = JSON.parse(localStorage.getItem('tasks')) || [];
    tasks.forEach(task => addTaskToDOM(task));
}

function addTask() {
    const taskText = taskInput.value.trim();
    if (taskText) {
        const task = { text: taskText, completed: false };
        addTaskToDOM(task);
        saveTask(task);
        taskInput.value = '';
    }
}

function addTaskToDOM(task) {
    const li = document.createElement('li');
    li.textContent = task.text;
    if (task.completed) {
        li.classList.add('completed');
    }

    const completeButton = document.createElement('button');
    completeButton.textContent = 'Complete';
    completeButton.onclick = () => completeTask(li);

    const deleteButton = document.createElement('button');
    deleteButton.textContent = 'Delete';
    deleteButton.onclick = () => deleteTask(li);

    li.appendChild(completeButton);
    li.appendChild(deleteButton);
    taskList.appendChild(li);
}

function completeTask(li) {
    li.classList.toggle('completed');
    const taskText = li.textContent.split(' ')[0];
    const tasks = JSON.parse(localStorage.getItem('tasks')) || [];
    const task = tasks.find(t => t.text === taskText);
    task.completed = !task.completed;
    saveTask(task);
}

function deleteTask(li) {
    const taskText = li.textContent.split(' ')[0];
    li.remove();
    const tasks = JSON.parse(localStorage.getItem('tasks')) || [];
    const taskIndex = tasks.findIndex(t => t.text === taskText);
    if (taskIndex !== -1) {
        tasks.splice(taskIndex, 1);
        saveTasks(tasks);
    }
}

function saveTask(task) {
    const tasks = JSON.parse(localStorage.getItem('tasks')) || [];
    const taskIndex = tasks.findIndex(t => t.text === task.text);
    if (taskIndex !== -1) {
        tasks[taskIndex] = task;
    } else {
        tasks.push(task);
    }
    saveTasks(tasks);
}

function saveTasks(tasks) {
    localStorage.setItem('tasks', JSON.stringify(tasks));
}

loadTasks();