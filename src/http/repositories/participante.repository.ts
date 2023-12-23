import prisma from '@/database/prisma'
import {
  AddParticipanteDTO,
  UpdateParticipanteDTO,
} from '../dtos/participantes'

class ParticipanteRepository {
  async findAll() {
    return await prisma.participante.findMany({
      include: { polo: true, perfilImagem: true },
    })
  }

  async findById(id: string) {
    return await prisma.participante.findFirst({
      where: { id },
      include: { polo: true, perfilImagem: true },
    })
  }

  // TODO: IMAGE
  async add(data: AddParticipanteDTO) {
    const poloData = await prisma.polo.findUnique({
      where: { id: data.poloId },
    })
    if (!poloData) {
      return null
    }
    // encrypt password
    const senha = await Bun.password.hash(data.senha)
    const newParticipante = await prisma.participante.create({
      data: {
        nome: data.nome,
        usuario: {
          create: { usuario: data.usuario, senha },
        },
        polo: {
          connect: {
            id: data.poloId,
          },
        },
      },
      include: { perfilImagem: true },
    })

    return newParticipante
  }

  async removeById(id: string) {
    const participante = await this.findById(id)
    if (participante) {
      await prisma.usuario.delete({
        where: { id: participante.usuarioId },
      })
      return participante
    }
  }

  // TODO: IMAGE
  async updateById(id: string, data: UpdateParticipanteDTO) {
    const participante = await this.findById(id)

    // not found
    if (!participante) {
      return null
    }

    // has polo data to update in participante
    if (data.poloId) {
      const newPolo = await prisma.polo.findUnique({
        where: { id: data.poloId },
      })
      // new polo not found
      if (!newPolo) {
        return null
      } else {
        // update polo to user
        await prisma.participante.update({
          where: { id },
          data: { poloId: newPolo.id },
        })
      }
    }

    const newParticipante = await prisma.participante.update({
      where: { id },
      data: {
        nome: data.nome,
        usuario: {
          update: { usuario: data.usuario, senha: data.senha },
        },
      },
    })

    return newParticipante
  }
}

export default new ParticipanteRepository()
