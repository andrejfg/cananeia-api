import { resolve } from 'path'
import { AddImageDTO } from '../dtos/upload/addImage.dto'
import imageRepository from '../repositories/image.repository'
import { write } from 'bun'

export async function add(data: AddImageDTO) {
  const image = await imageRepository.add(data)
  if (image) {
    const folderPrefix = resolve(import.meta.dir, '../../../', 'public')
    const pathFile = resolve(folderPrefix, image.nome)
    write(pathFile, data.image)
    return image.nome
  }
}
