import Elysia, { Static, t } from 'elysia'
import jwt from '@elysiajs/jwt'
import cookie from '@elysiajs/cookie'
import { env } from '@/env'
import { UnauthorizedError, NotComissao } from './routes/errors'
import { findById } from './handlers/user.handle'

const jwtPayloadSchema = t.Object({
  sub: t.String(),
  nome: t.String(),
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
        const { sub: id } = await getCurrentUser()
        const user = await findById(id)
        // não existe usuario
        if (!user) {
          throw new UnauthorizedError()
        }
        // usuario é participante e não faz parte da comissão
        if (user.participante && !user.participante.comissao) {
          throw new NotComissao()
        } else if (!user.polo) {
          // usuario não é nem polo e nem participante
          throw new UnauthorizedError()
        }
      },
    }
  })
