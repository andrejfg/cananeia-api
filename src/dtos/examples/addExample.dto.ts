import { t, Static } from 'elysia'

export const AddExampleSchema = t.Object({
  name: t.String(),
})

export type AddExampleDTO = Static<typeof AddExampleSchema>
