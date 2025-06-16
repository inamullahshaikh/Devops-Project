const USER_API = "http://13.60.77.122:3001"; // mapped from user-service
const TASK_API = "http://13.60.77.122:3002/tasks"; // mapped from task-service
const COMMENT_API = "http://13.60.77.122:3003/comments"; // mapped from comment-service

let loggedInUser = localStorage.getItem("loggedInUser") || null;

// UTIL
function ui(sel) {
  return document.querySelector(sel);
}

// --- AUTH ---
async function register() {
  const username = ui("#user").value.trim();
  const password = ui("#pass").value;
  if (!username || !password) return alert("Fill both fields");
  await fetch(`${USER_API}/register`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ username, password }),
  });
  alert("Registered successfully");
}

async function login() {
  const username = ui("#user").value.trim();
  const password = ui("#pass").value;
  if (!username || !password) return alert("Fill both fields");
  const res = await fetch(`${USER_API}/login`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ username, password }),
  });

  if (res.ok) {
    loggedInUser = username;
    localStorage.setItem("loggedInUser", username);
    ui(".auth-status").textContent = `Logged in as ${username}`;
    // go to tasks page after login
    window.location.href = "tasks.html";
  } else {
    ui(".auth-status").textContent = "Login failed";
  }
}

// Call this on every page to guard routes
function requireLogin() {
  if (!loggedInUser) {
    alert("Please log in first.");
    window.location.href = "login.html";
    throw new Error("Not logged in");
  }
}

// --- TASKS ---
async function createTask() {
  requireLogin();
  const name = ui("#task-name").value.trim();
  if (!name) return;
  await fetch(TASK_API, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ name }),
  });
  ui("#task-name").value = "";
  loadTasks();
}

// async function loadTasks() {
//   requireLogin();
//   const res = await fetch(TASK_API);
//   const tasks = await res.json();
//   const list = ui("#task-list");
//   list.innerHTML = "";
//   tasks.forEach((t) => {
//     if (t.name != "Sucking Inam's dick") {
//       const li = document.createElement("li");
//       li.textContent = t.name;
//       list.appendChild(li);
//     }
//   });
// }

// --- COMMENTS ---
// --- COMMENTS ---
async function addComment() {
  requireLogin();

  const taskName = ui("#comment-task-name").value.trim();
  const content = ui("#comment-content").value.trim();
  if (!taskName || !content) {
    return alert("Both task name and comment are required.");
  }
  console.log("Hello");
  // 1. Get existing tasks
  let tasks;
  try {
    const res = await fetch(TASK_API);
    tasks = await res.json();
  } catch (err) {
    console.error("Failed to load tasks:", err);
    return alert("Could not verify task existence. Try again later.");
  }

  // 2. Check if the task exists
  const exists = tasks.some((t) => t.name === taskName);
  if (!exists) {
    return alert(`Task "${taskName}" does not exist. Please create it first.`);
  }

  // 3. Only now add the comment
  try {
    await fetch(COMMENT_API, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ taskName, content }),
    });
    ui("#comment-content").value = "";
    loadComments(taskName);
  } catch (err) {
    console.error("Failed to add comment:", err);
    alert("Could not add comment. Try again later.");
  }
}

async function loadComments(taskName) {
  requireLogin();
  const res = await fetch(`${COMMENT_API}/${encodeURIComponent(taskName)}`);
  const comments = await res.json();
  const list = ui("#comment-list");
  list.innerHTML = "";
  comments.forEach((c) => {
    const li = document.createElement("li");
    li.textContent = `${c.taskName}: ${c.content}`;
    list.appendChild(li);
  });
}

// --- PAGE SETUP ---
window.addEventListener("DOMContentLoaded", () => {
  // update auth status on nav/header if present
  const authEl = ui(".auth-status");
  if (authEl) {
    authEl.textContent = loggedInUser
      ? `Logged in as ${loggedInUser}`
      : "Not logged in";
  }

  // auto-load tasks/comments on their pages
  if (document.body.matches("[onload='loadTasks()']")) {
    loadTasks();
  }
});
