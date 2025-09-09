import { FastifyPluginAsyncZod } from 'fastify-type-provider-zod'
import { db } from '../database/client'
import { courses } from '../database/schema'
import z from 'zod'
import { eq } from 'drizzle-orm'

export const getCourseByIdRoute: FastifyPluginAsyncZod = async (server) => {
  server.get('/courses/:id', {
    schema: {
      tags: ['courses'],
      summary: 'get course by ID',
      params: z.object({
        id: z.uuid()
      }),
      response: {
        200: z.object({
          course: z.object({
            id: z.uuid(),
            title: z.string(),
            description: z.string().nullable()
          })
        }),
        404: z.null().describe('course not found')
      }
    }
  }, async (req, res) => {
    const courseId = req.params.id

    const result = await db
      .select()
      .from(courses)
      .where(eq(courses.id, courseId))

    if (result.length > 0) {
      return res.send({ course: result[0] })
    }

    return res.status(404).send()
  })
}