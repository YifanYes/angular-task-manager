export const enum TaskStatus {
  toDo = 'todo',
  inProgress = 'in-progress',
  done = 'done',
}

export type TaskType = {
  id: string
  title: string
  description?: string | null
  status: string
}
