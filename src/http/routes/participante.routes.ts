import { Elysia } from 'elysia'
import {
  findAll,
  findOne,
  add,
  remove,
  update,
} from '../handlers/participante.handler'
import {
  AddParticipanteSchema,
  UpdateParticipanteSchema,
} from '../dtos/participantes'
import { PrismaClientKnownRequestError } from '@prisma/client/runtime/library'
import { ConflictParticipante } from './errors'
import { authentication } from '../authentication'

export const participanteRoutes = new Elysia().group('/participante', (app) =>
  app
    .use(authentication)
    .error({
      CONFLICT: ConflictParticipante,
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
      const participante = await findOne(id)
      if (participante) {
        return participante
      } else {
        set.status = 'Not Found' // Status 404
      }
    })
    .post(
      '/',
      async ({ body, set }) => {
        const participante = await add(body)
        try {
          if (participante) {
            set.status = 'Created'
            return participante
          }
        } catch (e) {
          if (e instanceof PrismaClientKnownRequestError)
            throw new ConflictParticipante()
        }
      },
      {
        body: AddParticipanteSchema,
      },
    )
    .delete('/:id', async ({ params: { id }, set, isComissao }) => {
      await isComissao()
      const deletedParticipante = await remove(id)
      if (deletedParticipante) {
        set.status = 'No Content' // Status 200
      } else {
        set.status = 'Not Found' // Status 404
      }
    })
    .put(
      '/:id',
      async ({ params: { id }, body, set, isComissao }) => {
        await isComissao()
        const updatedParticipante = await update(id, body)
        if (updatedParticipante) {
          set.status = 'No Content' // Status 200
        } else {
          set.status = 'Not Found' // Status 404
        }
      },
      {
        body: UpdateParticipanteSchema,
      },
    ),
)
