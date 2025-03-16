let tasks = {};

document.addEventListener("DOMContentLoaded", function () {
    document.getElementById("task-date").valueAsDate = new Date();
    renderTasks();
});

function addTask() {
    let date = document.getElementById("task-date").value;
    let taskInput = document.getElementById("task-input").value.trim();
    
    if (!date) {
        alert("Please select a date.");
        return;
    }

    if (taskInput === "" || taskInput.length > 100) {
        alert("Please enter a valid task (1-100 characters).");
        return;
    }

    if (!tasks[date]) tasks[date] = [];
    tasks[date].push({ text: taskInput, done: false });

    document.getElementById("task-input").value = "";
    renderTasks();
}

function toggleTaskDone(checkbox, date, index) {
    tasks[date][index].done = checkbox.checked;
    renderTasks();
}

function renderTasks() {
    let selectedDate = document.getElementById("task-date").value;
    let taskList = document.getElementById("task-list");
    let historyList = document.getElementById("task-history");

    taskList.innerHTML = "";
    historyList.innerHTML = "";

    for (let taskDate in tasks) {
        let taskItems = "";
        tasks[taskDate].forEach((task, index) => {
            taskItems += `
                <li class="task-item">
                    <input type="checkbox" 
                           onclick="toggleTaskDone(this, '${taskDate}', ${index})" 
                           ${task.done ? "checked" : ""}>
                    <span>${task.text}</span>
                </li>
            `;
        });

        if (taskDate === selectedDate) {
            taskList.innerHTML = taskItems;
        } else {
            historyList.innerHTML += `<li><strong>${taskDate}</strong>${taskItems}</li>`;
        }
    }
}
