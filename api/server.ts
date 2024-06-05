import bodyParser from 'body-parser'
import cors from 'cors'
import 'dotenv/config'
import express from 'express'
import mongoose from 'mongoose'
import TransformerHelper from '../helpers/transformer.helper'
import { Task } from './models/task'
import TaskTransformer from './transformers/task.transformer'

const app = express()
const port = 3000

mongoose
  .connect(process.env.MONGO_URL ?? '')
  .catch((error) => console.error(error))

app.use(cors())
app.use(bodyParser.json())

app.get('/tasks', async (req, res) => {
  const tasks = await Task.find()
  res.status(200).send(TransformerHelper.getCollection(tasks, TaskTransformer))
})

app.post('/tasks', async (req, res, next) => {
  try {
    const { title } = req.body
    if (!title) {
      res.status(401).send({ message: 'Title field is required' })
    }

    const task = new Task(req.body)
    await task.save()

    res.status(201).send(TaskTransformer(task))
  } catch (error) {
    console.error(error)
    next(error)
  }
})

app.put('/tasks/:id', async (req, res, next) => {
  try {
    const task = await Task.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
    })
    if (!task) {
      res.status(404).send({ error: 'Task not found' })
    }

    res.status(200).send(TaskTransformer(task))
  } catch (error) {
    next(error)
  }
})

app.delete('/tasks/:id', async (req, res, next) => {
  try {
    const task = await Task.findByIdAndDelete(req.params.id)

    if (!task) {
      res.status(404).send({ error: 'Task not found' })
    }

    res.status(200).send({ message: 'Task deleted successfully' })
  } catch (error) {
    next(error)
  }
})

app.listen(port, () => {
  console.log(`Server running on http://localhost:${port}`)
})
