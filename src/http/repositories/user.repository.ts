import prisma from '@/database/prisma'
import poloRepository from './polo.repository'
import imageRepository from './image.repository'

class UserRepository {
  async findById(id: string) {
    const user = await prisma.usuario.findUnique({
      where: { id },
      include: { participante: true, polo: true, perfilImagem: true },
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
        const polo = await poloRepository.findById(user.participante.poloId)
        return { ...dados, polo }
      } else {
        // se for acesso de polo ou participante comum, login normal
        return dados
      }
    }
  }

  async changeImage(id: string, imageId: string, tipo?: string) {
    const user = await this.findById(id)
    // Erro se não existir usuario
    // Erro se o participante inventar de trocar a imagem do polo, mas não é comissão
    if (!user || (tipo && tipo === '1' && !user.participante?.comissao)) {
      imageRepository.remove(imageId)
      return
    }

    // Se for um participante de comissão que está trocando a imagem de perfil do polo
    const usuarioId =
      tipo && tipo === '0' && user.participante?.comissao
        ? user.polo.usuarioId
        : id
    const poloUser = await this.findById(user.polo.usuarioId)
    const oldImage =
      poloUser && tipo && tipo === '0' && user.participante?.comissao
        ? poloUser.perfilImagem?.nome
        : user.perfilImagem?.nome

    const newUser = await prisma.usuario.update({
      where: { id: usuarioId },
      data: { perfilImagem: { connect: { nome: imageId } } },
      include: { perfilImagem: true },
    })

    if (newUser) {
      // eslint-disable-next-line @typescript-eslint/no-unused-vars
      const { senha, ...user } = newUser
      if (oldImage) imageRepository.remove(oldImage)
      return user
    } else {
      imageRepository.remove(imageId)
    }
  }

  async removeImage(id: string, tipo: string) {
    const user = await this.findById(id)

    if (!user || (tipo && tipo === '1' && !user.participante?.comissao)) {
      return
    }
    if (tipo && tipo === '1' && user.participante?.comissao) {
      const usuarioId = user.polo.usuarioId
      const userImage = await this.findById(usuarioId)
      if (userImage && userImage.perfilImagem?.nome) {
        imageRepository.remove(userImage.perfilImagem?.nome)
        return true
      }
    } else {
      if (user.perfilImagem?.nome) {
        imageRepository.remove(user.perfilImagem?.nome)
        return true
      }
    }
    console.log('teste 6')
  }
}

export default new UserRepository()
