import { t, Static } from 'elysia'

export const AddUserImageSchema = t.Object({
  image: t.File({ type: 'image', maxSize: '15m' }),
  user: t.Optional(t.String()),
})

export type AddImageDTO = Static<typeof AddUserImageSchema>
