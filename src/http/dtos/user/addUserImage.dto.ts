import { t, Static } from 'elysia'

export const AddUserImageSchema = t.Object({
  image: t.File({ type: 'image', maxSize: '15m' }),
})

export type AddImageDTO = Static<typeof AddUserImageSchema>
