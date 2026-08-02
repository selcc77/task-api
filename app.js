const express = require("express");
const swaggerUi = require("swagger-ui-express");
const swaggerDocument = require("./openapi.json");
const db = require("./database");

const app = express();

app.use(express.json());

/* ---------------- GET ALL TASKS ---------------- */

app.get("/tasks", (req, res) => {

    const tasks = db.prepare(
        "SELECT * FROM tasks"
    ).all();

    res.json(tasks);

});

/* ---------------- GET ONE TASK ---------------- */

app.get("/tasks/:id", (req, res) => {

    const id = Number(req.params.id);

    const task = db.prepare(
        "SELECT * FROM tasks WHERE id = ?"
    ).get(id);

    if (!task) {
        return res.status(404).json({
            error: `Task ${id} not found`
        });
    }

    res.json(task);

});


app.post("/tasks", (req, res) => {

    const { title } = req.body;

    if (!title) {
        return res.status(400).json({
            error: "Title is required"
        });
    }

    const result = db.prepare(
        "INSERT INTO tasks (title, done) VALUES (?, ?)"
    ).run(title, 0);

    const newTask = db.prepare(
        "SELECT * FROM tasks WHERE id = ?"
    ).get(result.lastInsertRowid);

    res.status(201).json(newTask);

});


app.put("/tasks/:id", (req, res) => {

    const id = Number(req.params.id);
    const { title, done } = req.body;

    if (!title) {
        return res.status(400).json({
            error: "Title is required"
        });
    }

    const task = db.prepare(
        "SELECT * FROM tasks WHERE id = ?"
    ).get(id);

    if (!task) {
        return res.status(404).json({
            error: `Task ${id} not found`
        });
    }

    db.prepare(
        "UPDATE tasks SET title = ?, done = ? WHERE id = ?"
    ).run(title, done, id);

    const updatedTask = db.prepare(
        "SELECT * FROM tasks WHERE id = ?"
    ).get(id);

    res.json(updatedTask);

});


app.delete("/tasks/:id", (req, res) => {

    const id = Number(req.params.id);

    const task = db.prepare(
        "SELECT * FROM tasks WHERE id = ?"
    ).get(id);

    if (!task) {
        return res.status(404).json({
            error: `Task ${id} not found`
        });
    }

    db.prepare(
        "DELETE FROM tasks WHERE id = ?"
    ).run(id);

    res.status(204).send();

});


app.use(
    "/docs",
    swaggerUi.serve,
    swaggerUi.setup(swaggerDocument)
);


const PORT = 3000;

app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
});