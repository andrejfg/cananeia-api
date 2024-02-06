import { createReadStream, unlinkSync } from 'fs'
import { driveService } from './driverService'
import { env } from '@/env'

export async function uploadToDrive(nome: string, file: File) {
  try {
    const fileMetaData = {
      name: nome,
      parents: [env.GOOGLE_API_FOLDER_ID],
    }

    const tempPath = import.meta.dir + '/' + nome

    await Bun.write(tempPath, await file.arrayBuffer())

    const media = {
      mimeType: file.type,
      body: createReadStream(tempPath),
    }

    const response = await driveService.files.create({
      resource: fileMetaData,
      media,
      field: 'id',
    })

    unlinkSync(tempPath)
    return response.data.id
  } catch (err) {
    console.log(import.meta.path)
    console.error(err)
  }
}

// uploadToDrive().then((data) => {
//   console.log(data)
//   // https://drive.google.com/uc?export=view&id=
// })
