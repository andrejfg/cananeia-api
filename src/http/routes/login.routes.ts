import Elysia from 'elysia'
import { authentication } from '../authentication'

export const loginRoutes = new Elysia().group('/login', (app) =>
  app
    .use(authentication)
    .post('/signin', async ({ body, signUser }) => {})
    .post('/signout', async ({ set, signOut }) => {
      set.status = 'No Content'
      signOut()
    }),
)
