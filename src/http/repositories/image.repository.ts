import prisma from '@/database/prisma'
import { AddImageDTO } from '../dtos/upload/addImage.dto'
// import { encode } from 'blurhash'
// import sharp from 'sharp'
import { extname, resolve } from 'path'
import { randomUUID } from 'crypto'
import { unlinkSync } from 'fs'
import { pathToPublic } from '../server'
const blurhash = 'AGF5?xYk@-5c'

class ImageRepository {
  async add({ image, proporcao = '1/1' }: AddImageDTO) {
    console.log('Teste 1')
    const prefix = randomUUID()
    console.log('Teste 2')
    const extension = extname(image.name)
    console.log('Teste 3')
    const nome = prefix.concat(extension)
    console.log('Teste 4')
    // const { data, info } = await sharp(await image.arrayBuffer())
    //   .ensureAlpha()
    //   .raw()
    //   .toBuffer({ resolveWithObject: true })

    // const hash = encode(
    //   new Uint8ClampedArray(data),
    //   info.width,
    //   info.height,
    //   2,
    //   2,
    // )

    const teste = await Bun.write(
      pathToPublic.concat('/' + nome),
      await image.arrayBuffer(),
    )
    console.log('Teste 5')
    if (teste) {
      const newImage = await prisma.imagem.create({
        data: { hash: blurhash, proporcao, nome },
      })
      console.log('Teste 6')
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
