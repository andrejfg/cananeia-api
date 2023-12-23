import { t, Static } from 'elysia'

export const UpdatePoloSchema = t.Object({
  nome: t.Optional(t.String()),
  numero: t.Optional(t.String()),
  usuario: t.String(),
  senha: t.String(),
  perfilUrl: t.Optional(t.String()),
})

export type UpdatePoloDTO = Static<typeof UpdatePoloSchema>
