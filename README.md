# Task API with PostgreSQL

A simple RESTful Task Management API built with **Node.js**, **Express**, and **PostgreSQL**. This project demonstrates full CRUD (Create, Read, Update, Delete) operations with persistent data storage in a PostgreSQL database running inside Docker.

## Features

- View all tasks
- View a single task by ID
- Create a new task
- Update an existing task
- Delete a task
- Persistent data storage using PostgreSQL
- PostgreSQL running in Docke
- Database connection using `pg`
- Environment-based database configuration
- Interactive API documentation with Swagger

## Technologies Used

- Node.js
- Express.js
- PostgreSQL
- Docker
- `pg` (node-postgres)
- dotenv
- Swagger UI

## Project Structure

```text
task-api/
│
├── app.js
├── database.js
├── taskRepository.js
├── schema.sql
├── openapi.json
├── package.json
├── package-lock.json
├── .env.example
├── .gitignore
└── README.md