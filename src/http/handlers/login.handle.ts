import { AddParticipanteDTO } from '../dtos/participantes'
import { AddPoloDTO } from '../dtos/polos'
import participanteRepository from '../repositories/participante.repository'
import poloRepository from '../repositories/polo.repository'

export async function addParticipante(data: AddParticipanteDTO) {
  return await participanteRepository.add(data)
}
export async function addPolo(data: AddPoloDTO) {
  return await poloRepository.add(data)
}
