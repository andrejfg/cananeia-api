import Elysia, { t } from 'elysia'
import { authentication } from '../authentication'
import {
  add,
  carregarFeed,
  findAll,
  findMine,
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
    .get(
      '/my',
      async ({ query, getCurrentUser }) => {
        const user = await getCurrentUser()
        return await findMine(user.sub, query.tipo)
      },
      {
        query: t.Optional(
          t.Object({
            tipo: t.Optional(t.String()),
          }),
        ),
      },
    )
    .get(
      '/feed',
      async ({ query, set }) => {
        const { newer = new Date('2023'), older = new Date('2025') } = query
        try {
          // TODO: CARREGAR FEED
          const feedPublicacoes = await carregarFeed(newer, older)
          return feedPublicacoes
        } catch (error) {
          console.error('Erro ao carregar o feed:', error)
          set.status = 'Internal Server Error'
        }
      },
      {
        query: t.Object({
          newer: t.Optional(t.Date()),
          older: t.Optional(t.Date()),
        }),
      },
    )
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
