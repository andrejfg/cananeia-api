import Elysia, { Static, t } from 'elysia'
import jwt from '@elysiajs/jwt'
import cookie from '@elysiajs/cookie'
import { env } from '@/env'
import prisma from './database/prisma'
import { UnauthorizedError, NotComissao } from './routes/errors'

const jwtPayloadSchema = t.Object({
  sub: t.String(),
  nome: t.String(),
  perfilUrl: t.Optional(t.String()),
})

export const authentication = new Elysia()
  .error({
    UNAUTHORIZED: UnauthorizedError,
    NOT_COMISSAO: NotComissao,
  })
  .onError(({ code, error, set }) => {
    switch (code) {
      case 'UNAUTHORIZED':
        set.status = 401
        return { code, message: error.message }
      case 'NOT_COMISSAO':
        set.status = 401
        return { code, message: error.message }
    }
  })
  .use(
    jwt({
      name: 'jwt',
      secret: env.JWT_SECRET_KEY,
      schema: jwtPayloadSchema,
    }),
  )
  .use(cookie())
  .derive(({ jwt, cookie, setCookie, removeCookie }) => {
    return {
      getCurrentUser: async () => {
        const payload = await jwt.verify(cookie.auth)

        if (!payload) {
          throw new UnauthorizedError()
        }

        return payload
      },
      signUser: async (payload: Static<typeof jwtPayloadSchema>) => {
        setCookie('auth', await jwt.sign(payload), {
          httpOnly: true,
          maxAge: 4 * 86400,
          path: '/',
        })
        // console.log(cookie.auth)
      },
      signOut: () => {
        removeCookie('auth')
      },
    }
  })
  .derive(({ getCurrentUser }) => {
    return {
      isComissao: async () => {
        const { sub } = await getCurrentUser()
        const participante = await prisma.participante.findUnique({
          where: { usuarioId: sub },
        })
        if (!participante?.comissao) {
          throw new NotComissao()
        }
      },
    }
  })
