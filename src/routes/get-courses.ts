import { FastifyPluginAsyncZod } from 'fastify-type-provider-zod'
import { db } from '../database/client'
import { courses } from '../database/schema'
import z from 'zod'

export const getCoursesRoute: FastifyPluginAsyncZod = async (server) => {
  server.get('/courses', {
    schema: {
      tags: ['courses'],
      summary: 'get all courses',
      response: {
        200: z.object({
          courses: z.array(
            z.object({
              id: z.uuid(),
              title: z.string(),
              description: z.string().nullable()
            })
          )
        })
      }
    }
  }, async (req, res) => {
    const result = await db.select().from(courses)

    return res.send({ courses: result })
  })
}