import { t, Static } from 'elysia'

export const UpdatePublicacaoSchema = t.Object({
  descricao: t.Optional(t.String()),
  aceito: t.Optional(t.Boolean()),
})

export type UpdatePublicacaoDTO = Static<typeof UpdatePublicacaoSchema>
