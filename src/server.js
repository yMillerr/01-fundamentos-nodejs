import http from 'node:http'

import { requestBody } from './middlewares/request-body.js';
import { routes } from './routes/route-handlers.js';

const server = http.createServer(async (req, res) => {
  const { method, url } = req;

  await requestBody(req, res)

  const route = routes.find(route => route.method === method 
    && route.path === url
  )

  if (route) {
    return route.handler(req, res)
  }
  
  res.end();
})

server.listen(3333)