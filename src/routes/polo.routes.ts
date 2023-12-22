import { Elysia } from 'elysia'
import { authentication } from '@/authentication'
import { add, findAll, findOne, remove, update } from '@/handlers/polo.handler'
import { AddPoloSchema, UpdatePoloSchema } from '@/dtos/polos'
import { PrismaClientKnownRequestError } from '@prisma/client/runtime/library'
import { ConflictPolo } from './errors'

export const poloRoutes = new Elysia().group('/polo', (app) =>
  app
    .use(authentication)
    .onBeforeHandle(async ({ getCurrentUser }) => {
      await getCurrentUser()
    })
    .error({
      CONFLICT: ConflictPolo,
    })
    .onError(({ code, error, set }) => {
      switch (code) {
        case 'CONFLICT':
          set.status = 'Conflict'
          return { code, message: error.message }
      }
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
      async ({ body, set, isComissao }) => {
        // await isComissao()
        try {
          const polo = await add(body)
          if (polo) {
            set.status = 'Created'
            return polo
          }
        } catch (e) {
          if (e instanceof PrismaClientKnownRequestError)
            throw new ConflictPolo()
        }
      },
      {
        body: AddPoloSchema,
      },
    )
    .delete('/:id', async ({ params: { id }, set, isComissao }) => {
      await isComissao()
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
