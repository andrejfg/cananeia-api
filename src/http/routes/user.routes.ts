import Elysia from 'elysia'
import { authentication } from '../authentication'
import { changeImage, findById } from '../handlers/user.handle'
import { add } from '../handlers/upload.handle'
import { AddUserImageSchema } from '../dtos/user/addUserImage.dto'

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
    async ({ set, body, getCurrentUser }) => {
      // const { tipo } = paramsSchema.parse(params)
      const payloadJWT = await getCurrentUser()
      // eslint-disable-next-line @typescript-eslint/no-unused-vars
      const imagem = await add(body)
      if (imagem) {
        const novoUsuario = await changeImage(payloadJWT.sub, imagem, body.tipo)
        if (novoUsuario) {
          return novoUsuario
        } else {
          console.log(1)
          set.status = 'Bad Request'
        }
      } else {
        console.log(2)
        set.status = 'Bad Request'
      }
    },
    {
      body: AddUserImageSchema,
    },
  )
