import fastify from "fastify";

const server = fastify({
  logger: {
    transport: {
      target: 'pino-pretty',
      options: {
        translateTime: 'HH:MM:ss Z',
        ignore: 'pid,hostname',
      },
    },
  },
})

server.get('/hello', (req, res) => {
  res.send('hello world')
})

server.listen({
  port: 3333
}).then(() => {
  console.log('HTTP server running.')
})