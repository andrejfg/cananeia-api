import { Elysia } from 'elysia'
import { swagger } from '@elysiajs/swagger'
import { exampleRoutes } from './routes'

const app = new Elysia()
  .use(swagger())
  .use(exampleRoutes)
  .get('/', () => 'Server working')
  .listen(3000)

console.log(
  `🔥 HTTP server running at ${app.server?.hostname}:${app.server?.port}`,
)
