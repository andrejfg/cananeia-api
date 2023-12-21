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

export const participanteRoutes = new Elysia().group('/participante', (app) =>
  app
    .use(authentication)
    .onBeforeHandle(async ({ getCurrentUser }) => {
      await getCurrentUser()
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
    .post(
      '/',
      async ({ body, set }) => {
        const participante = await add(body)
        if (participante) {
          set.status = 'Created'
          return participante
        }
      },
      {
        body: AddParticipanteSchema,
      },
    )
    .delete('/:id', async ({ params: { id }, set }) => {
      const deletedParticipante = await remove(id)
      if (deletedParticipante) {
        set.status = 'OK' // Status 200
        return { message: 'Participante deleted successfully' }
      } else {
        set.status = 'Not Found' // Status 404
      }
    })
    .put(
      '/:id',
      async ({ params: { id }, body, set }) => {
        const updatedParticipante = await update(id, body)
        if (updatedParticipante) {
          set.status = 'OK' // Status 200
          return updatedParticipante
        } else {
          set.status = 'Not Found' // Status 404
        }
      },
      {
        body: UpdateParticipanteSchema,
      },
    ),
)
