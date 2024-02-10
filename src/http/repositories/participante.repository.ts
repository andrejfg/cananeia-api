import prisma from '@/database/prisma'
import {
  AddParticipanteDTO,
  UpdateParticipanteDTO,
} from '../dtos/participantes'
import poloRepository from './polo.repository'

class ParticipanteRepository {
  async findAll() {
    const participantes = await prisma.participante.findMany({
      include: {
        polo: true,
        usuario: { select: { id: true, usuario: true, perfilImagem: true } },
      },
    })
    return participantes
  }

  async findById(id: string) {
    const participante = await prisma.participante.findFirst({
      where: { id },
      include: {
        polo: true,
        usuario: { select: { id: true, usuario: true, perfilImagem: true } },
      },
    })
    return participante
  }

  async add(data: AddParticipanteDTO) {
    const poloData = await poloRepository.findById(data.poloId)
    if (!poloData) {
      return null
    }
    // encrypt password
    const senha = await Bun.password.hash(data.senha)
    const newParticipante = await prisma.participante.create({
      data: {
        nome: data.nome,
        comissao: data.comissao,
        usuario: {
          create: { usuario: data.usuario, senha },
        },
        polo: {
          connect: poloData,
        },
      },
      include: {
        polo: true,
        usuario: { select: { id: true, usuario: true, perfilImagem: true } },
      },
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

  async updateById(id: string, data: UpdateParticipanteDTO) {
    const participante = await this.findById(id)

    // not found
    if (!participante) {
      return null
    }

    // has polo data to update in participante
    if (data.poloId) {
      const newPolo = await poloRepository.findById(data.poloId)
      // new polo not found
      if (!newPolo) {
        return null
      } else {
        // update polo to user
        await prisma.participante.update({
          where: { id },
          data: { polo: { connect: newPolo } },
        })
      }
    }
    // criptografa a senha
    let senha: string | undefined
    if (data.senha) {
      senha = await Bun.password.hash(data.senha)
    }

    const updatedParticipante = await prisma.participante.update({
      where: { id },
      data: {
        nome: data.nome,
        comissao: data.comissao,
        usuario: {
          update: { usuario: data.usuario, senha },
        },
      },
      include: {
        polo: true,
        usuario: { select: { id: true, usuario: true, perfilImagem: true } },
      },
    })

    return updatedParticipante
  }
}

export default new ParticipanteRepository()
