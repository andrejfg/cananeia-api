import { Elysia } from 'elysia'
import { authentication } from '@/authentication'
import { add, findAll, findOne, remove, update } from '@/handlers/polo.handler'
import { AddPoloSchema, UpdatePoloSchema } from '@/dtos/polos'

export const poloRoutes = new Elysia().group('/polo', (app) =>
  app
    .use(authentication)
    .onBeforeHandle(async ({ getCurrentUser }) => {
      await getCurrentUser()
    })
    .get('/', async () => {
      return findAll()
    })
    .get('/:id', async ({ params: { id }, set }) => {
      const polo = await findOne(id)
      if (polo) {
        return polo
      } else {
        set.status = 'Not Found' // Status 404
      }
    })
    .get('/whoami', async ({ set, getCurrentUser }) => {
      const currentUser = await getCurrentUser()
      const polo = await findOne(currentUser.sub)
      if (polo) {
        return polo
      } else {
        set.status = 'Not Found' // Status 404
      }
    })
    .post(
      '/',
      async ({ body, set }) => {
        const polo = await add(body)
        if (polo) {
          set.status = 'Created'
          return polo
        }
      },
      {
        body: AddPoloSchema,
      },
    )
    .delete('/:id', async ({ params: { id }, set }) => {
      const deletedPolo = await remove(id)
      if (deletedPolo) {
        set.status = 'No Content' // Status 200
      } else {
        set.status = 'Not Found' // Status 404
      }
    })
    .put(
      '/:id',
      async ({ params: { id }, body, set }) => {
        const updatedPolo = await update(id, body)
        if (updatedPolo) {
          set.status = 'No Content' // Status 200
        } else {
          set.status = 'Not Found' // Status 404
        }
      },
      {
        body: UpdatePoloSchema,
      },
    ),
)
