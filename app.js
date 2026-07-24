const swaggerUi = require("swagger-ui-express");
const swaggerDocument = require("./openapi.json");

const express = require("express");

const app = express();

app.use(express.json());

//creating databases to work with

let tasks = [
    {
        id: 1,
        title: "Study Node.js",
        done: false
    },
    {
        id: 2,
        title: "Go to gym",
        done: true
    },
    {
        id: 3,
        title: "Buy milk",
        done: false
    }
];

app.get("/tasks", (req,res) => {
    res.json(tasks);
});

app.get("/tasks/:id", (req, res) => {

    const id = Number(req.params.id);

    const task = tasks.find(task => task.id === id);

    if (!task) {
        return res.status(404).json({
            error: `Task ${id} not found`
        });
    }

    res.json(task);
});


app.post("/tasks", (req, res) => {

    const title = req.body.title;

    if (!title) {
        return res.status(400).json({
            error: "Title is required"
        });
    }

    const newID = 
        tasks.length > 0
            ? Math.max(...tasks.map(task => task.id)) + 1
            : 1;
    const newTask = {
        id: newId,
        title: title,
        done: false
    };

    tasks.push(newTask);

    res.status(201).json(newTask);

});

app.put("/tasks/:id", (req,res) => {

    //reading id from url
    const id = Number(req.params.id);

    //finding the task
    const task = tasks.find(task => task.id === id);

    if(!task){
        return res.status(404).json({
           error: `Task ${id} not found` 
        });
    }
    
    const { title, done } = req.body;

    if(!title){
        return res.status(400).json({
            error: `Title is required`
        });
    }
    
    task.title = title;
    task.done = done;

    res.json(task);
});
app.delete("/tasks/:id", (req, res) => {

    const id = Number(req.params.id);

    const task = tasks.find(task => task.id === id);

    if (!task) {
        return res.status(404).json({
            error: `Task ${id} not found`
        });
    }

    tasks = tasks.filter(task => task.id !== id);

    res.status(204).send();

});

app.use(
    "/docs",
    swaggerUi.serve,
    swaggerUi.setup(swaggerDocument)
);

app.listen(3000, () => {

    console.log("Server is running on port 3000");
});