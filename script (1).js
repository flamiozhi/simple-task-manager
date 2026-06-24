// ============================================================
//  Simple Task Manager — script.js
// ============================================================

// ---------- State ----------
let tasks = [
  { id: 1, name: "Learn HTML",       done: false },
  { id: 2, name: "Learn CSS",        done: true  },
  { id: 3, name: "Learn JavaScript", done: false }
];

let nextId  = 4;      // auto-increment ID counter
let filter  = "all";  // "all" | "pending" | "done"

// ---------- DOM References ----------
const taskInput  = document.getElementById("task-input");
const addBtn     = document.getElementById("add-btn");
const taskList   = document.getElementById("task-list");
const statsArea  = document.getElementById("stats-area");
const statTotal  = document.getElementById("stat-total");
const statDone   = document.getElementById("stat-done");
const statRem    = document.getElementById("stat-rem");

// ---------- Helpers ----------

/** Escape HTML to prevent XSS when inserting task names into the DOM */
function escapeHtml(str) {
  return str
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;");
}

/** Return a check-mark character for completed tasks */
function checkIcon(done) {
  return done ? "&#10003;" : "";
}

// ---------- Core Render ----------

/**
 * Render the task list based on the current `tasks` array and active `filter`.
 * Rebuilds the <ul> innerHTML each time — simple and sufficient for this scale.
 */
function renderTasks() {
  // Filter tasks according to the active filter
  const visible = tasks.filter(task => {
    if (filter === "pending") return !task.done;
    if (filter === "done")    return  task.done;
    return true; // "all"
  });

  if (tasks.length === 0) {
    // No tasks at all — show empty state
    taskList.innerHTML = `
      <li class="tm-empty">No tasks yet — add one above to get started.</li>
    `;
    statsArea.style.display = "none";

  } else if (visible.length === 0) {
    // Tasks exist but none match the active filter
    taskList.innerHTML = `
      <li class="tm-empty">No tasks match this filter.</li>
    `;
    statsArea.style.display = "flex";

  } else {
    // Render visible tasks
    taskList.innerHTML = visible.map(task => `
      <li class="task-item${task.done ? " done" : ""}" data-id="${task.id}">

        <!-- Complete / Undo Button -->
        <button
          class="check-btn"
          data-id="${task.id}"
          aria-label="${task.done ? "Mark as pending" : "Mark as complete"}"
          title="${task.done ? "Undo" : "Mark complete"}"
        >${checkIcon(task.done)}</button>

        <!-- Task Name -->
        <span class="task-name">${escapeHtml(task.name)}</span>

        <!-- Delete Button -->
        <button
          class="del-btn"
          data-id="${task.id}"
          aria-label="Delete task"
          title="Delete"
        >&#128465;</button>

      </li>
    `).join("");

    statsArea.style.display = "flex";
  }

  // Update stats counters
  const doneCount = tasks.filter(t => t.done).length;
  statTotal.textContent = tasks.length;
  statDone.textContent  = doneCount;
  statRem.textContent   = tasks.length - doneCount;
}

// ---------- Add Task ----------

/**
 * Read the input field, create a new task object, prepend it to the array,
 * reset the active filter to "all", and re-render.
 */
function addTask() {
  const name = taskInput.value.trim();

  // Ignore empty input
  if (!name) {
    taskInput.focus();
    return;
  }

  // Create task and add to the front of the list
  tasks.unshift({ id: nextId++, name, done: false });

  // Reset input and filter
  taskInput.value = "";
  setFilter("all");

  renderTasks();
  taskInput.focus();
}

// ---------- Toggle Complete ----------

/**
 * Toggle the `done` state of the task with the given ID.
 * @param {number} id
 */
function toggleComplete(id) {
  const task = tasks.find(t => t.id === id);
  if (task) {
    task.done = !task.done;
    renderTasks();
  }
}

// ---------- Delete Task ----------

/**
 * Remove the task with the given ID from the array.
 * @param {number} id
 */
function deleteTask(id) {
  tasks = tasks.filter(t => t.id !== id);
  renderTasks();
}

// ---------- Filter ----------

/**
 * Set the active filter and update the filter button UI.
 * @param {"all"|"pending"|"done"} newFilter
 */
function setFilter(newFilter) {
  filter = newFilter;
  document.querySelectorAll(".filter-btn").forEach(btn => {
    btn.classList.toggle("active", btn.dataset.filter === filter);
  });
}

// ---------- Event Listeners ----------

// Add task on button click
addBtn.addEventListener("click", addTask);

// Add task on Enter key
taskInput.addEventListener("keydown", e => {
  if (e.key === "Enter") addTask();
});

// Delegate clicks on the task list (complete + delete)
taskList.addEventListener("click", e => {
  const checkBtn = e.target.closest(".check-btn");
  const delBtn   = e.target.closest(".del-btn");

  if (checkBtn) toggleComplete(+checkBtn.dataset.id);
  if (delBtn)   deleteTask(+delBtn.dataset.id);
});

// Filter button clicks
document.querySelectorAll(".filter-btn").forEach(btn => {
  btn.addEventListener("click", () => {
    setFilter(btn.dataset.filter);
    renderTasks();
  });
});

// ---------- Initial Render ----------
renderTasks();
