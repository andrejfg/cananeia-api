import { authentication } from '@/authentication'
import { sign } from 'crypto'
import Elysia from 'elysia'

export const participanteRoutes = new Elysia().group('/login', (app) =>
  app
    .use(authentication)
    .post('/signin', async ({ body, signUser }) => {
      // return findAll()
    })
    .post('/signout', async ({ set, signOut }) => {
      set.status = 'No Content'
      signOut()
    }),
)
