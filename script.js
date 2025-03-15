let tasks = {};

document.addEventListener("DOMContentLoaded", function () {
    document.getElementById("task-date").valueAsDate = new Date();
    renderTasks();
});

function addTask() {
    let date = document.getElementById("task-date").value;
    let taskInput = document.getElementById("task-input").value.trim();
    
    if (!date || taskInput === "") {
        alert("Please select a date and enter a task.");
        return;
    }

    if (!tasks[date]) tasks[date] = [];
    tasks[date].push({ text: taskInput, done: false });

    document.getElementById("task-input").value = "";
    renderTasks();
}

function toggleTaskOptions(checkbox, date, index) {
    // Remove existing options if any
    let existingOptions = document.querySelector(".task-options");
    if (existingOptions) existingOptions.remove();

    // Create option container
    let optionsDiv = document.createElement("div");
    optionsDiv.className = "task-options";

    // Create ✔ button
    let checkBtn = document.createElement("span");
    checkBtn.textContent = "✔";
    checkBtn.className = "option-btn check-btn";
    checkBtn.onclick = function () {
        updateTaskStatus(date, index, "done");
    };

    // Create ❌ button
    let crossBtn = document.createElement("span");
    crossBtn.textContent = "❌";
    crossBtn.className = "option-btn cross-btn";
    crossBtn.onclick = function () {
        updateTaskStatus(date, index, "cross");
    };

    // Append buttons to optionsDiv
    optionsDiv.appendChild(checkBtn);
    optionsDiv.appendChild(crossBtn);

    // Position the options to the left of the checkbox
    let rect = checkbox.getBoundingClientRect();
    optionsDiv.style.top = `${rect.top + window.scrollY}px`;
    optionsDiv.style.left = `${rect.left - 50}px`; // Move to the left

    // Add to document
    document.body.appendChild(optionsDiv);

    // Close options when clicking outside
    document.addEventListener("click", function removeOptions(event) {
        if (!optionsDiv.contains(event.target) && event.target !== checkbox) {
            optionsDiv.remove();
            document.removeEventListener("click", removeOptions);
        }
    });
}

function updateTaskStatus(date, index, status) {
    tasks[date][index].status = status;
    renderTasks();
    let optionsDiv = document.querySelector(".task-options");
    if (optionsDiv) optionsDiv.remove(); // Remove the pop-up after selection
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
            let statusClass = task.status === "done" ? "task-done" : task.status === "cross" ? "task-cross" : "";
            let checkboxState = task.status ? "checked" : "";
            let symbol = task.status === "done" ? "✔" : task.status === "cross" ? "✘" : "";

            taskItems += `<li class='task-item ${statusClass}'>
                <input type="checkbox" onclick='toggleTaskOptions(this, "${taskDate}", ${index})' ${checkboxState}>
                ${task.text} <span class="task-symbol">${symbol}</span>
            </li>`;
        });

        if (taskDate === selectedDate) {
            taskList.innerHTML = taskItems;
        } else {
            historyList.innerHTML += `<li><strong>${taskDate}</strong>${taskItems}</li>`;
        }
    }
}
