import { google } from 'googleapis'

export async function upload({ body }) {
  try {
    const auth = new google.auth.GoogleAuth({
      keyFile: './comeerj.google.json',
      scopes: ['https://www.googleapis.com/auth/drive'],
    })
    const driveService = google.drive({
      version: 'v3',
      auth,
    })
    const fileMetaData = {
      name: 'snowplace.jpg',
      parents: [process.env.GOOGLE_API_FOLDER_ID],
    }
    const media = {
      mimeType: 'image/jpg',
      body,
    }

    const response = await driveService.files.create({
      resource: fileMetaData,
      media,
      field: 'id',
    })
    return response.data.id
  } catch (err) {
    console.error(err)
  }
}
