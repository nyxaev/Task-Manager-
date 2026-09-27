import { Router, type Request, type Response } from "express";
import {
  getAllTasks,
  getTaskById,
  createTask,
  updateTask,
  deleteTask,
} from "../data";

export const tasksRouter = Router();

// GET /tasks - lista todas as tarefas
tasksRouter.get("/", (_req: Request, res: Response) => {
  res.json(getAllTasks());
});

// GET /tasks/:id - busca uma tarefa específica
tasksRouter.get("/:id", (req: Request, res: Response) => {
  const task = getTaskById(req.params.id);
  if (!task) {
    return res.status(404).json({ error: "Tarefa não encontrada" });
  }
  res.json(task);
});

// POST /tasks - cria uma nova tarefa
tasksRouter.post("/", (req: Request, res: Response) => {
  const { title } = req.body ?? {};

  if (typeof title !== "string" || title.trim().length === 0) {
    return res.status(400).json({ error: "O campo 'title' é obrigatório e deve ser texto" });
  }

  const task = createTask({ title: title.trim() });
  res.status(201).json(task);
});

// PUT /tasks/:id - atualiza uma tarefa existente
tasksRouter.put("/:id", (req: Request, res: Response) => {
  const { title, completed } = req.body ?? {};

  if (title !== undefined && (typeof title !== "string" || title.trim().length === 0)) {
    return res.status(400).json({ error: "O campo 'title', se enviado, deve ser texto não vazio" });
  }
  if (completed !== undefined && typeof completed !== "boolean") {
    return res.status(400).json({ error: "O campo 'completed', se enviado, deve ser booleano" });
  }

  const task = updateTask(req.params.id, { title, completed });
  if (!task) {
    return res.status(404).json({ error: "Tarefa não encontrada" });
  }
  res.json(task);
});

// DELETE /tasks/:id - remove uma tarefa
tasksRouter.delete("/:id", (req: Request, res: Response) => {
  const deleted = deleteTask(req.params.id);
  if (!deleted) {
    return res.status(404).json({ error: "Tarefa não encontrada" });
  }
  res.status(204).send();
});
