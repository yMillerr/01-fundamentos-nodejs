import http from 'node:http'

const server = http.createServer((req, res) => {
  res.end(JSON.stringify({
    message: 'Hello world'
  }))
})

server.listen(3333)

