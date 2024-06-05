import { Schema, model } from 'mongoose'
import { TaskStatus } from '../../types/task'

const taskSchema = new Schema({
  title: {
    type: String,
    required: [true, 'Title is required'],
    validate: {
      validator: function (value: string) {
        return value && value.trim().length > 0
      },
      message: 'Title cannot be empty',
    },
  },
  description: { type: String, required: false },
  status: {
    type: String,
    default: TaskStatus.toDo,
    enum: [TaskStatus.toDo, TaskStatus.inProgress, TaskStatus.done],
  },
})

export const Task = model('Task', taskSchema)
