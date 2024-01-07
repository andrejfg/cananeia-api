import { Elysia } from 'elysia'
import { swagger } from '@elysiajs/swagger'
import cors from '@elysiajs/cors'
import { authentication } from './authentication'
import {
  adminRoutes,
  loginRoutes,
  participanteRoutes,
  poloRoutes,
  publicacaoRoutes,
  userRoutes,
} from './routes'
import staticPlugin from '@elysiajs/static'
import { existsSync, mkdirSync } from 'fs'

// make directory for images static routes
if (!existsSync('public')) {
  mkdirSync('public')
}
export const pathToPublic = import.meta.dir + '/../../public'

export const app = new Elysia()
  .use(swagger())
  .use(
    cors({
      credentials: true,
      allowedHeaders: ['content-type'],
      methods: ['GET', 'POST', 'PUT', 'DELETE'],
      origin: (request): boolean => {
        const origin = request.headers.get('origin')

        if (!origin) {
          return false
        }

        return true
      },
    }),
  )
  .use(staticPlugin({ prefix: 'upload' }))
  .use(authentication)
  .use(loginRoutes)
  .use(userRoutes)
  .use(participanteRoutes)
  .use(poloRoutes)
  .use(adminRoutes)
  .use(publicacaoRoutes)
  .get('/', () => {
    return { code: 200, message: 'Server working' }
  })
  .listen(process.env.PORT || 3000)

console.log(
  `🔥 HTTP server running at ${app.server?.hostname}:${app.server?.port}`,
)
