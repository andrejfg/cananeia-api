import { AddParticipanteDTO, UpdateParticipanteDTO } from '@/dtos/participantes'
import prisma from '../database/prisma'

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
    const { poloId, nome, ...usuario } = data
    const poloData = await prisma.polo.findUnique({
      where: { id: poloId },
    })
    if (!poloData) {
      return null
    }

    const { id: usuarioId } = await prisma.usuario.create({ data: usuario })
    const newParticipante = await prisma.participante.create({
      data: { nome, usuarioId, poloId },
      include: { polo: true, perfilImagem: true },
    })
    return newParticipante
  }

  async removeById(id: string) {
    return await prisma.usuario.delete({
      where: { id },
    })
  }

  // TODO: IMAGE
  async updateById(id: string, data: UpdateParticipanteDTO) {
    const { poloId, nome, ...newUser } = data
    const participante = await this.findById(id)

    // not found
    if (!participante) {
      return null
    }

    // has polo data to update in participante
    if (poloId) {
      const newPolo = await prisma.polo.findUnique({
        where: { id: poloId },
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
    await prisma.usuario.update({
      where: { id: participante.usuarioId },
      data: newUser,
    })

    const newParticipante = await prisma.participante.update({
      where: { id },
      data: { nome },
    })

    return newParticipante
  }
}

export default new ParticipanteRepository()
