
let taskList = document.getElementById("taskList");
let taskInput = document.getElementById("taskInput");

window.onload = loadTasks;

function addTask() {
  let taskText = taskInput.value.trim();

  if (taskText === "") {
    alert("Task cannot be empty");
    return;
  }

  let time = getCurrentTime();

  createTask(taskText, time);
  saveTask(taskText, time);

  taskInput.value = "";
}

function createTask(task, time) {
  let li = document.createElement("li");

  li.innerHTML = `
    <div>
      <span onclick="toggleTask(this)">${task}</span>
      <div class="time">${time}</div>
    </div>
    <button onclick="deleteTask(this)">❌</button>
  `;

  taskList.appendChild(li);
}

function toggleTask(element) {
  element.classList.toggle("completed");
}

function deleteTask(button) {
  let li = button.parentElement;
  let taskText = li.querySelector("span").innerText;

  removeTask(taskText);
  li.remove();
}

function getCurrentTime() {
  let now = new Date();

  let date = now.toLocaleDateString("en-IN", {
    day: "2-digit",
    month: "short",
    year: "numeric"
  });

  let time = now.toLocaleTimeString("en-IN", {
    hour: "2-digit",
    minute: "2-digit",
    hour12: true
  });

  return `${date} • ${time}`;
}

function saveTask(task, time) {
  let tasks = JSON.parse(localStorage.getItem("tasks")) || [];

  tasks.push({
    text: task,
    createdAt: time
  });

  localStorage.setItem("tasks", JSON.stringify(tasks));
}

function loadTasks() {
  let tasks = JSON.parse(localStorage.getItem("tasks")) || [];

  tasks.forEach(task => {
    createTask(task.text, task.createdAt);
  });
}

function removeTask(taskText) {
  let tasks = JSON.parse(localStorage.getItem("tasks")) || [];

  tasks = tasks.filter(task => task.text !== taskText);

  localStorage.setItem("tasks", JSON.stringify(tasks));
}


taskInput.addEventListener("keydown", function (event) {
  if (event.key === "Enter") {
    addTask();
  }
});

document.addEventListener("keydown", function (event) {
  if (event.key === "ArrowUp") {
    taskInput.focus();
  }
});


let modeBtn = document.getElementById("modeBtn");

window.addEventListener("load", function () {
  let savedMode = localStorage.getItem("mode");

  if (savedMode === "dark") {
    document.body.classList.add("dark");
    modeBtn.innerText = "☀️ Light Mode";
  }
});

modeBtn.addEventListener("click", function () {
  document.body.classList.toggle("dark");

  if (document.body.classList.contains("dark")) {
    localStorage.setItem("mode", "dark");
    modeBtn.innerText = "☀️ Light Mode";
  } else {
    localStorage.setItem("mode", "light");
    modeBtn.innerText = "🌙 Dark Mode";
  }
});

