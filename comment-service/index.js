const express = require("express");
const bodyParser = require("body-parser");
const cors = require("cors");
const mongoose = require("mongoose");

const app = express();
app.use(cors());
app.use(bodyParser.json());

mongoose.connect("mongodb://localhost:27017/comments", {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

// Schema: comments tied to task name (not ID)
const CommentSchema = new mongoose.Schema({
  taskName: String,
  content: String,
});

const Comment = mongoose.model("Comment", CommentSchema);

// Get all comments
app.get("/comments", async (req, res) => {
  const comments = await Comment.find();
  res.json(comments);
});

// Get comments for a specific task name
app.get("/comments/:taskName", async (req, res) => {
  const { taskName } = req.params;
  const comments = await Comment.find({ taskName });
  res.json(comments);
});

// Post a comment for a task
app.post("/comments", async (req, res) => {
  const { taskName, content } = req.body;
  const comment = new Comment({ taskName, content });
  await comment.save();
  res.status(201).json(comment);
});

app.listen(3003, () => {
  console.log("Comment Service running on port 3003");
});
