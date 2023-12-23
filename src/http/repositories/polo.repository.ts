import prisma from '@/database/prisma'
import { AddPoloDTO, UpdatePoloDTO } from '../dtos/polos'

class PoloRepository {
  async findAll() {
    return await prisma.polo.findMany({
      include: { perfilImagem: true },
    })
  }

  async findById(id: string) {
    return await prisma.polo.findUnique({
      where: { id },
      include: { perfilImagem: true },
    })
  }

  // TODO: Handle Image
  async add(data: AddPoloDTO) {
    const senha = await Bun.password.hash(data.senha)
    const newPolo = await prisma.polo.create({
      data: {
        nome: data.nome,
        numero: data.numero,
        usuario: { create: { usuario: data.usuario, senha } },
      },
      include: { perfilImagem: true },
    })
    return newPolo
  }

  async removeById(id: string) {
    const polo = await this.findById(id)
    if (polo) {
      return await prisma.usuario.delete({
        where: { id: polo?.usuarioId },
      })
    }
  }

  // TODO: Handle Image
  async updateById(id: string, data: UpdatePoloDTO) {
    const polo = await this.findById(id)

    if (!polo) {
      return null
    }

    // criptografa a senha
    let senha: string | undefined
    if (data.senha) {
      senha = await Bun.password.hash(data.senha)
    }

    const updatedPolo = await prisma.polo.update({
      where: { id },
      data: {
        nome: data.nome,
        numero: data.numero,
        usuario: {
          update: { usuario: data.usuario, senha },
        },
      },
      include: { perfilImagem: true },
    })

    return updatedPolo
  }
}

export default new PoloRepository()
