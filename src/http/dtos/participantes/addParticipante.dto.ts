import { t, Static } from 'elysia'

export const AddParticipanteSchema = t.Object({
  nome: t.String(),
  usuario: t.String(),
  senha: t.String(),
  perfilUrl: t.Optional(t.String()),
  poloId: t.String(),
  comissao: t.Optional(t.Boolean()),
})

export type AddParticipanteDTO = Static<typeof AddParticipanteSchema>
