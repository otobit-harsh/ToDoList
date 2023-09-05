const taskInput = document.getElementById("task-input");
const addButton = document.getElementById("add-button");
const taskList = document.getElementById("task-list");
const pendingCount = document.getElementById("pending-count");

// Event listener for adding a new task
addButton.addEventListener("click", addTask);

// Event listener for handling task completion, deletion, and editing
taskList.addEventListener("click", (event) => {
  const target = event.target;
  if (target.classList.contains("delete-button")) {
    deleteTask(target.parentElement);
  } else if (target.classList.contains("edit-button")) {
    editTask(target.parentElement);
  } else if (target.tagName === "INPUT") {
    toggleTaskCompletion(target.parentElement);
  }
});

function addTask() {
  const taskText = taskInput.value.trim();
  if (taskText === "") return;

  const li = document.createElement("li");
  const checkbox = document.createElement("input");
  checkbox.type = "checkbox";
  const taskTextElement = document.createElement("span");
  taskTextElement.textContent = taskText;
  const editButton = document.createElement("button");
  editButton.textContent = "Edit";
  editButton.classList.add("edit-button");
  const deleteButton = document.createElement("button");
  deleteButton.textContent = "Delete";
  deleteButton.classList.add("delete-button");

  li.appendChild(checkbox);
  li.appendChild(taskTextElement);
  li.appendChild(editButton);
  li.appendChild(deleteButton);
  taskList.appendChild(li);

  taskInput.value = "";
  updatePendingCount();
}

function editTask(taskElement) {
  const taskTextElement = taskElement.querySelector("span");
  const newText = prompt("Edit the task:", taskTextElement.textContent);
  if (newText !== null && newText.trim() !== "") {
    taskTextElement.textContent = newText;
  }
}

function toggleTaskCompletion(taskElement) {
  taskElement.classList.toggle("completed");
  updatePendingCount();
}

function deleteTask(taskElement) {
  taskElement.remove();
  updatePendingCount();
}

function updatePendingCount() {
  const completedTasks = document.querySelectorAll(".completed").length;
  const totalTasks = taskList.children.length;
  const pendingTasks = totalTasks - completedTasks;
  pendingCount.textContent = pendingTasks;
}
