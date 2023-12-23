import Elysia from 'elysia'
import { authentication } from '../authentication'
import { SigninSchema } from '../dtos/login/signin.dto'
import { signin } from '../handlers/login.handle'

export const loginRoutes = new Elysia().group('/login', (app) =>
  app
    .use(authentication)
    .post(
      '/signin',
      async ({ set, body, signUser }) => {
        const user = await signin(body)
        if (user) {
          // Recebe o nome com a prioridade para o participante
          // A prioridade está relacionada caso o participante seja da comissão

          const nome = (user.participante?.nome || user.polo?.nome) as string
          return await signUser({ nome, sub: user.id })
        } else {
          set.status = 'Not Found'
        }
      },
      {
        body: SigninSchema,
      },
    )
    .post('/signout', async ({ set, signOut }) => {
      set.status = 'No Content'
      signOut()
    }),
)
