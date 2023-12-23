import { t, Static } from 'elysia'

export const UpdateParticipanteSchema = t.Object({
  nome: t.Optional(t.String()),
  usuario: t.Optional(t.String()),
  senha: t.Optional(t.String()),
  perfilUrl: t.Optional(t.String()),
  poloId: t.Optional(t.String()),
})

export type UpdateParticipanteDTO = Static<typeof UpdateParticipanteSchema>
