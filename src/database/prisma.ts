import { PrismaClient } from '@prisma/client'

// If you want to see the SQL you can uncomment below
const prisma = new PrismaClient({
  // log: ['query'],
})

export default prisma
