import express, { type Request, type Response } from "express";
import { tasksRouter } from "./routes/tasks";

export function createApp() {
  const app = express();

  app.use(express.json());

  app.get("/", (_req: Request, res: Response) => {
    res.json({ message: "Task API está no ar. Veja /tasks para gerenciar tarefas." });
  });

  app.use("/tasks", tasksRouter);

  // 404 para qualquer rota não mapeada
  app.use((_req: Request, res: Response) => {
    res.status(404).json({ error: "Rota não encontrada" });
  });

  return app;
}
