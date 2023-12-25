import Elysia from 'elysia'
import { authentication } from '../authentication'
import {
  add,
  findAll,
  findOne,
  remove,
  update,
} from '../handlers/publicacao.handle'
import {
  AddPublicacaoRouteSchema,
  UpdatePublicacaoSchema,
} from '../dtos/publicacao'

export const publicacaoRoutes = new Elysia().group('/publicacao', (app) =>
  app
    .use(authentication)
    .get('/', async () => {
      return await findAll()
    })
    .get('/:id', async ({ params: { id }, set }) => {
      const publicacao = await findOne(id)
      if (publicacao) {
        return publicacao
      } else {
        set.status = 'Not Found' // Status 404
      }
    })
    .post(
      '/',
      async ({ body, set, getCurrentUser }) => {
        const user = await getCurrentUser()
        const publicacao = await add({ ...body, id: user.sub })
        if (publicacao) {
          set.status = 'Created'
          return publicacao
        } else {
          set.status = 'Bad Request'
        }
      },
      {
        body: AddPublicacaoRouteSchema,
      },
    )
    .delete('/:id', async ({ params: { id }, set, getCurrentUser }) => {
      const user = await getCurrentUser()
      const deletedPublicacao = await remove(id, user.sub)
      if (deletedPublicacao) {
        set.status = 'No Content' // Status 200
      } else {
        set.status = 'Not Found' // Status 404
      }
    })
    .put(
      '/:id',
      async ({ params: { id }, body, set, getCurrentUser }) => {
        const user = await getCurrentUser()
        const updatedParticipante = await update(id, user.sub, body)
        if (updatedParticipante) {
          set.status = 'No Content' // Status 200
        } else {
          set.status = 'Not Found' // Status 404
        }
      },
      {
        body: UpdatePublicacaoSchema,
      },
    ),
)
