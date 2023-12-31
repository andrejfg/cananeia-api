import Elysia, { t } from 'elysia'
import { authentication } from '../authentication'
import { update } from '../handlers/participante.handler'
import { aceitarPublicacao } from '../handlers/publicacao.handle'

export const adminRoutes = new Elysia()
  .use(authentication)
  .put(
    '/comissao/:id',
    async ({ set, params, body, isComissao }) => {
      await isComissao()
      const participante = await update(params.id, {
        comissao: body.comissao,
      })
      if (participante) {
        return participante
      } else {
        set.status = 'Not Found'
      }
    },
    {
      body: t.Optional(
        t.Object({
          comissao: t.Boolean({ default: true }),
        }),
      ),
    },
  )
  .put('/aceitar/:id', async ({ params: { id }, set, isComissao }) => {
    await isComissao()
    const publicacao = await aceitarPublicacao(id)
    if (publicacao) {
      return publicacao
    } else {
      set.status = 'Not Found'
    }
  })
