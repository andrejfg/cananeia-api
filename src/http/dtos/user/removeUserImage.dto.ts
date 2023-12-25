import { t, Static } from 'elysia'

export const RemoveUserImageSchema = t.Object({
  tipo: t.Optional(t.String()),
})

export type RemoveImageDTO = Static<typeof RemoveUserImageSchema>
