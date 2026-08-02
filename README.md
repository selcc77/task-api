# Task API with SQLite

A simple RESTful Task Management API built with **Node.js**, **Express**, and **SQLite**. This project demonstrates full CRUD (Create, Read, Update, Delete) operations while storing data permanently in a SQLite database instead of an in-memory array.

## Features

- View all tasks
- View a single task by ID
- Create a new task
- Update an existing task
- Delete a task
- Persistent data storage using SQLite
- Interactive API documentation with Swagger

## Technologies Used

- Node.js
- Express.js
- SQLite
- better-sqlite3
- Swagger UI

## Project Structure

```
task-api/
│
├── app.js
├── database.js
├── tasks.db
├── openapi.json
├── package.json
├── package-lock.json
├── README.md
└── node_modules/
```

## Installation

Clone the repository:

```bash
git clone https://github.com/selcc77/task-api.git
```

Go into the project folder:

```bash
cd task-api
```

Install dependencies:

```bash
npm install
```

Start the server:

```bash
node app.js
```

The server will run on:

```
http://localhost:3000
```

## API Endpoints

| Method | Endpoint | Description |
|---------|----------|-------------|
| GET | `/tasks` | Get all tasks |
| GET | `/tasks/:id` | Get a task by ID |
| POST | `/tasks` | Create a new task |
| PUT | `/tasks/:id` | Update a task |
| DELETE | `/tasks/:id` | Delete a task |

## Swagger Documentation

Open the API documentation in your browser:

```
http://localhost:3000/docs
```

## SQLite Database

This project uses **SQLite** because it is lightweight, easy to set up, and does not require a separate database server. The database is stored locally in a single file named:

```
tasks.db
```

When the application starts:

- The database is created automatically if it does not exist.
- The `tasks` table is created automatically if it does not exist.
- Three sample tasks are inserted only the first time the application runs.

This allows all task data to persist even after restarting the server.

## Example SQL Query

```sql
SELECT * FROM tasks;
```

This query returns all tasks stored in the database.

## Database Screenshot

Add a screenshot of your SQLite database here after opening `tasks.db` with **DB Browser for SQLite**.

Example:

```
docs/database-screenshot.png
```

*(Replace this section with your actual screenshot.)*

## Example Response

```json
[
  {
    "id": 1,
    "title": "Study Node.js",
    "done": 0
  },
  {
    "id": 2,
    "title": "Go to Gym",
    "done": 1
  }
]
```

## Author

**Selcan Abbasova**