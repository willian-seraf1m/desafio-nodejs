import { FastifyPluginAsyncZod } from 'fastify-type-provider-zod'
import { db } from '../database/client'
import { courses } from '../database/schema'
import z from 'zod'

export const createCourseRoute: FastifyPluginAsyncZod = async (server) => {
  server.post('/courses', {
    schema: {
      tags: ['courses'],
      summary: 'create course',
      body: z.object({
        title: z.string(),
        description: z.string().optional()
      }),
      response: {
        201: z.object({ courseId: z.uuid() })
      }
    }
  }, async (req, res) => {
    const { title, description } = req.body

    const result = await db
      .insert(courses)
      .values({ title, description })
      .returning()

    return res.status(201).send({ courseId: result[0].id })
  })
}