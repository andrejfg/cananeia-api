import Elysia, { t } from 'elysia'
import { authentication } from '../authentication'
import { update } from '../handlers/participante.handler'

export const adminRoutes = new Elysia().use(authentication).put(
  '/comissao/:id',
  async ({ set, params, body, isComissao }) => {
    await isComissao()
    // console.log('foi')
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
