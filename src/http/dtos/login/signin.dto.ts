import { t, Static } from 'elysia'

export const SigninSchema = t.Object({
  usuario: t.String(),
  senha: t.String(),
})

export type SigninDTO = Static<typeof SigninSchema>
