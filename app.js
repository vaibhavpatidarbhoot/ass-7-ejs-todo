const express = require("express");
const app = express();
const PORT = process.env.PORT || 3000;

app.set("view engine", "ejs");
app.use(express.urlencoded({ extended: true }));
app.use(express.static("public"));

let tasks = [];

app.get("/", (req, res) => {
    const filter = req.query.priority || "all";
    let filteredTasks = tasks;

    if (filter !== "all") {
        filteredTasks = tasks.filter(task => task.priority === filter);
    }

    res.render("index", { tasks: filteredTasks, currentFilter: filter });
});

app.post("/add", (req, res) => {
    const { title, priority } = req.body;
    if (title.trim() !== "") {
        tasks.push({ id: Date.now(), title, priority, done: false });
    }
    res.redirect("/");
});

app.post("/delete", (req, res) => {
    const id = parseInt(req.body.id);
    tasks = tasks.filter(task => task.id !== id);
    res.redirect("/");
});

app.post("/toggle", (req, res) => {
    const id = parseInt(req.body.id);
    tasks = tasks.map(task => {
        if (task.id === id) task.done = !task.done;
        return task;
    });
    res.redirect("/");
});

app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
});
