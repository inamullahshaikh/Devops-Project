const express = require("express");
const mongoose = require("mongoose");
const bodyParser = require("body-parser");
const cors = require("cors");
const app = express();

app.use(cors());
app.use(bodyParser.json());
mongoose.connect("mongodb://localhost/userdb");

const User = mongoose.model("User", { username: String, password: String });

app.post("/register", async (req, res) => {
  const { username, password } = req.body;
  const user = new User({ username, password });
  await user.save();
  res.send({ message: "User registered" });
});

app.post("/login", async (req, res) => {
  const { username, password } = req.body;
  const user = await User.findOne({ username, password });
  user ? res.send({ success: true }) : res.status(401).send({ success: false });
});

app.listen(3001, () => console.log("User service on port 3001"));
