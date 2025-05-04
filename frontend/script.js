const USER_API = "http://localhost:3001";
const TASK_API = "http://localhost:3002/tasks";
const COMMENT_API = "http://localhost:3003/comments";

let loggedIn = false;

// REGISTER
function register() {
  const username = document.getElementById("user").value;
  const password = document.getElementById("pass").value;
  fetch(`${USER_API}/register`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ username, password }),
  })
    .then((res) => res.json())
    .then(() => {
      alert("Registered!");
    })
    .catch((err) => console.error(err));
}

// LOGIN
function login() {
  const username = document.getElementById("user").value;
  const password = document.getElementById("pass").value;
  fetch(`${USER_API}/login`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ username, password }),
  })
    .then((res) => {
      if (res.ok) {
        loggedIn = true;
        document.getElementById(
          "auth-status"
        ).textContent = `Logged in as ${username}`;
        loadTasks();
      } else {
        throw new Error("Login failed");
      }
    })
    .catch((err) => {
      loggedIn = false;
      document.getElementById("auth-status").textContent = err.message;
    });
}

// CREATE TASK (requires login)
function createTask() {
  if (!loggedIn) return alert("Please log in first.");
  const name = document.getElementById("task-name").value;
  fetch(TASK_API, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ name }),
  })
    .then((res) => res.json())
    .then(loadTasks)
    .catch(console.error);
}

// LOAD TASKS
function loadTasks() {
  if (!loggedIn) return;
  fetch(TASK_API)
    .then((res) => res.json())
    .then((tasks) => {
      const list = document.getElementById("task-list");
      list.innerHTML = "";
      tasks.forEach((task) => {
        const li = document.createElement("li");
        li.textContent = task.name;
        list.appendChild(li);
      });
    })
    .catch(console.error);
}

// ADD COMMENT
function addComment() {
  if (!loggedIn) return alert("Please log in first.");
  const taskName = document.getElementById("comment-task-name").value;
  const content = document.getElementById("comment-content").value;
  fetch(COMMENT_API, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ taskName, content }),
  })
    .then((res) => res.json())
    .then(() => loadComments(taskName))
    .catch(console.error);
}

// LOAD COMMENTS
function loadComments(taskName) {
  fetch(`${COMMENT_API}/${encodeURIComponent(taskName)}`)
    .then((res) => res.json())
    .then((comments) => {
      const list = document.getElementById("comment-list");
      list.innerHTML = "";
      comments.forEach((c) => {
        const li = document.createElement("li");
        li.textContent = `${c.taskName}: ${c.content}`;
        list.appendChild(li);
      });
    })
    .catch(console.error);
}

// on page load, clear lists
window.onload = () => {
  document.getElementById("auth-status").textContent = "Not logged in";
  document.getElementById("task-list").innerHTML = "";
  document.getElementById("comment-list").innerHTML = "";
};
