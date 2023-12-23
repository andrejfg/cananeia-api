import { Elysia } from 'elysia'
import { swagger } from '@elysiajs/swagger'
import cors from '@elysiajs/cors'
import { authentication } from './authentication'
import {
  adminRoutes,
  loginRoutes,
  participanteRoutes,
  poloRoutes,
  userRoutes,
} from './routes'

const app = new Elysia()
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
  .use(authentication)
  .use(loginRoutes)
  .use(userRoutes)
  .use(participanteRoutes)
  .use(poloRoutes)
  .use(adminRoutes)
  .get('/', () => {
    return { code: 200, message: 'Server working' }
  })
  .listen(3000)

console.log(
  `🔥 HTTP server running at ${app.server?.hostname}:${app.server?.port}`,
)
