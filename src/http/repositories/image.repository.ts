import prisma from '@/database/prisma'
import { AddImageDTO } from '../dtos/upload/addImage.dto'
import { encode } from 'blurhash'
import sharp from 'sharp'
import { extname, resolve } from 'path'
import { randomUUID } from 'crypto'
import { unlinkSync } from 'fs'

class ImageRepository {
  async add({ image, proporcao }: AddImageDTO) {
    const prefix = randomUUID()
    const extension = extname(image.name)
    const nome = prefix.concat(extension)
    const { data, info } = await sharp(await image.arrayBuffer())
      .ensureAlpha()
      .raw()
      .toBuffer({ resolveWithObject: true })

    const hash = encode(
      new Uint8ClampedArray(data),
      info.width,
      info.height,
      3,
      2,
    )

    const newImage = await prisma.imagem.create({
      data: { hash, proporcao, nome },
    })
    return newImage
  }

  async remove(nome: string) {
    await prisma.imagem.delete({ where: { nome } })
    const folderPrefix = resolve(import.meta.dir, '../../../', 'public')
    unlinkSync(resolve(folderPrefix, nome))
  }
}

export default new ImageRepository()