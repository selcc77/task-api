# Task API

A simple RESTful CRUD API built with Node.js and Express.

## Features

- Get all tasks
- Get a task by ID
- Create a new task
- Update a task
- Delete a task
- Swagger API documentation

## Installation

```bash
git clone https://github.com/selcc77/task-api.git

cd task-api

npm install

node app.js
```

The server runs on:

```
http://localhost:3000
```

Swagger UI:

```
http://localhost:3000/docs
```

## API Endpoints

| Method | Endpoint | Description |
|---------|----------|-------------|
| GET | /tasks | Get all tasks |
| GET | /tasks/:id | Get one task |
| POST | /tasks | Create a task |
| PUT | /tasks/:id | Update a task |
| DELETE | /tasks/:id | Delete a task |

## Example Request

```bash
curl -i http://localhost:3000/tasks
```

Example response:

```http
HTTP/1.1 200 OK

[
  {
    "id": 1,
    "title": "Study Node.js",
    "done": false
  }
]
```

## Technologies Used

- Node.js
- Express.js
- Swagger UI Express
- OpenAPI 3.0