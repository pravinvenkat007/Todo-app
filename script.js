const taskInput = document.getElementById("taskInput");
const addBtn = document.getElementById("addBtn");
const taskList = document.getElementById("taskList");
const filterButtons =
document.querySelectorAll(".filter-btn");

let tasks =
JSON.parse(localStorage.getItem("tasks")) || [];

let currentFilter = "all";

/* Save Tasks */

function saveTasks() {
localStorage.setItem(
"tasks",
JSON.stringify(tasks)
);
}

/* Render Tasks */

function renderTasks() {

taskList.innerHTML = "";

let filteredTasks = tasks.filter(task => {

if(currentFilter === "active")
return !task.completed;

if(currentFilter === "completed")
return task.completed;

return true;

});

filteredTasks.forEach(task => {

const li = document.createElement("li");

li.dataset.id = task.id;

if(task.completed){
li.classList.add("completed");
}

li.innerHTML = `
<span>${task.text}</span>

<div class="actions">

<button class="complete-btn">
${task.completed ? "Undo" : "Done"}
</button>

<button class="edit-btn">
Edit
</button>

<button class="delete-btn">
Delete
</button>

</div>
`;

taskList.appendChild(li);

});

}

/* Create */

addBtn.addEventListener("click", () => {

const text = taskInput.value.trim();

if(text === "") return;

tasks.push({
id: Date.now(),
text: text,
completed: false
});

saveTasks();
renderTasks();

taskInput.value = "";

});

/* Event Delegation */

taskList.addEventListener("click", (e) => {

const taskId =
Number(
e.target.closest("li")?.dataset.id
);

const task =
tasks.find(t => t.id === taskId);

if(!task) return;

/* Delete */

if(e.target.classList.contains("delete-btn")){

tasks =
tasks.filter(t => t.id !== taskId);

}

/* Complete */

if(e.target.classList.contains("complete-btn")){

task.completed = !task.completed;

}

/* Update */

if(e.target.classList.contains("edit-btn")){

const newText =
prompt(
"Edit Task:",
task.text
);

if(
newText &&
newText.trim() !== ""
){
task.text = newText.trim();
}

}

saveTasks();
renderTasks();

});

/* Filters */

filterButtons.forEach(btn => {

btn.addEventListener("click", () => {

filterButtons.forEach(b =>
b.classList.remove("active")
);

btn.classList.add("active");

currentFilter =
btn.dataset.filter;

renderTasks();

});

});

/* Initial Load */

renderTasks();
