import http from 'node:http'

import { Database } from './database/Database.js';
import { requestBody } from './middlewares/request-body.js';
import { randomUUID } from 'node:crypto'

const database = new Database()

const server = http.createServer(async (req, res) => {
  const { method, url } = req;

  await requestBody(req, res)

  if (method === 'POST' && url === '/tasks') {
    const { title, description } = req.body

    const task = {
      id: randomUUID(),
      title,
      description
    }

    database.create('tasks', task)
    
    return res.end()
  }

  if (method === 'GET' && url === '/tasks') {
    const tasks = database.read('tasks')

    return res.end(JSON.stringify(tasks))
  }
  
  res.end();
})

server.listen(3333)