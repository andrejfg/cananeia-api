import { t, Static } from 'elysia'

export const AddPublicacaoSchema = t.Object({
  image: t.File({ type: 'image', maxSize: '15m' }),
  id: t.String(),
  tipo: t.String(),
  proporcao: t.Optional(t.String()),
  descricao: t.Optional(t.String()),
})

export const AddPublicacaoRouteSchema = t.Object({
  image: t.File({ type: 'image', maxSize: '15m' }),
  tipo: t.String(),
  proporcao: t.Optional(t.String()),
  descricao: t.Optional(t.String()),
})

export type AddPublicacaoDTO = Static<typeof AddPublicacaoSchema>
