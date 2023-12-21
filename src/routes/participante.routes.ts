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
import { authentication } from '@/authentication'
import { PrismaClientKnownRequestError } from '@prisma/client/runtime/library'
import { ConflictParticipante } from './errors/conflict'

export const participanteRoutes = new Elysia().group('/participante', (app) =>
  app
    .use(authentication)
    .onBeforeHandle(async ({ getCurrentUser }) => {
      await getCurrentUser()
    })
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
    .get('/', async () => {
      return findAll()
    })
    .get('/:id', async ({ params: { id }, set }) => {
      const participante = await findOne(id)
      if (participante) {
        return participante
      } else {
        set.status = 'Not Found' // Status 404
      }
    })
    .get('/whoami', async ({ set, getCurrentUser }) => {
      const currentUser = await getCurrentUser()
      const participante = await findOne(currentUser.sub)
      if (participante) {
        return participante
      } else {
        set.status = 'Not Found' // Status 404
      }
    })
    .post(
      '/',
      async ({ body, set }) => {
        try {
          const participante = await add(body)
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
    .delete('/:id', async ({ params: { id }, set }) => {
      const deletedParticipante = await remove(id)
      if (deletedParticipante) {
        set.status = 'No Content' // Status 200
      } else {
        set.status = 'Not Found' // Status 404
      }
    })
    .put(
      '/:id',
      async ({ params: { id }, body, set }) => {
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
