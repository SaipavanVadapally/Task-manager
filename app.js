document.addEventListener('DOMContentLoaded', function () {
    const taskForm = document.getElementById('task-form');
    const taskList = document.getElementById('task-list');
    const STORAGE_KEY = 'taskManagerTasks';

    // Retrieve tasks from local storage
    const savedTasks = JSON.parse(localStorage.getItem(STORAGE_KEY)) || [];

    // Load saved tasks into the task list
    savedTasks.forEach(task => addTaskToList(task));

    taskForm.addEventListener('submit', function (event) {
        event.preventDefault();

        // Get task details from the form
        const title = document.getElementById('title').value;
        const description = document.getElementById('description').value;
        const dueDate = document.getElementById('due-date').value;

        // Validate form inputs
        if (!title || !description || !dueDate) {
            alert('Please fill in all fields');
            return;
        }

        // Create task object
        const task = {
            title,
            description,
            dueDate,
            completed: false
        };

        // Add task to the list
        addTaskToList(task);

        // Save tasks to local storage
        saveTasksToLocalStorage();
        
        // Clear the form
        taskForm.reset();
    });

    function addTaskToList(task) {
        // Create a new list item
        const li = document.createElement('li');
        li.innerHTML = `
            <span>${task.title}</span>
            <span>${task.dueDate}</span>
            <button class="delete-btn">Delete</button>
        `;

        // Add completed class if task is completed
        if (task.completed) {
            li.classList.add('completed');
        }

        // Add event listener to delete button
        li.querySelector('.delete-btn').addEventListener('click', function () {
            li.remove();
            saveTasksToLocalStorage();
        });

        // Toggle completed status on click
        li.addEventListener('click', function () {
            task.completed = !task.completed;
            li.classList.toggle('completed', task.completed);
            saveTasksToLocalStorage();
        });

        // Append the list item to the task list
        taskList.appendChild(li);
    }

    function saveTasksToLocalStorage() {
        const tasks = Array.from(taskList.children).map(li => {
            return {
                title: li.querySelector('span:first-child').textContent,
                description: '', // You can add description and other details if needed
                dueDate: li.querySelector('span:nth-child(2)').textContent,
                completed: li.classList.contains('completed')
            };
        });

        // Save tasks to local storage
        localStorage.setItem(STORAGE_KEY, JSON.stringify(tasks));
    }
});
