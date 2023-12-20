import { t, Static } from 'elysia'

export const UpdateExampleSchema = t.Object({
  name: t.Optional(t.String()),
})

export type UpdateExampleDTO = Static<typeof UpdateExampleSchema>
