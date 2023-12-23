import Elysia from 'elysia'
import { authentication } from '../authentication'
import { findById } from '../handlers/user.handle'

export const userRoutes = new Elysia()
  .use(authentication)
  .get('/whoami', async ({ set, getCurrentUser }) => {
    console.log('teste')
    const payloadJWT = await getCurrentUser()
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    const usuario = await findById(payloadJWT.sub)
    if (usuario) {
      return usuario
    } else {
      set.status = 'Not Found'
    }
  })
