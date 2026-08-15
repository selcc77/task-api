const express = require("express");
const swaggerUi = require("swagger-ui-express");
const swaggerDocument = require("./openapi.json");
const taskRepository = require("./taskRepository");
const app = express();

app.use(express.json());

/* ---------------- GET ALL TASKS ---------------- */

app.get("/tasks", async (req, res) => {
    const tasks = await taskRepository.getAllTasks();
    res.json(tasks);
});

/* ---------------- GET ONE TASK switching it to postegrosql---------------- */

app.get("/tasks/:id", async (req, res) => {
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

    if (!title) {
        return res.status(400).json({
            error: "Title is required"
        });
    }

    const newTask = await taskRepository.createTask(title);

    res.status(201).json(newTask);
});


app.put("/tasks/:id", async (req, res) => {
    const id = Number(req.params.id);
    const { title, done } = req.body;

    if (!title) {
        return res.status(400).json({
            error: "Title is required"
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


app.delete("/tasks/:id", async (req, res) => {
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


const PORT = 3000;

app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
});