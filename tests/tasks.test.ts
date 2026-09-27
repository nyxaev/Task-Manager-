import { describe, it, expect, beforeEach } from "vitest";
import request from "supertest";
import { createApp } from "../src/app";
import { resetTasks } from "../src/data";

const app = createApp();

describe("Task API", () => {
  beforeEach(() => {
    resetTasks();
  });

  it("retorna lista vazia quando não há tarefas", async () => {
    const res = await request(app).get("/tasks");
    expect(res.status).toBe(200);
    expect(res.body).toEqual([]);
  });

  it("cria uma nova tarefa", async () => {
    const res = await request(app).post("/tasks").send({ title: "Estudar TypeScript" });
    expect(res.status).toBe(201);
    expect(res.body).toMatchObject({ title: "Estudar TypeScript", completed: false });
    expect(res.body.id).toBeDefined();
  });

  it("rejeita criação sem título", async () => {
    const res = await request(app).post("/tasks").send({});
    expect(res.status).toBe(400);
  });

  it("busca uma tarefa por id", async () => {
    const created = await request(app).post("/tasks").send({ title: "Ler um livro" });
    const res = await request(app).get(`/tasks/${created.body.id}`);
    expect(res.status).toBe(200);
    expect(res.body.title).toBe("Ler um livro");
  });

  it("retorna 404 ao buscar tarefa inexistente", async () => {
    const res = await request(app).get("/tasks/id-que-nao-existe");
    expect(res.status).toBe(404);
  });

  it("atualiza uma tarefa existente", async () => {
    const created = await request(app).post("/tasks").send({ title: "Tarefa original" });
    const res = await request(app)
      .put(`/tasks/${created.body.id}`)
      .send({ completed: true });
    expect(res.status).toBe(200);
    expect(res.body.completed).toBe(true);
    expect(res.body.title).toBe("Tarefa original");
  });

  it("remove uma tarefa existente", async () => {
    const created = await request(app).post("/tasks").send({ title: "Tarefa a remover" });
    const del = await request(app).delete(`/tasks/${created.body.id}`);
    expect(del.status).toBe(204);

    const getAfter = await request(app).get(`/tasks/${created.body.id}`);
    expect(getAfter.status).toBe(404);
  });
});
