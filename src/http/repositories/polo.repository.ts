import prisma from '@/database/prisma'
import { AddPoloDTO, UpdatePoloDTO } from '../dtos/polos'

class PoloRepository {
  // Função auxiliar para tratar como vai ser o retorno de participante sem repetir código
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  private poloReturn(polo: any) {
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    const { senha, ...usuario } = polo.usuario
    return {
      ...polo,
      usuario: {
        usuario,
      },
    }
  }

  async findAll() {
    const polos = await prisma.polo.findMany({
      include: { usuario: { include: { perfilImagem: true } } },
    })
    return polos.map(this.poloReturn)
  }

  async findById(id: string) {
    const polo = await prisma.polo.findUnique({
      where: { id },
      include: { usuario: { include: { perfilImagem: true } } },
    })
    return this.poloReturn(polo)
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
      include: { usuario: { include: { perfilImagem: true } } },
    })
    return this.poloReturn(newPolo)
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
      include: { usuario: { include: { perfilImagem: true } } },
    })

    return this.poloReturn(updatedPolo)
  }
}

export default new PoloRepository()
