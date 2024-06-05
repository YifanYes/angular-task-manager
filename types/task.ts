export const enum TaskStatus {
  toDo = 'TO DO',
  inProgress = 'IN PROGRESS',
  done = 'DONE',
}

export type TaskType = {
  id: string
  title: string
  description?: string | null
  status: TaskStatus
}
