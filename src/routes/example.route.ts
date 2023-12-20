import { Elysia } from 'elysia'
import {
  findAll,
  findOne,
  add,
  remove,
  update,
} from '../handlers/example.handler'
import { AddExampleSchema, UpdateExampleSchema } from '../dtos/examples'

export const exampleRoutes = (app: Elysia) => (
  app.get('/example', async () => {
    return await findAll()
  }),
  app.get('/example/:id', async ({ params: { id }, set }) => {
    const example = await findOne(id)
    if (example) {
      return example
    } else {
      set.status = 'Not Found' // Status 404
    }
  }),
  app.post(
    '/example',
    async ({ body, set }) => {
      const example = await add(body)
      if (example) {
        set.status = 'Created'
        return example
      }
    },
    {
      body: AddExampleSchema,
    },
  ),
  app.delete('/example/:id', async ({ params: { id }, set }) => {
    const deletedExample = await remove(id)
    if (deletedExample) {
      set.status = 'OK' // Status 200
      return { message: 'Example deleted successfully' }
    } else {
      set.status = 'Not Found' // Status 404
    }
  }),
  app.put(
    '/example/:id',
    async ({ params: { id }, body, set }) => {
      const updatedExample = await update(id, body)
      if (updatedExample) {
        set.status = 'OK' // Status 200
        return updatedExample
      } else {
        set.status = 'Not Found' // Status 404
      }
    },
    {
      body: UpdateExampleSchema,
    },
  )
)
