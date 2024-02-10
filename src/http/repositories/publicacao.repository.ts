import prisma from '@/database/prisma'
import { AddPublicacaoDTO } from '../dtos/publicacao/addPublicacao.dto'
import { findById } from '../handlers/user.handle'
import imageRepository from './image.repository'
import { UpdatePublicacaoDTO } from '../dtos/publicacao/updatePublicacao.dto'
import userRepository from './user.repository'

class PublicacaoRepository {
  async findAll() {
    return await prisma.publicacao.findMany({ include: { imagem: true } })
  }

  async findAllPending() {
    return await prisma.publicacao.findMany({
      where: { aceito: false },
      include: {
        imagem: true,
        participante: {
          include: {
            polo: true,
            usuario: { select: { usuario: true, perfilImagem: true } },
          },
        },
        polo: {
          include: {
            usuario: { select: { usuario: true, perfilImagem: true } },
          },
        },
      },
      orderBy: { createdAt: 'desc' },
    })
  }

  async getFeed(lastOne?: Date, newerOne?: Date) {
    return await prisma.publicacao.findMany({
      where: { acceptedAt: { gt: lastOne, lt: newerOne }, aceito: true },
      orderBy: { createdAt: 'desc' },
      include: {
        imagem: true,
        participante: {
          include: {
            polo: true,
            usuario: { select: { usuario: true, perfilImagem: true } },
          },
        },
        polo: {
          include: {
            usuario: { select: { usuario: true, perfilImagem: true } },
          },
        },
      },
      take: 5,
    })
  }

  async findByUser(id: string, tipo?: string) {
    const user = await userRepository.findById(id)
    if (!user) return
    if (
      (user.polo && tipo === '1') ||
      (tipo === '1' && user.participante && user.participante?.comissao)
    )
      return await prisma.publicacao.findMany({
        where: { poloId: user.polo?.id },
        include: { imagem: true },
      })
    else if (tipo === '0' && user.participante) {
      return await prisma.publicacao.findMany({
        where: { participanteId: user.participante.id },
        include: { imagem: true },
      })
    }
  }

  async findById(id: string) {
    return await prisma.publicacao.findUnique({
      where: { id },
      include: { imagem: true, cometarios: true, reacoes: true },
    })
  }

  async add(data: AddPublicacaoDTO) {
    const user = await findById(data.id)
    // Se não existir usuário: ERRO
    if (!user) return
    // Se a publicação for de participante, mas não tiver participante nesse usuario: ERRO
    if (data.tipo === '0' && !user.participante) return
    // Se a publicação for de polo, mas foi feito por um participante que não é comissao:ERRO
    // Se a publicação for de polo, mas não tem polo: ERRO
    if (
      (!user.polo && data.tipo === '1') ||
      (data.tipo === '1' && user.participante && !user.participante?.comissao)
    )
      return

    if (data.tipo === '0') {
      const usuarioId = user.participante?.id
      const imagem = await imageRepository.add(data)
      if (imagem) {
        const publicacao = await prisma.publicacao.create({
          data: {
            descricao: data.descricao,
            participante: { connect: { id: usuarioId } },
            imagem: { connect: { nome: imagem.nome } },
          },
        })
        return publicacao
      }
    } else if (data.tipo === '1') {
      const usuarioId = user.polo?.id
      const imagem = await imageRepository.add(data)
      if (imagem) {
        const publicacao = await prisma.publicacao.create({
          data: {
            descricao: data.descricao,
            polo: { connect: { id: usuarioId } },
            imagem: { connect: { nome: imagem.nome } },
          },
        })
        return publicacao
      }
    }
  }

  async removeById(id: string) {
    const publicacao = await this.findById(id)
    if (publicacao) {
      if (publicacao.imagem) imageRepository.remove(publicacao.imagem?.nome)
      return await prisma.publicacao.delete({ where: { id } })
    }
  }

  async updateById(id: string, data: UpdatePublicacaoDTO) {
    return await prisma.publicacao.update({
      where: { id },
      data: { ...data, acceptedAt: data.aceito ? new Date() : null },
    })
  }
}

export default new PublicacaoRepository()
