import http from 'node:http'

import { Database } from './database/Database.js';
import { requestBody } from './middlewares/request-body.js';
const database = new Database()

import { randomUUID } from 'node:crypto'

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
  
  res.end();
})

server.listen(3333)