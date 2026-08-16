# Task API

A RESTful Task Management API built with **Node.js**, **Express**, and **PostgreSQL**. The project implements full CRUD operations, input validation, Swagger documentation, Dockerized PostgreSQL, and automated API testing with Jest and Supertest.

## Features

- Get all tasks
- Get a task by ID
- Create a task
- Update a task
- Delete a task
- Input validation
- PostgreSQL database
- PostgreSQL running in Docker
- Swagger API documentation
- Automated API tests with Jest and Supertest
- Environment-based database configuration

## Technologies

- Node.js
- Express.js
- PostgreSQL
- Docker
- `pg`
- Jest
- Supertest
- Swagger UI
- Git & GitHub

## Project Structure

```text
task-api/
│
├── app.js
├── database.js
├── taskRepository.js
├── schema.sql
├── test-db.js
├── app.test.js
├── openapi.json
├── .env.example
├── package.json
├── package-lock.json
└── README.md