import { t, Static } from 'elysia'

export const AssociateImageSchema = t.Object({
  id: t.String(),
})

export type AssociateImageDTO = Static<typeof AssociateImageSchema>
