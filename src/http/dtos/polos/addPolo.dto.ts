import { t, Static } from 'elysia'

export const AddPoloSchema = t.Object({
  nome: t.String(),
  numero: t.String(),
  usuario: t.String(),
  senha: t.String(),
})

export type AddPoloDTO = Static<typeof AddPoloSchema>
