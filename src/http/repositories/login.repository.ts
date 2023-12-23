import prisma from '@/database/prisma'
import { SigninDTO } from '../dtos/login/signin.dto'

class LoginRepository {
  async signin(data: SigninDTO) {
    const user = await prisma.usuario.findUnique({
      where: { usuario: data.usuario },
      include: { participante: true, polo: true },
    })
    // usuario existe
    if (user) {
      const isMatch = await Bun.password.verify(data.senha, user.senha)
      if (isMatch) {
        // se o participante for um membro de comissão, tambem acessa como polo
        if (
          user.participante &&
          user.participante.comissao &&
          user.participante.poloId
        ) {
          const polo = await prisma.polo.findUnique({
            where: { id: user.participante.poloId },
          })
          return { ...user, polo }
        } else {
          // se for acesso de polo ou participante comum, login normal
          return user
        }
      }
    }
    return null
  }
}

export default new LoginRepository()
