import { google } from 'googleapis'

const auth = new google.auth.GoogleAuth({
  keyFile: import.meta.dir + '../../../comeerj.google.json',
  scopes: ['https://www.googleapis.com/auth/drive'],
})
export const driveService = google.drive({
  version: 'v3',
  auth,
})
