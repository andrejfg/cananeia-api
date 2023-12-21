/*
  Warnings:

  - You are about to drop the `participantes_polo` table. If the table is not empty, all the data it contains will be lost.
  - Added the required column `poloId` to the `participantes` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE "participantes_polo" DROP CONSTRAINT "participantes_polo_participanteId_fkey";

-- DropForeignKey
ALTER TABLE "participantes_polo" DROP CONSTRAINT "participantes_polo_poloId_fkey";

-- AlterTable
ALTER TABLE "participantes" ADD COLUMN     "comissao" BOOLEAN NOT NULL DEFAULT false,
ADD COLUMN     "poloId" TEXT NOT NULL;

-- DropTable
DROP TABLE "participantes_polo";

-- AddForeignKey
ALTER TABLE "participantes" ADD CONSTRAINT "participantes_poloId_fkey" FOREIGN KEY ("poloId") REFERENCES "polos"("id") ON DELETE CASCADE ON UPDATE CASCADE;
