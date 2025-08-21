const express = require("express");
const bodyParser = require("body-parser");
const app = express();

app.set("view engine", "ejs");
app.use(express.static("public"));
app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.json());

let todos = [];

// Home page
app.get("/", (req, res) => {
  res.render("list", { todos });
});

// Add todo
app.post("/", (req, res) => {
  const { element, priority } = req.body;
  if (element && element.trim()) {
    todos.push({ text: element.trim(), priority: priority || "medium" });
  }
  res.redirect("/");
});

// Edit todo
app.put("/edit/:id", (req, res) => {
  const id = parseInt(req.params.id, 10);
  if (todos[id] && req.body.text && req.body.text.trim()) {
    todos[id].text = req.body.text.trim();
    res.sendStatus(200);
  } else {
    res.sendStatus(400);
  }
});

// Delete todo
app.delete("/delete/:id", (req, res) => {
  const id = parseInt(req.params.id, 10);
  if (todos[id]) {
    todos.splice(id, 1);
    res.sendStatus(200);
  } else {
    res.sendStatus(400);
  }
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log("Server running on port", PORT);
});