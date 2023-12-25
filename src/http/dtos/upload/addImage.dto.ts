import { t, Static } from 'elysia'

export const AddImageSchema = t.Object({
  image: t.File({ type: 'image', maxSize: '15m' }),
  proporcao: t.Optional(t.String()),
})

export type AddImageDTO = Static<typeof AddImageSchema>
