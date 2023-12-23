import { Elysia } from 'elysia'
import { PrismaClientKnownRequestError } from '@prisma/client/runtime/library'
import { ConflictPolo } from './errors'
import { authentication } from '../authentication'
import { AddPoloSchema, UpdatePoloSchema } from '@/http/dtos/polos'
import {
  findAll,
  findOne,
  add,
  remove,
  update,
} from '@/http/handlers/polo.handler'

export const poloRoutes = new Elysia().group('/polo', (app) =>
  app
    .use(authentication)
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
    .get('/', async ({ isComissao }) => {
      await isComissao()
      return findAll()
    })
    .get('/:id', async ({ params: { id }, set, isComissao }) => {
      await isComissao()
      const polo = await findOne(id)
      if (polo) {
        return polo
      } else {
        set.status = 'Not Found' // Status 404
      }
    })
    .post(
      '/',
      async ({ body, set }) => {
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
      async ({ params: { id }, body, set, isComissao }) => {
        await isComissao()
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
