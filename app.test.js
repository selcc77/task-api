const request = require("supertest");
const app = require("./app");

describe("Task API", () => {

    test("GET /tasks returns an array", async () => {
        const response = await request(app)
            .get("/tasks");

        expect(response.statusCode).toBe(200);
        expect(Array.isArray(response.body)).toBe(true);
    });

    test("POST /tasks creates a task", async () => {
        const response = await request(app)
            .post("/tasks")
            .send({ title: "Jest test task" });

        expect(response.statusCode).toBe(201);
        expect(response.body).toHaveProperty("id");
        expect(response.body.title).toBe("Jest test task");
    });

    test("POST /tasks rejects an empty title", async () => {
        const response = await request(app)
            .post("/tasks")
            .send({ title: "" });

        expect(response.statusCode).toBe(400);
        expect(response.body.error).toBe("Title must be a non-empty string");
    });

    test("POST /tasks rejects a non-string title", async () => {
        const response = await request(app)
            .post("/tasks")
            .send({ title: 123 });

        expect(response.statusCode).toBe(400);
        expect(response.body.error).toBe("Title must be a non-empty string");
    });

    test("GET /tasks/:id returns a task", async () => {
        const created = await request(app)
            .post("/tasks")
            .send({ title: "Task for GET test" });

        const id = created.body.id;

        const response = await request(app)
            .get(`/tasks/${id}`);

        expect(response.statusCode).toBe(200);
        expect(response.body.id).toBe(id);
        expect(response.body.title).toBe("Task for GET test");
    });

    test("GET /tasks/:id returns 404 for missing task", async () => {
        const response = await request(app)
            .get("/tasks/999999");

        expect(response.statusCode).toBe(404);
        expect(response.body.error).toBe("Task 999999 not found");
    });

    test("PUT /tasks/:id updates a task", async () => {
        const created = await request(app)
            .post("/tasks")
            .send({ title: "Task before update" });

        const id = created.body.id;

        const response = await request(app)
            .put(`/tasks/${id}`)
            .send({
                title: "Task after update",
                done: true
            });

        expect(response.statusCode).toBe(200);
        expect(response.body.id).toBe(id);
        expect(response.body.title).toBe("Task after update");
        expect(response.body.done).toBe(1);
    });

    test("PUT /tasks/:id rejects non-boolean done", async () => {
        const created = await request(app)
            .post("/tasks")
            .send({ title: "Validation test" });

        const id = created.body.id;

        const response = await request(app)
            .put(`/tasks/${id}`)
            .send({
                title: "Updated",
                done: "yes"
            });

        expect(response.statusCode).toBe(400);
        expect(response.body.error).toBe("Done must be a boolean");
    });

    test("DELETE /tasks/:id deletes a task", async () => {
        const created = await request(app)
            .post("/tasks")
            .send({ title: "Task to delete" });

        const id = created.body.id;

        const response = await request(app)
            .delete(`/tasks/${id}`);

        expect(response.statusCode).toBe(204);

        const check = await request(app)
            .get(`/tasks/${id}`);

        expect(check.statusCode).toBe(404);
    });

});
