import { t, Static } from 'elysia'

export const UpdatePublicacaoSchema = t.Object({
  descricao: t.String(),
})

export type UpdatePublicacaoDTO = Static<typeof UpdatePublicacaoSchema>
