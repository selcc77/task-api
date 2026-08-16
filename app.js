require("dotenv").config();

const express = require("express");
const swaggerUi = require("swagger-ui-express");
const swaggerDocument = require("./openapi.json");
const taskRepository = require("./taskRepository");
const { createClient } = require("@supabase/supabase-js");

const app = express();

const supabase = createClient(
    process.env.SUPABASE_URL,
    process.env.SUPABASE_KEY
);

app.use(express.json());

app.use(express.json());
function validateId(req, res, next) {
    const id = Number(req.params.id);

    if (!Number.isInteger(id) || id <= 0) {
        return res.status(400).json({
            error: "Invalid task ID"
        });
    }

    next();
}

/* ---------------- GET ALL TASKS ---------------- */

app.get("/tasks", async (req, res) => {
    const tasks = await taskRepository.getAllTasks();
    res.json(tasks);
});

/* ---------------- GET ONE TASK switching it to postegrosql---------------- */

app.get("/tasks/:id", validateId, async (req, res) => {
    const id = Number(req.params.id);

    const task = await taskRepository.getTaskById(id);

    if (!task) {
        return res.status(404).json({
            error: `Task ${id} not found`
        });
    }

    res.json(task);
});


app.post("/tasks", async (req, res) => {
    const { title } = req.body;

    if (typeof title !== "string" || title.trim() === "") {
    return res.status(400).json({
        error: "Title must be a non-empty string"
    });
}

    const newTask = await taskRepository.createTask(title);

    res.status(201).json(newTask);
});


app.put("/tasks/:id", validateId, async (req, res) => {
    const id = Number(req.params.id);
    const { title, done } = req.body;

    if (typeof title !== "string" || title.trim() === "") {
    return res.status(400).json({
        error: "Title must be a non-empty string"
    });
}

if (typeof done !== "boolean") {
    return res.status(400).json({
        error: "Done must be a boolean"
    });
}

    const updatedTask = await taskRepository.updateTask(id, title, done);

    if (!updatedTask) {
        return res.status(404).json({
            error: `Task ${id} not found`
        });
    }

    res.json(updatedTask);
});


app.delete("/tasks/:id", validateId, async (req, res) => {
    const id = Number(req.params.id);

    const deletedTask = await taskRepository.deleteTask(id);

    if (!deletedTask) {
        return res.status(404).json({
            error: `Task ${id} not found`
        });
    }

    res.status(204).send();
});


app.use(
    "/docs",
    swaggerUi.serve,
    swaggerUi.setup(swaggerDocument)
);

app.use((err, req, res, next) => {
    console.error(err);

    res.status(500).json({
        error: "Internal server error"
    });
});
const PORT = process.env.PORT || 3000;

if (require.main === module) {
    app.listen(PORT, () => {
        console.log(`Server is running on http://localhost:${PORT}`);
        console.log("Connected to Supabase");
    });
}

module.exports = app;