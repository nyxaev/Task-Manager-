export interface Task {
  id: string;
  title: string;
  completed: boolean;
  createdAt: string;
}

export type CreateTaskInput = {
  title: string;
};

export type UpdateTaskInput = Partial<{
  title: string;
  completed: boolean;
}>;
