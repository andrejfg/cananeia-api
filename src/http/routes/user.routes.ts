import Elysia, { t } from 'elysia'
import { authentication } from '../authentication'
import { changeImage, findById, removeImage } from '../handlers/user.handle'
import { add } from '../handlers/upload.handle'
import { AddUserImageSchema } from '../dtos/user/addUserImage.dto'
import { RemoveUserImageSchema } from '../dtos/user/removeUserImage.dto'

export const userRoutes = new Elysia()
  .use(authentication)
  .get('/whoami', async ({ set, getCurrentUser }) => {
    const payloadJWT = await getCurrentUser()
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    const usuario = await findById(payloadJWT.sub)
    if (usuario) {
      return usuario
    } else {
      set.status = 'Not Found'
    }
  })
  .post(
    '/user/imagem',
    async ({
      set,
      query: { tipo },
      body: { image, user },
      getCurrentUser,
      isComissao,
    }) => {
      // const { tipo } = paramsSchema.parse(params)
      let userSub = user
      if (!userSub) {
        const payloadJWT = await getCurrentUser()
        userSub = payloadJWT.sub
      }
      if (tipo === '1') await isComissao()
      // eslint-disable-next-line @typescript-eslint/no-unused-vars
      const imagem = await add({ image, proporcao: '1/1' })
      if (imagem && userSub) {
        const novoUsuario = await changeImage(userSub, imagem, tipo)
        if (novoUsuario) {
          return novoUsuario
        } else {
          set.status = 'Bad Request'
        }
      } else {
        set.status = 'Bad Request'
      }
    },
    {
      query: t.Optional(
        t.Object({
          tipo: t.Optional(t.String()),
        }),
      ),
      body: AddUserImageSchema,
    },
  )
  .delete(
    '/user/imagem',
    async ({ set, body, getCurrentUser, isComissao }) => {
      // const { tipo } = paramsSchema.parse(params)
      const payloadJWT = await getCurrentUser()
      if (body && body.tipo === '1') await isComissao()
      // eslint-disable-next-line @typescript-eslint/no-unused-vars
      const isRemoved = await removeImage(payloadJWT.sub, body.tipo || '0')
      if (isRemoved) {
        set.status = 'No Content'
      } else {
        set.status = 'Bad Request'
      }
    },
    {
      body: RemoveUserImageSchema,
    },
  )
