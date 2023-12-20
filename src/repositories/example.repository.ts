import prisma from '../database/prisma'
import { AddExampleDTO, UpdateExampleDTO } from '../dtos/examples'

class ExampleRepository {
  async findAll() {
    return await prisma.example.findMany({})
  }

  async findById(id: string) {
    return await prisma.example.findFirst({ where: { id } })
  }

  async add(data: AddExampleDTO) {
    return await prisma.example.create({ data })
  }

  async removeById(id: string) {
    return (await this.findById(id))
      ? await prisma.example.delete({ where: { id } })
      : null
  }

  async updateById(id: string, data: UpdateExampleDTO) {
    return (await this.findById(id))
      ? await prisma.example.update({ where: { id }, data })
      : null
  }
}

export default new ExampleRepository()
