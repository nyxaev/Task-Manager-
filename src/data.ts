import { randomUUID } from "node:crypto";
import type { Task, CreateTaskInput, UpdateTaskInput } from "./types";

// Armazenamento em memória. Em um projeto real isso seria um banco de dados,
// mas para fins de demonstração isso mantém o projeto simples e sem dependências externas.
let tasks: Task[] = [];

export function getAllTasks(): Task[] {
  return tasks;
}

export function getTaskById(id: string): Task | undefined {
  return tasks.find((task) => task.id === id);
}

export function createTask(input: CreateTaskInput): Task {
  const task: Task = {
    id: randomUUID(),
    title: input.title,
    completed: false,
    createdAt: new Date().toISOString(),
  };
  tasks.push(task);
  return task;
}

export function updateTask(id: string, input: UpdateTaskInput): Task | undefined {
  const task = getTaskById(id);
  if (!task) return undefined;

  if (input.title !== undefined) task.title = input.title;
  if (input.completed !== undefined) task.completed = input.completed;

  return task;
}

export function deleteTask(id: string): boolean {
  const lengthBefore = tasks.length;
  tasks = tasks.filter((task) => task.id !== id);
  return tasks.length < lengthBefore;
}

// Usado apenas nos testes, para garantir que cada teste comece do zero.
export function resetTasks(): void {
  tasks = [];
}
