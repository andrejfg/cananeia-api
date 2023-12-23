import prisma from '@/database/prisma'

class UserRepository {
  async findById(id: string) {
    const user = await prisma.usuario.findUnique({
      where: { id },
      include: { participante: true, polo: true },
    })
    if (user) {
      // desestruturando a senha da apresentação
      // eslint-disable-next-line @typescript-eslint/no-unused-vars
      const { senha, ...dados } = user
      if (
        user.participante &&
        user.participante.comissao &&
        user.participante.poloId
      ) {
        const polo = await prisma.polo.findUnique({
          where: { id: user.participante.poloId },
        })
        return { ...dados, polo }
      } else {
        // se for acesso de polo ou participante comum, login normal
        return dados
      }
    }
  }
}

export default new UserRepository()
