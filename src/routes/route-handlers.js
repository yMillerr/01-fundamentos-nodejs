import { Database } from '../database/Database.js'
import { randomUUID } from 'node:crypto'

const database = new Database()

export const routes = [
  {
    method: 'POST',
    path: '/tasks',
    handler: (req, res) => {
    const { title, description } = req.body

    const task = {
      id: randomUUID(),
      title,
      description
    }

    database.create('tasks', task)
    
    return res.end()
    }
  },
  {
    method: 'GET',
    path: '/tasks',
    handler: (req, res) => {
      const tasks = database.read('tasks')

      return res.end(JSON.stringify(tasks))
    }
  }
]