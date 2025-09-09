import { FastifyPluginAsyncZod } from "fastify-type-provider-zod";
import { db } from "../database/client";
import { users } from "../database/schema";
import z from "zod";

export const createUserRoute: FastifyPluginAsyncZod = async (server) => {
  server.post('/users', {
    schema: {
      body: z.object({
        name: z.string(),
        email: z.email()
      })
    }
  }, async (req, res) => {
    const { name, email } = req.body

    await db.insert(users).values({
      name,
      email
    })

    return res.status(201).send()
  })
}