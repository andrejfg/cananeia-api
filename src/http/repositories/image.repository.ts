import prisma from '@/database/prisma'
import { AddImageDTO } from '../dtos/upload/addImage.dto'
import { extname } from 'path'
import { randomUUID } from 'crypto'
import { pathToPublic } from '../server'
import { uploadToDrive } from '@/utils/uploadToDrive'
import { driveService } from '@/utils/driverService'

const hash = 'AGF5?xYk@-5c'

class ImageRepository {
  async add({ image, proporcao = '1/1' }: AddImageDTO) {
    const prefix = randomUUID()
    const extension = extname(image.name)
    const nome = prefix.concat(extension)
    const imageId = await uploadToDrive(nome, image)

    if (imageId) {
      const newImage = await prisma.imagem.create({
        data: { hash, proporcao, nome: imageId },
      })
      return newImage
    }
  }

  async remove(nome: string) {
    driveService.files.delete({ fileId: nome })
    await prisma.imagem.delete({ where: { nome } })
    // const folderPrefix = resolve(import.meta.dir, '../../../', 'public')
    // unlinkSync(resolve(folderPrefix, nome))
  }
}

export default new ImageRepository()
