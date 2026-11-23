
const taskInput = document.getElementById('taskInput');
const taskList = document.getElementById('taskList');

function getTasks() {
    return JSON.parse(localStorage.getItem('tasks')) || [];
}

function loadTasks() {
    const tasks = getTasks();

    // Добавляем ID старым задачам, если их нет
    tasks.forEach(task => {
        if (!task.id) {
            task.id = crypto.randomUUID();
        }
    });

    saveTasks(tasks);
    renderTasks(tasks);
}

function addTask() {
    const taskText = taskInput.value.trim();

    if (!taskText) {
        alert('Введите задачу!');
        return;
    }

    const task = {
        id: crypto.randomUUID(),
        text: taskText,
        completed: false
    };

    const tasks = getTasks();
    tasks.push(task);

    saveTasks(tasks);
    renderTasks(tasks);

    taskInput.value = '';
    taskInput.focus();
}

function renderTasks(tasks) {
    taskList.innerHTML = '';

    tasks.forEach(task => {
        const li = document.createElement('li');
        li.className = 'task-item';
        li.dataset.id = task.id;

        if (task.completed) {
            li.classList.add('completed');
        }

        const text = document.createElement('span');
        text.textContent = task.text;

        const completeButton = document.createElement('button');
        completeButton.textContent = task.completed ? 'Undo' : 'Complete';
        completeButton.className = 'complete-btn';
        completeButton.onclick = () => completeTask(task.id);

        const deleteButton = document.createElement('button');
        deleteButton.textContent = 'Delete';
        deleteButton.className = 'delete-btn';
        deleteButton.onclick = () => deleteTask(task.id);

        li.append(text, completeButton, deleteButton);
        taskList.appendChild(li);
    });
}

function completeTask(id) {
    const tasks = getTasks();
    const task = tasks.find(t => t.id === id);

    if (!task) return;

    task.completed = !task.completed;

    saveTasks(tasks);
    renderTasks(tasks);
}

function deleteTask(id) {
    const tasks = getTasks();
    const remainingTasks = tasks.filter(t => t.id !== id);

    saveTasks(remainingTasks);
    renderTasks(remainingTasks);
}

function saveTasks(tasks) {
    localStorage.setItem('tasks', JSON.stringify(tasks));
}

// Добавление нажатием Enter
taskInput.addEventListener('keydown', function(event) {
    if (event.key === 'Enter') {
        addTask();
    }
});

loadTasks();
