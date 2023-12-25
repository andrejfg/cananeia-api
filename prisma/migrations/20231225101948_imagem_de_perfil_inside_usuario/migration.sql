/*
  Warnings:

  - You are about to drop the column `participanteId` on the `imagens` table. All the data in the column will be lost.
  - You are about to drop the column `poloId` on the `imagens` table. All the data in the column will be lost.
  - A unique constraint covering the columns `[usuarioId]` on the table `imagens` will be added. If there are existing duplicate values, this will fail.

*/
-- DropForeignKey
ALTER TABLE "imagens" DROP CONSTRAINT "imagens_participanteId_fkey";

-- DropForeignKey
ALTER TABLE "imagens" DROP CONSTRAINT "imagens_poloId_fkey";

-- DropIndex
DROP INDEX "imagens_participanteId_key";

-- DropIndex
DROP INDEX "imagens_poloId_key";

-- AlterTable
ALTER TABLE "imagens" DROP COLUMN "participanteId",
DROP COLUMN "poloId",
ADD COLUMN     "usuarioId" TEXT;

-- CreateIndex
CREATE UNIQUE INDEX "imagens_usuarioId_key" ON "imagens"("usuarioId");

-- AddForeignKey
ALTER TABLE "imagens" ADD CONSTRAINT "imagens_usuarioId_fkey" FOREIGN KEY ("usuarioId") REFERENCES "usuarios"("id") ON DELETE CASCADE ON UPDATE CASCADE;
