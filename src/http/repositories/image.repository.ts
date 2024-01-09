import prisma from '@/database/prisma'
import { AddImageDTO } from '../dtos/upload/addImage.dto'
import { extname, resolve } from 'path'
import { randomUUID } from 'crypto'
import { unlinkSync } from 'fs'
import { pathToPublic } from '../server'
import { encode } from 'blurhash'
import sharp from 'sharp'
const blurhash = 'AGF5?xYk@-5c'

class ImageRepository {
  async add({ image, proporcao = '1/1' }: AddImageDTO) {
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
      2,
      2,
    )

    const teste = await Bun.write(
      pathToPublic.concat('/' + nome),
      await image.arrayBuffer(),
    )
    if (teste) {
      const newImage = await prisma.imagem.create({
        data: { hash, proporcao, nome },
      })
      return newImage
    }
  }

  async remove(nome: string) {
    await prisma.imagem.delete({ where: { nome } })
    const folderPrefix = resolve(import.meta.dir, '../../../', 'public')
    unlinkSync(resolve(folderPrefix, nome))
  }
}

export default new ImageRepository()
