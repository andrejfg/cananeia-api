import { AddPublicacaoDTO, UpdatePublicacaoDTO } from '../dtos/publicacao'
import publicacaoRepository from '../repositories/publicacao.repository'
import { findById } from './user.handle'

export async function findAll() {
  return await publicacaoRepository.findAll()
}

export async function findOne(id: string) {
  return publicacaoRepository.findById(id)
}

export async function add(data: AddPublicacaoDTO) {
  return publicacaoRepository.add(data)
}

export async function remove(id: string, userId: string) {
  const publicacao = await findOne(id)
  const user = await findById(userId)
  if (
    user?.polo.id === publicacao?.poloId ||
    user?.participante?.id === publicacao?.participanteId
  )
    return await publicacaoRepository.removeById(id)
}

export async function update(
  id: string,
  userId: string,
  data: UpdatePublicacaoDTO,
) {
  const publicacao = await findOne(id)
  const user = await findById(userId)
  if (
    user?.polo.id === publicacao?.poloId ||
    user?.participante?.id === publicacao?.participanteId
  )
    return await publicacaoRepository.updateById(id, data)
}
