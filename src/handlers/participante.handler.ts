import {
  AddParticipanteDTO,
  UpdateParticipanteDTO,
} from '../dtos/participantes'
import participanteRepository from '../repositories/participante.repository'

export async function findAll() {
  return await participanteRepository.findAll()
}

export async function findOne(id: string) {
  return participanteRepository.findById(id)
}

export async function add(data: AddParticipanteDTO) {
  return participanteRepository.add(data)
}

export async function remove(id: string) {
  return (await findOne(id))
    ? await participanteRepository.removeById(id)
    : null
}

export async function update(id: string, data: UpdateParticipanteDTO) {
  return (await findOne(id))
    ? await participanteRepository.updateById(id, data)
    : null
}
