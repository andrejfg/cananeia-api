import { Elysia } from 'elysia'
import { swagger } from '@elysiajs/swagger'
import cors from '@elysiajs/cors'
import { participanteRoutes } from './routes'
import { authentication } from './authentication'

const app = new Elysia()
  .use(
    swagger({
      documentation: {
        components: {
          securitySchemes: {
            api_key: {
              type: 'apiKey',
              name: 'Cookie',
              in: 'header',
              description: 'JWT token cookie to validade user',
            },
          },
        },
        security: [{ api_key: [] }],
      },
    }),
  )
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
  .use(participanteRoutes)
  .get('/', () => {
    return { code: 200, message: 'Server working' }
  })
  .listen(3000)

console.log(
  `🔥 HTTP server running at ${app.server?.hostname}:${app.server?.port}`,
)
