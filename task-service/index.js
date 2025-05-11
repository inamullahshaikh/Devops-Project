// task-service/index.js
const express = require("express");
const bodyParser = require("body-parser");
const cors = require("cors");
const mongoose = require("mongoose");

const app = express();
app.use(cors());
app.use(bodyParser.json());

<<<<<<< HEAD
mongoose.connect("mongodb://localhost:27017/tasks", {
=======
mongoose.connect("mongodb://mongo:27017/tasks", {
>>>>>>> 56852dc (Hello)
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

// === Schema now uses `name` to match your frontend ===
const TaskSchema = new mongoose.Schema({
  name: String,
});
const Task = mongoose.model("Task", TaskSchema);

// GET /tasks → [{ _id, name }, …]
app.get("/tasks", async (req, res) => {
  const tasks = await Task.find();
  res.json(tasks);
});

// POST /tasks { name } → { _id, name }
app.post("/tasks", async (req, res) => {
  const { name } = req.body;
  const task = new Task({ name });
  await task.save();
  res.status(201).json(task);
});

app.listen(3002, () => {
  console.log("Task Service running on port 3002");
});
