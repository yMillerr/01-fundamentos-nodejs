import { Database } from '../database/Database.js'
import { randomUUID } from 'node:crypto'
import { buildRoutePath } from '../utils/build-route-path.js'

const database = new Database()

export const routes = [
  {
    method: 'POST',
    path: buildRoutePath('/tasks'),
    handler: (req, res) => {
    const { title, description, completed_at } = req.body

    const task = {
      id: randomUUID(),
      title,
      description,
      completed_at,
      create_at: new Date(),
      updated_at: new Date(),
    }

    database.create('tasks', task)
    
    return res.end()
    }
  },
  {
    method: 'GET',
    path: buildRoutePath('/tasks'),
    handler: (req, res) => {
      const tasks = database.read('tasks')

      return res.end(JSON.stringify(tasks))
    }
  },
  {
    method: 'PUT',
    path: buildRoutePath('/tasks/:id'),
    handler: (req, res) => {
      const { id } = req.params
      const { title, description } = req.body

      const task = database.read('tasks').find(task => task.id === id)

      if (!title || !description) {
        return res.writeHead(400).end()
      }

      const taskUpdated = {
        ...task,
        title,
        description,
        updated_at: new Date(),
      }

      database.update('tasks', id , {
        taskUpdated
      })

      res.end()
    }
  },
  {
    method: 'DELETE',
    path: buildRoutePath('/tasks/:id'),
    handler: (req, res) => {
      const { id } = req.params

      database.delete('tasks', id)

      res.end()
    },
  },
  {
    method: 'PATCH',
    path: buildRoutePath('/tasks/:id/complete'),
    handler: (req, res) => {
      const { id } = req.params

      const task = database.read('tasks').find(task => task.id === id)
      const taskCompleted = {
        ...task,
        completed_at: new Date()
      }

      if(!task) {
        return res.writeHead(500).end()
      }

      database.update('tasks', id ,taskCompleted)

      res.end()
    },
  }
]