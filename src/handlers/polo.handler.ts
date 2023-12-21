import { AddPoloDTO, UpdatePoloDTO } from '../dtos/polos'
import poloRepository from '../repositories/polo.repository'

export async function findAll() {
  return await poloRepository.findAll()
}

export async function findOne(id: string) {
  return poloRepository.findById(id)
}

export async function add(data: AddPoloDTO) {
  return poloRepository.add(data)
}

export async function remove(id: string) {
  return (await findOne(id)) ? await poloRepository.removeById(id) : null
}

export async function update(id: string, data: UpdatePoloDTO) {
  return (await findOne(id)) ? await poloRepository.updateById(id, data) : null
}
