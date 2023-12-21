/*
  Warnings:

  - You are about to drop the column `perfilUrl` on the `usuarios` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "participantes" ADD COLUMN     "perfilUrl" TEXT;

-- AlterTable
ALTER TABLE "polos" ADD COLUMN     "perfilUrl" TEXT;

-- AlterTable
ALTER TABLE "usuarios" DROP COLUMN "perfilUrl";
