import { AddExampleDTO, UpdateExampleDTO } from '../dtos/examples'
import exampleRepository from '../repositories/example.repository'

export async function findAll() {
  return await exampleRepository.findAll()
}

export async function findOne(id: string) {
  return exampleRepository.findById(id)
}

export async function add(data: AddExampleDTO) {
  return exampleRepository.add(data)
}

export async function remove(id: string) {
  return (await findOne(id)) ? await exampleRepository.removeById(id) : null
}

export async function update(id: string, data: UpdateExampleDTO) {
  return (await findOne(id))
    ? await exampleRepository.updateById(id, data)
    : null
}
