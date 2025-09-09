import fastify from "fastify";
import { fastifySwagger } from '@fastify/swagger'
import ScalarAPIReference from '@scalar/fastify-api-reference'
import { validatorCompiler, serializerCompiler, ZodTypeProvider, jsonSchemaTransform } from "fastify-type-provider-zod"
import { createCourseRoute } from "./routes/create-course";
import { getCoursesRoute } from "./routes/get-courses";
import { getCourseByIdRoute } from "./routes/get-courses-by-id";
import { createUserRoute } from "./routes/create-user";

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
}).withTypeProvider<ZodTypeProvider>()

if (process.env.NODE_ENV === 'development') {
  server.register(fastifySwagger, {
    openapi: {
      info: {
        title: 'desafio nodejs',
        version: '1.0.0'
      },
    },
    transform: jsonSchemaTransform
  })

  server.register(ScalarAPIReference, {
    routePrefix: '/docs',
  })
}

server.setValidatorCompiler(validatorCompiler)
server.setSerializerCompiler(serializerCompiler)

server.register(createUserRoute)
server.register(createCourseRoute)
server.register(getCoursesRoute)
server.register(getCourseByIdRoute)

server.listen({
  port: 3333
}).then(() => {
  console.log('HTTP server running.')
})